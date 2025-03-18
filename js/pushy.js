/*! Pushy - v2.0.0 - 2025-03-18
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

(function () {
    let pushy = document.querySelector('.pushy'), // menu css class
		body = document.querySelector('body'),
		pushyLeft = 'pushy-left', // css class for left menu position
		pushyOpenLeft = 'pushy-open-left', // css class when menu is open (left position)
		pushyOpenRight = 'pushy-open-right', // css class when menu is open (right position)
		siteOverlay = document.querySelector('.site-overlay'), // site overlay
		menuLinkFocus = 'focus', // focus on link when menu is open
		submenuClass = '.pushy-submenu',
		submenuOpenClass = 'pushy-submenu-open',
		submenuClosedClass = 'pushy-submenu-closed',
		subMenus = document.querySelectorAll(submenuClass);

	// check for user defined menu btn selector
	const menuBtnClass = pushy.dataset.menuBtnSelector ?? '.menu-btn';
	const menuBtn = document.querySelector(menuBtnClass);
	const menuBtnFocus = document.querySelector(menuBtnClass);

	// check for user defined container selector
	const containerSelector = pushy.dataset.containerSelector ?? '#container';
	const container = document.querySelector(containerSelector);

	toggleSubmenu(subMenus);

	// open pushy menu when trigger btn clicked
	menuBtn.addEventListener('click', function(e) {
		togglePushy();
	});

	// close pushy menu when overlay clicked
	siteOverlay.addEventListener('click', function(e) {
		closePushy();
	});

	// close menu when 'ESC' key pressed
	window.addEventListener("keyup", function(e) {
		if (e.key === 'Escape') {
			// check if menu is open
			if(body.classList.contains(pushyOpenLeft) || body.classList.contains(pushyOpenRight)){
				closePushy(); // close pushy
				
				// focus on menu button after menu is closed
				if (menuBtnFocus) {
					menuBtnFocus.focus();
				}				
			}
		}
	});

	function togglePushy() {
		// add class to body based on menu position
		if(pushy.classList.contains(pushyLeft)) {
			body.classList.toggle(pushyOpenLeft);
		} else {
			body.classList.toggle(pushyOpenRight);
		}
	}

	function closePushy() {
		if (pushy.classList.contains(pushyLeft)) {
			body.classList.remove(pushyOpenLeft);
		} else {
			body.classList.remove(pushyOpenRight);
		}
	}

	function toggleSubmenu(subMenus) {
		subMenus.forEach(subMenu => {
			// hide submenu by default
			subMenu.classList.add(submenuClosedClass);

			subMenu.addEventListener('click', function(e) {
				console.log(e);
				/* let selected = $(this);

				if ( selected.hasClass(submenuClosedClass) ) {
					//hide same-level opened submenus
					selected.siblings(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass);
					//show submenu
					selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
				} else {
					//hide submenu
					selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
				}
				// prevent event to be triggered on parent
				e.stopPropagation(); */
			});
		});	
	}
})();