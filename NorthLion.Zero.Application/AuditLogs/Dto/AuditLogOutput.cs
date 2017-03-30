using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.AuditLogs.Dto
{
    public class AuditLogOutput : IPaginableResult
    {
        public IEnumerable<AuditLogDto> AuditLogs { get; set; }
        public string SearchString { get; set; }
        public int Page { get; set; }
        public int Rows { get; set; }
        public int RemainingPages { get; set; }
    }
}
