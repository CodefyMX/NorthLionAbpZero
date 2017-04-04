using System.Collections.Generic;
using Abp.Application.Features;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    public class FeaturesForTenant
    {
        public int TenantId { get; set; }
        public string DisplayName { get; set; }
        public List<FeatureDto> Features { get; set; }
        public decimal Price { get; set; }
        public string Name { get; set; }
    }
}
