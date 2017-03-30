using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.AuditLogs.Dto
{
    public class AuditLogTimeOutput
    {

        public string AvgExecutionTime { get; set; }
        public int TotalRequestsReceived { get; set; }
        public List<AuditLogTimeOutputDto> AuditLogTimeOutputDtos { get; set; }
    }
}
