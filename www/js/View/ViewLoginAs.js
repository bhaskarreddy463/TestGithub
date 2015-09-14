/************* ViewWholesalerVehicleList module Constructor******************/
function ViewLoginAs(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	sessionStorage.clear();
}

/************* ViewWholesalerMenuScreen module Prototype ******************/
ViewLoginAs.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		this.myControllerLoginAsRef = this.controllerRef.myControllers.insControllerLoginAs;
	}
};

/************* HTML Click events  ***************/

$("#btnWholesaler").click(function() {
	window.location = "W_Login.html";
});

function alertDismissed() {
}


$("#btnCompany").click(function() {
	window.location = "C_Login.html";
});

$("#btnDriver").click(function() {
	if (localStorage["DriverUserDetails"] != undefined) {
		if (JSON.parse(localStorage.DriverUserDetails).isLogin) {
			window.location = "D_MenuScreen.html";
			return;
		}
		window.location = "D_Login.html";
	} else {
		window.location = "D_Login.html";
	}
});

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	event.preventDefault();
}
