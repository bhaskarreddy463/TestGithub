var Globalcontrollerref = null;
var WholesalerVehicleList = [];
var searchVehicleList = [];

/************* ViewWholesalerVehicleList module Constructor******************/
function ViewWholesalerVehicleList(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	this.getCompanyList();
	sessionStorage.removeItem("editVehicleDetails");
	$("#txtSearch").val();
}

/************* ViewWholesalerVehicleList module Prototype ******************/
ViewWholesalerVehicleList.prototype = {
	/**************** getCompanyList will get the company details **************/
	getCompanyList : function() { debugger;
		this.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl + "TripService/ShowVehicleList?CreatedByID=" + sessionStorage.UserID + "&DriverId=", {}, "json", CompanyListSuccess, CompanyListError);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	event.preventDefault();
	window.location = "W_MenuScreen.html";
}

function CompanyListSuccess(res) {
	var VehicleListData = "";
	if (res.success || res.length != undefined) {
		WholesalerVehicleList = res;
		searchVehicleList = res;
		$.each(res, function(index, data) {
			if (data.IsActive) {
				VehicleListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
				VehicleListData += "<div class='white-content-label clearfix'>" + data.VehicleNumber + "</div>";
				VehicleListData += "<div class='white-content clearfix'>" + data.CreatedByName + "</div>";
				VehicleListData += "<div class='white-content clearfix'>" + data.VehicleId + "</div>";
				VehicleListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
				VehicleListData += "</div>";
			}
		});
	}
	$("#divVehicleList").html(VehicleListData);
}

function CompanyListError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function editCompany(rowData) { 
	var editIndex = rowData.id;
	sessionStorage.editVehicleDetails = JSON.stringify(WholesalerVehicleList[editIndex]);
	window.location = "W_AddVehicle.html";
}

/************* html click events **************/
$("#AddVehicle").click(function() {
	window.location = "W_AddVehicle.html";
});

$("#txtSearch").keyup(function(e) {
	var serchKey = ($(this).val().trim()).toLowerCase();
	var filtered = searchVehicleList.filter(searchFn);
	function searchFn(value) {
		return (((value.VehicleNumber==null?"":value.VehicleNumber).toLowerCase().indexOf(serchKey) >= 0) || (value.CreatedByName.toLowerCase().indexOf(serchKey) >= 0) || (((value.VehicleId == null) && (value.VehicleId == null) ? "" : value.VehicleId).toLowerCase().indexOf(serchKey) >= 0));
	}

	var VehicleListData = "";
	WholesalerVehicleList = filtered;
	$.each(filtered, function(index, data) {
		if (data.IsActive) {
			VehicleListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
			VehicleListData += "<div class='white-content-label clearfix'>" + data.VehicleNumber + "</div>";
			VehicleListData += "<div class='white-content clearfix'>" + data.CreatedByName + "</div>";
			VehicleListData += "<div class='white-content clearfix'>" + data.VehicleId + "</div>";
			VehicleListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
			VehicleListData += "</div>";
		}
	});
	$("#divVehicleList").html(VehicleListData);
});

$("#txtSearch").blur(function() {
	var serchKey = ($(this).val().trim()).toLowerCase();
	var filtered = searchVehicleList.filter(searchFn);
	function searchFn(value) {
		return (((value.VehicleNumber==null?"":value.VehicleNumber).toLowerCase().indexOf(serchKey) >= 0) || (value.CreatedByName.toLowerCase().indexOf(serchKey) >= 0) || (((value.VehicleId == null) && (value.VehicleId == null) ? "" : value.VehicleId).toLowerCase().indexOf(serchKey) >= 0));
	}

	var VehicleListData = "";
	WholesalerVehicleList = filtered;
	$.each(filtered, function(index, data) {
		if (data.IsActive) {
			VehicleListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
			VehicleListData += "<div class='white-content-label clearfix'>" + data.VehicleNumber + "</div>";
			VehicleListData += "<div class='white-content clearfix'>" + data.CreatedByName + "</div>";
			VehicleListData += "<div class='white-content clearfix'>" + data.VehicleId + "</div>";
			VehicleListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
			VehicleListData += "</div>";
		}
	});
	$("#divVehicleList").html(VehicleListData);
});
/**************** html click events *****************/