export class ChangePasswordWindow {
    load() {
        $(document)
            .ready(() => {

                const _userAppService = abp.services.app.user;
                const $form = $("#changePasswordForm");
                $form.on("submit",
                    (e) => {
                        let self = e.target;
                        e.preventDefault();

                        let confirmPasswordVal = $(".js-confirm-password").val();
                        let passwordVal = $(".js-password").val();

                        if (confirmPasswordVal !== passwordVal) {
                            abp.message.error("Error");
                        } else {
                            let data = $(self).serializeFormToObject();
                            abp.ui.setBusy($form, _userAppService.changePasswordFromAdmin(data).done(() => {
                                periModal.close();
                            }));
                        }
                    });
            });
    }
}