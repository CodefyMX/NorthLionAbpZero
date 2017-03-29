using NorthLion.Zero.Web.Controllers;
using System.Web.Mvc;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    public class UsersController : ZeroControllerBase
    {
        // GET: AdminMpa/Users
        public ActionResult Index()
        {
            return View();
        }
    }
}