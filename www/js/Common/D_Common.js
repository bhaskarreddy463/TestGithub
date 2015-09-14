/***************** global variables ****************/
var GlobalStateNames = [{
	"ID" : "AL",
	"StateName" : "Alabama"
}, {
	"ID" : "AK",
	"StateName" : "Alaska"
}, {
	"ID" : "AZ",
	"StateName" : "Arizona"
}, {
	"ID" : "AR",
	"StateName" : "Arkansas"
}, {
	"ID" : "CA",
	"StateName" : "California"
}, {
	"ID" : "CO",
	"StateName" : "Colorado"
}, {
	"ID" : "CT",
	"StateName" : "Connecticut"
}, {
	"ID" : "DE",
	"StateName" : "Delaware"
}, {
	"ID" : "DC",
	"StateName" : "District of Columbia"
}, {
	"ID" : "FL",
	"StateName" : "Florida"
}, {
	"ID" : "GA",
	"StateName" : "Georgia"
}, {
	"ID" : "HI",
	"StateName" : "Hawaii"
}, {
	"ID" : "ID",
	"StateName" : "Idaho"
}, {
	"ID" : "IL",
	"StateName" : "Illinois"
}, {
	"ID" : "IN",
	"StateName" : "Indiana"
}, {
	"ID" : "IA",
	"StateName" : "Iowa"
}, {
	"ID" : "KS",
	"StateName" : "Kansas"
}, {
	"ID" : "KY",
	"StateName" : "Kentucky"
}, {
	"ID" : "LA",
	"StateName" : "Louisiana"
}, {
	"ID" : "ME",
	"StateName" : "Maine"
}, {
	"ID" : "MD",
	"StateName" : "Maryland"
}, {
	"ID" : "MA",
	"StateName" : "Massachusetts"
}, {
	"ID" : "MI",
	"StateName" : "Michigan"
}, {
	"ID" : "MN",
	"StateName" : "Minnesota"
}, {
	"ID" : "MS",
	"StateName" : "Mississippi"
}, {
	"ID" : "MO",
	"StateName" : "Missouri"
}, {
	"ID" : "MT",
	"StateName" : "Montana"
}, {
	"ID" : "NE",
	"StateName" : "Nebraska"
}, {
	"ID" : "NV",
	"StateName" : "Nevada"
}, {
	"ID" : "NH",
	"StateName" : "New Hampshire"
}, {
	"ID" : "NJ",
	"StateName" : "New Jersey"
}, {
	"ID" : "NM",
	"StateName" : "New Mexico"
}, {
	"ID" : "NY",
	"StateName" : "New York"
}, {
	"ID" : "NC",
	"StateName" : "North Carolina"
}, {
	"ID" : "ND",
	"StateName" : "North Dakota"
}, {
	"ID" : "OH",
	"StateName" : "Ohio"
}, {
	"ID" : "OK",
	"StateName" : "Oklahoma"
}, {
	"ID" : "OR",
	"StateName" : "Oregon"
}, {
	"ID" : "PA",
	"StateName" : "Pennsylvania"
}, {
	"ID" : "RI",
	"StateName" : "Rhode Island"
}, {
	"ID" : "SC",
	"StateName" : "South Carolina"
}, {
	"ID" : "SD",
	"StateName" : "South Dakota"
}, {
	"ID" : "TN",
	"StateName" : "Tennessee"
}, {
	"ID" : "TX",
	"StateName" : "Texas"
}, {
	"ID" : "UT",
	"StateName" : "Utah"
}, {
	"ID" : "VT",
	"StateName" : "Vermont"
}, {
	"ID" : "VA",
	"StateName" : "Virginia"
}, {
	"ID" : "WA",
	"StateName" : "Washington"
}, {
	"ID" : "WV",
	"StateName" : "West Virginia"
}, {
	"ID" : "WI",
	"StateName" : "Wisconsin"
}, {
	"ID" : "WY",
	"StateName" : "Wyoming"
}, {
	"ID" : "AB",
	"StateName" : "Alberta"
}, {
	"ID" : "BC",
	"StateName" : "British Columbia"
}, {
	"ID" : "MB",
	"StateName" : "Manitoba"
}, {
	"ID" : "NB",
	"StateName" : "New Brunswick"
}, {
	"ID" : "NL",
	"StateName" : "Newfoundland and Labrador"
}, {
	"ID" : "NT",
	"StateName" : "Northwest Territories"
}, {
	"ID" : "NS",
	"StateName" : "Nova Scotia"
}, {
	"ID" : "NU",
	"StateName" : "Nunavut"
}, {
	"ID" : "ON",
	"StateName" : "Ontario"
}, {
	"ID" : "PE",
	"StateName" : "Prince Edward Island"
}, {
	"ID" : "QC",
	"StateName" : "Quebec"
}, {
	"ID" : "SK",
	"StateName" : "Saskatchewan"
}, {
	"ID" : "YT",
	"StateName" : "Yukon"
}];

var availableTags = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"];
var gasstationsAPI = "http://api.mygasfeed.com/stations/radius/";
var distance_ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=";
var distance_ApiKey = "&key=AIzaSyBI8P3Wv4f3P_CvBOzPENpOMWQozsMDpBA";
var globalValuesforInsert = {};
var ImageBase64 = null;
var buyFuel_Pdate = "";
var P_BuyFuelStateName = "";
var Gv_EndTrip = "no";
var GC_endTripAdress = "";
var IsRuningTimer = null;
var IsLogout="";					//taken the flag for the User Logout where running the trip.
var SetTimeInterval = ((JSON.parse(localStorage.DriverUserDetails).GetSetTimeInterval == undefined) && (JSON.parse(localStorage.DriverUserDetails).GetSetTimeInterval == null)) ? 300000 : JSON.parse(localStorage.DriverUserDetails).GetSetTimeInterval;
var db1 = window.openDatabase("dbiftrak", "1.0", "PhoneGap TFTRAK", 1000000);
if (localStorage.DriverTripDetails == undefined) {
	localStorage.DriverTripDetails = '{}';
}

/////////////////Start Error Log Work/////////


/*var testLattLong=[{"latitude":34.043205,"longitude":-117.2517086},  
{"latitude":34.3379842,"longitude":-117.4703618},
{"latitude":34.3198921,"longitude":-117.4686651},
{"latitude":34.643756,"longitude":-117.2207018},
{"latitude":34.91653581,"longitude":-116.77799966},
{"latitude":35.3034224,"longitude":-116.0145494},
{"latitude":35.4127924,"longitude":-115.7629534},   
{"latitude":33.8093845,"longitude":-118.1931368},
{"latitude":35.61137963,"longitude":-115.38614612}, 
{"latitude":35.8616345,"longitude":-115.2536007},   
{"latitude":36.3401779,"longitude":-114.9163974},
{"latitude":36.8036653,"longitude":-114.097634},
{"latitude":36.812858,"longitude":-114.0602271},    
{"latitude":36.92069176,"longitude":-113.85944965},  
{"latitude":36.98675306,"longitude":-113.63192497}, 
{"latitude":37.0598865,"longitude":-113.5820572}];
var testCount=0;*/
/////////////////////////////

function fnErrorLog(errmsg, errdesc) {
	var oTripdetails = localStorage["tripDetails"]==undefined?{}:JSON.parse(localStorage["tripDetails"]);
	objErrorDetail.errDate = getHourMin();
	objErrorDetail.errMsg = errmsg;
	objErrorDetail.errDesc = oTripdetails.oTripId==undefined?"":oTripdetails.oTripId+"::"+errdesc;
	if (localStorage.ErrorLog == undefined) {
		var arrErrorLog = [];
		arrErrorLog.push(objErrorDetail);
		localStorage.ErrorLog = JSON.stringify(arrErrorLog);
	} else {
		var strErrorLog = JSON.parse(localStorage.ErrorLog);
		strErrorLog.push(objErrorDetail);
		localStorage.ErrorLog = JSON.stringify(strErrorLog);
	}

}

function sendLog() {
	if (localStorage.ErrorLog != undefined) {
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/ErrorMessage", {
			'errLog' : localStorage.ErrorLog
		}, "json", sendLogSuccess, sendLogError);
	} else {
		alert("No error log found");
	}
}

function sendLogSuccess() {
	alert("Error log sent successfully");
	localStorage.removeItem("ErrorLog");
}

function sendLogError() {
	alert("Some error occured");
}

/////////////////End Error Log Work/////////


document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	document.addEventListener("offline", onOffline, false);
	// Listener called when device goes offline.
	document.addEventListener("online", onOnline, false);
    //document.addEventListener("resume", onResume, false);
	// Listener called when device comes online.
	backEndprocess();
	checkConnection();
	if((navigator.connection.type == "none")){
		$("#P_MsgOffline").css("display","block");
	} else {
		$("#P_MsgOffline").css("display","none");
	}
	
	if (localStorage.tripDetails != undefined) {
		var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
		var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		var data = [];
		var obj = {};
		obj.DriverId = oTripdetails.oDriverID;
		obj.TruckID = oTripdetails.oTruckID;
		obj.TripId = oTripdetails.oTripId;
		obj.Mode = oTripdetails.oMode;
		obj.SequenceId = oTripdetails.oSequenceId + 1;
		obj.State = oDriverTripDetails.StateName;
		obj.Address = oDriverTripDetails.CurrentAddress;
	    obj.TotalDistance = ((Number(oDriverTripDetails.distanceTravelled) / 1000) / 1.609344).toFixed(2);
		obj.CreatedDate = new Date();
		obj.Start_Latitude = oDriverTripDetails.Changelatlang.latitude;
		obj.End_Longitude = oDriverTripDetails.Changelatlang.longitude;
		obj.ReuiredTripID = false;
		data.push(obj);
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
			'lit_DriveDetails' : JSON.stringify(data)
		}, "json", StateChangeSuccess, StateChangeError);
		runTimeInterval();
		setTimeout(function(){
			runTimeIntervalNoWatcher();
		},10000);
	} else {
	    navigator.geolocation.clearWatch(watchID);
	}
}


function onOffline() {
	$("#P_MsgOffline").css("display","block");
}

function onOnline() {
$("#P_MsgOffline").css("display","none");
 if (localStorage.tripDetails != undefined) {
		var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
		var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		var data = [];
		var obj = {};
		obj.DriverId = oTripdetails.oDriverID;
		obj.TruckID = oTripdetails.oTruckID;
		obj.TripId = oTripdetails.oTripId;
		obj.Mode = oTripdetails.oMode;
		obj.SequenceId = oTripdetails.oSequenceId + 1;
		obj.State = oDriverTripDetails.StateName;
		obj.Address = oDriverTripDetails.CurrentAddress;
	    obj.TotalDistance = ((Number(oDriverTripDetails.distanceTravelled) / 1000) / 1.609344).toFixed(2);
		obj.CreatedDate = new Date();
		obj.Start_Latitude = oDriverTripDetails.Changelatlang.latitude;
		obj.End_Longitude = oDriverTripDetails.Changelatlang.longitude;
		obj.ReuiredTripID = false;
		data.push(obj);
		Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
			'lit_DriveDetails' : JSON.stringify(data)
		}, "json", StateChangeSuccess, StateChangeError);
	}
}

function backEndprocess() {
	cordova.plugins.backgroundMode.setDefaults({
		text : 'Doing heavy tasks.'
	});
	// Enable background mode
	cordova.plugins.backgroundMode.enable();
	// Called when background mode has been activated
	cordova.plugins.backgroundMode.onactivate = function() {
		setTimeout(function() {
			// Modify the currently displayed notification
			cordova.plugins.backgroundMode.configure({
				text : 'IFTRAK is recording location in background.'
			});
		}, 500);
	};
}

function onResume() {
    if (localStorage.tripDetails != undefined) {
        if($("#divformTripDetails").is(":visible") == true )
        {
            showTripDetails(false);
        }
    }
}

function checkConnection() {
	var networkState = navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.CELL] = 'Cell generic connection';
	states[Connection.NONE] = 'No network connection';
}


$("input").change(function() {
	if (!($(this).context.type == "number"))
		$(this).val($(this).val().trim());
});

// set time interval occur in every 5 mins to calculate the distance

var watchID = null;
function runTimeInterval() {                    
    if (localStorage.tripDetails != undefined) {
        watchId= navigator.geolocation.watchPosition(watchOnSuccess, onErrorNoAlert);
    }
}

function runTimeIntervalNoWatcher() {
    if(IsRuningTimer==null){
       IsRuningTimer = setInterval(function() {
         if (localStorage.tripDetails != undefined) {
           	 onSuccessInterval();
          }
        }, SetTimeInterval);
    }
}

var GlobalVarLatLong= {};
GlobalVarLatLong.latitude=0;
GlobalVarLatLong.longitude=0;
function watchOnSuccess(position){
    GlobalVarLatLong.latitude=position.coords.latitude;
    GlobalVarLatLong.longitude=position.coords.longitude;
    //fnErrorLog("watchOnSuccess::"+JSON.stringify(GlobalVarLatLong) , "position");
}

function insertTripDetailsinQuickTrip(globalValuesforInsert) {
	try {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	} catch(err) {
		fnErrorLog("insertTripDetailsinQuickTrip"+err.message , "");
	}
}

function setGlobalValuesOnce(imagedata, P_date, FuelStateName) {
	ImageBase64 = imagedata;
	buyFuel_Pdate = P_date;
	P_BuyFuelStateName = FuelStateName;
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	//onSuccess(testLattLong[testCount]);
	$("#loader").css("display", "block");
}

function endTripfn() {
	Gv_EndTrip = "yes"; 
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	//onSuccess(testLattLong[testCount]);
	$("#loader").css("display", "block");
}

/************ onSuccess to get the new latitude and longitude **************/
function onSuccess(position) {
	try {
		if (localStorage.DriverTripDetails == undefined) {
			localStorage.DriverTripDetails = '{}';
		}
		fnErrorLog("Current position coords:lat "+position.coords.latitude+"long: "+position.coords.longitude , "coords");
		var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
		if (oDriverTripDetails.Startlatlang == undefined) {
			oDriverTripDetails.Startlatlang = {latitude : position.coords.latitude,longitude : position.coords.longitude};
			oDriverTripDetails.Changelatlang = {latitude : position.coords.latitude,longitude : position.coords.longitude};
			oDriverTripDetails.Endlatlang = {};
		} else {
			oDriverTripDetails.Endlatlang = {latitude : position.coords.latitude,longitude : position.coords.longitude};
		}
		if(oDriverTripDetails.oChangeLatLangTime == undefined){
			oDriverTripDetails.oChangeLatLangTime = getHourMin();
		}
		localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
		fnErrorLog("oDriverTripDetails" + localStorage.DriverTripDetails, "bb");
		if ((oDriverTripDetails.Changelatlang.latitude != undefined && oDriverTripDetails.Endlatlang.latitude != undefined) || (Gv_EndTrip == "yes") || (ImageBase64 != null)) {
			fnErrorLog("InfirstReverse:", "yy");
			var distance = calcDistance(oDriverTripDetails.Changelatlang.latitude, oDriverTripDetails.Changelatlang.longitude, oDriverTripDetails.Endlatlang.latitude, oDriverTripDetails.Endlatlang.longitude);
			if (((Number(distance) >= 1600)&&(CheckDistance(distance,oDriverTripDetails.oChangeLatLangTime))) || (Gv_EndTrip == "yes") || (ImageBase64 != null)) {
					ReverseGeocode(oDriverTripDetails.Endlatlang.latitude, oDriverTripDetails.Endlatlang.longitude);
			}
		} else if ((oDriverTripDetails.Changelatlang.latitude != undefined && oDriverTripDetails.Endlatlang.latitude == undefined)) {
					ReverseGeocode(oDriverTripDetails.Changelatlang.latitude, oDriverTripDetails.Changelatlang.longitude);
		}
	} catch(e) {
		fnErrorLog("Error in on success for SetInterval geolocation: " + e.message, "D_Common line no 384");
	}
}

function onSuccessInterval(){
    try {
        if (localStorage.DriverTripDetails == undefined) {
            localStorage.DriverTripDetails = '{}';
        }
        fnErrorLog("GlobalVarLatLong.latitude::"+GlobalVarLatLong.latitude+":GlobalVarLatLong.latitude:"+GlobalVarLatLong.longitude , "GlobalVarLatLong");
        var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
        if(Number(GlobalVarLatLong.latitude)>0){
            oDriverTripDetails.Endlatlang = {latitude : GlobalVarLatLong.latitude,longitude : GlobalVarLatLong.longitude};
        if(oDriverTripDetails.oChangeLatLangTime == undefined){
            oDriverTripDetails.oChangeLatLangTime = getHourMin();
        }
        localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
        fnErrorLog("onSuccessInterval:12" + localStorage.DriverTripDetails, "bb");
        if ((oDriverTripDetails.Changelatlang.latitude != undefined && oDriverTripDetails.Endlatlang.latitude != undefined) || (Gv_EndTrip == "yes") || (ImageBase64 != null)) {
            fnErrorLog("onSuccessInterval:InfirstReverse:", "cc");
            var distance = calcDistance(oDriverTripDetails.Changelatlang.latitude, oDriverTripDetails.Changelatlang.longitude, oDriverTripDetails.Endlatlang.latitude, oDriverTripDetails.Endlatlang.longitude);
            fnErrorLog("onSuccessInterval:distance:"+distance, "dd");
            if (((Number(distance) >= 1600)&&(CheckDistance(distance,oDriverTripDetails.oChangeLatLangTime))) || (Gv_EndTrip == "yes") || (ImageBase64 != null)) {
            	fnErrorLog("distance in if condition", "enter");
                ReverseGeocode(oDriverTripDetails.Endlatlang.latitude, oDriverTripDetails.Endlatlang.longitude);
            }
        }
        }
    } catch(e) {
        fnErrorLog("Error in on success for SetInterval geolocation: " + e.message, "D_Common line no 384");
    }
    
}

function CheckDistance(distance,previousTime){
		var newTime=new Date(getHourMin());
		var oldTime=new Date(previousTime);
		var diffMin=(((newTime-oldTime)/1000)/60).toFixed(0);
		fnErrorLog("CheckDistance::"+diffMin+" ::distance:"+distance, "yy:"+newTime+":"+oldTime);
		if(Number(diffMin) <= 20 && Number(distance).toFixed(0) >= 80467) {
			return false;
		}
		return true;
}

function onError(PositionError) {
	ImageBase64 = null;
	buyFuel_Pdate = "";
	P_BuyFuelStateName = "";
	$("#loader").css("display", "none");
	fnErrorLog("Error Geolocation: " + PositionError.message, PositionError.code);
	navigator.notification.alert("Please turn on the location services", alertDismissed, "Alert", "Ok");
}

function onErrorNoAlert(PositionError) {
	$("#loader").css("display", "none");
	fnErrorLog("onErrorNoAlert Geolocation: " + PositionError.message, PositionError.code);
}

/************ call_DistanceAPI to calculate the distance **************/
function call_DistanceAPI(s_lat, s_long, e_lat, e_long, isStateChange) {
	var result = null;
	var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
	fnErrorLog("oDriverTripDetails" + localStorage.DriverTripDetails, "yy");
	var distance = calcDistance(s_lat, s_long, e_lat, e_long);
	if ((distance >= 1600) && (CheckDistance(distance,oDriverTripDetails.oChangeLatLangTime))){
		if (oDriverTripDetails.distanceTravelled == undefined) {
			oDriverTripDetails.distanceTravelled = Number(distance);
		} else {
			oDriverTripDetails.distanceTravelled = Number(oDriverTripDetails.distanceTravelled) + Number(distance);
			fnErrorLog("Distance travelled for AJAX " + oDriverTripDetails.distanceTravelled, " s_lat " + s_lat + " s_long " + s_long + " e_lat " + e_lat + " e_long " + e_long);
		}
		oDriverTripDetails.oChangeLatLangTime = getHourMin();
		oDriverTripDetails.Changelatlang.latitude = oDriverTripDetails.Endlatlang.latitude;
		oDriverTripDetails.Changelatlang.longitude = oDriverTripDetails.Endlatlang.longitude;
		oDriverTripDetails.Endlatlang = {};
		localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
		fnErrorLog("oDriverTripDetails" + localStorage.DriverTripDetails, "zzz");
		//fnErrorLog("oTripdetails:" + localStorage.tripDetails, "trip");
		if ((navigator.connection.type == "none") && localStorage.TripFuelDetails != undefined) {
			fnErrorLog("navigator.connection.type2", "none2");
				var oTripFuelDetails=JSON.parse(localStorage.TripFuelDetails);
				//var tripDetails = oTripFuelDetails.length > 1 ? oTripFuelDetails.filter(searchFnTripDetails) : oTripFuelDetails;
					for (var i = 0; i < oTripFuelDetails.length; i++) {
						if (oTripFuelDetails[i].SequenceId==oTripdetails.oSequenceId) {
						fnErrorLog("navigator.connection.type", "none");
							oTripFuelDetails[i].TotalDistance = Number(((Number(oDriverTripDetails.distanceTravelled) / 1000) / 1.609344).toFixed(2));
						}
					}
				StartTripDetailsSuccess(oTripFuelDetails);
		} else if (Gv_EndTrip == "no") {
			fnErrorLog("Gv_EndTrip", "ww");
			var data = [];
			var obj = {};
			obj.DriverId = oTripdetails.oDriverID;
			obj.TruckID = oTripdetails.oTruckID;
			obj.TripId = oTripdetails.oTripId;
			obj.Mode = oTripdetails.oMode;
			obj.SequenceId = oTripdetails.oSequenceId + 1;
			obj.State = oDriverTripDetails.StateName;
			obj.Address = oDriverTripDetails.CurrentAddress;
            obj.TotalDistance = ((Number(oDriverTripDetails.distanceTravelled) / 1000) / 1.609344).toFixed(2);
			obj.CreatedDate = new Date();
			obj.Start_Latitude = e_lat;
			obj.End_Longitude = e_long;
			obj.ReuiredTripID = false;
			data.push(obj);
			Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
				'lit_DriveDetails' : JSON.stringify(data)
			}, "json", StateChangeSuccess, StateChangeError);
		} else if (Gv_EndTrip == "yes") { 
			var data = [];
			var obj = {};
			obj.DriverId = oTripdetails.oDriverID;
			obj.TruckID = oTripdetails.oTruckID;
			obj.TripId = oTripdetails.oTripId;
			obj.Mode = "4";
			obj.SequenceId = oTripdetails.oSequenceId + 1;
			obj.State = oDriverTripDetails.StateName;
			obj.Address = oDriverTripDetails.CurrentAddress;
			obj.ToAddress = ((oTripdetails.oEndingAddress).trim() == "") ? GC_endTripAdress : oTripdetails.oEndingAddress;
			obj.TotalDistance = ((Number(oDriverTripDetails.distanceTravelled) / 1000) / 1.609344).toFixed(2);
			obj.CreatedDate = new Date();
			obj.Start_Latitude = e_lat;
			obj.End_Longitude = e_long;
			obj.ReuiredTripID = false;
			data.push(obj);
			Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
				'lit_DriveDetails' : JSON.stringify(data)
			}, "json", EndTripSuccess, EndTripError);
		}
	} else if (Gv_EndTrip == "yes") {
		if (oDriverTripDetails.distanceTravelled == undefined) {
			oDriverTripDetails.distanceTravelled = Number(distance);
		} else {
			oDriverTripDetails.distanceTravelled = Number(oDriverTripDetails.distanceTravelled) + Number(distance);
		}
			var data = [];
			var obj = {};
			obj.DriverId = oTripdetails.oDriverID;
			obj.TruckID = oTripdetails.oTruckID;
			obj.TripId = oTripdetails.oTripId;
			obj.Mode = "4";
			obj.SequenceId = oTripdetails.oSequenceId + 1;
			obj.State = oDriverTripDetails.StateName;
			obj.Address = oDriverTripDetails.CurrentAddress;
			obj.ToAddress = ((oTripdetails.oEndingAddress).trim() == "") ? GC_endTripAdress : oTripdetails.oEndingAddress;
			obj.TotalDistance = ((Number(oDriverTripDetails.distanceTravelled) / 1000) / 1.609344).toFixed(2);
			obj.CreatedDate = new Date();
			obj.Start_Latitude = e_lat;
			obj.End_Longitude = e_long;
			obj.ReuiredTripID = false;
			data.push(obj);
			Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
				'lit_DriveDetails' : JSON.stringify(data)
			}, "json", EndTripSuccess, EndTripError);
	}
}

$("#D_logout").click(function() {
	$("#sideMenubtn").removeClass("dl-active");
	$("#ulsideMenu").removeClass("dl-menuopen");
	if (localStorage.tripDetails != undefined && JSON.parse(localStorage.tripDetails).oDriverID != undefined && JSON.parse(localStorage.tripDetails).oDriverID != null) {
		navigator.notification.confirm("Your Trip is running do you want to close it?", onConfirm, 'Confirm', 'YES,NO');
		function onConfirm(res) {
			if (res == 1) {
				IsLogout="YesLogout";
				if (JSON.parse(localStorage["tripDetails"]).oEndingAddress == "") {
					$("#divformMenuScreen").css('display', 'none');
					$("#divformQuickTrip").css('display', 'none');
					$("#divformTripDetails").css('display', 'none');
					$("#divEditFuelSummary").css('display', 'none');
					$("#divformBuyFuelDetails").css('display', 'none');
					$("#divEditTripSummary").css('display', 'none');
					$("#divformCreateTrip").css('display', 'block');
					useToEndTripDiv = "yes";
					startCreateTripPage();
				} else {
					endTripfn();
				}
			} else {
				IsLogout="";
			}
		}	
	} else {
		var oDriverUserDetails = JSON.parse(localStorage.DriverUserDetails);
		oDriverUserDetails.isLogin = false;
		localStorage.DriverUserDetails = JSON.stringify(oDriverUserDetails);
		window.location = "LoginAs.html";
	}
});

/************ ReverseGeocode to get the User location address **************/
var city, region, country;

function ReverseGeocode(latitude, longitude) {
	var resStateName = null;
	var Address = null;
	fnErrorLog("ReverseGeocode:start", "Start");
	//if ((navigator.connection.type != "none")||true) {
		var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
		if ((navigator.connection.type == "none") && localStorage.TripFuelDetails != undefined) {
			fnErrorLog("navigator.connection.type1", "none1");
				call_DistanceAPI(oDriverTripDetails.Changelatlang.latitude, oDriverTripDetails.Changelatlang.longitude, oDriverTripDetails.Endlatlang.latitude, oDriverTripDetails.Endlatlang.longitude);
		} else {
			var reverseGeocoder = new google.maps.Geocoder();
			var currentPosition = new google.maps.LatLng(latitude, longitude);
			reverseGeocoder.geocode({
				'latLng' : currentPosition
			}, function(results, status) {
				try {
					//var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
					//Chnaged to avoid setting undefined in Address
					var oTripdetails = JSON.parse(localStorage["tripDetails"]);
					if (status == google.maps.GeocoderStatus.OK) {
						if (results != null && results[0]) {
							Address = results[0].formatted_address;
							oDriverTripDetails.CurrentAddress = Address;
							if (results[0].address_components != undefined) {
								for (var i = 0; i < results[0].address_components.length; i++) {
									if (results[0].address_components[i].types[0] == "administrative_area_level_1") {
										region = results[0].address_components[i];
										resStateName = region.short_name;
										break;
									}
								}
							}
							fnErrorLog("reverse geocode state: " +resStateName, "address: " + Address);
						} else {
							fnErrorLog("Error in results: " + JSON.stringify(results), "status:" + status);
						}
					} else {
						fnErrorLog("Error in Reverse Geocode 2 / Status " + status, "D_Common line no 549");
					}
					GC_endTripAdress = Address == null ? "Unable to get address" : Address;
					localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
					if (oDriverTripDetails.StateName == undefined && resStateName != null) {
						oDriverTripDetails.StateName = resStateName;
						if (oTripdetails.oMode == 1) {
							var data = [];
							var obj = {};
							obj.DriverId = oTripdetails.oDriverID;
							obj.TruckID = oTripdetails.oTruckID;
							obj.TripId = oTripdetails.oTripId;
							obj.OdometerReading = oTripdetails.oOdometerReading;
							obj.Mode = oTripdetails.oMode;
							obj.State = resStateName;
							obj.Address = Address;
							obj.TotalDistance = "0";
							obj.SequenceId = 1;
							obj.CreatedDate = new Date();
							obj.Start_Latitude = latitude;
							obj.End_Longitude = longitude;
							obj.ReuiredTripID = true;
							data.push(obj);
							Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
								'lit_DriveDetails' : JSON.stringify(data)
							}, "json", QuickTripSucces, QuickTripError);
						} else if (oTripdetails.oMode == 2) {
							var data = [];
							var obj = {};
							obj.DriverId = oTripdetails.oDriverID;
							obj.TruckID = oTripdetails.oTruckID;
							obj.TripId = oTripdetails.oTripId;
							obj.OdometerReading = oTripdetails.oOdometerReading;
							obj.Mode = oTripdetails.oMode;
							obj.State = resStateName;
							obj.Address = oTripdetails.oStartingAddress;
							obj.ToAddress = oTripdetails.oEndingAddress;
							obj.TotalDistance = "0";
							obj.SequenceId = 1;
							obj.CreatedDate = new Date();
							obj.Start_Latitude = latitude;
							obj.End_Longitude = longitude;
							obj.ReuiredTripID = true;
							data.push(obj);
							Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
								'lit_DriveDetails' : JSON.stringify(data)
							}, "json", CreateTripSucces, CreateTripError);
						}
						localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
					} else if (ImageBase64 != null) {
						var data = [];
						var obj = {};
						obj.DriverId = oTripdetails.oDriverID;
						obj.TruckID = oTripdetails.oTruckID;
						obj.TripId = oTripdetails.oTripId;
						obj.FuelLocation = oTripdetails.oFuelStation;
						obj.FuelReciept = ImageBase64;
						obj.AmountInDollar = oTripdetails.oTotalPrice;
						obj.NoOFGallons = oTripdetails.oNoOfGallons;
						obj.Mode = "3";
						obj.SequenceId = 0;
						obj.State = P_BuyFuelStateName == "" ? oDriverTripDetails.StateName : P_BuyFuelStateName;
						obj.Address = oDriverTripDetails.CurrentAddress;
						obj.TotalDistance = 0.0;
						obj.CreatedDate = buyFuel_Pdate != "" ? buyFuel_Pdate : new Date();
						obj.Start_Latitude = latitude;
						obj.End_Longitude = longitude;
						obj.ReuiredTripID = false;
						data.push(obj);
						Globalcontrollerref.myControllers.insControllerfnAjaxCall.backEndAjaxCall("POST", ServiceUrl + "TripService/InsertDriveDetails", {
							'lit_DriveDetails' : JSON.stringify(data)
						}, "json", BuyFuelSuccess, BuyFuelError);
					} else if((oDriverTripDetails.Changelatlang.latitude != undefined && oDriverTripDetails.Endlatlang.latitude != undefined)){
						if (resStateName != null && oDriverTripDetails.StateName != resStateName) {//resStateName != null &&  // arvind
							oDriverTripDetails.StateName = resStateName;
							oDriverTripDetails.distanceTravelled = 0;
						}
						localStorage.DriverTripDetails = JSON.stringify(oDriverTripDetails);
						call_DistanceAPI(oDriverTripDetails.Changelatlang.latitude, oDriverTripDetails.Changelatlang.longitude, oDriverTripDetails.Endlatlang.latitude, oDriverTripDetails.Endlatlang.longitude);
					} else {
						navigator.notification.alert("Some error occurred. Please retry after some time", function() {
							$("#loader").css("display", "none");
						}, "Alert", "Ok");
					}
				} catch(e) {
					fnErrorLog("Error in catch block  Reverse Geocode 3 " + e.message, "D_Common line no 635");
					$("#loader").css("display", "none");
					if (Gv_EndTrip == "yes") {
						navigator.notification.alert("Some error occurred. Please retry after some time", function() {
							$("#loader").css("display", "none");
						}, "Alert", "Ok");
					}
					ImageBase64 = null;
					buyFuel_Pdate = "";
					P_BuyFuelStateName = "";
				}
			});
			
		}
	// } else {
		// ImageBase64 = null;
		// buyFuel_Pdate = "";
		// P_BuyFuelStateName = "";
		// fnErrorLog("Please check you network error", "D_Common line no 655");
		// navigator.notification.alert("Please check your network", function() {
			// $("#loader").css("display", "none");
		// }, "Alert", "Ok");
	// }
}

function alertDismissed() {

}

function QuickTripSucces(res) {
	if (res.success && res.result.isTrip != null) {
		$("#loader").css("display", "none");
		$("#divformTripDetails").css('display', 'block');
		$("#divformQuickTrip").css('display', 'none');
		runTimeInterval();
		setTimeout(function(){
			runTimeIntervalNoWatcher();
		},10000);
		var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		oTripdetails.oTripId = res.result.isTrip;
		oTripdetails.oSequenceId = res.result.SequenceId;
		oTripdetails.oUpdatedDate = getDateTime();
		localStorage["tripDetails"] = JSON.stringify(oTripdetails);
		showTripDetails(false);
	} else {
		localStorage.removeItem("tripDetails");
		localStorage.removeItem("DriverTripDetails");
		navigator.notification.alert("Some error occurred. Please retry after some time", function() {
			$("#loader").css("display", "none");
		}, "Alert", "Ok");
	}
}

function QuickTripError(res) {
	navigator.notification.alert("Some error occurred. Please retry after some time", function() {
		$("#loader").css("display", "none");
	}, "Alert", "Ok");
}

function CreateTripSucces(res) {
	if (res.success && res.result.isTrip != null) {
		$("#loader").css("display", "none");
		$("#divformTripDetails").css('display', 'block');
		$("#divformCreateTrip").css('display', 'none');
		runTimeInterval();
        runTimeInterval();
		setTimeout(function(){
			runTimeIntervalNoWatcher();
		},10000);
		var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		oTripdetails.oTripId = res.result.isTrip;
		oTripdetails.oSequenceId = res.result.SequenceId;
		oTripdetails.oUpdatedDate = getDateTime();
		localStorage["tripDetails"] = JSON.stringify(oTripdetails);
		showTripDetails(false);
	} else {
		localStorage.removeItem("tripDetails");
		localStorage.removeItem("DriverTripDetails");
		navigator.notification.alert("Some error occurred. Please retry after some time", function() {
			$("#loader").css("display", "none");
		}, "Alert", "Ok");
	}
}

function CreateTripError(res) {
	navigator.notification.alert("Some error occurred. Please retry after some time", function() {
		$("#loader").css("display", "none");
	}, "Alert", "Ok");
}

function BuyFuelSuccess(res) {
	if (res.success) {
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
			ImageBase64 = null;
			$("#loader").css("display", "none");
			$("#divformTripDetails").css('display', 'block');
			$("#divformBuyFuelDetails").css('display', 'none');
			var oTripdetails = JSON.parse(localStorage["tripDetails"]);
			var localTripdetails = JSON.parse(localStorage.DriverTripDetails);
			if (localTripdetails.BuyFuelDetailsList == undefined) {
				localTripdetails.BuyFuelDetailsList = [];
			}
			var objBuyFuelDetails = {};
			objBuyFuelDetails.oFuelStation = oTripdetails.oFuelStation;
			objBuyFuelDetails.oNoOfGallons = oTripdetails.oNoOfGallons;
			objBuyFuelDetails.oTotalPrice = oTripdetails.oTotalPrice;
			localTripdetails.BuyFuelDetailsList.push(objBuyFuelDetails);
			localStorage.DriverTripDetails = JSON.stringify(localTripdetails);
			showTripDetails(false);
		}
	} else {
		ImageBase64 = null;
		navigator.notification.alert("Some error occurred. Please retry after some time", function() {
			$("#loader").css("display", "none");
		}, "Alert", "Ok");
	}
}

function BuyFuelError(res) {
	ImageBase64 = null;
	buyFuel_Pdate = "";
	P_BuyFuelStateName = "";
	navigator.notification.alert("Some error occurred. Please retry after some time", function() {
		$("#loader").css("display", "none");
	}, "Alert", "Ok");
}

function StateChangeSuccess(res) { 
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
		fnErrorLog("StateChangeSuccess::" + JSON.stringify(res), "ww");
		var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		oTripdetails.oSequenceId = res.result.SequenceId;
		oTripdetails.oUpdatedDate = getDateTime();
		localStorage["tripDetails"] = JSON.stringify(oTripdetails);
		showTripDetails(true);
	}
	
}

function StateChangeError(res) {
	var oTripFuelDetails=JSON.parse(localStorage.TripFuelDetails);
	var oDriverTripDetails = JSON.parse(localStorage.DriverTripDetails);
	var oTripdetails = JSON.parse(localStorage["tripDetails"]);
		for (var i = 0; i < oTripFuelDetails.length; i++) {
			if (oTripFuelDetails[i].SequenceId==oTripdetails.oSequenceId) {
				oTripFuelDetails[i].TotalDistance=Number(((Number(oDriverTripDetails.distanceTravelled) / 1000) / 1.609344).toFixed(2));
			}
		}
	StartTripDetailsSuccess(oTripFuelDetails);
	fnErrorLog("StateChangeError", "ww");
}

function EndTripSuccess(res) {
	if (res.success) {
		navigator.notification.alert("Successfully ended the trip.", function() {
			$("#loader").css("display", "none");
		}, "Alert", "Ok");
		$("#divformTripDetails").css('display', 'none');
		$("#divformMenuScreen").css('display', 'block');
		$("#divformCreateTrip").css('display', 'none');
		clearTimeout(IsRuningTimer);
        navigator.geolocation.clearWatch(watchID);
		Gv_EndTrip = "no";
		localStorage.removeItem("tripDetails");
		localStorage.removeItem("DriverTripDetails");
		localStorage.removeItem("TripFuelDetails");
		if(IsLogout=="YesLogout"){
			var oDriverUserDetails = JSON.parse(localStorage.DriverUserDetails);
			oDriverUserDetails.isLogin = false;
			localStorage.DriverUserDetails = JSON.stringify(oDriverUserDetails);
			window.location = "LoginAs.html";
			IsLogout="";
		}
	} else {
		Gv_EndTrip = "no";
		navigator.notification.alert("Some error occurred. Please retry after some time", function() {
			$("#loader").css("display", "none");
		}, "Alert", "Ok");
	}
}

function EndTripError(res) {
	Gv_EndTrip = "no";
	navigator.notification.alert("Some error occurred. Please retry after some time", function() {
		$("#loader").css("display", "none");
	}, "Alert", "Ok");
}

function getDateTime() {
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var hours = ("0" + (now.getHours() > 12 ? now.getHours() - 12 : now.getHours())).slice(-2);
	var minutes = ("0" + now.getMinutes()).slice(-2);
	var ampm = now.getHours() > 12 ? "PM" : "AM";
	return (month) + "/" + (day) + "/" + now.getFullYear() + " " + hours + ":" + minutes + " " + ampm;
}

function getHourMin(){
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var hours = ("0" + now.getHours()).slice(-2);
	var minutes = ("0" + now.getMinutes()).slice(-2);
	var seconds=("0" +now.getSeconds()).slice(-2);
	return (month) + "/" + (day) + "/" + now.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
}

function calcDistance(lat1, lon1, lat2, lon2) {
	var R = 6371000;
	// meter
	var dLat = toRad(lat2 - lat1);
	var dLon = toRad(lon2 - lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
	return Value * Math.PI / 180;
}