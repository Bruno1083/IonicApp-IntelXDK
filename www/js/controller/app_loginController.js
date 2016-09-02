(function(){
      "use strict";

      angular.module("myApp").controller("initLogin", function($scope, Data, $ionicModal, $location, DBLocal, DBLocalLoginDeUsuario){
            $scope.loginPg = "Login";


            $scope.loginUsuario = function(login){
                  Data.loginData(login).success(function(data){
                        if(data.permissao === false){
                              alert(data?data.erro: "Não foi possivel fazer o login. Tente novamente mais tarde.")
                        }
                        if(data.permissao === true){
                              DBLocalLoginDeUsuario.initLogin();
                              alert("Você está logado, seja bem vindo!");
                              DBLocalLoginDeUsuario.db.transaction(function(req) {
                                          req.executeSql("INSERT INTO LOGINUSUARIO(nome, email) VALUES(?,?);", [data.nome, data.email]);
                              });
                        }
                  });
            };
      });
})();
