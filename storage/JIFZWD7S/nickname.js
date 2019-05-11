
var nickname=getCookie("_unn");
var obj = $('#welcome');
if(nickname!=null){
	obj.html('<a href="/User/">'+decodeURIComponent(escape(nickname))+'</a> <a href="/User/Quit.aspx?r='+escape(location.href)+'">退出</a>');
} else {
    //obj.html("<a href=\"/User/\">登录</a> <a href=\"/User/Register.aspx\">注册</a> | <a id=\"iploginlink\" href=\"javascript:;\">IP登录</a>");
	obj.html("<a href=\"/User/\">登录</a> <a href=\"/User/Register.aspx\">注册</a> ");
}

function getCookie(name){
	var start = document.cookie.indexOf(name+"=");        
	var len = start + name.length + 1;         
	if((!start)&&(name!=document.cookie.substring(0,name.length)))
	{
			return null;
	}
	if(start==-1)
	{
			return null;
	}
	var end = document.cookie.indexOf("&",len);         
	if(end==-1)
	{
			end = document.cookie.length;
	}
	return unescape(document.cookie.substring(len,end));     
}