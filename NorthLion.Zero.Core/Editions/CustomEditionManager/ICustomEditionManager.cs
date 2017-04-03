using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Services;
using NorthLion.Zero.Editions.CustomEditionManager.CustomObj;

namespace NorthLion.Zero.Editions.CustomEditionManager
{
    public interface ICustomEditionManager : IDomainService
    {
        List<TenantFeature> GetAllFeatures(int? id = null);
        Task<List<TenantFeature>> GetAllFeatures(int editionId, int tenantId);
    }
}
