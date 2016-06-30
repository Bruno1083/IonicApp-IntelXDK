(function() {
	"use strict";

	angular.module("myApp").controller("initCtrl", function($scope, Data, $ionicModal, $location, DBLocal){
		$scope.home = "Contatos";
		$scope.perfil = "Perfil";

		$scope.contatos = [];

		
		DBLocal.localdb();

		var nome = "Sergio";
		var email = "joao@email.com";
		var senha = "654321";

		// INSERINDO DADOS LOCALMENTE
		// DBLocal.db.transaction(function(res) {
		// 	res.executeSql("INSERT INTO USER(nome, email, senha) VALUES(?,?,?);", [nome, email, senha]);
		// });

		//RECUPERANDO DADO LOCAL
		DBLocal.db.transaction(function(res) {
			var q = "SELECT * FROM USER";
			res.executeSql(q, null, function(i, data) {
				$scope.nome = "Olá " + data.rows.item(1).nome;
			});
		});

		DBLocal.db.transaction(function(res) {
			res.executeSql("DELETE FROM USER WHERE nome = ?;",[nome]);
		});


		//BANCO DE DADOS ONLINE
		var getData = function(){
			var  params = {
				counter: 0, //  $scope.contatos.length,
				token:"1f3d2gs3f2fg3as2fdg3re2t1we46er45"
			};

		Data.getData(params).success(function(data){
				$scope.contatos = data;

			}).error(function(data){
				console.log(data? data : "Não foi possivel acessar o servidor");
			});
		};

		$ionicModal.fromTemplateUrl('views/cadastro.html',{
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

		$scope.cadastroUsuario = function(cadastro) {
			Data.setData(cadastro).success(function(data) {
				alert(data);
				$scope.modal.hide();
				getData();
			}).error(function(data) {
				alert(data);
			});

			console.log(cadastro);
		};

		$scope.perfilUsuario = function(id) {
			$scope.usuarioPerfil = $scope.contatos.filter(function(element) {
				return element.id == id;
			});
			console.log($scope.usuarioPerfil);
			$location.path("/menu/perfil");
		};

	});
})();