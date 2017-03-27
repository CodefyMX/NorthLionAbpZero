using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.Users.Dto
{
    public class SetUserRolesInput
    {
        public List<string> Roles { get; set; } = new List<string>();
        public long UserId { get; set; }
    }
}
