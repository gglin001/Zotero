var SAS=(function(a){a.handleVideo=function(c){var d=document.getElementById("container-"+c);
var k=d.getAttribute("data-playerid");
try{videojs(k).dispose()
}catch(i){}var h=d.getAttribute("data-account");
var m=d.getAttribute("data-player");
var l=d.getAttribute("data-embed");
var j=d.getAttribute("data-video-id");
var f=d.getAttribute("data-width")||"";
var n=d.getAttribute("data-height")||"";
var g=document.getElementById("captions-"+c).innerHTML||"";
var o=document.createElement("script");
o.src="//players.brightcove.net/"+h+"/"+m+"_"+l+"/index.min.js";
o.onload=(function(t,s,r,v,u,p,w,e,q){return function(){if(q.indexOf("track")==-1){q=""
}var x='<video preload="none" data-setup="{&quot;techOrder&quot;: [&quot;html5&quot;]}" id="'+t+'" data-video-id="'+s+'"  data-account="'+r+'" data-player="'+v+'" data-embed="'+u+'" class="video-js" controls data-width="'+p+'" data-height="'+w+'">'+q+"</video>";
e.innerHTML=x;
bc(document.getElementById(t))
}
}(k,j,h,m,l,f,n,d,g));
document.body.appendChild(o);
if(g!=""&&g.indexOf("track")==-1){b(g,c)
}};
function b(d,c){var e=setInterval(function(){if(typeof videojs!="undefined"){clearInterval(e);
videojs("player-"+c).ready(function(){var f=this;
f.on("loadedmetadata",function(){var h=f.textTracks();
for(var j=0;
j<h.length;
j++){var g=h[j];
if(g.kind==="captions"&&d==g.language){g.mode="showing"
}}})
})
}},250)
}return a
}(SAS||{}));