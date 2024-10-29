	function genTDUlMenu(JsonObj,Title,UlMenu,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   var objSubInfo=JsonObj[0]["SubInfo"];
			   if (objSubInfo.length>1) {
				 UlMenu.append("<p>"+Title+"</p>");
			   }
         for (i = 0; i < objSubInfo.length; i++) { 
				    var tmp1=objSubInfo[i]["DataText1"] ; //扣帳帳號名稱<br>扣帳帳號&nbsp;幣別中文
				    var tmp2=objSubInfo[i]["DataValue1"] ;	//扣帳帳號
				    var tmp3=objSubInfo[i]["DataValue2"] ; //幣別
				    
				    
				    
				    $('#AcctValue').val(tmp2);
				    $('#Curr').val(tmp3);
				    
				
				    UlMenu.append('<li onclick="'+funClickName+'(\''+tmp2+'\',\''+tmp3+'\')">'+tmp1+'<br>')
         }
			   DataLen=objSubInfo.length;
               
      }else {
         showalert(JsonObj[0]["Message"]);
      }
      	
			return DataLen;			
	}
	
		function genMobileMenu(JsonObj,Title,UlMenu,liID,GenType,DataColumn,SSign,funClickName) { 
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			    var objSubInfo=JsonObj[0]["SubInfo"];
			    UlMenu.append("<p>"+Title+"</p>"); 
				  for (i = 0; i < objSubInfo.length; i++) { 
			   
					  var tmp1=objSubInfo[i]["DataText1"] ; //扣帳帳號名稱<br>扣帳帳號&nbsp;幣別中文
				    var tmp2=objSubInfo[i]["DataValue1"] ;	//扣帳帳號
				    var tmp3=objSubInfo[i]["DataValue2"] ; //幣別
				    var tmp4=objSubInfo[i]["DataText2"] //扣帳帳號名稱
				    var tmp5=objSubInfo[i]["DataText3"] //幣別中文
				    
				   
				    //$('#AcctValue').val(tmp2);
				    //$('#Curr').val(tmp3);
						if (GenType=="0") {
							UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp2+'\',\''+tmp3+'\',\''+tmp4+'\',\''+"00"+'\',\''+tmp5+'\')">'+tmp1+'</li>')
						} else {
							UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp2+'\',\''+tmp3+'\',\''+tmp4+'\',\''+"00"+'\',\''+tmp5+'\')">'+tmp1+'</li>')
						}								
				  }

               
			    DataLen=objSubInfo.length;
               
      } else {
                showalert(JsonObj[0]["Message"]);
      }	
			return DataLen;			
	}	
	
	function setLiValue(objText,val1,objValue,val2,objValue2,val3,val4,val5,objOpt) {
        objText.html(val3 + "<br />" + val1 + " " + val5);
        objValue.val(val1);
        objValue2.val(val3);
        
        objText.css('padding-top', '0');
        objOpt.fadeOut(400, function() {
            $('html').css('overflow', 'auto');
            $('body').find('#overlay').remove();
        });        
    }   		
	function genTDResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo"];
            RecordCount=objSubInfo.length;
            for (i = 0; i < objSubInfo.length; i++) {
            	  var Acc=objSubInfo[i]["DataText1"] ; //扣帳帳號
            	  var Curr=objSubInfo[i]["DataText2"] ; //幣別
                var DEBIT_AMOUNT = objSubInfo[i]["DataText06"]; //扣款金額
                var CREDIT_ACCT = objSubInfo[i]["DataText01"]; //轉入帳號
                var CRT_DATE = objSubInfo[i]["DataText02"]; //設定日期
                var TXN_DATE = objSubInfo[i]["DataText03"];  //生效日期          
                
				        olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\',\''+Acc+ '\',\''+Curr+'\')"><div class="acctInfo">扣款金額：'+DEBIT_AMOUNT+'<br>轉入帳號：'+CREDIT_ACCT+'<br>設定日期：'+CRT_DATE+'<br>生效日期：'+TXN_DATE+'</div></a></li>');						
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            //alert(JsonObj[0]["Message"]);
			
			olObject.append("<p class=\"warning\">" + results[0]["Message"] + "</p>");
            //olObject.append('<li><a><p align="center">'+"【GE090】無（原）交易記錄"+'</p></a></li>');

        }

    }
   
    function genQueryDetail(JsonObj, olObject, Point) {
    
        olObject.html("");        
        if (JsonObj[0]["Header"] == "SUCCESS") {
            
                var objSubInfo = JsonObj[0]["SubInfo"];
                var data01 = objSubInfo[Point]["DataText01"]; 
                var data02 = objSubInfo[Point]["DataText02"]; 
				var data03 = objSubInfo[Point]["DataText03"]; 
                var data04 = objSubInfo[Point]["DataText04"];
                var data05 = objSubInfo[Point]["DataText05"];
                var data06 = objSubInfo[Point]["DataText06"];
                var data07 = objSubInfo[Point]["DataText07"];
                var data08 = objSubInfo[Point]["DataText08"];
                var data09 = objSubInfo[Point]["DataText09"];
                var data10 = objSubInfo[Point]["DataText10"];
               
                
               
                olObject.append("<li><div class=\"label\">轉入帳號</div><div><div class=\"slTxt\">" + data01 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">生效日期</div><div><div class=\"slTxt\">" + data03 + "</div></div></li>");
                olObject.append("<li><div class=\"label\">執行日期</div><div><div class=\"slTxt\">" + data04 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">刪除日期</div><div><div class=\"slTxt\">" + data05 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">扣款金額</div><div><div class=\"slTxt\">" + data06 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">資金用途</div><div><div class=\"slTxt\">" + data08 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">處理結果</div><div><div class=\"slTxt\">" + data09 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">預約通路</div><div><div class=\"slTxt\">" + data10 + "</div></div></li>" );
                
           

        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }

    }
  
      function genQueryTWDDetail(JsonObj, olObject, Point) {
    
        olObject.html("");        
        if (JsonObj[0]["Header"] == "SUCCESS") {
            
                var objSubInfo = JsonObj[0]["SubInfo"];
                var data01 = objSubInfo[Point]["DataText01"]; 
                var data02 = objSubInfo[Point]["DataText02"]; 
				var data03 = objSubInfo[Point]["DataText03"]; 
                var data04 = objSubInfo[Point]["DataText04"];
                var data05 = objSubInfo[Point]["DataText05"];
                var data06 = objSubInfo[Point]["DataText06"];
                var data07 = objSubInfo[Point]["DataText07"];
                var data08 = objSubInfo[Point]["DataText08"];
                var data09 = objSubInfo[Point]["DataText09"];
                var data10 = objSubInfo[Point]["DataText10"];
               
                
               
                olObject.append("<li><div class=\"label\">轉入帳號</div><div><div class=\"slTxt\">" + data01 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">生效日期</div><div><div class=\"slTxt\">" + data03 + "</div></div></li>");
                olObject.append("<li><div class=\"label\">執行日期</div><div><div class=\"slTxt\">" + data04 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">刪除日期</div><div><div class=\"slTxt\">" + data05 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">扣款金額</div><div><div class=\"slTxt\">" + data06 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">轉入金額</div><div><div class=\"slTxt\">" + data07 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">資金用途</div><div><div class=\"slTxt\">" + data08 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">處理結果</div><div><div class=\"slTxt\">" + data09 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">預約通路</div><div><div class=\"slTxt\">" + data10 + "</div></div></li>" );
                
           

        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }

    }
function genTWDTDResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo"];
            RecordCount=objSubInfo.length;
            for (i = 0; i < objSubInfo.length; i++) {
            	  var Acc=objSubInfo[i]["DataText1"] ; //扣帳帳號
            	  var Curr=objSubInfo[i]["DataText2"] ; //幣別
                var DEBIT_AMOUNT = objSubInfo[i]["DataText06"]; //扣款金額
                var CREDIT_ACCT = objSubInfo[i]["DataText01"]; //轉入帳號
                var CRT_DATE = objSubInfo[i]["DataText02"]; //設定日期
                var TXN_DATE = objSubInfo[i]["DataText03"];  //生效日期          
                
				        olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\',\''+Acc+ '\',\''+Curr+'\')"><div class="acctInfo">轉入帳號：'+CREDIT_ACCT+'<br>設定日期：'+CRT_DATE+'<br>生效日期：'+TXN_DATE+'<br>扣款金額：'+DEBIT_AMOUNT+'</div></a></li>');						
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            //alert(JsonObj[0]["Message"]);
			
			olObject.append("<p class=\"warning\">" + results[0]["Message"] + "</p>");
            //olObject.append('<li><a><p align="center">'+"【GE090】無（原）交易記錄"+'</p></a></li>');

        }

    }
