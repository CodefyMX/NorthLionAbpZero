using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using NorthLion.Zero.MultiTenancy.Dto;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.MultiTenancy
{
    public interface ITenantAppService : IApplicationService
    {
        Task CreateTenant(CreateTenantInput input);
        Task<EditionsForTenantOutput> GetEditionsForTenant(int tenantId);
        Task SetFeatureValuesForTenant(SetTenantValuesForTenantInput input);
        Task SetTenantEdition(SetTenantEditionInput input);
        Task<FeaturesForTenant> GetFeaturesForTenant(int tenantId);
        Task ResetFeatures(int tenantId);
        Task<TenantsOutput> GetTenants(PaginatedInputDto input);
        Task<EditTenantInput> GetTenantForEdit(int tenantId);
        Task DeleteTenant(int tenantId);
        Task RestoreTenant(int tenantId);
    }
}
