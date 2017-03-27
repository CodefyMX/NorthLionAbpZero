using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using NorthLion.Zero.MultiTenancy.Dto;

namespace NorthLion.Zero.MultiTenancy
{
    public interface ITenantAppService : IApplicationService
    {
        ListResultDto<TenantListDto> GetTenants();

        Task CreateTenant(CreateTenantInput input);
    }
}
