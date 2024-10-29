function genfix_q1_detail(JsonObj, olObject, funClickName) {
  olObject.html("");
  if (JsonObj[0]["Header"] == "SUCCESS") {
      var objSubInfo = JsonObj[0]["SubInfo"];
      for (i = 0; i < objSubInfo.length; i++) {
           var TotalCount=objSubInfo[i]["TotalCount"] ; //起息日期TotalCount
           var TransDate_Y=objSubInfo[i]["TransDate"].substr(0,4)+"/"; //起息日期
           var TransDate_M=objSubInfo[i]["TransDate"].substr(4,2)+"/";
           var TransDate_D=objSubInfo[i]["TransDate"].substr(6) ;
           var TransDate=TransDate_Y+TransDate_M+TransDate_D;
           var App=objSubInfo[i]["App"] ; //存單種類
           var Acct=objSubInfo[i]["Acct"] ; //存單帳號
           var BalanceText=objSubInfo[i]["BalanceText"] ; //存單面額
           var EndDate=objSubInfo[i]["EndDate"] ; //截止日期
           if(TotalCount==""){
             olObject.append('<li><a href="javascript:void(0)" onclick="doSubmit(\''+Acct.replace(/\-/g,'')+'\')"><div class="acctInfo">起息日期：' + TransDate + '<br/>定存種類：' + App + '<br/>定存帳號：' + Acct + '<br/>定存面額：' + BalanceText + '</div></a></li>');
            }
        }
  } else if (JsonObj[0]["Header"] == "FAIL"){
      showalert(JsonObj[0]["Message"]);
      
  }
}