//轉出帳號以外的下拉選單
//Type=1 約定轉入帳號
//Type=2 常用非約定轉入帳號
//Type=3 銀行代碼
function getDropdown_Menu(JsonObj, DialogMenuType,Type) {
  if (JsonObj[0]["Header"] == "SUCCESS") {
    var objSubInfo = JsonObj[0]["SubInfo"];
    for (i = 0; i < objSubInfo.length; i++) {
      var tmp1 = objSubInfo[i]["DataText2"]+objSubInfo[i]["DataText1"];
      var tmp2 = objSubInfo[i]["DataValue"];
      var tmp3 = objSubInfo[i]["DataType"];
      if(tmp3==Type){
        $("#" + DialogMenuType).append($("<option></option>").attr("value", tmp2).text(tmp1));
      }
    }
  } else {
    showalert(JsonObj[0]["Message"]);
  }
}
//轉出帳號下拉選單
function getDebitAcct_Dropdown_Menu(JsonObj, DialogMenuType) {
  if (JsonObj[0]["Header"] == "SUCCESS") {
    var objSubInfo = JsonObj[0]["SubInfo"];
    for (i = 0; i < objSubInfo.length; i++) {
      var tmp1 = objSubInfo[i]["DataText2"]+objSubInfo[i]["DataText1"];	  
      var tmp2 = objSubInfo[i]["DataValue"] + "$$" + objSubInfo[i]["DisplayText"];
      $("#" + DialogMenuType).append($("<option></option>").attr("value", tmp2).text(tmp1));
    }
  } else {
    showalert(JsonObj[0]["Message"]);
  }
}
//提示訊息
function showalert(s) {
  alert(s);
}
/*
<summary>執行JQuery的Ajax</summary>
<param name="url" type="string">Ajax的URL</param>
<param name="dataType" type="string">return的格式，json,html,.....</param>
<param name="asyncType" type="string">true==async</param>
<param name="formSerialize" type="JQuery Object">Post回Server的data Object</param>
<returns type=""></returns>
*/	
function JQCommon_sendAjax(url,dataType,asyncType,formSerialize) {
  url=url+"?"+new Date().getTime();
  //alert(url);
  $.ajax({
      url: url,
      type: "POST",
      data: formSerialize,
      dataType: dataType,
      async: asyncType,
      cache: false,
      controller: this,
      success: function(responseData) {
          if (responseData != null) {
              results = responseData;
          }
      },
      error: function(aXMLHttpRequest, textStatus, errorTown) {
          //showalert(responseData.data);
          showalert("FAIL");
      }
  });
  return results;
}

//左邊補0
function padLeft(str, len) {
  str = '' + str;
  if (str.length >= len) {
    return str;
  } else {
    return padLeft("0" + str, len);
  }
}