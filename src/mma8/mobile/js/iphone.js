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
    for(var i=0; i<results.length; i++) results[i].setAttribute("placeholder", "請輸入");
}