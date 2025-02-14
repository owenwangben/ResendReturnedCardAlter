	  function genTDUlMenu(JsonObj,Title,UlMenu,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0]["SubInfo"];
			   if (objSubInfo.length>1) {
				   UlMenu.append("<p>"+Title+"</p>");
			   }
         for (i = 0; i < objSubInfo.length; i++) { 
				   var tmp1=objSubInfo[i]["AcctText"] ;
				   var tmp2=objSubInfo[i]["AcctValueFormat"] ;	
				   var tmp3=objSubInfo[i]["AvailBalance"] ;
				   var tmp4=objSubInfo[i]["AcctValue"] ;
				   var tmp5=objSubInfo[i]["Curr"] ;
				   UlMenu.append('<li onclick="'+funClickName+'(\''+tmp4+'\',\''+tmp5+'\',\''+tmp3+'\')">'+tmp1+'<br>'+tmp2+'</li>')
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
			   
			   $('#divTDMain').show();
			   var objSubInfo=JsonObj[0]["SubInfo"];
			   UlMenu.append("<p>"+Title+"</p>"); 
				 for (i = 0; i < objSubInfo.length; i++) { 
			   
					 var tmp1=objSubInfo[i]["AcctText"] ;
				   var tmp2=objSubInfo[i]["AcctValueFormat"] ;	
				   var tmp3=objSubInfo[i]["AvailBalance"] ;
				   var tmp4=objSubInfo[i]["AcctValue"] ;
				   if ( tmp4== ""){
				  	 tmp1 = "有/無單定存";
				   }
				   var tmp5=objSubInfo[i]["Curr"] ;
					 if (GenType=="0") {
						 UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp4+'\',\''+tmp5+'\',\''+tmp1+'\',\''+tmp2+'\')">'+tmp1+'<br>'+tmp2+'</li>')
					 } else {
						 UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp4+'\',\''+tmp5+'\',\''+tmp1+'\',\''+tmp2+'\')">'+tmp1+'<br>'+tmp2+'</li>')
					 }								
				 }

               
			   DataLen=objSubInfo.length;
               
      }else {
        //showalert(JsonObj[0]["Message"]);
        $('#divTDMain').hide();
        $("#non_value2").html(results[0]["Message"]);
        
      }	
			return DataLen;			
	  }	
	
	  function setLiValue(objText,val1,objValue,val2,objValue2,val3,val4,objOpt) {
        objText.html(val2 + "<br>" + val4 );
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
            for (i = 0; i < objSubInfo.length; i++) {
                var InterestStartDate = objSubInfo[i]["DataText8"];
                var App = objSubInfo[i]["DataText5"];
                var TDAcctValue = objSubInfo[i]["DataText0"];
                var TDAcctValueFormat = objSubInfo[i]["DataText4"];               
                var BalanceText = objSubInfo[i]["DataText6"];
								var Curr = objSubInfo[i]["DataText2"];
				        olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\',\''+TDAcctValue+ '\',\''+Curr+'\')"><div class="acctInfo">起息日期：'+InterestStartDate+'<br>定存種類：'+App+'<br>定存帳號：'+TDAcctValueFormat+'<br>定存面額：'+BalanceText+'</div></a></li>');						
            }

        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }

    }
   
    function genQueryDetail(JsonObj, olObject, Point, AcctValue) {
        olObject.html("");      
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo"];
            
                var AcctValue = AcctValue;
                var AcctValueFormat = objSubInfo[Point]["DataText3"];
				        var TDAcctValueFormat = objSubInfo[Point]["DataText4"];
                var App = objSubInfo[Point]["DataText5"];
                var TotalAmt = objSubInfo[Point]["DataText6"];
                var CurrText = objSubInfo[Point]["DataText7"];
                var InterestStartDate = objSubInfo[Point]["DataText8"];
                var EndDate = objSubInfo[Point]["DataText9"];
                var RateType = objSubInfo[Point]["DataText10"];
                var OIRT = objSubInfo[Point]["DataText11"];
                var OpenInterestRate = objSubInfo[Point]["DataText12"];
                var PayType = objSubInfo[Point]["DataText13"];
                var EnrollType = objSubInfo[Point]["DataText14"];
                var EnrollMax = objSubInfo[Point]["DataText15"];
                var EnrollTimes = objSubInfo[Point]["DataText16"];
                
                
                $('#TDAcctValue').val(TDAcctValueFormat);
                
                olObject.append("<li><div>綜(定)存帳號</div><div>" + AcctValueFormat + "</div></li>" );
                olObject.append("<li><div>定存帳號</div><div>" + TDAcctValueFormat + "</div></li>");
                olObject.append("<li><div>定存種類</div><div>" + App + "</div></li>");
                olObject.append("<li><div>金額</div><div>" + TotalAmt + "</div></li>");
                olObject.append("<li><div>幣別</div><div>" + CurrText + "</div></li>" );
                olObject.append("<li><div>起息日</div><div>" + InterestStartDate + "</div></li>" );
                olObject.append("<li><div>到期日</div><div>" + EndDate + "</div></li>" );
                olObject.append("<li><div>利率別</div><div>" + RateType + "</div></li>" );
                olObject.append("<li><div>開單利率</div><div>" + OIRT + "</div></li>" );
                olObject.append("<li><div>目前利率</div><div>" + OpenInterestRate + "</div></li>" );
                olObject.append("<li><div>領息方式</div><div>" + PayType + "</div></li>" );
                olObject.append("<li><div>到期提示</div><div>" + EnrollType + "</div></li>" );
                olObject.append("<li><div>自動轉存<br>約轉次數</div><div>" + EnrollMax + "</div></li>" );
                olObject.append("<li><div>自動轉存<br>已轉次數</div><div>" + EnrollTimes + "</div></li>" );
           

        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }

    }
    
    //記息明細
    function genTDQueryDetail(JsonObj, olObject, TDAcctValue) {
    
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {        
         if (JsonObj[0]["Header_STMT"] == "SUCCESS") {
        	   
             olObject.append('<li class="head"><div>結存本金</div><div>年利率</div><div>計息日期</div><div>稅後利息</div></li>');
             var objSubInfo = JsonObj[0]["SubInfo_STMT"];
             for (i = 0; i < objSubInfo.length; i++) {
				         var CRValBalance = JsonObj[0]["SubInfo_STMT"][i]["DataText1"];
                 var Curr = JsonObj[0]["SubInfo_STMT"][i]["DataText2"];
                 //var CurrText = JsonObj[0]["SubInfo_STMT"][0]["DataText3"];
                 var CRIntRate = JsonObj[0]["SubInfo_STMT"][i]["DataText4"];
                 var CRIntDate = JsonObj[0]["SubInfo_STMT"][i]["DataText5"];
                 var PeriodFirstDate = JsonObj[0]["SubInfo_STMT"][i]["DataText6"];
                 var PeriodLastDate = JsonObj[0]["SubInfo_STMT"][i]["DataText7"];
                 var CRNoOfDays = JsonObj[0]["SubInfo_STMT"][i]["DataText8"];
                 var CRIntAmt = JsonObj[0]["SubInfo_STMT"][i]["DataText9"];
                 var TotalInterest = JsonObj[0]["SubInfo_STMT"][i]["DataText10"];
            
                 olObject.append('<li><a><div>'+CRValBalance+'</div><div>'+CRIntRate+'</div><div>'+CRIntDate+'</div><div>'+CRIntAmt+'</div></a></li>');
             } 
            $("#divB0310").show();
               
                
           
         }
         else if (JsonObj[0]["Header_STMT"] == "FAIL") {
        	   //$("#divB0310").hide();
          	 olObject.append('<li class="head"><div>結存本金</div><div>年利率</div><div>計息日期</div><div>稅後利息</div></li>');
          	 olObject.append('<li><a><p align="center">'+"查無資料"+'</p></a></li>');
         }
        }  
        
          
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	if (JsonObj[0]["Header_INFO"] == "SUCCESS") {
        		olObject.append('<div class="title">系統未付息</div></div>');
        		olObject.append('<li class="head"><div>結存本金</div><div>年利率</div><div>計息日期</div><div>稅後利息</div></li>');
            var objSubInfo = JsonObj[0]["SubInfo_INFO"];
           for (i = 0; i < objSubInfo.length; i++) {
				    var CRValBalance = JsonObj[0]["SubInfo_INFO"][i]["DataText1"];
            var Curr = JsonObj[0]["SubInfo_INFO"][i]["DataText2"];
            //var CurrText = JsonObj[0]["SubInfo1"][0]["DataText3"];
            var CRIntRate = JsonObj[0]["SubInfo_INFO"][i]["DataText4"];
            var CRIntDate = JsonObj[0]["SubInfo_INFO"][i]["DataText5"];
            var PeriodFirstDate = JsonObj[0]["SubInfo_INFO"][i]["DataText6"];
            var PeriodLastDate = JsonObj[0]["SubInfo_INFO"][i]["DataText7"];
            var CRNoOfDays = JsonObj[0]["SubInfo_INFO"][i]["DataText8"];
            var CRIntAmt = JsonObj[0]["SubInfo_INFO"][i]["DataText9"];
            var TotalInterest = JsonObj[0]["SubInfo_INFO"][i]["DataText10"];
            
            olObject.append('<li><a><div>'+CRValBalance+'</div><div>'+CRIntRate+'</div><div>'+CRIntDate+'</div><div>'+CRIntAmt+'</div></a></li>');
           }
            $("#ulStmt").show();
            
          }
          else if (JsonObj[0]["Header_INFO"] == "FAIL") {
          	olObject.append('<div class="title">系統未付息</div></div>');
          	olObject.append('<li class="head"><div>結存本金</div><div>年利率</div><div>計息日期</div><div>稅後利息</div></li>');
          	olObject.append('<li><a><p align="center">'+"查無資料"+'</p></a></li>');
          	
          }
        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
            
             $("#ulStmt").hide();

        }

    }	 
    
    //開單後看明細
    function genQueryTDAcctValue(JsonObj, olObject, Acct, TDAcct) {
        olObject.html("");
        var a="";        
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo"];
            for (i = 0; i < objSubInfo.length; i++) {
              	
              var tdacct = objSubInfo[i]["DataText0"];
              if (tdacct == TDAcct)
              {
                a = i;
                break;
              }
              	
            }
            var AcctValue = Acct;
            var AcctValueFormat = objSubInfo[i]["DataText3"];
				    var TDAcctValueFormat = objSubInfo[i]["DataText4"];
            var App = objSubInfo[i]["DataText5"];
            var TotalAmt = objSubInfo[i]["DataText6"];
            var CurrText = objSubInfo[i]["DataText7"];
            var InterestStartDate = objSubInfo[i]["DataText8"];
            var EndDate = objSubInfo[i]["DataText9"];
            var RateType = objSubInfo[i]["DataText10"];
            var OIRT = objSubInfo[i]["DataText11"];
            var OpenInterestRate = objSubInfo[i]["DataText12"];
            var PayType = objSubInfo[i]["DataText13"];
            var EnrollType = objSubInfo[i]["DataText14"];
            var EnrollMax = objSubInfo[i]["DataText15"];
            var EnrollTimes = objSubInfo[i]["DataText16"];
                
                
            $('#TDAcctValue').val(TDAcctValueFormat);
                
            olObject.append("<li><div>綜(定)存帳號</div><div>" + AcctValueFormat + "</div></li>" );
            olObject.append("<li><div>定存帳號</div><div>" + TDAcctValueFormat + "</div></li>");
            olObject.append("<li><div>定存種類</div><div>" + App + "</div></li>");
            olObject.append("<li><div>金額</div><div>" + TotalAmt + "</div></li>");
            olObject.append("<li><div>幣別</div><div>" + CurrText + "</div></li>" );
            olObject.append("<li><div>起息日</div><div>" + InterestStartDate + "</div></li>" );
            olObject.append("<li><div>到期日</div><div>" + EndDate + "</div></li>" );
            olObject.append("<li><div>利率別</div><div>" + RateType + "</div></li>" );
            olObject.append("<li><div>開單利率</div><div>" + OIRT + "</div></li>" );
            olObject.append("<li><div>目前利率</div><div>" + OpenInterestRate + "</div></li>" );
            olObject.append("<li><div>領息方式</div><div>" + PayType + "</div></li>" );
            olObject.append("<li><div>到期提示</div><div>" + EnrollType + "</div></li>" );
            olObject.append("<li><div>自動轉存<br>約轉次數</div><div>" + EnrollMax + "</div></li>" );
            olObject.append("<li><div>自動轉存<br>已轉次數</div><div>" + EnrollTimes + "</div></li>" );
           

        } else {
            //showalert(JsonObj[0]["Message"]);
            //alert(JsonObj[0]["Message"]);
            $('#divTDMain').hide();
            $("#non_value2").html(results[0]["Message"]);

        }

    }           		            	