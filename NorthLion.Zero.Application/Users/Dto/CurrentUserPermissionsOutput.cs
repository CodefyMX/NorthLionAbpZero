using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.Users.Dto
{
    public class CurrentUserPermissionsOutput
    {
        public long UserId { get; set; }
        public List<UserAssignedPermission> AssignedPermissions { get; set; }
    }
}
