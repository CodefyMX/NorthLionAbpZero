using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using NorthLion.Zero.Languages.Dto;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Languages
{
    public interface ILanguageAppService : IApplicationService
    {
        Task AddLanguage(LanguageInput input);
        LanguagesOutput GetLanguagesForTable(PaginatedInputDto input);
        LocalizationTextsOutput GetLocalizationTexts(PaginatedInputDto input);
        LanguageTextEditInput GetLanguageTextsForEditView(string selectedTargetLanguage,
            string selectedSourceLanguage);
        Task DeleteLanguage(string code);
        Task AddEditLocalizationText(LanguageTextEditInput input);
        Task UpdateLanguageFromXml(string languageName, string source, bool updateExistingValues = false);
    }
}
