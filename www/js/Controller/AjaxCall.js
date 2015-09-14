/// <summary>
/// fnAjaxCall constructor of this file.
/// </summary>
function fnAjaxCall(_model) {
	this.modelRef = _model;
}

/// <summary>
/// fnAjaxCall prototype function we can access the properties of the function.
/// </summary>
fnAjaxCall.prototype = {
	// fireAjaxCall common ajax call function for the entire the application.
	fireAjaxCall : function(paramtype, paramurl, paramdata, paramdataType, paramsuccessCallbackMethod, paramerrorCallbackMethod) {
		$("#loader").css("display", "block");
		$.ajax({
			type : paramtype,
			url : paramurl,
			data : paramdata,
			timeout: 30000,
			dataType : paramdataType,
			error : function(response) {
				$("#loader").css("display", "none");
				paramerrorCallbackMethod(response);
			},
			success : function(response) {
				$("#loader").css("display", "none");
				paramsuccessCallbackMethod(response);
			}
		});
	},
	backEndAjaxCall : function(paramtype, paramurl, paramdata, paramdataType, paramsuccessCallbackMethod, paramerrorCallbackMethod) {
		$.ajax({
			type : paramtype,
			url : paramurl,
			data : paramdata,
			timeout: 30000,
			dataType : paramdataType,
			error : function(response) {
				paramerrorCallbackMethod(response);
			},
			success : function(response) {
				paramsuccessCallbackMethod(response);
			}
		});
	}
};
