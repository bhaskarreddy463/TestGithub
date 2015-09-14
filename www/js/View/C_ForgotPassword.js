var Globalcontrollerref = null;
/************* ViewWholesalerVehicleList module Constructor******************/
function ViewCompanyForgotPassword(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
}

/************* ViewWholesalerMenuScreen module Prototype ******************/
ViewCompanyForgotPassword.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		this.myControllerLoginAsRef = this.controllerRef.myControllers.insControllerLoginAs;
	}
};

/************** html click events **************/
$("#formForgotPWD").submit(function(event) {
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

$(".btnBack").click(function() {
	window.location = "C_Login.html";
});

function mySuccess(res) {
	if (res.success) {
		navigator.notification.alert("Temporary password has been sent to your registered email ID", alertDismissed, "Alert", "Ok");
		$("#formForgotPWD").css('display', 'none');
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
		window.location = "C_Login.html";
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

/////// html validations /////////////
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
		$("#lblUserID").html("Special characters are not allowed");
		$('#lblUserID').css('display', 'block');
		bool = false;
	}
	return bool;
}


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
		$('#lblRePassword').html("These passwords don't match. Try again?");
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