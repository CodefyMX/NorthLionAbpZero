using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Abp.Application.Services;
using NorthLion.Zero.OrganizationUnits.Dto;

namespace NorthLion.Zero.OrganizationUnits
{
    public interface IOrganizationUnitsAppService : IApplicationService
    {
        [HttpPost]
        Task CreateOrganizationUnit(OrganizationUnitInput input);
        [HttpPut]
        Task MoveOrganizationUnit(MoveOrganizationUnitInput input);
        [HttpPut]
        Task AddUserToOrganizationUnit(long userId, int organizationUnitId);
        [HttpPut]
        Task UpdateOrganizationUnit(UpdateOrganizationUnitInput input);
        [HttpGet]
        Task<OrganizationUnitsTreeModel> GetOrganizationUnitsTree();
        [HttpGet]
        UpdateOrganizationUnitInput GetOrganizationUnitForEdit(long id);
        [HttpDelete]
        Task DeleteOrganizationUnit(long id);
        [HttpDelete]
        Task DeleteUserFromOrganizationUnit(long userId, int organizationUnitId);

        
    }
}
