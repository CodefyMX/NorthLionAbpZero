using NorthLion.Zero.Web.Controllers;
using System.Web.Mvc;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    public class LanguagesController : ZeroControllerBase
    {
        // GET: AdminMpa/Languages
        public ActionResult Index()
        {
            return View();
        }
    }
}