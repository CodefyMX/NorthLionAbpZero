using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Editions;
using Abp.AutoMapper;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    [AutoMap(typeof(Edition))]
    public class EditionDto
    {
        public bool IsEnabledForTenant { get; set; }
        public string DisplayName { get; set; }
        public int Id { get; set; }
        public int TenantId { get; set; }
    }
}
