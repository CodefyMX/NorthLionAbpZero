using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Localization;

namespace NorthLion.Zero.Languages.Dto
{
    [AutoMap(typeof(ApplicationLanguage))]
    public class LanguageDto : FullAuditedEntityDto
    {
        public string Name { get; set; }
        public string Source { get; set; }
        public string Icon { get; set; }
        public string CreationTimeString => CreationTime.ToShortDateString();
        public string DisplayName { get; set; }
        public bool IsStatic { get; set; }
    }
}
