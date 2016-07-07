(function() {
	"use strict";

	angular.module("myApp").controller("initCtrl", function($scope, Data, $ionicModal, $location, DBLocal){
		$scope.home = "Contatos";
		$scope.perfil = "Perfil";
		$scope.contatos = [];
		$scope.myswipe = true;


		
		// INSERINDO DADOS LOCALMENTE
		DBLocal.localdb();

		var nome = "Sergio";
		var email = "joao@email.com";
		var senha = "654321";

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
		//ENVIANDO DADOS
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
		
		//APAGAR DADOS
		$scope.apagar = function(contato) {
			console.log(contato.id);
			//CONFIRMANDO A OPERAÇÃO
			navigator.notification.confirm(
				"Tem certeza que deseja apagar este contato?",
				apagarContato,
				"Atenção",
				["Apagar", "Cancelar"]
			);
			//CALLBACK
			function apagarContato(buttonIndex') {

				if(buttonIndex === 1){
					Data.delData(contato.id).success(function(data) {
						navigator.notification.alert(data?data:"Não foi possivel deletar este contato", null, "Menssagem", "OK");
						getData();
					}).error(function(data) {
						navigator.notification.alert("Não foi possivel deletar este contato, tente novamente!", null, "Menssagem", "OK");
					});
				};
			};
		};

		// IMPRIMINDO NO PERFIL
		$scope.perfilUsuario = function(id) {
			$scope.usuarioPerfil = $scope.contatos.filter(function(element) {
				return element.id == id;
			});
			console.log($scope.usuarioPerfil);
			$location.path("/menu/perfil");
		};


	});
})();