using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Organizations;
using NorthLion.Zero.OrganizationUnits.Dto;
using NorthLion.Zero.Users;

namespace NorthLion.Zero.OrganizationUnits
{
    public class OrganizationUnitsAppService : ZeroAppServiceBase, IOrganizationUnitsAppService
    {
        private readonly OrganizationUnitManager _organizationUnitManager;
        private readonly IRepository<OrganizationUnit, long> _organizationUnitRepository;
        private readonly IRepository<User, long> _usersRepository;

        public OrganizationUnitsAppService(OrganizationUnitManager organizationUnitManager, IRepository<OrganizationUnit, long> organizationUnitRepository, IRepository<User, long> usersRepository)
        {
            _organizationUnitManager = organizationUnitManager;
            _organizationUnitRepository = organizationUnitRepository;
            _usersRepository = usersRepository;
        }

        public async Task CreateOrganizationUnit(OrganizationUnitInput input)
        {
            await _organizationUnitManager.CreateAsync(new OrganizationUnit(AbpSession.TenantId, input.DisplayName,
                input.ParentId));
        }

        public async Task UpdateOrganizationUnit(UpdateOrganizationUnitInput input)
        {
            var orgUnit = _organizationUnitRepository.Get(input.Id);
            var updated = input.MapTo(orgUnit);
            await _organizationUnitManager.UpdateAsync(updated);
        }

        public async Task MoveOrganizationUnit(MoveOrganizationUnitInput input)
        {
            await _organizationUnitManager.MoveAsync(input.Id, input.ParentId);
        }

        public async Task AddUserToOrganizationUnit(long userId, int organizationUnitId)
        {
            var user = await UserManager.GetUserByIdAsync(userId);
            var organizationUnit = await _organizationUnitRepository.GetAsync(organizationUnitId);
            await UserManager.AddToOrganizationUnitAsync(user, organizationUnit);
        }

        public async Task<OrganizationUnitsTreeModel> GetOrganizationUnitsTree()
        {
            return new OrganizationUnitsTreeModel()
            {
               OrganizationUnits  = await GetOrganizationUnits()
            };
        }
        public UpdateOrganizationUnitInput GetOrganizationUnitForEdit(long id)
        {
            var orgUnit = _organizationUnitRepository.Get(id);
            return orgUnit.MapTo<UpdateOrganizationUnitInput>();
        }

        public async Task DeleteOrganizationUnit(long id)
        {
            await _organizationUnitManager.DeleteAsync(id);
        }

        public async Task DeleteUserFromOrganizationUnit(long userId, int organizationUnitId)
        {
            var user = await UserManager.GetUserByIdAsync(userId);
            var organizationUnit = await _organizationUnitRepository.GetAsync(organizationUnitId);
            await UserManager.RemoveFromOrganizationUnitAsync(user, organizationUnit);
        }

        #region Helpers

        private async Task<List<OrganizationUnitDto>> GetOrganizationUnits()
        {
            var listOrganizationUnits = new List<OrganizationUnitDto>();
            var parentUnits = (await _organizationUnitRepository.GetAllListAsync(a => a.ParentId == null));
            foreach (var organizationUnit in parentUnits)
            {
                var orgUnit = organizationUnit.MapTo<OrganizationUnitDto>();

                orgUnit.ChildrenDto = await GetChildren(organizationUnit);

                listOrganizationUnits.Add(orgUnit);

            }
            return listOrganizationUnits;
        }
        private async Task<List<OrganizationUnitDto>> GetChildren(OrganizationUnit organizationUnit)
        {
            var childs = new List<OrganizationUnitDto>();

            var children = await _organizationUnitManager.FindChildrenAsync(organizationUnit.Id);

            foreach (var child in children)
            {
                var childElement = child.MapTo<OrganizationUnitDto>();
                childElement.ChildrenDto = await GetChildren(child);

                childs.Add(childElement);
            }

            return childs;
        }
        #endregion
    }
}
