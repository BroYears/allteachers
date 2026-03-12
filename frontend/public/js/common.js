//header
$('.pc_gnb .depth_1 > li').on('mouseover', function () {
	$('.depth_2').removeClass('active');
	$('.depth_2_wrap').removeClass('active');
	$('.depth_2_inner').removeClass('active');

	const subWrap = $(this).find('.depth_2_wrap');
	const subMenus = $(this).find('.depth_2');
	const subInner = $(this).find('.depth_2_inner');

	if (subWrap.length > 0) {
		subWrap.addClass('active');
		$('.header_con_bottom').addClass('active');
	} else if (subMenus.length > 0) {
		subInner.addClass('active');
		subMenus.addClass('active');
		$('.header_con_bottom').addClass('active');
	} else {
		$('.header_con_bottom').removeClass('active');
	}

	$('header.container').addClass('active');
});

$('.pc_gnb .depth_1 > li').on('mouseout', function () {
	$(this).find('.depth_2').removeClass('active');
	$(this).find('.depth_2_wrap').removeClass('active');
	$(this).find('.depth_2_inner').removeClass('active');
	$('header.container').removeClass('active');
	$('.header_con_bottom').removeClass('active');
});

//nav
$('.all_menu_btn > a').on('click', function (e) {
	e.preventDefault();

	$(this).toggleClass('active');

	if ($(this).hasClass('active') == true) {
		// 전체 메뉴 열기
		$('.nav_event_bg').css('display', 'block');
		$('nav').addClass('active');
		$('body').css({
			position: 'fixed',
			width: '100%',
			top: '0',
			left: '0',
			overflow: 'hidden',
			height: '100vh',
		});
	} else {
		// 전체 메뉴 닫기
		$('.nav_event_bg').css('display', 'none');
		$('nav').removeClass('active');
		$('nav .gnb > li > a').removeClass('active');
		$('nav .gnb > li ul').slideUp(100);
		$('body').css({
			position: '',
			width: '',
			top: '',
			left: '',
			overflow: '',
		});
	}
	// 닫기
	$('nav .close_con > a, .nav_event_bg').on('click', function (e) {
		e.preventDefault();

		$('.all_menu_btn > a').removeClass('active');
		$('.nav_event_bg').css('display', 'none');
		$('nav').removeClass('active');
		$('nav .gnb > li > a').removeClass('active');
		$('nav .gnb > li ul').slideUp(100);
		$('body, html').css({ 'overflow-y': 'auto', 'position': 'relative' });
	});
});

// 1depth
$('nav .gnb > li > a').on('click', function (e) {
	const $this = $(this);
	const $1depth = $this.siblings('ul');

	if ($1depth.length > 0) {
		e.preventDefault();

		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$1depth.slideUp(100);
		} else {
			$('nav .gnb > li > a').removeClass('active');
			$('nav .gnb > li ul').slideUp(100);
			$this.addClass('active');
			$1depth.slideDown(100);
		}
	}
});

// 2depth
$('nav .gnb > li > ul > li > a').on('click', function (e) {
	const $this = $(this);
	const $2depth = $this.siblings('ul');

	if ($2depth.length > 0) {
		e.preventDefault();

		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$2depth.slideUp(100);
		} else {
			const $siblings = $this.closest('ul').find('> li > a');
			const $siblingsUl = $this.closest('ul').find('> li > ul');

			$siblings.removeClass('active');
			$siblingsUl.slideUp(100);

			$this.addClass('active');
			$2depth.slideDown(100);
		}
	}
});

//main banner
var mainswiper = new Swiper('.mainSwiper', {
	slidesPerView: 1,
	loop: true,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.mainSwiper .swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.mainSwiper .swiper-button-next',
		prevEl: '.mainSwiper .swiper-button-prev',
	},
});

//main banner 정지, 재생 버튼
$('.swiper-button-pause').on('click', function () {
	$(this).toggleClass('active');

	if ($(this).hasClass('active') == true) {
		mainswiper.autoplay.stop();
	} else {
		mainswiper.autoplay.start();
	}
});

//main 중간 boardswiper
var boardswiper = new Swiper('.mainBoardSwiper', {
	slidesPerView: 6,
	spaceBetween: 20,
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	// navigation: {
	// 	nextEl: '.main_con .img_board .swiper-button-next',
	// 	prevEl: '.main_con .img_board .swiper-button-prev',
	// },
	breakpoints: {
		1: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 5,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 6,
			spaceBetween: 20,
		},
	},
});

//footer notice vertical swiper
var noticeswiper = new Swiper('.noticeSwiper', {
	direction: 'vertical',
	loop: true,
	centeredSlides: true,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
	},
	pagination: {
		clickable: true,
	},
});

//footer family site btn
// $('.family_site > a').on('click', function (e) {
// 	e.preventDefault();
// 	$(this).toggleClass('on');
// 	$('.family_site > div').slideToggle(300);
// });

//fixed top btn
$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		$('.top_btn').addClass('up');
	} else {
		$('.top_btn').removeClass('up');
	}
});
$('.top_btn > a').click(function (e) {
	e.preventDefault();
	$('html, body').animate({ scrollTop: 0 });
});

//sub_menu
$('.mo_snb .mo_selected').on('click', function () {
	$('.mo_snb').toggleClass('active');
	if ($('.mo_snb').hasClass('active') == true) {
		$('.mo_snb > ul').slideDown(300);
		$('.mo_snb').addClass('active');

		$('html').on('click', function (e) {
			if ($(e.target).parents('.mo_snb').length < 1 && !$(e.target).hasClass('mo_snb')) {
				$('.mo_snb > ul').slideUp(300);
				$('.mo_snb').removeClass('active');
			}
		});
	} else {
		$('.mo_snb > ul').slideUp(300);
		$('.mo_snb').removeClass('active');
	}
});
function selectOption(optionElement) {
	const selectBox = optionElement.closest('.mo_sub');
	const selectedElement = selectBox.querySelector('.mo_selected');
	selectedElement.textContent = optionElement.textContent;
}

/*page top banner scroll event*/
function topBannerScrollEvent() {
	var scrolled = $(window).scrollTop() + 10;

	$('.top_banner').css('background-position', 'center ' + -(scrolled * 0.2) + 'px');
}

$(window).scroll(function () {
	if (window.innerWidth < 980) {
		$('.top_banner').css('background-position', 'center');
	} else {
		topBannerScrollEvent();
	}
});

var timer = null;
$(window).on('resize', function () {
	clearTimeout(timer);
	timer = setTimeout(function () {
		if (window.innerWidth < 980) {
			$('.top_banner').css('background-position', 'center');
		} else {
			topBannerScrollEvent();
		}
	}, 100);
});

// tab menu
$('.course-tab').on('click', function (e) {
	e.preventDefault();
	const $this = $(this);
	const selectedTab = $this.data('tab');

	if (selectedTab === 'all') {
		$('.course-tab').removeClass('active');
		$this.addClass('active');
		$('.course-card').show();
		return;
	} else {
		$('.course-tab[data-tab="all"]').removeClass('active');

		$this.toggleClass('active');

		const selectedCategories = $('.course-tab.active')
			.not('[data-tab="all"]')
			.map(function () {
				return $(this).data('tab');
			})
			.get();

		if (selectedCategories.length === 0) {
			$('.course-tab[data-tab="all"]').addClass('active');
			$('.course-card').show();
		} else {
			$('.course-card').each(function () {
				const category = $(this).data('category');
				$(this).toggle(selectedCategories.includes(category));
			});
		}
	}
});

// lecture tab menu
$('.lecture-tab-btn').on('click', function () {
	const selected = $(this).data('tab');

	$('.lecture-tab-btn').removeClass('active');
	$(this).addClass('active');

	$('.lecture-tab-content').removeClass('active');
	$('.lecture-tab-content[data-content="' + selected + '"]').addClass('active');
});

// policy tab menu
$('.policy-tab').on('click', function () {
	const selected = $(this).data('tab');

	$('.policy-tab').removeClass('active');
	$(this).addClass('active');

	$('.policy-content').removeClass('active');
	$('.policy-content[data-content="' + selected + '"]').addClass('active');
});

const urlParams = new URLSearchParams(window.location.search);
const tab = urlParams.get('tab');

if (tab) {
	$('.policy-tab[data-tab="' + tab + '"]').trigger('click');
}

// scroll evnet
$(document).ready(function () {
	$(document).scroll();
	setTimeout(() => {
		$(document).scroll();
	}, 100);
});

$(document).scroll(function () {
	let scTop = $(window).scrollTop();
	let wH = $(window).height();

	$('.scroll-fade').each(function () {
		let offsetTop = $(this).offset().top - wH;
		if (scTop > offsetTop) {
			$(this).addClass('fade-in');
		} else {
			$(this).removeClass('fade-in');
		}
	});
});
