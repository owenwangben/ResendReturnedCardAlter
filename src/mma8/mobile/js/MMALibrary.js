//若str的長度小於length，則在其左邊補sign
function padLeft(str, length, sign) {
    if (str.length >= length) return str;
    else return padLeft(sign + str, length, sign);
}

//若str的長度小於length，則在其右邊補sign
function padRight(str, length, sign) {
    if (str.length >= length) return str;
    else return padRight(str + sign, length, sign);
}

//檢查總長度, 若小於 slength, 則回傳 true, 否則傳 false
function chkTotalLen(sWord, slength) {
    var iOutput = 0;
    var i = 0;
    var len = sWord.length;
    var TotalLen = 0;
    var checkLen = false;

    while (i < len) {
        iOutput = sWord.charCodeAt(i);
        // 全形字長度計算
        if (iOutput > 128)
            TotalLen = TotalLen + 2;

        // 半形字長度計算
        if (iOutput < 129 && iOutput >= 32)
            TotalLen = TotalLen + 1;

        // 取下一個字元
        i++;
    }

    if (TotalLen <= slength)
        checkLen = true;

    return checkLen;
}

// 確認被保險人 ID 是否正確
function IsIDValid(sID) {
    var bRet = false;
    var regEx = new RegExp("[^0-9a-zA-Z]");
    if (10 == sID.length && false == regEx.test(sID)) {
        var sTmp = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
        sID = sID.toUpperCase();
        var strCode = sID.substr(0, 1)
        var iCheck = sTmp.indexOf(strCode) + 10;
        iCheck = Math.floor(iCheck / 10) + (iCheck % 10) * 9;
        for (var i = 1; i < 9; i++) iCheck = iCheck + (parseInt(sID.substr(i, 1)) * (9 - i));
        iCheck += parseInt(sID.substr(9, 1));
        if (0 == (iCheck % 10)) bRet = true;
        else bRet = false;
    }
    return bRet;
}

//檢查EMAIL格式是否正確
function IsEMailValid(email) {
    // 規則: 1.只有一個 "@"
    //       2.網址中, 至少要有一個".", 且不能連續出現
    //       3.不能有空白
    var regExp = /^[^@^\s]+@[^\.@^\s]+(\.[^\.@^\s]+)+$/;
    if (email.match(regExp))
        return true;
    else
        return false;
}


// 確認被保險人ID是否正確
// parm inskind : 保險種類
// parm sID : 客戶ID
// return IsInsID : true/false
function IsInsID(inskind, sID) {
    var IsInsID = false;
    var sID = sID.toUpperCase();
    var check = false;
    check = IsIDValid(sID);


    if (inskind == "car" || inskind == "moto" || inskind == "trip") {
        if (sID.length == 10 || sID.length == 11 || sID.length == 8) {
            // 本國人
            if (check && 10 == sID.length) {
                IsInsID = true;
            } else if (10 == sID.length) {
                // 外國人(生日+2碼英文)
                if (isNaN(sID.substr(0, 8)) == false && ((sID.substr(8, 1)).charCodeAt(0) - 65 < 26) && ((sID.substr(9, 1)).charCodeAt(0) - 65 < 26))
                    IsInsID = true;
            } else if (11 == sID.length) {
                // 外國人(2碼英文+9碼數字)
                if (isNaN(sID.substr(2, 9)) == false && ((sID.substr(0, 1)).charCodeAt(0) - 65 < 26) && ((sID.substr(1, 1)).charCodeAt(0) - 65 < 26))
                    IsInsID = true;
            } else if (8 == sID.length && isNumeric(sID)) {
                IsInsID = true;
            }
        } // end of if (sID.length==10 || sID.length==11)

    } else if (inskind == "suei") {
        if (check && 10 == sID.length) {
            IsInsID = true;
        }
    } // end of inskind...

    return IsInsID;
}


//檢查是否為合法的日期, 格式必須為 yyyyMMdd
function isValidDate(str) {
    var expr = /^([1-2]{1,1}[0-9]{3,3})([0-1]{1,1}[0-9]{1,1})([0-3]{1,1}[0-9]{1,1})$/;
    if (str.length != 8) {
        return false;
    }
    if (!expr.test(str)) {
        return false;
    }
    var date = new Date(str.substr(0, 4) + "/" + str.substr(4, 2) + "/" + str.substr(6, 2));
    if (date.getFullYear() == parseFloat(str.substr(0, 4)) && (date.getMonth() + 1 == parseFloat(str.substr(4, 2))) && date.getDate() == parseFloat(str.substr(6, 2))) {
        return true;
    }
    return false;
}

//日期必須在指定範圍內, pierod可為y, m, d, h, n, s, 其中secondDiff 為 Server 比 Client 多(+)或少(-)幾秒
//secondDiff 的取得方式參考如下：
//var sNow = new Date('<％=DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss")％>');
//var now = new Date();
//var secondDiff = Math.ceil((sNow.getTime() - now.getTime()) / 1000);
function ServerDateWithin(startDate, pierod, number, secondDiff) {
    var sd = new Date(startDate);
    var now = new Date();
    //secondDiff: Server 比 Client 多多少秒
    now.add("s", secondDiff); //校正 Client 的現在時間, 使得 now 的時間會與 Server 上的 now 一樣
    //var month1 = now.getMonth() + 1;
    //var client_time1 = now.getYear() + "/" + month1 + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    //alert("校正後時間:" + client_time1);
    now.add(pierod, number);
    if (sd > now) //startDate 是否落在兩個月(number=2,  pierod='m')內?
        return false;
    else
        return true;
}


//日期必須在指定範圍內, pierod可為y, m, d, h, n, s
function DateWithin(startDate, pierod, number) {
    var sd = new Date(startDate);
    var now = new Date();
    now.add(pierod, number);
    if (sd > now)
        return false;
    else
        return true;
}

//模擬 VB 的 DateAdd 函數, 例如 startDate.add("m", 3) 即回傳起始日加三個月
Date.prototype.add = function(part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case "y":
            this.setUTCFullYear(this.getUTCFullYear() + value);
            break;
        case "m":
            this.setUTCMonth(this.getUTCMonth() + value);
            break;
        case "d":
            this.setUTCDate(this.getUTCDate() + value);
            break;
        case "h":
            this.setUTCHours(this.getUTCHours() + value);
            break;
        case "n":
            this.setUTCMinutes(this.getUTCMinutes() + value);
            break;
        case "s":
            this.setUTCSeconds(this.getUTCSeconds() + value);
            break;
        default:
    }
}