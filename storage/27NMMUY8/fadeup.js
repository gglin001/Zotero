(function($) {

	//* Make sure JS is enabled
	document.documentElement.className = "js";

	$(document).ready( function() {

		//* Run 0.25 seconds after document ready for any instances viewable on load
		setTimeout( function() {
			animateObject();
		}, 250);

	});

	$(window).scroll( function() {

		//* Run on scroll
		animateObject();

	});

	function animateObject() {

		//* Define your object via class
		var object = $( '.fadeup-effect' );

		//* Loop through each object in the array
		$.each( object, function() {

			var windowHeight = $(window).height(),
				offset 		 = $(this).offset().top,
				top			 = offset - $(document).scrollTop(),
				percent 	 = Math.floor( top / windowHeight * 100 );


			if ( percent < 80 ) {

				$(this).addClass( 'fadeInUp' );

			}
		});
	}

})(jQuery);