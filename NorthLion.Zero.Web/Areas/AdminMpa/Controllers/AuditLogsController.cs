using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NorthLion.Zero.Web.Controllers;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    public class AuditLogsController : ZeroControllerBase
    {
        // GET: AdminMpa/AuditLogs
        public ActionResult Index()
        {
            return View();
        }
    }
}
