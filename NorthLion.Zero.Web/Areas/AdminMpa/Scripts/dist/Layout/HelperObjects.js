"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Table object for table search
 */
var TableObject = function () {
    function TableObject() {
        var searchString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var rowsPerPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        var propertyToOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Desc";
        var page = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        _classCallCheck(this, TableObject);

        this.searchString = searchString;
        this.rowsPerPage = rowsPerPage;
        this.propertyToOrder = propertyToOrder;
        this.direction = direction;
        this.page = page;
    }

    _createClass(TableObject, [{
        key: "updatePage",
        value: function updatePage() {
            page = page + 1;
        }
    }]);

    return TableObject;
}();