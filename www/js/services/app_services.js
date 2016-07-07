(function(){
	"use strict";

	angular.module("myApp").value("Config", {

		getUrl: "http://ionicapp.esy.es/"
	});

	angular.module("myApp").service("Data", function($http, Config){
		//recuperação de dados
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

		//cadastro
		this.setData = function(dados){
			return $http({
				method: "POST",
				url: Config.getUrl + "apiCadastro.php",
				data: dados,
				headers : {
				                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				            }
			});
		};
		//Areturn $http({
				method: "POST",
				url: Config.getUrl + "apiDeleta.php",
				data: id,
				headers : {
				                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				            }
			});
		};
	
	});
})();