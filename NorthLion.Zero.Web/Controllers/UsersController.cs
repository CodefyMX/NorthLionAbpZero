using System.Threading.Tasks;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.PaginatedModel;
using NorthLion.Zero.Users;

namespace NorthLion.Zero.Web.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Users)]
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
    }
}