using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Editions.Dto
{
    public class EditionOutput : IPaginableResult
    {
        public List<EditionOutputDto> Editions { get; set; }
        public string SearchString { get; set; }
        public int Page { get; set; }
        public int Rows { get; set; }
        public int RemainingPages { get; set; }
    }
}
