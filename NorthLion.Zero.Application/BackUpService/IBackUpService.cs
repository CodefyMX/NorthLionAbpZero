using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;

namespace NorthLion.Zero.BackUpService
{
    public interface IBackUpService : IApplicationService
    {
        void BackupDb();
    }
}
