angular.module('ui', []);

angular.module('ui').controller('ListPageController', ['$scope', '$q', function($scope, $q) {
  var mockData = [
    {value: 'First', checked: false},
    {value: 'Second', checked: false},
    {value: 'Third', checked: false}
  ];

  this.getData = function() {
    return $q.when(mockData);
  };
}]);

angular.module('ui').directive('fancyList', ['$q', function($q) {
  return {
    restrict: 'E',
    scope: {
      source: '&'
    },
    templateUrl: 'fancy-list-view.html',
    link: function(scope) {
      scope.source().then(function(data) {
        scope.items = data;
        initListState();
      });

      function initListState() {
        scope.isClean = checkIsClean();
        scope.isAllChecked = checkIsAllChecked();
      }

      scope.toggleCheckbox = function(item) {
        item.checked = !item.checked;
        initListState(); 
      };

      function checkIsAllChecked() {
        return scope.items.every(function(item) {
          return item.checked === true;
        });
      }

      function checkIsClean() {
        var first = scope.items[0];

        return scope.items.every(function(item) {
          return item.checked === first.checked;
        });
      }

      scope.toggleAll = function() {
        scope.isAllChecked = !scope.isAllChecked;
        scope.isClean = true;

        scope.items.forEach(function(item) {
          item.checked = scope.isAllChecked;
        });
      };
    }
  };
}]);
