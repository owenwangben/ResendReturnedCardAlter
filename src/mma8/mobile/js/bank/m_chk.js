function genTDResult(JsonObj, olObject, funClickName) {
    olObject.html("");
    if (JsonObj[0]["Header"] == "SUCCESS") {
        var objSubSum = JsonObj[0]["SubSum"];
        for (i = 0; i < objSubSum.length; i++) {
            var chkAcctValue = objSubSum[i]["DataText1"];
			var chkTotalCount = objSubSum[i]["DataText2"];
			var chkTotalAmt = objSubSum[i]["DataText3"];
			var AvailBalance = objSubSum[i]["DataText8"];
			//,\''+chkTotalCount+'\',\''+chkTotalAmt+ '\'
		        
		        olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\',\'' + chkAcctValue + '\',\'' + chkTotalCount + '\',\'' + chkTotalAmt + '\',\'' + AvailBalance + '\')"><div class="acctInfo">'+chkAcctValue+'<br>筆數：<font color="#b9160f">'+chkTotalCount+'</font> 筆<br>金額：<font color="#b9160f">'+chkTotalAmt+'</font> 元</div></a></li>');						
        }

    } else {
        //showalert(JsonObj[0]["Message"]);
        alert(JsonObj[0]["Message"]);

    }

}

function genQueryDetail(JsonObj, ulObject, Point) {
 ulObject.html("");
 ulObject.append('<li class="head"><div style="padding-top:5px;">票號</div><div style="padding-top:5px;">兌付狀態</div><div style="padding-top:5px;">金額</div></li>');
    
 var objSubInfo = JsonObj[0]["SubInfo"];
 var objSubSum = JsonObj[0]["SubSum"];
 
    for (var i = 0; i < objSubInfo.length; i++) {
    if (objSubSum[Point]["DataText1"] == objSubInfo[i]["DataText1"]) {
        var CheckNO = objSubInfo[i]["DataText4"];
        var STATUS = objSubInfo[i]["DataText5"];
        var TxAmt = objSubInfo[i]["DataText6"];
        ulObject.append('<li><a><div>' + CheckNO + '</div><div>' + STATUS + '</div><div>' + TxAmt + '</div></li>');
             
        }
        }
        }
    

