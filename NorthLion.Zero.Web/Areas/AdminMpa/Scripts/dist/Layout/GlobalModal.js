"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, PeriModalManager;

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

            _export("PeriModalManager", PeriModalManager = function () {
                function PeriModalManager() {
                    var _this = this;

                    var modalContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#modal";

                    _classCallCheck(this, PeriModalManager);

                    this.modal = modalContainer;

                    this.listener = function () {
                        $(_this.modal).on("hidden.bs.modal", function () {
                            console.info("Modal closed");
                            _this.onClose = null;
                            $(_this.modal).empty();
                        });
                    };
                    this.listener();
                }

                _createClass(PeriModalManager, [{
                    key: "setContainer",
                    value: function setContainer(container) {
                        this.modal = container;
                    }
                }, {
                    key: "open",
                    value: function open(url) {
                        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                        var onload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


                        var $modal = $(modal).load(url, data, function () {
                            $(modal).modal("show");
                            onload();
                        });
                    }
                }, {
                    key: "close",
                    value: function close() {
                        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


                        if (!this.onClose) {
                            throw new Error("On close function not defined");
                        } else {
                            $(modal).modal("hide");
                            this.onClose(data);
                            this.onClose = null;
                        }
                    }
                }, {
                    key: "setOnClose",
                    value: function setOnClose(onclose) {
                        this.onClose = onclose;
                    }
                }, {
                    key: "getInstance",
                    value: function getInstance() {
                        return $(modal);
                    }
                }]);

                return PeriModalManager;
            }());

            _export("PeriModalManager", PeriModalManager);

            ;
        }
    };
});