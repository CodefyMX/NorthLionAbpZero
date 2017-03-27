using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using NorthLion.Zero.MultiTenancy;

namespace NorthLion.Zero.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}