using System.Collections.Generic;

namespace NorthLion.Zero.Users.Dto
{
    public class UserRoleSelectorOutput
    {
        public long UserId { get; set; }
        public List<UserSelectRoleDto> Roles { get; set; }

    }
}
