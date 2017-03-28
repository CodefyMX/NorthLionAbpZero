using System.Collections.Generic;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    public class EditionsForTenantOutput
    {
        public List<EditionDto> Editions { get; set; }
        public int TenantId { get; set; }
    }
}
