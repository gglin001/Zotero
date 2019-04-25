_satellite.pageBottom = function() {
    if (window.pageData && window.pageData_isLoaded) {
        _satellite.initialized && (_satellite.pageBottomFired = !0, _satellite.firePageLoadEvent("pagebottom"))
    }
}

var pageDataTracker = {
    eventCookieName: 'eventTrack',
    debugCookie: 'els-aa-debugmode',
    debugCounter: 1,
    warnings: [],
    measures: {},
    timeoffset: 0

    ,trackPageLoad: function(data) {
        if (window.pageData && ((pageData.page && pageData.page.noTracking == 'true') || window.pageData_isLoaded)) {
            return false;
        }

        if (data) {
            window.pageData = data;
        }

        this.initWarnings();
        if(!(window.pageData && pageData.page && pageData.page.name)) {
            console.error('pageDataTracker.trackPageLoad() called without pageData.page.name being defined!');
            return;
        }

        this.processIdPlusData(window.pageData);

        if(document.readyState !== 'loading') {
            this.warnings.push('dtm2');
        } else {
            if(window.pageData && pageData.page && !pageData.page.loadTime) {
                pageData.page.loadTime = performance ? Math.round((performance.now())).toString() : '';
            }
        }

        if(window.pageData && pageData.page) {
            var localTime = new Date().getTime();
            if(pageData.page.loadTimestamp) {
                // calculate timeoffset
                var serverTime = parseInt(pageData.page.loadTimestamp);
                if(!isNaN(serverTime)) {
                    this.timeoffset = pageData.page.loadTimestamp - localTime;
                }
            } else {
                pageData.page.loadTimestamp = localTime;
            }
        }

        this.validateData(window.pageData);

        // measures
        try {
            var resources = performance.getEntriesByType("resource");
            var f = true;
            var dtotal = 0;
            for (var j = 0; j < resources.length; j++) {
                var d = resources[j].duration;
                if (resources[j].name.indexOf('satelliteLib') !== -1) {
                    if(d) {
                        dtotal = dtotal + d;
                    }
                }
                if((resources[j].name.indexOf('satellite-') !== -1) && d && f) {
                    f = false;
                    dtotal = dtotal + d;
                }
            }
            this.measures['du'] = Math.round(dtotal).toString();
            this.measures['lt'] = Math.round((performance.now())).toString();
        } catch(e) {
            this.warnings.push('dtm4');
        }

        try {
            var cookieTest = 'a73bp32';
            this.setCookie(cookieTest, cookieTest);
            if(this.getCookie(cookieTest) != cookieTest) {
                this.warnings.push('dtm5');
            }
            this.deleteCookie(cookieTest);
        } catch(e){
            this.warnings.push('dtm5');
        }

        this.registerCallbacks();
        this.setAnalyticsData();

        // handle any cookied event data
        this.getEvents();

        window.pageData_isLoaded = true;

        this.debugMessage('Init - trackPageLoad()', window.pageData);
        _satellite.pageBottom();
    }

    ,trackEvent: function(event, data, callback) {
        if(!window.pageData_isLoaded) {
            if(this.isDebugEnabled()) {
                console.log('[AA] pageDataTracker.trackEvent() called without calling trackPageLoad() first.');
            }
            return false;
        }
        if (window.pageData && pageData.page && pageData.page.noTracking == 'true') {
            return false;
        }

        if (event) {
            this.initWarnings();
            if(document.readyState !== 'complete') {
                this.warnings.push('dtm3');
            }
            if(event === 'newPage') {
                // auto fillings
                if(data.page && !data.page.loadTimestamp) {
                    data.page.loadTimestamp = ''+(new Date().getTime() + this.timeoffset);
                }
                this.processIdPlusData(data);
            }

            window.eventData = data ? data : {};
            window.eventData.eventName = event;
            this.handleEventData(event, data);

            if(event === 'newPage') {
                this.validateData(window.pageData);
            }
            this.debugMessage('Event: ' + event, data);

            _satellite.track(event);
        }

        if (typeof(callback) == 'function') {
            callback.call();
        }
    }

    ,processIdPlusData: function(data) {
        if(data && data.visitor && data.visitor.idPlusData) {
            var idPlusFields = ['userId', 'accessType', 'accountId', 'accountName'];
            for(var i=0; i < idPlusFields.length; i++) {
                if(typeof data.visitor.idPlusData[idPlusFields[i]] !== 'undefined') {
                    data.visitor[idPlusFields[i]] = data.visitor.idPlusData[idPlusFields[i]];
                }
            }
            data.visitor.idPlusData = undefined;
        }
    }

    ,validateData: function(data) {
        if(!data) {
            this.warnings.push('dv0');
            return;
        }

        // top 5
        if(!(data.visitor && data.visitor.accessType)) {
            this.warnings.push('dv1');
        }
        if(data.visitor && (data.visitor.accountId || data.visitor.accountName)) {
            if(!data.visitor.accountName) {
                this.warnings.push('dv2');
            }
            if(!data.visitor.accountId) {
                this.warnings.push('dv3');
            }
        }
        if(!(data.page && data.page.productName)) {
            this.warnings.push('dv4');
        }
        if(!(data.page && data.page.businessUnit)) {
            this.warnings.push('dv5');
        }
        if(!(data.page && data.page.name)) {
            this.warnings.push('dv6');
        }

        // rp mandatory
        if(data.page && data.page.businessUnit && (data.page.businessUnit.toLowerCase().indexOf('els:rp:') !== -1 || data.page.businessUnit.toLowerCase().indexOf('els:rap:') !== -1)) {
            if(!(data.page && data.page.loadTimestamp)) {
                this.warnings.push('dv7');
            }
            if(!(data.page && data.page.loadTime)) {
                this.warnings.push('dv8');
            }
            if(!(data.visitor && data.visitor.ipAddress)) {
                this.warnings.push('dv9');
            }
            if(!(data.page && data.page.type)) {
                this.warnings.push('dv10');
            }
            if(!(data.page && data.page.language)) {
                this.warnings.push('dv11');
            }
        }

        // other
        if(data.page && data.page.environment) {
            var env = data.page.environment.toLowerCase();
            if(!(env === 'dev' || env === 'cert' || env === 'prod')) {
                this.warnings.push('dv12');
            }
        }
        if(data.content && data.content.constructor !== Array) {
            this.warnings.push('dv13');
        }
    }

    ,initWarnings: function() {
        this.warnings = [];
        try {
            var hdn = document.head.childNodes;
            var libf = false;
            for(var i=0; i<hdn.length; i++) {
                if(hdn[i].src && (hdn[i].src.indexOf('satelliteLib') !== -1 || hdn[i].src.indexOf('launch') !== -1)) {
                    libf = true;
                    break;
                }
            }
            if(!libf) {
                this.warnings.push('dtm1');
            }
        } catch(e) {
        }
    }

    ,getMessages: function() {
        return this.warnings.join('|');
    }
    ,addMessage: function(message) {
        this.warnings.push(message);
    }

    ,getPerformance: function() {
        var copy = {};
        for (var attr in this.measures) {
            if(this.measures.hasOwnProperty(attr)) {
                copy[attr] = this.measures[attr];
            }
        }

        this.measures = {};
        return copy;
    }

    ,dtmCodeDesc: {
        dtm1: 'satellite-lib must be placed in the <head> section',
        dtm2: 'trackPageLoad() must be placed and called before the closing </body> tag',
        dtm3: 'trackEvent() must be called at a stage where Document.readyState=complete (e.g. on the load event or a user event)',
        dv1: 'visitor.accessType not set but mandatory',
        dv2: 'visitor.accountName not set but mandatory',
        dv3: 'visitor.accountId not set but mandatory',
        dv4: 'page.productName not set but mandatory',
        dv5: 'page.businessUnit not set but mandatory',
        dv6: 'page.name not set but mandatory',
        dv7: 'page.loadTimestamp not set but mandatory',
        dv8: 'page.loadTime not set but mandatory',
        dv9: 'visitor.ipAddress not set but mandatory',
        dv10: 'page.type not set but mandatory',
        dv11: 'page.language not set but mandatory',
        dv12: 'page.environment must be set to \'prod\', \'cert\' or \'dev\'',
        dv13: 'content must be of type array of objects'
    }

    ,debugMessage: function(event, data) {
        if(this.isDebugEnabled()) {
            console.log('[AA] --------- [' + (this.debugCounter++) + '] Web Analytics Data ---------');
            console.log('[AA] ' + event);
            console.groupCollapsed("[AA] AA Data: ");
            if(window.eventData) {
                console.log("[AA] eventData:\n" + JSON.stringify(window.eventData, true, 2));
            }
            if(window.pageData) {
                console.log("[AA] pageData:\n" + JSON.stringify(window.pageData, true, 2));
            }
            console.groupEnd();
            if(this.warnings.length > 0) {
                console.groupCollapsed("[AA] Warnings ("+this.warnings.length+"): ");
                for(var i=0; i<this.warnings.length; i++) {
                    var error = this.dtmCodeDesc[this.warnings[i]] ? this.dtmCodeDesc[this.warnings[i]] : 'Error Code: ' + this.warnings[i];
                    console.log('[AA] ' + error);
                }
                console.log('[AA] More can be found here: https://confluence.cbsels.com/display/AA/AA+Error+Catalog');
                console.groupEnd();
            }
            console.log("This mode can be disabled by calling 'pageDataTracker.disableDebug()'");
        }
    }

    ,isDebugEnabled: function() {
        if(typeof this.debug === 'undefined') {
            this.debug = (document.cookie.indexOf(this.debugCookie) !== -1) || (window.pageData && pageData.page && pageData.page.environment && pageData.page.environment.toLowerCase() === 'dev');
            //this.debug = (document.cookie.indexOf(this.debugCookie) !== -1);
        }
        return this.debug;
    }

    ,enableDebug: function(expire) {
        if (typeof expire === 'undefined') {
            expire = 86400;
        }
        console.log('You just enabled debug mode for Adobe Analytics tracking. This mode will persist for 24h.');
        console.log("This mode can be disabled by calling 'pageDataTracker.disableDebug()'");
        this.setCookie(this.debugCookie, 'true', expire, document.location.hostname);
        this.debug = true;
    }

    ,disableDebug: function() {
        console.log('Debug mode is now disabled.');
        this.deleteCookie(this.debugCookie);
        this.debug = false;
    }

    ,setAnalyticsData: function() {
        if(!(window.pageData && pageData.page && pageData.page.productName && pageData.page.name)) {
            return;
        }
        pageData.page.analyticsPagename = pageData.page.productName + ':' + pageData.page.name;

        var pageEls = pageData.page.name.indexOf(':') > -1 ? pageData.page.name.split(':') : [pageData.page.name];
        pageData.page.sectionName = pageData.page.productName + ':' + pageEls[0];

        try {
            this.customAnalyticsData();
        } catch(e){
            _satellite.notify('ERROR executing pageDataTracker.customAnalyticsData()');
        }
    }

    ,getEvents: function() {
        pageData.savedEvents = {};
        pageData.eventList = [];

        var val = this.getCookie(this.eventCookieName);
        if (val) {
            pageData.savedEvents = val;
        }

        this.deleteCookie(this.eventCookieName);
    }

    ,handleEventData: function(event, data) {
        var val;
        switch(event) {
            case 'newPage':
                if (data && typeof(data) === 'object') {
                    for (var x in data) {
                        if(data.hasOwnProperty(x) && data[x] instanceof Array) {
                            pageData[x] = data[x];
                        } else if(data.hasOwnProperty(x) && typeof(data[x]) === 'object') {
                            if(!pageData[x]) {
                                pageData[x] = {};
                            }
                            for (var y in data[x]) {
                                if(data[x].hasOwnProperty(y)) {
                                    pageData[x][y] = data[x][y];
                                }
                            }
                        }
                    }
                }
                this.setAnalyticsData();
            case 'saveSearch':
            case 'searchResultsUpdated':
                if (data) {
                    // overwrite page-load object
                    if (data.search && typeof(data.search) == 'object') {
                        window.eventData.search.resultsPosition = '';
                        pageData.search = pageData.search || {};
                        var fields = ['advancedCriteria', 'criteria', 'currentPage', 'dataFormCriteria', 'facets', 'resultsByType', 'resultsPerPage', 'sortType', 'totalResults', 'type', 'database',
                        'suggestedClickPosition','suggestedLetterCount','suggestedResultCount', 'autoSuggestCategory', 'autoSuggestDetails','typedTerm','selectedTerm', 'channel'];
                        for (var i=0; i<fields.length; i++) {
                            if (data.search[fields[i]]) {
                                pageData.search[fields[i]] = data.search[fields[i]];
                            }
                        }
                    }
                }
                this.setAnalyticsData();
                break;
            case 'navigationClick':
                if (data && data.link) {
                    window.eventData.navigationLink = {
                        name: ((data.link.location || 'no location') + ':' + (data.link.name || 'no name'))
                    };
                }
                break;
            case 'autoSuggestClick':
                if (data && data.search) {
                    val = {
                        autoSuggestSearchData: (
                            'letterct:' + (data.search.suggestedLetterCount || 'none') +
                            '|resultct:' + (data.search.suggestedResultCount || 'none') +
                            '|clickpos:' + (data.search.suggestedClickPosition || 'none')
                        ).toLowerCase(),
                        autoSuggestSearchTerm: (data.search.typedTerm || ''),
                        autoSuggestTypedTerm: (data.search.typedTerm || ''),
                        autoSuggestSelectedTerm: (data.search.selectedTerm || ''),
                        autoSuggestCategory: (data.search.autoSuggestCategory || ''),
                        autoSuggestDetails: (data.search.autoSuggestDetails || '')
                    };
                }
                break;
            case 'linkOut':
                if (data && data.content && data.content.length > 0) {
                    window.eventData.linkOut = data.content[0].linkOut;
                    window.eventData.referringProduct = _satellite.getVar('Page - Product Name') + ':' + data.content[0].id;
                }
                break;
            case 'socialShare':
                if (data && data.social) {
                    window.eventData.sharePlatform = data.social.sharePlatform || '';
                }
                break;
            case 'contentInteraction':
                if (data && data.action) {
                    window.eventData.action.name = pageData.page.productName + ':' + data.action.name;
                }
                break;
            case 'searchWithinContent':
                if (data && data.search) {
                    window.pageData.search = window.pageData.search || {};
                    pageData.search.withinContentCriteria = data.search.withinContentCriteria;
                }
                break;
            case 'contentShare':
                if (data && data.content) {
                    window.eventData.sharePlatform = data.content[0].sharePlatform;
                }
                break;
            case 'contentLinkClick':
                if (data && data.link) {
                    window.eventData.action = { name: pageData.page.productName + ':' + (data.link.type || 'no link type') + ':' + (data.link.name || 'no link name') };
                }
                break;
            case 'contentWindowLoad':
            case 'contentTabClick':
                if (data && data.content) {
                    window.eventData.tabName = data.content[0].tabName || '';
                    window.eventData.windowName = data.content[0].windowName || '';
                }
                break;
            case 'userProfileUpdate':
                if (data && data.user) {
                    if (Object.prototype.toString.call(data.user) === "[object Array]") {
                        window.eventData.user = data.user[0];
                    }
                }
                break;
            case 'videoStart':
                if (data.video) {
                    data.video.length = parseFloat(data.video.length || '0');
                    data.video.position = parseFloat(data.video.position || '0');
                    s.Media.open(data.video.id, data.video.length, s.Media.playerName);
                    s.Media.play(data.video.id, data.video.position);
                }
                break;
            case 'videoPlay':
                if (data.video) {
                    data.video.position = parseFloat(data.video.position || '0');
                    s.Media.play(data.video.id, data.video.position);
                }
                break;
            case 'videoStop':
                if (data.video) {
                    data.video.position = parseFloat(data.video.position || '0');
                    s.Media.stop(data.video.id, data.video.position);
                }
                break;
            case 'videoComplete':
                if (data.video) {
                    data.video.position = parseFloat(data.video.position || '0');
                    s.Media.stop(data.video.id, data.video.position);
                    s.Media.close(data.video.id);
                }
                break;
            case 'addWebsiteExtension':
                if(data && data.page) {
                    val = {
                        wx: data.page.websiteExtension
                    }
                }
                break;
        }

        if (val) {
            this.setCookie(this.eventCookieName, val);
        }
    }

    ,registerCallbacks: function() {
        var self = this;
        if(window.usabilla_live) {
            window.usabilla_live('setEventCallback', function(category, action, label, value) {
                if(action == 'Campaign:Open') {
                    self.trackEvent('ctaImpression', {
                        cta: {
                            ids: ['usabillaid:' + label]
                        }
                    });
                } else if(action == 'Campaign:Success') {
                    self.trackEvent('ctaClick', {
                        cta: {
                            ids: ['usabillaid:' + label]
                        }
                    });
                }
            });
        }
    }

    ,getConsortiumAccountId: function() {
        var id = '';
        if (window.pageData && pageData.visitor && (pageData.visitor.consortiumId || pageData.visitor.accountId)) {
            id = (pageData.visitor.consortiumId || 'no consortium ID') + '|' + (pageData.visitor.accountId || 'no account ID');
        }

        return id;
    }

    ,getSearchClickPosition: function() {
        if (window.eventData && eventData.search && eventData.search.resultsPosition) {
            var pos = parseInt(eventData.search.resultsPosition), clickPos;
            if (!isNaN(pos)) {
                var page = pageData.search.currentPage ? parseInt(pageData.search.currentPage) : '', perPage = pageData.search.resultsPerPage ? parseInt(pageData.search.resultsPerPage) : '';
                if (!isNaN(page) && !isNaN(perPage)) {
                    clickPos = pos + ((page - 1) * perPage);
                }
            }
            return clickPos ? clickPos.toString() : eventData.search.resultsPosition;
        }
        return '';
    }

    ,getSearchFacets: function() {
        var facetList = '';
        if (window.pageData && pageData.search && pageData.search.facets) {
            if (typeof(pageData.search.facets) == 'object') {
                for (var i=0; i<pageData.search.facets.length; i++) {
                    var f = pageData.search.facets[i];
                    facetList += (facetList ? '|' : '') + f.name + '=' + f.values.join('^');
                }
            }
        }
        return facetList;
    }

    ,getSearchResultsByType: function() {
        var resultTypes = '';
        if (window.pageData && pageData.search && pageData.search.resultsByType) {
            for (var i=0; i<pageData.search.resultsByType.length; i++) {
                var r = pageData.search.resultsByType[i];
                resultTypes += (resultTypes ? '|' : '') + r.name + (r.results || r.values ? '=' + (r.results || r.values) : '');
            }
        }
        return resultTypes;
    }

    ,getJournalInfo: function() {
        var info = '';
        if (window.pageData && pageData.journal && (pageData.journal.name || pageData.journal.specialty || pageData.journal.section || pageData.journal.issn || pageData.journal.issueNumber || pageData.journal.volumeNumber)) {
            var journal = pageData.journal;
            return (journal.name || 'no name') + '|' + (journal.specialty || 'no specialty') + '|' + (journal.section || 'no section') + '|' + (journal.issn || 'no issn') + '|' + (journal.issueNumber || 'no issue #') + '|' + (journal.volumeNumber || 'no volume #');
        }
        return info;
    }

    ,getBibliographicInfo: function(doc) {
        if (!doc || !(doc.publisher || doc.indexTerms || doc.publicationType || doc.publicationRights || doc.volumeNumber || doc.issueNumber || doc.subjectAreas || doc.isbn)) {
            return '';
        }

        var terms = doc.indexTerms ? doc.indexTerms.split('+') : '';
        if (terms) {
            terms = terms.slice(0, 5).join('+');
            terms = terms.length > 100 ? terms.substring(0, 100) : terms;
        }

        var areas = doc.subjectAreas ? doc.subjectAreas.split('>') : '';
        if (areas) {
            areas = areas.slice(0, 5).join('>');
            areas = areas.length > 100 ? areas.substring(0, 100) : areas;
        }

        var biblio	= (doc.publisher || 'none')
            + '^' + (doc.publicationType || 'none')
            + '^' + (doc.publicationRights || 'none')
            + '^' + (terms || 'none')
            + '^' + (doc.volumeNumber || 'none')
            + '^' + (doc.issueNumber || 'none')
            + '^' + (areas || 'none')
            + '^' + (doc.isbn || 'none');

        return this.stripProductDelimiters(biblio).toLowerCase();
    }

    ,getContentItem: function() {
        var docs = window.eventData && eventData.content ? eventData.content : pageData.content;
        if (docs && docs.length > 0) {
            return docs[0];
        }
    }

    ,getFormattedDate: function(ts) {
        if (!ts) {
            return '';
        }

        var d = new Date(parseInt(ts) * 1000);

        // now do formatting
        var year = d.getFullYear()
            ,month = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1)
            ,date = (d.getDate() < 10 ? '0' : '') + d.getDate()
            ,hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours()
            ,mins = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
            ,ampm = d.getHours() > 12 ? 'pm' : 'am';

        hours = (hours < 10 ? '0' : '') + hours;
        return year + '-' + month + '-' + date;
    }

    ,getVisitorId: function() {
        var orgId = '4D6368F454EC41940A4C98A6@AdobeOrg';
        if(Visitor && Visitor.getInstance(orgId)) {
            return Visitor.getInstance(orgId).getMarketingCloudVisitorID();
        } else {
            return ''
        }
    }

    ,setProductsVariable: function() {
        var prodList = window.eventData && eventData.content ? eventData.content : pageData.content
            ,prods = [];
        if (prodList) {
            for (var i=0; i<prodList.length; i++) {
                if (prodList[i].id || prodList[i].type || prodList[i].publishDate || prodList[i].onlineDate) {
                    if (!prodList[i].id) {
                        prodList[i].id = 'no id';
                    }
                    var prodName = (pageData.page.productName || 'xx').toLowerCase();
                    if (prodList[i].id.indexOf(prodName + ':') != 0) {
                        prodList[i].id = prodName + ':' + prodList[i].id;
                    }
                    prodList[i].id = this.stripProductDelimiters(prodList[i].id);
                    var merch = [];
                    if (prodList[i].format) {
                        merch.push('evar17=' + this.stripProductDelimiters(prodList[i].format.toLowerCase()));
                    }
                    if (prodList[i].type) {
                        var type = prodList[i].type;
                        if (prodList[i].accessType) {
                            type += ':' + prodList[i].accessType;
                        }
                        merch.push('evar20=' + this.stripProductDelimiters(type.toLowerCase()));
                    }
                    if(!prodList[i].title) {
                        prodList[i].title = prodList[i].name;
                    }
                    if (prodList[i].title) {
                        merch.push('evar75=' + this.stripProductDelimiters(prodList[i].title.toLowerCase()));
                    }
                    if (prodList[i].breadcrumb) {
                        merch.push('evar63=' + this.stripProductDelimiters(prodList[i].breadcrumb).toLowerCase());
                    }
                    var nowTs = new Date().getTime()/1000;
                    if (prodList[i].onlineDate && !isNaN(prodList[i].onlineDate)) {
                        if(prodList[i].onlineDate > 32503680000) {
                            prodList[i].onlineDate = prodList[i].onlineDate/1000;
                        }
                        merch.push('evar122=' + this.stripProductDelimiters(pageDataTracker.getFormattedDate(prodList[i].onlineDate)));
                        var onlineAge = Math.floor((nowTs - prodList[i].onlineDate) / 86400);
                        onlineAge = (onlineAge === 0) ? 'zero' : onlineAge;
                        merch.push('evar128=' + onlineAge);
                    }
                    if (prodList[i].publishDate && !isNaN(prodList[i].publishDate)) {
                        if(prodList[i].publishDate > 32503680000) {
                            prodList[i].publishDate = prodList[i].publishDate/1000;
                        }
                        merch.push('evar123=' + this.stripProductDelimiters(pageDataTracker.getFormattedDate(prodList[i].publishDate)));
                        var publishAge = Math.floor((nowTs - prodList[i].publishDate) / 86400);
                        publishAge = (publishAge === 0) ? 'zero' : publishAge;
                        merch.push('evar127=' + publishAge);
                    }
                    if (prodList[i].onlineDate && prodList[i].publishDate) {
                        merch.push('evar38=' + this.stripProductDelimiters(pageDataTracker.getFormattedDate(prodList[i].onlineDate) + '^' + pageDataTracker.getFormattedDate(prodList[i].publishDate)));
                    }
                    if (prodList[i].mapId) {
                        merch.push('evar70=' + this.stripProductDelimiters(prodList[i].mapId));
                    }
					if (prodList[i].relevancyScore) {
						merch.push('evar71=' + this.stripProductDelimiters(prodList[i].relevancyScore));
					}
                    if (prodList[i].status) {
                        merch.push('evar73=' + this.stripProductDelimiters(prodList[i].status));
                    }
                    if (prodList[i].previousStatus) {
                        merch.push('evar111=' + this.stripProductDelimiters(prodList[i].previousStatus));
                    }
                    if (prodList[i].entitlementType) {
                        merch.push('evar80=' + this.stripProductDelimiters(prodList[i].entitlementType));
                    }
                    if (prodList[i].recordType) {
                        merch.push('evar93=' + this.stripProductDelimiters(prodList[i].recordType));
                    }
                    if (prodList[i].exportType) {
                        merch.push('evar99=' + this.stripProductDelimiters(prodList[i].exportType));
                    }
                    if (prodList[i].importType) {
                        merch.push('evar142=' + this.stripProductDelimiters(prodList[i].importType));
                    }
                    if (prodList[i].section) {
                        merch.push('evar100=' + this.stripProductDelimiters(prodList[i].section));
                    }
                    if (prodList[i].detail) {
                        merch.push('evar104=' + this.stripProductDelimiters(prodList[i].detail.toLowerCase()));
                    }
                    if (prodList[i].position) {
                        merch.push('evar116=' + this.stripProductDelimiters(prodList[i].position));
                    }
                    if (prodList[i].publicationTitle) {
                        merch.push('evar129=' + this.stripProductDelimiters(prodList[i].publicationTitle));
                    }
                    if (prodList[i].specialIssueTitle) {
                        merch.push('evar130=' + this.stripProductDelimiters(prodList[i].specialIssueTitle));
                    }
                    if (prodList[i].specialIssueNumber) {
                        merch.push('evar131=' + this.stripProductDelimiters(prodList[i].specialIssueNumber));
                    }
                    if (prodList[i].referenceModuleTitle) {
                        merch.push('evar139=' + this.stripProductDelimiters(prodList[i].referenceModuleTitle));
                    }
                    if (prodList[i].referenceModuleISBN) {
                        merch.push('evar140=' + this.stripProductDelimiters(prodList[i].referenceModuleISBN));
                    }
                    if (prodList[i].volumeTitle) {
                        merch.push('evar132=' + this.stripProductDelimiters(prodList[i].volumeTitle));
                    }
                    if (prodList[i].publicationSection) {
                        merch.push('evar133=' + this.stripProductDelimiters(prodList[i].publicationSection));
                    }
                    if (prodList[i].publicationSpecialty) {
                        merch.push('evar134=' + this.stripProductDelimiters(prodList[i].publicationSpecialty));
                    }
                    if (prodList[i].issn) {
                        merch.push('evar135=' + this.stripProductDelimiters(prodList[i].issn));
                    }
                    if (prodList[i].id2) {
                        merch.push('evar159=' + this.stripProductDelimiters(prodList[i].id2));
                    }
                    if (prodList[i].id3) {
                        merch.push('evar160=' + this.stripProductDelimiters(prodList[i].id3));
                    }

                    var biblio = this.getBibliographicInfo(prodList[i]);
                    if (biblio) {
                        merch.push('evar28=' + biblio);
                    }

                    if (prodList[i].turnawayId) {
                        pageData.eventList.push('product turnaway');
                    }

                    var price = prodList[i].price || '', qty = prodList[i].quantity || '', evts = [];
                    if (price && qty) {
                        qty = parseInt(qty || '1');
                        price = parseFloat(price || '0');
                        price = (price * qty).toFixed(2);

                        if (window.eventData && eventData.eventName && eventData.eventName == 'cartAdd') {
                            evts.push('event20=' + price);
                        }
                    }

                    var type = window.pageData && pageData.page && pageData.page.type ? pageData.page.type : '', evt = window.eventData && eventData.eventName ? eventData.eventName : '';
                    if (type.match(/^CP\-/gi) !== null && (!evt || evt == 'newPage' || evt == 'contentView')) {
                        evts.push('event181=1');
                    }
                    if (evt == 'contentDownload' || type.match(/^CP\-DL/gi) !== null) {
                        evts.push('event182=1');
                    }
                    if (evt == 'contentExport') {
                        evts.push('event184=1');
                    }
                    if(prodList[i].datapoints) {
                        evts.push('event239=' + prodList[i].datapoints);
                    }
                    if(prodList[i].documents) {
                        evts.push('event240=' + prodList[i].documents);
                    }

                    prods.push([
                        ''					// empty category
                        ,prodList[i].id		// id
                        ,qty				// qty
                        ,price				// price
                        ,evts.join('|')		// events
                        ,merch.join('|')	// merchandising eVars
                    ].join(';'));
                }
            }
        }

        return prods.join(',');
    }

    ,md5: function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()}
    ,stripProductDelimiters: function(val) {
        if (val) {
            return val.replace(/\;|\||\,/gi, '-');
        }
    }

    ,setCookie: function(name, value, seconds, domain) {
        domain = document.location.hostname;
        var expires = '';
        var expiresNow = '';
        var date = new Date();
        date.setTime(date.getTime() + (-1 * 1000));
        expiresNow = "; expires=" + date.toGMTString();

        if (typeof(seconds) != 'undefined') {
            date.setTime(date.getTime() + (seconds * 1000));
            expires = '; expires=' + date.toGMTString();
        }

        var type = typeof(value);
        type = type.toLowerCase();
        if (type != 'undefined' && type != 'string') {
            value = JSON.stringify(value);
        }

        // fix scoping issues
        // keep writing the old cookie, but make it expire
        document.cookie = name + '=' + value + expiresNow + '; path=/';

        // now just set the right one
        document.cookie = name + '=' + value + expires + '; path=/; domain=' + domain;
    }

    ,getCookie: function(name) {
        name = name + '=';
        var carray = document.cookie.split(';'), value;

        for (var i=0; i<carray.length; i++) {
            var c = carray[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(name) == 0) {
                value = c.substring(name.length, c.length);
                try {
                    value = JSON.parse(value);
                } catch(ex) {}

                return value;
            }
        }

        return null;
    }

    ,deleteCookie: function(name) {
        this.setCookie(name, '', -1);
        this.setCookie(name, '', -1, document.location.hostname);
    }

    // custom modification hooks
    ,customDoPlugins: function(s) {
        return true;
    }
    ,customAnalyticsData: function() {
        return true;
    }

    ,mapAdobeVars: function(s) {
        var vars = {
            pageName		: 'Page - Analytics Pagename'
            ,channel		: 'Page - Section Name'
            ,campaign		: 'Campaign - ID'
            ,currencyCode	: 'Page - Currency Code'
            ,purchaseID		: 'Order - ID'
            ,prop1			: 'Visitor - Account ID'
            ,prop2			: 'Page - Product Name'
            ,prop4			: 'Page - Type'
            ,prop6			: 'Search - Type'
            ,prop7			: 'Search - Facet List'
            ,prop8			: 'Search - Feature Used'
            ,prop12			: 'Visitor - User ID'
            ,prop13			: 'Search - Sort Type'
            ,prop14			: 'Page - Load Time'
            ,prop15         : 'Support - Topic Name'
            ,prop16			: 'Page - Business Unit'
            ,prop21			: 'Search - Criteria'
            ,prop24			: 'Page - Language'
            ,prop25			: 'Page - Product Feature'
            ,prop28         : 'Support - Search Criteria'
            ,prop30			: 'Visitor - IP Address'
            ,prop33         : 'Page - Product Application Version'
            ,prop34         : 'Page - Website Extensions'
            ,prop60			: 'Search - Data Form Criteria'
            ,prop65         : 'Page - Online State'
            ,prop67         : 'Research Networks'

            ,eVar3			: 'Search - Total Results'
            ,eVar7			: 'Visitor - Account Name'
            ,eVar15			: 'Event - Search Results Click Position'
            ,eVar19			: 'Search - Advanced Criteria'
            ,eVar21			: 'Promo - Clicked ID'
            ,eVar22			: 'Page - Test ID'
            ,eVar27			: 'Event - AutoSuggest Search Data'
            ,eVar157		: 'Event - AutoSuggest Search Typed Term'
            ,eVar156		: 'Event - AutoSuggest Search Selected Term'
            ,eVar162		: 'Event - AutoSuggest Search Category'
            ,eVar163		: 'Event - AutoSuggest Search Details'
            ,eVar33			: 'Visitor - Access Type'
            ,eVar34			: 'Order - Promo Code'
            ,eVar39			: 'Order - Payment Method'
            ,eVar41			: 'Visitor - Industry'
            ,eVar42			: 'Visitor - SIS ID'
            ,eVar43			: 'Page - Error Type'
            ,eVar44			: 'Event - Updated User Fields'
            ,eVar48			: 'Email - Recipient ID'
            ,eVar51			: 'Email - Message ID'
            ,eVar52			: 'Visitor - Department ID'
            ,eVar53			: 'Visitor - Department Name'
            ,eVar60			: 'Search - Within Content Criteria'
            ,eVar61			: 'Search - Within Results Criteria'
            ,eVar62			: 'Search - Result Types'
            ,eVar74			: 'Page - Journal Info'
            ,eVar76			: 'Email - Broadlog ID'
            ,eVar78			: 'Visitor - Details'
            ,eVar80         : 'Visitor - Usage Path Info'
            ,eVar102		: 'Form - Name'
            ,eVar103        : 'Event - Conversion Driver'
            ,eVar105        : 'Search - Current Page'
            ,eVar106        : 'Visitor - App Session ID'
            ,eVar107        : 'Page - Secondary Product Name'
            ,eVar117        : 'Search - Database'
            ,eVar126        : 'Page - Environment'
            ,eVar141        : 'Search - Criteria Original'
            ,eVar143        : 'Page - Tabs'
            ,eVar161        : 'Search - Channel'

            ,eVar148        : 'Visitor - Platform Name'
            ,eVar149        : 'Visitor - Platform ID'
            ,eVar152        : 'Visitor - Product ID'
            ,eVar153        : 'Visitor - Superaccount ID'
            ,eVar154        : 'Visitor - Superaccount Name'

            ,list2			: 'Page - Widget Names'
            ,list3			: 'Promo - IDs'
        };

        for (var i in vars) {
            s[i] = s[i] ? s[i] : _satellite.getVar(vars[i]);
        }
    }
};

