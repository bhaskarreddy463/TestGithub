/************* main Constructor ******************/
function main(Page) {
	try {
		initialize(Page);
	} catch(e) {
		console.log("Error in main function:: " + e.message);
	}
}

/**************** initialize the model controller and view ********************/
function initialize(Page) {
	try {
		var _Model = new MainModel(Page);
		var _Controller = new MainController(_Model, Page);
		new MainView(_Model, _Controller, Page);
	} catch(e) {
		console.log("Error in initialize function of mainGame:: " + e.message);
	}
}        