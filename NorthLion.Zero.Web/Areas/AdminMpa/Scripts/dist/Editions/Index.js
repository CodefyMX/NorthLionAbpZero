"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, EditionsWindow;

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

            _export("EditionsWindow", EditionsWindow = function () {
                function EditionsWindow() {
                    _classCallCheck(this, EditionsWindow);
                }

                _createClass(EditionsWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var localization = new Localization();
                            var $body = $("body");
                            var editionService = abp.services.app.edition;
                            var table = void 0;
                            var loadEditions = function loadEditions() {
                                if (table) {
                                    table.destroy();
                                }
                                abp.ui.setBusy();
                                editionService.getEditions({ getAll: true }).done(function (response) {
                                    abp.ui.clearBusy();
                                    var data = response.editions;
                                    var columns = [{ title: "", data: "id" }, { title: localization.localize("Name"), data: "name" }, { title: localization.localize("DisplayName"), data: "displayName" }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnEdit = "<a class=\"btn btn-primary btn-xs js-edit-edition\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-edit\"></i></a>";
                                            var btnDelete = "<a class=\"btn btn-danger btn-xs js-delete-edition\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-times\"></i></a>";
                                            return btnEdit + " " + btnDelete;
                                        }
                                    }];
                                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                                    table = $('#editions-table').DataTable({
                                        data: data,
                                        columns: columns,
                                        columnDefs: columnDefs
                                    });
                                }).always(function () {
                                    abp.ui.clearBusy();
                                });
                            };
                            loadEditions();

                            var editEdition = function editEdition(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/Editions/EditEdition/" + id, null, function () {});
                                periModal.setOnClose(function (data) {
                                    loadEditions();
                                });
                            };
                            var createEdition = function createEdition() {
                                periModal.open("/AdminMpa/Editions/CreateEdition", null, function () {});
                                periModal.setOnClose(function (data) {
                                    loadEditions();
                                });
                            };
                            var deleteEdition = function deleteEdition(e) {
                                var id = $(e.target).data("id");
                                abp.message.confirm(localization.localize("DeleteEdition"), function (response) {
                                    if (response) {
                                        editionService.deleteEdition(id).done(function () {
                                            abp.notify.warn(localization.localize("EditionDeleted"));
                                            loadEditions();
                                        });
                                    }
                                });
                            };
                            $body.on("click", ".js-create-edition", createEdition);
                            $body.on("click", ".js-edit-edition", editEdition);
                            $body.on("click", ".js-delete-edition", deleteEdition);
                        });
                    }
                }]);

                return EditionsWindow;
            }());

            _export("EditionsWindow", EditionsWindow);
        }
    };
});