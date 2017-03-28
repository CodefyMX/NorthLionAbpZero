using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Localization;
using Abp.UI;
using Castle.Core.Internal;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.Users.Dto;
using Microsoft.AspNet.Identity;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Users
{
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService : ZeroAppServiceBase, IUserAppService
    {
        private readonly IRepository<User, long> _userRepository;
        private readonly IPermissionManager _permissionManager;

        public UserAppService(IRepository<User, long> userRepository, IPermissionManager permissionManager)
        {
            _userRepository = userRepository;
            _permissionManager = permissionManager;
        }

        public async Task ProhibitPermission(ProhibitPermissionInput input)
        {
            var user = await UserManager.GetUserByIdAsync(input.UserId);
            var permission = _permissionManager.GetPermission(input.PermissionName);

            await UserManager.ProhibitPermissionAsync(user, permission);
        }

        //Example for primitive method parameters.
        public async Task RemoveFromRole(long userId, string roleName)
        {
            CheckErrors(await UserManager.RemoveFromRoleAsync(userId, roleName));
        }

        public async Task<UsersOutput> GetUsers(PaginatedInputDto input)
        {
            await Task.FromResult(0);
            var pagesToSkip =PaginationHelpers.GetSkipTotal(input.Page,input.RowsPerPage);
            //Might need perf tweaks
            Func<User, bool> exp = a => a.UserName.Contains(input.SearchString);
            var users = _userRepository.GetAll()
                .WhereIf(!input.SearchString.IsNullOrEmpty(), exp);
            switch (input.PropertyToOrder)
            {
                case "UserName":
                    users = input.Direction == "Desc" ? users.OrderByDescending(a => a.UserName) : users.OrderBy(a => a.UserName);
                    break;
                default:
                    users = input.Direction == "Desc" ? users.OrderByDescending(a => a.Name) : users.OrderBy(a => a.Name);
                    break;
            }

            var usersListEnum = users as IList<User> ?? users.ToList();
            var totalPages = PaginationHelpers.GetRemainingPages(usersListEnum.Count(), input.RowsPerPage);

            var usersList = usersListEnum.Skip(pagesToSkip)
                .Take(input.RowsPerPage).ToList();
            return new UsersOutput()
            {
                RemainingPages = totalPages,
                Page = input.Page,
                Rows = input.RowsPerPage,
                SearchString = input.SearchString,
                Users = usersList.Select(a=>a.MapTo<UserListDto>()).ToList()
            };
        }

        public async Task CreateUser(CreateUserInput input)
        {
            var user = input.MapTo<User>();

            user.TenantId = AbpSession.TenantId;
            user.Password = new PasswordHasher().HashPassword(input.Password);
            user.IsEmailConfirmed = true;

            CheckErrors(await UserManager.CreateAsync(user));
        }

        public async Task UpdateProfile(EditProfileInput input)
        {
            var userFound = await GetCurrentUserAsync();
            var modified = input.MapTo(userFound);
            await UserManager.UpdateAsync(modified);
        }

        public async Task EditUser(UpdateUserInput input)
        {
            var userFound = _userRepository.Get(input.Id);
            var modified = input.MapTo(userFound);
            await UserManager.UpdateAsync(modified);
            //Notify user by email or something
        }

        public async Task<UpdateUserInput> GetUserForEdit(long? userId)
        {
            if (!userId.HasValue) return new UpdateUserInput();
            var user = await UserManager.GetUserByIdAsync(userId.Value);
            var input = user.MapTo<UpdateUserInput>();
            return input;
        }

        public async Task SetUserRoles(SetUserRolesInput input)
        {
            var user = await UserManager.GetUserByIdAsync(input.UserId);
            await UserManager.SetRoles(user, input.Roles.ToArray());
            //Notify user by email or something
        }

        public async Task<EditProfileInput> GetUserProfileForEdit()
        {
            var user = await GetCurrentUserAsync();
            var userProfileInfo = user.MapTo<EditProfileInput>();
            userProfileInfo.MyRoles = (await UserManager.GetRolesAsync(userProfileInfo.Id)).ToList();
            return userProfileInfo;
        }

        public async Task UpdateUserProfilePicture(long userId, string profilePicture)
        {
            var user = await _userRepository.FirstOrDefaultAsync(a => a.Id == userId);
            //Property not implemented for simplicity
            //user.ProfilePicture = profilePicture;
        }

        public async Task ChangeUserPassword(ChangePasswordInput input)
        {
            var user = await GetCurrentUserAsync();

            var hasher = new PasswordHasher();
            if (!string.IsNullOrEmpty(input.CurrentPassword))
            {
                var checkedPassword = hasher.VerifyHashedPassword(user.Password, input.CurrentPassword);
                switch (checkedPassword)
                {
                    case PasswordVerificationResult.Failed:
                        //Is new password
                        throw new UserFriendlyException(L("InvalidPassword"));
                    case PasswordVerificationResult.Success:
                        //Is old password
                        user.Password = hasher.HashPassword(input.NewPassword);
                        await UserManager.UpdateAsync(user);
                        //Notify user by email or something
                        break;
                    case PasswordVerificationResult.SuccessRehashNeeded:
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }

        public async Task<CurrentUserPermissionsOutput> GetUserPermissions(long userId)
        {
            var allPermissions = _permissionManager.GetAllPermissions().Where(a => a.Parent == null).ToList();
            var user = await UserManager.GetUserByIdAsync(userId);
            var userPermissions = (await UserManager.GetGrantedPermissionsAsync(user)).ToList();
            var assignedPermissions = CheckPermissions(allPermissions, userPermissions).ToList();
            return new CurrentUserPermissionsOutput()
            {
                UserId = userId,
                AssignedPermissions = assignedPermissions
            };
        }

        public async Task ResetPermissions(long userId)
        {
            var user = await UserManager.GetUserByIdAsync(userId);
            await UserManager.ResetAllPermissionsAsync(user);
            //Notify user by email or something
        }

        public async Task UnlockUser(long userId)
        {
            var user = await UserManager.GetUserByIdAsync(userId);
            user.IsLockoutEnabled = false;
            //Notify user by email or something
        }

        public async Task LockUser(long userId)
        {
            var user = await UserManager.GetUserByIdAsync(userId);
            user.IsLockoutEnabled = true;
            //Five days                //You can create a const for this
            user.LockoutEndDateUtc = DateTime.Now.AddDays(5);
            //Notify user by email or something
        }

        public async Task DeleteUser(long userId)
        {
            var userToDelete = await UserManager.GetUserByIdAsync(userId);
            await _userRepository.DeleteAsync(userToDelete);
            //Notify admin by email or something
        }

        #region Helpers

        private IEnumerable<UserAssignedPermission> CheckPermissions(IEnumerable<Permission> allPermissions, ICollection<Permission> userPermissions)
        {
            var permissionsFound = new List<UserAssignedPermission>();
            foreach (var permission in allPermissions)
            {
                AddPermission(permissionsFound, userPermissions, permission, userPermissions.Any(a => a.Name == permission.Name));
            }
            return permissionsFound;
        }
        private void AddPermission(ICollection<UserAssignedPermission> permissionsFound, ICollection<Permission> userPermissions, Permission allPermission, bool granted)
        {

            var childPermissions = new List<UserAssignedPermission>();
            var permission = new UserAssignedPermission()
            {
                DisplayName = allPermission.DisplayName.Localize(new LocalizationContext(LocalizationManager)),
                Granted = granted,
                Name = allPermission.Name,
                ParentPermission = allPermission.Parent?.Name
            };
            if (allPermission.Children.Any())
            {
                foreach (var childPermission in allPermission.Children)
                {
                    AddPermission(childPermissions, userPermissions, childPermission, userPermissions.Any(a => a.Name == childPermission.Name));
                }
                permission.ChildPermissions.AddRange(childPermissions);
            }

            permissionsFound.Add(permission);
        }
        #endregion
    }
}