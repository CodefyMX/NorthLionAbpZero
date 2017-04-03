using System.Collections.Generic;
using Castle.Components.DictionaryAdapter;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    public class FeaturesForTenant
    {
        public List<EditionDto> Editions { get; set; } = new EditableList<EditionDto>();
        public int TenantId { get; set; }
    }
}
