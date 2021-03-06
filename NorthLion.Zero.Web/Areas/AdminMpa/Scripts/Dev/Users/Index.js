﻿import { Localization } from 'Languages/LocalizationHelper.js';
export class UsersWindow {
    getModalInstance() {
        return modal;
    }
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
            let loadUsers = () => {
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                userService.getUsers({ getAll: true }).done((response) => {
                    abp.ui.clearBusy();
                    let data = response.users;
                    let columns = [
                        { title: "", data: "id" },
                        { title: localization.localize("FullName"), data: "fullName" },
                        { title: localization.localize("Username"), data: "userName" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnEdit = `<a class="btn btn-primary btn-xs js-edit-user" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-user" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-times"></i></a>`;
                                let btnPermissions = `<a class="btn btn-warning btn-xs js-permission-user" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-lock"></i></a>`;
                                let btnRoles = `<a class="btn btn-primary btn-xs js-roles-user" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-list"></i></a>`;
                                let btnChangePassword = `<a class="btn btn-default btn-xs js-change-password-user" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-key"></i></a>`;
                                return btnEdit + " " + btnPermissions + " " + btnChangePassword + " " + btnRoles + " " + btnDelete;
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
                let id = $(e.target).data("id");
                deleteUser(id);
            }
            let setPermissions = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Users/SetPermissions/" + id, null, () => {
                });
                periModal.setOnClose(() => {
                    abp.notify.success(localization.localize("PermissionsSet"));
                });
            }
            let setRoles = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Users/SetRoles/" + id, null, () => {
                });
                periModal.setOnClose(() => {
                    abp.notify.success(localization.localize("RolesSet"));
                });
            }
            let editUser = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Users/EditUser/" + id, null, () => {
                });
                periModal.setOnClose(() => {
                    abp.notify.success(localization.localize("UserEdited"));
                });
            }
            let changePassword = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Users/ChangePassword/" + id, null, () => {

                });
                periModal.setOnClose(() => {
                    abp.notify.warn(localization.localize("PasswordSet"));
                });
            }

            $body.on("click", ".js-delete-user", deleteEvent);
            $body.on("click", ".js-permission-user", setPermissions);
            $body.on("click", ".js-edit-user", editUser);
            $body.on("click", ".js-roles-user", setRoles);
            $body.on("click", ".js-change-password-user", changePassword);
            loadUsers();
        });
    }
}