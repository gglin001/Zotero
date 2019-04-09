(function(p){var d=false;var h=false;
var c=false;e(function(){d=true;
if(!b.isCrossDomain||(b.isCrossDomain&&h)){i()
}});function i(){h=true;if(d&&!c){try{var r=j(b.authCookieName);
var t=j(b.persistCookieName);if((r==null||r==""||r.charAt(0)==":")&&(t!=null&&t!=""&&t.charAt(0)!=":")){window.location.href=b.loginURL+"&goto="+encodeURIComponent(window.location.href)
}if(r!=null&&r!=""&&r.charAt(0)!=":"){l()
}else{n()}c=true}catch(s){}}}p.displayLoginBar=i;
function a(r){window.location.href=b.serverURL+"create.htm?returnURL="+encodeURIComponent(window.location.href)+"&"+k(r)
}p.handleCreateProfile=a;function f(s,t){var r="";
if(t!=undefined&&t!=null&&t==true){r="&showNewUserDisplay=false"
}window.location.href=b.loginURL+"&goto="+encodeURIComponent(window.location.href)+"&"+k(s)+r
}p.handleLogin=f;function q(r){window.location.href=b.serverURL+"passwordResetRequest.htm?returnURL="+encodeURIComponent(window.location.href)+"&"+k(r)
}p.handleForgottenPWD=q;function o(){window.location.href=b.logoutURL+"&goto="+encodeURIComponent(window.location.href)
}p.handleLogout=o;function n(){try{g("login","block");
g("login2","block");g("login3","block");
g("login4","block");g("logout","none");
g("logout2","none");g("logout3","none");
g("logout4","none")}catch(r){}}function l(){try{g("login","none");
g("login2","none");g("login3","none");
g("login4","none");g("logout","block");
g("logout2","block");g("logout3","block");
g("logout4","block");var s=m();
if(s!==null){g("loginDisplayName","inline",s);
g("loginDisplayName2","inline",s);
g("loginDisplayName3","inline",s);
g("loginDisplayName4","inline",s)
}}catch(r){}}function g(s,r,u){var t=document.getElementById(s);
if(t!=undefined){if(u!=undefined){while(t.firstChild){t.removeChild(t.firstChild)
}t.appendChild(document.createTextNode(u))
}t.style.display=r}}function m(){var r;
try{var t=j(b.userCookieName);if(t===null){return null
}r=decodeURIComponent(t)}catch(s){return null
}r=r.replace(/\+/g," ");return r
}function k(r){if(r!=null&&r!=""){return"locale="+r
}else{return""}}var b={authCookieName:"_iPlanetDirectoryPro",persistCookieName:"_DProPCookie",baseURL:undefined,loginBaseURL:undefined,loginURL:"/opensso/UI/Login?realm=/extweb",federatedLoginURL:"/opensso/saml2/jsp/spSSOInit.jsp?metaAlias=/extweb/sp&idpEntityID=http://www.okta.com/",logoutURL:"/opensso/UI/Logout?realm=/extweb",serverURL:"/profile/user/",userCookieName:"SASUserDisplayName",idpEntityId:undefined,isCrossDomain:false,init:function(){var z=document.location.host;
var A=/release\.profiledev/;var t=/okta\.profiledev/;
var y=/profiledev/;var s=/exp/;
var v=/test/;var x=/aem[0-9]*(dev|test)web/;
var r=/stage/;var u=/col=wwwstage/;
var w=/^(.*\.)?sas\.com$/;if(A.test(z)){this.authCookieName="edr"+this.authCookieName;
this.persistCookieName="edr"+this.persistCookieName;
this.baseURL="https://release.profiledev.unx.sas.com";
this.loginBaseURL=this.baseURL}else{if(t.test(z)){this.authCookieName="edo"+this.authCookieName;
this.persistCookieName="edo"+this.persistCookieName;
this.baseURL="https://okta.profiledev.unx.sas.com";
this.loginBaseURL=this.baseURL;
this.idpEntityId="exkeaycm6dOEyuc5c0h7"
}else{if(y.test(z)){this.authCookieName="ed"+this.authCookieName;
this.persistCookieName="ed"+this.persistCookieName;
this.baseURL="https://profiledev.unx.sas.com";
this.loginBaseURL=this.baseURL}else{if(s.test(z)){this.authCookieName="ee"+this.authCookieName;
this.persistCookieName="ee"+this.persistCookieName;
this.baseURL="https://www.sas.com";
this.loginBaseURL="https://loginexp.sas.com"
}else{if(v.test(z)||x.test(z)){this.authCookieName="et"+this.authCookieName;
this.persistCookieName="et"+this.persistCookieName;
this.baseURL="https://www.sas.com";
this.loginBaseURL="https://logintest.sas.com"
}else{if(r.test(z)||u.test(document.location.search)){this.authCookieName="es"+this.authCookieName;
this.persistCookieName="es"+this.persistCookieName;
this.baseURL="https://wwwstage.sas.com";
this.loginBaseURL="https://loginstage.sas.com"
}else{this.authCookieName="ep"+this.authCookieName;
this.persistCookieName="ep"+this.persistCookieName;
this.baseURL="https://www.sas.com";
this.loginBaseURL="https://login.sas.com"
}}}}}}if(this.idpEntityId===undefined){this.loginURL=this.loginBaseURL+this.loginURL
}else{this.loginURL=this.loginBaseURL+this.federatedLoginURL+this.idpEntityId
}this.logoutURL=this.loginBaseURL+this.logoutURL;
this.serverURL=this.baseURL+this.serverURL;
if(!w.test(z)){this.isCrossDomain=true
}}};b.init();function j(s){var r=document.cookie.split(";");
var u=s+"=";for(var t=0;t<r.length;
t++){var v=r[t];while(v.charAt(0)==" "){v=v.substring(1,v.length)
}if(v.indexOf(u)==0){return decodeURIComponent(v.substring(u.length,v.length))
}}return null}function e(w){var s=false;
var v=true;var y=window.document;
var x=y.documentElement;var B=y.addEventListener?"addEventListener":"attachEvent";
var z=y.addEventListener?"removeEventListener":"detachEvent";
var r=y.addEventListener?"":"on";
var A=function(C){if(C.type=="readystatechange"&&y.readyState!="complete"){return
}(C.type=="load"?window:y)[z](r+C.type,A,false);
if(!s&&(s=true)){w.call(window,C.type||C)
}};var u=function(){try{x.doScroll("left")
}catch(C){setTimeout(u,50);return
}A("poll")};if(y.readyState=="complete"){w.call(window,"lazy")
}else{if(y.createEventObject&&x.doScroll){try{v=!window.frameElement
}catch(t){}if(v){u()}}y[B](r+"DOMContentLoaded",A,false);
y[B](r+"readystatechange",A,false);
window[B](r+"load",A,false)}}}(this.Profile=this.Profile||{}));
function handleCreateProfile(a){Profile.handleCreateProfile(a)
}function handleLogin(a,b){Profile.handleLogin(a,b)
}function showLoginScreen(a){Profile.handleLogin()
}function handleForgottenPWD(a){Profile.handleForgottenPWD(a)
}function handleLogout(){Profile.handleLogout()
}function processLogoutRequest(){Profile.handleLogout()
};