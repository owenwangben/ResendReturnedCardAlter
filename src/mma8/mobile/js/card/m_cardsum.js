
  //信用卡總覽
	function genCardListResult1(JsonObj, olObject, funClickName) {
		    
		    var StmtDate="";
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo1"];
            for (i = 0; i < objSubInfo.length; i++) {
						var tmp1=objSubInfo[i]["DataText"] ;
				        var tmp2=objSubInfo[i]["DataValue"] ;
				        olObject.append("<li><div>" + tmp1 + "</div><div style=float:right>" + tmp2 + "</div></li>" );
            }
            
            
            StmtDate = objSubInfo[3]["DataValue"];
            StmtDate = StmtDate.replace("/","");
            StmtDate = StmtDate.substring(0,6);
            $('#StmtDate').val(StmtDate);
            //alert(StmtDate);
  
        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }
             
  }
  
  	function genCardListResult2(JsonObj, olObject, funClickName) {
		    
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo2 = JsonObj[0]["SubInfo2"];
          
            for (j = 0; j < objSubInfo2.length; j++) {
            		var tmp3=objSubInfo2[j]["DataText"] ;
				        var tmp4=objSubInfo2[j]["DataValue"] ;
				        olObject.append("<li><div>" + tmp3 + "</div><div style=float:right>" + tmp4 + "</div></li>" );
            }
            
        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }
  }
  
  //消費明細 TxType=02
	function genCardTxType02Result(JsonObj, olObject, funClickName) {
		    
        olObject.html("");
        
        olObject.append('<li class="head"><div>入帳日<br />簽帳日</div><div>消費說明</div><div>金額</div></li>');
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo"];
             if(objSubInfo.length > 0){
              for (i = 0; i < objSubInfo.length; i++) {
            		  var tmp1=objSubInfo[i]["DataValue1"] ;
				          var tmp2=objSubInfo[i]["DataValue2"] ;
				          var tmp3=objSubInfo[i]["DataValue3"] ;
				        
				          olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
				        
              }
             }
             else
             {
             	    $('#ulmyCardInfo1').hide();
                  $('#ulmyCardInfo2').hide();
             	    document.getElementById("non_value").innerHTML="查無資料";
             }
        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }
  }
  
 

