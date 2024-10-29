if (typeof (HTMLElement) != "undefined") {
    HTMLElement.prototype.contains = function(obj) {
        while (obj != null && typeof (obj.tagName) != "undefind") {
            if (obj == this) return true;
            obj = obj.parentNode;
        }
        return false;
    }
}
function MM_showHideLayers(d, theEvent, v) { //v6.0
    var i, p, v, obj, sd, args = MM_showHideLayers.arguments;
    var sd = document.getElementById(d);
    if (v == 'show') {
        var shimmer1 = document.getElementById('shimmer' + d);
        if (sd != null) {
            sd.style.visibility = '';
        }
        if (shimmer1 == null) {
            var shimmer = document.createElement('iframe');
            shimmer.id = 'shimmer' + d;
            shimmer.style.position = 'absolute';
            shimmer.style.width = sd.style.width;
            shimmer.style.height = sd.style.height;
            var stop = sd.style.top.substring(0, sd.style.top.length - 2);
            var itop = parseFloat(stop);
            itop += 7;
            var stop1 = itop.toString();
            shimmer.style.top = stop1 + 'px';
            shimmer.style.left = sd.style.left;
            shimmer.style.zIndex = '1';
            shimmer.setAttribute('frameborder', '0');
            shimmer.setAttribute('src', 'javascript:false;');
            document.body.appendChild(shimmer);
        }
        if (sd != null) {
            sd.style.visibility = 'visible';
        }
    } else if (v == 'hide') {
        if (theEvent) {
            var browser = navigator.userAgent;   //Get Browser
            if (browser.indexOf("Firefox") > 0) { //Firefox
                if (sd != null) {
                    if (sd.contains(theEvent.relatedTarget)) { //if child
                        return;
                    }
                }
            }
            if (browser.indexOf("MSIE") > 0) { //IE
                if (document.getElementById(d).contains(event.toElement)) { //if child
                    return;
                }
            }
        }
        if (sd != null) {
            if (sd.style.visibility == 'visible') {
                sd.style.visibility = 'hidden';
                var shimmer = document.getElementById('shimmer' + d);
                if (shimmer != null) {
                    document.body.removeChild(shimmer);
                }
            }
        }
    }
}


function MM_preloadImages() { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf('#') != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
    }
}


function MM_swapImgRestore() { //v3.0
    var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

function MM_findObj(n, d) { //v4.01
    var p, i, x; if (!d) d = document; if ((p = n.indexOf('?')) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
    var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2); i += 3)
        if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}


function OpenWebATMWindow(sURL) {
    window.open(sURL, 'webatm', 'height=630,width=835,toolbar=no,scrollbars=yes,resizable=yes,location=no,status=yes');
}