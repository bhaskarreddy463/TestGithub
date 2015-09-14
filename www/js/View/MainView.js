/************* Main View Constructor ******************/
function MainView(_Model, _Controller, pageRef) {
	initializeSubViews(_Model, _Controller, pageRef);
}

/**************** initialize view ********************/
function initializeSubViews(_Model, _Controller, pageRef) {
	try {
		this.controllerRef = _Controller;
		this.modelRef = _Model;
		switch(pageRef) {
			case 'LoginAs' :
				new ViewLoginAs(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerLogin' :
				new ViewWholesalerLogin(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerSignUp' :
				new ViewWholesalerSignUp(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerForgotPassword' :
				new ViewWholesalerForgotPassword(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerMenuScreen' :
				new ViewWholesalerMenuScreen(this.modelRef, this.controllerRef);
				break;
			case 'AddVehicle' :
				new ViewAddVehicle(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerAddCompany' :
				new ViewWholesalerAddCompany(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerAddIndividual' :
				new ViewAddIndividual(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerCompanyList' :
				new ViewWholesalerCompanyList(this.modelRef, this.controllerRef);
				break;
			case 'WholesalerIndividualList' :
				new ViewWholesalerIndividualList(this.modelRef, this.controllerRef);
				break;
			case 'WholesalertblVehicleListList' :
				new ViewWholesalerVehicleList(this.modelRef, this.controllerRef);
				break;
			case 'CompanyLogin' :
				new ViewCompanyLogin(this.modelRef, this.controllerRef);
				break;
			case 'CompanyMenuScreen' :
				new ViewCompanyMenuScreen(this.modelRef, this.controllerRef);
				break;
			case 'CompanyIndividualList' :
				new ViewCompanyIndividualList(this.modelRef, this.controllerRef);
				break;
			case 'CompanyVehicleList' :
				new ViewCompanyVehicleList(this.modelRef, this.controllerRef);
				break;
			case 'CompanySignUp' :
				new ViewCompanySignUp(this.modelRef, this.controllerRef);
				break;
			case 'CompanyAddVehicle' :
				new ViewCompanyAddVehicle(this.modelRef, this.controllerRef);
				break;
			case 'CompanyAddIndividual' :
				new ViewCompanyAddIndividual(this.modelRef, this.controllerRef);
				break;
			case 'CompanyForgotPassword' :
				new ViewCompanyForgotPassword(this.modelRef, this.controllerRef);
				break;
			case 'DriverCreatePassword' :
				new ViewDriverCreatePassword(this.modelRef, this.controllerRef);
				break;
			case 'DriverLogin' :
				new ViewDriverLogin(this.modelRef, this.controllerRef);
				break;
			case 'DriverForgotPassword' :
				new ViewDriverForgotPassword(this.modelRef, this.controllerRef);
				break;
			case 'DriverMenuScreen' :
				new ViewDriverMenuScreen(this.modelRef, this.controllerRef);
				break;
			case 'DriverQuickTrip' :
				new ViewQuickTrip(this.modelRef, this.controllerRef);
				break;
			case 'DriverBuyFuel' :
				new ViewDriverBuyFuel(this.modelRef, this.controllerRef);
				break;
			case 'DriverTripDetails' :
				new ViewDriverTripDetails(this.modelRef, this.controllerRef);
				break;
			case 'DriverCreateTrip' :
				new ViewDriverCreateTrip(this.modelRef, this.controllerRef);
				break;
			case 'CompanyTripSummary' :
				new ViewCompanyTripSummary(this.modelRef, this.controllerRef);
				break;
			case 'WholeSalerTripSummary' :
				new ViewWholeTripSalerSummary(this.modelRef, this.controllerRef);
				break;
			case 'WholeSalerTripSummary' :
				new ViewWholeTripSalerSummary(this.modelRef, this.controllerRef);
				break;
			case 'UserProfile' :
				new ViewUserProfile(this.modelRef, this.controllerRef);
				break;
		}
	} catch(e) {
		console.log("Error in initializeSubViews of MainView:: " + e.message);
	}
}