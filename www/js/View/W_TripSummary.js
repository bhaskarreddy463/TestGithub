var AddVehicleControllerRef = null;
var editdata = null;
var G_CompanyVehicleList = {};

/************* ViewWholeTripSalerSummary module Constructor******************/
function ViewWholeTripSalerSummary(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	AddVehicleControllerRef = this.controllerRef;
	$("#hidWholeSalerID").val(sessionStorage.UserID);
	$("#hidWholeSalerID1").val(sessionStorage.UserID);
	this.getVehicleList();
}

/************* ViewWholeTripSalerSummary module Prototype ******************/
ViewWholeTripSalerSummary.prototype = {
	/************* getVehicleList method will get the company list and respected vehicle list and bind the data ******************/
	getVehicleList : function() {
		this.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/showTruckingCompanyList", {
			"CreatedById" : sessionStorage.UserID,
			"RoleId" : 3
		}, "json", ComVehicleListSuccess, ComVehicleListError);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event) {
	window.location = "W_MenuScreen.html";
}

/************ Html Click Events ***********/
$('#ddlCompanyList').change(function() {
	$('#hidCompUserID').val($('#ddlCompanyList option:selected').attr("id"));
	$('#ddlVehicleList').empty();
	$('#hidVehicleId').val("-2");
	var element = "<option id='-2'>--Select Vehicle Number--</option>";
	if ($("#hidCompUserID").val() == "-1") {
		$('#lblCompanyList').html("Please select any one company.");
		$('#lblCompanyList').css('display', 'block');
	} else {
		$('#lblCompanyList').css('display', 'none');
		var filtered = G_CompanyVehicleList.VehicleList.filter(searchFn);
		function searchFn(value) {
			return ((value.CreatedByID == $("#hidCompUserID").val()));
		}

		if (filtered[0].Vhicledetail.length >= 1) {
			element += "<option id='0'>ALL</option>";
			$.each(filtered[0].Vhicledetail, function(index, value) {
				element += "<option id=" + value.ID + ">" + value.VehicleId + "</option>";
			});
		} else {
			element += "<option id='NO'>No Vehicles</option>";
		}
	}
	$('#ddlVehicleList').append(element);
});

$('#ddlVehicleList').change(function() {
	$('#hidVehicleId').val($('#ddlVehicleList option:selected').attr("id"));
	if ($("#hidVehicleId").val() == "-2") {
		$('#lblVehicleList').html("Please select any one Vehicle.");
		$('#lblVehicleList').css('display', 'block');
	} else {
		$('#lblVehicleList').css('display', 'none');
	}
	if ($("#hidVehicleId").val() == "0") {
		$("#divReport").css('display', 'none');
		$("#divSend").css('display', 'block');
		$("#hidisSendMail").val(true);
	} else {
		$("#divReport").css('display', 'block');
		$("#divSend").css('display', 'none');
		$("#hidisSendMail").val(false);
	}
});

$("#formTripSummary").submit(function(event) { debugger;
	event.preventDefault();
	if (W_TripSummaryValidations()) {
		var $form = $(this);
		var data = $form.serialize();
		AddVehicleControllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/GetTripSummary", data, "json", TripSummarySuccess, TripSummaryError);
	}
});

$("#btnTripSendMail , #btnTripSummarySend").click(function() { debugger;
	if (W_TripSummaryValidations()) {
		var data = {
			"UserId" : $("#hidWholeSalerID").val(),
			"WholeselerID" : $("#hidWholeSalerID1").val(),
			"CreatedById":0,
			"isSendMail" : true,
			"CompanyId" : $("#hidCompUserID").val(),
			"VehicleId" : $("#hidVehicleId").val(),
			"StartDate" : $("#txtFromDate").val(),
			"EndDate" : $("#txtToDate").val()
		};
		AddVehicleControllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/GetTripSummary", data, "json", sendTripSummarySuccess, sendTripSummaryError);
	}
});

$("#btnBack").click(function() {
	window.location = "W_MenuScreen.html";
});

$("#btnTripBack").click(function() {
	$("#formTripSummary").css("display", "block");
	$("#formShowTripDetails").css("display", "none");
});

$("#tabTripSummary").click(function() {
	$("#tabTripSummary").addClass("active");
	$("#tabFuelSummary").removeClass("active");
	$("#TripSummaryDetails").css("display", "block");
	$("#FuelSummaryDetails").css("display", "none");
});

$("#tabFuelSummary").click(function() {
	$("#tabTripSummary").removeClass("active");
	$("#tabFuelSummary").addClass("active");
	$("#FuelSummaryDetails").css("display", "block");
	$("#TripSummaryDetails").css("display", "none");
});

function sendTripSummarySuccess(res) {
	if (res.success) {
		navigator.notification.alert("Report has been sent to your registered mail id", alertDismissed, "Alert", "Ok");
	}
}

function sendTripSummaryError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function ComVehicleListSuccess(res) {
	var element = "";
	if (res.TruckingCompanyList.length >= 1) {
		G_CompanyVehicleList = res;
		$.each(res.TruckingCompanyList, function(index, value) {
			element += "<option id=" + value.ID + ">" + value.Name + "</option>";
		});
		$('#ddlCompanyList').append(element);
	}
}

function ComVehicleListError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

function TripSummarySuccess(res) {
	$("#divVehTripDetails").html("No Data");
	$("#divVehFuelDetails").html("No Data");
	if (res.length >= 1) {
		$("#formTripSummary").css("display", "none");
		$("#formShowTripDetails").css("display", "block");
		var htmlBuyFuelList = "";
		$.each(res, function(index, data) {
			if (data.Mode != 3) {
				htmlBuyFuelList += "<div class='trip_detail_container'>";
				htmlBuyFuelList += "<div class='btm trip_detail_thead brder_top' style='width:50%;'><span>" + data.State + "</span></div>";
				htmlBuyFuelList += "<div class='btm trip_detail_thead brder_top' style='width:50%;'><span>" + data.TotalDistance + "</span></div>";
				htmlBuyFuelList += "</div>";
			}
		});
		$("#divVehTripDetails").html(htmlBuyFuelList);

		var htmlBuyFuelList1 = "";
		$.each(res, function(index, data) {
			if (data.Mode == 3) {
				htmlBuyFuelList1 += "<div class='trip_detail_container'>";
				htmlBuyFuelList1 += "<div class='btm trip_detail_thead brder_top'><span>" + data.State + "-" + data.FuelLocation + "</span></div>";
				htmlBuyFuelList1 += "<div class='btm trip_detail_thead brder_top'><span>" + data.NoOFGallons + "</span></div>";
				htmlBuyFuelList1 += "<div class='btm trip_detail_thead brder_top'><span>" + "$" + data.AmountInDollar + "</span></div>";
				htmlBuyFuelList1 += "</div>";
			}
		});
		$("#divVehFuelDetails").html(htmlBuyFuelList1);
	} else {
		navigator.notification.alert("No Data", alertDismissed, "Alert", "Ok");
	}
}

function TripSummaryError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/************ page validations ***************/
$("#txtToDate").focus(function() {
	$('#lblToDate').css('display', 'none');
});

$("#txtFromDate").focus(function() {
	$('#lblFromDate').css('display', 'none');
});

function W_TripSummaryValidations() {
	var bool = true;
	if ($("#hidCompUserID").val() == "-1") {
		$('#lblCompanyList').html("Please select any one company.");
		$('#lblCompanyList').css('display', 'block');
		bool = false;
	}
	if ($("#hidVehicleId").val() == "-2") {
		$('#lblVehicleList').html("Please select any one Vehicle.");
		$('#lblVehicleList').css('display', 'block');
		bool = false;
	}
	if (($("#txtFromDate").val()).trim() == "") {
		$('#lblFromDate').html("You can't leave this empty.");
		$('#lblFromDate').css('display', 'block');
		bool = false;
	}
	if (($("#txtToDate").val()).trim() == "") {
		$('#lblToDate').html("You can't leave this empty.");
		$('#lblToDate').css('display', 'block');
		bool = false;
	}
	return bool;
}
