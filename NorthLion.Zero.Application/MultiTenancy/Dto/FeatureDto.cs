using System.Collections.Generic;
using Abp.AutoMapper;
using Abp.UI.Inputs;
using Castle.Components.DictionaryAdapter;
using NorthLion.Zero.Editions.CustomEditionManager.CustomObj;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    [AutoMap(typeof(TenantFeature))]
    public class FeatureDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool Selected { get; set; }
        public string DefaultValue { get; set; }
        public int EditionId { get; set; }
        public IInputType InputType { get; set; }
        public List<FeatureDto> ChildFeatures { get; set; } = new EditableList<FeatureDto>();
    }
}