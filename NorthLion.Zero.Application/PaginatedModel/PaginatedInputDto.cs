using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.PaginatedModel
{
    public class PaginatedInputDto
    {
        public string SearchString { get; set; }
        public int Page { get; set; } = 0;
        public int RowsPerPage { get; set; } = 10;
    }
}
