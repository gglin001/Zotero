//维普网 所有作品及精选辑底页脚本 javascript 2.0 2009-10-21 李晓明

//所有底页详细介绍TABCARD切换函数
function introduce(){
	var eva=$(".evaluation");
	var intro=$(".introduce");
	var i=$(".card a:eq(0)");
	var e=$(".card a:eq(1)");
	i.click(function(){
		eva.css("display","none");
		intro.fadeIn(300);
		$(".card a").removeClass("current");
		$(this).addClass("current");
		autoheight();
		return false;
	});
		e.click(function(){
		intro.css("display","none");
		eva.fadeIn(300);
		$(".card a").removeClass("current");
		$(this).addClass("current");
		 autoheight();
		return false;
	});
}

//所有底页侧边栏高度对齐函数
function autoheight(){
	var content=$(".contains");
	var side=$(".sidebar");
	if(content.height()<side.height()){
		content.height(side.height());
	}else{
		content.css("height","");
	}
}

//集市和期刊搜索条动作函数
function marksearch(){
	var select=$(".selec .stand");
	var selist=$(".type");
	var keys=$(".keys");
	select.click(function(){
		selist.show();
		return false;
	});
	$(".type a").click(function(){
		select.text($(this).text());
		selist.hide();
		InputValue($(this).attr('nv'),$(this).attr('rel'));
		return false;
	});
	$(document).click(function(event){
		if($(event.target)!=$(".selec")){
			selist.hide();
		}
	});
	keys.val('请输入关键词...').css({"font":"12px 'Tahoma'","color":"#ccc"});
	keys.focus(function(){
	if($(this).val()=='请输入关键词...'){
	$(this).val("");
	$(this).css({"font":"14px 'Tahoma'","color":"#666"});
	}else{$(this).select()}
	}).blur(function(){
			if($(this).val()==""){$(this).val('请输入关键词...').css({"font":"12px 'Tahoma'","color":"#ccc"});}
		}
		);
}

function vipservice(){
	if($('.vipservice').size()>0){
		$('.v_service').hover(function(){
			$('.vipservice').slideDown(400);
		})
		$(".vipservice").hover(
			function(){},
			function(){
				$(this).slideUp(400);
			}
		); 
		$(".vclose").click(
			function () {
				$('.vipservice').slideUp(400);
			}
		);
	}
	if($('.vipservice_sci').size()>0){
		$('.v_service').hover(function(){
			$('.vipservice_sci').slideDown(400);
		})
		$(".vipservice_sci").hover(
			function(){},
			function(){
				$(this).slideUp(400);
			}
		); 
		$(".vclose").click(
			function () {
				$('.vipservice_sci').slideUp(400);
			}
		);
	}
}


$(function(){
introduce();
marksearch();
autoheight();
vipservice();
//rate();
});