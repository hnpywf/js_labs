devControllers.controller('devIndexCtrl', function($scope, $routeParams, location) {
	$scope.show_article = false;
	$scope.Paging = {
		per_page 		: 5,
		current_page 	: 1,
		total_pages 	: Math.ceil(Articles.length / 5),
		shown_pages 	: Array()
	};
	$scope.changePage = function(i) {
		location.skipReload().path('Index/page/' + i);
		_changePage(i);
	}
	$scope.showArticle = function(i) {
		location.skipReload().path('Index/page/' + $scope.Paging.current_page + '/' + i);
		_showArticle(i);
	}

	var current_page = typeof($routeParams.idPage) == 'undefined' ? 1 : $routeParams.idPage * 1;
	var current_article = typeof($routeParams.idArticle) == 'undefined' ? 0 : $routeParams.idArticle * 1;
	if (current_article) {
		_showArticle(current_article);
		_changePage(current_page);
	} else {
		_changePage(current_page);
	}

	function _showArticle(i) {
		$scope.show_article = Articles[i];
	}
	function _changePage(i) {
		$scope.Paging.current_page = i;
		$scope.shown_articles = Articles.slice(($scope.Paging.current_page - 1)*$scope.Paging.per_page,$scope.Paging.current_page*$scope.Paging.per_page);
		_drawPaging();
	}
	function _drawPaging() {
		$scope.Paging.shown_pages = Array();
		var from = Math.max($scope.Paging.current_page - 3, 1);
		var to = Math.min($scope.Paging.current_page + 3, $scope.Paging.total_pages);
		for(var i = from; i<=to; i++) {
			$scope.Paging.shown_pages.push(i);
		}
	}
});