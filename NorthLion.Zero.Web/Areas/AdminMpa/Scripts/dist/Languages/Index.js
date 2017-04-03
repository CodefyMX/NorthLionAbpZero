"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, LanguageWindow;

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

            _export("LanguageWindow", LanguageWindow = function () {
                function LanguageWindow() {
                    _classCallCheck(this, LanguageWindow);
                }

                _createClass(LanguageWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var localization = new Localization();
                            var languagesService = abp.services.app.language;
                            var body = $("body");

                            var table = void 0;
                            var loadLanguages = function loadLanguages() {
                                if (table) {
                                    table.destroy();
                                }
                                abp.ui.setBusy();
                                languagesService.getLanguagesForTable({ getAll: true }).done(function (response) {
                                    abp.ui.clearBusy();
                                    var data = response.languages;
                                    var columns = [{
                                        "title": "",
                                        "data": "id"
                                    }, {
                                        "title": localization.localize("Name"),
                                        "data": "name"
                                    }, {
                                        "title": localization.localize("DisplayName"),
                                        "data": "displayName"
                                    }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnEdit = "<a class=\"btn btn-primary btn-xs js-edit-role\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-edit\"></i></a>";
                                            var btnDelete = "<a class=\"btn btn-danger btn-xs js-delete-role\" data-id=\"" + full.id + "\"><i data-id=\"" + full.id + "\" class=\"fa fa-times\"></i></a>";
                                            var btnTexts = "<a class=\"btn btn-default btn-xs\"><i class=\"fa fa-book\"></i></a>";
                                            return btnTexts + " " + btnEdit + " " + btnDelete;
                                        }

                                    }, {
                                        targets: 2,
                                        render: function render(data, type, full, meta) {
                                            return "<i class=\"" + full.icon + "\"></i> " + full.displayName;
                                        }
                                    }];
                                    table = $('#languages-table').DataTable({
                                        data: data,
                                        columns: columns,
                                        columnDefs: columnDefs
                                    });
                                });
                            };
                            loadLanguages();
                        });
                    }
                }]);

                return LanguageWindow;
            }());

            _export("LanguageWindow", LanguageWindow);
        }
    };
});