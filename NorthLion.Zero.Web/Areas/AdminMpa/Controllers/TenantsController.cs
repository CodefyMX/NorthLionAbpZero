using NorthLion.Zero.Web.Controllers;
using System.Web.Mvc;
using NorthLion.Zero.MultiTenancy;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    public class TenantsController : ZeroControllerBase
    {
        private readonly ITenantAppService _tenantAppService;

        public TenantsController(ITenantAppService tenantAppService)
        {
            _tenantAppService = tenantAppService;
        }

        // GET: AdminMpa/Tenants
        public ActionResult Index()
        {
            return View();
        }
    }
}