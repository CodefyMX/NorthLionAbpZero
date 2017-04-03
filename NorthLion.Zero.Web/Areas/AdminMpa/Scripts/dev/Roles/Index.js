import {Localization} from "Languages/LocalizationHelper.js";
export class RolesWindow {
    load() {
        $(document).ready(() => {
            var localization = new Localization();
            const rolesService = abp.services.app.role;
            const $body = $("body");
            console.log("Roles window loaded");
            let table;
            let loadRoles = () => {
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                rolesService.getRoles({ getAll: true }).done((response) => {
                    abp.ui.clearBusy();
                    let data = response.roles;
                    let columns = [
                        { title: "", data: "id" },
                        { title: "Name", data: "name" },
                        { title: "DisplayName", data: "displayName" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnEdit = `<a class="btn btn-primary btn-xs js-edit-role" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-role" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-times"></i></a>`;
                                return btnEdit + " " + btnDelete;
                            }
                        }
                    ]
                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                    table = $('#roles-table').DataTable({
                        data,
                        columns,
                        columnDefs
                    });

                }).always(() => {
                    abp.ui.clearBusy();
                });
            }
            let deleteRole = (e) => {
                let id = $(e.target).data("id");
                abp.message.confirm(localization.localize("DeleteRole"), (response) => {
                    if (response) {
                        abp.ui.setBusy();
                        rolesService.deleteRole(id).then(() => {
                            abp.notify.warn(localization.localize("Deleted"))
                            loadRoles();
                            abp.ui.clearBusy();
                        }).always(() => {
                            abp.ui.clearBusy();
                        });
                    }
                });
            }
            let createRole = ()=>{
                periModal.open("/AdminMpa/Roles/CreateRole/", () => {

                });
                periModal.setOnClose(() => {
                    abp.notify.success(localization.localize("RoleCreated"));
                    loadRoles();
                });
            }
            let editRole = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Roles/EditRole/" + id, () => {

                });
                periModal.setOnClose(() => {
                    abp.notify.success(localization.localize("RoleEdited"));
                });
            }
            $body.on("click", ".js-delete-role", deleteRole);
            $body.on("click", ".js-edit-role", editRole);
            $body.on("click", ".js-create-role", createRole);
            loadRoles();
        });
    }
}