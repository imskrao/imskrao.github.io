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

// Hide nav items on click
var viewportHeight = screen.height;
var navbarItems = document.querySelectorAll('.navbar-nav .nav-item a')
var navbarCollapse = document.querySelector('.navbar-collapse')
if (viewportHeight < 992) {
	navbarItems.forEach(function (item) {
		item.addEventListener('click', function () {
			navbarCollapse.classList.remove('show')
		})
	})
}

// console message
var consoleMsg = "%c Hey 👋, Welcome to Developer World... This is Santosh Rao!";
var consoleStyle = "font-size:24px; color: black; \
	font-weight: bold; background-color: #ffd800; \
	padding: 10px; border-radius: 3px; \
	font-family: 'Open Sans'; opacity: 0.7";
console.log(consoleMsg, consoleStyle);