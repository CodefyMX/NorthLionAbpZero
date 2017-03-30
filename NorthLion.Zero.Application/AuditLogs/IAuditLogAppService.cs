using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.AutoMapper;
using NorthLion.Zero.AuditLogs.Dto;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.AuditLogs
{
    public interface IAuditLogAppService : IApplicationService
    {
        [HttpGet]
        Task<AuditLogOutput> GetLatestAuditLogOutput();
        [HttpGet]
        Task<AuditLogOutput> GetAuditLogTable(PaginatedInputDto input);
        [HttpGet]
        Task<AuditLogDto> GetAuditLogDetails(long id);
        [HttpGet]
        AuditLogTimeOutput GetAuditLogTimes(AuditLogTimesInput input);
        [HttpGet]
        Task<AuditLogOutput> GetLatestAuditLogOutputForTenant(long tenantId);
        [HttpGet]
        Task<AuditLogOutput> GetAuditLogTableForTenant(PaginatedInputDto input, int tenantId);
        [HttpGet]
        Task<AuditLogDto> GetAuditLogDetailsForTenant(long id, int tenantId);
    }

    
}
