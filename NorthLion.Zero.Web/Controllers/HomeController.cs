using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using NorthLion.Zero.BackUpService;

namespace NorthLion.Zero.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : ZeroControllerBase
    {
        private readonly IBackUpService _backUpService;

        public HomeController(IBackUpService backUpService)
        {
            _backUpService = backUpService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BackUpDataBase()
        {
            _backUpService.BackupDb();
            return View();
        }
    }
}