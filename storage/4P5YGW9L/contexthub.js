window.ContextHubKernelConfig={debug:false,initializationTimeout:2000,stores:{sas_aem_forms_data:{type:"sas.forms-store",required:true},sas_aem_lastviewed_data:{type:"sas.lastviewed-store",required:true}}};
/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */
(function(b,a){if(typeof module==="object"&&typeof module.exports==="object"){module.exports=b.document?a(b,true):function(c){if(!c.document){throw new Error("jQuery requires a window with a document")
}return a(c)
}
}else{a(b)
}}(typeof window!=="undefined"?window:this,function(a5,av){var aP=[];
var O=aP.slice;
var az=aP.concat;
var w=aP.push;
var bU=aP.indexOf;
var ac={};
var x=ac.toString;
var J=ac.hasOwnProperty;
var Z="".trim;
var C={};
var ai="1.11.0",bI=function(e,i){return new bI.fn.init(e,i)
},D=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,bS=/^-ms-/,aW=/-([\da-z])/gi,N=function(e,i){return i.toUpperCase()
};
bI.fn=bI.prototype={jquery:ai,constructor:bI,selector:"",length:0,toArray:function(){return O.call(this)
},get:function(e){return e!=null?(e<0?this[e+this.length]:this[e]):O.call(this)
},pushStack:function(e){var i=bI.merge(this.constructor(),e);
i.prevObject=this;
i.context=this.context;
return i
},each:function(i,e){return bI.each(this,i,e)
},map:function(e){return this.pushStack(bI.map(this,function(b7,b6){return e.call(b7,b6,b7)
}))
},slice:function(){return this.pushStack(O.apply(this,arguments))
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},eq:function(b7){var e=this.length,b6=+b7+(b7<0?e:0);
return this.pushStack(b6>=0&&b6<e?[this[b6]]:[])
},end:function(){return this.prevObject||this.constructor(null)
},push:w,sort:aP.sort,splice:aP.splice};
bI.extend=bI.fn.extend=function(){var e,cb,b6,b7,ce,cc,ca=arguments[0]||{},b9=1,b8=arguments.length,cd=false;
if(typeof ca==="boolean"){cd=ca;
ca=arguments[b9]||{};
b9++
}if(typeof ca!=="object"&&!bI.isFunction(ca)){ca={}
}if(b9===b8){ca=this;
b9--
}for(;
b9<b8;
b9++){if((ce=arguments[b9])!=null){for(b7 in ce){e=ca[b7];
b6=ce[b7];
if(ca===b6){continue
}if(cd&&b6&&(bI.isPlainObject(b6)||(cb=bI.isArray(b6)))){if(cb){cb=false;
cc=e&&bI.isArray(e)?e:[]
}else{cc=e&&bI.isPlainObject(e)?e:{}
}ca[b7]=bI.extend(cd,cc,b6)
}else{if(b6!==undefined){ca[b7]=b6
}}}}}return ca
};
bI.extend({expando:"jQuery"+(ai+Math.random()).replace(/\D/g,""),isReady:true,error:function(e){throw new Error(e)
},noop:function(){},isFunction:function(e){return bI.type(e)==="function"
},isArray:Array.isArray||function(e){return bI.type(e)==="array"
},isWindow:function(e){return e!=null&&e==e.window
},isNumeric:function(e){return e-parseFloat(e)>=0
},isEmptyObject:function(i){var e;
for(e in i){return false
}return true
},isPlainObject:function(b7){var i;
if(!b7||bI.type(b7)!=="object"||b7.nodeType||bI.isWindow(b7)){return false
}try{if(b7.constructor&&!J.call(b7,"constructor")&&!J.call(b7.constructor.prototype,"isPrototypeOf")){return false
}}catch(b6){return false
}if(C.ownLast){for(i in b7){return J.call(b7,i)
}}for(i in b7){}return i===undefined||J.call(b7,i)
},type:function(e){if(e==null){return e+""
}return typeof e==="object"||typeof e==="function"?ac[x.call(e)]||"object":typeof e
},globalEval:function(e){if(e&&bI.trim(e)){(a5.execScript||function(i){a5["eval"].call(a5,i)
})(e)
}},camelCase:function(e){return e.replace(bS,"ms-").replace(aW,N)
},nodeName:function(i,e){return i.nodeName&&i.nodeName.toLowerCase()===e.toLowerCase()
},each:function(ca,cb,b6){var b9,b7=0,b8=ca.length,e=ad(ca);
if(b6){if(e){for(;
b7<b8;
b7++){b9=cb.apply(ca[b7],b6);
if(b9===false){break
}}}else{for(b7 in ca){b9=cb.apply(ca[b7],b6);
if(b9===false){break
}}}}else{if(e){for(;
b7<b8;
b7++){b9=cb.call(ca[b7],b7,ca[b7]);
if(b9===false){break
}}}else{for(b7 in ca){b9=cb.call(ca[b7],b7,ca[b7]);
if(b9===false){break
}}}}return ca
},trim:Z&&!Z.call("\uFEFF\xA0")?function(e){return e==null?"":Z.call(e)
}:function(e){return e==null?"":(e+"").replace(D,"")
},makeArray:function(e,b6){var i=b6||[];
if(e!=null){if(ad(Object(e))){bI.merge(i,typeof e==="string"?[e]:e)
}else{w.call(i,e)
}}return i
},inArray:function(b8,b6,b7){var e;
if(b6){if(bU){return bU.call(b6,b8,b7)
}e=b6.length;
b7=b7?b7<0?Math.max(0,e+b7):b7:0;
for(;
b7<e;
b7++){if(b7 in b6&&b6[b7]===b8){return b7
}}}return -1
},merge:function(b9,b7){var e=+b7.length,b6=0,b8=b9.length;
while(b6<e){b9[b8++]=b7[b6++]
}if(e!==e){while(b7[b6]!==undefined){b9[b8++]=b7[b6++]
}}b9.length=b8;
return b9
},grep:function(e,cc,b9){var cb,b8=[],b6=0,b7=e.length,ca=!b9;
for(;
b6<b7;
b6++){cb=!cc(e[b6],b6);
if(cb!==ca){b8.push(e[b6])
}}return b8
},map:function(b7,cc,e){var cb,b9=0,ca=b7.length,b6=ad(b7),b8=[];
if(b6){for(;
b9<ca;
b9++){cb=cc(b7[b9],b9,e);
if(cb!=null){b8.push(cb)
}}}else{for(b9 in b7){cb=cc(b7[b9],b9,e);
if(cb!=null){b8.push(cb)
}}}return az.apply([],b8)
},guid:1,proxy:function(b8,b7){var e,b6,i;
if(typeof b7==="string"){i=b8[b7];
b7=b8;
b8=i
}if(!bI.isFunction(b8)){return undefined
}e=O.call(arguments,2);
b6=function(){return b8.apply(b7||this,e.concat(O.call(arguments)))
};
b6.guid=b8.guid=b8.guid||bI.guid++;
return b6
},now:function(){return +(new Date())
},support:C});
bI.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(b6,e){ac["[object "+e+"]"]=e.toLowerCase()
});
function ad(b6){var i=b6.length,e=bI.type(b6);
if(e==="function"||bI.isWindow(b6)){return false
}if(b6.nodeType===1&&i){return true
}return e==="array"||i===0||typeof i==="number"&&i>0&&(i-1) in b6
}var m=
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function(de){var cx,dh,cn,cG,cJ,cV,dl,cH,cW,cY,cB,co,c7,c2,df,ce,cE,c9="sizzle"+-(new Date()),cI=de.document,di=0,c3=0,b9=cz(),c8=cz(),cF=cz(),cD=function(i,e){if(i===e){cW=true
}return 0
},dd=typeof undefined,cP=1<<31,cN=({}).hasOwnProperty,db=[],dc=db.pop,cL=db.push,b7=db.push,cm=db.slice,cd=db.indexOf||function(dn){var dm=0,e=this.length;
for(;
dm<e;
dm++){if(this[dm]===dn){return dm
}}return -1
},b8="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",cp="[\\x20\\t\\r\\n\\f]",b6="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",cK=b6.replace("w","w#"),c5="\\["+cp+"*("+b6+")"+cp+"*(?:([*^$|!~]?=)"+cp+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+cK+")|)|)"+cp+"*\\]",ck=":("+b6+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+c5.replace(3,8)+")*)|.*)\\)|)",cr=new RegExp("^"+cp+"+|((?:^|[^\\\\])(?:\\\\.)*)"+cp+"+$","g"),cu=new RegExp("^"+cp+"*,"+cp+"*"),cA=new RegExp("^"+cp+"*([>+~]|"+cp+")"+cp+"*"),ct=new RegExp("="+cp+"*([^\\]'\"]*?)"+cp+"*\\]","g"),cR=new RegExp(ck),cT=new RegExp("^"+cK+"$"),c1={ID:new RegExp("^#("+b6+")"),CLASS:new RegExp("^\\.("+b6+")"),TAG:new RegExp("^("+b6.replace("w","w*")+")"),ATTR:new RegExp("^"+c5),PSEUDO:new RegExp("^"+ck),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+cp+"*(even|odd|(([+-]|)(\\d*)n|)"+cp+"*(?:([+-]|)"+cp+"*(\\d+)|))"+cp+"*\\)|)","i"),bool:new RegExp("^(?:"+b8+")$","i"),needsContext:new RegExp("^"+cp+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+cp+"*((?:-\\d)?\\d*)"+cp+"*\\)|)(?=[^-]|$)","i")},cc=/^(?:input|select|textarea|button)$/i,cl=/^h\d$/i,cO=/^[^{]+\{\s*\[native \w/,cQ=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,c0=/[+~]/,cM=/'|\\/g,cs=new RegExp("\\\\([\\da-f]{1,6}"+cp+"?|("+cp+")|.)","ig"),c4=function(e,dn,i){var dm="0x"+dn-65536;
return dm!==dm||i?dn:dm<0?String.fromCharCode(dm+65536):String.fromCharCode(dm>>10|55296,dm&1023|56320)
};
try{b7.apply((db=cm.call(cI.childNodes)),cI.childNodes);
db[cI.childNodes.length].nodeType
}catch(cC){b7={apply:db.length?function(i,e){cL.apply(i,cm.call(e))
}:function(dp,dn){var e=dp.length,dm=0;
while((dp[e++]=dn[dm++])){}dp.length=e-1
}}
}function cv(du,dm,dy,dA){var dz,dr,ds,dw,dx,dq,dp,e,dn,dv;
if((dm?dm.ownerDocument||dm:cI)!==cB){cY(dm)
}dm=dm||cB;
dy=dy||[];
if(!du||typeof du!=="string"){return dy
}if((dw=dm.nodeType)!==1&&dw!==9){return[]
}if(c7&&!dA){if((dz=cQ.exec(du))){if((ds=dz[1])){if(dw===9){dr=dm.getElementById(ds);
if(dr&&dr.parentNode){if(dr.id===ds){dy.push(dr);
return dy
}}else{return dy
}}else{if(dm.ownerDocument&&(dr=dm.ownerDocument.getElementById(ds))&&cE(dm,dr)&&dr.id===ds){dy.push(dr);
return dy
}}}else{if(dz[2]){b7.apply(dy,dm.getElementsByTagName(du));
return dy
}else{if((ds=dz[3])&&dh.getElementsByClassName&&dm.getElementsByClassName){b7.apply(dy,dm.getElementsByClassName(ds));
return dy
}}}}if(dh.qsa&&(!c2||!c2.test(du))){e=dp=c9;
dn=dm;
dv=dw===9&&du;
if(dw===1&&dm.nodeName.toLowerCase()!=="object"){dq=ch(du);
if((dp=dm.getAttribute("id"))){e=dp.replace(cM,"\\$&")
}else{dm.setAttribute("id",e)
}e="[id='"+e+"'] ";
dx=dq.length;
while(dx--){dq[dx]=e+ci(dq[dx])
}dn=c0.test(du)&&cS(dm.parentNode)||dm;
dv=dq.join(",")
}if(dv){try{b7.apply(dy,dn.querySelectorAll(dv));
return dy
}catch(dt){}finally{if(!dp){dm.removeAttribute("id")
}}}}}return dg(du.replace(cr,"$1"),dm,dy,dA)
}function cz(){var i=[];
function e(dm,dn){if(i.push(dm+" ")>cn.cacheLength){delete e[i.shift()]
}return(e[dm+" "]=dn)
}return e
}function cj(e){e[c9]=true;
return e
}function cf(i){var dn=cB.createElement("div");
try{return !!i(dn)
}catch(dm){return false
}finally{if(dn.parentNode){dn.parentNode.removeChild(dn)
}dn=null
}}function dj(dm,dp){var e=dm.split("|"),dn=dm.length;
while(dn--){cn.attrHandle[e[dn]]=dp
}}function ca(i,e){var dn=e&&i,dm=dn&&i.nodeType===1&&e.nodeType===1&&(~e.sourceIndex||cP)-(~i.sourceIndex||cP);
if(dm){return dm
}if(dn){while((dn=dn.nextSibling)){if(dn===e){return -1
}}}return i?1:-1
}function cw(e){return function(dm){var i=dm.nodeName.toLowerCase();
return i==="input"&&dm.type===e
}
}function cb(e){return function(dm){var i=dm.nodeName.toLowerCase();
return(i==="input"||i==="button")&&dm.type===e
}
}function c6(e){return cj(function(i){i=+i;
return cj(function(dm,dr){var dp,dn=e([],dm.length,i),dq=dn.length;
while(dq--){if(dm[(dp=dn[dq])]){dm[dp]=!(dr[dp]=dm[dp])
}}})
})
}function cS(e){return e&&typeof e.getElementsByTagName!==dd&&e
}dh=cv.support={};
cJ=cv.isXML=function(e){var i=e&&(e.ownerDocument||e).documentElement;
return i?i.nodeName!=="HTML":false
};
cY=cv.setDocument=function(dm){var e,dn=dm?dm.ownerDocument||dm:cI,i=dn.defaultView;
if(dn===cB||dn.nodeType!==9||!dn.documentElement){return cB
}cB=dn;
co=dn.documentElement;
c7=!cJ(dn);
if(i&&i!==i.top){if(i.addEventListener){i.addEventListener("unload",function(){cY()
},false)
}else{if(i.attachEvent){i.attachEvent("onunload",function(){cY()
})
}}}dh.attributes=cf(function(dp){dp.className="i";
return !dp.getAttribute("className")
});
dh.getElementsByTagName=cf(function(dp){dp.appendChild(dn.createComment(""));
return !dp.getElementsByTagName("*").length
});
dh.getElementsByClassName=cO.test(dn.getElementsByClassName)&&cf(function(dp){dp.innerHTML="<div class='a'></div><div class='a i'></div>";
dp.firstChild.className="i";
return dp.getElementsByClassName("i").length===2
});
dh.getById=cf(function(dp){co.appendChild(dp).id=c9;
return !dn.getElementsByName||!dn.getElementsByName(c9).length
});
if(dh.getById){cn.find.ID=function(dr,dq){if(typeof dq.getElementById!==dd&&c7){var dp=dq.getElementById(dr);
return dp&&dp.parentNode?[dp]:[]
}};
cn.filter.ID=function(dq){var dp=dq.replace(cs,c4);
return function(dr){return dr.getAttribute("id")===dp
}
}
}else{delete cn.find.ID;
cn.filter.ID=function(dq){var dp=dq.replace(cs,c4);
return function(ds){var dr=typeof ds.getAttributeNode!==dd&&ds.getAttributeNode("id");
return dr&&dr.value===dp
}
}
}cn.find.TAG=dh.getElementsByTagName?function(dp,dq){if(typeof dq.getElementsByTagName!==dd){return dq.getElementsByTagName(dp)
}}:function(dp,dt){var du,ds=[],dr=0,dq=dt.getElementsByTagName(dp);
if(dp==="*"){while((du=dq[dr++])){if(du.nodeType===1){ds.push(du)
}}return ds
}return dq
};
cn.find.CLASS=dh.getElementsByClassName&&function(dq,dp){if(typeof dp.getElementsByClassName!==dd&&c7){return dp.getElementsByClassName(dq)
}};
df=[];
c2=[];
if((dh.qsa=cO.test(dn.querySelectorAll))){cf(function(dp){dp.innerHTML="<select t=''><option selected=''></option></select>";
if(dp.querySelectorAll("[t^='']").length){c2.push("[*^$]="+cp+"*(?:''|\"\")")
}if(!dp.querySelectorAll("[selected]").length){c2.push("\\["+cp+"*(?:value|"+b8+")")
}if(!dp.querySelectorAll(":checked").length){c2.push(":checked")
}});
cf(function(dq){var dp=dn.createElement("input");
dp.setAttribute("type","hidden");
dq.appendChild(dp).setAttribute("name","D");
if(dq.querySelectorAll("[name=d]").length){c2.push("name"+cp+"*[*^$|!~]?=")
}if(!dq.querySelectorAll(":enabled").length){c2.push(":enabled",":disabled")
}dq.querySelectorAll("*,:x");
c2.push(",.*:")
})
}if((dh.matchesSelector=cO.test((ce=co.webkitMatchesSelector||co.mozMatchesSelector||co.oMatchesSelector||co.msMatchesSelector)))){cf(function(dp){dh.disconnectedMatch=ce.call(dp,"div");
ce.call(dp,"[s!='']:x");
df.push("!=",ck)
})
}c2=c2.length&&new RegExp(c2.join("|"));
df=df.length&&new RegExp(df.join("|"));
e=cO.test(co.compareDocumentPosition);
cE=e||cO.test(co.contains)?function(dq,dp){var ds=dq.nodeType===9?dq.documentElement:dq,dr=dp&&dp.parentNode;
return dq===dr||!!(dr&&dr.nodeType===1&&(ds.contains?ds.contains(dr):dq.compareDocumentPosition&&dq.compareDocumentPosition(dr)&16))
}:function(dq,dp){if(dp){while((dp=dp.parentNode)){if(dp===dq){return true
}}}return false
};
cD=e?function(dq,dp){if(dq===dp){cW=true;
return 0
}var dr=!dq.compareDocumentPosition-!dp.compareDocumentPosition;
if(dr){return dr
}dr=(dq.ownerDocument||dq)===(dp.ownerDocument||dp)?dq.compareDocumentPosition(dp):1;
if(dr&1||(!dh.sortDetached&&dp.compareDocumentPosition(dq)===dr)){if(dq===dn||dq.ownerDocument===cI&&cE(cI,dq)){return -1
}if(dp===dn||dp.ownerDocument===cI&&cE(cI,dp)){return 1
}return cH?(cd.call(cH,dq)-cd.call(cH,dp)):0
}return dr&4?-1:1
}:function(dq,dp){if(dq===dp){cW=true;
return 0
}var dw,dt=0,dv=dq.parentNode,ds=dp.parentNode,dr=[dq],du=[dp];
if(!dv||!ds){return dq===dn?-1:dp===dn?1:dv?-1:ds?1:cH?(cd.call(cH,dq)-cd.call(cH,dp)):0
}else{if(dv===ds){return ca(dq,dp)
}}dw=dq;
while((dw=dw.parentNode)){dr.unshift(dw)
}dw=dp;
while((dw=dw.parentNode)){du.unshift(dw)
}while(dr[dt]===du[dt]){dt++
}return dt?ca(dr[dt],du[dt]):dr[dt]===cI?-1:du[dt]===cI?1:0
};
return dn
};
cv.matches=function(i,e){return cv(i,null,null,e)
};
cv.matchesSelector=function(dm,dp){if((dm.ownerDocument||dm)!==cB){cY(dm)
}dp=dp.replace(ct,"='$1']");
if(dh.matchesSelector&&c7&&(!df||!df.test(dp))&&(!c2||!c2.test(dp))){try{var i=ce.call(dm,dp);
if(i||dh.disconnectedMatch||dm.document&&dm.document.nodeType!==11){return i
}}catch(dn){}}return cv(dp,cB,null,[dm]).length>0
};
cv.contains=function(e,i){if((e.ownerDocument||e)!==cB){cY(e)
}return cE(e,i)
};
cv.attr=function(dm,e){if((dm.ownerDocument||dm)!==cB){cY(dm)
}var i=cn.attrHandle[e.toLowerCase()],dn=i&&cN.call(cn.attrHandle,e.toLowerCase())?i(dm,e,!c7):undefined;
return dn!==undefined?dn:dh.attributes||!c7?dm.getAttribute(e):(dn=dm.getAttributeNode(e))&&dn.specified?dn.value:null
};
cv.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)
};
cv.uniqueSort=function(dn){var dp,dq=[],e=0,dm=0;
cW=!dh.detectDuplicates;
cH=!dh.sortStable&&dn.slice(0);
dn.sort(cD);
if(cW){while((dp=dn[dm++])){if(dp===dn[dm]){e=dq.push(dm)
}}while(e--){dn.splice(dq[e],1)
}}cH=null;
return dn
};
cG=cv.getText=function(dq){var dp,dm="",dn=0,e=dq.nodeType;
if(!e){while((dp=dq[dn++])){dm+=cG(dp)
}}else{if(e===1||e===9||e===11){if(typeof dq.textContent==="string"){return dq.textContent
}else{for(dq=dq.firstChild;
dq;
dq=dq.nextSibling){dm+=cG(dq)
}}}else{if(e===3||e===4){return dq.nodeValue
}}}return dm
};
cn=cv.selectors={cacheLength:50,createPseudo:cj,match:c1,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){e[1]=e[1].replace(cs,c4);
e[3]=(e[4]||e[5]||"").replace(cs,c4);
if(e[2]==="~="){e[3]=" "+e[3]+" "
}return e.slice(0,4)
},CHILD:function(e){e[1]=e[1].toLowerCase();
if(e[1].slice(0,3)==="nth"){if(!e[3]){cv.error(e[0])
}e[4]=+(e[4]?e[5]+(e[6]||1):2*(e[3]==="even"||e[3]==="odd"));
e[5]=+((e[7]+e[8])||e[3]==="odd")
}else{if(e[3]){cv.error(e[0])
}}return e
},PSEUDO:function(i){var e,dm=!i[5]&&i[2];
if(c1.CHILD.test(i[0])){return null
}if(i[3]&&i[4]!==undefined){i[2]=i[4]
}else{if(dm&&cR.test(dm)&&(e=ch(dm,true))&&(e=dm.indexOf(")",dm.length-e)-dm.length)){i[0]=i[0].slice(0,e);
i[2]=dm.slice(0,e)
}}return i.slice(0,3)
}},filter:{TAG:function(i){var e=i.replace(cs,c4).toLowerCase();
return i==="*"?function(){return true
}:function(dm){return dm.nodeName&&dm.nodeName.toLowerCase()===e
}
},CLASS:function(e){var i=b9[e+" "];
return i||(i=new RegExp("(^|"+cp+")"+e+"("+cp+"|$)"))&&b9(e,function(dm){return i.test(typeof dm.className==="string"&&dm.className||typeof dm.getAttribute!==dd&&dm.getAttribute("class")||"")
})
},ATTR:function(dm,i,e){return function(dp){var dn=cv.attr(dp,dm);
if(dn==null){return i==="!="
}if(!i){return true
}dn+="";
return i==="="?dn===e:i==="!="?dn!==e:i==="^="?e&&dn.indexOf(e)===0:i==="*="?e&&dn.indexOf(e)>-1:i==="$="?e&&dn.slice(-e.length)===e:i==="~="?(" "+dn+" ").indexOf(e)>-1:i==="|="?dn===e||dn.slice(0,e.length+1)===e+"-":false
}
},CHILD:function(i,dp,dn,dq,dm){var ds=i.slice(0,3)!=="nth",e=i.slice(-4)!=="last",dr=dp==="of-type";
return dq===1&&dm===0?function(dt){return !!dt.parentNode
}:function(dz,dx,dC){var dt,dF,dA,dE,dB,dw,dy=ds!==e?"nextSibling":"previousSibling",dD=dz.parentNode,dv=dr&&dz.nodeName.toLowerCase(),du=!dC&&!dr;
if(dD){if(ds){while(dy){dA=dz;
while((dA=dA[dy])){if(dr?dA.nodeName.toLowerCase()===dv:dA.nodeType===1){return false
}}dw=dy=i==="only"&&!dw&&"nextSibling"
}return true
}dw=[e?dD.firstChild:dD.lastChild];
if(e&&du){dF=dD[c9]||(dD[c9]={});
dt=dF[i]||[];
dB=dt[0]===di&&dt[1];
dE=dt[0]===di&&dt[2];
dA=dB&&dD.childNodes[dB];
while((dA=++dB&&dA&&dA[dy]||(dE=dB=0)||dw.pop())){if(dA.nodeType===1&&++dE&&dA===dz){dF[i]=[di,dB,dE];
break
}}}else{if(du&&(dt=(dz[c9]||(dz[c9]={}))[i])&&dt[0]===di){dE=dt[1]
}else{while((dA=++dB&&dA&&dA[dy]||(dE=dB=0)||dw.pop())){if((dr?dA.nodeName.toLowerCase()===dv:dA.nodeType===1)&&++dE){if(du){(dA[c9]||(dA[c9]={}))[i]=[di,dE]
}if(dA===dz){break
}}}}}dE-=dm;
return dE===dq||(dE%dq===0&&dE/dq>=0)
}}
},PSEUDO:function(dn,dm){var e,i=cn.pseudos[dn]||cn.setFilters[dn.toLowerCase()]||cv.error("unsupported pseudo: "+dn);
if(i[c9]){return i(dm)
}if(i.length>1){e=[dn,dn,"",dm];
return cn.setFilters.hasOwnProperty(dn.toLowerCase())?cj(function(dr,dt){var dq,dp=i(dr,dm),ds=dp.length;
while(ds--){dq=cd.call(dr,dp[ds]);
dr[dq]=!(dt[dq]=dp[ds])
}}):function(dp){return i(dp,0,e)
}
}return i
}},pseudos:{not:cj(function(e){var i=[],dm=[],dn=cV(e.replace(cr,"$1"));
return dn[c9]?cj(function(dq,dv,dt,dr){var du,dp=dn(dq,null,dr,[]),ds=dq.length;
while(ds--){if((du=dp[ds])){dq[ds]=!(dv[ds]=du)
}}}):function(dr,dq,dp){i[0]=dr;
dn(i,null,dp,dm);
return !dm.pop()
}
}),has:cj(function(e){return function(i){return cv(e,i).length>0
}
}),contains:cj(function(e){return function(i){return(i.textContent||i.innerText||cG(i)).indexOf(e)>-1
}
}),lang:cj(function(e){if(!cT.test(e||"")){cv.error("unsupported lang: "+e)
}e=e.replace(cs,c4).toLowerCase();
return function(dm){var i;
do{if((i=c7?dm.lang:dm.getAttribute("xml:lang")||dm.getAttribute("lang"))){i=i.toLowerCase();
return i===e||i.indexOf(e+"-")===0
}}while((dm=dm.parentNode)&&dm.nodeType===1);
return false
}
}),target:function(e){var i=de.location&&de.location.hash;
return i&&i.slice(1)===e.id
},root:function(e){return e===co
},focus:function(e){return e===cB.activeElement&&(!cB.hasFocus||cB.hasFocus())&&!!(e.type||e.href||~e.tabIndex)
},enabled:function(e){return e.disabled===false
},disabled:function(e){return e.disabled===true
},checked:function(e){var i=e.nodeName.toLowerCase();
return(i==="input"&&!!e.checked)||(i==="option"&&!!e.selected)
},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex
}return e.selected===true
},empty:function(e){for(e=e.firstChild;
e;
e=e.nextSibling){if(e.nodeType<6){return false
}}return true
},parent:function(e){return !cn.pseudos.empty(e)
},header:function(e){return cl.test(e.nodeName)
},input:function(e){return cc.test(e.nodeName)
},button:function(i){var e=i.nodeName.toLowerCase();
return e==="input"&&i.type==="button"||e==="button"
},text:function(i){var e;
return i.nodeName.toLowerCase()==="input"&&i.type==="text"&&((e=i.getAttribute("type"))==null||e.toLowerCase()==="text")
},first:c6(function(){return[0]
}),last:c6(function(e,i){return[i-1]
}),eq:c6(function(e,dm,i){return[i<0?i+dm:i]
}),even:c6(function(e,dn){var dm=0;
for(;
dm<dn;
dm+=2){e.push(dm)
}return e
}),odd:c6(function(e,dn){var dm=1;
for(;
dm<dn;
dm+=2){e.push(dm)
}return e
}),lt:c6(function(e,dp,dn){var dm=dn<0?dn+dp:dn;
for(;
--dm>=0;
){e.push(dm)
}return e
}),gt:c6(function(e,dp,dn){var dm=dn<0?dn+dp:dn;
for(;
++dm<dp;
){e.push(dm)
}return e
})}};
cn.pseudos.nth=cn.pseudos.eq;
for(cx in {radio:true,checkbox:true,file:true,password:true,image:true}){cn.pseudos[cx]=cw(cx)
}for(cx in {submit:true,reset:true}){cn.pseudos[cx]=cb(cx)
}function cU(){}cU.prototype=cn.filters=cn.pseudos;
cn.setFilters=new cU();
function ch(dp,du){var i,dq,ds,dt,dr,dm,e,dn=c8[dp+" "];
if(dn){return du?0:dn.slice(0)
}dr=dp;
dm=[];
e=cn.preFilter;
while(dr){if(!i||(dq=cu.exec(dr))){if(dq){dr=dr.slice(dq[0].length)||dr
}dm.push((ds=[]))
}i=false;
if((dq=cA.exec(dr))){i=dq.shift();
ds.push({value:i,type:dq[0].replace(cr," ")});
dr=dr.slice(i.length)
}for(dt in cn.filter){if((dq=c1[dt].exec(dr))&&(!e[dt]||(dq=e[dt](dq)))){i=dq.shift();
ds.push({value:i,type:dt,matches:dq});
dr=dr.slice(i.length)
}}if(!i){break
}}return du?dr.length:dr?cv.error(dp):c8(dp,dm).slice(0)
}function ci(dp){var dn=0,dm=dp.length,e="";
for(;
dn<dm;
dn++){e+=dp[dn].value
}return e
}function cq(dp,dm,dn){var e=dm.dir,dq=dn&&e==="parentNode",i=c3++;
return dm.first?function(dt,ds,dr){while((dt=dt[e])){if(dt.nodeType===1||dq){return dp(dt,ds,dr)
}}}:function(dv,dt,ds){var dw,du,dr=[di,i];
if(ds){while((dv=dv[e])){if(dv.nodeType===1||dq){if(dp(dv,dt,ds)){return true
}}}}else{while((dv=dv[e])){if(dv.nodeType===1||dq){du=dv[c9]||(dv[c9]={});
if((dw=du[e])&&dw[0]===di&&dw[1]===i){return(dr[2]=dw[2])
}else{du[e]=dr;
if((dr[2]=dp(dv,dt,ds))){return true
}}}}}}
}function dk(e){return e.length>1?function(dq,dp,dm){var dn=e.length;
while(dn--){if(!e[dn](dq,dp,dm)){return false
}}return true
}:e[0]
}function cZ(e,dm,dn,dp,ds){var dq,dv=[],dr=0,dt=e.length,du=dm!=null;
for(;
dr<dt;
dr++){if((dq=e[dr])){if(!dn||dn(dq,dp,ds)){dv.push(dq);
if(du){dm.push(dr)
}}}}return dv
}function cg(dm,i,dp,dn,dq,e){if(dn&&!dn[c9]){dn=cg(dn)
}if(dq&&!dq[c9]){dq=cg(dq,e)
}return cj(function(dB,dy,dt,dA){var dD,dz,dv,du=[],dC=[],ds=dy.length,dr=dB||cy(i||"*",dt.nodeType?[dt]:dt,[]),dw=dm&&(dB||!i)?cZ(dr,du,dm,dt,dA):dr,dx=dp?dq||(dB?dm:ds||dn)?[]:dy:dw;
if(dp){dp(dw,dx,dt,dA)
}if(dn){dD=cZ(dx,dC);
dn(dD,[],dt,dA);
dz=dD.length;
while(dz--){if((dv=dD[dz])){dx[dC[dz]]=!(dw[dC[dz]]=dv)
}}}if(dB){if(dq||dm){if(dq){dD=[];
dz=dx.length;
while(dz--){if((dv=dx[dz])){dD.push((dw[dz]=dv))
}}dq(null,(dx=[]),dD,dA)
}dz=dx.length;
while(dz--){if((dv=dx[dz])&&(dD=dq?cd.call(dB,dv):du[dz])>-1){dB[dD]=!(dy[dD]=dv)
}}}}else{dx=cZ(dx===dy?dx.splice(ds,dx.length):dx);
if(dq){dq(null,dy,dx,dA)
}else{b7.apply(dy,dx)
}}})
}function da(ds){var dm,dq,dn,dr=ds.length,dv=cn.relative[ds[0].type],dw=dv||cn.relative[" "],dp=dv?1:0,dt=cq(function(i){return i===dm
},dw,true),du=cq(function(i){return cd.call(dm,i)>-1
},dw,true),e=[function(dy,dx,i){return(!dv&&(i||dx!==dl))||((dm=dx).nodeType?dt(dy,dx,i):du(dy,dx,i))
}];
for(;
dp<dr;
dp++){if((dq=cn.relative[ds[dp].type])){e=[cq(dk(e),dq)]
}else{dq=cn.filter[ds[dp].type].apply(null,ds[dp].matches);
if(dq[c9]){dn=++dp;
for(;
dn<dr;
dn++){if(cn.relative[ds[dn].type]){break
}}return cg(dp>1&&dk(e),dp>1&&ci(ds.slice(0,dp-1).concat({value:ds[dp-2].type===" "?"*":""})).replace(cr,"$1"),dq,dp<dn&&da(ds.slice(dp,dn)),dn<dr&&da((ds=ds.slice(dn))),dn<dr&&ci(ds))
}e.push(dq)
}}return dk(e)
}function cX(dn,dm){var e=dm.length>0,dp=dn.length>0,i=function(dz,dt,dy,dx,dC){var du,dv,dA,dE=0,dw="0",dq=dz&&[],dF=[],dD=dl,ds=dz||dp&&cn.find.TAG("*",dC),dr=(di+=dD==null?1:Math.random()||0.1),dB=ds.length;
if(dC){dl=dt!==cB&&dt
}for(;
dw!==dB&&(du=ds[dw])!=null;
dw++){if(dp&&du){dv=0;
while((dA=dn[dv++])){if(dA(du,dt,dy)){dx.push(du);
break
}}if(dC){di=dr
}}if(e){if((du=!dA&&du)){dE--
}if(dz){dq.push(du)
}}}dE+=dw;
if(e&&dw!==dE){dv=0;
while((dA=dm[dv++])){dA(dq,dF,dt,dy)
}if(dz){if(dE>0){while(dw--){if(!(dq[dw]||dF[dw])){dF[dw]=dc.call(dx)
}}}dF=cZ(dF)
}b7.apply(dx,dF);
if(dC&&!dz&&dF.length>0&&(dE+dm.length)>1){cv.uniqueSort(dx)
}}if(dC){di=dr;
dl=dD
}return dq
};
return e?cj(i):i
}cV=cv.compile=function(e,dr){var dn,dm=[],dq=[],dp=cF[e+" "];
if(!dp){if(!dr){dr=ch(e)
}dn=dr.length;
while(dn--){dp=da(dr[dn]);
if(dp[c9]){dm.push(dp)
}else{dq.push(dp)
}}dp=cF(e,cX(dq,dm))
}return dp
};
function cy(dm,dq,dp){var dn=0,e=dq.length;
for(;
dn<e;
dn++){cv(dm,dq[dn],dp)
}return dp
}function dg(dn,e,dp,ds){var dq,du,dm,dv,dt,dr=ch(dn);
if(!ds){if(dr.length===1){du=dr[0]=dr[0].slice(0);
if(du.length>2&&(dm=du[0]).type==="ID"&&dh.getById&&e.nodeType===9&&c7&&cn.relative[du[1].type]){e=(cn.find.ID(dm.matches[0].replace(cs,c4),e)||[])[0];
if(!e){return dp
}dn=dn.slice(du.shift().value.length)
}dq=c1.needsContext.test(dn)?0:du.length;
while(dq--){dm=du[dq];
if(cn.relative[(dv=dm.type)]){break
}if((dt=cn.find[dv])){if((ds=dt(dm.matches[0].replace(cs,c4),c0.test(du[0].type)&&cS(e.parentNode)||e))){du.splice(dq,1);
dn=ds.length&&ci(du);
if(!dn){b7.apply(dp,ds);
return dp
}break
}}}}}cV(dn,dr)(ds,e,!c7,dp,c0.test(dn)&&cS(e.parentNode)||e);
return dp
}dh.sortStable=c9.split("").sort(cD).join("")===c9;
dh.detectDuplicates=!!cW;
cY();
dh.sortDetached=cf(function(e){return e.compareDocumentPosition(cB.createElement("div"))&1
});
if(!cf(function(e){e.innerHTML="<a href='#'></a>";
return e.firstChild.getAttribute("href")==="#"
})){dj("type|href|height|width",function(i,e,dm){if(!dm){return i.getAttribute(e,e.toLowerCase()==="type"?1:2)
}})
}if(!dh.attributes||!cf(function(e){e.innerHTML="<input/>";
e.firstChild.setAttribute("value","");
return e.firstChild.getAttribute("value")===""
})){dj("value",function(i,e,dm){if(!dm&&i.nodeName.toLowerCase()==="input"){return i.defaultValue
}})
}if(!cf(function(e){return e.getAttribute("disabled")==null
})){dj(b8,function(i,e,dn){var dm;
if(!dn){return i[e]===true?e.toLowerCase():(dm=i.getAttributeNode(e))&&dm.specified?dm.value:null
}})
}return cv
})(a5);
bI.find=m;
bI.expr=m.selectors;
bI.expr[":"]=bI.expr.pseudos;
bI.unique=m.uniqueSort;
bI.text=m.getText;
bI.isXMLDoc=m.isXML;
bI.contains=m.contains;
var z=bI.expr.match.needsContext;
var a=(/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
var aL=/^.[^:#\[\.,]*$/;
function aR(b6,e,i){if(bI.isFunction(e)){return bI.grep(b6,function(b8,b7){return !!e.call(b8,b7,b8)!==i
})
}if(e.nodeType){return bI.grep(b6,function(b7){return(b7===e)!==i
})
}if(typeof e==="string"){if(aL.test(e)){return bI.filter(e,b6,i)
}e=bI.filter(e,b6)
}return bI.grep(b6,function(b7){return(bI.inArray(b7,e)>=0)!==i
})
}bI.filter=function(b7,e,b6){var i=e[0];
if(b6){b7=":not("+b7+")"
}return e.length===1&&i.nodeType===1?bI.find.matchesSelector(i,b7)?[i]:[]:bI.find.matches(b7,bI.grep(e,function(b8){return b8.nodeType===1
}))
};
bI.fn.extend({find:function(b6){var b9,b8=[],b7=this,e=b7.length;
if(typeof b6!=="string"){return this.pushStack(bI(b6).filter(function(){for(b9=0;
b9<e;
b9++){if(bI.contains(b7[b9],this)){return true
}}}))
}for(b9=0;
b9<e;
b9++){bI.find(b6,b7[b9],b8)
}b8=this.pushStack(e>1?bI.unique(b8):b8);
b8.selector=this.selector?this.selector+" "+b6:b6;
return b8
},filter:function(e){return this.pushStack(aR(this,e||[],false))
},not:function(e){return this.pushStack(aR(this,e||[],true))
},is:function(e){return !!aR(this,typeof e==="string"&&z.test(e)?bI(e):e||[],false).length
}});
var y,n=a5.document,bt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,bV=bI.fn.init=function(e,b6){var i,b7;
if(!e){return this
}if(typeof e==="string"){if(e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3){i=[null,e,null]
}else{i=bt.exec(e)
}if(i&&(i[1]||!b6)){if(i[1]){b6=b6 instanceof bI?b6[0]:b6;
bI.merge(this,bI.parseHTML(i[1],b6&&b6.nodeType?b6.ownerDocument||b6:n,true));
if(a.test(i[1])&&bI.isPlainObject(b6)){for(i in b6){if(bI.isFunction(this[i])){this[i](b6[i])
}else{this.attr(i,b6[i])
}}}return this
}else{b7=n.getElementById(i[2]);
if(b7&&b7.parentNode){if(b7.id!==i[2]){return y.find(e)
}this.length=1;
this[0]=b7
}this.context=n;
this.selector=e;
return this
}}else{if(!b6||b6.jquery){return(b6||y).find(e)
}else{return this.constructor(b6).find(e)
}}}else{if(e.nodeType){this.context=this[0]=e;
this.length=1;
return this
}else{if(bI.isFunction(e)){return typeof y.ready!=="undefined"?y.ready(e):e(bI)
}}}if(e.selector!==undefined){this.selector=e.selector;
this.context=e.context
}return bI.makeArray(e,this)
};
bV.prototype=bI.fn;
y=bI(n);
var bv=/^(?:parents|prev(?:Until|All))/,bz={children:true,contents:true,next:true,prev:true};
bI.extend({dir:function(b6,i,b8){var e=[],b7=b6[i];
while(b7&&b7.nodeType!==9&&(b8===undefined||b7.nodeType!==1||!bI(b7).is(b8))){if(b7.nodeType===1){e.push(b7)
}b7=b7[i]
}return e
},sibling:function(b6,i){var e=[];
for(;
b6;
b6=b6.nextSibling){if(b6.nodeType===1&&b6!==i){e.push(b6)
}}return e
}});
bI.fn.extend({has:function(b8){var b7,b6=bI(b8,this),e=b6.length;
return this.filter(function(){for(b7=0;
b7<e;
b7++){if(bI.contains(this,b6[b7])){return true
}}})
},closest:function(b9,b8){var ca,b7=0,b6=this.length,e=[],cb=z.test(b9)||typeof b9!=="string"?bI(b9,b8||this.context):0;
for(;
b7<b6;
b7++){for(ca=this[b7];
ca&&ca!==b8;
ca=ca.parentNode){if(ca.nodeType<11&&(cb?cb.index(ca)>-1:ca.nodeType===1&&bI.find.matchesSelector(ca,b9))){e.push(ca);
break
}}}return this.pushStack(e.length>1?bI.unique(e):e)
},index:function(e){if(!e){return(this[0]&&this[0].parentNode)?this.first().prevAll().length:-1
}if(typeof e==="string"){return bI.inArray(this[0],bI(e))
}return bI.inArray(e.jquery?e[0]:e,this)
},add:function(e,i){return this.pushStack(bI.unique(bI.merge(this.get(),bI(e,i))))
},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))
}});
function aY(i,e){do{i=i[e]
}while(i&&i.nodeType!==1);
return i
}bI.each({parent:function(i){var e=i.parentNode;
return e&&e.nodeType!==11?e:null
},parents:function(e){return bI.dir(e,"parentNode")
},parentsUntil:function(b6,e,b7){return bI.dir(b6,"parentNode",b7)
},next:function(e){return aY(e,"nextSibling")
},prev:function(e){return aY(e,"previousSibling")
},nextAll:function(e){return bI.dir(e,"nextSibling")
},prevAll:function(e){return bI.dir(e,"previousSibling")
},nextUntil:function(b6,e,b7){return bI.dir(b6,"nextSibling",b7)
},prevUntil:function(b6,e,b7){return bI.dir(b6,"previousSibling",b7)
},siblings:function(e){return bI.sibling((e.parentNode||{}).firstChild,e)
},children:function(e){return bI.sibling(e.firstChild)
},contents:function(e){return bI.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:bI.merge([],e.childNodes)
}},function(e,i){bI.fn[e]=function(b8,b6){var b7=bI.map(this,i,b8);
if(e.slice(-5)!=="Until"){b6=b8
}if(b6&&typeof b6==="string"){b7=bI.filter(b6,b7)
}if(this.length>1){if(!bz[e]){b7=bI.unique(b7)
}if(bv.test(e)){b7=b7.reverse()
}}return this.pushStack(b7)
}
});
var aF=(/\S+/g);
var b2={};
function af(i){var e=b2[i]={};
bI.each(i.match(aF)||[],function(b7,b6){e[b6]=true
});
return e
}bI.Callbacks=function(ce){ce=typeof ce==="string"?(b2[ce]||af(ce)):bI.extend({},ce);
var b8,b7,e,b9,ca,b6,cb=[],cc=!ce.once&&[],i=function(cf){b7=ce.memory&&cf;
e=true;
ca=b6||0;
b6=0;
b9=cb.length;
b8=true;
for(;
cb&&ca<b9;
ca++){if(cb[ca].apply(cf[0],cf[1])===false&&ce.stopOnFalse){b7=false;
break
}}b8=false;
if(cb){if(cc){if(cc.length){i(cc.shift())
}}else{if(b7){cb=[]
}else{cd.disable()
}}}},cd={add:function(){if(cb){var cg=cb.length;
(function cf(ch){bI.each(ch,function(cj,ci){var ck=bI.type(ci);
if(ck==="function"){if(!ce.unique||!cd.has(ci)){cb.push(ci)
}}else{if(ci&&ci.length&&ck!=="string"){cf(ci)
}}})
})(arguments);
if(b8){b9=cb.length
}else{if(b7){b6=cg;
i(b7)
}}}return this
},remove:function(){if(cb){bI.each(arguments,function(ch,cf){var cg;
while((cg=bI.inArray(cf,cb,cg))>-1){cb.splice(cg,1);
if(b8){if(cg<=b9){b9--
}if(cg<=ca){ca--
}}}})
}return this
},has:function(cf){return cf?bI.inArray(cf,cb)>-1:!!(cb&&cb.length)
},empty:function(){cb=[];
b9=0;
return this
},disable:function(){cb=cc=b7=undefined;
return this
},disabled:function(){return !cb
},lock:function(){cc=undefined;
if(!b7){cd.disable()
}return this
},locked:function(){return !cc
},fireWith:function(cg,cf){if(cb&&(!e||cc)){cf=cf||[];
cf=[cg,cf.slice?cf.slice():cf];
if(b8){cc.push(cf)
}else{i(cf)
}}return this
},fire:function(){cd.fireWith(this,arguments);
return this
},fired:function(){return !!e
}};
return cd
};
bI.extend({Deferred:function(b6){var i=[["resolve","done",bI.Callbacks("once memory"),"resolved"],["reject","fail",bI.Callbacks("once memory"),"rejected"],["notify","progress",bI.Callbacks("memory")]],b7="pending",b8={state:function(){return b7
},always:function(){e.done(arguments).fail(arguments);
return this
},then:function(){var b9=arguments;
return bI.Deferred(function(ca){bI.each(i,function(cc,cb){var cd=bI.isFunction(b9[cc])&&b9[cc];
e[cb[1]](function(){var ce=cd&&cd.apply(this,arguments);
if(ce&&bI.isFunction(ce.promise)){ce.promise().done(ca.resolve).fail(ca.reject).progress(ca.notify)
}else{ca[cb[0]+"With"](this===b8?ca.promise():this,cd?[ce]:arguments)
}})
});
b9=null
}).promise()
},promise:function(b9){return b9!=null?bI.extend(b9,b8):b8
}},e={};
b8.pipe=b8.then;
bI.each(i,function(ca,b9){var cc=b9[2],cb=b9[3];
b8[b9[1]]=cc.add;
if(cb){cc.add(function(){b7=cb
},i[ca^1][2].disable,i[2][2].lock)
}e[b9[0]]=function(){e[b9[0]+"With"](this===e?b8:this,arguments);
return this
};
e[b9[0]+"With"]=cc.fireWith
});
b8.promise(e);
if(b6){b6.call(e,e)
}return e
},when:function(b9){var b7=0,cb=O.call(arguments),e=cb.length,b6=e!==1||(b9&&bI.isFunction(b9.promise))?e:0,ce=b6===1?b9:bI.Deferred(),b8=function(cg,ch,cf){return function(i){ch[cg]=this;
cf[cg]=arguments.length>1?O.call(arguments):i;
if(cf===cd){ce.notifyWith(ch,cf)
}else{if(!(--b6)){ce.resolveWith(ch,cf)
}}}
},cd,ca,cc;
if(e>1){cd=new Array(e);
ca=new Array(e);
cc=new Array(e);
for(;
b7<e;
b7++){if(cb[b7]&&bI.isFunction(cb[b7].promise)){cb[b7].promise().done(b8(b7,cc,cb)).fail(ce.reject).progress(b8(b7,ca,cd))
}else{--b6
}}}if(!b6){ce.resolveWith(cc,cb)
}return ce.promise()
}});
var ak;
bI.fn.ready=function(e){bI.ready.promise().done(e);
return this
};
bI.extend({isReady:false,readyWait:1,holdReady:function(e){if(e){bI.readyWait++
}else{bI.ready(true)
}},ready:function(e){if(e===true?--bI.readyWait:bI.isReady){return
}if(!n.body){return setTimeout(bI.ready)
}bI.isReady=true;
if(e!==true&&--bI.readyWait>0){return
}ak.resolveWith(n,[bI]);
if(bI.fn.trigger){bI(n).trigger("ready").off("ready")
}}});
function bm(){if(n.addEventListener){n.removeEventListener("DOMContentLoaded",bZ,false);
a5.removeEventListener("load",bZ,false)
}else{n.detachEvent("onreadystatechange",bZ);
a5.detachEvent("onload",bZ)
}}function bZ(){if(n.addEventListener||event.type==="load"||n.readyState==="complete"){bm();
bI.ready()
}}bI.ready.promise=function(b8){if(!ak){ak=bI.Deferred();
if(n.readyState==="complete"){setTimeout(bI.ready)
}else{if(n.addEventListener){n.addEventListener("DOMContentLoaded",bZ,false);
a5.addEventListener("load",bZ,false)
}else{n.attachEvent("onreadystatechange",bZ);
a5.attachEvent("onload",bZ);
var b7=false;
try{b7=a5.frameElement==null&&n.documentElement
}catch(b6){}if(b7&&b7.doScroll){(function i(){if(!bI.isReady){try{b7.doScroll("left")
}catch(b9){return setTimeout(i,50)
}bm();
bI.ready()
}})()
}}}}return ak.promise(b8)
};
var aC=typeof undefined;
var bh;
for(bh in bI(C)){break
}C.ownLast=bh!=="0";
C.inlineBlockNeedsLayout=false;
bI(function(){var i,b6,e=n.getElementsByTagName("body")[0];
if(!e){return
}i=n.createElement("div");
i.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
b6=n.createElement("div");
e.appendChild(i).appendChild(b6);
if(typeof b6.style.zoom!==aC){b6.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";
if((C.inlineBlockNeedsLayout=(b6.offsetWidth===3))){e.style.zoom=1
}}e.removeChild(i);
i=b6=null
});
(function(){var b6=n.createElement("div");
if(C.deleteExpando==null){C.deleteExpando=true;
try{delete b6.test
}catch(i){C.deleteExpando=false
}}b6=null
})();
bI.acceptData=function(b6){var i=bI.noData[(b6.nodeName+" ").toLowerCase()],e=+b6.nodeType||1;
return e!==1&&e!==9?false:!i||i!==true&&b6.getAttribute("classid")===i
};
var by=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,aQ=/([A-Z])/g;
function bA(b7,b6,b8){if(b8===undefined&&b7.nodeType===1){var i="data-"+b6.replace(aQ,"-$1").toLowerCase();
b8=b7.getAttribute(i);
if(typeof b8==="string"){try{b8=b8==="true"?true:b8==="false"?false:b8==="null"?null:+b8+""===b8?+b8:by.test(b8)?bI.parseJSON(b8):b8
}catch(b9){}bI.data(b7,b6,b8)
}else{b8=undefined
}}return b8
}function P(i){var e;
for(e in i){if(e==="data"&&bI.isEmptyObject(i[e])){continue
}if(e!=="toJSON"){return false
}}return true
}function bc(b7,i,b9,b8){if(!bI.acceptData(b7)){return
}var cb,ca,cc=bI.expando,cd=b7.nodeType,e=cd?bI.cache:b7,b6=cd?b7[cc]:b7[cc]&&cc;
if((!b6||!e[b6]||(!b8&&!e[b6].data))&&b9===undefined&&typeof i==="string"){return
}if(!b6){if(cd){b6=b7[cc]=aP.pop()||bI.guid++
}else{b6=cc
}}if(!e[b6]){e[b6]=cd?{}:{toJSON:bI.noop}
}if(typeof i==="object"||typeof i==="function"){if(b8){e[b6]=bI.extend(e[b6],i)
}else{e[b6].data=bI.extend(e[b6].data,i)
}}ca=e[b6];
if(!b8){if(!ca.data){ca.data={}
}ca=ca.data
}if(b9!==undefined){ca[bI.camelCase(i)]=b9
}if(typeof i==="string"){cb=ca[i];
if(cb==null){cb=ca[bI.camelCase(i)]
}}else{cb=ca
}return cb
}function ab(b9,b7,e){if(!bI.acceptData(b9)){return
}var cb,b8,ca=b9.nodeType,b6=ca?bI.cache:b9,cc=ca?b9[bI.expando]:bI.expando;
if(!b6[cc]){return
}if(b7){cb=e?b6[cc]:b6[cc].data;
if(cb){if(!bI.isArray(b7)){if(b7 in cb){b7=[b7]
}else{b7=bI.camelCase(b7);
if(b7 in cb){b7=[b7]
}else{b7=b7.split(" ")
}}}else{b7=b7.concat(bI.map(b7,bI.camelCase))
}b8=b7.length;
while(b8--){delete cb[b7[b8]]
}if(e?!P(cb):!bI.isEmptyObject(cb)){return
}}}if(!e){delete b6[cc].data;
if(!P(b6[cc])){return
}}if(ca){bI.cleanData([b9],true)
}else{if(C.deleteExpando||b6!=b6.window){delete b6[cc]
}else{b6[cc]=null
}}}bI.extend({cache:{},noData:{"applet ":true,"embed ":true,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){e=e.nodeType?bI.cache[e[bI.expando]]:e[bI.expando];
return !!e&&!P(e)
},data:function(i,e,b6){return bc(i,e,b6)
},removeData:function(i,e){return ab(i,e)
},_data:function(i,e,b6){return bc(i,e,b6,true)
},_removeData:function(i,e){return ab(i,e,true)
}});
bI.fn.extend({data:function(b8,cb){var b7,b6,ca,b9=this[0],e=b9&&b9.attributes;
if(b8===undefined){if(this.length){ca=bI.data(b9);
if(b9.nodeType===1&&!bI._data(b9,"parsedAttrs")){b7=e.length;
while(b7--){b6=e[b7].name;
if(b6.indexOf("data-")===0){b6=bI.camelCase(b6.slice(5));
bA(b9,b6,ca[b6])
}}bI._data(b9,"parsedAttrs",true)
}}return ca
}if(typeof b8==="object"){return this.each(function(){bI.data(this,b8)
})
}return arguments.length>1?this.each(function(){bI.data(this,b8,cb)
}):b9?bA(b9,b8,bI.data(b9,b8)):undefined
},removeData:function(e){return this.each(function(){bI.removeData(this,e)
})
}});
bI.extend({queue:function(b6,i,b7){var e;
if(b6){i=(i||"fx")+"queue";
e=bI._data(b6,i);
if(b7){if(!e||bI.isArray(b7)){e=bI._data(b6,i,bI.makeArray(b7))
}else{e.push(b7)
}}return e||[]
}},dequeue:function(b9,b8){b8=b8||"fx";
var i=bI.queue(b9,b8),ca=i.length,b7=i.shift(),e=bI._queueHooks(b9,b8),b6=function(){bI.dequeue(b9,b8)
};
if(b7==="inprogress"){b7=i.shift();
ca--
}if(b7){if(b8==="fx"){i.unshift("inprogress")
}delete e.stop;
b7.call(b9,b6,e)
}if(!ca&&e){e.empty.fire()
}},_queueHooks:function(b6,i){var e=i+"queueHooks";
return bI._data(b6,e)||bI._data(b6,e,{empty:bI.Callbacks("once memory").add(function(){bI._removeData(b6,i+"queue");
bI._removeData(b6,e)
})})
}});
bI.fn.extend({queue:function(e,i){var b6=2;
if(typeof e!=="string"){i=e;
e="fx";
b6--
}if(arguments.length<b6){return bI.queue(this[0],e)
}return i===undefined?this:this.each(function(){var b7=bI.queue(this,e,i);
bI._queueHooks(this,e);
if(e==="fx"&&b7[0]!=="inprogress"){bI.dequeue(this,e)
}})
},dequeue:function(e){return this.each(function(){bI.dequeue(this,e)
})
},clearQueue:function(e){return this.queue(e||"fx",[])
},promise:function(b7,cb){var b6,b8=1,cc=bI.Deferred(),ca=this,e=this.length,b9=function(){if(!(--b8)){cc.resolveWith(ca,[ca])
}};
if(typeof b7!=="string"){cb=b7;
b7=undefined
}b7=b7||"fx";
while(e--){b6=bI._data(ca[e],b7+"queueHooks");
if(b6&&b6.empty){b8++;
b6.empty.add(b9)
}}b9();
return cc.promise(cb)
}});
var aE=(/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
var bT=["Top","Right","Bottom","Left"];
var R=function(i,e){i=e||i;
return bI.css(i,"display")==="none"||!bI.contains(i.ownerDocument,i)
};
var aB=bI.access=function(e,ca,cc,cb,b8,ce,cd){var b7=0,b6=e.length,b9=cc==null;
if(bI.type(cc)==="object"){b8=true;
for(b7 in cc){bI.access(e,ca,b7,cc[b7],true,ce,cd)
}}else{if(cb!==undefined){b8=true;
if(!bI.isFunction(cb)){cd=true
}if(b9){if(cd){ca.call(e,cb);
ca=null
}else{b9=ca;
ca=function(cf,i,cg){return b9.call(bI(cf),cg)
}
}}if(ca){for(;
b7<b6;
b7++){ca(e[b7],cc,cd?cb:cb.call(e[b7],b7,ca(e[b7],cc)))
}}}}return b8?e:b9?ca.call(e):b6?ca(e[0],cc):ce
};
var aM=(/^(?:checkbox|radio)$/i);
(function(){var b6=n.createDocumentFragment(),b8=n.createElement("div"),i=n.createElement("input");
b8.setAttribute("className","t");
b8.innerHTML="  <link/><table></table><a href='/a'>a</a>";
C.leadingWhitespace=b8.firstChild.nodeType===3;
C.tbody=!b8.getElementsByTagName("tbody").length;
C.htmlSerialize=!!b8.getElementsByTagName("link").length;
C.html5Clone=n.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>";
i.type="checkbox";
i.checked=true;
b6.appendChild(i);
C.appendChecked=i.checked;
b8.innerHTML="<textarea>x</textarea>";
C.noCloneChecked=!!b8.cloneNode(true).lastChild.defaultValue;
b6.appendChild(b8);
b8.innerHTML="<input type='radio' checked='checked' name='t'/>";
C.checkClone=b8.cloneNode(true).cloneNode(true).lastChild.checked;
C.noCloneEvent=true;
if(b8.attachEvent){b8.attachEvent("onclick",function(){C.noCloneEvent=false
});
b8.cloneNode(true).click()
}if(C.deleteExpando==null){C.deleteExpando=true;
try{delete b8.test
}catch(b7){C.deleteExpando=false
}}b6=b8=i=null
})();
(function(){var b6,e,b7=n.createElement("div");
for(b6 in {submit:true,change:true,focusin:true}){e="on"+b6;
if(!(C[b6+"Bubbles"]=e in a5)){b7.setAttribute(e,"t");
C[b6+"Bubbles"]=b7.attributes[e].expando===false
}}b7=null
})();
var bG=/^(?:input|select|textarea)$/i,a6=/^key/,bM=/^(?:mouse|contextmenu)|click/,bC=/^(?:focusinfocus|focusoutblur)$/,bx=/^([^.]*)(?:\.(.+)|)$/;
function T(){return true
}function Y(){return false
}function am(){try{return n.activeElement
}catch(e){}}bI.event={global:{},add:function(b8,cd,ci,ca,b9){var cb,cj,ck,b6,cf,cc,ch,b7,cg,e,i,ce=bI._data(b8);
if(!ce){return
}if(ci.handler){b6=ci;
ci=b6.handler;
b9=b6.selector
}if(!ci.guid){ci.guid=bI.guid++
}if(!(cj=ce.events)){cj=ce.events={}
}if(!(cc=ce.handle)){cc=ce.handle=function(cl){return typeof bI!==aC&&(!cl||bI.event.triggered!==cl.type)?bI.event.dispatch.apply(cc.elem,arguments):undefined
};
cc.elem=b8
}cd=(cd||"").match(aF)||[""];
ck=cd.length;
while(ck--){cb=bx.exec(cd[ck])||[];
cg=i=cb[1];
e=(cb[2]||"").split(".").sort();
if(!cg){continue
}cf=bI.event.special[cg]||{};
cg=(b9?cf.delegateType:cf.bindType)||cg;
cf=bI.event.special[cg]||{};
ch=bI.extend({type:cg,origType:i,data:ca,handler:ci,guid:ci.guid,selector:b9,needsContext:b9&&bI.expr.match.needsContext.test(b9),namespace:e.join(".")},b6);
if(!(b7=cj[cg])){b7=cj[cg]=[];
b7.delegateCount=0;
if(!cf.setup||cf.setup.call(b8,ca,e,cc)===false){if(b8.addEventListener){b8.addEventListener(cg,cc,false)
}else{if(b8.attachEvent){b8.attachEvent("on"+cg,cc)
}}}}if(cf.add){cf.add.call(b8,ch);
if(!ch.handler.guid){ch.handler.guid=ci.guid
}}if(b9){b7.splice(b7.delegateCount++,0,ch)
}else{b7.push(ch)
}bI.event.global[cg]=true
}b8=null
},remove:function(b7,cd,ck,b8,cc){var ca,ch,cb,b9,cj,ci,cf,b6,cg,e,i,ce=bI.hasData(b7)&&bI._data(b7);
if(!ce||!(ci=ce.events)){return
}cd=(cd||"").match(aF)||[""];
cj=cd.length;
while(cj--){cb=bx.exec(cd[cj])||[];
cg=i=cb[1];
e=(cb[2]||"").split(".").sort();
if(!cg){for(cg in ci){bI.event.remove(b7,cg+cd[cj],ck,b8,true)
}continue
}cf=bI.event.special[cg]||{};
cg=(b8?cf.delegateType:cf.bindType)||cg;
b6=ci[cg]||[];
cb=cb[2]&&new RegExp("(^|\\.)"+e.join("\\.(?:.*\\.|)")+"(\\.|$)");
b9=ca=b6.length;
while(ca--){ch=b6[ca];
if((cc||i===ch.origType)&&(!ck||ck.guid===ch.guid)&&(!cb||cb.test(ch.namespace))&&(!b8||b8===ch.selector||b8==="**"&&ch.selector)){b6.splice(ca,1);
if(ch.selector){b6.delegateCount--
}if(cf.remove){cf.remove.call(b7,ch)
}}}if(b9&&!b6.length){if(!cf.teardown||cf.teardown.call(b7,e,ce.handle)===false){bI.removeEvent(b7,cg,ce.handle)
}delete ci[cg]
}}if(bI.isEmptyObject(ci)){delete ce.handle;
bI._removeData(b7,"events")
}},trigger:function(b6,cd,b9,ck){var ce,b8,ci,cj,cg,cc,cb,ca=[b9||n],ch=J.call(b6,"type")?b6.type:b6,b7=J.call(b6,"namespace")?b6.namespace.split("."):[];
ci=cc=b9=b9||n;
if(b9.nodeType===3||b9.nodeType===8){return
}if(bC.test(ch+bI.event.triggered)){return
}if(ch.indexOf(".")>=0){b7=ch.split(".");
ch=b7.shift();
b7.sort()
}b8=ch.indexOf(":")<0&&"on"+ch;
b6=b6[bI.expando]?b6:new bI.Event(ch,typeof b6==="object"&&b6);
b6.isTrigger=ck?2:3;
b6.namespace=b7.join(".");
b6.namespace_re=b6.namespace?new RegExp("(^|\\.)"+b7.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
b6.result=undefined;
if(!b6.target){b6.target=b9
}cd=cd==null?[b6]:bI.makeArray(cd,[b6]);
cg=bI.event.special[ch]||{};
if(!ck&&cg.trigger&&cg.trigger.apply(b9,cd)===false){return
}if(!ck&&!cg.noBubble&&!bI.isWindow(b9)){cj=cg.delegateType||ch;
if(!bC.test(cj+ch)){ci=ci.parentNode
}for(;
ci;
ci=ci.parentNode){ca.push(ci);
cc=ci
}if(cc===(b9.ownerDocument||n)){ca.push(cc.defaultView||cc.parentWindow||a5)
}}cb=0;
while((ci=ca[cb++])&&!b6.isPropagationStopped()){b6.type=cb>1?cj:cg.bindType||ch;
ce=(bI._data(ci,"events")||{})[b6.type]&&bI._data(ci,"handle");
if(ce){ce.apply(ci,cd)
}ce=b8&&ci[b8];
if(ce&&ce.apply&&bI.acceptData(ci)){b6.result=ce.apply(ci,cd);
if(b6.result===false){b6.preventDefault()
}}}b6.type=ch;
if(!ck&&!b6.isDefaultPrevented()){if((!cg._default||cg._default.apply(ca.pop(),cd)===false)&&bI.acceptData(b9)){if(b8&&b9[ch]&&!bI.isWindow(b9)){cc=b9[b8];
if(cc){b9[b8]=null
}bI.event.triggered=ch;
try{b9[ch]()
}catch(cf){}bI.event.triggered=undefined;
if(cc){b9[b8]=cc
}}}}return b6.result
},dispatch:function(e){e=bI.event.fix(e);
var b9,ca,ce,b6,b8,cd=[],cc=O.call(arguments),b7=(bI._data(this,"events")||{})[e.type]||[],cb=bI.event.special[e.type]||{};
cc[0]=e;
e.delegateTarget=this;
if(cb.preDispatch&&cb.preDispatch.call(this,e)===false){return
}cd=bI.event.handlers.call(this,e,b7);
b9=0;
while((b6=cd[b9++])&&!e.isPropagationStopped()){e.currentTarget=b6.elem;
b8=0;
while((ce=b6.handlers[b8++])&&!e.isImmediatePropagationStopped()){if(!e.namespace_re||e.namespace_re.test(ce.namespace)){e.handleObj=ce;
e.data=ce.data;
ca=((bI.event.special[ce.origType]||{}).handle||ce.handler).apply(b6.elem,cc);
if(ca!==undefined){if((e.result=ca)===false){e.preventDefault();
e.stopPropagation()
}}}}}if(cb.postDispatch){cb.postDispatch.call(this,e)
}return e.result
},handlers:function(e,b7){var b6,cc,ca,b9,cb=[],b8=b7.delegateCount,cd=e.target;
if(b8&&cd.nodeType&&(!e.button||e.type!=="click")){for(;
cd!=this;
cd=cd.parentNode||this){if(cd.nodeType===1&&(cd.disabled!==true||e.type!=="click")){ca=[];
for(b9=0;
b9<b8;
b9++){cc=b7[b9];
b6=cc.selector+" ";
if(ca[b6]===undefined){ca[b6]=cc.needsContext?bI(b6,this).index(cd)>=0:bI.find(b6,this,null,[cd]).length
}if(ca[b6]){ca.push(cc)
}}if(ca.length){cb.push({elem:cd,handlers:ca})
}}}}if(b8<b7.length){cb.push({elem:this,handlers:b7.slice(b8)})
}return cb
},fix:function(b8){if(b8[bI.expando]){return b8
}var b6,cb,ca,b7=b8.type,e=b8,b9=this.fixHooks[b7];
if(!b9){this.fixHooks[b7]=b9=bM.test(b7)?this.mouseHooks:a6.test(b7)?this.keyHooks:{}
}ca=b9.props?this.props.concat(b9.props):this.props;
b8=new bI.Event(e);
b6=ca.length;
while(b6--){cb=ca[b6];
b8[cb]=e[cb]
}if(!b8.target){b8.target=e.srcElement||n
}if(b8.target.nodeType===3){b8.target=b8.target.parentNode
}b8.metaKey=!!b8.metaKey;
return b9.filter?b9.filter(b8,e):b8
},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(i,e){if(i.which==null){i.which=e.charCode!=null?e.charCode:e.keyCode
}return i
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(b7,b6){var e,b8,b9,i=b6.button,ca=b6.fromElement;
if(b7.pageX==null&&b6.clientX!=null){b8=b7.target.ownerDocument||n;
b9=b8.documentElement;
e=b8.body;
b7.pageX=b6.clientX+(b9&&b9.scrollLeft||e&&e.scrollLeft||0)-(b9&&b9.clientLeft||e&&e.clientLeft||0);
b7.pageY=b6.clientY+(b9&&b9.scrollTop||e&&e.scrollTop||0)-(b9&&b9.clientTop||e&&e.clientTop||0)
}if(!b7.relatedTarget&&ca){b7.relatedTarget=ca===b7.target?b6.toElement:ca
}if(!b7.which&&i!==undefined){b7.which=(i&1?1:(i&2?3:(i&4?2:0)))
}return b7
}},special:{load:{noBubble:true},focus:{trigger:function(){if(this!==am()&&this.focus){try{this.focus();
return false
}catch(i){}}},delegateType:"focusin"},blur:{trigger:function(){if(this===am()&&this.blur){this.blur();
return false
}},delegateType:"focusout"},click:{trigger:function(){if(bI.nodeName(this,"input")&&this.type==="checkbox"&&this.click){this.click();
return false
}},_default:function(e){return bI.nodeName(e.target,"a")
}},beforeunload:{postDispatch:function(e){if(e.result!==undefined){e.originalEvent.returnValue=e.result
}}}},simulate:function(b6,b8,b7,i){var b9=bI.extend(new bI.Event(),b7,{type:b6,isSimulated:true,originalEvent:{}});
if(i){bI.event.trigger(b9,null,b8)
}else{bI.event.dispatch.call(b8,b9)
}if(b9.isDefaultPrevented()){b7.preventDefault()
}}};
bI.removeEvent=n.removeEventListener?function(i,e,b6){if(i.removeEventListener){i.removeEventListener(e,b6,false)
}}:function(b6,i,b7){var e="on"+i;
if(b6.detachEvent){if(typeof b6[e]===aC){b6[e]=null
}b6.detachEvent(e,b7)
}};
bI.Event=function(i,e){if(!(this instanceof bI.Event)){return new bI.Event(i,e)
}if(i&&i.type){this.originalEvent=i;
this.type=i.type;
this.isDefaultPrevented=i.defaultPrevented||i.defaultPrevented===undefined&&(i.returnValue===false||i.getPreventDefault&&i.getPreventDefault())?T:Y
}else{this.type=i
}if(e){bI.extend(this,e)
}this.timeStamp=i&&i.timeStamp||bI.now();
this[bI.expando]=true
};
bI.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var i=this.originalEvent;
this.isDefaultPrevented=T;
if(!i){return
}if(i.preventDefault){i.preventDefault()
}else{i.returnValue=false
}},stopPropagation:function(){var i=this.originalEvent;
this.isPropagationStopped=T;
if(!i){return
}if(i.stopPropagation){i.stopPropagation()
}i.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=T;
this.stopPropagation()
}};
bI.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(i,e){bI.event.special[i]={delegateType:e,bindType:e,handle:function(b8){var b6,ca=this,b9=b8.relatedTarget,b7=b8.handleObj;
if(!b9||(b9!==ca&&!bI.contains(ca,b9))){b8.type=b7.origType;
b6=b7.handler.apply(this,arguments);
b8.type=e
}return b6
}}
});
if(!C.submitBubbles){bI.event.special.submit={setup:function(){if(bI.nodeName(this,"form")){return false
}bI.event.add(this,"click._submit keypress._submit",function(b7){var b6=b7.target,i=bI.nodeName(b6,"input")||bI.nodeName(b6,"button")?b6.form:undefined;
if(i&&!bI._data(i,"submitBubbles")){bI.event.add(i,"submit._submit",function(e){e._submit_bubble=true
});
bI._data(i,"submitBubbles",true)
}})
},postDispatch:function(e){if(e._submit_bubble){delete e._submit_bubble;
if(this.parentNode&&!e.isTrigger){bI.event.simulate("submit",this.parentNode,e,true)
}}},teardown:function(){if(bI.nodeName(this,"form")){return false
}bI.event.remove(this,"._submit")
}}
}if(!C.changeBubbles){bI.event.special.change={setup:function(){if(bG.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){bI.event.add(this,"propertychange._change",function(e){if(e.originalEvent.propertyName==="checked"){this._just_changed=true
}});
bI.event.add(this,"click._change",function(e){if(this._just_changed&&!e.isTrigger){this._just_changed=false
}bI.event.simulate("change",this,e,true)
})
}return false
}bI.event.add(this,"beforeactivate._change",function(b6){var i=b6.target;
if(bG.test(i.nodeName)&&!bI._data(i,"changeBubbles")){bI.event.add(i,"change._change",function(e){if(this.parentNode&&!e.isSimulated&&!e.isTrigger){bI.event.simulate("change",this.parentNode,e,true)
}});
bI._data(i,"changeBubbles",true)
}})
},handle:function(i){var e=i.target;
if(this!==e||i.isSimulated||i.isTrigger||(e.type!=="radio"&&e.type!=="checkbox")){return i.handleObj.handler.apply(this,arguments)
}},teardown:function(){bI.event.remove(this,"._change");
return !bG.test(this.nodeName)
}}
}if(!C.focusinBubbles){bI.each({focus:"focusin",blur:"focusout"},function(b6,e){var i=function(b7){bI.event.simulate(e,b7.target,bI.event.fix(b7),true)
};
bI.event.special[e]={setup:function(){var b8=this.ownerDocument||this,b7=bI._data(b8,e);
if(!b7){b8.addEventListener(b6,i,true)
}bI._data(b8,e,(b7||0)+1)
},teardown:function(){var b8=this.ownerDocument||this,b7=bI._data(b8,e)-1;
if(!b7){b8.removeEventListener(b6,i,true);
bI._removeData(b8,e)
}else{bI._data(b8,e,b7)
}}}
})
}bI.fn.extend({on:function(b6,e,b9,b8,i){var b7,ca;
if(typeof b6==="object"){if(typeof e!=="string"){b9=b9||e;
e=undefined
}for(b7 in b6){this.on(b7,e,b9,b6[b7],i)
}return this
}if(b9==null&&b8==null){b8=e;
b9=e=undefined
}else{if(b8==null){if(typeof e==="string"){b8=b9;
b9=undefined
}else{b8=b9;
b9=e;
e=undefined
}}}if(b8===false){b8=Y
}else{if(!b8){return this
}}if(i===1){ca=b8;
b8=function(cb){bI().off(cb);
return ca.apply(this,arguments)
};
b8.guid=ca.guid||(ca.guid=bI.guid++)
}return this.each(function(){bI.event.add(this,b6,b8,b9,e)
})
},one:function(i,e,b7,b6){return this.on(i,e,b7,b6,1)
},off:function(b6,e,b8){var i,b7;
if(b6&&b6.preventDefault&&b6.handleObj){i=b6.handleObj;
bI(b6.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler);
return this
}if(typeof b6==="object"){for(b7 in b6){this.off(b7,e,b6[b7])
}return this
}if(e===false||typeof e==="function"){b8=e;
e=undefined
}if(b8===false){b8=Y
}return this.each(function(){bI.event.remove(this,b6,b8,e)
})
},trigger:function(e,i){return this.each(function(){bI.event.trigger(e,i,this)
})
},triggerHandler:function(e,b6){var i=this[0];
if(i){return bI.event.trigger(e,b6,i,true)
}}});
function A(e){var b6=d.split("|"),i=e.createDocumentFragment();
if(i.createElement){while(b6.length){i.createElement(b6.pop())
}}return i
}var d="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",aD=/ jQuery\d+="(?:null|\d+)"/g,L=new RegExp("<(?:"+d+")[\\s/>]","i"),b5=/^\s+/,aH=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,o=/<([\w:]+)/,b0=/<tbody/i,K=/<|&#?\w+;/,an=/<(?:script|style|link)/i,bW=/checked\s*(?:[^=]|=\s*.checked.)/i,bB=/^$|\/(?:java|ecma)script/i,ar=/^true\/(.*)/,aO=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,V={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:C.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},aT=A(n),k=aT.appendChild(n.createElement("div"));
V.optgroup=V.option;
V.tbody=V.tfoot=V.colgroup=V.caption=V.thead;
V.th=V.td;
function l(b8,e){var b6,b9,b7=0,ca=typeof b8.getElementsByTagName!==aC?b8.getElementsByTagName(e||"*"):typeof b8.querySelectorAll!==aC?b8.querySelectorAll(e||"*"):undefined;
if(!ca){for(ca=[],b6=b8.childNodes||b8;
(b9=b6[b7])!=null;
b7++){if(!e||bI.nodeName(b9,e)){ca.push(b9)
}else{bI.merge(ca,l(b9,e))
}}}return e===undefined||e&&bI.nodeName(b8,e)?bI.merge([b8],ca):ca
}function bY(e){if(aM.test(e.type)){e.defaultChecked=e.checked
}}function a3(i,e){return bI.nodeName(i,"table")&&bI.nodeName(e.nodeType!==11?e:e.firstChild,"tr")?i.getElementsByTagName("tbody")[0]||i.appendChild(i.ownerDocument.createElement("tbody")):i
}function t(e){e.type=(bI.find.attr(e,"type")!==null)+"/"+e.type;
return e
}function bf(i){var e=ar.exec(i.type);
if(e){i.type=e[1]
}else{i.removeAttribute("type")
}return i
}function bu(e,b7){var b8,b6=0;
for(;
(b8=e[b6])!=null;
b6++){bI._data(b8,"globalEval",!b7||bI._data(b7[b6],"globalEval"))
}}function at(cc,b6){if(b6.nodeType!==1||!bI.hasData(cc)){return
}var b9,b8,e,cb=bI._data(cc),ca=bI._data(b6,cb),b7=cb.events;
if(b7){delete ca.handle;
ca.events={};
for(b9 in b7){for(b8=0,e=b7[b9].length;
b8<e;
b8++){bI.event.add(b6,b9,b7[b9][b8])
}}}if(ca.data){ca.data=bI.extend({},ca.data)
}}function S(b8,i){var b9,b7,b6;
if(i.nodeType!==1){return
}b9=i.nodeName.toLowerCase();
if(!C.noCloneEvent&&i[bI.expando]){b6=bI._data(i);
for(b7 in b6.events){bI.removeEvent(i,b7,b6.handle)
}i.removeAttribute(bI.expando)
}if(b9==="script"&&i.text!==b8.text){t(i).text=b8.text;
bf(i)
}else{if(b9==="object"){if(i.parentNode){i.outerHTML=b8.outerHTML
}if(C.html5Clone&&(b8.innerHTML&&!bI.trim(i.innerHTML))){i.innerHTML=b8.innerHTML
}}else{if(b9==="input"&&aM.test(b8.type)){i.defaultChecked=i.checked=b8.checked;
if(i.value!==b8.value){i.value=b8.value
}}else{if(b9==="option"){i.defaultSelected=i.selected=b8.defaultSelected
}else{if(b9==="input"||b9==="textarea"){i.defaultValue=b8.defaultValue
}}}}}}bI.extend({clone:function(b6,b8,e){var ca,b7,cd,b9,cb,cc=bI.contains(b6.ownerDocument,b6);
if(C.html5Clone||bI.isXMLDoc(b6)||!L.test("<"+b6.nodeName+">")){cd=b6.cloneNode(true)
}else{k.innerHTML=b6.outerHTML;
k.removeChild(cd=k.firstChild)
}if((!C.noCloneEvent||!C.noCloneChecked)&&(b6.nodeType===1||b6.nodeType===11)&&!bI.isXMLDoc(b6)){ca=l(cd);
cb=l(b6);
for(b9=0;
(b7=cb[b9])!=null;
++b9){if(ca[b9]){S(b7,ca[b9])
}}}if(b8){if(e){cb=cb||l(b6);
ca=ca||l(cd);
for(b9=0;
(b7=cb[b9])!=null;
b9++){at(b7,ca[b9])
}}else{at(b6,cd)
}}ca=l(cd,"script");
if(ca.length>0){bu(ca,!cc&&l(b6,"script"))
}ca=cb=b7=null;
return cd
},buildFragment:function(b6,b8,cd,ci){var ce,ca,cc,ch,cj,cg,b7,cb=b6.length,b9=A(b8),e=[],cf=0;
for(;
cf<cb;
cf++){ca=b6[cf];
if(ca||ca===0){if(bI.type(ca)==="object"){bI.merge(e,ca.nodeType?[ca]:ca)
}else{if(!K.test(ca)){e.push(b8.createTextNode(ca))
}else{ch=ch||b9.appendChild(b8.createElement("div"));
cj=(o.exec(ca)||["",""])[1].toLowerCase();
b7=V[cj]||V._default;
ch.innerHTML=b7[1]+ca.replace(aH,"<$1></$2>")+b7[2];
ce=b7[0];
while(ce--){ch=ch.lastChild
}if(!C.leadingWhitespace&&b5.test(ca)){e.push(b8.createTextNode(b5.exec(ca)[0]))
}if(!C.tbody){ca=cj==="table"&&!b0.test(ca)?ch.firstChild:b7[1]==="<table>"&&!b0.test(ca)?ch:0;
ce=ca&&ca.childNodes.length;
while(ce--){if(bI.nodeName((cg=ca.childNodes[ce]),"tbody")&&!cg.childNodes.length){ca.removeChild(cg)
}}}bI.merge(e,ch.childNodes);
ch.textContent="";
while(ch.firstChild){ch.removeChild(ch.firstChild)
}ch=b9.lastChild
}}}}if(ch){b9.removeChild(ch)
}if(!C.appendChecked){bI.grep(l(e,"input"),bY)
}cf=0;
while((ca=e[cf++])){if(ci&&bI.inArray(ca,ci)!==-1){continue
}cc=bI.contains(ca.ownerDocument,ca);
ch=l(b9.appendChild(ca),"script");
if(cc){bu(ch)
}if(cd){ce=0;
while((ca=ch[ce++])){if(bB.test(ca.type||"")){cd.push(ca)
}}}}ch=null;
return b9
},cleanData:function(b6,ce){var b8,cd,b7,b9,ca=0,cf=bI.expando,e=bI.cache,cb=C.deleteExpando,cc=bI.event.special;
for(;
(b8=b6[ca])!=null;
ca++){if(ce||bI.acceptData(b8)){b7=b8[cf];
b9=b7&&e[b7];
if(b9){if(b9.events){for(cd in b9.events){if(cc[cd]){bI.event.remove(b8,cd)
}else{bI.removeEvent(b8,cd,b9.handle)
}}}if(e[b7]){delete e[b7];
if(cb){delete b8[cf]
}else{if(typeof b8.removeAttribute!==aC){b8.removeAttribute(cf)
}else{b8[cf]=null
}}aP.push(b7)
}}}}}});
bI.fn.extend({text:function(e){return aB(this,function(i){return i===undefined?bI.text(this):this.empty().append((this[0]&&this[0].ownerDocument||n).createTextNode(i))
},null,e,arguments.length)
},append:function(){return this.domManip(arguments,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var i=a3(this,e);
i.appendChild(e)
}})
},prepend:function(){return this.domManip(arguments,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var i=a3(this,e);
i.insertBefore(e,i.firstChild)
}})
},before:function(){return this.domManip(arguments,function(e){if(this.parentNode){this.parentNode.insertBefore(e,this)
}})
},after:function(){return this.domManip(arguments,function(e){if(this.parentNode){this.parentNode.insertBefore(e,this.nextSibling)
}})
},remove:function(e,b9){var b8,b6=e?bI.filter(e,this):this,b7=0;
for(;
(b8=b6[b7])!=null;
b7++){if(!b9&&b8.nodeType===1){bI.cleanData(l(b8))
}if(b8.parentNode){if(b9&&bI.contains(b8.ownerDocument,b8)){bu(l(b8,"script"))
}b8.parentNode.removeChild(b8)
}}return this
},empty:function(){var b6,e=0;
for(;
(b6=this[e])!=null;
e++){if(b6.nodeType===1){bI.cleanData(l(b6,false))
}while(b6.firstChild){b6.removeChild(b6.firstChild)
}if(b6.options&&bI.nodeName(b6,"select")){b6.options.length=0
}}return this
},clone:function(i,e){i=i==null?false:i;
e=e==null?i:e;
return this.map(function(){return bI.clone(this,i,e)
})
},html:function(e){return aB(this,function(b9){var b8=this[0]||{},b7=0,b6=this.length;
if(b9===undefined){return b8.nodeType===1?b8.innerHTML.replace(aD,""):undefined
}if(typeof b9==="string"&&!an.test(b9)&&(C.htmlSerialize||!L.test(b9))&&(C.leadingWhitespace||!b5.test(b9))&&!V[(o.exec(b9)||["",""])[1].toLowerCase()]){b9=b9.replace(aH,"<$1></$2>");
try{for(;
b7<b6;
b7++){b8=this[b7]||{};
if(b8.nodeType===1){bI.cleanData(l(b8,false));
b8.innerHTML=b9
}}b8=0
}catch(ca){}}if(b8){this.empty().append(b9)
}},null,e,arguments.length)
},replaceWith:function(){var e=arguments[0];
this.domManip(arguments,function(i){e=this.parentNode;
bI.cleanData(l(this));
if(e){e.replaceChild(i,this)
}});
return e&&(e.length||e.nodeType)?this:this.remove()
},detach:function(e){return this.remove(e,true)
},domManip:function(cd,ci){cd=az.apply([],cd);
var cb,b7,e,b9,cg,cc,ca=0,b8=this.length,cf=this,ch=b8-1,ce=cd[0],b6=bI.isFunction(ce);
if(b6||(b8>1&&typeof ce==="string"&&!C.checkClone&&bW.test(ce))){return this.each(function(cj){var i=cf.eq(cj);
if(b6){cd[0]=ce.call(this,cj,i.html())
}i.domManip(cd,ci)
})
}if(b8){cc=bI.buildFragment(cd,this[0].ownerDocument,false,this);
cb=cc.firstChild;
if(cc.childNodes.length===1){cc=cb
}if(cb){b9=bI.map(l(cc,"script"),t);
e=b9.length;
for(;
ca<b8;
ca++){b7=cc;
if(ca!==ch){b7=bI.clone(b7,true,true);
if(e){bI.merge(b9,l(b7,"script"))
}}ci.call(this[ca],b7,ca)
}if(e){cg=b9[b9.length-1].ownerDocument;
bI.map(b9,bf);
for(ca=0;
ca<e;
ca++){b7=b9[ca];
if(bB.test(b7.type||"")&&!bI._data(b7,"globalEval")&&bI.contains(cg,b7)){if(b7.src){if(bI._evalUrl){bI._evalUrl(b7.src)
}}else{bI.globalEval((b7.text||b7.textContent||b7.innerHTML||"").replace(aO,""))
}}}}cc=cb=null
}}return this
}});
bI.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,i){bI.fn[e]=function(b6){var b7,b9=0,b8=[],cb=bI(b6),ca=cb.length-1;
for(;
b9<=ca;
b9++){b7=b9===ca?this:this.clone(true);
bI(cb[b9])[i](b7);
w.apply(b8,b7.get())
}return this.pushStack(b8)
}
});
var aI,bl={};
function a4(e,b7){var i=bI(b7.createElement(e)).appendTo(b7.body),b6=a5.getDefaultComputedStyle?a5.getDefaultComputedStyle(i[0]).display:bI.css(i[0],"display");
i.detach();
return b6
}function a0(b6){var i=n,e=bl[b6];
if(!e){e=a4(b6,i);
if(e==="none"||!e){aI=(aI||bI("<iframe frameborder='0' width='0' height='0'/>")).appendTo(i.documentElement);
i=(aI[0].contentWindow||aI[0].contentDocument).document;
i.write();
i.close();
e=a4(b6,i);
aI.detach()
}bl[b6]=e
}return e
}(function(){var e,b6,b7=n.createElement("div"),i="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
b7.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
e=b7.getElementsByTagName("a")[0];
e.style.cssText="float:left;opacity:.5";
C.opacity=/^0.5/.test(e.style.opacity);
C.cssFloat=!!e.style.cssFloat;
b7.style.backgroundClip="content-box";
b7.cloneNode(true).style.backgroundClip="";
C.clearCloneStyle=b7.style.backgroundClip==="content-box";
e=b7=null;
C.shrinkWrapBlocks=function(){var b8,b9,cb,ca;
if(b6==null){b8=n.getElementsByTagName("body")[0];
if(!b8){return
}ca="border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
b9=n.createElement("div");
cb=n.createElement("div");
b8.appendChild(b9).appendChild(cb);
b6=false;
if(typeof cb.style.zoom!==aC){cb.style.cssText=i+";width:1px;padding:1px;zoom:1";
cb.innerHTML="<div></div>";
cb.firstChild.style.width="5px";
b6=cb.offsetWidth!==3
}b8.removeChild(b9);
b8=b9=cb=null
}return b6
}
})();
var aZ=(/^margin/);
var X=new RegExp("^("+aE+")(?!px)[a-z%]+$","i");
var bq,F,bo=/^(top|right|bottom|left)$/;
if(a5.getComputedStyle){bq=function(e){return e.ownerDocument.defaultView.getComputedStyle(e,null)
};
F=function(cb,i,ca){var b8,b7,b9,e,b6=cb.style;
ca=ca||bq(cb);
e=ca?ca.getPropertyValue(i)||ca[i]:undefined;
if(ca){if(e===""&&!bI.contains(cb.ownerDocument,cb)){e=bI.style(cb,i)
}if(X.test(e)&&aZ.test(i)){b8=b6.width;
b7=b6.minWidth;
b9=b6.maxWidth;
b6.minWidth=b6.maxWidth=b6.width=e;
e=ca.width;
b6.width=b8;
b6.minWidth=b7;
b6.maxWidth=b9
}}return e===undefined?e:e+""
}
}else{if(n.documentElement.currentStyle){bq=function(e){return e.currentStyle
};
F=function(ca,b7,b9){var cb,i,e,b6,b8=ca.style;
b9=b9||bq(ca);
b6=b9?b9[b7]:undefined;
if(b6==null&&b8&&b8[b7]){b6=b8[b7]
}if(X.test(b6)&&!bo.test(b7)){cb=b8.left;
i=ca.runtimeStyle;
e=i&&i.left;
if(e){i.left=ca.currentStyle.left
}b8.left=b7==="fontSize"?"1em":b6;
b6=b8.pixelLeft+"px";
b8.left=cb;
if(e){i.left=e
}}return b6===undefined?b6:b6+""||"auto"
}
}}function a7(e,i){return{get:function(){var b6=e();
if(b6==null){return
}if(b6){delete this.get;
return
}return(this.get=i).apply(this,arguments)
}}
}(function(){var cb,cd,b6,ca,b9,cc,i=n.createElement("div"),e="border:0;width:0;height:0;position:absolute;top:0;left:-9999px",b8="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
i.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
cb=i.getElementsByTagName("a")[0];
cb.style.cssText="float:left;opacity:.5";
C.opacity=/^0.5/.test(cb.style.opacity);
C.cssFloat=!!cb.style.cssFloat;
i.style.backgroundClip="content-box";
i.cloneNode(true).style.backgroundClip="";
C.clearCloneStyle=i.style.backgroundClip==="content-box";
cb=i=null;
bI.extend(C,{reliableHiddenOffsets:function(){if(cd!=null){return cd
}var cf,ch,cg,ci=n.createElement("div"),ce=n.getElementsByTagName("body")[0];
if(!ce){return
}ci.setAttribute("className","t");
ci.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
cf=n.createElement("div");
cf.style.cssText=e;
ce.appendChild(cf).appendChild(ci);
ci.innerHTML="<table><tr><td></td><td>t</td></tr></table>";
ch=ci.getElementsByTagName("td");
ch[0].style.cssText="padding:0;margin:0;border:0;display:none";
cg=(ch[0].offsetHeight===0);
ch[0].style.display="";
ch[1].style.display="none";
cd=cg&&(ch[0].offsetHeight===0);
ce.removeChild(cf);
ci=ce=null;
return cd
},boxSizing:function(){if(b6==null){b7()
}return b6
},boxSizingReliable:function(){if(ca==null){b7()
}return ca
},pixelPosition:function(){if(b9==null){b7()
}return b9
},reliableMarginRight:function(){var ce,cf,ch,cg;
if(cc==null&&a5.getComputedStyle){ce=n.getElementsByTagName("body")[0];
if(!ce){return
}cf=n.createElement("div");
ch=n.createElement("div");
cf.style.cssText=e;
ce.appendChild(cf).appendChild(ch);
cg=ch.appendChild(n.createElement("div"));
cg.style.cssText=ch.style.cssText=b8;
cg.style.marginRight=cg.style.width="0";
ch.style.width="1px";
cc=!parseFloat((a5.getComputedStyle(cg,null)||{}).marginRight);
ce.removeChild(cf)
}return cc
}});
function b7(){var cf,cg,ce=n.getElementsByTagName("body")[0];
if(!ce){return
}cf=n.createElement("div");
cg=n.createElement("div");
cf.style.cssText=e;
ce.appendChild(cf).appendChild(cg);
cg.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%";
bI.swap(ce,ce.style.zoom!=null?{zoom:1}:{},function(){b6=cg.offsetWidth===4
});
ca=true;
b9=false;
cc=true;
if(a5.getComputedStyle){b9=(a5.getComputedStyle(cg,null)||{}).top!=="1%";
ca=(a5.getComputedStyle(cg,null)||{width:"4px"}).width==="4px"
}ce.removeChild(cf);
cg=ce=null
}})();
bI.swap=function(b9,b8,ca,b7){var b6,i,e={};
for(i in b8){e[i]=b9.style[i];
b9.style[i]=b8[i]
}b6=ca.apply(b9,b7||[]);
for(i in b8){b9.style[i]=e[i]
}return b6
};
var bj=/alpha\([^)]*\)/i,aU=/opacity\s*=\s*([^)]*)/,G=/^(none|table(?!-c[ea]).+)/,bb=new RegExp("^("+aE+")(.*)$","i"),U=new RegExp("^([+-])=("+aE+")","i"),be={position:"absolute",visibility:"hidden",display:"block"},bD={letterSpacing:0,fontWeight:400},aw=["Webkit","O","Moz","ms"];
function c(b8,b6){if(b6 in b8){return b6
}var b9=b6.charAt(0).toUpperCase()+b6.slice(1),e=b6,b7=aw.length;
while(b7--){b6=aw[b7]+b9;
if(b6 in b8){return b6
}}return e
}function r(ca,e){var cb,b8,b9,i=[],b6=0,b7=ca.length;
for(;
b6<b7;
b6++){b8=ca[b6];
if(!b8.style){continue
}i[b6]=bI._data(b8,"olddisplay");
cb=b8.style.display;
if(e){if(!i[b6]&&cb==="none"){b8.style.display=""
}if(b8.style.display===""&&R(b8)){i[b6]=bI._data(b8,"olddisplay",a0(b8.nodeName))
}}else{if(!i[b6]){b9=R(b8);
if(cb&&cb!=="none"||!b9){bI._data(b8,"olddisplay",b9?cb:bI.css(b8,"display"))
}}}}for(b6=0;
b6<b7;
b6++){b8=ca[b6];
if(!b8.style){continue
}if(!e||b8.style.display==="none"||b8.style.display===""){b8.style.display=e?i[b6]||"":"none"
}}return ca
}function aN(e,b6,b7){var i=bb.exec(b6);
return i?Math.max(0,i[1]-(b7||0))+(i[2]||"px"):b6
}function ax(b9,b6,e,cb,b8){var b7=e===(cb?"border":"content")?4:b6==="width"?1:0,ca=0;
for(;
b7<4;
b7+=2){if(e==="margin"){ca+=bI.css(b9,e+bT[b7],true,b8)
}if(cb){if(e==="content"){ca-=bI.css(b9,"padding"+bT[b7],true,b8)
}if(e!=="margin"){ca-=bI.css(b9,"border"+bT[b7]+"Width",true,b8)
}}else{ca+=bI.css(b9,"padding"+bT[b7],true,b8);
if(e!=="padding"){ca+=bI.css(b9,"border"+bT[b7]+"Width",true,b8)
}}}return ca
}function u(b8,i,e){var b7=true,b9=i==="width"?b8.offsetWidth:b8.offsetHeight,b6=bq(b8),ca=C.boxSizing()&&bI.css(b8,"boxSizing",false,b6)==="border-box";
if(b9<=0||b9==null){b9=F(b8,i,b6);
if(b9<0||b9==null){b9=b8.style[i]
}if(X.test(b9)){return b9
}b7=ca&&(C.boxSizingReliable()||b9===b8.style[i]);
b9=parseFloat(b9)||0
}return(b9+ax(b8,i,e||(ca?"border":"content"),b7,b6))+"px"
}bI.extend({cssHooks:{opacity:{get:function(b6,i){if(i){var e=F(b6,"opacity");
return e===""?"1":e
}}}},cssNumber:{columnCount:true,fillOpacity:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":C.cssFloat?"cssFloat":"styleFloat"},style:function(b7,b6,cd,b8){if(!b7||b7.nodeType===3||b7.nodeType===8||!b7.style){return
}var cb,cc,ce,b9=bI.camelCase(b6),i=b7.style;
b6=bI.cssProps[b9]||(bI.cssProps[b9]=c(i,b9));
ce=bI.cssHooks[b6]||bI.cssHooks[b9];
if(cd!==undefined){cc=typeof cd;
if(cc==="string"&&(cb=U.exec(cd))){cd=(cb[1]+1)*cb[2]+parseFloat(bI.css(b7,b6));
cc="number"
}if(cd==null||cd!==cd){return
}if(cc==="number"&&!bI.cssNumber[b9]){cd+="px"
}if(!C.clearCloneStyle&&cd===""&&b6.indexOf("background")===0){i[b6]="inherit"
}if(!ce||!("set" in ce)||(cd=ce.set(b7,cd,b8))!==undefined){try{i[b6]="";
i[b6]=cd
}catch(ca){}}}else{if(ce&&"get" in ce&&(cb=ce.get(b7,false,b8))!==undefined){return cb
}return i[b6]
}},css:function(ca,b8,i,b9){var b7,cb,e,b6=bI.camelCase(b8);
b8=bI.cssProps[b6]||(bI.cssProps[b6]=c(ca.style,b6));
e=bI.cssHooks[b8]||bI.cssHooks[b6];
if(e&&"get" in e){cb=e.get(ca,true,i)
}if(cb===undefined){cb=F(ca,b8,b9)
}if(cb==="normal"&&b8 in bD){cb=bD[b8]
}if(i===""||i){b7=parseFloat(cb);
return i===true||bI.isNumeric(b7)?b7||0:cb
}return cb
}});
bI.each(["height","width"],function(b6,e){bI.cssHooks[e]={get:function(b8,b7,i){if(b7){return b8.offsetWidth===0&&G.test(bI.css(b8,"display"))?bI.swap(b8,be,function(){return u(b8,e,i)
}):u(b8,e,i)
}},set:function(b8,b9,i){var b7=i&&bq(b8);
return aN(b8,b9,i?ax(b8,e,i,C.boxSizing()&&bI.css(b8,"boxSizing",false,b7)==="border-box",b7):0)
}}
});
if(!C.opacity){bI.cssHooks.opacity={get:function(i,e){return aU.test((e&&i.currentStyle?i.currentStyle.filter:i.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":e?"1":""
},set:function(b8,b9){var b7=b8.style,i=b8.currentStyle,e=bI.isNumeric(b9)?"alpha(opacity="+b9*100+")":"",b6=i&&i.filter||b7.filter||"";
b7.zoom=1;
if((b9>=1||b9==="")&&bI.trim(b6.replace(bj,""))===""&&b7.removeAttribute){b7.removeAttribute("filter");
if(b9===""||i&&!i.filter){return
}}b7.filter=bj.test(b6)?b6.replace(bj,e):b6+" "+e
}}
}bI.cssHooks.marginRight=a7(C.reliableMarginRight,function(i,e){if(e){return bI.swap(i,{display:"inline-block"},F,[i,"marginRight"])
}});
bI.each({margin:"",padding:"",border:"Width"},function(e,i){bI.cssHooks[e+i]={expand:function(b8){var b7=0,b6={},b9=typeof b8==="string"?b8.split(" "):[b8];
for(;
b7<4;
b7++){b6[e+bT[b7]+i]=b9[b7]||b9[b7-2]||b9[0]
}return b6
}};
if(!aZ.test(e)){bI.cssHooks[e+i].set=aN
}});
bI.fn.extend({css:function(e,i){return aB(this,function(ca,b7,cb){var b9,b6,cc={},b8=0;
if(bI.isArray(b7)){b9=bq(ca);
b6=b7.length;
for(;
b8<b6;
b8++){cc[b7[b8]]=bI.css(ca,b7[b8],false,b9)
}return cc
}return cb!==undefined?bI.style(ca,b7,cb):bI.css(ca,b7)
},e,i,arguments.length>1)
},show:function(){return r(this,true)
},hide:function(){return r(this)
},toggle:function(e){if(typeof e==="boolean"){return e?this.show():this.hide()
}return this.each(function(){if(R(this)){bI(this).show()
}else{bI(this).hide()
}})
}});
function I(b6,i,b8,e,b7){return new I.prototype.init(b6,i,b8,e,b7)
}bI.Tween=I;
I.prototype={constructor:I,init:function(b7,i,b9,e,b8,b6){this.elem=b7;
this.prop=b9;
this.easing=b8||"swing";
this.options=i;
this.start=this.now=this.cur();
this.end=e;
this.unit=b6||(bI.cssNumber[b9]?"":"px")
},cur:function(){var e=I.propHooks[this.prop];
return e&&e.get?e.get(this):I.propHooks._default.get(this)
},run:function(b6){var i,e=I.propHooks[this.prop];
if(this.options.duration){this.pos=i=bI.easing[this.easing](b6,this.options.duration*b6,0,1,this.options.duration)
}else{this.pos=i=b6
}this.now=(this.end-this.start)*i+this.start;
if(this.options.step){this.options.step.call(this.elem,this.now,this)
}if(e&&e.set){e.set(this)
}else{I.propHooks._default.set(this)
}return this
}};
I.prototype.init.prototype=I.prototype;
I.propHooks={_default:{get:function(i){var e;
if(i.elem[i.prop]!=null&&(!i.elem.style||i.elem.style[i.prop]==null)){return i.elem[i.prop]
}e=bI.css(i.elem,i.prop,"");
return !e||e==="auto"?0:e
},set:function(e){if(bI.fx.step[e.prop]){bI.fx.step[e.prop](e)
}else{if(e.elem.style&&(e.elem.style[bI.cssProps[e.prop]]!=null||bI.cssHooks[e.prop])){bI.style(e.elem,e.prop,e.now+e.unit)
}else{e.elem[e.prop]=e.now
}}}}};
I.propHooks.scrollTop=I.propHooks.scrollLeft={set:function(e){if(e.elem.nodeType&&e.elem.parentNode){e.elem[e.prop]=e.now
}}};
bI.easing={linear:function(e){return e
},swing:function(e){return 0.5-Math.cos(e*Math.PI)/2
}};
bI.fx=I.prototype.init;
bI.fx.step={};
var M,ae,bR=/^(?:toggle|show|hide)$/,bJ=new RegExp("^(?:([+-])=|)("+aE+")([a-z%]*)$","i"),bP=/queueHooks$/,aG=[h],a2={"*":[function(e,ca){var cc=this.createTween(e,ca),b8=cc.cur(),b7=bJ.exec(ca),cb=b7&&b7[3]||(bI.cssNumber[e]?"":"px"),i=(bI.cssNumber[e]||cb!=="px"&&+b8)&&bJ.exec(bI.css(cc.elem,e)),b6=1,b9=20;
if(i&&i[3]!==cb){cb=cb||i[3];
b7=b7||[];
i=+b8||1;
do{b6=b6||".5";
i=i/b6;
bI.style(cc.elem,e,i+cb)
}while(b6!==(b6=cc.cur()/b8)&&b6!==1&&--b9)
}if(b7){i=cc.start=+i||+b8||0;
cc.unit=cb;
cc.end=b7[1]?i+(b7[1]+1)*b7[2]:+b7[2]
}return cc
}]};
function bn(){setTimeout(function(){M=undefined
});
return(M=bI.now())
}function bH(b7,b9){var b8,e={height:b7},b6=0;
b9=b9?1:0;
for(;
b6<4;
b6+=2-b9){b8=bT[b6];
e["margin"+b8]=e["padding"+b8]=b7
}if(b9){e.opacity=e.width=b7
}return e
}function bd(b8,ca,b7){var i,b9=(a2[ca]||[]).concat(a2["*"]),e=0,b6=b9.length;
for(;
e<b6;
e++){if((i=b9[e].call(b7,ca,b8))){return i
}}}function h(b7,cd,e){var b6,cf,ca,ci,cj,cg,cc,b9,b8=this,ce={},i=b7.style,cb=b7.nodeType&&R(b7),ch=bI._data(b7,"fxshow");
if(!e.queue){cj=bI._queueHooks(b7,"fx");
if(cj.unqueued==null){cj.unqueued=0;
cg=cj.empty.fire;
cj.empty.fire=function(){if(!cj.unqueued){cg()
}}
}cj.unqueued++;
b8.always(function(){b8.always(function(){cj.unqueued--;
if(!bI.queue(b7,"fx").length){cj.empty.fire()
}})
})
}if(b7.nodeType===1&&("height" in cd||"width" in cd)){e.overflow=[i.overflow,i.overflowX,i.overflowY];
cc=bI.css(b7,"display");
b9=a0(b7.nodeName);
if(cc==="none"){cc=b9
}if(cc==="inline"&&bI.css(b7,"float")==="none"){if(!C.inlineBlockNeedsLayout||b9==="inline"){i.display="inline-block"
}else{i.zoom=1
}}}if(e.overflow){i.overflow="hidden";
if(!C.shrinkWrapBlocks()){b8.always(function(){i.overflow=e.overflow[0];
i.overflowX=e.overflow[1];
i.overflowY=e.overflow[2]
})
}}for(b6 in cd){cf=cd[b6];
if(bR.exec(cf)){delete cd[b6];
ca=ca||cf==="toggle";
if(cf===(cb?"hide":"show")){if(cf==="show"&&ch&&ch[b6]!==undefined){cb=true
}else{continue
}}ce[b6]=ch&&ch[b6]||bI.style(b7,b6)
}}if(!bI.isEmptyObject(ce)){if(ch){if("hidden" in ch){cb=ch.hidden
}}else{ch=bI._data(b7,"fxshow",{})
}if(ca){ch.hidden=!cb
}if(cb){bI(b7).show()
}else{b8.done(function(){bI(b7).hide()
})
}b8.done(function(){var ck;
bI._removeData(b7,"fxshow");
for(ck in ce){bI.style(b7,ck,ce[ck])
}});
for(b6 in ce){ci=bd(cb?ch[b6]:0,b6,b8);
if(!(b6 in ch)){ch[b6]=ci.start;
if(cb){ci.end=ci.start;
ci.start=b6==="width"||b6==="height"?1:0
}}}}}function ao(b7,b9){var b6,i,ca,b8,e;
for(b6 in b7){i=bI.camelCase(b6);
ca=b9[i];
b8=b7[b6];
if(bI.isArray(b8)){ca=b8[1];
b8=b7[b6]=b8[0]
}if(b6!==i){b7[i]=b8;
delete b7[b6]
}e=bI.cssHooks[i];
if(e&&"expand" in e){b8=e.expand(b8);
delete b7[i];
for(b6 in b8){if(!(b6 in b7)){b7[b6]=b8[b6];
b9[b6]=ca
}}}else{b9[i]=ca
}}}function f(b6,ca,cd){var ce,e,b9=0,i=aG.length,cc=bI.Deferred().always(function(){delete b8.elem
}),b8=function(){if(e){return false
}var ck=M||bn(),ch=Math.max(0,b7.startTime+b7.duration-ck),cf=ch/b7.duration||0,cj=1-cf,cg=0,ci=b7.tweens.length;
for(;
cg<ci;
cg++){b7.tweens[cg].run(cj)
}cc.notifyWith(b6,[b7,cj,ch]);
if(cj<1&&ci){return ch
}else{cc.resolveWith(b6,[b7]);
return false
}},b7=cc.promise({elem:b6,props:bI.extend({},ca),opts:bI.extend(true,{specialEasing:{}},cd),originalProperties:ca,originalOptions:cd,startTime:M||bn(),duration:cd.duration,tweens:[],createTween:function(ch,cf){var cg=bI.Tween(b6,b7.opts,ch,cf,b7.opts.specialEasing[ch]||b7.opts.easing);
b7.tweens.push(cg);
return cg
},stop:function(cg){var cf=0,ch=cg?b7.tweens.length:0;
if(e){return this
}e=true;
for(;
cf<ch;
cf++){b7.tweens[cf].run(1)
}if(cg){cc.resolveWith(b6,[b7,cg])
}else{cc.rejectWith(b6,[b7,cg])
}return this
}}),cb=b7.props;
ao(cb,b7.opts.specialEasing);
for(;
b9<i;
b9++){ce=aG[b9].call(b7,b6,cb,b7.opts);
if(ce){return ce
}}bI.map(cb,bd,b7);
if(bI.isFunction(b7.opts.start)){b7.opts.start.call(b6,b7)
}bI.fx.timer(bI.extend(b8,{elem:b6,anim:b7,queue:b7.opts.queue}));
return b7.progress(b7.opts.progress).done(b7.opts.done,b7.opts.complete).fail(b7.opts.fail).always(b7.opts.always)
}bI.Animation=bI.extend(f,{tweener:function(i,b8){if(bI.isFunction(i)){b8=i;
i=["*"]
}else{i=i.split(" ")
}var b7,e=0,b6=i.length;
for(;
e<b6;
e++){b7=i[e];
a2[b7]=a2[b7]||[];
a2[b7].unshift(b8)
}},prefilter:function(i,e){if(e){aG.unshift(i)
}else{aG.push(i)
}}});
bI.speed=function(b6,b7,i){var e=b6&&typeof b6==="object"?bI.extend({},b6):{complete:i||!i&&b7||bI.isFunction(b6)&&b6,duration:b6,easing:i&&b7||b7&&!bI.isFunction(b7)&&b7};
e.duration=bI.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in bI.fx.speeds?bI.fx.speeds[e.duration]:bI.fx.speeds._default;
if(e.queue==null||e.queue===true){e.queue="fx"
}e.old=e.complete;
e.complete=function(){if(bI.isFunction(e.old)){e.old.call(this)
}if(e.queue){bI.dequeue(this,e.queue)
}};
return e
};
bI.fn.extend({fadeTo:function(e,b7,b6,i){return this.filter(R).css("opacity",0).show().end().animate({opacity:b7},e,b6,i)
},animate:function(ca,b7,b9,b8){var b6=bI.isEmptyObject(ca),e=bI.speed(b7,b9,b8),i=function(){var cb=f(this,bI.extend({},ca),e);
if(b6||bI._data(this,"finish")){cb.stop(true)
}};
i.finish=i;
return b6||e.queue===false?this.each(i):this.queue(e.queue,i)
},stop:function(b6,i,e){var b7=function(b8){var b9=b8.stop;
delete b8.stop;
b9(e)
};
if(typeof b6!=="string"){e=i;
i=b6;
b6=undefined
}if(i&&b6!==false){this.queue(b6||"fx",[])
}return this.each(function(){var cb=true,b8=b6!=null&&b6+"queueHooks",ca=bI.timers,b9=bI._data(this);
if(b8){if(b9[b8]&&b9[b8].stop){b7(b9[b8])
}}else{for(b8 in b9){if(b9[b8]&&b9[b8].stop&&bP.test(b8)){b7(b9[b8])
}}}for(b8=ca.length;
b8--;
){if(ca[b8].elem===this&&(b6==null||ca[b8].queue===b6)){ca[b8].anim.stop(e);
cb=false;
ca.splice(b8,1)
}}if(cb||!e){bI.dequeue(this,b6)
}})
},finish:function(e){if(e!==false){e=e||"fx"
}return this.each(function(){var b7,ca=bI._data(this),b6=ca[e+"queue"],i=ca[e+"queueHooks"],b9=bI.timers,b8=b6?b6.length:0;
ca.finish=true;
bI.queue(this,e,[]);
if(i&&i.stop){i.stop.call(this,true)
}for(b7=b9.length;
b7--;
){if(b9[b7].elem===this&&b9[b7].queue===e){b9[b7].anim.stop(true);
b9.splice(b7,1)
}}for(b7=0;
b7<b8;
b7++){if(b6[b7]&&b6[b7].finish){b6[b7].finish.call(this)
}}delete ca.finish
})
}});
bI.each(["toggle","show","hide"],function(b6,e){var b7=bI.fn[e];
bI.fn[e]=function(i,b9,b8){return i==null||typeof i==="boolean"?b7.apply(this,arguments):this.animate(bH(e,true),i,b9,b8)
}
});
bI.each({slideDown:bH("show"),slideUp:bH("hide"),slideToggle:bH("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,i){bI.fn[e]=function(b6,b8,b7){return this.animate(i,b6,b8,b7)
}
});
bI.timers=[];
bI.fx.tick=function(){var b7,b6=bI.timers,e=0;
M=bI.now();
for(;
e<b6.length;
e++){b7=b6[e];
if(!b7()&&b6[e]===b7){b6.splice(e--,1)
}}if(!b6.length){bI.fx.stop()
}M=undefined
};
bI.fx.timer=function(e){bI.timers.push(e);
if(e()){bI.fx.start()
}else{bI.timers.pop()
}};
bI.fx.interval=13;
bI.fx.start=function(){if(!ae){ae=setInterval(bI.fx.tick,bI.fx.interval)
}};
bI.fx.stop=function(){clearInterval(ae);
ae=null
};
bI.fx.speeds={slow:600,fast:200,_default:400};
bI.fn.delay=function(i,e){i=bI.fx?bI.fx.speeds[i]||i:i;
e=e||"fx";
return this.queue(e,function(b7,b6){var b8=setTimeout(b7,i);
b6.stop=function(){clearTimeout(b8)
}
})
};
(function(){var i,b6,e,b7,b8=n.createElement("div");
b8.setAttribute("className","t");
b8.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
i=b8.getElementsByTagName("a")[0];
e=n.createElement("select");
b7=e.appendChild(n.createElement("option"));
b6=b8.getElementsByTagName("input")[0];
i.style.cssText="top:1px";
C.getSetAttribute=b8.className!=="t";
C.style=/top/.test(i.getAttribute("style"));
C.hrefNormalized=i.getAttribute("href")==="/a";
C.checkOn=!!b6.value;
C.optSelected=b7.selected;
C.enctype=!!n.createElement("form").enctype;
e.disabled=true;
C.optDisabled=!b7.disabled;
b6=n.createElement("input");
b6.setAttribute("value","");
C.input=b6.getAttribute("value")==="";
b6.value="t";
b6.setAttribute("type","radio");
C.radioValue=b6.value==="t";
i=b6=e=b7=b8=null
})();
var al=/\r/g;
bI.fn.extend({val:function(b7){var e,i,b8,b6=this[0];
if(!arguments.length){if(b6){e=bI.valHooks[b6.type]||bI.valHooks[b6.nodeName.toLowerCase()];
if(e&&"get" in e&&(i=e.get(b6,"value"))!==undefined){return i
}i=b6.value;
return typeof i==="string"?i.replace(al,""):i==null?"":i
}return
}b8=bI.isFunction(b7);
return this.each(function(b9){var ca;
if(this.nodeType!==1){return
}if(b8){ca=b7.call(this,b9,bI(this).val())
}else{ca=b7
}if(ca==null){ca=""
}else{if(typeof ca==="number"){ca+=""
}else{if(bI.isArray(ca)){ca=bI.map(ca,function(cb){return cb==null?"":cb+""
})
}}}e=bI.valHooks[this.type]||bI.valHooks[this.nodeName.toLowerCase()];
if(!e||!("set" in e)||e.set(this,ca,"value")===undefined){this.value=ca
}})
}});
bI.extend({valHooks:{option:{get:function(e){var i=bI.find.attr(e,"value");
return i!=null?i:bI.text(e)
}},select:{get:function(e){var cb,b7,cd=e.options,b9=e.selectedIndex,b8=e.type==="select-one"||b9<0,cc=b8?null:[],ca=b8?b9+1:cd.length,b6=b9<0?ca:b8?b9:0;
for(;
b6<ca;
b6++){b7=cd[b6];
if((b7.selected||b6===b9)&&(C.optDisabled?!b7.disabled:b7.getAttribute("disabled")===null)&&(!b7.parentNode.disabled||!bI.nodeName(b7.parentNode,"optgroup"))){cb=bI(b7).val();
if(b8){return cb
}cc.push(cb)
}}return cc
},set:function(ca,cb){var cc,b9,b7=ca.options,e=bI.makeArray(cb),b8=b7.length;
while(b8--){b9=b7[b8];
if(bI.inArray(bI.valHooks.option.get(b9),e)>=0){try{b9.selected=cc=true
}catch(b6){b9.scrollHeight
}}else{b9.selected=false
}}if(!cc){ca.selectedIndex=-1
}return b7
}}}});
bI.each(["radio","checkbox"],function(){bI.valHooks[this]={set:function(e,i){if(bI.isArray(i)){return(e.checked=bI.inArray(bI(e).val(),i)>=0)
}}};
if(!C.checkOn){bI.valHooks[this].get=function(e){return e.getAttribute("value")===null?"on":e.value
}
}});
var ba,b3,bO=bI.expr.attrHandle,aq=/^(?:checked|selected)$/i,bN=C.getSetAttribute,bF=C.input;
bI.fn.extend({attr:function(e,i){return aB(this,bI.attr,e,i,arguments.length>1)
},removeAttr:function(e){return this.each(function(){bI.removeAttr(this,e)
})
}});
bI.extend({attr:function(b8,b7,b9){var e,b6,i=b8.nodeType;
if(!b8||i===3||i===8||i===2){return
}if(typeof b8.getAttribute===aC){return bI.prop(b8,b7,b9)
}if(i!==1||!bI.isXMLDoc(b8)){b7=b7.toLowerCase();
e=bI.attrHooks[b7]||(bI.expr.match.bool.test(b7)?b3:ba)
}if(b9!==undefined){if(b9===null){bI.removeAttr(b8,b7)
}else{if(e&&"set" in e&&(b6=e.set(b8,b9,b7))!==undefined){return b6
}else{b8.setAttribute(b7,b9+"");
return b9
}}}else{if(e&&"get" in e&&(b6=e.get(b8,b7))!==null){return b6
}else{b6=bI.find.attr(b8,b7);
return b6==null?undefined:b6
}}},removeAttr:function(b7,b9){var e,b8,b6=0,ca=b9&&b9.match(aF);
if(ca&&b7.nodeType===1){while((e=ca[b6++])){b8=bI.propFix[e]||e;
if(bI.expr.match.bool.test(e)){if(bF&&bN||!aq.test(e)){b7[b8]=false
}else{b7[bI.camelCase("default-"+e)]=b7[b8]=false
}}else{bI.attr(b7,e,"")
}b7.removeAttribute(bN?e:b8)
}}},attrHooks:{type:{set:function(e,i){if(!C.radioValue&&i==="radio"&&bI.nodeName(e,"input")){var b6=e.value;
e.setAttribute("type",i);
if(b6){e.value=b6
}return i
}}}}});
b3={set:function(i,b6,e){if(b6===false){bI.removeAttr(i,e)
}else{if(bF&&bN||!aq.test(e)){i.setAttribute(!bN&&bI.propFix[e]||e,e)
}else{i[bI.camelCase("default-"+e)]=i[e]=true
}}return e
}};
bI.each(bI.expr.match.bool.source.match(/\w+/g),function(b7,b6){var e=bO[b6]||bI.find.attr;
bO[b6]=bF&&bN||!aq.test(b6)?function(b9,b8,cb){var i,ca;
if(!cb){ca=bO[b8];
bO[b8]=i;
i=e(b9,b8,cb)!=null?b8.toLowerCase():null;
bO[b8]=ca
}return i
}:function(b8,i,b9){if(!b9){return b8[bI.camelCase("default-"+i)]?i.toLowerCase():null
}}
});
if(!bF||!bN){bI.attrHooks.value={set:function(i,b6,e){if(bI.nodeName(i,"input")){i.defaultValue=b6
}else{return ba&&ba.set(i,b6,e)
}}}
}if(!bN){ba={set:function(b6,b7,i){var e=b6.getAttributeNode(i);
if(!e){b6.setAttributeNode((e=b6.ownerDocument.createAttribute(i)))
}e.value=b7+="";
if(i==="value"||b7===b6.getAttribute(i)){return b7
}}};
bO.id=bO.name=bO.coords=function(b6,i,b7){var e;
if(!b7){return(e=b6.getAttributeNode(i))&&e.value!==""?e.value:null
}};
bI.valHooks.button={get:function(b6,i){var e=b6.getAttributeNode(i);
if(e&&e.specified){return e.value
}},set:ba.set};
bI.attrHooks.contenteditable={set:function(i,b6,e){ba.set(i,b6===""?false:b6,e)
}};
bI.each(["width","height"],function(b6,e){bI.attrHooks[e]={set:function(i,b7){if(b7===""){i.setAttribute(e,"auto");
return b7
}}}
})
}if(!C.style){bI.attrHooks.style={get:function(e){return e.style.cssText||undefined
},set:function(e,i){return(e.style.cssText=i+"")
}}
}var aJ=/^(?:input|select|textarea|button|object)$/i,E=/^(?:a|area)$/i;
bI.fn.extend({prop:function(e,i){return aB(this,bI.prop,e,i,arguments.length>1)
},removeProp:function(e){e=bI.propFix[e]||e;
return this.each(function(){try{this[e]=undefined;
delete this[e]
}catch(i){}})
}});
bI.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(b9,b7,ca){var b6,e,b8,i=b9.nodeType;
if(!b9||i===3||i===8||i===2){return
}b8=i!==1||!bI.isXMLDoc(b9);
if(b8){b7=bI.propFix[b7]||b7;
e=bI.propHooks[b7]
}if(ca!==undefined){return e&&"set" in e&&(b6=e.set(b9,ca,b7))!==undefined?b6:(b9[b7]=ca)
}else{return e&&"get" in e&&(b6=e.get(b9,b7))!==null?b6:b9[b7]
}},propHooks:{tabIndex:{get:function(i){var e=bI.find.attr(i,"tabindex");
return e?parseInt(e,10):aJ.test(i.nodeName)||E.test(i.nodeName)&&i.href?0:-1
}}}});
if(!C.hrefNormalized){bI.each(["href","src"],function(b6,e){bI.propHooks[e]={get:function(i){return i.getAttribute(e,4)
}}
})
}if(!C.optSelected){bI.propHooks.selected={get:function(i){var e=i.parentNode;
if(e){e.selectedIndex;
if(e.parentNode){e.parentNode.selectedIndex
}}return null
}}
}bI.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){bI.propFix[this.toLowerCase()]=this
});
if(!C.enctype){bI.propFix.enctype="encoding"
}var bL=/[\t\r\n\f]/g;
bI.fn.extend({addClass:function(cd){var b7,b6,ce,cb,b8,e,b9=0,ca=this.length,cc=typeof cd==="string"&&cd;
if(bI.isFunction(cd)){return this.each(function(i){bI(this).addClass(cd.call(this,i,this.className))
})
}if(cc){b7=(cd||"").match(aF)||[];
for(;
b9<ca;
b9++){b6=this[b9];
ce=b6.nodeType===1&&(b6.className?(" "+b6.className+" ").replace(bL," "):" ");
if(ce){b8=0;
while((cb=b7[b8++])){if(ce.indexOf(" "+cb+" ")<0){ce+=cb+" "
}}e=bI.trim(ce);
if(b6.className!==e){b6.className=e
}}}}return this
},removeClass:function(cd){var b7,b6,ce,cb,b8,e,b9=0,ca=this.length,cc=arguments.length===0||typeof cd==="string"&&cd;
if(bI.isFunction(cd)){return this.each(function(i){bI(this).removeClass(cd.call(this,i,this.className))
})
}if(cc){b7=(cd||"").match(aF)||[];
for(;
b9<ca;
b9++){b6=this[b9];
ce=b6.nodeType===1&&(b6.className?(" "+b6.className+" ").replace(bL," "):"");
if(ce){b8=0;
while((cb=b7[b8++])){while(ce.indexOf(" "+cb+" ")>=0){ce=ce.replace(" "+cb+" "," ")
}}e=cd?bI.trim(ce):"";
if(b6.className!==e){b6.className=e
}}}}return this
},toggleClass:function(b6,e){var i=typeof b6;
if(typeof e==="boolean"&&i==="string"){return e?this.addClass(b6):this.removeClass(b6)
}if(bI.isFunction(b6)){return this.each(function(b7){bI(this).toggleClass(b6.call(this,b7,this.className,e),e)
})
}return this.each(function(){if(i==="string"){var b9,b8=0,b7=bI(this),ca=b6.match(aF)||[];
while((b9=ca[b8++])){if(b7.hasClass(b9)){b7.removeClass(b9)
}else{b7.addClass(b9)
}}}else{if(i===aC||i==="boolean"){if(this.className){bI._data(this,"__className__",this.className)
}this.className=this.className||b6===false?"":bI._data(this,"__className__")||""
}}})
},hasClass:function(e){var b8=" "+e+" ",b7=0,b6=this.length;
for(;
b7<b6;
b7++){if(this[b7].nodeType===1&&(" "+this[b7].className+" ").replace(bL," ").indexOf(b8)>=0){return true
}}return false
}});
bI.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(b6,e){bI.fn[e]=function(b7,i){return arguments.length>0?this.on(e,null,b7,i):this.trigger(e)
}
});
bI.fn.extend({hover:function(e,i){return this.mouseenter(e).mouseleave(i||e)
},bind:function(e,b6,i){return this.on(e,null,b6,i)
},unbind:function(e,i){return this.off(e,null,i)
},delegate:function(e,i,b7,b6){return this.on(i,e,b7,b6)
},undelegate:function(e,i,b6){return arguments.length===1?this.off(e,"**"):this.off(i,e||"**",b6)
}});
var bp=bI.now();
var bQ=(/\?/);
var a1=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
bI.parseJSON=function(e){if(a5.JSON&&a5.JSON.parse){return a5.JSON.parse(e+"")
}var b7,b6=null,i=bI.trim(e+"");
return i&&!bI.trim(i.replace(a1,function(ca,b8,b9,cb){if(b7&&b8){b6=0
}if(b6===0){return ca
}b7=b9||b8;
b6+=!cb-!b9;
return""
}))?(Function("return "+i))():bI.error("Invalid JSON: "+e)
};
bI.parseXML=function(b7){var i,b6;
if(!b7||typeof b7!=="string"){return null
}try{if(a5.DOMParser){b6=new DOMParser();
i=b6.parseFromString(b7,"text/xml")
}else{i=new ActiveXObject("Microsoft.XMLDOM");
i.async="false";
i.loadXML(b7)
}}catch(b8){i=undefined
}if(!i||!i.documentElement||i.getElementsByTagName("parsererror").length){bI.error("Invalid XML: "+b7)
}return i
};
var b4,aa,ap=/#.*$/,Q=/([?&])_=[^&]*/,ah=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,B=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,q=/^(?:GET|HEAD)$/,aK=/^\/\//,aV=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,v={},a9={},aX="*/".concat("*");
try{aa=location.href
}catch(bi){aa=n.createElement("a");
aa.href="";
aa=aa.href
}b4=aV.exec(aa.toLowerCase())||[];
function bK(e){return function(b9,ca){if(typeof b9!=="string"){ca=b9;
b9="*"
}var b6,b7=0,b8=b9.toLowerCase().match(aF)||[];
if(bI.isFunction(ca)){while((b6=b8[b7++])){if(b6.charAt(0)==="+"){b6=b6.slice(1)||"*";
(e[b6]=e[b6]||[]).unshift(ca)
}else{(e[b6]=e[b6]||[]).push(ca)
}}}}
}function p(e,b6,ca,b7){var i={},b8=(e===a9);
function b9(cb){var cc;
i[cb]=true;
bI.each(e[cb]||[],function(ce,cd){var cf=cd(b6,ca,b7);
if(typeof cf==="string"&&!b8&&!i[cf]){b6.dataTypes.unshift(cf);
b9(cf);
return false
}else{if(b8){return !(cc=cf)
}}});
return cc
}return b9(b6.dataTypes[0])||!i["*"]&&b9("*")
}function s(b6,b7){var e,i,b8=bI.ajaxSettings.flatOptions||{};
for(i in b7){if(b7[i]!==undefined){(b8[i]?b6:(e||(e={})))[i]=b7[i]
}}if(e){bI.extend(true,b6,e)
}return b6
}function g(cc,cb,b8){var e,b7,b6,b9,i=cc.contents,ca=cc.dataTypes;
while(ca[0]==="*"){ca.shift();
if(b7===undefined){b7=cc.mimeType||cb.getResponseHeader("Content-Type")
}}if(b7){for(b9 in i){if(i[b9]&&i[b9].test(b7)){ca.unshift(b9);
break
}}}if(ca[0] in b8){b6=ca[0]
}else{for(b9 in b8){if(!ca[0]||cc.converters[b9+" "+ca[0]]){b6=b9;
break
}if(!e){e=b9
}}b6=b6||e
}if(b6){if(b6!==ca[0]){ca.unshift(b6)
}return b8[b6]
}}function ag(cg,b8,cd,b6){var i,cb,ce,b9,b7,cf={},cc=cg.dataTypes.slice();
if(cc[1]){for(ce in cg.converters){cf[ce.toLowerCase()]=cg.converters[ce]
}}cb=cc.shift();
while(cb){if(cg.responseFields[cb]){cd[cg.responseFields[cb]]=b8
}if(!b7&&b6&&cg.dataFilter){b8=cg.dataFilter(b8,cg.dataType)
}b7=cb;
cb=cc.shift();
if(cb){if(cb==="*"){cb=b7
}else{if(b7!=="*"&&b7!==cb){ce=cf[b7+" "+cb]||cf["* "+cb];
if(!ce){for(i in cf){b9=i.split(" ");
if(b9[1]===cb){ce=cf[b7+" "+b9[0]]||cf["* "+b9[0]];
if(ce){if(ce===true){ce=cf[i]
}else{if(cf[i]!==true){cb=b9[0];
cc.unshift(b9[1])
}}break
}}}}if(ce!==true){if(ce&&cg["throws"]){b8=ce(b8)
}else{try{b8=ce(b8)
}catch(ca){return{state:"parsererror",error:ce?ca:"No conversion from "+b7+" to "+cb}
}}}}}}}return{state:"success",data:b8}
}bI.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:aa,type:"GET",isLocal:B.test(b4[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":aX,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":true,"text json":bI.parseJSON,"text xml":bI.parseXML},flatOptions:{url:true,context:true}},ajaxSetup:function(i,e){return e?s(s(i,bI.ajaxSettings),e):s(bI.ajaxSettings,i)
},ajaxPrefilter:bK(v),ajaxTransport:bK(a9),ajax:function(ca,b7){if(typeof ca==="object"){b7=ca;
ca=undefined
}b7=b7||{};
var cj,cl,cb,cq,cf,b6,cm,b8,ce=bI.ajaxSetup({},b7),cs=ce.context||ce,ch=ce.context&&(cs.nodeType||cs.jquery)?bI(cs):bI.event,cr=bI.Deferred(),co=bI.Callbacks("once memory"),cc=ce.statusCode||{},ci={},cp={},b9=0,cd="canceled",ck={readyState:0,getResponseHeader:function(i){var e;
if(b9===2){if(!b8){b8={};
while((e=ah.exec(cq))){b8[e[1].toLowerCase()]=e[2]
}}e=b8[i.toLowerCase()]
}return e==null?null:e
},getAllResponseHeaders:function(){return b9===2?cq:null
},setRequestHeader:function(i,ct){var e=i.toLowerCase();
if(!b9){i=cp[e]=cp[e]||i;
ci[i]=ct
}return this
},overrideMimeType:function(e){if(!b9){ce.mimeType=e
}return this
},statusCode:function(i){var e;
if(i){if(b9<2){for(e in i){cc[e]=[cc[e],i[e]]
}}else{ck.always(i[ck.status])
}}return this
},abort:function(i){var e=i||cd;
if(cm){cm.abort(e)
}cg(0,e);
return this
}};
cr.promise(ck).complete=co.add;
ck.success=ck.done;
ck.error=ck.fail;
ce.url=((ca||ce.url||aa)+"").replace(ap,"").replace(aK,b4[1]+"//");
ce.type=b7.method||b7.type||ce.method||ce.type;
ce.dataTypes=bI.trim(ce.dataType||"*").toLowerCase().match(aF)||[""];
if(ce.crossDomain==null){cj=aV.exec(ce.url.toLowerCase());
ce.crossDomain=!!(cj&&(cj[1]!==b4[1]||cj[2]!==b4[2]||(cj[3]||(cj[1]==="http:"?"80":"443"))!==(b4[3]||(b4[1]==="http:"?"80":"443"))))
}if(ce.data&&ce.processData&&typeof ce.data!=="string"){ce.data=bI.param(ce.data,ce.traditional)
}p(v,ce,b7,ck);
if(b9===2){return ck
}b6=ce.global;
if(b6&&bI.active++===0){bI.event.trigger("ajaxStart")
}ce.type=ce.type.toUpperCase();
ce.hasContent=!q.test(ce.type);
cb=ce.url;
if(!ce.hasContent){if(ce.data){cb=(ce.url+=(bQ.test(cb)?"&":"?")+ce.data);
delete ce.data
}if(ce.cache===false){ce.url=Q.test(cb)?cb.replace(Q,"$1_="+bp++):cb+(bQ.test(cb)?"&":"?")+"_="+bp++
}}if(ce.ifModified){if(bI.lastModified[cb]){ck.setRequestHeader("If-Modified-Since",bI.lastModified[cb])
}if(bI.etag[cb]){ck.setRequestHeader("If-None-Match",bI.etag[cb])
}}if(ce.data&&ce.hasContent&&ce.contentType!==false||b7.contentType){ck.setRequestHeader("Content-Type",ce.contentType)
}ck.setRequestHeader("Accept",ce.dataTypes[0]&&ce.accepts[ce.dataTypes[0]]?ce.accepts[ce.dataTypes[0]]+(ce.dataTypes[0]!=="*"?", "+aX+"; q=0.01":""):ce.accepts["*"]);
for(cl in ce.headers){ck.setRequestHeader(cl,ce.headers[cl])
}if(ce.beforeSend&&(ce.beforeSend.call(cs,ck,ce)===false||b9===2)){return ck.abort()
}cd="abort";
for(cl in {success:1,error:1,complete:1}){ck[cl](ce[cl])
}cm=p(a9,ce,b7,ck);
if(!cm){cg(-1,"No Transport")
}else{ck.readyState=1;
if(b6){ch.trigger("ajaxSend",[ck,ce])
}if(ce.async&&ce.timeout>0){cf=setTimeout(function(){ck.abort("timeout")
},ce.timeout)
}try{b9=1;
cm.send(ci,cg)
}catch(cn){if(b9<2){cg(-1,cn)
}else{throw cn
}}}function cg(cw,i,cx,cu){var e,cA,cy,cv,cz,ct=i;
if(b9===2){return
}b9=2;
if(cf){clearTimeout(cf)
}cm=undefined;
cq=cu||"";
ck.readyState=cw>0?4:0;
e=cw>=200&&cw<300||cw===304;
if(cx){cv=g(ce,ck,cx)
}cv=ag(ce,cv,ck,e);
if(e){if(ce.ifModified){cz=ck.getResponseHeader("Last-Modified");
if(cz){bI.lastModified[cb]=cz
}cz=ck.getResponseHeader("etag");
if(cz){bI.etag[cb]=cz
}}if(cw===204||ce.type==="HEAD"){ct="nocontent"
}else{if(cw===304){ct="notmodified"
}else{ct=cv.state;
cA=cv.data;
cy=cv.error;
e=!cy
}}}else{cy=ct;
if(cw||!ct){ct="error";
if(cw<0){cw=0
}}}ck.status=cw;
ck.statusText=(i||ct)+"";
if(e){cr.resolveWith(cs,[cA,ct,ck])
}else{cr.rejectWith(cs,[ck,ct,cy])
}ck.statusCode(cc);
cc=undefined;
if(b6){ch.trigger(e?"ajaxSuccess":"ajaxError",[ck,ce,e?cA:cy])
}co.fireWith(cs,[ck,ct]);
if(b6){ch.trigger("ajaxComplete",[ck,ce]);
if(!(--bI.active)){bI.event.trigger("ajaxStop")
}}}return ck
},getJSON:function(e,i,b6){return bI.get(e,i,b6,"json")
},getScript:function(e,i){return bI.get(e,undefined,i,"script")
}});
bI.each(["get","post"],function(e,b6){bI[b6]=function(i,b8,b9,b7){if(bI.isFunction(b8)){b7=b7||b9;
b9=b8;
b8=undefined
}return bI.ajax({url:i,type:b6,dataType:b7,data:b8,success:b9})
}
});
bI.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,b6){bI.fn[b6]=function(i){return this.on(b6,i)
}
});
bI._evalUrl=function(e){return bI.ajax({url:e,type:"GET",dataType:"script",async:false,global:false,"throws":true})
};
bI.fn.extend({wrapAll:function(e){if(bI.isFunction(e)){return this.each(function(b6){bI(this).wrapAll(e.call(this,b6))
})
}if(this[0]){var i=bI(e,this[0].ownerDocument).eq(0).clone(true);
if(this[0].parentNode){i.insertBefore(this[0])
}i.map(function(){var b6=this;
while(b6.firstChild&&b6.firstChild.nodeType===1){b6=b6.firstChild
}return b6
}).append(this)
}return this
},wrapInner:function(e){if(bI.isFunction(e)){return this.each(function(b6){bI(this).wrapInner(e.call(this,b6))
})
}return this.each(function(){var i=bI(this),b6=i.contents();
if(b6.length){b6.wrapAll(e)
}else{i.append(e)
}})
},wrap:function(e){var i=bI.isFunction(e);
return this.each(function(b6){bI(this).wrapAll(i?e.call(this,b6):e)
})
},unwrap:function(){return this.parent().each(function(){if(!bI.nodeName(this,"body")){bI(this).replaceWith(this.childNodes)
}}).end()
}});
bI.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0||(!C.reliableHiddenOffsets()&&((e.style&&e.style.display)||bI.css(e,"display"))==="none")
};
bI.expr.filters.visible=function(e){return !bI.expr.filters.hidden(e)
};
var bw=/%20/g,aS=/\[\]$/,W=/\r?\n/g,b=/^(?:submit|button|image|reset|file)$/i,au=/^(?:input|select|textarea|keygen)/i;
function j(b6,b8,i,b7){var e;
if(bI.isArray(b8)){bI.each(b8,function(ca,b9){if(i||aS.test(b6)){b7(b6,b9)
}else{j(b6+"["+(typeof b9==="object"?ca:"")+"]",b9,i,b7)
}})
}else{if(!i&&bI.type(b8)==="object"){for(e in b8){j(b6+"["+e+"]",b8[e],i,b7)
}}else{b7(b6,b8)
}}}bI.param=function(e,b6){var b7,i=[],b8=function(b9,ca){ca=bI.isFunction(ca)?ca():(ca==null?"":ca);
i[i.length]=encodeURIComponent(b9)+"="+encodeURIComponent(ca)
};
if(b6===undefined){b6=bI.ajaxSettings&&bI.ajaxSettings.traditional
}if(bI.isArray(e)||(e.jquery&&!bI.isPlainObject(e))){bI.each(e,function(){b8(this.name,this.value)
})
}else{for(b7 in e){j(b7,e[b7],b6,b8)
}}return i.join("&").replace(bw,"+")
};
bI.fn.extend({serialize:function(){return bI.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){var e=bI.prop(this,"elements");
return e?bI.makeArray(e):this
}).filter(function(){var e=this.type;
return this.name&&!bI(this).is(":disabled")&&au.test(this.nodeName)&&!b.test(e)&&(this.checked||!aM.test(e))
}).map(function(e,b6){var b7=bI(this).val();
return b7==null?null:bI.isArray(b7)?bI.map(b7,function(i){return{name:b6.name,value:i.replace(W,"\r\n")}
}):{name:b6.name,value:b7.replace(W,"\r\n")}
}).get()
}});
bI.ajaxSettings.xhr=a5.ActiveXObject!==undefined?function(){return !this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&bE()||bg()
}:bE;
var aA=0,aj={},ay=bI.ajaxSettings.xhr();
if(a5.ActiveXObject){bI(a5).on("unload",function(){for(var e in aj){aj[e](undefined,true)
}})
}C.cors=!!ay&&("withCredentials" in ay);
ay=C.ajax=!!ay;
if(ay){bI.ajaxTransport(function(e){if(!e.crossDomain||C.cors){var i;
return{send:function(b9,b6){var b7,b8=e.xhr(),ca=++aA;
b8.open(e.type,e.url,e.async,e.username,e.password);
if(e.xhrFields){for(b7 in e.xhrFields){b8[b7]=e.xhrFields[b7]
}}if(e.mimeType&&b8.overrideMimeType){b8.overrideMimeType(e.mimeType)
}if(!e.crossDomain&&!b9["X-Requested-With"]){b9["X-Requested-With"]="XMLHttpRequest"
}for(b7 in b9){if(b9[b7]!==undefined){b8.setRequestHeader(b7,b9[b7]+"")
}}b8.send((e.hasContent&&e.data)||null);
i=function(cd,cc){var cb,cg,ce;
if(i&&(cc||b8.readyState===4)){delete aj[ca];
i=undefined;
b8.onreadystatechange=bI.noop;
if(cc){if(b8.readyState!==4){b8.abort()
}}else{ce={};
cb=b8.status;
if(typeof b8.responseText==="string"){ce.text=b8.responseText
}try{cg=b8.statusText
}catch(cf){cg=""
}if(!cb&&e.isLocal&&!e.crossDomain){cb=ce.text?200:404
}else{if(cb===1223){cb=204
}}}}if(ce){b6(cb,cg,ce,b8.getAllResponseHeaders())
}};
if(!e.async){i()
}else{if(b8.readyState===4){setTimeout(i)
}else{b8.onreadystatechange=aj[ca]=i
}}},abort:function(){if(i){i(undefined,true)
}}}
}})
}function bE(){try{return new a5.XMLHttpRequest()
}catch(i){}}function bg(){try{return new a5.ActiveXObject("Microsoft.XMLHTTP")
}catch(i){}}bI.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){bI.globalEval(e);
return e
}}});
bI.ajaxPrefilter("script",function(e){if(e.cache===undefined){e.cache=false
}if(e.crossDomain){e.type="GET";
e.global=false
}});
bI.ajaxTransport("script",function(b6){if(b6.crossDomain){var e,i=n.head||bI("head")[0]||n.documentElement;
return{send:function(b7,b8){e=n.createElement("script");
e.async=true;
if(b6.scriptCharset){e.charset=b6.scriptCharset
}e.src=b6.url;
e.onload=e.onreadystatechange=function(ca,b9){if(b9||!e.readyState||/loaded|complete/.test(e.readyState)){e.onload=e.onreadystatechange=null;
if(e.parentNode){e.parentNode.removeChild(e)
}e=null;
if(!b9){b8(200,"success")
}}};
i.insertBefore(e,i.firstChild)
},abort:function(){if(e){e.onload(undefined,true)
}}}
}});
var bs=[],a8=/(=)\?(?=&|$)|\?\?/;
bI.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=bs.pop()||(bI.expando+"_"+(bp++));
this[e]=true;
return e
}});
bI.ajaxPrefilter("json jsonp",function(b7,e,b8){var ca,i,b6,b9=b7.jsonp!==false&&(a8.test(b7.url)?"url":typeof b7.data==="string"&&!(b7.contentType||"").indexOf("application/x-www-form-urlencoded")&&a8.test(b7.data)&&"data");
if(b9||b7.dataTypes[0]==="jsonp"){ca=b7.jsonpCallback=bI.isFunction(b7.jsonpCallback)?b7.jsonpCallback():b7.jsonpCallback;
if(b9){b7[b9]=b7[b9].replace(a8,"$1"+ca)
}else{if(b7.jsonp!==false){b7.url+=(bQ.test(b7.url)?"&":"?")+b7.jsonp+"="+ca
}}b7.converters["script json"]=function(){if(!b6){bI.error(ca+" was not called")
}return b6[0]
};
b7.dataTypes[0]="json";
i=a5[ca];
a5[ca]=function(){b6=arguments
};
b8.always(function(){a5[ca]=i;
if(b7[ca]){b7.jsonpCallback=e.jsonpCallback;
bs.push(ca)
}if(b6&&bI.isFunction(i)){i(b6[0])
}b6=i=undefined
});
return"script"
}});
bI.parseHTML=function(b8,b6,b7){if(!b8||typeof b8!=="string"){return null
}if(typeof b6==="boolean"){b7=b6;
b6=false
}b6=b6||n;
var i=a.exec(b8),e=!b7&&[];
if(i){return[b6.createElement(i[1])]
}i=bI.buildFragment([b8],b6,e);
if(e&&e.length){bI(e).remove()
}return bI.merge([],i.childNodes)
};
var b1=bI.fn.load;
bI.fn.load=function(b7,ca,cb){if(typeof b7!=="string"&&b1){return b1.apply(this,arguments)
}var e,b6,b8,i=this,b9=b7.indexOf(" ");
if(b9>=0){e=b7.slice(b9,b7.length);
b7=b7.slice(0,b9)
}if(bI.isFunction(ca)){cb=ca;
ca=undefined
}else{if(ca&&typeof ca==="object"){b8="POST"
}}if(i.length>0){bI.ajax({url:b7,type:b8,dataType:"html",data:ca}).done(function(cc){b6=arguments;
i.html(e?bI("<div>").append(bI.parseHTML(cc)).find(e):cc)
}).complete(cb&&function(cd,cc){i.each(cb,b6||[cd.responseText,cc,cd])
})
}return this
};
bI.expr.filters.animated=function(e){return bI.grep(bI.timers,function(i){return e===i.elem
}).length
};
var bX=a5.document.documentElement;
function br(e){return bI.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:false
}bI.offset={setOffset:function(b7,ch,cb){var cd,ca,e,b8,b6,cf,cg,cc=bI.css(b7,"position"),b9=bI(b7),ce={};
if(cc==="static"){b7.style.position="relative"
}b6=b9.offset();
e=bI.css(b7,"top");
cf=bI.css(b7,"left");
cg=(cc==="absolute"||cc==="fixed")&&bI.inArray("auto",[e,cf])>-1;
if(cg){cd=b9.position();
b8=cd.top;
ca=cd.left
}else{b8=parseFloat(e)||0;
ca=parseFloat(cf)||0
}if(bI.isFunction(ch)){ch=ch.call(b7,cb,b6)
}if(ch.top!=null){ce.top=(ch.top-b6.top)+b8
}if(ch.left!=null){ce.left=(ch.left-b6.left)+ca
}if("using" in ch){ch.using.call(b7,ce)
}else{b9.css(ce)
}}};
bI.fn.extend({offset:function(i){if(arguments.length){return i===undefined?this:this.each(function(ca){bI.offset.setOffset(this,i,ca)
})
}var e,b9,b7={top:0,left:0},b6=this[0],b8=b6&&b6.ownerDocument;
if(!b8){return
}e=b8.documentElement;
if(!bI.contains(e,b6)){return b7
}if(typeof b6.getBoundingClientRect!==aC){b7=b6.getBoundingClientRect()
}b9=br(b8);
return{top:b7.top+(b9.pageYOffset||e.scrollTop)-(e.clientTop||0),left:b7.left+(b9.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}
},position:function(){if(!this[0]){return
}var b6,b7,e={top:0,left:0},i=this[0];
if(bI.css(i,"position")==="fixed"){b7=i.getBoundingClientRect()
}else{b6=this.offsetParent();
b7=this.offset();
if(!bI.nodeName(b6[0],"html")){e=b6.offset()
}e.top+=bI.css(b6[0],"borderTopWidth",true);
e.left+=bI.css(b6[0],"borderLeftWidth",true)
}return{top:b7.top-e.top-bI.css(i,"marginTop",true),left:b7.left-e.left-bI.css(i,"marginLeft",true)}
},offsetParent:function(){return this.map(function(){var e=this.offsetParent||bX;
while(e&&(!bI.nodeName(e,"html")&&bI.css(e,"position")==="static")){e=e.offsetParent
}return e||bX
})
}});
bI.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b6,i){var e=/Y/.test(i);
bI.fn[b6]=function(b7){return aB(this,function(b8,cb,ca){var b9=br(b8);
if(ca===undefined){return b9?(i in b9)?b9[i]:b9.document.documentElement[cb]:b8[cb]
}if(b9){b9.scrollTo(!e?ca:bI(b9).scrollLeft(),e?ca:bI(b9).scrollTop())
}else{b8[cb]=ca
}},b6,b7,arguments.length,null)
}
});
bI.each(["top","left"],function(e,b6){bI.cssHooks[b6]=a7(C.pixelPosition,function(b7,i){if(i){i=F(b7,b6);
return X.test(i)?bI(b7).position()[b6]+"px":i
}})
});
bI.each({Height:"height",Width:"width"},function(e,i){bI.each({padding:"inner"+e,content:i,"":"outer"+e},function(b6,b7){bI.fn[b7]=function(cb,ca){var b9=arguments.length&&(b6||typeof cb!=="boolean"),b8=b6||(cb===true||ca===true?"margin":"border");
return aB(this,function(cd,cc,ce){var cf;
if(bI.isWindow(cd)){return cd.document.documentElement["client"+e]
}if(cd.nodeType===9){cf=cd.documentElement;
return Math.max(cd.body["scroll"+e],cf["scroll"+e],cd.body["offset"+e],cf["offset"+e],cf["client"+e])
}return ce===undefined?bI.css(cd,cc,b8):bI.style(cd,cc,ce,b8)
},i,b9?cb:undefined,b9,null)
}
})
});
bI.fn.size=function(){return this.length
};
bI.fn.andSelf=bI.fn.addBack;
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return bI
})
}var bk=a5.jQuery,H=a5.$;
bI.noConflict=function(e){if(a5.$===bI){a5.$=H
}if(e&&a5.jQuery===bI){a5.jQuery=bk
}return bI
};
if(typeof av===aC){a5.jQuery=a5.$=bI
}return bI
}));
window.ContextHubJQ=window.jQuery.noConflict(true);
(function(){if(!Function.prototype.bind){Function.prototype.bind=function a(d){var e=this;
var b=[].slice.call(arguments,1);
var c=function(){var h;
if(this instanceof c){var i=function(){};
i.prototype=e.prototype;
var g=new i();
var f=e.apply(g,b.concat([].slice.call(arguments)));
h=(Object(f)===f)?f:g
}else{h=e.apply(d,b.concat([].slice.call(arguments)))
}return h
};
return c
}
}}());
(function(c){c.ContextHub=c.ContextHub||{};
var b=function(f,e){return((c.ContextHubKernelConfig.debug||e)&&f)?Function.prototype.bind.call(f,c.console):function(){}
};
var d=function(g){var f=c.console||{};
var h=function(){};
ContextHub.console={log:b(f.log),warn:b(f.warn),info:b(f.info),error:b(f.error,true),debug:b(f.debug),time:b(f.time),timeEnd:b(f.timeEnd),timeStamp:b(f.timeStamp)};
var e=g||"info";
if(e==="info"){ContextHub.console.info=h;
ContextHub.console.debug=h
}if(e==="debug"){ContextHub.console.log=h;
ContextHub.console.warn=h
}};
function a(e,f){if(typeof e!=="undefined"){c.ContextHubKernelConfig.debug=e===true;
d(f)
}return !!c.ContextHubKernelConfig.debug
}d();
ContextHub.debug=a
}(window));
(function($,window){window.ContextHub=window.ContextHub||{};
window.ContextHub.Utils=window.ContextHub.Utils||{};
window.ContextHub.Utils.JSON=window.ContextHub.Utils.JSON||{};
var returnUnicode=function(character){return"\\u"+("0000"+character.charCodeAt(0).toString(16)).slice(-4)
};
var quoteString=function(str){var sensitiveCharacters=/["\\\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var replacementMapping={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
var escapeCharacter=function(character){var mapped=replacementMapping[character];
return mapped?mapped:returnUnicode(character)
};
return'"'+str.replace(sensitiveCharacters,escapeCharacter)+'"'
};
var serializeDate=function(date){var year=date.getUTCFullYear();
var month=ContextHub.Shared.pad(date.getUTCMonth()+1);
var day=ContextHub.Shared.pad(date.getUTCDate());
var hours=ContextHub.Shared.pad(date.getUTCHours());
var minutes=ContextHub.Shared.pad(date.getUTCMinutes());
var seconds=ContextHub.Shared.pad(date.getUTCSeconds());
var milliseconds=ContextHub.Shared.pad(date.getUTCMilliseconds(),3);
return'"'+year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+seconds+"."+milliseconds+'Z"'
};
var serializeArray=function(array){var result=[];
for(var idx=0;
idx<array.length;
idx++){result.push(stringify(array[idx])||"null")
}return"["+result.join(",")+"]"
};
var serializeObject=function(object){var result=[];
for(var item in object){if(Object.prototype.hasOwnProperty.call(object,item)){var type=typeof item;
if(type!=="number"&&type!=="string"){continue
}var value=object[item];
type=typeof value;
if(type!=="function"&&type!=="undefined"){result.push(quoteString(item)+":"+stringify(value))
}}}return"{"+result.join(",")+"}"
};
var stringify=function(data){var type=$.type(data);
if(type==="object"&&$.isArray(data)){type="array"
}switch(type){case"null":case"boolean":return String(data);
case"undefined":return undefined;
case"array":return serializeArray(data);
case"number":return String(isFinite(data)?data:"null");
case"string":return quoteString(data);
case"date":return serializeDate(data);
case"regexp":return"{}";
case"function":return undefined;
case"object":default:return serializeObject(data)
}};
var parse=function(data){var unicodeExceptions=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
data=String(data).replace(unicodeExceptions,returnUnicode);
var filtered=data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");
return(/^[\],:{}\s]*$/.test(filtered))?eval("("+data+")"):{}
};
var nativeJSONSupported=window.JSON&&JSON.stringify&&JSON.parse;
ContextHub.Utils.JSON.stringify=nativeJSONSupported?JSON.stringify:stringify;
ContextHub.Utils.JSON.parse=function(data){var json;
try{json=(nativeJSONSupported?JSON.parse:parse)(data)
}catch(e){json={}
}return json
}
}(ContextHubJQ,window));
ContextHub.console.log("[loading] contexthub.constants - ContextHub.constants.js");
(function(b){var a={EVENT_NAMESPACE:"ch",EVENT_ALL_STORES_READY:"all-stores-ready",EVENT_STORES_PARTIALLY_READY:"stores-partially-ready",EVENT_STORE_REGISTERED:"store-registered",EVENT_STORE_READY:"store-ready",EVENT_STORE_UPDATED:"store-updated",PERSISTENCE_CONTAINER_NAME:"ContextHubPersistence",SERVICE_RAW_RESPONSE_KEY:"/_/raw-response",SERVICE_RESPONSE_TIME_KEY:"/_/response-time",SERVICE_LAST_URL_KEY:"/_/url",IS_CONTAINER_EXPANDED:"/_/container-expanded"};
ContextHub.Constants=b.extend(true,ContextHub.Constants,a);
ContextHub.console.time("contexthub.js");
ContextHub.console.timeStamp("contexthub.start")
}(ContextHubJQ));
ContextHub.console.log("[loading] contexthub.constants - ContextHub.constants.deprecated.js");
(function(b){window.ContextHub=window.ContextHub||{};
var a={EVENT_INITIALIZED:ContextHub.Constants.EVENT_ALL_STORES_READY,EVENT_REGISTER:ContextHub.Constants.EVENT_STORE_REGISTERED,EVENT_DATA_UPDATE:ContextHub.Constants.EVENT_STORE_UPDATED,CONTAINER_VISIBLE:ContextHub.Constants.IS_CONTAINER_EXPANDED,EVENT_CONFIG_LOADED:""};
ContextHub.Constants=b.extend(true,ContextHub.Constants,a)
}(ContextHubJQ));
(function(c,b){b.ContextHub.Shared=b.ContextHub.Shared||{};
ContextHub.Shared.pad=function(f,e){var i=e||2;
var d=String(f);
var h=i-d.length;
if(h>0){var g=Math.pow(10,Math.min(h,20));
d=String(g).slice(1)+d
}return d
};
var a={};
ContextHub.Shared.timers={start:function(e){var d=e||"id"+Math.random();
a[d]=new Date().getTime();
return d
},finish:function(e){var d=a[e];
return d?(new Date().getTime()-d):0
}};
ContextHub.Shared.timestamp=function(){var g=new Date();
var i=g.getYear()+1900;
var j=ContextHub.Shared.pad(g.getMonth()+1);
var e=ContextHub.Shared.pad(g.getDate());
var d=ContextHub.Shared.pad(g.getHours());
var h=ContextHub.Shared.pad(g.getMinutes());
var k=ContextHub.Shared.pad(g.getSeconds());
var f=ContextHub.Shared.pad(g.getMilliseconds(),3);
return i+"-"+j+"-"+e+" "+d+":"+h+":"+k+"."+f
};
ContextHub.Shared.uuid=function(){function d(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)
}return d()+d()+"-"+d()+"-"+d()+"-"+d()+"-"+d()+d()+d()
};
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.shared - ContextHub.Shared.js")
}(ContextHubJQ,window));
ContextHubJQ(function(){ContextHub.console.log(ContextHub.Shared.timestamp(),"[event] DOM ready")
});
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.shared - ContextHub.Shared.CookieContainer.js");
(function(c,b){b.ContextHub.Shared=b.ContextHub.Shared||{};
b.ContextHub.Shared.CookieContainer={};
var a=b.ContextHub.Shared.CookieContainer;
var d=function(f){var h=ContextHub.Utils.Cookie.getItem(c.trim(f))||"";
var g=h.split(/\|/);
var e={};
c.each(g,function(m,i){var l=i.match(/(^.*?):=(.*)/);
if(l&&(l.length===3)){l.shift();
var j=l.shift();
var k=l.shift();
e[j]=decodeURIComponent(k)
}});
return e
};
a.setItem=function(e,h,j){var f=c.trim(e);
var i=d(f);
var g=[];
if(f.length<=0){return
}if((j===null)||(typeof j==="undefined")){delete i[h]
}else{i[h]=j
}c.each(i,function(l,k){g.push(l+":="+encodeURIComponent(k))
});
ContextHub.Utils.Cookie.setItem(f,g.join("|"))
};
a.getItem=function(e,f){var g=d(e);
return g[f]
};
a.removeItem=function(e,f){a.setItem(e,f,null)
}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.utils - ContextHub.Utils.cookie.js");
(function(f,i){i.ContextHub.Utils=i.ContextHub.Utils||{};
var e={path:"/",expires:undefined,domain:undefined,secure:false,trimUndefined:true};
var g=function(){return i.document.cookie?i.document.cookie.split(/;/):[]
};
var c=function(o){return decodeURIComponent(f.trim(o.split(/\=/)[0]))
};
var b=function(o){return decodeURIComponent(f.trim(o.split(/\=/).slice(1).join("=")))
};
var k=function(r,p){var o=f.type(p);
if(o==="object"&&f.isArray(p)){o="array"
}switch(o){case"regexp":return p.test(r);
case"string":return r===p;
case"function":return p(r)===true;
case"array":var q=false;
f(p).each(function(s,t){q=k(r,t);
return !q
});
return q;
default:return false
}};
var n=function(o){var r=typeof o==="undefined";
var q=g();
var p=[];
f(q).each(function(s,u){var t=c(u);
if(t.length&&(f.inArray(t,p)===-1)&&(r||k(t,o))){p.push(t)
}});
return p.sort()
};
var h=function(r,u,t){if(typeof r==="undefined"){return false
}var s=f.type(u);
var p=f.extend(true,{},e,t);
var v=(p.trimUndefined&&(s==="undefined"||s==="null"))?"":u;
switch(f.type(p.expires)){case"date":break;
case"number":var o=new Date();
o.setDate(o.getDate()+p.expires);
p.expires=o;
break;
default:p.expires=undefined
}var q=[encodeURIComponent(r),"=",encodeURIComponent(v),p.expires?("; expires="+p.expires.toUTCString()):"",p.domain?("; domain="+p.domain):"",p.path?("; path="+p.path):"",p.secure?"; secure":""].join("");
i.document.cookie=q;
return q
};
var m=function(p){var q=g();
var o=null;
f(q).each(function(r,t){var u=b(t);
var s=c(t);
if(s===p){o=u
}return o===null
});
return o
};
var a=function(o){var p={};
f(n(o)).each(function(q,r){var t=m(r);
var s=f.type(t);
if(s!=="undefined"&&s!=="null"){p[r]=t
}});
return p
};
var j=function(o){return m(o)!==null
};
var l=function(p,o){h(p,"",f.extend({},o,{expires:-1}))
};
var d=function(p,o){f(n(p)).each(function(q,r){l(r,o)
})
};
ContextHub.Utils.Cookie={setItem:h,getItem:m,getAllItems:a,getKeys:n,exists:j,removeItem:l,vanish:d}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.utils - ContextHub.Utils.json.js");
(function(c,h){h.ContextHub.Utils=h.ContextHub.Utils||{};
var e=function(m){var l=null;
if(typeof m==="string"){l=m.split(/(?:\s*\/+\s*)+/);
if(l[0]===""){l.shift()
}if(l.length&&(l[l.length-1]==="")){l.pop()
}}return l
};
var f=function(l,m,p,q){m=e(m);
if(q){l=c.extend(true,{},l)
}if(m){var o=l;
var n={};
c.each(m,function(r,t){n=o;
var s=c.type(o[t]);
if(s!=="object"&&s!=="array"){o[t]={}
}o=o[t]
});
n[m.slice(-1)]=p
}return l
};
var k=function(m,n){var o=null;
n=e(n);
if(n){o=m;
for(var l=0;
l<n.length;
l++){o=o[n[l]];
if((o===null)||(typeof o==="undefined")){o=null;
break
}}}return o
};
var i=function(t,q,n){q=e(q);
if(n){t=c.extend(true,{},t)
}if(q){var r={object:true,array:true};
var m=t;
var s=[t];
c.each(q.slice(0,-1),function(u,v){m=m[v];
s.push(m);
return r[c.type(m)]===true
});
if(m){delete m[q.slice(-1)];
q.pop();
s.pop();
while(s&&q&&(s.length>0)&&(q.length>0)){var l=q.pop();
m=s.pop();
var p=m[l];
var o=c.type(p);
if(((o==="object")||(o==="array"))&&c.isEmptyObject(p)){delete m[l]
}else{break
}}}}return t
};
var a=/^\[object (DIV|DOM|CSS|HTML|NamedNode|Node|Window)/;
var g=function(l){if(l){if(l instanceof h.Node){return true
}if((l instanceof c)||(typeof l.css==="function")){return true
}if((typeof l.toString==="function")&&a.test(l.toString())){return true
}}return false
};
var j=function(v,s,n,l,m){s=s||"/";
m=m||0;
var w;
var u=[];
var q=c.type(v);
if((q==="object")&&g(v)){q="invalid"
}if((q==="object")||(q==="array")){if(l){v=ContextHub.Utils.JSON.tree.cleanup(v)
}for(var t in v){if(!v.hasOwnProperty(t)){continue
}var r=v[t];
var p=s+t;
var o=c.type(r);
u.push(p);
if((o==="object")&&g(r)){o="invalid"
}if((o==="object")||(o==="array")){c.merge(u,j(r,p+"/",null,l,m+1))
}}}if(m===0){w=(typeof n==="function")?u.sort(n):u.sort()
}else{w=u
}return w
};
var b=function(l,n){if(n){l=c.extend(true,{},l)
}var m=j(l,null,function(p,o){var q=p.split(/\//).length;
var r=o.split(/\//).length;
if(q!==r){return(q>r)?-1:1
}return(p===o)?0:((p>o)?1:-1)
});
c.each(m,function(o,q){var r=k(l,q);
var p=c.type(r);
if((p==="object"||p==="array")&&c.isEmptyObject(r)){l=i(l,q)
}});
return l
};
var d=function(l,m){return c.extend(true,{},l,m)
};
c.extend(ContextHub.Utils.JSON,{tree:{sanitizeKey:e,setItem:f,getItem:k,removeItem:i,getKeys:j,cleanup:b,addAllItems:d}})
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.utils - ContextHub.Utils.eventing.js");
(function(h,m){m.ContextHub.Utils=m.ContextHub.Utils||{};
var v=(function(){var D=h.grep([m.requestAnimationFrame,m.msRequestAnimationFrame,m.mozRequestAnimationFrame,m.webkitRequestAnimationFrame,m.oRequestAnimationFrame],h.isFunction).shift();
if(!D){var C=0;
D=function(H){var E=new Date().getTime();
var G=Math.max(0,16-(E-C));
var F=m.setTimeout(function(){H(E+G)
},G);
C=E+G;
return F
}
}return D
})();
var y=(function(){var C=h.grep([m.cancelAnimationFrame,m.cancelRequestAnimationFrame,m.msCancelRequestAnimationFrame,m.mozCancelRequestAnimationFrame,m.webkitCancelRequestAnimationFrame,m.oCancelRequestAnimationFrame],h.isFunction).shift();
if(!C){C=function(D){m.clearTimeout(D)
}
}return C
})();
var g={};
var q=function(D,E,C){D=(D||"").replace(/^ *| *$/g,"");
if(D.length){C=C||{};
if(!C.hasOwnProperty("defer")){C.defer=this.config.defer
}l.call(this,this.config.namespace,{channel:D,data:E,defer:C.defer,_:C._||{}})
}};
var l=function(E,H){var D="/"+E+"/"+H.channel;
var G=ContextHub.Utils.JSON.tree.getItem(this.queue,D)||{};
if(!G.hasOwnProperty("executeAt")){G.executeAt=null
}if(!G.hasOwnProperty("data")){G.data=[]
}for(var F in H._){if(H._.hasOwnProperty(F)&&(typeof G[F]==="undefined")){G[F]=H._[F]
}}var C=new Date().getTime()+H.defer;
if(!G.executeAt||(H.defer===0)||(G.executeAt>C)){G.executeAt=C
}if(!h.isEmptyObject(H.data)){G.data.push(H.data)
}this.queue=ContextHub.Utils.JSON.tree.setItem(this.queue,D,G);
this.eventingCounter=H.defer?this.eventingCounter:0;
var I=this.queueIsEmpty===true;
this.queueIsEmpty=false;
if(I){this.eventingMonitor()
}};
var f=function(){return this.queue
};
var r=function(C,D){C.list.push(D.key);
C.hash[D.key]=D
};
var n=function(D){var E=h.extend(true,{},D,{data:[]});
var G={};
var J=function(V,T,S){var W=V.key||("temp"+Math.random());
var U=G[W];
var R=(U||{}).old||null;
G[W]=h.extend(true,{},V);
G[W]._idx=parseFloat(T+"."+(S||0));
if(U){G[W].old=R
}};
for(var M=0;
M<D.data.length;
M++){var P=D.data[M];
var Q=ContextHub.Utils.JSON.tree.getKeys(P.old);
var H=ContextHub.Utils.JSON.tree.getKeys(P.value);
if(Q.length||H.length){var I=(P.key==="/")?"":P.key;
var C=1;
var K;
var N;
for(K=0;
K<Q.length;
K++,C++){N=Q[K];
J({key:I+N,value:null,old:ContextHub.Utils.JSON.tree.getItem(P.old,N),action:"remove"},M,C)
}for(K=0;
K<H.length;
K++,C++){N=H[K];
J({key:I+N,value:ContextHub.Utils.JSON.tree.getItem(P.value,N),old:ContextHub.Utils.JSON.tree.getItem(P.old||{},N),action:"set"},M,C)
}}else{var F=!!(P.key&&P.action)&&!/^\/_\//.test(P.key);
var L=G[P.key]||{};
if(F&&(L.old===P.value)){delete G[P.key]
}else{J(P,M)
}}}G=h.map(G,function(R){return R
}).sort(function(S,R){return S._idx-R._idx
});
var O={set:{list:[],hash:{}},removed:{list:[],hash:{}},all:{list:[],hash:{}}};
h.each(G,function(S,R){delete R._idx;
if(R.key&&R.action){r(this.keys.all,R);
if(R.action==="set"){r(this.keys.set,R)
}if(R.action==="remove"){r(this.keys.removed,R)
}}}.bind({keys:O}));
E.data=G;
E.keys=O;
return E
};
var t=function(C){var D=C;
if(D.indexOf(this.config.namespace+"-")!==0){D=this.config.namespace+"-"+D
}if(D.indexOf(".")!==-1){D=D.split(/\./).shift()
}return g[D]===true
};
var b=function(){if(!this.windowBroadcast.initialized){var C=m;
var D=m.parent;
try{while(C.location.origin===D.location.origin){C=D;
D=D.parent;
if(C===m.top){break
}}}catch(E){}try{this.windowBroadcast.top=(this.config.broadcast===C)?null:C
}catch(E){}this.windowBroadcast.initialized=true
}return this.windowBroadcast.top
};
var B=function(L,C){var D=this.config.namespace+"-"+L;
var G=C.duration?"("+C.duration+") ":"";
var I=ContextHub.debug();
var N=h(this.config.broadcast);
var H=b.call(this);
C=n(C);
C.event=D;
if(C.overlay){C=h.extend(true,C,C.overlay)
}delete (this.queue[this.config.namespace]||{})[L];
this.queueIsEmpty=h.isEmptyObject(this.queue[this.config.namespace]);
if(!C.muteWhenNoData||(C.muteWhenNoData&&(C.data.length>0))){for(var F=D.split(/:/),J=L.split(/:/),K=F.length;
K>0;
K--){C.channel=J.slice(0,K).join(":");
var M=F.slice(0,K).join(":");
N.trigger(M,C);
if(H&&H.document){var E=H.document.createEvent("Event");
E.initEvent(M,true,true);
E.data=C;
H.dispatchEvent(E)
}if(I){ContextHub.console.debug(ContextHub.Shared.timestamp(),M,"-",C)
}g[M]=true
}ContextHub.console.log(ContextHub.Shared.timestamp(),"[event]",D,G+"-",C)
}};
var s=function(){if(!this.running||this.queueIsEmpty){return
}if((this.eventingCounter++%this.periodicity)===0){h.each(this.queue[this.config.namespace]||{},function(C,D){if(!D.paused&&new Date().getTime()>D.executeAt){B.call(this,C,D)
}}.bind(this))
}v(this.eventingMonitor)
};
var i=function(){this.running=true;
this.eventingMonitor()
};
var a=function(){this.running=false
};
var d=function(){return this.running
};
var c=function(){this.queue={}
};
var x=function(D,C,E){this.queue=ContextHub.Utils.JSON.tree.setItem(this.queue,"/"+this.config.namespace+"/"+D+"/"+C,E)
};
var w=function(D,C){return ContextHub.Utils.JSON.tree.getItem(this.queue,"/"+this.config.namespace+"/"+D+"/"+C)
};
var u=function(C){x.call(this,C,"executeAt",0)
};
var j=function(C){x.call(this,C,"paused",true)
};
var e=function(C){x.call(this,C,"paused",undefined)
};
var k=function(C){return w.call(this,C,"paused")===true
};
var p=function(E,G,D){var I=D?("."+D):"";
var F=(typeof E==="string")?E.split(/ /):E;
for(var C=0;
C<F.length;
C++){var H=F[C];
if(H.indexOf(G+"-")!==0){F[C]=G+"-"+H+I
}}return F.join(" ")
};
var o=function(F,H,E,D){F=p(F,this.config.namespace,E);
h(this.config.broadcast).on(F,H);
if(D){var C=false;
var G=this;
h.each(F.split(/ /),function(I,J){C=t.call(G,J);
return C!==true
});
if(C){H()
}}};
var z=function(F,H,E,D){var C=false;
F=p(F,this.config.namespace,E);
if(D){var G=this;
h.each(F.split(/ /),function(I,J){C=t.call(G,J);
return C!==true
})
}if(C){H()
}else{h(this.config.broadcast).one(F,H)
}};
var A=function(D,C){D=p(D,this.config.namespace,C);
h(this.config.broadcast).off(D)
};
ContextHub.Utils.Eventing=function(C){this.config=h.extend(true,{},ContextHub.Utils.Eventing.defaultConfig,C);
this.eventingCounter=0;
this.periodicity=Math.floor(Math.max(16,this.config.periodicity)/16);
this.eventingMonitor=s.bind(this);
this.windowBroadcast={top:null,initialized:false};
c.call(this);
if(this.config.autoStart){i.call(this)
}else{a.call(this)
}return{log:this.log,trigger:q.bind(this),getQueue:f.bind(this),isRunning:d.bind(this),enableEventing:i.bind(this),disableEventing:a.bind(this),alreadyTriggered:t.bind(this),clearQueue:c.bind(this),flush:u.bind(this),pause:j.bind(this),resume:e.bind(this),isPaused:k.bind(this),once:z.bind(this),on:o.bind(this),off:A.bind(this),namespace:this.config.namespace,broadcast:this.config.broadcast}
};
ContextHub.Utils.Eventing.defaultConfig={autoStart:true,defer:100,periodicity:16*12,namespace:ContextHub.Constants.EVENT_NAMESPACE,broadcast:m}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.utils - ContextHub.Utils.persistence.js");
(function(e,f){f.ContextHub.Utils=f.ContextHub.Utils||{};
var i=new RegExp("^/*store($|/)");
var b=new RegExp("^/*store/(emulators|surferinfo|segmentation)($|/)");
function g(l,k,m){this.cachedTree=null;
return e.extend(true,{},{name:l,isSupported:m||function(){return true
},getInterface:function(o){var n=k.call(this,o);
return{name:l,getItem:n.getItem,setItem:n.setItem,removeItem:n.removeItem,getKeys:n.getKeys,getTree:n.getTree}
},_self:this})
}g.prototype.setItem=function(m,l,k,o){var p=(k||"").match(i)&&!(k||"").match(b);
if(p&&ContextHub.isOptedOut()){return false
}var n=this.cachedTree||l();
n=ContextHub.Utils.JSON.tree.setItem(n,k,o);
m(n);
this.cachedTree=n;
return true
};
g.prototype.getItem=function(l,k){var m=this.cachedTree||l();
this.cachedTree=m;
return ContextHub.Utils.JSON.tree.getItem(m,k)
};
g.prototype.removeItem=function(m,l,k){var o=(k||"").match(i)&&!(k||"").match(b);
if(o&&ContextHub.isOptedOut()){return false
}var n=this.cachedTree||l();
n=ContextHub.Utils.JSON.tree.removeItem(n,k);
m(n);
this.cachedTree=null;
return true
};
var d=new g("null",function(){return{setItem:function(){return false
},getItem:function(){return{}
},removeItem:function(){},getKeys:function(){return[]
},getTree:function(){return{}
}}
});
var h=function(){var k=false;
e(e.merge([this.config.mode],this.config.fallback||[])).each(function(l,m){if(m&&m.isSupported()){k=true;
this.config.mode=m
}return !k
}.bind(this));
if(!k){this.config.mode=d
}return k
};
ContextHub.Utils.Persistence=function(l){this.config=e.extend(true,{},ContextHub.Utils.Persistence.defaultConfig,l);
var m=this.config.mode;
var n=h.call(this);
var k={initialized:n,usingFallback:(this.config.mode!==m),window:this.config.window,container:this.config.container};
e.extend(k,this.config.mode.getInterface.call(this.config.mode._self,this.config));
return k
};
ContextHub.Utils.Persistence.prototype.PersistenceMode=g;
ContextHub.Utils.Persistence.Modes={};
var j=function(m,l){var k=g.prototype.setItem.bind(this,m,l);
var p=g.prototype.getItem.bind(this,l);
var n=g.prototype.removeItem.bind(this,m,l);
var o=function(){var q=l();
return ContextHub.Utils.JSON.tree.getKeys(q)
};
return{setItem:k,getItem:p,removeItem:n,getKeys:o,getTree:l}
};
ContextHub.Utils.Persistence.Modes.LOCAL=new g("local",function c(l){var k=l.container;
var o=l.window.localStorage;
var n=function(){var p=null;
try{p=o.getItem(k)
}catch(q){p=null
}p=ContextHub.Utils.JSON.parse(p);
return(e.type(p)==="object")?p:{}
};
var m=function(p){var q=ContextHub.Utils.JSON.stringify(p);
o.setItem(k,q)
};
return j.call(this,m,n)
},function a(){var l="contexthub.test."+this.name;
var k;
try{var n=f.localStorage;
n.setItem(l,l);
k=n.getItem(l)===l;
n.removeItem(l)
}catch(m){k=false
}return k
});
ContextHub.Utils.Persistence.Modes.SESSION=new g("session",function c(l){var k=l.container;
var o=l.window.sessionStorage;
var n=function(){var p=o.getItem(k);
p=ContextHub.Utils.JSON.parse(p);
return(e.type(p)==="object")?p:{}
};
var m=function(p){var q=ContextHub.Utils.JSON.stringify(p);
o.setItem(k,q)
};
return j.call(this,m,n)
},function a(){var l="contexthub.test."+this.name;
var k;
try{var n=f.sessionStorage;
n.setItem(l,l);
k=n.getItem(l)===l;
n.removeItem(l)
}catch(m){k=false
}return k
});
ContextHub.Utils.Persistence.Modes.COOKIE=new g("cookie",function c(l){var k=l.container;
var o=ContextHub.Utils.Cookie;
var n=function(){var p=o.getItem(k);
p=ContextHub.Utils.JSON.parse(p);
return(e.type(p)==="object")?p:{}
};
var m=function(p){var q=ContextHub.Utils.JSON.stringify(p);
o.setItem(k,q)
};
return j.call(this,m,n)
},function a(){var l="contexthub.test."+this.name;
f.document.cookie=l+"=1";
var k=f.document.cookie.indexOf(l)!==-1;
f.document.cookie=l+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT";
return k
});
ContextHub.Utils.Persistence.Modes.WINDOW=new g("window",function c(l){var k=l.container;
var o=l.window;
var n=function(){var p=ContextHub.Utils.JSON.parse(o.name)[k];
return(e.type(p)==="object")?p:{}
};
var m=function(p){var q=ContextHub.Utils.JSON.parse(o.name);
q[k]=p;
o.name=ContextHub.Utils.JSON.stringify(q)
};
return j.call(this,m,n)
});
ContextHub.Utils.Persistence.defaultConfig={container:ContextHub.Constants.PERSISTENCE_CONTAINER_NAME,window:f,mode:ContextHub.Utils.Persistence.Modes.LOCAL,fallback:[ContextHub.Utils.Persistence.Modes.SESSION,ContextHub.Utils.Persistence.Modes.WINDOW]}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.utils - ContextHub.Utils.storeCandidates.js");
(function(g,d){d.ContextHub.Utils=d.ContextHub.Utils||{};
var f={};
var c=function(){return true
};
var e=function(j,l,k,i){var n;
var m={store:j,priority:k,applies:i||c};
f[l]=f[l]||[];
n=f[l];
n.push(m);
n.sort(function(p,o){return o.priority-p.priority
})
};
var b=function(l){var k=f[l.type]||[];
var i;
var j;
for(i=0;
i<k.length;
i++){j=k[i];
if(j.applies(j.store,j.priority)){return j.store
}}if(l.required===true){ContextHub.console.error('No suitable store implementation found for type: "'+l.type+'".')
}};
var h=function(j){var i=f;
if(j){i=i[j]||[]
}return i
};
var a=function(){var i=[];
g.each(f,function(j){i.push(j)
});
return i.sort()
};
ContextHub.Utils.storeCandidates={registerStoreCandidate:e,getStoreFromCandidates:b,getRegisteredCandidates:h,getSupportedStoreTypes:a}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.utils - ContextHub.Utils.inheritance.js");
(function(a){a.ContextHub.Utils=a.ContextHub.Utils||{};
ContextHub.Utils.inheritance={inherit:function(e,b){e.prototype=new b();
e.prototype.constructor=b;
var d={};
var c;
e.prototype.uber=function(g){d[g]=d[g]||0;
var j;
var f;
var h;
var i=d[g];
if(i){h=b.prototype;
while(i){h=h.constructor.prototype;
i--
}if(h&&(h[g]===c)){h=h.constructor.prototype||{}
}j=h[g]
}else{h=this;
while(h&&!h.hasOwnProperty(g)){h=h.__proto__||h.constructor.prototype
}j=h[g];
if(j===this[g]){j=(h.__proto__||h.constructor.prototype)[g]
}}d[g]++;
c=j;
if(typeof j==="function"){f=j.apply(this,Array.prototype.slice.apply(arguments,[1]))
}c=null;
d[g]--;
return f
};
return e
},newInstance:function(b,c){return new (b.bind.apply(b,[null].concat([].slice.call(c))))()
}}
}(window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.kernel - ContextHub.js");
(function(e,h){if(typeof h.ContextHubKernelConfig==="undefined"){ContextHub.console.error("[-] ContextHub configuration is not set!")
}h.ContextHub=e.extend({version:"0.2.40-20180316-1123"},h.ContextHub);
var d={};
var n=[];
var g=[];
var v=new ContextHub.Utils.Persistence();
var o=new ContextHub.Utils.Eventing(h.ContextHubKernelConfig.eventing);
var f=null;
var c=function(z,x){if(e.type(x)==="object"){d=d||{};
if(!d[z]){d[z]=x;
ContextHub.console.timeStamp('registering "'+z+'"');
var A=x.getKeys();
var y={keys:{all:{hash:{},list:A}}};
e.each(A,function(B,C){y.keys.all.hash[C]=true
});
this.eventing.trigger(ContextHub.Constants.EVENT_STORE_REGISTERED+":"+z,{},{defer:0,_:{action:"store-registered",store:z,registeredAt:new Date().getTime(),overlay:y}});
if(!x.queryService){x.announceReadiness()
}}}};
var m=function(){return d
};
var q=function(x){return((e.type(x)==="string")&&x.length)?ContextHub.Utils.JSON.tree.getItem(d,x):null
};
var t=function(x){return this.getItem("/store/"+x)
};
var l=function(x,y){this.setItem("/store/"+x,y)
};
var r=function(A){var C=ContextHub.persistence;
var z=A;
var B=ContextHub.Utils.JSON.tree.sanitizeKey(z);
if(B){var y=B.shift();
if(y==="store"){y=B.shift()
}var x=ContextHub.getStore(y);
if(x){C=x;
z="/"+B.join("/")
}}return{storage:C,storeProperty:z}
};
var j=function(x){var y=r(x);
return y.storage.getItem(y.storeProperty)
};
var b=function(x,z){var y=r(x);
y.storage.setItem(y.storeProperty,z)
};
var u=function(x){var y=r(x);
y.storage.removeItem(y.storeProperty)
};
var k=function(y){var x={};
var z=0;
var A=[];
e.each(y,function(B,C){if(C){var E=ContextHub.Utils.JSON.tree.sanitizeKey(C);
if(E[0]==="store"){C="/"+E.slice(1).join("/")
}else{E.unshift("store")
}E="/"+E.join("/");
var D=ContextHub.getItem(E);
if(D!==null){z++;
x=ContextHub.Utils.JSON.tree.setItem(x,C,D);
A.push(C)
}}});
x._length=z;
x._keys=A;
return x
};
var i=function(C,y,B,F){if(e.type(C)==="string"){C=[C]
}var z=[];
e.each(C,function(I,H){var G="/"+ContextHub.Utils.JSON.tree.sanitizeKey(H).join("/");
z.push(G)
});
C=z;
y=y||function(){};
B=B||function(){};
var A=k(C);
if(A._length===C.length){y(A);
return
}var D=0;
var E=false;
var x=function(H){if(E){return true
}var G=k(C);
var I=null;
if(e.type(H)==="undefined"){I=B
}if(G._length===C.length){I=y;
h.clearTimeout(D)
}if(I){E=true;
I(G)
}return E
};
D=h.setTimeout(x,F);
n.push(x)
};
var s=function(){var x=o.isPaused();
this.eventing.pause();
e.each(m(),function(y,z){z.clean()
});
if(!x){this.eventing.resume()
}};
var p=function(y){var x=o.isPaused();
ContextHub.isOptedOut(true);
ContextHub.eventing.pause();
e.each(m(),function(z,A){A.reset(y)
});
if(!x){ContextHub.eventing.resume()
}};
var w=function(D,y,B,F){if(e.type(D)==="string"){D=[D]
}var z=[];
e.each(D,function(I,H){var G="/"+ContextHub.Utils.JSON.tree.sanitizeKey(H).join("/");
z.push(G)
});
D=z;
y=y||function(){};
B=B||function(){};
var A=k(D);
var C=true;
if(A._length===D.length){C=false;
y(A)
}var E=0;
var x=function(J,H){if(H){var M={};
var L=true;
e.each(H,function(N){M=ContextHub.Utils.JSON.tree.setItem(M,N,true)
});
for(var G=0;
G<D.length;
G++){if(ContextHub.Utils.JSON.tree.getItem(M,D[G])){L=false;
break
}}if(L){return
}}var I=k(D);
var K=B;
if(I._length===D.length){K=y;
h.clearTimeout(E)
}K(I)
};
if(C){E=h.setTimeout(x,F)
}g.push(x)
};
var a=function(x){if(x){f=null
}if(f===null){f=ContextHub.Utils.Cookie.getItem("cq-opt-out")!==null
}return f
};
e.extend(ContextHub,{persistence:v,eventing:o,registerStore:c,getAllStores:m,getStore:q,set:l,get:t,getItem:j,setItem:b,removeItem:u,cleanAllStores:s,resetAllStores:p,sync:i,bind:w,isOptedOut:a});
ContextHub.eventing.on(ContextHub.Constants.EVENT_STORE_UPDATED,function(y,z){e.each(n||[],function(B,A){if(A&&A(B)){delete n[B];
n=e.grep(n,e.isFunction)
}});
if((g||[]).length){var x={};
if(z.keys){e.each(z.keys.all.list,function(A,B){x["/"+z.store+B]=true
})
}e.each(g||[],function(B,A){if(A){A(B,x)
}})
}},"sync-bind")
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.kernel - task.stores-initialization-watcher.js");
(function(d,b){var a="initialization-watcher";
var c={};
var e=b.setTimeout(function(){var f={};
d.each(b.ContextHubKernelConfig.stores,function(g){if(!c[g]){f[g]=true
}});
ContextHub.eventing.trigger(ContextHub.Constants.EVENT_STORES_PARTIALLY_READY,{},{defer:0,_:{wasReadyAt:new Date().getTime(),storesReady:c,storesNotReady:f}});
ContextHub.eventing.off(ContextHub.Constants.EVENT_STORE_READY,a)
},b.ContextHubKernelConfig.initializationTimeout);
ContextHub.eventing.on(ContextHub.Constants.EVENT_STORE_READY,function(g,h){c[h.store]=true;
var f=true;
d.each(b.ContextHubKernelConfig.stores,function(i,j){if(!c[i]&&j.required){f=false
}});
if(f){b.clearTimeout(e);
ContextHub.console.timeStamp("contexthub initialized");
ContextHub.eventing.off(g.type,a);
ContextHub.eventing.trigger(ContextHub.Constants.EVENT_ALL_STORES_READY,{},{defer:0,_:{wasReadyAt:new Date().getTime(),stores:c}})
}},a)
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.generic-stores - ContextHub.Store.Core.js");
(function(d,c){c.ContextHub.Store=c.ContextHub.Store||{};
var b=new ContextHub.Utils.Persistence.prototype.PersistenceMode("memory",function a(g){var e=g.container;
var j=g.storage;
var i=function(){var k=((d.type(j)==="object")?j:{})[e];
return(d.type(k)==="object")?k:{}
};
var h=function(k){j=(d.type(j)==="object")?j:{};
j[e]=k
};
var f=ContextHub.Utils.Persistence.prototype.PersistenceMode.prototype;
return{setItem:f.setItem.bind(this,h,i),getItem:f.getItem.bind(this,i),removeItem:f.removeItem.bind(this,h,i),getKeys:function(){return ContextHub.Utils.JSON.tree.getKeys(i())
},getTree:i}
});
ContextHub.Store.Core=function(){};
ContextHub.Store.Core.prototype.init=function(g,f){this.config=d.extend(true,{},ContextHub.Store.Core.defaultConfig,f);
this.name=g;
this.eventChannel=ContextHub.Constants.EVENT_STORE_UPDATED+":"+this.name;
this.storeDataKey="/store/"+this.name;
this.data={};
this.references={};
if(!this.config.persistence){this.config.persistence=new ContextHub.Utils.Persistence({container:"data",mode:b,storage:this.data})
}if(!this.config.eventing){var h=function(){};
this.config.eventing={trigger:h,isPaused:h,pause:h,resume:h}
}this.persistence=this.config.persistence;
this.eventing=this.config.eventing;
var e=this.isEventingPaused();
this.pauseEventing();
d.each(this.config.initialValues||{},function(i,j){if(!this.getItem(i)){this.setItem(i,j)
}}.bind(this));
if(!e){this.resumeEventing()
}};
ContextHub.Store.Core.defaultConfig={eventDeferring:16*2,eventing:ContextHub.eventing,persistence:ContextHub.persistence};
ContextHub.Store.Core.prototype.clean=function(){this.removeItem("/")
};
ContextHub.Store.Core.prototype.reset=function(f){var e=this.isEventingPaused();
this.pauseEventing();
if(!f){this.clean()
}this.addAllItems(this.config.initialValues||{});
if(!e){this.resumeEventing()
}};
ContextHub.Store.Core.prototype.setItem=function(n,m,o){var f=this.resolveReference(n);
var e=this.getItem(f);
var j=true;
var i=typeof m;
if(typeof e===i){var g=(i==="string"||i==="number"||i==="boolean");
if(g){j=(e!==m)
}else{var l=ContextHub.Utils.JSON.stringify(e);
var k=ContextHub.Utils.JSON.stringify(m);
j=(l.length!==k.length)||(l!==k)
}}if(j){var h=this.persistence.setItem(this.storeDataKey+"/"+f,m);
if(h&&!(o||{}).silent){this.eventing.trigger(this.eventChannel,{key:f,value:m,old:e,action:"set"},d.extend(true,{defer:this.config.eventDeferring,_:{store:this.name,muteWhenNoData:true}},o))
}}return j
};
ContextHub.Store.Core.prototype.getItem=function(f){var e=this.resolveReference(f);
return this.persistence.getItem(this.storeDataKey+"/"+e)
};
ContextHub.Store.Core.prototype.removeItem=function(i,h){var e=this.resolveReference(i);
var g=false;
var f=this.getItem(e);
if(f!==null){g=true;
var j=this.persistence.removeItem(this.storeDataKey+"/"+e);
if(j&&!(h||{}).silent){this.eventing.trigger(this.eventChannel,{key:e,value:null,old:f,store:this.name,action:"remove"},d.extend(true,{defer:this.config.eventDeferring,_:{store:this.name,muteWhenNoData:true}},h))
}}return g
};
ContextHub.Store.Core.prototype.getKeys=function(f){var e=this.persistence.getTree();
e=ContextHub.Utils.JSON.tree.getItem(e,this.storeDataKey)||{};
if(!f){delete e._
}return ContextHub.Utils.JSON.tree.getKeys(e)
};
ContextHub.Store.Core.prototype.getTree=function(f){var e=this.persistence.getItem(this.storeDataKey)||{};
if(!f){delete e._
}return e
};
ContextHub.Store.Core.prototype.addAllItems=function(e,g){var h=d.type(e);
var f=this;
var i=false;
if(h==="object"||h==="array"){d.each(e,function(k,l){var j=f.setItem(k,l,g);
i=i||j
})
}return i
};
ContextHub.Store.Core.prototype.addReference=function(h,e){var j=ContextHub.Utils.JSON.tree.sanitizeKey(h);
var k=ContextHub.Utils.JSON.tree.sanitizeKey(e);
var f=false;
if(j&&k){var g="/"+j.join("/");
var i="/"+k.join("/");
if(g!==i){f=true;
this.references[g]=i
}}return f
};
ContextHub.Store.Core.prototype.removeReference=function(g){var h=ContextHub.Utils.JSON.tree.sanitizeKey(g);
var e=false;
if(h){e=true;
var f="/"+h.join("/");
delete this.references[f]
}return e
};
ContextHub.Store.Core.prototype.getReferences=function(){return this.references
};
ContextHub.Store.Core.prototype.resolveReference=function(n,f){var h=ContextHub.Utils.JSON.tree.sanitizeKey(n);
var k="/"+h.join("/");
if(!d.isEmptyObject(this.references)&&n){var e=f||5;
var l=k;
while((e>0)&&l){e--;
var j=ContextHub.Utils.JSON.tree.sanitizeKey(k);
var i="";
var g=j.slice(0);
for(var m=0;
m<j.length&&!this.references[i];
m++){i+="/"+j[m];
g.shift()
}l=this.references[i];
if(l){l=l+"/"+g.join("/");
l="/"+ContextHub.Utils.JSON.tree.sanitizeKey(l).join("/")
}k=l||k
}}return k
};
ContextHub.Store.Core.prototype.pauseEventing=function(){if(this.eventing){this.eventing.pause(this.eventChannel)
}};
ContextHub.Store.Core.prototype.resumeEventing=function(){if(this.eventing){this.eventing.resume(this.eventChannel)
}};
ContextHub.Store.Core.prototype.isEventingPaused=function(){return this.eventing&&this.eventing.isPaused(this.eventChannel)
};
ContextHub.Store.Core.prototype.announceReadiness=function(){var f=this.name;
var e=null;
ContextHub.console.timeStamp('"'+f+'" ready');
if(this instanceof ContextHub.Store.JSONPStore){var g=this.getKeys();
e={keys:{all:{hash:{},list:g}}};
d.each(g,function(h,i){e.keys.all.hash[i]=true
})
}this.eventing.trigger(ContextHub.Constants.EVENT_STORE_READY+":"+f,{},{defer:0,_:{action:"ready",store:f,wasReadyAt:new Date().getTime(),duration:this.duration||0,overlay:e}})
};
ContextHub.Store.Core.prototype.onUpdate=function(e,h){var g=typeof h==="function";
var f=this.eventChannel;
if(g){ContextHub.eventing.on(f,h.bind(this),e)
}else{ContextHub.eventing.off(f,e)
}}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.generic-stores - ContextHub.Store.SessionStore.js");
(function(b,a){a.ContextHub.Store=a.ContextHub.Store||{};
ContextHub.Store.SessionStore=function(){};
ContextHub.Store.SessionStore.defaultConfig={eventDeferring:16*2,persistence:null,eventing:ContextHub.eventing};
ContextHub.Utils.inheritance.inherit(ContextHub.Store.SessionStore,ContextHub.Store.Core);
ContextHub.Store.SessionStore.prototype.init=function(d,c){this.config=b.extend(true,{},this.config,ContextHub.Store.SessionStore.defaultConfig,c);
this.uber("init",d,this.config)
}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.generic-stores - ContextHub.Store.PersistedStore.js");
(function(b,a){a.ContextHub.Store=a.ContextHub.Store||{};
ContextHub.Store.PersistedStore=function(){};
ContextHub.Store.PersistedStore.defaultConfig={eventDeferring:16*2,persistence:ContextHub.persistence};
ContextHub.Utils.inheritance.inherit(ContextHub.Store.PersistedStore,ContextHub.Store.Core);
ContextHub.Store.PersistedStore.prototype.init=function(d,c){this.config=b.extend(true,{},this.config,ContextHub.Store.PersistedStore.defaultConfig,c);
this.uber("init",d,this.config)
}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.generic-stores - ContextHub.Store.JSONPStore.js");
(function(c,b){b.ContextHub.Store=b.ContextHub.Store||{};
ContextHub.Store.JSONPStore=function(){};
ContextHub.Utils.inheritance.inherit(ContextHub.Store.JSONPStore,ContextHub.Store.Core);
var a=function(f){var e=f||"";
e=e.replace(/[^a-zA-Z0-9]/g,"");
var d=function(){var h=0;
for(var i=0;
i<f.length;
i++){h=~~(((h<<5)-h)+f.charCodeAt(i))
}var g=Math.sin(h)*10000;
return g-Math.floor(g)
};
if((e.length===0)||(e!==f)){e="x"+e+d().toString(36).substr(2,5)
}return e
};
ContextHub.Store.JSONPStore.prototype.init=function(e,d){this.config=c.extend(true,{},this.config,ContextHub.Store.JSONPStore.defaultConfig,d);
this.callbackName=a(e);
this.uber("init",e,this.config)
};
ContextHub.Store.JSONPStore.defaultConfig={eventDeferring:16*2,persistence:null,eventing:ContextHub.eventing,service:null};
ContextHub.Store.JSONPStore.prototype.getServiceDetails=function(){return this.config.service
};
ContextHub.Store.JSONPStore.prototype.configureService=function(e,d){this.config.service=d?e:c.extend(true,{},this.config.service,e)
};
ContextHub.Store.JSONPStore.prototype.resolveParameter=function(h){var e=(c.type(h)==="boolean")?String(h):h;
var d=e||"";
var g=["ContextHub.Paths."];
if(c.type(e)==="string"){var f=d.match(/\$\{(contexthub|variable):[^}]+}/g);
if(f){c.each(f,function(i,m){var n=m.slice(2,-1).split(/:/);
var l=n.shift();
var j=n.shift();
var k=null;
if(l==="contexthub"){k=ContextHub.persistence.getItem(j)
}if((l==="variable")&&j){c.each(this.allowedPrefix,function(o,p){var q=j.indexOf(p)===0;
if(q){k=ContextHub.Utils.JSON.tree.getItem(b,j.replace(/\./g,"/"))
}return !q
})
}d=d.replace(m,k||"")
}.bind({allowedPrefix:g}))
}}return d
};
ContextHub.Store.JSONPStore.prototype.getServiceURL=function(h){var e=this.getServiceDetails();
var f=[];
var i=[];
var g;
if(c.type(e)!=="object"){return null
}if(e.jsonp){var d;
if(e.jsonp===true){d="callback"
}else{d=(""+e.jsonp).replace(/[^a-zA-Z0-9_$]/g,"")
}e.params=e.params||{};
e.params[d]="ContextHub.Callbacks."+this.callbackName
}e.port=(e.port&&e.port===80)?"":e.port;
if(e.host){if(typeof e.secure==="undefined"||e.secure==="auto"){f.push("//")
}else{f.push(e.secure?"https://":"http://")
}f.push(e.host);
f.push(e.port?(":"+e.port):"")
}else{f.push(b.location.protocol+"//"+b.location.host)
}e.path=e.path||"/";
g=""+(h?this.resolveParameter(e.path):e.path);
f.push(g);
c.each(e.params||{},function(j,k){i.push(encodeURIComponent(j)+"="+encodeURIComponent(h?this.resolveParameter(k):k))
}.bind(this));
if(i.length){f.push((g.indexOf("?")===-1)?"?":"&");
f.push(i.join("&"))
}return f.join("")
};
ContextHub.Store.JSONPStore.prototype.queryService=function(d){var f=this.getServiceURL(true);
if(!f){return
}var h=this.config.service.jsonp||this.config.service.script;
var j=this.isEventingPaused();
var k=this;
if(d){this.removeItem("_",{silent:true})
}var e=this.getItem(ContextHub.Constants.SERVICE_RESPONSE_TIME_KEY)||0;
var g=this.getItem(ContextHub.Constants.SERVICE_LAST_URL_KEY);
if((e+this.config.service.ttl>new Date().getTime())&&(g===f)){this.duration="cached";
this.announceReadiness();
return
}this.setItem(ContextHub.Constants.SERVICE_LAST_URL_KEY,f);
b.ContextHub.Callbacks=b.ContextHub.Callbacks||{};
ContextHub.Callbacks[this.callbackName]=this.callbackFunction.bind(this);
var l={url:f,timeout:this.config.service.timeout,async:this.config.service.synchronous?false:true,method:this.config.service.method||"GET"};
if(h){c.extend(l,{dataType:"script",cache:true})
}this.pauseEventing();
this.duration=0;
ContextHub.Shared.timers.start(this.name);
var i=c.ajax(l);
if(!h){i.done(function(m,n,o){var p=ContextHub.Utils.JSON.parse(o.responseText);
ContextHub.Callbacks[k.callbackName](p)
})
}i.fail(function(m){k.failureHandler(m)
});
i.always(function(){if(!j){k.resumeEventing()
}k.announceReadiness()
})
};
ContextHub.Store.JSONPStore.prototype.successHandler=function(d){return d
};
ContextHub.Store.JSONPStore.prototype.failureHandler=function(e){var d=(this.config||{}).service;
ContextHub.console.log('There was an error while accessing JSONP service in the store "'+this.name+'", configuration: ',d,", error: ",e)
};
ContextHub.Store.JSONPStore.prototype.callbackFunction=function(d){this.duration=ContextHub.Shared.timers.finish(this.name)+"ms";
this.setItem(ContextHub.Constants.SERVICE_RESPONSE_TIME_KEY,new Date().getTime());
this.setItem(ContextHub.Constants.SERVICE_RAW_RESPONSE_KEY,this.successHandler(d))
};
ContextHub.Store.JSONPStore.prototype.getRawResponse=function(){return this.getItem(ContextHub.Constants.SERVICE_RAW_RESPONSE_KEY)||{}
};
ContextHub.Store.JSONPStore.prototype.reset=function(d){this.uber("reset",d);
this.queryService(false)
}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.generic-stores - ContextHub.Store.PersistedJSONPStore.js");
(function(b,a){a.ContextHub.Store=a.ContextHub.Store||{};
ContextHub.Store.PersistedJSONPStore=function(){};
ContextHub.Store.PersistedJSONPStore.defaultConfig={eventDeferring:16*2,persistence:ContextHub.persistence};
ContextHub.Utils.inheritance.inherit(ContextHub.Store.PersistedJSONPStore,ContextHub.Store.JSONPStore);
ContextHub.Store.PersistedJSONPStore.prototype.init=function(d,c){this.config=b.extend(true,{},this.config,ContextHub.Store.PersistedJSONPStore.defaultConfig,c);
this.uber("init",d,this.config)
}
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.Constants.js");
(function(b){var a={EVENT_SEGMENT_REGISTERED:"segment-engine:segment-registered",EVENT_SEGMENT_UNREGISTERED:"segment-engine:segment-unregistered",EVENT_SEGMENT_UPDATED:"segment-engine:segment-updated",EVENT_SCRIPT_REGISTERED:"segment-engine:script-registered",EVENT_SCRIPT_UNREGISTERED:"segment-engine:script-unregistered",EVENT_SCRIPT_UPDATED:"segment-engine:script-updated",EVENT_TEASER_REGISTERED:"segment-engine:teaser-registered",EVENT_TEASER_UNREGISTERED:"segment-engine:teaser-unregistered",EVENT_TEASER_LOADED:"segment-engine:teaser-loaded"};
b.extend(true,ContextHub.Constants,a)
}(ContextHubJQ));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.js");
(function(b,a){a.ContextHub.SegmentEngine={version:"0.2.26-20180427-0639"};
ContextHub.SegmentEngine.getResolvedSegments=function(c){return ContextHub.SegmentEngine.SegmentManager.getResolvedSegments(c)
};
ContextHub.SegmentEngine.getSegment=function(c){return ContextHub.SegmentEngine.SegmentManager.getSegment(c)
};
ContextHub.SegmentEngine.getComparisonOperators=function(){return ContextHub.SegmentEngine.OperatorManager.getAllOperators()
};
ContextHub.SegmentEngine.getObjectValue=function(d){var c;
if(d===null||d===undefined){c=null
}else{if(d instanceof ContextHub.SegmentEngine.Operator){c=d.isResolved()
}else{if(d instanceof ContextHub.SegmentEngine.Property){c=d.getValue()
}else{if(d instanceof ContextHub.SegmentEngine.ScriptReference){c=d.execute()
}else{if(d instanceof ContextHub.SegmentEngine.SegmentReference){c=d.isResolved()
}else{c=d
}}}}}return c
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.Property.js");
(function(b,a){a.ContextHub.SegmentEngine=a.ContextHub.SegmentEngine||{};
ContextHub.SegmentEngine.Property=function(d){var c=ContextHub.SegmentEngine.Property;
if(!(this instanceof c)){return ContextHub.Utils.inheritance.newInstance(c,arguments)
}d=ContextHub.Utils.JSON.tree.sanitizeKey(d);
this.key="/"+d.join("/");
this.storeName=d.shift();
this.itemName=d.join("/")
};
ContextHub.SegmentEngine.Property.prototype.info={className:"Property",updateEvent:ContextHub.Constants.EVENT_STORE_UPDATED};
ContextHub.SegmentEngine.Property.prototype.getKey=function(){return this.key
};
ContextHub.SegmentEngine.Property.prototype.getStoreName=function(){return this.storeName
};
ContextHub.SegmentEngine.Property.prototype.getItemName=function(){return this.itemName
};
ContextHub.SegmentEngine.Property.prototype.getValue=function(){return ContextHub.get(this.key)
};
ContextHub.SegmentEngine.Property.prototype.toString=function(){return this.info.className+'("'+this.getKey()+'") -> '+this.getValue()
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.Operator.js");
(function(b,a){a.ContextHub.SegmentEngine=a.ContextHub.SegmentEngine||{};
ContextHub.SegmentEngine.Operator=function(d,e){var c=ContextHub.SegmentEngine.Operator;
if(!(this instanceof c)){return ContextHub.Utils.inheritance.newInstance(c,arguments)
}e=[].slice.call(arguments,1);
this.operatorName=d;
this.operatorArguments=e
};
ContextHub.SegmentEngine.Operator.prototype.getOperatorName=function(){return this.operatorName
};
ContextHub.SegmentEngine.Operator.prototype.getOperatorArguments=function(){return this.operatorArguments
};
ContextHub.SegmentEngine.Operator.prototype.isResolved=function(){var i=false;
var j=true;
var p=this.getOperatorName();
var o=/^and(\.|$)/.test(p);
var c=/^or(\.|$)/.test(p);
var k=this.getOperatorArguments();
if((o||c)&&k.length<2){var q=k.length;
if(q===0){k.push(null);
k.push(null)
}if(q===1){k.push(o?true:null)
}}var d=k[0];
var m=ContextHub.SegmentEngine.getObjectValue(d);
var n=b.type(m);
var s=ContextHub.SegmentEngine.OperatorManager.getOperator(p,n);
var e=function(u){if(o&&u===false){i=false;
j=false
}if(c&&u===true){i=true;
j=false
}};
e(m);
var t=k.length?k.slice(1):[null];
if(s&&j){var l=(o||c)?k.length:2;
p=s.operatorName;
t=[];
for(var r=1;
(r<l)&&j;
r++){var g=k[r];
var f=ContextHub.SegmentEngine.getObjectValue(g);
t.push(f);
e(f)
}if(j){var h=[m].concat([].slice.call(t));
i=s.handler.apply(this,h)
}}ContextHub.console.debug("    comparing:",m,p,(t.length?t.join(" "+p+" "):t+""),"=",i);
this._resolution=[p,i,[].concat.call([m],t)];
return i
};
ContextHub.SegmentEngine.Operator.prototype.traverse=function(e,d){var c=[];
var f=function(g){if(g&&(typeof g.isResolved!=="function")){return
}if((typeof d==="undefined")||((typeof d==="function")&&d(g))){c.push(g);
if(typeof e==="function"){e(g)
}}};
f(this);
if(ContextHub.SegmentEngine.OperatorManager.getOperator(this.operatorName)){b.each(this.getOperatorArguments(),function(g,h){if(h instanceof ContextHub.SegmentEngine.Operator){b.merge(c,h.traverse(e,d))
}else{f(h)
}})
}return c
};
ContextHub.SegmentEngine.Operator.prototype.toString=function(){var c='Operator("'+this.getOperatorName()+'"';
b.each(this.getOperatorArguments(),function(e,d){c+=", "+d
});
c+=") -> "+this.isResolved();
return c
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.OperatorManager.js");
(function(c,a){a.ContextHub.SegmentEngine=a.ContextHub.SegmentEngine||{};
var b={};
ContextHub.SegmentEngine.OperatorManager={};
ContextHub.SegmentEngine.OperatorManager.register=function(e,d){if((typeof e==="string")&&e.length&&!/\.$/.test(e)){b[e]={operatorName:e,handler:d}
}};
ContextHub.SegmentEngine.OperatorManager.unregister=function(d){delete b[d]
};
ContextHub.SegmentEngine.OperatorManager.unregisterAllOperators=function(){b={}
};
ContextHub.SegmentEngine.OperatorManager.getAllOperators=function(){return b
};
ContextHub.SegmentEngine.OperatorManager.getOperator=function(g,e){var h=(g||"").split(".",2);
g=h.shift();
var d=h.shift()||"";
var f=b[g+"."+d]||b[g+"."+e]||b[g];
return f||null
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.Segment.js");
(function(c,a){a.ContextHub.SegmentEngine=a.ContextHub.SegmentEngine||{};
ContextHub.SegmentEngine.Segment=function(g,j){var e=ContextHub.SegmentEngine.Segment;
if(!(this instanceof e)){return ContextHub.Utils.inheritance.newInstance(e,arguments)
}var f=g||{};
if(typeof f==="string"){f={path:g}
}else{if(f.length){f={name:f.shift(),path:f.shift(),boost:f.shift()}
}}var h=c.trim(f.name);
var d=c.trim(f.path);
var i=parseInt(c.trim(f.boost),10)||0;
if(h.length===0){h=d.split("/").pop()
}h=h.replace(/ /g,"-").replace(/[^a-z0-9\-]/ig,"").toLowerCase();
this.name=h;
this.path=d;
this.boost=i;
this.register(j)
};
ContextHub.SegmentEngine.Segment.prototype.info={className:"Segment",updateEvent:ContextHub.Constants.EVENT_SEGMENT_UPDATED};
ContextHub.SegmentEngine.Segment.prototype.register=function(d){if(this.getPath().length===0||this.isRegistered()){return
}if(d instanceof ContextHub.SegmentEngine.Operator){this.cachedResult=null;
this.condition=d;
this.enabled=false;
this.registered=false;
ContextHub.SegmentEngine.Dependency.findAllDependencies.call(this,this.getCondition());
ContextHub.SegmentEngine.SegmentManager.register(this)
}};
ContextHub.SegmentEngine.Segment.prototype.unregister=function(){this.registered=false;
this.enabled=false;
this.condition=null;
this.isResolved();
ContextHub.SegmentEngine.SegmentManager.unregister(this.getPath())
};
ContextHub.SegmentEngine.Segment.prototype.isResolved=function(){var d=false;
if(this.cachedResult!==null){ContextHub.console.debug('[+] Segment "'+this.getPath()+'" resolution (cached):',this.cachedResult);
return this.cachedResult
}ContextHub.console.debug('[+] Segment "'+this.getPath()+'" resolution:');
if(this.isEnabled()&&this.isRegistered()){d=this.condition.isResolved()
}if(d!==this.cachedResult){this.cachedResult=d;
ContextHub.eventing.trigger(this.info.updateEvent,{resolved:d,key:this.getPath(),action:"set",value:d},{defer:0,_:{resolved:d,path:this.getPath()}})
}return d
};
var b=function(i,e){var d=i._resolution;
var k;
e=e||[];
if(d){var h=d.shift();
var g=d.shift();
var j=d.shift();
k=h+" ("+g+")";
var f={};
f[k]=j;
if(e instanceof Array){e.push(f)
}else{return f
}}c.each(i.operatorArguments,function(l,n){if(n instanceof ContextHub.SegmentEngine.Operator){var o=((e instanceof Array)?e[e.length-1]:e)[k];
var m=(typeof o[l]==="boolean")?{}:[];
o[l]=b(n,m)
}});
return e
};
ContextHub.SegmentEngine.Segment.prototype.debug=function(){var e=this.getCondition();
if(e){var f=this.isResolved();
var d=b(e);
ContextHub.console.debug("[todo] debug: ",f,d)
}else{ContextHub.console.debug('[-] [SegmentEngine] Segment "'+this.getPath()+'" is invalid.')
}};
ContextHub.SegmentEngine.Segment.prototype.isRegistered=function(){return this.registered===true
};
ContextHub.SegmentEngine.Segment.prototype.isEnabled=function(){return this.enabled===true
};
ContextHub.SegmentEngine.Segment.prototype.enable=function(){if(this.condition instanceof ContextHub.SegmentEngine.Operator){this.enabled=true
}};
ContextHub.SegmentEngine.Segment.prototype.disable=function(){this.enabled=false
};
ContextHub.SegmentEngine.Segment.prototype.getName=function(){return this.name
};
ContextHub.SegmentEngine.Segment.prototype.getPath=function(){return this.path
};
ContextHub.SegmentEngine.Segment.prototype.getBoost=function(){return this.boost
};
ContextHub.SegmentEngine.Segment.prototype.getCondition=function(){return this.condition
};
ContextHub.SegmentEngine.Segment.prototype.getDependencies=function(){return this.dependencyList||ContextHub.SegmentEngine.Dependency.getEmptyDependencyList()
};
ContextHub.SegmentEngine.Segment.prototype.onUpdate=function(d,g){var f=typeof g==="function";
var e=this.info.updateEvent;
if(f){ContextHub.eventing.on(e,function(h,i){if(i&&i.keys.all.hash[this.segment]){this.handler()
}}.bind({segment:this.getPath(),handler:g}),d)
}else{ContextHub.eventing.off(e,d)
}};
ContextHub.SegmentEngine.Segment.prototype.toString=function(){var d='("'+this.getPath()+'", '+this.getBoost()+", "+this.getCondition()+")";
return this.info.className+d+" -> "+this.isResolved()
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.SegmentReference.js");
(function(b,a){a.ContextHub.SegmentEngine=a.ContextHub.SegmentEngine||{};
ContextHub.SegmentEngine.SegmentReference=function(c){var d=ContextHub.SegmentEngine.SegmentReference;
if(!(this instanceof d)){return ContextHub.Utils.inheritance.newInstance(d,arguments)
}this.segmentPath=b.trim(c)
};
ContextHub.SegmentEngine.SegmentReference.prototype.info={className:"SegmentReference",updateEvent:ContextHub.Constants.EVENT_SEGMENT_UPDATED};
ContextHub.SegmentEngine.SegmentReference.prototype.getSegmentPath=function(){return this.segmentPath
};
ContextHub.SegmentEngine.SegmentReference.prototype.isResolved=function(){var c=false;
var d=ContextHub.SegmentEngine.SegmentManager.getSegment(this.getSegmentPath());
if(d){c=d.isResolved()
}return c
};
ContextHub.SegmentEngine.SegmentReference.prototype.toString=function(){return this.info.className+'("'+this.getSegmentPath()+'") -> '+this.isResolved()
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.SegmentManager.js");
(function(b,a){a.ContextHub.SegmentEngine=a.ContextHub.SegmentEngine||{};
var c={};
ContextHub.SegmentEngine.SegmentManager={};
ContextHub.SegmentEngine.SegmentManager.info={registerEvent:ContextHub.Constants.EVENT_SEGMENT_REGISTERED,unregisterEvent:ContextHub.Constants.EVENT_SEGMENT_UNREGISTERED};
ContextHub.SegmentEngine.SegmentManager.register=function(d){if(!(d instanceof ContextHub.SegmentEngine.Segment)||!d.getCondition()){return false
}c[d.getPath()]=d;
d.enabled=true;
d.registered=true;
ContextHub.eventing.trigger(ContextHub.SegmentEngine.SegmentManager.info.registerEvent,{key:d.getPath(),action:"set",value:"registered"},{defer:0});
ContextHub.SegmentEngine.Dependency.dependencyMonitor(d,true);
d.isResolved();
return true
};
ContextHub.SegmentEngine.SegmentManager.unregister=function(d){var e;
if(d instanceof ContextHub.SegmentEngine.Segment){e=d
}else{e=this.getSegment(d)
}if(e){e.registered=false;
e.disable();
delete c[e.getPath()];
ContextHub.SegmentEngine.Dependency.dependencyMonitor(e,false);
e.cachedResult=null;
e.dependencyList=ContextHub.SegmentEngine.Dependency.getEmptyDependencyList();
e.isResolved();
ContextHub.eventing.trigger(ContextHub.SegmentEngine.SegmentManager.info.unregisterEvent,{segment:e,key:e.getPath(),action:"remove",value:"unregistered"},{defer:0})
}};
ContextHub.SegmentEngine.SegmentManager.unregisterAllSegments=function(){b.each(c,function(d,e){e.unregister()
})
};
ContextHub.SegmentEngine.SegmentManager.getAllSegments=function(){return c
};
ContextHub.SegmentEngine.SegmentManager.getSegment=function(d){return c[d]||null
};
ContextHub.SegmentEngine.SegmentManager.getResolvedSegments=function(d){var f=(d||{}).returnLookup===true;
var e=f?{}:[];
var g=ContextHub.Shared.timers.start();
b.each(c,function(h,i){if(i.isResolved()){if(f){e[i.getPath()]=i
}else{e.push(i)
}}});
ContextHub.console.log(ContextHub.Shared.timestamp(),"[+] checking resolved segments ("+ContextHub.Shared.timers.finish(g)+"ms)");
return e
};
ContextHub.SegmentEngine.SegmentManager.getUnresolvedSegments=function(d){var f=(d||{}).returnLookup===true;
var e=f?{}:[];
var g=ContextHub.Shared.timers.start();
b.each(c,function(h,i){if(!i.isResolved()){if(f){e[i.getPath()]=i
}else{e.push(i)
}}});
ContextHub.console.log(ContextHub.Shared.timestamp(),"[+] checking unresolved segments ("+ContextHub.Shared.timers.finish(g)+"ms)");
return e
};
ContextHub.SegmentEngine.SegmentManager.invalidateCache=function(){for(var d in c){if(c.hasOwnProperty(d)){var e=c[d];
e.cachedResult=null
}}return ContextHub.SegmentEngine.SegmentManager.getResolvedSegments()
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.ScriptReference.js");
(function(b,a){a.ContextHub.SegmentEngine=a.ContextHub.SegmentEngine||{};
ContextHub.SegmentEngine.ScriptReference=function(f,e){var d=ContextHub.SegmentEngine.ScriptReference;
if(!(this instanceof d)){return ContextHub.Utils.inheritance.newInstance(d,arguments)
}e=[].slice.call(arguments,1);
this.scriptName=b.trim(f);
this.scriptArguments=e;
this.cachedResult=null;
this.dependencyList=ContextHub.SegmentEngine.Dependency.getEmptyDependencyList();
for(var c=0;
c<this.scriptArguments.length;
c++){this.dependOn(this.scriptArguments[c])
}ContextHub.SegmentEngine.Dependency.dependencyMonitor(this,true)
};
ContextHub.SegmentEngine.ScriptReference.prototype.info={className:"ScriptReference",updateEvent:ContextHub.Constants.EVENT_SCRIPT_UPDATED};
ContextHub.SegmentEngine.ScriptReference.prototype.dependOn=function(c){ContextHub.SegmentEngine.Dependency.addDependency.call(this,c)
};
ContextHub.SegmentEngine.ScriptReference.prototype.getScriptName=function(){return this.scriptName
};
ContextHub.SegmentEngine.ScriptReference.prototype.getScriptHandler=function(){return ContextHub.SegmentEngine.ScriptManager.getScript(this.getScriptName())
};
ContextHub.SegmentEngine.ScriptReference.prototype.getScriptArguments=function(){return this.scriptArguments
};
ContextHub.SegmentEngine.ScriptReference.prototype.getDependencies=function(){return this.dependencyList||ContextHub.SegmentEngine.Dependency.getEmptyDependencyList()
};
ContextHub.SegmentEngine.ScriptReference.prototype.execute=function(){var d=null;
var c=this.getScriptHandler();
if(this.cachedResult!==null){return this.cachedResult
}if(typeof c==="function"){var e=this.getScriptArguments();
var g=[];
b.each(e,function(h,i){var j=ContextHub.SegmentEngine.getObjectValue(i);
g.push(j)
});
try{d=c.apply(this,g)
}catch(f){ContextHub.console.error('[-] [SegmentEngine] User script "'+this.getScriptName()+'" failed:',f);
d=null
}}if(this.cachedResult!==d){this.cachedResult=d;
ContextHub.eventing.trigger(this.info.updateEvent+":"+this.getScriptName(),{script:this,key:this.getScriptName(),action:"set",resolved:d,value:d},{defer:0,_:{result:d,scriptName:this.getScriptName()}})
}return d
};
ContextHub.SegmentEngine.ScriptReference.prototype.isResolved=function(){return this.execute()
};
ContextHub.SegmentEngine.ScriptReference.prototype.toString=function(){var c=this.info.className+'("'+this.getScriptName()+'"';
b.each(this.getScriptArguments(),function(d,e){if(typeof e==="string"){e='"'+e+'"'
}c+=", "+e
});
c+=") -> "+this.execute();
return c
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.ScriptManager.js");
(function(c,b){b.ContextHub.SegmentEngine=b.ContextHub.SegmentEngine||{};
var a={};
ContextHub.SegmentEngine.ScriptManager={};
ContextHub.SegmentEngine.ScriptManager.register=function(f,e){if((typeof f==="string")&&f.length&&(typeof e==="function")){a[f]=e;
ContextHub.eventing.trigger(ContextHub.Constants.EVENT_SCRIPT_REGISTERED,{key:f,action:"set",value:"registered"},{defer:0})
}};
ContextHub.SegmentEngine.ScriptManager.unregister=function(e){if(this.isRegistered(e)){ContextHub.eventing.trigger(ContextHub.Constants.EVENT_SCRIPT_UNREGISTERED,{key:e,action:"remove",value:"unregistered"},{defer:0})
}delete a[e]
};
ContextHub.SegmentEngine.ScriptManager.unregisterAllScripts=function(){c.each(this.getAllScripts(),function(e){this.unregister(e)
}.bind(this))
};
ContextHub.SegmentEngine.ScriptManager.getAllScripts=function(){return a
};
var d=function(e){ContextHub.console.error('[-] [SegmentEngine] User script "'+e+'" not found.');
return function(){return null
}
};
ContextHub.SegmentEngine.ScriptManager.getScript=function(e){return a[e]||d(e)
};
ContextHub.SegmentEngine.ScriptManager.isRegistered=function(e){return !!a[e]
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine - ContextHub.SegmentEngine.Dependency.js");
(function(c,b){b.ContextHub.SegmentEngine=b.ContextHub.SegmentEngine||{};
ContextHub.SegmentEngine.Dependency={};
ContextHub.SegmentEngine.Dependency.allowedDependencies=[ContextHub.SegmentEngine.SegmentReference,ContextHub.SegmentEngine.ScriptReference,ContextHub.SegmentEngine.Property];
ContextHub.SegmentEngine.Dependency.getEmptyDependencyList=function(){var d={};
c.each(ContextHub.SegmentEngine.Dependency.allowedDependencies,function(e,f){d[f.prototype.info.className]={keys:[],updateEvent:null}
});
return d
};
ContextHub.SegmentEngine.Dependency.addDependency=function(g){if(!g){return
}this.dependencyList=this.dependencyList||ContextHub.SegmentEngine.Dependency.getEmptyDependencyList();
var e=null;
var d=null;
if(g instanceof ContextHub.SegmentEngine.Property){e=g.getKey();
d=e.replace(/(^\/|\/$)/g,"").split(/\//).shift()||null
}else{if(g instanceof ContextHub.SegmentEngine.ScriptReference){e=g.getScriptName()
}else{if(g instanceof ContextHub.SegmentEngine.SegmentReference){e=g.getSegmentPath()
}else{e=null
}}}if(e){var f=this.dependencyList[g.info.className];
if(!f[e]){f[e]=true;
f.keys.push(e)
}f.variant=g.info.className;
f.updateEvent=g.info.updateEvent;
if(d){f.stores=f.stores||{};
f.stores[d]=true
}}};
ContextHub.SegmentEngine.Dependency.findAllDependencies=function(i){var e=(i||{}).operatorArguments;
if(e){var h=i.operatorName;
var f=Math.min(e.length,/^(and|or)(\.|$)/.test(h)?Number.MAX_VALUE:2);
var d;
for(d=0;
d<f;
d++){var g=e[d];
if(g instanceof ContextHub.SegmentEngine.Operator){ContextHub.SegmentEngine.Dependency.findAllDependencies.call(this,g)
}else{ContextHub.SegmentEngine.Dependency.addDependency.call(this,g)
}}}};
var a=function(e,g){var f=this.getDependencies();
var d=null;
if(g.channel===ContextHub.SegmentEngine.SegmentReference.prototype.info.updateEvent){d=f.SegmentReference
}else{if(g.channel===ContextHub.SegmentEngine.ScriptReference.prototype.info.updateEvent){d=f.ScriptReference
}else{if(g.channel===ContextHub.SegmentEngine.Property.prototype.info.updateEvent){d=f.Property
}else{ContextHub.console.error("[-] [SegmentEngine] Unsupported event type:",g.channel)
}}}if(d&&ContextHub.SegmentEngine.Dependency.isMatching(g,d)){this.cachedResult=null;
this.isResolved()
}};
ContextHub.SegmentEngine.Dependency.dependencyMonitor=function(e,g){if(!(e instanceof ContextHub.SegmentEngine.Segment)&&!(e instanceof ContextHub.SegmentEngine.ScriptReference)){return
}var d=(e.getPath||e.getScriptName).call(e).replace(/[^a-z]/ig,"");
var f=e.getDependencies();
var j=[];
for(var i in f){if(f.hasOwnProperty(i)){var h=f[i];
if(h.keys.length){j.push(h.updateEvent)
}}}if(j.length){j=j.join(" ");
if(g){ContextHub.eventing.on(j,a.bind(e),d)
}else{ContextHub.eventing.off(j,d)
}}};
ContextHub.SegmentEngine.Dependency.isMatching=function(g,d){var e=(d||{}).variant;
var f=ContextHub.SegmentEngine.Dependency[e+"Handler"];
return(typeof f==="function")?f.call(this,g,d):false
};
ContextHub.SegmentEngine.Dependency.SegmentReferenceHandler=function(f,e){for(var d=0;
d<e.keys.length;
d++){var g=e.keys[d];
if(f.keys.all.hash[g]){return true
}}return false
};
ContextHub.SegmentEngine.Dependency.ScriptReferenceHandler=function(f,e){for(var d=0;
d<e.keys.length;
d++){var g=e.keys[d];
if(f.keys.all.hash[g]){return true
}}return false
};
ContextHub.SegmentEngine.Dependency.PropertyHandler=function(f,e){if(e.stores[f.store]){for(var d=0;
d<e.keys.length;
d++){var g=e.keys[d];
g=g.substr(g.indexOf("/",1));
if(f.keys.all.hash[g]){return true
}}}return false
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.and.js");
(function(){var a=function(c,b){return !!(c&&b)
};
ContextHub.SegmentEngine.OperatorManager.register("and",a)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.or.js");
(function(){var a=function(c,b){return !!(c||b)
};
ContextHub.SegmentEngine.OperatorManager.register("or",a)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.equal.js");
(function(g){var c=function(j,i){return j===i
};
var e=function(j,i){j=String(j);
i=String(i);
return j===i
};
var f=function(j,i){j=Number(j||undefined);
i=Number(i||undefined);
return j===i
};
var a=function(i){if(typeof i!=="boolean"){i=(/^true$/i).test(g.trim(String(i)))
}return i
};
var h=function(j,i){j=a(j);
i=a(i);
return j===i
};
var b=function(j,i){j=new Date(j||undefined);
i=new Date(i||undefined);
return Number(j)===Number(i)
};
var d=function(k,j){var i=false;
if(typeof k==="string"&&j){if(!(j instanceof RegExp)){j=new RegExp(j)
}i=j.test(k)
}return i
};
ContextHub.SegmentEngine.OperatorManager.register("equal",c);
ContextHub.SegmentEngine.OperatorManager.register("equal.string",e);
ContextHub.SegmentEngine.OperatorManager.register("equal.number",f);
ContextHub.SegmentEngine.OperatorManager.register("equal.boolean",h);
ContextHub.SegmentEngine.OperatorManager.register("equal.date",b);
ContextHub.SegmentEngine.OperatorManager.register("equal.regexp",d)
})(ContextHubJQ);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.not-equal.js");
(function(b){var a=function(c){return function(){return !c.apply(this,arguments)
}
};
b.each(ContextHub.SegmentEngine.OperatorManager.getAllOperators(),function(d,c){if(/^equal(\.|$)/.test(d)){ContextHub.SegmentEngine.OperatorManager.register("not-"+d,a(c.handler))
}})
})(ContextHubJQ);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.less-than.js");
(function(){var b=function(f,e){return f<e
};
var d=function(f,e){f=String(f);
e=String(e);
return f<e
};
var a=function(f,e){f=Number(f||undefined);
e=Number(e||undefined);
return f<e
};
var c=function(f,e){f=new Date(f||undefined);
e=new Date(e||undefined);
return Number(f)<Number(e)
};
ContextHub.SegmentEngine.OperatorManager.register("less-than",b);
ContextHub.SegmentEngine.OperatorManager.register("less-than.string",d);
ContextHub.SegmentEngine.OperatorManager.register("less-than.number",a);
ContextHub.SegmentEngine.OperatorManager.register("less-than.date",c)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.less-than-or-equal.js");
(function(c){var d=function(f,e){ContextHub.console.error("[-] [SegmentEngine] Comparison operator not found:",(f+(e?"."+e:"")));
return function(){return false
}
};
var b=function(g,e){var f=ContextHub.SegmentEngine.OperatorManager.getOperator(g,e)||{};
return f.handler||d(g,e)
};
var a=function(f){var g=b("less-than",f);
var e=b("equal",f);
return function(){return g.apply(this,arguments)||e.apply(this,arguments)
}
};
c.each(ContextHub.SegmentEngine.OperatorManager.getAllOperators(),function(h){if(/^less-than(\.|$)/.test(h)){var i=h.split(".",2);
var g=i.shift();
var f=i.shift();
var e=g.replace("less-than","less-than-or-equal");
if(f){e+="."+f
}ContextHub.SegmentEngine.OperatorManager.register(e,a(f))
}})
})(ContextHubJQ);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.greater-than.js");
(function(){var d=function(f,e){return f>e
};
var b=function(f,e){f=String(f);
e=String(e);
return f>e
};
var c=function(f,e){f=Number(f||undefined);
e=Number(e||undefined);
return f>e
};
var a=function(f,e){f=new Date(f||undefined);
e=new Date(e||undefined);
return Number(f)>Number(e)
};
ContextHub.SegmentEngine.OperatorManager.register("greater-than",d);
ContextHub.SegmentEngine.OperatorManager.register("greater-than.string",b);
ContextHub.SegmentEngine.OperatorManager.register("greater-than.number",c);
ContextHub.SegmentEngine.OperatorManager.register("greater-than.date",a)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.operators - Operator.greater-than-or-equal.js");
(function(c){var d=function(f,e){ContextHub.console.error("[-] [SegmentEngine] Comparison operator not found:",(f+(e?"."+e:"")));
return function(){return false
}
};
var b=function(g,e){var f=ContextHub.SegmentEngine.OperatorManager.getOperator(g,e)||{};
return f.handler||d(g,e)
};
var a=function(f){var g=b("greater-than",f);
var e=b("equal",f);
return function(){return g.apply(this,arguments)||e.apply(this,arguments)
}
};
c.each(ContextHub.SegmentEngine.OperatorManager.getAllOperators(),function(h){if(/^greater-than(\.|$)/.test(h)){var i=h.split(".",2);
var g=i.shift();
var f=i.shift();
var e=g.replace("greater-than","greater-than-or-equal");
if(f){e+="."+f
}ContextHub.SegmentEngine.OperatorManager.register(e,a(f))
}})
})(ContextHubJQ);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - PageInteraction.js");
(function(b,a){a.ContextHub.SegmentEngine.PageInteraction=a.ContextHub.SegmentEngine.PageInteraction||{};
ContextHub.SegmentEngine.PageInteraction={};
ContextHub.SegmentEngine.PageInteraction.info={propertyHolder:"data-contexthub-property",processorHolder:"data-processor",defaultHolder:"data-default-value"};
ContextHub.SegmentEngine.PageInteraction.getPropertyPlaceholders=function(f){var d="["+ContextHub.SegmentEngine.PageInteraction.info.propertyHolder+(f?'^="%1"]':"]");
var e=b([d.replace(/%1/,"/"+f),d.replace(/%1/,f)].join(", "));
var c=[];
b.each(e,function(g,h){var i=ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder(h);
if(i.isValid()){c.push(i)
}});
return c
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - PageInteraction.PropertyPlaceholder.js");
(function(b,a){a.ContextHub.SegmentEngine.PageInteraction=a.ContextHub.SegmentEngine.PageInteraction||{};
var c=function(){var e=this.element.attr(ContextHub.SegmentEngine.PageInteraction.info.propertyHolder);
if(!this.element||!e){this.storeName=null;
this.keyName=null;
this.propertyName=null;
this.defaultValue=null;
this.processors=[];
return
}var d=ContextHub.Utils.JSON.tree.sanitizeKey(e);
this.storeName=d.shift();
this.propertyName="/"+d.join("/");
this.keyName="/"+this.storeName+this.propertyName;
this.defaultValue=b.trim(this.element.attr(ContextHub.SegmentEngine.PageInteraction.info.defaultHolder)||"");
this.processors=[];
b.each((this.element.attr(ContextHub.SegmentEngine.PageInteraction.info.processorHolder)||"").split(/,/),function(f,g){var h=b.trim(g);
if(h.length){this.processors.push(h)
}}.bind(this))
};
ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder=function(e){var d=ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder;
if(!(this instanceof d)){return ContextHub.Utils.inheritance.newInstance(d,arguments)
}this.element=b(e);
c.call(this)
};
ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder.prototype.update=function(h){c.call(this);
var i=h;
var f=this.getValueProcessors();
if(!i){i=ContextHub.get(this.getKey())
}if(!i||(i==="")){i=this.getDefaultValue()
}for(var d=0;
d<f.length;
d++){var e=f[d];
var g=ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.getProcessor(e);
i=b.trim(g.handler.call(this,i))
}if(this.element.val()!==i){this.element.text(i)
}};
ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder.prototype.getPropertyName=function(){c.call(this);
return this.propertyName||""
};
ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder.prototype.getKey=function(){c.call(this);
return this.keyName||""
};
ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder.prototype.getDefaultValue=function(){c.call(this);
return this.defaultValue||""
};
ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder.prototype.getValueProcessors=function(){return this.processors||[]
};
ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder.prototype.isValid=function(){return !!this.propertyName
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - PageInteraction.PropertyProcessor.js");
(function(c,b){b.ContextHub.SegmentEngine.PageInteraction=b.ContextHub.SegmentEngine.PageInteraction||{};
var d={};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor={};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.register=function(f,e){if((typeof f==="string")&&f.length){d[f]={processorName:f,handler:e}
}};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.unregister=function(e){delete d[e]
};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.unregisterAllProcessors=function(){d={}
};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.getAllProcessors=function(){return d
};
var a={processorName:"default",handler:function(e){return e
}};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.getProcessor=function(e){return d[e]||a
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - PageInteraction.Teaser.js");
(function(b,a){a.ContextHub.SegmentEngine.PageInteraction=a.ContextHub.SegmentEngine.PageInteraction||{};
var d={analytics:1,design:1,disabled:1,preview:1,read_only:1};
var c=function(f){var e=f;
if(ContextHub.Constants.MODE==="ui"){var g=new RegExp("[?&]wcmmode=([^&#]*)").exec(a.location.href);
if(g&&(g.length>1)){g=(g[1]||"").toLowerCase()
}else{g=ContextHub.Utils.Cookie.getItem("wcmmode")
}if(d[g]){e+=((f.indexOf("?")===-1)?"?":"&")+"wcmmode="+g
}}return e
};
ContextHub.SegmentEngine.PageInteraction.Teaser=function(f){var e=ContextHub.SegmentEngine.PageInteraction.Teaser;
if(!(this instanceof e)){return ContextHub.Utils.inheritance.newInstance(e,arguments)
}f=f||{};
this.details={locationId:b.trim(f.locationId),variants:f.variants||[],strategy:b.trim(f.strategy),trackingURL:b.trim(f.trackingURL)};
this.register()
};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.info={className:"Teaser",loadEvent:ContextHub.Constants.EVENT_TEASER_LOADED};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.register=function(){if(!this.details.locationId.length||!this.details.variants.length||this.isRegistered()){return
}this.registered=ContextHub.SegmentEngine.PageInteraction.TeaserManager.register(this)
};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.unregister=function(){this.registered=false;
ContextHub.SegmentEngine.PageInteraction.TeaserManager.unregister(this)
};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.updatePlaceholder=function(){var f=this.getBestCandidate();
var e=null;
if(f){var g=this.currentlyLoaded||{};
e=c(f.url);
if((g.path===f.path)&&(g.url===e)){return
}}if(f){this.currentlyLoaded=b.extend(true,{},f,{url:e});
this.getVariantContent(e,function(i){var h=b("#"+this.details.locationId);
h.html(i);
ContextHub.eventing.trigger(ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.info.loadEvent,{teaser:this,variant:f,key:this.details.locationId,action:"set",value:"loaded"},{defer:0})
}.bind(this))
}else{delete this.currentlyLoaded
}};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.getVariantContent=function(h,g,i){var e=ContextHub.SegmentEngine.PageInteraction.Cache.get(h);
if(e){g.call(this,e.content,e.status,e.xhr);
return
}var f={url:h,async:true};
var j=b.ajax(f);
j.done(function(l,k,m){ContextHub.SegmentEngine.PageInteraction.Cache.set(h,{content:l,status:k,xhr:m,url:h});
g.call(this,l,k,m)
});
if(typeof i==="function"){j.fail(function(k){i.call(this,k)
})
}};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.getBestCandidate=function(){var i=null;
var j=[];
var n=[];
var m=ContextHub.SegmentEngine.SegmentManager.getResolvedSegments({returnLookup:true});
var g=this.details.variants;
for(var p=0;
p<g.length;
p++){var q=g[p];
var k=q.segments||[];
var e=false;
var h=false;
q.boost=0;
if(k.length===0){e=true;
h=true
}else{for(var o=0;
o<k.length;
o++){var l=m[k[o]];
if(typeof l!=="undefined"){e=true;
q.boost=Math.max(q.boost,l.boost||0)
}}}if(e){var f=h?n:j;
f.push(q)
}}if((j.length===0)||(this.details.strategy==="random")){j=[].concat.call(j,n)
}if(j.length){j.sort(function(s,r){return r.boost-s.boost
});
i=ContextHub.SegmentEngine.PageInteraction.StrategyManager.chooseCandidate(j,this.details.strategy)
}return i
};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.getCurrentlyLoaded=function(){return this.currentlyLoaded||null
};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.isRegistered=function(){return this.registered===true
};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.getTeaserId=function(){return this.details.locationId
};
ContextHub.SegmentEngine.PageInteraction.Teaser.prototype.toString=function(){var e=[];
b.each(e,function(f,g){e.push(f+': "'+g+'"')
});
return this.info.className+"("+e.join(", ")+")"
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - PageInteraction.TeaserManager.js");
(function(b,a){a.ContextHub.SegmentEngine.PageInteraction=a.ContextHub.SegmentEngine.PageInteraction||{};
var c={};
ContextHub.SegmentEngine.PageInteraction.TeaserManager={};
ContextHub.SegmentEngine.PageInteraction.TeaserManager.info={registerEvent:ContextHub.Constants.EVENT_TEASER_REGISTERED,unregisterEvent:ContextHub.Constants.EVENT_TEASER_UNREGISTERED};
ContextHub.SegmentEngine.PageInteraction.TeaserManager.register=function(d){if(!(d instanceof ContextHub.SegmentEngine.PageInteraction.Teaser)){return false
}c[d.getTeaserId()]=d;
ContextHub.eventing.trigger(ContextHub.SegmentEngine.PageInteraction.TeaserManager.info.registerEvent,{teaser:d,key:d.getTeaserId(),action:"set",value:"registered"},{defer:0});
return true
};
ContextHub.SegmentEngine.PageInteraction.TeaserManager.unregister=function(d){var e;
if(d instanceof ContextHub.SegmentEngine.PageInteraction.Teaser){e=d
}else{e=this.getTeaser(d)
}if(e){e.registered=false;
delete c[e.getTeaserId()];
ContextHub.eventing.trigger(ContextHub.SegmentEngine.PageInteraction.TeaserManager.info.unregisterEvent,{teaser:e,key:e.getTeaserId(),action:"remove",value:"unregistered"},{defer:0})
}};
ContextHub.SegmentEngine.PageInteraction.TeaserManager.unregisterAllTeasers=function(){b.each(c,function(d,e){e.unregister()
})
};
ContextHub.SegmentEngine.PageInteraction.TeaserManager.getAllTeasers=function(){return c
};
ContextHub.SegmentEngine.PageInteraction.TeaserManager.getTeaser=function(d){return c[d]||null
};
ContextHub.SegmentEngine.PageInteraction.TeaserManager.refreshAllTeasers=function(f){if(f){ContextHub.SegmentEngine.SegmentManager.invalidateCache()
}for(var d in c){if(c.hasOwnProperty(d)){var e=c[d];
e.updatePlaceholder()
}}}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - PageInteraction.StrategyManager.js");
(function(d,c){c.ContextHub.SegmentEngine.PageInteraction=c.ContextHub.SegmentEngine.PageInteraction||{};
var a={};
ContextHub.SegmentEngine.PageInteraction.StrategyManager={};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.register=function(g,e,f){if((typeof g==="string")&&g.length){a[g]={strategyName:g,displayName:e,handler:f}
}};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.unregister=function(e){delete a[e]
};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.unregisterAllStrategies=function(){a={}
};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.getAllStrategies=function(){return a
};
var b={strategyName:"default",displayName:"Default (first teaser candidate)",handler:function(e){return(e||[])[0]||null
}};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.getStrategy=function(e){return a[e]||b
};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.chooseCandidate=function(f,e){var g=ContextHub.SegmentEngine.PageInteraction.StrategyManager.getStrategy(e);
return g.handler.call(this,f)
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - PageInteraction.Cache.js");
(function(c,b){b.ContextHub.SegmentEngine.PageInteraction=b.ContextHub.SegmentEngine.PageInteraction||{};
var a={};
ContextHub.SegmentEngine.PageInteraction.Cache={};
ContextHub.SegmentEngine.PageInteraction.Cache.set=function(d,e){a[d]=e
};
ContextHub.SegmentEngine.PageInteraction.Cache.get=function(d){return a[d]||null
};
ContextHub.SegmentEngine.PageInteraction.Cache.getAllItems=function(){return a||{}
};
ContextHub.SegmentEngine.PageInteraction.Cache.clear=function(d){delete a[d]
};
ContextHub.SegmentEngine.PageInteraction.Cache.clearAllItems=function(){a={}
}
})(ContextHubJQ,window);
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - util.case-manipulation.js");
(function(){var b=function(d){return String(d).toLowerCase()
};
var a=function(d){return String(d).toUpperCase()
};
var c=function(d){return String(d).toLowerCase().replace(/(^| )+(.)/g,function(e){return e.toUpperCase()
})
};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.register("lower-case",b);
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.register("upper-case",a);
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.register("title-case",c)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - util.number-formatting.js");
(function(){var a=function(c){var d=function(e){return((e<=9)?"0":"")+e
};
var b=new Date(c*1000);
b=isNaN(b.getMilliseconds())?new Date():b;
return[[b.getFullYear(),d(b.getMonth()+1),d(b.getDay())].join("-"),[d(b.getHours()),d(b.getMinutes()),d(b.getSeconds())].join(":")].join(" ")
};
ContextHub.SegmentEngine.PageInteraction.PropertyProcessor.register("timestamp-to-date",a)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - task.page-update-watcher.js");
(function(d,c){var b=c.MutationObserver||c.WebKitMutationObserver;
if(b){var a={childList:true,attributes:true,characterData:true,subtree:true,attributeOldValue:true,characterDataOldValue:true,attributeFilter:[ContextHub.SegmentEngine.PageInteraction.info.propertyHolder,ContextHub.SegmentEngine.PageInteraction.info.defaultHolder,ContextHub.SegmentEngine.PageInteraction.info.processorHolder]};
d(function(){var e=new b(function(g){var j="["+ContextHub.SegmentEngine.PageInteraction.info.propertyHolder+"]";
var i=[];
for(var f=0;
f<g.length;
f++){var h=g[f];
d.merge(i,d(h.addedNodes).filter(j));
if(h.attributeName&&h.target){i.push(h.target)
}}d.each(d.unique(i),function(k,l){var m=ContextHub.SegmentEngine.PageInteraction.PropertyPlaceholder(l);
if(m.isValid()){m.update()
}})
});
e.observe(c.document.body,a)
})
}d(function(){var e=ContextHub.SegmentEngine.PageInteraction.getPropertyPlaceholders();
d.each(e,function(f,g){if(g.isValid()){g.update()
}})
})
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - task.data-update-watcher.js");
(function(b){var a="page-interaction";
ContextHub.eventing.on(ContextHub.Constants.EVENT_STORE_UPDATED,function(e,f){var d=(f||{}).store;
var c=ContextHub.SegmentEngine.PageInteraction.getPropertyPlaceholders(d);
b.each(c,function(g,l){var h=l.getPropertyName();
var k=this.eventData.keys.set.hash[h];
var i=this.eventData.keys.removed.hash[h];
var j=k?k.value:undefined;
if(k||i){l.update(j)
}}.bind({eventData:f}))
},a,true)
}(ContextHubJQ));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - task.teaser-update.js");
(function(b){var d=80;
var e=0;
var c=function(){var f=ContextHub.SegmentEngine.PageInteraction.TeaserManager.getAllTeasers();
b.each(f,function(h,g){if(g.isRegistered()){g.updatePlaceholder()
}})
};
var a=function(){var f=new Date().getTime();
if((f-e)>=d){c();
e=0;
return
}window.requestAnimationFrame(a)
};
ContextHub.eventing.once([ContextHub.Constants.EVENT_ALL_STORES_READY,ContextHub.Constants.EVENT_STORES_PARTIALLY_READY],function(){var f=[ContextHub.Constants.EVENT_SEGMENT_UPDATED,ContextHub.Constants.EVENT_STORE_UPDATED+":campaign",ContextHub.Constants.EVENT_TEASER_REGISTERED];
ContextHub.eventing.off(f,"teaser-updater");
ContextHub.eventing.on(f,function(){var g=e===0;
e=new Date().getTime()+d;
if(g){a()
}},"teaser-updater",true)
},"teaser-initialization",true)
}(ContextHubJQ));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - strategy.first.js");
(function(){var a=function(b){return(b||[])[0]||null
};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.register("first","First candidate",a)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - strategy.last.js");
(function(){var a=function(c){var b;
if(c){b=c[c.length-1]
}return b||null
};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.register("last","Last candidate",a)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.segment-engine.page-interaction - strategy.random.js");
(function(){var a=function(c){var b;
if(c){b=c[Math.floor(Math.random()*c.length)]
}return b||null
};
ContextHub.SegmentEngine.PageInteraction.StrategyManager.register("random","Random",a)
})();
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.store.sas.forms-store - sas.forms-store.js");
(function(b){var e="registration";
var a={initialValues:{registration:{}}};
var d=function(g,f){this.config=b.extend(true,{},a,f);
this.init(g,this.config);
this.persistence=new ContextHub.Utils.Persistence({mode:ContextHub.Utils.Persistence.Modes.SESSION})
};
ContextHub.Utils.inheritance.inherit(d,ContextHub.Store.SessionStore);
d.prototype.getRegistration=function(){return this.getItem(e)||"{}"
};
d.prototype.getEventID=function(){var f=JSON.parse(this.getRegistration())||"{}";
return f.estarseventid||""
};
d.prototype.getEmail=function(){var f=JSON.parse(this.getRegistration())||"{}";
return f.email||""
};
d.prototype.isWaitListed=function(){try{var f=JSON.parse(this.getRegistration())||"{}";
return f.waitlist||"N"
}catch(g){return"N"
}};
d.prototype.putRegistration=function(j){var i,g,f;
try{i=c(j,true);
g=ContextHub.Utils.JSON.stringify(i);
f=this.setItem(e,g);
return true
}catch(h){console.error("Unable to save Form Data!",h);
return false
}};
function c(i,h){h=h||false;
try{var j={};
var f=i.serializeArray();
i.find("select").each(function(k,n){if(n.selectedIndex>-1){if(!(n.name=="industry"&&n.options[n.selectedIndex].value=="0")){var m=n.options[n.selectedIndex].text.replace(/^--?/,"");
var l=n.name+"Label";
f.push({name:l,value:m})
}}});
b.each(f,function(){if(h){this.name=this.name.toLowerCase()
}if(j[this.name]!==undefined){if(!j[this.name].push){j[this.name]=[j[this.name]]
}j[this.name].push(this.value||"")
}else{j[this.name]=this.value||""
}})
}catch(g){console.error(g)
}return j
}ContextHub.Utils.storeCandidates.registerStoreCandidate(d,"sas.forms-store",0)
}(ContextHubJQ));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.store.sas.lastviewed-store - sas.lastviewed-store.js");
(function(c){var b="lastviewed";
var a={initialValues:{lastviewed:{}}};
var d=function(f,e){this.config=c.extend(true,{},a,e);
this.init(f,this.config)
};
ContextHub.Utils.inheritance.inherit(d,ContextHub.Store.PersistedStore);
d.prototype.getLastViewed=function(){return ContextHub.Utils.JSON.parse(this.getItem(b)||"{}")
};
d.prototype.getLastViewedByCategory=function(e){var f=this.getLastViewed()||{};
if(typeof f[e]!="undefined"){return f[e].name||""
}return""
};
d.prototype.getLastViewedByCategoryValue=function(e){var f=this.getLastViewed()||{};
if(typeof f[e+"value"]!="undefined"){return f[e+"value"].name||""
}return""
};
d.prototype.putLastViewed=function(g,h){try{var e=this.getLastViewed()||{};
if(c.isNumeric(h)){e[g]={name:h.toString()}
}else{e[g]={name:h}
}return this.setItem(b,ContextHub.Utils.JSON.stringify(e))
}catch(f){console.error("Unable to save Form Data!",f)
}};
ContextHub.Utils.storeCandidates.registerStoreCandidate(d,"sas.lastviewed-store",0)
}(ContextHubJQ));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.finalize - ContextHub.store-initialization.js");
(function(d,c){var b=ContextHub;
var a=c.ContextHubKernelConfig||{};
var e=b.Shared.timers.start();
b.console.log(b.Shared.timestamp(),"[+] starting registration and initialization of the stores");
d.each(a.stores||{},function(h,j){var f=b.Utils.storeCandidates.getStoreFromCandidates(j);
if(f){try{var i=b.Shared.timers.start();
var k=b.Shared.timestamp();
b.registerStore(h,new f(h,j.config));
b.console.log(k,'[+] initializing "'+h+'" store ('+b.Shared.timers.finish(i)+"ms)")
}catch(g){b.console.error('Store "'+j.type+'" (',f,") could not be initialized:",g)
}}});
b.console.log(b.Shared.timestamp(),"[+] all stores initialized ("+b.Shared.timers.finish(e)+"ms)")
}(ContextHubJQ,window));
ContextHub.console.log(ContextHub.Shared.timestamp(),"[loading] contexthub.finalize - ContextHub.finalization.js");
ContextHub.console.timeStamp("contexthub.stop");
ContextHub.console.timeEnd("contexthub.js");