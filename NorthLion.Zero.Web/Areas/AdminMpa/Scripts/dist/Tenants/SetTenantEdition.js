"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, SetTenantEditionWindow;

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

            _export("SetTenantEditionWindow", SetTenantEditionWindow = function () {
                function SetTenantEditionWindow() {
                    _classCallCheck(this, SetTenantEditionWindow);
                }

                _createClass(SetTenantEditionWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var tenantService = abp.services.app.tenant;
                            var $form = $("#setTenantEdition");

                            $form.on("submit", function (e) {

                                e.preventDefault();

                                var editionId = $('input[name=edition]:checked', "#setTenantEdition").val();
                                var tenantId = $("#TenantId").val();
                                var data = {
                                    tenantId: tenantId,
                                    editionId: editionId
                                };

                                abp.ui.setBusy($form, tenantService.setTenantEdition(data).done(function () {

                                    periModal.close();
                                }));
                            });
                        });
                    }
                }]);

                return SetTenantEditionWindow;
            }());

            _export("SetTenantEditionWindow", SetTenantEditionWindow);
        }
    };
});