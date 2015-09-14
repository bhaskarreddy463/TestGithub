var Globalcontrollerref = null;
/************* ViewCompanySignUp module Constructor******************/
function ViewCompanySignUp(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	this.init();
}

/************* ViewCompanySignUp module Prototype ******************/
ViewCompanySignUp.prototype = {
	myControllerLoginAsRef : null,
	init : function() {
		this.myControllerAddVehicleRef = this.controllerRef.myControllers.insControllerAddVehicle;
	}
};

/*************** HTML Click events *****************/

$('#ddlCompanySignup').change(function() {
	if ($('#ddlCompanySignup option:selected').attr("id") == 2) {
		$("#formwithoutwholesaler").addClass("inputhide");
		$("#formwithwholesaler").removeClass("inputhide");
	} else {
		$("#formwithoutwholesaler").removeClass("inputhide");
		$("#formwithwholesaler").addClass("inputhide");
	}
});

$("#formwithoutwholesaler").submit(function(event) {
	event.preventDefault();
	if (formWithValidations()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/UserRegistration", data, "json", mySuccess, myError);
	}
});

$("#formwithwholesaler").submit(function(event) {
	event.preventDefault();
	if (formValidations()) {
		var $form = $(this);
		var data = $form.serialize();
		Globalcontrollerref.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/UserRegistration", data, "json", mySuccess, myError);
	}
});

$(".btnBack").click(function() {
	window.location = "C_Login.html";
});

function mySuccess(res) {
	if (res.success) {
		navigator.notification.alert("Signed Up Successfully!!!", function() {
			window.location = "C_Login.html";
		}, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function myError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/////////// page validations //////////
$("#txtwithCompanyName").focus(function() {
	$('#lblwithCompanyName').css('display', 'none');
});

$("#txtwithCompanyName").blur(function() {
	if (($("#txtwithCompanyName").val()).trim() == "") {
		$('#lblwithCompanyName').html("You can't leave this empty");
		$('#lblwithCompanyName').css('display', 'block');
	}
});

$("#txtwithContactPersonName").focus(function() {
	$('#lblwithContactPersonName').css('display', 'none');
});

$("#txtwithContactPersonName").blur(function() {
	if (($("#txtwithContactPersonName").val()).trim() == "") {
		$('#lblwithContactPersonName').html("You can't leave this empty");
		$('#lblwithContactPersonName').css('display', 'block');
	}
});

$("#txtwithEmailID").focus(function() {
	$('#lblwithEmailID').css('display', 'none');
});

$("#txtwithEmailID").blur(function() {
	if (($("#txtwithEmailID").val()).trim() == "") {
		$('#lblwithEmailID').html("You can't leave this empty");
		$('#lblwithEmailID').css('display', 'block');
	} else if (!checkEmail($("#txtwithEmailID").val())) {
		$('#lblwithEmailID').html('Please enter valid Email ID');
		$('#lblwithEmailID').css('display', 'block');
	}
});

$("#txtwithPhoneNo").focus(function() {
	$('#lblwithPhoneNo').css('display', 'none');
});

$("#txtwithPhoneNo").blur(function() {
	if (($("#txtwithPhoneNo").val()).trim() == "") {
		$('#lblwithPhoneNo').html("You can't leave this empty");
		$('#lblwithPhoneNo').css('display', 'block');
	} else if (!phonenumber($("#txtwithPhoneNo").val())) {
		$("#lblwithPhoneNo").html("Invalid Phone Number");
		$('#lblwithPhoneNo').css('display', 'block');
	}
});

$("#txtwithCompanyUserID").focus(function() {
	$('#lblwithCompanyUserID').css('display', 'none');
});

$("#txtwithCompanyUserID").blur(function() {
	if (($("#txtwithCompanyUserID").val()).trim() == "") {
		$('#lblwithCompanyUserID').html("You can't leave this empty");
		$('#lblwithCompanyUserID').css('display', 'block');
	} else if (!isAlphaNumeric($("#txtwithCompanyUserID").val())) {
		$("#lblwithCompanyUserID").html("Special characters are not allowed");
		$('#lblwithCompanyUserID').css('display', 'block');
	}
});

$("#txtwithPassword").focus(function() {
	$('#lblwithPassword').css('display', 'none');
});

$("#txtwithPassword").blur(function() {
	if (($("#txtwithPassword").val()).trim() == "") {
		$('#lblwithPassword').html("You can't leave this empty");
		$('#lblwithPassword').css('display', 'block');
	}
});

$("#txtwithRePassword").focus(function() {
	if (($("#txtwithPassword").val()).trim() == "") {
		$('#lblwithPassword').html("You can't leave this empty");
		$('#lblwithPassword').css('display', 'block');
	}
	$('#lblwithRePassword').css('display', 'none');
});

$("#txtwithRePassword").blur(function() {
	if (($("#txtwithRePassword").val()).trim() == "") {
		$('#lblwithRePassword').html("You can't leave this empty");
		$('#lblwithRePassword').css('display', 'block');
	} else if (!passwordMatch($("#txtwithPassword").val(), $("#txtwithRePassword").val())) {
		$('#lblwithRePassword').html("These passwords don't match. Try again");
		$('#lblwithRePassword').css('display', 'block');
	}
});

function formWithValidations() {
	var bool = true;
	if (($("#txtwithCompanyName").val()).trim() == "") {
		$('#lblwithCompanyName').html("You can't leave this empty");
		$('#lblwithCompanyName').css('display', 'block');
		bool = false;
	}
	if (($("#txtwithContactPersonName").val()).trim() == "") {
		$('#lblwithContactPersonName').html("You can't leave this empty");
		$('#lblwithContactPersonName').css('display', 'block');
		bool = false;
	}
	if (($("#txtwithPhoneNo").val()).trim() == "") {
		$('#lblwithPhoneNo').html("You can't leave this empty");
		$('#lblwithPhoneNo').css('display', 'block');
		bool = false;
	} else if (!phonenumber($("#txtwithPhoneNo").val())) {
		$("#lblwithPhoneNo").html("Invalid Phone Number");
		$('#lblwithPhoneNo').css('display', 'block');
		bool = false;
	}
	if (($("#txtwithCompanyUserID").val()).trim() == "") {
		$('#lblwithCompanyUserID').html("You can't leave this empty");
		$('#lblwithCompanyUserID').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumeric($("#txtwithCompanyUserID").val())) {
		$("#lblwithCompanyUserID").html("Special characters are not allowed");
		$('#lblwithCompanyUserID').css('display', 'block');
		bool = false;
	}
	if (($("#txtwithPassword").val()).trim() == "") {
		$('#lblwithPassword').html("You can't leave this empty");
		$('#lblwithPassword').css('display', 'block');
		bool = false;
	}
	if (($("#txtwithRePassword").val()).trim() == "") {
		$('#lblwithRePassword').html("You can't leave this empty");
		$('#lblwithRePassword').css('display', 'block');
		bool = false;
	} else if (!passwordMatch($("#txtwithPassword").val(), $("#txtwithRePassword").val())) {
		$('#lblwithRePassword').html("These passwords don't match. Try again");
		$('#lblwithRePassword').css('display', 'block');
		bool = false;
	}
	return bool;
}


$("#txtWholesalerUserID").focus(function() {
	$('#lblWholesalerUserID').css('display', 'none');
});

$("#txtWholesalerUserID").blur(function() {
	if (($("#txtWholesalerUserID").val()).trim() == "") {
		$('#lblWholesalerUserID').html("You can't leave this empty");
		$('#lblWholesalerUserID').css('display', 'block');
	} else if (!isAlphaNumeric($("#txtWholesalerUserID").val())) {
		$("#lblWholesalerUserID").html("Special characters are not allowed");
		$('#lblWholesalerUserID').css('display', 'block');
	}
});

$("#txtRegistrationID").focus(function() {
	$('#lblRegistrationID').css('display', 'none');
});

$("#txtRegistrationID").blur(function() {
	if (($("#txtRegistrationID").val()).trim() == "") {
		$('#lblRegistrationID').html("You can't leave this empty");
		$('#lblRegistrationID').css('display', 'block');
	}
});

$("#txtCompanyUserID").focus(function() {
	$('#lblCompanyUserID').css('display', 'none');
});

$("#txtCompanyUserID").blur(function() {
	if (($("#txtCompanyUserID").val()).trim() == "") {
		$('#lblCompanyUserID').html("You can't leave this empty");
		$('#lblCompanyUserID').css('display', 'block');
	} else if (!isAlphaNumeric($("#txtCompanyUserID").val())) {
		$("#lblCompanyUserID").html("Special characters are not allowed");
		$('#lblCompanyUserID').css('display', 'block');
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

function formValidations() {
	var bool = true;
	if (($("#txtWholesalerUserID").val()).trim() == "") {
		$('#lblWholesalerUserID').html("You can't leave this empty");
		$('#lblWholesalerUserID').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumeric($("#txtWholesalerUserID").val())) {
		$("#lblWholesalerUserID").html("Special characters are not allowed");
		$('#lblWholesalerUserID').css('display', 'block');
		bool = false;
	}
	if (($("#txtRegistrationID").val()).trim() == "") {
		$('#lblRegistrationID').html("You can't leave this empty");
		$('#lblRegistrationID').css('display', 'block');
		bool = false;
	}
	if (($("#txtCompanyUserID").val()).trim() == "") {
		$('#lblCompanyUserID').html("You can't leave this empty");
		$('#lblCompanyUserID').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumeric($("#txtCompanyUserID").val())) {
		$("#lblCompanyUserID").html("Special characters are not allowed");
		$('#lblCompanyUserID').css('display', 'block');
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
