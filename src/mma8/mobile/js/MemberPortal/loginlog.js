function genLoginlogListResult(JsonObj, olObject, funClickName) {
        olObject.html("");
        olObject.append('<li class="head"><div>序號</div><div>登入<br />日期/時間</div><div>登入結果</div></li>');
        if (JsonObj[0]["Header"] == "SUCCESS") {
           
            var objSubInfo = JsonObj[0]["SubInfo"];
            for (i = 0; i < objSubInfo.length; i++) {
                var tmp1 = objSubInfo[i]["DataText1"];
                var tmp2 = objSubInfo[i]["DataText2"];
                var tmp3 = objSubInfo[i]["DataText3"];
				tmp2 = tmp2.trim().replace(" ","<br>");
               
                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div>' + tmp1 + '</div><div>' + tmp2 + '</div><div>' + tmp3 + '</div></li>');
                
            }

        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }

    }
    function genQueryDetail(JsonObj, olObject, Point) {
    
        olObject.html("");        
        if (JsonObj[0]["Header"] == "SUCCESS") {
            var objSubInfo = JsonObj[0]["SubInfo"];
            var tmp1 = objSubInfo[Point]["DataText1"];
            var tmp2 = objSubInfo[Point]["DataText2"];
            var tmp3 = objSubInfo[Point]["DataText3"];
            var tmp4 = objSubInfo[Point]["DataText4"];
            var tmp5 = objSubInfo[Point]["DataText5"];
                
            olObject.append("<li><div>序號</div><div>" + tmp1 + "</div></li>" );
            olObject.append("<li><div>登入日期/時間</div><div>" + tmp2 + "</div></li>");
            olObject.append("<li><div>登入結果</div><div>" + tmp3 + "</div></li>");
            olObject.append("<li><div>IP</div><div>" + tmp4 + "</div></li>");
            olObject.append("<li><div>來源</div><div>" + tmp5 + "</div></li>");
            
        } else {
            //showalert(JsonObj[0]["Message"]);
            alert(JsonObj[0]["Message"]);

        }

    }	            