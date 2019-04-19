/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-17
 * Time: 下午3:06
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('wpa.APIs.addCustom', 'globalSettings,lang.each,lang.typeEnhance,lang.extend,util.getJSONP,util.domain,wpa.wpaMgr', function(require){
    var globalSettings = require('globalSettings'),
        each = require('each'),
        typeEnhance = require('typeEnhance'),
        extend = require('extend'),
        domain = require('domain'),
        wpaMgr = require('wpaMgr');

    var WPA_TYPE_CUSTOM = '3',
        SESSION_VERSION = '4',
        APPOINT_TYPE_AUTO = '0',
        APPOINT_EMPTY = '0';

    var defaults = {
        wty: WPA_TYPE_CUSTOM,
        sv: SESSION_VERSION,
        aty: APPOINT_TYPE_AUTO,
        a: APPOINT_EMPTY,
        ws: domain.domain
    };

    var global = globalSettings.global;

    /**
     * global.addCustom
     * @param {Object|Object[]} opts
     * @param {String} opts.nameAccount User's name account
     * @param {String} [opts.kfuin=""] User's uin
     * @param {documentElement} [opts.node=document.body] Node to be customized as WPA.Optional only when opts.selector is set, and opts.node is prior over opts.selector
     * @param {String} [opts.selector] Node's id, optional only when opts.node is set
     * @param {String} [opts.aty] Appoint type out of ['0', '1', '2'], 1-auto, 2-kfext, 3-group
     * @param {String} [opts.a] Appointed kfext or group
     * @param {String} [opts.chatType] ChatType 1-AIO chat, 2-webchat
     */
    return global.addCustom = function(opts){
        opts = typeEnhance.isArray(opts) ? opts : [opts];

        each(opts, function(){
            if(!this.nameAccount || !typeEnhance.isString(this.selector)){
                return;
            }

            this.node = this.node || function(selector){
                // selector is id string
                if(!typeEnhance.isString(selector)){
                    return;
                }

                return document.getElementById(selector);
            }(this.selector);

            if(!this.node){
                return;
            }

            wpaMgr.newWPA(extend({}, this, defaults));
        });
    }
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-22 下午8:37
 */
BizQQWPA.define('lang.extend', 'lang.each,lang.typeEnhance', function(require){
    var each = require('each'),
        typeEnhance = require('typeEnhance');

    return function(){
        var args = Array.prototype.slice.call(arguments),
            deep = false,
            base = args.shift(),
            override = typeEnhance.type(args[args.length - 1]) === 'boolean' ? args.pop() : false;

        if(base === true){
            deep = true;
            base = args.shift();
        }

        // plain merge
        var extend = override ?
                function(base, ext){
                    each(ext, function(i, p){
                        base[i] = p
                    });
                }:
                function(base, ext){
                    each(ext, function(i, p){
                        if(typeof base[i] !== 'undefined'){
                            return;
                        }

                        base[i] = p;
                    });
                };

        // recursive merge
        var extendRecursive = override ?
                function(base, ext){
                    each(ext, function(i, p){
                        if(typeEnhance.type(p) !== 'object'){
                            base[i] = p;
                            return;
                        }

                        base[i] = arguments.callee({}, p);
                    });
                }:
                function(base, ext){
                    each(ext, function(i, p){
                        if(typeof base[i] !== 'undefined'){
                            return;
                        }

                        if(typeEnhance.type(p) !== 'object'){
                            base[i] = p;
                            return;
                        }

                        base[i] = arguments.callee({}, p);
                    });
                };

        each(args, function(i, obj){
            deep ? extendRecursive(base, obj) : extend(base, obj);
        });

        return base;
    };
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-28 上午10:16
 */
BizQQWPA.define('util.domain', function(){
    var domain = {},
        dm = document.domain;

    // in some cases, get location.href will throw security restriction error
    // so catch it and retry
    try{
        // in some cases, get location.href will throw security restriction error
        // so catch it and retry
        domain.url = location.href;
    } catch(e){
        domain.url = '';
    }

    domain.topDomain = function(){
            //in case of domains end up with .com.cn .edu.cn .gov.cn .org.cn
        var reg1 = /\.(?:(?:edu|gov|com|org|net)\.cn|co\.nz)$/,
            //in case of ip
            reg2 = /^[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d$/,
            // for domain ends like .com.cn, top domain starts from -3
            // for ip starts from 0
            // else slice from -2
            slicePos = reg1.test(dm) ? -3 : reg2.test(dm) ? 0 : -2;
        return dm.split('.').slice(slicePos).join('.');
    }();

    domain.domain = function(){
        var reg = /(?::[\/]{2}|:[\\]{3})([a-zA-Z0-9_\.]+)/;

        try{
            var ret = reg.exec(domain.url);
            return ret ? ret[1] || dm : dm;
        } catch(e){
            return dm;
        }
    }();

    return domain;
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午8:05
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('wpa.WPA', 'globalSettings,lang.browser,util.cookie,util.localStorage,lang.typeEnhance,util.serialize,util.proxy,util.pad,util.Bits,util.getScript,util.getJSONP,util.domain,util.events,util.onLoad,util.offset,util.report,util.log,util.speedReport,wpa.SelectPanel,util.onIframeLoaded,util.GUID,wpa.getQQVersion,wpa.ViewHelper,wpa.views,wpa.ta,wpa.kfuin,wpa.sid', function(require){
    var globalSettings = require('globalSettings'),
        proxy = require('proxy'),
        typeEnhance = require('typeEnhance'),
        pad = require('pad'),
        Bits = require('Bits'),
        getScript = require('getScript'),
        getJSONP = require('getJSONP'),
        domain = require('domain'),
        events = require('events'),
        onLoad = require('onLoad'),
        serialize = require('serialize'),
        browser = require('browser'),
        offset = require('offset'),
        report = require('report'),
        log = require('log'),
        speedReport = require('speedReport'),
        GUID = require('GUID'),
        SelectPanel = require('SelectPanel'),
        onIframeLoaded = require('onIframeLoaded'),
        getQQVersion = require('getQQVersion'),
        ViewHelper = require('ViewHelper'),
        views = require('views'),
        ta = require('ta'),
        kfuinCache = require('kfuin'),
        cookie = require('cookie'),
        localStorage = require('util.localStorage'),
        sidCache = require('sid');

    var global = window,
        //广告的监测代码是否加载了
        isDaAdded = 'isDaAdded',
        isFetchingDa = 'isFetchingDa',
        daList = [],
        TENCENT_SIG = 'tencentSig';

    //wpa params
    var WPA_TYPE_TA_INVITE_ONLY = '0', //no wpa will be created, TA & invite logic only
        WPA_TYPE_NORMAL = '1', //normal wpa, with TA & invite logic
        WPA_TYPE_LINK = '2', //for forumn & weibo, a link
        WPA_TYPE_CUSTOM = '3', //customized wpa
        SESSION_VERSION_TA = '4', //session version for wpa with TA, seperated from user customed wpa
        WPA_STYLE_TYPE_INVITE = '20', //invite wpa's style type
        APPOINTED_TYPE_AUTO = '0', //appointed type of automatic diversion
        APPOINTED_TYPE_KFEXT = '1', //appointed type of appointed kfext
        APPOINTED_TYPE_GROUP = '2', //appointed type of appointed group
        WPA_FLOAT_TYPE_FIXED = '0', //wpa style: float style fixed
        WPA_FLOAT_TYPE_SCROLL = '1', //wpa style: float style scroll
        WPA_FLOAT_POSITION_X_LEFT = '0', //wpa style: x-coordinate position, left
        WPA_FLOAT_POSITION_X_CENTER = '1', //wpa style: x-coordinate position, center
        WPA_FLOAT_POSITION_X_RIGHT = '2', //wpa style: x-coordinate position, right
        WPA_FLOAT_POSITION_Y_TOP = '0', //wpa style: y-coordinate position, top
        WPA_FLOAT_POSITION_Y_CENTER = '1', //wpa style: y-coordinate position, center
        WPA_FLOAT_POSITION_Y_BOTTOM = '2', //wpa style: y-coordinate position, bottom
        IS_INVITE_WPA_FALSE = '0', //param that seperate wpa conversations, false means normal wpa conversation
        IS_INVITE_WPA_TRUE = '1', //param that seperate wpa conversations, invite wpa conversation
		CHAT_TYPE_AIO = 1, // assign to launch qq chat
		CHAT_TYPE_ANONYMOUS = 2; //assign to launch anonymous chat

    var SPEED_REPORT_DISPLAY = 0.1,
        REPORT_POSSIBILITY = 40,
        visitorId;

    /************动态引入手Q的mqq库*******************/
    try {
        var mqqSrc = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152',
            head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            baseElement = head.getElementsByTagName("base")[0];

        if (!window.mqq && (browser.isIOS || browser.isAndroid)) {
            fetch(mqqSrc, '_mqq');
        }
    } catch (e) {
        if (console && console.log) {
            console.log(e);
        }
    }

    function fetch(uri, id, cb) {
        var node = document.createElement("script");

        node.charset = 'utf-8';
        node.async = true;
        node.src = uri;
        node.id = id || '';

        // For some cache cases in IE 6-8, the script executes IMMEDIATELY after
        // the end of the insert execution, so use `currentlyAddingScript` to
        // hold current node, for deriving uri in `define` call
        var currentlyAddingScript = node;
        
        node.onreadystatechange = node.onload = function() {
            if(/loaded|complete|undefined/.test(node.readyState) && typeof cb === 'function') {
                cb();
                node.onreadystatechange = node.onload = null;
            }
        };

        // ref: #185 & https://dev.jquery.com/ticket/2709
        baseElement ?
            head.insertBefore(node, baseElement) :
            head.appendChild(node);

        currentlyAddingScript = null;
    }


    /************************************/

    var passRandom = function(poss) {
        var r = poss || 10;//10% percent is the default value

        if (Math.random() * 100 <= r) {
            return true;
        }

        return false;
    };

    var randomId = function() {
        return (Math.round((Math.random()||0.5) * 2147483647) * (+new Date())) % 10000000000;
    };

    var reportWpa = function(url, opts) {

        if (passRandom(REPORT_POSSIBILITY)) {
            report(url + '?' + serialize(opts));
        }
    };

    var _log = function(msg) {
        if (console && console.log) {
            console.log(msg);
        }
    }

    var qidianDAReport = function() {
        try {
            var GLOBAL = window;
            // 这个是固定的，用于让用户自定义暴露接口的名字
            var HOOK_NAME = '__qq_qidian_da';
            // 对外接口的名字
            var EXPORT_NAME = GLOBAL[HOOK_NAME] || 'qidianDA';
            if (!EXPORT_NAME) {
                return;
            }
            var qidianDA = GLOBAL[EXPORT_NAME],
                nameAccount = daList.shift();
            if (!nameAccount) {
                return;
            }
            qidianDA('create', String(nameAccount), {
                'cid': String(visitorId),
                'src': 12,
                'pgv_pvi':  cookie.get('pgv_pvi') || '' 
            });
            qidianDA('set', 't1', new Date());
        } catch (e) {
            _log('[WPA][qidianDAReport]:error occured');
            _log(e);
        }
    };

    var addDaScript = function(nameAccount) {
        daList.push(nameAccount);
        if (!top[isFetchingDa]) {
            top[isFetchingDa] = true;
            fetch('//bqq.gtimg.com/da/i.js', '_da', function() {
                top[isDaAdded] = true;
                qidianDAReport();
            });
        } else {
            if (top[isDaAdded]) {
                qidianDAReport();
            }
        }
    };

    var WPA = function(params){
        this.params = params;
        this.insert = params.insert;
        this.wty = params.wty;

        var self = this,
            nameAccount = this.nameAccount = params.nameAccount,
            kfuin = this.kfuin = params.kfuin;

        //判断visitorId，即tencentSig在cookie中是否存在
        if (localStorage.getItem(TENCENT_SIG)) {
            visitorId = params.guid = localStorage.getItem(TENCENT_SIG);
        } else {
            var guid = randomId();
            visitorId = params.guid = guid;
            localStorage.setItem(TENCENT_SIG, guid);
        }

        //render wpa view
        switch (this.wty){
            case WPA_TYPE_NORMAL:
                this.render();
                break;
            case WPA_TYPE_CUSTOM:
                this.custom();
        }

        //preload kfuin & sid
        !this.kfuin && kfuinCache.get(nameAccount, function(data){
            data && (self.kfuin = data);
        });

        !this.sid && sidCache.get(nameAccount, function(data){
            data && (self.sid = data);
        });

        //添加广告的监控代码
        //added by vergil
        setTimeout(function() {
            addDaScript(nameAccount);
        }, 10);

		// report page source
        report('https://prom.b.qq.com/se/r.gif?na=' + nameAccount + '&ref=' + encodeURIComponent(document.referrer));
    };

    WPA.prototype = {
        render: function(){
            var params = this.params;

            //业务分发器，动态加载当前样式所需的业务js
            var width, height,
                type = parseInt(params['type']),
                typeStr,
                isFloat = false;

            //wpa style switch
            switch(type){
                // btn styles
                case 1: typeStr = 'a01'; width = 92; height = 22; break;
                case 2: typeStr = 'a02'; width = 77; height = 22; break;

                // float styles
                case 10: typeStr = 'b01'; width = 93; height = 151; isFloat = true; break;
                case 11: typeStr = 'b02'; width = 327; height = 172; isFloat = true; break;
                case 12: typeStr = 'b03'; width = 121; height = 277; isFloat = true; break;

                // invite styles
                case 20: typeStr = 'i01'; width = 327; height = 172; isFloat = true; break;

                // self-define styles
                case 30: typeStr = 'd01'; width = params['txw']; height = params['txh']; isFloat = true; break;
            }

            this.type = typeStr;
            this.width = width;
            this.height = height;
            this.createWPA();

            if( (type > 9 && type < 14) || type === 20 || type === 30 ){
                this.initFloatWPA();
            }
        },

        // create WPA node
        createWPA: function(){
            // speed report: start time stamp of view page
            var speedRpt = speedReport('7818', '21', '1');

            var wpa = this,
                type = this.type,
                width = this.width,
                height = this.height,
                view = views[type];

            // ie will reject operations when parent's domain is set
            var iframe;
            try{
                iframe = document.createElement('<iframe scrolling="no" frameborder="0" width="' + width + '" height="' + height + '" allowtransparency="true" src="about:blank"></iframe>');
            } catch(e) {
                iframe = document.createElement('iframe');
                iframe.width = width;
                iframe.height = height;
                iframe.setAttribute('scrolling', 'no');
                iframe.setAttribute('frameborder', 0);
                iframe.setAttribute('allowtransparency', true);
                iframe.setAttribute('src', 'about:blank');
            }

            this.node = iframe;
            this.insert(iframe);

            if(browser.msie){
                // when domain is set in parent page and blank iframe is not ready, access to it's content is denied in ie
                try{
                    var accessTest = iframe.contentWindow.document;
                } catch(e){
                    // Test result shows that access is denied
                    // So reset iframe's document.domain to be the same as parent page
                    iframe.src = 'javascript:void((function(){document.open();document.domain=\''+ document.domain + '\';document.close()})())';
                }
            }

            var loaded = function(){
                var iWin = iframe.contentWindow,
                    iDoc = iframe.contentDocument || iWin.document;

                iDoc.open();
                iDoc.write([
                    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
                    '<html xmlns="https://www.w3.org/1999/xhtml">',
                    '<head>',
                        '<meta https-equiv="Content-Type" content="text/html; charset=utf-8" />',
                        browser.msie && iframe.src !== 'about:blank' ? '<script>document.domain=\'' + document.domain + '\';</script>' : '',
                    '</head>',
                    '<body>',
                        view.templ,
                    '</body>',
                    '</html>'
                ].join(''));
                iDoc.close();

                // add helper for views' initiation
                var helper = new ViewHelper(iDoc, wpa);

                view.init(iDoc, helper);

                //record time & report
                var point = 1;
                speedRpt.addPoint(point).send(SPEED_REPORT_DISPLAY);
            };

            onIframeLoaded(iframe, loaded);
        },

        /**
         * 浮动WPA的iframe加载器，判断目标页面加载成功后再show出来
         */
        initFloatWPA: function(){
            //创建浮动层
            var doc = window.document,
                params = this.params,
                type = parseInt(params['type']),
                node = this.node,
                width = this.width,
                height = this.height;

            node.style.cssText = [
                'display:none;',
                'position:absolute;',
                type === 20 ? 'z-index:2147483647!important;' : 'z-index:2147483646!important;'
            ].join(' ');

            //判断页面是否加载完毕
            onLoad(initIframeLoad);

            /**
             * 对B01、B02、B03、B04 node进行处理
             */
            function initIframeLoad(){
                var isty = node.style,
                    isIE = browser.msie,
                    ver = parseInt(browser.version, 10),
                    isQuirk = doc.compatMode === 'BackCompat';

                //非IE6统一使用position:fixed
                isty.position = parseInt(params['fsty'], 10) == 0 ? 'fixed' : 'absolute';

                //获取浮动的位置
                if(parseInt(params['fposX']) == 0){
                    isty.left = 8 + 'px';
                    isty.right = 'auto';
                    isty.marginLeft = 0;
                }else if(parseInt(params['fposX']) == 1){
                    isty.left = '50%';
                    isty.right = 'auto';
                    isty.marginLeft = '-'+parseInt(width/2) + 'px';
                }else{
                    isty.left = 'auto';
                    isty.right = 8 + 'px';
                    isty.marginLeft = 0;
                }
                if(parseInt(params['fposY']) == 0){
                    isty.top = 8 + 'px';
                    isty.bottom = 'auto';
                    isty.marginTop = 0;
                }else if(parseInt(params['fposY']) == 1){
                    isty.top = '50%';
                    isty.bottom = 'auto';
                    isty.marginTop = '-'+parseInt(height/2) + 'px';
                }else{
                    isty.top = 'auto';
                    isty.bottom = 8 + 'px';
                    isty.marginTop = 0;
                }

                //对IE6进行特殊处理position:absolute，用setInterval实现滚动跟随
                if((isIE & ver < 7) || isQuirk){
                    isty.position = 'absolute';
                    if(parseInt(params['fsty']) == 0){
                        //reset
                        isty.marginTop = 0;
                        var itop;

                        if(parseInt(params['fposY']) == 0){
                            itop = 8;
                        }else if(parseInt(params['fposY']) == 1){
                            itop = (offset.getClientHeight(doc) - height)/2;
                        }else{
                            itop = offset.getClientHeight(doc) - height - 8;
                        }

                        setInterval(function(){
                            isty.top = offset.getScrollTop(doc) + itop + 'px';
                        }, 128);
                    }
                }

                isty.display = 'block';
            }
        },

        custom: function(){
            events.addEvent(this.params.node, 'click', proxy(this, this.launchChat));
        },

        remove: function(){
            var node = this.node;
            node.parentNode.removeChild(node);
        },

        // Chat part
        /**
         * Launch a chat
         * @param {function} callback Callback when chat is launched
         */
        launchChat: function(callback){

			var wpa = this,
				sptReport = speedReport('7818', '21', '2'),
				chatType = this.params.chatType;

            //添加点击上报
            //todo
            //根据要求，只要点击了就上报
            reportWpa('https://report.b.qq.com/crmReport/clicklog', {
                FUID: cookie.get('pgv_pvi'),
                FKFUin: wpa.params.kfuin,
                FNa: wpa.params.nameAccount,
                FRurl: global.document.referrer
            });

            // Mobile
            if(browser.isIOS || browser.isAndroid){
                this.launchMobileChat();
                return;
            }
            
				
			if(chatType == CHAT_TYPE_ANONYMOUS){
				wpa.launchAnonymousChat(callback);
				return;
			}
			
			if(chatType == CHAT_TYPE_AIO){
				wpa.launchAIOChat(callback);
				return;
			}

            // since QQ browser plugin is not reliable
            // always try to launch AIO chat
            // no ie browser launch without checking QQ version
            !browser.msie && wpa.launchAIOChat(callback);

            getQQVersion(function(version){
                sptReport.addPoint(7).send();

                if(version){
                    // ie browser won't be launched unless QQ is install for sure
                    // otherwise page may be redirected to schema on error case when QQ not installed
                    browser.msie && wpa.launchAIOChat(callback);

                    return;
                }

                // show selections for user when no version detected ( not sure QQ exists or not)
                new SelectPanel({
                    //QQ已安装，点击会话
                    onAIOChat: function(){
                        wpa.launchAIOChat(callback);
                    },

                    //未安装，发起网页会话
                    onAnonyChat: function(){
                        wpa.launchAnonymousChat(callback);
                    }
                });
            });
        },

        launchMobileChat: function(){
            var nameAccount = this.params.nameAccount;

            // only kfuin are acceptable for scheme
            // use kfuin cache
            kfuinCache.get(nameAccount, function(kfuin){
                // for wechat
                // page outside qq.com should be redirect to proxy page at qq.com
                if(navigator.userAgent.indexOf('MicroMessenger') > -1 && domain.domain.indexOf('qq.com') === -1){
                    location.href = 'https://wpd.b.qq.com/page/info.php?nameAccount=' + nameAccount;
                    return;
                }

                // when running in standard browser
                // no QQ info known
                // try CRM schema
                // otherwise fallback to info page
                // @2014-08-04
                // fallback to QQ 4.5 schema is abandoned for it may cause double jumps
                launch(schema(), fallback);

                function schema(){
                    // mobile QQ has problem in resolving complex source url
                    // use domain temporarily
                    var dm = domain.domain,
                        type = 'crm';

                    // for older version of QQ
                    // when running inside QQ web view
                    // QQ version is determined                    
                    if(browser.isQQ && browser.QQVersion === '4.5'){
                        type = 'wpa';


                    }

                    //手q内部无法跳转bug
                    //2016-04-29
                    //added by vergil
                    //android和ios都一样用mqqwpa
                    if (browser.isQQ) {
                        return 'mqqwpa://im/chat?chat_type=' + type + '&uin=' + kfuin + '&version=1&src_type=web&web_src=' + location.protocol + '://' + dm;
                    }

                    return browser.isAndroid && browser.chrome && parseInt(browser.version, 10) > 25 ? 
                        'intent://im/chat?chat_type=' + type + '&uin=' + kfuin + '&version=1&src_type=web&web_src=' + location.protocol + '://' + dm + '#Intent;scheme=mqqwpa;action=android.intent.action.VIEW;end' :
                        'mqqwpa://im/chat?chat_type=' + type + '&uin=' + kfuin + '&version=1&src_type=web&web_src=' + location.protocol + '://' + dm;
                }

                function launch(schema, fail){
                    var start = +new Date();

                    location.href = schema;
                    
                    setTimeout(function(){
                        var gap = +new Date() - start;

                        // gap above 1000ms seen as manual return
                        if(gap < 6000){//1000
                            fail && fail();
                        }
                    }, 5000);//800
                }

                function fallback(){
                    // automaticlly return when no mobile QQ installed

                    // window.open is not allowed in some android browser
                    // window.open('https://wpd.b.qq.com/page/info.php?nameAccount=' + nameAccount, '_blank');

                    location.href = 'https://wpd.b.qq.com/page/info.php?nameAccount=' + nameAccount;
                }
            });
        },

        // Launch PC QQ chat
        launchAIOChat: function(){
            var iframe = document.createElement('iframe'),
                body = document.getElementsByTagName('body')[0];
            iframe.style.display = 'none';
            body.insertBefore(iframe, body.firstChild);

            return function(callback){
                var params = this.params,
                    kfuin = this.kfuin,
                    opts = {
                        na: params.nameAccount,
                        kfuin: kfuin,
                        aty: params.aty,
                        a: params.a,
                        sid: this.sid,
                        uid: ta.uid,
                        url: domain.url,
                        title: document.title,
                        dm: domain.topDomain,
                        clkSrc: params.clkSrc || '',
                        ext: params.ext || ''
                    },
                    guid = GUID();

                var sptReport = speedReport('7818', '21', '2');

                getJSONP('https://wpd.b.qq.com/cgi/get_sign.php', opts, function(rs){
                    if(!rs || rs.r !== 0 || !rs.data){
                        return;
                    }

                    iframe.src = rs.data.sign;

                    var isLoaded = false,
                        loaded = function(){
                            // make sure no double run
                            if(isLoaded){
                                return;
                            }

                            isLoaded = true;

                            var clickId = rs.data.clkID;

                            // todo
                            // use event mod to clean up main stream

                            // report log
                            sptReport.addPoint(5).send();
                            report('https://promreport.crm2.qq.com/wpaclick/r.gif?ty=1&kfuin=' + kfuin + '&version=' + globalSettings.version + '&browser=' + encodeURIComponent(navigator.userAgent) + '&bfrom=1&appointType=' + params.aty + '&appoint=' + params.a + '&clkID=' + clickId + '&guid=' + guid);

                            //inform TA
                            global.taClick && global.taClick(clickId, 'clickid');

                            // delay callback because schema causes time
                            // in case of calling back too early, delay callback for a while
                            // todo
                            // is 1000ms too long?
                            typeEnhance.isFunction(callback) && setTimeout(function(){
                                callback(params);
                            }, 1000);
                        };

                    onIframeLoaded(iframe, loaded);

                    // fallback solution
                    // in some cases like security setting higher than low-middle in ie, readyState will remain interactive and never be loaded
                    // for this case, interactive ready state is already good to fire callback, so use setTimeout checking instead of iframe loaded
                    if(browser.msie){
                        var fallback = function(){
                            setTimeout(function(){
                                if(isLoaded){
                                    return;
                                }

                                /interactive/.test(iframe.readyState) ? loaded() : fallback();
                            }, 500);
                        };

                        fallback();
                    }
                });

                report('https://promreport.crm2.qq.com/wpaclickorg/r.gif?kfuin=' + kfuin + '&version=' + globalSettings.version + '&browser=' + encodeURIComponent(navigator.userAgent) + '&bfrom=1&appointType=' + params.aty + '&appoint=' + params.a + '&guid=' + guid);
            }
        }(),

        // Launch anonymous chat
        launchAnonymousChat: function (callback){
            var params = this.params,
                // record load time of anonymous page
                sptReport = speedReport('7818', '21', '2'),
                url = 'https://wpd.b.qq.com/page/webchat.html?nameAccount=' + this.nameAccount,
                opener = window.open(url, '_blank', 'height=516, width=598,toolbar=no,scrollbars=no,menubar=no,status=no,location=no');

            typeEnhance.isFunction(callback) && callback(params);

            // report log
            report('https://promreport.crm2.qq.com/wpaclick/r.gif?ty=2&kfuin=' + this.kfuin + '&version=' + globalSettings.version + '&browser=' + encodeURIComponent(navigator.userAgent) + '&bfrom=1&appointType=' + params.aty + '&appoint=' + params.a);

            opener.onload = function(){
                sptReport.addPoint(6).send();
            };
        }
    };

    return WPA;
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-22 下午7:32
 */
BizQQWPA.define('wpa.wpaMgr', 'globalSettings,lang.each,util.proxy,util.cookie,util.titleFlash,util.report,util.serialize,util.domain,wpa.WPA', function(require){
    var globalSettings = require('globalSettings'),
        each = require('each'),
        proxy = require('proxy'),
        titleFlash = require('titleFlash'),
        report = require('report'),
        serialize = require('serialize'),
        domain = require('domain'),
        cookie = require('cookie'),
        WPA = require('WPA');

    var REPORT_POSSIBILITY = 40;

    var getTencentSig = function() {
            return (Math.round((Math.random()||0.5) * 2147483647) * (+new Date())) % 10000000000;
        },
        TENCENT_SIG_NAME = 'tencentSig',
        GAP = 1000 * 60 * 60 * 24 * 365 * 100;

    var passRandom = function(poss) {
        var r = poss || 10;//10% percent is the default value

        if (Math.random() * 100 <= r) {
            return true;
        }

        return false;
    };

    var reportWpa = function(url, opts) {

        if (passRandom(REPORT_POSSIBILITY)) {
            report(url + '?' + serialize(opts));
        }
    };

    var displayReport = function(params){
        var url = 'https://prom.b.qq.com/wpadisplay/r.gif?',
            optsArr = ['wty', 'type', 'nameAccount', 'kfuin', 'ws', 'aty', 'a', 'title', 'wording', 'wording2'],
            reportOpts = {
                version: globalSettings.version
            };

        each(optsArr, function(){
            reportOpts[this] = typeof params[this] === 'undefined' ? '' : params[this];
        });

        //经验值确保mqq的加载
        setTimeout(function() {
            try {
                //拿tencentSig
                var tencentSig = cookie.get(TENCENT_SIG_NAME);
                if (tencentSig) {
                    reportOpts[TENCENT_SIG_NAME] = tencentSig;
                } else {
                    var t = getTencentSig();
                    reportOpts[TENCENT_SIG_NAME] = t;
                    cookie.set(TENCENT_SIG_NAME, t, null, null, GAP);
                } 
                //拿设备标识
                var _mqq = window.mqq;
                if (_mqq) {
                     _mqq.device.getDeviceInfo(function(param) {
                        if (_mqq.core.android) {//是安卓系统
                            reportOpts.isAndroid = 1;
                            reportOpts.macAddr = param.macAddress;
                            reportOpts.imsi = param.imsi;
                        } else {//是iOS
                            reportOpts.isAndroid = 0;
                            reportOpts.idfa = param.idfa;
                        }
                        report(url + serialize(reportOpts));
                    });
                } else {
                    report(url + serialize(reportOpts));
                }
            } catch(e) {
                if (console && console.log) {
                    console.log(e);
                }
            }
        }, 1000);
        
    };

    return {
        newWPA: function(params){
            var nameAccount = params.nameAccount;
            if(!nameAccount){
                return;
            }

            displayReport(params);

            //添加展示上报
            //todo
            //组织上报的数据进行上报
            reportWpa('https://report.b.qq.com/crmReport/accesslog', {
                FUID: cookie.get('pgv_pvi'),
                FKFUin: params.kfuin,
                FNa: params.nameAccount,
                FRurl: window.document.referrer
            });

            return new WPA(params);
        },
        invite: function(params, di){
            var mgr = this,
                defaultInvite = function(){
                    //【您有新消息】 utf-8编码， 若不转码，在非utf-8页面会引起乱码
                    titleFlash.on('\u3010\u60A8\u6709\u65B0\u4FE1\u606F\u3011');

                    params.insert = function(node){
                        var body = document.getElementsByTagName('body')[0];
                        body.insertBefore(node, body.firstChild);
                    };
                    mgr.newWPA(params);
                };
            if(!di){
                defaultInvite();
                return;
            }

            try{
                var chat = proxy({params: params}, WPA.prototype.launchChat);
                window[di] && window[di](chat, params['msg']);
            }catch(e){
                // use event principle would be better
                defaultInvite()
            }
        }
    };
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 上午11:47
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('lang.browser', function(){
    var ua = navigator.userAgent.toLowerCase();

    var browser = {};

    // Browser Base
    // Borrowed from jQuery
    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    // ie11 support
    // ie11 ua change: https://msdn.microsoft.com/zh-cn/library/ie/hh869301(v=vs.85).aspx
    var matchIe11;
    if(ua.indexOf('trident') > -1 && ( matchIe11 = /rv:([\d.]+)/.exec( ua ) )){
        match[1] = 'msie';
        match[2] = matchIe11[1];
    }

    var matched = {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    // Mobile detect
    var isMobile = browser.isMobile = ua.match(/(nokia|iphone|android|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i);

    browser.isWindow = /windows|win32/.test(ua);

    browser.isMac = /Mac/.test(ua);

    browser.isIOS = /(?:iphone|ipad|ipod)/i.test(ua);

    browser.isAndroid = /android/i.test(ua);

    if(isMobile){
        var QQReg = /QQ\/(\d+\.\d+)\.\d/,
            OldQQReg = /V1_AND_SQ_(\d+\.\d+)\.\d/,
            match = QQReg.exec(ua) || OldQQReg.exec(ua);

        browser.isQQ = !match;
        match && (browser.QQVersion = match[1]);
    }


    return browser;
});
/**
 * @fileOverview proxy module
 * @author amoschen
 * @version
 * Created: 12-8-2 下午9:59
 */
BizQQWPA.define('util.proxy', function(){
    return function(ns, fn){
        return function(){
            return fn.apply(ns, arguments);
        }
    }
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.pad', function(){
    return function(str, pad, length, isLeft){
        var padLength = length - str.length,
            i;

        if(isLeft === false){
            for(i=0; i<padLength; i++){
                str += pad;
            }
        } else {
            for(i=0; i<padLength; i++){
                str = pad + str;
            }
        }

        return str;
    };
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午2:44
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.Bits', 'util.proxy,util.pad', function(require){
    var proxy = require('proxy'),
        pad = require('pad');

    return function(){
        var setChar = function(str, index, newChar){
            return str.replace(new RegExp('(^[\\d]{' + index + '})\\d'), '$1#' + newChar).replace('#', '');
        };

        var Bits = function(bits){
            this.bits = bits;
        };

        Bits.prototype = {
            pad: function(){
                var args = Array.prototype.slice.call(arguments);
                this.bits = pad.apply(this, [this.bits].concat(args));
                return this;
            },

            padLeft: function(){
                return proxy(this, this.pad);
            },

            padRight: function(){
                var args = Array.prototype.slice.call(arguments).push(false);
                return this.pad.apply(this, args);
            },

            getChar: function(index){
                return this.bits.charAt(index);
            },

            setChar: function(index, value){
                this.bits = setChar(this.bits, index, value);
                return this;
            },

            reverse: function(){
                var bits = this.bits,
                    length = bits.length;

                for(var i=0; i<length; i++){
                    this.setChar(i, parseInt(bits[i], 2) ^ 1);
                }

                return this;
            }
        };

        return Bits;
    }();
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-4 下午3:58
 */
BizQQWPA.define('util.getJSONP', 'util.getScript,util.serialize', function(require){
    var getScript = require('getScript'),
        serialize = require('serialize');

    var count = 0;

    return function(url, options, callback){
        var fnName = 'JSONP_CALLBACK_' + ++count + '_' + Math.round(Math.random() * 100),
            script;

        options.cb = fnName;
        url += url.indexOf('?') === -1 ? '?' : '&';
        url += serialize(options);

        script = getScript(url);

        window[fnName] = function(json){
            callback(json);

            setTimeout(function(){
                // set window.fnName when inside JSONP callback will cause error
                window[fnName] = null;

                // clean up script tag
                script.parentNode.removeChild(script);
            }, 1);
        };
    };
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-27 下午8:26
 */
BizQQWPA.define('util.cookie', function(){
    var doc = document;
    return {
        //domain,path & expires is optional
        //set false if no specified value
        set: function(name, value, domain, path, expires){
            if(expires){
                expires = new Date(+new Date() + expires);
            }

            var tempcookie = name + '=' + escape(value) +
                ((expires) ? '; expires=' + expires.toGMTString() : '') +
                ((path) ? '; path=' + path : '') +
                ((domain) ? '; domain=' + domain : '');

            //Ensure the cookie's size is under the limitation
            if(tempcookie.length < 4096) {
                doc.cookie = tempcookie
            }
        },

        get: function(name){
            var carr = doc.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (carr != null){
                return unescape(carr[2]);
            }

            return null;
        },

        del: function(name, domain, path){
            if (this.get(name)){
                doc.cookie = name + '=' +
                    ((path) ? '; path=' + path : '') +
                    ((domain) ? '; domain=' + domain : '') +
                    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
            }
        },
        //find certain string in cookie with regexp
        find: function(pattern){
            return doc.cookie.match(pattern).split(',');
        }
    };
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午3:42
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.events', function(){
    var events = {};

    /**
     * Bind event to node
     * @public
     * @param {HTMLElement} node The node to be bound
     * @param {string} type The event type
     * @param {function} event Event's handler
     * @return {HTMLElement} The node itself
     */
    events.addEvent = window.addEventListener ? function(node, type, event){
            node.addEventListener(type, event);
            return node;
        } : function(node, type, event){
            node.attachEvent('on' + type, event);
            return node;
        };

    /**
     * Unbind event from node
     * @param {HTMLElement} node The node to be unbound
     * @param {string} type The event type
     * @param {function} event Event's handler
     * @return {HTMLElement} The node itself
     */
    events.removeEvent = window.removeEventListener ? function(node, type, event){
            node.removeEventListener(type, event);
            return node;
        } : function(node, type, event){
            node.detachEvent('on' + type, event);
            return node;
        };

    return events;
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午3:27
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.onLoad', 'util.events', function(require){
    var events = require('events');
    /**
     * Add event handler to onLoad event
     * @param {function} fn Event handler
     * @param {object} [context=window] The context to add event listener
     */
    return onLoad = function(fn, context){
            context = context || window;

            if(/loaded|complete|undefined/.test(context.document.readyState)){
                fn();
            } else {
                events.addEvent(context, 'load', fn);
            }

            return context;
        };
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午4:24
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.offset', function(){
    var doc = document,
        isStandardMode = doc.compatMode == "CSS1Compat",
        docElem = doc.documentElement,
        body = doc.body;

    return {
        /**
         * 获取对象getScrollTop值
         */
        getScrollTop: function(){
            return Math.max(docElem.scrollTop, body.scrollTop);
        },

        /**
         * 获取对象的可视区域高度
         */
        getClientWidth: function(){
            return isStandardMode ? docElem.clientWidth : body.clientWidth;
        },

        /**
         * 获取对象的可视区域高度
         */
        getClientHeight: function(){
            return isStandardMode ? docElem.clientHeight : body.clientHeight;
        }
    }
});/**
 * @Class Panel Panel Component
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午6:17
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.Panel', 'lang.browser,util.Style,util.className,util.events,util.offset,util.css,util.proxy', function(require){
    var Style = require('Style'),
        className = require('className'),
        events = require('events'),
        offset = require('offset'),
        browser = require('browser'),
        css = require('css'),
        proxy = require('proxy');

    /**
     * Default settings
     * @type {Object}
     */
    var SETTINGS = {
        // container where panel to be contained
        container: document.getElementsByTagName('body')[0],

        // template of panel
        template: [
            '<div class="WPA3-CONFIRM">',
                '<h3 class="WPA3-CONFIRM-TITLE"><%=title%></h3>',
                '<div class="WPA3-CONFIRM-CONTENT"><%=content%></div>',
                '<div class="WPA3-CONFIRM-PANEL"><%=buttons%></div>',
                '<div class="WPA3-CONFIRM-CLOSE"></div>',
            '</div>'
        ].join(''),

        // template of button
        buttonTemplate: [
            '<a href="javascript:;" class="WPA3-CONFIRM-BUTTON"><span class="WPA3-CONFIRM-BUTTON-PADDING WPA3-CONFIRM-BUTTON-LEFT"></span><span class="WPA3-CONFIRM-BUTTON-TEXT"><%=text%></span><span class="WPA3-CONFIRM-BUTTON-PADDING WPA3-CONFIRM-BUTTON-RIGHT"></span></a>'
        ].join(''),

        // panel's style
        cssText: [
            '.WPA3-CONFIRM { z-index:2147483647; width:285px; height:141px; margin:0; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR0AAACNCAMAAAC9pV6+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU5QUIyQzVCNUIwQTExRTJCM0FFRDNCMTc1RTI3Nzg4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5QUIyQzVDNUIwQTExRTJCM0FFRDNCMTc1RTI3Nzg4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTlBQjJDNTk1QjBBMTFFMkIzQUVEM0IxNzVFMjc3ODgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTlBQjJDNUE1QjBBMTFFMkIzQUVEM0IxNzVFMjc3ODgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6QoyAtAAADAFBMVEW5xdCkvtNjJhzf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) no-repeat;}',
            //ie6 7 base64 hack
            '.WPA3-CONFIRM { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/panel.png);}',
            // css reset
            '.WPA3-CONFIRM * { position:static; z-index:auto; top:auto; left:auto; right:auto; bottom:auto; width:auto; height:auto; max-height:auto; max-width:auto; min-height:0; min-width:0; margin:0; padding:0; border:0; clear:none; clip:auto; background:transparent; color:#333; cursor:auto; direction:ltr; filter:; float:none; font:normal normal normal 12px "Helvetica Neue", Arial, sans-serif; line-height:16px; letter-spacing:normal; list-style:none; marks:none; overflow:visible; page:auto; quotes:none; -o-set-link-source:none; size:auto; text-align:left; text-decoration:none; text-indent:0; text-overflow:clip; text-shadow:none; text-transform:none; vertical-align:baseline; visibility:visible; white-space:normal; word-spacing:normal; word-wrap:normal; -webkit-box-shadow:none; -moz-box-shadow:none; -ms-box-shadow:none; -o-box-shadow:none; box-shadow:none; -webkit-border-radius:0; -moz-border-radius:0; -ms-border-radius:0; -o-border-radius:0; border-radius:0; -webkit-opacity:1; -moz-opacity:1; -ms-opacity:1; -o-opacity:1; opacity:1; -webkit-outline:0; -moz-outline:0; -ms-outline:0; -o-outline:0; outline:0; -webkit-text-size-adjust:none;}',
            '.WPA3-CONFIRM * { font-family:Microsoft YaHei,Simsun;}',
            '.WPA3-CONFIRM .WPA3-CONFIRM-TITLE { height:40px; margin:0; padding:0; line-height:40px; color:#2b6089; font-weight:normal; font-size:14px; text-indent:80px;}',
            '.WPA3-CONFIRM .WPA3-CONFIRM-CONTENT { height:55px; margin:0; line-height:55px; color:#353535; font-size:14px; text-indent:29px;}',
            '.WPA3-CONFIRM .WPA3-CONFIRM-PANEL { height:30px; margin:0; padding-right:16px; text-align:right;}',
            '.WPA3-CONFIRM .WPA3-CONFIRM-BUTTON { position:relative; display:inline-block!important; display:inline; zoom:1; width:99px; height:30px; margin-left:10px; line-height:30px; color:#000; text-decoration:none; font-size:12px; text-align:center;}',
            '.WPA3-CONFIRM .WPA3-CONFIRM-BUTTON-FOCUS { width:78px;}',
            '.WPA3-CONFIRM .WPA3-CONFIRM-BUTTON .WPA3-CONFIRM-BUTTON-TEXT { line-height:30px; text-align:center; cursor:pointer;}',
            '.WPA3-CONFIRM-CLOSE { position:absolute; top:7px; right:7px; width:10px; height:10px; cursor:pointer;}'
        ].join(''),

        // default buttons
        buttons: [
            {
                isFocus: true,
                text: '\u786E\u8BA4', //确认
                events: {
                    click: function(){
                        this.remove();
                    }
                }
            },
            {
                text: '\u53D6\u6D88', //取消
                events: {
                    click: function(){
                        this.remove();
                    }
                }
            }
        ],

        // use modal or not
        modal: true
    };

    // add confirm style to page
    Style.add('_WPA_CONFIRM_STYLE', SETTINGS.cssText);

    /**
     * Panel constructor
     * @constructor
     */
    var Panel = function(opts){
        this.opts = opts;
        this.render();
    };

    Panel.prototype = {
        render: function(){
            var panel = this,
                opts = this.opts,
                body = this.container = opts.container || document.getElementsByTagName('body')[0];

            // template handler
            var frameHTML = opts.template || SETTINGS.template,
                buttonReplaceID = 'WPA_BUTTONS_PLACE' + (+new Date() % 100) + Math.floor(Math.random() * 100);
            frameHTML = frameHTML.replace(/<%=title%>/g, opts.title || '')
                .replace(/<%=content%>/g, opts.content || '')
                .replace(/<%=buttons%>/g, '<div id="' + buttonReplaceID + '"></div>');

            // create dom element
            var frag = document.createElement('div'),
                frame;
            frag.innerHTML = frameHTML;
            this.$el = frame = frag.firstChild;

            events.addEvent(frame.lastChild, 'click', function(){
                panel.remove();
                opts.onClose && opts.onClose();
            });

            // insert into dom
            (function(){
                try{
                    body.appendChild(frame);
                } catch(e){
                    setTimeout(arguments.callee, 1);
                    return;
                }

                // when frame is inserted into dom

                // render modal
                if(opts.modal || SETTINGS.modal){
                    panel.renderModal();
                }

                // render buttons
                // can't get node when it's still in memory
                panel.renderButtons(buttonReplaceID);

                // set position
                // only node is in document can we get computedStyles correctly
                panel.setCenter();
            })();
        },

        renderButtons: function(buttonReplaceID){
            var replaceElement = document.getElementById(buttonReplaceID),
                parentNode = replaceElement.parentNode;
            parentNode.removeChild(replaceElement);

            var buttonOpts = this.opts.buttons || SETTINGS.buttons,
                buttonTempl = this.opts.buttonTemplate || SETTINGS.buttonTemplate,
                frag = document.createElement('div'),
                button, opt, evts;

            for(var i= 0, l=buttonOpts.length; i<l; i++){
                opt = buttonOpts[i];
                frag.innerHTML = buttonTempl.replace('<%=text%>', opt.text);
                button = frag.firstChild;

                opt.isFocus && className.addClass(button, 'WPA3-CONFIRM-BUTTON-FOCUS');

                // bind events
                if(opt.events){
                    evts = opt.events;
                    for(var type in evts){
                        if(evts.hasOwnProperty(type)){
                            events.addEvent(button, type, proxy(this, evts[type]));
                        }
                    }
                }

                // insert
                parentNode.appendChild(button);
            }
        },

        renderModal: function(){
            var container = this.container,
                width = css(container, 'width'),
                height = css(container, 'height'),
                overflow = css(container, 'overflow');

            var modalLayer = document.createElement('div'),
                styles = {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 2147483647,
                    width: offset.getClientWidth() + 'px',
                    height: offset.getClientHeight() + 'px',
                    backgroundColor: 'black',
                    opacity: 0.3,
                    filter: 'alpha(opacity=30)'
                };

            // ie6 or quirk mode css reset
            var isQuirk = document.compatMode === 'BackCompat';
            if( (browser.msie && parseInt(browser.version, 10) < 7) || isQuirk){
                // css reset
                styles.position = 'absolute';

                // scroll update
                setInterval(proxy(modalLayer, function(){
                    this.style.top = offset.getScrollTop() + 'px';
                }), 128);
            }

            css(modalLayer, styles);
            container.insertBefore(modalLayer, this.$el);
            this.modal = modalLayer;

            events.addEvent(window, 'resize', proxy(modalLayer, function(){
                css(this, {
                    width: offset.getClientWidth() + 'px',
                    height: offset.getClientHeight() + 'px'
                });
            }));
        },

        show: function(){
            this.css('display', 'block');
            this.modal && css(this.modal, 'display', 'block');
            return this;
        },

        hide: function(){
            this.css('display', 'none');
            this.modal && css(this.modal, 'display', 'none');
            return this;
        },

        remove: function(){
            this.$el.parentNode.removeChild(this.$el);
            this.modal && this.modal.parentNode.removeChild(this.modal);
            return this;
        },

        css: function(){
            var args = [this.$el].concat(Array.prototype.slice.call(arguments));
            return css.apply(this, args);
        },

        setCenter: function(){
            // set position to make sure it would not be affected by parent node
            this.css({
                position: 'absolute', // make it compatible for ie
                top: '50%',
                left: '50%'
            });

            // standard mode css reset
            var styles = {
                position: 'fixed', // reset to fixed in standard mode
                marginLeft: '-' + this.outerWidth()/2 + 'px',
                marginTop: '-' + this.outerHeight()/2 + 'px'
            };

            // ie6 or quirk mode css reset
            var isQuirk = document.compatMode === 'BackCompat';
            if( (browser.msie && parseInt(browser.version, 10) < 7) || isQuirk){
                // css reset
                styles.position = 'absolute';
                styles.marginTop = 0;
                var top = styles.top = (offset.getClientHeight() - this.outerHeight())/2;

                // scroll update
                setInterval(proxy(this.$el, function(){
                    this.style.top = offset.getScrollTop() + top + 'px';
                }), 128);
            }

            // batch set styles
            this.css(styles);
        },

        outerWidth: function(){
            return this.$el.offsetWidth;
        },

        outerHeight: function(){
            return this.$el.offsetHeight;
        }
    };

    return Panel;
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 13-5-21 上午10:38
 */
BizQQWPA.define('util.onIframeLoaded', function(){

    return function(iframe, loaded){
        // if already loaded
        if(/loaded|complete|undefined/.test(iframe.readyState)){
            loaded();
        } else {
            if(iframe.attachEvent){
                // for ie

                var handler = function(){
                    // clear event binding
                    iframe.detachEvent('onload', handler);
                    // invoke callback
                    loaded();
                };

                // ie support onload only using attachEvent
                iframe.attachEvent('onload', handler);
            } else {
                // for non-ie

                iframe.onload = function(){
                    // invoke callback
                    loaded();
                    // clear event binding
                    iframe.onload = null;
                }
            }
        }
    }
});/**
 * @fileOverview
 * @author amoschen
 * @version 1
 * Created: 13-3-17 下午3:16
 */
BizQQWPA.define('util.GUID', function(){
    function S4()
    {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    /**
     * Generate a GUID ( global unique identity )
     * @class GUID
     * @namespace util
     * @module util
     * @constructor
     * @return {String}
     */
    return function(){
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };
});
/**
 * get QQ version
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午4:05
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('wpa.getQQVersion', 'globalSettings,lang.browser,util.events', function(require){
    var globalSettings = require('globalSettings'),
        browser = require('browser'),
        events = require('events');

    // for cache
    // version = null means can't get version
    var version;

    return function(callback){
        if(typeof version !== 'undefined'){
            callback(version);
            return;
        }

        // for IE, invoke activeX
        if(browser.msie){
            try{
                var xmlhttps = new ActiveXObject("TimwpDll.TimwpCheck");
                version = xmlhttps.GetHummerQQVersion();
            } catch(e){
                version = null;
            }

            callback(version);
            return;
        }

        //for webkit and firefox
        if(browser.mozilla || browser.webkit){
            // browser plugin is limited in qq.com domain
            // so load embed tag in a iframe to break through
            var body = document.getElementsByTagName('body')[0],
                iframe = document.createElement('iframe'),
                proxyPage = globalSettings.srcRoot + globalSettings.srcPath + '/wpa/getQQVersion.html';

            iframe.style.display = 'none';
            events.addEvent(window, 'message', function(event){
                if(event.origin !== 'https://combo.b.qq.com'){
                    return;
                }

                version = event.data;
                callback(version);
                events.removeEvent(window, 'message', arguments.callee);
                iframe.parentNode.removeChild(iframe);
            });

            iframe.src = proxyPage;
            body.insertBefore(iframe, body.firstChild);

            return;
        }

        version = null;
        callback(version);
    };
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午8:01
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('wpa.ViewHelper', 'util.getJSONP,util.report,util.proxy,util.onLoad,util.className,util.events,util.Style,util.titleFlash', function(require){
    var getJSONP = require('getJSONP'),
        report = require('report'),
        proxy = require('proxy'),
        onLoad = require('onLoad'),
        className = require('className'),
        events = require('events'),
        Style = require('Style'),
        titleFlash = require('titleFlash');

    // wpa view helper
    var ViewHelper = function( context, wpa ){
        this.doc = context;
        this.wpa = wpa;
        this.params = wpa.params;
    };

    ViewHelper.prototype = {
        getJSONP: getJSONP,

        report: report,

        proxy: proxy,

        onLoad: onLoad,

        titleFlash: titleFlash,

        /**
         * 上报Performance timing数据；
         * 如果某个时间点花费时间为0，则此时间点数据不上报。
         *
         * @param {String}
         *            f1 flag1简写，测速系统中的业务ID，譬如校友业务为164
         *
         * @param {String}
         *            f2 flag2简写，测速的站点ID
         *
         * @param {String}
         *            f3_ie flag3简写，测速的页面ID
         *（因为使用过程中我们发现IE9的某些数据存在异常，
         * 如果IE9和chrome合并统计，会影响分析结果，所以这里建议分开统计）
         *
         * @param {String}
         *            f3_c flag3简写，测速的页面ID
         * （如果为空，则IE9和chrome合并统计）
         *
         */
        setTimingRpt: function(f1, f2, f3_ie, f3_c){

            var _t, _p = window.performance || window.webkitPerformance || window.msPerformance, _ta = ["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart",/*10*/"responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd"], _da = [], _t0, _tmp, f3 = f3_ie;

            if (_p && (_t = _p.timing)) {

                if (typeof(_t.msFirstPaint) != 'undefined') {	//ie9
                    _ta.push('msFirstPaint');
                } else {
                    if (f3_c) {
                        f3 = f3_c;
                    }
                }

                _t0 = _t[_ta[0]];
                for (var i = 1, l = _ta.length; i < l; i++) {
                    _tmp = _t[_ta[i]];
                    _tmp = (_tmp ? (_tmp - _t0) : 0);
                    if (_tmp > 0) {
                        _da.push( i + '=' + _tmp);
                    }
                }

                if (window.d0) {//统计页面初始化时的d0时间
                    _da.push('30=' + (window.d0 - _t0));
                }

                var url = 'https://isdspeed.qq.com/cgi-bin/r.cgi?flag1=' + f1 + '&flag2=' + f2 + '&flag3=' + f3 + '&' + _da.join('&');

                this.report(url);
            }

        },

        getOnlineStatus: function(){
            var helper = this,
                params = this.params;
            //指定工号、分组的列表
            var appointList = params.a;
            //自动分配时，无需请求在线状态
            if( !appointList || (appointList + '' === '0')){
                return;
            }

            var url = 'https://crm2.qq.com/cgi/portalcgi/get_kf_status.php',
                opts = {
                    kfuin: params.kfuin,
                    aty: params.aty,
                    al: appointList
                };

            getJSONP(url, opts, function(rs){
                var isOffline = rs.r === 0 && rs.data.list[appointList] !== 1;
                isOffline && helper.setOffline();
            });
        },

        setOffline: function(){
            this.addClass(this.doc.body, 'offline');
        },

        addClass: className.addClass,

        hasClass: className.hasClass,

        removeClass: className.removeClass,

        addStyle: Style.add,

        addEvent: events.addEvent,

        xssFilter: function(str){
            if(!str){
                return '';
            }
            return str.replace(/</g, '&lt;').replace(/>/, '&gt;').replace(/'/g, '&acute;').replace(/"/, '&quot;');
        },

        chat: function(){
            this.wpa.launchChat();
        },

        anonymousChat: function(){
            this.wpa.launchAnonymousChat();
        },

        remove: function(){
            this.wpa.remove();
        }
    };

    return ViewHelper;
});﻿/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-8
 * Time: 下午2:58
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('wpa.views', function(){
    // templates for all WPAs
    return {
        'a01': {
            templ: '<div id="launchBtn" class="launchBtn bg"></div>',
            style: [
                '* { padding:0; margin:0;}',
                '.bg { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAWCAMAAAB68gtgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REMxNzIxQUM1ODZFMTFFMkE2QUJERjZDOTBFMjlDMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REMxNzIxQUQ1ODZFMTFFMkE2QUJERjZDOTBFMjlDMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQzE3MjFBQTU4NkUxMUUyQTZBQkRGNkM5MEUyOUMzNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQzE3MjFBQjU4NkUxMUUyQTZBQkRGNkM5MEUyOUMzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvt6ESkAAAMAUExURand9oa71Kji/Wias/7rtJ3Y9aXe+f+yOqHZ9fdKLKXh/fvTkut3J/SbK//snv+lGv2rIo7I5a3h+vv7/PWxcpzT7CkpNcnO1Z3e/dCRMa7k/e+Waq3e9VqHnf/TLqLg/fnHeZZ6Wv/LVvrDZrl7ULHi+f+5QaHd+i5UaK6QdNF+LElxhf+hFYnB3JnW9KTb9WqUqpHO6skkF6rf+Jna+abc9qrh+vuHBIKzyjtidnKlvv/BS6nV68Xs/3apwbLg9ltrevOLGPu7FG+KnPJaQqzj/Mjt/7no/+Li4//GUYOjt5jV8v+fEvKFGf61K5HL5sHr/3XF7/rZr5XU87ni9/aTFbzp/7Xh9nvJ8LDk/PIUDrbn/vabF82EQ/mmFcLm+Lzk9/czFP7RapzF2uauUL+ab/iWFfumIa/f9rcOD7bm/aDf/P+wJf+pHUwtJUBGUf/89LTk+/fHp5rP526etDc3RJ7c+pTU9HyrwSIfKPqsKPOkWsbr/JfW9PanScTp+rp0Ov737e3y9pPT8ml9kEVvhH+20f308rPm/rHm/unt8f3WfFF8kf+7MYHM8Ux6kPX19x5FWJrc+o8xLOg4Idzl7pbV9J3a9//NF/L1+f713m6jvboyI50qFXWgtpvd/JzX9ZLU88np+ZbX9rDl/v/1yabf+5/f/prY9sDl97Dm/vihFm/B77Pi+Kvj/pXW9f+9Sff4+rbk/KHb95zX82y/7h4bJAszRvB/Gf+9M/++NLfo/rHl/f+4LgICApfY98TBvZfZ+P/cUJPU83mnvnKnwPSPGrLl/nivyvepOmGRqeipoXyaq3mwy6HX8bLV6n1GKqna8r+ylf2/Vt+lTMm2cO6KQP+rA0U+QouuwuiICImOnZK4y7Oztv+XBFB6kHZnXdQvHefKyFJgbeumBpLF37WKNv7hkqAYDtPb4/nm5neov83v/tybmsKwofS2i/GEEPOLFM/w/3Wsx/izR/ivS32qwP7uy5bP6fzo2qKBTLXl+4XO8Wq+7v///////8s3US4AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAFAklEQVR42qzTfVRTdRjA8bsmIDr3puDAXSVs7Cc4YDCmd6igOQ2VzTQ0FFEp2Yoh4YZ4MQrTTUWQc31L1HhRnJYaGOW1EjMRNHoly7I3MyPt3dKMwkbP795NFI7/+d3Ovds593zOc579RnTfvBd9mtm3sG7i5qI/p/RuvK+Z42f2NAe/vE31NZ8vMyu8d1mZYcTGX+a8yeV9bB3f+vXrX6qrqwvFvcx1H9cArhF8+/gUCkVm+Bt9ysokNk7xuueTaTr40lccffr0sWPHePlO+274gfDX+xR+AOOYnrqmIJim6SN5792yfbjReBc8J2dfNG8rDqSUl5uKbstUXp6C8flPQucL8k54jntOHMl7bB3Q6enpvGu8nQZ2AsXLAsc+gTanBSkULYrq6mqMFz3lwYm5ijj8UQ6fnxxc4Dm+5riHDk7GdmhoXRViWWoFlmNZlo3qGGCfgGMc+JqjRY4WpBVSWmcF2NUZKU1NRau8eL+9e8VFTU0pGYDjwbtomp8c7njs9PRYtspojGXHGo0U0uj7RzH2sainaLWGUjgETuf7bdWboIwUk6lohxcPE4nCpCYTxp/u6urKVy6lv9g+fPik78fQBap0VagqiL0hN8pDSaRfwdr1brcbke4R7k5Sre4s06rV5paW6dWbDAyJDEDrdBmJJpP0bx6fBfYGi8mUiPFX8vPzP9z1xJUxkz77ZsyVK7usKrlKXsXKIb2A7SiLcscD7mDc/p3IoVar25BguYZkzQaKMZw5gyp0UHaizWTpx+H9zolWirMsNlNiNuBg538ZN+/iRy9AcfM2P6gCtgrJ9Xq93M4Kokg37mfWvwOVAW5GZYxguRlwUmZAutUGjKcl2myWgedEQzyelaJzYvFIi82WmEY8jPFpwZvnLQ6cHBi4eEscXTAN46w+Hupg7TC5P+RAasoxHViSWi4QYlxI6oRIp6HehtIabFLLwH9EomXLRKLLYvFZi9TWAPizhw7lJ9Of/xp3MXDysHe/Kz0SfAlwO3sD4yQiTrF2jCOyEXIgA6N5HpKxMh11rYJxoZ1vQa0NUqllpAfWDQuHk3hdIpU2tGJcpaLpb3/aElg5eLDncOlSusAIbCxTRcTDaUnwpyhBTJCTMWO80cm2YXu/jBUKXS7GWbFzD641Qpor+cvj+V0EC4fekeTmRvjwNf+uDQyEX2NwZen95/OsgBNVDJzzU3hoEs55mSamsTHI4GQuMKSGw5HMhSq0iNRifGJEbq5kEADDOFs8COMTiYOwFlX7uB9+rDyM7a0PhbTjfcQTBPEBhQQJCQkxCY0aRJljzE4GCWV+MpJBbdEaykWxZP0eGWKuFdbXT4yQSCTZYas8q9YCffn6H/CVx5OSkj4O+WRo6eHK57aeCAlRcjIuwcGyZAwu6ALLGoQuP9z+TuHO/dHRxUJXffGeWq1Qu62wMDVCMhr01ln4TzSyNRvs0RGpxMGFSVarNfLk9gVLvh762+OTTkZGemUcJ/fn8/ODdw0EMlS8jau5trmwuTk1YDRX2jM7NgxKm8F9DkglXuPwUSUlJQ+MGge3yAVLbtkxPTaGcTXRfMXFHF4IcHNzba0Pn5F99Wo2b3P47rmAW+WqJKVS2d4OLHch7rQxXlPzKoTl6bjZUOHs1XypATN6J2kAXLl7YU8velvk6xFfc30l+bLywUxK69GzAb1rSB1CdP93L1pytG9Duv8XYACYZVDdZpPw6wAAAABJRU5ErkJggg==);}',
                '.offline .bg { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAWCAMAAAB68gtgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDY2RjEzNTk1ODZGMTFFMkFFNTJEMjNEQ0EyREU4NTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDY2RjEzNUE1ODZGMTFFMkFFNTJEMjNEQ0EyREU4NTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NjZGMTM1NzU4NkYxMUUyQUU1MkQyM0RDQTJERTg1MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NjZGMTM1ODU4NkYxMUUyQUU1MkQyM0RDQTJERTg1MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PghteEoAAAJMUExURdPT09DQ0M7OzigoKM3Nzaurq8/Pz9TU1NbW1tra2szMzNnZ2cvLy9fX18rKysbGxsjIyIuLi9jY2MXFxZmZmcTExIqKisPDw8fHx9vb28nJyWlpaZ6enry8vMLCwqKiojMzM52dnZubm93d3ePj47m5ube3t+Hh4bq6ut/f36qqqpWVlbS0tJKSkoiIiI+Pj7W1tb+/v2pqaklJSeDg4J+fn+Li4o2NjeTk5F5eXlVVVaenpz8/P97e3pOTk5ycnH19fbi4uIyMjLCwsKCgoHV1dYCAgImJiaSkpISEhEhISH5+fqGhoYGBgZeXl7a2tqOjo1RUVK6urj09PaioqJCQkLGxsXh4eLOzs3t7eyQkJGtra729vcHBwVNTU6amprKysnx8fIKCgmxsbHd3dyEhIWBgYF9fX3Nzc6+vr5iYmAICAiUlJZSUlI6Ojvf396WlpZaWlnZ2dpGRkampqYODg4WFhfj4+Ovr6/7+/vb29sDAwP39/SIiImFhYUBAQCMjI11dXUpKSuXl5fT09Hl5eVhYWB8fH+3t7YeHh/v7+39/f3JycktLS1lZWfLy8kZGRnR0dEFBQVpaWm9vb0NDQ2JiYuzs7GhoaERERPHx8VJSUi8vL3BwcHp6er6+vkdHR3FxcfDw8PPz8y0tLTQ0NC4uLvX19fz8/DU1NU5OTjc3Nzo6OjY2Nurq6lZWVu7u7u/v7zAwMOfn5ykpKfn5+WdnZ4aGhvr6+tzc3K2trZqamj4+PtHR0dXV1dLS0qysrLu7u////////w5icCEAAADEdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAadvLCAAAE6UlEQVR42qyV51caWRiHRy6jkcCAIoM6ExiMoNKLwFJCUcDee9dobNH0nk3vdXvvvfcKTAKM/9jee8Gy7p7dL3k+zGHOgYf3vO/vvpfYyD0L0v8CuUHUl/7yXIHaTTweTx2mEdOAOYDYj0jmqcKUYtLyfbvRpEmi/kay8IXS0r2YcohMJtsDeYoogRCQDOQJpAhRDBEhxJiKXGo3w5oKQl9b+PfW338d/9TXvynfsynf6d6SF/+/PJXDcuzueOur8auXDr0W+m+1vL6gjqqh2SDWiMUSyKqeJAO92m1mSFK/ShhqcT+M3z5yCIcFx6GvczLck50dKZRcDznB6fX6aFQkWnKKxQZgcMUlUkg3lGu/FBD5eXRCeTdh8OBGM59fEQ4nDguHxueRG4rbggA8sqGqFwAA/pWiVX4bjYEzSCQG0HPR2SOVUlR31GjsPFqQe944tzdmNEa7iR4sL7867spXDl7Md+QWaCshRkA6k7kebH0i93P1RUr/Yl9Xd5ers08sdsbLEj0PAMP4eAdFUccNg4Odb+flDUraq4wNDhqOE/Y6OEHZ03fHR8rSIetIYu073I9JgIrOzAczRwBqcxE/Uazn1V0cz8VJXkLypIvhfeBBy7q5GmLqCQRi3+flMi/toNyBQI+pIBe99/oPCWtXV4f/lXksbwO418dA86If5+MgB+XOpSZD51Kcl8QB6IPd4I0OM3sKye0zM24Pltet0tmkmp2ZsZsIcx0KdWi+bW76dt/txYmuy2fQFE8H8RTrQa9/AqejCYg0qNsAPaSUmz9l7mA4+HnaqlAoQubWVnemhjYIAknXlCb3sa2t5hAx2gijofv58VjHUNhkKzszcumbMKz5IMCJ7gf6RT8OdIIXZ2madvLw4bNTPobtWLZOL0/qIpUQy2hvLys9Z6OfiOihTDJp1/X2jlqI2UY4v4m1l3OvxofcdpXs7h3uMpTngBfKiyeCsOQoOiq8U+J0MT6OmWYYrqUFAD6iUESu6ThdpVwut8xqtewHQjntbaJVMIopnVY7ayGGG2A0wBrz02nLhbP3z5/9MXjnCmxI0cJnB4uLT4Bukdjl6pRM9XF2KcNQzEuOdraatypCs5OTlZVhbiA8d0+pVJ4cjsXYlCBM0fQsyvkxXSw2fJJoRvK1hYWjoZNwGs9/cm7k2IdIDicIwPUmVLQT5nyJlEK5EXa8nR/lrYPL0wMDlffauYfy9jkoH2p2u9kw/L3RWIXkYZ3b3TwE5TAbEmm86uafwvn7N2s9CTHqNpqh2hXUosUhgclz2SmKYapZ86iCtQ5Yrdciloft7X80D7zDpVUqlW2FZVmT4zfh6BdQvSdrg68rNmLlADrkxjFT5u7ZCx/fUFs78m68lRIAOOHmkEov+gBoaWmphsFQTL65jNosnwsrlarmj8ZUKrXa1q+DmNaT54VkVc5iQm/9NqL/ANoeYwGarjFLh2vOBCIRmOqthYfVMNEUOipIjbKB1HJoxqgRR1I1iLTl1AvVaUsFfkkdIVL7S+BhOX4rMtZmUZS9f+J0mwnVnfdumins3RIrEQWtWoPwZgvXz3oZvV74mPUSqcanW/t0+xrIq6Wbalz0383IrckzNTXlJSt2w5q9RDZTt7/Azrtr607avJS2d/COBY83MaIpSu7G3EQSG9lnQbrsn5AbfwkwAJbmZ6rKR8LPAAAAAElFTkSuQmCC);}',
                // ie6 7 base64 hack
                '.bg { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/a01.png)}',
                '.offline .bg { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/a01.offline.png)}',
                '.launchBtn { height:22px; background-repeat:no-repeat; text-indent:15px; line-height:22px; cursor:pointer;}'
            ].join(''),
            init: function(context, helper){
                // add stylesheet to iframe
                helper.addStyle('style', this.style, { context: context});

                //绑定事件
                helper.addEvent(context.getElementById('launchBtn'), 'click', helper.proxy(helper, helper.chat));

                // get online status
                helper.getOnlineStatus();
            }
        },
        'a02': {
            templ: '<div id="launchBtn" class="launchBtn bg"><a id="btnText" href="javascript:;"></a></div>',
            style: [
                '* { padding:0; margin:0;}',
                '.bg { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAWCAMAAACynuG2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjgwRDMyQzM1N0VCMTFFMjg3MDhGNTMwM0I0QjFCOTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjgwRDMyQzQ1N0VCMTFFMjg3MDhGNTMwM0I0QjFCOTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCODBEMzJDMTU3RUIxMUUyODcwOEY1MzAzQjRCMUI5OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCODBEMzJDMjU3RUIxMUUyODcwOEY1MzAzQjRCMUI5OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PseL9VgAAAMAUExURYV7OJnW9K3e9abb9qvAjbHi+aTb9Zna+X3K8HLD7yR71JzcsksrED2b+Jrd/Fe7+bno/53c+prY98Xs/3JYAJHS8nbe+ane95u7jKHN4rTg9rHg9sjt/6jc9ikyjXNZOavh2MHr/7ni94LN8bzp/5qbYxRYY9ODBDAuM5XU86rE1MLm+Jfa+bzk97Dj+6vY7q0YEsqWQp3Y9as1L5jV86ng+ktFTazj/q/e9bbm/KXU6Z7e/Lbn/pTV9KPg/PuIBJTW9p7O5Zze/pLU86Da9pva+KDf/KLg/CMAY6O/jqCdZKnX7JzY9cbr/Kbh/JzL4sTp+q/k/qLg/rlrApnc+5ra1gBYsqLe+5ve/f+oA57L4bTk+qDY9Kjj/rNlAsN2Aani/aTQ5ZPT8qLa9uSYAJfW9Cdas6K5yJ7a97Hm/qfesq7i+4bd+7Tm/u2hAIXZ97Hk/JvH3AwHEazk/qbi/qDg/qbe+Inf/OmdAN2VA5bV9KTf++CUAKbf+j+e+6/k/aji/aPa9G7B73ri/AAyjZ7g/p/c+pzX9bTi+W/b+Mnp+bHl/ctyBarj/qTh/p7f/rTa7I7g+17A+6zi+6zf+KDe+qLc+MDl90Og+7Dm/my/7qrk/qTi/qLc95/b+CQAALbk/KnitKTd95zX8459OSQbHtmMAWE0ZVsyADwAAEMAAEEAZD0AOQAAZAAAOUQAOfXLCv/3m/G7AP3lH/////nYE8XBvPLAA//uLq3k/pXX9qfi/qHa9rfo/pLT89mUEr5xAv/JApXY9+ewDteNCabh/rLl/aDZ9aLZ9Jza9+KhA+CiDNOFDcx0CMt+AeStGaHd+6Hg/uu+H6bd+NB7BKzh+q/g+OiJCLuGQ//CAs3v/mg0M6XY8K7b8K3d8yZ/2P+/Es/w/5jX9v+2AmLD/YLYsJbXsK/Dj7Pm/oEzMNqkPJ/Z9afg+qLf2GDAsiczAG5+kIW9jnfG75WAOZvK4eStN4LY9v+YBCdajqnh+4eSnoiaqGq+7oXO8QAAAP///z4F14oAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAEUklEQVR42qzTe1hTdRzH8cMt4ADN6YCxEXgBB6jTLAg2Ni6DkKGCimMKCQSbxRLmTEJlIDQR5CY8REThajHjotgF5LYmokJ5BRG6mkUllFZGdqFi9P2dsyMP/e3rPOc5/72fz+/3PAebnXl4ZrGZVd+4/98iypJFS+Z4ocdsASV4jpduBlv2udeHIDgxMIbH48V8xZ0EzyOvlW4C3d3de8Dr5c8gvS+CNyrA5s3Dw3uRQ4cqQXi4dK8X1NwhFRzEPuoXEOCjD/BbbTMwOTkwUAo2kbWnkPKUlJSDvb29Fy6QKRSDWiVZQqTSXUQNViYe3aki7bzJNcdK80E3WSuH2kFU2wgqKoTCqKjh4aeRyko+n0/EpLuWYXbuwUFBQYF+KtXpdsf20yqVXw20lPkTWhPlFux661T1RpJQKPypKS8KQnyHVpdwPl+K5T1KGKBqq/9Wqdod7zm2q1T/xBCrJuT5pZ7f7Vn8zsspKNZiDgvRrCix5iVU44slGR4vSD1p8QwUHLDD7DZALIin96G26XlKpZLLnZD/Zp7WVj3daKpDs6I9qg4wHkw2Sfh0LC/a41dtHgOPB0pzjb1d7/PJ2bOffbstRK/fbcnlKhQTcoXC85c62DY93aip8qw+cFesqUogvDJUVEQ3i2eYnBhtNFtb25VcVHszke32xRNr1oR8ve3PEPj+sJtXo1BY/9VEbajzV6szWuoYEnVCwtDQENxaUREmodO3Nplwb5MEQg7NTmRtakNiYszvmTmZIAekp+fm/siDmnxUwbjlj9xVAzhsAhGL1rZVF9HFpjYaPdIbR5s8aSsJyimilpr53jzHw0ZHreWLyXEnXdTZ2dRt4UPikyVMjyyHEzTmuhKoObSWQG1rk1N/f78N1OKKi1NzurquXztz+cqVy2euXe/q4oTV1EwsP/Vzq4u/f0arC7R8cJ2utrZWjB9DMAkD/zgycuFCb7yf6fF9M86AWE/P2BRmH1dsk5r+wTxXoWYtZ2e0kNt0Ol0j3tBgMByD2nPAoVmTBS1Uu/dHKLb8BE3UHxoaOmZP1nI7Os5dOs8pK+Ocv3SuoyOZqLmC7OyRkRGdrqGROim0mNo2GlMrgdg4ZsJvN2tKmFq8Z67mdvzdefrCXF2t5/4FSUNDI24wREREiPE7DJMmaz2aBelxzAkzOQn2C243S0QCQY09VhjHYrtxOjsv7uPcKCu7wdl3sbNzSyza9RiwsrJ6BKSlGQyGwTvI2vXgsIXF+LiFhUwmE8gEQIRe0VghVriCzXa7+v48O2KJlLmVBq3BQWitBYeBBUG2HwgEvkAEjEajZSFWD7XUx5OT+/r6toAdyKdhZAvNKiiAXaiFYsQqsiWToRaaRDIanS3rsfojLPbNVDewnRR7/37Yl+ZdBeAjMJiUlASz3gYo9STiS3gWwCyjs7OzLwtqgUdWzHnVbBVl6QOspSwKmxRIsKSwnOux2X8fntn/BBgADuEZDumqRHkAAAAASUVORK5CYII=);}',
                // ie6 7 base64 hack
                '.bg { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/a02.png);}',
                '.launchBtn { width:77px; height:22px; background-repeat:no-repeat; text-indent:15px; line-height:22px; cursor:pointer;}'
            ].join(''),
            init: function(context, helper){
                // add stylesheet to iframe
                helper.addStyle('style', this.style, { context: context});

                //绑定事件
                helper.addEvent(context.getElementById('launchBtn'), 'click', helper.proxy(helper, helper.anonymousChat));
            }
        },
        'b01': {
            templ: '<div class="main bg"><a id="launchBtn" class="btnText onlineBtnText" href="javascript:;">QQ交谈</a><a id="launchBtnOffline" class="btnText offlineBtnText" href="javascript:;">QQ离线</a></div>',
            style: [
                '* { padding:0; margin:0; font-family:Microsoft YaHei,Simsun;}',
                '.main { height:151px; background-repeat:no-repeat;}',
                '.bg { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAACXCAMAAABA3KcjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkJDM0NDQUQ1QTJGMTFFMkIyQUNFOTQzRDY2REIxRkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkJDM0NDQUU1QTJGMTFFMkIyQUNFOTQzRDY2REIxRkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQkMzQ0NBQjVBMkYxMUUyQjJBQ0U5NDNENjZEQjFGQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQkMzQ0NBQzVBMkYxMUUyQjJBQ0U5NDNENjZEQjFGQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmbFT60AAAMAUExURer0+dLl8I+Okf3MMZWlr83X3SMgJn3O9e0zJAMEB6a3wF4fHDI2R/ibHeUqJczx/4PO9neLl4bQ98Lt/yIfKuXx+OZgR29ucYjS9tgnJvz+/vP4/Mnc56Pc+f2mGxQWIll0hLPi+eHu9b3f8bghJP63F9jd4NTh69jo8ZPW+ElbaOHi4/vjVZUyLP1ONs7j8PL09jlLVqXW7pHV92Lo+/A2JCgnMsfHytLa373r/7jp/6rf+Z3Z+Mqtr43T93KVp7TDzMrg7bS2uN7p8LQYGJLZ9fn8/v7GG9b1/7nK1WV6hcYkJYlRLvzZQvq3Jtbo8uH6/5NxdZS5y+b8/46eqKioqsXu/1lqdmpIJlJYW4sZGo7V+IuuwLvq/+vr7O/2+tmRHuzx9BcgKL/T3dvk7JrL4935/7jk+ktQVJnZ+P/fH0BEW41HSWiIma3g+abI18LO1bLa7tzf4ap0IYrN7qW1v4e0yjU1O8vg697s9HyhtEphbovS95vS7b15edDz/5Pa+k5jcPj4+URHS1VodOnu89HQ0bKIIahHMayTllBlclRtephnI9zr9M9POby9v93b3MeEIOvKyqseH9r3/5nD2IbS8S8TEYrU9+Xt8puAg4HP9ePv9t4fJeLr8c+mIN6xHFZgaPf7/XzM9Nnq85bW97ykp4y+2cEWGaq/yXx/g6CtteDq8OP7/4rU8jUrJ1xsdnypwO0uJN7r8YSUns7e6bFZQ8bh7cF+ICE2RMDo+d4vJZfX+M0kI9vq8dvs9t/n7oPQ99Xo722BirsyKpJdYZscHs7i5YzW89fn8C4uO8/k8OTq8IfT8Ts8TWFxeerw+MTp+tvx9NbW15DP7/Q+LcLn+z0bIPb299ju8kxNZPvoXuPu+b9hZIk9Px4dIjzC9MDs/7fo/8jv/9P0/3rL9I/Y9ELD9Pv7/Kfd+Us3KGGEl12NpFxcYOHf4GRkaKzQ4fPg4IIkI/Dv8Pr08+wnJKGfob7l+sbn8/GoGsPr/Mvq9efn58zh7P///////0noCo4AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAASFklEQVR42ryaD1wU5brHAWVkBEm4W7joOm6tGSTKwmXw3t3YJLQTkCVJB5a9oqMeJGURvblqaMWmWUuid49h2p9DxlGwINA6JdA9/ttjWy2UkV4th3s7dli8ShcvcOriep/3ndk/M/tH+qz2m0VmZ2e+72+e93mf9x3WkBs3NsXcHm06dyPkxon199wWzW2I6Q3R6FImVVZOgm0Pp8rKyiIvJbhU9ByvhOf8qPS5UiTZ8PhNIabN+/ZzGufSxH3O7ZiX9k3iFTvJj5BF5Eh9T3bIC5td2H14G7dv30SXYsWa6BfqAedvuKQz5IWv3Z5dcIAI6C6/3D4AxEgB3jedcz9xIqZMnAhxAFglVgYS/IaL+b09XDMZPCu1qOh0EeynusynyhHdI+D79u07BryMVHQ9doz28YZ6NLUIwKm8inCDRXg/IaF9Xj18DkehfciPDIT3ph+blJFa395eX58KLcBZcKHm6/r69gMt6s2bS+FwArwpVatLS9vrcQ7B2/b20lI1bHAsoSgDZV/lHnQbIjqGJ6jVLYxara6vBy8J7eoDZItaLdOQKWUfw067UqOWyTQf22UyNSKqlejTAx+vkCGpAY/No2B602MrU9UylUlpt6OL29vhSlOiHaQjK+QaZrO6vYXR2PXKbLleb8e8TaRGpUokeR1oT83AoUFdJX9fRJ/036RASvtuMi9Fr5cDvaJifctmtfqAUqVzfb7Zbm9J1GvK9CqVSq/aTR5QJ6DQcCOTo7vGEtAz6mWqbINcDqeDfZlMbzKVJJpi6pRcY+tlMrteb1AO58G9yJWJwJTr86LkcAG8ODpOS5RUXvTYolJ7CqMpkctNJsDL7HnMjzomT3mikzyUV1EBh+wpiTrlj0ePkOUlOiZFBa3qnskrQZLLd5Mr1PUueqXey3uqWlWGrABdD8FXmRhlVMzwN9+UkxVfDsMd2e0mpbykpCIqSolvUKVndCUV3I2V7CZT1O0ZzlGF6f86zoNeWS/bTW7i6HIVeNfFxERVHB2+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);}',
                // ie6 7 base64 hack
                '.bg { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/b01.png)}',
                '.btnText { position:absolute; top:124px; left:12px; display:block; width:69px; height:22px; font-size:12px; font-weight:normal; color:#000; text-align:center; text-decoration:none; line-height:22px;}',
                '.offlineBtnText { display:none;}',
                '.offline .onlineBtnText { display:none;}',
                '.offline .offlineBtnText { display:inline;}'
            ].join(''),
            init: function(context, helper){
                // add stylesheet to iframe
                helper.addStyle('style', this.style, { context: context});
                //绑定事件
                helper.addEvent(context.getElementById('launchBtn'), 'click', helper.proxy(helper, helper.chat));
                helper.addEvent(context.getElementById('launchBtnOffline'), 'click', helper.proxy(helper, helper.chat));

                helper.getOnlineStatus();
            }
        },
        'b02': {
            templ: [
                '<div class="main bg">',
                    '<a id="launchBtn" class="launchBtn btn" href="javascript:;"></a>',
                    '<a id="laterBtn" class="laterBtn btn" href="javascript:;"></a>',
                    '<a id="closeBtn" class="closeBtn btn" href="javascript:;"></a>',
                    '<p id="title" class="title"></p>',
                    '<div class="content">',
                        '<h1>免费在线咨询</h1>',
                        '<h2 id="subTitle" class="subTitle"></h2>',
                        '<p id="plainText" class="plainText"></p>',
                    '</div>',
                '</div>'
            ].join(''),
            style: [
                '* { padding:0; margin:0; font-family:Microsoft YaHei,Simsun;}',
                '.main { height:172px; background-repeat:no-repeat;}',
                '.bg { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUcAAACsCAMAAADfY56sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0Q5NzNGQUE1N0VFMTFFMjg2QTNEMjMxNjY2Qzg2ODMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Q5NzNGQUI1N0VFMTFFMjg2QTNEMjMxNjY2Qzg2ODMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDRDk3M0ZBODU3RUUxMUUyODZBM0QyMzE2NjZDODY4MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDRDk3M0ZBOTU3RUUxMUUyODZBM0QyMzE2NjZDODY4MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlmhGQQAAAMAUExURafe+KW3wGRvdnTI8cvZ4vP4/O/2+9Hk7fviVJtgYtnp8vhQOHeJlrrq/9L0//n8/pamsJdjJ42NkfL09uHu9fzONFl0hHC22dHk8CMgJl5ob+0yJPj8/vL2+nLH8GEgHfibHWp5g4vT9eYpJczx/83i7XvM9Mvg6zU2SsLt/+jy+eHj4yIfKtpfSNgnJrfDyofS88jd6P2mG8/j8NTm8bgiJExRU7jK1FFcZv63FxcYJHfA5NbW148vLJGep97g4ignMdbo8jpDU/A2JMfHygsNFL3r/4PP9cqtr3SCjLa3ubQYGNzq8f7GG/T6/P7+/vj5+8YkJVJYXPq3JsTV393s9OH6/+b8/77S3Kalp8Xu/5LZ9XrL87K+x2lJJqO0v+no6IkbHNWRHnrM89nj6+b2/N35/3/O9f7eLNzr9MLO1W2Qpfv+/maHmRkfKzU1PEFEXH3M8nbJ8pS3yOr0+kJGTPn4+a56IKyTlqPF0+vy+Nno8MWBIO/x8+vKyqoeH9j2/zETEeru84PL7uTw9trq856stah6fNDe6d4fJd7s8s+mIN6xHMPo+rOqrHbH7cEWGeT7/0IyKKu+yN/n7u0tJIOTm+7z+uDs887k7sbh7fz8/CMzQN4vJbTZ580kI9zt9vX397k7LpocHtLg5tbr79bm7y4uO+Tq8PT+/j48Qn7N8+nv+Nvx9EPE9Pv9/vg/LTscIHvK8fn+//X299jv8+Lr8UxNZO/0/PD0+ePu+Y5EPB4dIuz1+vb6/XzN9Pj8/erz+vH4/HnL83fK8vb7/ez0+v3///3+/3jK8nPI8XHG8Pz+/u31+33N9H3O9XjL833N9fz+/zzC9Ljo/8Ds//X5/OPv9sjv/+71+3nJ8HzM9I7X9JXE2/39/X7I7vv///f6/Pv7+3PH8Ons8HnK8uzx+q3O2srk8PP6//r081thZv79/v7+/fL5/15cX77m9mSkxe31+erw9v7///X6/e31+u72+/T5/PL4/PD3+/f7/ev0+unz+czh7P///+xwhygAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAX30lEQVR42uydDVwTZ57HgdLlxFyLiMCMdTFSCqeRgCQSBxgmgVkbsEUotLBtkFhcF1Riq9G66lGrAdq9iiWSgkKhhpJ+aHfV6tXtktvb7l7Xdl/avfW2dne7dre1lU8h5/kxu+6bev9nZvKeYIAAmZhvwiQMM4/m6++Zef7zBBNx8+YmQRhvKIX+oIQtN928GXFTsC0ijDd+/7w//B623Ca4GbFpW8TqjWG8kLTEH5I2blwdsW1ThCBi9QdhvOGnR9hyNVgURPx3GK+4eszav39/Vha7dPEIWz7BeNz4fhhvJC3Jctyy9ucB7AKJtP8g6YP333+N8fj+f4bxwuN5WU7s/2T79R9dSUravn37J6udf5AHm74f9jgOSc66Vn+StGHDtStLN2xIcvWY9EHY4/jkrXZmfx6I3LBhaVLefqe1WasdefzdfWG8kbfRReQnSVfA4xWIowt5v7zvvt+FPfrmcdc8bkQelyKPLno35t1n8/jY42G8kec8KH/tk7wr3+8HkvI+ec35B5DHx+9jPN4XVnZrj0+0J0liYq4kx8QktT/htP6DPNjyMcbj54+F8Ub7715z8EZednb2laQrsMx7w2n9a+3vwaZsv/5xGC983u588n6jPS8pCQbhsGh/w2n9E+1oU7CojPg87Mwr7c5nncd+297e/uR7T8Lyt4897vQD5PExsKiM+PEvw3ij3a+jaDts+R7Tr3/7XhhvtPt3FIUtP2fy+N5/hfHCe3f4I/vzO2DTJxmPT4adeeVJ/0DKWY9hpsgdjMc7wiKmSjiPAeGnjMev3hFmarB5DHuYKj9jPP4sLGKqsHn8aZipweTx0fbPwkwRJo+ffTXMlPjss0eZPIZNTFUke54JM0WYPJ5614o4a+NdF37F8XMnNm8+Ph53e3DPDzn+7oV3gB/Y+JMLf/HKnXfe+VdnfsTyN698xc41J37zi1/82cF/2PgJ8A8XtjO8beO6B0sZvgUeN1sD7PH49Hu8c2Y9br+Vx6Uoj+N6fDcgHu8J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);}',
                // ie6 7 base64 hack
                '.bg { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/b02.png)}',
                '.btn { position:absolute; display:block;}',
                '.launchBtn { top:145px; left:173px; width:69px; height:22px;}',
                '.laterBtn { top:145px; left:248px; width:69px; height:22px;}',
                '.closeBtn { top:0; right:6px; width:39px; height:26px;}',
                '.title { position:absolute; top:1px; left:17px; height:30px; line-height:30px; font-size:16px; color:#000;}',
                '.content { position:absolute; top:45px; left:114px;}',
                '.content h1 { font-size:24px; font-weight:normal; color:#205b84; line-height:34px;}',
                '.content .subTitle { height:22px; font-size:18px; font-weight:normal; color:#225e8d; line-height:22px; overflow-y:hidden;}',
                '.content .plainText { height:14px; margin-top:10px; font-size:12px; color:#2f6b99; line-height:14px; overflow-y:hidden;}'
            ].join(''),
            init: function(context, helper){
                // add stylesheet to iframe
                helper.addStyle('style', this.style, { context: context});
                //绑定事件
                helper.addEvent(context.getElementById('launchBtn'), 'click', helper.proxy(helper, helper.chat));
                helper.addEvent(context.getElementById('laterBtn'), 'click', helper.proxy(helper, helper.remove));
                helper.addEvent(context.getElementById('closeBtn'), 'click', helper.proxy(helper, helper.remove));

                var params = helper.params,
                    title = params['title'] || '',
                    cot1 = params['wd'] || '',
                    cot2 = params['wd2'] || '';

                //填充内容
                context.getElementById('title').innerHTML = helper.xssFilter(title).substr(0, 14);
                context.getElementById('subTitle').innerHTML = helper.xssFilter(cot1).substr(0, 10);
                context.getElementById('plainText').innerHTML = helper.xssFilter(cot2).substr(0, 16);
            }
        },
        'b03': {
            templ: [
                '<div class="main bg">',
                    '<a id="launchBtn" class="btnText onlineBtnText btn" href="javascript:;">QQ交谈</a>',
                    '<a id="launchBtnOffline" class="btnText offlineBtnText btn" href="javascript:;">QQ离线</a>',
                    '<a id="laterBtn" class="laterBtn btn" href="javascript:;"></a>',
                    '<a id="closeBtn" class="closeBtn btn" href="javascript:;"></a>',
                    '<div class="content">',
                        '<h2 id="subTitle" class="subTitle"></h2>',
                        '<p id="plainText" class="plainText"></p>',
                    '</div>',
                '</div>'
            ].join(''),
            style: [
                '* { padding:0; margin:0; font-family:Microsoft YaHei,Simsun;}',
                '.main { height:102px; padding-top:175px; background-repeat:no-repeat;}',
                '.bg { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAEVCAMAAADzZbruAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEFBMzNDREQ1QTMwMTFFMkE2QzVGM0E5RkRGREM0OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEFBMzNDREU1QTMwMTFFMkE2QzVGM0E5RkRGREM0OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowQUEzM0NEQjVBMzAxMUUyQTZDNUYzQTlGREZEQzQ5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowQUEzM0NEQzVBMzAxMUUyQTZDNUYzQTlGREZEQzQ5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrpsMxwAAAMAUExURfviVJxgYuHu9XjK8vhQOLrq/9L0/3eLl4XQ9ZdjJ/zONHC22I2LjiMgJu0yJAMEB14fHDM2SPibHdLk7eYpJczx//j8/Wh6g9Hl8O7y9c3j8ElbaMLt/6Hb9yIfKtvf4dpfSFl0hLjJ2dgnJv2mG+jn6DhLVpLV9oLP9bgiJJ+1zf63F8zh7BYWIdXV1lhjZ1prdnjB5dno8pzZ9szZ5UF0pZUzLWV0e4nS9dbo8vA2JCgnMsfIyqje+IWhwVJZXL3r/3/O9crg67XDzPr8/sqtr/L09rO2uLQYGKbW7v7GG9Pm8UxRVMYkJfH2+3GkvYPL7trj7Pq3JuH6/93f4Y3U9piqtOb8/5LZ9aWkps3e6d3r9FWArMLQ18Xu/6TG1nzN9GxKJmeMs4sZGo+bo77S3NWRHqG2zmaImXKGjxEfKeb2/LHh+N35/4Ssv6S0v8TT4P7eLN3q8e3z+JOhqv39/UBCWm6Aicnd6GlmaZPL5jU1PM/b5sHN1Hh2eYzS9dzr9Nrq87jk+bDZ7HaXupjE2JnR7ERHTKW3wPj5+a56IH7M9Ku7wqyTlqre92Btc33N8728v8WBIIq2y3WWpuvKyqseH4O71WySpNj2/y8TEejs8qy/1Kbd9/f6/XnL86h6fN4fJeDr8s+mIN6xHMPo+qWts67g+CI2RLykp2abtsEWGeT7/4fT8dvs9ojQ8jUrJ66/yajCzFBreNTg6u0tJIOUncvg65OtxXvM88nW333K8Mbh7Slmnd4vJc0kI2CElro7LoKhr5scHs7i5dbr74zW89fn8C4uO8Xc6JfX9js8TPv//565xOrw99vx9EPE9Pf9//g/LT0bIPn+//b299jv80tMY/v8/ePv9qrP347B2o1EPVxweh4dIglZlnfK8jzC9H3N9bjo/8Ds/8jv/4/Y9Pv7++bx9Es3KPPg4L7m+fDv78bn88vq9V9eYYIlI/r088Pr/PX6/PP5/Pj7/fL4/Pn8/vX5/PP4/PX6/ff7/fb6/fT5/P///////yIXGEsAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAaWUlEQVR42szbC1wT15oAcK3uBYQ4PijYsokaIDzsQBFRa3gsloJUEdML3stKVwEVTb25VIqvcHELVHwVRV20Aop0t7jVVnrxWYtoubdSaOnval1ptZnq7l5/rN3VNqbYBOJ+58xMMjN58HAS74cEMknmn+8735w5Azji0aN0D7Fivf9gYj08M/3RoxGP1mtS40SKt/5tMPFWXFyqZv2jEemaOM9EkcI7czDhnZjoWadJH+GRKho8eDnRM9VjhEdc4m0Hwd3p7YFjWaL3bG6cOLFo0QnmlhOZ3mjXcXyZx1jV0NBQQXKCt8XuwTuTI3guioraH0Xf8GjvxNuJt7HMyxIr1u9ReOIItQYrWx+mty6L8uSmHPXaa695e3vDLW+7ZxTaex3IdbvpgD154mewDLrnCR+zN0OgrfiO5QmWDfAgvS0xKhS/gPlYhND3Eb/ohCdnO1R7926cMwPDvmZnhnSEhGRuxruHPYa8vygkM/NGesemTfB182ZojxAU9DNmWzfAo5mzPXdEeXLixKIoRAMctYi73TMKcXTOy5YtwxnPDumITldHIxwxIR37ifTojugDxJZVR9Nhq+L9Drh3NBo9A4UivaOjY//RGx0oQjJnh0aFcoXQ897pAKd7n/fky4fB48oIlsY1K+qk0WhH8C6imwOk0jqphkhtPKDe0hGSrj4grVNMjYuDpwDf8T5xQCoNIJjYnzk7KpQXWH4HZP7mqGV8OdRzFcELhfQGsTc1rrJRQ5SVpe5N3wL5Keo0lse3REs1AdIDq+C9wccNYn/I7ChPHhzl/eGHHz71oXfU+UQn8u7Q0MwOaeVU7ZrGykqck7Sy+fk1Ac0eAQr6jeyFTXVxWkXpl0RZY6UCygF39x6Fp8dVVlYieTMvucQo74nzJ70/aeJE76gdnM0WeXXcORS7Ez0zO+pS1fvWrGlsbo6TSqOle9XfaiR7Feu/I85+WZYKb0a6JUCj+LZ0H/HWGo16ixTekSZgb2ljY+Oaxsa3iBsg7+Yc4+ej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);}',
                // ie6 7 base64 hack
                '.bg { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/b03.png)}',
                '.btn { position:absolute; display:block;}',
                '.btnText { top:250px; left:18px; display:block; width:84px; height:22px; font-size:12px; font-weight:normal; color:#000; text-align:center; text-decoration:none; line-height:22px;}',
                '.offlineBtnText { display:none;}',
                '.offline .onlineBtnText { display:none;}',
                '.offline .offlineBtnText { display:inline;}',
                '.closeBtn { top:0; right:6px; width:39px; height:26px;}',
                '.content .subTitle { height:18px; font-size:14px; font-weight:bold; color:#095996; line-height:18px; text-align:center; overflow-y:hidden;}',
                '.content .plainText { height:28px; margin-top:14px; padding:0 5px; font-size:12px; color:#2f6b99; line-height:14px; text-align:center; word-wrap:break-word; overflow-y:hidden;}'
            ].join(''),
            init: function(context, helper){
                // add stylesheet to iframe
                helper.addStyle('style', this.style, { context: context});
                //绑定事件
                helper.addEvent(context.getElementById('launchBtn'), 'click', helper.proxy(helper, helper.chat));
                helper.addEvent(context.getElementById('launchBtnOffline'), 'click', helper.proxy(helper, helper.chat));
                helper.addEvent(context.getElementById('closeBtn'), 'click', helper.proxy(helper, helper.remove));

                var params = helper.params,
                    cot1 = params['wd'] || '',
                    cot2 = params['wd2'] || '';

                //填充内容
                context.getElementById('subTitle').innerHTML = helper.xssFilter(cot1).substr(0, 8);
                context.getElementById('plainText').innerHTML = helper.xssFilter(cot2).substr(0, 16);

                helper.getOnlineStatus();
            }
        },
        'i01': {
            templ: [
                '<div class="main bg">',
                    '<a id="launchBtn" class="launchBtn btn" href="javascript:;"></a>',
                    '<a id="laterBtn" class="laterBtn btn" href="javascript:;"></a>',
                    '<a id="closeBtn" class="closeBtn btn" href="javascript:;"></a>',
                    '<p id="title" class="title">在线咨询</p>',
                    '<div class="content">',
                        '<p id="msg" class="msg"></p>',
                    '</div>',
                '</div>'
            ].join(''),
            style: [
                '* { padding:0; margin:0; font-family:Microsoft YaHei,Simsun;}',
                '.main { height:172px; background-repeat:no-repeat;}',
                '.bg { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUcAAACsCAMAAADfY56sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0Q5NzNGQUE1N0VFMTFFMjg2QTNEMjMxNjY2Qzg2ODMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0Q5NzNGQUI1N0VFMTFFMjg2QTNEMjMxNjY2Qzg2ODMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDRDk3M0ZBODU3RUUxMUUyODZBM0QyMzE2NjZDODY4MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDRDk3M0ZBOTU3RUUxMUUyODZBM0QyMzE2NjZDODY4MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlmhGQQAAAMAUExURafe+KW3wGRvdnTI8cvZ4vP4/O/2+9Hk7fviVJtgYtnp8vhQOHeJlrrq/9L0//n8/pamsJdjJ42NkfL09uHu9fzONFl0hHC22dHk8CMgJl5ob+0yJPj8/vL2+nLH8GEgHfibHWp5g4vT9eYpJczx/83i7XvM9Mvg6zU2SsLt/+jy+eHj4yIfKtpfSNgnJrfDyofS88jd6P2mG8/j8NTm8bgiJExRU7jK1FFcZv63FxcYJHfA5NbW148vLJGep97g4ignMdbo8jpDU/A2JMfHygsNFL3r/4PP9cqtr3SCjLa3ubQYGNzq8f7GG/T6/P7+/vj5+8YkJVJYXPq3JsTV393s9OH6/+b8/77S3Kalp8Xu/5LZ9XrL87K+x2lJJqO0v+no6IkbHNWRHnrM89nj6+b2/N35/3/O9f7eLNzr9MLO1W2Qpfv+/maHmRkfKzU1PEFEXH3M8nbJ8pS3yOr0+kJGTPn4+a56IKyTlqPF0+vy+Nno8MWBIO/x8+vKyqoeH9j2/zETEeru84PL7uTw9trq856stah6fNDe6d4fJd7s8s+mIN6xHMPo+rOqrHbH7cEWGeT7/0IyKKu+yN/n7u0tJIOTm+7z+uDs887k7sbh7fz8/CMzQN4vJbTZ580kI9zt9vX397k7LpocHtLg5tbr79bm7y4uO+Tq8PT+/j48Qn7N8+nv+Nvx9EPE9Pv9/vg/LTscIHvK8fn+//X299jv8+Lr8UxNZO/0/PD0+ePu+Y5EPB4dIuz1+vb6/XzN9Pj8/erz+vH4/HnL83fK8vb7/ez0+v3///3+/3jK8nPI8XHG8Pz+/u31+33N9H3O9XjL833N9fz+/zzC9Ljo/8Ds//X5/OPv9sjv/+71+3nJ8HzM9I7X9JXE2/39/X7I7vv///f6/Pv7+3PH8Ons8HnK8uzx+q3O2srk8PP6//r081thZv79/v7+/fL5/15cX77m9mSkxe31+erw9v7///X6/e31+u72+/T5/PL4/PD3+/f7/ev0+unz+czh7P///+xwhygAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAX30lEQVR42uydDVwTZ57HgdLlxFyLiMCMdTFSCqeRgCQSBxgmgVkbsEUotLBtkFhcF1Riq9G66lGrAdq9iiWSgkKhhpJ+aHfV6tXtktvb7l7Xdl/avfW2dne7dre1lU8h5/kxu+6bev9nZvKeYIAAmZhvwiQMM4/m6++Zef7zBBNx8+YmQRhvKIX+oIQtN928GXFTsC0ijDd+/7w//B623Ca4GbFpW8TqjWG8kLTEH5I2blwdsW1ThCBi9QdhvOGnR9hyNVgURPx3GK+4eszav39/Vha7dPEIWz7BeNz4fhhvJC3Jctyy9ucB7AKJtP8g6YP333+N8fj+f4bxwuN5WU7s/2T79R9dSUravn37J6udf5AHm74f9jgOSc66Vn+StGHDtStLN2xIcvWY9EHY4/jkrXZmfx6I3LBhaVLefqe1WasdefzdfWG8kbfRReQnSVfA4xWIowt5v7zvvt+FPfrmcdc8bkQelyKPLno35t1n8/jY42G8kec8KH/tk7wr3+8HkvI+ec35B5DHx+9jPN4XVnZrj0+0J0liYq4kx8QktT/htP6DPNjyMcbj54+F8Ub7715z8EZednb2laQrsMx7w2n9a+3vwaZsv/5xGC983u588n6jPS8pCQbhsGh/w2n9E+1oU7CojPg87Mwr7c5nncd+297e/uR7T8Lyt4897vQD5PExsKiM+PEvw3ij3a+jaDts+R7Tr3/7XhhvtPt3FIUtP2fy+N5/hfHCe3f4I/vzO2DTJxmPT4adeeVJ/0DKWY9hpsgdjMc7wiKmSjiPAeGnjMev3hFmarB5DHuYKj9jPP4sLGKqsHn8aZipweTx0fbPwkwRJo+ffTXMlPjss0eZPIZNTFUke54JM0WYPJ5614o4a+NdF37F8XMnNm8+Ph53e3DPDzn+7oV3gB/Y+JMLf/HKnXfe+VdnfsTyN698xc41J37zi1/82cF/2PgJ8A8XtjO8beO6B0sZvgUeN1sD7PH49Hu8c2Y9br+Vx6Uoj+N6fDcgHu8J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);}',
                // ie6 7 base64 hack
                '.bg { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/b02.png)}',
                '.btn { position:absolute; display:block;}',
                '.launchBtn { top:145px; left:173px; width:69px; height:22px;}',
                '.laterBtn { top:145px; left:248px; width:69px; height:22px;}',
                '.closeBtn { top:0; right:6px; width:39px; height:26px;}',
                '.title { position:absolute; top:1px; left:17px; height:30px; line-height:30px; font-size:16px; color:#000;}',
                '.content { position:absolute; top:45px; left:114px; width:203px; height:85px;}',
                '.content .msg { font-size:12px; color:#000; line-height:25px;}'
            ].join(''),
            init: function(context, helper){
                // add stylesheet to iframe
                helper.addStyle('style', this.style, { context: context});
                //绑定事件
                var chat =  function(){
                        this.chat();
                        this.remove();
                        helper.titleFlash.off();

                        helper.report('https://visitor.crm2.qq.com/cgi/visitorcgi/ajax/accept_invite.php?nameAccount=' + this.params.nameAccount + '&uid=' + this.params.uid);
                    },
                    close = function(){
                        this.remove();
                        helper.titleFlash.off();

                        helper.report('https://visitor.crm2.qq.com/cgi/visitorcgi/ajax/reject_invite.php?nameAccount=' + this.params.nameAccount + '&uid=' + this.params.uid);
                    };
                helper.addEvent(context.getElementById('launchBtn'), 'click', helper.proxy(helper,  chat));
                helper.addEvent(context.getElementById('laterBtn'), 'click', helper.proxy(helper, close));
                helper.addEvent(context.getElementById('closeBtn'), 'click', helper.proxy(helper, close));

                var params = helper.params,
                    msg = params['msg'] || '';

                //填充内容
                context.getElementById('msg').innerHTML = helper.xssFilter(msg);
            }
        },
        'd01': {
            templ: [
                '<div class="main bg">',
                    '<div class="content">',
                        '<div id="launchBtn" class="launchBtn btn"></div>',
                    '</div>',
                '</div>'
            ].join(''),
            style: [
                '* { padding:0; margin:0; font-family:Microsoft YaHei,Simsun;}',
                '.main { width:<%=width%>px; height:<%=height%>px; background-repeat:no-repeat;}',
                '.bg { background-image:url(<%=tx%>);}',
                '.launchBtn { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAWCAMAAAB68gtgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REMxNzIxQUM1ODZFMTFFMkE2QUJERjZDOTBFMjlDMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REMxNzIxQUQ1ODZFMTFFMkE2QUJERjZDOTBFMjlDMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQzE3MjFBQTU4NkUxMUUyQTZBQkRGNkM5MEUyOUMzNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQzE3MjFBQjU4NkUxMUUyQTZBQkRGNkM5MEUyOUMzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvt6ESkAAAMAUExURand9oa71Kji/Wias/7rtJ3Y9aXe+f+yOqHZ9fdKLKXh/fvTkut3J/SbK//snv+lGv2rIo7I5a3h+vv7/PWxcpzT7CkpNcnO1Z3e/dCRMa7k/e+Waq3e9VqHnf/TLqLg/fnHeZZ6Wv/LVvrDZrl7ULHi+f+5QaHd+i5UaK6QdNF+LElxhf+hFYnB3JnW9KTb9WqUqpHO6skkF6rf+Jna+abc9qrh+vuHBIKzyjtidnKlvv/BS6nV68Xs/3apwbLg9ltrevOLGPu7FG+KnPJaQqzj/Mjt/7no/+Li4//GUYOjt5jV8v+fEvKFGf61K5HL5sHr/3XF7/rZr5XU87ni9/aTFbzp/7Xh9nvJ8LDk/PIUDrbn/vabF82EQ/mmFcLm+Lzk9/czFP7RapzF2uauUL+ab/iWFfumIa/f9rcOD7bm/aDf/P+wJf+pHUwtJUBGUf/89LTk+/fHp5rP526etDc3RJ7c+pTU9HyrwSIfKPqsKPOkWsbr/JfW9PanScTp+rp0Ov737e3y9pPT8ml9kEVvhH+20f308rPm/rHm/unt8f3WfFF8kf+7MYHM8Ux6kPX19x5FWJrc+o8xLOg4Idzl7pbV9J3a9//NF/L1+f713m6jvboyI50qFXWgtpvd/JzX9ZLU88np+ZbX9rDl/v/1yabf+5/f/prY9sDl97Dm/vihFm/B77Pi+Kvj/pXW9f+9Sff4+rbk/KHb95zX82y/7h4bJAszRvB/Gf+9M/++NLfo/rHl/f+4LgICApfY98TBvZfZ+P/cUJPU83mnvnKnwPSPGrLl/nivyvepOmGRqeipoXyaq3mwy6HX8bLV6n1GKqna8r+ylf2/Vt+lTMm2cO6KQP+rA0U+QouuwuiICImOnZK4y7Oztv+XBFB6kHZnXdQvHefKyFJgbeumBpLF37WKNv7hkqAYDtPb4/nm5neov83v/tybmsKwofS2i/GEEPOLFM/w/3Wsx/izR/ivS32qwP7uy5bP6fzo2qKBTLXl+4XO8Wq+7v///////8s3US4AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAFAklEQVR42qzTfVRTdRjA8bsmIDr3puDAXSVs7Cc4YDCmd6igOQ2VzTQ0FFEp2Yoh4YZ4MQrTTUWQc31L1HhRnJYaGOW1EjMRNHoly7I3MyPt3dKMwkbP795NFI7/+d3Ovds593zOc579RnTfvBd9mtm3sG7i5qI/p/RuvK+Z42f2NAe/vE31NZ8vMyu8d1mZYcTGX+a8yeV9bB3f+vXrX6qrqwvFvcx1H9cArhF8+/gUCkVm+Bt9ysokNk7xuueTaTr40lccffr0sWPHePlO+274gfDX+xR+AOOYnrqmIJim6SN5792yfbjReBc8J2dfNG8rDqSUl5uKbstUXp6C8flPQucL8k54jntOHMl7bB3Q6enpvGu8nQZ2AsXLAsc+gTanBSkULYrq6mqMFz3lwYm5ijj8UQ6fnxxc4Dm+5riHDk7GdmhoXRViWWoFlmNZlo3qGGCfgGMc+JqjRY4WpBVSWmcF2NUZKU1NRau8eL+9e8VFTU0pGYDjwbtomp8c7njs9PRYtspojGXHGo0U0uj7RzH2sainaLWGUjgETuf7bdWboIwUk6lohxcPE4nCpCYTxp/u6urKVy6lv9g+fPik78fQBap0VagqiL0hN8pDSaRfwdr1brcbke4R7k5Sre4s06rV5paW6dWbDAyJDEDrdBmJJpP0bx6fBfYGi8mUiPFX8vPzP9z1xJUxkz77ZsyVK7usKrlKXsXKIb2A7SiLcscD7mDc/p3IoVar25BguYZkzQaKMZw5gyp0UHaizWTpx+H9zolWirMsNlNiNuBg538ZN+/iRy9AcfM2P6gCtgrJ9Xq93M4Kokg37mfWvwOVAW5GZYxguRlwUmZAutUGjKcl2myWgedEQzyelaJzYvFIi82WmEY8jPFpwZvnLQ6cHBi4eEscXTAN46w+Hupg7TC5P+RAasoxHViSWi4QYlxI6oRIp6HehtIabFLLwH9EomXLRKLLYvFZi9TWAPizhw7lJ9Of/xp3MXDysHe/Kz0SfAlwO3sD4yQiTrF2jCOyEXIgA6N5HpKxMh11rYJxoZ1vQa0NUqllpAfWDQuHk3hdIpU2tGJcpaLpb3/aElg5eLDncOlSusAIbCxTRcTDaUnwpyhBTJCTMWO80cm2YXu/jBUKXS7GWbFzD641Qpor+cvj+V0EC4fekeTmRvjwNf+uDQyEX2NwZen95/OsgBNVDJzzU3hoEs55mSamsTHI4GQuMKSGw5HMhSq0iNRifGJEbq5kEADDOFs8COMTiYOwFlX7uB9+rDyM7a0PhbTjfcQTBPEBhQQJCQkxCY0aRJljzE4GCWV+MpJBbdEaykWxZP0eGWKuFdbXT4yQSCTZYas8q9YCffn6H/CVx5OSkj4O+WRo6eHK57aeCAlRcjIuwcGyZAwu6ALLGoQuP9z+TuHO/dHRxUJXffGeWq1Qu62wMDVCMhr01ln4TzSyNRvs0RGpxMGFSVarNfLk9gVLvh762+OTTkZGemUcJ/fn8/ODdw0EMlS8jau5trmwuTk1YDRX2jM7NgxKm8F9DkglXuPwUSUlJQ+MGge3yAVLbtkxPTaGcTXRfMXFHF4IcHNzba0Pn5F99Wo2b3P47rmAW+WqJKVS2d4OLHch7rQxXlPzKoTl6bjZUOHs1XypATN6J2kAXLl7YU8velvk6xFfc30l+bLywUxK69GzAb1rSB1CdP93L1pytG9Duv8XYACYZVDdZpPw6wAAAABJRU5ErkJggg==);}',
                '.offline .launchBtn { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAWCAMAAAB68gtgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDY2RjEzNTk1ODZGMTFFMkFFNTJEMjNEQ0EyREU4NTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDY2RjEzNUE1ODZGMTFFMkFFNTJEMjNEQ0EyREU4NTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NjZGMTM1NzU4NkYxMUUyQUU1MkQyM0RDQTJERTg1MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NjZGMTM1ODU4NkYxMUUyQUU1MkQyM0RDQTJERTg1MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PghteEoAAAJMUExURdPT09DQ0M7OzigoKM3Nzaurq8/Pz9TU1NbW1tra2szMzNnZ2cvLy9fX18rKysbGxsjIyIuLi9jY2MXFxZmZmcTExIqKisPDw8fHx9vb28nJyWlpaZ6enry8vMLCwqKiojMzM52dnZubm93d3ePj47m5ube3t+Hh4bq6ut/f36qqqpWVlbS0tJKSkoiIiI+Pj7W1tb+/v2pqaklJSeDg4J+fn+Li4o2NjeTk5F5eXlVVVaenpz8/P97e3pOTk5ycnH19fbi4uIyMjLCwsKCgoHV1dYCAgImJiaSkpISEhEhISH5+fqGhoYGBgZeXl7a2tqOjo1RUVK6urj09PaioqJCQkLGxsXh4eLOzs3t7eyQkJGtra729vcHBwVNTU6amprKysnx8fIKCgmxsbHd3dyEhIWBgYF9fX3Nzc6+vr5iYmAICAiUlJZSUlI6Ojvf396WlpZaWlnZ2dpGRkampqYODg4WFhfj4+Ovr6/7+/vb29sDAwP39/SIiImFhYUBAQCMjI11dXUpKSuXl5fT09Hl5eVhYWB8fH+3t7YeHh/v7+39/f3JycktLS1lZWfLy8kZGRnR0dEFBQVpaWm9vb0NDQ2JiYuzs7GhoaERERPHx8VJSUi8vL3BwcHp6er6+vkdHR3FxcfDw8PPz8y0tLTQ0NC4uLvX19fz8/DU1NU5OTjc3Nzo6OjY2Nurq6lZWVu7u7u/v7zAwMOfn5ykpKfn5+WdnZ4aGhvr6+tzc3K2trZqamj4+PtHR0dXV1dLS0qysrLu7u////////w5icCEAAADEdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAadvLCAAAE6UlEQVR42qyV51caWRiHRy6jkcCAIoM6ExiMoNKLwFJCUcDee9dobNH0nk3vdXvvvfcKTAKM/9jee8Gy7p7dL3k+zGHOgYf3vO/vvpfYyD0L0v8CuUHUl/7yXIHaTTweTx2mEdOAOYDYj0jmqcKUYtLyfbvRpEmi/kay8IXS0r2YcohMJtsDeYoogRCQDOQJpAhRDBEhxJiKXGo3w5oKQl9b+PfW338d/9TXvynfsynf6d6SF/+/PJXDcuzueOur8auXDr0W+m+1vL6gjqqh2SDWiMUSyKqeJAO92m1mSFK/ShhqcT+M3z5yCIcFx6GvczLck50dKZRcDznB6fX6aFQkWnKKxQZgcMUlUkg3lGu/FBD5eXRCeTdh8OBGM59fEQ4nDguHxueRG4rbggA8sqGqFwAA/pWiVX4bjYEzSCQG0HPR2SOVUlR31GjsPFqQe944tzdmNEa7iR4sL7867spXDl7Md+QWaCshRkA6k7kebH0i93P1RUr/Yl9Xd5ers08sdsbLEj0PAMP4eAdFUccNg4Odb+flDUraq4wNDhqOE/Y6OEHZ03fHR8rSIetIYu073I9JgIrOzAczRwBqcxE/Uazn1V0cz8VJXkLypIvhfeBBy7q5GmLqCQRi3+flMi/toNyBQI+pIBe99/oPCWtXV4f/lXksbwO418dA86If5+MgB+XOpSZD51Kcl8QB6IPd4I0OM3sKye0zM24Pltet0tmkmp2ZsZsIcx0KdWi+bW76dt/txYmuy2fQFE8H8RTrQa9/AqejCYg0qNsAPaSUmz9l7mA4+HnaqlAoQubWVnemhjYIAknXlCb3sa2t5hAx2gijofv58VjHUNhkKzszcumbMKz5IMCJ7gf6RT8OdIIXZ2madvLw4bNTPobtWLZOL0/qIpUQy2hvLys9Z6OfiOihTDJp1/X2jlqI2UY4v4m1l3OvxofcdpXs7h3uMpTngBfKiyeCsOQoOiq8U+J0MT6OmWYYrqUFAD6iUESu6ThdpVwut8xqtewHQjntbaJVMIopnVY7ayGGG2A0wBrz02nLhbP3z5/9MXjnCmxI0cJnB4uLT4Bukdjl6pRM9XF2KcNQzEuOdraatypCs5OTlZVhbiA8d0+pVJ4cjsXYlCBM0fQsyvkxXSw2fJJoRvK1hYWjoZNwGs9/cm7k2IdIDicIwPUmVLQT5nyJlEK5EXa8nR/lrYPL0wMDlffauYfy9jkoH2p2u9kw/L3RWIXkYZ3b3TwE5TAbEmm86uafwvn7N2s9CTHqNpqh2hXUosUhgclz2SmKYapZ86iCtQ5Yrdciloft7X80D7zDpVUqlW2FZVmT4zfh6BdQvSdrg68rNmLlADrkxjFT5u7ZCx/fUFs78m68lRIAOOHmkEov+gBoaWmphsFQTL65jNosnwsrlarmj8ZUKrXa1q+DmNaT54VkVc5iQm/9NqL/ANoeYwGarjFLh2vOBCIRmOqthYfVMNEUOipIjbKB1HJoxqgRR1I1iLTl1AvVaUsFfkkdIVL7S+BhOX4rMtZmUZS9f+J0mwnVnfdumins3RIrEQWtWoPwZgvXz3oZvV74mPUSqcanW/t0+xrIq6Wbalz0383IrckzNTXlJSt2w5q9RDZTt7/Azrtr607avJS2d/COBY83MaIpSu7G3EQSG9lnQbrsn5AbfwkwAJbmZ6rKR8LPAAAAAElFTkSuQmCC);}',
                // ie6 7 base64 hack
                '.launchBtn { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/a01.png)}',
                '.offline .launchBtn { *background-image:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/a01.offline.png)}',
                '.launchBtn { width:92px; height:22px; margin:0 auto; cursor:pointer;}',
                '.content { position:absolute; bottom:0; width:100%; height:22px; padding:3px; ',
                    'background:rgba(255, 255, 255, 0.3);',
                    '*background:url(https://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/d01.panel.png);',
                '}'
            ].join(''),
            init: function(context, helper){
                var params = helper.params,
                    tx = params['tx'] || '',
                    width = params['txw'] || 0,
                    height = params['txh'] || 0,
                    cssText = this.style
                        .replace('<%=tx%>', tx)
                        .replace('<%=width%>', width)
                        .replace('<%=height%>', height);

                // add stylesheet to iframe
                helper.addStyle('style', cssText, { context: context});

                //绑定事件
                var chat =  function(){
                        this.chat();

                        helper.titleFlash.off();

                        helper.report('https://visitor.crm2.qq.com/cgi/visitorcgi/ajax/accept_invite.php?nameAccount=' + this.params.nameAccount + '&uid=' + this.params.uid);
                    };

                helper.addEvent(context.getElementById('launchBtn'), 'click', helper.proxy(helper,  chat));
            }
        }
    };
});