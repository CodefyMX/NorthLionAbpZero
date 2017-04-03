export class EditTextWindow {
    load() {
        $(document).ready(() => {
            const $form = $("#editTextForm");
            const languageService = abp.services.app.language;
            $form.on("submit", (e) => {
                e.preventDefault();
                let data = {
                    Value: $("#Value").val(),
                    Key: $("#Key").val(),
                    LanguageName: $("#LanguageName").val(),
                    Source: $("#Source").val()
                };
                abp.ui.setBusy($form, languageService.editLocalizationText(data).done(() => {
                    periModal.close(data.Value);
                }));
            });
        });
    }
}