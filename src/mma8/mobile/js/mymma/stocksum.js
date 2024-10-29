
    //紅色點點
		function genMobileMenu(JsonObj,Title,UlMenu,liID,GenType,DataColumn,SSign,funClickName) { 
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfoType= JsonObj[0]["StockType"];
         if(objSubInfoType!="[]"){
         
			     UlMenu.append("<p>"+Title+"</p>"); 
				   for (i = 0; i < objSubInfoType.length; i++) { 
				  
					     var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				       var tmp2=objSubInfoType[i]["myStockValue"] ;
				       var tmp3=objSubInfoType[i]["myStockText"] ;
				  
					     if (GenType=="0") {
						      UlMenu.append('<li id="' + liID+i + '" onClick="doQueryStocksum(' + tmp2 + ')"><div>' + tmp3 + '</li>')
					     } else {
						      UlMenu.append('<li id="' + liID+i + '" onClick="doQueryStocksum(' + tmp2 + ')"><div>' + tmp3 + '</li>')
					     }								
				   }
         }
        
			   DataLen=objSubInfoType.length;
               
      } else {
         showalert(JsonObj[0]["Message"]);
      }	
			return DataLen;			
	  }	

	function genStockListResult(JsonObj, olObject, funClickName, Type) {
		    
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var UpdateTime = JsonObj[0]["UpdateTime"];
        	  olObject.append('<li><p align="center">' + UpdateTime + '</p></li>');
        	  
            var objSubInfo41  = JsonObj[0]["SubInfo41"]; //現股
            var objSubInfo42  = JsonObj[0]["SubInfo42"]; //融資
            var objSubInfo43  = JsonObj[0]["SubInfo43"]; //融券(損益)
            var objSubInfo44  = JsonObj[0]["SubInfo44"]; //擔保品
            var objSubInfo48  = JsonObj[0]["SubInfo48"]; //在途款
            var objSubInfo49  = JsonObj[0]["SubInfo49"]; //融資借款
            var objSubInfo463 = JsonObj[0]["SubInfo463"]; //期貨
            var stotype = Type;
            
            //現股
            if(stotype=="41"){
            	
            	var objSubInfoType= JsonObj[0]["StockType"];
            	for (i = 0; i < objSubInfoType.length; i++) {
            		var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				        var tmp2=objSubInfoType[i]["myStockValue"] ;
				        var tmp3=objSubInfoType[i]["myStockText"] ;
            		if (tmp2=="41"){
            			 $('#myStockInfo').val(tmp1);
            	  } 
            	}
            	//var titleText = JsonObj[0]["StockType"][1]["myStockTitleInfo"];
        	    //$('#myStockInfo').val(titleText);
            	
            	$('#myStockText').val("現股");
            	olObject.append('<li class="head"><div>股票</div><div>收盤價</div><div>市值<br />集保股數</div></li>');
            	for (i = 0; i < objSubInfo41.length; i++) {
            	  var tmp1 = objSubInfo41[i]["DataValue1"] ; //股票
            	  var tmp2 = objSubInfo41[i]["DataValue2"] ; //收盤價
                var tmp3 = objSubInfo41[i]["DataValue3"];  //市值
                var tmp4 = objSubInfo41[i]["DataValue4"];  //集保股數    
                				
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
              }
            }
            //融資
            if(stotype=="42"){
            	
            	var objSubInfoType= JsonObj[0]["StockType"];
            	for (i = 0; i < objSubInfoType.length; i++) {
            		var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				        var tmp2=objSubInfoType[i]["myStockValue"] ;
				        var tmp3=objSubInfoType[i]["myStockText"] ;
            		if (tmp2=="42"){
            			 $('#myStockInfo').val(tmp1);
            	  } 
            	}
            	
            	$('#myStockText').val("融資");
            	olObject.append('<li class="head"><div>股票</div><div>收盤價</div><div>市值<br />集保股數</div></li>');
            	for (i = 0; i < objSubInfo42.length; i++) {
            	  var tmp1 = objSubInfo42[i]["DataValue1"] ; //股票
            	  var tmp2 = objSubInfo42[i]["DataValue2"] ; //收盤價
                var tmp3 = objSubInfo42[i]["DataValue3"];  //市值
                var tmp4 = objSubInfo42[i]["DataValue4"];  //集保股數    
                				
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
              }
            }
            //融券(損益)
            if(stotype=="43"){
            	
            	var objSubInfoType= JsonObj[0]["StockType"];
            	for (i = 0; i < objSubInfoType.length; i++) {
            		var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				        var tmp2=objSubInfoType[i]["myStockValue"] ;
				        var tmp3=objSubInfoType[i]["myStockText"] ;
            		if (tmp2=="43"){
            			 $('#myStockInfo').val(tmp1);
            	  } 
            	}
            	
            	$('#myStockText').val("融券(損益)");
            	olObject.append('<li class="head"><div>股票</div><div>收盤價</div><div>市值<br />集保股數</div></li>');
            	for (i = 0; i < objSubInfo43.length; i++) {
            	  var tmp1 = objSubInfo43[i]["DataValue1"] ; //股票
            	  var tmp2 = objSubInfo43[i]["DataValue2"] ; //收盤價
                var tmp3 = objSubInfo43[i]["DataValue3"];  //市值
                var tmp4 = objSubInfo43[i]["DataValue4"];  //集保股數    
                				
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
              }
            }
            //擔保品
            if(stotype=="44"){
            	
            	var objSubInfoType= JsonObj[0]["StockType"];
            	for (i = 0; i < objSubInfoType.length; i++) {
            		var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				        var tmp2=objSubInfoType[i]["myStockValue"] ;
				        var tmp3=objSubInfoType[i]["myStockText"] ;
            		if (tmp2=="44"){
            			 $('#myStockInfo').val(tmp1);
            	  } 
            	}
            	
            	$('#myStockText').val("擔保品");
            	olObject.append('<li class="head"><div>股票</div><div>收盤價</div><div>市值<br />集保股數</div></li>');
            	for (i = 0; i < objSubInfo44.length; i++) {
            	  var tmp1 = objSubInfo44[i]["DataValue1"] ; //股票
            	  var tmp2 = objSubInfo44[i]["DataValue2"] ; //收盤價
                var tmp3 = objSubInfo44[i]["DataValue3"];  //市值
                var tmp4 = objSubInfo44[i]["DataValue4"];  //集保股數    
                				
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
              }
            }
            //在途款
            if(stotype=="48"){
            	
            	var objSubInfoType= JsonObj[0]["StockType"];
            	for (i = 0; i < objSubInfoType.length; i++) {
            		var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				        var tmp2=objSubInfoType[i]["myStockValue"] ;
				        var tmp3=objSubInfoType[i]["myStockText"] ;
            		if (tmp2=="48"){
            			 $('#myStockInfo').val(tmp1);
            	  } 
            	}
            	
            	$('#myStockText').val("在途款");
            	olObject.append('<li class="head"><div>股票</div><div>交易日期<br />交割日期</div><div>買賣類別<br />入帳/扣款金額</div></li>');
            	for (i = 0; i < objSubInfo48.length; i++) {
            	  var tmp1 = objSubInfo48[i]["DataValue1"] ; //股票
            	  var tmp2 = objSubInfo48[i]["DataValue2"] ; //交易日期
                var tmp3 = objSubInfo48[i]["DataValue3"];  //交割日期
                var tmp4 = objSubInfo48[i]["DataValue4"];  //買賣類別  
                var tmp5 = objSubInfo48[i]["DataValue4"];  //入帳/扣款金額 
                				
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
              }
            }
            //融資借款
            if(stotype=="49"){
            	
            	var objSubInfoType= JsonObj[0]["StockType"];
            	for (i = 0; i < objSubInfoType.length; i++) {
            		var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				        var tmp2=objSubInfoType[i]["myStockValue"] ;
				        var tmp3=objSubInfoType[i]["myStockText"] ;
            		if (tmp2=="49"){
            			 $('#myStockInfo').val(tmp1);
            	  } 
            	}
            	
            	$('#myStockText').val("融資借款");
            	olObject.append('<li class="head"><div>股票</div><div>買價</div><div>融資借款<br />集保股數</div></li>');
            	for (i = 0; i < objSubInfo49.length; i++) {
            	  var tmp1 = objSubInfo49[i]["DataValue1"] ; //股票
            	  var tmp2 = objSubInfo49[i]["DataValue2"] ; //買價
                var tmp3 = objSubInfo49[i]["DataValue3"];  //融資借款<br />集保股數
                var tmp4 = objSubInfo49[i]["DataValue4"];      
                				
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
              }
            }
            //期貨
            if(stotype=="463"){
            	
            	var objSubInfoType= JsonObj[0]["StockType"];
            	for (i = 0; i < objSubInfoType.length; i++) {
            		var tmp1=objSubInfoType[i]["myStockTitleInfo"] ;
				        var tmp2=objSubInfoType[i]["myStockValue"] ;
				        var tmp3=objSubInfoType[i]["myStockText"] ;
            		if (tmp2=="463"){
            			 $('#myStockInfo').val(tmp1);
            	  } 
            	}
            	
            	$('#myStockText').val("期貨");
            	olObject.append('<li class="head"><div>幣別<br />參考匯率<br />權益數</div><div>原始保證金<br />維持保證金</div><div>超額保證金<br />追繳保證金</div></li>');
            	for (i = 0; i < objSubInfo463.length; i++) {
            	  var tmp1 = objSubInfo463[i]["DataValue1"] ; //幣別
            	  var tmp2 = objSubInfo463[i]["DataValue2"] ; //參考匯率
                var tmp3 = objSubInfo463[i]["DataValue3"];  //權益數
                var tmp4 = objSubInfo463[i]["DataValue4"];  //原始保證金
                var tmp5 = objSubInfo463[i]["DataValue5"];  //維持保證金
                var tmp6 = objSubInfo463[i]["DataValue6"];  //超額保證金
                var tmp7 = objSubInfo463[i]["DataValue7"];  //追繳保證金       
                				
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
              }
            }
            
        }
        if (JsonObj[0]["Message"] == "無證券庫存") {
        	
        	olObject.append('<li><a><p align="center">'+"無證券庫存"+'</p></a></li>');
        	
        }
        
  }


    



