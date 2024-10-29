import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainCategory } from '../../../services/redemption.models';

@Component({
	selector: 'app-reward-redemption-header',
	templateUrl: './header.component.html',
	styles: [`
        .logo a {
            cursor: default;
        }`]
})
export class HeaderComponent implements OnInit, AfterViewInit {
	Categories: MainCategory[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {
		this.route.parent.data.subscribe(data => {
			const result = data.data;
			if (result) {
				this.Categories = result.MainCategories;
			}
		});

		$.fn.mToggleMenu = function(mMenuSelector, masterContainer, wrapper) { // 左側選單 plugin
			let menuOpen = false;
			const $has3d = has3d(); // uses for no translate3d

			if (!$has3d) {
				$(mMenuSelector).addClass('no3d');
			}

			$(this).click(() => {
				if (menuOpen = !menuOpen) {
					openMenu();
				} else {
					closeMenu();
				}
			});

			$(window).resize(() => {
				if (menuOpen && $(window).width() > 640) {
					closeMenu();
					menuOpen = false;
				}

				if (menuOpen && !$has3d) {
					$(masterContainer).css({
						width: $(window).width() - $(mMenuSelector).width(),
						height: $(window).height()
					});
				}
			});

			function openMenu() {
				$(wrapper).addClass('blocked');
				$('body').delegate(wrapper, 'click touchstart touchmove', function (e) {
					closeMenu();
					menuOpen = false;
				});

				if (!$has3d) {
					$(masterContainer).css({
						position: 'absolute'
					}).animate({
						left: $(mMenuSelector).width()
					}, 'fast', function () {
						$(this).css({
							width: $(window).width() - $(mMenuSelector).width(),
							height: $(window).height()
						});
					});
					$('body').css({
						overflow: 'hidden'
					});
					$(mMenuSelector).show().animate({
						left: 0
					}, 'fast');
					return true;
				}

				$(masterContainer).addClass('menuOpened');
			}

			function closeMenu() {
				$(wrapper).removeClass('blocked');
				$('body').undelegate(wrapper, 'click touchstart touchmove');

				if (!$has3d) {
					$(masterContainer).animate({
						width: $(window).width(),
						left: 0
					}, 'fast', function () {
						$(this).css({
							position: '',
							width: '',
							height: '',
							left: ''
						});
						$('body').css({
							overflow: ''
						});
					});
					$(mMenuSelector).animate({
						left: "-" + $(this).width()
					}, 'fast', function () {
						$(this).hide().css('left', '');
					});
					return true;
				}

				$(masterContainer).addClass('reset');
				setTimeout(function () {
					$(masterContainer).removeClass('menuOpened reset');
				}, 350);
			}

			function has3d() {
				if (!window.getComputedStyle) {
					return false;
				}
				const el = document.createElement('p');
				let _has3d;
				const transforms = {
						'webkitTransform': '-webkit-transform',
						'OTransform': '-o-transform',
						'msTransform': '-ms-transform',
						'MozTransform': '-moz-transform',
						'transform': 'transform'
					};
				document.body.insertBefore(el, null);
				for (const t in transforms) {
					if (el.style[t] !== undefined) {
						el.style[t] = "translate3d(1px,1px,1px)";
						_has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
					}
				}
				document.body.removeChild(el);
				return (_has3d && _has3d.length && _has3d !== "none");
			}
		};
	}

	ngOnInit() {
	}

	public ngAfterViewInit() {
		$('.mobile-nav-toggle').mToggleMenu('.mobile-menu', '.big-container', '.wrapper_1');
	}

	public changeCategory(categoryId) {
		this.router.navigate(['/Reward/Redemption/Products/', categoryId]);
		$('.mobile-nav-toggle').click();
	}
}
