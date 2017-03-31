export class SetRolesWindow {
    load() {
        $(document).ready(() => {
            const _userAppService = abp.services.app.user;
            const $form = $("#selectRoles");

            $form.on("submit", (e) => {
                e.preventDefault();
                let data = {
                    userId: $("#UserId").val(),
                    roles: []
                };

                let inputsChecked = $("#selectRoles input:checked");

                inputsChecked.each((i, e) => {
                    let $self = $(e);

                    let checkedElementValue = $self.val();

                    data.roles.push(checkedElementValue);
                });

                _userAppService.setUserRoles(data).done(() => {
                    periModal.close();
                });

            });
        });


    }
}

