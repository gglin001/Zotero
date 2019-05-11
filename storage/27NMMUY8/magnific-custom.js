jQuery(document).ready(function($) {
	
	var clickedIndex;
	
	$('.dp_quickview_button').click(function(){
		var dataId = $(this).attr('data-id');
                quickviewItems = {
                        src: dp_globals.ajaxurl+'?id='+dataId
                }
		
		$.magnificPopup.open({
			items: quickviewItems,
			ajax: {
				settings: {
					type: 'POST',
					data: {
						action: 'dp',
						nonce: dp_globals.nonce,
						plugin_url: dp_globals.plugin_url
					},
					
					/*success: function(response){ 
                                            alert("Got this from the server: " + response);
                                        },
                                        error: function(MLHttpRequest, textStatus, errorThrown){  
                                            alert("There was an error: " + errorThrown);  
                                        }*/
	                
				}
			},
			type: 'ajax',
			closeOnContentClick: false
		}, 0);
		return false;
	});
	
	$('.products .product').has('.dp_quickview_button').on("mouseover", function(){
		$(this).find('.dp_quickview_button').css('display','block');
	});
	$('.products .product').has('.dp_quickview_button').on("mouseout", function(){
		$(this).find('.dp_quickview_button').hide();
	});
	
	/*
	$('.dp_quickview .single_add_to_cart_button').live('click', function(){
		$(this).addClass('loading');		
	});
	*/
	
/* 	=============================
   	Inline Gallery 
   	============================= */
   	
   	$('.dp_quickview_thumb').live("click",function(){
   		$(this).fadeTo(250, 1).siblings().fadeTo(250, 0.5);
                $('.images>img').attr('src',$(this).attr('href')).attr('srcset',$(this).attr('href'));
   		$(this).closest('.thumbnails').siblings('.attachment-shop_single').attr('src',$(this).attr('href')).load(function(){
//	   		$.fancybox.center(true);
   		});
	   	return false;
   	});
});