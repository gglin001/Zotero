;;function relatedArticlesWidgetCallback(n){var e=0,l={};this.initialize=function(e){var t=n.params.rows;e.ssrShorNameJournalId=JSON.parse(e.ssrShorNameJournalId),0<e.rowsNumber?t=e.rowsNumber:e.rowsNumber=t,n.params.rows=2*t+1,n.params.showConsoleLog=e.debugMode,n.params.displayElementId=e.relatedArticlesId,n.params.returnFields.push("PublicationDate"),n.params.returnFields.push("AssetProduct");var r=[];for(var a in e.ssrShorNameJournalId){var l=a,i=e.ssrShorNameJournalId[a];null!=i&&""!==i&&(l+=":"+i.Item2),r.push(l)}var s=r.join();return""!==s&&(n.params.searchCollection=s,!0)},this.showLoader=function(e){document.querySelector("#"+e.relatedArticlesId+".related-articles-widget #related-articles-widget-loader").classList.toggle("hidden")},this.showRelatedArticlesMessage=function(e){e.showRelatedArticlesMessage&&(document.querySelector("#"+e.relatedArticlesId+".related-articles-widget #related-articles-widget-list").classList.toggle("hidden"),document.querySelector("#"+e.relatedArticlesId+".related-articles-widget #related-articles-widget-button").classList.toggle("hidden"),document.querySelector("#"+e.relatedArticlesId+".related-articles-widget #related-articles-widget-message").classList.toggle("hidden"))},this.generateQueryString=function(){for(var e="",t=document.querySelectorAll(n.params.querySelector),r=0;r<t.length;r++){e+=" "+(t[r].innerText||t[r].textContent||t[r].content||"").split("|")[0].split(" - ")[0].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim()}return e.trim()},this.loadWidget=function(){e>=relatedArticlesWidgetParamsArray.length||(l=relatedArticlesWidgetParamsArray[e++],initialize(l)?(l.queryString=generateQueryString(n),""!==l.queryString&&showLoader(l),n.loadWidget({queryString:l.queryString})):loadWidget(this,relatedArticlesWidgetParamsArray,n))},n.preRender=function(e){if(e.Documents&&0!==e.Documents.length){e.Documents.splice(0,1),e.SearchPath=l.searchPath+l.queryString,e.RelatedArticlesId=l.relatedArticlesId;for(var t=0;t<e.Documents.length;t++){if(e.Documents[t].RelatedArticleImageUrl=l.imageHandlerUrl+"/"+e.Documents[t].AccessionNumber+".jpg",e.Documents[t].SubTitle&&0<e.Documents[t].SubTitle.length){var r=e.Documents[t].Title.concat(e.Documents[t].SubTitle);e.Documents[t].Title=[r.join(": ")]}e.Documents[t].PublicationTitle[0]=e.Documents[t].PublicationTitle[0].toUpperCase(),e.Documents[t].RelatedArticleDisplayClass=t>=l.rowsNumber?"hidden":"",e.Documents[t].RelatedArticlesJournalId=l.ssrShorNameJournalId[e.Documents[t].AssetProduct[0].toLowerCase()].Item1;var a=new Date(e.Documents[t].PublicationDate);e.Documents[t].PublicationDateMonthYear=a.toLocaleDateString("en-US",{month:"long",year:"numeric"})}}else l.showRelatedArticlesMessage=!0},n.postRender=function(e){showRelatedArticlesMessage(l),loadWidget()},relatedArticlesWidgetParamsArray&&loadWidget()}function relatedArticlesWidgetButtonClick(e,t,r){var a=document.querySelectorAll("#"+t+".related-articles-widget ul li.hidden");if(0<a.length){for(var l=0;l<a.length;l++)a[l].classList.toggle("hidden");e.innerHTML="View all related articles"}else window.location.href=window.location.origin+"/"+r}function relatedArticlesWidgetTitleClick(e){if(e&&"function"==typeof DualAccess){var t=new DualAccess;t.SendCounterDataRequestByAn(t.EventTypes.Investigation,t.ContentTypes.RelatedArticle,e)}}