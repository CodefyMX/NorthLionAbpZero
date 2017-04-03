using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.UI.Inputs;
using Castle.Components.DictionaryAdapter;

namespace NorthLion.Zero.Editions.CustomEditionManager.CustomObj
{
    public class TenantFeature
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool Selected { get; set; }
        public string DefaultValue { get; set; }
        public int EditionId { get; set; }
        public IInputType InputType { get; set; }
        public List<TenantFeature> ChildFeatures { get; set; } = new EditableList<TenantFeature>();
    }
}
