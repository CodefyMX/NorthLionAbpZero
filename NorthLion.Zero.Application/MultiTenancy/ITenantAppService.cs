using System.Threading.Tasks;
using System.Web.Http;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using NorthLion.Zero.MultiTenancy.Dto;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.MultiTenancy
{
    public interface ITenantAppService : IApplicationService
    {
        [HttpPost]
        Task CreateTenant(CreateTenantInput input);
        [HttpGet]
        Task<EditionsForTenantOutput> GetEditionsForTenant(int tenantId);
        [HttpPut]
        Task SetFeatureValuesForTenant(SetTenantValuesForTenantInput input);
        [HttpPut]
        Task SetTenantEdition(SetTenantEditionInput input);
        [HttpGet]
        Task<FeaturesForTenant> GetFeaturesForTenant(int tenantId);
        [HttpPut]
        Task ResetFeatures(int tenantId);
        [HttpGet]
        Task<TenantsOutput> GetTenants(PaginatedInputDto input);
        [HttpGet]
        Task<EditTenantInput> GetTenantForEdit(int tenantId);
        [HttpDelete]
        Task DeleteTenant(int tenantId);
        [HttpPut]
        Task RestoreTenant(int tenantId);
    }
}
