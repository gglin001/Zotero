var vipsuid='';
try{
$.ajax({url:'/common/scriptsuid.aspx',cache:true,success:function(data){	
	eval(data);
	if(vipsuid.length>0){LinkAddSuid();}
}});
}catch(e){}

function LinkAddSuid(){
	// 主机地址，需要大写，请注意
	var aHost = new Array();
	aHost[0] = "BLOG.CQVIP.COM";
	aHost[1] = "PAY.CQVIP.COM";
	aHost[2] = "BBS.CQVIP.COM";
	aHost[3] = "VIPBLOG.CQVIP.COM";	
	aHost[4] = "MY.CQVIP.COM";
	aHost[5] = "CHEM.CQVIP.COM";
	aHost[6] = "PHARM.CQVIP.COM";
	aHost[7] = "LIB.CQVIP.COM";
	aHost[8] = "2010.CQVIP.COM";
	aHost[9] = "EXPO.CQVIP.COM";
	aHost[10] = "SERVICE.CQVIP.COM";
	aHost[11] = "KS.CQVIP.COM";
	
	$('a').live('click',function(ev){
		var url=$(this).attr('href');
		if(url.length<7){return;}
		if(url.substr(0,7).toUpperCase() != "HTTP://"){return;}
		if(url.toUpperCase().indexOf('SUID=')>0){return;}
		url=url.substr(7);
		for(i=0;i<aHost.length;i++){
			var curhost=aHost[i];
			if(url.length >= curhost.length && url.substr(0,curhost.length).toUpperCase() == curhost.toUpperCase()){
				if(url.indexOf('?')>0){
					$(this).attr('href','http://' + url + '&SUID=' + vipsuid);
				}else{
					$(this).attr('href','http://' + url + '?SUID=' + vipsuid);
				}
				break;
			}
		}
	});
}