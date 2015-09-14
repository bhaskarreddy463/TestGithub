var Globalcontrollerref=null;
var IndividualDetailsList=[];
var searchC_IndividualList=[];
/************* ViewWholesalerVehicleList module Constructor******************/
function ViewCompanyIndividualList(_Model, _Controller) {
	this.modelRef = _Model;
	this.controllerRef = _Controller;
	Globalcontrollerref = this.controllerRef;
	sessionStorage.removeItem("editIndividual");
	this.getCompanyList();
	$("#txtSearch").val();
}

/************* ViewWholesalerMenuScreen module Prototype ******************/
ViewCompanyIndividualList.prototype = {
	getCompanyList:function(){
		this.controllerRef.myControllers.insControllerfnAjaxCall.fireAjaxCall("GET", ServiceUrl+"UserService/ShowDriverList?CreatedByID="+JSON.parse(sessionStorage.CompanyUserDetails).CompanyID, {}, "json", CompanyListSuccess, CompanyListError);
	}
};

document.addEventListener("deviceready", onDeviceRed);

function onDeviceRed(){
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown(event){
	window.location="C_MenuScreen.html";
}

function CompanyListSuccess(res){
	if(res.success||res.length!=undefined){		
		var IndividualListData="";  	
   		IndividualDetailsList=res;
   		searchC_IndividualList=res;
   	  $.each(res,function(index,data){
			IndividualListData+="<div id='"+index+"' class='clearfix vehicle-container'>";
			IndividualListData+="<div class='white-content-label clearfix'>"+data.Name+"</div>";
			IndividualListData+="<div class='white-content clearfix '>"+data.Phone1+"</div>";
			IndividualListData+="<div class='white-content clearfix '>"+data.DriverID+"</div>";
			IndividualListData+="<div class='white-content clearfix '>"+data.EmailID+"</div>";
			
			IndividualListData+="<div class='text-center'><input id='"+index+"' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
			IndividualListData+="</div>";
		 });
		 $("#divIndividualList").html(IndividualListData);
	}
}

function CompanyListError(res){
	if(res.statusText=="error"&&res.responseText==""&&res.readyState==0){
		navigator.notification.alert("Please check your Internet connection",alertDismissed,"Alert","Ok");
	} else {
		navigator.notification.alert("Some error occurred. Please retry after some time",alertDismissed,"Alert","Ok");	
	}
}

/************** html click events **************/
$("#txtSearch").keyup(function(e){
	var serchKey=($(this).val().trim()).toLowerCase();
	var filtered = searchC_IndividualList.filter(searchFn);
	function searchFn(value) {
	  		return ((value.Name.toLowerCase().indexOf(serchKey)>=0)||(value.Phone1.toLowerCase().indexOf(serchKey)>=0)||(value.DriverID.toLowerCase().indexOf(serchKey)>=0)||(value.EmailID.toLowerCase().indexOf(serchKey)>=0));
	}
	var IndividualListData="";  
	IndividualDetailsList=filtered;
   	  $.each(filtered,function(index,data){
		IndividualListData+="<div id='"+index+"' class='clearfix vehicle-container'>";
		IndividualListData+="<div class='white-content-label clearfix'>"+data.Name+"</div>";
		IndividualListData+="<div class='white-content clearfix '>"+data.Phone1+"</div>";
		IndividualListData+="<div class='white-content clearfix '>"+data.DriverID+"</div>";
		IndividualListData+="<div class='white-content clearfix '>"+data.EmailID+"</div>";
		IndividualListData+="<div class='text-center'><input id='"+index+"' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
		IndividualListData+="</div>";
	 });
	 $("#divIndividualList").html(IndividualListData);
});

$("#txtSearch").blur(function(){
	var serchKey=($(this).val().trim()).toLowerCase();
	var filtered = searchC_IndividualList.filter(searchFn);
	function searchFn(value) {
	  		return ((value.Name.toLowerCase().indexOf(serchKey)>=0)||(value.Phone1.toLowerCase().indexOf(serchKey)>=0)||(value.DriverID.toLowerCase().indexOf(serchKey)>=0)||(value.EmailID.toLowerCase().indexOf(serchKey)>=0));
	}
	var IndividualListData="";  
	IndividualDetailsList=filtered;
   	  $.each(filtered,function(index,data){
		IndividualListData+="<div id='"+index+"' class='clearfix vehicle-container'>";
		IndividualListData+="<div class='white-content-label clearfix'>"+data.Name+"</div>";
		IndividualListData+="<div class='white-content clearfix '>"+data.Phone1+"</div>";
		IndividualListData+="<div class='white-content clearfix '>"+data.DriverID+"</div>";
		IndividualListData+="<div class='white-content clearfix '>"+data.EmailID+"</div>";
		IndividualListData+="<div class='text-center'><input id='"+index+"' name='' type='button' value='Edit' onclick=\"editCompany(this)\" class='edit-button float-right'></div>";
		IndividualListData+="</div>";
	 });
	 $("#divIndividualList").html(IndividualListData);
});

$("#AddIndividualOne").click(function(){
	window.location="C_AddIndividual.html";
});

function editCompany(rowData){
	var editIndex=rowData.id;
	sessionStorage.editIndividual = JSON.stringify(IndividualDetailsList[editIndex]);
	window.location="C_AddIndividual.html";
}
