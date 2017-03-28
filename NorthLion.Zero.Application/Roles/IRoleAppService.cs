using Abp.Application.Services;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Roles.Dto;
using System.Threading.Tasks;

namespace NorthLion.Zero.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task UpdateRolePermissions(UpdateRolePermissionsInput input);
        Task<UpdateRoleInput> GetRoleForEdit(int id);
        Task CreateRole(CreateRoleInput input);
        Task UpdateRole(UpdateRoleInput input);
        Task DeleteRole(int roleId);
        Task<RolesOutput> GetRoles(PaginatedInputDto input);
    }
}
