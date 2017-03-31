"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, SetRolesWindow;

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

            _export("SetRolesWindow", SetRolesWindow = function () {
                function SetRolesWindow() {
                    _classCallCheck(this, SetRolesWindow);
                }

                _createClass(SetRolesWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var _userAppService = abp.services.app.user;
                            var $form = $("#selectRoles");

                            $form.on("submit", function (e) {
                                e.preventDefault();
                                var data = {
                                    userId: $("#UserId").val(),
                                    roles: []
                                };

                                var inputsChecked = $("#selectRoles input:checked");

                                inputsChecked.each(function (i, e) {
                                    var $self = $(e);

                                    var checkedElementValue = $self.val();

                                    data.roles.push(checkedElementValue);
                                });

                                _userAppService.setUserRoles(data).done(function () {
                                    periModal.close();
                                });
                            });
                        });
                    }
                }]);

                return SetRolesWindow;
            }());

            _export("SetRolesWindow", SetRolesWindow);
        }
    };
});