using System.Collections.Generic;
using System.Linq;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    public class TenantsOutput
    {
        public IEnumerable<TenantListDto> Tenants { get; set; }
    }
}
