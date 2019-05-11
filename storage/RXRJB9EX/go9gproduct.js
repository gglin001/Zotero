
(function($){$.fn.pbAjax=function(args){var widgetId=$(this).attr('widget-id');if(!widgetId){widgetId=$(this).data('widget-id');}
if(!widgetId){widgetId=$(this).attr('id');}
var pbContext=$("[name='pbContext']").attr('content');if((widgetId!==null)&&(widgetId!==undefined)){var data=args['data']?args['data']:{};data['pbContext']=pbContext;data['widgetId']=widgetId;var targetUrl=args['url'];var requestMethod=args.hasOwnProperty('type')?args['type']:'GET';var requestDataType=args.hasOwnProperty('dataType')?args['dataType']:'html';var asyncRequest=args.hasOwnProperty('async')?args['async']:true;var successFunction=args['success'];var failFunction=args['error'];return $.ajax({type:requestMethod,dataType:requestDataType,async:asyncRequest,url:targetUrl,data:data,success:successFunction,error:failFunction});}
else{console.log("widgetId not found");}};})(jQuery);var literatum = {};literatum.events = (function() {
    var instance = {};
    var listenersMap = {};

    instance.register = function(eventName, callback) {
        var listeners = listenersMap[eventName];
        if (!listeners) {
            listenersMap[eventName] = listeners = [];
        }
        listeners.push(callback);
    };

    instance.deregisterAll = function() {
        listenersMap = {};
    };

    instance.notify = function(eventName, data) {
        //console.log("Event '" + eventName + "' triggered.")
        var listeners = listenersMap[eventName];
        if (listeners) {
            listeners.forEach(function(listener) {
                listener(data);
            });
        }
    };

    return instance;
}());literatum.Widget = function(widgetDef, element) {
    this.state = -1;
    this.$element = $(element);
    this.widgetDef = widgetDef;
    if (widgetDef) {
        this.registerListeners();
    }
};

literatum.Widget.prototype.get = function() {
    return this.$element;
};

literatum.Widget.prototype.resize = function(e) {};

literatum.Widget.prototype.render = function(model, params, callback, renderer) {
    if (this.widgetDef.action) {
        return literatum.widgets.getWidget(this, model, params, callback, renderer);
    }
};

literatum.Widget.prototype.lostFocus = function() {
    // nothing
};

literatum.Widget.prototype.updateView = function(view, model) {
    var $this = this.get();
    var $html = $(view.trim());
    if ($html.length > 0) {
        $this.replaceWith($html);
        this.$element = $("*[widget-id='" + $html.attr('widget-id') + "']");
        if (this.$element.length === 0) {
            this.$element = $("#" + $html.attr('id'));
        }
        if (this.$element.length === 0) {
            this.$element = $("*[data-widget-id='" + $html.attr('data-widget-id') + "']");
        }
    } else {
        this.$element.html("");
    }
    this.registerListeners();
    this.triggerInfoHandlers(this, model);
};

literatum.Widget.prototype.triggerInfoHandlers = function(widget, model) {
    var infoHandlers = widget.widgetDef.infoHandlers;
    if (model && model.attributes && infoHandlers) {
        Object.keys(model.attributes).forEach(function(key) {
            var infoHandler = infoHandlers[key];
            if (infoHandler) {
                infoHandler(model.attributes[key], widget, model);
            }
        });
    }
};

literatum.Widget.prototype.registerListeners = function() {
    try {
        this.unbind();
    } catch(e) {
        console.log(e);
    }
    try {
        //console.log("Binding events to candidate elements");
        this.bind();
    } catch (e) {
        console.log("Failed to bind events, rolling back...");
        this.unbind();
    }
};

literatum.Widget.prototype.update = function(model) {
    var result;
    console.log("Updating " + this.widgetDef.id + "...");
    if (!literatum.utils.hasErrors(model.attributes)) {
        result = this.render(model, {});
        console.log("Updating " + this.widgetDef.id + "... Content");
    } else {
        this.triggerInfoHandlers(this, model);
        this.loaded();
        console.log("Updating " + this.widgetDef.id + "... Info");
        result = $.Deferred().resolve();
    }
    return result;
};

literatum.Widget.prototype.bind = function() {
    var thisWidget = this;

    if (!thisWidget.widgetDef.binders)
        return;

    this.find("*[data-bind]").each(function() {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('click', function (e) {
                //literatum.events.notify('user-action');
                binder.call(this, e, thisWidget);
            });
        }
    });

    this.find("*[data-bind-change]").each(function() {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('change', function (e) {
                literatum.events.notify('user-action');
                binder.call(this, e, thisWidget);
            });
        }
    });
};

literatum.Widget.prototype.unbind = function() {
    this.find("*[data-bind]").each(function() {
        $(this).off();
    });
};

literatum.Widget.prototype.find = function(selector) {
    return this.get().find(selector);
};

literatum.Widget.prototype.collectForms = function() {
    var $elements = this.find("form");
    var forms = {};
    $elements.each(function() {
        var $this = $(this);
        var name = $(this).attr('name');
        if (name) {
            var form = {};
            forms[name] = form;
            $this.find("input[type!='checkbox'], textarea").each(function() {
                form[$(this).attr('name')] = $(this).val();
            });

            $this.find("input[type='checkbox']").each(function() {
                if ($(this).is(":checked")) {
                    form[$(this).attr('name')] = $(this).val();
                }
            });

            $this.find("select").each(function() {
                form[$(this).attr('name')] =  $(this).find('option:selected').val();
            });
        }
    });
    this.find("*[data-form]").each(function() {
        var name = $(this).data('form');
        if (name) {
            var form = {};
            forms[name] = form;
            $(this).find("*[data-field]").each(function() {
                var $this = $(this);
                var value = $this.data('value');
                if (!value) {
                    value = $this.text().trim();
                }
                form[$this.data('field')] = value;
            });
        }
    });
    return forms;
};

literatum.Widget.prototype.updateForm = function(formName, sourceForm, merge) {
    var forms = this.find("form[name='" + formName + "']");
    if (forms) {
        var form = forms[0];
        if (form) {
            var $form = $(form);
            $form.find("input").each(function() {
                var $this = $(this);
                if ($this.attr("type") == 'submit') {
                    return;
                }

                var value = sourceForm[$this.attr('name')];
                if (merge && !value)
                    return;

                $this.val(value);
            });

            var $select = $form.find("select");
            $select.each(function() {
                var $this = $(this);
                var value = sourceForm[$this.attr('name')];

                if (merge && !value)
                    return;

                if (value) {
                    $this.closest(".input-group").show();
                }

                $this.find('option').prop('selected', false);
                $this.find("option[value='" + value + "']").prop('selected',true);
            });
        }
    }
};

literatum.Widget.prototype.initialize = function() {
    this.registerListeners();
};

literatum.Widget.prototype.loading = function() {
    $("body").addClass("widget-loading");
};

literatum.Widget.prototype.error = function() {
    //$("body").addClass("widget-error");
};

literatum.Widget.prototype.loaded = function() {
    //$("body").removeClass("widget-loading");
};

literatum.Widget.prototype.reset = function() {
    this.getNotifications().forEach(function(item) {
        item.reset();
    });
};

literatum.Widget.prototype.getNotifications = function() {
    var result = [];
    this.find("*[data-notification]").each(function() {
        if (this.literatumNotification) {
            result.push(this.literatumNotification);
        }
    });
    return result;
};

literatum.Widget.prototype.getNotification = function(name) {
    if (!this.widgetDef.notifications)
        return null;

    var thisWidget = this;

    var notification = null;

    this.find("*[data-notification='" + name + "']").each(function() {
        var notificationType = thisWidget.widgetDef.notifications[name];
        if (!this.literatumNotification) {
            this.literatumNotification = new notificationType(this);
        }
        notification = this.literatumNotification;
    });

    return notification;
};

literatum.Widget.prototype.register = function(service) {
    var thisWidget = this;
    commerce.cart.register(service, function(model) {
        return thisWidget.update(model);
    });
};
literatum.widgets = (function() {
    var instance = {};
    var widgetDefs = [];
    var widgets = [];


    function render(template, model) {
        Object.keys(model).forEach(function(key) {
            var re = new RegExp('\\{{' + key + '\\}}', 'g');
            template = template.replace(re, model[key]);
        });
        template = template.replace(/{{.+?}}/g,'');
        return template;
    }

    $(window).on('resize', function(e) {
        widgets.forEach(function(widget) {
            widget.resize(e);
        });
    });

    instance.render = function(widget, model, params, callback, renderer) { // FIXME: clean me
        return widget.render(model, params, callback, renderer);
    };

    instance.getWidget = function(widget, model, params, callback, renderer) {
        return widget.get().pbAjax({
            type: 'GET',
            url: widget.widgetDef.action,
            dataType: 'html',
            data: params,
            async: true,
            success: function(html) {
                var result = render(html, model);
                if (renderer) {
                    renderer(html, model);
                } else {
                    widget.updateView(result, model);
                }
                //widget.get().fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400); // For debugging
                widget.loaded(); // This is not needed, confirm and remove
                if (callback) {
                    callback();
                }
                literatum.events.notify('widget-rendered');
            },
            error: function(data) {
                widget.error();
            }
        });
    };

    instance.get = function(id) {
        var result = [];
        widgets.forEach(function(item){
            if (item.widgetDef.id == id)
                result.push(item);
        });
        return result;
    };
    //instance.find = function(widgetId) {
    //    var $result = $("*[widget-def='" + widgetId +"']");
    //    if ($result.length > 0) {
    //        return $result;
    //    }
    //    return $("." + widgetId);
    //};
    instance.all = function() {
        return widgets.slice(0);
    };

    instance.collapse = function() {
        widgets.forEach(function(widget) {
            widget.hide();
        });
    };

    instance.register = function(widgetDef) {
        widgetDefs.push(widgetDef);
    };

    instance.initialize = function() {
        widgetDefs.forEach(function(WidgetDef) {
            WidgetDef.find().each(function() {
                var instance = Object.create(WidgetDef.prototype);
                WidgetDef.call(instance, WidgetDef, this);
                widgets.push(instance);
            });
        });
    };

    return instance;
}());

$(document).ready(function() {
    literatum.widgets.initialize();
});

console.log("Widgets initialized!");literatum.Loading = function(deferred) {
    this.start();
    this.deferred = deferred;
    $.when(deferred).then(this.done);
};

literatum.Loading.prototype.start = function() {};

literatum.Loading.prototype.done = function() {};literatum.FullPageLoading = function() {
    this.message = '';
};

literatum.FullPageLoading.prototype = new literatum.Loading();

literatum.FullPageLoading.prototype.start = function() {
    $("body").append('<div class="loading-overlay"><div class="loading-container"><div class="loading"></div><div class="loading-message">' + this.message + '</div></div></div></div>');
    var isIOS = navigator.userAgent.match(/ipad|ipod|iphone/i);
    if(!isIOS) {
        $(".loading-overlay").fadeIn(200);
    }else{
        $(".loading-overlay").show();
    }
    return this;
};

literatum.FullPageLoading.prototype.done = function() {
    var $overlay = $(".loading-overlay");
    var isIOS = navigator.userAgent.match(/ipad|ipod|iphone/i);
    if(!isIOS){
        $overlay.fadeOut(200);
    }else{
        $overlay.hide();
    }

    $overlay.remove();
};

literatum.FullPageLoading.prototype.setMessage = function(message) {
    this.message = message;
};/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,m=_.height,g=_.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+_+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:b,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);/*! jQuery UI menu - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){t.widget("ui.menu",{version:"1.10.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,t.proxy(function(t){this.options.disabled&&t.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(t){t.preventDefault()},"click .ui-state-disabled > a":function(t){t.preventDefault()},"click .ui-menu-item:has(a)":function(e){var i=t(e.target).closest(".ui-menu-item");!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.mouseHandled=!0,this.select(e),i.has(".ui-menu").length?this.expand(e):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){var i=t(e.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.children(".ui-menu-item").eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){t(e.target).closest(".ui-menu").length||this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){function i(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,n,a,o,r,h=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:h=!1,n=this.previousFilter||"",a=String.fromCharCode(e.keyCode),o=!1,clearTimeout(this.filterTimer),a===n?o=!0:a=n+a,r=RegExp("^"+i(a),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())}),s=o&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(a=String.fromCharCode(e.keyCode),r=RegExp("^"+i(a),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())})),s.length?(this.focus(e,s),s.length>1?(this.previousFilter=a,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i=this.options.icons.submenu,s=this.element.find(this.options.menus);s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),s=e.prev("a"),n=t("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",s.attr("id"))}),e=s.add(this.element),e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),e.children(":not(.ui-menu-item)").each(function(){var e=t(this);/[^\-\u2014\u2013\s]/.test(e.text())||e.addClass("ui-widget-content ui-menu-divider")}),e.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),this._super(t,e)},focus:function(t,e){var i,s;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=e.height(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(e),undefined)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(e),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){var t=0;e.widget("ui.autocomplete",{version:"1.10.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,undefined;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:case a.NUMPAD_ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,s.preventDefault(),undefined;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),undefined):(this._searchTimeout(e),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(e),this._change(e),undefined)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({input:e(),role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),undefined;var s=i.item.data("ui-autocomplete-item");!1!==this._trigger("focus",t,{item:s})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(s.value):this.liveRegion.text(s.value)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):undefined},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,i=++t;return function(s){i===t&&e.__response(s),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<a>").text(i.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[e](t),undefined):(this.search(null,t),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments),this.options.disabled||this.cancelSearch||(t=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.text(t))}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.2",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,a=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=a),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function a(t){l.of=t,o.is(":hidden")||o.position(l)}var o,r,h,l=t.extend({},this.options.position);if(n){if(o=this._find(s),o.length)return o.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),o=this._tooltip(s),e(s,o.attr("id")),o.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:a}),a(i)):o.position(t.extend({of:s},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(a(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:o}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(o)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),a=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),a.stop(!0),this._hide(a,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:a}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);/* (c) Atypon
 This provides support for search related widgets */
(function ($) {
    var desktopWidth = 992;
    $(document).ready(function() {

    if ($(window).width() > desktopWidth) {
        $('.fancy-tooltip').tooltip({
            show: {
                effect: "fadeIn",
                delay: 250
            }
        });
    }
    $('.citationSearchBoxContainer input').each(function(index,input){
        $(input).attr('disabled','disabled')
    });

    $('.quickSearchForm').submit(function(e){
        var submit;
        ($('.quickSearchForm input[type=search]')).each(function(index,input){
            if($(input).attr('disabled') != 'disabled' &&  $(input).val() != ''){
                submit = true;
                return false;
            }
        });
        ($('.quickSearchForm input[type=text]')).each(function(index,input){
            if($(input).attr('disabled') != 'disabled' &&  $(input).val() != ''){
                submit = true;
                return false;
            }
        });
        if(submit){
            return true;
        }
        window.location = '/search/advanced';
        return false;

    });

    quickSearch.initAutoComplete();

    $(".js__searchInSelector").on('change',quickSearch.quickSearchSelectionHandler);

});

quickSearch = function(){

    function _citationSearchMode($dropdown) {
        var container = $dropdown.closest("form");
        container.find('.simpleSearchHelp').hide();
        container.find('.simpleSearchBoxContainer').hide();
        _disableInputs(container.find('.simpleSearchBoxContainer'));
        _enableInputs(container.find('.citationSearchBoxContainer'));
        container.find(".citationSearchBoxContainer").find("input[name='quickLinkYear']").attr("disabled", true);
        container.find(".citationSearchBoxContainer").find("input[name='quickLinkVolume']").attr("disabled", true);
        container.find(".citationSearchBoxContainer").find("input[name='quickLinkPage']").attr("disabled", true);
        if(container.find(".citationSearchBoxContainer").find("input[name='quickLinkIssue']").attr("type")!="hidden"){
            container.find(".citationSearchBoxContainer").find("input[name='quickLinkIssue']").attr("disabled", true);
        }
        if ($('.quickSearchFormContainer input[name="quickLinkJournal"]').val()!="") {
            $(".quickSearchFormContainer .mainSearchButton").removeAttr("disabled");
        }
        else {
            $(".quickSearchFormContainer .mainSearchButton").attr('disabled', true);
        }
        setupCitationSubmitButton('quickSearchFormContainer');
        container.find('.citationHelp').show();
        container.find('.citationSearchBoxContainer').show();
        container.attr('action','/action/quickLink');
    };

    function _simpleSearchMode($dropdown){
        var container = $dropdown.closest("form");
        container.find('.citationHelp').hide();
        container.find('.citationSearchBoxContainer').hide();
        _disableInputs(container.find('.citationSearchBoxContainer'));
        _enableInputs(container.find('.simpleSearchBoxContainer'));
        container.find('.simpleSearchBoxContainer').show();
        container.find('.simpleSearchHelp').show();
        container.attr('action','/action/doSearch');
        container.find("input[type='hidden'][name='SeriesKey']").attr('disabled',true);
        $(".quickSearchFormContainer .mainSearchButton").removeAttr("disabled");
    };

    function _disableInputs($selector){
        $selector.find('input').each(function(index,input){
            $(input).attr('disabled','disabled')
        });
    };

    function _enableInputs($selector){
        $selector.find('input').each(function(index,input){
            $(input).removeAttr("disabled");
        });
    };
    function setupCitationSubmitButton(container) {

        $('.quickSearchFormContainer input[name="quickLinkJournal"]').on('keyup', function () {
            if ($('.quickSearchFormContainer  input[name="quickLinkJournal"]').val() == '') {
                $(".quickSearchFormContainer .mainSearchButton").attr('disabled', true);
            }
            else {
                $(".quickSearchFormContainer .mainSearchButton").removeAttr("disabled");
            }
        });

    };

    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().addClass('quickSearchAutocomplete');
            this.widget().menu( "option", "items", "> :not(.qsaCategory)" );
        },
        _renderMenu: function( ul, items ) {
            var fuzzySuggesterEnabled = $(this.element).data('fuzzy-suggester');
            var that = this;
            if(fuzzySuggesterEnabled){$(ul).addClass('newSuggester')}
            $.each(items, function (index, item) {
                if(fuzzySuggesterEnabled){
                    var catSelector = ".ui-autocomplete-category[data-category='" + item.category + "']";
                    if ($(catSelector).length < 1) {
                        if(item.category === 'Quick Links'){
                            ul.prepend("<li class='ui-autocomplete-category' data-category='" + item.category + "'>" + item.category + "</li>");
                        }else{
                            ul.append("<li class='ui-autocomplete-category' data-category='" + item.category + "'>" + item.category + "</li>");
                        }

                    }
                    var $item = that._renderItemData(ul, item);
                    $(ul).children(catSelector).after($item);
                }else{
                    var $item = that._renderItemData(ul, item);
                    $(ul).append($item);
                }

            });
            if($('.ui-autocomplete-category').size() < 2){
                $('.ui-autocomplete-category').remove();
            }
        },
        _renderItem:function (ul, item) {
            var fuzzySuggesterEnabled = $(this.element).data('fuzzy-suggester');

            var $aWrap = $('<a>').addClass("qsaHistoryItem");
            if (item.history){
                var itemSpan = $.parseHTML(item.highlight);
                var removeDiv = $('<a>').attr('href','#').addClass("qsaRemove").html('[Remove]');
                removeDiv.bind('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var selectedHistoryItem = $(e.target.parentNode.parentNode).data().qsaItem;
                    var autoCompeteSearchUri = ['/action/doDeleteHistory?ajax=true&uri=', encodeURIComponent(selectedHistoryItem.value)].join('');
                    $.ajax(autoCompeteSearchUri).done(function(result) {
                        if (result === 'true') {
                            e.target.parentNode.remove();
                        }
                    });
                });
                $aWrap.append(removeDiv);
                $aWrap.append(itemSpan);
            }else{
                $aWrap.html(item.highlight).attr('title',item.label);
            }
            var $elm = $("<li>").data("qsaItem", item).data("item-param", item.param).append($aWrap).addClass('qsaItem');
            if (item.category && fuzzySuggesterEnabled) {
                $elm.attr("aria-label", item.category + " : " + item.label);
                $elm.attr("data-category", item.category);
            }
            return $elm;

        },
        _resizeMenu: function() {
            var ul = this.menu.element;

            if (this.element.outerWidth() < 250) {
                ul.outerWidth(this.element.outerWidth() + 40 / 100 * this.element.outerWidth());
            }else{
                ul.outerWidth(this.element.outerWidth());
            }
        }
    });

    return {

        initAutoComplete: function (dropOption) {

            var that = this;

            $('.quickSearchFormContainer .autocomplete').catcomplete({
                source: function (request, response) {
                    var enteredTerm = request.term;
                    var $inputElem = $(this.element);

                    var maxWords = $inputElem.data("auto-complete-max-words");
                    var maxChars = $inputElem.data("auto-complete-max-chars");
                    if(enteredTerm.split(" ").length > maxWords || enteredTerm.length > maxChars || !enteredTerm.replace(/\s/g, '').length){
                        return false;
                    }
                    var selectedOption = $('.js__searchInSelector option:selected').val();

                    var autoCompleteSearchType = '';

                    if (selectedOption === 'Title' ||  selectedOption =='citation') {
                        autoCompleteSearchType = 'title-';
                    } else if (selectedOption === 'Contrib') {
                        autoCompleteSearchType = 'contrib-';
                    }
                    var isDisabled = disableAutoCompleteIfAllSetToZero($inputElem);

                    if(isDisabled === 'false') {
                        sendAjaxRequest($inputElem, dropOption, enteredTerm, autoCompleteSearchType, selectedOption, response);
                    }

                },
                //To prevent showing value when user is using up/down arrow key
                focus: function (event, ui) {
                    return false;
                },
                //autoFocus:true,
                select: function (event, ui) {
                    if($(event.target).attr('name') != 'quickLinkJournal'){
                        $(event.target).val(ui.item.label);
                        window.location.href = ui.item.value;
                    }else{
                        $(event.target).val(ui.item.label);
                    }
                    return false;
                }
            }).bind('click', function (e) {
                    $(this).catcomplete({minLength: 2});
                }
            )
        },
        quickSearchSelectionHandler: function () {

            var selectedValue = $("option:selected", this).data('search-in')
                , $searchInSelector = $('.js__searchInSelector');
            //if selected value = journals,books
            if (selectedValue == 'journal' || selectedValue == 'book') {
                _simpleSearchMode($(this));
                $($searchInSelector).attr('name', 'pubType');
                $('#searchText').attr('name', 'AllField');
            }
            //else if selected value = all, author
            else if (selectedValue == 'AllField' || selectedValue == 'Contrib') {
                _simpleSearchMode($(this));
                $($searchInSelector).attr('name', 'field1');
                $('#searchText').attr('name', 'text1');
            }

            else if (selectedValue == 'citation') {
                _citationSearchMode($(this));
            }
            else if (selectedValue == 'thisIssue') {
                _simpleSearchMode($(this));
                $('.searchText').attr('name', 'AllField');
                $($searchInSelector).attr('name', 'Issue');
                $('.quickSearchForm').find("input[type='hidden'][name='SeriesKey']").removeAttr('disabled');

            }
            else
            if (selectedValue == 'thisJournal' || selectedValue == "thisSeries") {
                _simpleSearchMode($(this));
                $($searchInSelector).attr('name', 'SeriesKey');
                $('.searchText').attr('name', 'AllField');
            }
            else{
                _simpleSearchMode($(this));
                if (selectedValue == "default"){
                    $($searchInSelector).attr('name', '');
                }
                else {
                    $($searchInSelector).attr('name', 'publication');
                }
                $('.searchText').attr('name', 'AllField');

            }
        }
    };
}();

function disableAutoCompleteIfAllSetToZero($inputSearchText){
    var confNumOfHistoryItems = $inputSearchText.data('historyItemsConf');
    var confNumOfPublicationTitles = $inputSearchText.data('publication-titles-conf');
    var confNumOfGroupItems= $inputSearchText.data('group-titles-conf');
    var confNumOfPublicationItems = $inputSearchText.data('publication-items-conf');
    var confNumOfTopics = $inputSearchText.data('topics-conf');
    var confNumOfContributors = $inputSearchText.data('contributors-conf');
    if(confNumOfHistoryItems == 0 && confNumOfGroupItems == 0 && confNumOfPublicationTitles == 0 && confNumOfTopics == 0 && confNumOfContributors == 0 && confNumOfPublicationItems == 0)
        return 'true';
    return 'false';
}

function sendAjaxRequest($inputSearchText,dropOption,enteredTerm ,autoCompleteSearchType,selectedOption ,response){
    var results = [];
    var confNumOfHistoryItems = $inputSearchText.data('history-items-conf');
    var confNumOfPublicationTitles = $inputSearchText.data('publication-titles-conf');
    var confNumOfGroupItems= $inputSearchText.data('group-titles-conf');
    var confNumOfPublicationItems = $inputSearchText.data('publication-items-conf');
    var confNumOfTopics = $inputSearchText.data('topics-conf');
    var confNumOfContributors = $inputSearchText.data('contributors-conf');
    var fuzzySuggesterEnabled = $inputSearchText.data('fuzzy-suggester');
    var displayLabels = $inputSearchText.data('display-labels');

    if (dropOption === 'citation'){ //quick fix for LIT-138406
        var autoCompeteSearchUrl = ['/action/doSuggest?target=title-auto-complete&query=', enteredTerm,
            '&pts=', confNumOfPublicationTitles, '&fl=PubID'].join('');
    }else{
        var autoCompeteSearchUrl = ['/action/doSuggest?target=', autoCompleteSearchType, 'auto-complete&query=', enteredTerm,
            '&hs=', confNumOfHistoryItems, '&pts=', confNumOfPublicationTitles, '&ptgs=' , confNumOfGroupItems , '&ptfs=', confNumOfPublicationItems , '&ts=', confNumOfTopics,
            '&cs=', confNumOfContributors, '&fl=PubID'].join('');
    }
    $.getJSON(autoCompeteSearchUrl)
        .done(function (resultData) {

            var numOfTitles, NumOfGroupItems, numOfItems, numOfTopics, numOfContrib, numOfHistory;
            numOfTitles = NumOfGroupItems = numOfItems = numOfTopics = numOfContrib = numOfHistory = 0;

            var getSuggestion = function(item){
                var suggestion = {
                    'label' : item.label,
                    'highlight' : item.highlight,
                    'category': item.param == 'DOI' ? 'Quick Links' : 'Suggested Search',
                    'param': item.param,
                    'history' : false
                };
                if (item.param === 'history') {
                    suggestion['value'] = decodeURI(item.value);
                    suggestion['history'] = true;
                }else if(selectedOption =='citation'){
                    suggestion['value'] = item.value;
                }
                else{
                    suggestion['value'] =  item.url;
                }


                if(fuzzySuggesterEnabled &&
                    displayLabels){
                        suggestion['highlight'] += '<span class="pull-right suggestionType">' + item.paramFormatted + '</span>';
                }

                return suggestion;
            };

            $.each(resultData, function (i, item) {
                if ( (item.param === 'history') && (numOfHistory < confNumOfHistoryItems) ) {
                    results.push(getSuggestion(item));
                    numOfHistory++;
                } else if ( (item.param === 'SeriesKey') && (numOfTitles < confNumOfPublicationTitles) ) {
                    results.push(getSuggestion(item));
                    numOfTitles++;
                } else if ( (item.param === 'DOI') && (numOfItems < confNumOfPublicationItems) ) {
                    results.push(getSuggestion(item));
                    numOfItems++;
                } else if ( (item.param === 'ContentGroupKey') && (NumOfGroupItems < confNumOfGroupItems) ) {
                    results.push(getSuggestion(item));
                    NumOfGroupItems++;
                } else if ( (item.param === 'ConceptID') && (numOfTopics < confNumOfTopics) ) {
                    results.push(getSuggestion(item));
                    numOfTopics++;
                } else if ( (item.param === 'ContribAuthorStored') && (numOfContrib < confNumOfContributors) ) {
                    results.push(getSuggestion(item));
                    numOfContrib++;
                }
            });
            response(results);
        }).fail(function () {
        console.log('failed');
    });
}
})(jQuery);
function loadRecaptcha(){if(typeof grecaptcha=='undefined')
return;$('.g-recaptcha').filter(function(){return!$(this).hasClass('explicit');}).each(function(){grecaptcha.render($(this)[0],$(this).data());});}
function clearCapcha(){if(typeof grecaptcha!='undefined')
grecaptcha.reset(0);}
function captchaChallengeSubmit(response){$('textarea#g-recaptcha-response').each(function(){if($(this).val()===response){$(this).closest('form').submit();}});}
$(function(){$("pre.show-json").each(function(){var $jsonElement=$(this);$jsonElement.parent().addClass('widget-container');var widgetType=getWidgetType($jsonElement);var widgetId=getWidgetId($jsonElement);$(this).parent().prepend('<button type="button" data-toggle="modal" data-target="#requested-widget-json" class="btn show-json-btn" data-widget-id="'+widgetId+'" title="show json of '+widgetType+'">{...}</button>');});$(".show-json-btn").click(function openShowJsonDialog(){var $jsonElements=$(this).parent().find('>.show-json');if($jsonElements.length>1){$jsonElements=getJsonElementOfWidget($jsonElements,$(this).data("widgetId"));}
var $jsonHtml=$jsonElements[0].outerHTML;var widgetType=getWidgetType($jsonElements);$('.show-json-container .modal__body').html($jsonHtml);$('.show-json-container .modal__header h2').html('Json for '+widgetType);});function getWidgetType($jsonEl){var widgetType=$jsonEl.parent().attr('data-widget-def');if(!widgetType){widgetType=JSON.parse($($jsonEl).text()).thisWidget.widgetName;}
return widgetType;}
function getWidgetId($jsonEl){var widgetType=$jsonEl.parent().attr('data-widget-id');if(!widgetType){widgetType=JSON.parse($($jsonEl).text()).thisWidget.id;}
return widgetType;}
function getJsonElementOfWidget($jsonElement,widgetId){var requestedJsonEl;$jsonElement.each(function(index){if((JSON.parse($(this).text()).thisWidget.id==widgetId)){requestedJsonEl=$(this);return false;}});return requestedJsonEl;}});$(function() {
    $('.avg-score-histogram').each(function() {
        var $this = $(this);
        var context = $this.find('canvas');
        var data = JSON.parse($this.find('.data').text());
        var values = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                values.push(data[key] * 100);
            }
        }
        new Chart(context, {
            type: 'line',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Avg score',
                    data: values,
                    borderColor: '#9fce70',
                    borderWidth: 2,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    pointHoverBackgroundColor: '#425e6a',
                    pointHoverBorderColor: '#425e6a',
                    tension: 0,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks: {
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 10
                        }
                    }]
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Average Exam Score Tracked Over Time'
                },
                tooltips: {
                    mode: 'label'
                },
                hover: {
                    mode: 'label'
                }
            }
        });
    })
});
$(function() {
    var $timers = $('.timer .value');
    if ($timers.length) {
        var interval = 0;
        var format = function(total) {
            var hours = Math.floor(total / 3600);
            var minutes = Math.floor((total - (hours * 3600)) / 60);
            var seconds = total - (hours * 3600) - (minutes * 60);

            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            return hours + ':' + minutes + ':' + seconds;
        };
        var increment = function() {
            console.log(interval);
            interval++;
            $.get('/exam/updateTimeSpent/' + $("input[name='questionIndex']").val());
            $timers.each(function() {
                var $value = $(this);
                var original = parseInt($value.data().value, 10);
                $value.html(format(original + interval));
            });
        };
        setInterval(increment, 1000);
    }
});
$(function() {
    $('.show-subjects').change(function() {
        $('.subjects-table').removeClass('hidden');
    });
    $('.hide-subjects').change(function() {
        $('.subjects-table').addClass('hidden');
    });
});
$(function() {
    $('.show-areas').change(function() {
        $('.areas-table').removeClass('hidden');
    });
    $('.hide-areas').change(function() {
        $('.areas-table').addClass('hidden');
        $('.questions-area')[0].checked = false;
        $('.questions-area')[1].checked = false;
        $('.questions-area')[2].checked = false;
    });
});

$(function() {
    $("input[name='dryRun']").click(function (e) {
        var url = "/pb/widgets/digitalQuestion/calculate"; // the script where you handle the form input.
        $.ajax({
            type: "POST",
            url: url,
            data: $(".create__test__form").serialize(), // serializes the form's elements.
            success: function(data)
            {
                var jsonData = JSON.parse(data);
                if(jsonData.errorMsg) {
                    $("div.error").text(jsonData.errorMsg); // show response from the php script.
                    $("span.result-count").text("");
                }else {
                    $("span.result-count").text(" There are "+jsonData.resultCount+" available questions.");
                    $("div.error").text("");
                }
            }
        });
        e.preventDefault();// avoid to execute the actual submit of the form.
    });
});var commerce = {};

commerce.page = {};

commerce.page.cart = {};literatum.utils = {
    send: function (request, callback, error) {
        if (!request)
            return;

        request.ajaxRequest = true;

        return $.ajax({
            url: '/action/' + request.action,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            crossDomain: true,
            xhrFields: {withCredentials: true},
            data: request,
            success: callback,
            error: error
        });
    },
    copyForm: function (source, to) {
        $(source).find('input').each(function () {
            var name = $(this).attr('name');
            var targetField = $(to).find("input[name='" + name + "']");
            targetField.val($(this).val());
        });

        $(source).find('select').each(function () {
            var value = $(this).find('option:selected').val();
            $(to).find("select[name='" + $(this).attr('name') + "']").find("option[value='" + value + "']").attr('selected', '');
        });
    },
    clearForm: function (form) {
        $(form).click(function () {
            $(this).find("input[type=text], select, textarea").val('');
        });
    },
    hasErrors: function (attributes) {
        var hasErrors = false;
        Object.keys(attributes).forEach(function (key) {
            hasErrors |= (key.toLowerCase().indexOf("error") > -1);
        });
        return hasErrors;
    },
    hasAttributes: function (attributes) {
        return attributes && Object.keys(attributes).length > 0;
    },
    scroll: function(selector, speed, offset) {
        var $object = null;

        if (selector instanceof jQuery) {
            $object = selector;
        } else {
            $object = $(selector);
        }

        if (!$object || $object.length == 0)
            return;

        if (typeof speed === 'undefined') {
            speed = 2000;
        }

        if (typeof offset === 'undefined') {
            offset = $object.offset().top;
        } else {
            offset = $object.offset().top - offset
        }

        $('html, body').animate({
            scrollTop: offset
        }, speed);
    },
    nextCheckoutSection: function () {
        var $widget = $(".eCommerceCheckoutFieldsWidget .scroll-focus").closest('.widget');
        if ($(window).width() > 992) {
            literatum.utils.scroll($widget, 800, 10);
        }else{
            literatum.utils.scroll($widget, 800, 60);
        }
    },
    getCountryState: function(iso2Alpha, callback) {
        return literatum.utils.send({
            action: 'getCountryStates',
            country: iso2Alpha
        }, callback);
    }
};


///////////////////////////////// TEMP

/*$(".add-to-cart").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("opened");
    $(this).find(".purchaseArea").slideToggle();

    var purchaseAreaWidth = $(this).parent().width();
    $(this).find(".purchaseArea").css('width', purchaseAreaWidth);

});*/

if ($(".add-to-cart").length > 0) {
    $("body").click(function (e) {
        var $target = $(e.target);
        if (!$target.hasClass("add-to-cart") && $target.closest(".add-to-cart").length == 0) {
            $(".add-to-cart").removeClass("opened");
            $(".add-to-cart").find(".purchaseArea").slideUp();
        }
    });
}

// Needs review
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    console.log("Form");
    console.log(a);
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};commerce.binders = (function() {
    var instance = {};

    instance.removeDiscount = function(e) {
        e.preventDefault();
        commerce.cart.discounts.remove($(this).data('discount'));
    };

    instance.disableDiscount = function(e) {
        e.preventDefault();
        commerce.cart.discounts.disable($(this).data('discount'));
    };

    instance.removeItem = function(e) {
        e.preventDefault();
        commerce.cart.buyingList.remove($(this).data("item-id"));
    };







    instance.submitBilling = function(e) {
        e.preventDefault();
        commerce.cart.billing.update($("form.billing").serializeObject());
    };

    instance.editBilling = function(e) {
        e.preventDefault();
        literatum.widgets.billing.render({}, {editing: true});
    };

    instance.expandBilling = function(e) {
        e.preventDefault();
        $(".billingAddress").slideToggle();
    };

    instance.sameAsShipping = function(e) {
        if ($(this).is(":checked")) {
            literatum.utils.copyForm('.checkoutShipping form', '.billingPayment form')
        } else {
            literatum.utils.clearForm('.billingPayment form');
        }
    };

    instance.countryChanged = function(e) {
        var countryCode = $(this).val();

        var $state = $(this).closest("form").find("select[name='state']");

        if ($state.find("option[data-country='" + countryCode + "']").length > 0) {
            $state.find("option:not([data-country='" + countryCode + "'])").hide();
            $state.find("option[data-country='" + countryCode + "']").show();
            if (!$state.is(":visible")) {
                $state.parent().slideDown(); // review
            }
        } else {
            $state.parent().slideUp(); // review
        }

        $state.val(null);
    };

    instance.bind = function() {
        $("*[data-bind]").each(function() {
            var binderName = $(this).data("bind");
            console.log("Binding '" + binderName + "' to element '" + this + "'");
            var binder = instance[binderName];
            $(this).on('click', binder);
        });
    };

    instance.unbind = function() {
        $("*[data-bind]").each(function() {
            try {
                var binderName = $(this).data("bind");
                //console.log("Unbinding '" + binderName + "' to element '" + this + "'");
                var binder = instance[binderName];
                $(this).off('click', binder);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return instance;
}());

function registerListeners() {
    // Always unbind before binding again
    try {
        commerce.binders.unbind();
    } catch(e) {
        console.log(e);
    }
    try {
        //console.log("Binding events to candidate elements");
        commerce.binders.bind();
    } catch (e) {
        //console.log("Failed to bind events, rolling back...");
        commerce.binders.unbind();
    }
}
;
literatum.LoginSuggestionsWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);};literatum.LoginSuggestionsWidget.prototype=new literatum.Widget();literatum.LoginSuggestionsWidget.id='loginSuggestions';literatum.LoginSuggestionsWidget.action='/pb/widgets/identity/loginSuggestions';literatum.LoginSuggestionsWidget.binders={start:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var login=$(this).siblings('[name=login]').val();if(!login){login=widget.find("[name=login]").val();}
var id=widget.find("[name=id]").val();var $errorMessage=widget.find('.message.error');var $message=widget.find('.message.info');var redirect=widget.find('[name=redirectUri]').val();var firstTry=widget.find('[name=firstTry]').val();literatum.utils.send({'action':'doPasswordLessLogin','login':login,'loginAction':'start','id':id,'redirectUri':redirect,'firstTry':firstTry},function(data){if(data.success){var loginAction=data['loginAction'];widget.render({},{view:loginAction,'canSwitch':data.canSwitch,'newUser':data.newUser,'message':data.message,'errorMessage':data.errorMessage,'login':login,'redirectUri':data.redirect,'firstTry':data.login!=login});}else{$errorMessage.html(data.errorMessage);$message.html(data.message);}
loading.done();});},submitCode:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var code=widget.find(".code").val();var remember=widget.find("[name=remember]").val();var id=widget.find("[name=id]").val();var redirect=widget.find('[name=redirectUri]').val();literatum.utils.send({'action':'doPasswordLessLogin','code':code,'loginAction':'code','id':id,'remember':remember,'redirectUri':redirect,},function(data){var $message=widget.find('.message.info');var $hiddenMessage=widget.find('[name=hiddenMessage]');var $errorMessage=widget.find('[name=errorMessage]');if(data.success){if(data.newUser){widget.render({},{view:'new'});}else{window.location.href=data.redirect;}}else{$errorMessage.html(data.errorMessage);$message.html(data.message);$errorMessage.removeClass('hidden');$hiddenMessage.addClass('hidden');widget.registerListeners();}
loading.done();});},submitPassword:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var id=widget.find("[name=id]").val();var password=widget.find("[name=password]").val();var remember=widget.find("[name=remember]").val();var $message=widget.find('.message.info');var $errorMessage=widget.find('.message.error');var redirect=widget.find('[name=redirectUri]').val();literatum.utils.send({'action':'doPasswordLessLogin','password':password,'loginAction':'password','id':id,'remember':remember,'redirectUri':redirect},function(data){if(data.success){window.location.href=data.redirect;}else{$errorMessage.html(data.errorMessage);$message.html(data.message);}
loading.done();});},usePassword:function(e,widget){e.preventDefault();var redirect=widget.find('[name=redirectUri]').val();var login=widget.find("[name=login]").val();widget.render({},{view:'password_plw','canSwitch':true,'redirectUri':redirect,'login':login});},useCode:function(e,widget){e.preventDefault();var login=widget.find("[name=login]").val();var id=widget.find("[name=id]").val();var $errorMessage=widget.find('.message.error');var $message=widget.find('.message.info');var redirect=widget.find('[name=redirectUri]').val();literatum.utils.send({'action':'doPasswordLessLogin','login':login,'loginAction':'enablePL','id':id,'redirectUri':redirect},function(data){if(data.success){var loginAction=data['loginAction'];widget.render({},{view:loginAction,'canSwitch':true,'message':data.message,'errorMessage':data.errorMessage,'login':login,'redirectUri':redirect});}else{$errorMessage.html(data.errorMessage);$message.html(data.message);}});},back:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();widget.render({},{},function(){loading.done();});},showIndiv:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var currentView=widget.find("[name=currentView]").val();widget.render({},{view:'individual',currentView:currentView},function(){initIndividualView();loading.done();});},showOrg:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var currentView=widget.find("[name=currentView]").val();widget.render({},{view:'organizational',currentView:currentView},function(){loginSuggestionsInitSearch(function(){loading.done();});});},showPass:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var login=widget.find("[name=login]").val();var emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;var phoneRegex=/^\+\d{12}$/;if(!emailRegex.test(login)&&!phoneRegex.test(login)){widget.render({},{view:'individual',login:login,error2:true},function(){initIndividualView();loading.done();});return;}
var currentView=widget.find("[name=currentView]").val();widget.render({},{view:'password',login:login,currentView:currentView},function(){initPasswordView();loading.done();});},localLogin:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var login=widget.find("[name=login]").val();var password=widget.find("[name=password]").val();var remember=widget.find("[name=remember]").is(':checked');literatum.utils.send({'action':'doLogin','login':login,'password':password,'remember':remember,'redirectUri':'/'},function(data){if(data.success)
window.location.href='/';else{var prevView=widget.find("[name=prevView]").val();widget.render({},{view:'password',error:true,login:login,currentView:prevView},function(){initPasswordView();loading.done();});}});},showAllInstitutions:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();widget.render({},{view:'fullInst'},function(){loading.done();})},removeAccount:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var userId=$(this).siblings('[name=userId]').val();var cloudId=$(this).closest('.suggestion.item').find('[name=cloudId]').val();widget.render({},{userId:userId,cloudId:cloudId},function(){loginSuggestionsInitSearch(function(){loading.done();});});},next:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var url=$(this).closest('.suggestion.item').find('[name=url]').val();if(url){window.location.href=url;}
else{var login=$(this).siblings('[name=login]').val();var currentView=widget.find("[name=currentView]").val();widget.render({},{view:'password',login:login,currentView:currentView},function(){loading.done();});}},showFed:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var fedName=$(this).find('[name=fedName]').val();widget.render({},{view:'fed',fedName:fedName},function(){loading.done();});},showHistory:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();widget.render({},{},function(){loading.done();});}};literatum.LoginSuggestionsWidget.find=function(){var $result=$("*[data-widget-def='"+literatum.LoginSuggestionsWidget.id+"']");if($result.length>0){return $result;}
$result=$("*[widget-def='"+literatum.LoginSuggestionsWidget.id+"']");if($result.length>0){return $result;}
return $("."+literatum.LoginSuggestionsWidget.id);};literatum.LoginSuggestionsWidget.prototype.registerListeners=function(){Object.getPrototypeOf(literatum.LoginSuggestionsWidget.prototype).registerListeners.call(this);this.find('.pass-less-form').each(function(){var $form=$(this);var $login=$form.find('.login');var $submit=$form.find('[name=submit]');$login.on('input',function(){if(!$login.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}});});this.find('.pass-less-form').each(function(){var $form=$(this);var $login=$form.find('.code');var $submit=$form.find('[name=submit]');$login.on('input',function(){if(!$login.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}});});this.find('.pass-less-form').each(function(){var $form=$(this);var $hiddenMessage=$form.find('[name=hiddenMessage]');var $errorMessage=$form.find('[name=errorMessage]');setTimeout(function(){$hiddenMessage.removeClass('hidden');$errorMessage.addClass('hidden');},30000);});};literatum.widgets.register(literatum.LoginSuggestionsWidget);$(document).ready(function(){loginSuggestionsInitSearch();});function initPasswordView(){$('.lgn__sug__submit__pass').prop("disabled",!$('.lgn__sug__password__input').val());$('.lgn__sug__password__input').on('keypress',function(e){var key=e.which||e.keyCode;if(key===13){$('.lgn__sug__submit__pass').trigger("click");}});$('.lgn__sug__password__input').on('keyup',function(){$('.lgn__sug__submit__pass').prop("disabled",!$(this).val());});}
function initIndividualView(){$('.lgn__sug__submit__individual').prop("disabled",!$('.lgn__sug__text__input__individual').val());$('.lgn__sug__text__input__individual').on('keypress',function(e){var key=e.which||e.keyCode;if(key===13){$('.lgn__sug__submit__individual').trigger("click");}});$('.lgn__sug__text__input__individual').on('keyup',function(){$('.lgn__sug__submit__individual').prop("disabled",!$(this).val());});}
function loginSuggestionsInitSearch(fun){var ms=$('#login_suggestions_org_search').magicSuggest({allowFreeEntries:false,data:'/action/ssostart',hideTrigger:true,maxSelection:1,placeholder:'Type the name of your organization',renderer:function(data){return'<div class="vertical-box filter-result">'+'<a href="'+data.institutionUrl+'">'+'<div class="tt-suggestion name">'+data.name+'</div>'+'<div class="tt-suggestion federation no-highlight">'+data.federationName+'</div>'+'</a>'+'</div>';}});$(ms).on("load",fun);};
var Track={};(function(undefined){var jquery=typeof jQuery!='undefined';var elements={};var userAgent=navigator.userAgent.toLowerCase();var defaultAjaxSettings={async:!/webkit/.test(userAgent),asynchronous:!/webkit/.test(userAgent),cache:false,timeout:/msie/.test(userAgent)?0:100,requestTimeout:/msie/.test(userAgent)?0:100,contentType:'application/x-www-form-urlencoded',url:'/action/clickThrough'};var extend=function(dst,src){if(jquery){extend=jQuery.extend;}else{extend=Object.extend;}
return extend(dst,src);};var each=function(o,iterator){if(jquery){each=jQuery.each;}else{each=function(object,callback){var name,i=0,length=object.length,isObj=length===undefined||typeof object==="function";if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break;}}}else{for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}
return object;};}
return each(o,iterator);};var bind=function(selector,options,callback){var jQueryBind=function(selector,options,callback){if(options.selector){jQuery(selector).on(options.on,options.selector,options,callback);}else{jQuery(selector).on(options.on,options,callback);}};var oldJQueryBind=function(selector,options,callback){var callbackToUse=callback;if(options.selector){callbackToUse=function(event){var $target=$(event.currentTarget);while(!$target.is(options.selector)&&$target.children().length){$target.children().each(function(){$target=$(this);if($target.is(options.selector)){return false;}});}
if($target.is(options.selector)){callback.call(event.target,event,options);}};jQuery(selector).data('TrackCallback',callbackToUse);}
jQuery(selector).bind(options.on,options,callbackToUse);};var prototypeBind=function(selector,options,callback){$$(selector).each(function(el){Event.observe(el,options.on,callback.bindAsEventListener(this,options));});};if(jquery){if(jQuery.fn.on){bind=jQueryBind;}else{bind=oldJQueryBind;}}else{bind=prototypeBind;}
return bind(selector,options,callback);};var unbind=function(selector,options,callback){var jQueryUnbind=function(selector,options,callback){if(options.selector){jQuery(selector).off(options.on,options.selector,options,callback);}else{jQuery(selector).off(options.on,options,callback);}};var oldJQueryUnbind=function(selector,options,callback){if(options.selector){callback=jQuery(selector).data('TrackCallback');}
if(callback){jQuery(selector).unbind(options.on,callback);}else{jQuery(selector).unbind(options.on);}};var prototypeUnbind=function(selector,options,callback){$$(selector).each(function(el){Event.stopObserving(el,options.on);});};if(jquery){if(jQuery.fn.on){unbind=jQueryUnbind;}else{unbind=oldJQueryUnbind;}}else{unbind=prototypeUnbind;}
return unbind(selector,options,callback);};var sendBeacon=function(options){var formData=new FormData();for(var key in options.data){if(options.data.hasOwnProperty(key)){formData.append(key,options.data[key]);}}
navigator.sendBeacon(options.url,formData);};var ajax=function(ajaxOptions){if(ajaxOptions.useBeacon&&navigator.sendBeacon){ajax=sendBeacon;}else if(jquery){ajax=jQuery.ajax;}else{ajax=function(options){options.parameters=options.data;new Ajax.Request(options.url,options);}}
ajax(ajaxOptions);};var defaultFire=function(options,data){var ajaxSettings=extend(extend({},defaultAjaxSettings),options.ajaxSettings);ajaxSettings.data=extend(extend({},ajaxSettings.data),data);ajax(ajaxSettings);};var defaultOptions={on:'mouseup',fire:defaultFire,acceptEvent:function(e){return e.which===1||e.which===2;},data:{}};var methods={setup:function(options){if(options.fire!==undefined){defaultFire=options.fire;}
if(options.options!==undefined){defaultOptions=extend(extend({},defaultOptions),options.options);}
if(options.ajax!==undefined){defaultAjaxSettings=extend(extend({},defaultAjaxSettings),options.ajax);}},init:function(el){each(elements=el,function(selector,options){if(Object.prototype.toString.call(options)==='[object Array]'){var array=options;for(var i=0;i<array.length;++i){options=array[i];options=extend(extend({},defaultOptions),options);if(options.fire!==undefined){bind(selector,options,methods.onEvent);}}}else{options=extend(extend({},defaultOptions),options);if(options.fire!==undefined){bind(selector,options,methods.onEvent);}}});return this;},destroy:function(){elements.each(function(selector,options){unbind(selector,options.on,options.fire);});return this;},onEvent:function(event,options){if(options==undefined){options=event.data;}
var data=options.data;if(typeof options.acceptEvent=='function'&&!options.acceptEvent(event)){return true;}
var addData=options.addData;if(typeof addData=='function'){try{extend(data,addData.call(event.target,options,event));}catch(ex){if(console&&console.log){console.log('Failed to extract data:'+ex);return;}}}
options.fire(options,data);return true;}};Track=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}};})();
(function(){window.TrackPageTransitions=function(Track,$,o){o=o||{};var $elements=$('*[data-track]');if(!$elements.length){return;}
Track('setup',{ajax:{url:o.url||'/action/analytics',method:'POST',useBeacon:true}});var captureAllPageTransitions=$('html[data-track]').length!=0;Track({body:[{on:'mousedown keydown',selector:captureAllPageTransitions?'a[href]':'*[data-track] a[href], a[href][data-track]',addData:extractData,acceptEvent:function(e){return e.which==1||e.keyCode==13;},data:{EventType:'PageTransition'}},{on:'submit',selector:captureAllPageTransitions?'form':'*[data-track] form, form[data-track]',addData:extractData,data:{EventType:'PageTransition'}}]});};if(typeof Track!='undefined'){if(typeof jQuery!='undefined'){jQuery(document).ready(function(){TrackPageTransitions(Track,jQuery);});}else if(typeof window.Prototype!='undefined'){document.observe('dom:loaded',function(){TrackPageTransitions(Track,$$);});}}
function collectData(el){var d={};$.each(el.attributes,function(i,attrib){var name=attrib.name;if(name.indexOf('data-')==0){name=name.substring("data-".length);name=name.replace(/-([a-z])/g,function(g){return g[1].toUpperCase();});d[name]=attrib.value;}});return d;}
function extractData(options,event){var data={};var $html=$(document.documentElement);var requestId=$html.data('requestId');if(requestId){data.OriginRequestId=requestId;data.OriginUrl=window.location.href;var date=new Date();date.setTime(date.getTime()+60*1000);var expires=date.toGMTString();document.cookie='OriginRequestId='+requestId+'; expires='+expires+"; path=/";}
var $this=$(this);var href;if($this.is("a")){data.LinkText=$this.text();href=$this.attr('href');}else if($this.is("form")){href=$this.attr('action');}
if(href){data.LinkHref=href;if(href.indexOf('/doi/')!=-1){data.doi=href.split("/doi/")[1];}}
var innerFound=false;$.each($this.add($this.parents()),function(){var $ancestor=$(this);var d=null;try{d=$ancestor.data();}catch(ex){d=false;}
if(d===false){d=collectData($ancestor.get(0));}
for(var property in d){if(d.hasOwnProperty(property)&&property.indexOf("track")==0){var name=property.substring("track".length);if(name=="Func"&&d[property]){var func=window[d[property]];if($.isFunction(func)){try{var extra=func.call($ancestor);if(extra){$.extend(data,extra);}}catch(ex){}}
continue;}
if(name.length){data['Track'+name]=d[property];}
if(!innerFound){innerFound=true;if($this.is('a')){var linkIndex=$('a[href*="/doi"], a[href*="/loi"], a[href*="/toc"]',$ancestor).index($this);if(linkIndex>-1){data.LinkIndex=linkIndex+1;}}}}}});if(event.which==1){data.ClickPageX=event.pageX;data.ClickPageY=event.pageY;}
return data;}})();
(function(){var TrackSearchResults=function(Track,$,undefined){var $searchResults=$('.searchResultContainer, #frmSearchResults, #frmSearch, #searchResultsAll, #searchResults, .searchResult, .search-result, #searchResultContent');if(!$searchResults.length){return;}
Track('setup',{ajax:{url:'/action/analytics',useBeacon:true}});var resultSelectorAction={selector:'a[href^="/doi"], a[href^="/article"]',addData:extractDataSearchResult,data:{EventType:'SearchResultClicked'}};Track({'.searchResultContainer .articleLinks, #frmSearch .articleEntry td, .searchResultsListing li':resultSelectorAction,'#searchResultsAll .articleEntry td, #searchResults .searchResultItem .articleInfo':resultSelectorAction,'#frmSearchResults .articleEntry td, #frmSearchResults .articleEntry div, #frmSearchResults .searchResultItem span':resultSelectorAction,'#frmSearchResults .searchResultItem .atcl-item, #frmSearchResults .searchResultItem div':resultSelectorAction,'#frmSearchResults .searchEntry .searchEntryTools, .searchResult .result-list li':resultSelectorAction,'.contentContainer .searchResult td, .search-result .items-results li span':resultSelectorAction,'#frmSearch .article-details, #frmSearchResults .search-results .search-result-item':resultSelectorAction,'#searchResultContent .o-results .m-result, #frmSearchResults .search-results .articleBox, .search-result .items-results .issue-item_metadata':resultSelectorAction});};if(typeof Track!='undefined'){if(typeof jQuery!='undefined'){jQuery(document).ready(function(){TrackSearchResults(Track,jQuery);});}else if(typeof window.Prototype!='undefined'){document.observe('dom:loaded',function(){TrackSearchResults(Track,$$);});}}
function extractCommonData(data,options,event){var $this=$(this);var searchResultRows;var clickedRow;var $searchResultRow=$this.closest('#searchResultItems, .search-results, .searchEntry, .contentContainer, #frmSearch, #frmSearchResults, #searchResultContent .o-results, .search-result');if($searchResultRow.length){searchResultRows=$searchResultRow.find('.articleEntry, .searchResultItem, .searchEntry, .article-details, .search-result-item, .m-result, .articleBox, .issue-item');clickedRow=$this.closest('.articleEntry, .searchResultItem, .searchEntry, .article-details, .search-result-item, .m-result, .articleBox, .issue-item');}else{$searchResultRow=$this.closest('.searchResultsListing, .result-list, .items-results');if($searchResultRow.length){searchResultRows=$searchResultRow.children('li');clickedRow=$this.closest('li');}}
if(searchResultRows.length&&clickedRow.length){data.searchPageRank=searchResultRows.index(clickedRow)+1;}
var $container=$this.closest('.searchResultContainer, .type-search-results, .searchNav, .searchResult, .search-result, #searchResultContent');if(!$container.length){$container=$('.searchResults_paging, .searchResultsCont, .searchResults');}
if($container.length){var $selectedPage=$container.find('.pages .selected:first, .pages .activeLink:first, .pages .current:first, .searchPages .activeLink:first, .pagination .activeLink:first, .pagination .active:first, .pageLinks .selected:first, .paginationLinks .s-active:first');if($selectedPage.length){data.resultPageNum=parseInt($selectedPage.text());}else{var $paginationElements=$container.find('.paginationControls, .paginationLinks').first().find('li:not(:has(a))');if($paginationElements.length){$paginationElements.each(function(){var $innerMostChildOfPagination=$(this).children();while($innerMostChildOfPagination.length){$innerMostChildOfPagination=$innerMostChildOfPagination.children();}
$selectedPage=$.trim($innerMostChildOfPagination.end().text());if($selectedPage.length&&isInt($selectedPage)){data.resultPageNum=parseInt($selectedPage);return false;}});}}}
if(!data.resultPageNum){var startPageFromSearchForm=$('#searchResultsAll, #frmSearch, #frmSearchResults').find('input[name=startPage]');if(startPageFromSearchForm.length){data.resultPageNum=parseInt(startPageFromSearchForm.val())+1;}}}
function isInt(n){return parseInt(n)+0===parseInt(n);}
function extractDataSearchResult(options,event){var data={};var $this=$(this);var $articleEntry=$this.closest('.articleEntry, .searchResultItem, .articleCitation, .m-result');if($articleEntry.length){data.doi=$articleEntry.find(':input[name="doi"]').val();if(!data.doi){data.pii=$articleEntry.find(':input[name="pii"]').val();}}
if(!data.doi&&!data.pii){var href=$this.attr('href');if(typeof href=='undefined'){var link=$this.closest('a');href=link.attr('href');}
if(href.includes("doi")){var doi=href.split("/doi/")[1];var doiPattern=new RegExp('^10\\.\\d\\d\\d\\d(\\d*)/(.+)');if(doiPattern.test(doi)){data.doi=doi;}else{data.doi=doi.substring(doi.indexOf('/')+1);}}else if(href.includes("article/")){var pii=href.split("/article/")[1];data.pii=pii.substring(0,pii.indexOf("/"));}}
extractCommonData.call(this,data,options,event);return data;}
function extractDataForPagination(options,event){var data={};var $this=$(this);var page=$this.text();if(page){data.SearchResultsPageClicked=page;}
extractCommonData(data,options,event);return data;}})();
$(document).ready(function(){$(".allowance__message").click(function(){$(".allowance__text").toggleClass("hidden");$(".allowance__message .arrow_d_n").toggleClass("openAllowance");});$(".preview_button").click(function(){$(".preview__modal.popup").removeClass("hidden");$("body.pb-ui").addClass("noscroll");});$(".preview__modal .icon-preview-close_thin,.preview__options .btn-cancel,.preview__content .close").click(function(){$(".preview__modal.popup").addClass("hidden");$("body.pb-ui").removeClass("noscroll");})});
(function($){$.fn.multiSelect=function(options){$.fn.multiSelect.init($(this),options);};$.extend($.fn.multiSelect,{defaults:{actcls:'active',selector:'tbody tr',except:['tbody'],statics:['.static'],callback:false},first:null,last:null,init:function(scope,options){this.scope=scope;this.options=$.extend({},this.defaults,options);this.initEvent();},checkStatics:function(dom){for(var i in this.options.statics){if(dom.is(this.options.statics[i])){return true;}}},initEvent:function(){var self=this,scope=self.scope,options=self.options,callback=options.callback,actcls=options.actcls;scope.on('click.mSelect',options.selector,function(e){if(!e.shiftKey&&self.checkStatics($(this))){return;}
if($(this).hasClass(actcls)){$(this).removeClass(actcls);}else{$(this).addClass(actcls);}
if(e.shiftKey&&self.last){if(!self.first){self.first=self.last;}
var start=self.first.index();var end=$(this).index();if(start>end){var temp=start;start=end;end=temp;}
$(options.selector,scope).removeClass(actcls).slice(start,end+1).each(function(){if(!self.checkStatics($(this))){$(this).addClass(actcls);}});window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();}else if(!e.ctrlKey&&!e.metaKey){$(this).siblings().removeClass(actcls);}
self.last=$(this);$.isFunction(callback)&&callback($(options.selector+'.'+actcls,scope));});$(document).on('click.mSelect',function(e){for(var i in options.except){var except=options.except[i];if($(e.target).is(except)||$(e.target).parents(except).size()){return;}}
scope.find(options.selector).each(function(){if(!self.checkStatics($(this))){$(this).removeClass(actcls);}});$.isFunction(callback)&&callback($(options.selector+'.'+actcls,scope));});$(document).on('keydown.mSelect',function(e){if((e.keyCode==65)&&(e.metaKey||e.ctrlKey)){$(options.selector,scope).each(function(){if(!self.checkStatics($(this))){$(this).addClass(actcls);}});$.isFunction(callback)&&callback($(options.selector+'.'+actcls,scope));e.preventDefault();return false;}});$(document).on('keyup.mSelect',function(e){if(e.keyCode==16){self.first=null;}});}});})(jQuery);
function initRemoveButton(name,topicCode){$('.specify_membership__remove_button_'+name).click(function(){var loading=new literatum.FullPageLoading();loading.start();var ids=[];var selectedItems=$('.specify_membership__'+name+'_table tr.active');$('.specify_membership__'+name+'_table tr.active td:first-child').each(function(){ids.push($(this).html());});literatum.utils.send({action:'specifyMembership',subAction:'remove',isNeg:name==='neg',id:ids,topicCode:topicCode},function(data){if(data.status==='error'){alert('Removing the selected rules have failed.');}
else if(data.status==='unauthorized'){window.location.replace('action/showLogin');}
else if(data.status==='refresh'){location.reload();}
else{selectedItems.remove();}
loading.done();},function(){alert('Removing the selected rules have failed.');loading.done();});});}
literatum.SpecifyMembershipWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);};literatum.SpecifyMembershipWidget.prototype=new literatum.Widget();literatum.SpecifyMembershipWidget.id='specifyMembership';literatum.SpecifyMembershipWidget.action='/pb/widgets/specify-membership/specifyMembership';literatum.SpecifyMembershipWidget.binders={showPubs:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();var topicCode=widget.find("[name=topicCode]").val();widget.render({},{showPubs:true,topicCode:topicCode},function(){$('.specify_membership__pos_table').multiSelect();$('.specify_membership__neg_table').multiSelect();$('.search-popup__container .result_table').multiSelect();initRemoveButton('pos',topicCode);initRemoveButton('neg',topicCode);$('.specify_membership__add_button_pos').click(function(){$('.search-popup').removeClass('hidden');$('.search-popup').addClass('pos');$('html').addClass('disable_scroll');});$('.specify_membership__add_button_neg').click(function(){$('.search-popup').removeClass('hidden');$('.search-popup').addClass('neg');$('html').addClass('disable_scroll')});var cancel_function=function(){$('.search-popup').addClass('hidden');$('.search-popup').removeClass('neg');$('.search-popup').removeClass('pos');$('html').removeClass('disable_scroll')};$('.search-popup .cancel').click(cancel_function);var marker;$('.search-popup .add').click(function(){var name=$('.search-popup').hasClass('pos')?'pos':'neg';var loading=new literatum.FullPageLoading();loading.start();var ids=[];$('.result_container .result_table tr.active td:first-child').each(function(){ids.push($(this).html());});var selectedItems=$('.result_container .result_table tr.active');cancel_function();literatum.utils.send({action:'specifyMembership',subAction:'add',id:ids,isNeg:name==='neg',topicCode:topicCode},function(data){if(data.status==='error'){alert('Adding the selected rules have failed.');}
else if(data.status==='unauthorized'){window.location.replace('action/showLogin');}
else if(data.status==='refresh'){location.reload();}
else{selectedItems.each(function(){marker=$(this).html()+'<td></td>';marker='<tr>'+marker+'</tr>';$('.specify_membership__'+name+'_table tbody').prepend(marker);});}
loading.done();},function(){alert('Adding the selected rules have failed.');loading.done();});});loading.done();});},hidePubs:function(e,widget){e.preventDefault();if($('.specify_membership__button').html().indexOf('Show')==-1){$('.specify_membership__button').html('Show Specify Membership');}
else{$('.specify_membership__button').html('Hide Specify Membership');}
$('.specify_membership__tables_container').toggleClass("hidden");},doTitleSearch:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();var title=widget.find("[name=title_filter]").val();literatum.utils.send({action:'doTitleSearch',title:title},function(data){widget.find('.search-popup__container .input_container').toggleClass('hidden');widget.find('.search-popup__container .result_container').toggleClass('hidden');widget.find('.search-popup__container .back_forward_container .back').removeClass('nav_disabled');widget.find('.search-popup__container .back_forward_container .forward').addClass('nav_disabled');widget.find('.search-popup__container .add').removeClass('hidden');var result_table=widget.find('.search-popup__container .result_table tbody');result_table.empty();var markup;for(var i=0;i<data.length;i++){markup='<tr><td>'+data[i].DOI+'</td><td>'+data[i].Title+'</td></tr>';result_table.append(markup);}
loading.done();},function(){console.error('An error occurred while searching using title within topicStory widget.');loading.done();});},forward:function(e,widget){if(widget.find('.search-popup__container .back_forward_container .forward').hasClass('nav_disabled'))
return;widget.find('.search-popup__container .input_container').addClass('hidden');widget.find('.search-popup__container .result_container').removeClass('hidden');widget.find('.search-popup__container .back_forward_container .back').removeClass('nav_disabled');widget.find('.search-popup__container .back_forward_container .forward').addClass('nav_disabled');widget.find('.search-popup__container .add').removeClass('hidden');},back:function(e,widget){if(widget.find('.search-popup__container .back_forward_container .back').hasClass('nav_disabled'))
return;widget.find('.search-popup__container .input_container').removeClass('hidden');widget.find('.search-popup__container .result_container').addClass('hidden');widget.find('.search-popup__container .back_forward_container .back').addClass('nav_disabled');widget.find('.search-popup__container .back_forward_container .forward').removeClass('nav_disabled');widget.find('.search-popup__container .add').addClass('hidden');},reset:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();var topicCode=widget.find("[name=topicCode]").val();literatum.utils.send({action:'specifyMembership',subAction:'reset',topicCode:topicCode},function(data){if(data.status==='refresh'){location.reload();}
else if(data.status==='unauthorized'){window.location.replace('action/showLogin');}
else if(data.status==='error'){alert('Reset operation failed!');}
loading.done();},function(){alert('Reset operation failed!');loading.done();});},saveAndRefresh:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();var topicCode=widget.find("[name=topicCode]").val();literatum.utils.send({action:'specifyMembership',subAction:'save',topicCode:topicCode},function(data){if(data.status==='refresh'){location.reload();}
else if(data.status==='unauthorized'){window.location.replace('action/showLogin');}
else if(data.status==='error'){alert('Saving operation failed!');}
loading.done();},function(){alert('Saving operation failed!');loading.done();});}};literatum.SpecifyMembershipWidget.find=function(){var $result=$("*[data-widget-def='"+literatum.SpecifyMembershipWidget.id+"']");if($result.length>0){return $result;}
$result=$("*[widget-def='"+literatum.SpecifyMembershipWidget.id+"']");if($result.length>0){return $result;}
return $("."+literatum.SpecifyMembershipWidget.id);};literatum.SpecifyMembershipWidget.prototype.registerListeners=function(){Object.getPrototypeOf(literatum.SpecifyMembershipWidget.prototype).registerListeners.call(this);};literatum.widgets.register(literatum.SpecifyMembershipWidget);
$(document).ready(function(){$('.relatedArtContainer .showMore').on('click',function(){var max=$('.relatedArtContainer .relatedArt').data('collapse');$('.relatedArtContainer .relatedArt li:gt('+max+')').toggleClass('hidden');var a=$(this).find('a');a.html(a.html()==='more'?'collapse':'more');var arrow=$(this).find('div');arrow.toggleClass('arrow-down');arrow.toggleClass('arrow-up');});});
commerce.cart=(function(){var instance={};var cartInfo;var listeners={};var callbacks=[];var errorHandler;function triggerRefresh(updatedCartInfo){console.log("Trying to refresh current cart state...");Object.keys(listeners).forEach(function(key){commerce.cart.notify(key,updatedCartInfo);});cartInfo=updatedCartInfo;}
instance.refresh=function(){literatum.utils.send({action:'showCart'},triggerRefresh,errorHandler);};instance.identity={name:'identity',guest:function(email,acceptTermsConditions){literatum.utils.send({action:'guestCheckout',email:email,acceptTermsConditions:acceptTermsConditions},commerce.cart.identity.refresh,errorHandler);},login:function(email,password){literatum.utils.send({action:'doLogin',email:email,password:password},commerce.cart.identity.refresh,errorHandler);},registration:function(email){literatum.utils.send({action:'register',email:email},commerce.cart.identity.refresh,errorHandler);},clear:function(){literatum.utils.send({action:'resetCartAction'},commerce.cart.identity.refresh,errorHandler);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.identity,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.identityHash!=updatedCartInfo.identityHash);}};instance.buyingList={name:'buyingList',addItem:function(itemId){literatum.utils.send({action:'addToCart',id:itemId},commerce.cart.buyingList.refresh,errorHandler);},remove:function(itemId){literatum.utils.send({action:'removeCartItem',id:itemId},commerce.cart.buyingList.refresh,errorHandler);},decreaseQuantity:function(itemId){literatum.utils.send({action:'decreaseQuantity',id:itemId},function(cartInfo){commerce.cart.notify("quantityDecreased",cartInfo);},errorHandler);},increaseQuantity:function(itemId){literatum.utils.send({action:'increaseQuantity',id:itemId},function(cartInfo){commerce.cart.notify("quantityIncreased",cartInfo);},errorHandler);},updateQuantity:function(itemId,currentQuantity,requiredQuantity){literatum.utils.send({action:'updateQuantity',id:itemId,currentQuantity:currentQuantity,requiredQuantity:requiredQuantity},function(cartInfo){commerce.cart.notify("updateQuantity",cartInfo);},commerce.cart.buyingList.refresh,errorHandler);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.buyingList,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.buyingItemHash!=updatedCartInfo.buyingItemHash);}};instance.restoreAccess={name:'restoreAccess',request:function(email){literatum.utils.send({action:'restoreContentAccess',email:email},commerce.cart.restoreAccess.refresh,errorHandler);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.restoreAccess,cartInfo);},changed:function(updatedCartInfo){return true;}};instance.discounts={name:'discounts',apply:function(discountCode){literatum.utils.send({action:'applyDiscount',discount:discountCode},commerce.cart.discounts.refresh,errorHandler);},remove:function(discountCode){literatum.utils.send({action:'removeDiscount',discount:discountCode},commerce.cart.discounts.refresh,errorHandler);},enable:function(discountCode){literatum.utils.send({action:'enableDiscount',discount:discountCode},commerce.cart.discounts.refresh,errorHandler);},disable:function(discountCode){literatum.utils.send({action:'disableDiscount',discount:discountCode},commerce.cart.discounts.refresh,errorHandler);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.discounts,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.cartHash!=updatedCartInfo.cartHash);}};instance.summary={name:'summary',refresh:function(){commerce.cart.notify(commerce.cart.summary,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.cartHash!=updatedCartInfo.cartHash);}};instance.shipping={name:'shipping',update:function(form){var request={};$.extend(request,{action:'updateShippingAddress'},form);literatum.utils.send(request,commerce.cart.shipping.refresh,errorHandler);},getShippingCosts:function(country,state,callback){literatum.utils.send({action:'getShippingCosts',country:country,state:state},callback);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.shipping,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.shippingHash!=updatedCartInfo.shippingHash||cartInfo.buyingItemHash!=updatedCartInfo.buyingItemHash);}};instance.tax={name:'tax',update:function(form){var request={};$.extend(request,{action:'updateTax'},form);literatum.utils.send(request,commerce.cart.tax.refresh,errorHandler);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.tax,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.cartHash!=updatedCartInfo.cartHash);}};instance.billing={name:'billing',update:function(form){var request={};$.extend(request,{action:'updateBillingAddress'},form);literatum.utils.send(request,commerce.cart.billing.refresh,errorHandler);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.billing,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.billingHash!=updatedCartInfo.billingHash);}};instance.savedItems={name:'savedItems',saveById:function(itemId){literatum.utils.send({action:'saveItem',id:itemId},commerce.cart.savedItems.refresh,errorHandler);},saveByDoi:function(doi){literatum.utils.send({action:'saveItem',doi:doi},commerce.cart.savedItems.refresh,errorHandler);},remove:function(id){literatum.utils.send({action:'removeSavedItem',id:id},commerce.cart.savedItems.refresh,errorHandler);},refresh:function(cartInfo){commerce.cart.notify(commerce.cart.savedItems,cartInfo);},changed:function(updatedCartInfo){return(cartInfo==null||cartInfo.savedItemsHash!=updatedCartInfo.savedItemsHash);}};instance.register=function(service,callback){console.log("Commerce Cart :: Registering service "+service.name+" listener...");if(service){var serviceName=typeof service==='string'?service:service.name;if(!listeners[serviceName]){listeners[serviceName]=[];}
listeners[serviceName].push(callback);}};instance.notify=function(service,updatedCartInfo){if(updatedCartInfo){if(updatedCartInfo.sessionChanged){location.reload();return;}}
if(updatedCartInfo&&cartInfo){if(cartInfo.sessionHash!=updatedCartInfo.sessionHash){location.reload();return;}}
var result=[];var serviceName=typeof service==='string'?service:service.name;console.log("Commerce Cart :: Notifying "+serviceName+" listeners...");if(typeof serviceName==='string'||(service&&service.changed&&service.changed(updatedCartInfo))||literatum.utils.hasAttributes(updatedCartInfo.attributes)){if(listeners[serviceName]){listeners[serviceName].forEach(function(listener){var value=listener(updatedCartInfo);result.push(value);});}}
var clone=callbacks;$.when.apply($,result).then(function(){clone.forEach(function(callback){callback();});});commerce.cart.clearCallbacks();if(updatedCartInfo){cartInfo=updatedCartInfo;}};instance.setErrorHandler=function(handler){errorHandler=handler;};instance.addCallback=function(callback){callbacks.push(callback);};instance.clearCallbacks=function(){callbacks=[];};return instance;}());console.log("Cart Service initialized!");
commerce.validators=(function(){var instance={};var creditCardsPattern={};creditCardsPattern['visa']=new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");creditCardsPattern['mastercard']=new RegExp("^5[1-5][0-9]{14}$");creditCardsPattern['amex']=new RegExp("^3[47][0-9]{13}$");creditCardsPattern['dinner']=new RegExp("^3(?:0[0-5]|[68][0-9])[0-9]{11}$");creditCardsPattern['discover']=new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");creditCardsPattern['jcb']=new RegExp("^(?:2131|1800|35\\d{3})\\d{11}$");creditCardsPattern['maestro']=new RegExp("^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{8,15}$");instance.creditcard=function(value,element){var number=value.match(/\d/g);if(!number)
return true;value=number.join("");var invalid=true;$(element).closest(".input-group").prop("class","input-group cc-number");Object.keys(creditCardsPattern).forEach(function(k){if(creditCardsPattern[k].test(value)&&invalid&&/^\d+$/.test($("#realNumber").val())){invalid=false;$(element).closest(".input-group").addClass(k);}});return invalid;};instance.creditcardDate=function(value,element,form){var currentDate=new Date();var currentMonth=currentDate.getMonth(5)+1;var currentYear=currentDate.getFullYear();var monthExpiry=form.find("select[name='expMonth']").val();var yearExpiry=form.find("select[name='expYear']").val();var expireMonth=parseInt(monthExpiry);var expireYear=parseInt(yearExpiry);var expireDate=new Date();expireDate.setMonth(expireMonth-1);expireDate.setYear(expireYear);if(expireYear=="0000"||expireMonth=="00")
return true;if(currentYear>expireYear){return true;}
if(currentMonth>expireMonth&&monthExpiry=="00"){return true;}
return expireDate<currentDate;};instance.notEmpty=function(value){return!(!!(value));};instance.validate=function(form){var $form=null;var invalid=true;if(form instanceof jQuery){$form=form;}else{$form=$(form);}
$form.find("input[data-validate]").each(function(){var $this=$(this);invalid=commerce.validators.validateField($this,$form)&&invalid;});return invalid;};instance.validateField=function(field,form){var $field=null;if(field instanceof jQuery){$field=field;}else{$field=$(field);}
var validatorName=$field.data("validate");var validator=instance[validatorName];var value=$field.val();return validator(value,$field,form);};instance.securityCode=function(value){return!(/^[0-9]{3,4}$/.test(value));};return instance;}());
commerce.Notification=function(element){if(element instanceof jQuery){this.$element=element;}else{this.$element=$(element);}
this.$p=$(this.$element.find("p"));};commerce.Notification.dummy=new commerce.Notification("<div></div>");commerce.Notification.prototype.show=function(){this.$element.show();};commerce.Notification.prototype.showFlex=function(){this.$element.css('display','flex');};commerce.Notification.get=function(element){return new commerce.Notification(element);};commerce.Notification.create=function(element){if(!(element instanceof jQuery)){element=$(element);}
element.html("<p></p>");return new commerce.Notification(element);};commerce.Notification.prototype.hide=function(){this.$element.hide();};commerce.Notification.prototype.reset=function(){this.$p.removeClass("itemAddedMsgBox");this.$p.removeClass("errorMsgBox");this.$element.hide();};commerce.Notification.prototype.error=function(){this.$p.removeClass("itemAddedMsgBox");this.$p.addClass("errorMsgBox");this.$p.parent(".purchaseMessage").addClass("errorMsgParent");};commerce.Notification.prototype.warning=function(){this.$p.removeClass("itemAddedMsgBox");this.$p.addClass("errorMsgBox");};commerce.Notification.prototype.info=function(){this.$p.removeClass("errorMsgBox");this.$p.addClass("itemAddedMsgBox");};commerce.Notification.prototype.setMessage=function(message){this.$p.html(message);};commerce.FieldNotification=function(element){if(element instanceof jQuery){this.$element=element;}else{this.$element=$(element);}
this.$message=$(this.$element.find(".message"));this.$label=$(this.$element.find(".label"));this.$show=$(this.$element.find(".field-info"));};commerce.FieldNotification.prototype.show=function(){if(this.$message.text().length>0){this.$show.show();}else{this.$show.hide();}};commerce.FieldNotification.get=function(element){return new commerce.FieldNotification(element);};commerce.FieldNotification.prototype.hide=function(){this.$show.hide();};commerce.FieldNotification.prototype.error=function(){this.$label.removeClass("warning");this.$label.removeClass("info");this.$label.addClass("error");};commerce.FieldNotification.prototype.warning=function(){this.$label.removeClass("error");this.$label.removeClass("info");this.$label.addClass("warning");};commerce.FieldNotification.prototype.info=function(){this.$label.removeClass("warning");this.$label.removeClass("error");this.$label.addClass("info");};commerce.FieldNotification.prototype.reset=function(){this.hide();this.$label.removeClass("warning");this.$label.removeClass("error");this.$label.removeClass("info");this.setMessage("");};commerce.FieldNotification.prototype.setMessage=function(message){this.$message.html(message);};
commerce.BuyingItemWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.buyingList);this.register(commerce.cart.discounts);this.register(commerce.cart.savedItems);this.register(commerce.cart.summary);this.register("quantityIncreased");this.register("quantityDecreased");this.register("updateQuantity");};commerce.BuyingItemWidget.prototype=new literatum.Widget();commerce.BuyingItemWidget.id='eCommerceCheckoutBuyingItemsWidget';commerce.BuyingItemWidget.action='/pb/widgets/commerce/buyingItems';commerce.BuyingItemWidget.notifications={info:commerce.Notification};commerce.BuyingItemWidget.binders={applyDiscount:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.discounts.apply(widget.find("input[name='discount']").val());},removeDiscount:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.discounts.remove($(this).data('discount'));},disableDiscount:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.discounts.disable($(this).data('discount'));},enableDiscount:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.discounts.enable($(this).data('discount'));},saveItem:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var itemId=$(this).data("item-id");if(itemId){commerce.cart.savedItems.saveById(itemId);}else{commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));}},removeItem:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.buyingList.remove($(this).data("item-id"));},increaseQuantity:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.buyingList.increaseQuantity($(this).data("item-id"));},decreaseQuantity:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.buyingList.decreaseQuantity($(this).data("item-id"));},updateQuantity:function(e){var currentQuantity=$(this).parent().find("#quantity").attr("value");var requiredQuantity=$(this).parent().find("#quantity").val();var MAXIMUM_ALLOWED_VALUE=$(this).attr("data-max-quote-items");if(Number(requiredQuantity)<1||Number(requiredQuantity)>Number(MAXIMUM_ALLOWED_VALUE)){$(this).parent().find(".quantity_number.error").removeClass("hidden");}
else{$(this).parent().find(".quantity_number.error").addClass("hidden");if(currentQuantity!=requiredQuantity){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.buyingList.updateQuantity($(this).data("item-id"),currentQuantity,requiredQuantity);}}}};commerce.BuyingItemWidget.prototype.reset=function(){Object.getPrototypeOf(commerce.BuyingItemWidget.prototype).reset.call(this);this.find("input[name='discount']").removeClass("errorMsg");this.find(".promoCodeMsg .errorMsg").hide();this.find(".promoCodeMsg .infoMsg").hide();};commerce.BuyingItemWidget.infoHandlers={discountError:function(message,widget){widget.find(".promoCodeMsg .infoMsg").hide();widget.find("input[name='discount']").addClass("errorMsg");var $error=widget.find(".promoCodeMsg .errorMsg");$error.html(message);$error.show();},discountInfo:function(message,widget){widget.find(".promoCodeMsg .errorMsg").hide();widget.find("input[name='discount']").removeClass("errorMsg");var $info=widget.find(".promoCodeMsg .infoMsg");$info.html(message);$info.show();},discount:function(message,widget){$(widget.find("input[name='promoCode']")).val(message);},savedItemError:function(message,widget){var notification=widget.getNotification('info');if(notification){notification.error();notification.setMessage(message);notification.show();}},error:function(message,widget){var notification=widget.getNotification('info');if(notification){notification.error();notification.setMessage(message);notification.show();}}};commerce.BuyingItemWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.BuyingItemWidget.prototype).registerListeners.call(this);var widget=this;var $applyButton=this.find("#applyDiscountForm input.applyDiscount");var $discountField=this.find("input[name='discount']");$discountField.on('keyup',function(){if($discountField.val()){$applyButton.addClass('primary');$applyButton.prop('disabled',false);}else{$applyButton.removeClass('primary');$applyButton.prop('disabled',true);widget.find(".promoCodeMsg .errorMsg").hide();widget.find("input[name='discount']").removeClass("errorMsg");var $info=widget.find(".promoCodeMsg .infoMsg");$info.html(message);$info.show();}});};commerce.BuyingItemWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.BuyingItemWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.BuyingItemWidget.id);};literatum.widgets.register(commerce.BuyingItemWidget);
commerce.SavedItemsWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);this.register(commerce.cart.identity);};commerce.SavedItemsWidget.prototype=new literatum.Widget();commerce.SavedItemsWidget.id='eCommerceCheckoutSavedForLaterItemsWidget';commerce.SavedItemsWidget.action='/pb/widgets/commerce/savedItems';commerce.SavedItemsWidget.notifications={info:commerce.Notification};commerce.SavedItemsWidget.binders={saveItem:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var itemId=$(this).data("item-id");if(itemId){commerce.cart.savedItems.saveById(itemId);}else{commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));}},removeSavedItem:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.savedItems.remove($(this).data("item-id"));},expand:function(e){e.preventDefault();$(this).closest(".add-to-cart").toggleClass("opened");var offerVisibility=$(this).next(".purchaseArea").is(':visible');$(".purchaseArea").slideUp();if(!offerVisibility){$(this).next(".purchaseArea").slideToggle();var subject=$(".demo");if(e.target.id!=subject.attr('id')){subject.show();}}},addItem:function(e,widget){if(!$(e.target).parents('.disable-click').length){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var key=$(this).attr("data-key");commerce.cart.buyingList.addItem(key);}}};commerce.SavedItemsWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.SavedItemsWidget.prototype).registerListeners.call(this);if($(window).width()>=992){$(document).on('touchend click',function(e){var container=$(".demoContainer");if(!$(e.target).closest('.superDemo').length){$(".add-to-cart.opened").removeClass("opened");container.hide();container.find('.add-journal-to-cart').removeClass('disable-click');container.find('.add-journal-to-cart header').removeClass('open');container.find('.add-journal-to-cart').css('margin-bottom','10px');e.stopPropagation();}});}};commerce.SavedItemsWidget.infoHandlers={savedItemError:function(message,widget){var notification=widget.getNotification('info');if(notification){notification.setMessage(message);notification.error();notification.show();}}};commerce.SavedItemsWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.SavedItemsWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.SavedItemsWidget.id);};literatum.widgets.register(commerce.SavedItemsWidget);
commerce.RecommendedWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);};commerce.RecommendedWidget.prototype=new literatum.Widget();commerce.RecommendedWidget.id='eCommerceCheckoutRecommendedItemsWidget';commerce.RecommendedWidget.action='/pb/widgets/commerce/recommended';commerce.RecommendedWidget.binders={expand:function(e){e.preventDefault();$(this).closest(".add-to-cart").toggleClass("opened");var offerVisibility=$(this).next(".purchaseArea").is(':visible');$(".purchaseArea").slideUp();if(!offerVisibility){$(this).next(".purchaseArea").slideToggle();var subject=$(".demo");if(e.target.id!=subject.attr('id')){subject.show();}}},addItem:function(e){if(!$(e.target).parents('.disable-click').length){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var key=$(this).attr("data-key");commerce.cart.buyingList.addItem(key);}},saveItem:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var itemId=$(this).data("item-id");if(itemId){commerce.cart.savedItems.saveById(itemId);}else{commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));}}};commerce.RecommendedWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.RecommendedWidget.prototype).registerListeners.call(this);if($(window).width()>=992){$(document).on('touchend click',function(e){var container=$(".demoContainer");if(!$(e.target).closest('.superDemo').length){$(".add-to-cart.opened").removeClass("opened");container.hide();container.find('.add-journal-to-cart').removeClass('disable-click');container.find('.add-journal-to-cart header').removeClass('open');container.find('.journal-options-expanded').hide();container.find('.add-journal-to-cart').css('margin-bottom','10px');e.stopPropagation();}});}};commerce.RecommendedWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.RecommendedWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.RecommendedWidget.id);};literatum.widgets.register(commerce.RecommendedWidget);
commerce.RecentlyViewedWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);};commerce.RecentlyViewedWidget.prototype=new literatum.Widget();commerce.RecentlyViewedWidget.id='eCommerceCheckoutRecentlyViewedItemsWidget';commerce.RecentlyViewedWidget.action='/pb/widgets/commerce/recentlyViewed';commerce.RecentlyViewedWidget.binders={expand:function(e){e.preventDefault();$(this).closest(".add-to-cart").toggleClass("opened");var offerVisibility=$(this).next(".purchaseArea").is(':visible');$(".purchaseArea").slideUp();if(!offerVisibility){$(this).next(".purchaseArea").slideToggle();var subject=$(".demo");if(e.target.id!=subject.attr('id')){subject.show();}}},addItem:function(e,widget){if(!$(e.target).parents('.disable-click').length){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var key=$(this).attr("data-key");commerce.cart.buyingList.addItem(key);}},saveItem:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var itemId=$(this).data("item-id");if(itemId){commerce.cart.savedItems.saveById(itemId);}else{commerce.cart.savedItems.saveByDoi($(this).data("item-doi"));}}};commerce.RecentlyViewedWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.RecentlyViewedWidget.prototype).registerListeners.call(this);if($(window).width()>=992){$(document).on('touchend',function(e){var container=$(".demoContainer");if(!$(e.target).closest('.superDemo').length){$(".add-to-cart.opened").removeClass("opened");container.hide();container.find('.add-journal-to-cart').removeClass('disable-click');container.find('.add-journal-to-cart header').removeClass('open');container.find('.journal-options-expanded').hide();container.find('.add-journal-to-cart').css('margin-bottom','10px');e.stopPropagation();}});}};commerce.RecentlyViewedWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.RecentlyViewedWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.RecentlyViewedWidget.id);};literatum.widgets.register(commerce.RecentlyViewedWidget);
commerce.OrderSummaryWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.buyingList);this.register(commerce.cart.discounts);this.register(commerce.cart.savedItems);this.register(commerce.cart.shipping);this.register(commerce.cart.billing);this.register(commerce.cart.tax);this.register(commerce.cart.summary);this.register("quantityIncreased");this.register("quantityDecreased");this.register("updateQuantity");};commerce.OrderSummaryWidget.prototype=new literatum.Widget();commerce.OrderSummaryWidget.id='eCommerceCheckoutSummaryWidget';commerce.OrderSummaryWidget.action='/pb/widgets/commerce/orderSummary';commerce.OrderSummaryWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.OrderSummaryWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.OrderSummaryWidget.id);};literatum.widgets.register(commerce.OrderSummaryWidget);
commerce.IdentityWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);};commerce.IdentityWidget.prototype=new literatum.Widget();commerce.IdentityWidget.id='eCommerceCheckoutIdentityWidget';commerce.IdentityWidget.action='/pb/widgets/commerce/identity';commerce.IdentityWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.IdentityWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.IdentityWidget.id);};commerce.IdentityWidget.notifications={identity:commerce.Notification,email:commerce.FieldNotification,acceptTermsConditions:commerce.FieldNotification};commerce.IdentityWidget.binders={guest:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(literatum.utils.nextCheckoutSection);commerce.cart.addCallback(loading.done);var acceptTermsConditions=widget.find("input[name='acceptTermsConditions']").is(":checked");commerce.cart.identity.guest(widget.find("input[name='email'].user").val(),acceptTermsConditions);},showUserLogin:function(e,widget){e.preventDefault();var $loginForm=widget.find(".frmLogin");var email=widget.find("input[name='email'].user").val();widget.find(".checkoutLogin").hide();if($loginForm.length>0){$loginForm.show();if(email!=undefined){$loginForm.find("input[name='login']").val(email).focus();}}},register:function(e,widget){var email=widget.find("input[name='email'].user").val();if(email){e.preventDefault();window.location="/action/registration?email="+encodeURIComponent(email)+"&redirectUri="+encodeURIComponent(location.href);}},cancelLogin:function(e,widget){e.preventDefault();var notification=widget.getNotification("identity");if(notification){notification.reset();}
widget.find(".message.error").remove();widget.find(".checkoutLogin").show();if(widget.find(".frmLogin").length>0){widget.find(".frmLogin").hide();}},userLogin:function(e){var loading=new literatum.FullPageLoading();loading.start();},resetCart:function(e){var loading=new literatum.FullPageLoading();loading.start();},expand:function(e,widget){widget.find(".checkout-expand").slideToggle();}};commerce.IdentityWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.IdentityWidget.prototype).registerListeners.call(this);if(this.find(".frmLogin").length>0){var $loginInput=this.find(".frmLogin .login");var $passwordInput=this.find(".frmLogin .password");var $continueButton=this.find(".frmLogin input[type='submit']");$continueButton.removeClass("primary");$continueButton.prop('disabled',true);$loginInput.on('keyup',function(){if($loginInput.val()&&$passwordInput.val()){$continueButton.addClass("primary");$continueButton.prop('disabled',false);}else{$continueButton.removeClass("primary");$continueButton.prop('disabled',true);}});$passwordInput.on('keyup',function(){if($loginInput.val()&&$passwordInput.val()){$continueButton.addClass("primary");$continueButton.prop('disabled',false);}else{$continueButton.removeClass("primary");$continueButton.prop('disabled',true);}});}};commerce.IdentityWidget.prototype.triggerInfoHandlers=function(widget,model){Object.getPrototypeOf(commerce.IdentityWidget.prototype).triggerInfoHandlers.call(this,widget,model);widget.find("input,select").each(function(){var $this=$(this);var name=$this.attr('name');var errorName=name+"Error";var notification=widget.getNotification(name);if(notification){notification.reset();if(model&&model.attributes&&model.attributes[errorName]){notification.error();notification.setMessage(model.attributes[errorName]);notification.show();}}});};commerce.IdentityWidget.infoHandlers={identityError:function(message,widget){var notification=widget.getNotification("identity");if(notification){notification.setMessage(message);notification.error();notification.show();}},emailError:function(message,widget){var notification=widget.getNotification("email");if(notification){notification.error();notification.setMessage(message);notification.show();}},acceptTermsConditionsError:function(message,widget){var notification=widget.getNotification("acceptTermsConditions");if(notification){notification.error();notification.setMessage(message);notification.show();}}};literatum.widgets.register(commerce.IdentityWidget);
commerce.ShippingWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);this.register(commerce.cart.shipping);};commerce.ShippingWidget.prototype=new literatum.Widget();commerce.ShippingWidget.id='eCommerceCheckoutShippingWidget';commerce.ShippingWidget.action='/pb/widgets/commerce/shipping';commerce.ShippingWidget.notifications={info:commerce.Notification,givennames:commerce.FieldNotification,surname:commerce.FieldNotification,email:commerce.FieldNotification,phone:commerce.FieldNotification,organization:commerce.FieldNotification,address1:commerce.FieldNotification,address2:commerce.FieldNotification,city:commerce.FieldNotification,country:commerce.FieldNotification,state:commerce.FieldNotification,zipCode:commerce.FieldNotification,shippingCost:commerce.FieldNotification};commerce.ShippingWidget.prototype.lostFocus=function(){if(this.find("form").length){return literatum.widgets.render(this,{},{});}};commerce.ShippingWidget.binders={editShipping:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(literatum.utils.nextCheckoutSection);commerce.cart.addCallback(loading.done);e.preventDefault();var d=literatum.widgets.render(widget,{},{editing:true});literatum.widgets.all().forEach(function(item){if(widget.widgetDef.id!=item.widgetDef.id){d=d.then(item.lostFocus());}});d.then(function(){literatum.utils.nextCheckoutSection();loading.done();});},submitShipping:function(e,widget){e.preventDefault();var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(literatum.utils.nextCheckoutSection);commerce.cart.addCallback(loading.done);commerce.cart.shipping.update(widget.find("form").serializeObject());},shippingOptions:function(e,widget){e.preventDefault();var forms=widget.collectForms();commerce.cart.shipping.shippingOptions(forms.shipping.country,forms.shipping.state)},expand:function(e,widget){widget.find(".checkout-expand").slideToggle();},countryChanged:function(e,widget){if(e.type=='change'){var loading=new literatum.FullPageLoading();loading.start();var notification=widget.getNotification('shippingCost');if(notification){notification.reset();}
var $country=widget.find("select[name='country']");var $state=widget.find(".state option:selected");var countryCode=$country.val();if(countryCode=="US"){widget.find(".zipcode label").text(widget.find(".zipcode-text").text())}else{widget.find(".zipcode label").text(widget.find(".postcode-text").text())}
literatum.utils.getCountryState(countryCode,function(model){var $states=widget.find(".state");var $select=$states.find("select");if(e.type=='change'){$select.val(null);}
$select.find("option:not([value='-1'])").remove();if(model.states.length>0){model.states.forEach(function(item){$select.append('<option value="'+item['id']+'">'+item['description']+'</option>');});$states.show();}else{$states.hide();}
$select.val($state.val());commerce.cart.shipping.getShippingCosts(countryCode,$state.val(),function(model){if(model.shippingOptions.length!=1){var $shippingOptions=widget.find(".shipping-cost-select");var $select=$shippingOptions.find("select");$select.find("option:not([value='-1'])").remove();model.shippingOptions.forEach(function(item){$select.append('<option value="'+item['id']+'">'+item['description']+'</option>');});if(model.error){notification.reset();notification.error();notification.setMessage(model.error);notification.show();}
widget.find(".shipping-cost-one input").prop('disabled',true);widget.find(".shipping-cost-select select").prop('disabled',false);widget.find(".shipping-cost-one").hide();widget.find(".shipping-cost-select").show();}else{widget.find(".shipping-cost-select select").prop('disabled',true);widget.find(".shipping-cost-one input[name='shippingCost']").prop('disabled',false);widget.find(".shipping-cost-select").hide();widget.find("input[name='shippingCost']").val(model.shippingOptions[0].id);widget.find("input[name='shippingCostDescription']").val(model.shippingOptions[0].description);widget.find(".shipping-cost-one").show();}
loading.done();});});}},selectAddress:function(e,widget){var addressUuid=$(this).val();if(e.type=='change'){if(addressUuid!='-1'){var loading=new literatum.FullPageLoading();loading.start();widget.render({},{editing:true,uuid:addressUuid},function(){var $country=widget.find("select[name='country']");var $state=widget.find("select[name='state']");if($country.val()!=''){commerce.cart.shipping.getShippingCosts($country.val(),$state.val(),function(model){if(model.shippingOptions.length!=1){var $shippingOptions=widget.find(".shipping-cost-select");var $select=$shippingOptions.find("select");$select.find("option:not([value='-1'])").remove();model.shippingOptions.forEach(function(item){$select.append('<option value="'+item['id']+'">'+item['description']+'</option>');});if(model.error){notification.reset();notification.error();notification.setMessage(model.error);notification.show();}
widget.find(".shipping-cost-one input").prop('disabled',true);widget.find(".shipping-cost-select select").prop('disabled',false);widget.find(".shipping-cost-one").hide();widget.find(".shipping-cost-select").show();}else{widget.find(".shipping-cost-select select").prop('disabled',true);widget.find(".shipping-cost-one input[name='shippingCost']").prop('disabled',false);widget.find(".shipping-cost-select").hide();widget.find("input[name='shippingCost']").val(model.shippingOptions[0].id);widget.find("input[name='shippingCostDescription']").val(model.shippingOptions[0].description);widget.find(".shipping-cost-one").show();}
loading.done();});}else{loading.done();}});}else{widget.updateForm('shipping',{});}}}};commerce.ShippingWidget.infoHandlers={addressError:function(message,widget){var notification=widget.getNotification('info');if(notification){notification.error();notification.setMessage(message);notification.show();}
literatum.utils.scroll('.errorMsgBox:visible',0);}};commerce.ShippingWidget.prototype.triggerInfoHandlers=function(widget,model){Object.getPrototypeOf(commerce.ShippingWidget.prototype).triggerInfoHandlers.call(this,widget,model);widget.find("input,select").each(function(){var $this=$(this);var name=$this.attr('name');var errorName=name+"Error";var notification=widget.getNotification(name);if(notification){notification.reset();if(model&&model.attributes&&model.attributes[errorName]){notification.error();notification.setMessage(model.attributes[errorName]);notification.show();}}});};commerce.ShippingWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.ShippingWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.ShippingWidget.id);};literatum.widgets.register(commerce.ShippingWidget);
commerce.TaxWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);this.register(commerce.cart.billing);this.register(commerce.cart.shipping);this.register(commerce.cart.tax);};commerce.TaxWidget.prototype=new literatum.Widget();commerce.TaxWidget.id='eCommerceCheckoutTaxWidget';commerce.TaxWidget.action='/pb/widgets/commerce/tax';commerce.TaxWidget.prototype.lostFocus=function(){if(this.find("form").length){return literatum.widgets.render(this,{},{});}};commerce.TaxWidget.binders={updateTax:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(literatum.utils.nextCheckoutSection);commerce.cart.addCallback(loading.done);e.preventDefault();var d=literatum.widgets.render(widget,{},{editing:true});literatum.widgets.all().forEach(function(item){if(widget.widgetDef.id!=item.widgetDef.id){d=d.then(item.lostFocus());}});d.then(function(){literatum.utils.nextCheckoutSection();loading.done();});},tax:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(literatum.utils.nextCheckoutSection);commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.tax.update($("form.tax").serializeObject());}};commerce.TaxWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.TaxWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.TaxWidget.id);};literatum.widgets.register(commerce.TaxWidget);
commerce.BillingWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.shipping);this.register(commerce.cart.billing);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);};commerce.BillingWidget.prototype=new literatum.Widget();commerce.BillingWidget.id='eCommerceCheckoutBillingWidget';commerce.BillingWidget.action='/pb/widgets/commerce/billing';commerce.BillingWidget.notifications={info:commerce.Notification,givennames:commerce.FieldNotification,surname:commerce.FieldNotification,email:commerce.FieldNotification,phone:commerce.FieldNotification,organization:commerce.FieldNotification,address1:commerce.FieldNotification,address2:commerce.FieldNotification,city:commerce.FieldNotification,country:commerce.FieldNotification,state:commerce.FieldNotification,zipCode:commerce.FieldNotification};commerce.BillingWidget.prototype.lostFocus=function(){if(this.find("form").length){return literatum.widgets.render(this,{},{});}};commerce.BillingWidget.binders={submitBilling:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(literatum.utils.nextCheckoutSection);commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.billing.update($("form[name='billing']").serializeObject());},editBilling:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var d=literatum.widgets.render(widget,{},{editing:true});literatum.widgets.all().forEach(function(item){if(widget.widgetDef.id!=item.widgetDef.id){d=d.then(item.lostFocus());}});d.then(function(){literatum.utils.nextCheckoutSection();loading.done();var countryCode=$("#country").val();if(countryCode=="US"){widget.find(".zipcode label").text(widget.find(".zipcode-text").text())}else{widget.find(".zipcode label").text(widget.find(".postcode-text").text())}});},sameAsShipping:function(e,widget){if($(this).is(":checked")){var shippingWidgets=literatum.widgets.get('eCommerceCheckoutShippingWidget');var shippingWidget=shippingWidgets[0];if(shippingWidget){var forms=shippingWidget.collectForms();widget.updateForm('billing',forms['shipping'],true);widget.find("select[name='country']").change();}
var identityWidgets=literatum.widgets.get('eCommerceCheckoutIdentityWidget');var identityWidget=identityWidgets[0];if(identityWidget){var forms=identityWidget.collectForms();widget.updateForm('billing',forms['personal-info'],true);}}else{literatum.utils.clearForm('billing',{});}},placeOrder:function(e,widget){if(!commerce.validators.validate(widget.find("form[name='apg']"))){e.preventDefault();}},expand:function(e,widget){widget.find(".checkout-expand").slideToggle();},countryChanged:function(e,widget){if(e.type=='change'){var loading=new literatum.FullPageLoading();loading.start();var countryCode=$(this).val();if(countryCode=="US"){widget.find(".zipcode label").text(widget.find(".zipcode-text").text())}else{widget.find(".zipcode label").text(widget.find(".postcode-text").text())}
literatum.utils.getCountryState(countryCode,function(model){var $states=widget.find(".state");var $select=$states.find("select");if(e.type=='change'){$select.val(null);}
var shippingWidget;var shippingForm;if(literatum.widgets.get('eCommerceCheckoutShippingWidget').length!==0){shippingWidget=literatum.widgets.get('eCommerceCheckoutShippingWidget');shippingForm=shippingWidget[0].collectForms()['shipping'];}
else{shippingForm="";}
var state="";if(shippingForm!==undefined)
state=shippingForm['state'];$select.find("option:not([value='-1'])").remove();if(model.states.length>0){model.states.forEach(function(item){if(state===item['id'])
$select.append('<option value="'+item['id']+'" selected>'+item['description']+'</option>');else
$select.append('<option value="'+item['id']+'">'+item['description']+'</option>');});$states.show();}else{$states.hide();}
loading.done();});}},selectAddress:function(e,widget){var addressUuid=$(this).val();if(e.type=='change'){if(addressUuid!='-1'){var loading=new literatum.FullPageLoading();loading.start();widget.render({},{editing:true,uuid:addressUuid},function(){loading.done();});}else{widget.updateForm('billing',{});}}}};commerce.BillingWidget.infoHandlers={addressError:function(message,widget){var notification=widget.getNotification('info');if(notification){notification.error();notification.setMessage(message);notification.show();}
literatum.utils.scroll('.errorMsgBox:visible',0);}};commerce.BillingWidget.prototype.triggerInfoHandlers=function(widget,model){Object.getPrototypeOf(commerce.BillingWidget.prototype).triggerInfoHandlers.call(this,widget,model);widget.find("input,select").each(function(){var $this=$(this);var name=$this.attr('name');var errorName=name+"Error";var notification=widget.getNotification(name);if(notification){notification.reset();if(model&&model.attributes&&model.attributes[errorName]){notification.error();notification.setMessage(model.attributes[errorName]);notification.show();}}});};commerce.BillingWidget.prototype.validateForm=function(cartInfo){};commerce.BillingWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.BillingWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.BillingWidget.id);};literatum.widgets.register(commerce.BillingWidget);
commerce.PaymentWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.billing);this.register(commerce.cart.shipping);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);this.register(commerce.cart.discounts);this.register(commerce.cart.tax);var $error=this.find('.errorMsgBox').not('.hidden');if($error.length==0){$error=this.find(".label.error");}
if($error.length>0){commerce.page.cart.show();literatum.utils.scroll($error,800,100);}};commerce.PaymentWidget.prototype=new literatum.Widget();commerce.PaymentWidget.id='eCommerceCheckoutPaymentWidget';commerce.PaymentWidget.action='/pb/widgets/commerce/payment';commerce.PaymentWidget.notifications={holderName:commerce.FieldNotification,realNumber:commerce.FieldNotification,creditcardDate:commerce.FieldNotification,secNumber:commerce.FieldNotification};commerce.PaymentWidget.binders={expandPayment:function(e,widget){e.preventDefault();widget.find(".payment").slideToggle();},placeOrder:function(e,widget){var $form=widget.find("form[name='apg']");var valid=true;$form.find("input[data-validate],select[data-validate]").each(function(){var $this=$(this);var $group=$this.closest(".input-group");var invalid=commerce.validators.validateField($this,$form);var fieldsValidation=[];fieldsValidation.push(invalid);var notification=widget.getNotification($group.data('notification'));if(!notification){return;}
if(invalid){notification.reset();notification.setMessage('');notification.error();notification.show();}else{notification.reset()}
valid=!invalid&&valid;if(!valid||fieldsValidation.includes(true)){var loading=new literatum.FullPageLoading();loading.done();e.preventDefault();}else{var loading=new literatum.FullPageLoading();loading.setMessage("Do not close your browser while we are processing your payment");loading.start();}});},expand:function(e,widget){var $header=widget.find(".checkout-expand");$header.stop(true,true);$header.slideToggle();}};commerce.PaymentWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.PaymentWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.PaymentWidget.id);};commerce.PaymentWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.PaymentWidget.prototype).registerListeners.call(this);var widget=this;var $date=$(this.find("input[name='expireDate']"));$date.on('keyup',function(e){var thisVal=$(this).val();if(thisVal.length==0)
$(this).closest(".input-group").removeClass("focused");else
$(this).closest(".input-group").addClass("focused");var numChars=$(this).val().length;if(numChars===2){if(thisVal>12){thisVal=12;}
if(!/\//.test(thisVal)){thisVal+='/';}
$(this).val(thisVal);}
if(e.which==8&&numChars===2){thisVal=thisVal.substring(0,thisVal.length-2);$(this).val(thisVal);}});$date.on('blur',function(){var dateValue=$date.val().split('/');var numChars=$date.val().length;var thisVal=$date.val();if(this.value){$(widget.find("input[name='expYear']")).val(dateValue[1]);$(widget.find("input[name='expMonth']")).val(dateValue[0]);}else{$(widget.find("input[name='expYear']")).val("");$(widget.find("input[name='expMonth']")).val("");}
if(numChars>6){var currentDate=new Date();var currentYear=currentDate.getFullYear();var value=thisVal.split('/');var yearExpiry=value[1];var expireYear=parseInt(yearExpiry);}});$(this.find("#realNumber")).on("blur",function(e){var $value=$("#realNumber").val();var $cElement=$("#realNumber");var creditCard=commerce.validators.creditcard($value,$cElement);});$(this.find(".creditCarPayment .actions .primary")).on("click",function(e){var $form=widget.find("form[name='apg']");var $this=$('input[data-validate]');var $group=$this.closest(".input-group");var invalid=commerce.validators.validateField($this,$form);var notification=widget.getNotification($group.data('notification'));var $message=[];if($("#expYear").val()=="0000"){$message.push("year ");}
if($("#expMonth").val()=="00"){$message.push(" month");}
if($("#expMonth").val()=="00"&&$("#expYear").val()=="0000"){$message=$message.join("and");}
if($("#expMonth").val()!="00"&&$("#expYear").val()!="0000"){$message.push("a valid date");}
if(!notification){return;}
if(invalid){notification.reset();notification.setMessage('');notification.error();notification.show();}else{notification.reset()}
var inputContainer=$(".creditCarPayment .input-group");inputContainer.each(function(){var $cont=$(this);var $contError=$(this).find(".error");if($contError.length>0){if($contError.find(".invalid-cc").length===0&&!$cont.hasClass("credit-card-date-field")){$contError.find(".field-info").after("<div class='invalid-cc'>- IS MISSING</div>");}
else if($cont.hasClass("credit-card-date-field")){if($contError.find(".invalid-cc").length===0){$contError.find(".field-info").after("<div class='invalid-cc'>Please enter "+$message+"</div>");}
else{$contError.find(".invalid-cc").replaceWith("<div class='invalid-cc'>Please enter "+$message+"</div>");}}}
else{$cont.find(".invalid-cc").remove();}});});if(commerce.PaymentWidget.registerAdditionalListeners)
commerce.PaymentWidget.registerAdditionalListeners();};literatum.widgets.register(commerce.PaymentWidget);
commerce.PaymentWidget.registerAdditionalListeners=function(){$(document).ready(function(){var $confirmOrderMsg=$('.eCommerceCheckoutPaymentWidget .infoMsgBox');if($confirmOrderMsg.is(':visible')){$confirmOrderMsg[0].scrollIntoView();}
if($(".checkout-expand > .errorMsgBox").length>0&&!$(".checkout-expand > .errorMsgBox").hasClass("hidden")){$('html, body').animate({scrollTop:$(".checkout-expand > .errorMsgBox").offset().top},1000);}});};
commerce.PurchaseOptionsWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.savedItems);this.register(commerce.cart.buyingList);var $obj=this.find(".scroll-into-view").closest(".purchaseArea");if($obj&&$obj.length>0){literatum.utils.scroll($obj,1000,50);var $expandSection=this.find("*[data-bind='expandSection']");if($expandSection.length&&!$expandSection.hasClass('active')){$expandSection.click();}}};commerce.PurchaseOptionsWidget.prototype=new literatum.Widget();commerce.PurchaseOptionsWidget.id='eCommercePurchaseAccessWidget';commerce.PurchaseOptionsWidget.action='/pb/widgets/commerce/purchaseOptions';commerce.PurchaseOptionsWidget.find=function(){var $result=$("*[widget-def='"+commerce.PurchaseOptionsWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.PurchaseOptionsWidget.id);};commerce.PurchaseOptionsWidget.binders={saveItem:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var key=$(this).attr("data-doi");commerce.cart.savedItems.saveByDoi(key);},addItem:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var key=$(this).attr("data-key");commerce.cart.buyingList.addItem(key);},expandSection:function(e,widget){e.preventDefault();widget.find('.purchaseAreaList_expanded').slideUp();widget.find('.purchaseAreaList_expand').attr("aria-expanded",false);if($(e.target).hasClass('active')){$(e.target).removeClass('active');$(e.target).siblings('.purchaseAreaList_expanded').slideUp();$(e.target).attr("aria-expanded",false);}else{$(e.target).addClass('active');widget.find(".purchaseAreaList_expand").not($(e.target)).removeClass('active');$(e.target).siblings('.purchaseAreaList_expanded').slideDown();$(e.target).attr("aria-expanded",true);}}};commerce.PurchaseOptionsWidget.prototype.update=function(model){this.triggerInfoHandlers(this,model);this.loaded();};commerce.PurchaseOptionsWidget.infoHandlers={info:function(message,widget,model){var key=model.attributes['itemAdded'];var notification=commerce.Notification.get(widget.find(".purchaseMessage[data-item='"+key+"'].info"));if(notification){notification.setMessage(message);notification.info();notification.show();notification.$element.siblings("a").find(".add-to-cart-msg").remove();setTimeout(function(){notification.$element.fadeOut();$(widget.find("*[data-entity='"+key+"']")).parent().hide();commerce.Notification.get(widget.find(".addedMessage[data-item='"+key+"']")).showFlex();},2000);}},error:function(message,widget,model){var key=model.attributes['itemAdded'];var notification=commerce.Notification.get(widget.find(".purchaseMessage[data-item='"+key+"']"));if(notification){notification.setMessage(message);notification.error();notification.show();}
$(widget.find("*[data-entity='"+key+"']")).hide();},savedItemInfo:function(message,widget){var notification=commerce.Notification.get(widget.find(".savedItem-info"));if(notification){notification.setMessage(message);notification.info();}
$(widget.find(".save-for-later-link")).hide();},savedItemError:function(message,widget){var notification=commerce.Notification.get(widget.find(".savedItem-info"));if(notification){notification.setMessage(message);notification.error();notification.show();}},nextAction:function(message){if(message=='refreshPage'){setTimeout(function(){location.reload();},5000);}}};literatum.widgets.register(commerce.PurchaseOptionsWidget);
commerce.CartIndicatorWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);this.register("quantityIncreased");this.register("quantityDecreased");this.register("updateQuantity");};commerce.CartIndicatorWidget.prototype=new literatum.Widget();commerce.CartIndicatorWidget.id='eCommerceCartIndicatorWidget';commerce.CartIndicatorWidget.action=null;commerce.CartIndicatorWidget.prototype.update=function(model){var $cartSize=this.find("*[data-id='cart-size']");if(model.size==0){$cartSize.hide();$cartSize.html(model.size);}else{$cartSize.show("hidden");$cartSize.html(model.size);}};commerce.CartIndicatorWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.CartIndicatorWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.CartIndicatorWidget.id);};literatum.widgets.register(commerce.CartIndicatorWidget);
commerce.AddToCartWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.buyingList);};commerce.AddToCartWidget.prototype=new literatum.Widget();commerce.AddToCartWidget.id='eCommerceCheckoutAddToCartWidget';commerce.AddToCartWidget.action='/pb/widgets/commerce/addToCart';commerce.AddToCartWidget.binders={expand:function(e,widget){e.preventDefault();if(widget.find(".add-journal-to-cart-container").length>0){var addToCart=document.createElement('div');$(addToCart).addClass('eCommerceCheckoutAddToCartWidgetExpanded');$(addToCart).appendTo('body');$('body').css('overflow','hidden');widget.find(".add-journal-to-cart-container").clone().prepend('<a href="#" class="close float-right"><i class="icon-close_thin"></i></a>').appendTo(addToCart).slideToggle().find("a").first().focus();var overlay=document.createElement('div');$(overlay).addClass('overlay-fixed');$(overlay).appendTo('.eCommerceCheckoutAddToCartWidgetExpanded');$(overlay).find("a").first().focus();}
widget.registerListeners();},addItem:function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var key=$(this).attr("data-key");commerce.cart.buyingList.addItem(key);}};commerce.AddToCartWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.AddToCartWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.AddToCartWidget.id);};commerce.AddToCartWidget.infoHandlers={info:function(message,widget,model){var key=model.attributes['itemAdded'];var notification=commerce.Notification.get($(".eCommerceCheckoutAddToCartWidgetExpanded .purchaseMessage[data-item='"+key+"'].info"));if(notification){notification.setMessage(message);notification.info();notification.show();notification.$element.siblings("a").find(".add-to-cart-msg").remove();setTimeout(function(){notification.$element.fadeOut();$(".eCommerceCheckoutAddToCartWidgetExpanded *[data-entity='"+key+"']").hide();commerce.Notification.get(".addedMessage[data-item='"+key+"']").showFlex();},1000);}},error:function(message,widget,model){var key=model.attributes['itemAdded'];var notification=commerce.Notification.get($(".eCommerceCheckoutAddToCartWidgetExpanded .purchaseMessage[data-item='"+key+"'].error"));if(notification){notification.setMessage(message);notification.error();notification.show();}
$(".eCommerceCheckoutAddToCartWidgetExpanded *[data-entity='"+key+"']").hide();},savedItemInfo:function(message,widget){var notification=commerce.Notification.get(widget.find(".savedItem-info"));if(notification){notification.setMessage(message);notification.info();notification.show();}
$(".eCommerceCheckoutAddToCartWidgetExpanded .save-for-later-link").hide();},savedItemError:function(message,widget){var notification=commerce.Notification.get(widget.find(".savedItem-info"));if(notification){notification.setMessage(message);notification.error();notification.show();}},nextAction:function(message){if(message=='refreshPage'){setTimeout(function(){location.reload();},5000);}}};commerce.AddToCartWidget.prototype.render=function(model,params){params['doi']=this.find("a[data-doi]").attr("data-doi");Object.getPrototypeOf(commerce.AddToCartWidget.prototype).render.call(this,model,params);};commerce.AddToCartWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.AddToCartWidget.prototype).registerListeners.call(this);$(document).on('click',function(event){if(!$(event.target).closest('.eCommerceCheckoutAddToCartWidgetExpanded').length&&!$(event.target).closest('.eCommerceCheckoutAddToCartWidget').length&&$('.eCommerceCheckoutAddToCartWidgetExpanded').is(':visible')){event.preventDefault();$('.eCommerceCheckoutAddToCartWidgetExpanded').remove();$('body').css('overflow','auto');}});$(document).on('click','.eCommerceCheckoutAddToCartWidgetExpanded .close',function(){$('.eCommerceCheckoutAddToCartWidgetExpanded').remove();$('body').css('overflow','auto');});$(".eCommerceCheckoutAddToCartWidgetExpanded *[data-bind='addItem']").off();$(".eCommerceCheckoutAddToCartWidgetExpanded *[data-bind='addItem']").click(function(e){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();var key=$(this).attr("data-key");commerce.cart.buyingList.addItem(key);});};literatum.widgets.register(commerce.AddToCartWidget);
commerce.CartInfoWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);this.register(commerce.cart.discounts);this.register(commerce.cart.buyingList);this.register(commerce.cart.savedItems);this.register(commerce.cart.billing);this.register(commerce.cart.shipping);};commerce.CartInfoWidget.prototype=new literatum.Widget();commerce.CartInfoWidget.id='eCommerceCartInfoWidget';commerce.CartInfoWidget.action=null;commerce.CartInfoWidget.prototype.update=function(){var notification=commerce.Notification.get(this.find(".cartInfo"));if(notification){notification.reset();}};commerce.CartInfoWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.CartInfoWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.CartInfoWidget.id);};literatum.widgets.register(commerce.CartInfoWidget);
commerce.IdentityBarWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.identity);};commerce.IdentityBarWidget.prototype=new literatum.Widget();commerce.IdentityBarWidget.id='literatumNavigationLoginBar';commerce.IdentityBarWidget.action='/pb/widgets/commerce/identityBar';commerce.IdentityBarWidget.binders={expand:function(e,widget){widget.find(".navigation-login-dropdown-container").toggle();}};commerce.IdentityBarWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.IdentityBarWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.IdentityBarWidget.id);};commerce.IdentityBarWidget.prototype.registerListeners=function(){Object.getPrototypeOf(commerce.RecommendedWidget.prototype).registerListeners.call(this);};literatum.widgets.register(commerce.IdentityBarWidget);
commerce.RestoreAccessWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);this.register(commerce.cart.restoreAccess);};commerce.RestoreAccessWidget.prototype=new literatum.Widget();commerce.RestoreAccessWidget.id='eCommerceRestoreContentAccessWidget';commerce.RestoreAccessWidget.action='/pb/widgets/commerce/restoreAccess';commerce.RestoreAccessWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.RestoreAccessWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.RestoreAccessWidget.id);};commerce.RestoreAccessWidget.binders={request:function(e,widget){var loading=new literatum.FullPageLoading();loading.start();commerce.cart.addCallback(loading.done);e.preventDefault();commerce.cart.restoreAccess.request(widget.find("input[name='email']").val());}};commerce.RestoreAccessWidget.prototype.update=function(model){this.triggerInfoHandlers(this,model);this.loaded();};commerce.RestoreAccessWidget.infoHandlers={restoreError:function(message,widget){widget.find('.restore-info').hide();widget.find('.restore-error').hide();var notification=commerce.Notification.get(widget.find(".restore-error"));notification.setMessage(message);notification.error();notification.show();},error:function(message,widget){widget.find('.restore-info').hide();var $inputGroup=widget.find("input[name='email']").closest(".input-group");var notification=commerce.FieldNotification.get($inputGroup);if(notification){notification.error();notification.setMessage(message);notification.show();}},info:function(message,widget){widget.find('.restore-error').hide();var $inputGroup=widget.find("input[name='email']").closest(".input-group");var notification=commerce.Notification.get(widget.find(".restore-info"));var fieldNotification=commerce.FieldNotification.get($inputGroup);if(fieldNotification){fieldNotification.reset();fieldNotification.hide();}
if(notification){notification.setMessage(message);notification.info();notification.show();}}};literatum.widgets.register(commerce.RestoreAccessWidget);
commerce.page.cart.checkoutButton=function(data){var $leftCol=$('.checkoutProcessLeftCol');if(data.size==0){$leftCol.removeClass('no-buying');}else{$leftCol.addClass('no-buying');}
if(data.size>0&&$(window).width()<993&&$('.checkoutStickyBtn').length==0&&$leftCol.length){$leftCol.append('<div><div class="checkoutStickyBtn"><input class="button primary" type="button" title="checkout" value="checkout"></div></div>');}
if(!data.size||$(window).width()>=993){$('.checkoutStickyBtn').remove();}};commerce.cart.register(commerce.cart.buyingList,commerce.page.cart.checkoutButton);commerce.cart.register(commerce.cart.savedItems,commerce.page.cart.checkoutButton);
$(document).ready(function(){var checkout=location.hash.indexOf("checkout")>-1||location.href.indexOf('checkout')>-1;if(checkout&&$(".cartLabel .shopping-cart").html()>0){commerce.page.cart.show();}
if(checkout){literatum.utils.nextCheckoutSection();}
if(commerce.page.cart.checkoutButton!==undefined)
commerce.page.cart.checkoutButton({size:$(".cartLabel .shopping-cart").html()});$(document).on('click','.add-journal-to-cart .prevent-fix, .add-journal-to-cart .tab-nav a',function(e){if($(this).parent().hasClass('disable-click')){return false;}else{$(this).next(".journal-options-expanded").slideToggle();$(this).toggleClass("open");setTimeout(function(){$('.eCommerceCheckoutSavedForLaterItemsWidget .journal-options-expanded,.eCommerceCheckoutRecommendedItemsWidget .journal-options-expanded,.eCommerceCheckoutRecentlyViewedItemsWidget .journal-options-expanded').each(function(){var expandedMargin=$(this).height()+21;if(expandedMargin>25&&$(this).is(':visible')){$(this).closest('.add-journal-to-cart').css('margin-bottom',expandedMargin);}else{$(this).closest('.add-journal-to-cart').css('margin-bottom','10px');}});},400);if($(this).closest('.purchaseArea').css('position')=='absolute'&&!$(e.target).closest('.tab-nav').length){$('.add-journal-to-cart').toggleClass('disable-click');$(this).closest('.add-journal-to-cart').toggleClass("disable-click");}}
return false;});verifyAddress();});$(document).ajaxComplete(function(){verifyAddress();});function verifyAddress(){$("form").on("focusout blur",".js__verifyAddress input",function(e){var pattern1=new RegExp('^p.*o.*box.*','i');var pattern2=new RegExp('^po box[^a-z 0-9]+','i');var pattern3=new RegExp('^po[^a-z ]+box','i');var pattern4=new RegExp('^po[^a-z 0-9]+ box','i');var pattern5=new RegExp('^po [^a-z 0-9]+box','i');if($(this).val().match(pattern1)){if($(this).val().match(pattern2)||$(this).val().match(pattern3)||$(this).val().match(pattern4)||$(this).val().match(pattern5)){$(this).addClass("error");if($(this).siblings(".errorMsg").length==0)
$(this).after("<span class='errorMsg'>PO BOX addresses should start with 'PO BOX'</span>");}
else{$(this).removeClass("error");$(this).siblings(".errorMsg").remove();}}
else{$(this).removeClass("error");$(this).siblings(".errorMsg").remove();}});}
if(commerce.page.cart.checkoutButton!==undefined){$(window).resize(function(){commerce.page.cart.checkoutButton({size:$(".cartLabel .shopping-cart").html()});});}
literatum.events.register('user-action',function(){literatum.widgets.all().forEach(function(item){item.reset()});});literatum.events.register('widget-rendered',function(){var $document=$(document);if(typeof $document.Tabs!='undefined'){$(document).Tabs();}});commerce.cart.setErrorHandler(function(){location.reload();});
$(document).ready(function(){$(".commerceExplainer .header").click(function(){$header=$(this);$content=$header.next();$content.slideToggle(function(){if($("li",$content).length==0)
return;if($content.is(":visible")){$header.removeClass("collapsed");$header.addClass("expanded")}else{$header.removeClass("expanded");$header.addClass("collapsed");}});});$(".commerceExplainer .content").each(function(index,element){if($("li",element).length==0){$(element).closest(".container").children(".header").addClass("empty expanded");}});});
commerce.RedeemAllowanceWidget=function(widgetDef,element){literatum.Widget.call(this,widgetDef,element);};commerce.RedeemAllowanceWidget.prototype=new literatum.Widget();commerce.RedeemAllowanceWidget.id='eCommerceRedeemOfferWidget';commerce.RedeemAllowanceWidget.action='/pb/widgets/commerce/redeemAllowance';commerce.RedeemAllowanceWidget.binders={expand:function(e,widget){e.preventDefault();widget.find('.expand-purchase-options').toggleClass('expanded');widget.find(".add-allowance").slideToggle();}};commerce.RedeemAllowanceWidget.find=function(){var $result=$("*[data-widget-def='"+commerce.RedeemAllowanceWidget.id+"']");if($result.length>0){return $result;}
return $("."+commerce.RedeemAllowanceWidget.id);};literatum.widgets.register(commerce.RedeemAllowanceWidget);
var functions={};$(function(){var lower=/[a-z]/;var upper=/[A-Z]/;var special=/[!@#\$%\^\&*\)\(+=._-]/;var numeric=/[0-9]/;functions.getBaseScore=function(value){var score=0;if(lower.test(value)){score++;}
if(upper.test(value)){score++;}
if(special.test(value)){score++;}
if(numeric.test(value)){score++;}
if(score==1){score=0;}
return score;};functions.updateIndicator=function($indicator,value,min,max,target){$indicator.removeClass('too-short too-long weak strong very-strong');var pass_selector=$('.pass-strength-popup');pass_selector.removeClass('too-short too-long weak strong very-strong');if(!value){pass_selector.find('.strength').text('Too Short').hide();pass_selector.find('.strength').text('Too Long').hide();pass_selector.removeClass('weak');pass_selector.removeClass('strong');return;}
var length=value.trim().length;if(length<min){$indicator.addClass('too-short');pass_selector.addClass('too-short');pass_selector.find('.strength').text('Too Short').show();pass_selector.removeClass('weak');pass_selector.removeClass('strong');return;}
if(length>max){$indicator.addClass('too-long');pass_selector.addClass('too-long');pass_selector.find('.strength').text('Too Long').show();pass_selector.removeClass('weak');pass_selector.removeClass('strong');pass_selector.addClass('too-long');$(".pass-strength-popup").css("display","block");return;}
var score=functions.getBaseScore(value,min,max);if(score!=0){score+=Math.floor((length-min)/2);}
var diff=score-target;if(diff<0){$indicator.addClass('weak');pass_selector.addClass('weak');pass_selector.removeClass('strong');pass_selector.find('.strength').text('Weak').show();}else if(diff>=0&&diff<=2){$indicator.addClass('strong');pass_selector.addClass('strong');pass_selector.removeClass('weak');pass_selector.find('.strength').text('Strong').show();}else if(diff>2){$indicator.addClass('very-strong');pass_selector.removeClass('weak');pass_selector.addClass('strong');pass_selector.find('.strength').text('Strong').show();}};$('.password-strength-indicator').each(function(){if(!$('.pass-hint').length){var $indicator=$(this);var $group=$indicator.closest('.input-group');var $input=$group.find('input');var data=$indicator.data();var min=data.min;var max=data.max;var strength=data.strength;functions.updateIndicator($indicator,$input.val(),min,max,strength);$input.on('input change',function(){functions.updateIndicator($indicator,$input.val(),min,max,strength);});}});$('.password-eye-icon').each(function(){var $eye=$(this);var $group=$eye.closest('.input-group');var $input=$group.find('input');$eye.toggleClass('hidden',!$input.val());$input.on('input',function(){$eye.toggleClass('hidden',!$input.val());});$eye.click(function(){$eye.toggleClass('icon-eye-blocked');if($eye.hasClass('icon-eye-blocked')){$eye.removeClass('icon-eye');$input.attr('type','text');}else{$eye.addClass('icon-eye');$input.attr('type','password');}});});if($(".checkoutDropZone").length>0){$(".item__removal__popup__text").addClass("item__removal__cart__text");$(".item__removal__cart__text").removeClass("item__removal__popup__text");if($(".item__removal__cart__text").length>0){$(".item__removal__cart__text").clone().prependTo($(".checkoutDropZone").closest(".row").parent());$(".item__removal__cart__text").last().remove();}}
setTimeout(function(){$(".item__removal__popup__text").fadeOut("slow");},4000);});$(document).ready(function(){$(".js__mail_verification_widget input").on("keyup",function(){if($(this).val().trim().length>0){$(this).closest("form").find(".form-btn").addClass("blue-subb-btn");$(this).closest("form").find(".form-btn").prop('disabled',false);}else{$(this).closest("form").find(".form-btn").removeClass("blue-subb-btn");$(this).closest("form").find(".form-btn").prop('disabled',true);}});$(".raa-modal-dialog .raa-modal-dialog-cncl").on("click",function(e){e.preventDefault();$(this).closest(".raa-modal-dialog").hide();});$(".raa-modal-dialog.enabled").show();var lower=/[a-z]/;var upper=/[A-Z]/;var special=/[!@#\$%\^\&*\)\(+=._-]/;var numeric=/[0-9]/;if($('.pass-hint')){$('.pass-hint').on('keyup input focus change',function(){var pswd=$(this).val();var $indicator=$('.pass-hint').siblings('.password-strength-indicator');var pswd_req=$indicator.data('strength');var pswd_length=$indicator.data('min');var pswd_max=$indicator.data('max');if(!pswd_req){pswd_req=3;}
var list_items_strength2='<ul>'+'<li id="letter" class="invalid"><span>Lower</span></li>'+'<li id="capital" class="invalid"><span>Upper case</span></li>'+'<li id="special" class="invalid"><span>Special character</span></li>'+'<li id="number" class="invalid"><span>Digit</span></li>'+'</ul><span class="strength">Too short</span>';if(pswd_req==2){var validator='<div id="pswd_info" class="pass-strength-popup js__pswd_info strength-two">'+'<h4 id="length">Your password must have: '+pswd_length+' characters or more</h4>'+
list_items_strength2+'</div>';}
else if(pswd_req==3){var validator='<div id="pswd_info" class="pass-strength-popup js__pswd_info strength-three">'+'<h4 id="length">Your password must have: '+pswd_length+' characters or more and contain '+pswd_req+' of the following:</h4>'+
list_items_strength2+'</div>';}else{var validator='<div id="pswd_info" class="pass-strength-popup js__pswd_info strength-four">'+'<h4 id="length">Your password must have: '+pswd_length+' characters or more</h4>'+
list_items_strength2+'</div>';}
if(!$('.js__pswd_info').length){$(this).closest(".input-group").append(validator);}
functions.updateIndicator($indicator,pswd,pswd_length,pswd_max,pswd_req);if(pswd.match(lower)){$('#letter').addClass('valid');}else{$('#letter').removeClass('valid');}
if(pswd.match(upper)){$('#capital').addClass('valid');}else{$('#capital').removeClass('valid');}
if(pswd.match(special)){$('#special').addClass('valid');}else{$('#special').removeClass('valid');}
if(pswd.match(numeric)){$('#number').addClass('valid');}else{$('#number').removeClass('valid');}
if($('.js__pswd_info').length&&$('.js__pswd_info .valid').length>=pswd_req&&pswd.length<=pswd_max&&pswd.length>=pswd_length)
$('.js__pswd_info').fadeOut('slow');else
$('.js__pswd_info').fadeIn('slow');}).blur(function(){$('.js__pswd_info').fadeOut('fast');});}
var $drawer=$('.emails-wrappers,.phones-wrappers');$drawer.on('click','.make-primary,.remove',function(e){$(".js__profileForm input[type='submit']").prop("disabled",false);e.preventDefault();});$(document).on("keypress change",".js__profileForm input, .js__profileForm select",function(e){if($(this).val()){$(".js__profileForm input[type='submit']").prop("disabled",false);}else{$(".js__profileForm input[type='submit']").prop("disabled",true);}});function guestEmail(email){var emailForm=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;return emailForm.test(email);}
$("#email").on('keyup change',function(){if(guestEmail($("#email").val())&&$("#taggedNoGuest").val()=="true"){$(".checkoutMethod input.primary").removeAttr("disabled");}
else{$(".checkoutMethod input.primary").attr("disabled","true");}})});(function($){function visible(element){return $.expr.filters.visible(element)&&!$(element).parents().addBack().filter(function(){return $.css(this,'visibility')==='hidden';}).length;}
function focusable(element,isTabIndexNotNaN){var map,mapName,img,nodeName=element.nodeName.toLowerCase();if('area'===nodeName){map=element.parentNode;mapName=map.name;if(!element.href||!mapName||map.nodeName.toLowerCase()!=='map'){return false;}
img=$('img[usemap=#'+mapName+']')[0];return!!img&&visible(img);}
return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:'a'===nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element);}
$.extend($.expr[':'],{focusable:function(element){return focusable(element,!isNaN($.attr(element,'tabindex')));}});})(jQuery);
$(function(){var $confirmation=$('.registration-confirmation');$confirmation.on('click','.resend',function(){event.preventDefault();$.ajax({method:'get',url:$(this).attr('href')+'&ajaxRequest=true',xhrFields:{withCredentials:true}}).then(function(){$confirmation.html('A link has been resent to your email');}).fail(function(){$confirmation.html('An error has occurred');});});var $popup=$('.societyID-popup');$popup.delay(5000).hide(0);$popup.on('click','.close',function(){$popup.addClass('hidden');});});
$(function(){$('.login-form').each(function(){var $form=$(this);var $login=$form.find('.login');var $pass=$form.find('.password');var $submit=$form.find('.submit');$form.on('click','.resend',function(event){event.preventDefault();$.ajax({method:'get',url:$(this).attr('href')+'&ajaxRequest=true',xhrFields:{withCredentials:true}}).then(function(){$form.find('.message').html('A link has been resent to your email');}).fail(function(){$form.find('.message').html('An error has occurred');});});var change=function(){if(!$login.val()||!$pass.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$login.on('keyup input',change);$pass.on('keyup input',change);change();});});
$(function(){$('.request-username-form').each(function(){var $form=$(this);var $email=$form.find('.email');var $submit=$form.find('.submit');var change=function(){if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$email.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){jcf.setOptions('Select',{"wrapNativeOnMobile":false});jcf.replace('.literatumProfileMainWidget .select select:not([multiple="multiple"])');if($(window).width()<992){var $select=$('select[multiple="multiple"]');$select.each(function(){var $this=$(this);var $taxonomy=$this.attr('id').split('.');var $taxonomyCode=$('[name="'+$taxonomy[0]+'.code"]');var $maxTags=$taxonomyCode.data('maxtags').split('.');$maxTags=$maxTags[0];$this.chosen({max_selected_options:$maxTags});});}});
$(function(){var pattern=/^([\w-+]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;$('.loginInformation').each(function(){var $form=$(this);var $email=$form.find('.email');var $email2=$form.find('.email2');var change=function(){$(this).prevAll('.label').removeClass('error').find('.message').remove();};var blur=function(){var $email=$(this);if($email.val()&&!pattern.test($email.val())){var $label=$email.prevAll('.label');$label.addClass('error');var $message=$label.find('.message');if(!$message.length){$message=$('<span class="message"></span>').appendTo($label);}
$message.html('<span> - </span> Is Invalid')}};$email.on('blur',blur).on('change',change);$email2.on('blur',blur).on('change',change);});});
$(function(){var $popups=$('.popup');var $popup=$('.registration-popup');var $email=$popup.find('.email');var $submit=$popup.find('.submit');var items=$popup.find('a, button, input');var lastItem,revers=false,tabKey=9,shift=16,$close=$popup.find('.close');items.each(function(index){if(index===items.length-1){lastItem=$(this);}});$popup.on('keydown',function(e){if(e.keyCode===shift){revers=true;}
if((e.keyCode||e.which)===tabKey){if(!revers){tabEvent();}else{tabRevers();}}});$('.show-registration').click(function(event){$popups.addClass('hidden');$popup.removeClass('hidden');$popup.find('input[type="text"]').focus();event.preventDefault();});$popup.on('click','.close',function(e){e.preventDefault();$popup.addClass('hidden');$('body').removeClass('noscroll');});$popup.on('keyup',function(e){if(e.keyCode==27){$popup.find('.close').trigger("click");}
if(e.keyCode===shift){revers=false;}})
var pattern=/^([\w-+]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;var change=function(event){var code=event.keyCode?event.keyCode:event.which;if(code==13){return;}
$email.prevAll('.label').removeClass('error').find('.message').remove();if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$submit.click(function(){if(!$email.val()){return false;}else if(!pattern.test($email.val())){var $label=$email.prevAll('.label');$label.addClass('error');var $message=$label.find('.message');if(!$message.length){$message=$('<span class="message"></span>').appendTo($label);}
$message.html('<span> - </span> Is Invalid')
return false;}});var blur=function(){if($email.val()&&!pattern.test($email.val())){var $label=$email.prevAll('.label');$label.addClass('error');var $message=$label.find('.message');if(!$message.length){$message=$('<span class="message"></span>').appendTo($label);}
$message.html('<span> - </span> Is Invalid')}};function tabEvent(){$close.off();lastItem.on('focusout',function(){$close.focus();});}
function tabRevers(){lastItem.off();$close.on('focusout',function(){lastItem.focus();});}
$email.on('keyup input',change);$email.on('blur',blur);});
$(function(){$('.request-reset-password-form').each(function(){var $form=$(this);var $email=$form.find('.email');var $submit=$form.find('.submit');var change=function(){if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$email.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){var $drawers=$('.top-drawer');var $drawer=$('.request-reset-password-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $email=$form.find('.email');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');var $message=$content.find('.message');var $recaptcha=$content.find('.g-recaptcha');var id;$('.show-request-reset-password').click(function(event){$drawers.addClass('hidden');$drawer.removeClass('hidden');$success.addClass('hidden');if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}
$original.removeClass('hidden');$content.slideDown('fast');$content.find(":focusable").first().focus();event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$message.html('');$email.val('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();$('.login-popup').find(":focusable").first().focus();});$drawer.on('keyup',function(e){if(e.keyCode==27){$drawer.find('.cancel').trigger("click");}});$form.submit(function(event){event.preventDefault();if(!$email.val()){return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'format',value:'json'});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}}else if(data.externalLink){window.location.replace(data.externalLink);}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){var $body=$('body');var $drawers=$('.top-drawer');var $drawer=$('.request-username-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $email=$form.find('.email');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');var $message=$content.find('.message');var $recaptcha=$content.find('.g-recaptcha');var id;$('.show-request-username').click(function(event){$drawers.addClass('hidden');$drawer.removeClass('hidden');$success.addClass('hidden');if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}
$original.removeClass('hidden');$content.slideDown('fast');$content.find(":focusable").first().focus();event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$message.html('');$email.val('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();$('.login-popup').find(":focusable").first().focus();});$drawer.on('keyup',function(e){if(e.keyCode==27){$drawer.find('.cancel').trigger("click");}});$email.on('keyup input',function(){if(!$email.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}});$form.submit(function(event){event.preventDefault();if(!$email.val()){return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'ajaxRequest',value:true});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);if($recaptcha.length&&typeof grecaptcha!=='undefined'){if(typeof id!=='undefined'){grecaptcha.reset(id);}else{id=grecaptcha.render($recaptcha[0],$recaptcha.data());}}else if($content.find(".LBD_CaptchaDiv").length){$content.find(".LBD_CaptchaDiv").find(".LBD_ReloadLink").trigger("click");}}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){$('.resetPasswordWidget').each(function(){var $form=$(this).find('form');var $password=$form.find('.password');var $submit=$form.find('.submit');var change=function(){var valid=true;$password.each(function(){if(!$password.val())
valid=false;});if(!valid){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$password.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){$('.claim-options li').each(function(){var $form=$(this).find('form');var $token=$form.find('.token');var $submit=$form.find('.submit');var change=function(){if(!$token.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$token.on('keyup input',change);change();$form.submit(function(event){if($submit.attr('disabled')){event.preventDefault();}});});});
$(function(){var $drawers=$('.top-drawer');var $drawer=$('.change-password-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $old=$form.find('.old');var $new=$form.find('.new');var $message=$form.find('.message');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');var $indicator=$content.find('.password-strength-indicator');var $eye=$content.find('.password-eye-icon');$('.show-change-password').click(function(event){$drawers.addClass('hidden');$drawer.removeClass('hidden');$success.addClass('hidden');$original.removeClass('hidden');$content.slideDown('fast');$content.find("input:focusable").first().focus();event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$old.attr('type','password').val('');$new.attr('type','password').val('');$indicator.removeClass('too-short too-long weak medium strong very-strong');$eye.addClass('hidden icon-eye').removeClass('icon-eye-blocked');$message.text('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();});var indicatorClassesCheck='.too-short, .too-long, .weak';if($($submit).hasClass('passRankDisabled')){indicatorClassesCheck='.too-short, .too-long';}
var change=function(){if(!$old.val()||!$new.val()||$indicator.is(indicatorClassesCheck)){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$old.on('keyup input',change);$new.on('keyup input',change);$form.submit(function(event){event.preventDefault();if(!$old.val()||!$new.val()){return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'ajaxRequest',value:true});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){var $drawers=$('.top-drawer');var $drawer=$('.verify-phone-drawer');var $content=$drawer.find('.content');var $form=$content.find('form');var $verificationCode=$form.find('.verificationCode');var $message=$form.find('.message');var $submit=$form.find('.submit');var $original=$content.find('.form');var $success=$content.find('.success-template');$('.show-verify-phone').click(function(event){var $link=$(this);var link=$link.attr('href')
$.ajax(link).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);}else{$drawer.removeClass('hidden');$success.addClass('hidden');$original.removeClass('hidden');$content.slideDown('fast');}});event.preventDefault();});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$verificationCode.attr('type','text').val('');$message.text('');$submit.attr('disabled',true);$drawer.addClass('hidden');event.preventDefault();});var change=function(){if(!$verificationCode.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$verificationCode.on('keyup input',change);$form.submit(function(event){var reg=new RegExp('^[0-9]{6}$');event.preventDefault();if(!reg.test($verificationCode.val())){$original.removeClass('hidden');$success.addClass('hidden');$message.html('verification code must be 6 digits');return;}
var url=$form.attr('action');var data=$form.serializeArray();data.push({name:'ajaxRequest',value:true});$.ajax({method:'post',url:url,data:data,xhrFields:{withCredentials:true}}).then(function(data){if(data.result){$original.removeClass('hidden');$success.addClass('hidden');$message.html(data.message);}else{$original.addClass('hidden');$success.removeClass('hidden');}}).fail(function(){$original.removeClass('hidden');$success.addClass('hidden');$message.html('Unknown error');});});});
$(function(){var start=1000;var $emails=$('.emails-wrappers');if(!$emails.length)return;var current=$emails.data().count;var max=$emails.data().max;var $drawers=$('.top-drawer');var $drawer=$('.emails-wrappers .verification-confirmation');var $content=$drawer.find('.content');var $success=$drawer.find('.success-template');var $failure=$drawer.find('.failure-template');var template=$emails.find('.template').html();$emails.on('click','.add',function(){if(current<max){$emails.append(template.replace(/INDEX/g,start++));current++;$emails.toggleClass('saturated',current>=max);}});$emails.on('click','.remove',function(){$(this).closest('.email').remove();current--;$emails.toggleClass('saturated',current>=max);});$emails.on('click','.make-primary',function(){var $old=$emails.find('.email.primary').find('.value');var $new=$(this).closest('.email').find('.value');var value=$new.val();$new.val($old.val());$old.val(value);});$emails.on('click','.resend-verification',function(event){event.preventDefault();$.ajax({method:'get',url:$(this).attr('href')+'&ajaxRequest=true',xhrFields:{withCredentials:true}}).then(function(data){var $clone;if(data.result){$clone=$failure.clone();$clone.find('.message').html(data.message);}else{$clone=$success.clone();}
$content.html($clone.html());$drawers.addClass('hidden');$drawer.removeClass('hidden');$content.slideDown('fast');});});$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$drawer.addClass('hidden');event.preventDefault();});});
$(function(){var start=1000;var $phones=$('.phones-wrappers');if(!$phones.length)return;var current=$phones.data().count;var max=$phones.data().max;var template=$phones.find('.template').html();$phones.on('click','.add',function(){if(current<max){$phones.append(template.replace(/INDEX/g,start++));current++;$phones.toggleClass('saturated',current>=max);}});$phones.on('click','.remove',function(){$(this).closest('.phone').remove();current--;$phones.toggleClass('saturated',current>=max);});});
$(function(){$('.addresses').each(function(){var $widget=$(this);var $change=$widget.find('.switch-address');var $edit=$widget.find('.edit');var $addresses=$widget.find('.address');var clear=function(){$edit.find('.dynamic').val('');$edit.find('.error').removeClass('error');$edit.find('.state').attr('disabled',true);$edit.find('.state').closest('.input-group').addClass('hidden');$edit.find('.message').text('');};$change.change(function(){var uuid=$change.val();$edit.addClass('hidden');$addresses.addClass('hidden');clear();if(uuid){$addresses.filter('.'+uuid).removeClass('hidden');}else{$edit.removeClass('hidden');}});$widget.on('click','.edit-address',function(e){e.preventDefault();var $address=$(this).closest('.address');$address.find('[data-name]').each(function(){var $this=$(this);var $holder=$edit.find('#address\\.'+$this.data().name);var text=$this.text();if($holder.is('select')){console.log($holder.find('option').filter(function(){return $(this).val()==text||$(this).text()==text;}));$holder.find('option').removeAttr('selected').filter(function(){return $(this).val()==text||$(this).text()==text;}).prop('selected',true);}else{$holder.val(text);}});var country=$edit.find('.country').val();if(country){$edit.find('.state').addClass('hidden');var $states=$edit.find('.state.'+country);if($states.length){var state=$address.find('[data-name="state"]').text();$states.find('option').removeAttr('selected').filter(function(){return $(this).val()==state||$(this).text()==state;}).prop('selected',true);$states.removeAttr('disabled');$states.closest('.input-group').removeClass('hidden');$states.removeClass('hidden');}}
$address.addClass('hidden');$edit.removeClass('hidden');});$(".save-profile").click(function(){$(".edit-address").click();$(".edit").addClass("hidden");$(".address").removeClass("hidden");});$widget.on('change','.country',function(){var value=$(this).val();var $states=$edit.find('.state');$states.attr('disabled',true).val('');$states.addClass('hidden');var $current=$states.filter('.'+value);if($current.length){$current.removeAttr('disabled');$current.removeClass('hidden');}
$states.closest('.input-group').toggleClass('hidden',!$current.length);});});});
$(function(){$('.social-email').each(function(){var $social=$(this);var $submit=$social.find('.submit');var change=function(){if($social.find('.required').filter(function(){return!$(this).val();}).length>0){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$social.find('.required').on('keyup input',change);change();});});
$(function(){var $section=$('.institutions');var $search=$section.find('.search');var toggle=function($link,value){$link.find('a').toggleClass('collapsed',!value);$link.next().toggleClass('hidden',value);};$search.keyup(function(){var text=$(this).val().toLowerCase();$section.find('.expand-link').each(function(){toggle($(this),!text);});$section.find('.institution').each(function(){var $institution=$(this);$institution.toggleClass('hidden',$institution.data().value.toLowerCase().indexOf(text)<0);});$section.find('.federation').each(function(){var $federation=$(this);$federation.toggleClass('hidden',!$federation.find('.institution:not(.hidden)').length);});});$section.on('click','.expand-link',function(event){var collapsed=$(this).next().hasClass("hidden");event.preventDefault();toggle($(this),!collapsed);});});
$(function(){$('.identityTokenWidget').each(function(){var $form=$(this).find('form');var $submit=$form.find('.submit');var $token=$form.find('.token');var change=function(){if(!$token.val()){$submit.attr('disabled',true);}else{$submit.removeAttr('disabled');}};$token.on('keyup input',change);change();});});
$(function(){var $purchase=$('.purchaseArea');$purchase.on('click','.expand-link',function(event){event.preventDefault();var $link=$(this);var $content=$link.nextAll('.content');$link.toggleClass('active');$content.toggleClass('hidden');});$('.save-for-later-link').click(function(){$(".save-for-later-link").hide();$(".saved-go-cart").show();});$('.add-article-to-cart').click(function(){$(".save-for-later-link").hide();});var $deepdyve=$purchase.find('.deep-dyve');if($deepdyve.length){var url='https://www.deepdyve.com/rental-link';var data=$deepdyve.data();if(data.affid&&data.issn&&data.doi){$.ajax({url:url,data:{docId:data.doi,fieldName:'journal_doi',journal:data.issn,affiliateId:data.affid,format:'jsonp'},dataType:'jsonp',jsonp:'callback'}).then(function(json){if(json.status==='ok'){$deepdyve.attr('href',json.url);$deepdyve.removeClass('hidden');}});}}});
$(function(){var $drawer=$('.society-id-status');var $content=$drawer.find('.content');$content.slideDown('fast');$drawer.on('click','.cancel',function(event){$content.slideUp('fast');$drawer.addClass('hidden');event.preventDefault();});hideSocietyStatusDialog($drawer)});function hideSocietyStatusDialog($drawer){$drawer.delay(8000).hide(0);};var raa = {};

$(document).ready(function () {
    $(".show-request-reset-password").click(function () {
        if ($('.password-recaptcha-ajax').length)
            $.ajax({
                type: 'GET',
                dataType: 'html',
                url: '/pb/widgets/CaptchaResponseHandler/'
            }).done(function (data) {
                $('.password-recaptcha-ajax').append(data)
            })
    });
    $(".show-request-username").click(function () {
        if ($('.username-recaptcha-ajax').length)
            $.ajax({
                type: 'GET',
                dataType: 'html',
                url: '/pb/widgets/CaptchaResponseHandler/'
            }).done(function (data) {
                $('.username-recaptcha-ajax').append(data)
            })
    })
});raa.EntitlementsWidget = function(widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
};

raa.EntitlementsWidget.prototype = new literatum.Widget();

raa.EntitlementsWidget.id = 'eCommerceAccessEntitlementWidget';
raa.EntitlementsWidget.action = '/pb/widgets/raa/entitlements';

raa.EntitlementsWidget.prototype.reloadTab = function(tab) {
    var widget = this;
    var loading = new literatum.FullPageLoading().start();
    var $tabContent = this.find("#" + tab);
    var $form = $tabContent.find("form");
    var $query = $form.find("input[name='query']");
    var $sort = $form.find("select");
    literatum.widgets.render(widget, {}, {
        sort: $sort.val(),
        query: $query.val(),
        selectedTab: tab.replace('pane-', '')
    }, function () {
        loading.done();
        if (typeof jcf !== "undefined")
            jcf.replace($('.jcf[data-bind-change="sort"]'));
    }, function(html) {
        if($(html.trim()).hasClass("tab__pane")){
            $(html.trim()).each(function() {

                if ($(this).hasClass("tab__pane")) {
                    var find = $('<div>').append($(this)).html();
                    $tabContent.html(find);
                }
            });

        }
        else{
            var find= $(html.trim()).find(".tab__pane");
            $tabContent.html(find.html());
        }
        widget.registerListeners();
    });
};

raa.EntitlementsWidget.binders = {
    series: function(e, widget) {
        e.preventDefault();
        widget.find(".tab__nav li").removeClass("active");
        $(e.target).closest("li").addClass("active");
        widget.find(".tab__pane").removeClass("active");
        var $tabContent = widget.find("#pane-series");
        if ($tabContent.children().length == 0) {
            widget.reloadTab('series');
        } else {
            $tabContent.find(".tab__pane").addClass("active");
        }
    },
    groups: function(e, widget) {
        e.preventDefault();
        widget.find(".tab__nav li").removeClass("active");
        $(e.target).closest("li").addClass("active");
        widget.find(".tab__pane").removeClass("active");
        var $tabContent = widget.find("#pane-groups");
        if ($tabContent.children().length == 0) {
            widget.reloadTab('groups');
        } else {
            $tabContent.find(".tab__pane").addClass("active");
        }
    },
    items: function(e, widget) {
        e.preventDefault();
        widget.find(".tab__nav li").removeClass("active");
        $(e.target).closest("li").addClass("active");
        widget.find(".tab__pane").removeClass("active");
        var $tabContent = widget.find("#pane-items");
        if ($tabContent.children().length == 0) {
            widget.reloadTab('items');
        } else {
            $tabContent.find(".tab__pane").addClass("active");
        }
    },
    submitSearch: function (e, widget) {
        e.preventDefault();
        widget.reloadTab($(e.target).closest(".tab__pane").attr("id"));
    },
    sort: function (e, widget) {
        if(e.type=='change') {
            widget.reloadTab(widget.find(".tab__pane:visible").attr("id"));
        }
    }
};

raa.EntitlementsWidget.prototype.registerListeners = function() {
    Object.getPrototypeOf(raa.EntitlementsWidget.prototype).registerListeners.call(this);
    var widget = this;
    this.find("input[name='query']").closest("form").submit(function(e){
        e.preventDefault();
        raa.EntitlementsWidget.binders.submitSearch(e, widget);
    });
};

raa.EntitlementsWidget.find = function() {
    var $result = $("*[data-widget-def='" + raa.EntitlementsWidget.id +"']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + raa.EntitlementsWidget.id);
};

literatum.widgets.register(raa.EntitlementsWidget);

if(document.addEventListener){document.addEventListener("DOMContentLoaded",twoFactorAuthentication,false);}
else{document.onreadystatechange=twoFactorAuthentication;}
function twoFactorAuthentication(){if(document.getElementById('select-list-hidden')){var first=document.getElementById('container-all');var scrollableList=document.createElement("div");scrollableList.setAttribute('class','scrollableList');first.appendChild(scrollableList);var parent_node=document.querySelectorAll('.scrollableList');var selectOneOfTheOptions=document.createElement("div");selectOneOfTheOptions.setAttribute('id','selectOneOfTheOptions');parent_node[0].appendChild(selectOneOfTheOptions);var js__countries_select=document.createElement("ul");js__countries_select.setAttribute('tabindex','-1');js__countries_select.setAttribute('id','js__countries-select');js__countries_select.setAttribute('class','f32 hide');parent_node[0].appendChild(js__countries_select);var selectList=document.getElementById('select-list-hidden').getElementsByTagName('option');for(var j=0;j<selectList.length;j++){var a=selectList[j];var countries_text=selectList[j].text;var ulss=document.getElementById('js__countries-select');var classesAll=selectList[j].getAttribute("class");var node=document.createElement("li");ulss.appendChild(node);var ulss=document.getElementById('js__countries-select').getElementsByTagName('li')[j];var linkes_to_add=document.createElement("a");var textnode=document.createTextNode(countries_text);if(j==0){linkes_to_add.setAttribute('tabindex','0');}
linkes_to_add.setAttribute('href','#');linkes_to_add.appendChild(textnode);linkes_to_add.setAttribute('class',classesAll);ulss.appendChild(linkes_to_add);}
var li23=document.createElement('i');li23.innerHTML='';li23.setAttribute('class','countries-select ');document.getElementById("selectOneOfTheOptions").appendChild(li23);var true2=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a");var innerdeep=document.getElementById("js__countries-select").getElementsByTagName("li")[0].getElementsByTagName("a")[0];document.createElement('a');var like=innerdeep;true2.innerHTML=like;var clon3=like.cloneNode(true);var res=clon3.innerHTML.split("+");clon3.innerHTML='+'+res[1];document.getElementById("selectOneOfTheOptions").appendChild(clon3);document.getElementById("selectOneOfTheOptions").onclick=function(e){if(typeof e=='undefined')e=window.event;e.preventDefault?e.preventDefault():(e.returnValue=false);if(document.getElementById("js__countries-select").className=="f32 hide"){e.preventDefault?e.preventDefault():(e.returnValue=false);document.getElementById("js__countries-select").className="f32";var focusedElement=document.getElementById("js__countries-select").getElementsByTagName('a')[0];focusedElement.focus();e=e||window.event;document.getElementById("js__countries-select").className="f32";}
else{document.getElementById("js__countries-select").className="f32 hide";}};var ul=document.getElementById('js__countries-select');if(ul.addEventListener){ul.addEventListener("click",function(e){functionX((e||event))},false);}
else{ul.attachEvent("onclick",function(e){functionX((e||event))});}
function functionX(e){var targetedElement=null;if(typeof e=='undefined')e=window.event;if(typeof e.srcElement=='undefined'){targetedElement=e.originalTarget;}else{targetedElement=e.srcElement;}
if(targetedElement.tagName==='A'){e.preventDefault?e.preventDefault():(e.returnValue=false);var firstchildnew=document.getElementById('selectOneOfTheOptions').getElementsByTagName('a')[0];var true1=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a");if(true1){e.preventDefault?e.preventDefault():(e.returnValue=false);true1.innerHTML=targetedElement;var clon3=targetedElement.cloneNode(true);var res=clon3.innerHTML.split("+");clon3.innerHTML='+'+res[1];document.getElementById("selectOneOfTheOptions").appendChild(clon3);firstchildnew.remove();}
functionaddToHidden(e);}}
document.getElementById('js__mobile-countries').onkeydown=function(e){if(typeof e=='undefined'){e=window.event;}
functionaddToHidden(e);};function stripNonNumbers(val){return val.replace(/\D/g,'');}
document.getElementById('js__mobile-countries').onkeyup=function(e){var start=this.selectionStart,end=this.selectionEnd;this.value=stripNonNumbers(this.value);this.setSelectionRange(start,end);};document.getElementById('js__mobile-countries').addEventListener("focusout",function(e){this.value=stripNonNumbers(this.value);});document.getElementById('js__countries-select').getElementsByTagName('a').onmousedown=function(e){if(typeof e=='undefined')e=window.event;functionaddToHidden(e);};function functionaddToHidden(e){var input=document.getElementById('js__mobile-countries');var messages=document.getElementById('codeAndPhone');e=e||window.event;if(typeof e=='undefined')e=window.event;if(typeof e.srcElement=='undefined'){var sourceb=e.originalTarget;}else{var sourceb=e.srcElement;}
if(sourceb.tagName=="A"){var code2=sourceb.innerHTML;var res=code2.split("+");code2='+'+res[1];var messages=document.getElementById('codeAndPhone');messages.value=code2+input.value;}
else if(sourceb.tagName=="INPUT"){if(input.addEventListener){input.addEventListener("input",function(e){functionY((e||event))},false);}
else{input.attachEvent("onpropertychange",function(e){functionY((e||event))});}
function functionY(e){var code=document.getElementById('selectOneOfTheOptions').getElementsByTagName('a')[0].innerHTML;var res=code.split("+");code='+'+res[1];messages.value=code+input.value;};}
document.getElementById("js__countries-select").className="f32 hide";}
if(!Array.prototype.some)
{Array.prototype.some=function(func)
{for(var i in this)
{if(func(i))return true;}
return false;};}
function hasClass(element,cls){return(' '+element.className+' ').indexOf(' '+cls+' ')>-1;}
document.onmousedown=function(e){if(typeof e=='undefined')e=window.event;if(typeof e.srcElement=='undefined'){var sourceE=e.originalTarget;}else{var sourceE=e.srcElement;}
if((closestt(sourceE,'.js__pincode-container')==null)&&!(sourceE.id=="js__countries-select")){if(document.getElementById('js__mobile-countries')){document.getElementById("js__countries-select").className="f32 hide";}}};function closestt(el,selector){while(el!==null){elementParent=el.parentElement;if(elementParent!==null&&(hasClass(elementParent,selector)||hasClass(el,"flag"))){return elementParent;}
el=elementParent;}
return null;}
function hide(){var elem=document.getElementById('select-list-hidden');elem.style.display='none';}
window.onload=hide;Element.prototype.remove=function(){this.parentElement.removeChild(this);}
NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var i=this.length-1;i>=0;i--){if(this[i]&&this[i].parentElement){this[i].parentElement.removeChild(this[i]);}}}
if(!Array.prototype.filter)
{Array.prototype.filter=function(fun)
{"use strict";if(this===void 0||this===null)
throw new TypeError();var t=Object(this);var len=t.length>>>0;if(typeof fun!=="function")
throw new TypeError();var res=[];var thisp=arguments[1];for(var i=0;i<len;i++)
{if(i in t)
{var val=t[i];if(fun.call(thisp,val,i,t))
res.push(val);}}
return res;};}
if(!Array.prototype.indexOf)
{Array.prototype.indexOf=function(elt)
{var len=this.length>>>0;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0)
from+=len;for(;from<len;from++)
{if(from in this&&this[from]===elt)
return from;}
return-1;};}
function findNextTabStop(el,dir){var universe=document.querySelectorAll('#js__countries-select a');var list=Array.prototype.filter.call(universe,function(item){return item.tabIndex>="-1"});var index=list.indexOf(el);if(dir=="next"){return list[index+1]||list[0];}else{return list[index-1]||list[0];}}
document.onkeydown=function(event){event=event||window.event;if(typeof event.srcElement=='undefined'){var classes=event.originalTarget;}else{var classes=event.srcElement;}
if(event.keyCode==40||event.which==40){event.preventDefault?event.preventDefault():(event.returnValue=false);var nextEl=findNextTabStop(classes,"next");nextEl.focus();}
else if(event.keyCode==38||event.which==38){event.preventDefault?event.preventDefault():(event.returnValue=false);var nextEl=findNextTabStop(classes,"prev");nextEl.focus();}
var isEscape=false;if("key"in event){isEscape=event.key=="Escape";}else{isEscape=event.keyCode==27;}
if(isEscape){document.getElementById("js__countries-select").className="f32 hide";}
var targetEL=event.target;if((event.keyCode==13||event.which==13)&&hasClass(targetEL,"flag")){if(document.getElementById("js__countries-select").className=="f32 hide"){var focusedElement=document.getElementById("js__countries-select").getElementsByTagName('a')[0];focusedElement.focus();event=event||window.event;document.getElementById("js__countries-select").className="f32";}else{if(!(hasClass(document.getElementById("js__countries-select"),"hide"))){event.preventDefault?event.preventDefault():(event.returnValue=false);document.getElementById("js__mobile-countries").focus();document.getElementById("js__countries-select").className="f32 hide"}}
var keycode1=(event.keyCode?event.keyCode:event.which);var targetedElement=event.target;if(targetedElement.tagName==='A'){var firstchildnew=document.getElementById('selectOneOfTheOptions').getElementsByTagName('a')[0];var true1=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a");if(true1){var targetedElement=event.target;var like=targetedElement;var li2=document.createElement('a');li2.setAttribute('href','#');true1.innerHTML=li2;var toremove=document.getElementById('selectOneOfTheOptions').getElementsByTagName("a")[0];var toremoveinner=toremove;var clon3=like.cloneNode(true);var res=clon3.innerHTML.split("+");clon3.innerHTML='+'+res[1];document.getElementById("selectOneOfTheOptions").appendChild(clon3);firstchildnew.remove();}}}
e=event||document.event;if(typeof e=='undefined')e=document.event;if((e.keyCode>=65&&e.keyCode<=130)||(e.which>=65&&e.which<=130)){var keycode1=(e.keyCode?e.keyCode:e.which);var string1=String.fromCharCode(keycode1);var searchon1=document.getElementById('js__countries-select').getElementsByTagName('a');for(var j=0;j<searchon1.length;j++){var a=searchon1[j];var countries_text=searchon1[j].innerHTML;var chare=countries_text.charAt(0);var lowercase=chare.toLowerCase();var lowString1=string1.toLowerCase();if(lowString1==lowercase){searchon1[j].focus();return true;}}}};}
if(document.getElementById('check-if-exist')){setTimeout(function(){document.getElementById('hidden-message').style.visibility="visible";document.getElementById('hidden-message').style.display="block";},30000);}
var submit,passPin=document.getElementsByClassName("type-pass-pin")[0];if(passPin){passPin.addEventListener('keyup',function(){var children=this.form.children;for(var i=0;i<children.length;i++){if(children[i].className=="OK-btn"){submit=children[i];break;}}
submit.disabled=(this.value?false:true);});}
var pinForm=document.getElementsByClassName('js__pinCode')[0];if(pinForm){pinForm.addEventListener('submit',function(){var passPin=document.getElementsByClassName('type-pass-pin')[0];var pinValue=passPin.value;var numeric=isNumeric(pinValue);if(!numeric||pinValue==''||pinValue=="Type the 6 diget PIN  Code"){var errorMsg=this.querySelector('.error-msg')
errorMsg.innerHTML="Please fill this field with numbers";errorMsg.className=errorMsg.className.replace(/\bhidden\b/,'');return false;}});}}
function isNumeric(n){return!isNaN(parseFloat(n))&&isFinite(n);}
if(!(typeof jQuery=='undefined')){(function($){var selectElement=$(".scrollableList").siblings("select");$(".scrollableList").siblings().each(function(){if($(this).hasClass("sbHolder")){selectElement.selectbox("detach");}else if($(this).hasClass("bootstrap-select")){$(this).hide();}});selectElement.hide();})(jQuery);jQuery(document).ready(function(){jQuery('.pb-collapse').click(function(){jQuery(".notAuth-msg-container").toggleClass('collapsed');jQuery(this).find('img').toggle();});});}
function tfaOptionVisible(event){event.preventDefault()
if(document.getElementById('tfa-options')){if(document.getElementById('tfa-options').style.display=='none'){document.getElementById('tfa-options').style.display='block';}
else{document.getElementById('tfa-options').style.display='none';}}}
function tfaResetAuthentication(){if(document.getElementById('reset-verification-warning').style.display=='none'){document.getElementById('reset-verification-warning').style.display='block';document.getElementsByClassName('reset-verification-option')[0].style.display='none';}
var redirectUri=document.getElementsByName('redirectUri')[0].value;document.getElementsByName('redirectUri')[0].value=encodeURI('/action/resetTfaMethod?redirectUri='+redirectUri);};