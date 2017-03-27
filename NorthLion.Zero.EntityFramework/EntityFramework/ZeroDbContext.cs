using System.Data.Common;
using Abp.Zero.EntityFramework;
using NorthLion.Zero.Authorization.Roles;
using NorthLion.Zero.MultiTenancy;
using NorthLion.Zero.Users;

namespace NorthLion.Zero.EntityFramework
{
    public class ZeroDbContext : AbpZeroDbContext<Tenant, Role, User>
    {
        //TODO: Define an IDbSet for your Entities...

        /* NOTE: 
         *   Setting "Default" to base class helps us when working migration commands on Package Manager Console.
         *   But it may cause problems when working Migrate.exe of EF. If you will apply migrations on command line, do not
         *   pass connection string name to base classes. ABP works either way.
         */
        public ZeroDbContext()
            : base("Default")
        {

        }

        /* NOTE:
         *   This constructor is used by ABP to pass connection string defined in ZeroDataModule.PreInitialize.
         *   Notice that, actually you will not directly create an instance of ZeroDbContext since ABP automatically handles it.
         */
        public ZeroDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        //This constructor is used in tests
        public ZeroDbContext(DbConnection existingConnection)
         : base(existingConnection, false)
        {

        }

        public ZeroDbContext(DbConnection existingConnection, bool contextOwnsConnection)
         : base(existingConnection, contextOwnsConnection)
        {

        }
    }
}
