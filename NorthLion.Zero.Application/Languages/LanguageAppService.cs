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
    public class LanguageAppService : ILanguageAppService
    {
        public Task AddLanguage(LanguageInput input)
        {
            throw new NotImplementedException();
        }

        public LanguagesOutput GetLanguagesForTable(PaginatedInputDto input)
        {
            throw new NotImplementedException();
        }

        public LocalizationTextsOutput GetLocalizationTexts(PaginatedInputDto input)
        {
            throw new NotImplementedException();
        }

        public LanguageTextEditInput GetLanguageTextsForEditView(string selectedTargetLanguage, string selectedSourceLanguage)
        {
            throw new NotImplementedException();
        }

        public Task DeleteLanguage(string code)
        {
            throw new NotImplementedException();
        }

        public Task AddEditLocalizationText(LanguageTextEditInput input)
        {
            throw new NotImplementedException();
        }

        public Task UpdateLanguageFromXml(string languageName, string source, bool updateExistingValues = false)
        {
            throw new NotImplementedException();
        }
    }
}
