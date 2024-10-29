  //近三期
	function genCardbilling_spResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
            var objSubInfo = JsonObj[0]["SubInfo"];
            if(objSubInfo!="" && objSubInfo!= null){
            	$('#non_value').val("");
            	$('#non_value').hide();
              for (i = 0; i < objSubInfo.length ; i++) {
                  var tmp1 = objSubInfo[i]["DataText"] ; 
            	    var tmp2 = objSubInfo[i]["DataValue"] ; 
            	     
            	    olObject.append("<li><div>" + tmp1 + "</div><div style=float:right>" + tmp2 + "</div></li>" );
              }
            }
            else if(objSubInfo == null || objSubInfo== ""){
            	
            	$('#non_value').val("查無資料");
            	if($('#non_value').length > 0){
                   
                   $('#non_value').show();
                   document.getElementById("non_value").innerHTML="查無資料";
                }
            }
            var Last1Mon = JsonObj[0]["Last1Mon"];
            var Last2Mon = JsonObj[0]["Last2Mon"];
            var Last3Mon = JsonObj[0]["Last3Mon"];
            var Last1MonText = JsonObj[0]["Last1MonText"];
            var Last2MonText = JsonObj[0]["Last2MonText"];
            var Last3MonText = JsonObj[0]["Last3MonText"];
            
            $('#Last1Mon').val(Last1Mon);
            $('#Last2Mon').val(Last2Mon);
            $('#Last3Mon').val(Last3Mon);
            $('#Last1MonText').val(Last1MonText);
            $('#Last2MonText').val(Last2MonText);
            $('#Last3MonText').val(Last3MonText);
            
            //測試用的假資料
            //olObject.append("<li><div>" + "結帳日" + "</div><div style=float:right>" + "2015/08/16" + "</div></li>" );
            //olObject.append("<li><div>" + "繳款截止日" + "</div><div style=float:right>" + "2015/08/31" + "</div></li>" );
            //olObject.append("<li><div>" + "前期應繳" + "</div><div style=float:right>" + "2,214 元" + "</div></li>" );
            //olObject.append("<li><div>" + "付款/退費<br>*含保留款" + "</div><div style=float:right>" + "0 元" + "</div></li>" );
            //olObject.append("<li><div>" + "本期新增" + "</div><div style=float:right>" + "28,092 元" + "</div></li>" );
            //olObject.append("<li><div>" + "循環利息" + "</div><div style=float:right>" + "0 元" + "</div></li>" );
            //olObject.append("<li><div>" + "違約金" + "</div><div style=float:right>" + "0 元" + "</div></li>" );
            //olObject.append("<li><div>" + "本期應繳" + "</div><div style=float:right>" + "24,092 元" + "</div></li>" );
            //olObject.append("<li><div>" + "最低應繳" + "</div><div style=float:right>" + "2,710 元" + "</div></li>" );
            //olObject.append("<li><div>" + "新增點數" + "</div><div style=float:right>" + "876" + "</div></li>" );
            //end            
           
        } else if (JsonObj[0]["Header"] == "FAIL"){
        	  
            //showalert(JsonObj[0]["Message"]);
            
            var Last1Mon = JsonObj[0]["Last1Mon"];
            var Last2Mon = JsonObj[0]["Last2Mon"];
            var Last3Mon = JsonObj[0]["Last3Mon"];
            var Last1MonText = JsonObj[0]["Last1MonText"];
            var Last2MonText = JsonObj[0]["Last2MonText"];
            var Last3MonText = JsonObj[0]["Last3MonText"];
            
            $('#Last1Mon').val(Last1Mon);
            $('#Last2Mon').val(Last2Mon);
            $('#Last3Mon').val(Last3Mon);
            $('#Last1MonText').val(Last1MonText);
            $('#Last2MonText').val(Last2MonText);
            $('#Last3MonText').val(Last3MonText);
            
            
        }

    }

  //消費明細 TxType=02
	function genCardTxType02Result(JsonObj, olObject, funClickName) {
		    
        olObject.html("");
        
        
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	
        	 
          var objSubInfo = JsonObj[0]["SubInfo"];
          if(objSubInfo!="" && objSubInfo!= null){
          	olObject.append('<li class="head"><div>入帳日<br />簽帳日</div><div>消費說明</div><div>金額</div></li>');
        	  $('#ulmyCardInfoTxType2').show();
            for (i = 0; i < objSubInfo.length; i++) {
            		var tmp1=objSubInfo[i]["DataValue1"] ;
				        var tmp2=objSubInfo[i]["DataValue2"] ;
				        var tmp3=objSubInfo[i]["DataValue3"] ;
				        
				        olObject.append('<li><a><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
				        
            }
          }
          else if(objSubInfo == null || objSubInfo==""){
          	$('#ulmyCardInfoTxType2').hide();
          	$('#non_value').val("查無資料");
          	$('#non_value').show();
          }
        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }
  }