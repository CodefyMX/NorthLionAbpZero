import { Localization } from "Languages/LocalizationHelper.js";
export class EditTextsWindow {
    load() {
        $(document).ready(() => {
            let localization = new Localization();
            const languageService = abp.services.app.language;
            const $updateFromXmlBtn = $(".js-update-from-xml");
            const sourceInput = $("#Source");
            const targetLang = $("#SelectedTargetLanguage");
            const sourceLang = $("#SelectedSourceLanguage");
            const $body = $("body");

            let table;
            let loadTextsTable = (source, sourceTarget, sourceLang) => {
                if (table) {
                    table.destroy();
                }
                languageService.getLocalizationTexts({ source: source, sourceLang: sourceLang, targetLang: sourceTarget }).done((response) => {
                    let data = response.texts;
                    let columns = [
                        {
                            "title": "",
                            "data": "id"
                        },
                        {
                            "title": localization.localize("Key"),
                            "data": "key"
                        },
                        {
                            "title": localization.localize("Source"),
                            "data": "sourceValue"
                        },
                        {
                            "title": localization.localize("Target"),
                            "data": "targetValue"
                        }
                    ]
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnEdit = `<a class="btn btn-default btn-xs js-edit-text" data-key="${full.key}" data-lang="${targetLang.val()}" data-source="${sourceInput.val()}" data-current="${full.targetValue}" data-id="${full.key}"><i data-key="${full.key}" data-lang="${targetLang.val()}" data-source="${sourceInput.val()}" data-current="${full.targetValue}" data-id="${full.key}" class="fa fa-edit"></i></a>`;
                                return btnEdit;
                            }

                        }
                    ];
                    table = $('#languageTextsTable').DataTable({
                        data,
                        columns,
                        columnDefs
                    });
                }).always(() => {
                    abp.ui.clearBusy();
                });
            }
            loadTextsTable(sourceInput.val(), targetLang.val(), sourceLang.val());
            let reloadTable = (e) => {
                e.stopImmediatePropagation();
                let src = sourceInput.val();
                let target = targetLang.val();
                let sourceAbp = sourceLang.val();
                loadTextsTable(src, target, sourceAbp);
            }
            let currentRowSelected;
            let editText = (e) => {
                var row = $(e.target).parent().parent();
                currentRowSelected = {
                    data: table.row(row).data(),
                    row: row
                };
                var data = {
                    LanguageName: $(e.target).data("lang"),
                    Key: $(e.target).data("key"),
                    Source: $(e.target).data("source"),
                    Value: $(e.target).data("current")
                };
                console.log(data);
                periModal.open("/AdminMpa/Languages/EditText/", data);
                periModal.setOnClose(() => {
                    abp.notify.success(localization.localize("TextSet"));
                });
            }
            $body.on('change', '.js-select', reloadTable);
            $body.on('click', '.js-edit-text', editText);
        });

    }
}