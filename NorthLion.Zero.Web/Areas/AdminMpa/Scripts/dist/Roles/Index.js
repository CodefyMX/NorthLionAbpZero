"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, RolesWindow;

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

            _export("RolesWindow", RolesWindow = function () {
                function RolesWindow() {
                    _classCallCheck(this, RolesWindow);
                }

                _createClass(RolesWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var localization = new Localization();
                            var rolesService = abp.services.app.role;
                            var $body = $("body");
                            console.log("Roles window loaded");
                            var table = void 0;
                            var loadRoles = function loadRoles() {
                                if (table) {
                                    table.destroy();
                                }
                                abp.ui.setBusy();
                                rolesService.getRoles({ getAll: true }).done(function (response) {
                                    abp.ui.clearBusy();
                                    var data = response.roles;
                                    var columns = [{ title: "", data: "id" }, { title: localization.localize("Name"), data: "name" }, { title: localization.localize("DisplayName"), data: "displayName" }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnEdit = "<a class=\"btn btn-primary btn-xs js-edit-role\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-edit\"></i></a>";
                                            var btnDelete = "<a class=\"btn btn-danger btn-xs js-delete-role\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-times\"></i></a>";
                                            return btnEdit + " " + btnDelete;
                                        }
                                    }];
                                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                                    table = $('#roles-table').DataTable({
                                        data: data,
                                        columns: columns,
                                        columnDefs: columnDefs
                                    });
                                }).always(function () {
                                    abp.ui.clearBusy();
                                });
                            };
                            var deleteRole = function deleteRole(e) {
                                var id = $(e.target).data("id");
                                abp.message.confirm(localization.localize("DeleteRole"), function (response) {
                                    if (response) {
                                        abp.ui.setBusy();
                                        rolesService.deleteRole(id).then(function () {
                                            abp.notify.warn(localization.localize("Deleted"));
                                            loadRoles();
                                            abp.ui.clearBusy();
                                        }).always(function () {
                                            abp.ui.clearBusy();
                                        });
                                    }
                                });
                            };
                            var createRole = function createRole() {
                                periModal.open("/AdminMpa/Roles/CreateRole/", null, function () {});
                                periModal.setOnClose(function () {
                                    abp.notify.success(localization.localize("RoleCreated"));
                                    loadRoles();
                                });
                            };
                            var editRole = function editRole(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/Roles/EditRole/" + id, null, function () {});
                                periModal.setOnClose(function () {
                                    abp.notify.success(localization.localize("RoleEdited"));
                                });
                            };
                            $body.on("click", ".js-delete-role", deleteRole);
                            $body.on("click", ".js-edit-role", editRole);
                            $body.on("click", ".js-create-role", createRole);
                            loadRoles();
                        });
                    }
                }]);

                return RolesWindow;
            }());

            _export("RolesWindow", RolesWindow);
        }
    };
});