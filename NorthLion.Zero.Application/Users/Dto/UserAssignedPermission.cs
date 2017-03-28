using Castle.Components.DictionaryAdapter;
using System.Collections.Generic;

namespace NorthLion.Zero.Users.Dto
{
    public class UserAssignedPermission
    {
        public string DisplayName { get; set; }
        public string Name { get; set; }
        public bool Granted { get; set; }
        public List<UserAssignedPermission> ChildPermissions { get; set; } = new EditableList<UserAssignedPermission>();
        public string ParentPermission { get; set; }
    }
}