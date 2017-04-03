using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Abp.Application.Services;
using NorthLion.Zero.Languages.Dto;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Languages
{
    public interface ILanguageAppService : IApplicationService
    {
        [HttpPost]
        Task UpdateLanguageFromXml(string languageName, string source, bool updateExistingValues = false);
        [HttpPost]
        Task CreateLanguage(LanguageInput input);
        [HttpGet]
        Task<LanguagesOutput> GetLanguagesForTable(PaginatedInputDto input);
        [HttpGet]
        LocalizationTextsOutput GetLocalizationTexts(GetLocalizationTextInput input);
        [HttpGet]
        LanguageTextEditView GetLanguageTextsForEditView(string selectedTargetLanguage,
            string selectedSourceLanguage);
        [HttpPut]
        Task EditLocalizationText(LanguageTextEditInput input);
        [HttpDelete]
        Task DeleteLanguage(string code);

    }
}
