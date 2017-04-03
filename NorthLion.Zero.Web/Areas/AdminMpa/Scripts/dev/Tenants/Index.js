export class TenantsWindow {
    load() {
        $(document).ready(() => {
            const tenantService = abp.services.app.tenant;
            const $body = $("body");
            let table;
            let loadTenants = () => {
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                tenantService.getTenants({ getAll: true }).done((response) => {

                    abp.ui.clearBusy();
                    let data = response.tenants;
                    let columns = [
                        { title: "", data: "id" },
                        { title: "Name", data: "name" },
                        { title: "DisplayName", data: "tenancyName" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnEdit = `<a class="btn btn-primary btn-xs js-edit-role" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-role" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-times"></i></a>`;
                                return btnEdit + " " + btnDelete;
                            }
                        }
                    ]
                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                    table = $('#tenants-table').DataTable({
                        data,
                        columns,
                        columnDefs
                    });
                }).always(() => {
                    abp.ui.clearBusy();
                });
            }
            loadTenants();
            const _$modal = $('#TenantCreateModal');
            const _$form = _$modal.find('form');

            _$form.validate();

            _$form.find('button[type="submit"]').click((e) => {
                e.preventDefault();

                if (!_$form.valid()) {
                    return;
                }
                let tenant = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js

                abp.ui.setBusy(_$modal);
                tenantService.createTenant(tenant).done(() => {
                    _$modal.modal('hide');
                    loadTenants(); //reload page to see new tenant!
                }).always(() => {
                    abp.ui.clearBusy(_$modal);
                });
            });

            _$modal.on('shown.bs.modal', () => {
                _$modal.find('input:not([type=hidden]):first').focus();
            });
        });
    }
}