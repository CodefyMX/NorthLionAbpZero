using NorthLion.Zero.Web.Controllers;
using System.Web.Mvc;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    public class TenantsController : ZeroControllerBase
    {
        // GET: AdminMpa/Tenants
        public ActionResult Index()
        {
            return View();
        }
    }
}