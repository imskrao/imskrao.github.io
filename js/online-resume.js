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

	// Removed old version control code
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

// Service Worker: Make sure service worker is supported
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('service-worker.js')
			.then(reg => {
				console.log('Service worker: Registered')
			})
			.catch(err => console.error(err))
	})
}
// Service Worker: End

// Simplified visitor count
var visitorEle = document.querySelector('#visitor-count');
if (visitorEle) {
	visitorEle.innerHTML = 'Welcome to my portfolio!';
	setTimeout(() => {
		visitorEle.classList.add('bottom-40');
	}, 5000);
}
