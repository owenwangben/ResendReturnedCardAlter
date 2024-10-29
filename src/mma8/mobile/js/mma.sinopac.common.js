	function mmaPrint() {
		window.open('/mma8/mma/html/print/Bank01Formate.html','','width=900,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,dependent=0,resizable=0,top=20,left=20');
	}
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
                showalert("FAIL");
				return false;
            }
        });
	}
    function showalert(s) {
		alert(s);
	}	
	function genMMASelect(JsonObj,Title,UlMenu,liID,GenType,DataColumn,SSign,funClickName) { 
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   
			   var objSubInfo=JsonObj[0][DataColumn];
			   if (length.length>0) {
			   UlMenu.append("<p>"+Title+"</p>"); 
			   }
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
	function DataTrigger(DataLen,JsonObject,MutilClass,SingleClass,clickObject) { 
			if (DataLen == 1) {
          JsonObject.removeClass();
          JsonObject.addClass(SingleClass);
          clickObject.trigger('click');
      } else {
          JsonObject.removeClass();
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
					//if (GenType=="0") {
					//	UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\')">'+tmp+'</li>')
					//} else {
						UlMenu.append('<li onclick="'+funClickName+'(\''+tmp+'\',\''+tmp3+'\',\''+tmp4+'\')">'+tmp+'</li>')
					//}							
				  }
               
			   DataLen=objSubInfo.length;
               
            } else {
                showalert(JsonObj[0]["Message"]);
            }	
			return DataLen;			
	}	
	function genUlMenu2(JsonObj,Title,UlMenu,MenuType,pName,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   UlMenu.append("<p>"+Title+"</p>");
			   var objSubInfo=JsonObj[0]["SubInfo"];
               for (i = 0; i < objSubInfo.length; i++) { 
				var tmp1=objSubInfo[i]["DialogText"] ;
				var tmp2=objSubInfo[i]["DialogValue"] ;
				var tmp3=objSubInfo[i]["DisplayText"] ;
				UlMenu.append('<li><span id='+pName+' name='+pName+' onclick="'+funClickName+'(\''+tmp1+'\',\''+tmp2+'\',\''+tmp3+'\')">'+tmp1+'</span></li>')
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
		$('.options').fadeOut(400, function() {
        //objOpt.fadeOut(400, function() {
            $('html').css('overflow', 'auto');
            $('body').find('#overlay').remove();
        });     
        //objText.css('padding-top', '0');
        //objOpt.fadeOut(400, function() {
        //    $('html').css('overflow', 'auto');
        //    $('body').find('#overlay').remove();
        //});        
    }   	
    /*
		<summary>統一制訂Dialog的UI</summary>
		<param name="JQObjDialog" type="JQuery Object">jquery-ui Dialog的object</param>
		<param name="titleName" type="string">jquery-ui Dialog的Title Name</param>
		<returns type=""></returns>
	*/
	function JQCommon_addDialog(JQobjDialog,titleName) {
        $("#MaskDiv").css("opacity" , 0.5);
        $("#MaskDiv").css("position" , "fixed");
        $("#MaskDiv").hide();                                  
        JQobjDialog.dialog({//Dailog屬性定義
            autoOpen: false,
            title: titleName,
            modal: true, //背景是否為不可作用
            width: "95%", //height: 600,width:250視窗初始大小設定
            position: "center",
            closeOnEscape: true,
            draggable: false, //視窗是否固定位置
            resizable: false, //視窗是否可讓使用者自調大小
            close: function(event, ui) {
                 $("#MaskDiv").hide();           
            }
        });
    }
    /*
		<summary>開啟jquery-ui Dialog的Action</summary>
		<param name="JQObjDialog" type="JQuery Object">jquery-ui Dialog的object</param>
		<returns type=""></returns>
	*/	
    function JQCommon_openDialog(JQobjDialog) {
        $("#MaskDiv").show();
        JQobjDialog.dialog("open");
    }
    /*
		<summary>關閉jquery-ui Dialog的Action</summary>
		<param name="JQobjvall" type="JQuery Object">頁面中顯示內容的Object</param>
		<param name="val1" type="string">頁面中顯示內容的值</param>
		<param name="JQobjval2" type="JQuery Object">Hidden Value的Ojbect</param>
		<param name="val2" type="string">Hidden Value的值</param>
		<param name="JQObjDialog" type="JQuery Object">jquery-ui Dialog的object</param>		
		<returns type=""></returns>
	*/	
    function JQCommon_closeDialog(JQobjvall,val1,JQobjval2,val2,JQobjDialog) {
        JQobjvall.html(val1);
        JQobjval2.val(val2);
        JQobjDialog.dialog("close");
    }       
    /*
		<summary>執行JQuery的Ajax</summary>
		<param name="url" type="string">Ajax的URL</param>
		<param name="dataType" type="string">return的格式，json,html,.....</param>
		<param name="asyncType" type="string">true==async</param>
		<param name="formSerialize" type="JQuery Object">Post回Server的data Object</param>
		<returns type=""></returns>
	*/	
    function JQCommon_sendAjax(url,dataType,asyncType,formSerialize) {
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
	function JQCommon_getJsonData(url,asyncType,formSerialize,funName) {
		var pattern = /(\?)/;
        if (pattern.test(url)) {
            url=url+"&"+new Date().getTime();
        } else {
            url=url+"?"+new Date().getTime();
        }
		$.ajax({
            url: url,
            type: "POST",
            data: formSerialize,
            dataType: "json",
            async: asyncType,
            cache: false,
            controller: this,
            success: function(responseData) {
                if (responseData != null) {
                    eval(funName +"('"+JSON.stringify(responseData)+"')");
                }
            },
            error: function(aXMLHttpRequest, textStatus, errorTown) {
                //showalert(responseData.data);
                showalert("FAIL");
            }
        });		
		
        
        //return results;
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
  
	

  // fancyfield 單組資料建置，dspText 值可有可無(放目前餘額用的)
  function ffBuild(obj, id, textName, valName, dspText, noneText) {
    var listOptions = [], data = [];
	listOptions.push([ffSelDefText(noneText)]);
    $(obj).each(function(){
      a = this[textName];
      b = this[valName];
      c = '';
      if (dspText != undefined) {
        c = '$$' + this[dspText];
        data = [a,b+c];
      } else {
        data = [a,b]; 
      }
      listOptions.push(data);
    });
    if (id != undefined) {
    	$(id).setOptions(listOptions);
    } else {
    	return listOptions;
    }
  }
  // fancyfield 多重資料建置 by Type 判斷
  function ffBuildMulti(obj, id, textName, valName, Type, noneText) {
    var listOptions = [], data = [];
    listOptions.push([ffSelDefText(noneText)]);
    $(obj).each(function(){
      if (this['DataType'] == Type) {
        a = this[textName];
        b = this[valName];
        data = [a,b]; 
        listOptions.push(data);
      }
    });
    if (id != undefined) {
    	$(id).setOptions(listOptions);
    } else {
    	return listOptions;
    }
  }
  //清空下拉的資料。含資料回傳 FAIL。
  function ffResetData(id, noneText) {
    var listOptions = [];
	listOptions.push([ffSelDefText(noneText)]);
  	$(id).setOptions(listOptions);
  }
  //單純抽出來用的，給下拉選單使用的預設無值文字
  function ffSelDefText(noneText) {
    if (noneText != undefined) {
      return noneText;
    } else {
      return "請選擇...";
    }
  }
  //觸發 radio 的 click
  function ffRadioClick(id) {
  	$(id).siblings('.ffRadio').trigger("click");
  }
  //觸發 reset
  function ffResetClick(id) {
  	$(id).fancyfields("reset");
  }
  //觸發 disable
  function ffDisableClick(id) {
  	$(id).fancyfields("disable");
  }
  //觸發 enable
  function ffEnableClick(id) {
  	$(id).fancyfields("enable");
  }
  //觸發 clean
  function ffCleanClick(id) {
  	$(id).fancyfields("clean");
  }	