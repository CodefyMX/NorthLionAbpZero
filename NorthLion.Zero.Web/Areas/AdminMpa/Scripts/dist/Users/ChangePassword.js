"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ChangePasswordWindow;

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

            _export("ChangePasswordWindow", ChangePasswordWindow = function () {
                function ChangePasswordWindow() {
                    _classCallCheck(this, ChangePasswordWindow);
                }

                _createClass(ChangePasswordWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {

                            var _userAppService = abp.services.app.user;
                            var $form = $("#changePasswordForm");
                            $form.on("submit", function (e) {
                                var self = e.target;
                                e.preventDefault();

                                var confirmPasswordVal = $(".js-confirm-password").val();
                                var passwordVal = $(".js-password").val();

                                if (confirmPasswordVal !== passwordVal) {
                                    abp.message.error("Error");
                                } else {
                                    var data = $(self).serializeFormToObject();
                                    abp.ui.setBusy($form, _userAppService.changePasswordFromAdmin(data).done(function () {
                                        periModal.close();
                                    }));
                                }
                            });
                        });
                    }
                }]);

                return ChangePasswordWindow;
            }());

            _export("ChangePasswordWindow", ChangePasswordWindow);
        }
    };
});