var ModalDialogDefaults = {
    shadow: true,
    shadowSize: 5,
    shadowColor: "#333333",
    // backgroundColor: "#CCCCCC",
    borderColor: "#999999",
    // titleBackColor: "#C1D2E7",
    // titleFontColor: "#15428B",
    // popupBackColor: "#C7D6E9",
    // popupFontColor: "black",
    // footerBackColor: "#C7D6E9",
    // footerFontColor: "#15428B",
    okButtonText: "OK",
    yesButtonText: "Yes",
    noButtonText: "No",
    cancelButtonText: "Cancel",
    // fontFamily: "Verdana,Arial",
    // fontSize: "9pt",
    border: true,
    noIframe: false,
    transparentPopup: false,
    bgOpacity: "0.7",
    alphaFilter: "70"
};

var _saveTabIndexes = new Array();
var _saveDesableSelect = new Array();
var _tagWithTabIndex = new Array('A', 'AREA', 'BUTTON', 'INPUT', 'OBJECT', 'SELECT', 'TEXTAREA', 'IFRAME');

var ModalDialog = {
    Init: function() {
        //No init required, yet
    },

    Message: function(id, title, message, parameters) {
        CoverAll();

        //Get parameters
        parameters = parameters || {};
        if (!title) title = "Message Box";

        //'Indicator' specific parameters
        if (parameters.buttons == null)
            parameters.buttons = "";

        parameters.noIframe = true;
        parameters.transparentPopup = true;

        //Create layers
        var myLayers = ModalDialog._createAllLayers(id, title, message, parameters);
        var oPopupBody = myLayers[4];
        var oPopupFooter = myLayers[5];

        //'Indicator' specific setup of Body
        oPopupBody.innerHTML = message + oPopupFooter.innerHTML;

        //Style all layers
        ModalDialog._styleAllLayers(id, parameters, myLayers);
    },

    Show: function(id, title, contents, parameters) {
        CoverAll();

        //Get parameters
        parameters = parameters || {};
        if (!title) title = "Browser Modal Dialog";

        if (parameters.buttons == null) {
            alert("buttons is a required parameter. ie: buttons: 'yes,no' or buttons: 'ok'.\nPossible buttons are yes, no, ok, cancel");
            return;
        }

        //Create layers
        var dialogLayers = ModalDialog._createAllLayers(id, title, contents, parameters);
        var oPopupBody = dialogLayers[4];
        var oPopupFooter = dialogLayers[5];

        //'Custom' specific setup of Body
        oPopupBody.innerHTML = contents + oPopupFooter.innerHTML;

        //Style all layers
        ModalDialog._styleAllLayers(id, parameters, dialogLayers);
    },

    //Cancel/Close modal popup
    Hide: function(id) {
        window.onresize = null;
        window.onscroll = null;

        RemoveCoverObject(ik);

        //try
        //{
        document.body.removeChild(ModalDialogSupport.findControl(id + "_background"));
        document.body.removeChild(ModalDialogSupport.findControl(id + "_popup"));
        document.body.removeChild(ModalDialogSupport.findControl(id + "_shadow"));
        // document.body.removeChild(ModalDialogSupport.findControl(id + "_popup_shimmer"));
        if (ModalDialogSupport.isOlderIE()) {
            ModalDialogSupport.restoreTab();
        }
        //}
        //catch
        //{
        //}
    },

    //Cancel/Close modal popup
    Cancel: function(id) {
        ModalDialog.Hide(id);
    },

    //Support variable to put each layer on top, increases everytime a modal popup is created
    _zIndex: 10000,

    //Support function to create all layers
    _createAllLayers: function(id, title, message, parameters) {
        //Create all 6 layers for; BackGround, Popup, Shadow, PopupTitle, PopupBody, PopupFooter
        var oBackground = ModalDialogSupport.makeLayer(id + '_background', true, null, false && !parameters.noIframe);         // 0
        var oPopup = ModalDialogSupport.makeLayer(id + '_popup', true, null, true && !parameters.noIframe);                    // 1
        var oShadow = ModalDialogSupport.makeLayer(id + '_shadow', false, null, false && !parameters.noIframe);                // 2
        var oPopupTitle = ModalDialogSupport.makeLayer(id + '_popupTitle', false, oPopup, false && !parameters.noIframe);      // 3
        var oPopupBody = ModalDialogSupport.makeLayer(id + '_popupBody', true, oPopup, false && !parameters.noIframe);         // 4
        var oPopupFooter = ModalDialogSupport.makeLayer(id + '_popupFooter', false, oPopup, false && !parameters.noIframe);    // 5

        //Set default values for button related parameters; OK, Yes, No, Cancel
        var okButtonText = parameters.okButtonText != null ? parameters.okButtonText : ModalDialogDefaults.okButtonText;
        var yesButtonText = parameters.yesButtonText != null ? parameters.yesButtonText : ModalDialogDefaults.yesButtonText;
        var noButtonText = parameters.noButtonText != null ? parameters.noButtonText : ModalDialogDefaults.noButtonText;
        var cancelButtonText = parameters.cancelButtonText != null ? parameters.cancelButtonText : ModalDialogDefaults.cancelButtonText;
        var onOk = parameters.onOk != null ? parameters.onOk : "ModalDialog.Close(\"" + id + "\");";
        var onYes = parameters.onYes != null ? parameters.onYes : "ModalDialog.Close(\"" + id + "\");";
        var onNo = parameters.onNo != null ? parameters.onNo : "ModalDialog.Close(\"" + id + "\");";
        var onCancel = parameters.onCancel != null ? parameters.onCancel : "ModalDialog.Close(\"" + id + "\");";

        //Create popup 'title' layer
        oPopupTitle.innerHTML = "";

        //Create popup 'footer' layer
        oPopupFooter.innerHTML = "";

        //Split buttons parameter and create buttons; OK, Yes, No, Cancel
        //parameters.fontFamily = parameters.fontFamily != null ? parameters.fontFamily : ModalDialogDefaults.fontFamily;
        var bt = parameters.buttons.split(',');
        for (x in bt) {
            if (bt[x] == "ok")
                oPopupFooter.innerHTML += "<input name='" + id + "_okButton' id='" + id + "_okButton' type=button value='" + okButtonText + "' style='width:100px' onclick='" + onOk + "'/>";
            if (bt[x] == "yes")
                oPopupFooter.innerHTML += "<input name='" + id + "_yesButton' id='" + id + "_yesButton' type=button value='" + yesButtonText + "' style='width:100px' onclick='" + onYes + "'/>";
            if (bt[x] == "no")
                oPopupFooter.innerHTML += "<input name='" + id + "_noButton' id='" + id + "_noButton' type=button value='" + noButtonText + "' style='width:100px' onclick='" + onNo + "'/>";
            if (bt[x] == "cancel")
                oPopupFooter.innerHTML += "<input name='" + id + "_cancelButton' id='" + id + "_cancelButton' type=button value='" + cancelButtonText + "' style='width:100px' onclick='" + onCancel + "'/>";
        }

        if (oPopupFooter.innerHTML.length != "") {
            oPopupFooter.innerHTML = "<div align='center' valign='bottom'>" + oPopupFooter.innerHTML + "</div>";
        }

        //Create popup 'body' layer, is done in; Alert, Confirm, YesNoCancel, Prompt and Custom functions.
        var allLayers = new Array(oBackground, oPopup, oShadow, oPopupTitle, oPopupBody, oPopupFooter);

        if (parameters.autoClose != null)
            setTimeout('ModalDialog.Close(\"' + id + '\");', parameters.autoClose);

        return allLayers;
    },

    //Support function to style and position all layers
    _styleAllLayers: function(id, parameters, allLayers) {
        var dialogLayers = allLayers;
        var oBackground = dialogLayers[0];
        var oPopup = dialogLayers[1];
        var oShadow = dialogLayers[2];
        var oPopupTitle = dialogLayers[3];
        var oPopupBody = dialogLayers[4];
        var oPopupFooter = dialogLayers[5];

        ModalDialog._zIndex += 3;
        var zIndex = ModalDialog._zIndex;

        //Get Css parameters for borderColor.
        parameters.borderColor = parameters.borderColor != null ? parameters.borderColor : ModalDialogDefaults.borderColor;  // #859DBE

        parameters.border = parameters.border != null ? parameters.border : ModalDialogDefaults.border;
        parameters.noIframe = parameters.noIframe != null ? parameters.noIframe : ModalDialogDefaults.noIframe;
        parameters.bgOpacity = parameters.bgOpacity != null ? parameters.bgOpacity : ModalDialogDefaults.bgOpacity;
        parameters.alphaFilter = parameters.alphaFilter != null ? parameters.alphaFilter : ModalDialogDefaults.alphaFilter;

        //Default css for; oBackground, oPopup and oShadow layers
        //Position elements excluded (except for background); top, left, width, height.
        //They will be calculated by contents of oPopup, or set by the parameters.

        var testbody = document.body;
        var testhtml = document.documentElement;

        var testheight = Math.max(testbody.scrollHeight, testbody.offsetHeight,
                               testhtml.clientHeight, testhtml.scrollHeight, testhtml.offsetHeight);

        var cssBackground = "display:inline; position:absolute; z-index: " + (zIndex) + "; left:0px; top:0px; width:100%; height:" + testheight + "px; filter:alpha(opacity=" + parameters.alphaFilter + "); opacity:" + parameters.bgOpacity + ";";
        if (ModalDialogSupport.isOlderIE()) {
            var viewport = ModalDialogSupport.getViewportDimensions();
            cssBackground = "display:inline; position:absolute; z-index: 10; left:0px; top:0px; width:100%; height:" + (viewport.height + 512) + "px; filter:alpha(opacity=" + parameters.alphaFilter + "); opacity:" + parameters.bgOpacity + "; overflow:hidden;";
        }
        var cssShadow = "display:inline; position:absolute; z-index: " + (zIndex + 1) + ";";
        var cssPopup = "display:inline; position:absolute; z-index: " + (zIndex + 2) + "; padding:1px;"; // background-color:#EEF1F2

        //Get Css parameters for oBackGround layer.
        /* parameters.backgroundColor = parameters.backgroundColor != null ? parameters.backgroundColor : ModalDialogDefaults.backgroundColor;
        cssBackground += " background-color:" + parameters.backgroundColor + ";";*/

        //Css for oPopup content layers. (oPopupTitle, oPopupBody, oPopupFooter)
        /*
        parameters.fontFamily = parameters.fontFamily != null ? parameters.fontFamily : ModalDialogDefaults.fontFamily;
        parameters.fontSize = parameters.fontSize != null ? parameters.fontSize : ModalDialogDefaults.fontSize;
        var cssPopupTitle = "position: absolute; font-family:" + parameters.fontFamily + "; font-size:" + parameters.fontSize + "; padding: 1px; text-align:left;";
        var cssPopupBody = "position: absolute; font-family:" + parameters.fontFamily + "; font-size:" + parameters.fontSize + "; padding: 1px; text-align:left;";
        var cssPopupFooter = "position: absolute; font-family:" + parameters.fontFamily + "; font-size:" + parameters.fontSize + "; padding: 1px; text-align:center;";*/
        var cssPopupTitle = "position: absolute;" + "; padding: 1px; text-align:left;";
        var cssPopupBody = "position: absolute;" + "; padding: 1px; text-align:left;";
        var cssPopupFooter = "position: absolute;" + "; padding: 1px; text-align:center;";

        if (parameters.border) {
            cssPopupBody += "border:solid 1px " + parameters.borderColor + ";";
        }

        if (parameters.transparentPopup) {
            cssPopupBody = "";
        }

        //First style the contents of the oPopup layer. (oPopupTitle, oPopupBody, oPopupFooter)
        //When this is done we can calculate the height and width of the oPopup contents.
        if (ModalDialogSupport.isIE) {
            // oPopupTitle.style.cssText = cssPopupTitle;
            oPopupBody.style.cssText = cssPopupBody;
            // oPopupFooter.style.cssText = cssPopupFooter;
        }
        else {
            // oPopupTitle.setAttribute("style", cssPopupTitle);
            oPopupBody.setAttribute("style", cssPopupBody);
            // oPopupFooter.setAttribute("style", cssPopupFooter);
        }

        //Get css color related parameters for; oPopup, oPopupTitle, oPopupBody, oPopupFooter.
        /*
        parameters.titleBackColor = parameters.titleBackColor != null ? parameters.titleBackColor : ModalDialogDefaults.titleBackColor;
        parameters.titleFontColor = parameters.titleFontColor != null ? parameters.titleFontColor : ModalDialogDefaults.titleFontColor;
        parameters.popupBackColor = parameters.popupBackColor != null ? parameters.popupBackColor : ModalDialogDefaults.popupBackColor;
        parameters.popupFontColor = parameters.popupFontColor != null ? parameters.popupFontColor : ModalDialogDefaults.popupFontColor;
        parameters.footerBackColor = parameters.footerBackColor != null ? parameters.footerBackColor : ModalDialogDefaults.footerBackColor;
        parameters.footerFontColor = parameters.footerFontColor != null ? parameters.footerFontColor : ModalDialogDefaults.footerFontColor;
        cssPopupTitle += " background-color:" + parameters.titleBackColor + ";";
        cssPopupTitle += " color:" + parameters.titleFontColor + ";";
        cssPopupBody += " background-color:" + parameters.popupBackColor + ";";
        cssPopupBody += " color:" + parameters.popupFontColor + ";";
        cssPopupFooter += " background-color:" + parameters.footerBackColor + ";";
        cssPopupFooter += " color:" + parameters.footerFontColor + ";";*/

        //Calculate maxWidth of the 3 layers in oPopup. (oPopupTitle,oPopupBody,oPopupFooter)
        var calcMaxWidth = 0;
        if (ModalDialogSupport.getLayerWidth(oPopupTitle.id) > calcMaxWidth)
            calcMaxWidth = ModalDialogSupport.getLayerWidth(oPopupTitle.id);
        if (ModalDialogSupport.getLayerWidth(oPopupBody.id) > calcMaxWidth)
            calcMaxWidth = ModalDialogSupport.getLayerWidth(oPopupBody.id);
        if (ModalDialogSupport.getLayerWidth(oPopupFooter.id) > calcMaxWidth)
            calcMaxWidth = ModalDialogSupport.getLayerWidth(oPopupFooter.id);

        //Calculate total height of the 3 layers in oPopup. (oPopupTitle+oPopupBody+oPopupFooter)
        // var calcTotalHeight = ModalDialogSupport.getLayerHeight(oPopupTitle.id) + ModalDialogSupport.getLayerHeight(oPopupBody.id) + ModalDialogSupport.getLayerHeight(oPopupFooter.id);
        var calcTotalHeight = ModalDialogSupport.getLayerHeight(oPopupBody.id);

        parameters.width = parameters.width != null ? parameters.width : (calcMaxWidth + 4); // Add 4px for; padding: 1px and border: 1px;
        parameters.height = parameters.height != null ? parameters.height : calcTotalHeight; // Set height as height of; oPopupTitle + oPopupBody + oPopupFooter

        //Eerst hoogte oPopupBody aanpassen indien parameters.height is meegegeven
        var newBodyHeight = ModalDialogSupport.getLayerHeight(oPopupBody.id)
        if (parameters.height > calcTotalHeight) {
            // Sub 10px for; padding: 5px;
            // newBodyHeight = parameters.height - ModalDialogSupport.getLayerHeight(oPopupTitle.id) - ModalDialogSupport.getLayerHeight(oPopupFooter.id);
            newBodyHeight = parameters.height;
            cssPopupBody += " height:" + newBodyHeight + "px;";
            // calcTotalHeight = ModalDialogSupport.getLayerHeight(oPopupTitle.id) + newBodyHeight + ModalDialogSupport.getLayerHeight(oPopupFooter.id);
            calcTotalHeight = newBodyHeight;
        }

        cssPopupTitle += " top:1px;";
        cssPopupBody += " top:1px;";
        // cssPopupFooter += " top:" + (ModalDialogSupport.getLayerHeight(oPopupTitle.id) + (newBodyHeight) /*ModalDialogSupport.getLayerHeight(oPopupBody.id)*/) + "px;";
        cssPopupFooter += " top:" + (newBodyHeight /*ModalDialogSupport.getLayerHeight(oPopupBody.id)*/) + "px;";
        cssPopupTitle += " width:" + (parameters.width - 2) + "px;"; // Sub 10px for; padding-left+right: 5px;
        cssPopupBody += " width:" + (parameters.width - 2) + "px;"; // Sub 10px for-left+right; padding: 5px;
        cssPopupFooter += " width:" + (parameters.width - 2) + "px;"; // Sub 10px for-left+right; padding: 5px;

        //Get browser width and height
        var frameWidth = ModalDialogSupport.getFrameWidth();
        var frameHeight = ModalDialogSupport.getFrameHeight();

        if (parameters.height < calcTotalHeight)
            parameters.height = calcTotalHeight;

        //Get parameters for oPopup layer.
        parameters.top = parameters.top != null ? parameters.top : ((frameHeight / 2) - (parameters.height / 2));
        parameters.left = parameters.left != null ? parameters.left : ((frameWidth / 2) - (parameters.width / 2));

        //Set modal popup position
        //cssPopup += " top:" + parameters.top + "px;";
        //cssPopup += " left:" + parameters.left + "px;";

        cssPopupTitle += " left:1px;";
        cssPopupBody += " left:1px;";
        cssPopupFooter += " left:1px;";

        var popupWidth;
        var popupHeight;

        if (parameters.width)
            popupWidth = parameters.width + "px";
        else
            popupWidth = parameters.maxWidth + "px";

        if (parameters.height)
            popupHeight = (parameters.height - 1) + "px";
        else
            popupHeight = (calcTotalHeight - 1) + "px";

        cssPopup += " width:" + popupWidth + ";";
        cssPopup += " height:" + popupHeight + ";";

        // var oPopupShimmer = document.getElementById(id + '_popup_shimmer');

        // if (oPopupShimmer != undefined) {
        //     oPopupShimmer.style.width = popupWidth;
        //     oPopupShimmer.style.height = popupHeight;
        // }

        if (parameters.transparentPopup) {
            cssPopupBody = "";
        }

        //First style the contents of the oPopup layer. (oPopupTitle, oPopupBody, oPopupFooter)
        //When this is done we can calculate the height and width of the oPopup contents.
        if (ModalDialogSupport.isIE) {
            // oPopupTitle.style.cssText = cssPopupTitle;
            oPopupBody.style.cssText = cssPopupBody;
            // oPopupFooter.style.cssText = cssPopupFooter;
        }
        else {
            // oPopupTitle.setAttribute("style", cssPopupTitle);
            oPopupBody.setAttribute("style", cssPopupBody);
            // oPopupFooter.setAttribute("style", cssPopupFooter);
        }
        document.getElementById(id + '_popupBody').className = "ModalPopUpBody";

        //Setup shadow layer
        parameters.shadow = parameters.shadow != null ? parameters.shadow : ModalDialogDefaults.shadow;
        parameters.shadowSize = parameters.shadowSize != null ? parameters.shadowSize : ModalDialogDefaults.shadowSize;
        if (parameters.shadow) {
            //Get parameters for oShadow layer.
            parameters.shadowSize = parameters.shadowSize != null ? parameters.shadowSize : ModalDialogDefaults.shadowSize;
            parameters.shadowColor = parameters.shadowColor != null ? parameters.shadowColor : ModalDialogDefaults.shadowColor;
            cssShadow += "background-color:" + parameters.shadowColor + ";";

            //cssShadow += " top:" + (parameters.top + parameters.shadowSize) + "px;";
            //cssShadow += " left:" + (parameters.left + parameters.shadowSize) + "px;";
            if (parameters.width)
                cssShadow += " width:" + parameters.width + "px;";
            else
                cssShadow += " width:" + maxWidth + "px;";
            if (parameters.height)
                cssShadow += " height:" + (parameters.height - 1) + "px;";
            else
                cssShadow += " height:" + (calcTotalHeight) + "px;";

        }
        else {
            cssShadow += " display:none;";
        }

        //Secondly style the contents of the main layers. (oBackGround, oPopup, oShadow)
        if (ModalDialogSupport.isIE) {
            oPopup.style.cssText = cssPopup;
            // oShadow.style.cssText = cssShadow;
            oBackground.style.cssText = cssBackground;
        }
        else {
            oPopup.setAttribute("style", cssPopup);
            // oShadow.setAttribute("style", cssShadow);
            oBackground.setAttribute("style", cssBackground);
        }
        document.getElementById(id + '_background').className = "ModalPopUpBackground_Color";

        if (!ModalDialogSupport.isOlderIE()) {
            ModalDialogSupport.centerElement(id + '_background', 0, true);
        }
        else {
            // var viewport = ModalDialogSupport.getViewportDimensions();
            // oBackground.innerHTML = "<div><iframe style='z-index:-1; position:absolute; top:0;left:0 display:none; display/**/:block; position:absolute; filter:mask(); width:" + viewport.width + "px; height:" + viewport.height + "px;' id='corr_bug_ie' src='../common/imgLay/spinner.gif'></iframe></div>";
            ////IE6 Bug with SELECT element always showing up on top
            ModalDialogSupport.disableTab(id + '_background');
        }

        ModalDialogSupport.centerElement(id + '_popup', 0, false);
        if (parameters.shadow)
            ModalDialogSupport.centerElement(id + '_shadow', parameters.shadowSize, false);

        //Load file?
        parameters.loadTextFile = parameters.loadTextFile != null ? parameters.loadTextFile : "";
        if (parameters.loadTextFile != "")
            ModalDialog._loadTextFile(id, parameters, allLayers, parameters.loadTextFile);

        //        parameters.autoClose = parameters.autoClose != null ? parameters.autoClose : 0;
        //        if(!parameters.autoClose)
        //        {
        window.onresize = function() {
            ModalDialogSupport.centerElement(id + '_background', 0, true);
            ModalDialogSupport.centerElement(id + '_popup', 0, false);
            if (parameters.shadow) {
                ModalDialogSupport.centerElement(id + '_shadow', parameters.shadowSize, false);
            }
        }

        window.onscroll = function() {
            ModalDialogSupport.centerElement(id + '_background', 0, true);
            ModalDialogSupport.centerElement(id + '_popup', 0, false);
            if (parameters.shadow) {
                ModalDialogSupport.centerElement(id + '_shadow', parameters.shadowSize, false);
            }
        }

        //}
    }
};

var ModalDialogSupport = {
    isIE: function() {
        return (window.ActiveXObject) ? true : false;
    },

    isOlderIE: function() {
        var ver = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                ver = parseFloat(RegExp.$1);
            }
        }
        if (ver > -1 && ver < 7.0) {
            return true;
        } else {
            return false;
        }
    },

    makeLayer: function(id, layerVisible, layerParent, addIframe) {
        var container = document.createElement("div");
        container.id = id;
        if (!layerVisible) {
            if (ModalDialogSupport.isIE) {
                container.style.visibility = 'hidden';
            }
            else {
                container.setAttribute("style", "visibility:hidden");
            }
        }

        //        if (addIframe) {
        //            var shimmer = document.createElement('iframe');
        //            shimmer.id = id + '_shimmer';
        //            shimmer.style.position = 'absolute';
        //            shimmer.style.zIndex = '9900';
        //            shimmer.setAttribute('frameborder', '0');
        //            shimmer.setAttribute('marginheight', '0');
        //            shimmer.setAttribute('marginwidth', '0');
        //            shimmer.setAttribute('scrolling', 'no');
        //            shimmer.setAttribute('src', '');
        //            document.body.appendChild(shimmer);
        //        }

        if (layerParent)
            layerParent.appendChild(container);
        else
            document.body.appendChild(container);

        return container;
    },

    deleteLayer: function(id) {
        var del = findLayer(id);
        if (del)
            document.body.removeChild(del);
    },

    findLayer: function(id) {
        return document.all ? document.all[id] : document.getElementById(id);
    },

    findControl: function(id, parent) {
        if (parent == null) {
            return document.all ? document.all[id] : document.getElementById(id);
        }
        else {
            return document.all ? document.all[id] : document.getElementById(id);
        }
    },

    getLayerHeight: function(id) {
        if (document.all) {
            gh = document.getElementById(id).offsetHeight;
        }
        else {
            gh = document.getElementById(id).offsetHeight;  //-5;
        }
        return gh;
    },

    getLayerWidth: function(id) {
        gw = document.getElementById(id).offsetWidth;
        return gw;
    },

    getViewportDimensions: function() {
        var intH = 0, intW = 0;

        if (self.innerHeight) {
            intH = window.innerHeight;
            intW = window.innerWidth;
        }
        else {
            if (document.documentElement && document.documentElement.clientHeight) {
                intH = document.documentElement.clientHeight;
                intW = document.documentElement.clientWidth;
            }
            else {
                if (document.body) {
                    intH = document.body.clientHeight;
                    intW = document.body.clientWidth;
                }
            }
        }

        return {
            height: parseInt(intH, 10),
            width: parseInt(intW, 10)
        };
    },

    getScrollXY: function() {
        var scrOfX = 0, scrOfY = 0;
        if (typeof (window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [scrOfX, scrOfY];
    },

    centerElement: function(id, add, noleft) {
        var elem = document.getElementById(id);

        if (elem == undefined) {
            return;
        }

        var shimmer = document.getElementById(id + '_shimmer');

        var viewport = ModalDialogSupport.getViewportDimensions();
        var left = (viewport.width == 0) ? 50 : parseInt((viewport.width - elem.offsetWidth) / 2, 10);
        var top = (viewport.height == 0) ? 50 : parseInt((viewport.height - elem.offsetHeight) / 2, 10);
        var scroll = ModalDialogSupport.getScrollXY();

        if (!noleft) {
            elem.style.left = (left + add) + 'px';
        }
        elem.style.top = (top + add + scroll[1]) + 'px';

        if (shimmer != undefined) {
            shimmer.style.left = elem.style.left;
            shimmer.style.top = elem.style.top;
        }

        viewport, left, top, elem = null;
    },

    readFile: function(filename, intoElement) {
        var xmlHttp = getXmlHttp();
        var file = filename + "?r=" + Math.random();
        xmlHttp.open("GET", file, true);
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                intoElement.innerHTML = xmlHttp.responseText;
            }
        }
        xmlHttp.send(null);
    },

    getFrameWidth: function() {
        var frameWidth = document.documentElement.clientWidth;
        if (self.innerWidth) // Als de browser deze manier van aanroepen hanteerd
        {
            frameWidth = self.innerWidth; // Haal de frame-width op
        }
        else if (document.documentElement && document.documentElement.clientWidth)  // Als de browser deze manier van aanroepen hanteerd
        {
            frameWidth = document.documentElement.clientWidth; // Haal de frame-width op
        }
        else if (document.body)  // Als de browser deze manier van aanroepen hanteerd
        {
            frameWidth = document.body.clientWidth; // Haal de frame-width op
        }
        else return;
        return frameWidth;
    },

    getFrameHeight: function() {
        var frameHeight = document.documentElement.clientHeight;
        if (self.innerWidth) // Als de browser deze manier van aanroepen hanteerd
        {
            frameHeight = self.innerHeight; // Haal de frame-height op
        }
        else if (document.documentElement && document.documentElement.clientWidth)  // Als de browser deze manier van aanroepen hanteerd
        {
            frameHeight = document.documentElement.clientHeight; // Haal de frame-height op
        }
        else if (document.body)  // Als de browser deze manier van aanroepen hanteerd
        {
            frameHeight = document.body.clientHeight; // Haal de frame-height op
        }
        else return;
        return frameHeight;
    },

    getXmlHttp: function() {
        var xmlHttp;
        try {  // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        }
        catch (e) {  // Internet Explorer
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    alert("Your browser does not support AJAX!");
                    return false;
                }
            }
        }
        return xmlHttp;
    },


    disableTab: function(id) {
        /// <summary>
        /// Change the tab indices so we only tab through the modal popup
        /// (and hide SELECT tags in IE6)
        /// </summary>

        var i = 0;
        var tagElements;
        var tagElementsInPopUp = new Array();
        var _foregroundElement = document.getElementById(id);





        _saveTabIndexes.length = 0;








        //Save all popup's tag in tagElementsInPopUp
        for (var j = 0; j < _tagWithTabIndex.length; j++) {
            tagElements = _foregroundElement.getElementsByTagName(_tagWithTabIndex[j]);
            for (var k = 0; k < tagElements.length; k++) {
                tagElementsInPopUp[i] = tagElements[k];
                i++;
            }
        }

        i = 0;
        for (var j = 0; j < _tagWithTabIndex.length; j++) {
            tagElements = document.getElementsByTagName(_tagWithTabIndex[j]);
            for (var k = 0; k < tagElements.length; k++) {
                if (getIndexOf(tagElementsInPopUp, tagElements[k]) == -1) {
                    try {
                        _saveTabIndexes[i] = { tag: tagElements[k], index: tagElements[k].tabIndex };
                    }
                    catch (e) {
                    }
                    tagElements[k].tabIndex = "-1";
                    i++;
                }
            }
        }

        //IE6 Bug with SELECT element always showing up on top
        i = 0;

        //Save SELECT in PopUp
        var tagSelectInPopUp = new Array();
        for (var j = 0; j < _tagWithTabIndex.length; j++) {
            tagElements = _foregroundElement.getElementsByTagName('SELECT');
            for (var k = 0; k < tagElements.length; k++) {
                tagSelectInPopUp[i] = tagElements[k];
                i++;
            }
        }

        i = 0;
        _saveDesableSelect.length = 0;

        tagElements = document.getElementsByTagName('SELECT');
        for (var k = 0; k < tagElements.length; k++) {
            if (getIndexOf(tagSelectInPopUp, tagElements[k]) == -1) {
                _saveDesableSelect[i] = { tag: tagElements[k], visib: getCurrentStyle(tagElements[k], 'visibility') };
                tagElements[k].style.visibility = 'hidden';
                i++;
            }
        }
    },

    restoreTab: function() {
        /// <summary>
        /// Restore the tab indices so we tab through the page like normal
        /// (and restore SELECT tags in IE6)
        /// </summary>

        try {
            for (var i = 0; i < _saveTabIndexes.length; i++) {
                _saveTabIndexes[i].tag.tabIndex = _saveTabIndexes[i].index;
            }
        }
        catch (e) {
        }

        try {
            _saveTabIndexes.length = 0;
        }
        catch (e) {
        }

        //IE6 Bug with SELECT element always showing up on top

        for (var k = 0; k < _saveDesableSelect.length; k++) {
            _saveDesableSelect[k].tag.style.visibility = _saveDesableSelect[k].visib;
        }
        _saveDesableSelect.length = 0;

    }

};


function CoverAll() {
    var ifrm = document.getElementById("ctl00_ctl00_ContentPlaceHolder1_DefaultContent_iframeControl");

    if (ifrm != undefined) {
        CoverIframe(ifrm, ifrm.height, "765");
    }
    else {
        CoverObject("iframe");
        CoverObject("applet");
    }
}

var ik = 0;

function CoverObject(tagName) {
    var applet = document.getElementsByTagName(tagName);
    var match = null;
    var elem;
    var xPos;
    var yPos;
    var tempEl;
    var c = applet.length;
    for (var k = 0; k < c; k++) {
        xPos = 0;
        yPos = 0;
        elem = applet[k];
        if (elem.id = 'campaignFrame') continue;
        CoverIframe(elem);
    }
}



function CoverIframe(elem, ifh, ifw) {
    xPos = elem.offsetLeft;
    tempEl = elem.offsetParent;
    while (tempEl != null) {
        xPos += tempEl.offsetLeft;
        tempEl = tempEl.offsetParent;
    }
    yPos = elem.offsetTop;
    tempEl = elem.offsetParent;
    while (tempEl != null) {
        yPos += tempEl.offsetTop;
        tempEl = tempEl.offsetParent;
    }
    var width = (elem.style.width == "" ? elem.width + "px" : elem.style.width);
    var height = (elem.style.height == "" ? elem.height + "px" : elem.style.height);

    var w = parseInt(width.substr(0, width.indexOf("px"))) + 1;
    var h = parseInt(height.substr(0, height.indexOf("px"))) + 1;

    if (ifh != undefined) {
        h = parseInt(ifh);
    }

    if (ifw != undefined) {
        w = parseInt(ifw);
    }

    var shimmer = document.createElement('iframe');
    shimmer.id = 'Ashimmer' + ik;
    shimmer.style.position = 'absolute';
    shimmer.style.top = (yPos - 1) + "px";
    shimmer.style.left = (xPos - 1) + "px";
    shimmer.style.width = w.toString() + "px";
    shimmer.style.height = h.toString() + "px";
    shimmer.style.zIndex = '1';
    shimmer.setAttribute('frameborder', '0');
    shimmer.setAttribute('src', '');
    document.body.appendChild(shimmer);
    var img = document.createElement('img');
    img.id = 'Bshimmer' + ik;
    with (img.style) {
        position = "absolute";
        left = (xPos - 1) + "px";
        top = (yPos - 1) + "px";
        width = shimmer.style.width;
        height = shimmer.style.height;
        zIndex = "2";
    }
    img.src = mmaServer + "/images/white.jpg";
    document.body.appendChild(img);
    var div = document.createElement('div');
    div.id = 'Cshimmer' + ik;
    with (div.style) {
        position = "absolute";
        left = (xPos - 1) + "px";
        top = (yPos - 1) + "px";
        width = shimmer.style.width;
        height = shimmer.style.height;
        zIndex = "3";
    }
    document.body.appendChild(div);
    var div2 = document.getElementById(div.id);
    div2.className = "ModalPopUpBackground_Color";
    var divcss = "filter:alpha(opacity=70); opacity:0.7;";

    if (ModalDialogSupport.isIE) {
        div2.style.cssText = divcss;
    }
    else {
        div2.setAttribute("style", divcss);
    }

    ik = ik + 1;
}


function RemoveCoverObject(count) {
    for (var i = 0; i < count; i++) {
        var o1 = document.getElementById('Ashimmer' + i);
        if (o1 != null) {
            document.body.removeChild(o1);
        }
        var o2 = document.getElementById('Bshimmer' + i);
        if (o2 != null) {
            document.body.removeChild(o2);
        }
        var o3 = document.getElementById('Cshimmer' + i);
        if (o3 != null) {
            document.body.removeChild(o3);
        }
    }
}

// Floating Div JavaScript
//

var ns = (navigator.appName.indexOf("Netscape") != -1);
var d = document;
function FloatingDiv(id, sx, sy) {

    var el = d.getElementById ? d.getElementById(id) : d.all ? d.all[id] : d.layers[id];
    var px = document.layers ? "" : "px";
    window[id + "_obj"] = el;
    if (d.layers) el.style = el;
    el.cx = el.sx = sx; el.cy = el.sy = sy;
    el.sP = function(x, y) {
        this.style.right = x + px; this.style.top = y + px;
    };

    el.floatIt = function() {
        var pX, pY;
        pX = (this.sx >= 0) ? 0 : ns ? innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
        pY = ns ? pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        if (this.sy < 0) {
            pY += ns ? innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        }
        this.cx += (pX + this.sx - this.cx) / 8;
        this.cy += (pY + this.sy - this.cy) / 8;
        this.sP(this.cx, this.cy);
        setTimeout(this.id + "_obj.floatIt()", 40);
    }
    return el;
}


function getCurrentStyle(element, attribute, defaultValue) {
    /// <summary>
    /// CommonToolkitScripts.getCurrentStyle is used to compute the value of a style attribute on an
    /// element that is currently being displayed.  This is especially useful for scenarios where
    /// several CSS classes and style attributes are merged, or when you need information about the
    /// size of an element (such as its padding or margins) that is not exposed in any other fashion.
    /// </summary>
    /// <param name="element" type="Sys.UI.DomElement" domElement="true">
    /// Live DOM element to check style of
    /// </param>
    /// <param name="attribute" type="String">
    /// The style attribute's name is expected to be in a camel-cased form that you would use when
    /// accessing a JavaScript property instead of the hyphenated form you would use in a CSS
    /// stylesheet (i.e. it should be "backgroundColor" and not "background-color").
    /// </param>
    /// <param name="defaultValue" type="Object" mayBeNull="true" optional="true">
    /// In the event of a problem (i.e. a null element or an attribute that cannot be found) we
    /// return this object (or null if none if not specified).
    /// </param>
    /// <returns type="Object">
    /// Current style of the element's attribute
    /// </returns>

    var currentValue = null;
    if (element) {
        if (element.currentStyle) {
            currentValue = element.currentStyle[attribute];
        } else if (document.defaultView && document.defaultView.getComputedStyle) {
            var style = document.defaultView.getComputedStyle(element, null);
            if (style) {
                currentValue = style[attribute];
            }
        }

        if (!currentValue && element.style.getPropertyValue) {
            currentValue = element.style.getPropertyValue(attribute);
        }
        else if (!currentValue && element.style.getAttribute) {
            currentValue = element.style.getAttribute(attribute);
        }
    }

    if ((!currentValue || currentValue == "" || typeof (currentValue) === 'undefined')) {
        if (typeof (defaultValue) != 'undefined') {
            currentValue = defaultValue;
        }
        else {
            currentValue = null;
        }
    }
    return currentValue;
}


function getIndexOf(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj) {
            return i;
        }
    }
    return -1;
}

