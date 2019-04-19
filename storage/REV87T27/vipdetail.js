
	DetailProPack();


function DetailYWWX(ywtypeid){
	var detailfrmdata=$('form[name=frmdata]');
	var detailywtypeid=detailfrmdata.find('input[name=YWTypeID]');
	var detailkeyid=detailfrmdata.find('input[name=KeyID]').val();
	var detailtitle=detailfrmdata.find('input[name=Title]').val();
	var detailkeyword=detailfrmdata.find('input[name=Keyword]').val();
	var detailwriter=detailfrmdata.find('input[name=Writer]').val();
	
	detailfrmdata.attr('method','post');
	detailfrmdata.attr('target','_blank');
	detailfrmdata.attr('action','/main/ywsearch.aspx');
	if(detailywtypeid.size()<=0){
		detailfrmdata.append('<input name="YWTypeID" type="hidden" value="' + ywtypeid + '"/>');
	}else{
		detailywtypeid.val(ywtypeid);
	}
	detailfrmdata.submit();
}

function DetailProPack(){
	var baike=$('#baike');
	var dp=$('#diggproduct');
	var xgwx=$('#xgwx');
	var ckwx=$('#ckwx');
	
	var detailfrmdata=$('form[name=frmdata]');
	var detailtypeid=detailfrmdata.find('input[name=TypeID]').val();
	var detailkeyid=detailfrmdata.find('input[name=KeyID]').val();
	var detailtitle=detailfrmdata.find('input[name=Title]').val();
	var detailkeyword=detailfrmdata.find('input[name=Keyword]').val();
	var detailclassid=detailfrmdata.find('input[name=ClassID]').val();
	var detailclasstype=detailfrmdata.find('input[name=ClassType]').val();
	
	/*
	if(baike.size()>0){
		var allowshow=false;
		var allowclass=new Array('R','S','T','U','V','X');
		for(var i=0;i<allowclass.length;i++){
			if(detailclasstype.substr(0,1)==allowclass[i]){
				allowshow=true;
			}
		}
		if(allowshow){
			$.ajax({
				url: '/ajax/baike.aspx?t='+escape(detailtitle)+'&k='+escape(detailkeyword),
				timeout: 1500,
				success: function(data){
					baike.html(data);
					if(data.length>0){
						BaikeClickLog();
					}
				}
			});
		}
	}
*/


	if(dp.size()>0){
		$.ajax({
			url: '/Ajax/Html.aspx?action=mddp&cid='+detailclassid+'&k='+escape(detailkeyword),
			cache: true,
			beforeSend: function(){
				dp.html(c_loadingimg);
			},
			success: function(data){
				dp.html(data);
			}
		});
	}
	if(ckwx.size()>0){
		$.ajax({
			url: '/Ajax/Html.aspx?action=mdckwx&id='+detailkeyid,
			cache: true,
			timeout: 1500,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				ckwx.html('');
			},
			beforeSend: function(){
				ckwx.html(c_loadingimg);
			},
			success: function(data){
				ckwx.html(data);
			}
		});
	}
	if(xgwx.size()>0){
		$.ajax({
			url: '/Ajax/Html.aspx?action=mdxgwx&id='+detailkeyid,
			cache: true,
			timeout: 1500,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				xgwx.html('');
			},
			beforeSend: function(){
				xgwx.html(c_loadingimg);
			},
			success: function(data){
				xgwx.html(data);
			}
		});
	}
}

function BaikeClickLog(){
	$('.baikeword').click(function(){
		var word=$(this).text();
		var wordurl=$(this).parent().attr('href');
		$.get('/ajax/count.aspx?action=bwc&oid=2&outurl='+escape(wordurl)+'&intro='+escape(word));
	});
	$('.baikecata').click(function(){
		var wordcata=$(this).text();
		var wordcataurl=$(this).attr('href');
		$.get('/ajax/count.aspx?action=bwc&oid=3&outurl='+escape(wordcataurl)+'&intro='+escape(wordcata));
	});
	$('.baikeindex').click(function(){
		var wordindex=$(this).text();
		var wordindexurl=$(this).attr('href');
		$.get('/ajax/count.aspx?action=bwc&oid=4&outurl='+escape(wordindexurl)+'&intro='+escape(wordindex));
	});
}