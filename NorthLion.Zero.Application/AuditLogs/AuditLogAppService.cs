using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using NorthLion.Zero.AuditLogs.Dto;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.AuditLogs
{
    [DisableAuditing]
    public class AuditLogAppService :ZeroAppServiceBase, IAuditLogAppService
    {
        private readonly IRepository<AuditLog, long> _auditLogRepository;


        public AuditLogAppService(IRepository<AuditLog, long> auditLogRepository)
        {
            _auditLogRepository = auditLogRepository;
        }

        public async Task<AuditLogOutput> GetLatestAuditLogOutput()
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
            }
            var list = new List<AuditLogDto>();
            var logs = _auditLogRepository.GetAll().OrderByDescending(a => a.ExecutionTime).Take(10).ToList();
            foreach (var auditLog in logs)
            {
                var name = "Client";
                if (auditLog.UserId.HasValue)
                {
                    var user = await UserManager.GetUserByIdAsync(auditLog.UserId.Value);
                    name = user.UserName;
                }
                var log = auditLog.MapTo<AuditLogDto>();
                log.UserName = name;
                list.Add(log);
            }
            return new AuditLogOutput()
            {
                AuditLogs = list
            };
        }

        public async Task<AuditLogOutput> GetAuditLogTable(PaginatedInputDto input)
        {
            if (input.GetAll) return AllAuditLogs;
            //Todo:Pagination logic
            throw new NotImplementedException();
        }

        private AuditLogOutput AllAuditLogs
        {
            get
            {
                return new AuditLogOutput()
                {
                    AuditLogs = _auditLogRepository.GetAll().ToList().Select(a=>a.MapTo<AuditLogDto>())
                };
            }
        }
        public async Task<AuditLogDto> GetAuditLogDetails(long id)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
            }
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete))
            {
                var auditLog = await _auditLogRepository.FirstOrDefaultAsync(a => a.Id == id);

                if (auditLog == null) return new AuditLogDto();

                var mapped = auditLog.MapTo<AuditLogDto>();
                mapped.UserName = auditLog.UserId != null
                    ? (await UserManager.GetUserByIdAsync(auditLog.UserId.Value)).UserName
                    : "Client";
                return mapped;
            }
        }
        /// <summary>
        /// Todo:Refactor
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public AuditLogTimeOutput GetAuditLogTimes(AuditLogTimesInput input)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
            }
            var data = _auditLogRepository.GetAll().OrderByDescending(a => a.ExecutionTime);
            var listOfData = new List<AuditLogTimeOutputDto>();
            var query = from ex in data
                        where DbFunctions.TruncateTime(ex.ExecutionTime) == DbFunctions.TruncateTime(DateTime.Now)
                        select ex;

            if (input.TenantId.HasValue)
            {
                query = query.Where(a => a.TenantId == input.TenantId);
            }
            //0 = all
            //1 = only ex
            //2 = only success
            if (input.Code == 1)
            {
                query = query.Where(a => !string.IsNullOrEmpty(a.Exception));
            }
            if (input.Code == 2)
            {
                query = query.Where(a => string.IsNullOrEmpty(a.Exception));
            }
            var inMemoryData = query.Take(input.Count ?? 100).ToList();
            foreach (var auditLog in inMemoryData)
            {
                listOfData.Add(new AuditLogTimeOutputDto()
                {
                    BrowserInfo = auditLog.BrowserInfo,
                    ExecutionDuration = auditLog.ExecutionDuration,
                    Id = auditLog.Id,
                    MethodName = auditLog.MethodName,

                });
            }
            double? avg = null;
            var totalCalls = 0;
            if (data.Any())
            {


                if (input.TenantId.HasValue)
                {
                    var tenantId = input.TenantId.Value;

                    var dataForTenant = data.Where(a => a.TenantId == tenantId).ToList();

                    if (dataForTenant.Any())
                    {
                        avg = dataForTenant.Average(a => a.ExecutionDuration);
                        totalCalls = data.Count(a => a.TenantId == input.TenantId);
                    }
                }

                else
                {
                    avg = data.Average(a => a.ExecutionDuration);
                    totalCalls = data.Count();
                }

            }
            return new AuditLogTimeOutput()
            {
                TotalRequestsReceived = totalCalls,
                AuditLogTimeOutputDtos = listOfData,
                AvgExecutionTime = avg?.ToString("##.#") ?? ""
            };
        }

        public async Task<AuditLogOutput> GetLatestAuditLogOutputForTenant(long tenantId)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
            }
            var list = new List<AuditLogDto>();
            var logs =
                _auditLogRepository.GetAll()
                    .Where(a => a.TenantId == tenantId)
                    .OrderByDescending(a => a.ExecutionTime)
                    .Take(10)
                    .ToList();
            foreach (var auditLog in logs)
            {
                var name = "Client";
                if (auditLog.UserId.HasValue)
                {
                    var user = await UserManager.GetUserByIdAsync(auditLog.UserId.Value);
                    name = user.UserName;
                }
                var log = auditLog.MapTo<AuditLogDto>();
                log.UserName = name;
                list.Add(log);
            }
            return new AuditLogOutput()
            {
                AuditLogs = list
            };
        }

        public Task<AuditLogOutput> GetAuditLogTableForTenant(PaginatedInputDto input, int tenantId)
        {
            throw new NotImplementedException();
        }

        public async Task<AuditLogDto> GetAuditLogDetailsForTenant(long id, int tenantId)
        {
            if (AbpSession.TenantId == null)
            {
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant);
                CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant);
            }
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete))
            {
                var auditLog = await _auditLogRepository.FirstOrDefaultAsync(a => a.Id == id && a.TenantId == tenantId);

                if (auditLog == null) return new AuditLogDto();
                var mapped = auditLog.MapTo<AuditLogDto>();
                mapped.UserName = auditLog.UserId != null
                    ? (await UserManager.GetUserByIdAsync(auditLog.UserId.Value)).UserName
                    : "Client";
                return mapped;
            }
        }
    }
}
