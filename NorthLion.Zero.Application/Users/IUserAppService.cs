using Abp.Application.Services;
using Abp.Application.Services.Dto;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Users.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace NorthLion.Zero.Users
{
    public interface IUserAppService : IApplicationService
    {
        Task ProhibitPermission(ProhibitPermissionInput input);
        Task SetUserSpecialPermissions(SetUserSpecialPermissionsInput input);
        Task RemoveFromRole(long userId, string roleName);
        Task<UsersOutput> GetUsers(PaginatedInputDto input);
        Task CreateUser(CreateUserInput input);
        Task UpdateProfile(EditProfileInput input);
        Task EditUser(UpdateUserInput input);
        Task<UpdateUserInput> GetUserForEdit(long? userId);
        Task SetUserRoles(SetUserRolesInput input);
        Task<EditProfileInput> GetUserProfileForEdit();
        Task UpdateUserProfilePicture(long userId, string profilePicture);
        Task ChangeUserPassword(ChangePasswordInput input);
        Task<CurrentUserPermissionsOutput> GetUserPermissions(long userId);
        Task ResetPermissions(long userId);
        Task UnlockUser(long userId);
        Task LockUser(long userId);
        Task DeleteUser(long userId);
    }
}