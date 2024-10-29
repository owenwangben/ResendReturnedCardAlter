function genGoldBalQueryResult(JsonObj,showType,olObject,funClickName) {
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
				location.href = "/m/m_menu.aspx?num=3";
				
            }
						
	}	