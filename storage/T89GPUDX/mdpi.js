Object.size=function(obj){var size=0,key;for(key in obj){if(obj.hasOwnProperty(key))size++;}
return size;};var TIMEOUT=200,EVENT_KEY='resizeend',$window=$(window),timer;if(window.addEventListener)
{window.addEventListener('resize',windowResize);}
else
{window.attachEvent('onresize',windowResize);}
function windowResize()
{clearTimeout(timer);timer=setTimeout(function(){$(window).trigger(EVENT_KEY);},TIMEOUT);}
var SHOW_EXPANDING_EVENT="showexpandingevent";function waitForImagesReady(container,params,func)
{var img=container.find('img[src]');var totalImg=img.length;if(totalImg==0){func(params);}
else{var waitImgDone=function(){totalImg--;if(totalImg==0){func(params);}};img.each(function(){if(this.complete)
{waitImgDone();}
else
{$(this).load(waitImgDone).error(waitImgDone);}});}}
var mdpi_column_height_module=(function()
{var moduleVariables=new Object();moduleVariables["mainColumnImagesReady"]=false;moduleVariables["extendingContentsReady"]=false;moduleVariables["leftColumn"]=null;moduleVariables["middleColumn"]=null;moduleVariables["rightColumn"]=null;moduleVariables["mainColumn"]=null;var calculateColumnHeight=function(column)
{var expandingContainers=column.find(".extending-content.content-ready");var expandingContainersElements=[];var maxExpandingContainerLength=0;var elements=new Object();for(var i=0;i<expandingContainers.length;i++){var containerElements=$(expandingContainers[i]).find(".expanding-div").not(".empty");var containerLength=containerElements.length;expandingContainersElements.push(containerElements);maxExpandingContainerLength=Math.max(containerLength,maxExpandingContainerLength);}
for(var i=0;i<maxExpandingContainerLength;i++)
{for(var j=0;j<expandingContainers.length;j++)
{var currentElement=(expandingContainersElements[j].length>i?expandingContainersElements[j][i]:null);elements[i*expandingContainers.length+j]=currentElement;}}
calculate(elements,0,column);};var calculate=function(elementArray,currentIndex,column)
{if(Object.size(elementArray)>currentIndex)
{element=$(elementArray[currentIndex]);var uniqueElement=element;if(element==null){calculate(elementArray,currentIndex+1,column);return;}
if('undefined'!=typeof element.data("content-raw")){uniqueElement=$("<div>").html(unescape(element.data("content-raw")));}
var uniqueItem=uniqueElement.find("input.unique-dynamic-item");if(1===uniqueItem.length&&1===$(".expanding-div.expanded input.unique-dynamic-item[value='"+uniqueItem.val()+"']").length){calculate(elementArray,currentIndex+1,column);return;}
if(column.height()<moduleVariables["mainColumn"].height())
{element=$(elementArray[currentIndex]);var extendingContent=element.closest(".extending-content");if(!extendingContent.is(":visible")){extendingContent.show(0,function(){setTimeout(function(){extendingContent.trigger(SHOW_EXPANDING_EVENT);},1);});}
element.addClass("expanded").removeClass("collapsed");if(element.html()==''){element.html(unescape(element.data("content-raw")));}
waitForImagesReady(element,[column,elementArray,currentIndex],function(params){var localColumn=params[0];var localElementArray=params[1];var localCurrentIndex=params[2];calculate(localElementArray,localCurrentIndex+1,localColumn);});}
else
{var hidingIndex=(column===moduleVariables["middleColumn"]?currentIndex:currentIndex-1);handleExtendingDivHiding(elementArray,hidingIndex,column);handlePadding(column);}}
else if(Object.size(elementArray)==currentIndex)
{if(column.height()>moduleVariables["mainColumn"].height())
{handleExtendingDivHiding(elementArray,currentIndex-1,column);}
handlePadding(column);}};var handleExtendingDivHiding=function(elementArray,index,column)
{for(var i=Math.max(index,0);i<Object.size(elementArray);i++)
{var element=$(elementArray[i]);element.removeClass("expanded").addClass("collapsed");}
column.find(".extending-content").each(function()
{if($(this).find(".expanding-div.expanded").length==0)
{$(this).hide();}});};var handlePadding=function(column)
{if(typeof Foundation==='undefined'||Foundation.utils.is_medium_up())
{var paddingElement=column.find(".column-padding");if(paddingElement.length>0)
{paddingElement.css('height',moduleVariables["mainColumn"].height()-column.height()+11+'px');}}};function calcColumnHeights(force,mainColumn)
{if(moduleVariables["mainColumnImagesReady"]&&moduleVariables["extendingContentsReady"])
{$(".column-padding").css('height','0px');if(force||typeof Foundation==='undefined'||Foundation.utils.is_medium_up())
{$(".expanding-div").removeClass("expanded").addClass("collapsed");if("#right-column"!==mainColumn)
{calculateColumnHeight(moduleVariables["rightColumn"]);}
if("#middle-column"!==mainColumn)
{calculateColumnHeight(moduleVariables["middleColumn"]);}
if("#left-column"!==mainColumn)
{calculateColumnHeight(moduleVariables["leftColumn"]);}}}}
return{setVariable:function(name,value)
{if(name in moduleVariables){moduleVariables[name]=value;}},getVariable:function(name)
{if(name in moduleVariables){return moduleVariables[name];}
return null;},calculateColumnHeights:function(force,mainColumn)
{calcColumnHeights(force,mainColumn);}};})();$(document).ready(function()
{if('undefined'===typeof(mainColumn1))
{mainColumn1="#middle-column";}
mdpi_column_height_module.setVariable("leftColumn",$("#left-column"));mdpi_column_height_module.setVariable("middleColumn",$("#middle-column"));mdpi_column_height_module.setVariable("rightColumn",$("#right-column"));mdpi_column_height_module.setVariable("mainColumn",$(mainColumn1));if(typeof(extendingReady)!=='undefined'&&extendingReady)
{mdpi_column_height_module.setVariable("extendingContentsReady",true);}
waitForImagesReady($(mainColumn1),[],function(params){mdpi_column_height_module.setVariable("mainColumnImagesReady",true);mdpi_column_height_module.calculateColumnHeights(true,mainColumn1);});$(".extending-content").each(function()
{var element=$(this);if(element.data('url'))
{$.ajax({url:element.data('url'),success:function(msg)
{$.each(msg.data,function(i,object){var new_div=$(document.createElement('div'));new_div.attr('data-content-raw',escape(object));new_div.addClass("expanding-div");element.addClass("collapsed");if(element.find(".last-item").length>0)
{element.find(".last-item").before(new_div);}
else
{element.append(new_div);}});element.addClass("content-ready");if($(".extending-content").not(".content-ready").length==0)
{mdpi_column_height_module.setVariable("extendingContentsReady",true);mdpi_column_height_module.calculateColumnHeights(true);}}});}});$(":checkbox").change(function(e)
{var select_all_name=$(this).data('select-all');if(select_all_name)
{var status=$(this).is(":checked");$(":checkbox").each(function(e)
{if($(this).data('select-all-name')===select_all_name||$(this).data('select-all')===select_all_name)
{$(this).prop("checked",status);}});}});$('body').on('click','#reloadCaptcha',function()
{var img=$(this).prev('img');var imgSrc=img.attr('src').split('?')[0];img.attr('src',imgSrc+'?'+(new Date()).getTime());});function getEmailCaptchaData(element){var params;if(element.data("author-id"))
{params="?author_id="+element.data("author-id");}
else if(element.data("editor-id"))
{params="?editor_id="+element.data("editor-id");}
else if(element.data("user-id"))
{params="?user_id="+element.data("user-id");}
else if(element.data("reviewer-id"))
{params="?reviewer_id="+element.data("reviewer-id");}
else
{params="?email_prefix="+element.data("email-prefix");}
if(element.data("email-cc"))
{params+="&email_cc="+element.data("email-cc")}
return params;}
$(document).on("click","a.toEncode.emailCaptcha",function(e){e.stopImmediatePropagation();var emailLink=$(this);if(emailLink.attr('href').indexOf("@")<0)
{e.preventDefault();var param=getEmailCaptchaData(emailLink);var captcha=$("#captchaModal");captcha.load("/email/captcha"+param,function(data)
{var href=$(this).find(".captcha_reload").prop("href");var regexp=/(?:javascript:)(.*)(?:\()/;window[regexp.exec(href)[1]]();captcha.foundation('reveal','open');});}});$("#captchaModal").on("submit","#emailCaptchaForm",function(e)
{e.preventDefault();var form=$(this);var params;if($("#authorId").val())
{params="?author_id="+$("#authorId").val()}
else if($("#editorId").val())
{params="?editor_id="+$("#editorId").val()}
else if($("#userId").val())
{params="?user_id="+$("#userId").val();}
else if($("#reviewerId").val())
{params="?reviewer_id="+$("#reviewerId").val();}
else
{params="?email_prefix="+$("#emailPrefix").val()}
if($("#emailCC").val()){params+="&email_cc="+$("#emailCC").val()}
$.post(form.attr('action')+params,form.serialize(),function(data)
{if(data.succ)
{$("#captchaModal").foundation('reveal','close');e.preventDefault();var param=data.email;var type=data.type;var confirm=$("#captchaConfirmEmailModal");confirm.load("/email/captcha_confirmation",{email:param,type:type,_token:data.csrf},function(data){if("[]"!==data){confirm.foundation('reveal','open');}});}
else
{$("#errorMsg").show();var $refreshcaptcha=form.find("a.captcha_reload"),imageId=$refreshcaptcha.attr("href").split('javascript:reload_captcha_')[1].split('(')[0];console.log(imageId);window['reload_captcha_'+imageId]();}});});$('.genericCaptcha').click(function(e)
{var form=$(this).closest("form");var email=form.find("input[type='email']");if(form.length>0){if(email.val().indexOf('@')>0)
{e.preventDefault();$("#captchaModal").load('/alert/captcha/'+form.prop("id"),function(data)
{var href=$(this).find(".captcha_reload").prop("href");var regexp=/(?:javascript:)(.*)(?:\()/;window[regexp.exec(href)[1]]();return $("#captchaModal").foundation("reveal","open");});}
else
{return;form.submit();}}});$('.accessCaptcha').click(function(e)
{e.preventDefault();var target=$(this).data("target");$.post('/access/captcha/check/'+target,function(data){if(data.succ){window.location=data.url;}
else{$("#captchaModal").load('/access/captcha/'+target,function(data){var href=$(this).find(".captcha_reload").prop("href");var regexp=/(?:javascript:)(.*)(?:\()/;window[regexp.exec(href)[1]]();return $("#captchaModal").foundation("reveal","open");});}});});$("#captchaModal").on("submit","#accessCaptchaForm",function(e)
{e.preventDefault();var form=$(this);var params;$.post(form.attr('action'),form.serialize(),function(data)
{if(data.succ)
{$("#captchaModal").foundation('reveal','close');window.location=data.url;}
else
{$("#errorMsg").show();var refreshcaptcha=form.find("a.captcha_reload");var imageId=refreshcaptcha.attr("href").split('javascript:reload_captcha_')[1].split('(')[0];window['reload_captcha_'+imageId]();}});});$("#captchaModal").on("submit","#alertCaptchaForm",function(e)
{e.preventDefault();var form=$(this);$.post(form.attr('action'),form.serialize(),function(data)
{if(data.succ)
{$("#captchaModal").foundation("reveal","close");var origForm=$("#"+data.form);origForm[0].submit();}
else
{$("#errorMsg").show();}});});$("a.export-options-show").click(function(e)
{e.preventDefault();var listing=$(this).closest(".article-listing");listing.find("div.article-content, .export-element").toggleClass("export-expanded");$(document).foundation('equalizer','reflow');});$(".accordian-link").click(function(e)
{e.preventDefault();var target=$(this).data('target');$('#'+target).toggle();$(this).find('span').toggle();$(document).foundation('equalizer','reflow');});$(document).on("click",'.abstract-figures-show',function(e)
{e.preventDefault();var abstractImagePreview=$(this).next(".abstract-image-preview");abstractImagePreview.find(".openpopupgallery.cycle-slide img").each(function(e)
{$(this).prop("src",$(this).data("src"));});$(this).find("span").toggle();abstractImagePreview.toggle();$(document).foundation('equalizer','reflow');});$('.popupgallery').each(function(){$(this).magnificPopup({type:'image',delegate:'a',index:2,image:{verticalFit:false},gallery:{enabled:true}});});$(document).on("click",'.dwnld_block .openpopupgallery',function(){var target=$(this).data('target');$('#'+target+'.popupgallery').magnificPopup('open');});$(document).on("click",'.abstract-image-preview .openpopupgallery',function(){var target=$(this).data('target');var index=$(this).data('imgindex');$('#'+target+'.popupgallery').magnificPopup('open');$('#'+target+'.popupgallery').magnificPopup('goTo',index);});$("table").on("keyup",".filters .filter",function(){setTimeout(function(){$(document).foundation('equalizer','reflow');},200);});$(window).scroll(function(){if($(this).scrollTop()>220){$('.back-to-top').fadeIn(500);}else{$('.back-to-top').fadeOut(500);}});$('.back-to-top').click(function(event){event.preventDefault();$('html, body').animate({scrollTop:0},500);return false;})});function handleJournalActiveBasedLinks(journalName,link,event,isPublic,isAcceptingSubmissions,isDiscontinued){var msg="";if(isDiscontinued){msg="<em>"+journalName+"</em> is discontinued: "+link.data("disabledmessage");}
else if(!isPublic){msg="<em>"+journalName+"</em> is not public: "+link.data("disabledmessage");}
else if(!isAcceptingSubmissions&&link.hasClass("js-journal-active-only-submit-link")){msg="<em>"+journalName+"</em> journal does not accept new submissions";}
if(""!==msg){event.preventDefault();event.stopImmediatePropagation();$("#js-action-disabled-modal-submit").toggle(link.hasClass("js-journal-active-only-submit-link"));$("#js-action-disabled-modal-text").html(msg);$('#actionDisabledModal').foundation('reveal','open');}}