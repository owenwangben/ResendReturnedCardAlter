var MobileUtils = {
    unregisterFunction: function (funcName) {
        if (typeof (func) == "string") {
            delete window[funcName];
        }
    },
    count:(new Date()).getTime(),
	registerFunction: function (func) {
		if (typeof (func) == "function") {
			//arguments.callee.count = ++arguments.callee.count || (new Date()).getTime();
			MobileUtils.count ++;
			var generatedName = "mobilejscbf" + MobileUtils.count;
			window[generatedName] = function () {
				func.apply(this, arguments);
				delete window[generatedName];
			};
			return generatedName;
		} else if (typeof (func) == "string") {
			return func;
		} else {
			return "";
		}
	},
	supportTwidAndroid: function () {
        return typeof (this.androidInterface) != "undefined" && typeof (this.androidInterface.GetVersion) == "function";
    },
    toNumber: function (input) {
        if (typeof (input) != "number") {
            var i = parseInt(input);
            return isNaN(i) ? 0 : i;
        } else {
            return input;
        }
    },
	androidInterface: window.twidMobile || window.mobile
};

function ExitWebview(){
	try {
		var useragent = navigator.userAgent;
		if (MobileUtils.supportTwidAndroid()) {
			MobileUtils.androidInterface.ExitWebview();
			return 0;
		} else if (useragent.indexOf('iPhone') > 0 || useragent.indexOf('iPad') > 0) {
			document['location'] = "PKI::ExitWebview::";
			return 0;
		} else {
			return 1;
		}
	} catch (err) {
		alert(err);
		return -1;
	}
}
	
function ExitWebview2(message){
	try {
		var useragent = navigator.userAgent;
		if (MobileUtils.supportTwidAndroid()) {
			MobileUtils.androidInterface.ExitWebview2(message);
			return 0;
		} else if (useragent.indexOf('iPhone') > 0 || useragent.indexOf('iPad') > 0) {
			document['location'] = "PKI::ExitWebview2::" + encodeURI(message);
			return 0;
		} else {
			return 1;
		}
	} catch (err) {
		alert(err);
		return -1;
	}
}