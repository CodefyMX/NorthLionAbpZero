using System.Collections.Generic;
using Abp.AutoMapper;
using NorthLion.Zero.Authorization.Roles;

namespace NorthLion.Zero.Roles.Dto
{
    [AutoMap(typeof(Role))]
    public class CreateRoleInput
    {
        public List<AssignedPermission> Permissions { get; set; }
    }
}
