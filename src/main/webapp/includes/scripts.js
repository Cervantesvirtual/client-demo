"use strict";

var myApp = angular.module('demoApp',['ngSanitize']);

myApp.controller('demoController', ['$scope', '$http', function($scope, $http) {
  $scope.text = "Cervantes";
  
  $scope.results = '';
  $scope.page = 1;
  $scope.maxRows = 10;
  $scope.start = 0;
  $scope.total = 0;

  $scope.search = function () {
    $scope.page = 1;
    $scope.searchPaginate();
  }
    
  $scope.searchPaginate = function (){
    $scope.queryStr = "start=" + $scope.start;
    $scope.queryStr += "&maxRows=" + $scope.maxRows;
        
    if($scope.text != ''){
      $scope.queryStr += "&q=" + $scope.text;
    }
        
    // http://localhost:8080/cervantesvirtual-web-services/entidaddocumental/search?q=cerva&maxRows=10&start=0
    $http.get('http://localhost:8080/cervantesvirtual-web-services/entidaddocumental/search?' + $scope.queryStr)
      .success(function (data) {
         $scope.results = data.lista;
         $scope.total = data.total;
      })
      .error(function (data) {
         $scope.error = "Data: " + data;
    });
  }
  
  $scope.getUrl = function (item) {
	  if(!angular.isUndefined(item.url) && item.url.length && item.url.indexOf('/') == 0){
	    var url = 'http://www.cervantesvirtual.com' + item.url;
	    return url;
      }else{
    	return "obra.html?uuid=" + item.uuid;
      }
	  
	  
  }
  
}]);

myApp.filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
