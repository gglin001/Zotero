"use strict";jQuery(document).ready(function($){var hkbLiveSearchID='hkb-jquery-live-search';var searchBox=$('.hkb-site-search__field').liveSearch({url:hkbJSSettings.liveSearchUrl,id:hkbLiveSearchID});var resultsElementSelector='.hkb-searchresults';var currentElement=null;var parentForm=searchBox.parents('form');searchBox.bind('keydown',function(e){switch(e.keyCode){case 9:return;break;case 40:e.preventDefault();e.stopPropagation();$(resultsElementSelector).css('display','block');if(currentElement===null||currentElement.length<=0){currentElement=$(resultsElementSelector).find('li').first().addClass('hkb-searchresults__current');}
else{currentElement.removeClass('hkb-searchresults__current');if(currentElement.next('li').length<=0){currentElement=$(resultsElementSelector).find('li').first().addClass('hkb-searchresults__current');}
else{currentElement=currentElement.next('li').addClass('hkb-searchresults__current');}}
scrollToCurrent();return false;break;case 38:e.preventDefault();e.stopPropagation();if(currentElement===null||currentElement.length<=0){currentElement=$(resultsElementSelector).find('li').last().addClass('hkb-searchresults__current');}
else{currentElement.removeClass('hkb-searchresults__current');if(currentElement.prev('li').length<=0){currentElement=$(resultsElementSelector).find('li').last().addClass('hkb-searchresults__current');}
else{currentElement=currentElement.prev('li').addClass('hkb-searchresults__current');}}
scrollToCurrent();return false;break;case 13:if($(resultsElementSelector).find('.current').length>0){currentElement=$(resultsElementSelector).find('.hkb-searchresults__current');}
if(currentElement!==null&&currentElement.length>0){e.preventDefault();e.stopPropagation();var href=currentElement.find('a').first().attr('href');$('.hkb-searchresults').hide();currentElement.removeClass('hkb-searchresults__current');currentElement=null;window.location.href=href;return false;}
else{parentForm.first().submit();}
return false;break;default:break;}});function scrollToCurrent(){var liveSearchEle=$('#'+hkbLiveSearchID);var lsOffset=liveSearchEle.offset().top;var lsHeight=liveSearchEle.height();var lsTotal=lsOffset+lsHeight;var searchBoxHeight=searchBox.height();var currentItem=$(resultsElementSelector).find('li.current');var currentOffset=null;if(currentItem==undefined){currentOffset=0;}else{currentOffset=currentItem.offset()
if(currentOffset==undefined){currentOffset=0;}else{currentOffset=currentOffset.top;}}
var selectedItemHeight=null;if(currentItem==undefined){selectedItemHeight=0;}else{selectedItemHeight=currentItem.height();}
var currentItemIndex=null;if(currentItem==undefined){currentItemIndex=0;}else{currentItemIndex=currentItem.index();}
var selectedItemFullHeight=selectedItemHeight+currentOffset;var moveScroll=selectedItemFullHeight-lsTotal;var currentScroll=liveSearchEle.scrollTop();var liveSearchCount=$(resultsElementSelector).children('li').length;if(currentItemIndex==0){liveSearchEle.scrollTop(0);return;}
if(currentItemIndex+1==liveSearchCount){liveSearchEle.scrollTop(lsHeight+selectedItemHeight*2);return;}
if(selectedItemFullHeight>lsTotal){liveSearchEle.scrollTop(currentScroll+selectedItemHeight);return;}
if(currentOffset<lsOffset){liveSearchEle.scrollTop(currentScroll-selectedItemHeight);return;}}
if(hkbJSSettings.focusSearchBox){jQuery('.hkb-site-search__field').focus();}});