var Url = {

    // public method for url encoding
    encode: function(string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    decode: function(string) {
        return this._utf8_decode(unescape(string));
    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}



function writeAdv(server, mmacat, showtype, mask, width, height, subname, start, count) {
    var encoding = document.charset;
    var cat = Url.encode(mmacat);

    var advcmd = "<script type='text/javascript' language='javascript' ";
    advcmd += ("src='" + server + "/shared/adv.aspx?mmacat=" + cat + "&showtype=" + showtype);

    if (server != undefined && server.toString().length > 0 ) {
        advcmd += "&ext=1";
    }

    if (mask != undefined) {
        advcmd += ("&mask=" + mask);
    }

    if (width != undefined) {
        advcmd += ("&width=" + width);
    }

    if (height != undefined) {
        advcmd += ("&height=" + height);
    }

    if (encoding != undefined) {
        advcmd += ("&encode=" + encoding);
    }

    if (subname != undefined) {
        advcmd += ("&subname=" + Url.encode(subname));
    }

    if (start != undefined) {
        advcmd += ("&start=" + start);
    }

    if (count != undefined) {
        advcmd += ("&count=" + count);
    }

    advcmd += ("'></s" + "cript>");
    document.write(advcmd);
}



function loadAdv(placeholder, filename) {
    var advPlaceholder = document.getElementById(placeholder);
    var BrowserObj = false;
    try {
        BrowserObj = new XMLHttpRequest();
    } catch (e) {
        try {
            BrowserObj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                BrowserObj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                return false;
            }
        }
    }

    if (filename == null || filename == "") {
        return false;
    } else {
        BrowserObj.open('GET', filename, false);
        BrowserObj.send(null);
        //advPlaceholder.innerHTML = BrowserObj.responseText;
        $("#advPlaceholder").html(BrowserObj.responseText);
    }
}


function clickAdv(oid) {
    var BrowserObj = false;
    try {
        BrowserObj = new XMLHttpRequest();
    } catch (e) {
        try {
            BrowserObj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                BrowserObj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                return false;
            }
        }
    }

    if (oid != undefined) {
        BrowserObj.open('GET', '/MemberPortal/Member/AdvClicked.aspx?oid=' + oid, true);
        BrowserObj.send(null);
    }
}



var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
		{
		    string: navigator.userAgent,
		    subString: "Chrome",
		    identity: "Chrome"
		},
		{ string: navigator.userAgent,
		    subString: "OmniWeb",
		    versionSearch: "OmniWeb/",
		    identity: "OmniWeb"
		},
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari",
		    versionSearch: "Version"
		},
		{
		    prop: window.opera,
		    identity: "Opera"
		},
		{
		    string: navigator.vendor,
		    subString: "iCab",
		    identity: "iCab"
		},
		{
		    string: navigator.vendor,
		    subString: "KDE",
		    identity: "Konqueror"
		},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox"
		},
		{
		    string: navigator.vendor,
		    subString: "Camino",
		    identity: "Camino"
		},
		{		// for newer Netscapes (6+)
		    string: navigator.userAgent,
		    subString: "Netscape",
		    identity: "Netscape"
		},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "Explorer",
		    versionSearch: "MSIE"
		},
		{
		    string: navigator.userAgent,
		    subString: "Gecko",
		    identity: "Mozilla",
		    versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
		    string: navigator.userAgent,
		    subString: "Mozilla",
		    identity: "Netscape",
		    versionSearch: "Mozilla"
		}
	],
    dataOS: [
		{
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"
		},
		{
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"
		},
		{
		    string: navigator.userAgent,
		    subString: "iPhone",
		    identity: "iPhone/iPod"
		},
		{
		    string: navigator.platform,
		    subString: "Linux",
		    identity: "Linux"
		}
	]

};

BrowserDetect.init();


function checkPwdLength(elm, maxlen) {
    return;
    
    if (elm.value.length >= maxlen) {
        alert('密碼長度不得超過' + maxlen + '個字元');
    }

    elm.value = elm.value.substr(0, maxlen);
}



function GetDNS() {
    cookieDomain = document.location.hostname;
}

function GetCookie() {
    var strName = "varCook";
    if (document.cookie.indexOf(strName) == -1) {
        return false;
    }
    else {
        cookieStart = document.cookie.indexOf(strName);
        cookieValStart = (document.cookie.indexOf("=", cookieStart) + 1);
        cookieValEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieValEnd == -1) {
            cookieValEnd = document.cookie.length;
        }
        cookieValue = document.cookie.substring(cookieValStart, cookieValEnd);
    }
    if (cookieValue = "True") {
        return ("True");
    }
}

function SetCookie(name, value, expires, path, domain, secure) {
    var strDNS = GetDNS();
    document.cookie = name + "=" + escape(value) +
				((expires) ? ";expires=" + expires.toGMTString() + 1000 * 60 * 20 : "") +
        		((path) ? ";path=" + path : "") +
    //( (domain) ? ";domain=" + domain : "") +
        		((domain) ? ";domain=" + strDNS : "") +
				((secure) ? ";secure" : "");
    return true
}

function CheckCookiesEnabled() {
    SetCookie('varCook', 'True', '', '/', '', '');
    if (GetCookie() == "True") {
        return true;
    } else {
        return false;
    }
}

var cookieDiabledMessage = '親愛的客戶您好：\n\n由於您目前的瀏覽器設定為封鎖Cookie狀態，故無法登入本站，請您先行調整該設定，以確保正常使用本站。\n如有問題請洽詢客服專線：02-2505-9999 / 0203-08989';

function capLock(e, msg) {
  kc = e.keyCode ? e.keyCode : e.which;
  sk = e.shiftKey ? e.shiftKey : ((kc == 16) ? true : false);
  if (kc < 65 || (kc > 90 && kc < 97) || kc > 122) return;
  if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk))
    document.getElementById(msg).style.visibility = 'visible';
  else
    document.getElementById(msg).style.visibility = 'hidden';
}

function allowClick(e) {
  var evt = window.event || e;
  try {
    evt.cancelBubble = true;
  }
  catch (err) {
  }
  try {
    if (evt.stopPropagation) evt.stopPropagation();
  }
  catch (err) {
  }
}
