using System.ComponentModel.DataAnnotations;

namespace NorthLion.Zero.Users.Dto
{
    public class ProhibitPermissionInput
    {
        [Range(1, long.MaxValue)]
        public long UserId { get; set; }

        [Required]
        public string PermissionName { get; set; }
    }
}