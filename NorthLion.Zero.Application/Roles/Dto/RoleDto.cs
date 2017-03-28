using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using NorthLion.Zero.Authorization.Roles;

namespace NorthLion.Zero.Roles.Dto
{
    [AutoMap(typeof(Role))]
    public class RoleDto : FullAuditedEntityDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
    }
}