using NorthLion.Zero.Web.Controllers;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.Authorization;
using NorthLion.Zero.Languages;
using NorthLion.Zero.Languages.Dto;

namespace NorthLion.Zero.Web.Areas.AdminMpa.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Languages)]
    public class LanguagesController : ZeroControllerBase
    {
        private readonly ILanguageAppService _languageAppService;

        public LanguagesController(ILanguageAppService languageAppService)
        {
            _languageAppService = languageAppService;
        }

        // GET: AdminMpa/Languages
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateLanguage()
        {
            
            return View();
        }

        public ActionResult EditTexts(string name, string currentLang)
        {
            var langTexts = _languageAppService.GetLanguageTextsForEditView(name, currentLang);
            return View(langTexts);
        }

        public ActionResult GetLocalizationTexts(string source, string targetLang, string sourceLang)
        {
            var response = _languageAppService.GetLocalizationTexts(new GetLocalizationTextInput()
            {
                   Source = source,
                   SourceLang = sourceLang,
                   TargetLang = targetLang
            });
            return Json(response,JsonRequestBehavior.AllowGet);
        }

        public ActionResult EditText(LanguageTextEditInput input)
        {
            return View(input);
        }
    }
}