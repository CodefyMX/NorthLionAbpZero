using System.Web.Mvc;

namespace NorthLion.Zero.Web.Areas.AdminMpa
{
    public class AdminMpaAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AdminMpa";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AdminMpa_default",
                "AdminMpa/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }, new[] { "NorthLion.Zero.Web.Areas.AdminMpa.Controllers" }
            );
        }
    }
}