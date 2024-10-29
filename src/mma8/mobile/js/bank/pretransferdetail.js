	function genTDUlMenu(JsonObj,Title,UlMenu,funClickName) {
			var DataLen="";
			UlMenu.html("");			
			if (JsonObj[0]["Header"] == "SUCCESS") {               
			   var objSubInfo=JsonObj[0]["SubInfo"];
			   if (objSubInfo.length>1) {
				 UlMenu.append("<p>"+Title+"</p>");
			   }
         for (i = 0; i < objSubInfo.length; i++) { 
				    var tmp1=objSubInfo[i]["DataText1"] ; //���b�b���W��<br>���b�b��&nbsp;���O����
				    var tmp2=objSubInfo[i]["DataValue1"] ;	//���b�b��
				    var tmp3=objSubInfo[i]["DataValue2"] ; //���O
				    
				    
				    
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
			   
					  var tmp1=objSubInfo[i]["DataText1"] ; //���b�b���W��<br>���b�b��&nbsp;���O����
				    var tmp2=objSubInfo[i]["DataValue1"] ;	//���b�b��
				    var tmp3=objSubInfo[i]["DataValue2"] ; //���O
				    var tmp4=objSubInfo[i]["DataText2"] //���b�b���W��
				    var tmp5=objSubInfo[i]["DataText3"] //���O����
				    
				   
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
            	  var Acc=objSubInfo[i]["DataText1"] ; //���b�b��
            	  var Curr=objSubInfo[i]["DataText2"] ; //���O
                var DEBIT_AMOUNT = objSubInfo[i]["DataText06"]; //���ڪ��B
                var CREDIT_ACCT = objSubInfo[i]["DataText01"]; //��J�b��
                var CRT_DATE = objSubInfo[i]["DataText02"]; //�]�w���
                var TXN_DATE = objSubInfo[i]["DataText03"];  //�ͮĤ��          
                
				        olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\',\''+Acc+ '\',\''+Curr+'\')"><div class="acctInfo">���ڪ��B�G'+DEBIT_AMOUNT+'<br>��J�b���G'+CREDIT_ACCT+'<br>�]�w����G'+CRT_DATE+'<br>�ͮĤ���G'+TXN_DATE+'</div></a></li>');						
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            //alert(JsonObj[0]["Message"]);
			
			olObject.append("<p class=\"warning\">" + results[0]["Message"] + "</p>");
            //olObject.append('<li><a><p align="center">'+"�iGE090�j�L�]��^����O��"+'</p></a></li>');

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
               
                
               
                olObject.append("<li><div class=\"label\">��J�b��</div><div><div class=\"slTxt\">" + data01 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�ͮĤ��</div><div><div class=\"slTxt\">" + data03 + "</div></div></li>");
                olObject.append("<li><div class=\"label\">������</div><div><div class=\"slTxt\">" + data04 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�R�����</div><div><div class=\"slTxt\">" + data05 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">���ڪ��B</div><div><div class=\"slTxt\">" + data06 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">����γ~</div><div><div class=\"slTxt\">" + data08 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�B�z���G</div><div><div class=\"slTxt\">" + data09 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�w���q��</div><div><div class=\"slTxt\">" + data10 + "</div></div></li>" );
                
           

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
               
                
               
                olObject.append("<li><div class=\"label\">��J�b��</div><div><div class=\"slTxt\">" + data01 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�ͮĤ��</div><div><div class=\"slTxt\">" + data03 + "</div></div></li>");
                olObject.append("<li><div class=\"label\">������</div><div><div class=\"slTxt\">" + data04 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�R�����</div><div><div class=\"slTxt\">" + data05 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">���ڪ��B</div><div><div class=\"slTxt\">" + data06 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">��J���B</div><div><div class=\"slTxt\">" + data07 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">����γ~</div><div><div class=\"slTxt\">" + data08 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�B�z���G</div><div><div class=\"slTxt\">" + data09 + "</div></div></li>" );
                olObject.append("<li><div class=\"label\">�w���q��</div><div><div class=\"slTxt\">" + data10 + "</div></div></li>" );
                
           

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
            	  var Acc=objSubInfo[i]["DataText1"] ; //���b�b��
            	  var Curr=objSubInfo[i]["DataText2"] ; //���O
                var DEBIT_AMOUNT = objSubInfo[i]["DataText06"]; //���ڪ��B
                var CREDIT_ACCT = objSubInfo[i]["DataText01"]; //��J�b��
                var CRT_DATE = objSubInfo[i]["DataText02"]; //�]�w���
                var TXN_DATE = objSubInfo[i]["DataText03"];  //�ͮĤ��          
                
				        olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\',\''+Acc+ '\',\''+Curr+'\')"><div class="acctInfo">��J�b���G'+CREDIT_ACCT+'<br>�]�w����G'+CRT_DATE+'<br>�ͮĤ���G'+TXN_DATE+'<br>���ڪ��B�G'+DEBIT_AMOUNT+'</div></a></li>');						
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            //alert(JsonObj[0]["Message"]);
			
			olObject.append("<p class=\"warning\">" + results[0]["Message"] + "</p>");
            //olObject.append('<li><a><p align="center">'+"�iGE090�j�L�]��^����O��"+'</p></a></li>');

        }

    }
