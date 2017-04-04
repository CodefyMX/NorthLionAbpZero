using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using NorthLion.Zero.Editions;
using NorthLion.Zero.Web.Controllers;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    public class EditionsController : ZeroControllerBase
    {
        private readonly IEditionAppService _editionAppService;

        public EditionsController(IEditionAppService editionAppService)
        {
            _editionAppService = editionAppService;
        }

        // GET: AdminMpa/Editions
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateEdition()
        {
            var edition = _editionAppService.GetEditionModelForCreation();
            return View(edition);
        }

        public async Task<ActionResult> EditEdition(int id)
        {
            var edition = await _editionAppService.GetEditionModelForEdit(id);
            return View(edition);
        }
    }
}