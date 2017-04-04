import { TableObject } from 'Layout/HelperObjects.js'
import { Localization } from 'Languages/LocalizationHelper.js';
export class AuditLogsWindow {
    load() {
        const localization = new Localization();
        const logsService = abp.services.app.auditLog;
        const $body = $("body");
        $(document).ready(() => {
            //Table
            let table;
            let loadLogs = () => {
                let tenantId = $("#TenantId").val();
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                logsService.getAuditLogTable({ getAll: true, tenantId }).done((response) => {
                    abp.ui.clearBusy();
                    let label = $("#tenancyName");
                    if (response.tenancyName) {
                        label.append(`${localization.localize("Tenant")} : ${response.tenancyName}`);
                    }
                    let data = response.auditLogs;
                    let columns = [
                        { title: "", data: "id" },
                        { title: localization.localize("ServiceName"), data: "serviceName" },
                        { title: localization.localize("MethodName"), data: "methodName" },
                        { title: localization.localize("IP"), data: "clientIpAddress" },
                        { title: localization.localize("ExecutionTime"), data: "executionTimeString" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnDetails = `<a class="btn btn-primary btn-xs js-details-log" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-search"></i></a>`;
                                return btnDetails;
                            }
                        }
                    ]
                    //I dont want to get in the way with the table plugin you need so i will implement simple data visualization
                    table = $('#audit-logs-table').DataTable({
                        data,
                        columns,
                        columnDefs
                    });
                }).always(() => {
                    abp.ui.clearBusy();
                });
            }
            //--Table
            loadLogs();

            let openDetails = (e) => {
                let id = $(e.target).data("id");
                periModal.open("/AdminMpa/AuditLogs/GetLogDetails/" + id, null, function () {
                });
            }
            $body.on("click", ".js-details-log", openDetails);

        });

    }
}