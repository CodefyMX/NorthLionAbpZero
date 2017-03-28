using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.Users.Dto
{
    public class SetUserSpecialPermissionsInput
    {
        public IEnumerable<UserAssignedPermission> AssignedPermissions { get; set; }
        public long UserId { get; set; }
    }
}
