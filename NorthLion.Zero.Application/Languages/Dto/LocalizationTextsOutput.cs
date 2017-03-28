using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Languages.Dto
{
    public class LocalizationTextsOutput : IPaginableResult
    {
        public string SearchString { get; set; }
        public int Page { get; set; }
        public int Rows { get; set; }
        public int RemainingPages { get; set; }
        public List<LanguageTextTableElement> Texts { get; set; }
    }
}
