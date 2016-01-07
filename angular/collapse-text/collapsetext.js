/**
@fileoverview: collapse text
@create date: 2014 07 17
eg:
    <p collapse-text="100" collapse-value="longtext"></p>

    <p collapse-text="100">{{longtext}}</p>


    <p collapse-text="100" is-more="false" collapse-value="longtext"></p>
*/
angular.module('lr.text', []);

angular.module('lr.text').directive('collapseText', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        scope: { collapseValue: "=", isMore: "=" },//may add 'isMore', display more/less or not. default true.
        link: function (scope, element, attrs) {

            // start collapsed
            scope.collapsed = false;

            // create the function to toggle the collapse
            scope.toggle = function () {
                scope.collapsed = !scope.collapsed;
            };

            var collapse = function () {

                // get the value of the collapse-text attribute
                attrs.$observe('collapseText', function (maxLength) {
                    // get the contents of the element
                    //var text = element.text();
                    //console.log(scope.collapseValue);
                    var text=null;
                    var isShowMore = scope.isMore != undefined ? scope.isMore : true;
                    if (!scope.collapseValue) {
                        text = element.text();
                    } else {
                        text = scope.collapseValue;
                        element.empty();
                        element.append(text);
                    }

                    //console.log(element.text());
                    if (text && text.length > maxLength) {
                        // split the text in two parts, the first always showing
                        var firstPart = String(text).substring(0, maxLength);
                        var secondPart = String(text).substring(maxLength, text.length);

                        // create some new html elements to hold the separate info
                        var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                        var secondSpan = $compile('<span ng-show="collapsed">' + secondPart + '</span>')(scope);
                        var moreIndicatorSpan = $compile('<span ng-show="!collapsed">...</span>')(scope);
                        var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "less" : "more"}}</span>')(scope);

                        // remove the current contents of the element
                        // and add the new ones we created
                        element.empty();
                        element.append(firstSpan);
                        element.append(secondSpan);
                        element.append(moreIndicatorSpan);
                        if (isShowMore) {
                            element.append(toggleButton);
                        }
                    }
                });
            }

            //collapse();

            scope.$watch("collapseValue", function (newVal) {
                collapse();
            });
        }
    };
}]);