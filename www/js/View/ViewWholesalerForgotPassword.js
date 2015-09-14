var Globalcontrollerref = null;

/*************ViewWholesalerForgotPassword module Constructor******************/
function ViewWholesalerForgotPassword(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
}

/************* ViewWholesalerForgotPassword module Prototype ******************/
ViewWholesalerForgotPassword.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		this.myControllerAddVehicleRef = this.controllerRef.myControllers.insControllerAddVehicle;
	}
};

/**************** HTML Click events *****************/
$("#AjaxForgotPWD").submit(function(event) {
	event.preventDefault();
	if (validateForgotPassword()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/UserForgetPassword", data, "json", mySuccess, myError);
	}
});

$("#formResetPassword").submit(function(event) {
	event.preventDefault();
	if (ResetPWDValidation()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/UserResetPassword", data, "json", ResetPwdSuccess, ResetPwdError);
	}
});

$("#a_forgotEmailID").click(function() {
	navigator.notification.alert("Contact your company to reset password", alertDismissed, "Alert", "Ok");
});
$(".btnBack").click(function() {
	window.location = "W_Login.html";
});

function mySuccess(res) {
	if (res.success) {
		navigator.notification.alert("Reset ID has been sent to your registered email", alertDismissed, "Alert", "Ok");
		$("#AjaxForgotPWD").css('display', 'none');
		var userid = $("#txtUserID").val();
		$("#formResetPassword").css('display', 'block');
		$("#txtsavedUserID").val(userid);
		$("#hidEmailID").val($("#txtEmailID").val());
	} else {
		navigator.notification.alert(res.msg, alertDismissed, "Alert", "Ok");
	}
}

function myError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function ResetPwdSuccess(res) {
	if (res.success) {
		window.location = "W_Login.html";
	} else {
		navigator.notification.alert(res.msg, alertDismissed, "Alert", "Ok");
	}
}

function ResetPwdError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/*************** page validation *************/
$("#txtEmailID").focus(function() {
	$('#lblEmailID').css('display', 'none');
});

$("#txtEmailID").blur(function() {
	if (($("#txtEmailID").val()).trim() == "") {
		$('#lblEmailID').html("You can't leave this empty.");
		$('#lblEmailID').css('display', 'block');
	} else if (!checkEmail($("#txtEmailID").val())) {
		$('#lblEmailID').html('Please enter valid Email ID.');
		$('#lblEmailID').css('display', 'block');
	}
});

$("#txtUserID").focus(function() {
	$('#lblUserID').css('display', 'none');
});

$("#txtUserID").blur(function() {
	if (($("#txtUserID").val()).trim() == "") {
		$('#lblUserID').html("You can't leave this empty.");
		$('#lblUserID').css('display', 'block');
	} else if (!isAlphaNumeric($("#txtUserID").val())) {
		$("#lblUserID").html("Special Characters are not allowed.");
		$('#lblUserID').css('display', 'block');
	}
});

function validateForgotPassword() {
	var bool = true;
	if (($("#txtEmailID").val()).trim() == "") {
		$('#lblEmailID').html("You can't leave this empty");
		$('#lblEmailID').css('display', 'block');
		bool = false;
	} else if (!checkEmail($("#txtEmailID").val())) {
		$('#lblEmailID').html('Please enter valid Email ID');
		$('#lblEmailID').css('display', 'block');
		bool = false;
	}
	if (($("#txtUserID").val()).trim() == "") {
		$('#lblUserID').html("You can't leave this empty");
		$('#lblUserID').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumeric($("#txtUserID").val())) {
		$("#lblUserID").html("Special Characters are not allowed");
		$('#lblUserID').css('display', 'block');
		bool = false;
	}
	return bool;
}

/********* html validations ***********/
$("#txtResetID").focus(function() {
	$('#lblResetID').css('display', 'none');
});

$("#txtResetID").blur(function() {
	if (($("#txtResetID").val()).trim() == "") {
		$('#lblResetID').html("You can't leave this empty");
		$('#lblResetID').css('display', 'block');
	}
});

$("#txtPassword").focus(function() {
	$('#lblPassword').css('display', 'none');
});

$("#txtPassword").blur(function() {
	if (($("#txtPassword").val()).trim() == "") {
		$('#lblPassword').html("You can't leave this empty");
		$('#lblPassword').css('display', 'block');
	}
});

$("#txtRePassword").focus(function() {
	if (($("#txtPassword").val()).trim() == "") {
		$('#lblPassword').html("You can't leave this empty");
		$('#lblPassword').css('display', 'block');
	}
	$('#lblRePassword').css('display', 'none');
});

$("#txtRePassword").blur(function() {
	if (($("#txtRePassword").val()).trim() == "") {
		$('#lblRePassword').html("You can't leave this empty");
		$('#lblRePassword').css('display', 'block');
	} else if (!passwordMatch($("#txtPassword").val(), $("#txtRePassword").val())) {
		$('#lblRePassword').html("These passwords don't match. Try again");
		$('#lblRePassword').css('display', 'block');
	}
});

function ResetPWDValidation() {
	var bool = true;
	if (($("#txtResetID").val()).trim() == "") {
		$('#lblResetID').html("You can't leave this empty");
		$('#lblResetID').css('display', 'block');
		bool = false;
	}
	if (($("#txtPassword").val()).trim() == "") {
		$('#lblPassword').html("You can't leave this empty");
		$('#lblPassword').css('display', 'block');
		bool = false;
	}
	if (($("#txtRePassword").val()).trim() == "") {
		$('#lblRePassword').html("You can't leave this empty");
		$('#lblRePassword').css('display', 'block');
		bool = false;
	} else if (!passwordMatch($("#txtPassword").val(), $("#txtRePassword").val())) {
		$('#lblRePassword').html("These passwords don't match. Try again");
		$('#lblRePassword').css('display', 'block');
		bool = false;
	}
	return bool;
}