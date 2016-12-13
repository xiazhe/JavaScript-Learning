/**
 * Created by nicol on 7/20/16.
 * @version:0.1.0
 * treeData:[{}] 树节点数据
 * treeCheckNodeIds:[] checked节点id集合
 * ngZtree:{ 树初始化参数
      selectNodeId 当前选中的节点id,支持多选时为id数组
      nodeDisabled 禁用节点
      hasDefaultRoot 是否显示默认根节点
      enableEdit 树是否可以编辑
      rootName 默认根节点名称
      defaultSelected 默认选中第一个节点
      onRemoveNode 删除节点事件       (参数:$defer,node）成功后调用$defer.resolve(node);
      onEditNode: 编辑节点事件        (参数:$defer,node）
      onAddNode: 添加节点事件         (参数:$defer,node）
      onSelectNode 选中节点事件       (参数:$defer,node）
      onCheckedNode checked节点事件（enableCheck为true时有效） (参数:$defer,event(当前check Event),treeNode(当前checkedNode),allCheckedNodes(所有chekced节点))
      enableCheck: 可以check节点
      selectedMulti: boolean 是否支持多选
 * }
 *
 * checked 实例:
 <ul class="ztree" ng-ztree="olCtrl.treeParams" tree-check-node-ids="ctrl.treeCheckNodeIds"
 tree-data="olCtrl.treeData">
 </ul>

 ctrl.treeCheckNodeIds = [0];
 ctrl.treeParams = {
            enableEdit: false,
            rootName: '属地网格',
            onSelectNode: onSelectNode,
            enableCheck: true,
            onCheckedNode: onCheckedNode
        };
 function onCheckedNode($defer, event, treeNode, allCheckedNodes) {
            console.log(allCheckedNodes);
        }
 */
(function () {
    'use strict';
    angular
        .module('ui.missionsky.ztree', [])
        .directive('ngZtree', ngZtreeFunc);
    function ngZtreeFunc($q) {
        return {
            restrict: 'A',
            scope: {treeData: '=?', treeCheckNodeIds: '=?', ngZtree: "=?", selectNodeId: '=?', pIdKey: "@"},
            link: function (scope, element, attr) {
                var zTree;
                var rootNode = {
                    id: 0,
                    parentId: 0
                };

                var options = {
                    enableEdit: true,
                    showRemoveBtn: true,
                    hasDefaultRoot: true,
                    rootName: '根节点',
                    onRemoveNode: null,
                    onEditNode: null,
                    onAddNode: null,
                    onSelectNode: null,
                    defaultSelected: false,
                    enableCheck: false,
                    onCheckedNode: null,
                    selectedMulti: false,
                    defaultCollapse: true,
                    enableAsync: false,
                    asyncUrl: '',
                    asyncMethod: 'get'
                };

                angular.extend(options, scope.ngZtree);

                rootNode.name = options.rootName;

                var setting = {
                    async: {
                        enable: options.enableAsync,
                        url: options.asyncUrl,
                        type: options.asyncMethod,
                        contentType: "application/json",
                        autoParam: ["id", "name"]
                    },
                    check: {
                        enable: options.enableCheck
                    },
                    view: {
                        addHoverDom: addHoverDom,
                        removeHoverDom: removeHoverDom,
                        selectedMulti: options.selectedMulti,
                        showLine: false
                    },
                    edit: {
                        enable: options.enableEdit,
                        editNameSelectAll: true,
                        showRemoveBtn: showRemoveBtn,
                        showRenameBtn: showRnameBtn,
                        removeTitle: '删除',
                        renameTitle: '修改'
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentId',
                            rootPId: '0'
                        }
                    },
                    callback: {
                        beforeDrag: beforeDrag,
                        beforeEditName: beforeEditName,
                        beforeRemove: beforeRemove,
                        beforeRename: beforeRename,
                        onClick: onClick,
                        beforeClick: onBeforeClick,
                        beforeExpand: beforeExpand,
                        beforeCollapse: beforeCollapse,
                        onExpand: onExpand,
                        onCollapse: onCollapse,
                        onCheck: onNodeCheck,
                        beforeAsync: beforeAsync,
                        onAsyncError: onAsyncError,
                        onAsyncSuccess: onAsyncSuccess
                    }
                };

                function onExpand(e) {
                    //var event = e || window.event;
                    //if (event.stopPropagation) {
                    //    event.stopPropagation();
                    //} else {
                    //    window.event.cancelBubble = true;
                    //}
                }

                function onCollapse(e) {
                    //var event = e || window.event;
                    //if (event.stopPropagation) {
                    //    event.stopPropagation();
                    //} else {
                    //    window.event.cancelBubble = true;
                    //}
                }

                function beforeExpand() {
                    //var event = event || window.event;
                    //if (event.stopPropagation) {
                    //    event.stopPropagation();
                    //} else {
                    //    window.event.cancelBubble = true;
                    //}
                }

                function beforeCollapse() {
                    //var event = event || window.event;
                    //if (event.stopPropagation) {
                    //    event.stopPropagation();
                    //} else {
                    //    window.event.cancelBubble = true;
                    //}
                }

                function selectMultiNode(ids) {
                    var nodes = [];
                    angular.forEach(ids, function (item) {
                        var node = zTree.getNodeByParam('id', item);
                        if (node && node.id !== '') {
                            zTree.selectNode(node, true);
                            nodes.push(node);
                        }
                    });
                    //取消「请选择选中」
                    if (nodes.length) {
                        var node = zTree.getNodeByParam('id', '');
                        if (node) {
                            zTree.cancelSelectedNode(node);
                        }
                    }
                    onSelectMultiNode(ids, nodes);
                }

                function selectNode(id) {
                    id = (id || id === 0 || id === '') ? id : '';
                    var node = zTree.getNodeByParam('id', id);
                    if (!node) {
                        if ((id || id === 0)) {
                            //存在id时置空
                            var selectNodes = zTree.getSelectedNodes();
                            if (selectNodes.length) {
                                onSelectNode(selectNodes[0]);
                            }
                        }
                        //scope.selectNodeId = (id || id === 0) ? '' : scope.selectNodeId;
                        return;
                    }
                    zTree.selectNode(node);
                    onSelectNode(node);
                    //if (options.onSelectNode) {
                    //    options.onSelectNode(null, node);
                    //}
                }

                scope.$watch('treeData', function (newVal) {
                    var nodes = newVal ? angular.copy(newVal) : [];
                    buildTree(nodes);
                    //根据ID选中节点
                    if (angular.isArray(scope.selectNodeId)) {
                        selectMultiNode(scope.selectNodeId);
                    } else if (scope.selectNodeId === 0 || scope.selectNodeId) {
                        selectNode(scope.selectNodeId);
                    }
                    if (angular.isArray(scope.treeCheckNodeIds)) {
                        setNodeCheckState(scope.treeCheckNodeIds);
                    }
                });

                scope.$watch('selectNodeId', function (newVal) {
                    if (!zTree || !newVal) {
                        if (newVal === '') {
                            selectNode(newVal);
                        }
                        return;
                    }
                    if (angular.isArray(newVal)) {
                        selectMultiNode(newVal);
                    } else {
                        selectNode(newVal);
                    }
                }, true);

                scope.$watch('treeCheckNodeIds', function (newVal) {
                    if (!zTree || !newVal || !angular.isArray(newVal)) {
                        return;
                    }
                    //node checked
                    setNodeCheckState(newVal);
                });

                function buildTree(nodes) {
                    if (options.hasDefaultRoot) {
                        nodes.unshift(rootNode);
                    }
                    var firstNode = nodes.length > 1 ? nodes[1] : nodes[0];
                    if (firstNode) {
                        if (firstNode.pid || firstNode.pid === 0) {
                            setting.data.simpleData.pIdKey = "pid";
                        }
                    }

                    $.fn.zTree.init(element, setting, nodes);
                    zTree = $.fn.zTree.getZTreeObj(element.attr('id'));

                    if (!options.defaultCollapse) {
                        zTree.expandAll(true);
                    }

                    var treeNodes;
                    if (options.hasDefaultRoot) {
                        treeNodes = zTree.getNodesByParam('level', 1);
                        if (!treeNodes.length) {
                            return;
                        }
                        //var node = zTree.getNodeById(3);
                        //zTree.selectNode(node);
                        zTree.selectNode(treeNodes[0]);
                        onSelectNode(treeNodes[0]);
                    } else if (!options.hasDefaultRoot) {
                        treeNodes = zTree.getNodes();
                        if (!treeNodes.length) {
                            return;
                        }
                        zTree.selectNode(treeNodes[0]);
                        onSelectNode(treeNodes[0]);
                    }
                }

                function setNodeCheckState(ids) {
                    zTree.checkAllNodes(false);
                    var checkedNodes = [];
                    for (var i = 0; i < ids.length; i++) {
                        var id = ids[i];
                        var node = zTree.getNodeByParam('id', id);
                        if (node) {
                            zTree.checkNode(node, true, false, false);
                            checkedNodes.push(node);
                        }
                    }
                    if (angular.isFunction(options.onCheckedNode)) {
                        var defer = $q.defer();
                        options.onCheckedNode(defer, null, null, checkedNodes);
                        defer.promise.then(function () {

                        });
                        apply();
                    }
                }

                function onNodeCheck(event, treeId, treeNode) {
                    if (angular.isFunction(options.onCheckedNode)) {
                        var checkedNodes = zTree.getCheckedNodes(true);
                        var defer = $q.defer();
                        options.onCheckedNode(defer, event, treeNode, checkedNodes);
                        defer.promise.then(function () {

                        });
                        apply();
                    }
                }

                function onBeforeClick(treeId, treeNode) {
                    if (treeNode.nodeDisabled) {
                        var event = event || window.event;
                        event.stopPropagation();
                        return false;
                    }

                    if (options.selectedMulti) {
                        multiSelectHandle(treeNode);
                        return false;
                    }
                    return true;
                }

                function multiSelectHandle(treeNode) {
                    var id = treeNode.id;
                    if (id === '') {//请选择
                        scope.selectNodeId = '';
                        apply();
                        return;
                    }

                    if (angular.isArray(scope.selectNodeId)) {
                        var index = scope.selectNodeId.indexOf(id + '');
                        if (index === -1) {
                            scope.selectNodeId.push(id + '');
                        } else {
                            scope.selectNodeId.splice(index, 1);
                            zTree.cancelSelectedNode(treeNode);
                        }
                        if (!scope.selectNodeId.length) {
                            scope.selectNodeId = '';
                        }
                    } else {
                        var node = zTree.getNodeByParam('id', '');
                        if (node) {
                            zTree.cancelSelectedNode(node);
                        }
                        scope.selectNodeId = [id + ''];
                    }
                    apply();
                    return false;
                }

                function onClick(e, treeId, treeNode, clickFlag) {

                    if (options.selectedMulti && treeNode.id !== '') {
                        var nodes = zTree.getSelectedNodes();
                        var ids = [];
                        angular.forEach(nodes, function (item) {
                            ids.push(item.id);
                        });
                        scope.selectNodeId = ids;
                    } else if (clickFlag !== 0) {
                        scope.selectNodeId = treeNode.id;
                    }
                    apply();
                    //onSelectNode(treeNode);
                }

                function onSelectMultiNode(ids, treeNodes) {
                    if (!angular.isFunction(options.onSelectNode)) {
                        return;
                    }
                    var defer = $q.defer();
                    angular.forEach(treeNodes, function (item, index) {
                        var parentNode = item.getParentNode();
                        item.parentName = parentNode ? parentNode.name : '';
                    });
                    options.onSelectNode(defer, treeNodes);
                    defer.promise.then(function (newNode) {

                    });
                    apply();
                }

                function onSelectNode(treeNode) {
                    if (angular.isFunction(options.onSelectNode)) {
                        var defer = $q.defer();
                        var parentNode = treeNode.getParentNode();
                        treeNode.parentName = parentNode ? parentNode.name : '';
                        options.onSelectNode(defer, treeNode);
                        defer.promise.then(function (newNode) {

                        });
                        apply();
                    }
                }

                function showRnameBtn(treeId, treeNode) {
                    return treeNode.id !== 0;
                }

                function showRemoveBtn(treeId, treeNode) {

                    return treeNode.id !== 0 && options.showRemoveBtn;
                }

                function beforeDrag(treeId, treeNodes) {
                    return false;
                }

                function beforeEditName(treeId, treeNode) {
                    if (angular.isFunction(options.onEditNode)) {
                        var defer = $q.defer();
                        options.onEditNode(defer, treeNode);
                        defer.promise.then(function (newNode) {
                            zTree.updateNode(newNode, false);
                        });
                        apply();
                    }
                    return false;
                }

                function beforeRemove(treeId, treeNode) {
                    if (angular.isFunction(options.onRemoveNode)) {
                        var defer = $q.defer();
                        options.onRemoveNode(defer, treeNode);
                        defer.promise.then(function () {
                            zTree.removeNode(treeNode, false);
                        });
                        apply();
                    }
                    return false;
                }

                function beforeRename(treeId, treeNode, newName, isCancel) {
                    return false;
                }

                function beforeAsync(treeId, treeNode) {
                    console.log(treeNode);
                }

                function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
                }

                function onAsyncSuccess(event, treeId, treeNode, msg) {
                }

                function refreshNode(e) {
                    var zTree = $.fn.zTree.getZTreeObj(element.attr('id')),
                    type = e.data.type,
                    silent = e.data.silent,
                    nodes = zTree.getSelectedNodes();
                    if (nodes.length == 0) {
                        alert("请先选择一个父节点");
                    }
                    for (var i = 0, l = nodes.length; i < l; i++) {
                        zTree.reAsyncChildNodes(nodes[i], type, silent);
                        if (!silent) zTree.selectNode(nodes[i]);
                    }
                }

                var newCount = 1;

                function addHoverDom(treeId, treeNode) {
                    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0 || !options.enableEdit) {
                        return false;
                    }
                    var sObj = $("#" + treeNode.tId + "_span");
                    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='添加子节点' onfocus='this.blur();'></span>";
                    sObj.after(addStr);
                    var btn = $("#addBtn_" + treeNode.tId);
                    if (btn) {
                        btn.bind("click", function () {

                            if (angular.isFunction(options.onAddNode)) {
                                var defer = $q.defer();
                                options.onAddNode(defer, treeNode);
                                defer.promise.then(function (nodeData) {
                                    var newNode = {
                                        id: nodeData.id,
                                        pId: nodeData.parentId,
                                        name: nodeData.name
                                    };
                                    angular.extend(newNode, nodeData);
                                    var node = zTree.addNodes(treeNode, newNode);
                                });
                                apply();
                            }

                            return false;
                        });
                    }
                }

                function removeHoverDom(treeId, treeNode) {
                    $("#addBtn_" + treeNode.tId).unbind().remove();
                }

                function apply() {
                    var phase = scope.$root.$$phase;
                    if (phase !== '$apply' && phase !== '$digest') {
                        scope.$apply();
                    }
                }

                buildTree([]);
            }
        };

    }

    ngZtreeFunc.$inject = ['$q'];
})();