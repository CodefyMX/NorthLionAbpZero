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
        abp.message.confirm(localize("DeleteUser"),(response)=>{
            if(response){
                userService.deleteUser(id).then(()=>{
                    abp.notify.warn(localize("Deleted"))
                });
            }
        })
    }

    let tableRequest = new TableObject();

    let loadUsers = (input) => {
        console.log(input);
    }
    loadUsers(tableRequest);
});