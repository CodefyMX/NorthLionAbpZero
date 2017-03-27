using System.Threading.Tasks;
using Abp.Application.Services;
using NorthLion.Zero.Roles.Dto;

namespace NorthLion.Zero.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task UpdateRolePermissions(UpdateRolePermissionsInput input);
    }
}
