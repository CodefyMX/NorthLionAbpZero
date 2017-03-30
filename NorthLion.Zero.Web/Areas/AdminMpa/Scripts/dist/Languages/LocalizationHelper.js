"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Localization;

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

            _export("Localization", Localization = function () {
                function Localization() {
                    _classCallCheck(this, Localization);
                }

                _createClass(Localization, [{
                    key: "localize",
                    value: function localize(value) {
                        var sourceName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Zero";

                        return abp.localization.localize(value, sourceName);
                    }
                }]);

                return Localization;
            }());

            _export("Localization", Localization);
        }
    };
});