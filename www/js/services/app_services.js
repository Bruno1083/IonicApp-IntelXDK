(function(){
	"use strict";

	angular.module("myApp").value("Config", {

		getUrl: "http://localhost:82/api/api/"
	});

	angular.module("myApp").service("Data", function($http, Config){
		this.getData = function(params){
			return $http({
				method: "POST",
				url: Config.getUrl + "apiRecupera.php",
				data: params,
				headers : {
				                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				            }
			});
		};
	
	});
})();