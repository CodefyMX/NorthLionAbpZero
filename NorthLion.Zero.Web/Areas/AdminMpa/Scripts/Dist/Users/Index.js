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

    var loadUsers = function loadUsers() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new TableObject();

        userService.getUsers(input).done(function (data) {
            $("#example-table").tabulator({
                height: "320px", // set height of table (optional)
                fitColumns: true, //fit columns to width of table (optional)
                columns: [//Define Table Columns
                {
                    title: localize("Name"),
                    field: "fullName",
                    sorter: "string",
                    width: 150
                }],
                rowClick: function rowClick(e, id, data, row) {
                    //trigger an alert message when the row is clicked
                    alert("Row " + id + " Clicked!!!!");
                }
            });
            $("#example-table").tabulator("setData", data.users);
        });
    };
    loadUsers(tableRequest);
    var properties = new CustomTableAjaxRequest();
    console.log(properties);
});