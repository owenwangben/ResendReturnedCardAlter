  //活期存款利率
	function genTWD_CRResult(JsonObj, olObject, funClickName) {
		    olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
        	  
        	  olObject.append('<li class="head"><div>類別</div><div>固定</div><div>機動</div></li>');
            var objSubInfo = JsonObj[0]["SubInfo"];
            
            for (i = 0; i < objSubInfo.length; i++) {
            	  var tmp1 = objSubInfo[i]["DataValue1"] ; 
            	  var tmp2 = objSubInfo[i]["DataValue2"] ; 
                var tmp3 = objSubInfo[i]["DataValue3"]; 
                var tmp4 = objSubInfo[i]["DataValue4"];       
                				
                olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
            }
        
        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
            
        }

  }

  //定期存款利率
 	function genTWD_TDResult(JsonObj, olObject, Type, funClickName) {
 		    
        olObject.html("");
        var Type = Type;
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
        	  
        	  if (Type=="TWD_TD"){
        	     olObject.append('<li class="head"><div>期間</div><div>固定</div><div>機動</div></li>');
       
               var objSubInfo = JsonObj[0]["SubInfo"] ;
               for (i = 0; i < objSubInfo.length; i++) {
            	     var tmp1 = objSubInfo[i]["DataValue1"] ;
            	     tmp1 = tmp1.replace("M","個月"); 
            	     var tmp2 = objSubInfo[i]["DataValue2"] ;  
            	     var tmp3 = objSubInfo[i]["DataValue3"] ;   
                				
                   olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
               }
            }
            else if (Type=="TWD_TD10M"){
            	 olObject.append('<li class="head"><div>金額</div><div>期間</div><div>固定</div><div>機動</div></li>');
       
               var objSubInfo = JsonObj[0]["SubInfo"] ;
               for (i = 0; i < objSubInfo.length; i++) {
            	     var tmp1 = objSubInfo[i]["DataValue1"] ;
            	     tmp1 = tmp1.replace("M","個月"); 
            	     var tmp2 = objSubInfo[i]["DataValue2"] ;  
            	     var tmp3 = objSubInfo[i]["DataValue3"] ;
            	     var tmp4 = objSubInfo[i]["DataValue4"] ;
            	        
                				
                   olObject.append('<li><a><div>' + tmp4 + '</div><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
               }
            	
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
        }

  }
  
  //定期儲蓄存款利率
 	function genTWD_TSDResult(JsonObj, olObject, Type, funClickName) {
 		    
        olObject.html("");
        var Type = Type;
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
        	  
        	  if (Type=="TWD_TSD"){
        	     
        	     olObject.append('<li class="head"><div>期間</div><div>固定</div><div>機動</div></li>');
       
               var objSubInfo = JsonObj[0]["SubInfo"] ;
               for (i = 0; i < objSubInfo.length; i++) {
            	     var tmp1 = objSubInfo[i]["DataValue1"] ;
            	     tmp1 = tmp1.replace("M","個月"); 
            	     var tmp2 = objSubInfo[i]["DataValue2"] ;  
            	     var tmp3 = objSubInfo[i]["DataValue3"] ;   
                				
                   olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
               }
            }
            else if (Type=="TWD_TSD10M"){
            	 
            	 olObject.append('<li class="head"><div>金額</div><div>期間</div><div>固定</div><div>機動</div></li>');
       
               var objSubInfo = JsonObj[0]["SubInfo"] ;
               for (i = 0; i < objSubInfo.length; i++) {
            	     var tmp1 = objSubInfo[i]["DataValue1"] ;
            	     tmp1 = tmp1.replace("M","個月"); 
            	     var tmp2 = objSubInfo[i]["DataValue2"] ;  
            	     var tmp3 = objSubInfo[i]["DataValue3"] ;
            	     var tmp4 = objSubInfo[i]["DataValue4"] ;   
                				
                   olObject.append('<li><a><div>' + tmp4 + '</div><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
               }
            	
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
        }

  }
 	function genTWD_TSD100MResult(JsonObj, olObject, Type, funClickName) {

        olObject.html("");
        var Type = Type;
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	 
        	     olObject.append('<li class="head"><div>金額</div><div>期間</div><div>固定</div><div>機動</div></li>');
       
               var objSubInfo = JsonObj[0]["SubInfo"] ;
               for (i = 0; i < objSubInfo.length; i++) {
            	     var tmp1 = objSubInfo[i]["DataValue1"] ;
            	     tmp1 = tmp1.replace("M","個月"); 
            	     var tmp2 = objSubInfo[i]["DataValue2"] ;  
            	     var tmp3 = objSubInfo[i]["DataValue3"] ; 
            	     var tmp4 = objSubInfo[i]["DataValue4"] ; 
            	     
                   olObject.append('<li><a><div>' + tmp4 + '</div><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
               }
           
        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
        }

  }
    
  //放款利率
 	function genTWD_LRResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
        	  olObject.append('<li class="head"><div>類別&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>固定</div><div>機動</div></li>');
       

            var objSubInfo = JsonObj[0]["SubInfo"] ;
            for (i = 0; i < objSubInfo.length; i++) {
            	  var tmp1 = objSubInfo[i]["DataValue1"] ; 
            	  var tmp2 = objSubInfo[i]["DataValue2"] ; 
                var tmp3 = objSubInfo[i]["DataValue3"] ; 
                var tmp4 = objSubInfo[i]["DataValue4"] ;      
                				
                olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
                
            }
            

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
        }

  }
  
  //信用卡循環利率
 	function genCARDResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
			  olObject.append('<li class="head"><div>類別</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div>利率</div></li>');
        	  
            var objSubInfo = JsonObj[0]["SubInfo"] ;
            for (i = 0; i < objSubInfo.length; i++) {
            	  var tmp1 = objSubInfo[i]["DataText"] ; 
            	  var tmp2 = objSubInfo[i]["DataValue"] ; 
                				
                olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div></a></li>');
            }

        } else if (JsonObj[0]["Header"] == "FAIL"){
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);
        }

  }          
    

    


