using System.Collections.Generic;
using Abp.AutoMapper;
using NorthLion.Zero.Authorization.Roles;

namespace NorthLion.Zero.Roles.Dto
{
    [AutoMap(typeof(Role))]
    public class CreateRoleInput
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public List<AssignedPermission> Permissions { get; set; } = new List<AssignedPermission>();
        public bool IsDefault { get; set; }
    }
}
