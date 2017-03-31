using NorthLion.Zero.Web.Controllers;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.Authorization;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Languages)]
    public class LanguagesController : ZeroControllerBase
    {
        // GET: AdminMpa/Languages
        public ActionResult Index()
        {
            return View();
        }
    }
}