"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, TenantsWindow;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_LanguagesLocalizationHelperJs) {
            Localization = _LanguagesLocalizationHelperJs.Localization;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("TenantsWindow", TenantsWindow = function () {
                function TenantsWindow() {
                    _classCallCheck(this, TenantsWindow);
                }

                _createClass(TenantsWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var localization = new Localization();
                            var tenantService = abp.services.app.tenant;
                            var $body = $("body");
                            var table = void 0;
                            var loadTenants = function loadTenants() {
                                if (table) {
                                    table.destroy();
                                }
                                abp.ui.setBusy();
                                tenantService.getTenants({ getAll: true }).done(function (response) {

                                    abp.ui.clearBusy();
                                    var data = response.tenants;
                                    var columns = [{ title: "", data: "id" }, { title: localization.localize("Name"), data: "name" }, { title: localization.localize("DisplayName"), data: "tenancyName" }, { title: localization.localize("IsDeleted"), data: "isDeleted" }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnSetEdition = "<a class=\"btn btn-default btn-xs js-set-edition-tenant\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-list\"></i></a>";
                                            var btnSetFeatures = "<a class=\"btn btn-warning btn-xs js-set-features-tenant\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-cogs\"></i></a>";
                                            var btnEdit = "<a class=\"btn btn-primary btn-xs js-edit-tenant\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-edit\"></i></a>";
                                            var btnDelete = "<a class=\"btn btn-danger btn-xs js-delete-tenant\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-times\"></i></a>";
                                            var allBtns = btnSetFeatures + " " + btnSetEdition + " " + btnEdit;
                                            if (full.isDeleted) {
                                                var restoreBtn = "<a class=\"btn btn-success btn-xs js-restore-tenant\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-heart-o\"></i></a>";
                                                allBtns = allBtns + " " + restoreBtn;
                                            } else {
                                                allBtns = allBtns + " " + btnDelete;
                                            }
                                            return allBtns;
                                        }
                                    }, {
                                        targets: 3,
                                        render: function render(data, type, full, meta) {
                                            if (full.isDeleted) {
                                                return "<label class=\"label label-danger\">" + localization.localize("Deleted") + "</label>";
                                            }
                                            return "<label class=\"label label-primary\">" + localization.localize("Active") + "</label>";
                                        }
                                    }];
                                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                                    table = $('#tenants-table').DataTable({
                                        data: data,
                                        columns: columns,
                                        columnDefs: columnDefs
                                    });
                                }).always(function () {
                                    abp.ui.clearBusy();
                                });
                            };
                            loadTenants();

                            var setFeatures = function setFeatures(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/Tenants/SetFeatures/" + id, null, function () {});
                                periModal.setOnClose(function () {});
                            };
                            var setEdition = function setEdition(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/Tenants/SetEdition/" + id, null, function () {});
                                periModal.setOnClose(function () {});
                            };
                            var editTenant = function editTenant(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/Tenants/EditTenant/" + id, null, function () {});
                            };
                            var deleteTenant = function deleteTenant(e) {
                                var id = $(e.target).data("id");
                                abp.message.confirm(localization.localize("DeleteTenant"), function (response) {
                                    if (response) {
                                        tenantService.deleteTenant(id).done(function () {
                                            abp.notify.warn(localization.localize("TenantDeleted"));
                                            loadTenants();
                                        });
                                    }
                                });
                            };
                            var restoreTenant = function restoreTenant(e) {
                                var id = $(e.target).data("id");
                                abp.message.confirm(localization.localize("RestoreTenant"), function (response) {
                                    if (response) {
                                        tenantService.restoreTenant(id).done(function () {
                                            abp.notify.warn(localization.localize("TenantRestored"));
                                            loadTenants();
                                        });
                                    }
                                });
                            };
                            $body.on("click", ".js-set-edition-tenant", setEdition);
                            $body.on("click", ".js-set-features-tenant", setFeatures);
                            $body.on("click", ".js-edit-tenant", editTenant);
                            $body.on("click", ".js-delete-tenant", deleteTenant);
                            $body.on("click", ".js-restore-tenant", restoreTenant);
                            //Create tenant logic

                            var _$modal = $('#TenantCreateModal');
                            var _$form = _$modal.find('form');

                            _$form.validate();

                            _$form.find('button[type="submit"]').click(function (e) {
                                e.preventDefault();

                                if (!_$form.valid()) {
                                    return;
                                }
                                var tenant = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js

                                abp.ui.setBusy(_$modal);
                                tenantService.createTenant(tenant).done(function () {
                                    _$modal.modal('hide');
                                    loadTenants(); //reload page to see new tenant!
                                }).always(function () {
                                    abp.ui.clearBusy(_$modal);
                                });
                            });

                            _$modal.on('shown.bs.modal', function () {
                                _$modal.find('input:not([type=hidden]):first').focus();
                            });
                            //Create tenant logic
                        });
                    }
                }]);

                return TenantsWindow;
            }());

            _export("TenantsWindow", TenantsWindow);
        }
    };
});