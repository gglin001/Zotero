jQuery(function( $ ){

	if( $( document ).scrollTop() > 0 ){
		$( '.site-header' ).addClass( 'light' );			
	}

	// Add opacity class to site header
	$( document ).on('scroll', function(){

		if ( $( document ).scrollTop() > 0 ){
			$( '.site-header' ).addClass( 'light' );			

		} else {
			$( '.site-header' ).removeClass( 'light' );			
		}

	});


	$( '.nav-primary .genesis-nav-menu, .nav-secondary .genesis-nav-menu' ).addClass( 'responsive-menu' ).before('<div class="responsive-menu-icon"></div>');

	$( '.responsive-menu-icon' ).click(function(){
		$(this).next( '.nav-primary .genesis-nav-menu,  .nav-secondary .genesis-nav-menu' ).slideToggle();
	});

	$( window ).resize(function(){
		if ( window.innerWidth > 800 ) {
			$( '.nav-primary .genesis-nav-menu,  .nav-secondary .genesis-nav-menu, nav .sub-menu' ).removeAttr( 'style' );
			$( '.responsive-menu > .menu-item' ).removeClass( 'menu-open' );
		}
	});

	$( '.responsive-menu > .menu-item' ).click(function(event){
		if ( event.target !== this )
		return;
			$(this).find( '.sub-menu:first' ).slideToggle(function() {
			$(this).parent().toggleClass( 'menu-open' );
		});
	});

});