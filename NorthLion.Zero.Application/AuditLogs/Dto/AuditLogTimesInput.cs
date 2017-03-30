using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.AuditLogs.Dto
{
    public class AuditLogTimesInput
    {

        public int? Count { get; set; } = null;
        public int Code { get; set; } = 0;
        public int? TenantId { get; set; } = null;
    }
}
