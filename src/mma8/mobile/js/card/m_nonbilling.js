
  //未結帳帳單
	function genNonbillingListResult1(JsonObj, olObject, funClickName) {
		    //alert("未結帳帳單js");
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo1 = JsonObj[0]["SubInfo"];
            
            olObject.append('<li class="head"><div>簽帳日</div><div>消費說明</div><div>金額</div></li>');
            for (i = 0; i < objSubInfo1.length; i++) {
            		var tmp1 = objSubInfo1[i]["DataValue1"] ;
				        var tmp2 = objSubInfo1[i]["DataValue2"] ;
				        var tmp3 = objSubInfo1[i]["DataValue3"] ;
				        
				        olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
            }               
  
        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }
  }


