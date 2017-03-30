import { UsersWindow } from "Users/Index.min.js";
export class EditUserWindow {
    load() {
        $(document).ready(() => {
            //Gets the UsersWindow modal instance
            let modalInstance = new UsersWindow().getModalInstance();
            let closeModal = () => {
                modalInstance.modal("hide");
            }
        });
    }
}