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
                            var $body = $("body");

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
                                            var btnDelete = "<a class=\"btn btn-danger btn-xs js-delete-language\" data-id=\"" + full.name + "\"><i data-id=\"" + full.name + "\" class=\"fa fa-times\"></i></a>";
                                            var btnTexts = "<a href=\"/AdminMpa/Languages/EditTexts?name=" + full.name + "&currentLang=" + abp.localization.currentCulture.name + "\" class=\"btn btn-default btn-xs\"><i class=\"fa fa-book\"></i></a>";
                                            return btnTexts + " " + btnDelete;
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
                            var deleteLanguage = function deleteLanguage(e) {
                                var id = $(e.target).data("id");
                                abp.message.confirm(localization.localize("DeleteLanguage"), function (response) {
                                    if (response) {
                                        languagesService.deleteLanguage(id).done(function () {
                                            abp.notify.success(localization.localize("LanguageDeleted"));
                                            setTimeout(function () {
                                                window.location.reload(true);
                                            }, 3000);
                                        });
                                    }
                                });
                            };
                            var createLanguage = function createLanguage() {
                                console.log("Create click");
                                periModal.open("/AdminMpa/Languages/CreateLanguage", null, function () {});
                                periModal.setOnClose(function () {
                                    abp.notify.success(localization.localize("LanguageCreated"));
                                    setTimeout(function () {
                                        window.location.reload(true);
                                    }, 3000);
                                });
                            };
                            $body.on("click", ".js-delete-language", deleteLanguage);
                            $body.on("click", ".js-create-language", createLanguage);
                        });
                    }
                }]);

                return LanguageWindow;
            }());

            _export("LanguageWindow", LanguageWindow);
        }
    };
});