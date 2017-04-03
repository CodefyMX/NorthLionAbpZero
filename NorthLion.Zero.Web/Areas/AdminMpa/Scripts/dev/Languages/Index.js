import { Localization } from "Languages/LocalizationHelper.js";
export class LanguageWindow {
    load() {
        $(document).ready(function () {
            let localization = new Localization();
            const languagesService = abp.services.app.language;
            let body = $("body");

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
                                let btnEdit = `<a class="btn btn-primary btn-xs js-edit-role" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-role" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-times"></i></a>`;
                                let btnTexts = `<a class="btn btn-default btn-xs"><i class="fa fa-book"></i></a>`;
                                return btnTexts + " "+ btnEdit + " " + btnDelete;
                            }

                        },
                        {
                            targets: 2,
                            render: (data, type, full, meta) => {
                                return  `<i class="${full.icon}"></i> ${full.displayName}`
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
        });
    }
}