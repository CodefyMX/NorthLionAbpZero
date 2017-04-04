using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Editions;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using NorthLion.Zero.MultiTenancy.Dto;

namespace NorthLion.Zero.Editions.Dto
{
    [AutoMap(typeof(Edition))]
    public class EditEditionInput : FullAuditedEntityDto
    {
        public string DisplayName { get; set; }
        public string Name { get; set; }
        public List<FeatureForEditionInput> Features { get; set; }
    }
}
