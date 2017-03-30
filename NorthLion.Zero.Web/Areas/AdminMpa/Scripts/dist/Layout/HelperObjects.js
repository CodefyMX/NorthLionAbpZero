"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, TableObject;

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

            _export("TableObject", TableObject = function () {
                function TableObject() {
                    _classCallCheck(this, TableObject);
                }

                _createClass(TableObject, [{
                    key: "getRequest",
                    value: function getRequest() {
                        var searchString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                        var rowsPerPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
                        var propertyToOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
                        var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Desc";
                        var page = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
                        var searchProperty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
                        var getAll = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

                        return {
                            searchString: searchString,
                            rowsPerPage: rowsPerPage,
                            propertyToOrder: propertyToOrder,
                            direction: direction,
                            page: page,
                            searchProperty: searchProperty,
                            getAll: getAll
                        };
                    }
                }]);

                return TableObject;
            }());

            _export("TableObject", TableObject);
        }
    };
});