function showBlock() {}
function OpenWindow(url) {
	window.location.href = url;
}
function sendsms(tel,msg) {
  window.open("sinopac|o|sendsms|o|"+tel+"|o|"+encodeURIComponent(msg));
}
function callout(tel) {
  window.open("tel:"+tel);
}
function relogin(url) {
  document.location="sinopac|o|relogin|o|"+encodeURIComponent(url);
}
function setback(title,url) {
   //alert("sinopac|o|setback|o|"+encodeURIComponent(title)+"|o|"+encodeURIComponent(url)) ;
  document.location="sinopac|o|setback|o|"+encodeURIComponent(title)+"|o|"+encodeURIComponent(url);
}

function setheader(titleName,headerName,backUrl,logoutUrl) {
    //alert("sinopac|o|setback|o|" + encodeURIComponent(headerName) + "|o|" + encodeURIComponent(backUrl));
    document.location = "sinopac|o|setback|o|" + encodeURIComponent(headerName) + "|o|" + encodeURIComponent("");
}

function start_app_function(functionid) {
  document.location="sinopac|o|appfunction|o|"+encodeURIComponent(functionid);
}
function showalert(msg) {
  window.alert(msg);
}

function setInputPlaceHolder() {
    var results = document.getElementsByClassName("default-value");
    for(var i=0; i<results.length; i++) results[i].setAttribute("placeholder", "請輸入");
    results = document.getElementsByClassName("default-password");
    for(var i=0; i<results.length; i++) results[i].setAttribute("placeholder", "請輸入網路密碼");
}


//exitwebview=>回上頁
//acctqry=>換匯的看明細按鈕 轉到帳戶總覽-查詢帳戶/明細，顯示該帳號明細
//swappretr=>預約換匯的看明細按鈕 查詢預約
function sinopacaction(type, params)//三商MWEB CALL NATIVE用
{
//      alert("type="+type+",params="+params);
      var iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", "sinopacaction:{" + (type?type:"") + "}{" + (params?params:"") + "}");
      document.documentElement.appendChild(iframe);
      iframe.parentNode.removeChild(iframe);
	  
}
   
