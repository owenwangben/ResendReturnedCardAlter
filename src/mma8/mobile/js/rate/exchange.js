	function genExchangeTypeResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<li><p align="center">' + TitleInfo + '</p></li>');
        	  
        	  olObject.append('<li class="head"><div>幣別</div><div>買入</div><div>賣出</div></li>');
            var objSubInfo = JsonObj[0]["SubInfo"];
            if($('#exchangeType').val() == "CASH"){
            	 
            	  var curr_usd=objSubInfo[0]["DataValue1"] ; //幣別
            	  var buy_usd=objSubInfo[0]["DataValue2"] ; //買入
                var sale_usd = objSubInfo[0]["DataValue3"]; //賣出
                  
                var curr_jpy=objSubInfo[1]["DataValue1"] ; //幣別
            	  var buy_jpy=objSubInfo[1]["DataValue2"] ; //買入
                var sale_jpy = objSubInfo[1]["DataValue3"]; //賣出
                  
                var curr_hkd=objSubInfo[2]["DataValue1"] ; //幣別
            	  var buy_hkd=objSubInfo[2]["DataValue2"] ; //買入
                var sale_hkd = objSubInfo[2]["DataValue3"]; //賣出
                  
                var curr_eur=objSubInfo[3]["DataValue1"] ; //幣別
            	  var buy_eur=objSubInfo[3]["DataValue2"] ; //買入
                var sale_eur = objSubInfo[3]["DataValue3"]; //賣出
                  
                var curr_cny=objSubInfo[14]["DataValue1"] ; //幣別
            	  var buy_cny=objSubInfo[14]["DataValue2"] ; //買入
                var sale_cny = objSubInfo[14]["DataValue3"]; //賣出       
               
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + 14 + '\')"><div>' + curr_usd + '</div><div>' + buy_usd + '</div><div>' + sale_usd + '</div></a></li>');
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + 3 + '\')"><div>' + curr_jpy + '</div><div>' + buy_jpy + '</div><div>' + sale_jpy + '</div></a></li>');
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + 2 + '\')"><div>' + curr_hkd + '</div><div>' + buy_hkd + '</div><div>' + sale_hkd + '</div></a></li>');
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + 1 + '\')"><div>' + curr_eur + '</div><div>' + buy_eur + '</div><div>' + sale_eur + '</div></a></li>');
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + 0 + '\')"><div>' + curr_cny + '</div><div>' + buy_cny + '</div><div>' + sale_cny + '</div></a></li>');
            }
           
            if($('#exchangeType').val() == "REMIT"){
                for (i = 0; i < objSubInfo.length; i++) {
            	     var curr=objSubInfo[i]["DataValue1"] ; //幣別
            	     var buy=objSubInfo[i]["DataValue2"] ; //買入
            	     var sale = objSubInfo[i]["DataValue3"]; //賣出       
                				
                   olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + curr + '</div><div>' + buy + '</div><div>' + sale + '</div></a></li>');
                }
            }
        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            
        }

    }