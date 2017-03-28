using System.Collections.Generic;
using Castle.Components.DictionaryAdapter;

namespace NorthLion.Zero.Roles.Dto
{
    public class AssignedPermission
    {
        public string DisplayName { get; set; }
        public string Name { get; set; }
        public bool Granted { get; set; }
        public List<AssignedPermission> ChildPermissions { get; set; } = new EditableList<AssignedPermission>();
        public string ParentPermission { get; set; }
    }
}