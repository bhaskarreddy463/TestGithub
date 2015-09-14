/************* ViewCompanyMenuScreen module Constructor******************/
function ViewCompanyMenuScreen(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	this.init();
	if (JSON.parse(sessionStorage.CompanyUserDetails).CreatedByID == 0) {
		$("#ShowdivTrip").css('display', 'block');
	} else {
		$("#ShowdivTrip").css('display', 'none');
	}
}

/************* ViewCompanyMenuScreen module Prototype ******************/
ViewCompanyMenuScreen.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		if (sessionStorage.CompanyUserDetails != undefined) {
			$("#CompanyUserID").html(JSON.parse(sessionStorage.CompanyUserDetails).CompanyName);
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

// HTML Click events

$("#sendtoLoginAS").click(function() {
	window.location = "LoginAs.html";
});

$("#divVehicle").click(function() {
	window.location = "C_VehicleList.html";
});

$("#divIndividual").click(function() {
	window.location = "C_IndividualList.html";
});

$("#divTrip").click(function() {
	window.location = "C_TripSummary.html";
});
