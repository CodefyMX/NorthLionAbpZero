import { Localization } from "Languages/LocalizationHelper.js";
export class CreateLanguageWindow {
    load() {
        let localization = new Localization();
        const languageService = abp.services.app.language;
        $(document).ready(() => {
            let $form = $("#createLanguageForm");
            $form.on("submit", function (e) {
                e.preventDefault();
                let icon = $("#icon").val();
                let name = $("#name").val();
                let optionSelected = $("#name option:selected");
                let displayNameText = optionSelected.text();
                let displayName = displayNameText.substring(0, (displayNameText.indexOf("(") - 1));
                let data = {
                    Icon: icon,
                    LangCode: name,
                    DisplayName: displayName
                }
                abp.ui.setBusy($form, languageService.createLanguage(data)
                    .done(() => {
                        periModal.close();
                    }));
            });
        });
    }
    fixSelects() {
        let selectOptions = $("#icon option").each((i, e) => {
            let option = $(e);
            let icon = option.data("icon");
            console.log(icon);
            console.log(option);
            option.append(` <span class='${icon}'></span>`);
        });


    }
}