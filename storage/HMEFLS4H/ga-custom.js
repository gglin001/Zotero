// http://ankitkumar.in/wp-content/uploads/auto-tagging.js
if (typeof jQuery != 'undefined') {
  jQuery(document).ready(function($) {
  
  	//debug
  	//console.log("host: " + window.location.hostname);
  
    var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav|jpg|jpeg)$/i;
    var baseHref = '';
    if (jQuery('base').attr('href') != undefined) baseHref = jQuery('base').attr('href');
 
    jQuery('a').on('click', function(event) {
      var el = jQuery(this);
      var track = true;
      var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') :"";
      //debug
      //console.log("href: " + href);
      
      var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
      
      //debug
      //console.log("isThisDomain: " + isThisDomain);
      if (!href.match(/^javascript:/i)) {
        var elEv = []; elEv.value=0, elEv.non_i=false;
        if (href.match(/^mailto\:/i)) {
          elEv.category = "email";
          elEv.action = "click";
          elEv.label = href.replace(/^mailto\:/i, '');
          elEv.loc = href;
        }
        else if (href.match(filetypes)) {
          var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
          elEv.category = "download";
          elEv.action = "click-" + extension[0];
          elEv.label = href.replace(/ /g,"-");
          elEv.loc = baseHref + href;
        }
        else if (href.match(/^http(s)?\:/i)) {
          elEv.category = "links";
          elEv.action = "click";
          elEv.label = href.replace(/^https?\:\/\//i, '');
          elEv.non_i = true;
          elEv.loc = href;
        }
        else track = false;
        
        console.log(track);
 
        if (track) {
          ga('send', 'event', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i);
          ga('gaAccount2.send', 'event', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i);

			//Date: 9.7.2016, comment out below
        	//if ( el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank') {
           	 //setTimeout(function() { location.href = elEv.loc; }, 400);
           	 //uncomment return false, see if tracking works for all .heart.org links
           	 //return false;
      		//}
    	}
      }
    });//jQuery on click
  });//jQuery doc ready
}//end if

//Date: 9.7.2016
//line 33, from else if (href.match(/^https?\:/i) && !isThisDomain) to else if (href.match(/^http(s)?\:/i))
//Date: 9.7.2016
//Tested and everything is tracking 