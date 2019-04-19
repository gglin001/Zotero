/*配置*/
var c_moneytype=1;
var c_moneytypevirtual=3;
var c_moneytypetext='账户余额';
var c_moneytypevirtualtext='阅读币';
var c_loadingimg='<img src="http://image.cqvip.com/ipub/images/loading.gif" />';
var c_loadingimg_s='<img src="http://image.cqvip.com/ipub/images/loadings.gif" />';

var c_sitemain='http://localhost:8001';
var c_siteipub='http://ipub.cqvip.com';
var c_sitedown='http://down.cqvip.com';
var c_siteinterface='/Common/LoadPageBase.aspx?path=';
var c_siteinterfaceremote='/Common/LoadRemotePage.aspx?url=';

/*通用函数*/
function UrlParam(name){
	var result='';
	
	if(location.href.indexOf("?")==-1 || location.href.indexOf(name+'=')==-1){
		return result;
	}
	var queryString = location.href.substring(location.href.indexOf("?")+1);
	var parameters = StrToArr(queryString,'&');
	var paraName,paraValue;
	for(var i=0; i<parameters.length; i++){
		pos = parameters[i].indexOf('=');
		if(parameters[i].indexOf('=') < 0){ continue; }
		paraName = parameters[i].substring(0, pos);
		paraValue = parameters[i].substring(pos + 1);
		if(paraName == name){
			result=paraValue;
			break;
			//return unescape(paraValue.replace(/\+/g, " "));
		}
	}
	result=decodeURI(result);
	
	return result;
}
function UrlParamDrop(url,name){
	var arrurl=StrToArr(url,'&');
	for(var i=0;i<arrurl.length;i++){
		if(arrurl[i].indexOf(name+'=')<0){continue;}
		arrurl.splice(i,1);
	}
	return ArrToStr(arrurl,'&');
}
function setUrlParams(Params,qName,qValue)
{
	if (Params.length>0)
	{
		var queryarr=Params.split("&");
		var isSet = false;
		for (i=0;i<queryarr.length;i++)
		{
			if (queryarr[i].split("=")[0]==qName)
			{
				//如果有改参数，改变该值
				queryarr[i]=qName + "=" + qValue;
				isSet = true;
			}
		}
		if (isSet)
			Params = queryarr.join("&");
		else	//没有参数则添加
			Params = Params + "&" + qName + "=" + qValue
	}
	else
		Params = qName + "=" + qValue
	return Params;
}
function GetUrlParams()
{

	if(location.href.indexOf("?")==-1 || location.href.indexOf(name+'=')==-1){
		return "";
	}
	return location.href.substring(location.href.indexOf("?")+1);
}
function CheckBadWord(str,strtext){
	var r='';
	var re = new RegExp("['|\"]","ig");
	if(re.test(str)){
		r=strtext+'包含单引号或双引号,请删除或用全角字符替换！';
		return(r);
	}
	return(r);
}
function formatNum(num,n){	//参数说明：num 要格式化的数字 n 保留小数位
	num=String(num.toFixed(n));
	var re=/(-?\d+)(\d{3})/;
	while(re.test(num))
		num=num.replace(re,"$1,$2")
	return num;
}
function formatFull(str){
	var result='';
	if (str != null && str.length>0){
		for(var i=0;i<str.length;i++){
			var str1=str.charCodeAt(i);
			if((str1>=125 && str1<= 19968) || str1>40959){
				result+= String.fromCharCode(str.charCodeAt(i)-65248);
			}else{
				result+= str.substring(i,i+1);
			}
		}
	}
	return(result);
}
function StrLen(str){
	var i,sum=0;
	for(i=0;i<str.length;i++){
		if((str.charCodeAt(i)>=0) && (str.charCodeAt(i)<=255)){
			sum=sum+1;
		}else{
			sum=sum+2;
		}
	}
	return sum;
}
function StrLeft(str,len){
	var strlen = 0; 
	var s = "";
	for(var i = 0;i < str.length;i++){
		if(str.charCodeAt(i) > 128){
			strlen += 2;
		}else{ 
			strlen++;
		}
		s += str.charAt(i);
		if(strlen >= len){ 
			return s ;
		}
	}
	return s;
}
function ToStr(str){
	var result='';
	if(str==null || str=='undefined'){return result;}
	result=String(str);
	return result;
}
function ToNumber(num){
	var result=0;
	if(num==null || num=='undefined'){return result;}
	result=Number(num);
	return result;
}
function StrToArr(str,separator){
	var arr = new Array();
	if(str.length > 0){
		var strs=str.split(separator);
		for(var i=0;i<strs.length;i++){
			arr[i]=strs[i];
		}
	}
	return arr;
}
function ArrToStr(arr,separator){
	var result='';
	if(arr.length > 0){
		result=arr.join(separator);
	}
	return result;
}
function InputValueAdd(divname,value){
	var div=$('input[name='+divname+']');
	var arr=StrToArr(div.val(),',');
	var index=InputRepeatIndex(div.val(),value);
	if(index <= -1){
		arr.push(value);
		div.val(ArrToStr(arr,','));
	}
}
function InputValueDel(divname,value){
	var div=$('input[name='+divname+']');
	var arr=StrToArr(div.val(),',');
	var index=InputRepeatIndex(div.val(),value);
	if(index >= 0){
		arr.splice(index,1);
		div.val(ArrToStr(arr,','));
	}
}
function InputRepeatIndex(source,search){
	var result=-1;
	var arr=StrToArr(source,',');
	for(var i=0;i<arr.length;i++){
		if(String(arr[i]) == search){
			result=i;
			break;
		}
	}
	return result;
}
function InputValue(divname,value){
	$('input[name='+divname+']').val(value);
}
function setinputvalue(objid,objvalue){
	$('#'+objid).val(objvalue);
}
function changeselect(divid,value){
	var obj=$('#'+divid);
	for(var i=0;i<obj[0].options.length;i++){
		if(obj[0].options[i].value == value){
			obj[0].options[i].selected = true;
			break;
		}
	}
	obj.change();
}
/*常用功能函数*/
function rCode(){
	document.getElementById('imgValidateCode').src='/ValidateCode.aspx?&tmp='+Math.random();
}
function copyToClipboard(txt){
	if(window.clipboardData){
		window.clipboardData.clearData();
		window.clipboardData.setData("Text",txt);
	}else if(navigator.userAgent.indexOf("Opera") != -1){
			window.location = txt;
	}else if(window.netscape){
		try{
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		}catch (e){
			alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;
		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);
	}
}
/*批量操作*/
function SelAll(DivName){
	$('input[name="'+DivName+'"]').attr("checked", true);
}
function CancelAll(DivName){
	$('input[name="'+DivName+'"]').attr("checked", false);
}
function ReverseAll(DivName){
	var count=$('input[name="'+DivName+'"]').length;
	for(var i=0;i<count;i++){
		$('input[name="'+DivName+'"]')[i].checked=!$('input[name="'+DivName+'"]')[i].checked;
	}
}
function BatchSubmit(url){
	location.href=url+'&'+$('input[name=ID]:checked').serialize();
}
function BatchConfirm(url){
	if(!confirm('你确定要执行此操作吗？')){return;}
	location.href=url+'&'+$('input[name=ID]:checked').serialize();
}
/*遮罩层*/
function hidmsginit(clickareaid,clicklinkid,showboxid,closeid){
	var objvipcontactlink = $('#'+clicklinkid);
	var objvipcontactclose = $('#'+closeid);
	var objvipcontact = $('#'+clickareaid);
	var objvipcontacttext = $('#'+showboxid);
	var objvipcontacttextleft = objvipcontact.offset().left + objvipcontact.width() / 2-objvipcontacttext.width()/2;
	var objvipcontacttexttop = objvipcontact.offset().top + objvipcontact.height();
	objvipcontactlink.click(function() {
			objvipcontacttext.fadeIn(200);
	});
	objvipcontactclose.click(function() {
			objvipcontacttext.fadeOut(200);
	});
	$(window).resize(function() {
			objvipcontacttextleft = objvipcontact.offset().left + objvipcontact.width() / 2-objvipcontacttext.width()/2;
			objvipcontacttexttop = objvipcontact.offset().top + objvipcontact.height();
			objvipcontacttext.css('left', objvipcontacttextleft + 'px');
			objvipcontacttext.css('top', objvipcontacttexttop + 'px');
	});
	objvipcontacttext.css('left', objvipcontacttextleft + 'px');
	objvipcontacttext.css('top', objvipcontacttexttop + 'px');
	objvipcontacttext.hide();
}
function CloseMask(){
	var objmask=$('#Mask');
	if(objmask.size()>0){
		objmask.hide();
	}
}
function InitMask(){
	var mm=$('#Mask');
	if(!mm.is('div')){
		var c='<div id="Mask" style="display:none;position:absolute;z-index:11;top:0;left:0;background:#000;"></div>';
		$('body').append(c);
	}
}
function ShowMask(){
	if($('#Mask').size()<=0){
		$('body').append('<div id="Mask" style="display:none;position:absolute;z-index:500;top:0;left:0;background:#000;opacity:0.3;"></div>');
		$(window).resize(function(){
			$('#Mask').width($(document).width());
			$('#Mask').height($(document).height());
		});
		$(window).scroll(function(){
			$('#Mask').width($(document).width());
			$('#Mask').height($(document).height());
		});
	}
	var objmask=$('#Mask');
	objmask.css('opacity','0.3');
	objmask.width($(document).width());
	objmask.height($(document).height());
	objmask.show();
}

function InitCustomLoading(){
	if($('#CustomDivLoading').size()<=0){
		$('body').append('<div style="display:none;" id="CustomDivLoading" class="loading"><span class="txt"><table><tr><th rowspan="2"></th><td><strong>数据处理中</strong>，请稍等...</td></tr></table></span></div>');
		var objfrm=$("#CustomDivLoading");
		$(window).resize(function(ev){
			ResizeCustomLoading();
		});
		$(window).scroll(function(ev){
			ResizeCustomLoading();
		});
	}
}
function CloseCustomLoading(){
	var objfrm=$('#CustomDivLoading');
	if(objfrm.size()>0){
		objfrm.hide();
	}
}
function ResizeCustomLoading(){
	var objfrm=$('#CustomDivLoading');
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	var popupLeft = ($(window).width()-popupWidth)/2+$(window).scrollLeft();
	var popupTop = ($(window).height()-popupHeight)/2+$(window).scrollTop();
	if(popupLeft<10){popupLeft=10;}
	if(popupTop<10){popupTop=10;}
	objfrm.css({
		"top": popupTop + "px",
		"left": popupLeft + "px"
	});
}
function ShowCustomLoading(){
	InitCustomLoading();
	var objfrm=$("#CustomDivLoading");
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	ResizeCustomLoading();
	objfrm.show();
}

function ActiveCloseCustomDiv(){
	var close=$('.close');
	close.click(function(){
		CloseCustomDiv();
		CloseMask();
	});
	var closebox=$('.closebox');
	closebox.click(function(){
		CloseCustomDiv();
		CloseMask();
	});
}
function CloseCustomDiv(){
	var cd=$('#CustomDiv');
	if(cd.size()>0){
		cd.hide();
	}
}
function InitCustomDiv(){
	var cd=$('#CustomDiv');
	if(!cd.is('div')){
		var c='<div id="CustomDiv" style="display:none;position:absolute;z-index:200;left:0;top:0;"></div>';
		c+='<div id="CustomDivLoading" class="loading"><span class="txt"><table><tr><th rowspan="2"></th><td><strong>数据处理中</strong>，请稍等...</td></tr></table></span></div>';
		$('body').append(c);
	}
}
function ShowCustomDiv(Url){
	var cd=$('#CustomDiv');
	var cdl=$('#CustomDivLoading');
	if(cd.is('div')){
		$.ajax({
			url: Url,
			cache: true,
			beforeSend: function(){
				cdl.css('left',document.documentElement.scrollLeft+(document.documentElement.clientWidth-400)/2);
				cdl.css('top',document.documentElement.scrollTop);
				cdl.show();
			},
			success: function(data){
				cdl.hide();
				cd.html(data);
				cd.show();
				var width=cd.width();
				var height=cd.height();
				cd.css('left',document.documentElement.scrollLeft+(document.documentElement.clientWidth-width)/2);
				cd.css('top',document.documentElement.scrollTop+(document.documentElement.offsetHeight-height)/2);
				
				ActiveCloseCustomDiv();
			}
		});
	}
}
function ShowCustomContent(divid,url){
	var div=$('#'+divid);
	if(div.is('div')){
		$.ajax({
			url: url,
			cache: true,
			beforeSend: function(){
				div.html(c_loadingimg_s);
			},
			success: function(data){
				div.html(data);
			}
		});
	}
}

function InitCustomLayerTop(){
	var customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){customname=arguments[0];}
	
	if($('#'+customname).size()<=0){
		$('body').append('<div id="'+customname+'" style="display:none;position:absolute;z-index:501;left:0;top:0;"></div>');
		var objfrm=$('#'+customname);
		$(window).resize(function(ev){
			ResizeCustomLayerTop(customname);
		});
	}
}
function CloseCustomLayerTop(){
	var customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){customname=arguments[0];}
	
	var objfrm=$('#'+customname);
	if(objfrm.size()>0){objfrm.hide();}
}
function RemoveCustomLayerTop(){
	var customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){customname=arguments[0];}
	
	var objfrm=$('#'+customname);
	if(objfrm.size()>0){objfrm.remove();}
}
function ResizeCustomLayerTop(){
	var customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){customname=arguments[0];}
	
	var objfrm=$('#'+customname);
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	var popupLeft = ($(window).width()-popupWidth)/2+$(window).scrollLeft();
	var popupTop = 10;
	if(popupLeft<10){popupLeft=10;}
	if(popupTop<10){popupTop=10;}
	objfrm.css({
		"top": popupTop + "px",
		"left": popupLeft + "px"
	});
}
function ShowCustomLayerTop(){
	var url='',customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){url=arguments[0];}
	if(argnum>=2){customname=arguments[1];}
	
	InitCustomLayerTop(customname);
	var objfrm=$('#'+customname);
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	objfrm.show();
	if(objfrm.html().length<=0){
		$.ajax({
			url: url,
			cache: false,
			timeout: 60000,
			beforeSend: function(){
				objfrm.html(c_loadingimg_s);
			},
			error: function(){
				
			},
			success: function(data){
				objfrm.html(data);
				ResizeCustomLayerTop(customname);
			}
		});
	}else{
		ResizeCustomLayerTop(customname);
	}
}

function MoveCustomLayer(){
	var customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){customname=arguments[0];}
	
	var objfrm=$('#'+customname);
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	var popupLeft = objfrm.offset().left;
	var popupTop = objfrm.offset().top;
	var winScrollTop = $(window).scrollTop();
	if(popupTop>winScrollTop){
		objfrm.css({"top": (winScrollTop+10) + "px"});
	}else{
		document.documentElement.scrollTop=popupTop-10;
	}
}
function RemoveCustomLayer(){
	var customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){customname=arguments[0];}
	
	var objfrm=$('#'+customname);
	if(objfrm.size()>0){objfrm.remove();}
}
function ShowCustomLayerContent(){
	var contents='',handlescroll=true,customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){contents=arguments[0];}
	if(argnum>=2){handlescroll=arguments[1];}
	if(argnum>=3){customname=arguments[2];}
	
	InitCustomLayer(handlescroll);
	var objfrm=$('#'+customname);
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	objfrm.show();
	if(objfrm.html().length<=0){
		objfrm.html(contents);
		ResizeCustomLayer();
	}else{
		ResizeCustomLayer();
	}
}
function ShowCustomLayer(){
	var url='',handlescroll=true,customname='CustomLayer';
	var argnum=arguments.length;
	if(argnum>=1){url=arguments[0];}
	if(argnum>=2){handlescroll=arguments[1];}
	if(argnum>=3){customname=arguments[2];}
	
	InitCustomLayer(handlescroll);
	var objfrm=$('#'+customname);
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	objfrm.show();
	if(objfrm.html().length<=0){
		$.ajax({
			url: url,
			cache: false,
			timeout: 60000,
			beforeSend: function(){
				objfrm.html(c_loadingimg_s);
			},
			error: function(){
				
			},
			success: function(data){
				objfrm.html(data);
				ResizeCustomLayer();
			}
		});
	}else{
		ResizeCustomLayer();
	}
}
function InitCustomLayer(){
	var handlescroll=true;
	var argnum=arguments.length;
	if(argnum>=1){handlescroll=arguments[0];}
	
	if($('#CustomLayer').size()<=0){
		$('body').append('<div id="CustomLayer" style="display:none;position:absolute;z-index:501;left:0;top:0;"></div>');
		var objfrm=$("#CustomLayer");
		$(window).resize(function(ev){
			ResizeCustomLayer();
		});
		if(handlescroll){
			$(window).scroll(function(ev){
				ResizeCustomLayer();
			});
		}
	}
}
function CloseCustomLayer(){
	var objfrm=$('#CustomLayer');
	if(objfrm.size()>0){
		objfrm.hide();
	}
}
function ResizeCustomLayer(){
	var objfrm=$('#CustomLayer');
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	var popupLeft = ($(window).width()-popupWidth)/2+$(window).scrollLeft();
	var popupTop = ($(window).height()-popupHeight)/2+$(window).scrollTop();
	if(popupTop<10){popupTop=10;}
	if(popupLeft<10){popupLeft=10;}
	
	objfrm.css({
		"top": popupTop + "px",
		"left": popupLeft + "px"
	});
	//var result='';
	//result+='popupWidth：'+popupWidth+'\n';
	//result+='popupHeight：'+popupHeight+'\n';
	//result+='top：'+($(window).height()-popupHeight)/2+$(window).scrollTop()+"px"+'\n';
	//result+='left：'+($(window).width()-popupWidth)/2+$(window).scrollLeft()+"px"+'\n';
	//result+='windowWidth：'+$(window).width()+'\n';
	//result+='windowHeight：'+$(window).height()+'\n';
	//alert(result);
}

function CloseMaskFrm(){
	if($('#MaskFrm',window.parent.document).size()>0){
		$('#MaskFrm',window.parent.document).hide();
	}
}
function ShowMaskFrm(){
	if($('#MaskFrm').size()<=0){
		$('body').append('<div id="MaskFrm" style="display:none;position:absolute;z-index:500;top:0;left:0;background:#000;opacity:0.3;"></div>');
	}
	var objmask=$('#MaskFrm');
	objmask.css('opacity','0.3');
	objmask.width($(document).width());
	objmask.height($(document).height());
	objmask.show();
}
function CloseCustomFrm(){
	if($('#CustomFrm',window.parent.document).size()>0){
		$('#CustomFrm',window.parent.document).hide();
	}
}
function ShowCustomFrm(url){
	if($('#CustomFrm').size()<=0){
		$('body').append('<iframe id="CustomFrm" frameborder="0" scrolling="no" style="display:none;position:absolute;z-index:501;left:0;top:0;width:560px; height:400px;"></iframe>');
	}
	var objfrm=$("#CustomFrm");
	var popupWidth = objfrm.width();
	var popupHeight = objfrm.height();
	objfrm.attr('src',url);
	objfrm.css({
		"top": ($(window).height()-popupHeight)/2+$(window).scrollTop()+"px",
		"left": ($(window).width()-popupWidth)/2+$(window).scrollLeft()+"px"
	});
	if(url.indexOf('?')>=0){
		url+='&t='+Math.random();
	}else{
		url+='?t='+Math.random();
	}
	objfrm.show();
}

function ResizeCustomFrm(){
	var objfrm=$('#CustomFrm',window.parent.document);
	var popupWidth = $(document).width();
	var popupHeight = $(document).height();
	objfrm.width(popupWidth);
	objfrm.height(popupHeight);
	objfrm.css({
		"top": ($('body',window.parent.document).height()-400)/2+$('body',window.parent.document).scrollTop()+"px",
		"left": ($('body',window.parent.document).width()-700)/2+$('body',window.parent.document).scrollLeft()+"px"
	});
}
function ResizeCustomFrmIn(popupWidth,popupHeight){
	var objfrm=$('#CustomFrm',window.parent.document);
	objfrm.width(popupWidth);
	objfrm.height(popupHeight);
}
//lightbox函数

function lightbox(box){
	var lightbox=$(".lightbox");
	if(lightbox.size()<=0){return;}
	
	lightbox.show();
	maskreset();
	boxreset($(box));
	
	var close=$(".close,.closetext");
	close.click(function(){
		lightbox.hide();
		return false;
	});
	$(window).resize(function(){
		boxreset($(box));
	});
}
function boxreset(obj){
	var box=obj;
	if(box.size()<=0){return;}
	
	var width=box.width();
	var height=box.height();
	var leftint=parseInt($(window).width()/2)-parseInt(box.width()/2);if(leftint<0){leftint=0;}
	var topint=parseInt($(window).height()/2)-parseInt(box.height()/2);if(topint<0){topint=0;}
	var left=leftint+"px";
	var top=topint+"px";
	box.css({"display":"none","position":"absolute","z-index":"99","left":left,"top":top});
	//box.fadeIn(300);
	box.show();
}
function maskreset(){
	var mask=$(".mask");
	if(mask.size()<=0){return;}
	
	mask.width($(document).width());
	mask.height($(document).height());
	mask.css("opacity","0.5");
	$(window).resize(function(){
		mask.width($(document).width());
		mask.height($(document).height());
	});
}

//表单输入框样式函数---已整理
function foc(){
	var input=$(".fillbox input:text,.fillbox input:password");
	var textarea=$("textarea");
	input.css({"font-size":"12px","color":"#666"});
	input.focus(function(){
	$(this).select();
	$(this).css({"border-left":"1px solid #ffe7d5","border-top":"1px solid #ffe7d5","background":"#fff9f4","color":"black","font-size":"14px"});
	$(this).parent(".fillbox").css("border","1px solid #fe6e05");
	})
	.blur(function(){
	$(this).css({"border-left":"1px solid #cdcdcd","border-top":"1px solid #cdcdcd","border-bottom":"1px solid #fff","background":"#f9f9f9","color":"black","font-size":"12px"});
	$(this).parent(".fillbox").css("border","1px solid #777");
	}
	);
	textarea.focus(function(){
	$(this).css({"border":"1px solid #fe6e05","background":"#fff9f4","color":"black"});
	})
	.blur(function(){
	$(this).css({"border":"1px solid #929292","background":"white","color":"#444"});
	});
}

function autoheight(){
 var art=$("#paper_down");
 var bal=$(".question");
 var con=$(".contain");
	if(bal.height()<con.height()){
		bal.height(con.height());
	}
}

$(function(){
	autoheight();
	foc();
})

/*Ajax相关*/
function AjaxReturnSuccess(data){
	var result=false;
	
	if(data.indexOf('|')<0){return result;}
	if(String(data.substr(0,1)) == '1'){
		result=true;
	}
	
	return result;
}
function AjaxReturnMsg(data){
	var result='';
	
	if(data.indexOf('|')<0){return result;}
	result=data.substr(data.indexOf('|')+1);
	
	return result;
}
/*jquery ajax*/
function jqajaxpoint(url,cache,showid){
	var obj=$(showid);
	if(obj.size()<=0){return;}
	$.ajax({
		url: url,
		cache: cache,
		timeout: 60000,
		beforeSend: function(){
			obj.html(c_loadingimg_s);
		},
		success: function(data){
			obj.html(data);
		},
		error: function (xmlHttpRequest, error) {
			obj.html('系统错误，请点击<a href="javascript:void(0);" onclick="jqajaxpoint(\''+url+'\',\''+cache+'\',\''+showid+'\')">刷新</a>重试！');
		}
	});
}
function jqajaxappend(url,cache,showid){
	var obj=$(showid);
	if(obj.size()<=0){return;}
	$.ajax({
		url: url,
		cache: cache,
		beforeSend: function(){
			
		},
		success: function(data){
			obj.append(data);
		}
	});
}
function jqajaxinfo(url,cache,showid){
	var obj=$(showid);
	if(obj.size()<=0){return;}
	$.ajax({
		url: url,
		cache: cache,
		beforeSend: function(){
			
		},
		success: function(data){
			obj.html(data);
		}
	});
}
function jqajaxreturn(url,cache){
	$.ajax({
		url: url,
		cache: cache,
		beforeSend: function(){
			
		},
		success: function(data){
			var msg=AjaxReturnMsg(data);
			if(msg.length>0){
				alert(msg);
			}
		}
	});
}
function jqajaxsubmit(url,cache,showid,frm){
	var obj=$(showid);
	if(obj.size()<=0){return;}
	var ajaxfrm = {
		url: url,
		type: 'post',
		cache: cache,
		beforeSend: function(){
			
		},
		success: function(data){
			obj.html(data);
		}
	};
	frm.ajaxForm(ajaxfrm);
	frm.submit();
}

function vipdatacacheset(key,value){
	if(value==null){return;}
	$('body').data(key,value);
}
function vipdatacacheget(key,type){
	var result='';
	var data=$('body').data(key);
	if(data!=null){
		result=data;
	}
	switch(type){
		case 1:
			result=Number(result);
			break;
		default:
			result=String(result);
			break;
	}
	return result;
}