/*!
 * MinPubSub
 * Copyright(c) 2011 Daniel Lamb <daniellmb.com>
 * MIT Licensed
 */
;
var SAS=SAS||{};
(function(b){var c={};
var a=b.c_||{};
c.publish=function(f,e){var g=a[f],d=g?g.length:0;
while(d--){g[d].apply(b,e||[])
}};
c.subscribe=function(d,e){if(!a[d]){a[d]=[]
}a[d].push(e);
return[d,e]
};
c.unsubscribe=function(f,g){var e=a[g?f:f[0]],g=g||f[1],d=e?e.length:0;
while(d--){if(e[d]===g){e.splice(d,1)
}}};
if(typeof module==="object"&&module.exports){module.exports=exports=c
}else{if(typeof define==="function"&&define.amd){define(function(){return c
})
}else{if(typeof b==="object"){b.publish=c.publish;
b.subscribe=c.subscribe;
b.unsubscribe=c.unsubscribe
}}}})(SAS||{});