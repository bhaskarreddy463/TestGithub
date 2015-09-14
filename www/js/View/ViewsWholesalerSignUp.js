var Globalcontrollerref = null;
/************* ViewWholesalerSignUp module Constructor******************/
function ViewWholesalerSignUp(_Model, _Controller) { debugger;
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	this.init();
}

/************* ViewWholesalerSignUp module Prototype ******************/
ViewWholesalerSignUp.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		this.myControllerAddVehicleRef = this.controllerRef.myControllers.insControllerAddVehicle;
	}
};

/************** HTML Click events **************/
$("#AjaxSubmit").submit(function(event) {
	event.preventDefault();
	if (SignUpValidation()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/UserRegistration", data, "json", mySuccess, myError);
	}
});

$("#btnBack").click(function() {
	window.location = "W_Login.html";
});

function mySuccess(res) {
	if (res.success) {
		navigator.notification.alert("Successfully Signed Up", function() {
			window.location = "W_Login.html";
		}, "Alert", "Ok");
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

/***************** page validations *******************/
$("#txtWholesalerName").focus(function() {
	$('#lblWholesalerName').css('display', 'none');
});

$("#txtWholesalerName").blur(function() {
	if (($("#txtWholesalerName").val()).trim() == "") {
		$('#lblWholesalerName').html("You can't leave this empty");
		$('#lblWholesalerName').css('display', 'block');
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

$("#txtPhoneNo").focus(function() {
	$('#lblPhoneNo').css('display', 'none');
});

$("#txtPhoneNo").blur(function() {
	if (($("#txtPhoneNo").val()).trim() == "") {
		$('#lblPhoneNo').html("You can't leave this empty");
		$('#lblPhoneNo').css('display', 'block');
	} else if (!phonenumber($("#txtPhoneNo").val())) {
		$("#lblPhoneNo").html("Invalid Phone Number");
		$('#lblPhoneNo').css('display', 'block');
	}
});

$("#txtChoseWholesalerID").focus(function() {
	$('#lblChoseWholesalerID').css('display', 'none');
});

$("#txtChoseWholesalerID").blur(function() {
	if (($("#txtChoseWholesalerID").val()).trim() == "") {
		$('#lblChoseWholesalerID').html("You can't leave this empty");
		$('#lblChoseWholesalerID').css('display', 'block');
	} else if (!isAlphaNumeric($("#txtChoseWholesalerID").val())) {
		$("#lblChoseWholesalerID").html("Special Characters are not allowed");
		$('#lblChoseWholesalerID').css('display', 'block');
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

function SignUpValidation() {
	var bool = true;
	if (($("#txtWholesalerName").val()).trim() == "") {
		$('#lblWholesalerName').html("You can't leave this empty");
		$('#lblWholesalerName').css('display', 'block');
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
	if (($("#txtPhoneNo").val()).trim() == "") {
		$('#lblPhoneNo').html("You can't leave this empty");
		$('#lblPhoneNo').css('display', 'block');
		bool = false;
	} else if (!phonenumber($("#txtPhoneNo").val())) {
		$("#lblPhoneNo").html("Invalid Phone Number");
		$('#lblPhoneNo').css('display', 'block');
		bool = false;
	}
	if (($("#txtChoseWholesalerID").val()).trim() == "") {
		$('#lblChoseWholesalerID').html("You can't leave this empty");
		$('#lblChoseWholesalerID').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumeric($("#txtChoseWholesalerID").val())) {
		$("#lblChoseWholesalerID").html("Special characters are not allowed");
		$('#lblChoseWholesalerID').css('display', 'block');
		bool = false;
	}
	if (($("#txtPassword").val()).trim() == "") {
		$('#lblPassword').html("You can't leave this empty");
		$('#lblPassword').css('display', 'block');
		bool = false;
	}
	if (($("#txtRePassword").val()).trim() == "") {
		$('#lblRePassword').html("You can't leave this empty.");
		$('#lblRePassword').css('display', 'block');
		bool = false;
	} else if (!passwordMatch($("#txtPassword").val(), $("#txtRePassword").val())) {
		$('#lblRePassword').html("These passwords don't match. Try again");
		$('#lblRePassword').css('display', 'block');
		bool = false;
	}
	return bool;
}

