    //貸款明細
    function genQueryDetail(ProType,PayTypeText, AltNoFormat, OriStartDate, StartDate, EndDate, OriLoanAmount, LoanAmount, olObject) {
    	
        //olObject.html("");        
        //var ProType = AltNoFormat.substring(0, 2); //貸款種類
               
        olObject.append("<li><a><div>貸款種類</div><div>" + ProType + "</div></li>" );
        olObject.append("<li><a><div>還本方式</div><div>" + PayTypeText + "</div></li>");
        olObject.append("<li><a><div>分號</div><div>" + AltNoFormat + "</div></li>");
        olObject.append("<li><a><div>初貸日</div><div>" + OriStartDate + "</div></li>" );
        olObject.append("<li><a><div>貸款日</div><div>" + StartDate + "</div></li>");
        olObject.append("<li><a><div>到期日</div><div>" + EndDate + "</div></li>");
        olObject.append("<li><a><div>初貸金額</div><div>" + OriLoanAmount + "</div></li>" );
        //olObject.append("<li><a><div>貸款餘額</div><div>" + LoanAmount + "</div></div></li>");
        olObject.append("<li><a><div>本金餘額</div><div>" + LoanAmount + "</div></li>");
       
                
    }
    
    //繳款明細
    	function genMovementDetailResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  var TitleInfo = JsonObj[0]["TitleInfo"];
        	  olObject.append('<p align="center"><font color=#b9160f>' + "僅提供最近一年內之繳款明細資料" + '</font></p>');
        	  
        	  olObject.append('<li class="head"><div>應繳日<br />繳款日</div><div>繳款金額<br />狀態</div><div>本金餘額<br />違約金金額</div></li>');
            var objSubInfo = JsonObj[0]["SubInfo"];
            for (i = 0; i < objSubInfo.length; i++) {
            	
            		var tmp1=objSubInfo[i]["DataValue1"] ; //應繳日
				        var tmp2=objSubInfo[i]["DataValue2"] ; //繳款日
				        var tmp3=objSubInfo[i]["DataValue3"] ; //繳款金額
				        var tmp4=objSubInfo[i]["DataValue5"] ; //本金餘額
				        var tmp5=objSubInfo[i]["DataValue6"] ; //違約金金額
						var tmp6=objSubInfo[i]["DataValue10"] ; //狀態
				        
				        olObject.append('<li><a><div>' + tmp1 + '<br />' + tmp2 + '</div><div>' + tmp3 +'<br />' + tmp6 +'</div><div>' + tmp4 + '<br />' + tmp5 + '</div></a></li>');
            		
            }
        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            
        }

      }
      
      //應繳金額明細
    	/*function genPayDetailResult(JsonObj, olObject, olObject1, funClickName) {
        showalert("test");
		    olObject.html("");
		    showalert(JsonObj[0]["Header"]);
        if (JsonObj[0]["Header"] == "SUCCESS") {
        	  
        	  //var TitleInfo = JsonObj[0]["TitleInfo"];
        	  //olObject.append('<li><p align="center">' + TitleInfo + '</p></li>');
        	  
        	  //olObject.append('<li class="head"><div>應繳日<br />繳款日</div><div>繳款金額</div><div>本金餘額<br />違約金金額</div></li>');
            var objSubInfo2 = JsonObj[0]["SubInfo_2"];
            var tmp6=objSubInfo2[0]["DataValue6"] ; // 科目為36才有
            var tmp7=objSubInfo2[0]["DataValue7"] ; // 本金餘額
            var tmp8=objSubInfo2[0]["DataValue8"] ; // 免利存款帳號
            var tmp9=objSubInfo2[0]["DataValue9"] ; // 繳款金額
            alert(tmp6);
			      if (tmp6 != "") {
            	
            	olObject.append("<li><a><div>免息型房貸</div><div>" + tmp6 + "</div></li>" );
            	olObject.append("<li><a><div>本金餘額</div><div>" + tmp7 + "</div></li>" );
            	olObject.append("<li><a><div>免利存款帳號</div><div>" + tmp8 + "</div></li>" );
            	olObject.append("<li><a><div>繳款金額</div><div>" + tmp9 + "</div></li>" );
            	
            }
            else {
            	
            	olObject.append("<li><a><div>本金餘額</div><div>" + tmp7 + "</div></li>" );
            	olObject.append("<li><a><div>免利存款帳號</div><div>" + tmp8 + "</div></li>" );
            	olObject.append("<li><a><div>繳款金額</div><div>" + tmp9 + "</div></li>" );
            }
            var objSubInfo = JsonObj[0]["SubInfo"];
            for (i = 0; i < objSubInfo.length; i++) {
            	
            		var tmp1=objSubInfo[i]["DataValue3"] ; //計息起日<br>計息止日
				        var tmp2=objSubInfo[i]["DataValue4"] ; //攤還本金
				        var tmp3=objSubInfo[i]["DataValue5"] ; //繳息金額
				     
				        olObject1.append('<li><a><div>' + tmp1 + '<br />' + tmp2 + '</div><div>' + tmp3 + '</div></a></li>');
            		
            }
        } else if (JsonObj[0]["Header"] == "FAIL"){
            showalert(JsonObj[0]["Message"]);
            
        }

     }    */             