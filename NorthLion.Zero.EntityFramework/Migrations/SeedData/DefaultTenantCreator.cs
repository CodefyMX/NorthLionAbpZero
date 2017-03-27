using System.Linq;
using NorthLion.Zero.EntityFramework;
using NorthLion.Zero.MultiTenancy;

namespace NorthLion.Zero.Migrations.SeedData
{
    public class DefaultTenantCreator
    {
        private readonly ZeroDbContext _context;

        public DefaultTenantCreator(ZeroDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateUserAndRoles();
        }

        private void CreateUserAndRoles()
        {
            //Default tenant

            var defaultTenant = _context.Tenants.FirstOrDefault(t => t.TenancyName == Tenant.DefaultTenantName);
            if (defaultTenant == null)
            {
                _context.Tenants.Add(new Tenant {TenancyName = Tenant.DefaultTenantName, Name = Tenant.DefaultTenantName});
                _context.SaveChanges();
            }
        }
    }
}
