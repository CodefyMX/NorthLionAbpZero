using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Localization;
using Abp.Runtime.Caching;
using NorthLion.Zero.Languages.Dto;
using NorthLion.Zero.Localization;
using NorthLion.Zero.PaginatedModel;

namespace NorthLion.Zero.Languages
{
    public class LanguageAppService : ZeroAppServiceBase, ILanguageAppService
    {
        private readonly IApplicationLanguageManager _applicationLanguageManager;
        private readonly IApplicationLanguageTextManager _applicationLanguageTextManager;
        private readonly IRepository<ApplicationLanguageText, long> _languageTextsRepository;
        private readonly IRepository<ApplicationLanguage> _languagesRepository;
        private readonly ILanguageTextProvider _languageTextsProvider;
        private readonly ICacheManager _cacheManager;
        public const string DefaultLanguage = "en";
        public LanguageAppService(IApplicationLanguageManager applicationLanguageManager,
            IRepository<ApplicationLanguageText, long> languageTextsRepository,
            IRepository<ApplicationLanguage> languagesRepository,
            ILanguageTextProvider languageTextsProvider,
            IApplicationLanguageTextManager applicationLanguageTextManager, ICacheManager cacheManager)
        {
            _applicationLanguageManager = applicationLanguageManager;
            _languageTextsRepository = languageTextsRepository;
            _languagesRepository = languagesRepository;
            _languageTextsProvider = languageTextsProvider;
            _applicationLanguageTextManager = applicationLanguageTextManager;
            _cacheManager = cacheManager;
        }
        public async Task CreateLanguage(LanguageInput input)
        {
            var newLanguage = new ApplicationLanguage(AbpSession.TenantId, input.LangCode, input.DisplayName, input.Icon);
            await _applicationLanguageManager.AddAsync(newLanguage);
        }

        public async Task<LanguagesOutput> GetLanguagesForTable(PaginatedInputDto input)
        {

            if (input.GetAll) return (await AllLanguages());

            return new LanguagesOutput();
        }

        public async Task<LanguagesOutput> AllLanguages()
        {
            return new LanguagesOutput()
            {
                Languages = (await _applicationLanguageManager.GetLanguagesAsync(AbpSession.TenantId)).Select(a=>a.MapTo<LanguageDto>()).ToList()
            };

        }

        /// <summary>
        /// This table operation has no server side filter
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public LocalizationTextsOutput GetLocalizationTexts(GetLocalizationTextInput input)
        {
            //1.-Load all source texts
            //1.1 If the current tenant has no texts in the dabatabase for the source
            //    we must generate these texts with a default language wich is always available 

            var sourceWasUpdated = false;
            //Source requested

            //Problem repository will return 0 records on new database
            //We need to check if there are texts on the cache

            var languageTextsSourceFromDatabase = _languageTextsRepository.GetAll()
                .Where(a => a.Source == input.Source
                && a.LanguageName == input.SourceLang).ToList();

            var languageTextsSourceFromXml = _languageTextsProvider.GetTexts(input.SourceLang, input.Source);



            //var isXmlAvailable = _languageTextsProvider.IsXMLAvailableForTheLangCode(input.TypeOfRequest.SourceLang,
            //    input.TypeOfRequest.Source);

            if (!languageTextsSourceFromXml.Any() && !languageTextsSourceFromDatabase.Any()
                /* we need something like '&& IsInCache() '*/)
            {

                //This will restore all the keys from the xml file en should be always available
                _languageTextsProvider.SetLocalizationKeys(input.SourceLang, input.Source,
                    AbpSession.TenantId);
                sourceWasUpdated = true;
            }
            else
            {
                if (languageTextsSourceFromXml.Any())
                {
                    languageTextsSourceFromDatabase = languageTextsSourceFromXml.Select(a => new ApplicationLanguageText()
                    {
                        Key = a.Key,
                        Value = a.Value,
                        Source = input.Source
                    }).ToList();
                }
                
            }
            //2.-Load all target texts
            //2.1.-If the current tenant has no texts in the database for the target
            //     we must generate them with empty spaces and the key from the source 
            //Texts to edit
            var languageTextsTargetFromDatabase = _languageTextsRepository.GetAll()
                .Where(a => a.Source == input.Source
                && a.LanguageName == input.TargetLang).ToList();

            if (input.TargetLang == input.SourceLang)
            {
                languageTextsTargetFromDatabase = languageTextsSourceFromDatabase;
            }

            if (!languageTextsTargetFromDatabase.Any())
            {
                //Only sets keys with empty values
                _languageTextsProvider.SetLocalizationKeys(input.TargetLang, input.Source, AbpSession.TenantId);
                var languageTextsSourceS = _languageTextsRepository.GetAll()
                    .Where(a => a.Source == input.Source
                                && a.LanguageName == input.SourceLang).ToList();

                if (!languageTextsSourceS.Any()) languageTextsSourceS = languageTextsSourceFromDatabase;

                //Once reloaded we build the model
                var languageTextsTargetS = _languageTextsRepository.GetAll()
                .Where(a => a.Source == input.Source
                && a.LanguageName == input.TargetLang).ToList();
                ////3.-Pupulate table with both key targetText - value and sourceText - value
                return GetTableData(languageTextsTargetS, languageTextsSourceS);
            }
            if (sourceWasUpdated)
            {
                var sourceUpdated = _languageTextsRepository.GetAll()
                    .Where(a => a.Source == input.Source
                                && a.LanguageName == input.SourceLang).ToList();
                return GetTableData(languageTextsTargetFromDatabase, sourceUpdated);
            }
            ////3.-Pupulate table with both key targetText - value and sourceText - value
            return GetTableData(languageTextsTargetFromDatabase, languageTextsSourceFromDatabase);
        }

        private LocalizationTextsOutput GetTableData(List<ApplicationLanguageText> languageTextsTargetS, List<ApplicationLanguageText> languageTextsSourceS)
        {
            var listOfElements = new List<LanguageTextTableElement>();
            foreach (var applicationLanguageText in languageTextsSourceS)
            {
                listOfElements.Add(new LanguageTextTableElement()
                {
                    Key = applicationLanguageText.Key,
                    Source = applicationLanguageText.Source,
                    SourceValue = applicationLanguageText.Value,
                    TargetValue = GetTargetValueFromList(languageTextsTargetS, applicationLanguageText.Key, applicationLanguageText.Value)
                });
            }
            return new LocalizationTextsOutput()
            {
                Texts = listOfElements
            };
        }

        private string GetTargetValueFromList(List<ApplicationLanguageText> languageTextsTargetS, string key, string value)
        {
            if (languageTextsTargetS.All(a => a.Key != key))
            {
                return value;
            }
            var first = languageTextsTargetS.FirstOrDefault(a => a.Key == key);
            return string.IsNullOrEmpty(first?.Value) ? value : first.Value;
        }

        public LanguageTextEditView GetLanguageTextsForEditView(string selectedTargetLanguage, string selectedSourceLanguage)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var result = _languageTextsProvider.GetLocalizationSources();
                var languages = _languagesRepository.GetAll().ToList();
                return new LanguageTextEditView()
                {
                    SourceLanguages = languages.Select(a => new LanguageSelectedObject(a.DisplayName, a.Name, a.Icon)).ToList(),
                    TargetLanguages = languages.Select(a => new LanguageSelectedObject(a.DisplayName, a.Name, a.Icon)).ToList(),
                    SelectedSourceLanguage = selectedSourceLanguage,
                    SelectedTargetLanguage = selectedTargetLanguage,
                    Source = result
                };
            }
        }

        public async Task DeleteLanguage(string code)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.SoftDelete))
            {
                //Much texts, many memory
                DeleteAllTextsFromLanguage(code);
                await _applicationLanguageManager.RemoveAsync(AbpSession.TenantId, code);
                await ClearCache("AbpLocalizationScripts");
                await ClearCache("AbpZeroLanguages");
            }
        }

        public async Task EditLocalizationText(LanguageTextEditInput input)
        {
            await _applicationLanguageTextManager.UpdateStringAsync(
                AbpSession.TenantId,
                input.Source,
                CultureInfo.GetCultureInfo(input.LanguageName),
                input.Key, input.Value);
        }

        public async Task UpdateLanguageFromXml(string languageName, string source, bool updateExistingValues = false)
        {
            await ClearCache("AbpLocalizationScripts");
            await ClearCache("AbpZeroLanguages");
        }
        private Task ClearCache(string cacheName)
        {
            var cache = _cacheManager.GetCache(cacheName);

            return cache.ClearAsync();

        }
        #region Helpers
        private void DeleteAllTextsFromLanguage(string code)
        {
            var texts = _languageTextsRepository.GetAllList(a => a.LanguageName == code);
            foreach (var applicationLanguageText in texts)
            {
                _languageTextsRepository.Delete(applicationLanguageText);
            }
        }
        #endregion
    }
}
