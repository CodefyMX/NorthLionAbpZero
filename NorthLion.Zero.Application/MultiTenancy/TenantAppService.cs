using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.MultiTenancy;
using Abp.Runtime.Security;
using Abp.UI;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.Authorization.Roles;
using NorthLion.Zero.Editions;
using NorthLion.Zero.Editions.CustomEditionManager;
using NorthLion.Zero.MultiTenancy.Dto;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Users;

namespace NorthLion.Zero.MultiTenancy
{
    [AbpAuthorize(PermissionNames.Pages_Tenants)]
    public class TenantAppService : ZeroAppServiceBase, ITenantAppService
    {
        private readonly TenantManager _tenantManager;
        private readonly RoleManager _roleManager;
        private readonly EditionManager _editionManager;
        private readonly ICustomEditionManager _customEditionManager;
        private readonly IAbpZeroDbMigrator _abpZeroDbMigrator;

        public TenantAppService(
            TenantManager tenantManager,
            RoleManager roleManager,
            EditionManager editionManager,
            IAbpZeroDbMigrator abpZeroDbMigrator, ICustomEditionManager customEditionManager)
        {
            _tenantManager = tenantManager;
            _roleManager = roleManager;
            _editionManager = editionManager;
            _abpZeroDbMigrator = abpZeroDbMigrator;
            _customEditionManager = customEditionManager;
        }

        public async Task CreateTenant(CreateTenantInput input)
        {
            //Create tenant
            var tenant = input.MapTo<Tenant>();
            tenant.ConnectionString = input.ConnectionString.IsNullOrEmpty()
                ? null
                : SimpleStringCipher.Instance.Encrypt(input.ConnectionString);

            var defaultEdition = await _editionManager.FindByNameAsync(EditionManager.DefaultEditionName);
            if (defaultEdition != null)
            {
                tenant.EditionId = defaultEdition.Id;
            }

           await TenantManager.CreateAsync(tenant);
            await CurrentUnitOfWork.SaveChangesAsync(); //To get new tenant's id.

            //Create tenant database
            _abpZeroDbMigrator.CreateOrMigrateForTenant(tenant);

            //We are working entities of new tenant, so changing tenant filter
            using (CurrentUnitOfWork.SetTenantId(tenant.Id))
            {
                //Create static roles for new tenant
                CheckErrors(await _roleManager.CreateStaticRoles(tenant.Id));

                await CurrentUnitOfWork.SaveChangesAsync(); //To get static role ids

                //grant all permissions to admin role
                var adminRole = _roleManager.Roles.Single(r => r.Name == StaticRoleNames.Tenants.Admin);
                await _roleManager.GrantAllPermissionsAsync(adminRole);

                //Create admin user for the tenant
                var adminUser = User.CreateTenantAdminUser(tenant.Id, input.AdminEmailAddress, User.DefaultPassword);
                CheckErrors(await UserManager.CreateAsync(adminUser));
                await CurrentUnitOfWork.SaveChangesAsync(); //To get admin user's id

                //Assign admin user to role!
                CheckErrors(await UserManager.AddToRoleAsync(adminUser.Id, adminRole.Name));
                await CurrentUnitOfWork.SaveChangesAsync();
            }
        }

        public async Task<EditionsForTenantOutput> GetEditionsForTenant(int tenantId)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete);
            }
            var allEditions = _editionManager.Editions.ToList();
            var editionCList = new List<EditionDto>();
            foreach (var allEdition in allEditions)
            {
                var mappedEdition = allEdition.MapTo<EditionDto>();

                mappedEdition.IsEnabledForTenant = await IsThisEditionActive(tenantId, allEdition.Id);

                editionCList.Add(mappedEdition);
            }
            return new EditionsForTenantOutput()
            {
                Editions = editionCList,
                TenantId = tenantId
            };
        }

        public async Task SetFeatureValuesForTenant(SetTenantValuesForTenantInput input)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete);
            }
            var tenant = await TenantManager.GetByIdAsync(input.TenantId);

            foreach (var inputFeature in input.Features)
            {
                await TenantManager.SetFeatureValueAsync(tenant, inputFeature.Name, inputFeature.DefaultValue);
            }
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task SetTenantEdition(SetTenantEditionInput input)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete);
            }
            var tenant = await TenantManager.GetByIdAsync(input.TenantId);
            var edition = await _editionManager.FindByIdAsync(input.EditionId);
            if (edition != null)
            {
                tenant.EditionId = edition.Id;
            }
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task<FeaturesForTenant> GetFeaturesForTenant(int tenantId)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete);
            }
            var tenant = await TenantManager.GetByIdAsync(tenantId);

            if (tenant.EditionId == null) throw new UserFriendlyException(L("NoEditionIsSetForTenant"));

            var edition = await _editionManager.FindByIdAsync(tenant.EditionId.Value);
            var features = await _customEditionManager.GetAllFeatures(edition.Id, tenantId);
            return new FeaturesForTenant()
            {
                Features = features.Select(a => a.MapTo<FeatureDto>()).ToList(),
                TenantId = tenantId
            };
        }

        public async Task ResetFeatures(int tenantId)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete);
            }
            var tenant = await TenantManager.GetByIdAsync(tenantId);

            if (tenant.EditionId == null) throw new UserFriendlyException(L("NoEditionIsSetForTenant"));

            var editionFeatures = await _editionManager.GetFeatureValuesAsync(tenant.EditionId.Value);

            await TenantManager.SetFeatureValuesAsync(tenantId, editionFeatures.ToArray());
        }

        public async Task<TenantsOutput> GetTenants(PaginatedInputDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete))
            {
                if (input.GetAll) return GetAllTenants;
                await Task.FromResult(0);
                var tenants = _tenantManager.Tenants.WhereIf(!input.SearchString.IsNullOrEmpty(),
                    a => a.Name.ToUpper().Contains(input.SearchString.ToUpper())).ToList();
                return new TenantsOutput()
                {
                    Tenants = tenants.Select(a => a.MapTo<TenantListDto>())
                };
            }
        }

        public TenantsOutput GetAllTenants
        {
            get
            {
                return new TenantsOutput()
                {
                    Tenants = _tenantManager.Tenants.ToList().Select(a => a.MapTo<TenantListDto>())
                };
            }
        }

        public async Task<EditTenantInput> GetTenantForEdit(int tenantId)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete);
            }
            var tenant = await TenantManager.GetByIdAsync(tenantId);

            return tenant.MapTo<EditTenantInput>();
        }

        public async Task DeleteTenant(int tenantId)
        {
            var tenant = await TenantManager.FindByIdAsync(tenantId);
            await TenantManager.DeleteAsync(tenant);

        }

        public async Task RestoreTenant(int tenantId)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete);
            }
            var tenant = await TenantManager.FindByIdAsync(tenantId);

            tenant.IsDeleted = false;

            await TenantManager.UpdateAsync(tenant);
        }
        #region Helpers
        private async Task<bool> IsThisEditionActive(int tenantId, int editionId)
        {

            var tenant = await TenantManager.GetByIdAsync(tenantId);

            return tenant.EditionId == editionId;

        }
        #endregion
    }
}