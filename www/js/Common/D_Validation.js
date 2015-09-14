//var ServiceUrl = "http://web.chetu.com/RBInnovativeProducts/";
//var ServiceUrl = "http://172.16.6.212/";
var ServiceUrl= "http://192.99.21.58/";

function alertDismissed() {

}

/*************** Common Validations functions **************/

function isChar(value) {
	var letters = /^[A-Za-z]+$/;
	if (value.match(letters)) {
		return true;
	} else {
		return false;
	}
}

function checkEmail(value) {
	var bool = true;
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(value))
		bool = false;
	return bool;
}

function phonenumber(value) {
	var bool = true;
	var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if (!value.match(phoneno)) {
		bool = false;
	}
	return bool;
}

function isAlphaNumeric(value) {
	var bool = true;
	var letters = /^[0-9a-zA-Z]+$/;
	if (!value.match(letters)) {
		bool = false;
	}
	return bool;
}

function isAlphaNumericSpace(value) {
	var bool = true;
	var letters = /^[0-9a-zA-Z ]+$/;
	if (!value.match(letters)) {
		bool = false;
	}
	return bool;
}

function passwordMatch(password, RePassword) {
	var bool = true;
	if (password !== RePassword) {
		bool = false;
	}
	return bool;
}

function isNumeric(value) {
	var bool = true;
	var letters = /^[0-9]+$/;
	if (!value.match(letters)) {
		bool = false;
	}
	return bool;
}

function isFloatNumber(value) {
	var bool = true;
	var letters = /^[0-9.]+$/;
	var splitvalue = value.split('.');
	if (!value.match(letters) || splitvalue.length > 2) {
		bool = false;
	}
	return bool;
}

function replaceltgt(value) {
	for (var i = 0; i < value.length; i++) {
		value = value.replace("&lt;", "<").replace("&gt;", ">");
		if (!(value.indexOf("&lt;") > -1)) {
			break;
		}
	};
	return value;
}