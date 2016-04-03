(function() {
	"use strict";

	angular.module("myApp").controller("initCtrl", function($scope, Data, $ionicModal){
		$scope.home = "Contatos";
		$scope.perfil = "Perfil";

		$scope.contatos = [];


		var getData = function(){
			var  params = {
				counter: $scope.contatos.length,
				token:"1f3d2gs3f2fg3as2fdg3re2t1we46er45"
			};

			Data.getData(params).success(function(data){
				$scope.contatos = data;

			}).error(function(data){
				console.log(data? data : "Não foi possivel acessar o servidor");
			});
		};

		$ionicModal.fromTemplateUrl('cadastro.html',{
			scope: $scope,
    			animation: 'slide-in-up'

		}).then(function(modal) {
		    $scope.modal = modal;
		  });


		 $scope.abreModal = function(){
		 	$scope.modal.show();
		 }; 	
		
		$scope.fechaModal = function(){
		 	$scope.modal.hide();
		 }; 	
		 
		getData();
	});
})();