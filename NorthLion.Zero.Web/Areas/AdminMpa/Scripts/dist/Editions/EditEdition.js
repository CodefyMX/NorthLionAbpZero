"use strict";

System.register(["Languages/LocalizationHelper.js"], function (_export, _context) {
    "use strict";

    var Localization, _createClass, EditEditionWindow;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_LanguagesLocalizationHelperJs) {
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

            _export("EditEditionWindow", EditEditionWindow = function () {
                function EditEditionWindow() {
                    _classCallCheck(this, EditEditionWindow);
                }

                _createClass(EditEditionWindow, [{
                    key: "load",
                    value: function load() {
                        $(document).ready(function () {
                            var $body = $("body");
                            var localization = new Localization();
                            var editionService = abp.services.app.edition;
                            var contextMenu = function contextMenu() {
                                var editUnit = {
                                    label: localization.localize('EditValue'),
                                    action: function action(data) {}
                                };
                                var items = {
                                    editUnit: editUnit
                                };
                                return items;
                            };
                            var treeJsConfig = {
                                contextMenu: contextMenu
                            };
                            var jsTreeInstance = void 0;
                            var $jsTree = $('#container');
                            var $form = $("#editEdition");
                            var $reset = $(".js-reset-features");
                            jsTreeInstance = $jsTree.jstree({
                                "checkbox": {
                                    keep_selected_style: false,
                                    three_state: false,
                                    cascade: ''
                                },
                                contextmenu: {
                                    items: treeJsConfig.contextMenu
                                },
                                'plugins': ["checkbox"],
                                'core': {
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true
                                    }
                                }
                            });
                            //This writes only the parents
                            $jsTree.on('ready.jstree', function (e) {
                                var $tree = $(e.target);
                                var jsonObjects = $tree.jstree().get_json($tree);
                                for (var value in jsonObjects) {
                                    var selector = "#" + jsonObjects[value].id;
                                    var jqueryElement = $(selector);
                                    var requiresTextBox = jqueryElement.data("append-textbox");
                                    if (requiresTextBox) {
                                        jqueryElement.append("<input type='text' class='input-tree' />");
                                    }
                                }
                                $jsTree.jstree("open_all");
                            });
                            $jsTree.on("changed.jstree", function (e, data) {
                                if (!data.node) {
                                    return;
                                }
                                var childrenNodes = void 0;
                                if (data.node.state.selected) {
                                    selectNodeAndAllParents($("#container").jstree('get_parent', data.node));

                                    childrenNodes = $.makeArray($("#container").jstree('get_children_dom', data.node));
                                    $jsTree.jstree('select_node', childrenNodes);
                                } else {
                                    childrenNodes = $.makeArray($("#container").jstree('get_children_dom', data.node));
                                    $jsTree.jstree('deselect_node', childrenNodes);
                                }
                            });
                            var selectNodeAndAllParents = function selectNodeAndAllParents(node) {
                                $jsTree.jstree('select_node', node, true);
                                var parent = $("#container").jstree('get_parent', node);
                                if (parent) {
                                    selectNodeAndAllParents(parent);
                                }
                            };
                            //Get all nodes and try to print the text box input
                            $jsTree.on('open_node.jstree', function (evt, nodeRef) {
                                var nodes = nodeRef.node.children;
                                for (var nodeIndex in nodes) {
                                    var node = nodes[nodeIndex];
                                    printTextBoxIfNeededForNodeNames(node);
                                }
                            });
                            //Print if needed
                            var printTextBoxIfNeededForNodeNames = function printTextBoxIfNeededForNodeNames(name) {
                                var node = getNode(name);
                                var selector = "#" + name;
                                var jqueryElement = $(selector);
                                var requiresTextBox = jqueryElement.data("append-textbox");
                                if (requiresTextBox) {
                                    var defaultValue = jqueryElement.data("value");
                                    removeCheckBoxFromNode(selector, jqueryElement);
                                    jqueryElement.append("<input type='text' value=\"" + defaultValue + "\" class='input-tree' data-text-id='" + name + "' />");
                                }
                                var nodeChildren = node.children;
                                for (var children in nodeChildren) {
                                    printTextBoxIfNeeded(children);
                                }
                            };
                            //Just removes the checkbox
                            var removeCheckBoxFromNode = function removeCheckBoxFromNode(selector, jqueryElement) {
                                var anchorElement = $(selector + "_anchor");
                                anchorElement.attr("class", "simple-text");
                                var anchorElementCheckBox = jqueryElement.find(".jstree-icon.jstree-checkbox");
                                var anchorElementIcon = jqueryElement.find(".jstree-icon.jstree-themeicon");
                                anchorElementCheckBox.remove();
                                anchorElementIcon.remove();
                            };
                            var getNode = function getNode(id) {
                                return $.jstree.reference(jsTreeInstance).get_node(id); // use the tree reference to fetch a node
                            };
                            //This is not being called
                            var printTextBoxIfNeeded = function printTextBoxIfNeeded(value) {
                                var selector = "#" + value.id;
                                var jqueryElement = $(selector);
                                var requiresTextBox = jqueryElement.data("append-textbox");
                                if (requiresTextBox) {
                                    removeCheckBoxFromNode(selector, jqueryElement);
                                    var checked = jqueryElement.data("selected");
                                    if (checked === "True") {
                                        $jsTree.jstree("check_node", selector);
                                    } else {
                                        $jsTree.jstree("uncheck_node", selector);
                                    }
                                    var defaultValue = jqueryElement.data("value");
                                    jqueryElement.append("<input type='text' value=" + defaultValue + " class='input-tree' data-text-id='" + name + "' />");
                                }
                                value.children.forEach(function (i) {
                                    printTextBoxIfNeeded(i);
                                });
                            };
                            $form.on("submit", function (e) {
                                var isAnyChildrenSelected = function isAnyChildrenSelected(children) {
                                    var _iteratorNormalCompletion = true;
                                    var _didIteratorError = false;
                                    var _iteratorError = undefined;

                                    try {
                                        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                            var element = _step.value;

                                            if (element.state.selected) {
                                                return true;
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                            }
                                        } finally {
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }

                                    return false;
                                };
                                var getFeaturesForChildren = function getFeaturesForChildren(children) {
                                    for (var v in children) {
                                        var element = children[v];
                                        var value = element.state.selected;
                                        var selectedStatus = isAnyChildrenSelected(element.children);
                                        if (value === false) {
                                            value = selectedStatus;
                                        } else {
                                            selectedStatus = value;
                                        }
                                        var textBox = $(document).find("[data-text-id='" + element.id + "']");
                                        if (textBox.length === 1) {
                                            value = $(textBox[0]).val();
                                            selectedStatus = true;
                                        }
                                        features.push({
                                            Name: element.id,
                                            DefaultValue: value,
                                            Selected: selectedStatus
                                        });

                                        getFeaturesForChildren(element.children);
                                    }
                                };
                                var formData = $(e.currentTarget).serializeFormToObject();
                                e.preventDefault();
                                var features = [];
                                var selected = $jsTree.jstree('get_json');
                                var allSelected = $(selected);
                                for (var v in allSelected) {
                                    var elementSelected = allSelected[v];
                                    if (elementSelected.state) {
                                        var value = elementSelected.state.selected;
                                        var selectedStatus = isAnyChildrenSelected(elementSelected.children);
                                        if (value === false) {
                                            value = selectedStatus;
                                        } else {
                                            selectedStatus = value;
                                        }
                                        var textBox = $(document).find("[data-text-id='" + elementSelected.id + "']");
                                        if (textBox.length === 1) {
                                            value = $(textBox[0]).val();
                                            selectedStatus = true;
                                        }
                                        features.push({
                                            Name: elementSelected.id,
                                            DefaultValue: value,
                                            Selected: selectedStatus
                                        });
                                        getFeaturesForChildren(elementSelected.children);
                                    }
                                }
                                formData.Features = features;
                                abp.ui.setBusy($form, editionService.updateEdition(formData).done(function () {
                                    periModal.close();
                                }));
                            });
                        });
                    }
                }]);

                return EditEditionWindow;
            }());

            _export("EditEditionWindow", EditEditionWindow);
        }
    };
});