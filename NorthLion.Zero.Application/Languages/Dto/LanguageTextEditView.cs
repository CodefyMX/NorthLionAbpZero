using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.Languages.Dto
{
    public class LanguageTextEditView
    {
        public List<string> Source { get; set; }
        public string LanguageName { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public List<LanguageSelectedObject> SourceLanguages { get; set; }
        public List<LanguageSelectedObject> TargetLanguages { get; set; }
        public string SelectedSourceLanguage { get; set; }
        public string SelectedTargetLanguage { get; set; }
    }
}
