$(document).ready(() => {
    const userService = abp.services.app.user;
    const $modal = $("#UserCreateModal");
    const $form = $modal.find("form");
    $form.validate();
    $form.find('button[type="submit"]').click(function (e) {
        e.preventDefault();

        if (!$form.valid()) {
            return;
        }

        const user = $form.serializeFormToObject(); //serializeFormToObject is defined in main.js

        abp.ui.setBusy($modal);
        userService.createUser(user).done(function () {
            $modal.modal("hide");
            location.reload(true); //reload page to see new user!
        }).always(function () {
            abp.ui.clearBusy($modal);
        });
    });
    $modal.on("shown.bs.modal",
        () => {
            $modal.find("input:not([type=hidden]):first").focus();
        });

    //Main Functions



    let deleteUser = (id) => {
        abp.message.confirm(localize("DeleteUser"), (response) => {
            if (response) {
                userService.deleteUser(id).then(() => {
                    abp.notify.warn(localize("Deleted"))
                });
            }
        })
    }

    let tableRequest = new TableObject();

    let loadUsers = (input = new TableObject()) => {
        userService.getUsers(input).done((data) => {
            $("#example-table").tabulator({
                height: "320px", // set height of table (optional)
                fitColumns: true, //fit columns to width of table (optional)
                columns: [ //Define Table Columns
                    {
                        title: localize("Name"),
                        field: "fullName",
                        sorter: "string",
                        width: 150
                    },
                ],
                rowClick: (e, id, data, row) => {
                    //trigger an alert message when the row is clicked
                    alert("Row " + id + " Clicked!!!!");
                }
            });
            $("#example-table").tabulator("setData", data.users);
        });
    }
    loadUsers(tableRequest);
    let properties = new CustomTableAjaxRequest();
    console.log(properties);
});