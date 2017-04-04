import { Localization } from "Languages/LocalizationHelper.js";
export class SetTenantFeaturesWindow {
    load() {
        let localization = new Localization();
        $(document)
            .ready(() => {
                let contextMenu = function () {
                    let editUnit = {
                        label: localization.localize('EditValue'),
                        action: function (data) {
                        }
                    }
                    let items = {
                        editUnit
                    }
                    return items;
                }
                let treeJsConfig = {
                    contextMenu
                }
                let jsTreeInstance;
                const $jsTree = $('#container');
                const $form = $("#setTenantFeatures");
                const $reset = $(".js-reset-features");
                const tenantService = abp.services.app.tenant;
                $reset.click(() => {
                    let id = $("#TenantId").val();
                    abp.ui.setBusy($form, tenantService.resetFeatures(id).done(() => {
                        periModal.close();
                    }));
                });
                jsTreeInstance = $jsTree
                    .jstree({
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
                $jsTree.on('ready.jstree', (e) => {
                    let $tree = $(e.target);
                    let jsonObjects = $tree.jstree().get_json($tree);
                    for (let value in jsonObjects) {
                        let selector = "#" + jsonObjects[value].id;
                        let jqueryElement = $(selector);
                        let requiresTextBox = jqueryElement.data("append-textbox");
                        if (requiresTextBox) {
                            jqueryElement.append("<input type='text' class='input-tree' />");
                        }
                    }
                    $jsTree.jstree("open_all");
                });
                $jsTree.on("changed.jstree", (e, data) => {
                    if (!data.node) {
                        return;
                    }
                    let childrenNodes;
                    if (data.node.state.selected) {
                        selectNodeAndAllParents($("#container").jstree('get_parent', data.node));

                        childrenNodes = $.makeArray($("#container").jstree('get_children_dom', data.node));
                        $jsTree.jstree('select_node', childrenNodes);

                    } else {
                        childrenNodes = $.makeArray($("#container").jstree('get_children_dom', data.node));
                        $jsTree.jstree('deselect_node', childrenNodes);
                    }
                });
                let selectNodeAndAllParents = (node) => {
                    $jsTree.jstree('select_node', node, true);
                    let parent = $("#container").jstree('get_parent', node);
                    if (parent) {
                        selectNodeAndAllParents(parent);
                    }
                };
                //Get all nodes and try to print the text box input
                $jsTree.on('open_node.jstree', (evt, nodeRef) => {
                    let nodes = nodeRef.node.children;
                    for (let nodeIndex in nodes) {
                        let node = nodes[nodeIndex];
                        printTextBoxIfNeededForNodeNames(node);
                    }
                });
                //Print if needed
                let printTextBoxIfNeededForNodeNames = (name) => {
                    let node = getNode(name);
                    let selector = "#" + name;
                    let jqueryElement = $(selector);
                    let requiresTextBox = jqueryElement.data("append-textbox");
                    if (requiresTextBox) {
                        let defaultValue = jqueryElement.data("value");
                        removeCheckBoxFromNode(selector, jqueryElement);
                        jqueryElement.append(`<input type='text' value="${defaultValue}" class='input-tree' data-text-id='${name}' />`);
                    }
                    let nodeChildren = node.children;
                    for (let children in nodeChildren) {
                        printTextBoxIfNeeded(children);
                    }
                }
                //Just removes the checkbox
                let removeCheckBoxFromNode = (selector, jqueryElement) => {
                    let anchorElement = $(selector + "_anchor");
                    anchorElement.attr("class", "simple-text");
                    let anchorElementCheckBox = jqueryElement.find(".jstree-icon.jstree-checkbox");
                    let anchorElementIcon = jqueryElement.find(".jstree-icon.jstree-themeicon");
                    anchorElementCheckBox.remove();
                    anchorElementIcon.remove();
                }
                let getNode = (id) => {
                    return $.jstree.reference(jsTreeInstance).get_node(id);  // use the tree reference to fetch a node
                }
                //This is not being called
                let printTextBoxIfNeeded = (value) => {
                    let selector = "#" + value.id;
                    let jqueryElement = $(selector);
                    let requiresTextBox = jqueryElement.data("append-textbox");
                    if (requiresTextBox) {
                        removeCheckBoxFromNode(selector, jqueryElement);
                        let checked = jqueryElement.data("selected");
                        if (checked === "True") {
                            $jsTree.jstree("check_node", selector);
                        } else {
                            $jsTree.jstree("uncheck_node", selector);
                        }
                        let defaultValue = jqueryElement.data("value");
                        jqueryElement.append("<input type='text' value=" + defaultValue + " class='input-tree' data-text-id='" + name + "' />");
                    }
                    value.children.forEach((i) => {
                        printTextBoxIfNeeded(i);
                    });
                }
                $form
                    .on("submit",
                    (e) => {
                        let isAnyChildrenSelected = (children) => {
                            for (let element of children) {
                                if (element.state.selected) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        let getFeaturesForChildren = (children) => {
                            for (let v in children) {
                                let element = children[v];
                                let value = element.state.selected;
                                let selectedStatus = isAnyChildrenSelected(element.children);
                                if (value === false) {
                                    value = selectedStatus;
                                } else {
                                    selectedStatus = value;
                                }
                                let textBox = $(document).find("[data-text-id='" + element.id + "']");
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
                        }
                        let formData = $(e.currentTarget).serializeFormToObject();
                        e.preventDefault();
                        let features = [];
                        let selected = $jsTree.jstree('get_json');
                        let allSelected = $(selected);
                        for (let v in allSelected) {
                            let elementSelected = allSelected[v];
                            if (elementSelected.state) {
                                let value = elementSelected.state.selected;
                                let selectedStatus = isAnyChildrenSelected(elementSelected.children);
                                if (value === false) {
                                    value = selectedStatus;
                                } else {
                                    selectedStatus = value;
                                }
                                let textBox = $(document).find("[data-text-id='" + elementSelected.id + "']");
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
                        abp.ui.setBusy($form, tenantService.setFeatureValuesForTenant(formData).done(() => {
                            periModal.close();
                        }));
                    });
            });
    }
}