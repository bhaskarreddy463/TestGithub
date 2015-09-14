/************* ViewUserProfile module Constructor******************/
function ViewUserProfile(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	this.init();
}

/************* ViewUserProfile module Prototype ******************/
ViewUserProfile.prototype = {
	init : function() {
		if (sessionStorage.UserProfileDetails != null) {
			var UserProfileDetails=JSON.parse(sessionStorage.UserProfileDetails);
				$("#lblUserName").html(UserProfileDetails.UserName);
				$("#lblUserID").html(UserProfileDetails.UserID);
				$("#lblEmailID").html(UserProfileDetails.EmailID);
				$("#lblPhoneNumber").html(UserProfileDetails.Phone1);
		}
	}
};

document.addEventListener("deviceready", onDeviceRed,false);
var watchID = null;
function onDeviceRed() {
	//var options = {timeout: 3000, enableHighAccuracy: true };	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    setInterval(function() {
		var options = {timeout: 3000, enableHighAccuracy: true };
        watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        //navigator.geolocation.watchPosition(onSuccess, onError, options);
	}, 30000);
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onSuccess(position) {
	$("#speedCheck").html("");
        var element = document.getElementById('speedCheck');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            'Speed: ' + position.coords.speed     + '<br />' +
                            'Altitude: ' + position.coords.altitude     + '<br />' +
                            'Accuracy: ' + position.coords.accuracy     + '<br />' +
                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy     + '<br />' +
                            'Heading: ' + position.coords.heading     + '<br />' +	
                            'Timestamp: ' + position.timestamp     + '<br />' +	
                            '<hr />'      + element.innerHTML;
    }
    
    function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

function onBackKeyDown(event) {
	//event.preventDefault();
	window.location="W_MenuScreen.html";
}

/************* HTML Click events ***************/
$("#lnkEditProfile").click(function() {
	var UserProfileDetails=JSON.parse(sessionStorage.UserProfileDetails);
	$("#divShowUserProfile").hide();
	$("#divEditUserProfile").show();
	$("#txtUserName").val(UserProfileDetails.UserName);
	$("#txtUserID").val(UserProfileDetails.UserID);
	$("#txtEmailID").val(UserProfileDetails.EmailID);
	$("#txtPhoneNo").val(UserProfileDetails.Phone1);
});

$("#btnBack").click(function(){
	window.location="W_MenuScreen.html";
});

$("#btnUpdateProfile").click(function(){
	
});

// var geolocationOptions={ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
// navigator.geolocation.watchPosition(geolocationSuccess,
                                                  // [geolocationError],
                                                  // [geolocationOptions]);
//                                                   
// function geolocationSuccess(position) {
    // alert('Latitude: '          + position.coords.latitude          + '\n' +
          // 'Longitude: '         + position.coords.longitude         + '\n' +
          // 'Altitude: '          + position.coords.altitude          + '\n' +
          // 'Accuracy: '          + position.coords.accuracy          + '\n' +
          // 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          // 'Heading: '           + position.coords.heading           + '\n' +
          // 'Speed: '             + position.coords.speed             + '\n' +
          // 'Timestamp: '         + position.timestamp                + '\n');
// }