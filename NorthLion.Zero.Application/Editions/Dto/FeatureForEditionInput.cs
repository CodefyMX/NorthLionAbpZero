using System.Collections.Generic;
using Abp.Application.Features;
using Abp.AutoMapper;
using Abp.UI.Inputs;
using Castle.Components.DictionaryAdapter;
using NorthLion.Zero.Editions.CustomEditionManager.CustomObj;

namespace NorthLion.Zero.Editions.Dto
{
    [AutoMap(typeof(Feature), typeof(TenantFeature))]
    public class FeatureForEditionInput
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool Selected { get; set; }
        public string DefaultValue { get; set; }
        public int EditionId { get; set; }
        public IInputType InputType { get; set; }
        public List<FeatureForEditionInput> ChildFeatures { get; set; } = new EditableList<FeatureForEditionInput>();
    }
}