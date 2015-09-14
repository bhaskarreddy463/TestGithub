var Globalcontrollerref = null;
var CompanyVehicleList = [];
var searchC_VehiclList = [];

/************* ViewCompanyVehicleList module Constructor******************/
function ViewCompanyVehicleList(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	this.getCompanyList();
	sessionStorage.removeItem("editVehicleDetails");
	$("#txtSearch").val();
}

/************* ViewCompanyVehicleList module Prototype ******************/
ViewCompanyVehicleList.prototype = {
	myControllerAddVehicleRef : null,
	getCompanyList : function() {
		this.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl + "TripService/ShowVehicleList?CreatedByID=" + JSON.parse(sessionStorage.CompanyUserDetails).CompanyID + "&DriverId=", {}, "json", VehicleListSuccess, VehicleListError);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "C_MenuScreen.html";
}

/************* html click events **************/
$("#txtSearch").keyup(function(e) {
	var serchKey = ($(this).val().trim()).toLowerCase();
	var filtered = searchC_VehiclList.filter(searchFn);
	function searchFn(value) {
		return (((value.VehicleNumber==null?"":value.VehicleNumber).toLowerCase().indexOf(serchKey) >= 0) || (((value.VehicleId == null) ? "" : value.VehicleId).toLowerCase().indexOf(serchKey) >= 0));
	}

	var VehicleListData = "";
	CompanyVehicleList = filtered;
	$.each(filtered, function(index, data) {
		if (data.IsActive) {
			VehicleListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
			VehicleListData += "<div class='white-content-label clearfix margin-bottom-10'>" + data.VehicleNumber + "</div>";
			VehicleListData += "<div class='white-content-label clearfix margin-bottom-10'>" + data.VehicleId + "</div>";
			VehicleListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
			VehicleListData += "</div>";
		}
	});
	$("#divVehicleList").html(VehicleListData);
});

$("#txtSearch").blur(function() {
	var serchKey = ($(this).val().trim()).toLowerCase();
	var filtered = searchC_VehiclList.filter(searchFn);
	function searchFn(value) {
		return (((value.VehicleNumber==null?"":value.VehicleNumber).toLowerCase().indexOf(serchKey) >= 0) || (((value.VehicleId == null) && (value.VehicleId == null) ? "" : value.VehicleId).toLowerCase().indexOf(serchKey) >= 0));
	}

	var VehicleListData = "";
	CompanyVehicleList = filtered;
	$.each(filtered, function(index, data) {
		if (data.IsActive) {
			VehicleListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
			VehicleListData += "<div class='white-content-label clearfix margin-bottom-10'>" + data.VehicleNumber + "</div>";
			VehicleListData += "<div class='white-content-label clearfix margin-bottom-10'>" + data.VehicleId + "</div>";
			VehicleListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
			VehicleListData += "</div>";
		}
	});
	$("#divVehicleList").html(VehicleListData);
});

$("#AddVehicle").click(function() {
	window.location = "C_AddVehicle.html";
});

function VehicleListSuccess(res) {
	if (res.success || res.length != undefined) {
		var VehicleListData = "";
		CompanyVehicleList = res;
		searchC_VehiclList = res;
		$.each(res, function(index, data) {
			if (data.IsActive) {
				VehicleListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
				//VehicleListData+="<div class='white-content-label clearfix'>"+data.CompanyName+"</div>";
				VehicleListData += "<div class='white-content-label clearfix margin-bottom-10'>" + data.VehicleNumber + "</div>";
				VehicleListData += "<div class='white-content-label clearfix margin-bottom-10'>" + data.VehicleId + "</div>";
				VehicleListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
				VehicleListData += "</div>";
			}
		});
		$("#divVehicleList").html(VehicleListData);
	}
}

function VehicleListError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function editCompany(rowData) {
	var editIndex = rowData.id;
	sessionStorage.editVehicleDetails = JSON.stringify(CompanyVehicleList[editIndex]);
	window.location = "C_AddVehicle.html";
}
