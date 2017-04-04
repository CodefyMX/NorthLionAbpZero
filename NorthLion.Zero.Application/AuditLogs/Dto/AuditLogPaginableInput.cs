using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.AuditLogs.Dto
{
    public class AuditLogPaginableInput : PaginatedInputDto
    {
        public int? TenantId { get; set; }
    }
}
