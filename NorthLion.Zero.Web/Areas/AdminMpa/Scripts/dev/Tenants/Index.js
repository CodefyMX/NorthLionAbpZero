import { Localization } from "Languages/LocalizationHelper.js";
export class TenantsWindow {
    load() {
        $(document).ready(() => {
            let localization = new Localization();
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
                        { title: localization.localize("Name"), data: "name" },
                        { title: localization.localize("DisplayName"), data: "tenancyName" },
                        { title: localization.localize("IsDeleted"), data: "isDeleted" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnSetEdition = `<a class="btn btn-default btn-xs js-set-edition-tenant" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-list"></i></a>`;
                                let btnSetFeatures = `<a class="btn btn-warning btn-xs js-set-features-tenant" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-cogs"></i></a>`;
                                let btnEdit = `<a class="btn btn-primary btn-xs js-edit-tenant" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                let btnDelete = `<a class="btn btn-danger btn-xs js-delete-tenant" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-times"></i></a>`;
                                let allBtns = btnSetFeatures + " " + btnSetEdition + " " + btnEdit;
                                if (full.isDeleted) {
                                    let restoreBtn = `<a class="btn btn-success btn-xs js-restore-tenant" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-heart-o"></i></a>`;
                                    allBtns = allBtns + " " + restoreBtn;
                                }
                                else {
                                    allBtns = allBtns + " " + btnDelete;
                                }
                                return allBtns;
                            }
                        },
                        {
                            targets: 3,
                            render: (data, type, full, meta) => {
                                if (full.isDeleted) {
                                    return `<label class="label label-danger">${localization.localize("Deleted")}</label>`
                                }
                                return `<label class="label label-primary">${localization.localize("Active")}</label>`
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

            let setFeatures = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Tenants/SetFeatures/" + id, null, function () {

                });
                periModal.setOnClose(() => {

                });
            }
            let setEdition = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Tenants/SetEdition/" + id, null, function () {
                    
                });
                periModal.setOnClose(() => {

                });
            }
            let editTenant = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/Tenants/EditTenant/" + id, null, function () {

                });
            }
            let deleteTenant = (e) => {
                let id = $(e.target).data("id");
                abp.message.confirm(localization.localize("DeleteTenant"), (response) => {
                    if (response) {
                        tenantService.deleteTenant(id).done(() => {
                            abp.notify.warn(localization.localize("TenantDeleted"));
                            loadTenants();
                        });
                    }
                });
            }
            let restoreTenant = (e) => {
                let id = $(e.target).data("id");
                abp.message.confirm(localization.localize("RestoreTenant"), (response) => {
                    if (response) {
                        tenantService.restoreTenant(id).done(() => {
                            abp.notify.warn(localization.localize("TenantRestored"));
                            loadTenants();
                        });
                    }
                });
            }
            $body.on("click", ".js-set-edition-tenant", setEdition);
            $body.on("click", ".js-set-features-tenant", setFeatures);
            $body.on("click", ".js-edit-tenant", editTenant);
            $body.on("click", ".js-delete-tenant", deleteTenant);
            $body.on("click", ".js-restore-tenant", restoreTenant);
            //Create tenant logic

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
            //Create tenant logic
        });
    }
}