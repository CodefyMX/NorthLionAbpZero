using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.Roles;
using NorthLion.Zero.Web.Controllers;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Roles)]
    public class RolesController : ZeroControllerBase
    {
        private readonly IRoleAppService _roleAppService;

        public RolesController(IRoleAppService roleAppService)
        {
            _roleAppService = roleAppService;
        }

        // GET: AdminMpa/Roles
        public ActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> EditRole(int id)
        {
            var roleForEdit =await  _roleAppService.GetRoleForEdit(id);
            return View(roleForEdit);
        }

        public ActionResult CreateRole()
        {
            var roleInputModel = _roleAppService.GetRoleCreateModel();
            return View(roleInputModel);
        }
    }
}