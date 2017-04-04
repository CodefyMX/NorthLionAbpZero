using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp;
using Abp.Application.Editions;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.UI.Inputs;
using NorthLion.Zero.Editions.CustomEditionManager;
using NorthLion.Zero.Editions.Dto;
using NorthLion.Zero.Helpers;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Editions
{
    public class EditionAppService : ZeroAppServiceBase, IEditionAppService
    {
        private readonly EditionManager _editionManager;
        private readonly IRepository<Edition> _editionRepository;
        private readonly ICustomEditionManager _customEditionManager;
        private const string DefaultBooleanValue = "false";

        public EditionAppService(EditionManager editionManager, IRepository<Edition> editionRepository, ICustomEditionManager customEditionManager)
        {
            _editionManager = editionManager;
            _editionRepository = editionRepository;
            _customEditionManager = customEditionManager;
        }

        public EditionOutput GetEditions(PaginatedInputDto input)
        {
            var editions = _editionManager.Editions.ToList();
            return new EditionOutput()
            {
                Editions = editions.Select(a => a.MapTo<EditionOutputDto>()).ToList()
            };
        }

        public async Task CreateEdition(CreateEditionInput input)
        {
            var newEdition = new Edition { DisplayName = input.DisplayName, Name = input.DisplayName.ToSlug() };
            await _editionManager.CreateAsync(newEdition);
            await CurrentUnitOfWork.SaveChangesAsync();
            await SetFeatureValues(newEdition, input.Features);
        }

        public async Task UpdateEdition(EditEditionInput input)
        {
            var edition = await _editionManager.GetByIdAsync(input.Id);

            var mapped = input.MapTo(edition);

            await _editionRepository.UpdateAsync(mapped);

            await SetFeatureValues(mapped, input.Features);
        }

        public async Task DeleteEdition(int id)
        {
            var edition = await _editionManager.FindByIdAsync(id);
            await _editionManager.DeleteAsync(edition);
        }

        public CreateEditionInput GetEditionModelForCreation()
        {
            return new CreateEditionInput()
            {
                Features = _customEditionManager.GetAllFeatures().Select(a => a.MapTo<FeatureForEditionInput>()).ToList(),
            };
        }
        public async Task<EditEditionInput> GetEditionModelForEdit(int id)
        {
            var edition = await _editionManager.GetByIdAsync(id);

            var editionInput = edition.MapTo<EditEditionInput>();

            editionInput.Features = _customEditionManager.GetAllFeatures(edition.Id).Select(a => a.MapTo<FeatureForEditionInput>()).ToList();

            return editionInput;
        }
        #region Helpers

        private NameValue GetValueName(FeatureForEditionInput featureDto)
        {
            if (featureDto.Selected)
            {
                return new NameValue(featureDto.Name, featureDto.DefaultValue);
            }
            if (!(featureDto.InputType is SingleLineStringInputType))
                return new NameValue(featureDto.Name, DefaultBooleanValue);
            var feature = _editionManager.FeatureManager.GetOrNull(featureDto.Name);
            return new NameValue(featureDto.Name, feature.DefaultValue);
        }
        private async Task SetFeatureValues(Edition edition, IEnumerable<FeatureForEditionInput> inputFeatures)
        {
            var features =
            inputFeatures.Where(a => !string.IsNullOrEmpty(a.Name)).Select(GetValueName).ToArray();
            await _editionManager.SetFeatureValuesAsync(edition.Id, features);
        }



        #endregion
    }
}
