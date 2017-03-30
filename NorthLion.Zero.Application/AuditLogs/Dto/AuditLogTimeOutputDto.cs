using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.AutoMapper;

namespace NorthLion.Zero.AuditLogs.Dto
{
    [AutoMapFrom(typeof(AuditLog))]
    public class AuditLogTimeOutputDto : EntityDto<long>
    {
        public string MethodName { get; set; }
        public int ExecutionDuration { get; set; }
        public int Hour { get; set; }
        public string BrowserInfo { get; set; }
    }
}