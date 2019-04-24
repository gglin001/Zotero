/*! Responsive JS Library v1.2.2 */
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2013: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia = window.matchMedia || (function (doc, undefined) {
    var bool, docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        fakeBody = doc.createElement("body"),
        div = doc.createElement("div");
    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);
    return function (q) {
        div.innerHTML = '&shy;<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
        docElem.insertBefore(fakeBody, refNode);
        bool = div.offsetWidth == 42;
        docElem.removeChild(fakeBody);
        return {
            matches: bool,
            media: q
        }
    }
})(document);
/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */ (function (win) {
    win.respond = {};
    respond.update = function () {};
    respond.mediaQueriesSupported = win.matchMedia && win.matchMedia("only all").matches;
    if (respond.mediaQueriesSupported) {
        return
    }
    var doc = win.document,
        docElem = doc.documentElement,
        mediastyles = [],
        rules = [],
        appendedEls = [],
        parsedSheets = {}, resizeThrottle = 30,
        head = doc.getElementsByTagName("head")[0] || docElem,
        base = doc.getElementsByTagName("base")[0],
        links = head.getElementsByTagName("link"),
        requestQueue = [],
        ripCSS = function () {
            var sheets = links,
                sl = sheets.length,
                i = 0,
                sheet, href, media, isCSS;
            for (; i < sl; i++) {
                sheet = sheets[i], href = sheet.href, media = sheet.media, isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";
                if ( !! href && isCSS && !parsedSheets[href]) {
                    if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
                        translate(sheet.styleSheet.rawCssText, href, media);
                        parsedSheets[href] = true
                    } else {
                        if ((!/^([a-zA-Z:]*\/\/)/.test(href) && !base) || href.replace(RegExp.$1, "").split("/")[0] === win.location.host) {
                            requestQueue.push({
                                href: href,
                                media: media
                            })
                        }
                    }
                }
            }
            makeRequests()
        }, makeRequests = function () {
            if (requestQueue.length) {
                var thisRequest = requestQueue.shift();
                ajax(thisRequest.href, function (styles) {
                    translate(styles, thisRequest.href, thisRequest.media);
                    parsedSheets[thisRequest.href] = true;
                    makeRequests()
                })
            }
        }, translate = function (styles, href, media) {
            var qs = styles.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                ql = qs && qs.length || 0,
                href = href.substring(0, href.lastIndexOf("/")),
                repUrls = function (css) {
                    return css.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + href + "$2$3")
                }, useMedia = !ql && media,
                i = 0,
                j, fullq, thisq, eachq, eql;
            if (href.length) {
                href += "/"
            }
            if (useMedia) {
                ql = 1
            }
            for (; i < ql; i++) {
                j = 0;
                if (useMedia) {
                    fullq = media;
                    rules.push(repUrls(styles))
                } else {
                    fullq = qs[i].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1;
                    rules.push(RegExp.$2 && repUrls(RegExp.$2))
                }
                eachq = fullq.split(",");
                eql = eachq.length;
                for (; j < eql; j++) {
                    thisq = eachq[j];
                    mediastyles.push({
                        media: thisq.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                        rules: rules.length - 1,
                        hasquery: thisq.indexOf("(") > -1,
                        minw: thisq.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: thisq.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    })
                }
            }
            applyMedia()
        }, lastCall, resizeDefer, getEmValue = function () {
            var ret, div = doc.createElement("div"),
                body = doc.body,
                fakeUsed = false;
            div.style.cssText = "position:absolute;font-size:1em;width:1em";
            if (!body) {
                body = fakeUsed = doc.createElement("body");
                body.style.background = "none"
            }
            body.appendChild(div);
            docElem.insertBefore(body, docElem.firstChild);
            ret = div.offsetWidth;
            if (fakeUsed) {
                docElem.removeChild(body)
            } else {
                body.removeChild(div)
            }
            ret = eminpx = parseFloat(ret);
            return ret
        }, eminpx, applyMedia = function (fromResize) {
            var name = "clientWidth",
                docElemProp = docElem[name],
                currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[name] || docElemProp,
                styleBlocks = {}, lastLink = links[links.length - 1],
                now = (new Date()).getTime();
            if (fromResize && lastCall && now - lastCall < resizeThrottle) {
                clearTimeout(resizeDefer);
                resizeDefer = setTimeout(applyMedia, resizeThrottle);
                return
            } else {
                lastCall = now
            }
            for (var i in mediastyles) {
                var thisstyle = mediastyles[i],
                    min = thisstyle.minw,
                    max = thisstyle.maxw,
                    minnull = min === null,
                    maxnull = max === null,
                    em = "em";
                if ( !! min) {
                    min = parseFloat(min) * (min.indexOf(em) > -1 ? (eminpx || getEmValue()) : 1)
                }
                if ( !! max) {
                    max = parseFloat(max) * (max.indexOf(em) > -1 ? (eminpx || getEmValue()) : 1)
                }
                if (!thisstyle.hasquery || (!minnull || !maxnull) && (minnull || currWidth >= min) && (maxnull || currWidth <= max)) {
                    if (!styleBlocks[thisstyle.media]) {
                        styleBlocks[thisstyle.media] = []
                    }
                    styleBlocks[thisstyle.media].push(rules[thisstyle.rules])
                }
            }
            for (var i in appendedEls) {
                if (appendedEls[i] && appendedEls[i].parentNode === head) {
                    head.removeChild(appendedEls[i])
                }
            }
            for (var i in styleBlocks) {
                var ss = doc.createElement("style"),
                    css = styleBlocks[i].join("\n");
                ss.type = "text/css";
                ss.media = i;
                head.insertBefore(ss, lastLink.nextSibling);
                if (ss.styleSheet) {
                    ss.styleSheet.cssText = css
                } else {
                    ss.appendChild(doc.createTextNode(css))
                }
                appendedEls.push(ss)
            }
        }, ajax = function (url, callback) {
            var req = xmlHttp();
            if (!req) {
                return
            }
            req.open("GET", url, true);
            req.onreadystatechange = function () {
                if (req.readyState != 4 || req.status != 200 && req.status != 304) {
                    return
                }
                callback(req.responseText)
            };
            if (req.readyState == 4) {
                return
            }
            req.send(null)
        }, xmlHttp = (function () {
            var xmlhttpmethod = false;
            try {
                xmlhttpmethod = new XMLHttpRequest()
            } catch (e) {
                xmlhttpmethod = new ActiveXObject("Microsoft.XMLHTTP")
            }
            return function () {
                return xmlhttpmethod
            }
        })();
    ripCSS();
    respond.update = ripCSS;

    function callMedia() {
        applyMedia(true)
    }
    if (win.addEventListener) {
        win.addEventListener("resize", callMedia, false)
    } else {
        if (win.attachEvent) {
            win.attachEvent("onresize", callMedia)
        }
    }
})(this);
if (jQuery.browser.msie && jQuery.browser.version <= 6) {
    jQuery('<div class="msie-box"><a href="http://browsehappy.com/" title="Click here to update" target="_blank">  Your browser is no longer supported. Click here to update...</a> </div>').appendTo("#container")
}
jQuery(document).ready(function ($) {
    $("a[href=#scroll-top]").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false
    })
});
(function ($) {
    function Placeholder(input) {
        this.input = input;
        if (input.attr("type") == "password") {
            this.handlePassword()
        }
        $(input[0].form).submit(function () {
            if (input.hasClass("placeholder") && input[0].value == input.attr("placeholder")) {
                input[0].value = ""
            }
        })
    }
    Placeholder.prototype = {
        show: function (loading) {
            if (this.input[0].value === "" || (loading && this.valueIsPlaceholder())) {
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute("type", "text")
                    } catch (e) {
                        this.input.before(this.fakePassword.show()).hide()
                    }
                }
                this.input.addClass("placeholder");
                this.input[0].value = this.input.attr("placeholder")
            }
        },
        hide: function () {
            if (this.valueIsPlaceholder() && this.input.hasClass("placeholder")) {
                this.input.removeClass("placeholder");
                this.input[0].value = "";
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute("type", "password")
                    } catch (e) {}
                    this.input.show();
                    this.input[0].focus()
                }
            }
        },
        valueIsPlaceholder: function () {
            return this.input[0].value == this.input.attr("placeholder")
        },
        handlePassword: function () {
            var input = this.input;
            input.attr("realType", "password");
            this.isPassword = true;
            if ($.browser.msie && input[0].outerHTML) {
                var fakeHTML = $(input[0].outerHTML.replace(/type=(['"])?password\1/gi, "type=$1text$1"));
                this.fakePassword = fakeHTML.val(input.attr("placeholder")).addClass("placeholder").focus(function () {
                    input.trigger("focus");
                    $(this).hide()
                });
                $(input[0].form).submit(function () {
                    fakeHTML.remove();
                    input.show()
                })
            }
        }
    };
    var NATIVE_SUPPORT = !! ("placeholder" in document.createElement("input"));
    $.fn.placeholder = function () {
        return NATIVE_SUPPORT ? this : this.each(function () {
            var input = $(this);
            var placeholder = new Placeholder(input);
            placeholder.show(true);
            input.focus(function () {
                placeholder.hide()
            });
            input.blur(function () {
                placeholder.show(false)
            });
            if ($.browser.msie) {
                $(window).load(function () {
                    if (input.val()) {
                        input.removeClass("placeholder")
                    }
                    placeholder.show(true)
                });
                input.focus(function () {
                    if (this.value == "") {
                        var range = this.createTextRange();
                        range.collapse(true);
                        range.moveStart("character", 0);
                        range.select()
                    }
                })
            }
        })
    }
})(jQuery);
/*!
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */ (function (e) {
    "use strict";
    e.fn.fitVids = function (t) {
        var n = {
            customSelector: null
        };
        var r = document.createElement("div"),
            i = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
        r.className = "fit-vids-style";
        r.innerHTML = "­<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>";
        i.parentNode.insertBefore(r, i);
        if (t) {
            e.extend(n, t)
        }
        return this.each(function () {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.youtube-nocookie.com']", "iframe[src*='fast.wistia.com']", "embed"];
            if (n.customSelector) {
                t.push(n.customSelector)
            }
            var r = e(this).find(t.join(","));
            r.each(function () {
                var t = e(this);
                if (this.tagName.toLowerCase() === "embed" && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length) {
                    return
                }
                var n = this.tagName.toLowerCase() === "object" || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                    r = !isNaN(parseInt(t.attr("width"), 10)) ? parseInt(t.attr("width"), 10) : t.width(),
                    i = n / r;
                if (!t.attr("id")) {
                    var s = "fitvid" + Math.floor(Math.random() * 999999);
                    t.attr("id", s)
                }
                t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%");
                t.removeAttr("height").removeAttr("width")
            })
        })
    }
})(jQuery);
/** HKUST customization start **/
/*! Responsive Menu */
/*! http://tinynav.viljamis.com v1.1 by @viljamis */
(function (a, i, g) {
    a.fn.tinyNav = function (j) {
        var b = a.extend({
            active: "selected",
            header: "",
            label: ""
        }, j);
		//return this;
        return this.each(function () {
            //g++;
            //var h = a(this),
            //    d = "tinynav" + g,
            //    f = ".l_" + d,
            //    e = a("<select/>").attr("id", d).addClass("tinynav " + d);
            //if (h.is("ul,ol")) {
            //    "" !== b.header && e.append(a("<option/>").text(b.header));
            //    var c = "";
            //    h.addClass("l_" + d).find("a").each(function () {
            //        c += '<option value="' + a(this).attr("href") + '">';
            //        var b;
            //        for (b = 0; b < a(this).parents("ul, ol").length - 1; b++) c += "- ";
            //        c += a(this).text() + "</option>"
            //    });
            //    e.append(c);
            //    b.header || e.find(":eq(" + a(f + " li").index(a(f + " li." + b.active)) + ")").attr("selected", !0);
            //    e.change(function () {
            //        i.location.href = a(this).val()
            //    });
            //    a(f).after(e);
            //    b.label && e.before(a("<label/>").attr("for", d).addClass("tinynav_label " + d + "_label").append(b.label))
            //}
			 g++;			 
            var h = a(this),
                d = "mobile_menu" + g,
                f = ".l_" + d,				
                e = a("<nav/>").attr("id", d).addClass("mobile_menu " + d);
            if (h.is("ul,ol")) {                
                var c = "<ul id='nav'>";				
                h.addClass("l_" + d).find("a").each(function () {
					var shift = 0;
					var b;
					for (b = 0; b < a(this).parents("ul, ol").length - 1; b++) shift += 20;
				   c += '<li style="padding-left:'+shift+'px;"><a href="'+a(this).attr("href")+ '">';
                    //var b;
                    //for (b = 0; b < a(this).parents("ul, ol").length - 1; b++) c += "- ";
                    c += a(this).text() + "</li>";
                });
				c += "</ul>";
                e.append(c);
                a(f).after(e);				
                b.label && e.before(a("<label/>").attr("for", d).addClass("tinynav_label " + d + "_label").append(b.label))
            }					
        })
    }
})(jQuery, this, 0);

/*!
 * jQuery Selectbox plugin 0.2
 */
//(function (e, t) {
//    function s() {
//        this._state = [];
//        this._defaults = {
//            classHolder: "sb-holder",
//            classHolderDisabled: "sb-holder-disabled",
//            classSelector: "sb-selector",
//            classOptions: "sb-options",
//            classGroup: "sb-group",
//            classSub: "sb-sub",
//            classDisabled: "sb-disabled",
//            classToggleOpen: "sb-toggle-open",
//            classToggle: "sb-toggle",
//            classFocus: "sb-focus",
//            speed: 200,
//            effect: "slide",
//            onChange: null,
//            onOpen: null,
//            onClose: null
//        }
//    }
//    var n = "selectbox",
//        r = false,
//        i = true;
//    e.extend(s.prototype, {
//        _isOpenSelectbox: function (e) {
//            if (!e) {
//                return r
//            }
//            var t = this._getInst(e);
//            return t.isOpen
//        },
//        _isDisabledSelectbox: function (e) {
//            if (!e) {
//                return r
//            }
//            var t = this._getInst(e);
//            return t.isDisabled
//        },
//        _attachSelectbox: function (t, s) {
//            function g() {
//                var t, n, r = this.attr("id").split("_")[1];
//                for (t in u._state) {
//                    if (t !== r) {
//                        if (u._state.hasOwnProperty(t)) {
//                            n = e("select[sb='" + t + "']")[0];
//                            if (n) {
//                                u._closeSelectbox(n)
//                            }
//                        }
//                    }
//                }
//            }
//            function y() {
//                var n = arguments[1] && arguments[1].sub ? true : false,
//                    r = arguments[1] && arguments[1].disabled ? true : false;
//                arguments[0].each(function (s) {
//                    var o = e(this),
//                        f = e("<li>"),
//                        d;
//                    if (o.is(":selected")) {
//                        l.text(o.text());
//                        p = i
//                    }
//                    if (s === m - 1) {
//                        f.addClass("last")
//                    }
//                    if (!o.is(":disabled") && !r) {
//                        d = e("<a>", {
//                            href: "#" + o.val(),
//                            rel: o.val()
//                        }).text(o.text()).bind("click.sb", function (n) {
//                            if (n && n.preventDefault) {
//                                n.preventDefault()
//                            }
//                            var r = c,
//                                i = e(this),
//                                s = r.attr("id").split("_")[1];
//                            u._changeSelectbox(t, i.attr("rel"), i.text());
//                            u._closeSelectbox(t)
//                        }).bind("mouseover.sb", function () {
//                            var t = e(this);
//                            t.parent().siblings().find("a").removeClass(a.settings.classFocus);
//                            t.addClass(a.settings.classFocus)
//                        }).bind("mouseout.sb", function () {
//                            e(this).removeClass(a.settings.classFocus)
//                        });
//                        if (n) {
//                            d.addClass(a.settings.classSub)
//                        }
//                        if (o.is(":selected")) {
//                            d.addClass(a.settings.classFocus)
//                        }
//                        d.appendTo(f)
//                    } else {
//                        d = e("<span>", {
//                            text: o.text()
//                        }).addClass(a.settings.classDisabled);
//                        if (n) {
//                            d.addClass(a.settings.classSub)
//                        }
//                        d.appendTo(f)
//                    }
//                    f.appendTo(h)
//                })
//            }
//            if (this._getInst(t)) {
//                return r
//            }
//            var o = e(t),
//                u = this,
//                a = u._newInst(o),
//                f, l, c, h, p = r,
//                d = o.find("optgroup"),
//                v = o.find("option"),
//                m = v.length;
//            o.attr("sb", a.uid);
//            e.extend(a.settings, u._defaults, s);
//            u._state[a.uid] = r;
//            o.hide();
//            f = e("<div>", {
//                id: "sb-holder_" + a.uid,
//                "class": a.settings.classHolder,
//                tabindex: o.attr("tabindex")
//            });
//            l = e("<a>", {
//                id: "sb-selector_" + a.uid,
//                href: "#",
//                "class": a.settings.classSelector,
//                click: function (n) {
//                    n.preventDefault();
//                    g.apply(e(this), []);
//                    var r = e(this).attr("id").split("_")[1];
//                    if (u._state[r]) {
//                        u._closeSelectbox(t)
//                    } else {
//                        u._openSelectbox(t)
//                    }
//                }
//            });
//            c = e("<a>", {
//                id: "sb-toggle_" + a.uid,
//                href: "#",
//                "class": a.settings.classToggle,
//                click: function (n) {
//                    n.preventDefault();
//                    g.apply(e(this), []);
//                    var r = e(this).attr("id").split("_")[1];
//                    if (u._state[r]) {
//                        u._closeSelectbox(t)
//                    } else {
//                        u._openSelectbox(t)
//                    }
//                }
//            });
//            c.appendTo(f);
//            h = e("<ul>", {
//                id: "sb-options_" + a.uid,
//                "class": a.settings.classOptions,
//                css: {
//                    display: "none"
//                }
//            });
//            o.children().each(function (t) {
//                var n = e(this),
//                    r, i = {};
//                if (n.is("option")) {
//                    y(n)
//                } else if (n.is("optgroup")) {
//                    r = e("<li>");
//                    e("<span>", {
//                        text: n.attr("label")
//                    }).addClass(a.settings.classGroup).appendTo(r);
//                    r.appendTo(h);
//                    if (n.is(":disabled")) {
//                        i.disabled = true
//                    }
//                    i.sub = true;
//                    y(n.find("option"), i)
//                }
//            });
//            if (!p) {
//                l.text(v.first().text())
//            }
//            e.data(t, n, a);
//            f.data("uid", a.uid).bind("keydown.sb", function (t) {
//                var r = t.charCode ? t.charCode : t.keyCode ? t.keyCode : 0,
//                    i = e(this),
//                    s = i.data("uid"),
//                    o = i.siblings("select[sb='" + s + "']").data(n),
//                    a = i.siblings(["select[sb='", s, "']"].join("")).get(0),
//                    f = i.find("ul").find("a." + o.settings.classFocus);
//                switch (r) {
//                case 37:
//                case 38:
//                    if (f.length > 0) {
//                        var l;
//                        e("a", i).removeClass(o.settings.classFocus);
//                        l = f.parent().prevAll("li:has(a)").eq(0).find("a");
//                        if (l.length > 0) {
//                            l.addClass(o.settings.classFocus).focus();
//                            e("#sb-selector_" + s).text(l.text())
//                        }
//                    }
//                    break;
//                case 39:
//                case 40:
//                    var l;
//                    e("a", i).removeClass(o.settings.classFocus);
//                    if (f.length > 0) {
//                        l = f.parent().nextAll("li:has(a)").eq(0).find("a")
//                    } else {
//                        l = i.find("ul").find("a").eq(0)
//                    } if (l.length > 0) {
//                        l.addClass(o.settings.classFocus).focus();
//                        e("#sb-selector_" + s).text(l.text())
//                    }
//                    break;
//                case 13:
//                    if (f.length > 0) {
//                        u._changeSelectbox(a, f.attr("rel"), f.text())
//                    }
//                    u._closeSelectbox(a);
//                    break;
//                case 9:
//                    if (a) {
//                        var o = u._getInst(a);
//                        if (o) {
//                            if (f.length > 0) {
//                                u._changeSelectbox(a, f.attr("rel"), f.text())
//                            }
//                            u._closeSelectbox(a)
//                        }
//                    }
//                    var c = parseInt(i.attr("tabindex"), 10);
//                    if (!t.shiftKey) {
//                        c++
//                    } else {
//                        c--
//                    }
//                    e("*[tabindex='" + c + "']").focus();
//                    break;
//                case 27:
//                    u._closeSelectbox(a);
//                    break
//                }
//                t.stopPropagation();
//                return false
//            }).delegate("a", "mouseover", function (t) {
//                e(this).addClass(a.settings.classFocus)
//            }).delegate("a", "mouseout", function (t) {
//                e(this).removeClass(a.settings.classFocus)
//            });
//            l.appendTo(f);
//            h.appendTo(f);
//            f.insertAfter(o);
//            e("html").live("mousedown", function (t) {
//                t.stopPropagation();
//                e("select").selectbox("close")
//            });
//            e([".", a.settings.classHolder, ", .", a.settings.classSelector].join("")).mousedown(function (e) {
//                e.stopPropagation()
//            })
//        },
//        _detachSelectbox: function (t) {
//            var i = this._getInst(t);
//            if (!i) {
//                return r
//            }
//            e("#sb-holder_" + i.uid).remove();
//            e.data(t, n, null);
//            e(t).show()
//        },
//        _changeSelectbox: function (t, n, r) {
//            var s, o = this._getInst(t);
//            if (o) {
//                s = this._get(o, "onChange");
//                e("#sb-selector_" + o.uid).text(r)
//            }
//            n = n.replace(/\'/g, "\\'");
//            e(t).find("option[value='" + n + "']").attr("selected", i);
//            if (o && s) {
//                s.apply(o.input ? o.input[0] : null, [n, o])
//            } else if (o && o.input) {
//                o.input.trigger("change")
//            }
//        },
//        _enableSelectbox: function (t) {
//            var i = this._getInst(t);
//            if (!i || !i.isDisabled) {
//                return r
//            }
//            e("#sb-holder_" + i.uid).removeClass(i.settings.classHolderDisabled);
//            i.isDisabled = r;
//            e.data(t, n, i)
//        },
//        _disableSelectbox: function (t) {
//            var s = this._getInst(t);
//            if (!s || s.isDisabled) {
//                return r
//            }
//            e("#sb-holder_" + s.uid).addClass(s.settings.classHolderDisabled);
//            s.isDisabled = i;
//            e.data(t, n, s)
//        },
//        _optionSelectbox: function (t, i, s) {
//            var o = this._getInst(t);
//            if (!o) {
//                return r
//            }
//            o[i] = s;
//            e.data(t, n, o)
//        },
//        _openSelectbox: function (t) {
//            var r = this._getInst(t);
//            if (!r || r.isOpen || r.isDisabled) {
//                return
//            }
//            var s = e("#sb-options_" + r.uid),
//                o = parseInt(e(window).height(), 50),
//                u = e("#sb-holder_" + r.uid).offset(),
//                a = e(window).scrollTop(),
//                f = s.prev().height(),
//                l = o - (u.top - a) - f / 2,
//                c = this._get(r, "onOpen");
//            s.css({
//                top: f + "px",
//                maxHeight: l - f + "px"
//            });
//            r.settings.effect === "fade" ? s.fadeIn(r.settings.speed) : s.slideDown(r.settings.speed);
//            e("#sb-toggle_" + r.uid).addClass(r.settings.classToggleOpen);
//            this._state[r.uid] = i;
//            r.isOpen = i;
//            if (c) {
//                c.apply(r.input ? r.input[0] : null, [r])
//            }
//            e.data(t, n, r)
//        },
//        _closeSelectbox: function (t) {
//            var i = this._getInst(t);
//            if (!i || !i.isOpen) {
//                return
//            }
//            var s = this._get(i, "onClose");
//            i.settings.effect === "fade" ? e("#sb-options_" + i.uid).fadeOut(i.settings.speed) : e("#sb-options_" + i.uid).slideUp(i.settings.speed);
//            e("#sb-toggle_" + i.uid).removeClass(i.settings.classToggleOpen);
//            this._state[i.uid] = r;
//            i.isOpen = r;
//            if (s) {
//                s.apply(i.input ? i.input[0] : null, [i])
//            }
//            e.data(t, n, i)
//        },
//        _newInst: function (e) {
//            var t = e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
//            return {
//                id: t,
//                input: e,
//                uid: Math.floor(Math.random() * 99999999),
//                isOpen: r,
//                isDisabled: r,
//                settings: {}
//            }
//        },
//        _getInst: function (t) {
//            try {
//                return e.data(t, n)
//            } catch (r) {
//                throw "Missing instance data for this selectbox"
//            }
//        },
//        _get: function (e, n) {
//            return e.settings[n] !== t ? e.settings[n] : this._defaults[n]
//        }
//    });
//    e.fn.selectbox = function (t) {
//        var n = Array.prototype.slice.call(arguments, 1);
//        if (typeof t == "string" && t == "isDisabled") {
//            return e.selectbox["_" + t + "Selectbox"].apply(e.selectbox, [this[0]].concat(n))
//        }
//        if (t == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
//            return e.selectbox["_" + t + "Selectbox"].apply(e.selectbox, [this[0]].concat(n))
//        }
//        return this.each(function () {
//            typeof t == "string" ? e.selectbox["_" + t + "Selectbox"].apply(e.selectbox, [this].concat(n)) : e.selectbox._attachSelectbox(this, t)
//        })
//    };
//    e.selectbox = new s;
//    e.selectbox.version = "0.2"
//})(jQuery)
/** HKUST customization end **/