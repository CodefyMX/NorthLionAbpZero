using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.Components.DictionaryAdapter;

namespace NorthLion.Zero.PaginatedModel
{
    public class PaginatedResultDto<T> where T : class
    {
        public List<T> Items { get; set; } = new EditableList<T>();
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int CurrentPageRows { get; set; }
    }
}
