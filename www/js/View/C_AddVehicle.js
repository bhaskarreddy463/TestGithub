var AddVehicleControllerRef=null;
/************* ViewCompanyAddVehicle module Constructor******************/
function ViewCompanyAddVehicle(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	AddVehicleControllerRef = this.controllerRef;
 	if(sessionStorage.CompanyUserDetails != null){
		$("#hidCompanyUserID").val(JSON.parse(sessionStorage.CompanyUserDetails).CompanyID);
	}
	if(sessionStorage.editVehicleDetails != null){
		this.bindElementsinEditmode(JSON.parse(sessionStorage.editVehicleDetails));	
	}
}

/************* ViewCompanyAddVehicle module Prototype ******************/
ViewCompanyAddVehicle.prototype = {
	bindElementsinEditmode: function(editdata){
		$("#hiddenVehicleID").val(editdata.ID);
		$("#txtVehicleNumber").val(editdata.VehicleNumber);
		$("#txtVehicleId").val(editdata.VehicleId);
		$("#hidFlag").val("U");
		$("#sp_AddEdit").html("Edit");
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed(){
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event){
		window.location="C_VehicleList.html";
}

/************** Bind Events **************/

$("#frmAddVehicle").submit(function (event) {
	event.preventDefault();
	if(C_VehicleValidations()){
		var $form = $(this);
		var data = $form.serialize();
		AddVehicleControllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("POST", ServiceUrl+"TripService/AddUpdateVehicle", data,"json", AddVehicleSuccess, AddVehicleError);
	}
});

$("#btnBack").click(function(){
	window.location="C_VehicleList.html";
});

function AddVehicleSuccess(data){
	if(data.success){
		sessionStorage.removeItem("editVehicleDetails");
		window.location="C_VehicleList.html";
	} else {
		navigator.notification.alert(data.msg,alertDismissed,"Alert","Ok");
	}
}

function AddVehicleError(res){
	if(res.statusText=="error"&&res.responseText==""&&res.readyState==0){
		navigator.notification.alert("Please check your Internet connection",alertDismissed,"Alert","Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time",alertDismissed,"Alert","Ok");
	}
}

/************** html validations **************/
// $("#txtVehicleNumber").focus(function(){
	// $('#lblVehicleNumber').css('display','none');
// });
// 
// $("#txtVehicleNumber").blur(function(){
	// if(($("#txtVehicleNumber").val()).trim()=="") {
		// $('#lblVehicleNumber').html("You can't leave this empty");
		// $('#lblVehicleNumber').css('display','block');
	// }
	 // else if(!isAlphaNumericSpace($("#txtVehicleNumber").val())) {
		// $("#lblVehicleNumber").html("Special characters are not allowed");
		// $('#lblVehicleNumber').css('display','block');
	// }
// });

$("#txtVehicleId").focus(function(){
	$('#lblVehicleId').css('display','none');
});

$("#txtVehicleId").blur(function(){
	if(($("#txtVehicleId").val()).trim()=="") {
		$('#lblVehicleId').html("You can't leave this empty");
		$('#lblVehicleId').css('display','block');
	}
	 else if(!isAlphaNumeric($("#txtVehicleId").val())) {
		$("#lblVehicleId").html("Special characters are not allowed");
		$('#lblVehicleId').css('display','block');
	}
});

function C_VehicleValidations() {
	var bool=true;
	/*if(($("#txtVehicleNumber").val()).trim()=="") {
		$('#lblVehicleNumber').html("You can't leave this empty");
		$('#lblVehicleNumber').css('display','block');
		bool = false;
	} else if(!isAlphaNumericSpace($("#txtVehicleNumber").val())) {
		$("#lblVehicleNumber").html("Special characters are not allowed");
		$('#lblVehicleNumber').css('display','block');
		bool = false;
	}*/
   if(($("#txtVehicleId").val()).trim()=="") {
		$('#lblVehicleId').html("You can't leave this empty");
		$('#lblVehicleId').css('display','block');
		bool = false;
	} 
	return bool;
}