	function genInterestTypeResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  //alert(JsonObj[0]["Header"]);
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<div class="warning" style="padding-bottom:inherit">' + TitleInfo + '</div>');
            var objSubInfo = JsonObj[0]["SubInfo"];
            
            if($('#interestType').val() == "NTWD"){
            	  //alert("test!");
            	  olObject.append('<li class="head"><div>幣別</div><div>活期存款</div><div>一年定存</div></li>');
                for (i = 0; i < objSubInfo.length; i++) {
            	     var curr=objSubInfo[i]["DataValue1"] ; //幣別
            	     var tmp1=objSubInfo[i]["DataValue2"] ; //活期存款
            	     var tmp2 = objSubInfo[i]["DataValue3"]; //一年定存       
                	 var tmp3 = objSubInfo[i]["DataValue4"];	
                				
                   olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + curr + '</div><div>' + tmp1 + '</div><div>' + tmp2 + '</div></a></li>');
                }
            }
            else if($('#interestType').val() == "NTWD_LOAN"){
            	  olObject.append('<li class="head"><div>幣別</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>利率(%)</div></li>');
            	  for (i = 0; i < objSubInfo.length; i++) {
            	     var curr=objSubInfo[i]["DataText"] ; //幣別
            	     var tmp1=objSubInfo[i]["DataValue"] ; //活期存款
            	          
                				
                   olObject.append('<li><a><div>' + curr + '</div><div>&nbsp;</div><div>' + tmp1 + '</div></a></li>');
            	  }
            }
        } else if (JsonObj[0]["Header"] == "FAIL"){
            alert(JsonObj[0]["Message"]);
            
        }

  }
  
  //外幣單一幣別
  function currQueryDetail(JsonObj, Point) {
  	
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  //alert(JsonObj[0]["Header"]);
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
            var objSubInfo = JsonObj[0]["SubInfo"];
            
            //alert("test!");
            var curr_url=objSubInfo[Point]["DataValue4"] ; //單一幣別ashx
            
            //alert("1. curr_url:" + curr_url);
            $("#curr_url").val(curr_url);
            //alert("2. curr_url:" + $("#curr_url").val());
            
            
        } else if (JsonObj[0]["Header"] == "FAIL"){
            alert(JsonObj[0]["Message"]);
            
        }
  	
  }
  
  //show外幣單一幣別detail
	function genCurrQueryDetail(JsonObj, olObject, Point) {
        olObject.html("");
        
        if (JsonObj[0]["Header"] == "SUCCESS") {
            //alert("genCurrQueryDetail");
        	  
        	  
            var TitleInfo = JsonObj[0]["TitleInfo"];
            var objSubInfo = JsonObj[0]["SubInfo"];
            var CurrText = objSubInfo[0]["DataValue3"];
            $("#CurrText").val(CurrText);
           
            document.getElementById("currfix").innerHTML= CurrText + "定期存款利率(%)" ;
           
            for (i = 0; i < 10; i++) {
                var tmp1=objSubInfo[i]["DataText"] ;
                //alert("tmp1=" + tmp1);
                if (tmp1.indexOf("7D") > -1){
                    tmp1 = tmp1.replace(tmp1,"1星期");
                }
                else if (tmp1.indexOf("14D") > -1){
                    tmp1 = tmp1.replace(tmp1,"2星期");
                }
                else if (tmp1.indexOf("21D") > -1){
                    tmp1 = tmp1.replace(tmp1,"3星期");
                }
                else if (tmp1.indexOf("M") > -1){
                    tmp1 = tmp1.replace("M","個月");
                }
                else {
            	     
                }
            	      
                var tmp2=objSubInfo[i]["DataValue"] + "<br><br>" ; 
                //if (tmp1.indexOf("一年") > -1 || tmp1.indexOf("二年") > -1 || tmp1.indexOf("三年") > -1) {
				if (tmp1.indexOf("三年") > -1 ) {

            	      tmp2 = tmp2.replace("<br><br>", "");

            	  }

            	  olObject.append(tmp1 + ' ' + tmp2);
            	  
            	  
           }
          
        } else if (JsonObj[0]["Header"] == "FAIL"){
            alert(JsonObj[0]["Message"]);
            
        }

  }
  
