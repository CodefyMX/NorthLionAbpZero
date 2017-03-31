namespace NorthLion.Zero.Users.Dto
{
    public class UserSelectRoleDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsSelected { get; set; }
        public bool IsStatic { get; set; }
    }
}