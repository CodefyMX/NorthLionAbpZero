import { Localization } from "Languages/LocalizationHelper.js";
export class LanguageWindow {
    load() {
        $(document).ready(function () {
            let localization = new Localization();
            const languagesService = abp.services.app.language;
            let $body = $("body");

            let table;
            let loadLanguages = () => {
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                languagesService.getLanguagesForTable({ getAll: true }).done((response) => {
                    abp.ui.clearBusy();
                    let data = response.languages;
                    let columns = [
                        {
                            "title": "",
                            "data": "id"
                        },
                        {
                            "title": localization.localize("Name"),
                            "data": "name"
                        },
                        {
                            "title": localization.localize("DisplayName"),
                            "data": "displayName"
                        }
                    ]
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-language" data-id="${full.name}"><i data-id="${full.name}" class="fa fa-times"></i></a>`;
                                let btnTexts = `<a href="/AdminMpa/Languages/EditTexts?name=${full.name}&currentLang=${abp.localization.currentCulture.name}" class="btn btn-default btn-xs"><i class="fa fa-book"></i></a>`;
                                return btnTexts + " " + btnDelete;
                            }

                        },
                        {
                            targets: 2,
                            render: (data, type, full, meta) => {
                                return `<i class="${full.icon}"></i> ${full.displayName}`
                            }
                        }
                    ];
                    table = $('#languages-table').DataTable({
                        data,
                        columns,
                        columnDefs
                    });
                });
            }
            loadLanguages();
            let deleteLanguage = (e) => {
                let id = $(e.target).data("id");
                abp.message.confirm(localization.localize("DeleteLanguage"), (response) => {
                    if (response) {
                        languagesService.deleteLanguage(id).done(() => {
                            abp.notify.success(localization.localize("LanguageDeleted"));
                            setTimeout(() => {
                                window.location.reload(true);
                            }, 3000);
                        });
                    }
                });
            }
            let createLanguage = () => {
                console.log("Create click");
                periModal.open("/AdminMpa/Languages/CreateLanguage",null, () => {

                });
                periModal.setOnClose(() => {
                    abp.notify.success(localization.localize("LanguageCreated"));
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 3000);
                });
            }
            $body.on("click", ".js-delete-language", deleteLanguage);
            $body.on("click", ".js-create-language", createLanguage);

        });
    }
}