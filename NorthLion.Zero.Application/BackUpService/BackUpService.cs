using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Uow;

namespace NorthLion.Zero.BackUpService
{
   public  class BackUpService :ZeroAppServiceBase, IBackUpService
    {
        public void BackupDb()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;

            // read backup folder from config file ("C:/temp/")
            var backupFolder = ConfigurationManager.AppSettings["BackupFolder"];

            var sqlConStrBuilder = new SqlConnectionStringBuilder(connectionString);

            // set backupfilename (you will get something like: "C:/temp/MyDatabase-2013-12-07.bak")
            var backupFileName =
                $"{backupFolder}{sqlConStrBuilder.InitialCatalog}-{DateTime.Now:yyyy-MM-dd}.bak";

            var query = $"BACKUP DATABASE {sqlConStrBuilder.InitialCatalog} TO DISK='{backupFileName}'";
            
            
        }
    }
}
