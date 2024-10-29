//取的MasterPage下的ID
function SetClientID(ControlID) {
    var controlid = "ctl00_ctl00_ContentPlaceHolder1_DefaultContent_" + ControlID;
    return controlid;
}


//取得元件(相容其它Blowser)
function GetElt(id) {
    return (document.getElementById ? document.getElementById(id)
			: document.all ? document.all[id]
			: null);
}

//半形轉全形 Strings.StrConv(tbPurpose.Text, VbStrConv.Narrow, 0).ToLower()
function convertHalftoFull(ControlID) {

    var controlid = SetClientID(ControlID);

    text = Trim(document.getElementById(controlid).value);

    var asciiTable = "!\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    var big5Table = "%uFF01%u201D%uFF03%uFF04%uFF05%uFF06%u2019%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%u2018%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A%uFF5B%uFF5C%uFF5D%uFF5E";

    var result = "";
    for (var i = 0; i < text.length; i++) {
        var val = text.charAt(i);
        var j = asciiTable.indexOf(val) * 6;
        result += (j > -1 ? unescape(big5Table.substring(j, j + 6)) : val);
    }

    document.getElementById(controlid).value = result;
}

//清掉左邊的空白字元
function LeftTrim(instr) {
    var isDone = false;
    while (!isDone) if (instr.charAt(0) == ' ') instr = instr.substring(1); else isDone = true;
    return instr;
}

//清掉右邊的空白字元
function RegihtTrim(instr) {
    var isDone = false;
    while (!isDone) if (instr.charAt(instr.length - 1) == ' ') instr = instr.substring(0, instr.length - 1); else isDone = true;
    return instr;
}

//清掉頭尾的空白字元
function Trim(instr) {
    instr = LeftTrim(instr);
    instr = RegihtTrim(instr);
    return instr;
}


//日期Format(yyyy/MM/dd)
function DataFormat(date) {
    if (date.length == 8)
        return date.substr(0, 4) + "/" + date.substr(4, 2) + "/" + date.substr(6, 2);
    else if (date.length == 10)
        return date;
}

//起始日期不能大於結束日期
function DateValidation_StartDateGreaterThenEndDate(source, arg) {

    var controlid = SetClientID("tbStartDate");
    var StartDate = document.getElementById(controlid).value;
    controlid = SetClientID("tbEndDate");
    var EndDate = document.getElementById(controlid).value;

    var sd = DataFormat(StartDate);
    var ed = DataFormat(EndDate);
    var sdate = new Date(sd);
    var edate = new Date(ed);

    //起始時間大於結束時間
    if (sdate > edate) {
        arg.IsValid = false;
    }
    else {
        arg.IsValid = true;
    }
}


//起始日期不能小於一年之前
function DateValidation_StartDateSmallerThenOneYearAgo(source, arg) {

    var today = new Date('<% =DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") %>');
    var StartDate = arg.Value;
    var sd = DataFormat(StartDate);
    var sdate = new Date(sd);

    var diffdays = today - sdate;
    var second = 1000 * 60 * 60 * 24;
    var diffdays_int = parseInt(diffdays / second);

    //起時時間小於一年之前(以366判斷)
    if (diffdays_int > 366) {
        arg.IsValid = false;
    }
    else {
        arg.IsValid = true;
    }
}

//起始日期和結束日期區間為三個月
function DateValidation_BetweenThreeMonth(source, arg) {

    var controlid = SetClientID("tbStartDate");
    var StartDate = document.getElementById(controlid).value;
    controlid = SetClientID("tbEndDate");
    var EndDate = document.getElementById(controlid).value;

    var sd = DataFormat(StartDate);
    var ed = DataFormat(EndDate);
    var sdate = new Date(sd);
    var edate = new Date(ed);

    var second = 1000 * 60 * 60 * 24;

    var diffdays = edate - sdate;
    var diffdays_int = parseInt(diffdays / second);
    //三個月的區間(以93判斷)
    if (diffdays_int > 93) {
        arg.IsValid = false;
    }
    else {
        arg.IsValid = true;
    }
}

//起始日期和結束日期區間為一個月
function DateValidation_BetweenOneMonth(source, arg) {
    var today = new Date('<% =DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") %>');
    var controlid = SetClientID("tbStartDate");
    var StartDate = document.getElementById(controlid).value;
    controlid = SetClientID("tbEndDate");
    var EndDate = document.getElementById(controlid).value;

    var sd = DataFormat(StartDate);
    var ed = DataFormat(EndDate);
    var sdate = new Date(sd);
    var edate = new Date(ed);

    var second = 1000 * 60 * 60 * 24;

    var diffdays = edate - sdate;
    var diffdays_int = parseInt(diffdays / second);
    //一個月的區間(以31判斷)
    if (diffdays_int > 31) {
        arg.IsValid = false;
        return;
    }
    else {
        arg.IsValid = true;
    }
}

//簡單判斷結束日期不能大於今天
function DateValidation_EndDateGreaterThenThisDate(source, arg) {

    var today = new Date('<% =DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") %>');
    var EndDate = arg.Value;
    var ed = DataFormat(EndDate);
    var edate = new Date(ed);

    if (edate >= today) {
        arg.IsValid = false;
    }
    else {
        arg.IsValid = true;
    }
}

//project
//查詢限制：前一個營業日~今天
function DateValidation_OnlyOneTB(source, arg) {
    var today = new Date('<% =DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") %>');
    var StartDate = arg.Value;

    var sd = DataFormat(StartDate);
    var sdate = new Date(sd);

    //起始時間大於今天
    if (sdate > today) {
        arg.IsValid = false;
        return;
    }
    else {
        arg.IsValid = true;
    }
}

//金額驗證
//金額限制；0~200萬
function MoneyValidation(source, arg) {
    var Trans_money = parseInt(arg.Value);
    if (Trans_money > 2000000 || Trans_money < 0) {
        arg.IsValid = false;
    }
    else {
        arg.IsValid = true;
    }

}

function CheckZero(source, arg) {
    var Trans_money = parseFloat(arg.Value);
    if (Trans_money == 0) {
        arg.IsValid = false;
    }
    else {
        arg.IsValid = true;
    }
}

function chklegalflaot(source, arg) {
    sWord = arg.Value;
    var iOutput = 0;
    var i = 0;
    var len = sWord.length;

    while (i < len) {
        iOutput = sWord.charCodeAt(i);
        // 全形字長度計算
        if (iOutput > 128) {
            arg.IsValid = false;
            return;
        }
        else {
            if (iOutput < 46 || iOutput > 57) {
                arg.IsValid = false;
                return;
            }
            if (iOutput == 47) {
                arg.IsValid = false;
                return;
            }

            i++;
        }
    }
    arg.IsValid = true;
}

//幣別金額小數位驗証
function checkMoneyType(DollarType, money) {
    var message;
    var regular;
    switch (DollarType) {
        case "TWD":
        case "台幣":
        case "新台幣":
        case "JPD":
        case "JPY":
        case "日幣": 
            regular = /^\d+$/;
            message = '金額輸入格式需為整數\n';
            break;
        default:
            regular = /^\d+(.\d{0,2})?$/;
            message = '金額輸入格式需為數字且小數點後最多兩位\n';
            break;
    }
    if (regular.test(money)) {
        return "";
    }
    else {
        return message;
    }
}

//驗證是否為不帶正負號的整數
function isValidInt(strInt) {
    if (strInt.indexOf("+") < 0 && strInt.indexOf("-") < 0 && strInt.indexOf(".") < 0 && parseInt(strInt))
        return true;
    else
        return false;
}

//***********************************

////若str的長度小於length，則在其左邊補sign
//function padLeft(str, length, sign) {
//    if (str.length >= length) return str;
//    else return padLeft(sign + str, length, sign);
//}

////若str的長度小於length，則在其右邊補sign
//function padRight(str, length, sign) {
//    if (str.length >= length) return str;
//    else return padRight(str + sign, length, sign);
//}

////檢查總長度, 若小於 slength, 則回傳 true, 否則傳 false
//function chkTotalLen(sWord, slength) {
//    var iOutput = 0;
//    var i = 0;
//    var len = sWord.length;
//    var TotalLen = 0;
//    var checkLen = false;

//    while (i < len) {
//        iOutput = sWord.charCodeAt(i);
//        // 全形字長度計算
//        if (iOutput > 128)
//            TotalLen = TotalLen + 2;

//        // 半形字長度計算
//        if (iOutput < 129 && iOutput > 32)
//            TotalLen = TotalLen + 1;

//        // 取下一個字元
//        i++;
//    }

//    if (TotalLen <= slength)
//        checkLen = true;

//    return checkLen;
//}

//// 確認被保險人 ID 是否正確
//function IsIDValid(sID) {
//    var bRet = false;
//    var regEx = new RegExp("[^0-9a-zA-Z]");
//    if (10 == sID.length && false == regEx.test(sID)) {
//        var sTmp = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
//        sID = sID.toUpperCase();
//        var strCode = sID.substr(0, 1)
//        var iCheck = sTmp.indexOf(strCode) + 10;
//        iCheck = Math.floor(iCheck / 10) + (iCheck % 10) * 9;
//        for (var i = 1; i < 9; i++) iCheck = iCheck + (parseInt(sID.substr(i, 1)) * (9 - i));
//        iCheck += parseInt(sID.substr(9, 1));
//        if (0 == (iCheck % 10)) bRet = true;
//        else bRet = false;
//    }
//    return bRet;
//}

//// 確認被保險人ID是否正確
//// parm inskind : 保險種類
//// parm sID : 客戶ID
//// return IsInsID : true/false
//function IsInsID(inskind, sID) {
//    var IsInsID = false;
//    var sID = sID.toUpperCase();
//    var check = false;
//    check = IsIDValid(sID);


//    if (inskind == "car" || inskind == "moto" || inskind == "trip") {
//        if (sID.length == 10 || sID.length == 11 || sID.length == 8) {
//            // 本國人
//            if (check && 10 == sID.length) {
//                IsInsID = true;
//            } else if (10 == sID.length) {
//                // 外國人(生日+2碼英文)
//                if (isNaN(sID.substr(0, 8)) == false && ((sID.substr(8, 1)).charCodeAt(0) - 65 < 26) && ((sID.substr(9, 1)).charCodeAt(0) - 65 < 26))
//                    IsInsID = true;
//            } else if (11 == sID.length) {
//                // 外國人(2碼英文+9碼數字)
//                if (isNaN(sID.substr(2, 9)) == false && ((sID.substr(0, 1)).charCodeAt(0) - 65 < 26) && ((sID.substr(1, 1)).charCodeAt(0) - 65 < 26))
//                    IsInsID = true;
//            } else if (8 == sID.length && isNumeric(sID)) {
//                IsInsID = true;
//            }
//        } // end of if (sID.length==10 || sID.length==11)

//    } else if (inskind == "suei") {
//        if (check && 10 == sID.length) {
//            IsInsID = true;
//        }
//    } // end of inskind...

//    return IsInsID;
//}


////檢查是否為合法的日期, 格式必須為 yyyy/M/d 或 yyyy/MM/d 或 yyyy/M/dd 或 yyyy/MM/dd
//function isValidDate(str) {
//    var expr = /^([1-2]{1,1}[0-9]{3,3})\/([0-1]{1,1}[0-9]{1,1})\/([0-3]{1,1}[0-9]{1,1})$/;
//    if (!expr.test(str)) {
//        return false;
//    }
//    var strs = str.split("\/");
//    if (strs.length != 3) {
//        return false;
//    }
//    var date = new Date(parseFloat(strs[0]), parseFloat(padLeft(strs[1],2,"0")) - 1, parseFloat(padLeft(strs[2],2,"0")));
//    if (date.getFullYear() == parseFloat(strs[0]) && (date.getMonth() + 1 == parseFloat(strs[1])) && date.getDate() == parseFloat(strs[2])) {
//        return true;
//    }
//    return false;
//}

////日期必須在指定範圍內, pierod可為y, m, d, h, n, s, 其中secondDiff 為 Server 比 Client 多(+)或少(-)幾秒
////secondDiff 的取得方式參考如下：
////var sNow = new Date('<% =DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") %>');
////var now = new Date();
////var secondDiff = Math.ceil((sNow.getTime() - now.getTime()) / 1000);
//function ServerDateWithin(startDate, pierod, number, secondDiff) {
//    var sd = new Date(startDate);
//    var now = new Date();
//    //secondDiff: Server 比 Client 多多少秒
//    now.add("s", secondDiff); //校正 Client 的現在時間, 使得 now 的時間會與 Server 上的 now 一樣
//    //var month1 = now.getMonth() + 1;
//    //var client_time1 = now.getYear() + "/" + month1 + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
//    //alert("校正後時間:" + client_time1);
//    now.add(pierod, number);
//    if (sd > now) //startDate 是否落在兩個月(number=2,  pierod='m')內?
//        return false;
//    else
//        return true;
//}


////日期必須在指定範圍內, pierod可為y, m, d, h, n, s
//function DateWithin(startDate, pierod, number) {
//    var sd = new Date(startDate);
//    var now = new Date();
//    now.add(pierod, number);
//    if (sd > now)
//        return false;
//    else
//        return true;
//}

////模擬 VB 的 DateAdd 函數, 例如 startDate.add("m", 3) 即回傳起始日加三個月
//Date.prototype.add = function(part, value) {
//    value *= 1;
//    if (isNaN(value)) {
//        value = 0;
//    }
//    switch (part) {
//        case "y":
//            this.setUTCFullYear(this.getUTCFullYear() + value);
//            break;
//        case "m":
//            this.setUTCMonth(this.getUTCMonth() + value);
//            break;
//        case "d":
//            this.setUTCDate(this.getUTCDate() + value);
//            break;
//        case "h":
//            this.setUTCHours(this.getUTCHours() + value);
//            break;
//        case "n":
//            this.setUTCMinutes(this.getUTCMinutes() + value);
//            break;
//        case "s":
//            this.setUTCSeconds(this.getUTCSeconds() + value);
//            break;
//        default:
//    }
//}
