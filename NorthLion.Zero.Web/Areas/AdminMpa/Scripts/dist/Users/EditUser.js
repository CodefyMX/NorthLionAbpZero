"use strict";

System.register(["Users/Index.min.js"], function (_export, _context) {
    "use strict";

    var UsersWindow, _createClass, EditUserWindow;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_UsersIndexMinJs) {
            UsersWindow = _UsersIndexMinJs.UsersWindow;
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

            _export("EditUserWindow", EditUserWindow = function () {
                function EditUserWindow() {
                    _classCallCheck(this, EditUserWindow);
                }

                _createClass(EditUserWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            //Gets the UsersWindow modal instance
                            var modalInstance = new UsersWindow().getModalInstance();
                            var closeModal = function closeModal() {
                                modalInstance.modal("hide");
                            };
                        });
                    }
                }]);

                return EditUserWindow;
            }());

            _export("EditUserWindow", EditUserWindow);
        }
    };
});