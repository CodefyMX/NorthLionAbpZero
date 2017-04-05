using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Features;
using Abp.UI.Inputs;

namespace NorthLion.Zero.Features
{
    public class DefaultFeatureProvider : FeatureProvider
    {
        public override void SetFeatures(IFeatureDefinitionContext context)
        {
            context.Create("SampleParentText", defaultValue: "Configuration", inputType: new SingleLineStringInputType());
            var sampleBooleanFeature = context.Create("SampleBooleanFeature", defaultValue: "false", inputType: new CheckboxInputType());
            sampleBooleanFeature.CreateChildFeature("SampleNumericFeature", defaultValue: "10", inputType: new SingleLineStringInputType());
            context.Create("SampleSelectionFeature", defaultValue: "B");
        }
    }
}
