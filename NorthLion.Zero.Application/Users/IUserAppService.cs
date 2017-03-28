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
        [HttpPut]
        Task ProhibitPermission(ProhibitPermissionInput input);
        Task RemoveFromRole(long userId, string roleName);
        [HttpGet]
        Task<UsersOutput> GetUsers(PaginatedInputDto input);
        Task CreateUser(CreateUserInput input);
        [HttpPut]
        Task UpdateProfile(EditProfileInput input);
        [HttpPut]
        Task EditUser(UpdateUserInput input);
        [HttpGet]
        Task<UpdateUserInput> GetUserForEdit(long? userId);
        [HttpPut]
        Task SetUserRoles(SetUserRolesInput input);
        [HttpGet]
        Task<EditProfileInput> GetUserProfileForEdit();
        [HttpPut]
        Task UpdateUserProfilePicture(long userId, string profilePicture);
        [HttpPut]
        Task ChangeUserPassword(ChangePasswordInput input);
        [HttpGet]
        Task<CurrentUserPermissionsOutput> GetUserPermissions(long userId);
        Task ResetPermissions(long userId);
        Task UnlockUser(long userId);
        Task LockUser(long userId);
        Task DeleteUser(long userId);
    }
}