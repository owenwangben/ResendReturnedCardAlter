function Common_formatAmount(jqObject) {
  valTempValue = jqObject.val().replace(/,/ig, "");
  var re = /(-?\d+)(\d{3})/
  while (re.test(valTempValue)) {
      valTempValue = valTempValue.replace(re, "$1,$2")
  }
    jqObject.val(valTempValue);
}
function Common_formatAcct(jqObject) {
    valTempValue = jqObject.val().replace(/\D/ig, "");
    jqObject.val(valTempValue);
}
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
//度计
function isNum_keyCode() {
  if(event.keyCode<48 || event.keyCode>57)event.returnValue=false
}
//﹃干箂 start
function padLeft(str,lenght){
    if(str.length >= lenght)
        return str;
    else
        return padLeft("0" +str,lenght);
}
function padRight(str,lenght){
    if(str.length >= lenght)
        return str;
    else
        return padRight(str+"0",lenght);
}
//﹃干箂 end
function isNumeric(val)
{
  re = /([0-9])+/;  
  var found = val.match(re);     
  if (found== null || found[0] == null )
    okay = false;
  else if (found[0] == val)
    okay = true;
  else
    okay = false;        
  return okay;
}
//ň棒SQL Enjection

function isSQLFree() {

	//alert('123');

	var test = isSQLFree.arguments[0];

	

	for(var i=0; i<test.length; i++){

		if(test.charAt(i) =='\'' || test.charAt(i)=='\"')

			return false; 

	}

	return true;

}

function isValidEmail() {

	var test = isValidEmail.arguments[0];

	if (test.indexOf('.')==-1)

		return false;

	if (test.indexOf('@')==-1)

		return false;

	if (!isSQLFree(test))

		return false;

	return true;

}

function isValidFormat() {

	var test = isValidFormat.arguments[0];

	var range = '~!@#$%^&*()_+|,./?><{}[]:;\"\'`-=\\';

	for(var i=0; i<test.length; i++){

		//alert(test.charAt(i));

		if(range.indexOf(test.charAt(i))>=0)

			return false;

	}

	return true;

}

