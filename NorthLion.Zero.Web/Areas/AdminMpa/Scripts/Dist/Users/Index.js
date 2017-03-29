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
            location.reload(true); //reload page to see new user!
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

    var tableRequest = new TableObject();

    var loadUsers = function loadUsers(input) {
        console.log(input);
    };
    loadUsers(tableRequest);
});