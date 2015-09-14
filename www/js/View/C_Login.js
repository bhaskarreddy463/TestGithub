var Globalcontrollerref = null;
/************* ViewCompanyLogin module Constructor******************/
function ViewCompanyLogin(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	if (localStorage["CompanyUserdetails"] != undefined) {
		var Userdetails = JSON.parse(localStorage["CompanyUserdetails"]);
		$("#txtUserID").val(Userdetails.userid);
	}
}

/************* ViewCompanyLogin module Prototype ******************/
ViewCompanyLogin.prototype = {
	myControllerLoginAsRef : null,
	init : function() {

	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	event.preventDefault();
	window.location = "LoginAs.html";
}

/************** click events **************/
$("#btnSignUp").click(function() {
	window.location = "C_SignUp.html";
});

$("#CompanyLoginform").submit(function(event) {
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
			localStorage["CompanyUserdetails"] = '{}';
			var localUserdetails = JSON.parse(localStorage["CompanyUserdetails"]);
			localUserdetails.userid = $("#txtUserID").val();
			localStorage["CompanyUserdetails"] = JSON.stringify(localUserdetails);
		} else {
			localStorage.removeItem("CompanyUserdetails");
		}
		sessionStorage.CompanyUserDetails = "{}";
		var userDetails = JSON.parse(sessionStorage.CompanyUserDetails);
		userDetails.CompanyID = res.ID;
		userDetails.CompanyName = res.UserName;
		userDetails.CompanyUserID = $("#txtUserID").val();
		userDetails.CreatedByID = res.CreatedByID;
		sessionStorage.CompanyUserDetails = JSON.stringify(userDetails);
		window.location = "C_MenuScreen.html";
	} else {
		$("#lblServerError").html("Invalid Username or Password");
		$('#lblServerError').css('display', 'block');
	}
}

function myError(res) { debugger;
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/************** page validations **************/
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