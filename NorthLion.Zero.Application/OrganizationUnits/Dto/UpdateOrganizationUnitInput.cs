using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Organizations;

namespace NorthLion.Zero.OrganizationUnits.Dto
{
    [AutoMap(typeof(OrganizationUnit))]
    public class UpdateOrganizationUnitInput : FullAuditedEntityDto
    {
        public virtual long? ParentId { get; set; }
        public virtual string Code { get; set; }
        public virtual string DisplayName { get; set; }
    }
}
