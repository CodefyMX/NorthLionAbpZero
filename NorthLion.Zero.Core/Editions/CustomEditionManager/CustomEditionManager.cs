using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Features;
using Abp.Domain.Services;
using Abp.MultiTenancy;
using Abp.Threading;
using NorthLion.Zero.Editions.CustomEditionManager.CustomObj;
using NorthLion.Zero.MultiTenancy;

namespace NorthLion.Zero.Editions.CustomEditionManager
{
    public class CustomEditionManager : DomainService, ICustomEditionManager
    {
        //Todo: check this....
        private readonly EditionManager _editionManager;
        private readonly TenantManager _tenantManager;

        public CustomEditionManager(EditionManager editionManager, TenantManager tenantManager)
        {
            _editionManager = editionManager;
            _tenantManager = tenantManager;
        }

        public List<TenantFeature> GetAllFeatures(int? id = null)
        {
            var featuresFromDb = _editionManager.FeatureManager.GetAll().Where(a => a.Parent == null).ToList();
            var featuresResult = featuresFromDb.Select(a => new TenantFeature()
            {
                DefaultValue = GetDefaultValue(id, a.Name),
                EditionId = 0,
                Name = a.Name,
                Selected = IsEnabledInEdition(id, a.Name),
                InputType = a.InputType,
                ChildFeatures = GetChildrens(a.Children, id)
            }).ToList();
            return featuresResult;
        }

        public async Task<List<TenantFeature>> GetAllFeatures(int editionId, int tenantId)
        {
            var tenant = await _tenantManager.GetByIdAsync(tenantId);

            var featuresFromDb = _editionManager.FeatureManager.GetAll().Where(a => a.Parent == null).ToList();
            var featuresResult = featuresFromDb.Select(a => new TenantFeature()
            {
                DefaultValue = tenant == null ? GetDefaultValue(editionId, a.Name) : GetDefaultValue(editionId, tenantId, a.Name),
                EditionId = 0,
                Name = a.Name,
                Selected = tenant == null ? IsEnabledInEdition(editionId, a.Name) : IsEnabledInTenant(tenantId, a.Name),
                InputType = a.InputType,
                ChildFeatures = tenant == null ? GetChildrens(a.Children, editionId) : GetChildrens(a.Children, editionId, tenantId),
            }).ToList();
            return featuresResult;
        }
        private List<TenantFeature> GetChildrens(IReadOnlyList<Feature> argChildren, int editionId, int tenantId)
        {
            var listFeatureDto = new List<TenantFeature>();
            foreach (var argChild in argChildren)
            {
                listFeatureDto.Add(new TenantFeature()
                {
                    Name = argChild.Name,
                    InputType = argChild.InputType,
                    Selected = IsEnabledInTenant(tenantId, argChild.Name),
                    DefaultValue = GetDefaultValue(editionId, tenantId, argChild.Name),
                    ChildFeatures = GetChildrens(argChild.Children, editionId, tenantId)
                });
            }
            return listFeatureDto;
        }
        private bool IsEnabledInTenant(int tenantId, string argChildName)
        {
            var feature = AsyncHelper.RunSync(() => _tenantManager.GetFeatureValueOrNullAsync(tenantId, argChildName));

            bool isBool;

            var boolVal = bool.TryParse(feature, out isBool);

            if (isBool) return boolVal;

            return feature != null;
        }
        private string GetDefaultValue(int editionId, int tenantId, string argName)
        {
            var value = _tenantManager.GetFeatureValueOrNull(tenantId, argName);

            if (value == null)
            {
                return GetDefaultValue(editionId, argName);
            }

            return value;
        }
        private List<TenantFeature> GetChildrens(IReadOnlyList<Feature> argChildren, int? id)
        {
            var listFeatureDto = new List<TenantFeature>();
            foreach (var argChild in argChildren)
            {
                listFeatureDto.Add(new TenantFeature()
                {
                    Name = argChild.Name,
                    InputType = argChild.InputType,
                    Selected = IsEnabledInEdition(id, argChild.Name),
                    DefaultValue = GetDefaultValue(id, argChild.Name),
                    ChildFeatures = GetChildrens(argChild.Children, id)
                });
            }
            return listFeatureDto;
        }
        private bool IsEnabledInEdition(int? id, string featureName)
        {
            if (!id.HasValue) return false;
            var feature = AsyncHelper.RunSync(() => _editionManager.GetFeatureValueOrNullAsync(id.Value, featureName));
            return feature != null;
        }
        private string GetDefaultValue(int? id, string argName)
        {
            if (!id.HasValue)
            {
                return _editionManager.FeatureManager.GetOrNull(argName).DefaultValue;
            }
            var value = AsyncHelper.RunSync(() => _editionManager.GetFeatureValueOrNullAsync(id.Value, argName));

            return value ?? _editionManager.FeatureManager.GetOrNull(argName).DefaultValue;
        }
    }
}
