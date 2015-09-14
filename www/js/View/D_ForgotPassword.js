var Globalcontrollerref = null;

function ViewDriverForgotPassword(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
}

ViewDriverForgotPassword.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		this.myControllerLoginAsRef = this.controllerRef.myControllers.insControllerLoginAs;
	}
};

/*********** HTML Click events ****************/
function ResetPWDValidation() {
	var bool = true;
	var password = $("#txtPassword").val();
	;
	var RePassword = $("#txtRePassword").val();
	if (password !== RePassword) {
		navigator.notification.alert("Passwords don't match", alertDismissed, "Alert", "Ok");
		bool = false;
	}
	return bool;
}


$("#ForgotPWDform").submit(function(event) {
	event.preventDefault();
	if (validateForgotPassword()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/DriverForgetPassword", data, "json", mySuccess, myError);
	}
});

$("#formResetPassword").submit(function(event) {
	event.preventDefault();
	if (ResetPWDValidation()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/DriverCreatePassword", data, "json", ResetPwdSuccess, ResetPwdError);
	}
});

$("#btnBack").click(function() {
	window.location = "D_Login.html";
});

$("#btnforgotBack").click(function() {
	window.location = "D_Login.html";
});

function mySuccess(res) {
	if (res.success) {
		navigator.notification.alert("Reset ID sent to your Mail ID", alertDismissed, "Alert", "Ok");
		$("#ForgotPWDform").css('display', 'none');
		var userid = $("#txtUserID").val();
		$("#formResetPassword").css('display', 'block');
		$("#txtsavedUserID").val(userid);
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
		window.location = "D_Login.html";
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

/*********** html validations ***********/
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
	} else if (($("#txtResetID").val()).trim().length != 6) {
		$('#lblResetID').html("The length of Security key must be 6");
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
	} else if (($("#txtResetID").val()).trim().length != 6) {
		$('#lblResetID').html("The length of Security key must be 6");
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