export class Localization {
    localize(value, sourceName = "Zero") {
        return abp.localization.localize(value, sourceName);
    }
}
