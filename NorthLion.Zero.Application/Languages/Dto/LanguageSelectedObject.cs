using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.Languages.Dto
{
    public class LanguageSelectedObject
    {
        public LanguageSelectedObject(string displayName, string name, string icon)
        {
            DisplayName = displayName;
            Name = name;
            Icon = icon;
        }

        public string Name { get; private set; }
        public string DisplayName { get; private set; }
        public string Icon { get; private set; }
    }
}
