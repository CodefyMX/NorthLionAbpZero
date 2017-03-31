using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace NorthLion.Zero.Authorization
{
    public class ZeroAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //Common permissions
            var pages = context.GetPermissionOrNull(PermissionNames.Pages);
            if (pages == null)
            {
                pages = context.CreatePermission(PermissionNames.Pages, L("Pages"));
            }

            var users = pages.CreateChildPermission(PermissionNames.Pages_Users, L("Users"));
            var roles = pages.CreateChildPermission(PermissionNames.Pages_Roles, L("Roles"));
            var languages = pages.CreateChildPermission(PermissionNames.Pages_Languages, L("Languages"));
            var auditLogs = pages.CreateChildPermission(PermissionNames.Pages_AuditLogs, L("AuditLogs"));
            //Host permissions
            var tenants = pages.CreateChildPermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, ZeroConsts.LocalizationSourceName);
        }
    }
}
