import { UsersWindow } from "Users/Index.js";
export class EditUserWindow {
    load() {
        $(document).ready(() => {
            abp.notify.success("Edit user window");
            console.log(new UsersWindow());
        });
    }
}