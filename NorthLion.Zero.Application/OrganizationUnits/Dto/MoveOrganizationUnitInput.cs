using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthLion.Zero.OrganizationUnits.Dto
{
    public class MoveOrganizationUnitInput
    {
        public long Id { get; set; }
        public long? ParentId { get; set; }
    }
}
