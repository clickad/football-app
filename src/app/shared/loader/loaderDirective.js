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
		if(!$rootScope.firstLoad){
			if(v){ 
				elm[0].style.display = "block";
				elm[0].style.backgroundColor = "rgba(0, 0, 0, 0.6)";
				elm[0].firstElementChild.style.display = "block";
			}else{
				elm[0].style.display = "none";
				document.querySelector(".content").style.display = "block";
			}
		} else{
			if(v){ 
				elm[0].style.display = "block";
				elm[0].style.backgroundColor = "transparent";
				elm[0].firstElementChild.style.display = "none";
				document.querySelector(".re-load").style.display = "block"
			}else{
				elm[0].style.display = "none";
				document.querySelector(".content").style.display = "block";
				document.querySelector(".re-load").style.display = "none"
			}
		}
      });
    }
  };
}