using Abp.Application.Editions;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace NorthLion.Zero.Editions.Dto
{
    [AutoMap(typeof(Edition))]
    public class EditionOutputDto : FullAuditedEntityDto
    {
        public string DisplayName { get; set; }
        public string Name { get; set; }
    }
}