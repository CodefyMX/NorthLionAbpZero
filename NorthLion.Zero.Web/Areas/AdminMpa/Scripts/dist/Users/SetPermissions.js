"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, SetPermissionsWindow;

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

            _export("SetPermissionsWindow", SetPermissionsWindow = function () {
                function SetPermissionsWindow() {
                    _classCallCheck(this, SetPermissionsWindow);
                }

                _createClass(SetPermissionsWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var _userAppService = abp.services.app.user;
                            var $container = $("#container");
                            var $form = $("#setPermissions");
                            var userId = $("#UserId").val();
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

                            var resetBtn = $(".js-reset-permissions");
                            resetBtn.click(function () {

                                abp.ui.setBusy($form, _userAppService.resetPermissions(userId).done(function () {
                                    periModal.close();
                                }));
                            });
                            $form.on("submit", function (e) {
                                var data = {
                                    AssignedPermissions: [],
                                    UserId: userId
                                };
                                var getPermissionsForChildren = function getPermissionsForChildren(children) {
                                    children.forEach(function (v) {
                                        var granted = v.state.selected;
                                        data.AssignedPermissions.push({
                                            Name: v.id,
                                            Granted: granted
                                        });
                                        getPermissionsForChildren(v.children);
                                    });
                                };
                                e.preventDefault();
                                var selected = $container.jstree('get_json');
                                $(selected).each(function (index, v) {
                                    var granted = v.state.selected;

                                    data.AssignedPermissions.push({
                                        Name: v.id,
                                        Granted: granted
                                    });

                                    getPermissionsForChildren(v.children);
                                });
                                abp.ui.setBusy($form, _userAppService.setUserSpecialPermissions(data).done(function () {
                                    periModal.close();
                                }));
                            });
                        });
                    }
                }]);

                return SetPermissionsWindow;
            }());

            _export("SetPermissionsWindow", SetPermissionsWindow);
        }
    };
});