"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, EditTextWindow;

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

            _export("EditTextWindow", EditTextWindow = function () {
                function EditTextWindow() {
                    _classCallCheck(this, EditTextWindow);
                }

                _createClass(EditTextWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var $form = $("#editTextForm");
                            var languageService = abp.services.app.language;
                            $form.on("submit", function (e) {
                                e.preventDefault();
                                var data = {
                                    Value: $("#Value").val(),
                                    Key: $("#Key").val(),
                                    LanguageName: $("#LanguageName").val(),
                                    Source: $("#Source").val()
                                };
                                abp.ui.setBusy($form, languageService.editLocalizationText(data).done(function () {
                                    periModal.close();
                                }));
                            });
                        });
                    }
                }]);

                return EditTextWindow;
            }());

            _export("EditTextWindow", EditTextWindow);
        }
    };
});