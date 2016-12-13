/**
 * Created by nicol on 7/26/16.
 * @version:0.1.0
 <ng-ztree-dropdown id="economicCategoryId"
 item-data="biCtrl.economicCategory"
 ng-model="biCtrl.info.economicCategoryId"
 on-select="onSelect(node)"
 ng-required="true"></ng-ztree-dropdown>

 */
(function () {
    'use strict';
    angular
        .module('ui.missionsky.ztree')
        .directive('ngZtreeDropdown', ngZtreeDropdownFunc);
    function ngZtreeDropdownFunc($filter) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                itemData: '=?',
                required: '=',
                ngDisabled: '=?',
                id: '@',
                noDefault: '=?',
                selectedNode: '=?',
                onSelect: '&',
                ngZtreeDropdown: '=?'
            },
            require: 'ngModel',
            templateUrl: 'tree/ng-ztree-dropdown.html',
            controller: ['$scope', function ($scope) {
                var ctrl = this;
                ctrl.treeParams = {
                    enableEdit: false,
                    hasDefaultRoot: false,
                    rootName: '根节点',
                    onSelectNode: onSelectNode,
                    defaultCollapse: true
                };

                angular.extend(ctrl.treeParams, $scope.ngZtreeDropdown);

                function onSelectNode($defer, treeNode, justName) {
                    ctrl.selectName = treeNode.name;
                    if (justName) {//只更新显示
                        return;
                    }
                    if (angular.isFunction($scope.selectNode)) {
                        $scope.selectNode(treeNode);
                    }
                }
            }],
            controllerAs: 'treeDropCtrl',
            link: function (scope, element, attrs, $ngModel) {
                //scope.$watch(function () {
                //    return $ngModel.$modelValue;
                //}, function (newVal) {
                //    if (!newVal) {
                //        scope.selectNodeId = "";
                //        return;
                //    }
                //    scope.selectNodeId = newVal;
                //});

                $ngModel.$render = function () {
                    var newValue = $ngModel.$viewValue;
                    scope.selectNodeId = newValue;
                };

                //$ngModel.$viewChangeListeners.push(function () {
                //    scope.selectNodeId = $ngModel.$viewValue;
                //});

                scope.$watch('itemData', function (newVal) {
                    if (!angular.isArray(newVal)) {
                        newVal = [];
                    }
                    if (!scope.noDefault) {
                        newVal.unshift({ id: '', parent: '', name: '请选择...' });
                    }
                });
                scope.selectNode = function (node) {
                    scope.selectedNode = node;
                    $ngModel.$setViewValue(node.id);
                    scope.onSelect({ node: node });
                };

                function eleClickFunc(e) {
                    var target = angular.element(e.target);
                    //点击展开折叠图标时不消失
                    if (target.hasClass('switch')) {
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

    ngZtreeDropdownFunc.$inject = ['$filter'];
})();