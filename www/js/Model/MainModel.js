/************* Main Model Constructor ******************/
function MainModel(pageRef) {
	return initializeSubModels(pageRef);

}

/**************** initializeSubModels the model ********************/
var myModels = null;
function initializeSubModels(pageRef) {
	try {
		if (pageRef === 'LoginAs') {
			myModels = {
				insLoginAs : new LoginAsModel()
			};
		} else if (['UserProfile','DriverCreateTrip', 'DriverBuyFuel', 'DriverMenuScreen', 'DriverQuickTrip'].indexOf(pageRef) >= 0) {
			myModels = {
				insDriverDatabaseModel : new DriverDatabaseModel()
			};
		} else if (pageRef === 'add_roof') {
			myModels = {
				insAddRoofModel : new AddRoofModel()
			};
		} else if (pageRef === 'add_elevation') {
			myModels = {
				insAddElevationModel : new AddElevationModel()
			};
		} else if (pageRef === 'PhotoModule') {
			myModels = {
				insPhotoModel : new PhotoModel()
			};
		} else if (pageRef === 'add-edit-diagrams' || pageRef === 'daigram-canvas') {
			myModels = {
				insDiagramModel : new DiagramModel()
			};
		} else if (pageRef === 'NotesModule') {
			myModels = {
				insNotesModel : new NotesModel()
			};
		} else if (pageRef === 'InitializeApp') {
			myModels = {
				insInitializeModel : new InitializeModel()
			};
		} else if (pageRef === 'NonWaiver') {
			myModels = {
				insNonWaiverModel : new NonWaiverModel()
			};
		} else if (pageRef === 'non_waiver_fields') {
			myModels = {
				insNonWaiverFieldsModel : new NonWaiverFieldsModel()
			};
		} else if (pageRef === 'Preliminary_Assessment') {
			myModels = {
				insPreliminaryAssessmentModel : new PreliminaryAssessmentModel()
			};
		} else if (pageRef === 'AdvancePayment') {
			myModels = {
				insAdvancePaymentModel : new AdvancePaymentModel()
			};
		} else if (pageRef === 'NFIP') {
			myModels = {
				insNFIPModel : new NFIPModel()
			};
		}
		return this;
	} catch(e) {
		console.log("Error in initializeSubModels of Model:: " + e.message);
	}
}