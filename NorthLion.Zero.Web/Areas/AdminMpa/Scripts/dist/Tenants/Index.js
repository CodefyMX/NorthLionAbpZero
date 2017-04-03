"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, TenantsWindow;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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
                                    var columns = [{ title: "", data: "id" }, { title: "Name", data: "name" }, { title: "DisplayName", data: "tenancyName" }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnEdit = "<a class=\"btn btn-primary btn-xs js-edit-role\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-edit\"></i></a>";
                                            var btnDelete = "<a class=\"btn btn-danger btn-xs js-delete-role\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-times\"></i></a>";
                                            return btnEdit + " " + btnDelete;
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
                        });
                    }
                }]);

                return TenantsWindow;
            }());

            _export("TenantsWindow", TenantsWindow);
        }
    };
});