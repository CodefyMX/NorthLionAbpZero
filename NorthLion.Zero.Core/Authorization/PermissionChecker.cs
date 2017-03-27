using Abp.Authorization;
using NorthLion.Zero.Authorization.Roles;
using NorthLion.Zero.MultiTenancy;
using NorthLion.Zero.Users;

namespace NorthLion.Zero.Authorization
{
    public class PermissionChecker : PermissionChecker<Tenant, Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
