(function(){
	"use strict";
	angular.module("myApp").value("DBLocal",{
		db:null,
		localdb: function() {
			this.db = window.openDatabase("dbLocal", "1.0", "Banco Local", 2000);
			this.db.transaction(function(res) {
				res.executeSql("CREATE TABLE IF NOT EXISTS USER(nome TEXT, email TEXT, senha TEXT);", []);
			});
		}
	});
})();