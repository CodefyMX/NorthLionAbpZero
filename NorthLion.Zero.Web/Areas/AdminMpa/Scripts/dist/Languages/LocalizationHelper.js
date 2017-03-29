"use strict";

var localize = function localize(value) {
    var sourceName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Zero";

    return abp.localization.localize(value, sourceName);
};