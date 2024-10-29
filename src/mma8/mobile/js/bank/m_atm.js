//2016.02.19 ATM據點功能專用js
function clearGeolocation() {
    $("#PLAT").val("");
    $("#PLNG").val("");
}

function getGeolocation() {
    if (window.navigator.geolocation) {
        // HTML5 定位抓取
        var option = {
            enableAcuracy: false,
            maximumAge:0,
            timeout:5000
        };
        navigator.geolocation.getCurrentPosition(
        function(position) {
            mapServiceProvider(position.coords.latitude, position.coords.longitude);
        },
        function(error) {
            switch (error.code) {
                case error.TIMEOUT:
                    alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                    break;

                case error.PERMISSION_DENIED: //拒絕
                    alert('很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。');
                    break;

                case error.UNKNOWN_ERROR:
                    alert('不明的錯誤，請稍候再試');
                    break;
            }
            mapServiceProvider(25.047108, 121.542761);    
        },option);
    } else { // 不支援 HTML5 定位
        // 若支援 Google Gears
        if (window.google && google.gears) {
            try {
                // 嘗試以 Gears 取得定位
                var geo = google.gears.factory.create('beta.geolocation');
                geo.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true, gearsRequestAddress: true });
            } catch (e) {
                mapServiceProvider(25.047108, 121.542761);
                alert("定位失敗請稍候再試");
            }
        } else {
            mapServiceProvider(25.047108, 121.542761);
            alert("很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。");
        }
    }
}

// 取得 Gears 定位發生錯誤
function errorCallback(err) {
    var msg = 'Error retrieving your location: ' + err.message;
    alert(msg);
    mapServiceProvider(25.047108, 121.542761);
}

// 成功取得 Gears 定位
function successCallback(p) {
    mapServiceProvider(p.latitude, p.longitude);
}

// 顯示經緯度
function mapServiceProvider(latitude, longitude) {
    $("#PLAT").val(latitude);
    $("#PLNG").val(longitude);
    // alert("PLAT=" + $("#PLAT").val() + ", PLNG=" + $("#PLNG").val());
    pageInit();
}

// 顯示ATM查詢總覽
function genATMQueryResult(JsonObj, showType, olObject, funClickName, sCountry, sQueryStatement, divObject) {
    olObject.empty();
    if (JsonObj.length == 0 && sQueryStatement != "") {
        document.getElementById(divObject).innerHTML = '"' + sQueryStatement + '" 目前無搜尋結果';
        $("#research").show();
    } else if (JsonObj[0]["Header"] == "SUCCESS") {
        var objSubInfo = JsonObj[0]["SubInfo"];
        if (showType == 1) {	//總覽
            for (i = 0; i < JsonObj.length; i++) {
                if (i == 20) {
                    break;
                }
                var tmp = JsonObj[i]["location"]; //ATM
                var tmp2 = JsonObj[i]["address"]; //地址
                var tmp4 = JsonObj[i]["distance"]; //距離
                var tmp5 = JsonObj[i]["DataMap"]; //圖片
                var tmp6 = JsonObj[i]["id"]; //ATM ID
                var tmp7 = JsonObj[i]["withdrawoutcurr"]; //提款
                var tmp8 = JsonObj[i]["savingwithdrawoutntd"]; //存款
                var tmp9 = JsonObj[i]["sATM_24_service"]; //服務時間

                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div style="float:right"><span class="expenses">' + tmp4 + 'km</span></div><div class="acctInfo"><b>' + tmp + '</b><p>' + tmp2 + '</p><p>' + tmp7 + '</p><p>' + tmp8 + '</p><p>' + tmp9 + '</p></div></a></li>');
            }

        } else if (showType == 2) { //顯示ATM查詢結果
            if (sCountry == '') {
                document.getElementById(divObject).innerHTML = '"' + sQueryStatement + '" 目前無搜尋結果';
                $("#research").show();
            } else {
                document.getElementById(divObject).innerHTML = '"' + sQueryStatement + '" 搜尋結果如下';
                for (i = 0; i < JsonObj.length; i++) {
                    if (i == 20) {
                        break;
                    }
                    var tmp = JsonObj[i]["location"]; //ATM
                    var tmp2 = JsonObj[i]["address"]; //地址
                    var tmp4 = JsonObj[i]["distance"]; //距離
                    var tmp5 = JsonObj[i]["DataMap"]; //圖片
                    var tmp6 = JsonObj[i]["id"]; //ATM ID
                    var tmp7 = JsonObj[i]["withdrawoutcurr"]; //提款
                    var tmp8 = JsonObj[i]["savingwithdrawoutntd"]; //存款
                    var tmp9 = JsonObj[i]["sATM_24_service"]; //服務時間

                    olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + i + '\')"><div style="float:right"><span class="expenses">' + tmp4 + 'km</span></div><div class="acctInfo"><b>' + tmp + '</b><p>' + tmp2 + '</p><p>' + tmp7 + '</p><p>' + tmp8 + '</p><p>' + tmp9 + '</p></div></a></li>');
                }
            }
        }
    } else {
        showalert(JsonObj[0]["Message"]);
    }
}

function showATM(Type, searchMode) {
    if (Type == "1") { //附近ATM
        location.href = "/m/bank/atm/m_ATM_nearby.aspx";
    }
    else if (Type == "2") {//搜尋頁面
        location.href = "/m/bank/atm/m_ATM_search.aspx";
    }
    else if (Type == "3") {//搜尋結果
        if (searchMode != null && searchMode == "2") {
            location.href = "/m/bank/atm/m_ATM_search_keyword_rlt.aspx";
        } else {
            location.href = "/m/bank/atm/m_ATM_search_result.aspx";
        }
    }
}

//版本備註
function setFooter() {
    //var version = "2016.02.26 v3.1";
    //$("#footer").html(version);
}

$(document).ready(function() {
/*
    setFooter();
    try {	
    	if(location.host=="m.sinopac.com"){
    		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
    		ga('create', 'UA-67064217-3', 'auto');
    		ga('send', 'pageview');
    	}
    } catch (err) {
    
    }
    */
});