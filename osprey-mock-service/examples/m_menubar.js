document.write("<script src='/mma8/mobile/js/jquery/jquery_latest.securejs' type='text/javascript' language='javascript'></script><script src='/mma8/mobile/js/m.sinopac.common.js' type='text/javascript' language='javascript'></script><script src='/mma8/mobile/js/MobileBank.js' type='text/javascript' language='javascript'></script><script src='/mma8/mobile/js/format.js' type='text/javascript' language='javascript'></script><script src='/mma8/mobile/js/script.min.js' type='text/javascript' language='javascript'></script><script type='text/javascript' language='javascript'>    var mma_path='http://10.11.22.234';	var mobileType = 'MWEB';    var loginflag = 'N';		function OpenWindow(url) {	window.open(url);}function sendsms(tel,msg) {  return;}function callout(tel) {  return;}function relogin(url) {  return;}function setredirect(weburl,appfun,param,objForm) {  objForm.submit();  /*return;*/}function setback(title,url) {  return;}function cardsetback(title,url) {  return;}function start_app_function(functionid) {  return;}function showalert(msg) {  window.alert(msg);}function setInputPlaceHolder() {    var results = document.getElementsByClassName('default-value');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入');	var results = document.getElementsByClassName('default-custid');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入身分證字號');    	results = document.getElementsByClassName('default-usercode');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入使用者代碼');	results = document.getElementsByClassName('default-password');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入網路密碼');	}		var mmaServer = '';var custidMasked = false;var default_values = new Array();function passwordClicked(input) {    set_input_type(input, 'password');}function passwordLostFocus(input) {    if (input.value == '') {        set_input_type(input, 'text');    }}function set_input_type(input, intype) {    try {        input.type = intype;    }    catch (e) {        ie_set_input_type(input, intype);    }}function gt(id) {    return document.getElementById(id).value;}function g(id) {    return document.getElementById(id);}function st(id, v) {    document.getElementById(id).value = v;}function ie_set_input_type(input, type) {    try {        var input2 = input.cloneNode(false);        switch (type) {            default:            case 'text':                {                    input2.type = 'text';                    break;                }            case 'password':                {                    input2.type = 'password';                    break;                }        }        input2.id = input.id;        input.parentNode.replaceChild(input2, input);    }    catch (e) {        window.status = e.message;    }}function isDefaultValue(input) {    if (input == '' || input == null || input == undefined) {        return true;    }    return false;}function clearInput() {	g('ClientErrorMessage').innerHTML = '';	if (!isDefaultValue(gt('CustId_Input')) && !custidMasked) {        st('CustId', gt('CustId_Input'));    }    if (!isDefaultValue(gt('UserCode_Input'))) {        st('UserCode', gt('UserCode_Input'));    }    if (!isDefaultValue(gt('Password_Input'))) {        st('UserPWD', gt('Password_Input'));    }    if (gt('CustId') == '' || gt('UserCode') == '' || gt('UserPWD') == '') {        g('ClientErrorMessage').innerHTML = '<font color=\"red\">' + noLoginEntryMessage + '</font><br/><br/>';        hideBlock();        return false;    }    if (gt('UserCode').length < 6 || gt('UserPWD').length < 6) {      if (location.href.indexOf('mma_en_remit_login.aspx')>-1) {		g('ClientErrorMessage').innerHTML = '<font color=\"red\">Please enter the Use ID and Network Password with more than six digits</font><br/><br/>';	  } else {		g('ClientErrorMessage').innerHTML = '<font color=\"red\">請輸入長度大於6碼的使用者代碼及網路密碼。</font><br/><br/>';	  }      hideBlock();      return false;    }    st('Password_Input', '');    st('CustId_Input', '');    st('UserCode_Input', '');	/*處理特定iphone手機localstorage的問題*/	try {		if (isSaved()) {			window.localStorage['owner'] = gt('CustId');		}    } catch (err) {           /*showalert('savid exception： ' + err);*/    }    return true;}function isSaved() {    return document.getElementById('saveId_i').checked;}function resetInput() {    st('UserCode', '');    st('UserPWD', '');    st('Password_Input', '');    st('UserCode_Input', '');    st('CustId_Input', '');    clearCustid();    set_input_type(g('Password_Input'), 'text');    default_values = new Array();    if (isSaved()) {        toggleSwitch('saveId');    }}function showBlock() {    submitFlag = 1;    var blockDiv = document.getElementById('disablingDiv');    if (blockDiv == null) {        blockDiv = document.createElement('div');        blockDiv.id = 'disablingDiv';        var bd = document.body;        var el = document.documentElement;        var ht = Math.max(bd.scrollHeight, bd.offsetHeight, el.clientHeight, el.scrollHeight, el.offsetHeight);        var css = 'display:block; position:absolute; z-index: 10000; left:0px; top:0px; width:100%; height:' + ht + 'px; background-color: white; filter:alpha(opacity=0); opacity:0.0;';        blockDiv.style.cssText = css;        document.body.appendChild(blockDiv);    }}function hideBlock() {    document.getElementById('disablingDiv').style.display = 'none';}function maskCustId(custid) {    var len = custid.toString().length;    /*no mask when length less than 6.*/    if (len < 6) {        return custid;    }    var cloakingCharacter = (navigator.platform == 'MacIntel') ? '\u2022' : '\u25CF';    var head = custid.toString().substring(0, len - 3);    var mid = '';    for (var i = 0; i < 3; i++) {        mid += cloakingCharacter;    }    return head + mid;}function clearCustid() {    st('CustId', '');    custidMasked = false;}function clearCustidKey(e) {  if (custidMasked) {    st('CustId_Input', '');    clearCustid();  }}function maskThis() {  if (custidMasked) return;  if (!isDefaultValue(gt('CustId_Input'))) {    st('CustId', gt('CustId_Input'));    st('CustId_Input', maskCustId(gt('CustId')));    custidMasked = true;  }}/*iphone-like checkbox/switch*/function toggleSwitch(id) {  var sw = document.getElementById(id);  var toggled = sw.getAttribute('toggled') != 'true';  if (sw) {    sw.setAttribute('toggled', toggled);  }  var chkbox = document.getElementById(id + '_i');  if (toggled) {    chkbox.checked = true;  } else {    chkbox.checked = false;    window.localStorage.removeItem('owner');    clearCustid();    st('CustId_Input', '');  }}function readCustIdFromCookie() {  var cookie = window.localStorage['owner'];  if (cookie != undefined && cookie != null) {      st('CustId', cookie);      st('CustId_Input', maskCustId(cookie));      custidMasked = true;      g('saveId_i').setAttribute('checked', true);      toggleSwitch('saveId');  }}function checkRead(allList, readStorage, disp) {  var list = document.getElementById(allList).value;  var notice = list.split(',');  var count = notice.length;  if (window.localStorage[readStorage] != null) {    read = window.localStorage[readStorage].split(',');    var upd = null;    for (var i in read) {      if (notice.indexOf(read[i]) != -1) {        count--;        if (upd != null)          upd += (',' + read[i]);        else          upd = read[i];      }    }    window.localStorage[readStorage] = upd;  }  if (list && list.length > 0 && count > 0)    document.getElementById(disp).innerText = count.toString();  else    document.getElementById(disp).style.display = 'none';}function toggleNewsRead(readStorage, oid) {  var store = window.localStorage[readStorage];  if (store != null) {    if (store.indexOf(oid) == -1) {      window.localStorage[readStorage] = store + ',' + oid;    }  }  else {    window.localStorage[readStorage] = oid;  }}function toggleNewFlag(alist, readStorage, newImage) {  var allList = document.getElementById(alist).value.split(',');  var store = window.localStorage[readStorage];  for (var i in allList) {    if (store == null || store.indexOf(allList[i]) == -1) {      document.getElementById('n' + allList[i]).innerHTML = '<img src=\"/images/mobile/\"' + newImage + 'class=\"newsNew\"/>';    }  }}/*for show view*/function tglSaveID(input_id, checkBox_id) {    var checkBoxes = $('#' + checkBox_id);    var id = $('#' + input_id);        if (localStorage.savedID == null || localStorage.savedID == '') {        checkBoxes.prop('checked', false);    }else {        checkBoxes.prop('checked', true);        id.val(localStorage.savedID);    }}/*for save action*/function doSaveID(input_id,checkBox_id) {    var isChecked = $('#' + checkBox_id).is(':checked');    var id = $('#' + input_id).val();    if (isChecked) {        localStorage.setItem('savedID', id);    }else {        localStorage.removeItem('savedID');    }}function sendsms(tel,msg) {  return;}function callout(tel) {  return;}function relogin(url) {  return;}function setredirect(weburl,appfun,param,objForm) {  objForm.submit();  /*return;*/}function setback(titleName,headerName,backUrl) {	document.title=titleName;	$('#global').html('<span class=\"nav\" id=\"back\"> <a href=\"' + backUrl + '\">Back</a></span><h1>' + headerName + '</h1>');}function start_app_function(functionid) {  return;}function showalert(msg) {  window.alert(msg);}function setInputPlaceHolder() {    var results = document.getElementsByClassName('default-value');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入');	var results = document.getElementsByClassName('default-custid');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入身分證字號');    	results = document.getElementsByClassName('default-usercode');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入使用者代碼');	results = document.getElementsByClassName('default-password');    for(var i=0; i<results.length; i++) results[i].setAttribute('placeholder', '請輸入網路密碼');	}				function setheader(headerName,backUrl,logoutUrl) {		if (headerName=='永豐銀行')  {			$('#divHeader').html('<span class=\"nav\" id=\"home\"><a href=\"main_021.html\">Home</a></span><h1 id=\"sinopac\">永豐銀行</h1>');							} else {			$('#divHeader').html('<span class=\"nav\" id=\"back\"> <a href=\"javascript: void(0);\" id=\"hrefBack\">Back</a></span><h1>'+headerName+'</h1>');			$( '#hrefBack' ).click(function() {				location.href=backUrl;			});				$( '#hrefLogout' ).click(function() {				location.href=logoutUrl;			});					}	}	function setheader(titleName,headerName,backUrl,logoutUrl) {		document.title=titleName;				if (logoutUrl=='') logoutUrl='/m/member/login/m_logout.aspx';				var sLogouthtml='';		if (loginflag=='Y') {			sLogouthtml='<span class=\"logout\"><a href=\"'+ logoutUrl + '\">登出</a></span>';		} else {			sLogouthtml='<span class=\"logout\"><a href=\"/m/member/login/m_login.aspx\">登入</a></span>';		}				/*頁面不需要登入登出按鈕*/		if (logoutUrl=='N') sLogouthtml='';				if (headerName == '永豐銀行' || headerName == '') {			backUrl='/m/m_home.aspx';			$('#global').html('<span class=\"nav\" id=\"back\"> <a href=\"' + backUrl + '\">Back</a></span><h1>' + headerName + '</h1>' + sLogouthtml);        } else if (headerName == 'home') {			if (loginflag!='Y') {				sLogouthtml='<span class=\"logout\"><a href=\"/m/member/login/m_login.aspx?RequestTrans=MobileCard\">登入</a></span>';			}            $('#global').html('<span class=\"nav\" id=\"setting\"><a href=\"m_setup.aspx\">setting</a></span><h1 id=\"sinopac\"><img src=\"/mma8/mobile/images/nav/SinoPac.png\" class=\"img-flexable-size\"></h1>' + sLogouthtml);        } else {			$('#global').html('<span class=\"nav\" id=\"back\"> <a href=\"' + backUrl + '\">Back</a></span><h1>' + headerName + '</h1>' + sLogouthtml);				}			}			var mmaServer = '';var custidMasked = false;var default_values = new Array();function passwordClicked(input) {    set_input_type(input, 'password');}function passwordLostFocus(input) {    if (input.value == '') {        set_input_type(input, 'text');    }}function goback(url){	window.location = url;}function sinopacaction(type, params){	if(type=='exitwebview')/*回黃金的總覽*/	{			window.location = '/m/m_menu.aspx?num=3';	}	else if(type=='acctqry')/*換匯_看明細 轉到帳戶總覽-查詢帳戶/明細，顯示該帳號明細*/	{		tr_mobile.action='/m/bank/transdetail/m_transdetail.aspx';		tr_mobile.submit();	}	else if(type=='swappretr')/*預約換匯_看明細 查詢預約*/	{		tr_mobile.action='/m/bank/pretransferdetail/m_pretransfer.aspx?PreTransferType=01';		tr_mobile.submit();	}	else if(type=='gold')/*買賣黃金_看明細*/	{		tr_mobile.action='/m/gold/goldtransdetail/m_goldtransdetail.aspx';		tr_mobile.submit();		}	else if(type=='fix')/*定存開單_看明細/申請註銷續存_看明細*/	{		tr_mobile.action='/m/bank/timedeposit/m_querytd.aspx';		tr_mobile.submit();		}	else if(type=='inputpretr')/*臺幣預約_看明細 查詢預約*/	{		tr_mobile.action='/m/bank/pretransferdetail/m_pretransfer.aspx?PreTransferType=00';		tr_mobile.submit();	}	else if(type=='currsubpayqry')/*次交票看明細*/	{		tr_mobile.action='/m/bank/transdetail/m_transdetail.aspx';		tr_mobile.submit();		}}function SaveIdAlert() {	var isChecked = $('#saveId_i').is(':checked');	if(isChecked){		alert('已勾選「記住身分證字號」，下次登入時不用輸入身分證字號。');	}	else {		alert('已取消「記住身分證字號」，下次登入時需自行輸入。');	}}		$(document).ready(function () {		if (mobileType == 'MAPP') {			$('#global').hide();		}	});</script><div class='popup' id='sessionWarning' style='height:auto;display:none'>	<div class='content warning' style='font-size:0.85em;padding:19px;height:auto;'>		<div id='modalMessage2'></div>		<div id='preExpired2' class='btnSet' style='margin:20px 0 10px 0'>			<a href='javascript:void(0)' onclick='ok2()'><span>繼續瀏覽</span></a>			<a href='javascript:void(0)' onclick='cancel2()'><span>登出網站</span></a>		</div>		<div id='expired2' class='btnSet' style='margin-top: 10px;display:none'>			<a href='javascript:void(0)' onclick='cancel2()' style='margin: 0 auto; float: none;'><span>確認</span></a>		</div>	</div></div><script type='text/javascript' src='/JavaScript/BrowserModalDialog.js'></script><script type='text/javascript' src='/mma8/mobile/js/SessionWarningTimer.js'></script><link href='/mma8/mobile/css/style_mweb.css' rel='stylesheet' type='text/css'><script language='javascript' type='text/javascript'>var extTimerRun=false;var timeoutReminder=540000;var reminderMessage='親愛的客戶您好：\\n您登入網站未執行任何瀏覽動作已超過系統時限，為保障您的網站使用安全，本系統將於 {0} 秒後為您登出網站，若您欲繼續使用，請點選「繼續瀏覽」按鈕，或直接點選「登出網站」按鈕，登出本系統。';var expirationMessage='由於您未執行任何瀏覽動作已逾時 10 分鐘，系統已自動為您登出網站，以確保安全。';var timeout=60;var mmaServer='http://10.11.22.234';var count=timeout;var startTimer;var stopTimer;var downTimer;function restartExtTimer() {if (extTimerRun) {if ( startTimer != null ){clearTimeout( startTimer );clearTimeout( stopTimer );}startTimer = setTimeout(ShowPopup2, timeoutReminder);}  }</script>");