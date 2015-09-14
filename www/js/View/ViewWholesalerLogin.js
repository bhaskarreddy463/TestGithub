var Globalcontrollerref = null;
/*************ViewWholesalerLogin module Constructor******************/
function ViewWholesalerLogin(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	if (localStorage["wholesalerUserdetails"] != undefined) {
		var Userdetails = JSON.parse(localStorage["wholesalerUserdetails"]);
		$("#txtUserID").val(Userdetails.userid);
	}
}

/************* ViewWholesalerLogin module Prototype ******************/
ViewWholesalerLogin.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		this.myControllerAddVehicleRef = this.controllerRef.myControllers.insControllerAddVehicle;
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "LoginAs.html";
}

/*********** HTML Click events  *****************/
$("#btnSignUp").click(function() {
	window.location = "W_SignUp.html";
});

$("#AjaxLogin").submit(function(event) {
	event.preventDefault();
	if (loginValidation()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/ValidateUserLogin", data, "json", mySuccess, myError);
	}
});

function mySuccess(res) {
	if (res.success) {
		if ($('#chkRememberMe').is(':checked')) {
			localStorage["wholesalerUserdetails"] = '{}';
			var Userdetails = JSON.parse(localStorage["wholesalerUserdetails"]);
			Userdetails.userid = $("#txtUserID").val();
			localStorage["wholesalerUserdetails"] = JSON.stringify(Userdetails);
		} else {
			localStorage.removeItem("wholesalerUserdetails");
		}
		res.objLoginResponse.UserID = $("#txtUserID").val();
		sessionStorage.UserProfileDetails = JSON.stringify(res.objLoginResponse);
		sessionStorage.UserID = res.ID;
		sessionStorage.UserName = res.UserName;
		window.location = "W_MenuScreen.html";
	} else {
		$("#lblServerError").html("Invalid Username or Password");
		$('#lblServerError').css('display', 'block');
	}
}

function myError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/***************** page validations ****************/
$("#txtUserID").focus(function() {
	$('#lblUserID').css('display', 'none');
	$('#lblServerError').css('display', 'none');
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

$("#txtPassword").focus(function() {
	$('#lblPassword').css('display', 'none');
	$('#lblServerError').css('display', 'none');
});

$("#txtPassword").blur(function() {
	if (($("#txtPassword").val()).trim() == "") {
		$('#lblPassword').html("You can't leave this empty");
		$('#lblPassword').css('display', 'block');
	}
});

function loginValidation() {
	var bool = true;
	if (($("#txtUserID").val()).trim() == "") {
		$('#lblUserID').html("You can't leave this empty");
		$('#lblUserID').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumeric($("#txtUserID").val())) {
		$("#lblUserID").html("Special characters are not allowed");
		$('#lblUserID').css('display', 'block');
		bool = false;
	}
	if (($("#txtPassword").val()).trim() == "") {
		$('#lblPassword').html("You can't leave this empty");
		$('#lblPassword').css('display', 'block');
		bool = false;
	}
	return bool;
}
