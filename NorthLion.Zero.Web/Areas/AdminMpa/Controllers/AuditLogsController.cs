using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.AuditLogs;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.Web.Controllers;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_AuditLogs)]
    public class AuditLogsController : ZeroControllerBase
    {
        private readonly IAuditLogAppService _auditLogAppService;

        public AuditLogsController(IAuditLogAppService auditLogAppService)
        {
            _auditLogAppService = auditLogAppService;
        }
        // GET: AdminMpa/AuditLogs
        public ActionResult Index(int? tenantId = null)
        {
            ViewBag.TenantId = tenantId;
            return View();
        }

        public async Task<ActionResult> GetLogDetails(int id)
        {
            var log = await _auditLogAppService.GetAuditLogDetails(id);
            return View(log);
        }
    }
}
