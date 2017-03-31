using Abp.Application.Services;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Users.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace NorthLion.Zero.Users
{
    public interface IUserAppService : IApplicationService
    {
        /// <summary>
        /// Creates a new user in the database, users are active by default
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        Task CreateUser(CreateUserInput input);
        /// <summary>
        /// Gets a list of users 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpGet]
        Task<UsersOutput> GetUsers(PaginatedInputDto input);
        [HttpGet]
        Task<CurrentUserPermissionsOutput> GetUserPermissions(long userId);
        [HttpGet]
        Task<EditProfileInput> GetUserProfileForEdit();
        [HttpGet]
        Task<UpdateUserInput> GetUserForEdit(long? userId);

        [HttpGet]
        Task<UserRoleSelectorOutput> GetRolesForUser(long userId);
        [HttpPut]
        Task SetUserRoles(SetUserRolesInput input);
        [HttpPut]
        Task UpdateUserProfilePicture(long userId, string profilePicture);
        [HttpPut]
        Task ChangeUserPassword(ChangePasswordInput input);
        [HttpPut]
        Task UpdateUserProfile(EditProfileInput input);
        [HttpPut]
        Task EditUser(UpdateUserInput input);
        [HttpPut]
        Task ProhibitPermission(ProhibitPermissionInput input);
        [HttpPut]
        Task SetUserSpecialPermissions(SetUserSpecialPermissionsInput input);
        [HttpPut]
        Task RemoveUserFromRole(long userId, string roleName);
        [HttpPut]
        Task ResetPermissions(long userId);
        [HttpPut]
        Task UnlockUser(long userId);
        [HttpPut]
        Task LockUser(long userId);
        [HttpDelete]
        Task DeleteUser(long userId);
    }
}