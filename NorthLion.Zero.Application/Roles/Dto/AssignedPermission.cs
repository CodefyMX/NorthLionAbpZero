using Castle.Components.DictionaryAdapter;
using System.Collections.Generic;
using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.AutoMapper;

namespace NorthLion.Zero.Roles.Dto
{
    [AutoMap(typeof(RolePermissionSetting))]
    public class AssignedPermission
    {
        public string DisplayName { get; set; }
        public string Name { get; set; }
        public bool Granted { get; set; }
        public List<AssignedPermission> ChildPermissions { get; set; } = new EditableList<AssignedPermission>();
        public string ParentPermission { get; set; }
    }
}