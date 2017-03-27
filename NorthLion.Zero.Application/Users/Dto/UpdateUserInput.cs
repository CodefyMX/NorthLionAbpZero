using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace NorthLion.Zero.Users.Dto
{
    [AutoMap(typeof(User))]
    public class UpdateUserInput : FullAuditedEntityDto<long>
    {
        
    }
}
