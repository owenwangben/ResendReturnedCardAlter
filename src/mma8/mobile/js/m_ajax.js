//2010/3/31 By Aaron: 用戶端用來取網頁資料(目前銀行查詢平台有再使用)
//2010/5/24 By Aaron: 改用 POST 來取的平台資料
//2010/6/3 By Aaron: 調整 POST 來取的平台資料並判斷 400 ~ 599 間的頁面錯誤內容
//2010/07/23 By Larry：調整IE6會hang的bug
function getAjaxData(HtmlPath,Param, DivID) {
    var BrowserObj = false;
    try {
        BrowserObj = new XMLHttpRequest();
    } catch (e) {
        try {
            BrowserObj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                BrowserObj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                IncludeContentObject.innerHTML = GetContentFailMsg();
                return false;
            }
        }
    }    
        
        //Param="DebitAcct=123&CurrID=456";
        //HtmlPath=HtmlPath+"?"+ Param;
	//alert("Param="+Param);
        BrowserObj.open("POST", HtmlPath, false);
        BrowserObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        BrowserObj.setRequestHeader("Content-length", Param.length); 
        BrowserObj.send(Param);       
        //BrowserObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //BrowserObj.setRequestHeader("Connection", "close");	//==>IE6不能設這一行
        //alert(Param.length);
        //BrowserObj.setRequestHeader("Content-length", Param.length);
        //BrowserObj.send(Param);
        //BrowserObj.send(null);
        //2010/6/3 By Aaron: BrowserObj.status 為 Response 的狀態代碼, 正常為 200, 以下邏輯判斷只要為 4XX 或 5XX 就顯示系統忙線中的訊息
        BrowserObj.onreadystatechange = function() {            
            if (BrowserObj.readyState == 4 && (BrowserObj.status >= 400 || BrowserObj.status <= 599)) {              
                return false;
            }
        }
        if (BrowserObj.responseText == "") {
            return false;
        }
        else {
            //alert(BrowserObj.responseText);
            return BrowserObj.responseText
        }
}
//2010/5/24 By Aaron: 用戶端用來取網頁資料,若連現異常所顯示的錯誤訊息(目前銀行查詢平台有再使用)
function GetContentFailMsg() {
    var msgstr = "主機忙線中，請稍後再試!";
    return msgstr;
}

function CallbackEvent(path, postData, fnGetResult, fnError) {
    //get ajax post trade result
    alert("2");
    $.ajax({
        type: "post",
        url: path,
        data: postData,
        dataType: "html",
        success: function(data) {
            //20110413 joy add
            //判斷若有"MMA系統維護中"字樣則代表post回來的頁面有Exception自動導到Error的fnError
            alert(data);
            if (data.toString().indexOf("MMA系統維護中") > -1)
                fnError(data);
            else
                fnGetResult(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            fnError(XMLHttpRequest, textStatus, errorThrown);
        }
    });
}