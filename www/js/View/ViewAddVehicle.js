var AddVehicleControllerRef = null;
var editdata = null;
/************* ViewAddVehicle module Constructor******************/
function ViewAddVehicle(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	AddVehicleControllerRef = this.controllerRef;
	if (sessionStorage.UserID != null) {
		$("#hidUserID").val(sessionStorage.UserID);
	}
	this.getCompanyList();
	if (sessionStorage.editVehicleDetails != null) {
		editdata = (JSON.parse(sessionStorage.editVehicleDetails));
	}
}

/************* ViewAddVehicle module Prototype ******************/
ViewAddVehicle.prototype = {
	myControllerAddVehicleRef : null,
	init : function() {
		this.myControllerAddVehicleRef = this.controllerRef.myControllers.insControllerAddVehicle;
	},
	getCompanyList : function() {
		this.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl + "UserService/ShowUserList?CreatedByID=" + sessionStorage.UserID + "&RoleId=3", {}, "json", mySuccess, myError);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "W_VehicleList.html";
}

/************* Bind Events ****************/
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

$("#frmAddVehicle").submit(function(event) {
	event.preventDefault();
	if (W_VehicleValidations()) {
		var $form = $(this);
		var data = $form.serialize();
		AddVehicleControllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/AddUpdateVehicle", data, "json", AddVehicleSuccess, AddVehicleError);
	}
});

$("#btnBack").click(function() {
	window.location = "W_VehicleList.html";
});

function myError(xhr, data, status) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function mySuccess(data) {
	var element = "";
	if (data.length) {
		$.each(data, function(index, value) {
			element += "<option id=" + value.ID + ">" + value.Name + "</option>";
		});
		$('#ddlCompanyList').append(element);
	}
	if (editdata != null) {
		$("#ddlCompanyList").val(editdata.CreatedByName);
		$("#hidAddCompany").val($('#ddlCompanyList option:selected').attr("id"));
		$("#txtVehicleNumber").val(editdata.VehicleNumber);
		$("#txtVehicleID").val(editdata.VehicleId);
		$("#hiddenVehicleID").val(editdata.ID);
		$("#sp_AddEdit").html("Edit");
		$("#hiddenInsert").val("U");
	}
}

function AddVehicleSuccess(data) {
	if (data.success) {
		sessionStorage.removeItem("editVehicleDetails");
		window.location = "W_VehicleList.html";
	} else {
		navigator.notification.alert(data.msg, alertDismissed, "Alert", "Ok");
	}
}

function AddVehicleError(err) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}


// $("#txtVehicleNumber").focus(function() {
	// $('#lblVehicleNumber').css('display', 'none');
// });
// 
// $("#txtVehicleNumber").blur(function() {
	// if (($("#txtVehicleNumber").val()).trim() == "") {
		// $('#lblVehicleNumber').html("You can't leave this empty");
		// $('#lblVehicleNumber').css('display', 'block');
	// } else if (!isAlphaNumericSpace($("#txtVehicleNumber").val())) {
		// $("#lblVehicleNumber").html("Special characters are not allowed");
		// $('#lblVehicleNumber').css('display', 'block');
	// }
// });

$("#txtVehicleID").focus(function() {
	$('#lblVehicleID').css('display', 'none');
});

$("#txtVehicleID").blur(function() {
	if (($("#txtVehicleID").val()).trim() == "") {
		$('#lblVehicleID').html("You can't leave this empty");
		$('#lblVehicleID').css('display', 'block');
	} else if (!isAlphaNumeric($("#txtVehicleID").val())) {
		$("#lblVehicleID").html("Special characters are not allowed");
		$('#lblVehicleID').css('display', 'block');
	}
});

function W_VehicleValidations() {
	var bool = true;
	if ($("#hidAddCompany").val() == "-1") {
		$('#lblCompanyList').html("Please select any one company");
		$('#lblCompanyList').css('display', 'block');
		bool = false;
	}
	if (($("#txtVehicleID").val()).trim() == "") {
		$('#lblVehicleID').html("You can't leave this empty.");
		$('#lblVehicleID').css('display', 'block');
		bool = false;
	}
	// if (($("#txtVehicleNumber").val()).trim() == "") {
		// $('#lblVehicleNumber').html("You can't leave this empty.");
		// $('#lblVehicleNumber').css('display', 'block');
		// bool = false;
	// } else if (!isAlphaNumericSpace($("#txtVehicleNumber").val())) {
		// $("#lblVehicleNumber").html("Special characters are not allowed.");
		// $('#lblVehicleNumber').css('display', 'block');
		// bool = false;
	// }
	return bool;
}
