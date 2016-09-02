(function(){
	"use strict";
	angular.module("myApp").value("DBLocalLoginDeUsuario",{
		db:null,
		initLogin: function() {
			this.db = window.openDatabase("LOGINDEUSUARIO", "1.0", "Banco Local", 2000);
			this.db.transaction(function(res) {
				res.executeSql("CREATE TABLE IF NOT EXISTS LOGINUSUARIO(nome TEXT, email TEXT);", []);
			});
		}
	});
})();
