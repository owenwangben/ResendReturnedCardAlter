    function genTransDetailResult(JsonObj, showType, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
            if ($('#Curr').val() == "TWD"){
             olObject.append('<li class="head"><div>交易日期</div><div>摘要</div><div><span class="expenses">支出</span>/<span class="income">存入</span><br>餘額</div></li>');
             
            }
            else{
             olObject.append('<li class="head"><div>交易日期</div><div>摘要</div><div><span class="expenses">支出</span>/<span class="income">存入</span><br>餘額</div></li>');
            }
            var objSubInfo = JsonObj[0]["SubInfo"];
            for (i = 0; i < objSubInfo.length; i++) {
                var TxnDate = objSubInfo[i]["DataText1"];
                var Dscpt = objSubInfo[i]["DataText3"];
                var TxAmount = objSubInfo[i]["DataText4"];
                var AvailBalance = objSubInfo[i]["DataText5"];
                if ($('#Curr').val() == "TWD"){
                    olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + TxnDate + '</div><div>' + Dscpt + '</div><div>' + TxAmount + '<br>' + AvailBalance + '</div></li>');
                }
                else {
                    var FxRate = objSubInfo[i]["DataText7"];
                    olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + TxnDate + '</div><div>' + Dscpt + '</div><div>' + TxAmount + '<br>' + AvailBalance + '</div></li>');
                }
                
            }

        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
			doQueryByDate(3);	
			$('#liPeriod').hide();
        }

    }
    function genQueryDetail(JsonObj, showType, olObject, Point) {
    
        olObject.html("");        
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo"];
            if (showType == 3) {	
                var TxnDate = objSubInfo[Point]["DataText1"];
                TxnDate = TxnDate.replace(/<br \/>/g, "&nbsp;");
                var ValueDate = objSubInfo[Point]["DataText2"];
                var Dscpt = objSubInfo[Point]["DataText3"];
                var TxAmount = objSubInfo[Point]["DataText4"];
                var AvailBalance = objSubInfo[Point]["DataText5"];
                var CHQNumber = objSubInfo[Point]["DataText6"];
                var FxRate = objSubInfo[Point]["DataText7"];
                var Memo = objSubInfo[Point]["DataText8"];
                olObject.append("<li><div class=\"label\">交易日</div><div><div class=\"slTxt\">" + TxnDate + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">帳務日</div><div><div class=\"slTxt\">" + ValueDate + "</div></div></li>");
                olObject.append("<li><div class=\"label\">摘要</div><div><div class=\"slTxt\">" + Dscpt + "</div></div></li>");
                olObject.append("<li><div class=\"label\"><font color=#ff6000>支出</font>/<font color=#009a12>存入</font></div><div><div class=\"slTxt\">" + TxAmount + "</div></div></li>");
                olObject.append("<li><div class=\"label\">餘額</div><div><div class=\"slTxt\">" + AvailBalance + "</div></div></li>");
                if (CHQNumber.length == 0) { 
                
                }
                else {
                
                    olObject.append("<li><div class=\"label\">票號</div><div><div class=\"slTxt\">" + CHQNumber + "</div></div></li>");
                }
                if ($('#Curr').val() != "TWD"){
                 olObject.append("<li><div class=\"label\">匯率</div><div><div class=\"slTxt\">" + FxRate + "</div></div></li>");
                }
                olObject.append("<li><div class=\"label\">備註</div><div><div class=\"slTxt\">" + Memo + "</div></div></li>");

            } 

        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }

    }	            