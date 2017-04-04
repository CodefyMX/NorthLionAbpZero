using System.Collections.Generic;

namespace NorthLion.Zero.Editions.Dto
{
    public class CreateEditionInput
    {
        public string DisplayName { get; set; }
        public string Name { get; set; }
        public List<FeatureForEditionInput> Features { get; set; }
    }
}