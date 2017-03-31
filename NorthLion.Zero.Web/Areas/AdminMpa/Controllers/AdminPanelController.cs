using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.Web.Controllers;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages)]
    public class AdminPanelController : ZeroControllerBase
    {
        // GET: AdminMpa/AdminPanel
        public ActionResult Index()
        {
            return View();
        }
    }
}
