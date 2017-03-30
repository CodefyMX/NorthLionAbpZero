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
    [AutoMapFrom(typeof(OrganizationUnit))]
    public class OrganizationUnitDto : EntityDto<long>
    {
        public virtual long? ParentId { get; set; }
        public virtual string Code { get; set; }
        public virtual string DisplayName { get; set; }
        /// <summary>Children of this OU.</summary>
        public virtual List<OrganizationUnitDto> ChildrenDto { get; set; }
    }
}
