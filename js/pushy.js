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
		menuLinkFocus = document.querySelector('.pushy-link'), // focus on link when menu is open
		submenuClass = '.pushy-submenu',
		submenuOpenClass = 'pushy-submenu-open',
		submenuClosedClass = 'pushy-submenu-closed',
		subMenus = document.querySelectorAll(submenuClass);

	// check for user defined menu btn selector
	const menuBtnClass = pushy.dataset.menuBtnSelector ?? '.menu-btn';
	const menuBtn = document.querySelector(menuBtnClass);
	const menuBtnFocus = document.querySelector(menuBtnClass);

    // prepare sub-menus
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

	/**
	 * Toggle psuhy being open or closed
	 */
	function togglePushy() {
		// add focus to element after opening/closing
		if (body.classList.contains(pushyOpenLeft) || body.classList.contains(pushyOpenRight)) {
			// pushy currently open, closing now
			menuBtnFocus.focus();
		} else {
			// pushy currently closed, opening now
			menuLinkFocus.focus();
		}

		if (pushy.classList.contains(pushyLeft)) {
			body.classList.toggle(pushyOpenLeft);
		} else {
			body.classList.toggle(pushyOpenRight);
		}
		
	}

	/**
	 * Close the pushy menu
	 */
	function closePushy() {
		if (pushy.classList.contains(pushyLeft)) {
			body.classList.remove(pushyOpenLeft);
		} else {
			body.classList.remove(pushyOpenRight);
		}
	}

	/**
	 * Setup the sub-menus ready for use, initially by closing them all
	 * and then setting click events. This works for nested sub-menus.
	 * @param {NodeList} subMenus 
	 */
	function toggleSubmenu(subMenus) {
		subMenus.forEach(subMenu => {
			subMenu.classList.add(submenuClosedClass); // hide submenus by default

			subMenu.addEventListener('click', function(e) {
				let selected = e.currentTarget;
				if (selected.classList.contains(submenuClosedClass)) {
					// close same level siblings
					let siblings = selected.parentNode.childNodes;
					siblings.forEach((element) => {
						if (element.classList !== undefined) {
							element.classList.add(submenuClosedClass);
							element.classList.remove(submenuOpenClass);
						}
					});

					//show submenu
					selected.classList.remove(submenuClosedClass);
                    selected.classList.add(submenuOpenClass);
				} else {
					//hide submenu
					selected.classList.add(submenuClosedClass);
                    selected.classList.remove(submenuOpenClass);
				}
				e.stopPropagation(); // prevent event to be triggered on parent
			});
		});	
	}
})();