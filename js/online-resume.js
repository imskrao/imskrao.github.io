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

	// old version control
	// setTimeout(function () {
	// 	$('#to-old').css("top", "0");
	// }, 1000)
	// setTimeout(function () {
	// 	$('#to-old').css("top", "-40px");
	// }, 3000)
	$('#to-old').click(function () {
		var toOldPath = window.location.origin + "/oldVersion/";
		window.open(toOldPath, '_blank')
	})

	$('#post-btn').click(function () {
		var knowwebPath = window.location.origin + "/post/knowweb/twitter/";
		window.open(knowwebPath, '_blank');
	})
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

// old version button

// Service Worker: Make sure service worker is supported
if ('serviceWorker' in navigator) {
	console.log('Yes service worked is supported')
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('service-worker.js')
			.then(reg => {
				console.log('Service worker: Registered')
			})
			.catch(err => console.error(err))
	})
}
// Service Worker: End

// visitor count: start
function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

var welcomeText = 'Warm welcome on visiting this page for first time';
var visitorEle = document.querySelector('#visitor-count');
var visitorCount = getCookie('visitorCount');
if (visitorCount) {
	setCookie('visitorCount', (+ visitorCount + 1), (new Date()));
	welcomeText = 'Welcome back, You are visting this page for ' + (+ visitorCount + 1) + ' times';
} else {
	setCookie('visitorCount', 1, (new Date()));
	visitorCount = 1;
}
visitorEle.innerHTML = welcomeText;
setTimeout(() => {
	visitorEle.classList.remove('bottom-40')
}, 0)

setTimeout(() => {
	visitorEle.classList.add('bottom-40');
}, 5000)

// visitor count: end
