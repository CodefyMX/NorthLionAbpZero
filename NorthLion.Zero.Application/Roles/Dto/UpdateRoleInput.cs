using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Castle.Components.DictionaryAdapter;
using NorthLion.Zero.Authorization.Roles;
using System.Collections.Generic;

namespace NorthLion.Zero.Roles.Dto
{
    [AutoMap(typeof(Role))]
    public class UpdateRoleInput : FullAuditedEntityDto
    {
        public List<AssignedPermission> Permissions = new EditableList<AssignedPermission>();
        public string DisplayName { get; set; }
        public bool IsDefault { get; set; }
    }
}
