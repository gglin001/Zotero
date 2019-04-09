!function(c){var b=function(e,d){this.options=d;
this.$element=c(e).delegate('[data-dismiss="modal"]',"click.dismiss.modal",c.proxy(this.hide,this));
this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)
};
b.prototype={constructor:b,toggle:function(){return this[!this.isShown?"show":"hide"]()
},show:function(){var d=this,f=c.Event("show");
this.$element.trigger(f);
if(this.isShown||f.isDefaultPrevented()){return
}this.isShown=true;
this.escape();
this.backdrop(function(){var e=c.support.transition&&d.$element.hasClass("fade");
if(!d.$element.parent().length){d.$element.appendTo(document.body)
}d.$element.show();
if(e){d.$element[0].offsetWidth
}d.$element.addClass("in").attr("aria-hidden",false);
d.enforceFocus();
e?d.$element.one(c.support.transition.end,function(){d.$element.focus().trigger("shown")
}):d.$element.focus().trigger("shown")
})
},hide:function(f){f&&f.preventDefault();
var d=this;
f=c.Event("hide");
this.$element.trigger(f);
if(!this.isShown||f.isDefaultPrevented()){return
}this.isShown=false;
this.escape();
c(document).off("focusin.modal");
this.$element.removeClass("in").attr("aria-hidden",true);
c.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()
},enforceFocus:function(){var d=this;
c(document).on("focusin.modal",function(f){if(d.$element[0]!==f.target&&!d.$element.has(f.target).length){d.$element.focus()
}})
},escape:function(){var d=this;
if(this.isShown&&this.options.keyboard){this.$element.on("keyup.dismiss.modal",function(f){f.which==27&&d.hide()
})
}else{if(!this.isShown){this.$element.off("keyup.dismiss.modal")
}}},hideWithTransition:function(){var d=this,e=setTimeout(function(){d.$element.off(c.support.transition.end);
d.hideModal()
},500);
this.$element.one(c.support.transition.end,function(){clearTimeout(e);
d.hideModal()
})
},hideModal:function(){var d=this;
this.$element.hide();
this.backdrop(function(){d.removeBackdrop();
d.$element.trigger("hidden")
})
},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove();
this.$backdrop=null
},backdrop:function(g){var f=this,e=this.$element.hasClass("fade")?"fade":"";
if(this.isShown&&this.options.backdrop){var d=c.support.transition&&e;
this.$backdrop=c('<div class="modal-backdrop '+e+'" />').appendTo(document.body);
this.$backdrop.click(this.options.backdrop=="static"?c.proxy(this.$element[0].focus,this.$element[0]):c.proxy(this.hide,this));
if(d){this.$backdrop[0].offsetWidth
}this.$backdrop.addClass("in");
if(!g){return
}d?this.$backdrop.one(c.support.transition.end,g):g()
}else{if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");
c.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(c.support.transition.end,g):g()
}else{if(g){g()
}}}}};
var a=c.fn.modal;
c.fn.modal=function(d){return this.each(function(){var g=c(this),f=g.data("modal"),e=c.extend({},c.fn.modal.defaults,g.data(),typeof d=="object"&&d);
if(!f){g.data("modal",(f=new b(this,e)))
}if(typeof d=="string"){f[d]()
}else{if(e.show){f.show()
}}})
};
c.fn.modal.defaults={backdrop:true,keyboard:true,show:true};
c.fn.modal.Constructor=b;
c.fn.modal.noConflict=function(){c.fn.modal=a;
return this
};
c(document).on("click.modal.data-api",'[data-toggle="modal"]',function(i){var h=c(this),f=h.attr("href"),d=c(h.attr("data-target")||(f&&f.replace(/.*(?=#[^\s]+$)/,""))),g=d.data("modal")?"toggle":c.extend({remote:!/#/.test(f)&&f},d.data(),h.data());
i.preventDefault();
d.modal(g).one("hide",function(){h.focus()
})
})
}(window.jQuery);
!function(c){var a=function(f,e){this.init(f,e)
};
a.prototype={constructor:a,init:function(f,e){this.$element=c(f);
this.options=c.extend({},c.fn.modalmanager.defaults,this.$element.data(),typeof e=="object"&&e);
this.stack=[];
this.backdropCount=0;
if(this.options.resize){var h,g=this;
c(window).on("resize.modal",function(){h&&clearTimeout(h);
h=setTimeout(function(){for(var j=0;
j<g.stack.length;
j++){g.stack[j].isShown&&g.stack[j].layout()
}},10)
})
}},createModal:function(f,e){c(f).modal(c.extend({manager:this},e))
},appendModal:function(f){this.stack.push(f);
var e=this;
f.$element.on("show.modalmanager",b(function(h){var g=function(){f.isShown=true;
var i=c.support.transition&&f.$element.hasClass("fade");
e.$element.toggleClass("modal-open",e.hasOpenModal()).toggleClass("page-overflow",c(window).height()<e.$element.height());
f.$parent=f.$element.parent();
f.$container=e.createContainer(f);
f.$element.appendTo(f.$container);
e.backdrop(f,function(){f.$element.show();
if(i){f.$element[0].offsetWidth
}f.layout();
f.$element.addClass("in").attr("aria-hidden",false);
var j=function(){f.$element.trigger("shown")
};
i?f.$element.one(c.support.transition.end,j):j()
})
};
f.options.replace?e.replace(g):g()
}));
f.$element.on("hidden.modalmanager",b(function(g){e.backdrop(f);
if(f.$backdrop){c.support.transition&&f.$element.hasClass("fade")?f.$backdrop.one(c.support.transition.end,function(){e.destroyModal(f)
}):e.destroyModal(f)
}else{e.destroyModal(f)
}}));
f.$element.on("destroy.modalmanager",b(function(g){e.removeModal(f)
}))
},destroyModal:function(f){f.destroy();
var e=this.hasOpenModal();
this.$element.toggleClass("modal-open",e);
if(!e){this.$element.removeClass("page-overflow")
}this.removeContainer(f);
this.setFocus()
},hasOpenModal:function(){for(var e=0;
e<this.stack.length;
e++){if(this.stack[e].isShown){return true
}}return false
},setFocus:function(){var f;
for(var e=0;
e<this.stack.length;
e++){if(this.stack[e].isShown){f=this.stack[e]
}}if(!f){return
}f.focus()
},removeModal:function(e){e.$element.off(".modalmanager");
if(e.$backdrop){this.removeBackdrop(e)
}this.stack.splice(this.getIndexOfModal(e),1)
},getModalAt:function(e){return this.stack[e]
},getIndexOfModal:function(f){for(var e=0;
e<this.stack.length;
e++){if(f===this.stack[e]){return e
}}},replace:function(g){var f;
for(var e=0;
e<this.stack.length;
e++){if(this.stack[e].isShown){f=this.stack[e]
}}if(f){this.$backdropHandle=f.$backdrop;
f.$backdrop=null;
g&&f.$element.one("hidden",b(c.proxy(g,this)));
f.hide()
}else{if(g){g()
}}},removeBackdrop:function(e){e.$backdrop.remove();
e.$backdrop=null
},createBackdrop:function(f){var e;
if(!this.$backdropHandle){e=c('<div class="modal-backdrop '+f+'" />').appendTo(this.$element)
}else{e=this.$backdropHandle;
e.off(".modalmanager");
this.$backdropHandle=null;
this.isLoading&&this.removeSpinner()
}return e
},removeContainer:function(e){e.$container.remove();
e.$container=null
},createContainer:function(e){var f;
f=c('<div class="modal-scrollable">').css("z-index",d("modal",e?this.getIndexOfModal(e):this.stack.length)).appendTo(this.$element);
if(e&&e.options.backdrop!="static"){f.on("click.modal",b(function(g){e.hide()
}))
}else{if(e){f.on("click.modal",b(function(g){e.attention()
}))
}}return f
},backdrop:function(h,j){var f=h.$element.hasClass("fade")?"fade":"",i=h.options.backdrop&&this.backdropCount<this.options.backdropLimit;
if(h.isShown&&i){var e=c.support.transition&&f&&!this.$backdropHandle;
h.$backdrop=this.createBackdrop(f);
h.$backdrop.css("z-index",d("backdrop",this.getIndexOfModal(h)));
if(e){h.$backdrop[0].offsetWidth
}h.$backdrop.addClass("in");
this.backdropCount+=1;
e?h.$backdrop.one(c.support.transition.end,j):j()
}else{if(!h.isShown&&h.$backdrop){h.$backdrop.removeClass("in");
this.backdropCount-=1;
var g=this;
c.support.transition&&h.$element.hasClass("fade")?h.$backdrop.one(c.support.transition.end,function(){g.removeBackdrop(h)
}):g.removeBackdrop(h)
}else{if(j){j()
}}}},removeSpinner:function(){this.$spinner&&this.$spinner.remove();
this.$spinner=null;
this.isLoading=false
},removeLoading:function(){this.$backdropHandle&&this.$backdropHandle.remove();
this.$backdropHandle=null;
this.removeSpinner()
},loading:function(g){g=g||function(){};
this.$element.toggleClass("modal-open",!this.isLoading||this.hasOpenModal()).toggleClass("page-overflow",c(window).height()<this.$element.height());
if(!this.isLoading){this.$backdropHandle=this.createBackdrop("fade");
this.$backdropHandle[0].offsetWidth;
this.$backdropHandle.css("z-index",d("backdrop",this.stack.length)).addClass("in");
var f=c(this.options.spinner).css("z-index",d("modal",this.stack.length)).appendTo(this.$element).addClass("in");
this.$spinner=c(this.createContainer()).append(f).on("click.modalmanager",c.proxy(this.loading,this));
this.isLoading=true;
c.support.transition?this.$backdropHandle.one(c.support.transition.end,g):g()
}else{if(this.isLoading&&this.$backdropHandle){this.$backdropHandle.removeClass("in");
var e=this;
c.support.transition?this.$backdropHandle.one(c.support.transition.end,function(){e.removeLoading()
}):e.removeLoading()
}else{if(g){g(this.isLoading)
}}}}};
var d=(function(){var f,e={};
return function(g,j){if(typeof f==="undefined"){var i=c('<div class="modal hide" />').appendTo("body"),h=c('<div class="modal-backdrop hide" />').appendTo("body");
e.modal=+i.css("z-index");
e.backdrop=+h.css("z-index");
f=e.modal-e.backdrop;
i.remove();
h.remove();
h=i=null
}return e[g]+(f*j)
}
}());
function b(e){return function(f){if(this===f.target){return e.apply(this,arguments)
}}
}c.fn.modalmanager=function(f,e){return this.each(function(){var h=c(this),g=h.data("modalmanager");
if(!g){h.data("modalmanager",(g=new a(this,f)))
}if(typeof f==="string"){g[f].apply(g,[].concat(e))
}})
};
c.fn.modalmanager.defaults={backdropLimit:999,resize:true,spinner:'<div class="loading-spinner fade" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>'};
c.fn.modalmanager.Constructor=a
}(jQuery);
!function(b){var a=function(d,c){this.init(d,c)
};
a.prototype={constructor:a,init:function(e,c){this.options=c;
this.$element=b(e).delegate('[data-dismiss="modal"]',"click.dismiss.modal",b.proxy(this.hide,this));
this.options.remote&&this.$element.find(".modal-body").load(this.options.remote);
var d=typeof this.options.manager==="function"?this.options.manager.call(this):this.options.manager;
d=d.appendModal?d:b(d).modalmanager().data("modalmanager");
d.appendModal(this)
},toggle:function(){return this[!this.isShown?"show":"hide"]()
},show:function(){var c=b.Event("show");
if(this.isShown){return
}this.$element.trigger(c);
if(c.isDefaultPrevented()){return
}this.escape();
this.tab();
this.options.loading&&this.loading()
},hide:function(c){c&&c.preventDefault();
c=b.Event("hide");
this.$element.trigger(c);
if(!this.isShown||c.isDefaultPrevented()){return(this.isShown=false)
}this.isShown=false;
this.escape();
this.tab();
this.isLoading&&this.loading();
b(document).off("focusin.modal");
this.$element.removeClass("in").removeClass("animated").removeClass(this.options.attentionAnimation).removeClass("modal-overflow").attr("aria-hidden",true);
b.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()
},layout:function(){var f=this.options.height?"height":"max-height",d=this.options.height||this.options.maxHeight;
if(this.options.width){this.$element.css("width",this.options.width);
var c=this;
this.$element.css("margin-left",function(){if(/%/ig.test(c.options.width)){return -(parseInt(c.options.width)/2)+"%"
}else{return -(b(this).width()/2)+"px"
}})
}else{this.$element.css("width","");
this.$element.css("margin-left","")
}this.$element.find(".modal-body").css("overflow","").css(f,"");
if(d){this.$element.find(".modal-body").css("overflow","auto").css(f,d)
}var e=b(window).height()-10<this.$element.height();
if(e||this.options.modalOverflow){this.$element.css("margin-top",0).addClass("modal-overflow")
}else{this.$element.css("margin-top",0-this.$element.height()/2).removeClass("modal-overflow")
}},tab:function(){var c=this;
if(this.isShown&&this.options.consumeTab){this.$element.on("keydown.tabindex.modal","[data-tabindex]",function(g){if(g.keyCode&&g.keyCode==9){var d=b(this),f=b(this);
c.$element.find("[data-tabindex]:enabled:not([readonly])").each(function(h){if(!h.shiftKey){d=d.data("tabindex")<b(this).data("tabindex")?d=b(this):f=b(this)
}else{d=d.data("tabindex")>b(this).data("tabindex")?d=b(this):f=b(this)
}});
d[0]!==b(this)[0]?d.focus():f.focus();
g.preventDefault()
}})
}else{if(!this.isShown){this.$element.off("keydown.tabindex.modal")
}}},escape:function(){var c=this;
if(this.isShown&&this.options.keyboard){if(!this.$element.attr("tabindex")){this.$element.attr("tabindex",-1)
}this.$element.on("keyup.dismiss.modal",function(d){d.which==27&&c.hide()
})
}else{if(!this.isShown){this.$element.off("keyup.dismiss.modal")
}}},hideWithTransition:function(){var c=this,d=setTimeout(function(){c.$element.off(b.support.transition.end);
c.hideModal()
},500);
this.$element.one(b.support.transition.end,function(){clearTimeout(d);
c.hideModal()
})
},hideModal:function(){var d=this.options.height?"height":"max-height";
var c=this.options.height||this.options.maxHeight;
if(c){this.$element.find(".modal-body").css("overflow","").css(d,"")
}this.$element.hide().trigger("hidden")
},removeLoading:function(){this.$loading.remove();
this.$loading=null;
this.isLoading=false
},loading:function(f){f=f||function(){};
var d=this.$element.hasClass("fade")?"fade":"";
if(!this.isLoading){var c=b.support.transition&&d;
this.$loading=b('<div class="loading-mask '+d+'">').append(this.options.spinner).appendTo(this.$element);
if(c){this.$loading[0].offsetWidth
}this.$loading.addClass("in");
this.isLoading=true;
c?this.$loading.one(b.support.transition.end,f):f()
}else{if(this.isLoading&&this.$loading){this.$loading.removeClass("in");
var e=this;
b.support.transition&&this.$element.hasClass("fade")?this.$loading.one(b.support.transition.end,function(){e.removeLoading()
}):e.removeLoading()
}else{if(f){f(this.isLoading)
}}}},focus:function(){var c=this.$element.find(this.options.focusOn);
c=c.length?c:this.$element;
c.focus()
},attention:function(){if(this.options.attentionAnimation){this.$element.removeClass("animated").removeClass(this.options.attentionAnimation);
var c=this;
setTimeout(function(){c.$element.addClass("animated").addClass(c.options.attentionAnimation)
},0)
}this.focus()
},destroy:function(){var c=b.Event("destroy");
this.$element.trigger(c);
if(c.isDefaultPrevented()){return
}this.teardown()
},teardown:function(){if(!this.$parent.length){this.$element.remove();
this.$element=null;
return
}if(this.$parent!==this.$element.parent()){this.$element.appendTo(this.$parent)
}this.$element.off(".modal");
this.$element.removeData("modal");
this.$element.removeClass("in").attr("aria-hidden",true)
}};
b.fn.modal=function(d,c){return this.each(function(){var g=b(this),f=g.data("modal"),e=b.extend({},b.fn.modal.defaults,g.data(),typeof d=="object"&&d);
if(!f){g.data("modal",(f=new a(this,e)))
}if(typeof d=="string"){f[d].apply(f,[].concat(c))
}else{if(e.show){f.show()
}}})
};
b.fn.modal.defaults={keyboard:true,backdrop:true,loading:false,show:true,width:null,height:null,maxHeight:null,modalOverflow:false,consumeTab:true,focusOn:null,replace:false,resize:false,attentionAnimation:"shake",manager:"body",spinner:'<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>'};
b.fn.modal.Constructor=a;
b(function(){b(document).off("click.modal").on("click.modal.data-api",'[data-toggle="modal"]',function(h){var g=b(this),d="#"+g.attr("href"),c=b(g.attr("data-target")||(d&&d.replace(/.*(?=#[^\s]+$)/,""))),f=c.data("modal")?"toggle":b.extend({remote:!/#/.test(d)&&d},c.data(),g.data());
h.preventDefault();
c.modal(f).one("hide",function(){g.focus()
})
})
})
}(window.jQuery);
jQuery.fn.handleModal=function(a,b,c){jQuery("#"+b).load(c,function(){jQuery("#"+b+" .brightcove_player").each(function(){var e=jQuery(this);
var f;
function g(){var h=setInterval(function(){if(e.find("video").length){clearInterval(h);
f=e.find("video").attr("id");
jQuery("#"+a).on("show",function(){videojs(f).ready(function(){this.play()
})
});
jQuery("#"+a).on("hide",function(){videojs(f).ready(function(){this.pause()
})
})
}},250)
}g()
})
});
jQuery("#"+a).on("show",function(){var e=c.split("/").pop();
e=e.replace(".modal.html","");
window.location.hash="#m="+e
});
jQuery("#"+a).on("hide",function(){window.location.hash="#close"
});
var d=function(){var h,j,f,i,e,g;
h=window.location.hash;
j=h.indexOf("#m=");
if(j>-1){f=h.substr(j);
e=f.substr(3);
g=jQuery("div.modal[data-filename='"+e+"']").last();
i=g.attr("id");
if(i==a){jQuery("#"+i).modal("show")
}}else{if(jQuery(".modal.in").length>0){g=jQuery(".modal.in");
i=g.attr("id");
if(i==a){jQuery("#"+i).modal("hide")
}}}};
if(window.location.hash){d()
}jQuery(window).on("hashchange",function(){d()
});
jQuery("#"+a).on("hidden",function(){history.go(-2)
})
};