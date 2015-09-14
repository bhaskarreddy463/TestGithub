var Globalcontrollerref = null;
var editdata = {};

/************* ViewAddIndividual module Constructor******************/
function ViewAddIndividual(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	if (sessionStorage != null) {
		$("#hiddenFk_WholesalerUserID").val(sessionStorage.UserID);
	}
	if (sessionStorage.editIndividual != null) {
		editdata = (JSON.parse(sessionStorage.editIndividual));
	}
	this.getCompanyList();
}

/************* ViewAddIndividual module Prototype ******************/
ViewAddIndividual.prototype = {
	myControllerLoginAsRef : null,
	getCompanyList : function() {
		this.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl + "UserService/ShowUserList?CreatedByID=" + sessionStorage.UserID + "&RoleId=3", {}, "json", getCompanysuccess, getCompanyerror);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "W_IndividualList.html";
}


$("#btnBack").click(function() {
	window.location = "W_IndividualList.html";
});

$('#ddlCompanyList').change(function() {
	$('#hidAddCompany').val($('#ddlCompanyList option:selected').attr("id"));
	if ($("#hidAddCompany").val() == "-1") {
		$('#lblCompanyList').html("Please select any one company.");
		$('#lblCompanyList').css('display', 'block');
		bool = false;
	} else {
		$('#lblCompanyList').css('display', 'none');
	}
});

$("#formAddCompany").submit(function(event) {
	event.preventDefault();
	if (W_IndividualValidations()) {
		var dataf = {
			"Flag" : $("#hidFlag").val(),
			"IsActive" : $("#IsActive").val(),
			"CreatedByID" : $("#hidAddCompany").val(),
			"ID" : $("#hidIndividualID").val(),
			"Name" : $("#txtFName").val().replace(/</g, "&lt;").replace(/>/g, "&gt;"),
			"Phone1" : $("#txtPhone").val(),
			"DriverID" : $("#txtUserID").val(),
			"EmailID" : $("#txtEmailID").val()
		};
		Globalcontrollerref.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "UserService/AddUpdateDriver", dataf, "json", AddVehicleSuccess, AddVehicleError);
	}
});

function getCompanyerror(xhr, data, status) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function getCompanysuccess(data) {
	var element = "";
	if (data.length > 0) {
		$.each(data, function(index, value) {
			element += "<option id=" + value.ID + ">" + value.Name + "</option>";
		});
		$('#ddlCompanyList').append(element);
	}
	if (editdata.Name != null) {
		$("#txtFName").val(replaceltgt(editdata.Name));
		$("#txtPhone").val(editdata.Phone1);
		$("#txtUserID").val(editdata.DriverID);
		$("#hidIndividualID").val(editdata.ID);
		$("#ddlCompanyList").val(editdata.CreatedByName);
		$("#hidAddCompany").val($('#ddlCompanyList option:selected').attr("id"));
		$("#sp_AddEdit").html("Edit");
		$("#txtEmailID").val(editdata.EmailID);
		$("#hidFlag").val("U");
	}
}

function AddVehicleSuccess(data) {
	if (data.success) {
		sessionStorage.removeItem("editVehicleDetails");
		window.location = "W_IndividualList.html";
	} else {
		navigator.notification.alert(data.msg, alertDismissed, "Alert", "Ok");
	}
}

function AddVehicleError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/************ html validations ************/
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

function W_IndividualValidations() {
	var bool = true;
	if ($("#hidAddCompany").val() == "-1") {
		$('#lblCompanyList').html("Please select any one company");
		$('#lblCompanyList').css('display', 'block');
		bool = false;
	}
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