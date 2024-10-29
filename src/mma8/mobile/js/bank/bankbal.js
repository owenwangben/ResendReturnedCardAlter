function genBankBalQueryResult(JsonObj,showType,olObject,funClickName) {
			//olObject.html("");						
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   var objSubInfo=JsonObj[0]["SubInfo"];
         if (showType==1) {	//總覽
				   for (i = 0; i < objSubInfo.length; i++) { 
					   var AcctText=objSubInfo[i]["AcctText"] ;
					   var AcctValue=objSubInfo[i]["AcctValue"] ;
					   var AcctValueFormat=objSubInfo[i]["AcctValueFormat"] ;
					   var Curr=objSubInfo[i]["Curr"] ;
					   var CurText=objSubInfo[i]["CurText"] ;
					   var AvailBalance=objSubInfo[i]["AvailBalance"] ;
					   var FixBalance=objSubInfo[i]["FixBalance"] ;
					   var MaxAvail=objSubInfo[i]["MaxAvail"] ;
					   if (AcctValue.length==0) {
							olObject.append('<li><a href="javascript: void(0)" onClick="'+funClickName+'(\''+AcctValue+'\',\''+Curr+'\',\''+FixBalance+'\')"><div class="acctInfo"><div class="acctType">'+AcctText+'</div>'+AcctValueFormat+'<span>'+CurText+'</span><br>'+AvailBalance+'</div></a></li>');
   
					   } else {
					   		if(MaxAvail.indexOf("元")> -1)
							{
								olObject.append('<li><a href="javascript: void(0)" onClick="'+funClickName+'(\''+AcctValue+'\',\''+Curr+'\',\''+FixBalance+'\')"><div class="acctInfo"><div class="acctType">'+AcctText+'</div>'+AcctValueFormat+'<span>'+CurText+'</span><br>'+AvailBalance+'<br>'+FixBalance+ '<br>'+ MaxAvail +'</div></a></li>');
							}
							else
							{
								olObject.append('<li><a href="javascript: void(0)" onClick="'+funClickName+'(\''+AcctValue+'\',\''+Curr+'\',\''+FixBalance+'\')"><div class="acctInfo"><div class="acctType">'+AcctText+'</div>'+AcctValueFormat+'<span>'+CurText+'</span><br>'+AvailBalance+'<br>'+FixBalance+'</div></a></li>');					    
							}
					       
					   }
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
			   
               
         } else {
             //showalert(JsonObj[0]["Message"]);
				     alert(JsonObj[0]["Message"]);
				
         }
			}			
}

//放款	
function genLoanQueryResult(JsonObj,olObject,funClickName) {
			//olObject.html("");
			if (results[0]["Header"] == "SUCCESS") {
                var objSubInfo = results[0]["SubInfo"];
                for (i = 0; i < objSubInfo.length; i++) {
                    var AcctText = objSubInfo[i]["AcctText"];
                    var AcctValue = objSubInfo[i]["AcctValue"];
                    var AcctValueFormat = objSubInfo[i]["AcctValueFormat"];
                    var AltNo = objSubInfo[i]["AltNo"];
                    var AltNoFormat = objSubInfo[i]["AltNoFormat"];
                    var ProType =  objSubInfo[i]["ProType"];
                    var PayType =  objSubInfo[i]["PayType"];
                    var PayTypeText =  objSubInfo[i]["PayTypeText"];
                    var Curr = objSubInfo[i]["Curr"];
                    var CurText = objSubInfo[i]["CurText"];
                    var LoanAmount = objSubInfo[i]["LoanAmount"];
                    var OriLoanAmount = objSubInfo[i]["OriLoanAmount"];
                    var OriStartDate = objSubInfo[i]["OriStartDate"];
                    var StartDate = objSubInfo[i]["StartDate"];
                    var EndDate = objSubInfo[i]["EndDate"];
                    

                    olObject.append('<li><a href="javascript: void(0)" onClick="'+funClickName+'(\'' + AcctText + '\',\'' + AcctValue + '\',\''+ AcctValueFormat + '\',\''+ AltNo + '\',\''+ AltNoFormat + '\',\''+ ProType + '\',\'' + PayType + '\',\''+ PayTypeText + '\',\''+ Curr + '\',\''+ CurText + '\',\''+ LoanAmount + '\',\''+ OriLoanAmount+ '\',\''+ OriStartDate+ '\',\''+ StartDate + '\',\'' + EndDate + '\')"><div class="acctInfo"><div class="acctType">' + AcctText + '</div>' + AcctValueFormat + '<span>' + CurText + '</span><br>' + AltNoFormat + '<br>' + LoanAmount + '</div></a></li>');
                    
                }						
			}
}	
