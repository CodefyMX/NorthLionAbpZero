'use strict';

System.register(['Layout/HelperObjects.js', 'Languages/LocalizationHelper.js'], function (_export, _context) {
    "use strict";

    var TableObject, Localization, _createClass, AuditLogsWindow;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_LayoutHelperObjectsJs) {
            TableObject = _LayoutHelperObjectsJs.TableObject;
        }, function (_LanguagesLocalizationHelperJs) {
            Localization = _LanguagesLocalizationHelperJs.Localization;
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

            _export('AuditLogsWindow', AuditLogsWindow = function () {
                function AuditLogsWindow() {
                    _classCallCheck(this, AuditLogsWindow);
                }

                _createClass(AuditLogsWindow, [{
                    key: 'load',
                    value: function load() {
                        var localization = new Localization();
                        var logsService = abp.services.app.auditLog;
                        var $body = $("body");
                        $(document).ready(function () {
                            //Table
                            var table = void 0;
                            var loadLogs = function loadLogs() {
                                var tenantId = $("#TenantId").val();
                                if (table) {
                                    table.destroy();
                                }
                                abp.ui.setBusy();
                                logsService.getAuditLogTable({ getAll: true, tenantId: tenantId }).done(function (response) {
                                    abp.ui.clearBusy();
                                    var label = $("#tenancyName");
                                    if (response.tenancyName) {
                                        label.append(localization.localize("Tenant") + ' : ' + response.tenancyName);
                                    }
                                    var data = response.auditLogs;
                                    var columns = [{ title: "", data: "id" }, { title: "Service Name", data: "serviceName" }, { title: "Method Name", data: "methodName" }, { title: "IP", data: "clientIpAddress" }, { title: "Execution Time", data: "executionTimeString" }];
                                    var columnDefs = [{
                                        targets: 0,
                                        render: function render(data, type, full, meta) {
                                            var btnDetails = '<a class="btn btn-primary btn-xs js-details-log" data-id="' + full.id + '"><i data-id="' + full.id + '" class="fa fa-search"></i></a>';
                                            return btnDetails;
                                        }
                                    }];
                                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                                    table = $('#audit-logs-table').DataTable({
                                        data: data,
                                        columns: columns,
                                        columnDefs: columnDefs
                                    });
                                }).always(function () {
                                    abp.ui.clearBusy();
                                });
                            };
                            //--Table
                            loadLogs();

                            var openDetails = function openDetails(e) {
                                var id = $(e.target).data("id");
                                periModal.open("/AdminMpa/AuditLogs/GetLogDetails/" + id, null, function () {});
                            };
                            $body.on("click", ".js-details-log", openDetails);
                        });
                    }
                }]);

                return AuditLogsWindow;
            }());

            _export('AuditLogsWindow', AuditLogsWindow);
        }
    };
});