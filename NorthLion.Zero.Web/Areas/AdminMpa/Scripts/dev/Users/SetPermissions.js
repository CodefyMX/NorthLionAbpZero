export class SetPermissionsWindow {
    load() {
        $(document).ready(() => {
            const _userAppService = abp.services.app.user;
            const $container = $("#container");
            const $form = $("#setPermissions");
            const userId = $("#UserId").val();
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

            let resetBtn = $(".js-reset-permissions");
            resetBtn.click(() => {

                abp.ui.setBusy($form, _userAppService.resetPermissions(userId).done(() => {
                    periModal.close();
                }));
            });
            $form.on("submit", (e) => {
                let data = {
                    AssignedPermissions: [],
                    UserId: userId
                }
                let getPermissionsForChildren = (children) => {
                    children.forEach((v) => {
                        let granted = v.state.selected;
                        data.AssignedPermissions.push({
                            Name: v.id,
                            Granted: granted
                        });
                        getPermissionsForChildren(v.children);
                    });
                }
                e.preventDefault();
                let selected = $container.jstree('get_json');
                $(selected).each((index, v) => {
                    let granted = v.state.selected;

                    data.AssignedPermissions.push({
                        Name: v.id,
                        Granted: granted
                    });

                    getPermissionsForChildren(v.children);


                });
                abp.ui.setBusy($form, _userAppService.setUserSpecialPermissions(data).done(() => {
                    periModal.close();
                }));



            });

        });
    }
}