//2016.01.07 預先取號、填單功能專用js

function clearGeolocation() {
    $("#PLAT").val("");
    $("#PLNG").val("");
}

function getGeolocation() {
    if (navigator.geolocation) {
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
					mapServiceProvider(25.047108,121.542761);
				},option
			);
    } else { // 不支援 HTML5 定位
        // 若支援 Google Gears
        if (window.google && google.gears) {
            try {
                // 嘗試以 Gears 取得定位
                var geo = google.gears.factory.create('beta.geolocation');
                geo.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true, gearsRequestAddress: true });
            } catch (e) {
                alert("定位失敗請稍候再試");
				mapServiceProvider(25.047108,121.542761);
            }
        } else {
            alert("很抱歉！無法取得定位，提醒您如未開啟GPS定位功能，請記得開啟。");
			mapServiceProvider(25.047108,121.542761);
        }
    }
}

// 取得 Gears 定位發生錯誤
function errorCallback(err) {
    var msg = 'Error retrieving your location: ' + err.message;
    alert(msg);
	mapServiceProvider(25.047108,121.542761);
}

// 成功取得 Gears 定位
function successCallback(p) {
    mapServiceProvider(p.latitude, p.longitude);
}

// 顯示經緯度
function mapServiceProvider(latitude, longitude) {
    $("#PLAT").val(latitude);
    $("#PLNG").val(longitude);
//    alert("PLAT=" + $("#PLAT").val() + ", PLNG=" + $("#PLNG").val());
		$("#olAcctList").empty();
    pageInit();
}

//重新定位
function reGetGeolocation() {
	$('#loading').show();
	$("#olAcctList").empty();
	getGeolocation();
}

//--------呼叫Service共用------------
// arrName  : 參數名稱陣列
// arrValue : 參數值陣列
// service  : Service名稱
// method   : function名稱
function callService(arrName, arrValue, service, method) {
	var response = "";
    var request = '{"request": {';
	for(i=0;i<arrName.length;i++) {
		if(arrName[i] != "Satisfaction"){
			request = request + '"' + arrName[i] + '":"' + arrValue[i] + '"';
		}else {
			request = request + '"' + arrName[i] + '":' + parseInt(arrValue[i]);
		}
		if(i != arrName.length - 1) {
			request = request + ',';
		}
	}
	request = request + '}}';
	//alert(request);
	$.ajax({
            url: "/ws/bank/easy_index_preServiceNum/ws_PreServiceNum_ByPass_NonLogin.ashx",
            headers: { 'bypass-url': service, 'bypass-method': method },
            data: request,
            type: "post",
            dataType: "json",
            contentType: "application/json",
            async: false,
            controller: this,
            success: function(responseData) {
                if (responseData != null) {
                    var json = JSON.parse(responseData[0]["JsonData"]);
					//alert(responseData[0]["Message"]);
					//alert(json.jsonData.ResultStatus);
                    response = json.jsonData;
                }
            },
//			complete:function(){
//				setTimeout(function(){HideProgressBar();},300);
//           },
            error: function(aXMLHttpRequest, textStatus, errorTown) {
                alert("錯誤aXMLHttpRequest=" + aXMLHttpRequest + " textStatus=" + textStatus + " errorTown=" + errorTown);
            }
        });
        return response;
}

//叫號系統各分行等待人數
function callWaitingCount(BranchId) {
    //呼叫WaitingCount
	var arrName = ["BranchID"];
	var arrValue = [BranchId];
    var response = callService(arrName, arrValue, "WaitingCounts.svc", "WaitingCount");
	return response;
}

var send = "N";

//選擇分行onclick
function doQueryDetail(BranchId, Data, Tel, Addr, Fax, Distance, Map, Name, LAT, LNG) {
	if(send == "Y") {//避免重複送出
		return;
	}
    var results = callWaitingCount(BranchId);//此處取得等待人數於m_branch_detail.aspx頁面顯示
	if(results.ResultStatus >= 0){
		$("#SaleName07").val(results.SaleName07);
		$("#SaleName08").val(results.SaleName08);
		$("#WaitingCount07").val(results.WaitingCount07);//一般收付 等候人數
		$("#WaitingCount08").val(results.WaitingCount08);//綜合服務 等候人數
		$("#ResultStatus").val(results.ResultStatus);//分行狀態
		$("#SystemDatetime").val(results.SystemDatetime);//系統時間
	} else {
		alert(results.ShowMessage);
		return;
	}
    //設定分行資料傳送到BranchInfo.aspx頁面
    $("#BranchId").val(BranchId);
    $("#Data").val(Data);
    $("#Tel").val(Tel);
    $("#Addr").val(Addr);
    $("#Fax").val(Fax);
    $("#Distance").val(Distance);
    $("#Map").val(Map);
    $("#Name").val(Name);
    $("#Branch_LAT").val(LAT);
    $("#Branch_LNG").val(LNG);
	send = "Y";
	$("#tr_moblie").attr("action","/m/bank/easy_index_preServiceNum/m_branch_detail.aspx");
    $("#tr_mobile").submit();
}

//生成分行List(預約服務)
function genBankBalQueryResult(JsonObj, showType, olObject, funClickName) {
		olObject.empty();
    if (JsonObj[0]["Header"] == "SUCCESS") {
        var objSubInfo = JsonObj[0]["SubInfo"];
        if (showType == 1) {	//總覽
            for (i = 0; i < objSubInfo.length; i++) {
                var tmp = objSubInfo[i]["DataText"]; //分行
                var tmp1 = objSubInfo[i]["DataTel"]; //電話
                var tmp2 = objSubInfo[i]["DataAddr"]; //地址
                var tmp3 = objSubInfo[i]["DataFax"]; //Fax
                var tmp4 = objSubInfo[i]["DataDistance"]; //距離
                var tmp5 = objSubInfo[i]["DataMap"]; //圖片
                var tmp6 = objSubInfo[i]["DataName"]; //電話
                var tmp7 = objSubInfo[i]["BranchId"]; //BranchId
                var tmp8 = objSubInfo[i]["LAT"]; //LAT 緯度
                var tmp9 = objSubInfo[i]["LNG"]; //LNG 經度

                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + tmp7 + '\',\'' + tmp + '\',\'' + tmp1 + '\',\'' + tmp2 + '\',\'' + tmp3 + '\',\'' + tmp4 + '\',\'' + tmp5 + '\',\'' + tmp6 + '\',\'' + tmp8 + '\',\'' + tmp9 + '\')"><div style="float:right"><span class="expenses">' + tmp4 + 'km</span></div><div class="reserve-notice">預約</div><div class="acctInfo"><b>' + tmp + '</b><p>' + tmp2 + '</p><p>TEL:' + tmp1 + '</p><p>FAX:' + tmp3 + '</p></div></a></li>');
            }
//		<div class="selectBranch">預約</div>
        } else {
            alert(JsonObj[0]["Message"]);

        }
    }
}

//生成分行List(分行據點)
function genBranchBalQueryResult(JsonObj, showType, olObject, funClickName) {
		olObject.empty();
    if (JsonObj[0]["Header"] == "SUCCESS") {
        var objSubInfo = JsonObj[0]["SubInfo"];
        if (showType == 1) {	//總覽
            for (i = 0; i < objSubInfo.length; i++) {
                var tmp = objSubInfo[i]["DataText"]; //分行
                var tmp1 = objSubInfo[i]["DataTel"]; //電話
                var tmp2 = objSubInfo[i]["DataAddr"]; //地址
                var tmp3 = objSubInfo[i]["DataFax"]; //Fax
                var tmp4 = objSubInfo[i]["DataDistance"]; //距離
                var tmp5 = objSubInfo[i]["DataMap"]; //圖片
                var tmp6 = objSubInfo[i]["DataName"]; //電話
                var tmp7 = objSubInfo[i]["BranchId"]; //BranchId
                var tmp8 = objSubInfo[i]["LAT"]; //LAT 緯度
                var tmp9 = objSubInfo[i]["LNG"]; //LNG 經度

                olObject.append('<li><a href="javascript: void(0)" onClick="' + funClickName + '(\'' + tmp7 + '\',\'' + tmp + '\',\'' + tmp1 + '\',\'' + tmp2 + '\',\'' + tmp3 + '\',\'' + tmp4 + '\',\'' + tmp5 + '\',\'' + tmp6 + '\',\'' + tmp8 + '\',\'' + tmp9 + '\')"><div style="float:right"><span class="expenses">' + tmp4 + 'km</span></div><div class="acctInfo"><b>' + tmp + '</b><p>' + tmp2 + '</p><p>TEL:' + tmp1 + '</p><p>FAX:' + tmp3 + '</p></div></a></li>');
            }
//		<div class="selectBranch">預約</div>
        } else {
            alert(JsonObj[0]["Message"]);

        }
    }
}

//查詢單筆填單明細
function callQueryActivity(GuID, BranchID, BookingNumber, ReservationDate, Token, IDNO, IP, Channel, OsVersion, DevicePlatform, AppVersion) {
    //呼叫QueryActivity，IDNO欄位非必輸，USER有登入才需要帶
    var arrName = ["GuID", "BranchID", "BookingNumber", "ReservationDate", "Token", "IDNO", "IP", "Channel", "OsVersion", "DevicePlatform", "AppVersion"];
    var arrValue = [GuID, BranchID, BookingNumber, ReservationDate, Token, IDNO, IP, Channel, OsVersion, DevicePlatform, AppVersion];
    var response = callService(arrName, arrValue, "PostActivities.svc", "QueryActivity");
    return response;
}
   
//刪除預約紀錄
function callDeleteActivity(GuID, Token, IDNO, IP, Channel, OsVersion, DevicePlatform, AppVersion) {
    //呼叫DeleteActivity，IDNO欄位非必輸，USER有登入才需要帶
    var arrName = ["GuID", "Token", "IDNO", "IP", "Channel", "OsVersion", "DevicePlatform", "AppVersion"];
    var arrValue = [GuID, Token, IDNO, IP, Channel, OsVersion, DevicePlatform, AppVersion];
    var response = callService(arrName, arrValue, "PostActivities.svc", "DeleteActivity");
    return response;
}

//取得行動裝置相關資訊，回傳陣列[]
function getUserAgent() {
	//  UserAgent = Sinopac mobilebanking iPhone app v3.3.0;deviceid=BFEE9C34-BD0A-4271-8FDD-A37F77376A31&MobileDevice=iPhone/iPhone7,1&MobileOS=9.1&Token=(null)
    var UserAgent = navigator.userAgent;
	//alert(UserAgent);
	var AppVersion = "";
	var token = "";
	var DevicePlatform = "";
	var OsVersion = "";
	var tmpStr = "";
	
	if(UserAgent.indexOf("app") != -1){
		AppVersion = UserAgent.substring(UserAgent.indexOf("app") + 4, UserAgent.indexOf(";"));
		tmpStr = UserAgent.substring(UserAgent.indexOf("deviceid")).split("&");
		token = tmpStr[0].substring(tmpStr[0].indexOf("=") + 1);
		DevicePlatform = tmpStr[1].substring(tmpStr[1].indexOf("=") + 1);
		OsVersion = tmpStr[2].substring(tmpStr[2].indexOf("=") + 1);
		//  alert(UserAgent + ", AppVersion=" + AppVersion + ", token=" + token + ", DevicePlatform" + DevicePlatform + ", OsVersion=" + OsVersion);
	}
	var reRlt = [token, OsVersion, DevicePlatform, AppVersion];
	return reRlt;
}

//做帳號隱碼
function acctHiddenCode(value) {
	var rlt = "";
	if(value != undefined && value != "" && value != null) {
		rlt = value.substr(0, 6) + "****" + value.substr(10, value.length - 10 - 1) + "*";
	}
	return rlt;
}

//姓名(戶名)隱碼
function nameHiddenCode(value) {
	var rlt = "";
	if(value != undefined && value != "" && value != null) {
		if(value.length < 3) {//名字2個字
			rlt = value.substr(0, 1) + "*";
		}else {//名字3個字或以上
			rlt = value.substr(0, 1);
			for(i=1;i<value.length-1;i++) {
				rlt = rlt + "*";
			}
			rlt = rlt + value.substr(value.length-1, value.length);
		}
	}
	return rlt;
}

function ToAmount(Amount) {
	var rlt = 0;
	if(Amount.length != 0) {
		rlt = parseInt(Amount.replace(/\,/g, ""));
	}
//	alert(rlt);
	return rlt;
}

//金額格式
function formatAmount(value) {
    valTempValue = value.replace(/,/ig, "");
    var re = /(-?\d+)(\d{3})/
    while (re.test(valTempValue)) {
        valTempValue = valTempValue.replace(re, "$1,$2")
    }
    return valTempValue;
}

//2016.06.21 金額數字轉中文(僅適用整數)
function numberToChinese(n) {
	var digit = ['零', '壹', '貳', '參', '肆','伍', '陸', '柒', '捌', '玖'];
	var unit = [['元', '萬', '億'], ['', '拾', '佰', '仟']];
	var s = '';
	for (var i = 0; i < unit[0].length && n > 0; i++) {
		var p = '';
		for (var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return (s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^$/, '零元') + '整').replace('元整', '');
}

function checkAmt(jqObject) {
	var amt = ToAmount(jqObject.val());
	if (jqObject.val().length != 0 && amt == 0) {
		showalert("金額不可為0");
		jqObject.val("");
		jqObject.focus();
	} else if(jqObject.val() != "") {
		jqObject.val(formatAmount(amt + ''));
	}
}

//根據日期取得星期
function getDateWeek(year, month, day) {
    var tmpdate = new Date(year, month - 1, day);
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    return arr[tmpdate.getDay()];
}
	
//抓取測試用參數
//function getParameter() {
//    var url = window.location.toString(); //當前網址
//    var str = ""; //?參數中等號左邊的值
//    var str_value = ""; //?參數中等號右邊的值
//    if (url.indexOf("?") != -1) { //如果網址有"?"符號
//        var ary = url.split("?")[1].split("&");
//        //取得"?"右邊網址後利用"&"分割字串存入ary陣列 ["a=1","b=2","c=3"]
//        for (var i in ary) {
//            //取得陣列長度去跑迴圈，如:網址有三個參數，則會跑三次
//            str = ary[i].split("=")[0];
//            //取得參數"="左邊的值存入str變數中
//            if (str == "Token" || str == "token") {
//                //若str等於想要抓取參數 如:b
//                str_value = decodeURI(ary[i].split("=")[1]);
//                //取得b等號右邊的值並經過中文轉碼後存入str_value
//            }
//        }
//    }
//      alert(str_value); //顯示參數的值
//    $("#IP").val(str_value);
//	return str_value;
//}

// 永豐銀行帳號編碼原則
// 
// 例：002-004-0003336-7 
//     分行別-科目別-流水號-檢查碼
// 	   128-004-0065980-1
//
// 分行別：0000002                         
// 科目別：0000004
// 流水號：0003336
// +
// -------------------------------- 
//             0003342
// 
// 0   0   0   3   3   4   2
// x   2   3   4   5   6   7   2   (固定)
// ---------------------------------------------
//     0 + 0 +  0 + 15 + 18 + 28 + 4 = 65 
// 
// 65 / 9 = 7  + 2                9 - 2 = 7 檢查碼 (9為固定數字)
//       商  餘
//
//
function checkAccount(account) {
	if(account.length == 14){
		//分行別 + 科目別 + 流水號
		var sumNum = parseInt(account.substr(0,3), 10) + parseInt(account.substr(3,3), 10) + parseInt(account.substr(6,7), 10);
//		alert("sumNum=" + sumNum);
		var checkNum = parseInt(account.substr(13,1), 10);//檢查碼
		var strNum = paddingLeft(sumNum + '', 7);//轉成字串前補0
		var ary1 = strNum.split("");//字串切割1
		var ary2 = "2345672".split("");//字串切割1
		//ary1與ary2各個數相乘的合
		var sum = 0;
		for(i = 0; i < ary1.length; i++) {
			sum = sum + parseInt(ary1[i]) * parseInt(ary2[i]);
		}
//		alert("sum=" + sum);
		var rltNum = 9 - (sum % 9);
//		alert("rlt=" + rltNum);
		if(rltNum == checkNum) {//結果與檢查碼相等，帳號正確
			return true;
		}else {
			return false;
		}
	} 
}

//前補0
function paddingLeft(str,lenght){
	if(str.length >= lenght)
		return str;
	else
		return paddingLeft("0" +str,lenght);
}

function checkNameField(obj, fieldName) {
	if (!obj.val().match(/^[\u4e00-\u9fa5|a-zA-Z]*$/)) {
        alert(fieldName + "只能輸入中英文");
        obj.focus();
    }
}

//禁止輸入特殊符號
function TextValidate()
{
//	alert(value);
    var code = window.event.keyCode;
    var character;
//    if (document.all) //判斷是否是IE瀏覽器
//    {
//        code = window.event.keyCode;
//    }
//    else
//    {
//        code = arguments.callee.caller.arguments[0].which;
//    }
	var character = String.fromCharCode(code);
	
    //特殊字元正則
    var txt=new RegExp("[,\\-,\\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\{,\\},\\(,\\),\\',\\;,\\=,\"]");
    if (txt.test(character))
    {
        alert("名稱不可包含特殊字元:\n , ` ~ ! @ # $ % ^ + & * \\ / ? | : . < > {} () [] \" ");
        window.event.returnValue = false;
    }else if (code == 187 || code == 188) {
        window.event.returnValue = false;
	}
}

//--------------------------------loading---------------------------------------------
// 顯示讀取遮罩
function ShowProgressBar() {
    displayProgress();
    displayMaskFrame();
}

// 隱藏讀取遮罩
function HideProgressBar() {
    var progress = $('#divProgress');
    var maskFrame = $("#divMaskFrame");
    progress.hide();
    maskFrame.hide();
}
// 顯示讀取畫面
function displayProgress() {
    var w = $(document).width();
    var h = $(window).height();
    var progress = $('#divProgress');
    progress.css({ "z-index": 999999, "top": h - (progress.height() / 2), "left": (w / 2) - (progress.width() / 2) });
    progress.show();
}
// 顯示遮罩畫面
function displayMaskFrame() {
    var w = $(window).width();
    var h = $(document).height();
    var maskFrame = $("#divMaskFrame");
    maskFrame.css({ "z-index": 999998, "opacity": 0.7, "width": w, "height": h });
    maskFrame.show();
}
//--------------------------------loading---------------------------------------------
//--------------------------google Map start------------------------------------
function setATM_map(lat, lng, name) {
    var atmLatLng = new google.maps.LatLng(lat, lng);
    var myLatLng = new google.maps.LatLng($("#PLAT").val(), $("#PLNG").val());
    var myOptions = {
        zoom: 15,
        center: atmLatLng,
        /*Map 佈景*/
        mapTypeControl: false,
        /*Map 方向盤*/
        panControl: false,
        /*Map 方向盤*/
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        /*Map 縮放控制*/
        scaleControl: false,
        /*Map 街景*/
        streetViewControl: true

    };

		map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: atmLatLng,
        icon: '/MMA8/mobile/images/pin_red.png'
        //title: name
    });

    var myMarker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        icon: '/MMA8/mobile/images/pin_blue.png'
        //icon: pinSymbol("#00F")
        //title: "我的位置"
    });
    //建立MyLocation按鈕
    var myLocationControlDiv = document.createElement('div');
    var myLocatioControl = new MyLocationControl(myLocationControlDiv, map, myLatLng);

    myLocationControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(myLocationControlDiv);
}

function MyLocationControl(controlDiv, map, myLatLng) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.boxShadow = '0 1px 3px rgba(0,0,0,.3)';
    controlUI.style.margin = '10px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.width = '26px';
    controlUI.style.height = '26px';
    controlUI.style.marginBottom = '1px';
    controlUI.style.textAlign = 'center';
    controlUI.title = '我的位置';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '26px';
    controlText.style.paddingRight = '10px';
    controlText.innerHTML = '<img style="width:22px; height:22px; " src="/MMA8/mobile/images/mylocation.png" alt="" />';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to myLatLng.
    controlUI.addEventListener('click', function() {
        map.setCenter(myLatLng);
    });
}

function pinSymbol(color) {
	return {
		path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
		fillColor: color,
		fillOpacity: 1,
		strokeColor: '#000',
		strokeWeight: 1,
		scale: 1,
	};
}

//--------------------------google Map End------------------------------------
//版本備註 測試用
//function setFooter() {
//	var version = "2016.02.25 v3.0";
//	$("#footer").html(version);
//}

//$(document).ready(function() {
//	setFooter();
//	try {	
//		if(location.host=="m.sinopac.com"){
//			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//
//			ga('create', 'UA-67064217-3', 'auto');
//			ga('send', 'pageview');
//		}
//	} catch (err) {
//
//	}
//});