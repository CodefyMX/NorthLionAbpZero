using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;

namespace NorthLion.Zero.MultiTenancy.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantListDto : EntityDto, ISoftDelete
    {
        public string TenancyName { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
    }
}