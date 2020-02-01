$(document).ready(function () {

	// script for smooth scrolling //
	jQuery(document).ready(function ($) {
		$(".scroll ").click(function (event) {
			event.preventDefault();

			$('html,body').animate({
				scrollTop: $(this.hash).offset().top
			}, 1000);
		});
	});
});