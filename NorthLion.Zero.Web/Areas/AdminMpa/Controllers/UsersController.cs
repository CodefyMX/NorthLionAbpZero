using System.Threading.Tasks;
using NorthLion.Zero.Web.Controllers;
using System.Web.Mvc;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Users;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    public class UsersController : ZeroControllerBase
    {
        private readonly IUserAppService _userAppService;

        public UsersController(IUserAppService userAppService)
        {
            _userAppService = userAppService;
        }

        public async Task<ActionResult> Index(PaginatedInputDto input)
        {
            var output = await _userAppService.GetUsers(input);
            return View(output);
        }

        public async Task<JsonResult> GetUsers(PaginatedInputDto input)
        {
            var output = await _userAppService.GetUsers(input);
            return Json(output, JsonRequestBehavior.AllowGet);
        }

    }
}