using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using Abp.Zero.EntityFramework;
using NorthLion.Zero.EntityFramework;

namespace NorthLion.Zero
{
    [DependsOn(typeof(AbpZeroEntityFrameworkModule), typeof(ZeroCoreModule))]
    public class ZeroDataModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<ZeroDbContext>());

            Configuration.DefaultNameOrConnectionString = "Default";
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
