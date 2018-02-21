angular
  .module('scores')
  .directive('loader', loader);

function loader($rootScope, $http, $timeout) {
  var vm = this;
  vm.root = $rootScope.root;
  return {
    restrict: 'A',
    replace: true,
    templateUrl: vm.root + "app/shared/loader/loaderView.html",
    link: function (scope, elm, attrs){
      scope.isLoading = function () {
        return $http.pendingRequests.length > 0;
      };

      scope.$watch(scope.isLoading, function (v){
        if(v){
          $(elm).show(); $
        }else{
          $(elm).hide(); console.log('tu2');
          $('.content').show();
        }
      });
    }
  };
}