/************* InitializeModel module Constructor******************/
function InitializeModel() {

}

/************* InitializeModel module Prototype ******************/
InitializeModel.prototype = {
	setValues : function(db, queryStr, successcallback, errorcallback) {
		db.transaction(function(tx) {
			tx.executeSql(queryStr);
		}, errorcallback, successcallback);
	},
	getValues : function(tx, queryStr, successcallback, errorcallback) {
		tx.executeSql(queryStr, [], successcallback, errorcallback);
	},
	createTable : function(tx, queryStr) {
		tx.executeSql(queryStr);
	}
};

