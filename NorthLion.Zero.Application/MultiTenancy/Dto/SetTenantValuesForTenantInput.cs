using System.Collections;
using System.Collections.Generic;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    public class SetTenantValuesForTenantInput
    {
        public int TenantId { get; set; }
        public IEnumerable<FeatureInput> Features { get; set; }
    }
}
