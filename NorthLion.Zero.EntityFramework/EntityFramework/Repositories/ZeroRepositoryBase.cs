using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;

namespace NorthLion.Zero.EntityFramework.Repositories
{
    public abstract class ZeroRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<ZeroDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected ZeroRepositoryBase(IDbContextProvider<ZeroDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add common methods for all repositories
    }

    public abstract class ZeroRepositoryBase<TEntity> : ZeroRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected ZeroRepositoryBase(IDbContextProvider<ZeroDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)
    }
}
