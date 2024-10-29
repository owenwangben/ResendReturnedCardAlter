/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
		} catch(e) {
			return;
		}
		try {
			// If we can't parse the cookie, ignore it, it's unusable.
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function (key, value, options) {
		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		// Read
		var result = key ? undefined : {};
		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};
}));

var clientManager = (function() {
    //cookie的新增、刪除、查詢
    var cookieManager = function() { };
    cookieManager.prototype = {
        addItem: function(key, value) {
            $.cookie(key, value, { expires: (365 * 10) });
        },
        deleteItem: function(key) {
            $.cookie(key, null);
        },
        getItem: function(key) {
            return $.cookie(key);
        }
    };
    //localStorage的新增、刪除、查詢
    var storageManger = function() { };
    storageManger.prototype = {
        addItem: function(key, value) {
            localStorage[key] = value;
        },
        deleteItem: function(key) {
            localStorage.removeItem(key);
        },
        getItem: function(key) {
            return localStorage.getItem(key);
        }
    };
    //工廠方法
    var factory = {
        create: function() {
            if (window.localStorage) {
                return new storageManger();
            }
            else {
                return new cookieManager();
            }
        }
    };
    var addItem = function(key, value) {
        var manager = factory.create();
        manager.addItem(key, value);
    };
    var deleteItem = function(key) {
        var manager = factory.create();
        manager.deleteItem(key);
    };
    var getItem = function(key) {
        var manager = factory.create();
        return manager.getItem(key);
    };
    return {
        addItem: addItem,
        deleteItem: deleteItem,
        getItem: getItem,
    };
})();
var mmaServer = '';
var custidMasked = false;
var default_values = new Array();

function passwordClicked(input) {
    set_input_type(input, 'password');
}
function passwordLostFocus(input) {
    if (input.value == '') {
        set_input_type(input, 'text');
    }
}
function set_input_type(input, intype) {
    try {
        input.type = intype;
    }
    catch (e) {
        ie_set_input_type(input, intype);
    }
}
function gt(id) {
    return document.getElementById(id).value;
}
function g(id) {
    return document.getElementById(id);
}
function st(id, v) {
    document.getElementById(id).value = v;
}
function ie_set_input_type(input, type) {
    try {
        var input2 = input.cloneNode(false);
        switch (type) {
            default:
            case 'text': {
                input2.type = 'text';
                break;
            }
            case 'password': {
                input2.type = 'password';
                break;
            }
        }
        input2.id = input.id;
        input.parentNode.replaceChild(input2, input);
    }
    catch (e) {
        window.status = e.message;
    }
}
function isDefaultValue(input) {
    if (input == '' || input == null || input == undefined) {
        return true;
    }
    return false;
}
function clearInput() {
    g("ClientErrorMessage").innerHTML = '';
    if (!isDefaultValue(gt("CustId_Input")) && !custidMasked) {
        st("CustId", gt("CustId_Input"));
    }
    if (!isDefaultValue(gt("UserCode_Input"))) {
        st("UserCode", gt("UserCode_Input"));
    }
    if (!isDefaultValue(gt("Password_Input"))) {
        st("Password", gt("Password_Input"));
    }
    if (gt("CustId") == '' || gt("UserCode") == '' || gt("Password") == '') {
        g("ClientErrorMessage").innerHTML = '<font color="red">' + noLoginEntryMessage + '</font><br/><br/>';
        hideBlock();
        return false;
    }
    if (gt("UserCode").length < 6 || gt("Password").length < 6) {
      if (location.href.indexOf("mma_en_remit_login.aspx")>-1) {
		g("ClientErrorMessage").innerHTML = '<font color="red">Please enter the Use ID and Network Password with more than six digits</font><br/><br/>';
	  } else {
      g("ClientErrorMessage").innerHTML = '<font color="red">請輸入長度大於6碼的使用者代碼及網路密碼。</font><br/><br/>';
	  }
	  
      hideBlock();
      return false;
    }
    st("Password_Input", "");
    st("CustId_Input", "");
    st("UserCode_Input", "");
    if (isSaved()) {
        clientManager.addItem("owner", gt("CustId"));
    }
    return true;
}
function isSaved() {
    return document.getElementById('saveId_i').checked;
}
function resetInput() {
    st("UserCode", "");
    st("Password", "");
    st("Password_Input", "");
    st("UserCode_Input", "");
    st("CustId_Input", "");
    clearCustid();
    set_input_type(g("Password_Input"), 'text');
    default_values = new Array();
    if (isSaved()) {
        toggleSwitch('saveId');
    }
}
function showBlock() {
    submitFlag = 1;
    var blockDiv = document.getElementById('disablingDiv');
    if (blockDiv == null) {
        blockDiv = document.createElement('div');
        blockDiv.id = 'disablingDiv';
        var bd = document.body;
        var el = document.documentElement;
        var ht = Math.max(bd.scrollHeight, bd.offsetHeight, el.clientHeight, el.scrollHeight, el.offsetHeight);
        var css = "display:block; position:absolute; z-index: 10000; left:0px; top:0px; width:100%; height:" + ht + "px; background-color: white; filter:alpha(opacity=0); opacity:0.0;";
        blockDiv.style.cssText = css;
        document.body.appendChild(blockDiv);
    }
}
function hideBlock() {
    document.getElementById('disablingDiv').style.display = 'none';
}
function maskCustId(custid) {
    var len = custid.toString().length;
    // no mask when length less than 6.
    if (len < 6) {
        return custid;
    }
    var cloakingCharacter = (navigator.platform == "MacIntel") ? '\u2022' : '\u25CF';
    var head = custid.toString().substring(0, len - 3);
    var mid = "";
    for (var i = 0; i < 3; i++) {
      mid += cloakingCharacter;
    }
    return head + mid;
}

function clearCustid() {
  st("CustId", "");
  custidMasked = false;
}
function clearCustidKey() {
  if (custidMasked) {
    st("CustId_Input", "");
    clearCustid();
  }
}
function maskThis() {
  if (custidMasked) return;
  if (!isDefaultValue(gt("CustId_Input"))) {
    st("CustId", gt("CustId_Input"));
    st("CustId_Input", maskCustId(gt("CustId")));
    custidMasked = true;
  }
}
// iphone-like checkbox/switch
function toggleSwitch(id) {
  var sw = document.getElementById(id);
  var toggled = sw.getAttribute("toggled") != "true";
  if (sw) {
    sw.setAttribute("toggled", toggled);
  }
  var chkbox = document.getElementById(id + '_i');
  if (toggled) {
    chkbox.checked = true;
  } else {
    chkbox.checked = false;
    clientManager.deleteItem("owner");
    clearCustid();
    st("CustId_Input", "");
  }
}
function readCustIdFromCookie() {
  var cookie = clientManager.getItem("owner");
  if (cookie != undefined && cookie != null) {
      st("CustId", cookie);
      st("CustId_Input", maskCustId(cookie));
      custidMasked = true;
      g("saveId_i").setAttribute('checked', true);
      toggleSwitch('saveId');
  }
}
//行動理財
function checkRead(allList, readStorage, disp) {
  var list = document.getElementById(allList).value;
  var notice = list.split(',');
  var count = notice.length;
  if (clientManager.getItem(readStorage) != null) {
    read = clientManager.getItem(readStorage).split(',');
    var upd = null;
    for (var i in read) {
      if (notice.indexOf(read[i]) != -1) {
        count--;
        if (upd != null)
          upd += (',' + read[i]);
        else
          upd = read[i];
      }
    }
    clientManager.addItem(readStorage, upd);
  }
  if (list && list.length > 0 && count > 0)
    document.getElementById(disp).innerText = count.toString();
  else
    document.getElementById(disp).style.display = "none";
}
function checkRead2(allList, readStorage, disp) {
  var list = document.getElementById(allList).value;
  var notice = list.split(',');
  var count = notice.length;
  if (clientManager.getItem(readStorage) != null) {
    read = clientManager.getItem(readStorage).split(',');
    var upd = null;
    for (var i in read) {
      if (notice.indexOf(read[i]) != -1) {
        count--;
        if (upd != null)
          upd += (',' + read[i]);
        else
          upd = read[i];
      }
    }
    clientManager.addItem(readStorage, upd);
  }
  if (list && list.length > 0 && count > 0)
    document.getElementById(disp).style.display = "block";
  else
    document.getElementById(disp).style.display = "none";
}
function toggleNewsRead(readStorage, oid) {
  var store = clientManager.getItem(readStorage);
  if (store != null) {
    if (store.indexOf(oid) == -1) {
      clientManager.addItem(readStorage, store + "," + oid);
    }
  }
  else {
    clientManager.addItem(readStorage, oid);
  }
}
function toggleNewFlag(alist, readStorage, newImage) {
  var allList = document.getElementById(alist).value.split(',');
  var store = clientManager.getItem(readStorage);
  for (var i in allList) {
    if (store == null || store.indexOf(allList[i]) == -1) {
      document.getElementById('n' + allList[i]).innerHTML = "<img src='/images/mobile/" + newImage + "' class='newsNew'/>";
    }
  }
}
var storageSupported=true;
/*
var storageSupported,
    fail,
    uid;
try {
  uid = new Date;
  (storageSupported = window.localStorage).setItem(uid, uid);
  fail = storageSupported.getItem(uid) != uid;
  storageSupported.removeItem(uid);
  fail && (storageSupported = false);
} catch (e) { }
*/