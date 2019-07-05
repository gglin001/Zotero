!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(s){var c,l,u=!(s.detectSwipe={version:"2.1.2",enabled:"ontouchstart"in document.documentElement,preventDefault:!0,threshold:20});function f(){this.removeEventListener("touchmove",t),this.removeEventListener("touchend",f),u=!1}function t(e){if(s.detectSwipe.preventDefault&&e.preventDefault(),u){var t,n=e.touches[0].pageX,i=e.touches[0].pageY,r=c-n,a=l-i,o=window.devicePixelRatio||1;Math.abs(r)*o>=s.detectSwipe.threshold?t=0<r?"left":"right":Math.abs(a)*o>=s.detectSwipe.threshold&&(t=0<a?"up":"down"),t&&(f.call(this),s(this).trigger("swipe",t).trigger("swipe"+t))}}function e(e){1==e.touches.length&&(c=e.touches[0].pageX,l=e.touches[0].pageY,u=!0,this.addEventListener("touchmove",t,!1),this.addEventListener("touchend",f,!1))}s.event.special.swipe={setup:function(){this.addEventListener&&this.addEventListener("touchstart",e,!1)}},s.each(["left","up","down","right"],function(){s.event.special["swipe"+this]={setup:function(){s(this).on("swipe",s.noop)}}})}),function(u){"use strict";if(void 0!==u)if(u.fn.jquery.match(/-ajax/))"console"in window&&window.console.info("Featherlight needs regular jQuery, not the slim version.");else{var i=[],r=function(t){return i=u.grep(i,function(e){return e!==t&&0<e.$instance.closest("body").length})},a={allow:1,allowfullscreen:1,frameborder:1,height:1,longdesc:1,marginheight:1,marginwidth:1,mozallowfullscreen:1,name:1,referrerpolicy:1,sandbox:1,scrolling:1,src:1,srcdoc:1,style:1,webkitallowfullscreen:1,width:1},n={keyup:"onKeyUp",resize:"onResize"},o=function(e){u.each(c.opened().reverse(),function(){if(!e.isDefaultPrevented()&&!1===this[n[e.type]](e))return e.preventDefault(),e.stopPropagation(),!1})},s=function(e){if(e!==c._globalHandlerInstalled){c._globalHandlerInstalled=e;var t=u.map(n,function(e,t){return t+"."+c.prototype.namespace}).join(" ");u(window)[e?"on":"off"](t,o)}};c.prototype={constructor:c,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:u.noop,beforeContent:u.noop,beforeClose:u.noop,afterOpen:u.noop,afterContent:u.noop,afterClose:u.noop,onKeyUp:u.noop,onResize:u.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(e,t){"object"!=typeof e||e instanceof u!=!1||t||(t=e,e=void 0);var n=u.extend(this,t,{target:e}),i=n.resetCss?n.namespace+"-reset":n.namespace,r=u(n.background||['<div class="'+i+"-loading "+i+'">','<div class="'+i+'-content">','<button class="'+i+"-close-icon "+n.namespace+'-close" aria-label="Close">',n.closeIcon,"</button>",'<div class="'+n.namespace+'-inner">'+n.loading+"</div>","</div>","</div>"].join("")),a="."+n.namespace+"-close"+(n.otherClose?","+n.otherClose:"");return n.$instance=r.clone().addClass(n.variant),n.$instance.on(n.closeTrigger+"."+n.namespace,function(e){if(!e.isDefaultPrevented()){var t=u(e.target);("background"===n.closeOnClick&&t.is("."+n.namespace)||"anywhere"===n.closeOnClick||t.closest(a).length)&&(n.close(e),e.preventDefault())}}),this},getContent:function(){if(!1!==this.persist&&this.$content)return this.$content;var t=this,e=this.constructor.contentFilters,n=function(e){return t.$currentTarget&&t.$currentTarget.attr(e)},i=n(t.targetAttr),r=t.target||i||"",a=e[t.type];if(!a&&r in e&&(a=e[r],r=t.target&&i),r=r||n("href")||"",!a)for(var o in e)t[o]&&(a=e[o],r=t[o]);if(!a){var s=r;if(r=null,u.each(t.contentFilters,function(){return(a=e[this]).test&&(r=a.test(s)),!r&&a.regex&&s.match&&s.match(a.regex)&&(r=s),!r}),!r)return"console"in window&&window.console.error("Featherlight: no content filter found "+(s?' for "'+s+'"':" (no target specified)")),!1}return a.process.call(t,r)},setContent:function(e){return this.$instance.removeClass(this.namespace+"-loading"),this.$instance.toggleClass(this.namespace+"-iframe",e.is("iframe")),this.$instance.find("."+this.namespace+"-inner").not(e).slice(1).remove().end().replaceWith(u.contains(this.$instance[0],e[0])?"":e),this.$content=e.addClass(this.namespace+"-inner"),this},open:function(t){var n=this;if(n.$instance.hide().appendTo(n.root),!(t&&t.isDefaultPrevented()||!1===n.beforeOpen(t))){t&&t.preventDefault();var e=n.getContent();if(e)return i.push(n),s(!0),n.$instance.fadeIn(n.openSpeed),n.beforeContent(t),u.when(e).always(function(e){n.setContent(e),n.afterContent(t)}).then(n.$instance.promise()).done(function(){n.afterOpen(t)})}return n.$instance.detach(),u.Deferred().reject().promise()},close:function(e){var t=this,n=u.Deferred();return!1===t.beforeClose(e)?n.reject():(0===r(t).length&&s(!1),t.$instance.fadeOut(t.closeSpeed,function(){t.$instance.detach(),t.afterClose(e),n.resolve()})),n.promise()},resize:function(e,t){if(e&&t){this.$content.css("width","").css("height","");var n=Math.max(e/(this.$content.parent().width()-1),t/(this.$content.parent().height()-1));1<n&&(n=t/Math.floor(t/n),this.$content.css("width",e/n+"px").css("height",t/n+"px"))}},chainCallbacks:function(e){for(var t in e)this[t]=u.proxy(e[t],this,u.proxy(this[t],this))}},u.extend(c,{id:0,autoBind:"[data-featherlight]",defaults:c.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(e){return e instanceof u&&e},process:function(e){return!1!==this.persist?u(e):u(e).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,process:function(e){var t=u.Deferred(),n=new Image,i=u('<img src="'+e+'" alt="" class="'+this.namespace+'-image" />');return n.onload=function(){i.naturalWidth=n.width,i.naturalHeight=n.height,t.resolve(i)},n.onerror=function(){t.reject(i)},n.src=e,t.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(e){return u(e)}},ajax:{regex:/./,process:function(e){var n=u.Deferred(),i=u("<div></div>").load(e,function(e,t){"error"!==t&&n.resolve(i.contents()),n.fail()});return n.promise()}},iframe:{process:function(e){var t=new u.Deferred,n=u("<iframe/>"),i=function(e,t){var n={},i=new RegExp("^"+t+"([A-Z])(.*)");for(var r in e){var a=r.match(i);a&&(n[(a[1]+a[2].replace(/([A-Z])/g,"-$1")).toLowerCase()]=e[r])}return n}(this,"iframe"),r=function(e,t){var n={};for(var i in e)i in t&&(n[i]=e[i],delete e[i]);return n}(i,a);return n.hide().attr("src",e).attr(r).css(i).on("load",function(){t.resolve(n.show())}).appendTo(this.$instance.find("."+this.namespace+"-content")),t.promise()}},text:{process:function(e){return u("<div>",{text:e})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(e,t){var i=this,r=new RegExp("^data-"+t+"-(.*)"),a={};return e&&e.attributes&&u.each(e.attributes,function(){var e=this.name.match(r);if(e){var t=this.value,n=u.camelCase(e[1]);if(0<=u.inArray(n,i.functionAttributes))t=new Function(t);else try{t=JSON.parse(t)}catch(e){}a[n]=t}}),a},extend:function(e,t){var n=function(){this.constructor=e};return n.prototype=this.prototype,e.prototype=new n,e.__super__=this.prototype,u.extend(e,this,t),e.defaults=e.prototype,e},attach:function(r,a,o){var s=this;"object"!=typeof a||a instanceof u!=!1||o||(o=a,a=void 0);var c,e=(o=u.extend({},o)).namespace||s.defaults.namespace,l=u.extend({},s.defaults,s.readElementConfig(r[0],e),o),t=function(e){var t=u(e.currentTarget),n=u.extend({$source:r,$currentTarget:t},s.readElementConfig(r[0],l.namespace),s.readElementConfig(e.currentTarget,l.namespace),o),i=c||t.data("featherlight-persisted")||new s(a,n);"shared"===i.persist?c=i:!1!==i.persist&&t.data("featherlight-persisted",i),n.$currentTarget.blur&&n.$currentTarget.blur(),i.open(e)};return r.on(l.openTrigger+"."+l.namespace,l.filter,t),{filter:l.filter,handler:t}},current:function(){var e=this.opened();return e[e.length-1]||null},opened:function(){var t=this;return r(),u.grep(i,function(e){return e instanceof t})},close:function(e){var t=this.current();if(t)return t.close(e)},_onReady:function(){var i=this;if(i.autoBind){var r=u(i.autoBind);r.each(function(){i.attach(u(this))}),u(document).on("click",i.autoBind,function(e){if(!e.isDefaultPrevented()){var t=u(e.currentTarget);if(r.length!==(r=r.add(t)).length){var n=i.attach(t);(!n.filter||0<u(e.target).parentsUntil(t,n.filter).length)&&n.handler(e)}}})}},_callbackChain:{onKeyUp:function(e,t){return 27===t.keyCode?(this.closeOnEsc&&u.featherlight.close(t),!1):e(t)},beforeOpen:function(e,t){return u(document.documentElement).addClass("with-featherlight"),this._previouslyActive=document.activeElement,this._$previouslyTabbable=u("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")),this._$previouslyWithTabIndex=u("[tabindex]").not('[tabindex="-1"]'),this._previousWithTabIndices=this._$previouslyWithTabIndex.map(function(e,t){return u(t).attr("tabindex")}),this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex",-1),document.activeElement.blur&&document.activeElement.blur(),e(t)},afterClose:function(e,t){var n=e(t),i=this;return this._$previouslyTabbable.removeAttr("tabindex"),this._$previouslyWithTabIndex.each(function(e,t){u(t).attr("tabindex",i._previousWithTabIndices[e])}),this._previouslyActive.focus(),0===c.opened().length&&u(document.documentElement).removeClass("with-featherlight"),n},onResize:function(e,t){return this.resize(this.$content.naturalWidth,this.$content.naturalHeight),e(t)},afterContent:function(e,t){var n=e(t);return this.$instance.find("[autofocus]:not([disabled])").focus(),this.onResize(t),n}}}),u.featherlight=c,u.fn.featherlight=function(e,t){return c.attach(this,e,t),this},u(document).ready(function(){c._onReady()})}else"console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery.");function c(e,t){if(!(this instanceof c)){var n=new c(e,t);return n.open(),n}this.id=c.id++,this.setup(e,t),this.chainCallbacks(c._callbackChain)}}(jQuery),function(a){"use strict";var e=function(e){window.console&&window.console.warn&&window.console.warn("FeatherlightGallery: "+e)};if(void 0===a)return e("Too much lightness, Featherlight needs jQuery.");if(!a.featherlight)return e("Load the featherlight plugin before the gallery plugin");var t="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,n=a.event&&a.event.special.swipeleft&&a,i=window.Hammer&&function(e){var t=new window.Hammer.Manager(e[0]);return t.add(new window.Hammer.Swipe),t},r=t&&(n||i);t&&!r&&e("No compatible swipe library detected; one must be included before featherlightGallery for swipe motions to navigate the galleries.");var o={afterClose:function(e,t){var n=this;return n.$instance.off("next."+n.namespace+" previous."+n.namespace),n._swiper&&(n._swiper.off("swipeleft",n._swipeleft).off("swiperight",n._swiperight),n._swiper=null),e(t)},beforeOpen:function(e,t){var n=this;return n.$instance.on("next."+n.namespace+" previous."+n.namespace,function(e){var t="next"===e.type?1:-1;n.navigateTo(n.currentNavigation()+t)}),r&&(n._swiper=r(n.$instance).on("swipeleft",n._swipeleft=function(){n.$instance.trigger("next")}).on("swiperight",n._swiperight=function(){n.$instance.trigger("previous")}),n.$instance.addClass(this.namespace+"-swipe-aware",r)),n.$instance.find("."+n.namespace+"-content").append(n.createNavigation("previous")).append(n.createNavigation("next")),e(t)},beforeContent:function(e,t){var n=this.currentNavigation(),i=this.slides().length;return this.$instance.toggleClass(this.namespace+"-first-slide",0===n).toggleClass(this.namespace+"-last-slide",n===i-1),e(t)},onKeyUp:function(e,t){var n={37:"previous",39:"next"}[t.keyCode];return n?(this.$instance.trigger(n),!1):e(t)}};function s(e,t){if(!(this instanceof s)){var n=new s(a.extend({$source:e,$currentTarget:e.first()},t));return n.open(),n}a.featherlight.apply(this,arguments),this.chainCallbacks(o)}a.featherlight.extend(s,{autoBind:"[data-featherlight-gallery]"}),a.extend(s.prototype,{previousIcon:"&#9664;",nextIcon:"&#9654;",galleryFadeIn:100,galleryFadeOut:300,slides:function(){return this.filter?this.$source.find(this.filter):this.$source},images:function(){return e("images is deprecated, please use slides instead"),this.slides()},currentNavigation:function(){return this.slides().index(this.$currentTarget)},navigateTo:function(e){var t=this,n=t.slides(),i=n.length,r=t.$instance.find("."+t.namespace+"-inner");return e=(e%i+i)%i,t.$currentTarget=n.eq(e),t.beforeContent(),a.when(t.getContent(),r.fadeTo(t.galleryFadeOut,.2)).always(function(e){t.setContent(e),t.afterContent(),e.fadeTo(t.galleryFadeIn,1)})},createNavigation:function(t){var n=this;return a('<span title="'+t+'" class="'+this.namespace+"-"+t+'"><span>'+this[t+"Icon"]+"</span></span>").click(function(e){a(this).trigger(t+"."+n.namespace),e.preventDefault()})}}),a.featherlightGallery=s,a.fn.featherlightGallery=function(e){return s.attach(this,e),this},a(document).ready(function(){s._onReady()})}(jQuery),function(e,i,t){"use strict";var n=i(document.body);function r(e,t){return/(.png|.jpg|.jpeg|.gif|.tiff|.bmp)$/.test(i(t).attr("href").toLowerCase().split("?")[0].split("#")[0])}function a(e,t){var n=i(t).find("a[data-featherlight]");n.attr("data-featherlight")&&n.featherlightGallery({previousIcon:"",nextIcon:""})}function o(){var e;i.featherlight.defaults.closeIcon="",n.find("a[href]").filter(r).attr("data-featherlight","image"),0!==(e=n.find('[class*="gallery"]')).length&&i.each(e,a),n.hasClass("wp-featherlight-captions")&&(i.featherlight.prototype.afterContent=function(){var e=this.$instance,t=function(e){var t=e.parent().find(".wp-caption-text");if(0!==t.length)return t;var n=e.parent().find("figcaption");if(0!==n.length)return n;var i=e.parents(".gallery-item");if(0!==i.length)return i.find(".wp-caption-text");var r=e.parents(".blocks-gallery-item");if(0!==r.length)return r.find("figcaption");var a=e.parents(".tiled-gallery-item");return 0!==a.length?a.find(".tiled-gallery-caption"):""}(this.$currentTarget);e.find(".caption").remove(),0!==t.length&&(i('<div class="caption">').appendTo(e.find(".featherlight-content"))[0].innerHTML=t.html())})}i(document).ready(function(){o()})}(0,jQuery);