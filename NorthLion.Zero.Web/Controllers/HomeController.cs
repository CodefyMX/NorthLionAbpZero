using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;

namespace NorthLion.Zero.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : ZeroControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}