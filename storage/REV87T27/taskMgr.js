/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-27 下午8:01
 */
BizQQWPA.define('wpa.ta', 'util.getScript,util.serialize,util.cookie', function(require){
    var URL = 'https://tajs.qq.com/crmqq.php',
        UID_COOKIE_NAME = 'pgv_pvi';

    var getScript = require('getScript'),
        serialize = require('serialize'),
        cookie = require('cookie');

    var loaded = false;

    var ta = function(nameAccount, domain, callback){
        var isTriggered = false;
        if(ta.uid){
            callback(ta.uid);
            isTriggered = true;
        }

        if(!loaded){
            var options = {
                    uid: nameAccount,
                    dm: domain
                },
                url = URL + '?' + serialize(options, '=', '&');

            getScript(url, function(){
                loaded = true;

                if(isTriggered){
                    return;
                }

                ta.uid = cookie.get(UID_COOKIE_NAME);
                if(ta.uid){
                    callback(ta.uid);
                } else {
                    setTimeout(arguments.callee, 30);
                }
            });
        }
    };

    // A page shares a uid
    // So cache it in model's static variant
    ta.uid = cookie.get(UID_COOKIE_NAME)|| '';

    return ta;
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-17
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('wpa.kfuin', 'util.getJSONP', function(require){
    var getJSONP = require('getJSONP');

    var GET_KFUIN_URL = 'https://wpl.b.qq.com/cgi/conv.php';

    var kfuins = {};

    return {
        get: function(nameAccount, callback){
            callback = callback || function(){};

            if(!nameAccount || kfuins[nameAccount]){
                callback(kfuins[nameAccount]);
                return;
            }

            var opts = {
                num: nameAccount
            };

            getJSONP(GET_KFUIN_URL, opts, function(rs){
                if(!rs || rs.r !== 0){
                    callback();
                    return;
                }

                var kfuin = kfuins[nameAccount] = rs.data.kfuin;
                callback(kfuin);
            });
        },

        set: function(nameAccount, kfuin){
            kfuins[nameAccount] = kfuin;
        }
    };
});/**
 * Created with JetBrains WebStorm.
 * User: amoschen
 * Date: 13-1-17
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('wpa.sid', 'util.getJSONP,util.domain', function(require){
    var getJSONP = require('getJSONP'),
        domain = require('domain');

    var GET_SID_URL = 'https://wpl.b.qq.com/cgi/ta.php';

    var sids = {};

    var topDomain = domain.topDomain;

    return {
        get: function(nameAccount, callback){
            callback = callback || function(){};

            if(!nameAccount || sids[nameAccount + '.' + topDomain]){
                callback(sids[nameAccount + '.' + topDomain]);
                return;
            }

            var opts = {
                na: nameAccount,
                dm: topDomain
            };

            getJSONP(GET_SID_URL, opts, function(rs){
                if(!rs || rs.r !== 0){
                    callback();
                    return;
                }

                var sid = sids[nameAccount + '.' + topDomain] = rs.data.sid;
                callback(sid);
            });
        },

        set: function(nameAccount, sid){
            sids[nameAccount + '.' + topDomain] = sid;
        }
    };
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-27 下午9:13
 */
BizQQWPA.define('util.titleFlash', 'util.taskMgr', function(require){
    var TITLE_FLASH_GAP = 120;

    var taskMgr = require('taskMgr');

    var doc = document,
        title = doc.title,
        task = taskMgr.newTask(function(){
            var t = doc.title;
            doc.title = t.substr(1, t.length) + t.substr(0, 1);
        }, TITLE_FLASH_GAP);

    return titleFlash = {
        on: function(msg){
            //add msg before original title
            doc.title = msg + ('' + doc.title);
            task.run();
        },
        off: function(){
            task.pause();
            doc.title = title;
        }
    }
});/**
 * Operation on node's class attribute
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午7:45
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.className', function(){
    return {
        /**
         * Add class to a node
         * @param {HTMLElement} node A node
         * @param {string} cname Class name
         * @return {HTMLElement} The node
         */
        addClass: function(node, cname){
            if(!node || !cname) {
                return node;
            }

            if(!node.className){
                node.className = cname;
                return node;
            }

            if (this.hasClass(node, cname)) {
                return node;
            }

            node.className += ' ' + cname;
            return node;
        },

        /**
         * Judge whether the node has the class
         * @param {HTMLElement} node A node
         * @param {string} cname Class name
         * @return {boolean} Judgement, true when the node has the class
         */
        hasClass: function(node, cname) {
            return (node && cname) ? new RegExp('\\b' + cname + '\\b').test(node.className) : false;
        },

        /**
         * Remove a class from the node
         * @param {HTMLElement} node A node
         * @param {string} cname Class name
         * @return {HTMLElement} The node
         */
        removeClass: function(node, cname){
            if(!node || !cname){
                return node;
            }

            if(!this.hasClass(node, cname)){
                return node;
            }

            if(node.className){
                node.className = node.className.replace(cname, '');
            } else {
                node.setAttribute = node.getAttribute('class').replace(cname, '');
            }

            return node;
        }
    };
});/**
 * Load stylesheet asynchronously, methods collection
 * User: amoschen
 * Date: 13-1-7
 * Time: 下午3:51
 * To change this template use File | Settings | File Templates.
 */
BizQQWPA.define('util.Style', function(){
    return {
        /**
         * Load css file to page
         * @param {string} name Assign a name
         * @param {string} href CSS file's link
         * @param {object} [opts] Options for loading
         * @param {object} [opts.context] Context to load css
         * @return {HTMLElement} The newly injected link
         */
        load: function(name, href, opts){
            opts = opts || {};
            var context = opts.context || document;

            // add stylesheet to context
            var style = context.createElement('link');
            style.name = name;
            style.type = 'text/css';
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('href', href);

            (function(){
                try{
                    var parent = context.getElementsByTagName('head')[0];
                    parent.insertBefore(style, parent.firstChild);
                } catch(e){
                    setTimeout(arguments.callee, 1);
                }
            })();

            return style;
        },

        /**
         * Add style tag to page P.S.class name or id cannot start with '_' in ie6 & ie7!
         * @param {string} name Assign a name
         * @param {string} cssText CSS text
         * @param {object} [opts] Options for loading
         * @param {object} [opts.context] Context to add style
         * @return {HTMLElement} The newly injected link
         */
        add: function(name, cssText, opts){
            opts = opts || {};
            var context = opts.context || document;

            // add stylesheet to page
            var style = context.createElement('style');
            style.type = 'text/css';
            style.name = name;

            // insert style into dom before setting cssText
            // otherwise, ie6 will not be set properly
            var parent = context.getElementsByTagName('body')[0];
            parent.insertBefore(style, parent.firstChild);

            if(style.styleSheet){
                style.styleSheet.cssText = cssText;
            } else {
                style.appendChild(context.createTextNode(cssText));
            }

            return style;
        }
    };
});/**
 * @fileOverview
 * @author amoschen
 * @version
 * Created: 12-8-4 下午1:20
 */
BizQQWPA.define('util.taskMgr', 'util.proxy', function(require){
    /**
     * @Class TaskManager
     * Manage scheduled tasks, with one timer and performance optimization
     */

    //requestAnimationFrame will stop functioning when page is out of vision
    /**
     * requestAnimationFrame
     */
    /*
     var timer = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
     window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) { setTimeout(fn, 13);};
     */

    var TASK_RUN = 'run', //task state: running
        TASK_PAUSE = 'pause', //task state: pauseed
        TASK_DROP = 'drop', //task state: to be dropped
        LOOP_TIME = 50; //execution time in a loop

    var proxy = require('proxy');

    var TM = function(){
        this.circle = [];
        this.pos = 0;
        setInterval(proxy(this, this.loop), 16);
    };

    TM.prototype = {
        //factory mode, create task an instance
        newTask: function(fn, gap){
            var t = new Task(fn, gap);
            this.circle.push(t);
            return t;
        },

        //create once job
        once: function(fn, gap){
            return this.newTask(function(){
                fn.apply(this);
                this.drop();
            }, gap);
        },

        //main loop, execute tasks in sequence and stop when loop time is up
        loop: function(){
            var c = this.circle,
                pos = this.pos,
                count = c.length,
                start = +new Date(),
                loopTime = LOOP_TIME,
                t = c[pos];

            while(count > 0 && +new Date() - start < loopTime){
                if(t.isRunning()){
                    t.execute();
                } else if(t.isDropped()){
                    c.splice(pos, 1);
                    pos--;
                }

                pos = (pos + 1) % c.length;
                t = c[pos];
                count--;
            }

            this.pos = pos;
        }
    };

    /*
     * @Class Task
     * a task is a function to be executed every certain time
     */
    var Task = function(fn, gap){
        this.fn = fn;
        this.gap = gap;
        this.status = TASK_PAUSE;
        this.lastExecTime = +new Date();
    };

    Task.prototype = {
        run: function(){
            this.status = TASK_RUN;
            return this;
        },

        pause: function(){
            this.status = TASK_PAUSE;
            return this;
        },

        drop: function(){
            this.status = TASK_DROP;
            return this;
        },

        execute: function(){
            if(+new Date() - this.lastExecTime < this.gap){
                return false;
            }

            this.fn();
            this.lastExecTime = +new Date();
            return true;
        },

        getGap: function(){
            return this.gap;
        },

        setGap: function(newGap){
            this.gap = newGap;
            return this;
        },

        isRunning: function(){
            return this.status === TASK_RUN;
        },

        isPaused: function(){
            return this.status === TASK_PAUSE;
        },

        isDropped: function(){
            return this.status === TASK_DROP;
        }
    };

    return new TM();
});