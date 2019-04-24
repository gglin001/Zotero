_satellite.pushAsyncScript(function(event, target, $variables){
  setTimeout(function() {
    var wx = [];
    if(document.getElementById('unpaywall') !== null) {
        wx.push('1');
    }
    if(document.getElementById('canary-bar') !== null || document.getElementById('canary-bar-container') !== null) {
        wx.push('2');
    }

    if(window.pageDataTracker && wx.length > 0) {
      pageDataTracker.trackEvent('addWebsiteExtension', {
        page: {
          websiteExtension: wx.join('|')
        }
      });
    }
}, 4000);

});
