using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.AutoMapper;
using Abp.Localization;
using NorthLion.Zero.Authorization.Roles;
using NorthLion.Zero.PaginatedModel;
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

        public async Task<RolesOutput> GetRoles(PaginatedInputDto input)
        {
            await Task.FromResult(0); //WARN Fix
            //Con esto paginamos 
            //La pagina 1 es en realidad la pagina 2, (empezamos desde el indice 0)
            //pagina 1  * 10 elementos por pagina = 10,
            //osea nos saltamos los 10 primeros elementos que son los de la pagina 1
            var toSkipElements = PaginationHelpers.GetSkipTotal(input.Page, input.RowsPerPage);

            //Busqueda
            var roles = _roleManager.Roles
                .Where(a => a.Name.Contains(input.SearchString));

            switch (input.PropertyToOrder)
            {
                case "Name":
                    roles = input.Direction == "Desc" ? roles.OrderByDescending(a => a.Name) : roles.OrderBy(a => a.Name);
                    break;
                case "DisplayName":
                    roles = input.Direction == "Desc" ? roles.OrderByDescending(a => a.DisplayName) : roles.OrderBy(a => a.DisplayName);
                    break;
                default:
                    roles = roles.OrderBy(a => a.Id);
                    break;
            }
            var remainingPages = PaginationHelpers.GetRemainingPages(roles.Count(), input.RowsPerPage); //Regresara un numero
            roles = roles.Skip(toSkipElements); //El servidor nos enviara de los 10 primeros elementos en adelante
            return new RolesOutput()
            {
                SearchString = input.SearchString,
                Page = input.Page,
                RemainingPages = remainingPages,
                Rows = input.RowsPerPage,
                Roles = roles.Select(a => a.MapTo<RoleDto>()).ToList()
            };
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