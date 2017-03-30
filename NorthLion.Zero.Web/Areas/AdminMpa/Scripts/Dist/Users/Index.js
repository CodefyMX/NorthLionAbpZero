"use strict";

$(document).ready(function () {
    var userService = abp.services.app.user;
    var $modal = $("#UserCreateModal");
    var $form = $modal.find("form");
    $form.validate();
    $form.find('button[type="submit"]').click(function (e) {
        e.preventDefault();

        if (!$form.valid()) {
            return;
        }

        var user = $form.serializeFormToObject(); //serializeFormToObject is defined in main.js

        abp.ui.setBusy($modal);
        userService.createUser(user).done(function () {
            $modal.modal("hide");
            loadUsers();
            //location.reload(true); //reload page to see new user!
        }).always(function () {
            abp.ui.clearBusy($modal);
        });
    });
    $modal.on("shown.bs.modal", function () {
        $modal.find("input:not([type=hidden]):first").focus();
    });

    //Main Functions


    var deleteUser = function deleteUser(id) {
        abp.message.confirm(localize("DeleteUser"), function (response) {
            if (response) {
                userService.deleteUser(id).then(function () {
                    abp.notify.warn(localize("Deleted"));
                });
            }
        });
    };
    var table = void 0;
    var tableRequest = new TableObject();
    var loadUsers = function loadUsers() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new TableObject();

        if (table) {
            table.destroy();
        }
        abp.ui.setBusy();
        userService.getUsers(input).done(function (response) {
            abp.ui.clearBusy();
            var data = response.users;
            var columns = [{ title: "Id", data: "id" }, { title: "Full Name", data: "fullName" }, { title: "Username", data: "userName" }];
            //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
            table = $('#users-table').DataTable({
                data: data,
                columns: columns
            });
        }).always(function () {
            abp.ui.clearBusy();
        });
    };
    loadUsers(tableRequest);
});