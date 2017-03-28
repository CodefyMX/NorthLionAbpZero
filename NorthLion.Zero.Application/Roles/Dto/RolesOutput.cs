using Castle.Components.DictionaryAdapter;
using NorthLion.Zero.PaginatedModel;
using System.Collections.Generic;

namespace NorthLion.Zero.Roles.Dto
{
    public class RolesOutput : IPaginableResult
    {
        public List<RoleDto> Roles { get; set; } = new EditableList<RoleDto>();
        public string SearchString { get; set; }
        public int Page { get; set; }
        public int Rows { get; set; }
        public int RemainingPages { get; set; }
    }
}
