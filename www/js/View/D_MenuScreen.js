var db1 = null;
var globModelRef;
var Globalcontrollerref;
////buy fuel  starting
var pictureSource;
// picture source
var destinationType;
// sets the format of returned value
///// buy fuel ending
/////////Trip Details Starting
var useToEndTripDiv = "no";
///////////Trip Details Ending
var objErrorDetail = {}; 
/************* ViewDriverMenuScreen module Constructor******************/
function ViewDriverMenuScreen(_Model, _Controller) {
	this.modelRef = _Model;
	globModelRef = this.modelRef;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	db1 = window.openDatabase("dbiftrak", "1.0", "PhoneGap TFTRAK", 1000000);
		$("#loader").css("display", "none");
	if (JSON.parse(localStorage.DriverUserDetails).isLogin) {
		$("#DriverUserID").html(JSON.parse(localStorage.DriverUserDetails).userid);
	} else {
		window.location = "D_Login.html";
	}
	this.InitializeDatabaseTables();
}

document.addEventListener("deviceready", onDeviceRed);

/************* ViewDriverMenuScreen module Prototype ******************/
ViewDriverMenuScreen.prototype = {
	InitializeDatabaseTables : function() {
		try {
			var arrQueryStr = generateQueryList();
			db1.transaction(function(tx) {
				this.modelRef.myModels.insDriverDatabaseModel.createTable(tx, arrQueryStr[0]);
			}, errorDatabaseCreate, successDatabaseCreate);
		} catch(e) {
			alert("ex:" + e.message);
		}
	}
};

$('#btnErrorLog').click(function() {
	$("#sideMenubtn").removeClass("dl-active");
	$("#ulsideMenu").removeClass("dl-menuopen");
	sendLog();
});

$("#divCreateTrip").click(function() {
	if (localStorage.tripDetails != undefined) {
		if (JSON.parse(localStorage.tripDetails).oDriverID != null && JSON.parse(localStorage.tripDetails).oDriverID != undefined) {
			navigator.notification.alert("A Trip is already running with Username :" + JSON.parse(localStorage.tripDetails).oDriverID, alertDismissed, "Alert", "Ok");
			return;
		} else {
			$("#divformCreateTrip").css('display', 'block');
			$("#divformMenuScreen").css('display', 'none');
			startCreateTripPage();
		}
	} else {
		$("#divformCreateTrip").css('display', 'block');
		$("#divformMenuScreen").css('display', 'none');
		startCreateTripPage();
	}
});

function successDatabaseCreate(data) {
}

function errorDatabaseCreate(data) {
}

function generateQueryList() {
	var queryList = ['CREATE TABLE IF NOT EXISTS QuickTrip (ID INTEGER PRIMARY KEY AUTOINCREMENT, DriverID TEXT NOT NULL, TruckID TEXT NOT NULL, OdometerReading TEXT NOT NULL, StartingAddress TEXT NOT NULL,	EndingAddress	TEXT,	BuyFuel	TEXT,	Mode	INTEGER NOT NULL,	NoOfGallons	REAL,	TotalPrice	REAL,	ReceiptImage	BLOB,	DateModified	NUMERIC NOT NULL,	DistanceTraveled	REAL,	SLatitude	REAL,	SLongitude	REAL)'];
	return queryList;
}

function onBackKeyDown(event) {
	event.preventDefault();
}

/************* HTML Click events **********/
$("#liD_Home").click(function() {
	IsLogout="";
	$("#divformMenuScreen").css('display', 'block');
	$("#divformQuickTrip").css('display', 'none');
	$("#divformTripDetails").css('display', 'none');
	$("#divEditFuelSummary").css('display', 'none');
	$("#divformBuyFuelDetails").css('display', 'none');
	$("#divEditTripSummary").css('display', 'none');
	$("#divformCreateTrip").css('display', 'none');
	$("#sideMenubtn").removeClass("dl-active");
	$("#ulsideMenu").removeClass("dl-menuopen");
});

$("#divQuickTrip").click(function() {
	if (localStorage.tripDetails != undefined) {
		if (JSON.parse(localStorage.tripDetails).oDriverID != null && JSON.parse(localStorage.tripDetails).oDriverID != undefined) {
			navigator.notification.alert("A Trip is already running with Username :" + JSON.parse(localStorage.tripDetails).oDriverID, alertDismissed, "Alert", "Ok");
			return;
		} else {
			$("#divformQuickTrip").css('display', 'block');
			$("#divformMenuScreen").css('display', 'none');
			startQuickTripPage();
		}
	} else {
		$("#divformQuickTrip").css('display', 'block');
		$("#divformMenuScreen").css('display', 'none');
		startQuickTripPage();
	}
});

$("#divTripSummary").click(function() {
	if (localStorage.tripDetails != undefined) {
		if (JSON.parse(localStorage.tripDetails).oDriverID != null && JSON.parse(localStorage.tripDetails).oDriverID != undefined) {
			$("#divformTripDetails").css('display', 'block');
			$("#divformMenuScreen").css('display', 'none');
			showTripDetails();
			return;
		} else {
			navigator.notification.alert("A Trip must be created", alertDismissed, "Alert", "Ok");
		}
	} else {
		navigator.notification.alert("A Trip must be created", alertDismissed, "Alert", "Ok");
	}
});

$("#divBuyFuel").click(function() {
	if (localStorage.tripDetails != undefined) {
		if (JSON.parse(localStorage.tripDetails).oDriverID != null && JSON.parse(localStorage.tripDetails).oDriverID != undefined) {
			$("#divformBuyFuelDetails").css('display', 'block');
			$("#divformMenuScreen").css('display', 'none');
			getGasStationList();
			return;
		} else {
			navigator.notification.alert("A Trip must be created", alertDismissed, "Alert", "Ok");
		}
	} else {
		navigator.notification.alert("A Trip must be created", alertDismissed, "Alert", "Ok");
	}
});

/********************* Quick Trip Starting *****************/
$("#btnQuickBack").click(function() {
	$("#divformMenuScreen").css('display', 'block');
	$("#divformQuickTrip").css('display', 'none');
});

/*********** HTML Click events *********/

$("#formQuickTrip").submit(function(event) {
	event.preventDefault();
	if (QuickTripValidations()) {
		$("#loader").css("display", "block");
		navigator.geolocation.getCurrentPosition(onSuccessQuickTrip, onError, {timeout: 5000 });
	}
});

function onSuccessQuickTrip(position) {
	localStorage["tripDetails"] = '{}';
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
	oTripdetails.oDriverID = JSON.parse(localStorage.DriverUserDetails).userid;
	oTripdetails.oTruckID = $("#hidQ_truckID").val();
	oTripdetails.oTripId = "";
	oTripdetails.oSequenceId = 1;
	oTripdetails.oOdometerReading = $("#txtQ_Odometer").val();
	oTripdetails.oStartingAddress = "";
	oTripdetails.oEndingAddress = "";
	oTripdetails.oBuyFuel = "";
	oTripdetails.oReceiptImage = null;
	oTripdetails.oMode = 1;
	oTripdetails.oFuelStation = null;
	oTripdetails.oNoOfGallons = null;
	oTripdetails.oTotalPrice = null;
	oTripdetails.oDateModified = new Date();
	localStorage["tripDetails"] = JSON.stringify(oTripdetails);
	insertTripDetailsinQuickTrip(JSON.parse(localStorage["tripDetails"]));
}

function startQuickTripPage() {
	$("#txtQ_truckID").val("");
	$("#txtQ_Odometer").val("");
	$('#lblQ_truckID').css('display', 'none');
	$('#lblQ_Odometer').css('display', 'none');
	Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl + "TripService/ShowVehicleList?CreatedById=0&DriverId=" + JSON.parse(localStorage.DriverUserDetails).userid, {}, "json", Q_TruckListSuccess, Q_TruckListError);
}

/************ html validations ***********/
$("#txtQ_Odometer").focus(function() {
	$('#lblQ_Odometer').css('display', 'none');
});

$("#txtQ_Odometer").blur(function() {
	var obja = $("#txtQ_Odometer").val().trim().split(".");
	if (($("#txtQ_Odometer").val()).trim() == "") {
		$('#lblQ_Odometer').html("You can't leave this empty");
		$('#lblQ_Odometer').css('display', 'block');
	} else if (!isNumeric($("#txtQ_Odometer").val())) {
		$("#lblQ_Odometer").html("Please enter numbers only");
		$('#lblQ_Odometer').css('display', 'block');
	}
});

function QuickTripValidations() {
	var bool = true;
	if ($("#hidQ_truckID").val() == "-2") {
		$('#lblQ_VehicleList').html("Please select any one Vehicle.");
		$('#lblQ_VehicleList').css('display', 'block');
		bool = false;
	}
	if (($("#txtQ_Odometer").val()).trim() == "") {
		$('#lblQ_Odometer').html("You can't leave this empty");
		$('#lblQ_Odometer').css('display', 'block');
		bool = false;
	} else if (!isNumeric($("#txtQ_Odometer").val())) {
		$("#lblQ_Odometer").html("Please enter numbers only");
		$('#lblQ_Odometer').css('display', 'block');
		bool = false;
	}
	return bool;
}

function Q_TruckListSuccess(res) {
	$('#ddlQ_VehicleList').empty();
	var element = "<option id='-2'>--Select Vehicle Number--</option>";
	if (res.length > 0) {
		$.each(res, function(index, value) {
			element += "<option id=" + value.ID + ">" + value.VehicleId + "</option>";
		});
	}
	$('#ddlQ_VehicleList').append(element);
}

function Q_TruckListError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}


$('#ddlQ_VehicleList').change(function() {
	$('#hidQ_truckID').val($('#ddlQ_VehicleList option:selected').attr("id"));
	if ($("#hidQ_truckID").val() == "-2") {
		$('#lblQ_VehicleList').html("Please select any one Vehicle.");
		$('#lblQ_VehicleList').css('display', 'block');
		bool = false;
	} else {
		$('#lblQ_VehicleList').css('display', 'none');
	}
});

/******************* Quick Trip Ending ***************/

/******************* Trip Summary Details Starting *******************/

function showTripDetails(bool) {
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
	if (bool) {
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/GetTripDetails", {
			"TripId" : oTripdetails.oTripId
		}, "json", StartTripDetailsSuccess, StartTripDetailsError);
	} else {
		$("#divStateDistanceList").html("No Data");
		$("#divBuyFuelList").html("No Data");
		$("#tabTripSummary").addClass("active");
		$("#tabFuelSummary").removeClass("active");
		$("#NoteFuelSummary").css('display','none');
		$("#NoteTripSummary").css('display','block');
		$("#TripSummaryDetails").css("display", "block");
		$("#FuelSummaryDetails").css("display", "none");
		if ((navigator.connection.type == "none")&&localStorage.TripFuelDetails!=undefined) {
			var oTripFuelDetails=JSON.parse(localStorage.TripFuelDetails);
				StartTripDetailsSuccess(oTripFuelDetails);
		} else {
			Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/GetTripDetails", {
				"TripId" : oTripdetails.oTripId
			}, "json", StartTripDetailsSuccess, StartTripDetailsError);
		}
	}
}

var EditfilteredStateWisedata = [];
var EditFuelDetails = [];
function StartTripDetailsSuccess(res) {
	try {
		fnErrorLog("StartTripDetailsSuccess:"+JSON.stringify(res), "res");
		var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		localStorage.TripFuelDetails=JSON.stringify(res);
		if (res.length >= 1) {
			var tripDetails = res.length > 1 ? res.filter(searchFnTripDetails) : res;
			function searchFnTripDetails(value) {
				return ((value.Mode != 3));
			}
			if (tripDetails.length >= 1) {
				var htmlTripList = "";
				EditfilteredStateWisedata = tripDetails;
				$.each(tripDetails, function(index, data) {
					htmlTripList += "<div class='trip_detail_container'>";
					htmlTripList += "<div class='btm trip_detail_thead brder_top'><span>" + data.State + "</span></div>";
					htmlTripList += "<div class='btm trip_detail_thead brder_top'><span>" + (Number(data.TotalDistance)).toFixed(2) + " Mi</span></div>";
					htmlTripList += "<div class='btm trip_detail_thead brder_top'><img id='" + index + "' onclick=\"editTripSummary(this)\" src='images/Trip_edit.png' style='width: 22px; margin-top: 5px; margin-right: 10px; ' />";
					htmlTripList += "<img id=" + index + " onclick=\"AddTripSummary(this)\" src='images/Trip_add.png' style='width: 22px;  margin-top: 5px;' /></div>";
					htmlTripList += "</div>";
				});
				$("#divStateDistanceList").html(htmlTripList);
				if (res.length > 1) {
					var FuelDetails = res.filter(searchFnFuel);
					function searchFnFuel(value) {
						return ((value.Mode == 3));
					}
					if (FuelDetails.length >= 1) {
						var htmlBuyFuelList = "";
						EditFuelDetails = FuelDetails;
						$.each(FuelDetails, function(index, data) {
							var splitFStationName = data.FuelLocation.split("|");
							htmlBuyFuelList += "<div class='trip_detail_container'>";
							htmlBuyFuelList += "<div class='btm trip_detail_thead brder_top'><span>" + data.State + "-" + splitFStationName[0] + "</span></div>";
							htmlBuyFuelList += "<div class='btm trip_detail_thead brder_top'><span>" + data.NoOFGallons + "/$" + data.AmountInDollar + "</span></div>";
							htmlBuyFuelList += "<div class='btm trip_detail_thead brder_top'><img id='" + index + "' onclick=\"editFuelList(this)\" src='images/Trip_edit.png' style='width: 15px;  margin-top: 5px;' /></div>";
							htmlBuyFuelList += "</div>";
						});
						$("#divBuyFuelList").html(htmlBuyFuelList);
					}
				}
			}
			var distance = 0;
			for (var i = 0; i < tripDetails.length; i++) {
				distance += tripDetails[i].TotalDistance;
			}
			$("#sp_Distance").html(distance.toFixed(2) + " Miles");
			if (oTripdetails.oUpdatedDate != undefined) {
				$("#lblUpdatedDate").html(oTripdetails.oUpdatedDate);
			}
			fnErrorLog("lblUpdatedDate:"+oTripdetails.oUpdatedDate, "res");
		}
	} catch(e) {
		navigator.notification.alert(e.message, alertDismissed, "Alert", "Ok");
	}
}

function StartTripDetailsError(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

/******************* tab click functions *******************/
$("#tabTripSummary").click(function() {
	$("#tabTripSummary").addClass("active");
	$("#tabFuelSummary").removeClass("active");
	$("#TripSummaryDetails").css("display", "block");
	$("#FuelSummaryDetails").css("display", "none");
	$("#NoteFuelSummary").css('display','none');
	$("#NoteTripSummary").css('display','block');
});

$("#tabFuelSummary").click(function() {
	$("#tabTripSummary").removeClass("active");
	$("#tabFuelSummary").addClass("active");
	$("#FuelSummaryDetails").css("display", "block");
	$("#TripSummaryDetails").css("display", "none");
	$("#NoteFuelSummary").css('display','block');
	$("#NoteTripSummary").css('display','none');
});

function editTripSummary(rowData) {
	stateChangeValue="";
	EditDistanceValue=0;
	$('#txtTripStateName').prop('readonly', true);
	$('#lblTripDistance').css('display', 'none');
	$('#lblTripStateName').css('display', 'none');
	$("#spnEditoRAddTrip").html("Edit");
	$("#divEditTripSummary").css('display', 'block');
	$("#divformTripDetails").css('display', 'none');
	$("#txtTripStateName").val(EditfilteredStateWisedata[rowData.id].State);
	$("#txtTripDistance").val(EditfilteredStateWisedata[rowData.id].TotalDistance);
	$("#hidIsEdit").val("1");
	$("#hidIsEditID").val(rowData.id);
}

function AddTripSummary(rowData) {
	stateChangeValue="";
	EditDistanceValue=0;
	$('#txtTripStateName').prop('readonly', false);
	$("#spnEditoRAddTrip").html("Add");
	$("#divEditTripSummary").css('display', 'block');
	$("#divformTripDetails").css('display', 'none');
	$("#txtTripStateName").val("");
	$("#txtTripDistance").val("");
	$('#lblTripDistance').css('display', 'none');
	$('#lblTripStateName').css('display', 'none');
	$("#hidIsEdit").val("0");
	$("#hidIsEditID").val(rowData.id);
}

function editFuelList(rowdata) {
	$('#lblEditFuelLocation').css('display', 'none');
	$('#lblEditP_NoOFGallons').css('display', 'none');
	$('#lblEditP_AmountInDollar').css('display', 'none');
	$("#smallEditP_Image").attr("src", "");
	$("#hidEditP_FuelReciept").val("");
	$("#divformTripDetails").css('display', 'none');
	$("#divEditFuelSummary").css('display', 'block');
	$("#eidtIndexinFuel").val(rowdata.id);
	$("#txtEditBuyFuelStateName").val(replaceltgt(EditFuelDetails[rowdata.id].State));
	$("#txtEditFuelLocation").val(replaceltgt(EditFuelDetails[rowdata.id].FuelLocation));
	$("#txtEditP_NoOFGallons").val(EditFuelDetails[rowdata.id].NoOFGallons);
	$("#txtEditP_AmountInDollar").val("$" + EditFuelDetails[rowdata.id].AmountInDollar);
	$('#chkEditP_Receipt').prop('checked', true);
	$('#chkEditNoP_Receipt').prop('checked', false);
	if ($("#chkEditP_Receipt").is(":checked")) {
		$("#txtEditP_Description").css('display', 'none');
		$("#divEditP_Pic").css('display', 'block');
	} else {
		$("#txtEditP_Description").css('display', 'block');
		$("#divEditP_Pic").css('display', 'none');
	}
}


$("#btnAddTripStateDis").click(function() {
	$("#spnEditoRAddTrip").html("Add");
	$("#divEditTripSummary").css('display', 'block');
	$("#divformTripDetails").css('display', 'none');
	$("#txtTripStateName").val("");
	$("#txtTripDistance").val("");
	$('#lblTripDistance').css('display', 'none');
	$('#lblTripStateName').css('display', 'none');
	$("#hidIsEditID").val("-1");
});

var EditDistanceValue = 0;
var stateChangeValue="";
$("#btnEditTripDetails").click(function() {
	try {
		if (validationforEditTrip()) {
			var txtTripStateNameVal = "";
			var filtered = GlobalStateNames.filter(searchFn);
			function searchFn(value) {
				return ((value.StateName.toLowerCase() == $("#txtTripStateName").val().toLowerCase()));
			}
			if (filtered.length > 0) {
				txtTripStateNameVal = filtered[0].ID;
			} else {
				txtTripStateNameVal = $("#txtTripStateName").val();
			}
			var oTripdetails = JSON.parse(localStorage["tripDetails"]);
			var oEditdata = EditfilteredStateWisedata[$("#hidIsEditID").val()];
			if ($("#hidIsEdit").val() == "1") {
				if (Number($("#hidIsEditID").val()) == EditfilteredStateWisedata.length - 1) {
					EditDistanceValue = Number($("#txtTripDistance").val());
				}
				var obj = {};
				obj.DriveId = oEditdata.DriveId;
				obj.DriverId = oEditdata.DriverId;
				obj.TruckID = oEditdata.TruckID;
				obj.TripId = oTripdetails.oTripId;
				obj.SequenceId = oEditdata.SequenceId;
				obj.Mode = oEditdata.Mode;
				obj.State = txtTripStateNameVal;
				obj.Address = oEditdata.Address; 
				obj.TotalDistance = $("#txtTripDistance").val();
				Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/UpdateDriveDetails", obj, "json", EditTripUpdateSuccess, EditTripError);
			} else {
				if (oEditdata.State.toUpperCase() == txtTripStateNameVal.toUpperCase()) {
					if (Number($("#hidIsEditID").val()) == EditfilteredStateWisedata.length - 1) {
						stateChangeValue = txtTripStateNameVal;
						EditDistanceValue = Number($("#txtTripDistance").val());
					}
					navigator.notification.confirm("The State name is already added do you want to add again?", onConfirm, 'Confirm', 'YES,NO');
					function onConfirm(res) {
						if (res == 1) {
							var data = [];
							var obj = {};
							obj.DriverId = oTripdetails.oDriverID;
							obj.TruckID = oTripdetails.oTruckID;
							obj.TripId = oTripdetails.oTripId;
							obj.Mode = 5;
							obj.SequenceId = oEditdata.SequenceId;
							obj.State = txtTripStateNameVal;
							obj.Address = $("#txtTripStateName").val();
							obj.TotalDistance = Number($("#txtTripDistance").val()).toFixed(2);
							obj.CreatedDate = new Date();
							obj.ReuiredTripID = false;
							data.push(obj);
							Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
								'lit_DriveDetails' : JSON.stringify(data)
							}, "json", EditTripSuccess, EditTripError);
						}
					}
				} else {
					if (Number($("#hidIsEditID").val()) == EditfilteredStateWisedata.length - 1) {
							EditDistanceValue = Number($("#txtTripDistance").val());
							stateChangeValue = txtTripStateNameVal;
						}
					var data = [];
					var obj = {};
					obj.DriverId = oTripdetails.oDriverID;
					obj.TruckID = oTripdetails.oTruckID;
					obj.TripId = oTripdetails.oTripId;
					obj.Mode = 5;
					obj.SequenceId = oEditdata.SequenceId;
					obj.State = txtTripStateNameVal;
					obj.Address = $("#txtTripStateName").val();
					obj.TotalDistance = Number($("#txtTripDistance").val()).toFixed(2);
					obj.CreatedDate = new Date();
					obj.ReuiredTripID = false;
					data.push(obj);
					Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
						'lit_DriveDetails' : JSON.stringify(data)
					}, "json", EditTripSuccess, EditTripError);
				}
			}
		}
	} catch(e) {
		navigator.notification.alert(e.message, alertDismissed, "Alert", "Ok");
	}
});

$("#btnEditTripBack").click(function() {
	$("#divEditTripSummary").css('display', 'none');
	$("#divformTripDetails").css('display', 'block');
	$("#hidIsEditID").val("-1");
	$("#spnEditoRAddTrip").html("Add");
});

/******************* validation on edit trip *******************/
$("#txtTripDistance").focus(function() {
	$('#lblTripDistance').css('display', 'none');
});

$("#txtTripDistance").blur(function() {
	var TripDistance = ($("#txtTripDistance").val()).trim();
	var obja2 = ($("#txtTripDistance").val()).trim().split(".");
	if (TripDistance == "") {
		$('#lblTripDistance').html("You can't leave this empty");
		$('#lblTripDistance').css('display', 'block');
	} else if (!isFloatNumber(TripDistance)) {
		$('#lblTripDistance').html("Please enter number only");
		$('#lblTripDistance').css('display', 'block');
	} else if (obja2[0].length > 5) {
		$("#lblTripDistance").html("More than 5 digits are not allowed.");
		$('#lblTripDistance').css('display', 'block');
	} else if (obja2[0] <= 0) {
		$("#lblTripDistance").html("You can't enter the 0 Miles.");
		$('#lblTripDistance').css('display', 'block');
		bool = false;
	} else {
		var splitNoOFGallonsdot = TripDistance.split('.');
		if (splitNoOFGallonsdot[1] == "") {
			$("#txtTripDistance").val(TripDistance + "00");
		}
	}
});

$("#txtTripStateName").focus(function() {
	$('#lblTripStateName').css('display', 'none');
});

$("#txtTripStateName").blur(function() {
	if (($("#txtTripStateName").val()).trim() == "") {
		$('#lblTripStateName').html("You can't leave this empty");
		$('#lblTripStateName').css('display', 'block');
	} else if (!isAlphaNumericSpace($("#txtTripStateName").val())) {
		$("#lblTripStateName").html("Special characters are not allowed");
		$('#lblTripStateName').css('display', 'block');
	}
});

function validationforEditTrip() {
	var bool = true;
	var TripDistance = ($("#txtTripDistance").val()).trim();
	var obja2 = ($("#txtTripDistance").val()).trim().split(".");
	if (TripDistance == "") {
		$('#lblTripDistance').html("You can't leave this empty");
		$('#lblTripDistance').css('display', 'block');
		bool = false;
	} else if (!isFloatNumber(TripDistance)) {
		$('#lblTripDistance').html("Please enter number only");
		$('#lblTripDistance').css('display', 'block');
		bool = false;
	} else if (obja2[0].length > 5) {
		$("#lblTripDistance").html("More than 5 digits are not allowed.");
		$('#lblTripDistance').css('display', 'block');
		bool = false;
	} else if (obja2[0] <= 0) {
		$("#lblTripDistance").html("You can't enter the 0 Miles.");
		$('#lblTripDistance').css('display', 'block');
		bool = false;
	}
	if (($("#txtTripStateName").val()).trim() == "") {
		$('#lblTripStateName').html("You can't leave this empty");
		$('#lblTripStateName').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumericSpace($("#txtTripStateName").val())) {
		$("#lblTripStateName").html("Special characters are not allowed");
		$('#lblTripStateName').css('display', 'block');
		bool = false;
	}
	return bool;
}


$("#btnFuelEditSummary").click(function() {
	try {
		if (validONfuelsummary()) {
			var imageDataorReson = "";
			if ($("#hidEditP_FuelReciept").val() != "") {
				imageDataorReson = $("#hidEditP_FuelReciept").val();
			} else {
				imageDataorReson = $("#txtEditP_Description").val().trim();
			}
			var txtTripStateNameVal = "";
			var filtered = GlobalStateNames.filter(searchFn);
			function searchFn(value) {
				return ((value.StateName.toLowerCase() == $("#txtEditBuyFuelStateName").val().toLowerCase()));
			}
			if (filtered.length > 0) {
				txtTripStateNameVal = filtered[0].ID;
			} else {
				txtTripStateNameVal = $("#txtEditBuyFuelStateName").val();
			}
			var oTripdetails = JSON.parse(localStorage["tripDetails"]);
			var obj = {};
			var oEditdata = EditFuelDetails[$("#eidtIndexinFuel").val()];
			obj.State=txtTripStateNameVal;
			obj.DriveId = oEditdata.DriveId;
			obj.DriverId = oTripdetails.oDriverID;
			obj.TruckID = oEditdata.TruckID;
			obj.TripId = oTripdetails.oTripId;
			if ($("#txtEditFuelLocation").val().trim() != "") {
				obj.FuelLocation = $("#txtEditFuelLocation").val();
			}
			if (Number(($("#txtEditP_AmountInDollar").val()).replace('$', '')).toFixed(2) != "") {
				obj.AmountInDollar = Number(($("#txtEditP_AmountInDollar").val()).replace('$', '')).toFixed(2);
			}
			if ($("#txtEditP_NoOFGallons").val().trim() != "") {
				obj.NoOFGallons = Number($("#txtEditP_NoOFGallons").val()).toFixed(2);
			}
			if (imageDataorReson != "") {
				obj.FuelReciept = imageDataorReson;
			}
			obj.Mode = 3;
			Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/UpdateDriveDetails", obj, "json", EditTripUpdateSuccess, EditTripError);
		}
	} catch(e) {
		navigator.notification.alert(e.message, alertDismissed, "Alert", "Ok");
	}
});

$("#buyEditfuelBack").click(function() {
	$("#divEditFuelSummary").css('display', 'none');
	$("#divformTripDetails").css('display', 'block');
	$("#eidtIndexinFuel").val("");
	$("#smallEditP_Image").attr("src", "");
	$("#hidEditP_FuelReciept").val("");
});

/******************* validations on edit fuel summary trip. *******************/
$("#txtEditFuelLocation").focus(function() {
	$('#lblEditFuelLocation').css('display', 'none');
});

$("#txtEditFuelLocation").blur(function() {
	if (($("#txtEditFuelLocation").val()).trim() == "") {
		$('#lblEditFuelLocation').html("You can't leave this empty");
		$('#lblEditFuelLocation').css('display', 'block');
	}
});

$("#txtEditP_NoOFGallons").focus(function() {
	$('#lblEditP_NoOFGallons').css('display', 'none');
});

$("#txtEditP_NoOFGallons").blur(function() {
	var valueNoOFGallons = ($("#txtEditP_NoOFGallons").val()).trim();
	var obja2 = ($("#txtEditP_NoOFGallons").val()).trim().split(".");
	if (valueNoOFGallons == "") {
		$('#lblEditP_NoOFGallons').html("You can't leave this empty");
		$('#lblEditP_NoOFGallons').css('display', 'block');
	} else if (!isFloatNumber(valueNoOFGallons)) {
		$('#lblEditP_NoOFGallons').html("Please enter number only");
		$('#lblEditP_NoOFGallons').css('display', 'block');
	} else if (obja2[0].length > 3) {
		$("#lblEditP_NoOFGallons").html("More than 3 digits are not allowed.");
		$('#lblEditP_NoOFGallons').css('display', 'block');
	} else if (obja2[0] <= 0) {
		$("#lblEditP_NoOFGallons").html("You can't enter the 0 Gallons");
		$('#lblEditP_NoOFGallons').css('display', 'block');
	} else {
		var splitNoOFGallonsdot = valueNoOFGallons.split('.');
		if (splitNoOFGallonsdot[1] == "") {
			$("#txtEditP_NoOFGallons").val(valueNoOFGallons + "00");
		}
	}
});

$("#txtEditP_AmountInDollar").focus(function() {
	$('#lblEditP_AmountInDollar').css('display', 'none');
});

$("#txtEditP_AmountInDollar").blur(function() {
	var valueAmount = ($("#txtEditP_AmountInDollar").val()).trim();
	var splitAmount = valueAmount.split('$');
	var obja1 = splitAmount[1].split(".");
	if (splitAmount[1] == "" || splitAmount.length == 1) {
		$('#lblEditP_AmountInDollar').html("You can't leave this empty");
		$('#lblEditP_AmountInDollar').css('display', 'block');
	} else if (!isFloatNumber(splitAmount[1])) {
		$('#lblEditP_AmountInDollar').html("Please enter number only");
		$('#lblEditP_AmountInDollar').css('display', 'block');
	} else if (obja1[0].length > 8) {
		$('#lblEditP_AmountInDollar').html("More than 8 digits are not allowed");
		$('#lblEditP_AmountInDollar').css('display', 'block');
	} else if (obja1[0] <= 0) {
		$('#lblEditP_AmountInDollar').html("You can't enter the 0 Dollars");
		$('#lblEditP_AmountInDollar').css('display', 'block');
	} else {
		var splitAmountdot = splitAmount[1].split('.');
		if (splitAmountdot[1] == "") {
			$("#txtEditP_AmountInDollar").val(valueAmount + "00");
		}
	}
});

$("#txtEditP_AmountInDollar").keyup(function(e) {
	if (!(($("#txtEditP_AmountInDollar").val()).indexOf("$") > -1)) {
		$("#txtEditP_AmountInDollar").val("$" + $("#txtEditP_AmountInDollar").val());
	}
});

$("#txtEditBuyFuelStateName").focus(function() {
	$('#lblEditBuyFuelStateName').css('display', 'none');
});

$("#txtEditBuyFuelStateName").blur(function() {
	if (($("#txtEditBuyFuelStateName").val()).trim() == "") {
		$('#lblEditBuyFuelStateName').html("You can't leave this empty");
		$('#lblEditBuyFuelStateName').css('display', 'block');
	} else if (!isAlphaNumericSpace($("#txtEditBuyFuelStateName").val())) {
		$("#lblEditBuyFuelStateName").html("Special characters are not allowed");
		$('#lblEditBuyFuelStateName').css('display', 'block');
	}
});

function validONfuelsummary() { 
	var bool = true;
	var valueAmount = ($("#txtEditP_AmountInDollar").val()).trim();
	var splitAmount = valueAmount.split('$');
	var obja1 = splitAmount[1].split(".");
	if (($("#txtEditBuyFuelStateName").val()).trim() == "") {
		$('#lblEditBuyFuelStateName').html("You can't leave this empty");
		$('#lblEditBuyFuelStateName').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumericSpace($("#txtEditBuyFuelStateName").val())) {
		$("#lblEditBuyFuelStateName").html("Special characters are not allowed");
		$('#lblEditBuyFuelStateName').css('display', 'block');
		bool = false;
	}
	if (splitAmount[1] == "" || splitAmount.length == 1) {
		$('#lblEditP_AmountInDollar').html("You can't leave this empty");
		$('#lblEditP_AmountInDollar').css('display', 'block');
		bool = false;
	} else if (!isFloatNumber(splitAmount[1])) {
		$('#lblEditP_AmountInDollar').html("Please enter number only");
		$('#lblEditP_AmountInDollar').css('display', 'block');
		bool = false;
	} else if (obja1[0].length > 8) {
		$('#lblEditP_AmountInDollar').html("More than 8 digits are not allowed");
		$('#lblEditP_AmountInDollar').css('display', 'block');
		bool = false;
	} else if (obja1[0] <= 0) {
		$('#lblEditP_AmountInDollar').html("You can't enter the 0 Dollars");
		$('#lblEditP_AmountInDollar').css('display', 'block');
		bool = false;
	}
	var valueNoOFGallons = ($("#txtEditP_NoOFGallons").val()).trim();
	var obja2 = ($("#txtEditP_NoOFGallons").val()).trim().split(".");
	if (valueNoOFGallons == "") {
		$('#lblEditP_NoOFGallons').html("You can't leave this empty");
		$('#lblEditP_NoOFGallons').css('display', 'block');
		bool = false;
	} else if (!isFloatNumber(valueNoOFGallons)) {
		$('#lblEditP_NoOFGallons').html("Please enter number only");
		$('#lblEditP_NoOFGallons').css('display', 'block');
		bool = false;
	} else if (obja2[0].length > 3) {
		$("#lblEditP_NoOFGallons").html("More than 3 digits are not allowed.");
		$('#lblEditP_NoOFGallons').css('display', 'block');
		bool = false;
	} else if (obja2[0] <= 0) {
		$("#lblEditP_NoOFGallons").html("You can't enter the 0 Gallons");
		$('#lblEditP_NoOFGallons').css('display', 'block');
		bool = false;
	}
	if (($("#txtEditFuelLocation").val()).trim() == "") {
		$('#lblEditFuelLocation').html("You can't leave this empty");
		$('#lblEditFuelLocation').css('display', 'block');
		bool = false;
	}
	return bool;
}


$('#chkEditP_Receipt').change(function() {
	if ($("#chkEditP_Receipt").is(":checked")) {
		$("#txtEditP_Description").css('display', 'none');
		$("#divEditP_Pic").css('display', 'block');
		$('#chkEditNoP_Receipt').prop('checked', false);
	} else {
		$('#chkEditNoP_Receipt').prop('checked', true);
		$("#txtEditP_Description").css('display', 'block');
		$("#divEditP_Pic").css('display', 'none');
	}
});

$('#chkEditNoP_Receipt').change(function() {
	if ($(this).is(":checked")) {
		$("#txtEditP_Description").css('display', 'block');
		$("#divEditP_Pic").css('display', 'none');
		$('#chkEditP_Receipt').prop('checked', false);
	} else {
		$('#chkEditP_Receipt').prop('checked', true);
		$("#txtEditP_Description").css('display', 'none');
		$("#divEditP_Pic").css('display', 'block');
	}
});


$("#hrefEditP_ImageCamera").click(function() {
	navigator.camera.getPicture(onPhotoEditP_DataSuccess, onFail, {
		quality : 20,
		encodingType : Camera.EncodingType.JPEG,
		correctOrientation : true,
		destinationType : destinationType.DATA_URL
	});
});

function onPhotoEditP_DataSuccess(imageData) {
	var smallImage = document.getElementById('smallEditP_Image');
	smallImage.style.display = 'block';
	smallImage.src = "data:image/jpeg;base64," + imageData;
	$("#hidEditP_FuelReciept").val(imageData);
}

function EditTripSuccess(res) {
	if(res.result.TripStatus!=null){
			IsLogout="";
			$("#divformMenuScreen").css('display', 'block');
			$("#divformQuickTrip").css('display', 'none');
			$("#divformTripDetails").css('display', 'none');
			$("#divEditFuelSummary").css('display', 'none');
			$("#divformBuyFuelDetails").css('display', 'none');
			$("#divEditTripSummary").css('display', 'none');
			$("#divformCreateTrip").css('display', 'none');
			clearTimeout(IsRuningTimer);
	        navigator.geolocation.clearWatch(watchID);
			Gv_EndTrip = "no";
			localStorage.removeItem("tripDetails");
			localStorage.removeItem("DriverTripDetails");
			localStorage.removeItem("TripFuelDetails");
			navigator.notification.alert(res.result.TripStatus, function() {$("#loader").css("display", "none");}, "Alert", "Ok");
		} else {
			fnErrorLog("EditDistanceValue " + EditDistanceValue, JSON.stringify(res));
			var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
			if (EditDistanceValue > 0 || stateChangeValue != "") {
				oDriverTripDetails.distanceTravelled = ((EditDistanceValue)*1000)*1.609344;
				navigator.geolocation.getCurrentPosition(function(position) {
					oDriverTripDetails.Changelatlang.latitude = position.coords.latitude;
					oDriverTripDetails.Changelatlang.longitude = position.coords.longitude;
				}, function(PositionError) {
					$("#loader").css("display", "none");
					fnErrorLog("Error Geolocation: " + PositionError.message, PositionError.code);
					navigator.notification.alert("Please turn on the location services", alertDismissed, "Alert", "Ok");
				},{timeout: 5000 });
			}
			if(stateChangeValue!=""){
				oDriverTripDetails.StateName = stateChangeValue;
			}
			localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
			fnErrorLog("localStorage.DriverTripDetails " + localStorage.DriverTripDetails, "Edit");
			var oTripdetails = JSON.parse(localStorage["tripDetails"]);
			if(res.result!=undefined){
				fnErrorLog("State Change"+stateChangeValue, res.result.SequenceId);
				oTripdetails.oSequenceId = res.result.SequenceId;
			}
			oTripdetails.oUpdatedDate = getDateTime();
			localStorage["tripDetails"] = JSON.stringify(oTripdetails);
			EditDistanceValue = 0;
			stateChangeValue="";
			$("#divEditFuelSummary").css('display', 'none');
			$("#divformTripDetails").css('display', 'block');
			$("#divEditTripSummary").css('display', 'none');
			showTripDetails();
		}
}

function EditTripUpdateSuccess(res){
	fnErrorLog("EditDistanceValue " + EditDistanceValue, JSON.stringify(res));
	var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
	if (EditDistanceValue > 0 || stateChangeValue != "") {
		oDriverTripDetails.distanceTravelled = ((EditDistanceValue)*1000)*1.609344;
		navigator.geolocation.getCurrentPosition(function(position) {
			oDriverTripDetails.Changelatlang.latitude = position.coords.latitude;
			oDriverTripDetails.Changelatlang.longitude = position.coords.longitude;
		}, function(PositionError) {
			$("#loader").css("display", "none");
			fnErrorLog("Error Geolocation: " + PositionError.message, PositionError.code);
			navigator.notification.alert("Please turn on the location services", alertDismissed, "Alert", "Ok");
		},{timeout: 5000 });
	}
	if(stateChangeValue!=""){
		oDriverTripDetails.StateName = stateChangeValue;
	}
	localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
	fnErrorLog("localStorage.DriverTripDetails " + localStorage.DriverTripDetails, "Edit");
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
	if(res.result!=undefined){
		fnErrorLog("State Change"+stateChangeValue, res.result.SequenceId);
		oTripdetails.oSequenceId = res.result.SequenceId;
	}
	oTripdetails.oUpdatedDate = getDateTime();
	localStorage["tripDetails"] = JSON.stringify(oTripdetails);
	EditDistanceValue = 0;
	stateChangeValue="";
	$("#divEditFuelSummary").css('display', 'none');
	$("#divformTripDetails").css('display', 'block');
	$("#divEditTripSummary").css('display', 'none');
	showTripDetails();
}

function EditTripError(res) {
	EditDistanceValue = 0;
	stateChangeValue="";
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}


$("#btnTripDetailsBack").click(function() {
	$("#divformMenuScreen").css('display', 'block');
	$("#divformTripDetails").css('display', 'none');
});

$("#btnEndTrip").click(function() {
	if (navigator.connection.type != "none") {
		$("#loader").css("display", "block");
		navigator.geolocation.getCurrentPosition(onSuccessEndTrip, onError, {timeout: 5000 });
	} else {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	}
});

function onSuccessEndTrip(position) {
	$("#loader").css("display", "none");
	navigator.notification.confirm("Do you want to end the trip?", onConfirm, 'Confirm', 'YES,NO');
	function onConfirm(res) {
		if (res == 1) {
			if (JSON.parse(localStorage["tripDetails"]).oEndingAddress == "") {
				$("#divformCreateTrip").css('display', 'block');
				$("#divformTripDetails").css('display', 'none');
				useToEndTripDiv = "yes";
				startCreateTripPage();
			} else {
				endTripfn();
			}
		}
	}
}

$("#btnToLocation").click(function() {
	if (navigator.connection.type != "none") {
		endTripfn();
	} else {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	}
});

$("#btnToEndTrip").click(function() {
	if (navigator.connection.type != "none") {
		var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		oTripdetails.oEndingAddress = ($("#txtToSteertAddress").val().trim() + " " + $("#txtToCity").val().trim() + " " + $("#txtToState").val().trim() + " " + $("#txtToZipCode").val().trim()).trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
		if (oTripdetails.oEndingAddress != "") {
			localStorage["tripDetails"] = JSON.stringify(oTripdetails);
			endTripfn();
		} else {
			navigator.notification.alert("Please enter the To Address details", alertDismissed, "Alert", "Ok");
		}
	} else {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	}
});

/******************* Trip Summary Details Ending *******************/

/******************* Buy Fuel Summary Details Starting *******************/

function getGasStationList() {
	ImageBase64=null;
	buyFuel_Pdate="";
	P_BuyFuelStateName="";
	$("#txtFuelLocation1").val("");
	$("#txtNoOFGallons").val("");
	$("#txtAmountInDollar").val("");
	$("#txtDescription").val("");
	$('#chkC_Receipt').prop('checked', true);
	$('#chkNoC_Receipt').prop('checked', false);
	$("#hidFuelReciept").val("");
	$("#txtDescription").css('display', 'none');
	$("#divPic").css('display', 'block');
	$("#ddlPurchase").val("Current Purchase");
	$("#ddlGasStations").val("--Select Gas Station--");
	$("#hidGasStationDetails").val("-1");
	$('#lblFuelLocation1').css('display', 'none');
	$("#divFuelLocation1").css('display', 'block');
	var smallImage = document.getElementById('smallImage');
	smallImage.style.display = 'none';
	smallImage.src = "";
	$("#lblGasStations").css('display', 'none');
	$('#lblAmountInDollar').css('display', 'none');
	$('#lblNoOFGallons').css('display', 'none');

	$("#txtFuelLocation").val("");
	$("#txtP_NoOFGallons").val("");
	$("#txtP_AmountInDollar").val("");
	$('#chkP_Receipt').prop('checked', true);
	$('#chkNoP_Receipt').prop('checked', false);
	$("#divP_Pic").css('display', 'block');
	$("#txtP_Description").val("");
	$("#txtBuyFuelStateName").val("");
	$('#lblBuyFuelStateName').css('display', 'none');
	$("#txtP_Description").css('display', 'none');
	$("#hidP_FuelReciept").val("");
	var smallImage = document.getElementById('smallP_Image');
	smallImage.style.display = 'none';
	smallImage.src = "";
	$('#lblFuelLocation').css('display', 'none');
	$('#lblP_AmountInDollar').css('display', 'none');
	$('#lblP_NoOFGallons').css('display', 'none');

	if ($('#ddlPurchase option:selected').attr("id") == 1) {
		$("#formC_Purchace").css('display', 'block');
		$("#formP_Purchace").css('display', 'none');
	} else if ($('#ddlPurchase option:selected').attr("id") == 2) {
		$("#formC_Purchace").css('display', 'none');
		$("#formP_Purchace").css('display', 'block');
	}

	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = (month) + "/" + (day) + "/" + now.getFullYear();
	$('#txtDate').val(today);
	$("#hidCreatedDate").val(today);
	$("#loader").css("display", "block");
	navigator.geolocation.getCurrentPosition(showPosition, onError, {timeout: 5000 });
}

function showPosition(position) {
	try {
		if (position != null) {
			Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", gasstationsAPI + position.coords.latitude + "/" + position.coords.longitude + "/2/reg/price/jn8ybt18zm.json", {}, "json", stationListSuccess, stationListerror);
		} else {
			navigator.notification.alert("Unable to get User location", alertDismissed, "Alert", "Ok");
		}
	} catch(e) {
	}
}

function stationListSuccess(data) {
	$('#ddlGasStations').empty();
	var element = "<option id='-1'>--Select Gas Station--</option>";
	if (data.status.code == 200 && data.status.error == "NO" && data.stations != undefined) {
		$.each(data.stations, function(index, value) {
			var distanceArr = value.distance.split(" ");
			element += "<option id=" + value.id + ">" + value.station + " | " + value.address + " " + value.city + " | " + distanceArr[0] + "M" + "</option>";
		});
		$('#ddlGasStations').append(element);
	}
}

function stationListerror(res) {
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}

$("#hrefImageCamera").click(function() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 20,
		encodingType : Camera.EncodingType.JPEG,
		correctOrientation : true,
		destinationType : destinationType.DATA_URL
	});
});

function onPhotoDataSuccess(imageData) {
	$("#loader").css("display", "block");
	setTimeout(function(){
		$("#loader").css("display", "none");
	},3000);
	var smallImage = document.getElementById('smallImage');
	$("#hidFuelReciept").val(imageData);
	smallImage.style.display = 'block';
	smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
	navigator.notification.alert('Failed because: ' + message, alertDismissed, "Alert", "Ok");
}

$("#hrefP_ImageCamera").click(function() {
	navigator.camera.getPicture(onPhotoP_DataSuccess, onFail, {
		quality : 20,
		encodingType : Camera.EncodingType.JPEG,
		correctOrientation : true,
		destinationType : destinationType.DATA_URL
	});
});

$(".btnBack").click(function() {
	$("#divformBuyFuelDetails").css('display', 'none');
	$("#divformMenuScreen").css('display', 'block');
});

function onPhotoP_DataSuccess(imageData) {
	$("#loader").css("display", "block");
	setTimeout(function(){
		$("#loader").css("display", "none");
	},3000);
	var smallImage = document.getElementById('smallP_Image');
	smallImage.style.display = 'block';
	smallImage.src = "data:image/jpeg;base64," + imageData;
	$("#hidP_FuelReciept").val(imageData);
}

$('#chkC_Receipt').change(function() {
	if ($(this).is(":checked")) {
		$("#txtDescription").css('display', 'none');
		$("#divPic").css('display', 'block');
		$('#chkNoC_Receipt').prop('checked', false);
	} else {
		$('#chkNoC_Receipt').prop('checked', true);
		$("#txtDescription").css('display', 'block');
		$("#divPic").css('display', 'none');
	}
});

$('#chkNoC_Receipt').change(function() {
	if ($(this).is(":checked")) {
		$("#txtDescription").css('display', 'block');
		$("#divPic").css('display', 'none');
		$('#chkC_Receipt').prop('checked', false);
	} else {
		$('#chkC_Receipt').prop('checked', true);
		$("#txtDescription").css('display', 'none');
		$("#divPic").css('display', 'block');
	}
});

$('#chkP_Receipt').change(function() {
	if ($(this).is(":checked")) {
		$("#txtP_Description").css('display', 'none');
		$("#divP_Pic").css('display', 'block');
		$('#chkNoP_Receipt').prop('checked', false);
	} else {
		$('#chkNoP_Receipt').prop('checked', true);
		$("#txtP_Description").css('display', 'block');
		$("#divP_Pic").css('display', 'none');
	}
});

$('#chkNoP_Receipt').change(function() {
	if ($(this).is(":checked")) {
		$("#txtP_Description").css('display', 'block');
		$("#divP_Pic").css('display', 'none');
		$('#chkP_Receipt').prop('checked', false);
	} else {
		$('#chkP_Receipt').prop('checked', true);
		$("#txtP_Description").css('display', 'none');
		$("#divP_Pic").css('display', 'block');
	}
});

$('#ddlGasStations').change(function() {
	$('#hidGasStationDetails').val($('#ddlGasStations option:selected').val());
	if (($("#hidGasStationDetails").val() == "-1") || ($("#hidGasStationDetails").val() == "--Select Gas Station--")) {
		$("#lblGasStations").html("Please select the Gas Station");
		$("#lblGasStations").css('display', 'block');
		$("#divFuelLocation1").css('display', 'block');
	} else {
		$("#divFuelLocation1").css('display', 'none');
		$("#lblGasStations").css('display', 'none');
	}
});

$('#ddlPurchase').change(function() {
	if ($('#ddlPurchase option:selected').attr("id") == 1) {
		$("#formC_Purchace").css('display', 'block');
		$("#formP_Purchace").css('display', 'none');
	} else if ($('#ddlPurchase option:selected').attr("id") == 2) {
		$("#formC_Purchace").css('display', 'none');
		$("#formP_Purchace").css('display', 'block');
	}
});

$("#formC_Purchace").submit(function(event) {
	try {
		event.preventDefault();
		if (C_Validations()) {
			$("#loader").css("display", "block");
			navigator.geolocation.getCurrentPosition(onSuccessC_Purchace, onError, {timeout: 5000 });
		}
	} catch(e) {
	}
});

function onSuccessC_Purchace(position) {
	var $form = $(this);
	var data = $form.serialize();
	var imageDataorReson = null;
	if ($("#hidFuelReciept").val() != "") {
		imageDataorReson = $("#hidFuelReciept").val();
	} else {
		imageDataorReson = $("#txtDescription").val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	if (localStorage["tripDetails"] == undefined) {
		localStorage["tripDetails"] = '{}';
	}
	if ($("#hidGasStationDetails").val() == "-1") {
		$("#hidGasStationDetails").val($("#txtFuelLocation1").val().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
	}
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
	oTripdetails.oFuelStation = $("#hidGasStationDetails").val();
	oTripdetails.oNoOfGallons = Number($("#txtNoOFGallons").val()).toFixed(2);
	oTripdetails.oTotalPrice = Number(($("#txtAmountInDollar").val()).replace('$', '')).toFixed(2);
	localStorage["tripDetails"] = JSON.stringify(oTripdetails);
	$("#loader").css("display", "block");
	setGlobalValuesOnce(imageDataorReson, "","");
}


$("#txtFuelLocation1").focus(function() {
	$('#lblFuelLocation1').css('display', 'none');
});

$("#txtFuelLocation1").blur(function() {
	if (($("#txtFuelLocation1").val()).trim() == "") {
		$('#lblFuelLocation1').html("You can't leave this empty");
		$('#lblFuelLocation1').css('display', 'block');
	} else if (!isAlphaNumericSpace($("#txtFuelLocation1").val())) {
		$("#lblFuelLocation1").html("Special characters are not allowed");
		$('#lblFuelLocation1').css('display', 'block');
	}
});

$("#formP_Purchace").submit(function(event) {
	try {
		event.preventDefault();
		var $form = $(this);
		var data = $form.serialize();
		var imageDataorReson = null;
		if (P_Validations()) {
			$("#loader").css("display", "block");
			navigator.geolocation.getCurrentPosition(onSuccessP_Purchace, onError, {timeout: 5000 });
		}
	} catch(e) {
	}
});

function onSuccessP_Purchace(position) {
	var imageDataorReson = null;
	if ($("#hidP_FuelReciept").val() != "") {
		imageDataorReson = $("#hidP_FuelReciept").val();
	} else {
		imageDataorReson = $("#txtP_Description").val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	if (localStorage["tripDetails"] == undefined) {
		localStorage["tripDetails"] = '{}';
	}
	var txtTripStateNameVal = "";
	var filtered = GlobalStateNames.filter(searchFn);
	function searchFn(value) {
		return ((value.StateName.toLowerCase() == $("#txtBuyFuelStateName").val().toLowerCase()));
	}
	if (filtered.length > 0) {
		txtTripStateNameVal = filtered[0].ID;
	} else {
		txtTripStateNameVal = $("#txtBuyFuelStateName").val();
	}
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
	oTripdetails.oFuelStation = $("#txtFuelLocation").val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	oTripdetails.oNoOfGallons = Number($("#txtP_NoOFGallons").val()).toFixed(2);
	oTripdetails.oTotalPrice = Number(($("#txtP_AmountInDollar").val()).replace('$', '')).toFixed(2);
	localStorage["tripDetails"] = JSON.stringify(oTripdetails);
	$("#loader").css("display", "block");
	setGlobalValuesOnce(imageDataorReson, $("#txtDate").val(),txtTripStateNameVal);
}


$("#txtAmountInDollar").keyup(function(e) {
	if (!(($("#txtAmountInDollar").val()).indexOf("$") > -1)) {
		$("#txtAmountInDollar").val("$" + $("#txtAmountInDollar").val());
	}
});

$("#txtP_AmountInDollar").keyup(function(e) {
	if (!(($("#txtP_AmountInDollar").val()).indexOf("$") > -1)) {
		$("#txtP_AmountInDollar").val("$" + $("#txtP_AmountInDollar").val());
	}
});

/**************** validations ***************/
$("#txtAmountInDollar").focus(function() {
	$('#lblAmountInDollar').css('display', 'none');
});

$("#txtAmountInDollar").blur(function() {
	var valueAmount = ($("#txtAmountInDollar").val()).trim();
	var splitAmount = valueAmount.split('$');
	var obja1 = splitAmount[1].split(".");
	if (splitAmount[1] == "" || splitAmount.length == 1) {
		$('#lblAmountInDollar').html("You can't leave this empty");
		$('#lblAmountInDollar').css('display', 'block');
	} else if (!isFloatNumber(splitAmount[1])) {
		$('#lblAmountInDollar').html("Please enter number only");
		$('#lblAmountInDollar').css('display', 'block');
	} else if (obja1[0].length > 8) {
		$('#lblAmountInDollar').html("More than 8 digits are not allowed");
		$('#lblAmountInDollar').css('display', 'block');
	} else if (obja1[0] <= 0) {
		$('#lblAmountInDollar').html("You can't enter the 0 Dollars");
		$('#lblAmountInDollar').css('display', 'block');
	} else {
		var splitAmountdot = splitAmount[1].split('.');
		if (splitAmountdot[1] == "") {
			$("#txtAmountInDollar").val(valueAmount + "00");
		}
	}
});

$("#txtNoOFGallons").focus(function() {
	$('#lblNoOFGallons').css('display', 'none');
});

$("#txtNoOFGallons").blur(function() {
	var valueNoOFGallons = ($("#txtNoOFGallons").val()).trim();
	var obja2 = ($("#txtNoOFGallons").val()).trim().split(".");
	if (valueNoOFGallons == "") {
		$('#lblNoOFGallons').html("You can't leave this empty");
		$('#lblNoOFGallons').css('display', 'block');
	} else if (!isFloatNumber(valueNoOFGallons)) {
		$('#lblNoOFGallons').html("Please enter number only");
		$('#lblNoOFGallons').css('display', 'block');
	} else if (obja2[0].length > 3) {
		$("#lblNoOFGallons").html("More than 3 digits are not allowed.");
		$('#lblNoOFGallons').css('display', 'block');
	} else if (obja2[0] <= 0) {
		$("#lblNoOFGallons").html("You can't enter the 0 Gallons");
		$('#lblNoOFGallons').css('display', 'block');
	} else {
		var splitNoOFGallonsdot = valueNoOFGallons.split('.');
		if (splitNoOFGallonsdot[1] == "") {
			$("#txtNoOFGallons").val(valueNoOFGallons + "00");
		}
	}
});

function C_Validations() {
	var bool = true;
	var valueNoOFGallons = ($("#txtNoOFGallons").val()).trim();
	var valueAmount = ($("#txtAmountInDollar").val()).trim();
	var splitAmount = valueAmount.split('$');
	var obja1 = splitAmount[1].split(".");
	var obja2 = ($("#txtNoOFGallons").val()).trim().split(".");
	if (($("#txtFuelLocation1").val()).trim() == "") {
		if (($("#hidGasStationDetails").val() == "-1") || ($("#hidGasStationDetails").val() == "--Select Gas Station--")) {
			bool = false;
			$("#lblGasStations").html("Please select the Gas Station");
			$("#lblGasStations").css('display', 'block');
		}
	}
	if (valueNoOFGallons == "") {
		$('#lblNoOFGallons').html("You can't leave this empty");
		$('#lblNoOFGallons').css('display', 'block');
		bool = false;
	} else if (!isFloatNumber(valueNoOFGallons)) {
		$('#lblNoOFGallons').html("Please enter number only");
		$('#lblNoOFGallons').css('display', 'block');
		bool = false;
	} else if (obja2[0].length > 3) {
		$("#lblNoOFGallons").html("More than 3 digits are not allowed.");
		$('#lblNoOFGallons').css('display', 'block');
		bool = false;
	} else if (obja2[0] <= 0) {
		$("#lblNoOFGallons").html("You can't enter the 0 Gallons");
		$('#lblNoOFGallons').css('display', 'block');
		bool = false;
	}
	if (splitAmount[1] == "" || splitAmount.length == 1) {
		$('#lblAmountInDollar').html("You can't leave this empty");
		$('#lblAmountInDollar').css('display', 'block');
		bool = false;
	} else if (!isFloatNumber(splitAmount[1])) {
		$('#lblAmountInDollar').html("Please enter number only");
		$('#lblAmountInDollar').css('display', 'block');
		bool = false;
	} else if (obja1[0].length > 8) {
		$('#lblAmountInDollar').html("More than 8 digits are not allowed");
		$('#lblAmountInDollar').css('display', 'block');
		bool = false;
	} else if (obja1[0] <= 0) {
		$('#lblAmountInDollar').html("You can't enter the 0 Dollars");
		$('#lblAmountInDollar').css('display', 'block');
		bool = false;
	}
	if (($("#hidGasStationDetails").val() == "-1") || ($("#hidGasStationDetails").val() == "--Select Gas Station--")) {
		if (($("#txtFuelLocation1").val()).trim() == "") {
			$('#lblFuelLocation1').html("You can't leave this empty");
			$('#lblFuelLocation1').css('display', 'block');
			bool = false;
		} else if (!isAlphaNumericSpace($("#txtFuelLocation1").val())) {
			$("#lblFuelLocation1").html("Special characters are not allowed");
			$('#lblFuelLocation1').css('display', 'block');
			bool = false;
		}
	}
	if (($("#hidFuelReciept").val() == "") && (($("#txtDescription").val()).trim() == "")) {
		navigator.notification.alert("Please capture the receipt Image using Camera symbol. If you don't have receipt then please select 'NO' option to enter the reason", alertDismissed, "Alert", "Ok");
		bool = false;
	}
	return bool;
}


$("#txtFuelLocation").focus(function() {
	$('#lblFuelLocation').css('display', 'none');
});

$("#txtFuelLocation").blur(function() {
	if (($("#txtFuelLocation").val()).trim() == "") {
		$('#lblFuelLocation').html("You can't leave this empty");
		$('#lblFuelLocation').css('display', 'block');
	}
});

$("#txtP_AmountInDollar").focus(function() {
	$('#lblP_AmountInDollar').css('display', 'none');
});

$("#txtP_AmountInDollar").blur(function() {
	var valueAmount = ($("#txtP_AmountInDollar").val()).trim();
	var splitAmount = valueAmount.split('$');
	var obja1 = splitAmount[1].split(".");
	if (splitAmount[1] == "" || splitAmount.length == 1) {
		$('#lblP_AmountInDollar').html("You can't leave this empty");
		$('#lblP_AmountInDollar').css('display', 'block');
	} else if (!isFloatNumber(splitAmount[1])) {
		$('#lblP_AmountInDollar').html("Please enter number only");
		$('#lblP_AmountInDollar').css('display', 'block');
	} else if (obja1[0].length > 8) {
		$('#lblP_AmountInDollar').html("More than 8 digits are not allowed");
		$('#lblP_AmountInDollar').css('display', 'block');
	} else if (obja1[0] <= 0) {
		$('#lblP_AmountInDollar').html("You can't enter the 0 Dollars");
		$('#lblP_AmountInDollar').css('display', 'block');
	} else {
		var splitAmountdot = splitAmount[1].split('.');
		if (splitAmountdot[1] == "") {
			$("#txtP_AmountInDollar").val(valueAmount + "00");
		}
	}
});

$("#txtBuyFuelStateName").focus(function() {
	$('#lblBuyFuelStateName').css('display', 'none');
});

$("#txtBuyFuelStateName").blur(function() {
	if (($("#txtBuyFuelStateName").val()).trim() == "") {
		$('#lblBuyFuelStateName').html("You can't leave this empty");
		$('#lblBuyFuelStateName').css('display', 'block');
	} else if (!isAlphaNumericSpace($("#txtBuyFuelStateName").val())) {
		$("#lblBuyFuelStateName").html("Special characters are not allowed");
		$('#lblBuyFuelStateName').css('display', 'block');
	}
});

$("#txtP_NoOFGallons").focus(function() {
	$('#lblP_NoOFGallons').css('display', 'none');
});

$("#txtP_NoOFGallons").blur(function() {
	var valueNoOFGallons = ($("#txtP_NoOFGallons").val()).trim();
	var obja2 = ($("#txtP_NoOFGallons").val()).trim().split(".");
	if (valueNoOFGallons == "") {
		$('#lblP_NoOFGallons').html("You can't leave this empty");
		$('#lblP_NoOFGallons').css('display', 'block');
	} else if (!isFloatNumber(valueNoOFGallons)) {
		$('#lblP_NoOFGallons').html("Please enter number only");
		$('#lblP_NoOFGallons').css('display', 'block');
	} else if (obja2[0].length > 3) {
		$("#lblP_NoOFGallons").html("More than 3 digits are not allowed.");
		$('#lblP_NoOFGallons').css('display', 'block');
	} else if (obja2[0] <= 0) {
		$("#lblP_NoOFGallons").html("You can't enter the 0 Gallons");
		$('#lblP_NoOFGallons').css('display', 'block');
	} else {
		var splitNoOFGallonsdot = valueNoOFGallons.split('.');
		if (splitNoOFGallonsdot[1] == "") {
			$("#txtP_NoOFGallons").val(valueNoOFGallons + "00");
		}
	}
});

function P_Validations() {
	var bool = true;
	var obja2 = ($("#txtP_NoOFGallons").val()).trim().split(".");
	var valueNoOFGallons = ($("#txtP_NoOFGallons").val()).trim();
	if (($("#txtBuyFuelStateName").val()).trim() == "") {
		$('#lblBuyFuelStateName').html("You can't leave this empty");
		$('#lblBuyFuelStateName').css('display', 'block');
		bool = false;
	} else if (!isAlphaNumericSpace($("#txtBuyFuelStateName").val())) {
		$("#lblBuyFuelStateName").html("Special characters are not allowed");
		$('#lblBuyFuelStateName').css('display', 'block');
		bool = false;
	}
	if (($("#txtFuelLocation").val()).trim() == "") {
		$('#lblFuelLocation').html("You can't leave this empty");
		$('#lblFuelLocation').css('display', 'block');
		bool = false;
	}
	if (valueNoOFGallons == "") {
		$('#lblP_NoOFGallons').html("You can't leave this empty");
		$('#lblP_NoOFGallons').css('display', 'block');
		bool = false;
	} else if (!isFloatNumber(valueNoOFGallons)) {
		$('#lblP_NoOFGallons').html("Please enter number only");
		$('#lblP_NoOFGallons').css('display', 'block');
		bool = false;
	} else if (obja2[0].length > 3) {
		$("#lblP_NoOFGallons").html("More than 3 digits are not allowed.");
		$('#lblP_NoOFGallons').css('display', 'block');
	} else if (obja2[0] <= 0) {
		$("#lblP_NoOFGallons").html("You can't enter the 0 Gallons");
		$('#lblP_NoOFGallons').css('display', 'block');
		bool = false;
	}
	var valueAmount = ($("#txtP_AmountInDollar").val()).trim();
	var splitAmount = valueAmount.split('$');
	var obja1 = splitAmount[1].split(".");
	if (splitAmount[1] == "" || splitAmount.length == 1) {
		$('#lblP_AmountInDollar').html("You can't leave this empty");
		$('#lblP_AmountInDollar').css('display', 'block');
		bool = false;
	} else if (!isFloatNumber(splitAmount[1])) {
		$('#lblP_AmountInDollar').html("Please enter number only");
		$('#lblP_AmountInDollar').css('display', 'block');
		bool = false;
	} else if (obja1[0].length > 8) {
		$('#lblP_AmountInDollar').html("More than 8 digits are not allowed");
		$('#lblP_AmountInDollar').css('display', 'block');
		bool = false;
	} else if (obja1[0] <= 0) {
		$('#lblP_AmountInDollar').html("You can't enter the 0 Dollars");
		$('#lblP_AmountInDollar').css('display', 'block');
		bool = false;
	}
	if (($("#hidP_FuelReciept").val() == "") && (($("#txtP_Description").val()).trim() == "")) {
		bool = false;
		navigator.notification.alert("Please capture the receipt Image using Camera symbol. If you don't have receipt then please select 'NO' option to enter the reason", alertDismissed, "Alert", "Ok");
	}
	return bool;
}

/******************* Buy Fuel Summary Details Ending *******************/

/******************* Create Trip Summary Details Starting *******************/
function startCreateTripPage() {
	$("#txtFromSteertAddress").val("");
	$("#txtFromCity").val("");
	$("#txtFromState").val("");
	$("#txtFromZipCode").val("");
	$('#lblFromSteertAddress').css('display', 'none');
	$('#lblFromCity').css('display', 'none');
	$('#lblFromState').css('display', 'none');
	$('#lblFromZipCode').css('display', 'none');

	$("#txtToSteertAddress").val("");
	$("#txtToCity").val("");
	$("#txtToState").val("");
	$("#txtToZipCode").val("");
	$('#lblToZipCode').css('display', 'none');

	$("#txtTruckID").val("");
	$("#txtOdometer").val("");
	$('#lblTruckID').css('display', 'none');
	$('#lblOdometer').css('display', 'none');

	$("#form_FromLocation").css("display", "block");
	$("#form_ToLocation").css("display", "none");
	$("#form_CreateTrip").css("display", "none");
	$("#divToAddress").css('display', 'block');
	$("#divToEndTrip").css('display', 'none');

	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = (month) + "/" + (day) + "/" + now.getFullYear();
	$('#txtCuDate').val(today);

	if (useToEndTripDiv == "yes") {
		$("#form_FromLocation").css("display", "none");
		$("#form_ToLocation").css("display", "block");
		$("#divToAddress").css('display', 'none');
		$("#divToEndTrip").css('display', 'block');
	} else {
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl + "TripService/ShowVehicleList?CreatedById=0&DriverId=" + JSON.parse(localStorage.DriverUserDetails).userid, {}, "json", C_TruckListSuccess, C_TruckListError);
	}
	useToEndTripDiv = "no";
}

function C_TruckListSuccess(res) {
	$('#ddlC_VehicleList').empty();
	var element = "<option id='-3'>--Select Vehicle Number--</option>";
	if (res.length) {
		$.each(res, function(index, value) {
			element += "<option id=" + value.ID + ">" + value.VehicleId + "</option>";
		});
	}
	$('#ddlC_VehicleList').append(element);
}

function C_TruckListError(res) { 
	if (res.statusText == "error" && res.responseText == "" && res.readyState == 0) {
		navigator.notification.alert("Please check your Internet connection", alertDismissed, "Alert", "Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time", alertDismissed, "Alert", "Ok");
	}
}


$('#ddlC_VehicleList').change(function() {
	$('#hidC_truckID').val($('#ddlC_VehicleList option:selected').attr("id"));

	if ($("#hidC_truckID").val() == "-3") {
		$('#lblC_VehicleList').html("Please select any one Vehicle.");
		$('#lblC_VehicleList').css('display', 'block');
		bool = false;
	} else {
		$('#lblC_VehicleList').css('display', 'none');
	}
});

$(".btnCreateBack").click(function() {
	if ($("#form_FromLocation").is(':visible')) {
		$("#divformCreateTrip").css('display', 'none');
		$("#divformMenuScreen").css('display', 'block');
	} else if ($("#form_ToLocation").is(':visible')) {
		$("#form_FromLocation").css("display", "block");
		$("#form_ToLocation").css("display", "none");
	} else if ($("#form_CreateTrip").is(':visible')) {
		$("#form_CreateTrip").css("display", "none");
		$("#form_ToLocation").css("display", "block");
	}

});

$("#form_FromLocation").submit(function(event) {
	event.preventDefault();
	if (validationFrom()) {
		$("#form_FromLocation").css('display', 'none');
		$("#form_ToLocation").css('display', 'block');
	}
});

$("#form_ToLocation").submit(function(event) {
	event.preventDefault();
	if (vaildationTo()) {
		$("#form_ToLocation").css('display', 'none');
		$("#form_CreateTrip").css('display', 'block');
	}
});

$("#form_CreateTrip").submit(function(event) {
	event.preventDefault();
	if (validationCreateTrip()) {
		$("#loader").css("display", "block");
		navigator.geolocation.getCurrentPosition(onSuccessCreateTrip, onError, {timeout: 5000 });
	}
});

function onSuccessCreateTrip(position) {
	localStorage["tripDetails"] = '{}';
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
	oTripdetails.oDriverID = JSON.parse(localStorage.DriverUserDetails).userid;
	oTripdetails.oTruckID = $("#hidC_truckID").val();
	oTripdetails.oTripId = "";
	oTripdetails.oSequenceId = 1;
	oTripdetails.oOdometerReading = $("#txtOdometer").val();
	oTripdetails.oStartingAddress = ($("#txtFromSteertAddress").val().trim() + " " + $("#txtFromCity").val().trim() + " " + $("#txtFromState").val().trim() + " " + $("#txtFromZipCode").val().trim()).trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	oTripdetails.oEndingAddress = ($("#txtToSteertAddress").val().trim() + " " + $("#txtToCity").val().trim() + " " + $("#txtToState").val().trim() + " " + $("#txtToZipCode").val().trim()).trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
	oTripdetails.oBuyFuel = "oBuyFuel";
	oTripdetails.oReceiptImage = null;
	oTripdetails.oMode = 2;
	oTripdetails.oFuelStation = null;
	oTripdetails.oNoOfGallons = null;
	oTripdetails.oTotalPrice = null;
	oTripdetails.oDateModified = new Date();
	localStorage["tripDetails"] = JSON.stringify(oTripdetails);
	insertTripDetailsinQuickTrip(JSON.parse(localStorage["tripDetails"]));
}

/******************* from validation *******************/

$("#txtFromSteertAddress").focus(function() {
	$('#lblFromSteertAddress').css('display', 'none');
});

$("#txtFromSteertAddress").blur(function() {
	if (($("#txtFromSteertAddress").val()).trim() == "") {
		$('#lblFromSteertAddress').html("You can't leave this empty");
		$('#lblFromSteertAddress').css('display', 'block');
	}
});

$("#txtFromCity").focus(function() {
	$('#lblFromCity').css('display', 'none');
});

$("#txtFromCity").blur(function() {
	if (($("#txtFromCity").val()).trim() == "") {
		$('#lblFromCity').html("You can't leave this empty");
		$('#lblFromCity').css('display', 'block');
	}
});

$("#txtFromState").focus(function() {
	$('#lblFromState').css('display', 'none');
});

$("#txtFromState").blur(function() {
	if (($("#txtFromState").val()).trim() == "") {
		$('#lblFromState').html("You can't leave this empty");
		$('#lblFromState').css('display', 'block');
	}
});

$("#txtFromZipCode").focus(function() {
	$('#lblFromZipCode').css('display', 'none');
});

$("#txtFromZipCode").blur(function() {
	if (($("#txtFromZipCode").val()).trim() == "") {
		$('#lblFromZipCode').html("You can't leave this empty");
		$('#lblFromZipCode').css('display', 'block');
	} else if (!isNumeric($("#txtFromZipCode").val())) {
		$("#lblFromZipCode").html("Please enter numbers only");
		$('#lblFromZipCode').css('display', 'block');
	}
});

function validationFrom() {
	var bool = true;
	if (($("#txtFromSteertAddress").val()).trim() == "") {
		$('#lblFromSteertAddress').html("You can't leave this empty");
		$('#lblFromSteertAddress').css('display', 'block');
		bool = false;
	}
	if (($("#txtFromCity").val()).trim() == "") {
		$('#lblFromCity').html("You can't leave this empty");
		$('#lblFromCity').css('display', 'block');
		bool = false;
	}
	if (($("#txtFromState").val()).trim() == "") {
		$('#lblFromState').html("You can't leave this empty");
		$('#lblFromState').css('display', 'block');
		bool = false;
	}
	if (($("#txtFromZipCode").val()).trim() == "") {
		$('#lblFromZipCode').html("You can't leave this empty");
		$('#lblFromZipCode').css('display', 'block');
		bool = false;
	} else if (!isNumeric($("#txtFromZipCode").val())) {
		$("#lblFromZipCode").html("Please enter numbers only");
		$('#lblFromZipCode').css('display', 'block');
		bool = false;
	}
	return bool;
}


$("#txtToZipCode").focus(function() {
	$('#lblToZipCode').css('display', 'none');
});

$("#txtToZipCode").blur(function() {
	if (!isNumeric($("#txtToZipCode").val()) && ($("#txtToZipCode").val()).trim() != "") {
		$("#lblToZipCode").html("Please enter numbers only");
		$('#lblToZipCode').css('display', 'block');
	}
});

function vaildationTo() {
	var bool = true;
	if (!isNumeric($("#txtToZipCode").val()) && ($("#txtToZipCode").val()).trim() != "") {
		$("#lblToZipCode").html("Please enter numbers only");
		$('#lblToZipCode').css('display', 'block');
		bool = false;
	}
	return bool;
}


$("#txtOdometer").focus(function() {
	$('#lblOdometer').css('display', 'none');
});

$("#txtOdometer").blur(function() {
	if (($("#txtOdometer").val()).trim() == "") {
		$('#lblOdometer').html("You can't leave this empty.");
		$('#lblOdometer').css('display', 'block');
	} else if (!isNumeric($("#txtOdometer").val())) {
		$("#lblOdometer").html("Please enter numbers only");
		$('#lblOdometer').css('display', 'block');
	}
});

function validationCreateTrip() {
	var bool = true;
	if ($("#hidC_truckID").val() == "-3") {
		$('#lblC_VehicleList').html("Please select any one Vehicle.");
		$('#lblC_VehicleList').css('display', 'block');
		bool = false;
	}
	if (($("#txtOdometer").val()).trim() == "") {
		$('#lblOdometer').html("You can't leave this empty");
		$('#lblOdometer').css('display', 'block');
		bool = false;
	} else if (!isNumeric($("#txtOdometer").val())) {
		$("#lblOdometer").html("Please enter numbers only");
		$('#lblOdometer').css('display', 'block');
		bool = false;
	}
	return bool;
}
/******************* Create Trip Summary Details Ending *******************/