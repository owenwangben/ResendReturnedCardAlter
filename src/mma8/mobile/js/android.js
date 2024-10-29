function sendsms(tel,msg) {
  window.HTMLOUT.androidFunSendSMS(tel, msg);
}

function callout(tel) {
  window.HTMLOUT.androidFunCallOut(tel);
}

function relogin(url) {
  window.HTMLOUT.androidFunRelogin(url);
}

function setback(title,url) {
  window.HTMLOUT.androidFunSetBack(title, url);
}

function start_app_function(functionid) {
  window.HTMLOUT.androidFunStartApp(functionid);
}

function showalert(msg) {
  window.HTMLOUT.androidFunShowAlert(msg);
}

function setInputPlaceHolder() {
}

function openOTPPayment(url,title) {
  window.HTMLOUT.androidFunOpenOTPPayment(url,title);
}