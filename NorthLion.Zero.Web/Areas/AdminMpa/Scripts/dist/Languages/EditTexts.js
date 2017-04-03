"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, EditTextsWindow;

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

            _export("EditTextsWindow", EditTextsWindow = function () {
                function EditTextsWindow() {
                    _classCallCheck(this, EditTextsWindow);
                }

                _createClass(EditTextsWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var localization = new Localization();
                            var languageService = abp.services.app.language;
                            var $updateFromXmlBtn = $(".js-update-from-xml");
                            var sourceInput = $("#Source");
                            var targetLang = $("#SelectedTargetLanguage");
                            var sourceLang = $("#SelectedSourceLanguage");
                            var $body = $("body");

                            var table = void 0;
                            var loadTextsTable = function loadTextsTable(source, sourceTarget, sourceLang) {
                                if (table) {
                                    table.destroy();
                                }
                                languageService.getLocalizationTexts({ source: source, sourceLang: sourceLang, targetLang: sourceTarget }).done(function (response) {
                                    var data = response.texts;
                                    var columns = [{
                                        "title": "",
                                        "data": "id"
                                    }, {
                                        "title": localization.localize("Key"),
                                        "data": "key"
                                    }, {
                                        "title": localization.localize("Source"),
                                        "data": "sourceValue"
                                    }, {
                                        "title": localization.localize("Target"),
                                        "data": "targetValue"
                                    }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnEdit = "<a class=\"btn btn-default btn-xs js-edit-text\" data-key=\"" + full.key + "\" data-lang=\"" + targetLang.val() + "\" data-source=\"" + sourceInput.val() + "\" data-current=\"" + full.targetValue + "\" data-id=\"" + full.key + "\"><i data-key=\"" + full.key + "\" data-lang=\"" + targetLang.val() + "\" data-source=\"" + sourceInput.val() + "\" data-current=\"" + full.targetValue + "\" data-id=\"" + full.key + "\" class=\"fa fa-edit\"></i></a>";
                                            return btnEdit;
                                        }

                                    }];
                                    table = $('#languageTextsTable').DataTable({
                                        data: data,
                                        columns: columns,
                                        columnDefs: columnDefs
                                    });
                                }).always(function () {
                                    abp.ui.clearBusy();
                                });
                            };
                            loadTextsTable(sourceInput.val(), targetLang.val(), sourceLang.val());
                            var reloadTable = function reloadTable(e) {
                                e.stopImmediatePropagation();
                                var src = sourceInput.val();
                                var target = targetLang.val();
                                var sourceAbp = sourceLang.val();
                                loadTextsTable(src, target, sourceAbp);
                            };
                            var currentRowSelected = void 0;
                            var editText = function editText(e) {
                                var row = $(e.target).parent().parent();
                                currentRowSelected = {
                                    data: table.row(row).data(),
                                    row: row
                                };
                                var data = {
                                    LanguageName: $(e.target).data("lang"),
                                    Key: $(e.target).data("key"),
                                    Source: $(e.target).data("source"),
                                    Value: $(e.target).data("current")
                                };
                                console.log(data);
                                periModal.open("/AdminMpa/Languages/EditText/", data);
                                periModal.setOnClose(function () {
                                    abp.notify.success(localization.localize("TextSet"));
                                });
                            };
                            $body.on('change', '.js-select', reloadTable);
                            $body.on('click', '.js-edit-text', editText);
                        });
                    }
                }]);

                return EditTextsWindow;
            }());

            _export("EditTextsWindow", EditTextsWindow);
        }
    };
});