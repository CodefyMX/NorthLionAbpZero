﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Abp;
using Abp.Configuration.Startup;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Localization;
using Abp.Localization.Dictionaries.Xml;
using NorthLion.Zero.Localization.Helpers;

namespace NorthLion.Zero.Localization
{
    public class LanguageTextProvider :DomainService, ILanguageTextProvider
    {
        private readonly IRepository<ApplicationLanguageText, long> _languageTextsRepository;
        private const string DefaultCultureInfo = "en";
        private readonly IAbpStartupConfiguration _abpStartupConfiguration;
        protected override string L(string name)
        {
            return LocalizationManager.GetString(ZeroConsts.LocalizationSourceName, name, new CultureInfo(DefaultCultureInfo));
        }

        public LanguageTextProvider(IRepository<ApplicationLanguageText, long> languageTextsRepository, IAbpStartupConfiguration abpStartupConfiguration)
        {
            _languageTextsRepository = languageTextsRepository;
            _abpStartupConfiguration = abpStartupConfiguration;
        }

        /// <summary>
        /// Gets all strings for the requested language
        /// </summary>
        /// <param name="sourceLang"></param>
        /// <param name="source"></param>
        /// <returns></returns>
        public List<LocalizedString> GetLocalizationStringFromAssembly(string sourceLang, string source)
        {

            var localResult = XmlLocations.GetXmlLocationBySourceName(source);
            var provider = new XmlEmbeddedFileLocalizationDictionaryProvider(
                Assembly.GetAssembly(localResult.Assembly),
                localResult.LocalizationNameSpace
                );
            provider.Initialize(source);
            var result = new List<LocalizedString>();
            var localizationDictionary =
                provider.Dictionaries.FirstOrDefault(a => a.Value.CultureInfo.Name == sourceLang);
            var localizedStrings = localizationDictionary.Value?.GetAllStrings().ToList();
            //Else we load by the source
            if (localizedStrings != null)
            {
                foreach (var localizedString in localizedStrings)
                {

                    result.Add(localizedString);
                }
            }

            return result;

        }

        public void SetLocalizationKeys(string langCode, int? tenantId)
        {
            foreach (var localizationSource in LocalizationSources.LocalizationSourceNames)
            {
                SetLocalizationKeys(langCode, localizationSource, tenantId);
            }
        }

        private List<string> GetLocalizationKeysFromAssembly(string source)
        {
            var localResult = XmlLocations.GetXmlLocationBySourceName(source);
            var provider = new XmlEmbeddedFileLocalizationDictionaryProvider(
                Assembly.GetAssembly(localResult.Assembly),
                localResult.LocalizationNameSpace
                );
            provider.Initialize(source);
            //Default dictionary = "en" en should be always available
            var strings = provider.DefaultDictionary.GetAllStrings();
            var result = strings.Select(a => a.Name).ToList();

            return result;
        }

        /// Sets the localization keys for the new language
        /// For now this works only for  
        ///  AbpModuleZeroConsts.LocalizationSourceName
        ///  it should be adapted for all the localization sources
        /// <param name="langCode"></param>
        /// <param name="source"></param>
        /// <param name="tenantId"></param>
        public void SetLocalizationKeys(string langCode, string source, int? tenantId)
        {
            if (!IsXmlAvailableForTheLangCode(langCode, source))
            {
                var keys = GetLocalizationKeysFromAssembly(source);

                foreach (var key in keys)
                {
                    _languageTextsRepository.Insert(new ApplicationLanguageText()
                    {
                        Key = key,
                        Value = L(key),
                        LanguageName = langCode,
                        Source = source,
                        TenantId = tenantId,
                    });
                }
                CurrentUnitOfWork.SaveChanges();
            }
            else
            {
                var keys = GetLocalizationStringFromAssembly(langCode, source);

                foreach (var key in keys)
                {
                    _languageTextsRepository.Insert(new ApplicationLanguageText()
                    {
                        Key = key.Name,
                        Value = key.Value,
                        LanguageName = langCode,
                        Source = source,
                        TenantId = tenantId,
                    });
                }
                CurrentUnitOfWork.SaveChanges();
            }
        }

        public List<string> GetLocalizationSources()
        {
            return Helpers.LocalizationSources.LocalizationSourceNames.ToList();
        }

        public Dictionary<string, string> GetTexts(string languageName, string source)
        {

            var result = new Dictionary<string, string>();

            if (!IsXmlAvailableForTheLangCode(languageName, source)) throw new AbpException("Language file not found");

            var localResult = XmlLocations.GetXmlLocationBySourceName(source);
            var provider = new XmlEmbeddedFileLocalizationDictionaryProvider(
                Assembly.GetAssembly(localResult.Assembly),
                localResult.LocalizationNameSpace
                );
            provider.Initialize(source);
            //Default dictionary = "en" en should be always available
            var strings = provider.DefaultDictionary.GetAllStrings().Where(a => a.CultureInfo.Name == languageName);

            foreach (var localizedString in strings)
            {
                result.Add(localizedString.Name, localizedString.Value);
            }
            return result;
        }

        public bool IsXmlAvailableForTheLangCode(string langCode, string source)
        {
            //var provider = new XmlEmbeddedFileLocalizationDictionaryProvider(
            //    Assembly.GetExecutingAssembly(),
            //    XmlLocations.GetXmlLocationBySourceName(source)
            //    );

            var lang =
                _abpStartupConfiguration.Localization.Sources.FirstOrDefault(a => a.Name == source);

            //Default dictionary = "en" en should be always available
            var result = lang != null;
            return result;
        }
    }
}
