/************* Main Controller Constructor ******************/
function MainController(_Model, pageRef) {
	return initializeSubControllers(_Model, pageRef);
}

/**************** initialize the Controller ********************/
function initializeSubControllers(_Model, pageRef) {
	try {
		this.modelRef = _Model;
		if (pageRef === 'LoginAs') {
			this.myControllers = {
				insControllerLoginAs : new ControllerLoginAs(this.modelRef),
				insControllerfnAjaxCall : new fnAjaxCall(this.modelRef)
			};
		} else if (['UserProfile','WholeSalerTripSummary', 'CompanyTripSummary', 'DriverCreateTrip', 'AddVehicle', 'DriverTripDetails', 'DriverMenuScreen', 'DriverBuyFuel', 'DriverQuickTrip', 'DriverForgotPassword', 'DriverLogin', 'DriverCreatePassword', 'CompanyForgotPassword', 'CompanyAddVehicle', 'CompanyAddIndividual', 'CompanySignUp', 'CompanyVehicleList', 'CompanyIndividualList', 'WholesalerSignUp', 'WholesalerCompanyList', 'WholesalerIndividualList', 'CompanyLogin', 'WholesalertblVehicleListList', 'WholesalerLogin', 'WholesalerForgotPassword', 'WholesalerAddCompany', 'WholesalerAddIndividual'].indexOf(pageRef) >= 0) {
			this.myControllers = {
				insControllerfnAjaxCall : new fnAjaxCall(this.modelRef)
			};
		} else if (pageRef === 'AddVehicle1') {
			this.myControllers = {
				insControllerAddVehicle : new ControllerAddVehicle(this.modelRef),
				insControllerfnAjaxCall : new fnAjaxCall(this.modelRef)
			};
		} else if (pageRef === 'Preliminary_Assessment') {
			this.myControllers = {
				insControllerPreliminaryAssessment : new ControllerPreliminaryAssessment(this.modelRef)
			};
		} else if (pageRef === 'AdvancePayment') {
			this.myControllers = {
				insControllerAdvancePayment : new ControllerAdvancePayment(this.modelRef)
			};
		} else if (pageRef === 'NFIP') {
			this.myControllers = {
				insControllerNFIP : new ControllerNFIP(this.modelRef)
			};
		}
		return this;
	} catch(e) {
		console.log("Error in initializeSubControllers of MainController:: " + e.message);
	}
}