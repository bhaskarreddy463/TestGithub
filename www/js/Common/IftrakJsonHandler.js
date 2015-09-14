// set the values in the json object ot insert the value in the sql lite data base
function Trip_Details_Json(oDriverID, oTruckID, oOdometerReading, oStartingAddress, oEndingAddress, oBuyFuel, oMode, oNoOfGallons, oTotalPrice, oReceiptImage, oDateModified, oDistanceTraveled, oSLatitude, oSLongitude) {

	var claimsJson = null;
	try {
		claimsJson = {
			DriverID : oDriverID,
			TruckID : oTruckID,
			OdometerReading : oOdometerReading,
			StartingAddress : oStartingAddress,
			EndingAddress : oEndingAddress,
			BuyFuel : oBuyFuel,
			Mode : oMode,
			NoOfGallons : oNoOfGallons,
			TotalPrice : oTotalPrice,
			ReceiptImage : oReceiptImage,
			DateModified : oDateModified,
			DistanceTraveled : oDistanceTraveled,
			SLatitude : oSLatitude,
			SLongitude : oSLongitude,
		};
	} catch(err) {
		alert(err.message);
	}
	return claimsJson;
}

