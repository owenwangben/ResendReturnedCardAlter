//檢核輸入欄位為English OR Chinese
function isEnglishORisChinese(name)
{
  var re = /[^a-z^A-Z]/g;//false
  var reg = /^[u4E00-u9FA5]+$/;//false
  
  if(re.test(name)==true && reg.test(name)==false){
    return true;
  }else if(re.test(name)==false && reg.test(name)==true){
    return true;
  }
  return false;
}

//身分證字號檢核
function checkTwID( idStr ) {
  var v_idStr = idStr.length;
  if(v_idStr >= "11") {
    idStr=idStr.substring(0,10);
  }
  idStr=idStr.toUpperCase();
  tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"                     
  A1 = new Array (1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3 );
  A2 = new Array (0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5 );
  Mx = new Array (9,8,7,6,5,4,3,2,1,1);
  
  if ( idStr.length != 10 ) return false;
  i = tab.indexOf( idStr.charAt(0) );
  if ( i == -1 ) return false;
  sum = A1[i] + A2[i]*9;
  
  for ( i=1; i<10; i++ ) {
    v = parseInt( idStr.charAt(i) );
    if ( isNaN(v) ) return false;
    sum = sum + v * Mx[i];
  }
  if ( sum % 10 != 0 ) return false;
  return true;
}