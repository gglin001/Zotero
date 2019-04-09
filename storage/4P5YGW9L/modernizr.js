window.Modernizr=function(ar,aq,ap){function aa(b){ai.cssText=b
}function Y(d,c){return aa(ae.join(d+";")+(c||""))
}function W(d,c){return typeof d===c
}function U(d,c){return !!~(""+d).indexOf(c)
}function S(f,c){for(var h in f){var g=f[h];
if(!U(g,"-")&&ai[g]!==ap){return c=="pfx"?g:!0
}}return !1
}function Q(g,c,j){for(var i in g){var h=c[g[i]];
if(h!==ap){return j===!1?g[i]:W(h,"function")?h.bind(j||c):h
}}return !1
}function O(g,f,j){var i=g.charAt(0).toUpperCase()+g.slice(1),h=(g+" "+ac.join(i+" ")+i).split(" ");
return W(f,"string")||W(f,"undefined")?S(h,f):(h=(g+" "+Z.join(i+" ")+i).split(" "),Q(h,f,j))
}var ao="2.6.2",an={},am=!0,al=aq.documentElement,ak="modernizr",aj=aq.createElement(ak),ai=aj.style,ah,ag=":)",af={}.toString,ae=" -webkit- -moz- -o- -ms- ".split(" "),ad="Webkit Moz O ms",ac=ad.split(" "),Z=ad.toLowerCase().split(" "),X={svg:"http://www.w3.org/2000/svg"},V={},T={},R={},P=[],N=P.slice,M,K=function(v,u,t,s){var r,q,p,o,h=aq.createElement("div"),g=aq.body,b=g||aq.createElement("body");
if(parseInt(t,10)){while(t--){p=aq.createElement("div"),p.id=s?s[t]:ak+(t+1),h.appendChild(p)
}}return r=["&#173;",'<style id="s',ak,'">',v,"</style>"].join(""),h.id=ak,(g?h:b).innerHTML+=r,b.appendChild(h),g||(b.style.background="",b.style.overflow="hidden",o=al.style.overflow,al.style.overflow="hidden",al.appendChild(b)),q=u(h,v),g?h.parentNode.removeChild(h):(b.parentNode.removeChild(b),al.style.overflow=o),!!q
},J={}.hasOwnProperty,ab;
!W(J,"undefined")&&!W(J.call,"undefined")?ab=function(d,c){return J.call(d,c)
}:ab=function(d,c){return c in d&&W(d.constructor.prototype[c],"undefined")
},Function.prototype.bind||(Function.prototype.bind=function(a){var h=this;
if(typeof h!="function"){throw new TypeError
}var g=N.call(arguments,1),f=function(){if(this instanceof f){var b=function(){};
b.prototype=h.prototype;
var d=new b,c=h.apply(d,g.concat(N.call(arguments)));
return Object(c)===c?c:d
}return h.apply(a,g.concat(N.call(arguments)))
};
return f
}),V.touch=function(){var a;
return"ontouchstart" in ar||ar.DocumentTouch&&aq instanceof DocumentTouch?a=!0:K(["@media (",ae.join("touch-enabled),("),ak,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(b){a=b.offsetTop===9
}),a
},V.rgba=function(){return aa("background-color:rgba(150,255,150,.5)"),U(ai.backgroundColor,"rgba")
},V.multiplebgs=function(){return aa("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(ai.background)
},V.backgroundsize=function(){return O("backgroundSize")
},V.borderimage=function(){return O("borderImage")
},V.borderradius=function(){return O("borderRadius")
},V.boxshadow=function(){return O("boxShadow")
},V.textshadow=function(){return aq.createElement("div").style.textShadow===""
},V.opacity=function(){return Y("opacity:.55"),/^0.55$/.test(ai.opacity)
},V.cssanimations=function(){return O("animationName")
},V.csscolumns=function(){return O("columnCount")
},V.cssgradients=function(){var e="background-image:",d="gradient(linear,left top,right bottom,from(#9f9),to(white));",f="linear-gradient(left top,#9f9, white);";
return aa((e+"-webkit- ".split(" ").join(d+e)+ae.join(f+e)).slice(0,-e.length)),U(ai.backgroundImage,"gradient")
},V.cssreflections=function(){return O("boxReflect")
},V.csstransforms=function(){return !!O("transform")
},V.csstransforms3d=function(){var b=!!O("perspective");
return b&&"webkitPerspective" in al.style&&K("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(a,d){b=a.offsetLeft===9&&a.offsetHeight===3
}),b
},V.csstransitions=function(){return O("transition")
},V.fontface=function(){var b;
return K('@font-face {font-family:"font";src:url("https://")}',function(k,j){var i=aq.getElementById("smodernizr"),h=i.sheet||i.styleSheet,a=h?h.cssRules&&h.cssRules[0]?h.cssRules[0].cssText:h.cssText||"":"";
b=/src/i.test(a)&&a.indexOf(j.split(" ")[0])===0
}),b
},V.generatedcontent=function(){var b;
return K(["#",ak,"{font:0/0 a}#",ak,':after{content:"',ag,'";visibility:hidden;font:3px/1 a}'].join(""),function(a){b=a.offsetHeight>=3
}),b
},V.video=function(){var b=aq.createElement("video"),f=!1;
try{if(f=!!b.canPlayType){f=new Boolean(f),f.ogg=b.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),f.h264=b.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),f.webm=b.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")
}}catch(e){}return f
},V.audio=function(){var b=aq.createElement("audio"),f=!1;
try{if(f=!!b.canPlayType){f=new Boolean(f),f.ogg=b.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),f.mp3=b.canPlayType("audio/mpeg;").replace(/^no$/,""),f.wav=b.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),f.m4a=(b.canPlayType("audio/x-m4a;")||b.canPlayType("audio/aac;")).replace(/^no$/,"")
}}catch(e){}return f
},V.svg=function(){return !!aq.createElementNS&&!!aq.createElementNS(X.svg,"svg").createSVGRect
},V.svgclippaths=function(){return !!aq.createElementNS&&/SVGClipPath/.test(af.call(aq.createElementNS(X.svg,"clipPath")))
};
for(var L in V){ab(V,L)&&(M=L.toLowerCase(),an[M]=V[L](),P.push((an[M]?"":"no-")+M))
}return an.addTest=function(e,c){if(typeof e=="object"){for(var f in e){ab(e,f)&&an.addTest(f,e[f])
}}else{e=e.toLowerCase();
if(an[e]!==ap){return an
}c=typeof c=="function"?c():c,typeof am!="undefined"&&am&&(al.className+=" "+(c?"":"no-")+e),an[e]=c
}return an
},aa(""),aj=ah=null,function(at,I){function z(f,e){var h=f.createElement("p"),g=f.getElementsByTagName("head")[0]||f.documentElement;
return h.innerHTML="x<style>"+e+"</style>",g.insertBefore(h.lastChild,g.firstChild)
}function y(){var b=s.elements;
return typeof b=="string"?b.split(" "):b
}function x(d){var c=B[d[D]];
return c||(c={},C++,d[D]=C,B[C]=c),c
}function w(b,h,e){h||(h=I);
if(A){return h.createElement(b)
}e||(e=x(h));
var d;
return e.cache[b]?d=e.cache[b].cloneNode():F.test(b)?d=(e.cache[b]=e.createElem(b)).cloneNode():d=e.createElem(b),d.canHaveChildren&&!G.test(b)?e.frag.appendChild(d):d
}function v(b,l){b||(b=I);
if(A){return b.createDocumentFragment()
}l=l||x(b);
var k=l.frag.cloneNode(),j=0,i=y(),h=i.length;
for(;
j<h;
j++){k.createElement(i[j])
}return k
}function u(d,c){c.cache||(c.cache={},c.createElem=d.createElement,c.createFrag=d.createDocumentFragment,c.frag=c.createFrag()),d.createElement=function(a){return s.shivMethods?w(a,d,c):c.createElem(a)
},d.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+y().join().replace(/\w+/g,function(b){return c.createElem(b),c.frag.createElement(b),'c("'+b+'")'
})+");return n}")(s,c.frag)
}function t(b){b||(b=I);
var d=x(b);
return s.shivCSS&&!E&&!d.hasCSS&&(d.hasCSS=!!z(b,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),A||u(b,d),b
}var H=at.html5||{},G=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,F=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,E,D="_html5shiv",C=0,B={},A;
(function(){try{var b=I.createElement("a");
b.innerHTML="<xyz></xyz>",E="hidden" in b,A=b.childNodes.length==1||function(){I.createElement("a");
var c=I.createDocumentFragment();
return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"
}()
}catch(d){E=!0,A=!0
}})();
var s={elements:H.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:H.shivCSS!==!1,supportsUnknownElements:A,shivMethods:H.shivMethods!==!1,type:"default",shivDocument:t,createElement:w,createDocumentFragment:v};
at.html5=s,t(I)
}(this,aq),an._version=ao,an._prefixes=ae,an._domPrefixes=Z,an._cssomPrefixes=ac,an.testProp=function(b){return S([b])
},an.testAllProps=O,an.testStyles=K,al.className=al.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(am?" js "+P.join(" "):""),an
}(this,this.document),function(ad,ac,ab){function aa(b){return"[object Function]"==P.call(b)
}function Z(b){return"string"==typeof b
}function Y(){}function X(b){return !b||"loaded"==b||"complete"==b||"uninitialized"==b
}function W(){var b=O.shift();
M=1,b?b.t?R(function(){("c"==b.t?L.injectCss:L.injectJs)(b.s,0,b.a,b.x,b.e,1)
},0):(b(),W()):M=0
}function V(w,v,t,s,q,p,n){function m(a){if(!g&&X(h.readyState)&&(x.r=g=1,!M&&W(),h.onload=h.onreadystatechange=null,a)){"img"!=w&&R(function(){I.removeChild(h)
},50);
for(var c in D[v]){D[v].hasOwnProperty(c)&&D[v][c].onload()
}}}var n=n||L.errorTimeout,h=ac.createElement(w),g=0,b=0,x={t:t,s:v,e:q,a:p,x:n};
1===D[v]&&(b=1,D[v]=[]),"object"==w?h.data=v:(h.src=v,h.type=w),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){m.call(this,b)
},O.splice(s,0,x),"img"!=w&&(b||2===D[v]?(I.insertBefore(h,J?null:Q),R(m,n)):D[v].push(h))
}function U(g,e,j,i,h){return M=0,e=e||"j",Z(g)?V("c"==e?G:H,g,e,this.i++,j,i,h):(O.splice(this.i++,0,g),1==O.length&&W()),this
}function T(){var b=L;
return b.loader={load:U,i:0},b
}var S=ac.documentElement,R=ad.setTimeout,Q=ac.getElementsByTagName("script")[0],P={}.toString,O=[],M=0,K="MozAppearance" in S.style,J=K&&!!ac.createRange().compareNode,I=J?S:Q.parentNode,S=ad.opera&&"[object Opera]"==P.call(ad.opera),S=!!ac.attachEvent&&!S,H=K?"object":S?"script":"img",G=S?"script":H,F=Array.isArray||function(b){return"[object Array]"==P.call(b)
},E=[],D={},C={timeout:function(d,c){return c.length&&(d.timeout=c[0]),d
}},N,L;
L=function(e){function c(i){var i=i.split("!"),h=E.length,q=i.pop(),p=i.length,q={url:q,origUrl:q,prefixes:i},o,l,j;
for(l=0;
l<p;
l++){j=i[l].split("="),(o=C[j.shift()])&&(q=o(q,j))
}for(l=0;
l<h;
l++){q=E[l](q)
}return q
}function n(b,s,r,q,p){var o=c(b),l=o.autoCallback;
o.url.split(".").pop().split("?").shift(),o.bypass||(s&&(s=aa(s)?s:s[b]||s[q]||s[b.split("/").pop().split("?")[0]]),o.instead?o.instead(b,s,r,q,p):(D[o.url]?o.noexec=!0:D[o.url]=1,r.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":ab,o.noexec,o.attrs,o.timeout),(aa(s)||aa(l))&&r.load(function(){T(),s&&s(o.origUrl,p,q),l&&l(o.origUrl,p,q),D[o.url]=2
})))
}function m(w,v){function u(b,h){if(b){if(Z(b)){h||(r=function(){var i=[].slice.call(arguments);
q.apply(this,i),p()
}),n(b,r,v,0,t)
}else{if(Object(b)===b){for(g in o=function(){var a=0,i;
for(i in b){b.hasOwnProperty(i)&&a++
}return a
}(),b){b.hasOwnProperty(g)&&(!h&&!--o&&(aa(r)?r=function(){var i=[].slice.call(arguments);
q.apply(this,i),p()
}:r[g]=function(i){return function(){var a=[].slice.call(arguments);
i&&i.apply(this,a),p()
}
}(q[g])),n(b[g],r,v,g,t))
}}}}else{!h&&p()
}}var t=!!w.test,s=w.load||w.both,r=w.callback||Y,q=r,p=w.complete||Y,o,g;
u(t?w.yep:w.nope,!!s),s&&u(s)
}var k,f,d=this.yepnope.loader;
if(Z(e)){n(e,0,d,0)
}else{if(F(e)){for(k=0;
k<e.length;
k++){f=e[k],Z(f)?n(f,0,d,0):F(f)?L(f):Object(f)===f&&m(f,d)
}}else{Object(e)===e&&m(e,d)
}}},L.addPrefix=function(d,c){C[d]=c
},L.addFilter=function(b){E.push(b)
},L.errorTimeout=10000,null==ac.readyState&&ac.addEventListener&&(ac.readyState="loading",ac.addEventListener("DOMContentLoaded",N=function(){ac.removeEventListener("DOMContentLoaded",N,0),ac.readyState="complete"
},0)),ad.yepnope=T(),ad.yepnope.executeStack=W,ad.yepnope.injectJs=function(r,q,p,n,m,h){var g=ac.createElement("script"),f,b,n=n||L.errorTimeout;
g.src=r;
for(b in p){g.setAttribute(b,p[b])
}q=h?W:q||Y,g.onreadystatechange=g.onload=function(){!f&&X(g.readyState)&&(f=1,q(),g.onload=g.onreadystatechange=null)
},R(function(){f||(f=1,q(1))
},n),m?g.onload():Q.parentNode.insertBefore(g,Q)
},ad.yepnope.injectCss=function(b,n,m,l,k,h){var l=ac.createElement("link"),f,n=h?W:n||Y;
l.href=b,l.rel="stylesheet",l.type="text/css";
for(f in m){l.setAttribute(f,m[f])
}k||(Q.parentNode.insertBefore(l,Q),R(n,0))
}
}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))
},Modernizr.addTest("ie8compat",function(){return !window.addEventListener&&document.documentMode&&document.documentMode===7
});