export class EditRoleWindow {
    load() {
        $(document).ready(() => {
            const _roleAppService = abp.services.app.role;
            const $container = $("#container");
            const $form = $("#editRoleForm");
            $container
                .jstree({
                    "checkbox": {
                        keep_selected_style: false,
                        three_state: false,
                        cascade: ''
                    },
                    'plugins': ["wholerow", "html_data", "checkbox", "ui"],
                    'core': {

                        "multiple": true,
                        'themes': {
                            'name': 'proton',
                            'responsive': true
                        }
                    }
                });
            $container.on('ready.jstree', () => {
                $container.jstree("open_all");
            });

            $container.on("changed.jstree", (e, data) => {
                if (!data.node) {
                    return;
                }

                let childrenNodes;

                if (data.node.state.selected) {
                    selectNodeAndAllParents($container.jstree('get_parent', data.node));

                    childrenNodes = $.makeArray($container.jstree('get_children_dom', data.node));
                    $container.jstree('select_node', childrenNodes);

                } else {
                    childrenNodes = $.makeArray($container.jstree('get_children_dom', data.node));
                    $container.jstree('deselect_node', childrenNodes);
                }
            });
            let selectNodeAndAllParents = (node) => {
                $container.jstree('select_node', node, true);
                let parent = $container.jstree('get_parent', node);
                if (parent) {
                    selectNodeAndAllParents(parent);
                }
            };


            $form.on("submit", (e) => {

                e.preventDefault();
                let data = {
                    Permissions: [],
                    DisplayName: $("#DisplayName").val(),
                    Name: $("#DisplayName").val(),
                    IsDefault: $("#IsDefault").is(":checked"),
                    Id: $("#Id").val()
                }
                let selected = $container.jstree('get_selected');
                $(selected).each((index, v) => {
                    data.Permissions.push({
                        Name: v,
                        Granted: true
                    });
                });
                abp.ui.setBusy($form, _roleAppService.updateRole(data).done(() => {
                    periModal.close();
                }));
            });
        });
    }
}