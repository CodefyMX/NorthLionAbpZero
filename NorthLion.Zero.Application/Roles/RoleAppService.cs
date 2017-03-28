using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.AutoMapper;
using Abp.Localization;
using NorthLion.Zero.Authorization.Roles;
using NorthLion.Zero.Roles.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthLion.Zero.Roles
{
    public class RoleAppService : ZeroAppServiceBase, IRoleAppService
    {
        private readonly RoleManager _roleManager;
        private readonly IPermissionManager _permissionManager;

        public RoleAppService(RoleManager roleManager, IPermissionManager permissionManager)
        {
            _roleManager = roleManager;
            _permissionManager = permissionManager;
        }

        public async Task UpdateRolePermissions(UpdateRolePermissionsInput input)
        {
            var role = await _roleManager.GetRoleByIdAsync(input.RoleId);
            var grantedPermissions = _permissionManager
                .GetAllPermissions()
                .Where(p => input.GrantedPermissionNames.Contains(p.Name))
                .ToList();

            await _roleManager.SetGrantedPermissionsAsync(role, grantedPermissions);
        }

        public async Task<UpdateRoleInput> GetRoleForEdit(int id)
        {
            var allPermissions = _permissionManager.GetAllPermissions().Where(a => a.Parent == null).ToList();
            var role = await _roleManager.GetRoleByIdAsync(id);
            if (role == null) return new UpdateRoleInput();
            var assignedPermissions = CheckPermissions(allPermissions, role.Permissions.ToList());
            var roleInput = role.MapTo<UpdateRoleInput>();
            roleInput.Permissions = assignedPermissions;
            return roleInput;
        }

        public async Task CreateRole(CreateRoleInput input)
        {
            var permissions =
                    input.Permissions.Select(assignedPermission => new Permission(assignedPermission.Name))
                        .ToList();
            var role = input.MapTo<Role>();
            await _roleManager.CreateAsync(role);
            await CurrentUnitOfWork.SaveChangesAsync();
            await _roleManager.SetGrantedPermissionsAsync(role, permissions);
        }

        public async Task UpdateRole(UpdateRoleInput input)
        {
            var permissions =
                    input.Permissions.Select(assignedPermission => new Permission(assignedPermission.Name))
                        .ToList();
            var role = await _roleManager.GetRoleByIdAsync(input.Id);
            var mapped = input.MapTo(role);
            await _roleManager.UpdateAsync(mapped);
            await CurrentUnitOfWork.SaveChangesAsync();
            await _roleManager.SetGrantedPermissionsAsync(mapped, permissions);
            //Notify role owners or something like that
        }

        public async Task DeleteRole(int roleId)
        {
            var role = await _roleManager.GetRoleByIdAsync(roleId);
            await _roleManager.DeleteAsync(role);
            //Notify role owners or something like that 
        }
        #region Helpers

        private List<AssignedPermission> CheckPermissions(IEnumerable<Permission> allPermissions, ICollection<RolePermissionSetting> rolePermissions)
        {
            var permissionsFound = new List<AssignedPermission>();
            foreach (var permission in allPermissions)
            {
                AddPermission(permissionsFound, rolePermissions, permission, rolePermissions.Any(a => a.Name == permission.Name));
            }
            return permissionsFound.ToList();
        }
        private void AddPermission(ICollection<AssignedPermission> permissionsFound, ICollection<RolePermissionSetting> rolePermissions, Permission allPermission, bool granted)
        {

            var childPermissions = new List<AssignedPermission>();
            var permission = new AssignedPermission()
            {
                DisplayName = allPermission.DisplayName.Localize(new LocalizationContext(LocalizationManager)),
                Granted = granted,
                Name = allPermission.Name,
                ParentPermission = allPermission.Parent?.Name
            };
            if (allPermission.Children.Any())
            {
                foreach (var childPermission in allPermission.Children)
                {
                    AddPermission(childPermissions, rolePermissions, childPermission, rolePermissions.Any(a => a.Name == childPermission.Name));
                }

                permission.ChildPermissions.AddRange(childPermissions);
            }

            permissionsFound.Add(permission);
        }
        #endregion
    }
}