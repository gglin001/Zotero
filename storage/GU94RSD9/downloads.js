var xmlhttp;
var xmlDoc;
xmlhttp=null

// code for Mozilla, etc.
if (window.XMLHttpRequest)
{
  xmlhttp=new XMLHttpRequest()
}
// code for IE
else if (window.ActiveXObject)
{
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
}

if (typeof DOMParser == "undefined")
{
	DOMParser = function () {}
	DOMParser.prototype.parseFromString = function (str, contentType)
	{
		if (typeof ActiveXObject != "undefined")
		{
			var d = new ActiveXObject("MSXML.DomDocument");
			d.loadXML(str);
			return d;
		}
		else if (typeof XMLHttpRequest != "undefined")
		{
			var req = new XMLHttpRequest;
			req.open("GET", "data:" + (contentType || "application/xml") + ";charset=utf-8," + encodeURIComponent(str), false);
			if (req.overrideMimeType)
			{
				req.overrideMimeType(contentType);
			}
			req.send(null);
			return req.responseXML;
		}
	}
}

function getCurrentItemId()
{
	var itemId;
	var winLoc=""+window.location;
	if(winLoc.match(/\/2134\/(\d+)/))
	{
		itemId=RegExp.$1
	}
	return itemId;
}

var s=document.getElementById("lboroDownloads");
var itemId=getCurrentItemId();

xmlhttp.open("GET", "/cgi-bin/getTotalStats?item=" + itemId , true);
xmlhttp.onreadystatechange=function()
{
 	if (xmlhttp.readyState==4)
	{
		// convert the string to an XML object
		var xmlobject = (new DOMParser()).parseFromString(xmlhttp.responseText, "text/xml");
		var root = xmlobject.getElementsByTagName('totals')[0];
		var totalNonbots=0;
		if(root.getElementsByTagName("downloads")[0].getElementsByTagName("totalNonbots").length)
		{
			if(root.getElementsByTagName("downloads")[0].getElementsByTagName("totalNonbots")[0].firstChild)
			{
				totalNonbots=root.getElementsByTagName("downloads")[0].getElementsByTagName("totalNonbots")[0].firstChild.nodeValue;
			}
		}
		var totalNonbotViews=root.getElementsByTagName("views")[0].getElementsByTagName("totalNonbots")[0].firstChild.nodeValue;
		var moreStatsURL="/cgi-bin/stats?item=" + itemId;
		var moreViewStatsURL="/cgi-bin/statsViews?item=" + itemId;
		var line="";
		if(totalNonbotViews>1)
		{
			line="This page has been <a href=\"" + moreViewStatsURL + "\">viewed " + totalNonbotViews + " times</a>";
		}
		if(totalNonbots==0)
		{
		}
		else if(totalNonbots==1)
		{
			if(line)
			{
				line += " and a file associated with this item has been <a href=\"" + moreStatsURL + "\">downloaded</a>";
			}
			else
			{
				line = "A file associated with this item has been <a href=\"" + moreStatsURL + "\">downloaded</a>";
			}
		}
		else
		{
			if(line)
			{
				line+=" and files associated with it have been <a href=\"" + moreStatsURL + "\"> downloaded " + totalNonbots + " times</a>";
			}
			else
			{
				line="Files associated with it have been <a href=\"" + moreStatsURL + "\"> downloaded " + totalNonbots + " times</a>";
			}
		}
		if(line)
		{
			line += ".";
			s.innerHTML=line;
		}
	}
}
xmlhttp.send(null);
