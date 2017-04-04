export class SetTenantEditionWindow {
    load() {
        $(document)
            .ready(() => {
                const tenantService = abp.services.app.tenant;
                const $form = $("#setTenantEdition");

                $form.on("submit",
                    (e) => {

                        e.preventDefault();


                        let editionId = $('input[name=edition]:checked', "#setTenantEdition").val();
                        let tenantId = $("#TenantId").val();
                        let data = {
                            tenantId,
                            editionId
                        };


                        abp.ui.setBusy($form, tenantService.setTenantEdition(data).done(() => {

                            periModal.close();

                        }));

                    });


            });
    }
}