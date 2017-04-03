using System.Threading.Tasks;
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

        public async Task<ActionResult> SetEdition(int id)
        {
            var editions = await _tenantAppService.GetEditionsForTenant(id);
            return View(editions);
        }
        public async Task<ActionResult> SetFeatures(int id)
        {
            var features = await _tenantAppService.GetFeaturesForTenant(id);
            return View(features);
        }

        public ActionResult EditTenant(int id)
        {
            return View();
        }
    }
}