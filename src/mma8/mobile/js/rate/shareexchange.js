  var TitleInfo = "";
	function genExchangeTypeResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
        	  
        	  olObject.append('<li class="head"><div>幣別</div><div>&nbsp;</div><div>銀行買入<br />Bank Buy</div><div>銀行賣出<br />Bank Sell</div></li>');
            var objSubInfo = JsonObj[0]["SubInfo"];
            if($('#exchangeType').val() == "CASH"){
            	 
            	  var curr_usd_imageUrl=objSubInfo[0]["DataValue1Img"] ; //國旗圖
            	  var curr_usd=objSubInfo[0]["DataValue1"] ; //幣別
            	  var buy_usd=objSubInfo[0]["DataValue2"] ; //買入
                var sale_usd = objSubInfo[0]["DataValue3"]; //賣出
                 
                var curr_jpy_imageUrl=objSubInfo[1]["DataValue1Img"] ; //國旗圖  
                var curr_jpy=objSubInfo[1]["DataValue1"] ; //幣別
            	  var buy_jpy=objSubInfo[1]["DataValue2"] ; //買入
                var sale_jpy = objSubInfo[1]["DataValue3"]; //賣出
                
                var curr_hkd_imageUrl=objSubInfo[2]["DataValue1Img"] ; //國旗圖   
                var curr_hkd=objSubInfo[2]["DataValue1"] ; //幣別
            	  var buy_hkd=objSubInfo[2]["DataValue2"] ; //買入
                var sale_hkd = objSubInfo[2]["DataValue3"]; //賣出
                 
                var curr_eur_imageUrl=objSubInfo[3]["DataValue1Img"] ; //國旗圖   
                var curr_eur=objSubInfo[3]["DataValue1"] ; //幣別
            	  var buy_eur=objSubInfo[3]["DataValue2"] ; //買入
                var sale_eur = objSubInfo[3]["DataValue3"]; //賣出
                
                var curr_cny_imageUrl=objSubInfo[14]["DataValue1Img"] ; //國旗圖   
                var curr_cny=objSubInfo[14]["DataValue1"] ; //幣別
            	  var buy_cny=objSubInfo[14]["DataValue2"] ; //買入
                var sale_cny = objSubInfo[14]["DataValue3"]; //賣出  
                
                olObject.append('<li><a><div><img src=' + curr_usd_imageUrl + ' width="80%"></div><div>' + curr_usd + '</div><div>' + buy_usd + '</div><div>' + sale_usd + '</div></a></li>');
                olObject.append('<li><a><div><img src=' + curr_jpy_imageUrl + ' width="80%"></div><div>' + curr_jpy + '</div><div>' + buy_jpy + '</div><div>' + sale_jpy + '</div></a></li>');
                olObject.append('<li><a><div><img src=' + curr_hkd_imageUrl + ' width="80%"></div><div>' + curr_hkd + '</div><div>' + buy_hkd + '</div><div>' + sale_hkd + '</div></a></li>');
                olObject.append('<li><a><div><img src=' + curr_eur_imageUrl + ' width="80%"></div><div>' + curr_eur + '</div><div>' + buy_eur + '</div><div>' + sale_eur + '</div></a></li>');
                olObject.append('<li><a><div><img src=' + curr_cny_imageUrl + ' width="80%"></div><div>' + curr_cny + '</div><div>' + buy_cny + '</div><div>' + sale_cny + '</div></a></li>');
            }
           
            if($('#exchangeType').val() == "REMIT"){
                for (i = 0; i < objSubInfo.length; i++) {
                	 var curr_imageUrl=objSubInfo[i]["DataValue1Img"] ; //國旗圖
            	     var curr=objSubInfo[i]["DataValue1"] ; //幣別
            	     var buy=objSubInfo[i]["DataValue2"] ; //買入
            	     var sale = objSubInfo[i]["DataValue3"]; //賣出       
                				
                   olObject.append('<li><a><div><img src=' + curr_imageUrl + ' width="80%"></div><div>' + curr + '</div><div>' + buy + '</div><div>' + sale + '</div></a></li>');
                }
            }
        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            
        }

    }
  //匯率試算 
	function genOutCurrResult(JsonObj, olObject, olObjectOut, funClickNameOut, olObjectIn, funClickNameIn) {
        olObjectOut.html("");
        olObject.html("");
       var TitleInfo = JsonObj[0]["TitleInfo"];
       olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
        
        if (JsonObj[0]["Header"] == "SUCCESS") { 
        	  
        	  
        	   
            var objSubInfo = JsonObj[0]["SubInfo"];
            for (i = 0; i <= objSubInfo.length; i++) { 
				try {
					var tmp1=objSubInfo[i]["DataText"] ;
					var tmp2=objSubInfo[i]["DataValue"] ;
					var tmp3=objSubInfo[i]["DollarText"] ;
					olObjectOut.append('<li><a href="javascript: void(0)" onClick="' + funClickNameOut + '(\'' + tmp2 + '\',\''+tmp1+'\',\''+tmp3+'\')"><div>' + tmp1 + '</div></li>');
					olObjectIn.append('<li><a href="javascript: void(0)" onClick="' + funClickNameIn + '(\'' + tmp2 + '\',\''+tmp1+'\',\''+tmp3+'\')"><div>' + tmp1 + '</div></li>');
				}
				catch(err) {
				}
            }
           
           
        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            
        }
        

  }
  
  //換算 InAmt
  function genEquvamtInAmtResult1(JsonObj, olObjectOut,objRefRate) {
        olObjectOut.val("");
		objRefRate.html("");
		   
        if (JsonObj[0]["Header"] == "SUCCESS") {    
            $('#InAmt').val( JsonObj[0]["InAmt"]);
			      $('#OutAmt').val( JsonObj[0]["OutAmt"]);
            objRefRate.html(JsonObj[0]["RefRate"]);
        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            
        }
        

  }
  
  //換算 OutAmt
  function genEquvamtOutAmtResult1(JsonObj, olObjectOut,objRefRate) {
        olObjectOut.val("");
		objRefRate.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {    
            $('#InAmt').val( JsonObj[0]["InAmt"]);
			      $('#OutAmt').val( JsonObj[0]["OutAmt"]);
            objRefRate.html(JsonObj[0]["RefRate"]);
        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            
        }
        

  }
    
    
    