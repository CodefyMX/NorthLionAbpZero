using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.MultiTenancy;

namespace NorthLion.Zero.Web.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Tenants)]
    public class TenantsController : ZeroControllerBase
    {
        private readonly ITenantAppService _tenantAppService;

        public TenantsController(ITenantAppService tenantAppService)
        {
            _tenantAppService = tenantAppService;
        }

        public ActionResult Index()
        {
            var output = _tenantAppService.GetTenants();
            return View(output);
        }
    }
}