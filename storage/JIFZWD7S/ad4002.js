//广告显示方法规定格式：$$_adMan.registerAdFunc(function (data, adCode, adId) {方法代码}）; //data为广告数据，adCode为广告位编码，adId为广告Id
//要统计广告点击量，需要在广告点击时调用方法 $$_adMan.adClick(adId); 然后跳转页面
$$_adMan.registerAdFunc(function (data, adCode, adId) {
    var div = $('.funYouAd_' + adCode);
    var html = '<a style="position:relative;"></a>';
    html = $(html);
    var alink = html;
    alink.attr('target', '_blank');
    alink.attr('href', data.Link);
    
    alink[0].onclick = function () {
        $$_adMan.adClick(adId);
    };
    html.html(data.Text);
    div.append(html);
});