$(function () {
    $(document).ajaxError(function (a, b, c) {
        try {
            debugger
            if (b.status == 404) {
                var callBack = $$_adMan.ajaxErrorCallBack[c.url];
                if (callBack) {
                    callBack();
                }
            }
        } catch (e) {
        }
    });
});
window.$$_adMan = {

    host: undefined, //广告服务器主机名，运行时会被赋值方便使用

    showAdFuncs: new Array(),

    htmls: new Array(),

    nowVersion: undefined,

    ajaxErrorCallBack:new Array(),

    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },

    //处理文件地址，数据库存的文件地址，既可以带主机名也可不带
    handleFileUrl: function (url) {
        if (!url)
            return url;
        var temp = url;
        temp = $$_adMan.trim(temp).toLowerCase();
        if (temp.indexOf('http') != 0) {
            if (!(temp.indexOf('/') == 0 || temp.indexOf('\\') == 0)) {
                temp = '/' + temp;
            }
            temp = $$_adMan.host + temp
            return temp;
        }
        return url;
    },

    //动态加载css文件
    loadCss: function (url) {
        url = $$_adMan.handleFileUrl(url);
        $("<link>").attr({ rel: "stylesheet", type: "text/css", href: url }).appendTo("head");
    },

    //动态加载js文件
    loadJs: function (url, callback) {
        url = $$_adMan.handleFileUrl(url);
        try {
            $$_adMan.ajaxErrorCallBack[url] = callback;
            $.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                timeout: 20000,
                global:true,
                success: function () {
                },
                error: function () {
                },
                complete: function () {
                    setTimeout(callback(), 10);
                }
            });
        } catch (e) {
        }
    },

    //无法跨域获得文件内容，此方法暂时无用
    setHtml: function (adNum, html) {
        if (!$$_adMan.htmls[adNum]) {
            $$_adMan.htmls[adNum] = new Array();
        }
        var arr = $$_adMan.htmls[adNum];
        arr.push(html);
    },

    //无法跨域获得文件内容，此方法暂时无用
    getHtml: function (adNumber, index, callBack) {
        if (typeof (index) == 'function') {
            callBack = index;
            index = 0;
        }
        var arr = $$_adMan.htmls[adNumber];
        if (!arr)
            return '';
        var html = arr[index];
        if (!html)
            return '';
        var htmlUrl = $$_adMan.handleFileUrl(html);
        var url = htmlUrl;
        $.ajax({
            type: 'POST',
            url: url,
            dataType: "jsonp",
            async: false,
            success: function (data) {
                callBack(data);
            }
        });
    },

    //根据js文件名得到广告版本Id
    getAdVersionId: function () {
        return $$_adMan.nowVersion;
    },

    //注册广告显示方法
    registerAdFunc: function (func) {
        try {
            var versionId = $$_adMan.getAdVersionId();
            var funcArr = $$_adMan.showAdFuncs[versionId];
            if (!funcArr)
            {
                funcArr = new Array();
                $$_adMan.showAdFuncs[versionId] = funcArr;
            }
            funcArr.push(func);
        } catch (e) {
        }
    },

    //得到广告的数据
    getAdData: function (adId, callBack) {
        var url = $$_adMan.host + "/funyougrgzdata.aspx";
        $.ajax({
            type: 'GET',
            url: url,
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: "id=" + adId + "&t=" + new Date().getTime() + "&p=" + $$_adMan.getPageUrlBase64() + "&jsonpcallback=?",
            success: function (data) {
                if (callBack) {
                    callBack(data);
                }
            }
        });
    },

    //运行广告显示方法
    run: function (versionId, adCode, adId) {
        try {
            var nowAdId = adId;
            var func = $$_adMan.showAdFuncs[versionId];
            if (func) {
                $$_adMan.getAdData(adId, function (data) {
                    for (var i = 0; i < func.length; i++) {
                        func[i](data, adCode, adId);
                    }
                });
            }
        } catch (e) {
        }
        
    },

    //点击广告需要调用此方法以做记录
    adClick: function (adId) {
        try {
            var url = $$_adMan.host + "/funyougrgzclick.aspx?id=" + adId + "&p=" + $$_adMan.getPageUrlBase64();
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                dataType: "jsonp",
                success: function (data) {
                }
            });
        } catch (e) {
        }
    },

    pageUrl: undefined,

    //得到当前网页地址的base64编码字符
    getPageUrlBase64: function () {
        if (!$$_adMan.pageUrl) {
            $$_adMan.pageUrl = $$_adMan.base64encode(''+window.location);
        }
        return $$_adMan.pageUrl;
    },

    //对字符进行base64编码
    base64encode: function (str) {
        if (!str)
            return str;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var base64DecodeChars = new Array(
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
       52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
       -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
       15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
       -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
       41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }
}