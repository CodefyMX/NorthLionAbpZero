using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Languages.Dto
{
    public class GetLocalizationTextInput : PaginatedInputDto
    {
        public string Source { get; set; }
        public string SourceLang { get; set; }
        public string TargetLang { get; set; }
    }
}
