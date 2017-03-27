using NorthLion.Zero.EntityFramework;
using EntityFramework.DynamicFilters;

namespace NorthLion.Zero.Migrations.SeedData
{
    public class InitialHostDbBuilder
    {
        private readonly ZeroDbContext _context;

        public InitialHostDbBuilder(ZeroDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new DefaultEditionsCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
        }
    }
}
