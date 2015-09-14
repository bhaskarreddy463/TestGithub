var Globalcontrollerref = null;
var CompanyDetailsList = [];
var searchDataCompanyList = [];

/************* ViewWholesalerCompanyList module Constructor******************/
function ViewWholesalerCompanyList(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	sessionStorage.removeItem("editCompanyDetails");
	this.getCompanyList();
	$("#txtSearch").val();
}

/************* ViewWholesalerCompanyList module Prototype ******************/
ViewWholesalerCompanyList.prototype = {
	getCompanyList : function() {
		this.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl + "UserService/ShowUserList?CreatedByID=" + sessionStorage.UserID + "&RoleId=3", {}, "json", CompanyListSuccess, CompanyListError);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "W_MenuScreen.html";
}


$("#AddComapny").click(function() {
	sessionStorage.removeItem("editCompanyDetailsFlag");
	window.location = "W_AddCompany.html";
});

$("#txtSearch").keyup(function(e) {
	var serchKey = ($(this).val().trim()).toLowerCase();
	var filtered = searchDataCompanyList.filter(searchFn);
	function searchFn(value) {
		return ((value.Name.toLowerCase().indexOf(serchKey) >= 0) || (value.Phone1.toLowerCase().indexOf(serchKey) >= 0) || (value.EmailID.toLowerCase().indexOf(serchKey) >= 0) || (value.Contact_Person.toLowerCase().indexOf(serchKey) >= 0));
	}

	var CompanyListData = "";
	CompanyDetailsList = filtered;
	$.each(filtered, function(index, data) {
		CompanyListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
		CompanyListData += "<div class='white-content-label clearfix'>" + data.Name + "</div>";
		CompanyListData += "<div class='white-content clearfix'>" + data.Phone1 + "</div>";
		CompanyListData += "<div class='white-content clearfix'>" + data.EmailID + "</div>";
		CompanyListData += "<div class='white-content clearfix'>" + data.Contact_Person + "</div>";
		CompanyListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
		CompanyListData += "</div>";
	});
	$("#divCompanyList").html(CompanyListData);
});

$("#txtSearch").blur(function() {
	var serchKey = ($(this).val().trim()).toLowerCase();
	var filtered = searchDataCompanyList.filter(searchFn);
	function searchFn(value) {
		return ((value.Name.toLowerCase().indexOf(serchKey) >= 0) || (value.Phone1.toLowerCase().indexOf(serchKey) >= 0) || (value.EmailID.toLowerCase().indexOf(serchKey) >= 0) || (value.Contact_Person.toLowerCase().indexOf(serchKey) >= 0));
	}

	var CompanyListData = "";
	CompanyDetailsList = filtered;
	$.each(filtered, function(index, data) {
		CompanyListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
		CompanyListData += "<div class='white-content-label clearfix'>" + data.Name + "</div>";
		CompanyListData += "<div class='white-content clearfix'>" + data.Phone1 + "</div>";
		CompanyListData += "<div class='white-content clearfix'>" + data.EmailID + "</div>";
		CompanyListData += "<div class='white-content clearfix'>" + data.Contact_Person + "</div>";
		CompanyListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
		CompanyListData += "</div>";
	});
	$("#divCompanyList").html(CompanyListData);
});

function CompanyListSuccess(res) {
	var CompanyListData = "";
	if (res.success || res.length != undefined) {
		CompanyDetailsList = res;
		searchDataCompanyList = res;
		$.each(res, function(index, data) {
			CompanyListData += "<div id='" + index + "' class='clearfix vehicle-container'>";
			CompanyListData += "<div class='white-content-label clearfix'>" + data.Name + "</div>";
			CompanyListData += "<div class='white-content clearfix'>" + data.Phone1 + "</div>";
			CompanyListData += "<div class='white-content clearfix'>" + data.EmailID + "</div>";
			CompanyListData += "<div class='white-content clearfix'>" + data.Contact_Person + "</div>";
			CompanyListData += "<div class='text-center'><input id='" + index + "' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
			CompanyListData += "</div>";
		});
	}
	$("#divCompanyList").html(CompanyListData);
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
	sessionStorage.editCompanyDetails = JSON.stringify(CompanyDetailsList[editIndex]);
	window.location = "W_AddCompany.html";
}
