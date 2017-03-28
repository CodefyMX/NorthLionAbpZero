using Abp.Application.Services;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Roles.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace NorthLion.Zero.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        [HttpPost]
        Task CreateRole(CreateRoleInput input);
        [HttpGet]
        Task<RolesOutput> GetRoles(PaginatedInputDto input);
        [HttpGet]
        Task<UpdateRoleInput> GetRoleForEdit(int id);
        [HttpPut]
        Task UpdateRolePermissions(UpdateRolePermissionsInput input);
        [HttpPut]
        Task UpdateRole(UpdateRoleInput input);
        [HttpDelete]
        Task DeleteRole(int roleId);
        
    }
}
