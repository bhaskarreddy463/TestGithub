/************* ViewWholesalerMenuScreen module Constructor******************/
function ViewWholesalerMenuScreen(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	this.init();
}

/************* ViewWholesalerMenuScreen module Prototype ******************/
ViewWholesalerMenuScreen.prototype = {
	init : function() {
		if (sessionStorage.UserName != null) {
			$("#WholesalerUserID").html(sessionStorage.UserName);
		}
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	event.preventDefault();
}

/************* HTML Click events ***************/
$("#sendtoLoginAS").click(function() {
	window.location = "LoginAs.html";
});

$("#divCompanyList").click(function() {
	window.location = "W_CompanyList.html";
});

$("#divVehicle").click(function() {
	window.location = "W_VehicleList.html";
});

$("#divIndividual").click(function() {
	window.location = "W_IndividualList.html";
});

$("#divTrip").click(function() {
	window.location = "W_TripSummary.html";
});
