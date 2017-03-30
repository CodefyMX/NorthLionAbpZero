import { TableObject } from 'Layout/HelperObjects.js'
import { Localization } from 'Languages/LocalizationHelper.js';
export class AuditLogsWindow {
    load() {
        const localization = new Localization();
        const logsService = abp.services.app.auditLog;
        $(document).ready(() => {
            //Table
            let table;
            let loadLogs = (input = new TableObject()) => {
                if (table) {
                    table.destroy();
                }
                abp.ui.setBusy();
                logsService.getAuditLogTable({ getAll: true }).done((response) => {
                    abp.ui.clearBusy();
                    let data = response.auditLogs;
                    let columns = [
                        { title: "", data: "id" },
                        { title: "Service Name", data: "serviceName" },
                        { title: "Client Name", data: "clientName" }
                    ];
                    let columnDefs = [
                        {
                            targets: 0,
                            render: (data, type, full, meta) => {
                                let btnEdit = `<a class="btn btn-primary btn-xs" data-id="${full.id}"><i data-id="${full.id}" class="fa fa-edit"></i></a>`;
                                return btnEdit;
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
        });

    }
}