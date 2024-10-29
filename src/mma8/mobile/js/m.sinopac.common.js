
	function doAgain(Url) {
		location.href=Url;
	}
	function doQueryDetail(Acct,Curr) {
		$.post( "/m/bank/transdetail/m_transdetail.aspx", { AcctValue: Acct, Curr: Curr } );
	}
	
	/*
		<summary>由Server return的Json組出LI的內容值，取代傳統的select</summary>
		<param name="JsonObj" type="Json">server回傳的資料</param>
		<param name="Title" type="string">popup的title</param>
		<param name="UlMenu" type="string">memu的jq object</param>
		<param name="GenType" type="string">產生的模式，會影響onClick的參數，
		    0：onClick寫span和hidden
		    1：onClick寫span、hidden和div(如選帳號帶出餘額)
		    </param>
		<param name="funClickName" type="string">onClick&onTouchEnd觸發的function</param>
		<returns name="DataLen" type="string"></returns>
	*/	
	function genMobileMenu(JsonObj,Title,UlMenu,liID,GenType,DataColumn,SSign,funClickName) { 
			//alert("JsonObj1="+JsonObj);
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
			   UlMenu.append("<p>"+Title+"</p>"); 
				  for (i = 0; i < objSubInfo.length; i++) { 
					var tmp=objSubInfo[i]["DataText"] ;//顯示值1
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
						if (GenType=="0") {
							UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
						} else {
							UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\')">'+tmp+'</li>')
						}								
				  }
             
			   DataLen=objSubInfo.length;
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			//JsonObj="";
			//alert("JsonObj2="+JsonObj);
			return DataLen;			
	}	
	function genMutilMobileMenu(JsonObj,Title,UlMenu,liID,GenType,DataType,DataColumn,SSign,funClickName) { 
			var DataLen="";
			var iCount=0;
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   //alert(DataColumn);
			   var objSubInfo=JsonObj[0][DataColumn];
			   UlMenu.append("<p>"+Title+"</p>"); 
				  for (i = 0; i < objSubInfo.length; i++) { 
			   
					//var tmp1=objSubInfo[i]["DataText1"] ;//顯示值1
					var tmp=objSubInfo[i]["DataText"] ;//顯示值1
					//var tmp2=objSubInfo[i]["DataText2"];//顯示值2
					//var tmp=tmp2+SSign+tmp1 ;//顯示值1+2
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					var tmp5=objSubInfo[i]["DataType"] ;//DataType
					//alert(tmp5+":"+DataType);
					if (tmp5==DataType) {						
						if (GenType=="0") {
							UlMenu.append('<li id="' + liID+iCount + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
						} else {
							UlMenu.append('<li id="' + liID+iCount + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\')">'+tmp+'</li>')
						}	
						iCount++;						
					}
				  }

               
			   //DataLen=objSubInfo.length;
               
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return iCount;			
	}		
	function DataTrigger(DataLen,JsonObject,MutilClass,SingleClass,clickObject) { 
		
			if (DataLen == 1) {
                JsonObject.removeClass()
                JsonObject.addClass(SingleClass);
                clickObject.trigger('click');
            } else {
                JsonObject.removeClass()
                JsonObject.addClass(MutilClass);
            }      
	}	
	function genUlMenu(JsonObj,Title,UlMenu,GenType,DataColumn,SSign,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
				  UlMenu.append("<p>"+Title+"</p>");
				  for (i = 0; i < objSubInfo.length; i++) { 
			   
					var tmp1=objSubInfo[i]["DataText1"] ;//顯示值1
					var tmp2=objSubInfo[i]["DataText2"];//顯示值2
					var tmp=tmp2+SSign+tmp1 ;//顯示值1+2
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					if (GenType=="0") {
						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
					} else {
						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\')">'+tmp+'</li>')
					}							
				  }
               
			   DataLen=objSubInfo.length;
               
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return DataLen;			
	}	
	
		/*
	<summary>將資料分別填入Text，Value和...並關閉popup window</summary>
	<returns name="" type="string"></returns>
	*/
    function setLiValue(objText,val1,objValue,val2,objDisplay,val3,objOpt) {
        objText.html(val1);
        objValue.val(val2);
        if (objDisplay != null) {
            objDisplay.html(val3);
        }
        objText.css('padding-top', '0');
		
		$('.options').fadeOut(400, function() {
        //objOpt.fadeOut(400, function() {
            $('html').css('overflow', 'auto');
            $('body').find('#overlay').remove();
        });        
    }   	
	function genUlMenuCurr(JsonObj,Title,UlMenu,GenType,DataColumn,SSign,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
				  UlMenu.append("<p>"+Title+"</p>");
				  for (i = 0; i < objSubInfo.length; i++) { 
			   
					var tmp1=objSubInfo[i]["DataText1"] ;//顯示值1
					var tmp2=objSubInfo[i]["DataText2"];//顯示值2
					var tmp=tmp2+SSign+tmp1 ;//顯示值1+2
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					var tmp5=objSubInfo[i]["CurValue"] ;//幣別值
					var tmp6=objSubInfo[i]["CurText"] ;//幣別中文
					if (GenType=="0") {
						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
					} else {
						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\',\''+tmp5+'\',\''+tmp6+'\')">'+tmp+'</li>')
					}							
				  }
               
			   DataLen=objSubInfo.length;
               
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return DataLen;			
	}	
	
		/*
	<summary>將資料分別填入Text，Value和...並關閉popup window</summary>
	<returns name="" type="string"></returns>
	*/
    function setLiValue(objText,val1,objValue,val2,objDisplay,val3,objDisplay2,val4,objDisplay3,val5,objOpt) {
        objText.html(val1);
        objValue.val(val2);
        if (objDisplay != null) {
            objDisplay.html(val3);
        }
        if (objDisplay2 != null && objDisplay3 != null) {
            objDisplay2.val(val4);
            objDisplay3.val(val5);
        }
        objText.css('padding-top', '0');
		
		$('.options').fadeOut(400, function() {
        //objOpt.fadeOut(400, function() {
            $('html').css('overflow', 'auto');
            $('body').find('#overlay').remove();
        });        
    }   	
	function genUlMenu2(JsonObj,Title,UlMenu,GenType,DataColumn,SSign,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
				  UlMenu.append("<p>"+Title+"</p>");
				  for (i = 0; i < objSubInfo.length; i++) { 
			   
					var tmp1=objSubInfo[i]["DataText"] ;//顯示值1
					var tmp=tmp1.replace("\n", "<br />")
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					if (GenType=="0") {
						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
					} else {
						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\')">'+tmp+'</li>')
					}							
				  }
               
			   DataLen=objSubInfo.length;
               
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return DataLen;			
	}	
	function genUlMenu3(JsonObj,Title,UlMenu,GenType,DataColumn,DataType,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   var objSubInfo=JsonObj[0][DataColumn];
				  UlMenu.append("<p>"+Title+"</p>");
				  for (i = 0; i < objSubInfo.length; i++) { 
			   
					var tmp1=objSubInfo[i]["DataText"] ;//顯示值1
					var tmp=tmp1.replace("\n", "<br />")
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					var tmp5=objSubInfo[i]["DataType"] ;//DataType
					if (tmp5==DataType) {
  					if (GenType=="0") {
  						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
  					} else {
  						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\')">'+tmp+'</li>')
  					}							
  				  }
				  }
               
			   DataLen=objSubInfo.length;
               
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return DataLen;			
	}	


		function genMutilMMASelect(JsonObj,Title,UlMenu,liID,GenType,DataType,DataColumn,SSign,funClickName) { 
			var DataLen="";
			var iCount=0;
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   //alert(DataColumn);
			   var objSubInfo=JsonObj[0][DataColumn];
			   if (length.length>0) {
				UlMenu.append("<p>"+Title+"</p>"); 
			   }
				  for (i = 0; i < objSubInfo.length; i++) { 
					var tmp=objSubInfo[i]["DataText"] ;//顯示值1
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					var tmp5=objSubInfo[i]["DataType"] ;//DataType
					if (tmp5==DataType) {						
						if (GenType=="0") {
							UlMenu.append('<li id="' + liID+iCount + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
						} else {
							UlMenu.append('<li id="' + liID+iCount + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\')">'+tmp+'</li>')
						}	
						iCount++;						
					}
				  }
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return iCount;			
	}		
    /*
        <summary>由Ajax取得附註說明，</summary>
    */
    function getMemoHtml(sUrl,JQObj) {
		sUrl=sUrl+"?"+new Date().getTime();
        $.ajax({
            url: sUrl,
            type: "GET",
            async: true,
            cache: false,
            controller: this,
            success: function(responseData) {
                if (responseData != null) {
                    results = responseData;
					JQObj.html(results);
                }
            },
            error: function(aXMLHttpRequest, textStatus, errorTown) {
                //showalert("getMemoHtml FAIL");
				return false;
            }
        });
	}
/*
        <summary>由Ajax取得附註說明，</summary>
    */
    function getPopupHtml(sUrl,JQObj) {
		sUrl=sUrl+"?"+new Date().getTime();
		
        $.ajax({
            url: sUrl,
            type: "GET",
            async: false,
            cache: false,
            controller: this,
            success: function(responseData) {
                if (responseData != null) {
                    results = responseData;
                    
										JQObj.html(results);
										//alert("sUrl="+JQObj.html());
                }
            },
            error: function(aXMLHttpRequest, textStatus, errorTown) {
                showalert("getPopupHtml FAIL");
				return false;
            }
        });
	}	
	
	function genQueryResult(JsonObj,showType,olObject,funClickName) {
			olObject.html("");						
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   var objSubInfo=JsonObj[0]["SubInfo"];
               if (showType==1) {	//總覽
				   for (i = 0; i < objSubInfo.length; i++) { 
					var AcctText=objSubInfo[i]["AcctText"] ;
					var AcctValue=objSubInfo[i]["AcctValue"] ;
					var AcctValueFormat=objSubInfo[i]["AcctValueFormat"] ;
					var Cur=objSubInfo[i]["Curr"] ;
					var CurText=objSubInfo[i]["CurText"] ;
					var AvailBalance=objSubInfo[i]["AvailBalance"] ;
					var FixBalance=objSubInfo[i]["FixBalance"] ;
					olObject.append('<li><a href="javascript: void(0)" onClick="'+funClickName+'(\''+AcctValue+'\',\''+Cur+'\')"><div class="acctInfo"><div class="acctType">'+AcctText+'</div>'+AcctValueFormat+'<span>'+CurText+'</span><br>餘額：'+AvailBalance+'元<br>定存金額：'+FixBalance+'元</div></a></li>');
				   }
			    
			   } else if (showType==2){
					for (i = 0; i < objSubInfo.length; i++) { 
						var DataValue1=objSubInfo[i]["DataValue1"] ;
						var DataValue2=objSubInfo[i]["DataValue2"] ;
						var DataValue3=objSubInfo[i]["DataValue3"] ;
						var DataValue4=objSubInfo[i]["DataValue4"] ;
						var DataValue5=objSubInfo[i]["DataValue5"] ;
						var DataValue6=objSubInfo[i]["DataValue6"] ;
						var DataValue7=objSubInfo[i]["DataValue7"] ;
						alert(DataValue3);
						if (i==0) {
							olObject.append('<li class="head"><div>'+DataValue1+'</div><div>'+DataValue4+'</div><div>'+DataValue5+'</div><div>'+DataValue6+'</div></li>');
						} else {
							olObject.append('<li><a href="javascript: void(0)" onClick="'+funClickName+'(\''+i+'\')"><div>'+DataValue1+'</div><div>'+DataValue3+'</div><div>'+DataValue4+'</div><div>'+DataValue5+'</div></li>');
						}
				   }
			   }
               
            } else {
                //showalert(JsonObj[0]["Message"]);
				alert(JsonObj[0]["Message"]);
				
            }
						
	}	
	/*
		<summary>由Server return的Json組出jquery-ui Dialog的內容值.</summary>
		<param name="JsonObj" type="Json">server回傳的資料，格式如下：
				<Header>SUCCESS</Header><Message></Message><SubInfo><DialogValue>0000</DialogValue><DialogText>0000-ADFF</DialogText><DialogValue>11111</DialogValue><DialogText>11111-SBCD</DialogText></SubInfo>
		</param>
		<param name="JQObjDialog" type="JQuery Object">jquery-ui Dialog的object</param>
		<param name="DialogMenuType" type="string">DialogMenu的類型，暫未使用</param>
		<param name="pName" type="string">div的id&name</param>
		<param name="funClickName" type="string">onClick&onTouchEnd觸發的function</param>
		<returns type=""></returns>
	*/
    function genDialogMenu(JsonObj,JQObjDialog,DialogMenuType,pName,funClickName) {
  		JQObjDialog.html("");
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   var objSubInfo=JsonObj[0]["SubInfo"];
               for (i = 0; i < objSubInfo.length; i++) { 
				var tmp1=objSubInfo[i]["DialogText"] ;
				var tmp2=objSubInfo[i]["DialogValue"] ;
                    JQObjDialog.append('<div class=wrap id='+pName+'><p id='+pName+' name='+pName+' class="CurrDialog" onclick="'+funClickName+'(\''+tmp1+'\',\''+tmp2+'\')">'+tmp1+'</p></div>')
               }
               
            } else {
                //showalert(JsonObj[0]["Message"]);
				alert(JsonObj[0]["Message"]);
				
            }		
	}

    
    
    function JQCommon_sendAjax(url,dataType,asyncType,formSerialize) {
		
		if (url.indexOf("?")>0)
			url=url+"&"+new Date().getTime();
		else 
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
			timeout: 30000,
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
    
  //下拉選單優先選擇判斷
  function decide_Select(Judge_val3) {
    var sPeriodType = $("#PeriodType").val();
    var sFixType = $("#FixType").val();
    var sRateType = $("#RateType").val();
    var sContiType = $("#ContiType").val();
    if (sPeriodType == "" || sFixType == "" || sRateType == "" || sContiType == "") {
      showalert("請先選擇" + Judge_val3);
    }
  }
  //Class標籤值Disabled
  function Disabled_Class(LableVal) {
	$(LableVal).addClass("disabled");
  }
  //Class標籤值NotDisabled
  function NotDisabled_Class(LableVal) {
	$(LableVal).removeClass("disabled");
  }
  //Input標籤值Disabled
  function Disabled_Input(LableVal) {
	  $(LableVal).attr('disabled', true);
  }
  //標籤值NotDisabled
  function NotDisabled_Input(LableVal) {
	  $(LableVal).attr('disabled', false);
  }
  //標籤值NotDisabled
  function actived_change(LableVal1,LableVal2) {
	  $(LableVal1).addClass("actived");
    $(LableVal2).removeClass("actived");
  }
  function genUlMenu_gold(JsonObj,Title,UlMenu,DataColumn,val,type) {
			var DataLen="";
			UlMenu.html("");			
				if (JsonObj[0]["Header"] == "SUCCESS") {               
					  var objSubInfo=JsonObj[0][DataColumn];
					  if(type=="BUY")//客戶黃金申購
					  {
						  UlMenu.append('<li>'+"&nbsp;&nbsp;&nbsp;&nbsp;日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;銀行賣出"+'</li>')
						  for (i = 0; i < objSubInfo.length; i++) 
						  { 
							var tmp1=objSubInfo[i]["MsgDate"] ;
							//var tmp2=objSubInfo[i]["ListBuy"] ; 
							var tmp3=objSubInfo[i]["ListSell"] ;
							if(val=="1")
								UlMenu.append('<li>'+tmp1+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+tmp3+"元/1公克"+'</li>')
							else if(val=="2")					
								UlMenu.append('<li>'+tmp1+"&nbsp;&nbsp;&nbsp;&nbsp;"+tmp3+"美元/1盎司"+'</li>')
							else
								showalert("取得黃金牌價失敗，請稍後再試");
							
						  }
					  }
					  else if(type=="SELL")//客戶黃金回售
					  {
						  UlMenu.append('<li>'+"&nbsp;&nbsp;&nbsp;&nbsp;日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;銀行買進"+'</li>')
						  for (i = 0; i < objSubInfo.length; i++) 
						  { 
							var tmp1=objSubInfo[i]["MsgDate"] ;
							var tmp2=objSubInfo[i]["ListBuy"] ; 
							//var tmp3=objSubInfo[i]["ListSell"] ;
							if(val=="1")
								UlMenu.append('<li>'+tmp1+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+tmp2+"元/1克"+'</li>')
							else if(val=="2")					
								UlMenu.append('<li>'+tmp1+"&nbsp;&nbsp;&nbsp;&nbsp;"+tmp2+"美元/1盎司"+'</li>')
							else
								showalert("取得黃金牌價失敗，請稍後再試");
						  }				  
					  
					  }
					  else
					  {
						showalert("取得黃金牌價失敗，請稍後再試");
					  }

				   
				   DataLen=objSubInfo.length;
				   
				} else {
					showalert(JsonObj[0]["Message"]);
				}	

			return DataLen;			
	}	
	
	function genAcctSetMenu(JsonObj,Title,UlMenu,DataColumn,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   var objSubInfo=JsonObj[0][DataColumn];
				  UlMenu.append("<p>"+Title+"</p>");
				  for (i = 0; i < objSubInfo.length; i++) { 
  					var tmp1=objSubInfo[i]["DataText"] ;//顯示值1
  					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
  					UlMenu.append('<li onclick="'+funClickName+'(\''+tmp1+'\',\''+tmp3+'\')">'+tmp1+'</li>')
				  }
               
			   DataLen=objSubInfo.length;
               
      } else {
          showalert(JsonObj[0]["Message"]);
      }	
			return DataLen;			
	}	

	
//VISA DIRECT用20150812===============================================
	//visa direct 扣款帳戶
    function setLiValue_visa_DebitAccount(objText,val1,objValue,val2,objDisplay,val3,objOpt,objCurr,val4,objCurrText,val5,objAcctText,val6,objChildValue,val7) {
        objText.html(val1);
        objValue.val(val2);
		objCurrText.val(val5);
		objAcctText.val(val6);
		objChildValue.val(val7);
        if (objDisplay != null) {
            objDisplay.html(val3);
        }
		objCurr.val(val4);
		objText.css('padding-top', '0');
		
		$('.options').fadeOut(400, function() {
        //objOpt.fadeOut(400, function() {
            $('html').css('overflow', 'auto');
            $('body').find('#overlay').remove();
        });        
    }

	//visa direct 入帳帳戶 	
	function setLiValue_visa_PayeeAccount(objText, val1, objValue, val2, objRecNation, val3, objRecName, val4, objNature, val5, objISOCCode,val6, objBankName, val7, objCardType, val8 ) {
		objText.html(val1);
        objValue.val(val2);//卡號
		objRecNation.html(val3);
		objRecName.html(val4);
		objNature.html(val5);
		objISOCCode.val(val6);
		objBankName.val(val7);
		objCardType.val(val8);
		objText.css('padding-top', '0');
		
		$('.options').fadeOut(400, function() {
        //objOpt.fadeOut(400, function() {
            $('html').css('overflow', 'auto');
            $('body').find('#overlay').remove();
        });        
    } 
//Visa Direct 扣款帳號
	function genMobileMenu_VISA_DebitAccount(JsonObj,Title,UlMenu,liID,GenType,DataColumn,SSign,funClickName) { 
			//alert("JsonObj1="+JsonObj);
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
			   UlMenu.append("<p>"+Title+"</p>"); 
				  for (i = 0; i < objSubInfo.length; i++) { 
					var tmp=objSubInfo[i]["DataText"] ;//顯示值1
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					var tmp5=objSubInfo[i]["Cur"] ;//扣款幣別
					var tmp6=objSubInfo[i]["CurText"] ;//幣別中文
					var tmp7=objSubInfo[i]["AcctCName"] ;//扣款帳戶中文
					var tmp8=objSubInfo[i]["ChildValue"] ;	//子帳號 value
					if (GenType=="0") {
							UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp5+'\',\''+tmp6+'\',\''+tmp7+'\',\''+tmp8+'\')">'+tmp+'</li>')
						} else {
							UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\',\''+tmp5+'\',\''+tmp6+'\',\''+tmp7+'\',\''+tmp8+'\')">'+tmp+'</li>')
						}								
				  }
             
			   DataLen=objSubInfo.length;
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			//JsonObj="";
			//alert("JsonObj2="+JsonObj);
			return DataLen;			
	}	
	//Visa Direct 入帳帳號
	function genMobileMenu_VISA_PayeeAccount(JsonObj,Title,UlMenu,liID,GenType,DataColumn,SSign,funClickName) { 
			//alert("JsonObj1="+JsonObj);
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
			   UlMenu.append("<p>"+Title+"</p>"); 
				  for (i = 0; i < objSubInfo.length; i++) { 
					var tmp=objSubInfo[i]["DataText"] ;//顯示值1
					var tmp3=objSubInfo[i]["DataValue"] ;	//卡號
					var tmp4=objSubInfo[i]["DisplayText"] ;//餘額
					var tmp5=objSubInfo[i]["DataNATION"] ;//受款國家
					var tmp6=objSubInfo[i]["DataRECNAME"] ;//受款姓名
					var tmp7=objSubInfo[i]["DataRMKIND"] ;//結匯性質
					var tmp8=objSubInfo[i]["DataISOCCode"] ;//受款國家編號
					var tmp9=objSubInfo[i]["DataISSNAME"] ;//發卡銀行+地址
					var tmp10=objSubInfo[i]["DataCardProdType"] ;//卡片種類
					var tmp11=objSubInfo[i]["FircoFlag"] ;//黑名單
							UlMenu.append('<li id="' + liID+i + '" onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp5+'\',\''+tmp6+'\',\''+tmp7+'\',\''+tmp8+'\',\''+tmp9+'\',\''+tmp10+'\',\''+tmp11+'\')">'+tmp+'</li>')
					}
             
			   DataLen=objSubInfo.length;
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			//JsonObj="";
			//alert("JsonObj2="+JsonObj);
			return DataLen;			
	}	
//VISA DIRECT用20150812 END===============================================	




function genUlMenu_fund(JsonObj,Title,UlMenu,GenType,DataColumn,SSign,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
				  UlMenu.append("<p>"+Title+"</p>");
				  for (i = 0; i < objSubInfo.length; i++) { 
			   
					var tmp1=objSubInfo[i]["DataText1"] ;//顯示值1
					var tmp3=objSubInfo[i]["DataValue"] ;	//hidden value
					UlMenu.append('<li id="' + SSign+i + '" onclick="'+funClickName+'(\''+tmp1+'\',\''+tmp3+'\')">'+tmp1+'</li>')						
				  }
               //'<li onclick="'+funClickName+'(\''+tmp1+'\',\''+tmp3+'\')">'+tmp1+'</li>'
			   DataLen=objSubInfo.length;
               
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return DataLen;			
	}	
	
//MWEB 基金贖回用 20151130 END==================================================

//勿刪

function JQCommon_sendAjax_VISA(url,dataType,asyncType,formSerialize) {
  //alert(""1116"");
  if (url.indexOf("?")>0)
   url=url+"&"+new Date().getTime();
  else 
   url=url+"?"+new Date().getTime();
  //alert(url);
        $.ajax({
            url: url,
            type: "POST",
            data: formSerialize,
            dataType: dataType,
   async: true,//true 啟用非同步請求
            cache: false,
            controller: this,
   success: postProcessing,//非同請求使用
            error: function(aXMLHttpRequest, textStatus, errorTown) {
                //showalert(responseData.data);
                showalert("FAIL");
            }
        });
        return results;
    }
