"use strict";

var myApp = angular.module('demoApp',['ngSanitize']);

myApp.controller('obraController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.uuid = $location.absUrl().substring($location.absUrl().lastIndexOf("=")+1, $location.absUrl().length);
  $scope.obra = '';
    
  $scope.getObra = function (){
    
    // http://localhost:8080/cervantesvirtual-web-services/entidaddocumental/getJson?uuid=53196c5a-9521-43e8-b880-ff3cd8113e2a
    $http.get('http://localhost:8080/cervantesvirtual-web-services/entidaddocumental/getJson?uuid=' + $scope.uuid)
      .success(function (data) {
    	  $scope.obra = data[0];
      })
      .error(function (data) {
         $scope.error = "Data: " + data;
    });
  }
  
  $scope.getUrl = function (url) {
	  if(!angular.isUndefined(url) && url.length && url.indexOf('/') == 0)
	    url = 'http://www.cervantesvirtual.com' + url;
	  
	  return url;
  }
  
}]);

myApp.filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
