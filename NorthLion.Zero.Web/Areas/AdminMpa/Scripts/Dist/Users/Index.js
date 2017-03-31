"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, modal, UsersWindow;

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

            modal = void 0;

            _export("UsersWindow", UsersWindow = function () {
                function UsersWindow() {
                    _classCallCheck(this, UsersWindow);
                }

                _createClass(UsersWindow, [{
                    key: "getModalInstance",
                    value: function getModalInstance() {
                        return modal;
                    }
                }, {
                    key: "load",
                    value: function load() {
                        var localization = new Localization();
                        $(document).ready(function () {
                            var $body = $("body");
                            var userService = abp.services.app.user;
                            var $modal = $("#UserCreateModal");
                            var $form = $modal.find("form");
                            $form.validate();
                            $form.find('button[type="submit"]').click(function (e) {
                                e.preventDefault();

                                if (!$form.valid()) {
                                    return;
                                }
                                var user = $form.serializeFormToObject(); //serializeFormToObject is defined in main.js

                                abp.ui.setBusy($modal);
                                userService.createUser(user).done(function () {
                                    $modal.modal("hide");
                                    loadUsers();
                                    //location.reload(true); //reload page to see new user!
                                }).always(function () {
                                    abp.ui.clearBusy($modal);
                                });
                            });
                            $modal.on("shown.bs.modal", function () {
                                $modal.find("input:not([type=hidden]):first").focus();
                            });
                            //Main Functions
                            var deleteUser = function deleteUser(id) {

                                abp.message.confirm(localization.localize("DeleteUser"), function (response) {

                                    if (response) {
                                        abp.ui.setBusy();
                                        userService.deleteUser(id).then(function () {
                                            abp.notify.warn(localization.localize("Deleted"));
                                            loadUsers();
                                            abp.ui.clearBusy();
                                        }).always(function () {
                                            abp.ui.clearBusy();
                                        });
                                    }
                                });
                            };
                            var table = void 0;
                            var loadUsers = function loadUsers() {
                                if (table) {
                                    table.destroy();
                                }
                                abp.ui.setBusy();
                                userService.getUsers({ getAll: true }).done(function (response) {
                                    abp.ui.clearBusy();
                                    var data = response.users;
                                    var columns = [{ title: "", data: "id" }, { title: "Full Name", data: "fullName" }, { title: "Username", data: "userName" }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnEdit = "<a class=\"btn btn-primary btn-xs js-edit-user\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-edit\"></i></a>";
                                            var btnDelete = "<a class=\"btn btn-danger btn-xs js-delete-user\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-times\"></i></a>";
                                            var btnPermissions = "<a class=\"btn btn-warning btn-xs js-permission-user\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-lock\"></i></a>";
                                            var btnRoles = "<a class=\"btn btn-primary btn-xs js-roles-user\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-list\"></i></a>";
                                            return btnEdit + " " + btnPermissions + " " + btnRoles + " " + btnDelete;
                                        }
                                    }];
                                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                                    table = $('#users-table').DataTable({
                                        data: data,
                                        columns: columns,
                                        columnDefs: columnDefs
                                    });
                                }).always(function () {
                                    abp.ui.clearBusy();
                                });
                            };
                            var deleteEvent = function deleteEvent(e) {
                                var id = $(e.target).data("id");
                                deleteUser(id);
                            };
                            var setPermissions = function setPermissions(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/Users/SetPermissions/" + id, function () {});
                                periModal.setOnClose(function () {
                                    abp.notify.success(localization.localize("PermissionsSet"));
                                });
                            };
                            var setRoles = function setRoles(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/Users/SetRoles/" + id, function () {});
                                periModal.setOnClose(function () {
                                    abp.notify.success(localization.localize("RolesSet"));
                                });
                            };
                            var editUser = function editUser(e) {
                                var id = $(e.target).data("id");

                                periModal.open("/AdminMpa/Users/EditUser/" + id, function () {});

                                periModal.setOnClose(function () {
                                    abp.notify.success(localization.localize("UserEdited"));
                                });
                            };

                            $body.on("click", ".js-delete-user", deleteEvent);
                            $body.on("click", ".js-permission-user", setPermissions);
                            $body.on("click", ".js-edit-user", editUser);
                            $body.on("click", ".js-roles-user", setRoles);

                            loadUsers();
                        });
                    }
                }]);

                return UsersWindow;
            }());

            _export("UsersWindow", UsersWindow);
        }
    };
});