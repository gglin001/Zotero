/*
 * RelatedOvid widget
 * (c) Wolters Kluwer Health 2016-2017
 */
var RelatedOvidWidget = (function () {

    var params = {
        showConsoleLog: /^(.*;)?\s*widget_showConsoleLog\s*=/.test(document.cookie),
        defaultSearchCollection: "medline",
        returnFields: ["Title", "SubTitle", "PublicationTitle", "PublicationTitleAbbreviation", "PublicationDateYear", "Volume", "Issue", "PageRange", "DOI", "AccessionNumber", "PMID", "OvidUrl"]
    };

    init();

    function init() {
        if (validateParams()) {
            //we need the mustache lib
            if (typeof Mustache !== "undefined") {
                loadWidgetConfig();
            } else {
                loadScript(params.widgetBaseUrl + "/lib/mustache-2.3.0.min.js", loadWidgetConfig);
            }
        }
    }

    function validateParams() {
        //get widget url parameters
        var myScript = null;
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf("related-ovid-widget.js") > -1) {
                myScript = scripts[i];
                break;
            }
        }

        if (!myScript) {
            console.error("related-ovid-widget.js script not found in DOM");
            return false;
        }

        var queryString = myScript.src.replace(/^[^\?]+\??/, "");
        var qparams = parseQueryString(queryString);

        params.widgetBaseUrl = myScript.src.substring(0, myScript.src.lastIndexOf("/"));
        params.appServicesUrl = params.widgetBaseUrl.replace("/widgets", "");
        params.widgetId = qparams["wid"];
        params.callback = qparams["callback"];

        if (!params.widgetId) {
            console.error("Parameter 'wid' should be available");
            return false;
        }
        return true;
    }

    function loadWidgetConfig() {
        if (typeof wkVars === "undefined") {
            loadScript(params.appServicesUrl + "/api/widget/vars", loadWidgetConfig);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', wkVars.regentBrowseService + "/Nodes('" + params.widgetId + "')");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('productid', wkVars.cpid);
            xhr.setRequestHeader('accept', 'application/json');
            xhr.setRequestHeader('securitytoken', wkVars.token);
            xhr.onload = function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    setWidgetParams(generateProperties(JSON.parse(xhr.responseText)));
                }
            };
            xhr.send();
        }
    }

    function setWidgetParams(widgetConfig) {
        params.rows = widgetConfig.properties.rows;
        params.querySelector = widgetConfig.properties.inputSelectors;
        params.displayElementId = widgetConfig.properties.displayElementId;
        params.template = widgetConfig.properties.template;
        params.client = widgetConfig.properties.client;
        params.searchCollection = widgetConfig.properties.searchCollection ? widgetConfig.properties.searchCollection : params.defaultSearchCollection;
        
        if (params.callback) {
            window[params.callback](RelatedOvidWidget);
        } else {
            loadWidget();
        }
    }

    /**
     * @description
     * Loads the widget (i.e. looks for content on a page and shows the related articles)
     *
     * @param {Object} options                  Optional options object containing overriding queryString or filterQueries
     * @param {String} options.queryString      Optional querystring (overrides default searching for content in DOM)
     * @param {String[]} options.filterQueries  Optional array of Solr filter queries
     */
    function loadWidget(options) {
        options = options || {};
        params.displayElement = document.getElementById(params.displayElementId);

        //if no querystring parameter was passed, look in DOM-elements of this page
        if (options.queryString === undefined) {
            options.queryString = "";
            var qElms = document.querySelectorAll(params.querySelector);
            for (var i = 0; i < qElms.length; i++) {
                var qElm = qElms[i];
                var text = (qElm.innerText || qElm.textContent || "").split("|")[0].split(" - ")[0].trim();
                //strip punctuation
                text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                if (params.showConsoleLog) console.log("found term on page: ", text);
                options.queryString += " " + text;
            }
        }
        options.queryString = options.queryString.trim();
        if (params.showConsoleLog) console.log("queryString: ", options.queryString);

        if (options.queryString) {
            searchRelated(options.queryString, options.filterQueries);
        } else {
            if (params.showConsoleLog) console.warn("no search terms found on page");
        }
    }

    function searchRelated(queryString, filterQueries) {
        var searchAPI = params.appServicesUrl + "/api/osa/search/Search_ExecuteQuery";
        if (params.showConsoleLog) console.log("Using OSA endpoint", searchAPI);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", searchAPI);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("accept", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                var searchResults = JSON.parse(xhr.responseText);
                params.previousSearchResults = searchResults;
                displayResults(searchResults, queryString);
            }
        };

        //note: only filter for asset_ofType:article in case of Journals collection
        var request = {
            "request": {
                "CollectionId": params.searchCollection,
                "QueryString": queryString,
                "Query": {
                    "ResultSpec": {
                        "Rows": params.rows,
                        "ReturnFields": params.returnFields
                    },
                    "FilterSpecs": []
                }
            }
        };

        //keep track to see if custom filter was added containing string 'asset_ofType'
        var assetOfTypeFilterExists = false; 
  
        if (filterQueries && filterQueries.length) {
            for (var i = 0; i < filterQueries.length; i++) {
                if (filterQueries[i].indexOf('AssetType') >= 0) {
                    assetOfTypeFilterExists = true;
                }
                request.request.Query.FilterSpecs.push({
                    "FilterType": "Query",
                    "FilterByQuery": {
                        "QueryString": filterQueries[i]
                    }
                });
            }
        }

        if (params.searchCollection !== 'medline' && !assetOfTypeFilterExists) {
            request.request.Query.FilterSpecs.push({
                "FilterType": "Query",
                "FilterByQuery": {
                    "QueryString": "AssetType:\"article\""
                }
            });
        }

        var jsonRequest = JSON.stringify(request);

        if ((jsonRequest === params.previousJsonRequest) && params.previousSearchResults) {
            //use cached results when jsonRequest same as previous one
            if (params.showConsoleLog) console.log("Using cached results for OSA JSON request: " + jsonRequest);
            displayResults(params.previousSearchResults, queryString);
        }
        else {
            params.previousJsonRequest = jsonRequest;
            if (params.showConsoleLog) console.log("OSA JSON request: " + jsonRequest);
            xhr.send(jsonRequest);
        }
    }

    function displayResults(searchResponse, queryString) {
        var searchResults = searchResponse.Results[0];

        //enriched properties
        searchResults.QueryString = encodeURIComponent(queryString);
        searchResults.Client = params.client;
        searchResults.WidgetBaseUrl = params.widgetBaseUrl;
        searchResults.HostPageUrl = encodeURIComponent(window.location.href);
        searchResults.WidgetTrackingPage = wkVars.widgetTrackingPage;

        //flatten document fields (needed for mustach template)
        for (var i = 0; i < searchResults.Documents.length; i++) {
            var doc = searchResults.Documents[i];
            var docProps = doc.DocumentProperties;
            for (var j = 0; j < docProps.length; j++) {
                doc[docProps[j].FieldName] = docProps[j].FieldValue;
            }
        }

        //call preRender function if available. This allows you to inspect/modify/filter the searchResults
        if (typeof RelatedOvidWidget.preRender === "function") RelatedOvidWidget.preRender(searchResults);

        //call custom render function if available
        if (typeof RelatedOvidWidget.render === "function") {
            RelatedOvidWidget.render(searchResults, params.displayElement);
        } else {
            //use the Mustache templating engine for rendering (this is the default)
            params.displayElement.innerHTML = Mustache.render(params.template, searchResults);
        }
        if (typeof RelatedOvidWidget.postRender === "function") RelatedOvidWidget.postRender(params.displayElement);
    }

    function parseQueryString(queryString) {
        var qparams = {};
        if (!queryString) return qparams; // return empty object
        queryString = queryString.replace(/^\?/, "");
        var pairs = queryString.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var keyVal = pairs[i].split("=");
            if (!keyVal || keyVal.length !== 2) continue; //expecting key=value
            var key = keyVal[0];
            var val = decodeURIComponent(keyVal[1]);
            qparams[key] = val;
        }
        return qparams;
    }

    function generateProperties(item) {
        item.properties = item.properties || {};

        if (!item.Metadata) return item;

        for (var i = 0; i < item.Metadata.length; i++) {
            item.properties[item.Metadata[i].Key] = item.Metadata[i].Value;
        }
        return item;
    }

    function loadScript(url, callback) {
        // Adding the script tag to the head
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        // Bind the event to the callback function (cross browser)
        script.onreadystatechange = callback;
        script.onload = callback;
        // fire the loading
        head.appendChild(script);
    }

    return {
        params: params,
        loadWidget: loadWidget,
        preRender: null,
        render: null,
        postRender: null
    };
})();