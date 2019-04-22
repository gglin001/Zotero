$(document).ready(function () {

	$('#firstDropMenuLink').click(function(e) { e.preventDefault(); } );

	// Site switcher interaction (for Explorer)
	jQuery(".dropMenu>li").mouseover(function(e){jQuery(this).addClass("hovermenu")});
	jQuery(".dropMenu>li").mouseout(function(e){jQuery(this).removeClass("hovermenu")});
	jQuery(".dropMenu li").click(function(e){jQuery(this).toggleClass("hovermenu")});
	jQuery(".dropMenu a").focus(function() { $('.dropMenu>li').addClass("hovermenu");	});
	jQuery(".dropMenu a").focusout(function() { $('.dropMenu>li').removeClass("hovermenu");	});

	// Show skip to content on focus for IE
	jQuery("#skipToContent").focus(function() { $(this).css("position","absolute"); $(this).css("right","200px"); $(this).css("left","auto"); });
			
});