using Abp.Web.Mvc.Views;

namespace NorthLion.Zero.Web.Views
{
    public abstract class ZeroWebViewPageBase : ZeroWebViewPageBase<dynamic>
    {

    }

    public abstract class ZeroWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected ZeroWebViewPageBase()
        {
            LocalizationSourceName = ZeroConsts.LocalizationSourceName;
        }
    }
}