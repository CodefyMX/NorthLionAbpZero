import { TableObject } from 'Layout/HelperObjects.js'
import { Localization } from 'Languages/LocalizationHelper.js';
export class UsersWindow {
    load() {
        let localization = new Localization();
        $(document).ready(() => {
            const $body = $("body");
            const userService = abp.services.app.user;
            const $modal = $("#UserCreateModal");
            const $form = $modal.find("form");
            $form.validate();
            $form.find('button[type="submit"]').click((e) => {
                e.preventDefault();

                if (!$form.valid()) {
                    return;
                }

                const user = $form.serializeFormToObject(); //serializeFormToObject is defined in main.js

                abp.ui.setBusy($modal);
                userService.createUser(user).done(() => {
                    $modal.modal("hide");
                    loadUsers();
                    //location.reload(true); //reload page to see new user!
                }).always(() => {
                    abp.ui.clearBusy($modal);
                });
            });
            $modal.on("shown.bs.modal",
                () => {
                    $modal.find("input:not([type=hidden]):first").focus();
                });
            //Main Functions
            let deleteUser = (id) => {

                abp.message.confirm(localization.localize("DeleteUser"), (response) => {

                    if (response) {
                        abp.ui.setBusy();
                        userService.deleteUser(id).then(() => {
                            abp.notify.warn(localization.localize("Deleted"))
                            loadUsers();
                            abp.ui.clearBusy();
                        }).always(() => {
                            abp.ui.clearBusy();
                        });
                    }
                });
            }
            let table;
            let tableRequest = new TableObject();
            let loadUsers = (input = new TableObject()) => {
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                userService.getUsers(input).done((response) => {
                    abp.ui.clearBusy();
                    let data = response.users;
                    let columns = [
                        { title: "", data: "id" },
                        { title: "Full Name", data: "fullName" },
                        { title: "Username", data: "userName" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnEdit = `<a class="btn btn-primary btn-xs" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-user" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-times"></i></a>`;
                                return btnEdit + " " + btnDelete;
                            }
                        }
                    ]
                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                    table = $('#users-table').DataTable({
                        data,
                        columns,
                        columnDefs
                    });

                }).always(() => {
                    abp.ui.clearBusy();
                });
            }
            let deleteEvent = (e) => {
                let id = $(e).data("id");
                deleteUser(id);
            }
            $body.on("click", ".js-delete-user", (e) => {
                deleteEvent(e.target);
            })
            loadUsers();
        });
    }
}