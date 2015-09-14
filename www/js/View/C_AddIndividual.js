var Globalcontrollerref = null;

/************* ViewCompanyAddIndividual module Constructor******************/
function ViewCompanyAddIndividual(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	if (sessionStorage.CompanyUserDetails != null) {
		$("#hidCompanyUserID").val(JSON.parse(sessionStorage.CompanyUserDetails).CompanyID);
	}
	if (sessionStorage.editIndividual != null) {
		this.bindElementsinEditmode(JSON.parse(sessionStorage.editIndividual));
	}
}

/************* ViewCompanyAddIndividual module Prototype ******************/
ViewCompanyAddIndividual.prototype = {
	bindElementsinEditmode : function(editdata) {
		$("#txtFName").val(editdata.Name);
		$("#txtPhone").val(editdata.Phone1);
		$("#txtUserID").val(editdata.DriverID);
		$("#hidIndividualID").val(editdata.ID);
		$("#sp_AddEdit").html("Edit");
		$("#hidFlag").val("U");
		$("#txtEmailID").val(editdata.EmailID);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "C_IndividualList.html";
}


$("#btnBack").click(function() {
	window.location = "C_IndividualList.html";
});

$("#formAddCompany").submit(function(event) {
	event.preventDefault();
	if (C_IndividualValidations()) {
		var $form = $(this);
		var dataf = $form.serialize();
		Globalcontrollerref.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "UserService/AddUpdateDriver", dataf, "json", AddVehicleSuccess, AddVehicleError);
	}
});

function AddVehicleSuccess(res) {
	if (res.success) {
		sessionStorage.removeItem("editIndividual");
		window.location = "C_IndividualList.html";
	} else {
		navigator.notification.alert(res.msg, alertDismissed, "Alert", "Ok");
	}
}

function AddVehicleError() {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/************** html validations **************/
$("#txtFName").focus(function() {
	$('#lblFName').css('display', 'none');
});

$("#txtFName").blur(function() {
	if (($("#txtFName").val()).trim() == "") {
		$('#lblFName').html("You can't leave this empty");
		$('#lblFName').css('display', 'block');
	}
});

$("#txtPhone").focus(function() {
	$('#lblPhone').css('display', 'none');
});

$("#txtPhone").blur(function() {
	if (($("#txtPhone").val()).trim() == "") {
		$('#lblPhone').html("You can't leave this empty");
		$('#lblPhone').css('display', 'block');
	} else if (!phonenumber($("#txtPhone").val())) {
		$("#lblPhone").html("Invalid Phone Number");
		$('#lblPhone').css('display', 'block');
	}
});

$("#txtUserID").focus(function() {
	$('#lblUserID').css('display', 'none');
});

$("#txtUserID").blur(function() {
	if (($("#txtUserID").val()).trim() == "") {
		$('#lblUserID').html("You can't leave this empty");
		$('#lblUserID').css('display', 'block');
	} else if (!isAlphaNumeric($("#txtUserID").val())) {
		$("#lblUserID").html("Special characters are not allowed");
		$('#lblUserID').css('display', 'block');
	}
});

$("#txtEmailID").focus(function() {
	$('#lblEmailID').css('display', 'none');
});

$("#txtEmailID").blur(function() {
	if (($("#txtEmailID").val()).trim() == "") {
		$('#lblEmailID').html("You can't leave this empty");
		$('#lblEmailID').css('display', 'block');
	} else if (!checkEmail($("#txtEmailID").val())) {
		$('#lblEmailID').html('Please enter valid Email ID');
		$('#lblEmailID').css('display', 'block');
	}
});

function C_IndividualValidations() {
	var bool = true;
	if (($("#txtFName").val()).trim() == "") {
		$('#lblFName').html("You can't leave this empty");
		$('#lblFName').css('display', 'block');
		bool = false;
	}
	if (($("#txtPhone").val()).trim() == "") {
		$('#lblPhone').html("You can't leave this empty");
		$('#lblPhone').css('display', 'block');
		bool = false;
	} else if (!phonenumber($("#txtPhone").val())) {
		$("#lblPhone").html("Invalid Phone Number");
		$('#lblPhone').css('display', 'block');
		bool = false;
	}
	if (($("#txtUserID").val()).trim() == "") {
		$('#lblUserID').html("You can't leave this empty");
		$('#lblUserID').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumeric($("#txtUserID").val())) {
		$("#lblUserID").html("Special characters are not allowed");
		$('#lblUserID').css('display', 'block');
		bool = false;
	}
	if (($("#txtEmailID").val()).trim() == "") {
		$('#lblEmailID').html("You can't leave this empty");
		$('#lblEmailID').css('display', 'block');
		bool = false;
	} else if (!checkEmail($("#txtEmailID").val())) {
		$('#lblEmailID').html('Please enter valid Email ID');
		$('#lblEmailID').css('display', 'block');
		bool = false;
	}
	return bool;
}