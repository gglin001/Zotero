function cq5forms_showMsg(c,g,b,e){var d=document.forms[c].elements[g];
var a=jQuery("#"+c);
var h=a.find(d);
var k=h.closest("div.form_row").last();
var i="<p class='form_error'>"+clientFormValidationError()+"</p>";
var j="<div class='form_row'>";
j+="<div class='form_leftcol' style='display: none;'></div>";
j+="<div class='form_rightcol'><label for='"+g+"'><span class='form_error'>"+b+"</span></label></div>";
j+="</div>";
jQuery(".form_error").remove();
jQuery("form div.form").append(i);
k.after(j);
if(jQuery(h).length>1){if(!e){e=0
}d[e].focus()
}else{d.focus()
}}function cq5forms_isArray(a){return typeof a.length=="number"&&a.item&&(!a.tagName||a.tagName.toUpperCase()!="SELECT")
}function cq5forms_isNodeList(a){return false
};