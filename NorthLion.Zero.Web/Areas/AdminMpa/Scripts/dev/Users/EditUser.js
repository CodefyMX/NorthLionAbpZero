import { UsersWindow } from "Users/Index.js";
export class EditUserWindow {
    load() {
        const userService = abp.services.app.user;
        $(document).ready(() => {
            //Gets the UsersWindow modal instance
            let $form = $("#userEditForm");
            let modalInstance = new UsersWindow().getModalInstance();
            let closeModal = () => {
                modalInstance.modal("hide");
            }
            $form.on("submit", (e) => {
                e.preventDefault();
                if (!$form.valid()) {
                    return;
                }
                const user = $form.serializeFormToObject(); //serializeFormToObject is defined in main.js
                abp.ui.setBusy();
                userService.editUser(user).done(() => {
                    closeModal();
                }).always(() => {
                    abp.ui.clearBusy();
                });
            })

        });
    }
}