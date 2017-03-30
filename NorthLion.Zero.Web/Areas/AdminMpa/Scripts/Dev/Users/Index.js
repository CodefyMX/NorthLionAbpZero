import { TableObject } from 'Layout/HelperObjects.js'
import { Localization } from 'Languages/LocalizationHelper.js';
export class UsersWindow {
    load() {
        $(document).ready(() => {
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
                abp.message.confirm(Localization.localize("DeleteUser"), (response) => {
                    if (response) {
                        userService.deleteUser(id).then(() => {
                            abp.notify.warn(Localization.localize("Deleted"))
                        });
                    }
                })
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
                        { title: "Id", data: "id" },
                        { title: "Full Name", data: "fullName" },
                        { title: "Username", data: "userName" }
                    ];
                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                    table = $('#users-table').DataTable({
                        data,
                        columns
                    });

                }).always(() => {
                    abp.ui.clearBusy();
                });
            }
            loadUsers(tableRequest);
        });
    }
}