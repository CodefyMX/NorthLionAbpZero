using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using NorthLion.Zero.EntityFramework;

namespace NorthLion.Zero.Migrator
{
    [DependsOn(typeof(ZeroDataModule))]
    public class ZeroMigratorModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer<ZeroDbContext>(null);

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}