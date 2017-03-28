using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Services;
using Abp.Localization;

namespace NorthLion.Zero.Localization
{
    public interface ILanguageTextProvider : IDomainService
    {
        List<LocalizedString> GetLocalizationStringFromAssembly(string sourceLang, string source);
        void SetLocalizationKeys(string langCode, int? tenantId);
        void SetLocalizationKeys(string langCode, string source, int? tenantId);
        List<string> GetLocalizationSources();
        /// <summary>
        /// Gets all the language texts from the xml file
        /// </summary>
        /// <param name="languageName"></param>
        /// <param name="source"></param>
        /// <returns></returns>
        Dictionary<string, string> GetTexts(string languageName, string source);

        bool IsXmlAvailableForTheLangCode(string langCode, string source);
    }
}
