/**
 * Created by nicol on 10/12/16.
 * @version:0.1.0

 <div ng-init="itemData=[{id:1,name:'测试1'},{id:2,name:'测试2'}]"></div>
 <ng-ztree-dropdown-multiple item-data="itemData" ng-model="checkedNodes"></ng-ztree-dropdown-multiple>

 itemData: 选项数据（支持树型和非树型）
 required: 是否必选
 ngDisabled: 禁用
 id: id
 onCheckNode: 当选择项时

 */
(function () {
    'use strict';
    angular
        .module('ui.missionsky.ztree')
        .directive('ngZtreeDropdownMultiple', ngZtreeDropdownMultipleFunc);
    function ngZtreeDropdownMultipleFunc($filter) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                itemData: '=?',
                required: '=',
                ngDisabled: '=?',
                id: '@',
                onCheckNode: '&',
                useCheck: '=?',
                onSelectNode: '&'
            },
            require: 'ngModel',
            templateUrl: 'tree/ng-ztree-dropdown-multiple.html',
            controller: ['$scope', function ($scope) {
                var ctrl = this;
                ctrl.treeParams = {
                    enableEdit: false,
                    hasDefaultRoot: false,
                    rootName: '根节点',
                    enableCheck: $scope.useCheck,
                    selectedMulti: !$scope.useCheck,
                    onCheckedNode: onCheckedNode,
                    onSelectNode: onSelectNode,
                    defaultCollapse: true
                };

                function onSelectNode($defer, treeNodes) {
                    if (angular.isArray(treeNodes)) {
                        var name = [], ids = [];
                        for (var i = 0; i < treeNodes.length; i++) {
                            var node = treeNodes[i];
                            if (node.id) {
                                ids.push(node.id);
                                name.push(node.name);
                            }
                        }
                        ctrl.checkName = name.join(',');
                    } else {
                        ctrl.checkName = treeNodes.name;
                    }
                    if (angular.isFunction($scope.selectNode)) {
                        $scope.selectNode(ids, treeNodes);
                    }
                }

                function onCheckedNode($defer, event, treeNode, allCheckedNodes) {
                    $defer.resolve();
                    var ids = [], name = [];
                    for (var i = 0; i < allCheckedNodes.length; i++) {
                        var node = allCheckedNodes[i];
                        if (node.id) {
                            ids.push(node.id);
                            name.push(node.name);
                        }
                    }
                    ctrl.checkName = name.join(',');
                    $scope.checkedNode(ids, allCheckedNodes);
                }
            }],
            controllerAs: 'treeDropCtrl',
            link: function (scope, element, attrs, $ngModel) {


                $ngModel.$render = function () {
                    var newValue = $ngModel.$viewValue;
                    if (scope.useCheck) {
                        scope.treeCheckNodeIds = newValue;
                    } else {
                        scope.selectNodeId = newValue;
                    }
                };

                scope.$watch('itemData', function (newVal) {
                    if (!angular.isArray(newVal)) {
                        newVal = [];
                    }
                    if (!scope.noDefault) {
                        newVal.unshift({id: '', parent: '', name: '请选择...'});
                    }
                });

                scope.checkedNode = function (ids, allCheckNodes) {
                    //scope.treeCheckNodeIds = ids;
                    $ngModel.$setViewValue(ids);
                    scope.onCheckNode({nodes: allCheckNodes, ids: ids});
                };

                scope.selectNode = function (ids, nodes) {
                    scope.selectedNode = nodes;
                    $ngModel.$setViewValue(ids);
                    scope.onSelectNode({nodes: nodes});
                };

                function eleClickFunc(e) {
                    var target = angular.element(e.target);
                    //点击展开折叠图标或者复选框时不消失
                    if (target.hasClass('switch') || target.hasClass('chk') || target.hasClass('node_name') || e.target.nodeName === 'A') {
                        //if (target.text() !== '' && target.text() !== '请选择...') {
                        var event = e || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            window.event.cancelBubble = true;
                        }
                    }
                }

                element.on('click', eleClickFunc);

                scope.$on('$destroy', function () {
                    element.off('click', eleClickFunc);
                });
            }
        };
    }

    ngZtreeDropdownMultipleFunc.$inject = ['$filter'];
})();