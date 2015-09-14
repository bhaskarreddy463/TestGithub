var Globalcontrollerref = null;

/************* ViewWholesalerAddCompany module Constructor******************/
function ViewWholesalerAddCompany(_Model, _Controller) { 
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	if (sessionStorage.editCompanyDetails != null) {
		this.bindElementsinEditmode(JSON.parse(sessionStorage.editCompanyDetails));
	}
	if (sessionStorage.UserID != null) {
		$("#hiddenFk_WholesalerUserID").val(sessionStorage.UserID);
	}
}

/************* ViewWholesalerAddCompany module Prototype ******************/
ViewWholesalerAddCompany.prototype = {
	bindElementsinEditmode : function(editCompanyDetials) {
		$("#txtCompanyName").val(editCompanyDetials.Name);
		$("#txtCompanyPhone_Number").val(editCompanyDetials.Phone1);
		$("#txtCompany_EmailID").val(editCompanyDetials.EmailID);
		$("#txtContact_Person").val(editCompanyDetials.Contact_Person);
		$("#hiddenCompanyID").val(editCompanyDetials.ID);
		$("#chkIsAllow").prop("checked", editCompanyDetials.IsSignUpAllowed);
		$("#hidIsSignUpAllowed").val(editCompanyDetials.IsSignUpAllowed);
		$("#sp_AddEdit").html("Edit");
		$("#hiddenInsert").val("U");
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "W_CompanyList.html";
}

function AddCompanySuccess(res) {
	if (res.success) {
		sessionStorage.removeItem("editCompanyDetails");
		window.location = "W_CompanyList.html";
	} else {
		navigator.notification.alert(res.msg, alertDismissed, "Alert", "Ok");
	}
}

function AddCompanyError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/************** page validations **************/

$("#chkIsAllow").click(function() { 
	if ($("#chkIsAllow").prop('checked') == true) {
		$("#hidIsSignUpAllowed").val("true");
	} else {
		$("#hidIsSignUpAllowed").val("false");
	}
});

$("#btnBack").click(function() {
	window.location = "W_CompanyList.html";
});

$("#formAddCompany").submit(function(event) { 
	event.preventDefault();
	if (companyValidations()) {
		var $form = $(this);
		var data = $form.serialize().replace(/</g, "&lt;").replace(/>/g, "&gt;");
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "LoginService/UserRegistration", data, "json", AddCompanySuccess, AddCompanyError);
	}
});

$("#txtCompany_EmailID").focus(function() {
	$('#lblCompany_EmailID').css('display', 'none');
});

$("#txtCompany_EmailID").blur(function() {
	if (($("#txtCompany_EmailID").val()).trim() == "") {
		$('#lblCompany_EmailID').html("You can't leave this empty");
		$('#lblCompany_EmailID').css('display', 'block');
	} else if (!checkEmail($("#txtCompany_EmailID").val())) {
		$('#lblCompany_EmailID').html('Please enter valid Email ID');
		$('#lblCompany_EmailID').css('display', 'block');
	}
});

$("#txtCompanyPhone_Number").focus(function() {
	$('#lblCompanyPhone_Number').css('display', 'none');
});

$("#txtCompanyPhone_Number").blur(function() { 
	if (($("#txtCompanyPhone_Number").val()).trim() == "") {
		$('#lblCompanyPhone_Number').html("You can't leave this empty");
		$('#lblCompanyPhone_Number').css('display', 'block');
	} else if (!phonenumber($("#txtCompanyPhone_Number").val())) {
		$("#lblCompanyPhone_Number").html("Invalid Phone Number");
		$('#lblCompanyPhone_Number').css('display', 'block');
	}
});

$("#txtCompanyName").focus(function() {
	$('#lblCompanyName').css('display', 'none');
});

$("#txtCompanyName").blur(function() {
	if (($("#txtCompanyName").val()).trim() == "") {
		$('#lblCompanyName').html("You can't leave this empty");
		$('#lblCompanyName').css('display', 'block');
	}
});

$("#txtContact_Person").focus(function() {
	$('#lblContact_Person').css('display', 'none');
});

$("#txtContact_Person").blur(function() {
	if (($("#txtContact_Person").val()).trim() == "") {
		$('#lblContact_Person').html("You can't leave this empty");
		$('#lblContact_Person').css('display', 'block');
	}
});

function companyValidations() {
	var bool = true;
	var Company_EmailID = $("#txtCompany_EmailID").val().trim();
	if (($("#txtContact_Person").val()).trim() == "") {
		$('#lblContact_Person').html("You can't leave this empty");
		$('#lblContact_Person').css('display', 'block');
		bool = false;
	}
	if (($("#txtCompanyName").val()).trim() == "") {
		$('#lblCompanyName').html("You can't leave this empty");
		$('#lblCompanyName').css('display', 'block');
		bool = false;
	}
	if (($("#txtCompanyPhone_Number").val()).trim() == "") {
		$('#lblCompanyPhone_Number').html("You can't leave this empty");
		$('#lblCompanyPhone_Number').css('display', 'block');
		bool = false;
	} else if (!phonenumber($("#txtCompanyPhone_Number").val())) {
		$("#lblCompanyPhone_Number").html("Invalid Phone Number");
		$('#lblCompanyPhone_Number').css('display', 'block');
		bool = false;
	}
	if (($("#txtCompany_EmailID").val()).trim() == "") {
		$('#lblCompany_EmailID').html("You can't leave this empty");
		$('#lblCompany_EmailID').css('display', 'block');
		bool = false;
	} else if (!checkEmail($("#txtCompany_EmailID").val())) {
		$('#lblCompany_EmailID').html('Please enter valid Email ID');
		$('#lblCompany_EmailID').css('display', 'block');
		bool = false;
	}
	return bool;
}