/*
 * 瀏覽器檢核
 */
var BrowserAlert = "很抱歉，MMA交易金融網不支援您目前使用的瀏覽器！\n為了保障您的交易安全，請您立刻更新或使用其他瀏覽器。\n(目前支援IE 8.0以上版本、Chrome、Firefox)";
function close_upgrade() {
  $("#browser_upgrade").css("display", "none");
  $("#loginArea").removeClass("loginArea_shift");
}
function checkBrowserVersion() {
  if ($.cookie('bowser_detect') != 'bowser_detect') {
    var currentDate = new Date();
    expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
    $.cookie("bowser_detect", "bowser_detect", { expires: expirationDate });
  }
  else {
    return;
  }
  var ua = window.navigator.userAgent;
  if (ua.match(/(Opr)|(Opera)/i) != null) {
    showBrowserUpgrade();
  }
  else if (ua.match(/(Chrome)|(Firefox)|(MSIE)|(Trident)/i) != null) {	//Trident=>IE11
    if (ua.match(/(MSIE)/i) != null) {
      for (i = 0; i < 12; i++) { //判斷IE版本
        for (j = 0; j < 12; j++) {
          if (navigator.appVersion.match("MSIE " + i + "." + j) != null)
            tmp_ver = i + "." + j;
        }
      }
      //Trident:IE7以上多的識別字compatible
      //if(ua.match(/(Trident)/i) == null && tmp_ver < 8.0 && ua.match(/(compatible)/i)==null){
      if (ua.match(/(Trident)/i) == null && tmp_ver < 8.0) {
        showBrowserUpgrade();
      }
    }
  } else if (ua.match(/(safari)/i) != null) {
    //showBrowserUpgrade();
  } else { //其他瀏覽器
    showBrowserUpgrade();
  }
}
function showBrowserUpgrade() {
  $("#browser_upgrade").css("display", "");
  $("#loginArea").addClass("loginArea_shift");
  setTimeout(close_upgrade, 10000);
}
//function checkBrowserVersion() {
//}
function checkSelectable(e) {
  var targ;
  if (!e) var e = window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ == null || targ == undefined || targ == '') return false;
  var name = targ.getAttribute("type");
  if (name != null && name.indexOf("text") >= 0) {
    return true;
  }
  if (name != null && name.indexOf("password") >= 0) {
    return true;
  }
  return false;
}
/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/
function css_browser_selector(id) {
  var ua = navigator.userAgent.toLowerCase(),is = function(t) {
    return ua.indexOf(t) > -1
  },g = 'gecko',w = 'webkit',s = 'safari',o = 'opera',m = 'mobile',h = document.getElementById(id),b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + RegExp.$1) : is('firefox/2') ? g + ' ff2' : is('firefox/3.5') ? g + ' ff3 ff3_5' : is('firefox/3.6') ? g + ' ff3 ff3_6' : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')) : is('konqueror') ? 'konqueror' : is('blackberry') ? m + ' blackberry' : is('android') ? m + ' android' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '') : is('mozilla/') ? g : '', is('j2me') ? m + ' j2me' : is('iphone') ? m + ' iphone' : is('ipod') ? m + ' ipod' : is('ipad') ? m + ' ipad' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' + (is('windows nt 6.0') ? ' vista' : '') : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js'];
  c = b.join(' ');
  if (h != null || h != undefined) {
    h.className += ' ' + c;
  }
  return c;
};
// check email format
function isEmail(email) {
  var currVal = email;
  if (currVal == '')
    return false;
  //Declare Regex
  var rxDatePattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  var dtArray = currVal.match(rxDatePattern); // is format OK?

  if (dtArray == null)
    return false;
  return true;
}
// check date format
function isDate(txtDate, pattern, ypos, mpos, dpos) {
  var currVal = txtDate;
  if (currVal == '')
    return false;

  //Declare Regex
  var rxDatePattern = /^(\d{4})(\d{2})(\d{2})$/;
  if (pattern != null) rxDatePattern = pattern;
  var dtArray = currVal.match(rxDatePattern); // is format OK?

  if (dtArray == null)
    return false;

  if (ypos == null) ypos = 1;
  if (mpos == null) mpos = 2;
  if (dpos == null) dpos = 3;

  //Checks for yyyymmdd format.
  dtYear = dtArray[ypos];
  dtMonth = dtArray[mpos];
  dtDay = dtArray[dpos];

  if (dtMonth < 1 || dtMonth > 12)
    return false;
  else if (dtDay < 1 || dtDay > 31)
    return false;
  else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
    return false;
  else if (dtMonth == 2) {
    var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
    if (dtDay > 29 || (dtDay == 29 && !isleap))
      return false;
  }
  return true;
}
function phone_appVersion() {
    if ((/iphone|ipod|ipad.*os 7/gi).test(navigator.appVersion) || (/iphone|ipod|ipad.*os 6/gi).test(navigator.appVersion) || (/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion) || (navigator.appVersion).indexOf("GT-I9300") > -1) {
    window.onpageshow = function(evt) {
      if (evt.persisted) {
        document.body.style.display = "none";
        location.reload();
      }
    };
  }
}
function check_us_code(target,display) {
  var a = parseInt(target.value);
  if (a != NaN && a == 1) {
    if (display == null || display == undefined || display) {
      alert('您輸入之聯絡電話，因國碼欄位為「1」，本網路銀行無法受理，請您洽各營業據點櫃檯辦理變更，造成不便，敬請見諒！');
    }
    target.value = '';
    return false;
  }
  return true;
}

function daysInMonth(month,year) {
  var dd = new Date(year, month, 0);
  return dd.getDate();
}
function setDayDrop(dyear, dmonth, dday) {
  var year = dyear.options[dyear.selectedIndex].value;
  var month = dmonth.options[dmonth.selectedIndex].value;
  var days = daysInMonth(month,year);
  if (dday != null ) {
  dday.options.length = 0;
    for (var i = 1; i <= days; i++)
      dday.options[dday.options.length] = new Option(i + "日",padLeft(i,2));
  }
}
function setDay() {
  var year = document.getElementById('year');
  var month = document.getElementById('month');
  var day = document.getElementById('day');
  setDayDrop(year,month,day);
}
// document.getElementById('year').onchange = setDay;
// document.getElementById('month').onchange = setDay;
function ddCalendar(y,m,d,is_gregorian,offset) {
  var year = document.getElementById(y);
  var month = document.getElementById(m);
  var day;
  if ( d != null ) day = document.getElementById(d);
  var today = new Date();
  var yy = today.getFullYear();
  if (is_gregorian == null || !is_gregorian) {
    for (var i = 1; i <= (yy - 1911); i++)
      year.options[year.options.length] = new Option(i + "年",i + 1911);
    year.options[78].selected = true;
  }
  else if (is_gregorian) {
    for (var i = 0; i < offset; i++)
      year.options[year.options.length] = new Option(yy + i + "年", yy + i);
  }
  if (day != null ) {
    for (var i = 1; i <= 31; i++)
      day.options[day.options.length] = new Option(i + "日",padLeft(i,2));
  }
  this.change = function() { setDayDrop(year,month,day) };
}
function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}
//or as a Number prototype method:
Number.prototype.padLeft = function (n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}