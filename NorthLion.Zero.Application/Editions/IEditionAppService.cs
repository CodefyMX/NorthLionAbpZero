using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Abp.Application.Services;
using NorthLion.Zero.Editions.Dto;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Editions
{
    public interface IEditionAppService : IApplicationService
    {
        [HttpGet]
        EditionOutput GetEditions(PaginatedInputDto input);
        [HttpPost]
        Task CreateEdition(CreateEditionInput input);
        [HttpPut]
        Task UpdateEdition(EditEditionInput input);
        [HttpDelete]
        Task DeleteEdition(int id);
        [HttpGet]
        CreateEditionInput GetEditionModelForCreation();
        [HttpGet]
        Task<EditEditionInput> GetEditionModelForEdit(int id);
    }
}
