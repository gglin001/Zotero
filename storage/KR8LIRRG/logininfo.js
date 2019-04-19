function autologinevent(){var suid=UrlParam('SUID');if(suid.length>0){$.ajax({url:'/ajax/html.aspx?action=utld&suid='+suid,cache:false,success:function(data){jqajaxinfo('/ajax/html.aspx?action=utli',false,'#welcome')}})}else{jqajaxinfo('/ajax/html.aspx?action=utli',false,'#welcome')}if($('#welcome').text()==''){var url=location.href.toLowerCase().substr(c_sitemain.length);if(url=='/'||url=='/index.shtml'||url=='/index.aspx'){$.ajax({url:'/ajax/html.aspx?action=upld',cache:false,success:function(data){jqajaxinfo('/ajax/html.aspx?action=utli',false,'#welcome')}})}}}function indexcheckhost(){var cururl=location.href.toLowerCase();var curhost='http://'+location.host.toLowerCase();if(curhost.length>=c_sitemain.length&&curhost.substr(0,c_sitemain.length)!=c_sitemain){location.href=c_sitemain}}$('#iploginlink').live('click',function(ev){$.ajax({url:'/ajax/html.aspx?action=upld&lf=1',cache:false,timeout:60000,error:function(xmlHttpRequest,error){alert('数据处理失败，请重新提交表单！')},success:function(data){if(AjaxReturnSuccess(data)){top.location.reload()}else{alert(AjaxReturnMsg(data))}}})});
$('#qqloginlink').live('click',function(ev){
	var a=window.open("/openqzone/qzonelogin.aspx", "TencentLogin", "width=450,height=320,menubar=0,scrollbars=0, status=1,titlebar=0,toolbar=0,location=1");
	return a;
});
$('#msnloginlink').live('click',function(ev){
	var a=window.open("/openmsn/msnlogin.aspx", "MsnLogin", "width=450,height=380,menubar=0,scrollbars=0, status=1,titlebar=0,toolbar=0,location=1");
	return a;
});
$('#sinaloginlink').live('click',function(ev){
	var a=window.open("/opensina/sinalogin.aspx", "SinaLogin", "width=580,height=380,menubar=0,scrollbars=0, status=1,titlebar=0,toolbar=0,location=1");
	return a;
});
$('#alipayloginlink').live('click',function(ev){
	var a=window.open("/openalipay/alipaylogin.aspx", "AlipayLogin");
	return a;
});
//$.ajax({url:'/common/logininfo.aspx',cache:false,success:function(data){eval(data);}});
//indexcheckhost();