(function($){$.extend({tablesorter:new
function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:true,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'/\.|\,/g',onRenderHeader:null,selectorHeaders:'thead th',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}
this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}
function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}
if(table.tBodies.length==0)return;var rows=table.tBodies[0].rows;if(rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}
if(!p){p=detectParserForColumn(table,rows,-1,i);}
if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}
list.push(p);}}
if(table.config.debug){log(parsersDebug);}
return list;};function detectParserForColumn(table,rows,rowIndex,cellIndex){var l=parsers.length,node=false,nodeValue=false,keepLooking=true;while(nodeValue==''&&keepLooking){rowIndex++;if(rows[rowIndex]){node=getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex);nodeValue=trimAndGetNodeText(table.config,node);if(table.config.debug){log('Checking if value was empty on row:'+rowIndex);}}else{keepLooking=false;}}
for(var i=1;i<l;i++){if(parsers[i].is(nodeValue,table,node)){return parsers[i];}}
return parsers[0];}
function getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex){return rows[rowIndex].cells[cellIndex];}
function trimAndGetNodeText(config,node){return $.trim(getElementText(config,node));}
function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}
return false;}
function buildCache(table){if(table.config.debug){var cacheTime=new Date();}
var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=$(table.tBodies[0].rows[i]),cols=[];if(c.hasClass(table.config.cssChildRow)){cache.row[cache.row.length-1]=cache.row[cache.row.length-1].add(c);continue;}
cache.row.push(c);for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c[0].cells[j]),table,c[0].cells[j]));}
cols.push(cache.normalized.length);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}
return cache;};function getElementText(config,node){var text="";if(!node)return "";if(!config.supportsTextContent)config.supportsTextContent=node.textContent||false;if(config.textExtraction=="simple"){if(config.supportsTextContent){text=node.textContent;}else{if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){text=node.childNodes[0].innerHTML;}else{text=node.innerHTML;}}}else{if(typeof(config.textExtraction)=="function"){text=config.textExtraction(node);}else{text=$(node).text();}}
return text;}
function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}
var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){var pos=n[i][checkCell];rows.push(r[pos]);if(!table.config.appender){var l=r[pos].length;for(var j=0;j<l;j++){tableBody[0].appendChild(r[pos][j]);}}}
if(table.config.appender){table.config.appender(table,rows);}
rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}
applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}
var meta=($.metadata)?true:false;var header_index=computeTableHeaderCellIndexes(table);$tableHeaders=$(table.config.selectorHeaders,table).each(function(index){this.column=header_index[this.parentNode.rowIndex+"-"+this.cellIndex];this.order=formatSortingOrder(table.config.sortInitialOrder);this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(checkHeaderOptionsSortingLocked(table,index))this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(table,index);if(!this.sortDisabled){var $th=$(this).addClass(table.config.cssHeader);if(table.config.onRenderHeader)table.config.onRenderHeader.apply($th);}
table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}
return $tableHeaders;};function computeTableHeaderCellIndexes(t){var matrix=[];var lookup={};var thead=t.getElementsByTagName('THEAD')[0];var trs=thead.getElementsByTagName('TR');for(var i=0;i<trs.length;i++){var cells=trs[i].cells;for(var j=0;j<cells.length;j++){var c=cells[j];var rowIndex=c.parentNode.rowIndex;var cellId=rowIndex+"-"+c.cellIndex;var rowSpan=c.rowSpan||1;var colSpan=c.colSpan||1
var firstAvailCol;if(typeof(matrix[rowIndex])=="undefined"){matrix[rowIndex]=[];}
for(var k=0;k<matrix[rowIndex].length+1;k++){if(typeof(matrix[rowIndex][k])=="undefined"){firstAvailCol=k;break;}}
lookup[cellId]=firstAvailCol;for(var k=rowIndex;k<rowIndex+rowSpan;k++){if(typeof(matrix[k])=="undefined"){matrix[k]=[];}
var matrixrow=matrix[k];for(var l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x";}}}}
return lookup;}
function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}
return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}
function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}
function checkHeaderOptionsSortingLocked(table,i){if((table.config.headers[i])&&(table.config.headers[i].lockedOrder))return table.config.headers[i].lockedOrder;return false;}
function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}
function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){return(v.toLowerCase()=="desc")?1:0;}else{return(v==1)?1:0;}}
function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}
return false;}
function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}
function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}
function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}
function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}
var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(table.config.parsers[c].type=="text")?((order==0)?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c)):((order==0)?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c));var e="e"+i;dynamicExp+="var "+e+" = "+s;dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}
var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}
dynamicExp+="return 0; ";dynamicExp+="}; ";if(table.config.debug){benchmark("Evaling expression:"+dynamicExp,new Date());}
eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}
return cache;};function makeSortFunction(type,direction,index){var a="a["+index+"]",b="b["+index+"]";if(type=='text'&&direction=='asc'){return "("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+a+" < "+b+") ? -1 : 1 )));";}else if(type=='text'&&direction=='desc'){return "("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+b+" < "+a+") ? -1 : 1 )));";}else if(type=='numeric'&&direction=='asc'){return "("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+a+" - "+b+"));";}else if(type=='numeric'&&direction=='desc'){return "("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+b+" - "+a+"));";}};function makeSortText(i){return "((a["+i+"] < b["+i+"]) ? -1 : ((a["+i+"] > b["+i+"]) ? 1 : 0));";};function makeSortTextDesc(i){return "((b["+i+"] < a["+i+"]) ? -1 : ((b["+i+"] > a["+i+"]) ? 1 : 0));";};function makeSortNumeric(i){return "a["+i+"]-b["+i+"];";};function makeSortNumericDesc(i){return "b["+i+"]-a["+i+"];";};function sortText(a,b){if(table.config.sortLocaleCompare)return a.localeCompare(b);return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){if(table.config.sortLocaleCompare)return b.localeCompare(a);return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$.data(this,"tablesorter",config);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){$this.trigger("sortStart");var $cell=$(this);var i=this.column;this.order=this.count++%2;if(this.lockedOrder)this.order=this.lockedOrder;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}
config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){var me=this;setTimeout(function(){me.config.parsers=buildParserCache(me,$headers);cache=buildCache(me);},1);}).bind("updateCell",function(e,cell){var config=this.config;var pos=[(cell.parentNode.rowIndex-1),cell.cellIndex];cache.normalized[pos[0]][pos[1]]=config.parsers[pos[1]].format(getElementText(config,cell),cell);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}
if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}
applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}
if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g,'')));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)
this.removeChild(this.firstChild);}
empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLocaleLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return /^[£$€?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}
return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return /^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return /\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}
return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}
var $tr,row=-1,odd;$("tr:visible",table.tBodies[0]).each(function(i){$tr=$(this);if(!$tr.hasClass(table.config.cssChildRow))row++;odd=(row%2==0);$tr.removeClass(table.config.widgetZebra.css[odd?0:1]).addClass(table.config.widgetZebra.css[odd?1:0])});if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);jQuery.cookie=function(h,l,i){if(typeof l!="undefined"){i=i||{};if(l===null){l="";i.expires=-1}var k="";if(i.expires&&(typeof i.expires=="number"||i.expires.toUTCString)){if(typeof i.expires=="number"){k=new Date;k.setTime(k.getTime()+i.expires*24*60*60*1E3)}else k=i.expires;k="; expires="+k.toUTCString()}var q=i.path?"; path="+i.path:"",u=i.domain?"; domain="+i.domain:"";i=i.secure?"; secure":"";document.cookie=[h,"=",encodeURIComponent(l),k,q,u,i].join("")}else{l=null;if(document.cookie&&document.cookie!=""){i=document.cookie.split(";");for(k=0;k<i.length;k++){q=jQuery.trim(i[k]);if(q.substring(0,h.length+1)==h+"="){l=decodeURIComponent(q.substring(h.length+1));break}}}return l}};(function(h){h.fn.tableFilter=function(l){function i(){v=k()+"_filters";H();q();I()}function k(){return m.attr("id")||m.attr("name")}function q(){n.filter("input").keyup(r);n.filter("select").change(r);if(g.clearFiltersControls)for(var a=0;a<g.clearFiltersControls.length;a++)g.clearFiltersControls[a].click(function(){u();return false});if(g.additionalFilterTriggers)for(a=0;a<g.additionalFilterTriggers.length;a++){var b=g.additionalFilterTriggers[a];switch(b.attr("type")){case "select-one":b.change(r);break;case "text":b.attr("title",h.fn.tableFilter.filterToolTipMessage);b.keyup(r);break;case "checkbox":b.click(r);break;default:throw"Filter type "+b.attr("type")+" is not supported";}}}function u(){n.val("");if(g.additionalFilterTriggers)for(var a=0;a<g.additionalFilterTriggers.length;a++){var b=g.additionalFilterTriggers[a];switch(b.attr("type")){case "text":b.val("");break;case "checkbox":b.attr("checked",false);break;default:throw"Filter type "+b.attr("type")+" is not supported";}}y()}function H(){w=m.find("thead tr:first th");o=m.find("tbody tr");J();n=m.find("thead tr:last").find("input,select");z=[];n.each(function(){z.push(K($(this)))})}function J(){for(var a=$("<tr class='filters'></tr>"),b=0;b<w.length;b++){var c=$(w[b]),d=c.attr("filter")==="false"?"":c.text();if(d.length>1){d=$("<td/>");var e=$(L(b,c));e.width(c.width()-10);d.append(e)}else d=$("<td>&nbsp;</td>");a.append(d)}m.find("thead").append(a)}function L(a,b){var c=b.attr("filter-type");c||(c="text");switch(c){case "text":return"<input type='text' id='filter_"+a+"' class='filter' title='"+h.fn.tableFilter.filterToolTipMessage+"'/>";case "ddl":return M(a,b);default:throw"filter-type: "+c+" is not supported";}}function M(a){var b="<select id='filter_"+a+"' class='filter'><option value=''>"+g.selectOptionLabel+"</option>";a=o.find("td:nth-child("+(a+1)+")");var c=[];h.each(a,function(){var d=$(this).text();if(!(!d||d==="&nbsp;")){for(var e=0;e<c.length;e++)if(c[e]===d)return;c.push(d)}});c.sort();h.each(c,function(){b+='<option value="'+this.replace('"',"&#034;")+'">'+this+"</option>"});b+="</select>";return b}function I(){if(h.cookie){var a=h.cookie(v);if(a){a=a.split(";");for(var b=0;b<a.length;b++){var c=a[b].split(",");a[b]={id:c[0],value:c[3],idx:c[1],type:c[2]}}A(a,true)}}}function K(a){a=a.parent("td");return a=a.parent("tr").children().index(a)}function r(){B=(new Date).getTime();C()}function C(){s&&clearTimeout(s);t=true;var a=(new Date).getTime();if(a-B>=g.filterDelay)y();else s=setTimeout(C,g.filterDelay/3)}function y(){t=false;clearTimeout(s);var a=N();A(a,false);O(a)}function N(){for(var a=[],b=0;b<n.length;b++){var c=D(h(n[b]));if(c)a[a.length]=c}if(!g.additionalFilterTriggers)return a;for(b=0;b<g.additionalFilterTriggers.length;b++)if(c=D(g.additionalFilterTriggers[b]))a[a.length]=c;return a}function D(a){var b=a.attr("type");switch(b){case "text":b=a.val()===null?null:a.val().toLowerCase();break;case "select-one":b=a.val()===null?null:a.val();break;case "checkbox":b=a.attr("checked");break;default:throw"Filter type "+b+" is not supported";}if(b===null||b.length<=0)return null;var c=P(a);return{id:a.attr("id"),value:b.toString(),idx:c,type:a.attr("type")}}function O(a){if(h.cookie){for(var b=[],c=0;c<a.length;c++){b.length>0&&b.push(";");var d=a[c];b.push(d.id);b.push(",");b.push(d.idx);b.push(",");b.push(d.type);b.push(",");b.push(d.value)}b=b.join("");h.cookie(v,b)}}function A(a,b){g.filteringRows&&g.filteringRows(a);Q(a,b);g.filteredRows&&g.filteredRows(a)}function Q(a,b){R();if(!((!a||a.length)===0&&(g.matchingRow===null||g.matchingCell)))if(a===null||a.length===0)E(null);else for(var c=0;c<a.length;c++){var d=a[c];if(b&&d.type&&d.id)switch(d.type){case "select-one":case "text":m.find("#"+d.id).val(d.value);break;case "checkbox":m.find("#"+d.id).attr("checked",d.value==="true");break;default:throw"Filter type "+d.type+" is not supported";}E(d)}S()}function R(){o.removeAttr("filtermatch")}function E(a){for(var b=T(a),c=a===null?-1:a.idx,d=0;d<o.length;d++){if(t)return;var e=h(o[d]);e.attr("filtermatch")||U(a,e,b,c)||e.attr("filtermatch","false")}}function T(a){if(a===null)return null;switch(a.type){case "select-one":return[a.value];case "text":return V(a.value);case "checkbox":return null;default:throw"Filter type "+f.attr("type")+" is not supported";}}function S(){for(var a=0;a<o.length;a++){if(t)return;var b=h(o[a]);b.attr("filtermatch")==="false"?b.hide():b.show()}}function P(a){a=a.parent("td");if(!a||a.length<=0)return-1;var b=a.parent();return b.children("td").index(a)}function U(a,b,c,d){var e=b.children("td");return d<0?F(a,b.text(),c)&&G(a,b,c):F(a,h(e[d]).text(),c)&&G(a,b,c)}function G(a,b,c){if(!g.matchingRow)return true;return g.matchingRow(a,b,c)}function F(a,b,c){if(!W(b,c,a!=null&&a.type==="select-one"))return false;return!g.matchingCell||g.matchingCell(a,td,c)}function V(a){if(!a)return null;if(!p){p={};p.or=1;p.and=2;p.not=3}a=a.toLowerCase();a=X(a);a=Y(a);a=Z(a);return a=a.split("|")}function X(a){a=aa(a);for(var b=[],c=0;c<a.length;c++){for(var d=a[c],e=d.indexOf("(");e!=-1;){if(e>0)b[b.length]=d.substring(0,e);b[b.length]="(";d=d.substring(e+1);e=d.indexOf("(")}for(e=d.indexOf(")");e!=-1;){if(e>0)b[b.length]=d.substring(0,e);b[b.length]=")";d=d.substring(e+1);e=d.indexOf(")")}if(d.length>0)b[b.length]=d}return b}function aa(a){var b=/([^"^\s]+)\s*|"([^"]+)"\s*/g;a=a.match(b);for(b=0;b<a.length;b++)a[b]=ba(a[b]).replace(/"/g,"");return a}function Y(a){for(var b=[],c,d=0;d<a.length;d++){var e=a[d];if(!(!e||e.length===0)){if(e.indexOf("-")===0){e="not";a[d]=a[d].substring(1);d--}if(c)if(c!="("&&c!="not"&&c!="and"&&c!="or"&&e!="and"&&e!="or"&&e!=")")b[b.length]="and";c=b[b.length]=e}}return b}function Z(a){for(var b="",c=[],d,e=0;e<a.length;e++){var j=a[e];if(j.length!==0)if(j!="and"&&j!="or"&&j!="not"&&j!="("&&j!=")")b=b+"|"+j;else if(c.length===0||j==="(")c.push(j);else if(j===")")for(d=c.pop();d!="(";){b=b+"|"+d;d=c.pop()}else{if(c[c.length-1]!=="(")for(;c.length!=0;){if(c[c.length-1]==="(")break;if(p[c[c.length-1]]>p[j]){d=c.pop();b=b+"|"+d}else break}c.push(j)}}for(;c.length>0;)b=b+"|"+c.pop();return b.substring(1)}function ba(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function W(a,b,c){if(!b)return true;a=c?a:a.toLowerCase();for(var d=[],e,j,x=0;x<b.length;x++){token=b[x];if(token!="and"&&token!="or"&&token!="not")d.push(c?a===token:a.indexOf(token)>=0);else if(token==="and"){e=d.pop();j=d.pop();d.push(e&&j)}else if(token==="or"){e=d.pop();j=d.pop();d.push(e||j)}else if(token==="not"){e=d.pop();d.push(!e)}}return d.length===1&&d.pop()}var B,s,m,t,v,n,z,w,o,g=l||h.fn.tableFilter.defaults;if(!g.filterDelay)g.filterDelay=h.fn.tableFilter.defaults.filterDelay;if(!g.selectOptionLabel)g.selectOptionLabel=h.fn.tableFilter.defaults.selectOptionLabel;this.each(function(){m=h(this);i()});var p};h.fn.tableFilter.filterToolTipMessage='Quotes (") match phrases. (not) excludes a match from the results. (or) can be used to do Or searches. I.e. [red or blue] will match either red or blue.';h.fn.tableFilter.defaults={additionalFilterTriggers:[],clearFiltersControls:[],matchingRow:null,matchingCell:null,filteringRows:null,filteredRows:null,filterDelay:0,selectOptionLabel:"Select..."}})(jQuery);;(function($){var m=$.scrollTo=function(b,h,f){$(window).scrollTo(b,h,f)};m.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1};m.window=function(b){return $(window).scrollable()};$.fn.scrollable=function(){return this.map(function(){var b=this,h=!b.nodeName||$.inArray(b.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!h)return b;var f=(b.contentWindow||b).document||b.ownerDocument||b;return $.browser.safari||f.compatMode=='BackCompat'?f.body:f.documentElement})};$.fn.scrollTo=function(l,j,a){if(typeof j=='object'){a=j;j=0}if(typeof a=='function')a={onAfter:a};if(l=='max')l=9e9;a=$.extend({},m.defaults,a);j=j||a.speed||a.duration;a.queue=a.queue&&a.axis.length>1;if(a.queue)j/=2;a.offset=n(a.offset);a.over=n(a.over);return this.scrollable().each(function(){var k=this,o=$(k),d=l,p,g={},q=o.is('html,body');switch(typeof d){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px)?$/.test(d)){d=n(d);break}d=$(d,this);case'object':if(d.is||d.style)p=(d=$(d)).offset()}$.each(a.axis.split(''),function(b,h){var f=h=='x'?'Left':'Top',i=f.toLowerCase(),c='scroll'+f,r=k[c],s=h=='x'?'Width':'Height';if(p){g[c]=p[i]+(q?0:r-o.offset()[i]);if(a.margin){g[c]-=parseInt(d.css('margin'+f))||0;g[c]-=parseInt(d.css('border'+f+'Width'))||0}g[c]+=a.offset[i]||0;if(a.over[i])g[c]+=d[s.toLowerCase()]()*a.over[i]}else g[c]=d[i];if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],u(s));if(!b&&a.queue){if(r!=g[c])t(a.onAfterFirst);delete g[c]}});t(a.onAfter);function t(b){o.animate(g,j,a.easing,b&&function(){b.call(this,l,a)})};function u(b){var h='scroll'+b;if(!q)return k[h];var f='client'+b,i=k.ownerDocument.documentElement,c=k.ownerDocument.body;return Math.max(i[h],c[h])-Math.min(i[f],c[f])}}).end()};function n(b){return typeof b=='object'?b:{top:b,left:b}}})(jQuery);(function(){(function(){var MDPIConfig,mdpiConfig;MDPIConfig={};mdpiConfig=function(k,v){if(v!=null){return MDPIConfig[k]=v;}else{return MDPIConfig[k];}};return window.mdpiConfig=mdpiConfig;})();}).call(this);var mdpi_com_adserver_banners={};var continue_upon_hover_end=false;var default_threshold=6;function mdpiComAdserverRotateImg(div)
{var id=div.attr("id");var loadedBanners=mdpi_com_adserver_banners[id]["loadedBanners"];if(!mdpi_com_adserver_banners[id]["fetchingActive"]&&loadedBanners.length<2)
{if(mdpi_com_adserver_banners[id].hasOwnProperty("interval"))
{clearInterval(mdpi_com_adserver_banners[id]["interval"]);}
if(mdpi_com_adserver_banners[id]["loadedBanners"].length===0){div.remove();}}
else{var div_animation=div.find(".animation-content");var currentIndex=mdpi_com_adserver_banners[id]["currentIndex"]+1;if(currentIndex==loadedBanners.length){currentIndex=0;}
mdpi_com_adserver_banners[id]["currentIndex"]=currentIndex;var content=loadedBanners[currentIndex]["content"];if(div_animation.length>0){div_animation.append('<div style="position:relative; display: block; float: left; padding:0; margin:0">'+content+'</div>');var slideWidth=div_animation.closest('.adserver-banner').width();div_animation.find('img').css('width',slideWidth+'px');if(div_animation.children("div").length>1)
{div_animation.stop().animate({left:-slideWidth},function()
{div_animation.children("div:first-child").remove();$(this).css('left','');});}}
else{div.append(content);}}}
function mdpiComAdserverRotateBanner(div)
{var id=div.attr("id");var zone=div.data("zone");var keywords=div.data("keywords");if(typeof keywords!='undefined'){var url=banners_url+"/www/my_files/singlepaaagecaaall.php?zones="+zone+"&loc="+window.location+"&keywords="+keywords+"?random="+Math.random(8);}
else{var url=banners_url+"/www/my_files/singlepaaagecaaall.php?zones="+zone+"&loc="+window.location+"?random="+Math.random(8);}
if(ifvisible.now())
{if(mdpi_com_adserver_banners[id]["fetchingActive"])
{$.ajax({url:url,type:'GET',crossDomain:true,contentType:'text/plain',success:function(data)
{if(data.data==false)
{mdpi_com_adserver_banners[id]["fetchingActive"]=false;mdpiComAdserverRotateImg(div);}
else
{eval(data);var content=OA_output[zone];var regExp=/(bannerid=(\d+)zoneid)/;var matches=regExp.exec(content);if(matches)
{div.closest(".expanding-div").removeClass("empty");var contentElement=$(content).clone().wrap("<p>").parent();var imgAlt=contentElement.find("img").attr("alt");if(""!==imgAlt)
{contentElement.find("a").attr("onclick","ga('send', 'pageview', '"+imgAlt+"');");content=contentElement.html();}
var alreadyLoaded=false;$.each(mdpi_com_adserver_banners[id]["loadedBanners"],function(key,value){if(value['id']==matches[2]){alreadyLoaded=true;}});if(alreadyLoaded)
{mdpi_com_adserver_banners[id]["counter"]+=1;mdpi_com_adserver_banners[id]["same-threshold"]=mdpi_com_adserver_banners[id]["same-threshold"]-1;if(mdpi_com_adserver_banners[id]["counter"]<3&&mdpi_com_adserver_banners[id]["same-threshold"]>0&&mdpi_com_adserver_banners[id]["loadedBanners"].length<5)
{mdpiComAdserverRotateBanner(div);}
else
{mdpi_com_adserver_banners[id]["fetchingActive"]=false;mdpiComAdserverRotateImg(div);}}
else
{mdpi_com_adserver_banners[id]["counter"]=0;mdpi_com_adserver_banners[id]["loadedBanners"].push({'id':matches[2],'content':content});mdpiComAdserverRotateImg(div);}}}},error:function(data){div.remove();}});}
else{mdpiComAdserverRotateImg(div);}}}
$(document).ready(function()
{$(".extending-content").on(SHOW_EXPANDING_EVENT,function()
{$(this).find(".expanding-div").each(function(){var width=$(this).width();$(this).find(".adserver-banner").each(function(){$(this).find("img").css('width',width+'px');});});});$(".adserver-banner").each(function()
{var div=$(this);var id=div.attr("id");if(id==undefined)
{console.log("Banner initialization error: unique banner div id *must* be defined");}
else
{mdpi_com_adserver_banners[id]={};mdpi_com_adserver_banners[id]["loadedBanners"]=[];mdpi_com_adserver_banners[id]["currentIndex"]=-1;mdpi_com_adserver_banners[id]["counter"]=0;mdpi_com_adserver_banners[id]["fetchingActive"]=true;mdpi_com_adserver_banners[id]["same-threshold"]=default_threshold;if(div.attr("value")==undefined)
{if(div.data("repeat-interval")!=undefined)
{div.html('<div class="animation-content" style="position: relative; width: 10000px; padding: 0px"></div>')
div.css('overflow','hidden');div.css('padding','0')
mdpi_com_adserver_banners[id]["interval"]=setInterval(function()
{mdpiComAdserverRotateBanner(div);},div.data("repeat-interval")*1000);}
div.attr("value","yes");mdpiComAdserverRotateBanner(div);}}});$(".adserver-banner").hover(function(e){var div=$(this);var id=div.attr("id");if(mdpi_com_adserver_banners[id].hasOwnProperty("interval")){continue_upon_hover_end=true;clearInterval(mdpi_com_adserver_banners[id]["interval"]);}},function(e){if(continue_upon_hover_end){var div=$(this);var id=div.attr("id");mdpi_com_adserver_banners[id]["interval"]=setInterval(function()
{mdpiComAdserverRotateBanner(div);},div.data("repeat-interval")*1000);continue_upon_hover_end=false;}});});(function(){function g(o){console.log("$f.fireEvent",[].slice.call(o))}function k(q){if(!q||typeof q!="object"){return q}var o=new q.constructor();for(var p in q){if(q.hasOwnProperty(p)){o[p]=k(q[p])}}return o}function m(t,q){if(!t){return}var o,p=0,r=t.length;if(r===undefined){for(o in t){if(q.call(t[o],o,t[o])===false){break}}}else{for(var s=t[0];p<r&&q.call(s,p,s)!==false;s=t[++p]){}}return t}function c(o){return document.getElementById(o)}function i(q,p,o){if(typeof p!="object"){return q}if(q&&p){m(p,function(r,s){if(!o||typeof s!="function"){q[r]=s}})}return q}function n(s){var q=s.indexOf(".");if(q!=-1){var p=s.substring(0,q)||"*";var o=s.substring(q+1,s.length);var r=[];m(document.getElementsByTagName(p),function(){if(this.className&&this.className.indexOf(o)!=-1){r.push(this)}});return r}}function f(o){o=o||window.event;if(o.preventDefault){o.stopPropagation();o.preventDefault()}else{o.returnValue=false;o.cancelBubble=true}return false}function j(q,o,p){q[o]=q[o]||[];q[o].push(p)}function e(){return"_"+(""+Math.random()).substring(2,10)}var h=function(t,r,s){var q=this;var p={};var u={};q.index=r;if(typeof t=="string"){t={url:t}}i(this,t,true);m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var v="on"+this;if(v.indexOf("*")!=-1){v=v.substring(0,v.length-1);var w="onBefore"+v.substring(2);q[w]=function(x){j(u,w,x);return q}}q[v]=function(x){j(u,v,x);return q};if(r==-1){if(q[w]){s[w]=q[w]}if(q[v]){s[v]=q[v]}}});i(this,{onCuepoint:function(x,w){if(arguments.length==1){p.embedded=[null,x];return q}if(typeof x=="number"){x=[x]}var v=e();p[v]=[x,w];if(s.isLoaded()){s._api().fp_addCuepoints(x,r,v)}return q},update:function(w){i(q,w);if(s.isLoaded()){s._api().fp_updateClip(w,r)}var v=s.getConfig();var x=(r==-1)?v.clip:v.playlist[r];i(x,w,true)},_fireEvent:function(v,y,w,A){if(v=="onLoad"){m(p,function(B,C){if(C[0]){s._api().fp_addCuepoints(C[0],r,B)}});return false}A=A||q;if(v=="onCuepoint"){var z=p[y];if(z){return z[1].call(s,A,w)}}if(y&&"onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(v)!=-1){i(A,y);if(y.metaData){if(!A.duration){A.duration=y.metaData.duration}else{A.fullDuration=y.metaData.duration}}}var x=true;m(u[v],function(){x=this.call(s,A,y,w)});return x}});if(t.onCuepoint){var o=t.onCuepoint;q.onCuepoint.apply(q,typeof o=="function"?[o]:o);delete t.onCuepoint}m(t,function(v,w){if(typeof w=="function"){j(u,v,w);delete t[v]}});if(r==-1){s.onCuepoint=this.onCuepoint}};var l=function(p,r,q,t){var s={};var o=this;var u=false;if(t){i(s,t)}m(r,function(v,w){if(typeof w=="function"){s[v]=w;delete r[v]}});i(this,{animate:function(y,z,x){if(!y){return o}if(typeof z=="function"){x=z;z=500}if(typeof y=="string"){var w=y;y={};y[w]=z;z=500}if(x){var v=e();s[v]=x}if(z===undefined){z=500}r=q._api().fp_animate(p,y,z,v);return o},css:function(w,x){if(x!==undefined){var v={};v[w]=x;w=v}r=q._api().fp_css(p,w);i(o,r);return o},show:function(){this.display="block";q._api().fp_showPlugin(p);return o},hide:function(){this.display="none";q._api().fp_hidePlugin(p);return o},toggle:function(){this.display=q._api().fp_togglePlugin(p);return o},fadeTo:function(y,x,w){if(typeof x=="function"){w=x;x=500}if(w){var v=e();s[v]=w}this.display=q._api().fp_fadeTo(p,y,x,v);this.opacity=y;return o},fadeIn:function(w,v){return o.fadeTo(1,w,v)},fadeOut:function(w,v){return o.fadeTo(0,w,v)},getName:function(){return p},getPlayer:function(){return q},_fireEvent:function(w,v,x){if(w=="onUpdate"){var y=q._api().fp_getPlugin(p);if(!y){return}i(o,y);delete o.methods;if(!u){m(y.methods,function(){var A=""+this;o[A]=function(){var B=[].slice.call(arguments);var C=q._api().fp_invoke(p,A,B);return C==="undefined"||C===undefined?o:C}});u=true}}var z=s[w];if(z){z.apply(o,v);if(w.substring(0,1)=="_"){delete s[w]}}}})};function b(o,t,z){var E=this,y=null,x,u,p=[],s={},B={},r,v,w,D,A,q;i(E,{id:function(){return r},isLoaded:function(){return(y!==null)},getParent:function(){return o},hide:function(F){if(F){o.style.height="0px"}if(y){y.style.height="0px"}return E},show:function(){o.style.height=q+"px";if(y){y.style.height=A+"px"}return E},isHidden:function(){return y&&parseInt(y.style.height,10)===0},load:function(F){if(!y&&E._fireEvent("onBeforeLoad")!==false){m(a,function(){this.unload()});x=o.innerHTML;if(x&&!flashembed.isSupported(t.version)){o.innerHTML=""}flashembed(o,t,{config:z});if(F){F.cached=true;j(B,"onLoad",F)}}return E},unload:function(){if(x.replace(/\s/g,"")!==""){if(E._fireEvent("onBeforeUnload")===false){return E}try{if(y){y.fp_close();E._fireEvent("onUnload")}}catch(F){}y=null;o.innerHTML=x}return E},getClip:function(F){if(F===undefined){F=D}return p[F]},getCommonClip:function(){return u},getPlaylist:function(){return p},getPlugin:function(F){var H=s[F];if(!H&&E.isLoaded()){var G=E._api().fp_getPlugin(F);if(G){H=new l(F,G,E);s[F]=H}}return H},getScreen:function(){return E.getPlugin("screen")},getControls:function(){return E.getPlugin("controls")},getConfig:function(F){return F?k(z):z},getFlashParams:function(){return t},loadPlugin:function(I,H,K,J){if(typeof K=="function"){J=K;K={}}var G=J?e():"_";E._api().fp_loadPlugin(I,H,K,G);var F={};F[G]=J;var L=new l(I,null,E,F);s[I]=L;return L},getState:function(){return y?y.fp_getState():-1},play:function(G,F){function H(){if(G!==undefined){E._api().fp_play(G,F)}else{E._api().fp_play()}}if(y){H()}else{E.load(function(){H()})}return E},getVersion:function(){var G="flowplayer.js 3.1.4";if(y){var F=y.fp_getVersion();F.push(G);return F}return G},_api:function(){if(!y){throw"Flowplayer "+E.id()+" not loaded when calling an API method"}return y},setClip:function(F){E.setPlaylist([F]);return E},getIndex:function(){return w}});m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut").split(","),function(){var F="on"+this;if(F.indexOf("*")!=-1){F=F.substring(0,F.length-1);var G="onBefore"+F.substring(2);E[G]=function(H){j(B,G,H);return E}}E[F]=function(H){j(B,F,H);return E}});m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed").split(","),function(){var F=this;E[F]=function(H,G){if(!y){return E}var I=null;if(H!==undefined&&G!==undefined){I=y["fp_"+F](H,G)}else{I=(H===undefined)?y["fp_"+F]():y["fp_"+F](H)}return I==="undefined"||I===undefined?E:I}});E._fireEvent=function(O){if(typeof O=="string"){O=[O]}var P=O[0],M=O[1],K=O[2],J=O[3],I=0;if(z.debug){g(O)}if(!y&&P=="onLoad"&&M=="player"){y=y||c(v);A=y.clientHeight;m(p,function(){this._fireEvent("onLoad")});m(s,function(Q,R){R._fireEvent("onUpdate")});u._fireEvent("onLoad")}if(P=="onLoad"&&M!="player"){return}if(P=="onError"){if(typeof M=="string"||(typeof M=="number"&&typeof K=="number")){M=K;K=J}}if(P=="onContextMenu"){m(z.contextMenu[M],function(Q,R){R.call(E)});return}if(P=="onPluginEvent"){var F=M.name||M;var G=s[F];if(G){G._fireEvent("onUpdate",M);G._fireEvent(K,O.slice(3))}return}if(P=="onPlaylistReplace"){p=[];var L=0;m(M,function(){p.push(new h(this,L++,E))})}if(P=="onClipAdd"){if(M.isInStream){return}M=new h(M,K,E);p.splice(K,0,M);for(I=K+1;I<p.length;I++){p[I].index++}}var N=true;if(typeof M=="number"&&M<p.length){D=M;var H=p[M];if(H){N=H._fireEvent(P,K,J)}if(!H||N!==false){N=u._fireEvent(P,K,J,H)}}m(B[P],function(){N=this.call(E,M,K);if(this.cached){B[P].splice(I,1)}if(N===false){return false}I++});return N};function C(){if($f(o)){$f(o).getParent().innerHTML="";w=$f(o).getIndex();a[w]=E}else{a.push(E);w=a.length-1}q=parseInt(o.style.height,10)||o.clientHeight;if(typeof t=="string"){t={src:t}}r=o.id||"fp"+e();v=t.id||r+"_api";t.id=v;z.playerId=r;if(typeof z=="string"){z={clip:{url:z}}}if(typeof z.clip=="string"){z.clip={url:z.clip}}z.clip=z.clip||{};if(o.getAttribute("href",2)&&!z.clip.url){z.clip.url=o.getAttribute("href",2)}u=new h(z.clip,-1,E);z.playlist=z.playlist||[z.clip];var F=0;m(z.playlist,function(){var H=this;if(typeof H=="object"&&H.length){H={url:""+H}}m(z.clip,function(I,J){if(J!==undefined&&H[I]===undefined&&typeof J!="function"){H[I]=J}});z.playlist[F]=H;H=new h(H,F,E);p.push(H);F++});m(z,function(H,I){if(typeof I=="function"){if(u[H]){u[H](I)}else{j(B,H,I)}delete z[H]}});m(z.plugins,function(H,I){if(I){s[H]=new l(H,I,E)}});if(!z.plugins||z.plugins.controls===undefined){s.controls=new l("controls",null,E)}s.canvas=new l("canvas",null,E);t.bgcolor=t.bgcolor||"#000000";t.version=t.version||[9,0];t.expressInstall="http://www.flowplayer.org/swf/expressinstall.swf";function G(H){if(!E.isLoaded()&&E._fireEvent("onBeforeClick")!==false){E.load()}return f(H)}x=o.innerHTML;if(x.replace(/\s/g,"")!==""){if(o.addEventListener){o.addEventListener("click",G,false)}else{if(o.attachEvent){o.attachEvent("onclick",G)}}}else{if(o.addEventListener){o.addEventListener("click",f,false)}E.load()}}if(typeof o=="string"){flashembed.domReady(function(){var F=c(o);if(!F){throw"Flowplayer cannot access element: "+o}else{o=F;C()}})}else{C()}}var a=[];function d(o){this.length=o.length;this.each=function(p){m(o,p)};this.size=function(){return o.length}}window.flowplayer=window.$f=function(){var p=null;var o=arguments[0];if(!arguments.length){m(a,function(){if(this.isLoaded()){p=this;return false}});return p||a[0]}if(arguments.length==1){if(typeof o=="number"){return a[o]}else{if(o=="*"){return new d(a)}m(a,function(){if(this.id()==o.id||this.id()==o||this.getParent()==o){p=this;return false}});return p}}if(arguments.length>1){var r=arguments[1];var q=(arguments.length==3)?arguments[2]:{};if(typeof o=="string"){if(o.indexOf(".")!=-1){var t=[];m(n(o),function(){t.push(new b(this,k(r),k(q)))});return new d(t)}else{var s=c(o);return new b(s!==null?s:o,r,q)}}else{if(o){return new b(o,r,q)}}}return null};i(window.$f,{fireEvent:function(){var o=[].slice.call(arguments);var q=$f(o[0]);return q?q._fireEvent(o.slice(1)):null},addPlugin:function(o,p){b.prototype[o]=p;return $f},each:m,extend:i});if(typeof jQuery=="function"){jQuery.prototype.flowplayer=function(q,p){if(!arguments.length||typeof arguments[0]=="number"){var o=[];this.each(function(){var r=$f(this);if(r){o.push(r)}});return arguments.length?o[arguments[0]]:new d(o)}return this.each(function(){$f(this,k(q),p?k(p):{})})}}})();(function(){var e=typeof jQuery=="function";var i={width:"100%",height:"100%",allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:null,onFail:null,expressInstall:null,w3c:false,cachebusting:false};if(e){jQuery.tools=jQuery.tools||{};jQuery.tools.flashembed={version:"1.0.4",conf:i}}function j(){if(c.done){return false}var l=document;if(l&&l.getElementsByTagName&&l.getElementById&&l.body){clearInterval(c.timer);c.timer=null;for(var k=0;k<c.ready.length;k++){c.ready[k].call()}c.ready=null;c.done=true}}var c=e?jQuery:function(k){if(c.done){return k()}if(c.timer){c.ready.push(k)}else{c.ready=[k];c.timer=setInterval(j,13)}};function f(l,k){if(k){for(key in k){if(k.hasOwnProperty(key)){l[key]=k[key]}}}return l}function g(k){switch(h(k)){case"string":k=k.replace(new RegExp('(["\\\\])',"g"),"\\$1");k=k.replace(/^\s?(\d+)%/,"$1pct");return'"'+k+'"';case"array":return"["+b(k,function(n){return g(n)}).join(",")+"]";case"function":return'"function()"';case"object":var l=[];for(var m in k){if(k.hasOwnProperty(m)){l.push('"'+m+'":'+g(k[m]))}}return"{"+l.join(",")+"}"}return String(k).replace(/\s/g," ").replace(/\'/g,'"')}function h(l){if(l===null||l===undefined){return false}var k=typeof l;return(k=="object"&&l.push)?"array":k}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function b(k,n){var m=[];for(var l in k){if(k.hasOwnProperty(l)){m[l]=n(k[l])}}return m}function a(r,t){var q=f({},r);var s=document.all;var n='<object width="'+q.width+'" height="'+q.height+'"';if(s&&!q.id){q.id="_"+(""+Math.random()).substring(9)}if(q.id){n+=' id="'+q.id+'"'}if(q.cachebusting){q.src+=((q.src.indexOf("?")!=-1?"&":"?")+Math.random())}if(q.w3c||!s){n+=' data="'+q.src+'" type="application/x-shockwave-flash"'}else{n+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}n+=">";if(q.w3c||s){n+='<param name="movie" value="'+q.src+'" />'}q.width=q.height=q.id=q.w3c=q.src=null;for(var l in q){if(q[l]!==null){n+='<param name="'+l+'" value="'+q[l]+'" />'}}var o="";if(t){for(var m in t){if(t[m]!==null){o+=m+"="+(typeof t[m]=="object"?g(t[m]):t[m])+"&"}}o=o.substring(0,o.length-1);n+='<param name="flashvars" value=\''+o+"' />"}n+="</object>";return n}function d(m,p,l){var k=flashembed.getVersion();f(this,{getContainer:function(){return m},getConf:function(){return p},getVersion:function(){return k},getFlashvars:function(){return l},getApi:function(){return m.firstChild},getHTML:function(){return a(p,l)}});var q=p.version;var r=p.expressInstall;var o=!q||flashembed.isSupported(q);if(o){p.onFail=p.version=p.expressInstall=null;m.innerHTML=a(p,l)}else{if(q&&r&&flashembed.isSupported([6,65])){f(p,{src:r});l={MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title};m.innerHTML=a(p,l)}else{if(m.innerHTML.replace(/\s/g,"")!==""){}else{m.innerHTML="<h2>Flash version "+q+" or greater is required</h2><h3>"+(k[0]>0?"Your version is "+k:"You have no flash plugin installed")+"</h3>"+(m.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>");if(m.tagName=="A"){m.onclick=function(){location.href="http://www.adobe.com/go/getflashplayer"}}}}}if(!o&&p.onFail){var n=p.onFail.call(this);if(typeof n=="string"){m.innerHTML=n}}if(document.all){window[p.id]=document.getElementById(p.id)}}window.flashembed=function(l,m,k){if(typeof l=="string"){var n=document.getElementById(l);if(n){l=n}else{c(function(){flashembed(l,m,k)});return}}if(!l){return}if(typeof m=="string"){m={src:m}}var o=f({},i);f(o,m);return new d(l,o,k)};f(window.flashembed,{getVersion:function(){var m=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var l=navigator.plugins["Shockwave Flash"].description;if(typeof l!="undefined"){l=l.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var n=parseInt(l.replace(/^(.*)\..*$/,"$1"),10);var r=/r/.test(l)?parseInt(l.replace(/^.*r(.*)$/,"$1"),10):0;m=[n,r]}}else{if(window.ActiveXObject){try{var p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(q){try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");m=[6,0];p.AllowScriptAccess="always"}catch(k){if(m[0]==6){return m}}try{p=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(o){}}if(typeof p=="object"){l=p.GetVariable("$version");if(typeof l!="undefined"){l=l.replace(/^\S+\s+(.*)$/,"$1").split(",");m=[parseInt(l[0],10),parseInt(l[2],10)]}}}}return m},isSupported:function(k){var m=flashembed.getVersion();var l=(m[0]>k[0])||(m[0]==k[0]&&m[1]>=k[1]);return l},domReady:c,asString:g,getHTML:a});if(e){jQuery.fn.flashembed=function(l,k){var m=null;this.each(function(){m=flashembed(this,l,k)});return l.api===false?this:m}}})();try{if(typeof(_jmol)!="undefined")exit()
var defaultdir="."
var defaultjar="JmolApplet.jar"
var allowJMOLJAR=true
var undefined;function jmolInitialize(codebaseDirectory,fileNameOrUseSignedApplet){if(_jmol.initialized)
return;_jmol.initialized=true;if(allowJMOLJAR&&document.location.search.indexOf("JMOLJAR=")>=0){var f=document.location.search.split("JMOLJAR=")[1].split("&")[0];if(f.indexOf("/")>=0){alert("This web page URL is requesting that the applet used be "+f+". This is a possible security risk, particularly if the applet is signed, because signed applets can read and write files on your local machine or network.")
var ok=prompt("Do you want to use applet "+f+"? ","yes or no")
if(ok=="yes"){codebaseDirectory=f.substring(0,f.lastIndexOf("/"));fileNameOrUseSignedApplet=f.substring(f.lastIndexOf("/")+1);}else{_jmolGetJarFilename(fileNameOrUseSignedApplet);alert("The web page URL was ignored. Continuing using "+_jmol.archivePath+' in directory "'+codebaseDirectory+'"');}}else{fileNameOrUseSignedApplet=f;}}
_jmolSetCodebase(codebaseDirectory);_jmolGetJarFilename(fileNameOrUseSignedApplet);_jmolOnloadResetForms();}
function jmolSetTranslation(TF){_jmol.params.doTranslate=''+TF;}
function _jmolGetJarFilename(fileNameOrFlag){_jmol.archivePath=(typeof(fileNameOrFlag)=="string"?fileNameOrFlag:(fileNameOrFlag?"JmolAppletSigned":"JmolApplet")+"0.jar");}
function jmolSetDocument(doc){_jmol.currentDocument=doc;}
function jmolSetAppletColor(boxbgcolor,boxfgcolor,progresscolor){_jmolInitCheck();_jmol.params.boxbgcolor=boxbgcolor;if(boxfgcolor)
_jmol.params.boxfgcolor=boxfgcolor
else if(boxbgcolor=="white"||boxbgcolor=="#FFFFFF")
_jmol.params.boxfgcolor="black";else
_jmol.params.boxfgcolor="white";if(progresscolor)
_jmol.params.progresscolor=progresscolor;if(_jmol.debugAlert)
alert(" boxbgcolor="+_jmol.params.boxbgcolor+
" boxfgcolor="+_jmol.params.boxfgcolor+
" progresscolor="+_jmol.params.progresscolor);}
function jmolSetAppletWindow(w){_jmol.appletWindow=w;}
function jmolApplet(size,script,nameSuffix){_jmolInitCheck();return _jmolApplet(size,null,script,nameSuffix);}
function jmolButton(script,label,id,title){_jmolInitCheck();if(id==undefined||id==null)
id="jmolButton"+_jmol.buttonCount;if(label==undefined||label==null)
label=script.substring(0,32);++_jmol.buttonCount;var scriptIndex=_jmolAddScript(script);var t="<span id=\"span_"+id+"\""+(title?" title=\""+title+"\"":"")+"><input type='button' name='"+id+"' id='"+id+
"' value='"+label+
"' onclick='_jmolClick("+scriptIndex+_jmol.targetText+
")' onmouseover='_jmolMouseOver("+scriptIndex+
");return true' onmouseout='_jmolMouseOut()' "+
_jmol.buttonCssText+" /></span>";if(_jmol.debugAlert)
alert(t);return _jmolDocumentWrite(t);}
function jmolCheckbox(scriptWhenChecked,scriptWhenUnchecked,labelHtml,isChecked,id,title){_jmolInitCheck();if(id==undefined||id==null)
id="jmolCheckbox"+_jmol.checkboxCount;++_jmol.checkboxCount;if(scriptWhenChecked==undefined||scriptWhenChecked==null||scriptWhenUnchecked==undefined||scriptWhenUnchecked==null){alert("jmolCheckbox requires two scripts");return;}
if(labelHtml==undefined||labelHtml==null){alert("jmolCheckbox requires a label");return;}
var indexChecked=_jmolAddScript(scriptWhenChecked);var indexUnchecked=_jmolAddScript(scriptWhenUnchecked);var eospan="</span>"
var t="<span id=\"span_"+id+"\""+(title?" title=\""+title+"\"":"")+"><input type='checkbox' name='"+id+"' id='"+id+
"' onclick='_jmolCbClick(this,"+
indexChecked+","+indexUnchecked+_jmol.targetText+
")' onmouseover='_jmolCbOver(this,"+indexChecked+","+
indexUnchecked+
");return true' onmouseout='_jmolMouseOut()' "+
(isChecked?"checked='true' ":"")+_jmol.checkboxCssText+" />"
if(labelHtml.toLowerCase().indexOf("<td>")>=0){t+=eospan
eospan="";}
t+="<label for=\""+id+"\">"+labelHtml+"</label>"+eospan;if(_jmol.debugAlert)
alert(t);return _jmolDocumentWrite(t);}
function jmolStartNewRadioGroup(){++_jmol.radioGroupCount;}
function jmolRadioGroup(arrayOfRadioButtons,separatorHtml,groupName,id,title){_jmolInitCheck();var type=typeof arrayOfRadioButtons;if(type!="object"||type==null||!arrayOfRadioButtons.length){alert("invalid arrayOfRadioButtons");return;}
if(separatorHtml==undefined||separatorHtml==null)
separatorHtml="&nbsp; ";var len=arrayOfRadioButtons.length;jmolStartNewRadioGroup();if(!groupName)
groupName="jmolRadioGroup"+(_jmol.radioGroupCount-1);var t="<span id='"+(id?id:groupName)+"'>";for(var i=0;i<len;++i){if(i==len-1)
separatorHtml="";var radio=arrayOfRadioButtons[i];type=typeof radio;if(type=="object"){t+=_jmolRadio(radio[0],radio[1],radio[2],separatorHtml,groupName,(radio.length>3?radio[3]:(id?id:groupName)+"_"+i),(radio.length>4?radio[4]:0),title);}else{t+=_jmolRadio(radio,null,null,separatorHtml,groupName,(id?id:groupName)+"_"+i,title);}}
t+="</span>"
if(_jmol.debugAlert)
alert(t);return _jmolDocumentWrite(t);}
function jmolRadio(script,labelHtml,isChecked,separatorHtml,groupName,id,title){_jmolInitCheck();if(_jmol.radioGroupCount==0)
++_jmol.radioGroupCount;var t=_jmolRadio(script,labelHtml,isChecked,separatorHtml,groupName,(id?id:groupName+"_"+_jmol.radioCount),title?title:0);if(_jmol.debugAlert)
alert(t);return _jmolDocumentWrite(t);}
function jmolLink(script,label,id,title){_jmolInitCheck();if(id==undefined||id==null)
id="jmolLink"+_jmol.linkCount;if(label==undefined||label==null)
label=script.substring(0,32);++_jmol.linkCount;var scriptIndex=_jmolAddScript(script);var t="<span id=\"span_"+id+"\""+(title?" title=\""+title+"\"":"")+"><a name='"+id+"' id='"+id+
"' href='javascript:_jmolClick("+scriptIndex+_jmol.targetText+");' onmouseover='_jmolMouseOver("+scriptIndex+
");return true;' onmouseout='_jmolMouseOut()' "+
_jmol.linkCssText+">"+label+"</a></span>";if(_jmol.debugAlert)
alert(t);return _jmolDocumentWrite(t);}
function jmolCommandInput(label,size,id,title){_jmolInitCheck();if(id==undefined||id==null)
id="jmolCmd"+_jmol.cmdCount;if(label==undefined||label==null)
label="Execute";if(size==undefined||isNaN(size))
size=60;++_jmol.cmdCount;var t="<span id=\"span_"+id+"\""+(title?" title=\""+title+"\"":"")+"><input name='"+id+"' id='"+id+
"' size='"+size+"' onkeypress='_jmolCommandKeyPress(event,\""+id+"\""+_jmol.targetText+")'><input type=button value = '"+label+"' onclick='jmolScript(document.getElementById(\""+id+"\").value"+_jmol.targetText+")' /></span>";if(_jmol.debugAlert)
alert(t);return _jmolDocumentWrite(t);}
function _jmolCommandKeyPress(e,id,target){var keycode=(window.event?window.event.keyCode:e?e.which:0);if(keycode==13){jmolScript(document.getElementById(id).value,target)}}
function jmolMenu(arrayOfMenuItems,size,id,title){_jmolInitCheck();if(id==undefined||id==null)
id="jmolMenu"+_jmol.menuCount;++_jmol.menuCount;var type=typeof arrayOfMenuItems;if(type!=null&&type=="object"&&arrayOfMenuItems.length){var len=arrayOfMenuItems.length;if(typeof size!="number"||size==1)
size=null;else if(size<0)
size=len;var sizeText=size?" size='"+size+"' ":"";var t="<span id=\"span_"+id+"\""+(title?" title=\""+title+"\"":"")+"><select name='"+id+"' id='"+id+
"' onChange='_jmolMenuSelected(this"+_jmol.targetText+")'"+
sizeText+_jmol.menuCssText+">";for(var i=0;i<len;++i){var menuItem=arrayOfMenuItems[i];type=typeof menuItem;var script,text;var isSelected=undefined;if(type=="object"&&menuItem!=null){script=menuItem[0];text=menuItem[1];isSelected=menuItem[2];}else{script=text=menuItem;}
if(text==undefined||text==null)
text=script;if(script=="#optgroup"){t+="<optgroup label='"+text+"'>";}else if(script=="#optgroupEnd"){t+="</optgroup>";}else{var scriptIndex=_jmolAddScript(script);var selectedText=isSelected?"' selected='true'>":"'>";t+="<option value='"+scriptIndex+selectedText+text+"</option>";}}
t+="</select></span>";if(_jmol.debugAlert)
alert(t);return _jmolDocumentWrite(t);}}
function jmolHtml(html){return _jmolDocumentWrite(html);}
function jmolBr(){return _jmolDocumentWrite("<br />");}
function jmolDebugAlert(enableAlerts){_jmol.debugAlert=(enableAlerts==undefined||enableAlerts)}
function jmolAppletInline(size,inlineModel,script,nameSuffix){_jmolInitCheck();return _jmolApplet(size,_jmolSterilizeInline(inlineModel),script,nameSuffix);}
function jmolSetTarget(targetSuffix){_jmol.targetSuffix=targetSuffix;_jmol.targetText=targetSuffix?",\""+targetSuffix+"\"":"";}
function jmolScript(script,targetSuffix){if(script){_jmolCheckBrowser();if(targetSuffix=="all"){with(_jmol){for(var i=0;i<appletSuffixes.length;++i){var applet=_jmolGetApplet(appletSuffixes[i]);if(applet)applet.script(script);}}}else{var applet=_jmolGetApplet(targetSuffix);if(applet)applet.script(script);}}}
function jmolLoadInline(model,targetSuffix){if(!model)return "ERROR: NO MODEL"
var applet=_jmolGetApplet(targetSuffix);if(!applet)return "ERROR: NO APPLET"
if(typeof(model)=="string")
return applet.loadInlineString(model,"",false);else
return applet.loadInlineArray(model,"",false);}
function jmolLoadInlineScript(model,script,targetSuffix){if(!model)return "ERROR: NO MODEL"
var applet=_jmolGetApplet(targetSuffix);if(!applet)return "ERROR: NO APPLET"
return applet.loadInlineString(model,script,false);}
function jmolLoadInlineArray(ModelArray,script,targetSuffix){if(!model)return "ERROR: NO MODEL"
if(!script)script=""
var applet=_jmolGetApplet(targetSuffix);if(!applet)return "ERROR: NO APPLET"
try{return applet.loadInlineArray(ModelArray,script,false);}catch(err){return applet.loadInlineString(ModelArray.join("\n"),script,false);}}
function jmolAppendInlineArray(ModelArray,script,targetSuffix){if(!model)return "ERROR: NO MODEL"
if(!script)script=""
var applet=_jmolGetApplet(targetSuffix);if(!applet)return "ERROR: NO APPLET"
try{return applet.loadInlineArray(ModelArray,script,true);}catch(err){return applet.loadInlineString(ModelArray.join("\n"),script,true);}}
function jmolAppendInlineScript(model,script,targetSuffix){if(!model)return "ERROR: NO MODEL"
var applet=_jmolGetApplet(targetSuffix);if(!applet)return "ERROR: NO APPLET"
return applet.loadInlineString(model,script,true);}
function jmolCheckBrowser(action,urlOrMessage,nowOrLater){if(typeof action=="string"){action=action.toLowerCase();if(action!="alert"&&action!="redirect"&&action!="popup")
action=null;}
if(typeof action!="string")
alert("jmolCheckBrowser(action, urlOrMessage, nowOrLater)\n\n"+
"action must be 'alert', 'redirect', or 'popup'");else{if(typeof urlOrMessage!="string")
alert("jmolCheckBrowser(action, urlOrMessage, nowOrLater)\n\n"+
"urlOrMessage must be a string");else{_jmol.checkBrowserAction=action;_jmol.checkBrowserUrlOrMessage=urlOrMessage;}}
if(typeof nowOrLater=="string"&&nowOrLater.toLowerCase()=="now")
_jmolCheckBrowser();}
function jmolSetAppletCssClass(appletCssClass){if(_jmol.hasGetElementById){_jmol.appletCssClass=appletCssClass;_jmol.appletCssText=appletCssClass?"class='"+appletCssClass+"' ":"";}}
function jmolSetButtonCssClass(buttonCssClass){if(_jmol.hasGetElementById){_jmol.buttonCssClass=buttonCssClass;_jmol.buttonCssText=buttonCssClass?"class='"+buttonCssClass+"' ":"";}}
function jmolSetCheckboxCssClass(checkboxCssClass){if(_jmol.hasGetElementById){_jmol.checkboxCssClass=checkboxCssClass;_jmol.checkboxCssText=checkboxCssClass?"class='"+checkboxCssClass+"' ":"";}}
function jmolSetRadioCssClass(radioCssClass){if(_jmol.hasGetElementById){_jmol.radioCssClass=radioCssClass;_jmol.radioCssText=radioCssClass?"class='"+radioCssClass+"' ":"";}}
function jmolSetLinkCssClass(linkCssClass){if(_jmol.hasGetElementById){_jmol.linkCssClass=linkCssClass;_jmol.linkCssText=linkCssClass?"class='"+linkCssClass+"' ":"";}}
function jmolSetMenuCssClass(menuCssClass){if(_jmol.hasGetElementById){_jmol.menuCssClass=menuCssClass;_jmol.menuCssText=menuCssClass?"class='"+menuCssClass+"' ":"";}}
var _jmol={currentDocument:document,debugAlert:false,codebase:"",modelbase:".",appletCount:0,appletSuffixes:[],appletWindow:null,allowedJmolSize:[25,2048,300],buttonCount:0,checkboxCount:0,linkCount:0,cmdCount:0,menuCount:0,radioCount:0,radioGroupCount:0,appletCssClass:null,appletCssText:"",buttonCssClass:null,buttonCssText:"",checkboxCssClass:null,checkboxCssText:"",radioCssClass:null,radioCssText:"",linkCssClass:null,linkCssText:"",menuCssClass:null,menuCssText:"",targetSuffix:0,targetText:"",scripts:[""],params:{syncId:(""+Math.random()).substring(3),progressbar:"true",progresscolor:"blue",boxbgcolor:"black",boxfgcolor:"white",boxmessage:"Downloading JmolApplet ..."},ua:navigator.userAgent.toLowerCase(),uaVersion:parseFloat(navigator.appVersion),os:"unknown",browser:"unknown",browserVersion:0,hasGetElementById:!!document.getElementById,isJavaEnabled:navigator.javaEnabled(),isNetscape47Win:false,isIEWin:false,useIEObject:false,useHtml4Object:false,windowsClassId:"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",windowsCabUrl:"http://java.sun.com/update/1.5.0/jinstall-1_5_0_05-windows-i586.cab",isBrowserCompliant:false,isJavaCompliant:false,isFullyCompliant:false,initialized:false,initChecked:false,browserChecked:false,checkBrowserAction:"alert",checkBrowserUrlOrMessage:null,archivePath:null,previousOnloadHandler:null,ready:{}}
with(_jmol){function _jmolTestUA(candidate){var ua=_jmol.ua;var index=ua.indexOf(candidate);if(index<0)
return false;_jmol.browser=candidate;_jmol.browserVersion=parseFloat(ua.substring(index+candidate.length+1));return true;}
function _jmolTestOS(candidate){if(_jmol.ua.indexOf(candidate)<0)
return false;_jmol.os=candidate;return true;}
_jmolTestUA("konqueror")||_jmolTestUA("safari")||_jmolTestUA("omniweb")||_jmolTestUA("opera")||_jmolTestUA("webtv")||_jmolTestUA("icab")||_jmolTestUA("msie")||(_jmol.ua.indexOf("compatible")<0&&_jmolTestUA("mozilla"));_jmolTestOS("linux")||_jmolTestOS("unix")||_jmolTestOS("mac")||_jmolTestOS("win");isNetscape47Win=(os=="win"&&browser=="mozilla"&&browserVersion>=4.78&&browserVersion<=4.8);if(os=="win"){isBrowserCompliant=hasGetElementById;}else if(os=="mac"){if(browser=="mozilla"&&browserVersion>=5){eval("try {var v = java.lang.System.getProperty('java.version');"+
" _jmol.isBrowserCompliant = v >= '1.4.2';"+
" } catch (e) { }");}else if(browser=="opera"&&browserVersion<=7.54){isBrowserCompliant=false;}else{isBrowserCompliant=hasGetElementById&&!((browser=="msie")||(browser=="safari"&&browserVersion<125.12));}}else if(os=="linux"||os=="unix"){if(browser=="konqueror"&&browserVersion<=3.3)
isBrowserCompliant=false;else
isBrowserCompliant=hasGetElementById;}else{isBrowserCompliant=hasGetElementById;}
isJavaCompliant=isJavaEnabled;isFullyCompliant=isBrowserCompliant&&isJavaCompliant;isIEWin=(os=="win"&&browser=="msie"&&browserVersion>=5.5);useIEObject=isIEWin;useHtml4Object=(os!="mac"&&browser=="mozilla"&&browserVersion>=5)||(os=="win"&&browser=="opera"&&browserVersion>=8)||(os=="mac"&&browser=="safari"&&browserVersion>=412.2);doTranslate=true;haveSetTranslate=false;}
function jmolSetCallback(callbackName,funcName){_jmol.params[callbackName]=funcName}
function jmolSetSyncId(n){return _jmol.params["syncId"]=n}
function jmolGetSyncId(){return _jmol.params["syncId"]}
function jmolSetLogLevel(n){_jmol.params.logLevel=''+n;}
if(noJavaMsg==undefined)var noJavaMsg="You do not have Java applets enabled in your web browser, or your browser is blocking this applet.<br />\n"+
"Check the warning message from your browser and/or enable Java applets in<br />\n"+
"your web browser preferences, or install the Java Runtime Environment from <a href='http://www.java.com'>www.java.com</a><br />";if(noJavaMsg2==undefined)var noJavaMsg2="You do not have the<br />\n"+
"Java Runtime Environment<br />\n"+
"installed for applet support.<br />\n"+
"Visit <a href='http://www.java.com'>www.java.com</a>";function _jmolApplet(size,inlineModel,script,nameSuffix){with(_jmol){if(!nameSuffix)
nameSuffix=appletCount;appletSuffixes.push(nameSuffix);++appletCount;if(!script)
script="select *";var sz=_jmolGetAppletSize(size);var widthAndHeight=" width='"+sz[0]+"' height='"+sz[1]+"' ";var tHeader,tFooter;if(!codebase)
jmolInitialize(".");if(useIEObject||useHtml4Object){params.name='jmolApplet'+nameSuffix;params.archive=archivePath;params.mayscript='true';params.codebase=codebase;}
if(useIEObject){winCodebase=(windowsCabUrl?" codebase='"+windowsCabUrl+"'\n":"");params.code='JmolApplet';tHeader="<object name='jmolApplet"+nameSuffix+
"' id='jmolApplet"+nameSuffix+"' "+appletCssText+"\n"+
" classid='"+windowsClassId+"'\n"+winCodebase+widthAndHeight+">\n";tFooter="</object>";}else if(useHtml4Object){tHeader="<object name='jmolApplet"+nameSuffix+
"' id='jmolApplet"+nameSuffix+"' "+appletCssText+"\n"+
" classid='java:JmolApplet'\n"+
" type='application/x-java-applet'\n"+
widthAndHeight+">\n";tFooter="</object>";}else{tHeader="<applet name='jmolApplet"+nameSuffix+
"' id='jmolApplet"+nameSuffix+
"' "+appletCssText+
" code='JmolApplet'"+
" archive='"+archivePath+"' codebase='"+codebase+"'\n"+
widthAndHeight+
" mayscript='true'>\n";tFooter="</applet>";}
var visitJava;if(isIEWin||useHtml4Object){var szX="width:"+sz[0]
if(szX.indexOf("%")==-1)szX+="px"
var szY="height:"+sz[1]
if(szY.indexOf("%")==-1)szY+="px"
visitJava="<p style='background-color:yellow; color:black; "+
szX+";"+szY+";"+
"text-align:center;vertical-align:middle;'>\n"+
noJavaMsg+
"</p>";}else{visitJava="<table bgcolor='yellow'><tr>"+
"<td align='center' valign='middle' "+widthAndHeight+"><font color='black'>\n"+
noJavaMsg2+
"</font></td></tr></table>";}
params.loadInline=(inlineModel?inlineModel:"");params.script=(script?_jmolSterilizeScript(script):"");var t=tHeader+_jmolParams()+visitJava+tFooter;jmolSetTarget(nameSuffix);ready["jmolApplet"+nameSuffix]=false;if(_jmol.debugAlert)
alert(t);return t;}}
function _jmolParams(){var t="";for(var i in _jmol.params)
if(_jmol.params[i]!="")
t+="  <param name='"+i+"' value='"+_jmol.params[i]+"' />\n";return t}
function _jmolInitCheck(){if(_jmol.initChecked)
return;_jmol.initChecked=true;jmolInitialize(defaultdir,defaultjar)}
function _jmolCheckBrowser(){with(_jmol){if(browserChecked)
return;browserChecked=true;if(isFullyCompliant)
return true;if(checkBrowserAction=="redirect")
location.href=checkBrowserUrlOrMessage;else if(checkBrowserAction=="popup")
_jmolPopup(checkBrowserUrlOrMessage);else{var msg=checkBrowserUrlOrMessage;if(msg==null)
msg="Your web browser is not fully compatible with Jmol\n\n"+
"browser: "+browser+
"   version: "+browserVersion+
"   os: "+os+
"   isBrowserCompliant: "+isBrowserCompliant+
"   isJavaCompliant: "+isJavaCompliant+
"\n\n"+ua;alert(msg);}}
return false;}
function jmolSetXHTML(id){_jmol.isXHTML=true
_jmol.XhtmlElement=null
_jmol.XhtmlAppendChild=false
if(id){_jmol.XhtmlElement=document.getElementById(id)
_jmol.XhtmlAppendChild=true}}
function _jmolDocumentWrite(text){if(_jmol.currentDocument){if(_jmol.isXHTML&&!_jmol.XhtmlElement){var s=document.getElementsByTagName("script")
_jmol.XhtmlElement=s.item(s.length-1)
_jmol.XhtmlAppendChild=false}
if(_jmol.XhtmlElement){_jmolDomDocumentWrite(text)}else{_jmol.currentDocument.write(text);}}
return text;}
function _jmolDomDocumentWrite(data){var pt=0
var Ptr=[]
Ptr[0]=0
while(Ptr[0]<data.length){var child=_jmolGetDomElement(data,Ptr)
if(!child)break
if(_jmol.XhtmlAppendChild)
_jmol.XhtmlElement.appendChild(child)
else
_jmol.XhtmlElement.parentNode.insertBefore(child,_jmol.XhtmlElement);}}
function _jmolGetDomElement(data,Ptr,closetag,lvel){var e=document.createElement("span")
e.innerHTML=data
Ptr[0]=data.length
return e
if(!closetag)closetag=""
if(!lvel)lvel=0
var pt0=Ptr[0]
var pt=pt0
while(pt<data.length&&data.charAt(pt)!="<")pt++
if(pt!=pt0){var text=data.substring(pt0,pt)
Ptr[0]=pt
return document.createTextNode(text)}
pt0=++pt
var ch
while(pt<data.length&&"\n\r\t >".indexOf(ch=data.charAt(pt))<0)pt++
var tagname=data.substring(pt0,pt)
var e=(tagname==closetag||tagname=="/"?"":document.createElementNS?document.createElementNS('http://www.w3.org/1999/xhtml',tagname):document.createElement(tagname));if(ch==">"){Ptr[0]=++pt
return e}
while(pt<data.length&&(ch=data.charAt(pt))!=">"){while(pt<data.length&&"\n\r\t ".indexOf(ch=data.charAt(pt))>=0)pt++
pt0=pt
while(pt<data.length&&"\n\r\t =/>".indexOf(ch=data.charAt(pt))<0)pt++
var attrname=data.substring(pt0,pt).toLowerCase()
if(attrname&&ch!="=")
e.setAttribute(attrname,"true")
while(pt<data.length&&"\n\r\t ".indexOf(ch=data.charAt(pt))>=0)pt++
if(ch=="/"){Ptr[0]=pt+2
return e}else if(ch=="="){var quote=data.charAt(++pt)
pt0=++pt
while(pt<data.length&&(ch=data.charAt(pt))!=quote)pt++
var attrvalue=data.substring(pt0,pt)
e.setAttribute(attrname,attrvalue)
pt++}}
Ptr[0]=++pt
while(Ptr[0]<data.length){var child=_jmolGetDomElement(data,Ptr,"/"+tagname,lvel+1)
if(!child)break
e.appendChild(child)}
return e}
function _jmolPopup(url){var popup=window.open(url,"JmolPopup","left=150,top=150,height=400,width=600,"+
"directories=yes,location=yes,menubar=yes,"+
"toolbar=yes,"+
"resizable=yes,scrollbars=yes,status=yes");if(popup.focus)
poup.focus();}
function _jmolReadyCallback(name){if(_jmol.debugAlert)
alert(name+" is ready");_jmol.ready[""+name]=true;}
function _jmolSterilizeScript(script){var inlineScript=script.replace(/'/g,"&#39;");if(_jmol.debugAlert)
alert("script:\n"+inlineScript);return inlineScript;}
function _jmolSterilizeInline(model){var inlineModel=model.replace(/\r|\n|\r\n/g,"|").replace(/'/g,"&#39;");if(_jmol.debugAlert)
alert("inline model:\n"+inlineModel);return inlineModel;}
function _jmolRadio(script,labelHtml,isChecked,separatorHtml,groupName,id,title){++_jmol.radioCount;if(groupName==undefined||groupName==null)
groupName="jmolRadioGroup"+(_jmol.radioGroupCount-1);if(!script)
return "";if(labelHtml==undefined||labelHtml==null)
labelHtml=script.substring(0,32);if(!separatorHtml)
separatorHtml="";var scriptIndex=_jmolAddScript(script);var eospan="</span>"
var t="<span id=\"span_"+id+"\""+(title?" title=\""+title+"\"":"")+"><input name='"
+groupName+"' id='"+id+"' type='radio' onclick='_jmolClick("+
scriptIndex+_jmol.targetText+");return true;' onmouseover='_jmolMouseOver("+
scriptIndex+");return true;' onmouseout='_jmolMouseOut()' "+
(isChecked?"checked='true' ":"")+_jmol.radioCssText+" />"
if(labelHtml.toLowerCase().indexOf("<td>")>=0){t+=eospan
eospan="";}
t+="<label for=\""+id+"\">"+labelHtml+"</label>"+eospan+separatorHtml;return t;}
function _jmolFindApplet(target){var applet=_jmolFindAppletInWindow(_jmol.appletWindow!=null?_jmol.appletWindow:window,target);if(applet==undefined)
applet=_jmolSearchFrames(window,target);if(applet==undefined)
applet=_jmolSearchFrames(top,target);return applet;}
function _jmolGetApplet(targetSuffix){var target="jmolApplet"+(targetSuffix?targetSuffix:"0");var applet=_jmolFindApplet(target);if(applet)return applet
if(!_jmol.alerted)alert("could not find applet "+target);_jmol.alerted=true;return null}
function _jmolSearchFrames(win,target){var applet;var frames=win.frames;if(frames&&frames.length){try{for(var i=0;i<frames.length;++i){applet=_jmolSearchFrames(frames[i],target);if(applet)
return applet;}}catch(e){if(_jmol.debugAlert)
alert("Jmol.js _jmolSearchFrames cannot access "+win.name+".frame["+i+"] consider using jmolSetAppletWindow()")}}
return applet=_jmolFindAppletInWindow(win,target)}
function _jmolFindAppletInWindow(win,target){var doc=win.document;if(_jmol.useHtml4Object||_jmol.useIEObject)
return doc.getElementById(target);else if(doc.applets)
return doc.applets[target];else
return doc[target];}
function _jmolAddScript(script){if(!script)
return 0;var index=_jmol.scripts.length;_jmol.scripts[index]=script;return index;}
function _jmolClick(scriptIndex,targetSuffix,elementClicked){_jmol.element=elementClicked;jmolScript(_jmol.scripts[scriptIndex],targetSuffix);}
function _jmolMenuSelected(menuObject,targetSuffix){var scriptIndex=menuObject.value;if(scriptIndex!=undefined){jmolScript(_jmol.scripts[scriptIndex],targetSuffix);return;}
var len=menuObject.length;if(typeof len=="number"){for(var i=0;i<len;++i){if(menuObject[i].selected){_jmolClick(menuObject[i].value,targetSuffix);return;}}}
alert("?Que? menu selected bug #8734");}
_jmol.checkboxMasters={};_jmol.checkboxItems={};function jmolSetCheckboxGroup(chkMaster,chkBox){var id=chkMaster;if(typeof(id)=="number")id="jmolCheckbox"+id;chkMaster=document.getElementById(id);if(!chkMaster)alert("jmolSetCheckboxGroup: master checkbox not found: "+id);var m=_jmol.checkboxMasters[id]={};m.chkMaster=chkMaster;m.chkGroup={};for(var i=1;i<arguments.length;i++){var id=arguments[i];if(typeof(id)=="number")id="jmolCheckbox"+id;checkboxItem=document.getElementById(id);if(!checkboxItem)alert("jmolSetCheckboxGroup: group checkbox not found: "+id);m.chkGroup[id]=checkboxItem;_jmol.checkboxItems[id]=m;}}
function _jmolNotifyMaster(m){var allOn=true;var allOff=true;for(var chkBox in m.chkGroup){if(m.chkGroup[chkBox].checked)
allOff=false;else
allOn=false;}
if(allOn)m.chkMaster.checked=true;if(allOff)m.chkMaster.checked=false;if((allOn||allOff)&&_jmol.checkboxItems[m.chkMaster.id])
_jmolNotifyMaster(_jmol.checkboxItems[m.chkMaster.id])}
function _jmolNotifyGroup(m,isOn){for(var chkBox in m.chkGroup){var item=m.chkGroup[chkBox]
item.checked=isOn;if(_jmol.checkboxMasters[item.id])
_jmolNotifyGroup(_jmol.checkboxMasters[item.id],isOn)}}
function _jmolCbClick(ckbox,whenChecked,whenUnchecked,targetSuffix){_jmol.control=ckbox
_jmolClick(ckbox.checked?whenChecked:whenUnchecked,targetSuffix);if(_jmol.checkboxMasters[ckbox.id])
_jmolNotifyGroup(_jmol.checkboxMasters[ckbox.id],ckbox.checked)
if(_jmol.checkboxItems[ckbox.id])
_jmolNotifyMaster(_jmol.checkboxItems[ckbox.id])}
function _jmolCbOver(ckbox,whenChecked,whenUnchecked){window.status=_jmol.scripts[ckbox.checked?whenUnchecked:whenChecked];}
function _jmolMouseOver(scriptIndex){window.status=_jmol.scripts[scriptIndex];}
function _jmolMouseOut(){window.status=" ";return true;}
function _jmolSetCodebase(codebase){_jmol.codebase=codebase?codebase:".";if(_jmol.debugAlert)
alert("jmolCodebase="+_jmol.codebase);}
function _jmolOnloadResetForms(){_jmol.previousOnloadHandler=window.onload;window.onload=function(){with(_jmol){if(buttonCount+checkboxCount+menuCount+radioCount+radioGroupCount>0){var forms=document.forms;for(var i=forms.length;--i>=0;)
forms[i].reset();}
if(previousOnloadHandler)
previousOnloadHandler();}}}
function _jmolEvalJSON(s,key){s=s+""
if(!s)return[]
if(s.charAt(0)!="{"){if(s.indexOf(" | ")>=0)s=s.replace(/\ \|\ /g,"\n")
return s}
var A=eval("("+s+")")
if(!A)return
if(key&&A[key])A=A[key]
return A}
function _jmolEnumerateObject(A,key){var sout=""
if(typeof(A)=="string"&&A!="null"){sout+="\n"+key+"=\""+A+"\""}else if(!isNaN(A)||A==null){sout+="\n"+key+"="+(A+""==""?"null":A)}else if(A.length){sout+=key+"=[]"
for(var i=0;i<A.length;i++){sout+="\n"
if(typeof(A[i])=="object"||typeof(A[i])=="array"){sout+=_jmolEnumerateObject(A[i],key+"["+i+"]")}else{sout+=key+"["+i+"]="+(typeof(A[i])=="string"&&A[i]!="null"?"\""+A[i].replace(/\"/g,"\\\"")+"\"":A[i])}}}else{if(key!=""){sout+=key+"={}"
key+="."}
for(var i in A){sout+="\n"
if(typeof(A[i])=="object"||typeof(A[i])=="array"){sout+=_jmolEnumerateObject(A[i],key+i)}else{sout+=key+i+"="+(typeof(A[i])=="string"&&A[i]!="null"?"\""+A[i].replace(/\"/g,"\\\"")+"\"":A[i])}}}
return sout}
function _jmolSortKey0(a,b){return(a[0]<b[0]?1:a[0]>b[0]?-1:0)}
function _jmolSortMessages(A){if(!A||typeof(A)!="object")return[]
var B=[]
for(var i=A.length-1;i>=0;i--)for(var j=0;j<A[i].length;j++)B[B.length]=A[i][j]
if(B.length==0)return
B=B.sort(_jmolSortKey0)
return B}
function _jmolDomScriptLoad(URL){_jmol.servercall=URL
var node=document.getElementById("_jmolScriptNode")
if(node&&_jmol.browser!="msie"){document.getElementsByTagName("HEAD")[0].removeChild(node)
node=null}
if(node){node.setAttribute("src",URL)}else{node=document.createElement("script")
node.setAttribute("id","_jmolScriptNode")
node.setAttribute("type","text/javascript")
node.setAttribute("src",URL)
document.getElementsByTagName("HEAD")[0].appendChild(node)}}
function _jmolExtractPostData(url){S=url.split("&POST:")
var s=""
for(var i=1;i<S.length;i++){KV=S[i].split("=")
s+="&POSTKEY"+i+"="+KV[0]
s+="&POSTVALUE"+i+"="+KV[1]}
return "&url="+escape(S[0])+s}
function _jmolLoadModel(targetSuffix,remoteURL,array,isError,errorMessage){_jmol.remoteURL=remoteURL
if(isError)alert(errorMessage)
jmolLoadInlineScript(array.join("\n"),_jmol.optionalscript,targetSuffix)}
function jmolGetStatus(strStatus,targetSuffix){return _jmolSortMessages(jmolGetPropertyAsArray("jmolStatus",strStatus,targetSuffix))}
function jmolGetPropertyAsArray(sKey,sValue,targetSuffix){return _jmolEvalJSON(jmolGetPropertyAsJSON(sKey,sValue,targetSuffix),sKey)}
function jmolGetPropertyAsString(sKey,sValue,targetSuffix){var applet=_jmolGetApplet(targetSuffix);if(!sValue)sValue=""
return(applet?applet.getPropertyAsString(sKey,sValue)+"":"")}
function jmolGetPropertyAsJSON(sKey,sValue,targetSuffix){if(!sValue)sValue=""
var applet=_jmolGetApplet(targetSuffix);try{return(applet?applet.getPropertyAsJSON(sKey,sValue)+"":"")}catch(e){return ""}}
function jmolGetPropertyAsJavaObject(sKey,sValue,targetSuffix){if(!sValue)sValue=""
var applet=_jmolGetApplet(targetSuffix);return(applet?applet.getProperty(sKey,sValue):null)}
function jmolDecodeJSON(s){return _jmolEnumerateObject(_jmolEvalJSON(s),"")}
function jmolScriptWait(script,targetSuffix){if(!targetSuffix)targetSuffix="0"
var Ret=jmolScriptWaitAsArray(script,targetSuffix)
var s=""
for(var i=Ret.length;--i>=0;)
for(var j=0;j<Ret[i].length;j++)
s+=Ret[i][j]+"\n"
return s}
function jmolScriptWaitOutput(script,targetSuffix){if(!targetSuffix)targetSuffix="0"
var ret=""
try{if(script){_jmolCheckBrowser();var applet=_jmolGetApplet(targetSuffix);if(applet)ret+=applet.scriptWaitOutput(script);}}catch(e){}
return ret;}
function jmolEvaluate(molecularMath,targetSuffix){if(!targetSuffix)targetSuffix="0"
var result=""+jmolGetPropertyAsJavaObject("evaluate",molecularMath,targetSuffix);var s=result.replace(/\-*\d+/,"")
if(s==""&&!isNaN(parseInt(result)))return parseInt(result);var s=result.replace(/\-*\d*\.\d*/,"")
if(s==""&&!isNaN(parseFloat(result)))return parseFloat(result);return result;}
function jmolScriptEcho(script,targetSuffix){if(!targetSuffix)targetSuffix="0"
var Ret=jmolScriptWaitAsArray(script,targetSuffix)
var s=""
for(var i=Ret.length;--i>=0;)
for(var j=Ret[i].length;--j>=0;)
if(Ret[i][j][1]=="scriptEcho")s+=Ret[i][j][3]+"\n"
return s.replace(/ \| /g,"\n")}
function jmolScriptMessage(script,targetSuffix){if(!targetSuffix)targetSuffix="0"
var Ret=jmolScriptWaitAsArray(script,targetSuffix)
var s=""
for(var i=Ret.length;--i>=0;)
for(var j=Ret[i].length;--j>=0;)
if(Ret[i][j][1]=="scriptStatus")s+=Ret[i][j][3]+"\n"
return s.replace(/ \| /g,"\n")}
function jmolScriptWaitAsArray(script,targetSuffix){var ret=""
try{jmolGetStatus("scriptEcho,scriptMessage,scriptStatus,scriptError",targetSuffix)
if(script){_jmolCheckBrowser();var applet=_jmolGetApplet(targetSuffix);if(applet)ret+=applet.scriptWait(script);ret=_jmolEvalJSON(ret,"jmolStatus")
if(typeof ret=="object")
return ret}}catch(e){}
return[[ret]]}
function jmolSaveOrientation(id,targetSuffix){if(!targetSuffix)targetSuffix="0"
return _jmol["savedOrientation"+id]=jmolGetPropertyAsArray("orientationInfo","info",targetSuffix).moveTo}
function jmolRestoreOrientation(id,targetSuffix){if(!targetSuffix)targetSuffix="0"
var s=_jmol["savedOrientation"+id]
if(!s||s=="")return
s=s.replace(/1\.0/,"0")
return jmolScriptWait(s,targetSuffix)}
function jmolRestoreOrientationDelayed(id,delay,targetSuffix){if(arguments.length<2)delay=1;if(!targetSuffix)targetSuffix="0"
var s=_jmol["savedOrientation"+id]
if(!s||s=="")return
s=s.replace(/1\.0/,delay)
return jmolScriptWait(s,targetSuffix)}
function jmolAppletAddParam(appletCode,name,value){if(value=="")return appletCode
return appletCode.replace(/\<param/,"\n<param name='"+name+"' value='"+value+"' />\n<param")}
function jmolLoadAjax_STOLAF_RCSB(fileformat,pdbid,optionalscript,targetSuffix){if(!_jmol.thismodel)_jmol.thismodel="1crn"
if(!_jmol.serverURL)_jmol.serverURL="http://fusion.stolaf.edu/chemistry/jmol/getajaxjs.cfm"
if(!_jmol.RCSBserver)_jmol.RCSBserver="http://www.rcsb.org"
if(!_jmol.defaultURL_RCSB)_jmol.defaultURL_RCSB=_jmol.RCSBserver+"/pdb/files/1CRN.CIF"
if(!fileformat)fileformat="PDB"
if(!pdbid)pdbid=prompt("Enter a 4-digit PDB ID:",_jmol.thismodel)
if(!pdbid||pdbid.length!=4)return ""
if(!targetSuffix)targetSuffix="0"
if(!optionalscript)optionalscript=""
var url=_jmol.defaultURL_RCSB.replace(/1CRN/g,pdbid.toUpperCase())
if(fileformat!="CIF")url=url.replace(/CIF/,fileformat)
_jmol.optionalscript=optionalscript
_jmol.thismodel=pdbid
_jmol.thistargetsuffix=targetSuffix
_jmol.thisurl=url
_jmol.modelArray=[]
url=_jmol.serverURL+"?returnfunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix+_jmolExtractPostData(url)
_jmolDomScriptLoad(url)
return url}
function jmolLoadAjax_STOLAF_ANY(url,userid,optionalscript,targetSuffix){_jmol.serverURL="http://fusion.stolaf.edu/chemistry/jmol/getajaxjs.cfm"
if(!_jmol.thisurlANY)_jmol.thisurlANY="http://www.stolaf.edu/depts/chemistry/mo/struc/data/ycp3-1.mol"
if(!url)url=prompt("Enter any (uncompressed file) URL:",_jmol.thisurlANY)
if(!userid)userid="0"
if(!targetSuffix)targetSuffix="0"
if(!optionalscript)optionalscript=""
_jmol.optionalscript=optionalscript
_jmol.thistargetsuffix=targetSuffix
_jmol.modelArray=[]
_jmol.thisurl=url
url=_jmol.serverURL+"?returnfunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix+_jmolExtractPostData(url)
_jmolDomScriptLoad(url)}
function jmolLoadAjax_MSA(key,value,optionalscript,targetSuffix){if(!_jmol.thiskeyMSA)_jmol.thiskeyMSA="mineral"
if(!_jmol.thismodelMSA)_jmol.thismodelMSA="quartz"
if(!_jmol.ajaxURL_MSA)_jmol.ajaxURL_MSA="http://rruff.geo.arizona.edu/AMS/result.php?mineral=quartz&viewing=ajaxjs"
if(!key)key=prompt("Enter a field:",_jmol.thiskeyMSA)
if(!key)return ""
if(!value)value=prompt("Enter a "+key+":",_jmol.thismodelMSA)
if(!value)return ""
if(!targetSuffix)targetSuffix="0"
if(!optionalscript)optionalscript=""
if(optionalscript==1)optionalscript='load "" {1 1 1}'
var url=_jmol.ajaxURL_MSA.replace(/mineral/g,key).replace(/quartz/g,value)
_jmol.optionalscript=optionalscript
_jmol.thiskeyMSA=key
_jmol.thismodelMSA=value
_jmol.thistargetsuffix=targetSuffix
_jmol.thisurl=url
_jmol.modelArray=[]
loadModel=_jmolLoadModel
_jmolDomScriptLoad(url)
return url}
function jmolLoadAjaxJS(url,userid,optionalscript,targetSuffix){if(!userid)userid="0"
if(!targetSuffix)targetSuffix="0"
if(!optionalscript)optionalscript=""
_jmol.optionalscript=optionalscript
_jmol.thismodel=userid
_jmol.thistargetsuffix=targetSuffix
_jmol.modelArray=[]
_jmol.thisurl=url
url+="&returnFunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix
_jmolDomScriptLoad(url)}}catch(e){}
function jmolSetAtomCoord(i,x,y,z,targetSuffix){_jmolCheckBrowser();var applet=_jmolGetApplet(targetSuffix);if(applet)applet.getProperty('jmolViewer').setAtomCoord(i,x,y,z)}
function jmolSetAtomCoordRelative(i,x,y,z,targetSuffix){_jmolCheckBrowser();var applet=_jmolGetApplet(targetSuffix);if(applet)applet.getProperty('jmolViewer').setAtomCoordRelative(i,x,y,z)}
if(document.location.search.indexOf("NOAPPLET")>=0){jmolApplet=function(w){var s="<table style='background-color:black' width="+w+"><tr height="+w+">"
+"<td align=center valign=center style='background-color:white'>"
+"Applet would be here"
+"<p><textarea id=fakeApplet rows=5 cols=50></textarea>"
+"</td></tr></table>"
return _jmolDocumentWrite(s)}
_jmolFindApplet=function(){return jmolApplet0}
jmolApplet0={script:function(script){document.getElementById("fakeApplet").value="\njmolScript:\n"+script},scriptWait:function(script){document.getElementById("fakeApplet").value="\njmolScriptWait:\n"+script},loadInline:function(data,script){document.getElementById("fakeApplet").value="\njmolLoadInline data:\n"+data+"\n\nscript:\n"+script}}}
function jmolResize(w,h,targetSuffix){_jmol.alerted=true;var percentW=(!w?100:w<=1&&w>0?w*100:0);var percentH=(!h?percentW:h<=1&&h>0?h*100:0);if(_jmol.browser=="msie"){var width=document.body.clientWidth;var height=document.body.clientHeight;}else{var netscapeScrollWidth=15;var width=window.innerWidth-netscapeScrollWidth;var height=window.innerHeight-netscapeScrollWidth;}
var applet=_jmolGetApplet(targetSuffix);if(!applet)return;applet.style.width=(percentW?width*percentW/100:w)+"px";applet.style.height=(percentH?height*percentH/100:(h?h:w))+"px";}
function jmolResizeApplet(size,targetSuffix){_jmol.alerted=true;var applet=_jmolGetApplet(targetSuffix);if(!applet)return;var sz=_jmolGetAppletSize(size,"px");sz[0]&&(applet.style.width=sz[0]);sz[1]&&(applet.style.height=sz[1]);}
function _jmolGetAppletSize(size,units){var width,height;if((typeof size)=="object"&&size!=null){width=size[0];height=size[1];}else{width=height=size;}
return[_jmolFixDim(width,units),_jmolFixDim(height,units)];}
function _jmolFixDim(x,units){var sx=""+x;return(sx.length==0?(units?"":_jmol.allowedJmolSize[2]):sx.indexOf("%")==sx.length-1?sx:(x=parseFloat(x))<=1&&x>0?x*100+"%":(isNaN(x=Math.floor(x))?_jmol.allowedJmolSize[2]:x<_jmol.allowedJmolSize[0]?_jmol.allowedJmolSize[0]:x>_jmol.allowedJmolSize[1]?_jmol.allowedJmolSize[1]:x)+(units?units:""));}
function ScrollToNode(aNode){var x=0,y=0;while(aNode!=null){x+=aNode.offsetLeft;y+=aNode.offsetTop;aNode=aNode.offsetParent;}
window.scrollTo(x,y);}
$(document).ready(function(){$('.subMenu > li').bind('mouseover',openSubMenu);$('.subMenu > li').bind('mouseout',closeSubMenu);function toggleSubMenu(){$(this).find('ul').toggle();};function openSubMenu(){$(this).find('ul').css('visibility','visible');};function closeSubMenu(){$(this).find('ul').css('visibility','hidden');};});function show_hide_directions()
{if($(window).width()>1240)
{$('.direction').show();}
else
{$('.direction').hide();$('.big_direction').hide();}}
function toggle_big_directions()
{$('.big_direction').toggle();return false;}
$(document).ready
(function()
{show_hide_directions();});$(window).resize(function(){show_hide_directions();});$.fn.clickOff=function(callback,selfDestroy){var clicked=false;var parent=this;var destroy=selfDestroy||true;parent.click(function(){clicked=true;});$(document).click(function(event){if(!clicked){callback(parent,event);}
clicked=false;});};$(".big_direction").clickOff(function(){$('.big_direction').hide();});$('.direction').bind('mouseover',toggle_big_directions);$(".big_direction").mouseleave(function(){$('.big_direction').hide();});$('.direction').click(function(){toggle_big_directions();return false;});$('.big_direction').click
(function()
{$('.big_direction').hide();});function div_toggle(id){$("#div_"+id).toggle();$(document).foundation('equalizer','reflow');}
$(".cover_img_desc_link").click(function(){$("#cover_img_desc_trunc").toggle();var txt=$(".cover_img_desc_link").text();if(txt=="+")
{$(".cover_img_desc_link").html("-");}
else
{$(".cover_img_desc_link").html("+");}});$.each($('.load_img'),function(i,item){check_img($(item));});function check_img(item){var URL=$(item).attr('value');var parent_div=$(item).attr('parent_div');var style="";if(URL!='undefined'){var img=new Image();img.src=URL;img.onload=function(){if(img.width>1&&img.height>1){var html='<img src="'+URL+'" border="0" alt=""';if($(item).attr('data-max-height')){style=style+"max-height:"+$(item).data('max-height')+";";}
if($(item).attr('data-max-width')){style=style+"max-width:"+$(item).data('max-width')+";";}
var html='<img src="'+URL+'" border="0" alt=""';if(style!=''){html=html+' style="'+style+'"';}
html=html+'>';$(item).html(html);}
else{if(parent_div!='undefined'){$('#'+parent_div).hide();}}};if(parent_div!='undefined'){img.onerror=function(){console.log(parent_div);$('#'+parent_div).hide();};}}}
(function(){$(function(){var altmetric,timer;$('.toggleArticleStats').click(function(){$(this).next('div').toggle();return false;});$('#articleBrowserView').click(function(e){var params,url;e.preventDefault();url=$(this).attr('data-url').split('?')[0];params={};$('#selectView input, #selectView select').each(function(){var name,node;node=$(this);name=node.attr('name');if(typeof name!=='undefined'){return params[name]=node.val();}});return location.href=url+'?'+$.param(params);});$('input[type="submit"][id^="articleBrowserExport"]').click(function(e){e.preventDefault();if($('#exportArticles input[type="checkbox"][name^="articles_ids"]:checked').size()===0){return alert('No article(s) selected');}
$('#exportPosition').val($(this).attr('id').replace('articleBrowserExport_',''));return $('#exportArticles').submit();});$('.selectUnselectAll').change(function(){if(!$(this).hasClass("jscroll-override")){var checked=$(this).is(':checked');$('#articles input[type="checkbox"][name^="articles_ids"]').attr('checked',checked);}});$('a.tablepopup').click(function(e){return e.preventDefault();});altmetric=$('div.altmetric-embed');if(altmetric.size()===1){timer=setInterval(function(){if($('a',altmetric).attr('style')){return altmetric.prev('div.menu-caption').show();}},100);return setTimeout(function(){return clearInterval(timer);},5000);}});}).call(this);(function(){$(function(){$('#cmd_instructions, #cmd_about').click(function(){var journal;journal=$('#opt_journal').val();if(!journal){return;}
return location.href="/journal/"+journal+"/"+($(this).attr('id').replace('cmd_',''));});return $('#cmd_submit_manuscript').click(function(){var journal;journal=$('#opt_journal').val();return location.href="/user/manuscripts/upload/?journal="+journal;});});}).call(this);(function(){$(function(){return $('form div.element ul li').parent().parent().addClass('error');});}).call(this);(function(){$(function(){$('#leftcol a.expand').click(function(){return $(this).parent().next('div').toggle();});$('#maincol').on('click','span.link',function(){var id;id=$(this).attr('id').replace('handle','');return $('#abstract'+id).toggle();});$('.tabbing').children('ul').addClass('ui-tabs-nav');$('.tabbing').children('ul').after('<div class="ui-tabs-panel"></div>');$('.tabbing').find('a').wrapInner('<span></span>');$('#unsubscribeJournal').click(function(e){var email,f;e.preventDefault();email=$('input[name="email"]');if(email.val()===''||email.val().indexOf('@')===-1){if($('div.error').length===0){email.after('<div class="error">Please input your email address.</div>').focus();}
return false;}
f=$('#subscribeForm');f.attr('action',$(this).attr('href'));return f.submit();});$('.tabbing').map(function(index){var ajaxUrl,tab1,tab1div;tab1=$(this);tab1div=tab1.children('div');tab1.children('ul').children('li').map(function(index){var tmp_link,tmp_url;if(index>3){tmp_url=$(this).children('a').attr('href');tmp_link=$(this).children('a').children('span');return $.ajax({url:tmp_url+"?ajax_preview=count",success:function(data){return tmp_link.append(" ["+data+"]");}});}});ajaxUrl=tab1.children('ul').children('li:first').children('a').attr('href');tab1.children('ul').children('li:first').addClass('ui-tabs-selected');return $.ajax({url:ajaxUrl,success:function(data){return tab1div.html(data);}});});$('.tabbing > ul > *').bind("click",function(){var selected;selected=$(this);selected.siblings().removeClass('ui-tabs-selected');selected.addClass('ui-tabs-selected');$.ajax({url:selected.children('a').attr('href'),success:function(data){return selected.parent().next('div').html(data);}});return false;});return $("select.si_order").on('change',function(){return window.location.href=$(this).data('url');});});}).call(this);var globalAmount=$("#payAmount").val();var globalAmountCHF=$("#payAmount").val();var globalCurrency='CHF';(function(){$(function(){var counter,counter_amount,doUpdate,hasInvoice,label,originalAmountCHF,originalCurrency,showAlert,updatePayment;counter=0;counter_amount=0;if($('#payment').size()===0){return;}
label=$('#currency_chf').next('label');originalAmountCHF=label.data('amount');originalCurrency=label.data('currency');hasInvoice=label.data('has-invoice');updatePayment=function(radio){var amount,exchange,total,unit;var hasPostSelectedInvoice=$('#currency_chf').next('label').data('has-post-selected-invoice');unit=label.html();if(hasInvoice){exchange=radio.next('label').data('apc-exchange-rate');amount=globalAmountCHF;}
else if(hasPostSelectedInvoice){exchange=radio.next('label').data('apc-exchange-rate');amount=globalAmountCHF;}
else{exchange=1;amount=parseFloat($('#payAmount').val());}
if(amount.toString()==='NaN'){amount=0;}
total=parseFloat((amount*exchange).toFixed(2));if(hasInvoice){total=Math.round(total);}
total=parseFloat((amount*+exchange).toFixed(2));if(total>parseFloat((2000*+exchange).toFixed(2))&&counter_amount===0){alert('Please check the "Invoiced Amount" which is bigger than 2000 CHF.');counter_amount++;}
$('#paymentSurcharge').html("+ "+amount+" "+unit);$('#paymentTotal').html(total+" "+unit);$('#payAmount').val(total);return $('#amount').val(parseFloat((total*100).toFixed(2)));};doUpdate=function(){return updatePayment($('#payment input:checked'));};$('#payment input[type="radio"]').on('click',function(){return doUpdate();});$('#payment input[type="radio"]').on('change',function(){return doUpdate();});$('#payAmount').on('keydown',function(){setTimeout(function(){return $('#payAmount').val($('#payAmount').val().replace(/[^(\d|\.)]/,''));});return 100;}).on('blur',function(){setTimeout(function(){return doUpdate();});return 100;});$('#clickPaymentTerms').on('click',function(){return $('#paymentTerms').prop("checked",!$('#paymentTerms').prop("checked"));});doUpdate();return $('#payment').on('submit',function(e){var radioboxes=$("input[type='radio']");var validated;validated=true;$(this).find('div.error').remove();if(!$('#refno').val()){$('<div class="error">Please type your Invoice ID.</div>').insertAfter($('#refno'));validated=false;}
if(!($('#payAmount').val()>0)){$('<div class="error">Please fill out the "Invoiced Amount" field.</div>').insertAfter($('#payAmount'));validated=false;}
if(!$('#paymentTerms').is(':checked')){$('<div class="error">Please read and agree to the Standard Terms and Conditions of Business of MDPI AG</div>').insertAfter($('#paymentTerms ~ a'));validated=false;}
if(!radioboxes.is(':checked')){$('<div class="error">Please select the payment currency</div>').insertAfter($('#currency_usd_label'));validated=false;}
if(validated){e.preventDefault();var invoiceID=$("#refno").val();var data=$("#refno").val();var url=$("#refno").data('ajax-url-paid')+'?term='+data;var form=this;$.ajax({url:url,dataType:'json',success:function(results){if(results.length==0){form.submit();return false;}
englishChyInvoice=function(){$html="<div><h6>Is not allowed to pay invoices with CNY currency on payment.mdpi.com<br>";$('<div></div>').appendTo('body').html($html).dialog({modal:true,title:'This invoice is in CNY ',zIndex:10000,autoOpen:true,width:'500px',resizable:false,buttons:{Close:function(){$(this).dialog("close");$('#refno').val("");$('#payAmount').val(0);}},close:function(event,ui){$(this).remove();}});}
if(results[0].value.substring(0,8)=="english-"&&results[0].currency=="CNY"){englishChyInvoice();}else{var curr=results[0].currency.toLowerCase();$("#currency_"+curr).prop('checked',true);var opt={autoOpen:false,width:'500px',resizable:false,modal:true,buttons:{"Yes":function(){form.submit();},"No":function(){$('#payment')[0].reset();$(this).dialog("close");}}};$("#paymentDialog").dialog(opt).dialog("open");$("#paymentDialog").html('<p>The invoice with the ID '+invoiceID+' has already been paid. Are you willing to proceed with an additional payment?</p>');}}});}
return validated;});});}).call(this);(function(){$(function(){var all_option,current_url,div_my_query_history,div_save_my_query,empty_option,fill_options,journal_changed,select_option,showHistoryQuery,showSaveQuery,update_sections,update_special_issues;empty_option='<option value="">--</option>';all_option='<option value="">all</option>';fill_options=function(node,items){var data;data=$.map(items,function(val,key){return "<option value=\""+val[0]+"\">"+val[1]+"</option>";}).join('');return $(node).html(data!==''?all_option+data:empty_option);};select_option=function(options,value){return options.each(function(){if($(this).attr('value')===value){$(this).attr('selected','selected');}});};update_sections=function(journal_name){if(journal_name===''){$('#section').html(empty_option).trigger("chosen:updated");$('#special_issue').html(empty_option).trigger("chosen:updated");return;}
return $.getJSON("/journal/"+journal_name+"/get/sections",function(data){var sectionId;fill_options('#section',data);sectionId=$('span[data-section-id]').attr('data-section-id');if(sectionId){select_option($('#section > option'),sectionId);$('span[data-section-id]').remove();}
$('#section').trigger("chosen:updated");return update_special_issues(journal_name,sectionId);});};update_special_issues=function(journal_name,section_id){if(section_id==null){section_id='';}
if(section_id===''){section_id=0;}
return $.getJSON("/journal/"+journal_name+"/sections/"+section_id+"/get/special_issues",function(data){var specialIssueId;fill_options('#special_issue',data);specialIssueId=$('span[data-special-issue-id]').attr('data-special-issue-id');if(specialIssueId){select_option($('#special_issue > option'),specialIssueId);$('span[data-special-issue-id]').remove();}
$('#special_issue').trigger("chosen:updated");});};journal_changed=function(){if($('#journal').length>0){var journal_name=$('#journal').val();update_sections(journal_name);}};$('#journal').change(function(){return journal_changed();});$('#section').change(function(){return update_special_issues($('#journal').val(),$(this).val());});journal_changed();div_my_query_history=$('#div-my-query-history');div_save_my_query=$('#div-save-my-query');$('#save-my-query').click(function(e){return showSaveQuery();});$('#my-query-history').click(function(e){return showHistoryQuery();});current_url=$('#currentUrl').val();$('#saveurl_description').on('keydown',(function(_this){return function(e){if((e.keyCode||e.which)===13){return $('#add-search-url').click();}};})(this));$('#add-search-url').click(function(e){var deleteurl,description;$('#repeat-warning').hide('slow');deleteurl=$(this).data('deleteurl-url');description=$('#saveurl_description').val();if(description===''){}else{$(this).val('saving');return $.get($(this).data('saveurl-url'),{url_desc:description,url:current_url},function(res){var delete_img;delete_img=div_my_query_history.data('delete-img-url');if(res==='0'){$('#saveurl_description').after('<span id="repeat-warning" style="display:block"><span style="color:red">The name has been used</span><span id="delete-warning"><img style="vertical-align:top" id="delete-warning" title="delete" src="'+delete_img+'"></span></span>');$('#delete-warning').click(function(e){return $('#repeat-warning').hide('slow');});setTimeout(function(){return $('#repeat-warning').hide('slow');},6000);return $('#add-search-url').val('save');}else{showHistoryQuery();$('#add-search-url').val('save');div_my_query_history.append('<div class="searchurl"><label class="search_refine_label"><a href="'+current_url+'" title="'+description+'">'+description.substring(0,25)+'</a></label><a style="vertical-align:top" href="javascript:void(0);" data-query-del="'+deleteurl+'?id='+parseInt(res)+'" class="savedurl-delete"><img title="delete" alt="delete" src="'+delete_img+'"></a></div>');$('.savedurl-delete:last').bind("click",function(e){var needHide;needHide=$(this).parent();return $.get($(this).data('query-del'),function(res){if(res==='1'){needHide.hide('slow');if($('.searchurl:visible').length===1){return $('#my-query-history').hide('slow');}}});});return $(".searchurl:last").fadeOut(1000).fadeIn(100);}});}});showSaveQuery=function(){$('#saveurl_description').val('');$('#repeat-warning').hide('slow');div_my_query_history.hide('slow');return div_save_my_query.toggle('slow');};showHistoryQuery=function(){$('#my-query-history').css({"display":"inline-block"});div_save_my_query.hide('slow');return div_my_query_history.toggle('slow');};$('.savedurl-delete').bind("click",function(e){var needHide;needHide=$(this).parent();return $.get($(this).data('query-del'),function(res){if(res==='1'){needHide.hide('slow');if($('.searchurl:visible').length===1){return $('#my-query-history').hide('slow');}}});});return $('#cancel-saveurl').click(function(e){div_save_my_query.hide('slow');return $('#save-my-query').css('font-weight','normal');});});}).call(this);$(function(){$("#refno").on('input propertychange',function(e){var input=$('.open-invoices-quick-search');var element=this;setTimeout(function(){var data=$(element).val().trim();var url=input.data('ajax-url')+'?term='+data;$.ajax({url:url,dataType:'json',success:function(results){if(results.length==0){return false;}
$html="<div><h6>Invoice(s) found, would you like to process?<br>";$.each(results,function(index,result){$html+='<input type="radio" name="invoice" ';if(index==0){$html+='checked="checked" ';}
$html+='value='+index+"> "+result.invoice_id+"; Amount: "+result.amount+" "+result.currency+"<br>";});$html+="</ul></h6></div>";$('<div></div>').appendTo('body').html($html).dialog({modal:true,title:'Invoice for "'+data+'"',zIndex:10000,autoOpen:true,width:'500px',resizable:false,buttons:{Yes:function(){var value=$("input:radio[name=invoice]:checked").val();if(results[value].currency=="CNY"){alert("The selected invoice is in CNY, this currency is currently not accepted for online payment,\nplease contact our Billing department at billing-cn@mdpi.com for additional information");$(this).dialog("close");$('#refno').val("");$('#payAmount').val(0);return;}
$('#refno').val(results[value].invoice_id);$('#payAmount').val(results[value].amount);globalAmount=results[value].amount;globalCurrency=results[value].currency;var exchangeRate=$('#currency_'+globalCurrency.toLowerCase()).next('label').data('apc-exchange-rate');globalAmountCHF=parseFloat(globalAmount/exchangeRate).toFixed(2);$('#payAmount').prop('readonly',true);$('#currency_'+results[value].currency.toLowerCase()).trigger("click");label=$('#currency_'+results[value].currency.toLowerCase()).next('label')
unit=label.html()
amount=results[value].amount
total=amount
$('#paymentSurcharge').html("+ #{amount} #{unit}")
$('#paymentTotal').html("#{total} #{unit}")
$('#payAmount').val(total)
$('#amount').val((total*100).toFixed(0))
$('#currency_chf').next('label').data("has-post-selected-invoice","true");$('#currency_chf').next('label').data('amount',total);$(this).dialog("close");},No:function(){$(this).dialog("close");$('#refno').val("");$('#payAmount').val(0);}},close:function(event,ui){$(this).remove();}});}});},0);})});(function(){$(function(){$('#quotation_link').click(function(e){e.preventDefault();$("#quotation_wrapper").toggleClass('hide');$(document).foundation('equalizer','reflow');});var momentAddDays=function(moment,days,includeWeekend){var counter=0;while(counter<days){moment=moment.add(1,"days");counter++;if(-1!==$.inArray(moment.format("D-M"),["1-1","25-12","26-12"])){counter--;}
else if(!includeWeekend&&-1!==$.inArray(moment.format("E"),["6","7"])){counter--;}}
return moment;}
var getDuration=function(grammar,layout,plagiarism,level){var m=moment();if(layout){m=momentAddDays(m,1,false);result="Editing will be completed on "+m.format("D MMMM");}
if(plagiarism){m=momentAddDays(m,1,false);result="Editing will be completed on "+m.format("D MMMM");}
if(grammar){switch(level){case "regular":m=momentAddDays(m,2,false);result="Editing will be completed on "+m.format("D MMMM");break;case "express":m=momentAddDays(m,1,true);result="Editing will be completed on "+m.format("D MMMM HH:mm");break;case "specialist":m=momentAddDays(m,4,false);result="Editing will be completed on "+m.format("D MMMM");break}}
return result;}
var get_price=function(word_num,has_manuscript,grammar,layout,plagiarism,level){var price=0;if(grammar){switch(level){case "regular":price+=105+word_num*0.02;break;case "express":price+=175+word_num*0.025;break;case "specialist":price+=180+word_num*0.04;break}}
if(layout){price+=75;}
if(plagiarism){price+=50;}
return price.toFixed(2);};var getEncodedParamsString=function(word_num,grammar,layout,plagiarism,level,subject)
{var params="num="+word_num;if(grammar||layout){params+="&service=";if(grammar&&layout){params+="both";}
else if(grammar){params+="english";}
else{params+="layout";}}
if(null!==level){params+="&level="+level;}
if(null!==subject){params+="&subject="+subject;}
if(plagiarism){params+="&plagiarism=1";}
return encodeURIComponent(base64_encode(params));}
var updateSubmitLink=function(submit)
{var price;var word_num=parseInt($('#word_num').val(),10);var id=$('#manuscript_id').val().match(/\d+/);var level=null;var subject=null;var grammar=$("#service-grammar").is(":checked");var layout=$("#service-layout").is(":checked");var plagiarism=$("#service-plagiarism").is(":checked");if(id){id=id[0];}
if(grammar){level=$("input:radio[name='level']:checked").val();}
if("specialist"===level){subject=$("#specialist-subject").val();}
var manuscript_id=parseInt(id,10);var susy_host=$('#susy_host').val();if(word_num>0&&(grammar||layout||plagiarism)){if(manuscript_id>0){$.get('/is_under_review/'+manuscript_id,function(data){var has_manuscript=data.exist;var price=get_price(word_num,has_manuscript,grammar,layout,plagiarism,level);$("#price").html(price);$("#duration").html(getDuration(grammar,layout,plagiarism,level));var params=getEncodedParamsString(word_num,grammar,layout,plagiarism,level,subject);if(!has_manuscript){$('#msg').html('No manuscript found!').show();$('#proceed_btn').data('href',susy_host+'user/pre_english/upload'+"?params="+params);}
else{$('#msg').html('').hide();$('#proceed_btn').data('href',susy_host+'user/manuscripts/pre_english_editing/'+data.hash_key+"?params="+params);}
if(submit){window.location.href=$('#proceed_btn').data('href');}});}
else{var price=get_price(word_num,false,grammar,layout,plagiarism,level);$("#price").html(price);$("#duration").html(getDuration(grammar,layout,plagiarism,level));var params=getEncodedParamsString(word_num,grammar,layout,plagiarism,level,subject);$('#proceed_btn').data('href',susy_host+'user/pre_english/upload'+"?params="+params);if(submit){window.location.href=$('#proceed_btn').data('href');}}}}
$("#quotation_form").submit(function(e){updateSubmitLink(false);return false;});$('#proceed_btn').click(function(e){if($(this).data('href')==='#'){e.preventDefault();}
else{updateSubmitLink(true);}});});}).call(this);(function(){var $,AbstractChosen,Chosen,SelectParser,bind=function(fn,me){return function(){return fn.apply(me,arguments);};},extend=function(child,parent){for(var key in parent){if(hasProp.call(parent,key))child[key]=parent[key];}function ctor(){this.constructor=child;}ctor.prototype=parent.prototype;child.prototype=new ctor();child.__super__=parent.prototype;return child;},hasProp={}.hasOwnProperty;SelectParser=(function(){function SelectParser(){this.options_index=0;this.parsed=[];}
SelectParser.prototype.add_node=function(child){if(child.nodeName.toUpperCase()==="OPTGROUP"){return this.add_group(child);}else{return this.add_option(child);}};SelectParser.prototype.add_group=function(group){var group_position,i,len,option,ref,results1;group_position=this.parsed.length;this.parsed.push({array_index:group_position,group:true,label:group.label,title:group.title?group.title:void 0,children:0,disabled:group.disabled,classes:group.className});ref=group.childNodes;results1=[];for(i=0,len=ref.length;i<len;i++){option=ref[i];results1.push(this.add_option(option,group_position,group.disabled));}
return results1;};SelectParser.prototype.add_option=function(option,group_position,group_disabled){if(option.nodeName.toUpperCase()==="OPTION"){if(option.text!==""){if(group_position!=null){this.parsed[group_position].children+=1;}
this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:option.value,text:option.text,html:option.innerHTML,title:option.title?option.title:void 0,selected:option.selected,disabled:group_disabled===true?group_disabled:option.disabled,group_array_index:group_position,group_label:group_position!=null?this.parsed[group_position].label:null,classes:option.className,style:option.style.cssText});}else{this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:true});}
return this.options_index+=1;}};return SelectParser;})();SelectParser.select_to_array=function(select){var child,i,len,parser,ref;parser=new SelectParser();ref=select.childNodes;for(i=0,len=ref.length;i<len;i++){child=ref[i];parser.add_node(child);}
return parser.parsed;};AbstractChosen=(function(){function AbstractChosen(form_field,options1){this.form_field=form_field;this.options=options1!=null?options1:{};this.label_click_handler=bind(this.label_click_handler,this);if(!AbstractChosen.browser_is_supported()){return;}
this.is_multiple=this.form_field.multiple;this.set_default_text();this.set_default_values();this.setup();this.set_up_html();this.register_observers();this.on_ready();}
AbstractChosen.prototype.set_default_values=function(){this.click_test_action=(function(_this){return function(evt){return _this.test_active_click(evt);};})(this);this.activate_action=(function(_this){return function(evt){return _this.activate_field(evt);};})(this);this.active_field=false;this.mouse_on_container=false;this.results_showing=false;this.result_highlighted=null;this.is_rtl=this.options.rtl||/\bchosen-rtl\b/.test(this.form_field.className);this.allow_single_deselect=(this.options.allow_single_deselect!=null)&&(this.form_field.options[0]!=null)&&this.form_field.options[0].text===""?this.options.allow_single_deselect:false;this.disable_search_threshold=this.options.disable_search_threshold||0;this.disable_search=this.options.disable_search||false;this.enable_split_word_search=this.options.enable_split_word_search!=null?this.options.enable_split_word_search:true;this.group_search=this.options.group_search!=null?this.options.group_search:true;this.search_contains=this.options.search_contains||false;this.single_backstroke_delete=this.options.single_backstroke_delete!=null?this.options.single_backstroke_delete:true;this.max_selected_options=this.options.max_selected_options||Infinity;this.inherit_select_classes=this.options.inherit_select_classes||false;this.display_selected_options=this.options.display_selected_options!=null?this.options.display_selected_options:true;this.display_disabled_options=this.options.display_disabled_options!=null?this.options.display_disabled_options:true;this.include_group_label_in_selected=this.options.include_group_label_in_selected||false;this.max_shown_results=this.options.max_shown_results||Number.POSITIVE_INFINITY;this.case_sensitive_search=this.options.case_sensitive_search||false;return this.hide_results_on_select=this.options.hide_results_on_select!=null?this.options.hide_results_on_select:true;};AbstractChosen.prototype.set_default_text=function(){if(this.form_field.getAttribute("data-placeholder")){this.default_text=this.form_field.getAttribute("data-placeholder");}else if(this.is_multiple){this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text;}else{this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text;}
this.default_text=this.escape_html(this.default_text);return this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text;};AbstractChosen.prototype.choice_label=function(item){if(this.include_group_label_in_selected&&(item.group_label!=null)){return "<b class='group-name'>"+(this.escape_html(item.group_label))+"</b>"+item.html;}else{return item.html;}};AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=true;};AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=false;};AbstractChosen.prototype.input_focus=function(evt){if(this.is_multiple){if(!this.active_field){return setTimeout(((function(_this){return function(){return _this.container_mousedown();};})(this)),50);}}else{if(!this.active_field){return this.activate_field();}}};AbstractChosen.prototype.input_blur=function(evt){if(!this.mouse_on_container){this.active_field=false;return setTimeout(((function(_this){return function(){return _this.blur_test();};})(this)),100);}};AbstractChosen.prototype.label_click_handler=function(evt){if(this.is_multiple){return this.container_mousedown(evt);}else{return this.activate_field();}};AbstractChosen.prototype.results_option_build=function(options){var content,data,data_content,i,len,ref,shown_results;content='';shown_results=0;ref=this.results_data;for(i=0,len=ref.length;i<len;i++){data=ref[i];data_content='';if(data.group){data_content=this.result_add_group(data);}else{data_content=this.result_add_option(data);}
if(data_content!==''){shown_results++;content+=data_content;}
if(options!=null?options.first:void 0){if(data.selected&&this.is_multiple){this.choice_build(data);}else if(data.selected&&!this.is_multiple){this.single_set_selected_text(this.choice_label(data));}}
if(shown_results>=this.max_shown_results){break;}}
return content;};AbstractChosen.prototype.result_add_option=function(option){var classes,option_el;if(!option.search_match){return '';}
if(!this.include_option_in_results(option)){return '';}
classes=[];if(!option.disabled&&!(option.selected&&this.is_multiple)){classes.push("active-result");}
if(option.disabled&&!(option.selected&&this.is_multiple)){classes.push("disabled-result");}
if(option.selected){classes.push("result-selected");}
if(option.group_array_index!=null){classes.push("group-option");}
if(option.classes!==""){classes.push(option.classes);}
option_el=document.createElement("li");option_el.className=classes.join(" ");if(option.style){option_el.style.cssText=option.style;}
option_el.setAttribute("data-option-array-index",option.array_index);option_el.innerHTML=option.highlighted_html||option.html;if(option.title){option_el.title=option.title;}
return this.outerHTML(option_el);};AbstractChosen.prototype.result_add_group=function(group){var classes,group_el;if(!(group.search_match||group.group_match)){return '';}
if(!(group.active_options>0)){return '';}
classes=[];classes.push("group-result");if(group.classes){classes.push(group.classes);}
group_el=document.createElement("li");group_el.className=classes.join(" ");group_el.innerHTML=group.highlighted_html||this.escape_html(group.label);if(group.title){group_el.title=group.title;}
return this.outerHTML(group_el);};AbstractChosen.prototype.results_update_field=function(){this.set_default_text();if(!this.is_multiple){this.results_reset_cleanup();}
this.result_clear_highlight();this.results_build();if(this.results_showing){return this.winnow_results();}};AbstractChosen.prototype.reset_single_select_options=function(){var i,len,ref,result,results1;ref=this.results_data;results1=[];for(i=0,len=ref.length;i<len;i++){result=ref[i];if(result.selected){results1.push(result.selected=false);}else{results1.push(void 0);}}
return results1;};AbstractChosen.prototype.results_toggle=function(){if(this.results_showing){return this.results_hide();}else{return this.results_show();}};AbstractChosen.prototype.results_search=function(evt){if(this.results_showing){return this.winnow_results();}else{return this.results_show();}};AbstractChosen.prototype.winnow_results=function(options){var escapedQuery,fix,i,len,option,prefix,query,ref,regex,results,results_group,search_match,startpos,suffix,text;this.no_results_clear();results=0;query=this.get_search_text();escapedQuery=query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");regex=this.get_search_regex(escapedQuery);ref=this.results_data;for(i=0,len=ref.length;i<len;i++){option=ref[i];option.search_match=false;results_group=null;search_match=null;option.highlighted_html='';if(this.include_option_in_results(option)){if(option.group){option.group_match=false;option.active_options=0;}
if((option.group_array_index!=null)&&this.results_data[option.group_array_index]){results_group=this.results_data[option.group_array_index];if(results_group.active_options===0&&results_group.search_match){results+=1;}
results_group.active_options+=1;}
text=option.group?option.label:option.text;if(!(option.group&&!this.group_search)){search_match=this.search_string_match(text,regex);option.search_match=search_match!=null;if(option.search_match&&!option.group){results+=1;}
if(option.search_match){if(query.length){startpos=search_match.index;prefix=text.slice(0,startpos);fix=text.slice(startpos,startpos+query.length);suffix=text.slice(startpos+query.length);option.highlighted_html=(this.escape_html(prefix))+"<em>"+(this.escape_html(fix))+"</em>"+(this.escape_html(suffix));}
if(results_group!=null){results_group.group_match=true;}}else if((option.group_array_index!=null)&&this.results_data[option.group_array_index].search_match){option.search_match=true;}}}}
this.result_clear_highlight();if(results<1&&query.length){this.update_results_content("");return this.no_results(query);}else{this.update_results_content(this.results_option_build());if(!(options!=null?options.skip_highlight:void 0)){return this.winnow_results_set_highlight();}}};AbstractChosen.prototype.get_search_regex=function(escaped_search_string){var regex_flag,regex_string;regex_string=this.search_contains?escaped_search_string:"(^|\\s|\\b)"+escaped_search_string+"[^\\s]*";if(!(this.enable_split_word_search||this.search_contains)){regex_string="^"+regex_string;}
regex_flag=this.case_sensitive_search?"":"i";return new RegExp(regex_string,regex_flag);};AbstractChosen.prototype.search_string_match=function(search_string,regex){var match;match=regex.exec(search_string);if(!this.search_contains&&(match!=null?match[1]:void 0)){match.index+=1;}
return match;};AbstractChosen.prototype.choices_count=function(){var i,len,option,ref;if(this.selected_option_count!=null){return this.selected_option_count;}
this.selected_option_count=0;ref=this.form_field.options;for(i=0,len=ref.length;i<len;i++){option=ref[i];if(option.selected){this.selected_option_count+=1;}}
return this.selected_option_count;};AbstractChosen.prototype.choices_click=function(evt){evt.preventDefault();this.activate_field();if(!(this.results_showing||this.is_disabled)){return this.results_show();}};AbstractChosen.prototype.keydown_checker=function(evt){var ref,stroke;stroke=(ref=evt.which)!=null?ref:evt.keyCode;this.search_field_scale();if(stroke!==8&&this.pending_backstroke){this.clear_backstroke();}
switch(stroke){case 8:this.backstroke_length=this.get_search_field_value().length;break;case 9:if(this.results_showing&&!this.is_multiple){this.result_select(evt);}
this.mouse_on_container=false;break;case 13:if(this.results_showing){evt.preventDefault();}
break;case 27:if(this.results_showing){evt.preventDefault();}
break;case 32:if(this.disable_search){evt.preventDefault();}
break;case 38:evt.preventDefault();this.keyup_arrow();break;case 40:evt.preventDefault();this.keydown_arrow();break;}};AbstractChosen.prototype.keyup_checker=function(evt){var ref,stroke;stroke=(ref=evt.which)!=null?ref:evt.keyCode;this.search_field_scale();switch(stroke){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0){this.keydown_backstroke();}else if(!this.pending_backstroke){this.result_clear_highlight();this.results_search();}
break;case 13:evt.preventDefault();if(this.results_showing){this.result_select(evt);}
break;case 27:if(this.results_showing){this.results_hide();}
break;case 9:case 16:case 17:case 18:case 38:case 40:case 91:break;default:this.results_search();break;}};AbstractChosen.prototype.clipboard_event_checker=function(evt){if(this.is_disabled){return;}
return setTimeout(((function(_this){return function(){return _this.results_search();};})(this)),50);};AbstractChosen.prototype.container_width=function(){if(this.options.width!=null){return this.options.width;}else{return this.form_field.offsetWidth+"px";}};AbstractChosen.prototype.include_option_in_results=function(option){if(this.is_multiple&&(!this.display_selected_options&&option.selected)){return false;}
if(!this.display_disabled_options&&option.disabled){return false;}
if(option.empty){return false;}
return true;};AbstractChosen.prototype.search_results_touchstart=function(evt){this.touch_started=true;return this.search_results_mouseover(evt);};AbstractChosen.prototype.search_results_touchmove=function(evt){this.touch_started=false;return this.search_results_mouseout(evt);};AbstractChosen.prototype.search_results_touchend=function(evt){if(this.touch_started){return this.search_results_mouseup(evt);}};AbstractChosen.prototype.outerHTML=function(element){var tmp;if(element.outerHTML){return element.outerHTML;}
tmp=document.createElement("div");tmp.appendChild(element);return tmp.innerHTML;};AbstractChosen.prototype.get_single_html=function(){return "<a class=\"chosen-single chosen-default\">\n  <span>"+this.default_text+"</span>\n  <div><b></b></div>\n</a>\n<div class=\"chosen-drop\">\n  <div class=\"chosen-search\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" />\n  </div>\n  <ul class=\"chosen-results\"></ul>\n</div>";};AbstractChosen.prototype.get_multi_html=function(){return "<ul class=\"chosen-choices\">\n  <li class=\"search-field\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" value=\""+this.default_text+"\" />\n  </li>\n</ul>\n<div class=\"chosen-drop\">\n  <ul class=\"chosen-results\"></ul>\n</div>";};AbstractChosen.prototype.get_no_results_html=function(terms){return "<li class=\"no-results\">\n  "+this.results_none_found+" <span>"+(this.escape_html(terms))+"</span>\n</li>";};AbstractChosen.browser_is_supported=function(){if("Microsoft Internet Explorer"===window.navigator.appName){return document.documentMode>=8;}
if(/iP(od|hone)/i.test(window.navigator.userAgent)||/IEMobile/i.test(window.navigator.userAgent)||/Windows Phone/i.test(window.navigator.userAgent)||/BlackBerry/i.test(window.navigator.userAgent)||/BB10/i.test(window.navigator.userAgent)||/Android.*Mobile/i.test(window.navigator.userAgent)){return false;}
return true;};AbstractChosen.default_multiple_text="Select Some Options";AbstractChosen.default_single_text="Select an Option";AbstractChosen.default_no_result_text="No results match";return AbstractChosen;})();$=jQuery;$.fn.extend({chosen:function(options){if(!AbstractChosen.browser_is_supported()){return this;}
return this.each(function(input_field){var $this,chosen;$this=$(this);chosen=$this.data('chosen');if(options==='destroy'){if(chosen instanceof Chosen){chosen.destroy();}
return;}
if(!(chosen instanceof Chosen)){$this.data('chosen',new Chosen(this,options));}});}});Chosen=(function(superClass){extend(Chosen,superClass);function Chosen(){return Chosen.__super__.constructor.apply(this,arguments);}
Chosen.prototype.setup=function(){this.form_field_jq=$(this.form_field);return this.current_selectedIndex=this.form_field.selectedIndex;};Chosen.prototype.set_up_html=function(){var container_classes,container_props;container_classes=["chosen-container"];container_classes.push("chosen-container-"+(this.is_multiple?"multi":"single"));if(this.inherit_select_classes&&this.form_field.className){container_classes.push(this.form_field.className);}
if(this.is_rtl){container_classes.push("chosen-rtl");}
container_props={'class':container_classes.join(' '),'title':this.form_field.title};if(this.form_field.id.length){container_props.id=this.form_field.id.replace(/[^\w]/g,'_')+"_chosen";}
this.container=$("<div />",container_props);this.container.width(this.container_width());if(this.is_multiple){this.container.html(this.get_multi_html());}else{this.container.html(this.get_single_html());}
this.form_field_jq.hide().after(this.container);this.dropdown=this.container.find('div.chosen-drop').first();this.search_field=this.container.find('input').first();this.search_results=this.container.find('ul.chosen-results').first();this.search_field_scale();this.search_no_results=this.container.find('li.no-results').first();if(this.is_multiple){this.search_choices=this.container.find('ul.chosen-choices').first();this.search_container=this.container.find('li.search-field').first();}else{this.search_container=this.container.find('div.chosen-search').first();this.selected_item=this.container.find('.chosen-single').first();}
this.results_build();this.set_tab_index();return this.set_label_behavior();};Chosen.prototype.on_ready=function(){return this.form_field_jq.trigger("chosen:ready",{chosen:this});};Chosen.prototype.register_observers=function(){this.container.on('touchstart.chosen',(function(_this){return function(evt){_this.container_mousedown(evt);};})(this));this.container.on('touchend.chosen',(function(_this){return function(evt){_this.container_mouseup(evt);};})(this));this.container.on('mousedown.chosen',(function(_this){return function(evt){_this.container_mousedown(evt);};})(this));this.container.on('mouseup.chosen',(function(_this){return function(evt){_this.container_mouseup(evt);};})(this));this.container.on('mouseenter.chosen',(function(_this){return function(evt){_this.mouse_enter(evt);};})(this));this.container.on('mouseleave.chosen',(function(_this){return function(evt){_this.mouse_leave(evt);};})(this));this.search_results.on('mouseup.chosen',(function(_this){return function(evt){_this.search_results_mouseup(evt);};})(this));this.search_results.on('mouseover.chosen',(function(_this){return function(evt){_this.search_results_mouseover(evt);};})(this));this.search_results.on('mouseout.chosen',(function(_this){return function(evt){_this.search_results_mouseout(evt);};})(this));this.search_results.on('mousewheel.chosen DOMMouseScroll.chosen',(function(_this){return function(evt){_this.search_results_mousewheel(evt);};})(this));this.search_results.on('touchstart.chosen',(function(_this){return function(evt){_this.search_results_touchstart(evt);};})(this));this.search_results.on('touchmove.chosen',(function(_this){return function(evt){_this.search_results_touchmove(evt);};})(this));this.search_results.on('touchend.chosen',(function(_this){return function(evt){_this.search_results_touchend(evt);};})(this));this.form_field_jq.on("chosen:updated.chosen",(function(_this){return function(evt){_this.results_update_field(evt);};})(this));this.form_field_jq.on("chosen:activate.chosen",(function(_this){return function(evt){_this.activate_field(evt);};})(this));this.form_field_jq.on("chosen:open.chosen",(function(_this){return function(evt){_this.container_mousedown(evt);};})(this));this.form_field_jq.on("chosen:close.chosen",(function(_this){return function(evt){_this.close_field(evt);};})(this));this.search_field.on('blur.chosen',(function(_this){return function(evt){_this.input_blur(evt);};})(this));this.search_field.on('keyup.chosen',(function(_this){return function(evt){_this.keyup_checker(evt);};})(this));this.search_field.on('keydown.chosen',(function(_this){return function(evt){_this.keydown_checker(evt);};})(this));this.search_field.on('focus.chosen',(function(_this){return function(evt){_this.input_focus(evt);};})(this));this.search_field.on('cut.chosen',(function(_this){return function(evt){_this.clipboard_event_checker(evt);};})(this));this.search_field.on('paste.chosen',(function(_this){return function(evt){_this.clipboard_event_checker(evt);};})(this));if(this.is_multiple){return this.search_choices.on('click.chosen',(function(_this){return function(evt){_this.choices_click(evt);};})(this));}else{return this.container.on('click.chosen',function(evt){evt.preventDefault();});}};Chosen.prototype.destroy=function(){$(this.container[0].ownerDocument).off('click.chosen',this.click_test_action);if(this.form_field_label.length>0){this.form_field_label.off('click.chosen');}
if(this.search_field[0].tabIndex){this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex;}
this.container.remove();this.form_field_jq.removeData('chosen');return this.form_field_jq.show();};Chosen.prototype.search_field_disabled=function(){this.is_disabled=this.form_field.disabled||this.form_field_jq.parents('fieldset').is(':disabled');this.container.toggleClass('chosen-disabled',this.is_disabled);this.search_field[0].disabled=this.is_disabled;if(!this.is_multiple){this.selected_item.off('focus.chosen',this.activate_field);}
if(this.is_disabled){return this.close_field();}else if(!this.is_multiple){return this.selected_item.on('focus.chosen',this.activate_field);}};Chosen.prototype.container_mousedown=function(evt){var ref;if(this.is_disabled){return;}
if(evt&&((ref=evt.type)==='mousedown'||ref==='touchstart')&&!this.results_showing){evt.preventDefault();}
if(!((evt!=null)&&($(evt.target)).hasClass("search-choice-close"))){if(!this.active_field){if(this.is_multiple){this.search_field.val("");}
$(this.container[0].ownerDocument).on('click.chosen',this.click_test_action);this.results_show();}else if(!this.is_multiple&&evt&&(($(evt.target)[0]===this.selected_item[0])||$(evt.target).parents("a.chosen-single").length)){evt.preventDefault();this.results_toggle();}
return this.activate_field();}};Chosen.prototype.container_mouseup=function(evt){if(evt.target.nodeName==="ABBR"&&!this.is_disabled){return this.results_reset(evt);}};Chosen.prototype.search_results_mousewheel=function(evt){var delta;if(evt.originalEvent){delta=evt.originalEvent.deltaY||-evt.originalEvent.wheelDelta||evt.originalEvent.detail;}
if(delta!=null){evt.preventDefault();if(evt.type==='DOMMouseScroll'){delta=delta*40;}
return this.search_results.scrollTop(delta+this.search_results.scrollTop());}};Chosen.prototype.blur_test=function(evt){if(!this.active_field&&this.container.hasClass("chosen-container-active")){return this.close_field();}};Chosen.prototype.close_field=function(){$(this.container[0].ownerDocument).off("click.chosen",this.click_test_action);this.active_field=false;this.results_hide();this.container.removeClass("chosen-container-active");this.clear_backstroke();this.show_search_field_default();this.search_field_scale();return this.search_field.blur();};Chosen.prototype.activate_field=function(){if(this.is_disabled){return;}
this.container.addClass("chosen-container-active");this.active_field=true;this.search_field.val(this.search_field.val());return this.search_field.focus();};Chosen.prototype.test_active_click=function(evt){var active_container;active_container=$(evt.target).closest('.chosen-container');if(active_container.length&&this.container[0]===active_container[0]){return this.active_field=true;}else{return this.close_field();}};Chosen.prototype.results_build=function(){this.parsing=true;this.selected_option_count=null;this.results_data=SelectParser.select_to_array(this.form_field);if(this.is_multiple){this.search_choices.find("li.search-choice").remove();}else{this.single_set_selected_text();if(this.disable_search||this.form_field.options.length<=this.disable_search_threshold){this.search_field[0].readOnly=true;this.container.addClass("chosen-container-single-nosearch");}else{this.search_field[0].readOnly=false;this.container.removeClass("chosen-container-single-nosearch");}}
this.update_results_content(this.results_option_build({first:true}));this.search_field_disabled();this.show_search_field_default();this.search_field_scale();return this.parsing=false;};Chosen.prototype.result_do_highlight=function(el){var high_bottom,high_top,maxHeight,visible_bottom,visible_top;if(el.length){this.result_clear_highlight();this.result_highlight=el;this.result_highlight.addClass("highlighted");maxHeight=parseInt(this.search_results.css("maxHeight"),10);visible_top=this.search_results.scrollTop();visible_bottom=maxHeight+visible_top;high_top=this.result_highlight.position().top+this.search_results.scrollTop();high_bottom=high_top+this.result_highlight.outerHeight();if(high_bottom>=visible_bottom){return this.search_results.scrollTop((high_bottom-maxHeight)>0?high_bottom-maxHeight:0);}else if(high_top<visible_top){return this.search_results.scrollTop(high_top);}}};Chosen.prototype.result_clear_highlight=function(){if(this.result_highlight){this.result_highlight.removeClass("highlighted");}
return this.result_highlight=null;};Chosen.prototype.results_show=function(){if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field_jq.trigger("chosen:maxselected",{chosen:this});return false;}
this.container.addClass("chosen-with-drop");this.results_showing=true;this.search_field.focus();this.search_field.val(this.get_search_field_value());this.winnow_results();return this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this});};Chosen.prototype.update_results_content=function(content){return this.search_results.html(content);};Chosen.prototype.results_hide=function(){if(this.results_showing){this.result_clear_highlight();this.container.removeClass("chosen-with-drop");this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this});}
return this.results_showing=false;};Chosen.prototype.set_tab_index=function(el){var ti;if(this.form_field.tabIndex){ti=this.form_field.tabIndex;this.form_field.tabIndex=-1;return this.search_field[0].tabIndex=ti;}};Chosen.prototype.set_label_behavior=function(){this.form_field_label=this.form_field_jq.parents("label");if(!this.form_field_label.length&&this.form_field.id.length){this.form_field_label=$("label[for='"+this.form_field.id+"']");}
if(this.form_field_label.length>0){return this.form_field_label.on('click.chosen',this.label_click_handler);}};Chosen.prototype.show_search_field_default=function(){if(this.is_multiple&&this.choices_count()<1&&!this.active_field){this.search_field.val(this.default_text);return this.search_field.addClass("default");}else{this.search_field.val("");return this.search_field.removeClass("default");}};Chosen.prototype.search_results_mouseup=function(evt){var target;target=$(evt.target).hasClass("active-result")?$(evt.target):$(evt.target).parents(".active-result").first();if(target.length){this.result_highlight=target;this.result_select(evt);return this.search_field.focus();}};Chosen.prototype.search_results_mouseover=function(evt){var target;target=$(evt.target).hasClass("active-result")?$(evt.target):$(evt.target).parents(".active-result").first();if(target){return this.result_do_highlight(target);}};Chosen.prototype.search_results_mouseout=function(evt){if($(evt.target).hasClass("active-result")||$(evt.target).parents('.active-result').first()){return this.result_clear_highlight();}};Chosen.prototype.choice_build=function(item){var choice,close_link;choice=$('<li />',{"class":"search-choice"}).html("<span>"+(this.choice_label(item))+"</span>");if(item.disabled){choice.addClass('search-choice-disabled');}else{close_link=$('<a />',{"class":'search-choice-close','data-option-array-index':item.array_index});close_link.on('click.chosen',(function(_this){return function(evt){return _this.choice_destroy_link_click(evt);};})(this));choice.append(close_link);}
return this.search_container.before(choice);};Chosen.prototype.choice_destroy_link_click=function(evt){evt.preventDefault();evt.stopPropagation();if(!this.is_disabled){return this.choice_destroy($(evt.target));}};Chosen.prototype.choice_destroy=function(link){if(this.result_deselect(link[0].getAttribute("data-option-array-index"))){if(this.active_field){this.search_field.focus();}else{this.show_search_field_default();}
if(this.is_multiple&&this.choices_count()>0&&this.get_search_field_value().length<1){this.results_hide();}
link.parents('li').first().remove();return this.search_field_scale();}};Chosen.prototype.results_reset=function(){this.reset_single_select_options();this.form_field.options[0].selected=true;this.single_set_selected_text();this.show_search_field_default();this.results_reset_cleanup();this.trigger_form_field_change();if(this.active_field){return this.results_hide();}};Chosen.prototype.results_reset_cleanup=function(){this.current_selectedIndex=this.form_field.selectedIndex;return this.selected_item.find("abbr").remove();};Chosen.prototype.result_select=function(evt){var high,item;if(this.result_highlight){high=this.result_highlight;this.result_clear_highlight();if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field_jq.trigger("chosen:maxselected",{chosen:this});return false;}
if(this.is_multiple){high.removeClass("active-result");}else{this.reset_single_select_options();}
high.addClass("result-selected");item=this.results_data[high[0].getAttribute("data-option-array-index")];item.selected=true;this.form_field.options[item.options_index].selected=true;this.selected_option_count=null;if(this.is_multiple){this.choice_build(item);}else{this.single_set_selected_text(this.choice_label(item));}
if(this.is_multiple&&(!this.hide_results_on_select||(evt.metaKey||evt.ctrlKey))){if(evt.metaKey||evt.ctrlKey){this.winnow_results({skip_highlight:true});}else{this.search_field.val("");this.winnow_results();}}else{this.results_hide();this.show_search_field_default();}
if(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex){this.trigger_form_field_change({selected:this.form_field.options[item.options_index].value});}
this.current_selectedIndex=this.form_field.selectedIndex;evt.preventDefault();return this.search_field_scale();}};Chosen.prototype.single_set_selected_text=function(text){if(text==null){text=this.default_text;}
if(text===this.default_text){this.selected_item.addClass("chosen-default");}else{this.single_deselect_control_build();this.selected_item.removeClass("chosen-default");}
return this.selected_item.find("span").html(text);};Chosen.prototype.result_deselect=function(pos){var result_data;result_data=this.results_data[pos];if(!this.form_field.options[result_data.options_index].disabled){result_data.selected=false;this.form_field.options[result_data.options_index].selected=false;this.selected_option_count=null;this.result_clear_highlight();if(this.results_showing){this.winnow_results();}
this.trigger_form_field_change({deselected:this.form_field.options[result_data.options_index].value});this.search_field_scale();return true;}else{return false;}};Chosen.prototype.single_deselect_control_build=function(){if(!this.allow_single_deselect){return;}
if(!this.selected_item.find("abbr").length){this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");}
return this.selected_item.addClass("chosen-single-with-deselect");};Chosen.prototype.get_search_field_value=function(){return this.search_field.val();};Chosen.prototype.get_search_text=function(){return $.trim(this.get_search_field_value());};Chosen.prototype.escape_html=function(text){return $('<div/>').text(text).html();};Chosen.prototype.winnow_results_set_highlight=function(){var do_high,selected_results;selected_results=!this.is_multiple?this.search_results.find(".result-selected.active-result"):[];do_high=selected_results.length?selected_results.first():this.search_results.find(".active-result").first();if(do_high!=null){return this.result_do_highlight(do_high);}};Chosen.prototype.no_results=function(terms){var no_results_html;no_results_html=this.get_no_results_html(terms);this.search_results.append(no_results_html);return this.form_field_jq.trigger("chosen:no_results",{chosen:this});};Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove();};Chosen.prototype.keydown_arrow=function(){var next_sib;if(this.results_showing&&this.result_highlight){next_sib=this.result_highlight.nextAll("li.active-result").first();if(next_sib){return this.result_do_highlight(next_sib);}}else{return this.results_show();}};Chosen.prototype.keyup_arrow=function(){var prev_sibs;if(!this.results_showing&&!this.is_multiple){return this.results_show();}else if(this.result_highlight){prev_sibs=this.result_highlight.prevAll("li.active-result");if(prev_sibs.length){return this.result_do_highlight(prev_sibs.first());}else{if(this.choices_count()>0){this.results_hide();}
return this.result_clear_highlight();}}};Chosen.prototype.keydown_backstroke=function(){var next_available_destroy;if(this.pending_backstroke){this.choice_destroy(this.pending_backstroke.find("a").first());return this.clear_backstroke();}else{next_available_destroy=this.search_container.siblings("li.search-choice").last();if(next_available_destroy.length&&!next_available_destroy.hasClass("search-choice-disabled")){this.pending_backstroke=next_available_destroy;if(this.single_backstroke_delete){return this.keydown_backstroke();}else{return this.pending_backstroke.addClass("search-choice-focus");}}}};Chosen.prototype.clear_backstroke=function(){if(this.pending_backstroke){this.pending_backstroke.removeClass("search-choice-focus");}
return this.pending_backstroke=null;};Chosen.prototype.search_field_scale=function(){var div,i,len,style,style_block,styles,width;if(!this.is_multiple){return;}
style_block={position:'absolute',left:'-1000px',top:'-1000px',display:'none',whiteSpace:'pre'};styles=['fontSize','fontStyle','fontWeight','fontFamily','lineHeight','textTransform','letterSpacing'];for(i=0,len=styles.length;i<len;i++){style=styles[i];style_block[style]=this.search_field.css(style);}
div=$('<div />').css(style_block);div.text(this.get_search_field_value());$('body').append(div);width=div.width()+25;div.remove();if(this.container.is(':visible')){width=Math.min(this.container.outerWidth()-10,width);}
return this.search_field.width(width);};Chosen.prototype.trigger_form_field_change=function(extra){this.form_field_jq.trigger("input",extra);return this.form_field_jq.trigger("change",extra);};return Chosen;})(AbstractChosen);}).call(this);