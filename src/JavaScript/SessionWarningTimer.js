var reqXML;
var dblMinutes = 1.0;

function LoadXMLDoc(url, callback) {
    if (window.XMLHttpRequest) { //Mozilla, Firefox, Opera 8.01, Safari
        reqXML = new XMLHttpRequest();
        reqXML.onreadystatechange = callback;
        reqXML.open("GET", url, true);
        reqXML.send(null);
    }
    else if (window.ActiveXObject) { //IE
        reqXML = new ActiveXObject("Microsoft.XMLHTTP");
        if (reqXML) {
            reqXML.onreadystatechange = callback;
            reqXML.open("GET", url, true);
            reqXML.send();
        }
    }
    else { //Older Browsers
        alert("您使用的瀏覽器不支援 Ajax!");
    }
}

function LoadXMLDoc2(reqXml2, url, callback) {
    var reqXml2;

    if (window.XMLHttpRequest) { //Mozilla, Firefox, Opera 8.01, Safari
        reqXml2.onreadystatechange = callback;
        reqXml2.open("GET", url, true);
        reqXml2.send(null);
    }
    else if (window.ActiveXObject) { //IE
        if (reqXml2) {
            reqXml2.onreadystatechange = callback;
            reqXml2.open("GET", url, true);
            reqXml2.send();
        }
    }
    else { //Older Browsers
        alert("您使用的瀏覽器不支援 Ajax!");
    }
}

function CreateXml() {
    var reqXml2;

    if (window.XMLHttpRequest) { //Mozilla, Firefox, Opera 8.01, Safari
        reqXml2 = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) { //IE
        reqXml2 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else { //Older Browsers
        alert("您使用的瀏覽器不支援 Ajax!");
        reqXml2 = null;
    }

    return reqXml2;
}

function BuildXMLResults() {
    if (reqXML.readyState == 4) { //completed state
        if (reqXML.status == 200) { //We got a sucess page back

            //Check to verify the message from the server 
            if (reqXML.responseText.indexOf("OK") == 0) {
                // window.status = reqXML.responseText; //display the message in the status bar
                // SetTimer(); //restart timer
            }
            else {
                //display that that session expired
                // alert("Your session appears to have expired. You may loose your current data.");
                window.location = "/MemberPortal/Member/Home.aspx";
            }
        }
        else {
            //display server code not be accessed
            alert("There was a problem retrieving the XML data:\n" + reqXML.statusText);
        }
    }
}



function ShowPopup() {
    var reminder = reminderMessage;

    $find('modalPopup').show();

    var label = document.getElementById('ctl00__reminder__reminderMessageLabel');

    if (label == null) {
        label = document.getElementById('ctl00_ctl00__reminder__reminderMessageLabel');
    }

    if (document.all) {
        label.innerText = String.f(reminder, timeout);
    }
    else {
        label.textContent = String.f(reminder, timeout);
    }

    downTimer = setTimeout(countDown, 1000);

    //document.getElementById('Button1').click();
}

function ShowExpired() {
    var label = document.getElementById('ctl00__reminder__reminderMessageLabel');

    if (label == null) {
        label = document.getElementById('ctl00_ctl00__reminder__reminderMessageLabel');
    }

    if (document.all) {
        label.innerText = expirationMessage;
    }
    else {
        label.textContent = expirationMessage;
    }

    var cancelButton = document.getElementById('ctl00__reminder_editBox_Cancel');

    if (cancelButton == null) {
        cancelButton = document.getElementById('ctl00_ctl00__reminder_editBox_Cancel');
    }

    cancelButton.value = "確定";

    var okButton = document.getElementById('ctl00__reminder_editBox_OK');

    if (okButton == null) {
        okButton = document.getElementById('ctl00_ctl00__reminder_editBox_OK');
    }

    okButton.style.visibility = "hidden";

    //document.getElementById('btnCancel').click();
}

function countDown() {
    var reminder = reminderMessage;

    count--;
    var label = document.getElementById('ctl00__reminder__reminderMessageLabel');

    if (label == null) {
        label = document.getElementById('ctl00_ctl00__reminder__reminderMessageLabel');
    }

    if (document.all) {
        label.innerText = String.f(reminder, count);
    }
    else {
        label.textContent = String.f(reminder, count);
    }

    if (count > 1) {
        downTimer = downTimer = setTimeout(countDown, 1000);
    }
    else {
        clearTimeout(downTimer);
        stopTimer = setTimeout(ShowExpired, 1000);
    }
}

String.f = function(text) {
    //check if there are two arguments in the arguments list
    if (arguments.length <= 1) {
        //if there are not 2 or more arguments there’s nothing to replace
        //just return the original text
        return text;
    }

    //decrement to move to the second argument in the array
    var tokenCount = arguments.length - 2;

    for (var token = 0; token <= tokenCount; token++) {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
    }

    return text;
};

function ok(sender, e) {
    $find('modalPopup').hide();

    if (startTimer != null) {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
    }

    if (downTimer != null) {
        clearTimeout(downTimer);
    }

    startTimer = setTimeout(ShowPopup, timeoutReminder);
    // stopTimer = setTimeout(ShowExpired, expiration);
    count = timeout;

    LoadXMLDoc('/MemberPortal/Member/sessionUpdater.aspx', BuildXMLResults);

    // __doPostBack('editBox_OK', e);
}

function cancel(sender, e) {
    $find('modalPopup').hide();
    window.location = "/MemberPortal/Member/MMALogout.aspx";
}


var isSameSiteNav = false;
var logoutReq = CreateXml();

function clearNavFlag() {
    isSameSiteNav = false;
}

function setNavFlag() {
    isSameSiteNav = true;
}

function onLeavingCurrentPage() {
    // if (runTimer!=undefined && runTimer && !isSameSiteNav) {
    //     var leave = confirm('Bye-bye');
    //     if (!leave) {
    //         location = self.location;
    //     }
    //     else {
    //         LoadXMLDoc2(logoutReq, '/MemberPortal/Member/MMALogout.aspx', logoutCallback);
    //     }
    // }
}

function logoutCallback() {
    if (logoutReq.readyState == 4) {
        if (logoutReq.status == 200) {

        } else {
            // alert('There was a problem with the request.');
        }
    }
}


var logoutFlag = "";


function ShowPopup2() {
    ModalDialog.Show("timeoutCountdownDialog",
            "Session will time out ...",
            "<div id='modalMessage2' style='padding:25px;'></div>",
            {
                buttons: "ok,cancel",
                okButtonText: "繼續瀏覽",
                cancelButtonText: "登出網站",
                onOk: "ok2()",
                onCancel: "cancel2()",
                shadow: false,
                fontSize: "12pt",
                width: 500,
                height: 200
            }
        );

    var reminder = reminderMessage;

    var label = document.getElementById('modalMessage2');

    if (document.all) {
        label.innerText = String.f(reminder, timeout);
    }
    else {
        label.textContent = String.f(reminder, timeout);
    }

    downTimer = setTimeout(countDown2, 1000);
}


function countDown2() {
    var reminder = reminderMessage;

    count--;
    var label = document.getElementById('modalMessage2');

    if (document.all) {
        label.innerText = String.f(reminder, count);
    }
    else {
        label.textContent = String.f(reminder, count);
    }

    if (count > 1) {
        downTimer = downTimer = setTimeout(countDown2, 1000);
    }
    else {
        clearTimeout(downTimer);
        stopTimer = setTimeout(ShowExpired2, 1000);
    }
}

function ShowExpired2() {
    var label = document.getElementById('modalMessage2');

    if (document.all) {
        label.innerText = expirationMessage;
    }
    else {
        label.textContent = expirationMessage;
    }

    var cancelButton = document.getElementById('timeoutCountdownDialog_cancelButton');
    cancelButton.value = "確定";

    logoutFlag = "?Logout=2";

    var okButton = document.getElementById('timeoutCountdownDialog_okButton');
    okButton.style.visibility = "hidden";

    createIframe('stocklogout2', 'http://mmastock.sinopac.com/asp/member/storeidset.asp?storeid=N');
    createIframe('stcoklogout1', 'http://mmastock.sinopac.com/asp/member/memberlogoutok.asp');
    //createIframe('fundlogout', 'http://mmafund.sinopac.com/fund01.asp?logout=1');
}

function ok2() {
    ModalDialog.Hide("timeoutCountdownDialog");

    if (startTimer != null) {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
    }

    if (downTimer != null) {
        clearTimeout(downTimer);
    }

    startTimer = setTimeout(ShowPopup2, timeoutReminder);
    // stopTimer = setTimeout(ShowExpired, expiration);
    count = timeout;

    // LoadXMLDoc(mmaServer + '/MemberPortal/Member/sessionUpdater.aspx', BuildXMLResults);

    // var syncImage = new Image;
    // syncImage.src = mmaServer + '/MemberPortal/Member/sessionUpdater.aspx';
    // syncImage = null;

    createIframe('updateSessionFrame', mmaServer + '/MemberPortal/Member/sessionUpdater.aspx');

    // __doPostBack('editBox_OK', e);
}

function cancel2() {
    if (downTimer != null) {
        clearTimeout(downTimer);
    }

    ModalDialog.Hide("timeoutCountdownDialog");
    window.location = mmaServer + "/MemberPortal/Member/MMALogout.aspx" + logoutFlag;
}


function resetTimer() {
    // var syncImage = new Image;
    // syncImage.src = mmaServer + '/MemberPortal/Member/sessionUpdater.aspx';
    // syncImage = null;

    createIframe('updateSessionFrame', mmaServer + '/MemberPortal/Member/sessionUpdater.aspx');

    if (startTimer != null) {
        clearTimeout(startTimer);
        clearTimeout(stopTimer);
    }

    startTimer = setTimeout(ShowPopup2, timeoutReminder);
}


function createIframe(frameid, srcUrl) {
    var ifrm;

    ifrm = document.getElementById(frameid);

    if (ifrm != undefined) {
        ifrm.parentNode.removeChild(ifrm);
    }

    ifrm = document.createElement("IFRAME");
    ifrm.setAttribute("id", frameid);
    ifrm.setAttribute("src", srcUrl);
    ifrm.style.width = 0 + "px";
    ifrm.style.height = 0 + "px";
    document.body.appendChild(ifrm);
}

var userClicked = false;


function siteClick() {
    userClicked = true;
}


function leavePage() {
    if (!userClicked) {
        alert("bye-bye");
    }
}
    