
var thisFaceUrl = "http://120.26.88.6:10301/";
var SogouCookieName = "cqvip_sogoustatis";
$(document).ready(Init);
function Init() {
    wzh_SogouTongji();
}
//window.onload = function () {
//    wzh_SogouTongji();
//}
function wzh_SogouTongji() {

    var SogouCookieNameValue = "";
    SogouCookieNameValue = wzh_getCookie(SogouCookieName);
    if (SogouCookieNameValue != null && SogouCookieNameValue != "") {
        wzh_useSogouStatis(SogouCookieNameValue, document.URL);
    }
    else {
        var surl = "";
        if (document.referrer.length > 0) {
            surl = document.referrer;
        }
        try {
            if (surl.length == 0 && opener != null && opener.location.href.length > 0) {
                surl = opener.location.href;
            }
            if (surl != "" && (surl.indexOf("sogou.com") > -1 || surl.indexOf("baidu.com") > -1)) {
                ajax({
                    type: "GET",
                    url: thisFaceUrl + "api/Sogou/GetNewGuid",
                    dataType: "json",
                    beforeSend: function () {
                    },
                    success: function (data) {
                        if (data.Status == 200) {
                            wzh_useSogouStatis(data.Message, surl);
                            wzh_setCookie(SogouCookieName, data.Message);
                        }
                    },
                    error: function () {
                    }
                });
            }

        } catch (e) { }
    }
}

function wzh_setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    //document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString
    document.cookie = name + "=" + escape(value) + ";";
}
function wzh_getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function wzh_delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = wzh_getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function wzh_useSogouStatis(guid, sourceurl) {
    var vurl = document.URL;// window.parent.location;
    var username = ""; //读取用户名
    jsUrl = thisFaceUrl + "api/Sogou/SrcAdd?guid=" + guid + "&s=" + encodeURIComponent(sourceurl) + "&v=" + encodeURIComponent(vurl) + "&u=" + encodeURIComponent(username);
    wzh_createJs(jsUrl);

}
function wzh_createJs(urls) {
    ajax({
        type: "GET",
        url: urls,
        dataType: "json",
        beforeSend: function () {
        },
        success: function (data) {
            if (data.Status == 205) {
                wzh_delCookie(SogouCookieName);
            }
        },
        error: function () {
        }
    });
}

function ajax() {
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function () { },
        success: arguments[0].success || function () { },
        error: arguments[0].error || function () { }
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c in data) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1)
        return convertResult;
    } else {
        return data;
    }
}