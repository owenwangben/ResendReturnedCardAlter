

//當日黃金存摺牌價
function genGoldListResult(JsonObj, olObject, Type, funClickName) {
	olObject.html("");
	if (JsonObj[0]["Header"] == "SUCCESS") {
        	
		if (Type=="Gold_g"){			
			var TitleInfo1 = JsonObj[0]["TitleInfo1"];
        	 olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo1 + '</div>');
        	
			
        	 olObject.append('<li class="head"><div>數量</div><div>銀行買入<br>Bank Buy</div><div>銀行賣出<br>Bank Sell</div></li>');
           var objSubInfo = JsonObj[0]["SubInfo1"];
            
           for (i = 0; i < objSubInfo.length; i++) {
            	 var item=objSubInfo[i]["DataValue1"] ; //項目
            	 var buy = objSubInfo[i]["DataValue2"] ; //買入
                 var sale = objSubInfo[i]["DataValue3"]; //賣出       
                				
               olObject.append('<li><a><div>' + item + '</div><div>' + buy + '</div><div>' + sale + '</div></a></li>');
           }
		}
         else{   
           var TitleInfo2 = JsonObj[0]["TitleInfo2"];
        	 olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo2 + '</div>');
        	  
        	 olObject.append('<li class="head"><div>數量</div><div>銀行買入<br>Bank Buy</div><div>銀行賣出<br>Bank Sell</div></li>');
           var objSubInfo = JsonObj[0]["SubInfo2"];
            
           for (i = 0; i < objSubInfo.length; i++) {
            	 var item=objSubInfo[i]["DataValue1"] ; //項目
            	 var buy=objSubInfo[i]["DataValue2"] ; //買入
               var sale = objSubInfo[i]["DataValue3"]; //賣出       
                				
               olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + item + '</div><div>' + buy + '</div><div>' + sale + '</div></a></li>');
           }
		}
	} else if (JsonObj[0]["Header"] == "FAIL"){
           //showalert(JsonObj[0]["Message"]);
           alert(JsonObj[0]["Message"]);       
	}

}
  
  //黃金存摺轉換條塊應補繳款
 	function genGoldPriceResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
				olObject.append('<li class="head"><div>' + "數量" + '</div><div>' + "價格" + '</div></li>');
				
            var objSubInfo = JsonObj[0]["SubInfo"];
            for (i = 0; i < objSubInfo.length; i++) {
            	  var tmp1 = objSubInfo[i]["DataText"] ; 
            	  var tmp2 = objSubInfo[i]["DataValue"] ;     
                				
                olObject.append('<li><a><div>' + tmp1 + '</div><div>' + '</div><div>' + tmp2 + '</div></a></li>');
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
        }

    }  
  
  //大批銷售黃金存摺價格折讓標準表  
	function genGoldBigResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<li class="head"><div>' + "黃金存摺" + '</div><div>' + "折讓率" + '</div></li>');
        	  
            var objSubInfo = JsonObj[0]["SubInfo"];
            
            for (i = 0; i < objSubInfo.length; i++) {
            	  var tmp1 = objSubInfo[i]["DataValue1"] ; 
            	  var tmp2 = objSubInfo[i]["DataValue2"] ; 
                
                olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div></a></li>');
            }
            

        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            

        }

    } 
    


