"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, CreateRoleWindow;

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

            _export("CreateRoleWindow", CreateRoleWindow = function () {
                function CreateRoleWindow() {
                    _classCallCheck(this, CreateRoleWindow);
                }

                _createClass(CreateRoleWindow, [{
                    key: "load",
                    value: function load() {
                        console.log("Create role window loaded");
                        $(document).ready(function () {
                            var _roleAppService = abp.services.app.role;
                            var $container = $("#container");
                            var $form = $("#createRoleForm");
                            $container.jstree({
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
                            $container.on('ready.jstree', function () {
                                $container.jstree("open_all");
                            });

                            $container.on("changed.jstree", function (e, data) {
                                if (!data.node) {
                                    return;
                                }

                                var childrenNodes = void 0;

                                if (data.node.state.selected) {
                                    selectNodeAndAllParents($container.jstree('get_parent', data.node));

                                    childrenNodes = $.makeArray($container.jstree('get_children_dom', data.node));
                                    $container.jstree('select_node', childrenNodes);
                                } else {
                                    childrenNodes = $.makeArray($container.jstree('get_children_dom', data.node));
                                    $container.jstree('deselect_node', childrenNodes);
                                }
                            });
                            var selectNodeAndAllParents = function selectNodeAndAllParents(node) {
                                $container.jstree('select_node', node, true);
                                var parent = $container.jstree('get_parent', node);
                                if (parent) {
                                    selectNodeAndAllParents(parent);
                                }
                            };

                            $form.on("submit", function (e) {

                                e.preventDefault();
                                var data = {
                                    AssignedPermissions: [],
                                    DisplayName: $("#DisplayName").val(),
                                    Name: $("#DisplayName").val(),
                                    IsDefault: $("#IsDefault").is(":checked")
                                };
                                var selected = $container.jstree('get_selected');
                                $(selected).each(function (index, v) {
                                    data.AssignedPermissions.push({
                                        Name: v,
                                        Granted: true
                                    });
                                });
                                abp.ui.setBusy($form, _roleAppService.createRole(data).done(function () {
                                    periModal.close();
                                }));
                            });
                        });
                    }
                }]);

                return CreateRoleWindow;
            }());

            _export("CreateRoleWindow", CreateRoleWindow);
        }
    };
});