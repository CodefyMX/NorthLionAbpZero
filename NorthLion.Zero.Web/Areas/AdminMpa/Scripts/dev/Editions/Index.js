import { Localization } from "Languages/LocalizationHelper.js";
export class EditionsWindow {
    load() {
        $(document).ready(() => {
            let localization = new Localization();
            const $body = $("body");
            const editionService = abp.services.app.edition;
            let table;
            let loadEditions = () => {
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                editionService.getEditions({ getAll: true }).done((response) => {
                    abp.ui.clearBusy();
                    let data = response.editions;
                    let columns = [
                        { title: "", data: "id" },
                        { title: localization.localize("Name"), data: "name" },
                        { title: localization.localize("DisplayName"), data: "displayName" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnEdit = `<a class="btn btn-primary btn-xs js-edit-edition" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-edition" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-times"></i></a>`;
                                return btnEdit + " " + btnDelete;
                            }
                        }
                    ]
                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                    table = $('#editions-table').DataTable({
                        data,
                        columns,
                        columnDefs
                    });
                }).always(() => {
                    abp.ui.clearBusy();
                });
            }
            loadEditions();

            let editEdition = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Editions/EditEdition/" + id, null, () => {
                });
                periModal.setOnClose((data) => {
                    loadEditions();
                })
            }
            let createEdition = () => {
                periModal.open("/AdminMpa/Editions/CreateEdition", null, () => {

                });
                periModal.setOnClose((data) => {
                    loadEditions();
                })
            }
            let deleteEdition = (e) => {
                let id = $(e.target).data("id");
                abp.message.confirm(localization.localize("DeleteEdition"), (response) => {
                    if (response) {
                        editionService.deleteEdition(id).done(() => {
                            abp.notify.warn(localization.localize("EditionDeleted"));
                            loadEditions();
                        });
                    }
                })

            }
            $body.on("click", ".js-create-edition", createEdition);
            $body.on("click", ".js-edit-edition", editEdition);
            $body.on("click", ".js-delete-edition", deleteEdition);

        });
    }
}