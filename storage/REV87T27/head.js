//维普网 头部脚本 javascript 2.0 2009-09-08 李晓明

function myvipmenu(){
$("#mymenu ul").css({display: "none"}); // Opera Fix
$("#mymenu li").hover(function(){
		if(!$("#mymenu ul").is(":animated")){
		$(this).find('ul:first').css({visibility: "visible",display: "none"}).slideDown(200);
		}
		},function(){
		$(this).find('ul:first').fadeOut(400);
		});
}

function selectmenu(){
	$(".CRselectBox").hover(function(){
		$(this).addClass("CRselectBoxHover");
	},function(){
		$(this).removeClass("CRselectBoxHover");
	});
	$(".CRselectValue").click(function(){
		$(this).blur();
		$(".CRselectBoxOptions").show();
		return false;
	});
	$(".CRselectBoxItem a").click(function(){
		$(this).blur();
		var value = $(this).attr("rel");
		var txt = $(this).text();
		$("#abc").val(value);
		$("#abc_CRtext").val(txt);
		$(".CRselectValue").text(txt);
		$(".CRselectBoxItem a").removeClass("selected");
		$(this).addClass("selected");
		$(".CRselectBoxOptions").hide();
		return false;
	});
	$(document).click(function(event){
		if( $(event.target).attr("class") != "CRselectBox" ){
			$(".CRselectBoxOptions").hide();
		}
	});
}


function basetopchange(){
	var bt=$('#basetoptid');
	var ssl=$('#selectsearch li');
	ssl.click(function(){
		ssl.removeClass();
		$(this).addClass('current');
		bt.val($(this)[0].rel);
	});
}

function NoticeEvent(){
	//$('body').prepend('<span id="notice2011" style="display:block;background:#fff2e7;border-bottom:1px solid red;"><i style="display:block;width:980px;height:24px;margin:0 auto;padding:0 0 0 24px; no-repeat 400px 5px;line-height:24px;text-align:center;color:red;">通知：因服务器机房维护，本站于7月17日凌晨0:00--6:00将暂停文献下载、搜索等服务（不含论文检测），带来不便敬请谅解！</i></span>');
}

function jqheadeventinit(){
	//全站通告
	//var noticeHost=new Array('BBS.CQVIP.COM');
	NoticeEvent();
	//jq shopedit
	var jqediturl='/Interface/2010/EditMyvip.aspx?shopuid='+vipdatacacheget('jqshopuserid',0)+'&action=';
	if($('.jqeditinfomodi').size()>0){
		$('.jqeditinfomodi').each(function(){
			jqajaxinfo(jqediturl+'infomodi',false,'.jqeditinfomodi');
		});
	}
	if($('.jqeditshopinfo').size()>0){
		$('.jqeditshopinfo').each(function(){
			jqajaxinfo(jqediturl+'shopinfo',false,'.jqeditshopinfo');
		});
	}
	if($('.jqeditshopnews').size()>0){
		$('.jqeditshopnews').each(function(){
			jqajaxinfo(jqediturl+'shopnews',false,'.jqeditshopnews');
		});
	}
	if($('.jqeditcustomclass').size()>0){
		$('.jqeditcustomclass').each(function(){
			jqajaxinfo(jqediturl+'customclass',false,'.jqeditcustomclass');
		});
	}
	if($('.jqeditpropackinfo').size()>0){
		//$('.jqeditpropackinfo').each(function(){
		//	jqajaxinfo(jqediturl+'propackinfo',false,'.jqeditpropackinfo');
		//});
	}
	//jq navisearch
	$('.jqnavisearch').live('click',function(ev){
		$('.jqnavisearchshow').toggle(400);
		ev.preventDefault();
	});
	$('.jqnavisearchclose').live('click',function(ev){
		$('.jqnavisearchshow').hide(400);
		ev.preventDefault();
	});
	//jq close
	$('.jqclose').live('click',function(ev){
		CloseMask();
		CloseCustomLayer();
		ev.preventDefault();
	});
	//jq frmclose
	$('.jqfrmclose').live('click',function(ev){
		CloseMaskFrm();
		CloseCustomFrm();
		ev.preventDefault();
	});
	//jq jqexfavorite
	if($('.jqexfavorite').size()>0){
		$('.jqexfavorite').live('click', function(ev){
			if(document.all){
				window.external.addFavorite(location.href,document.title);
			}else if(window.sidebar){
				window.sidebar.addPanel(document.title,location.href,"");
			}
			ev.preventDefault();
		});
	}
	//jq mail
	if($('.jqsendmail').size()>0){
		$('.jqsendmail').live('click', function(ev){
			//var url='/Common/LoadPageBase.aspx?path=/Controls/Common/MailForm.ascx';
			var url='/Interface/2010/LoginForm.aspx?r=/Interface/Common/MailForm.aspx';
			ShowMaskFrm();
			ShowCustomFrm(url)
			ev.preventDefault();
		});
	}
	//jq favorite
	if($('.jqfavorite').size()>0){
		$('.jqfavorite').live('click', function(ev){
			var modeldata=new ModelData();
			var url='/ajax/user.aspx?action=fp&tid='+modeldata.typeid+'&kid='+modeldata.keyid+'&t='+escape(modeldata.title);
			var modeluser=ModelUser();
			if(modeluser.UserID<=0){
				RemoveCustomLayer();
				ShowCustomLayerContent(HtmlLoginForm('收藏',url));
			}else{
				var msg=HtmlReturn(url);
				//if(msg.length>0){alert(msg);}
				if(msg=='已经收藏到“我的维普”，请打开“我的维普”查看！'){msg='收藏成功！';}
				HtmlShareShow(msg);
			}
			ev.preventDefault();
		});
	}
	//jq oldfavorite
	if($('.jqoldfavorite').size()>0){
		$('.jqoldfavorite').live('click', function(ev){
			var modeldata=new ModelData();
			var url='/ajax/user.aspx?action=fmp&tid='+modeldata.typeid+'&kid='+modeldata.keyid+'&t='+escape(modeldata.title)+'&cid='+modeldata.classid;
			var modeluser=ModelUser();
			if(modeluser.UserID<=0){
				RemoveCustomLayer();
				ShowCustomLayerContent(HtmlLoginForm('收藏',url));
			}else{
				var msg=HtmlReturn(url);
				if(msg.length>0){alert(msg);}
			}
			ev.preventDefault();
		});
	}
	//vip favshop
	if($('.vipfavshop').size()>0){
		$('.vipfavshop').live('click', function(ev){
			var modeldatashop=new ModelDataShop();
			var url='/ajax/user.aspx?action=fp&tid='+modeldatashop.typeid+'&kid='+modeldatashop.keyid+'&t='+escape(modeldatashop.title);
			var modeluser=ModelUser();
			if(modeluser.UserID<=0){
				RemoveCustomLayer();
				ShowCustomLayerContent(HtmlLoginForm('收藏',url));
			}else{
				var msg=HtmlReturn(url);
				if(msg.length>0){alert(msg);}
			}
			ev.preventDefault();
		});
	}
	//vip cart
	if($('.vipcart').size()>0){
		$('.vipcart').live('click', function(ev){
			var modeldata=new ModelData();
			var url='/ajax/user.aspx?action=ca&cv='+modeldata.typeid+','+modeldata.keyid;
			HtmlReturn(url);
			//location.href=c_sitemain+'/Cart/List.aspx';
			//ev.preventDefault();
			HtmlCartShow();
		});
	}
	//vip cartdel
	if($('.vipcartdel').size()>0){
		$('.vipcartdel').live('click', function(ev){
			if(confirm('你确定要执行此操作吗？')){
				var url='/ajax/user.aspx?action=cd&cv='+$(this).attr('cv');
				HtmlReturn(url);
				location.href=c_sitemain+'/Cart/List.aspx';
			}
			ev.preventDefault();
		});
	}
	//vip cartdelbatch
	if($('.vipcartdelbatch').size()>0){
		$('.vipcartdelbatch').live('click', function(ev){
			if(confirm('你确定要执行此操作吗？')){
				$(this).closest('form').find('input[name=ID]:checked').each(function(i, field){
					var url='/ajax/user.aspx?action=cd&cv='+field.value;
					HtmlReturn(url);
				});
				location.href=c_sitemain+'/Cart/List.aspx';
			}
			ev.preventDefault();
		});
	}
	//jq magazine favorite
	if($('.vipmagfav').size()>0){
		$('.vipmagfav').live('click', function(ev){
			var url='/ajax/user.aspx?action=fmp';
			url+='&tid='+$('form[name=frmdata]>input[name=TypeID]').val();
			url+='&kid='+$('form[name=frmdata]>input[name=KeyID]').val();
			url+='&cid='+$('form[name=frmdata]>input[name=ClassID]').val();
			url+='&t='+escape($('form[name=frmdata]>input[name=Title]').val());
			var modeluser=ModelUser();
			if(modeluser.UserID<=0){
				ShowCustomLayerContent(HtmlLoginForm('收藏',url));
			}else{
				var msg=HtmlReturn(url);
				if(msg.length>0){alert(msg);}
			}
			ev.preventDefault();
		});
	}
	// jq copy
	$('.jqcopy').live('click', function(ev){
		var value='向您推荐维普网作品：'+$(this).attr('value');
		value+='\r\n';
		value+=location.href;
		copyToClipboard(value);
		alert('作品标题与链接已复制，您可以(Ctrl+V)粘贴到QQ,MSN或者邮件发给好友了!');
		ev.preventDefault();
	});
}

function ModelProPack(){
	
}
function ModelDataShop(){
	this.typeid=0;
	this.keyid=0;
	this.title='';
	
	objfrm=$('form[name=frmdatashop]');
	if(objfrm.size()<=0){return;}
	var objtypeid=objfrm.find('input[name=TypeID]')
	if(objtypeid.size()>0){this.typeid=objtypeid.val();}
	var objkeyid=objfrm.find('input[name=KeyID]')
	if(objkeyid.size()>0){this.keyid=objkeyid.val();}
	var objtitle=objfrm.find('input[name=Title]')
	if(objtitle.size()>0){this.title=objtitle.val();}
}
function ModelData(){
	this.typeid=0;
	this.keyid='';
	this.title='';
	this.keyword='';
	this.classid=0;
	this.classtype='';
	this.jsondata='';
	
	objfrm=$('form[name=frmdata]');
	if(objfrm.size()<=0){return;}
	var objtypeid=objfrm.find('input[name=TypeID]');
	if(objtypeid.size()>0){this.typeid=objtypeid.val();}
	var objkeyid=objfrm.find('input[name=KeyID]');
	if(objkeyid.size()>0){this.keyid=objkeyid.val();}
	var objtitle=objfrm.find('input[name=Title]');
	if(objtitle.size()>0){this.title=objtitle.val();}
	var objkeyword=objfrm.find('input[name=Keyword]');
	if(objkeyword.size()>0){this.keyword=objkeyword.val();}
	var objclasstype=objfrm.find('input[name=ClassType]');
	if(objclasstype.size()>0){this.classtype=objclasstype.val();}
	var objclassid=objfrm.find('input[name=ClassID]');
	if(objclassid.size()>0){this.classid=objclassid.val();}
}
function ModelUser(){
	var result;
	$.ajax({
		url: '/ajax/user.aspx?action=ui',
		cache: false,
		async: false,
		success: function(data){
			result=eval('('+data+')');
		}
	});
	return result;
}
function HtmlReturn(url){
	var result = '';
	$.ajax({
		url: url,
		cache: false,
		async: false,
		success: function(data){
			result=data;
		}
	});
	return result;
}
function HtmlLoginForm(formtitle,reurl){
	var result = '';
	$.ajax({
		url: '/ajax/user.aspx?action=lf&ft='+escape(formtitle)+'&r='+escape(reurl),
		cache: false,
		async: false,
		success: function(data){
			result=data;
		}
	});
	return result;
}
function onlineservice(){	
	$('body').append('<div class="floatbar_ad"><a href="javascript:;" id="BizQQWPA" title="点击咨询客服" style="display:block;width:70px;height:85px;margin:0 auto;margin-top:35px;"></a><a href="/gocheck/?from=detail_icon_gocheck" target="_blank" title="论文相似度检测" style="display:block;width:70px;height:85px;margin:0 auto;margin-top:5px;"></a><a style="display: block; width: 70px; height: 85px; margin: 5px auto 0pt;" title="加急上网服务" target="_blank" href="http://service.cqvip.com/view.asp?id=271"></a><a href="#top" title="返回顶部" style="display:block;width:70px;height:20px;margin:0 auto;margin-top:5px;"></a></div>');
	BizQQWPA.addCustom({ aty: '0', nameAccount: 4006385550, selector: 'BizQQWPA' });
}

function HtmlCartShow(){
    if($('.pos').size()>0){
        $('body').find('.pos').remove();
    }
    if($('.pos').size()==0){
        var objfrm=$('.vipcart');
	    var offset = objfrm.offset();
	    popupLeft = offset.left + objfrm.scrollLeft();
	    popupTop = offset.top + objfrm.scrollTop();
	    
        var content = '<div class="pos"><ul><li class="bold f16 green"><img src="http://image.cqvip.com/ipub/images/icon_right.gif"/> 已添加到购物车</li>';
        content += '<li>该文章已成功添加到您的购物车中</li><li class="block done"><a href="'+c_sitemain+'/Cart/List.aspx" class="btn_s bmini red">立即结算</a> <a href="javascript:" onclick="HtmlCartClose();" class="btn_s bmini gray">暂不结算</a></li></ul>';
        content += '<a href="javascript:;" onclick="HtmlCartClose();" class="close" title="关闭">关闭</a></div>';
        
        $('body').append(content);
        $('.pos').css({
            "top": popupTop + "px",
		    "left": popupLeft + "px"
        });
    }else{
        $('.pos').show();
    }
}
function HtmlCartClose(){
    $('.pos').hide();
}

function HtmlShareShow(title){
    if($('.share').size()>0){
        $('body').find('.share').remove();
    }
    if($('.share').size()==0){
        //jqfavorite
        var objfrm=$('.jqfavorite');
	    var offset = objfrm.offset();
	    popupLeft = offset.left + objfrm.scrollLeft();
	    popupTop = offset.top + objfrm.scrollTop();
        var content = '<div class="share pos"><ul><li class="bold f16 green"><img src="http://image.cqvip.com/ipub/images/icon_right.gif"/> '+title+'</li><li>本文章已添加到收藏夹<a href="/user/favoriteList.aspx" title="收藏夹">点击查看</a></li></ul>';
        content += '<a href="javascript:;" onclick="HtmlShareClose();" class="close" title="关闭">关闭</a></div>';
        
        $('body').append(content);
        $('.share').css({
            "top": popupTop + "px",
		    "left": popupLeft + "px"
        });
    }else{
        $('.share').show();
    }
}
function HtmlShareClose(){
    $('.share').hide();
}

function HtmlMagazineLimitShow(magazinename,phone){
	var html='<div class="lightbox" style="display:block;"><div id="selcontent" class="alert"><ul class="alert_intro f14 black song yahei"><span class="bold red f18 a_center block"><br/>抱歉！《'+magazinename+'》暂未被《中文科技期刊数据库》收录，请直接联系期刊社！</span><b class="block f16  a_center tahoma" style="line-height:3em;">期刊社联系电话：'+phone+'</b></ul><span class="done"><input type="button" class="btn_s bgray jqclose" value="关闭"/></span><a href="javascript:;" class="close jqclose" title="关闭">关闭</a></div></div>'
	//$('.mask').show();
	//$('.lightbox').show();
	ShowMask();
	RemoveCustomLayer();
	ShowCustomLayerContent(html);
}

//加载函数 JQUERY DOM
$(document).ready(function(){
//mainsearch();
myvipmenu();
//searchbox();
selectmenu();
basetopchange();
jqheadeventinit();
//autologinevent();
onlineservice();
});
