"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, CreateLanguageWindow;

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

            _export("CreateLanguageWindow", CreateLanguageWindow = function () {
                function CreateLanguageWindow() {
                    _classCallCheck(this, CreateLanguageWindow);
                }

                _createClass(CreateLanguageWindow, [{
                    key: "load",
                    value: function load() {
                        var localization = new Localization();
                        var languageService = abp.services.app.language;
                        $(document).ready(function () {
                            var $form = $("#createLanguageForm");
                            $form.on("submit", function (e) {
                                e.preventDefault();
                                var icon = $("#icon").val();
                                var name = $("#name").val();
                                var optionSelected = $("#name option:selected");
                                var displayNameText = optionSelected.text();
                                var displayName = displayNameText.substring(0, displayNameText.indexOf("(") - 1);
                                var data = {
                                    Icon: icon,
                                    LangCode: name,
                                    DisplayName: displayName
                                };
                                abp.ui.setBusy($form, languageService.createLanguage(data).done(function () {
                                    periModal.close();
                                }));
                            });
                        });
                    }
                }, {
                    key: "fixSelects",
                    value: function fixSelects() {
                        var selectOptions = $("#icon option").each(function (i, e) {
                            var option = $(e);
                            var icon = option.data("icon");
                            console.log(icon);
                            console.log(option);
                            option.append(" <span class='" + icon + "'></span>");
                        });
                    }
                }]);

                return CreateLanguageWindow;
            }());

            _export("CreateLanguageWindow", CreateLanguageWindow);
        }
    };
});