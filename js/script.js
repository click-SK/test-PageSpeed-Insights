(function () {

	/* Мобильное меню начало */
	$('.toggle-menu').click(function () {
		if ($('li.parrent').hasClass('no-border')) {
			$('li.parrent').removeClass('no-border');
		}
		if ($('.mobile-all-service').hasClass('active-item')) {
			$('.mobile-all-service').removeClass('active-item');
			$('.mobile-all-service-list').slideUp();
		}
		$(this).toggleClass('active-menu');
		$('.mobile-menu').toggleClass('mobile-menu-open');
		$('html').toggleClass('stopscrol-menu');
	});

	let desktopRes = window.matchMedia("(max-width: 992px)")

	function onClickBurger() {
		if (desktopRes.matches) {
			$(this).toggleClass('active-item');
			$('.mobile-all-service-list').slideToggle();
			$('li.parrent').toggleClass('no-border');
		}
	}
	$('.mobile-all-service').on('click', onClickBurger);
	window.addEventListener('resize', function () {
		if (!desktopRes.matches) {
			document.querySelector('.mobile-all-service-list').style.display = 'block';
			document.querySelector('.mobile-all-service').classList.remove('active-item');
		} 
		/*else {
			document.querySelector('.mobile-all-service-list').style.display = 'none';
		} заккрывается когда меняешь ширину экрана*/
	});

	$(document).mouseup(function (e) {
		var $target = $(e.target);
		if ($target.closest(".mobile-menu").length == 0 && $target.closest(".toggle-menu").length == 0 && $('.mobile-menu').hasClass('mobile-menu-open')) {
			$(".mobile-menu").removeClass("mobile-menu-open");
			$('.toggle-menu').removeClass('active-menu');
			$('.mobile-all-service').removeClass('active-item');
			$('li.parrent').removeClass('no-border');
			if (desktopRes.matches) {
				$('.mobile-all-service-list').slideUp();
			}
			$('html').toggleClass('stopscrol-menu');
		}
	});

	//Открытие списка машин в калькуляторе по клике на кнопку
	$('button.dropdown-cars').click(function () {
		$('.cars-list').toggleClass('cars-list-visible');
	});
/*
	//Табы на машинах
	$(document).ready(function () {
		$('.car-slider-item').click(function () {
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			var icon = $(this).data('icon');
			$(icon).siblings().removeClass('active');
			$(icon).addClass('active');
		})
	});
*/
	//Аккордеон в Вакансиях
	$(document).ready(function () {
		$('.open-offer').click(function(){
			$(this).addClass('d-none');
			$(this).prev().slideToggle(300);
		});
		$('.close-offer').click(function(){
			$(this).parent().next().removeClass('d-none');
			$(this).parent().slideToggle(300);
		});
   });


	/* фиксированная кнопка*/
	$('.bottom-messengers .first-image').click(function () {
		$('.bottom-messengers .list-messengers').stop().fadeToggle(400);
		$('.bottom-messengers .first-image .close').stop().fadeToggle(300);
		$('.bottom-messengers .first-image .chat').stop().fadeToggle(300);
		$(this).children().toggleClass('active');
		if ($('.bottom-messengers .chat').hasClass('active')) {
		   $('.bottom-messengers .messengers-text').stop().fadeIn(1600); 
		}
		else {
			$('.bottom-messengers .messengers-text').stop().fadeOut(300);
		};
	});
	/* закрытие текствого блока*/
	$('.bottom-messengers .close-messengers-text').click(function () {
		$(this).parent().hide();
	});


	/* фиксация заднего фона*/
	$('.popup-form-background').on('scroll touchmove mousewheel', function(e){
		e.preventDefault();
		e.stopPropagation();
		return false;
	})
	
	/* Открытие заказа звонка в Автопарке нажатием на машину с добавлением названия машины*/
	$('.car-item .open-phone-form').click(function () {
		var cartitle = $(this).attr('data-title');
		$('.popup-form p.car span').text(cartitle);
		$('.popup-form p.call').addClass('d-none');
		$('.popup-form p.car').removeClass('d-none');
	});
	/* Открытие заказа звонка нажатием на заказ звонка с добавлением слова звонок*/
	$('#open-phone-form').click(function () {
		$('.popup-form h4').addClass('d-none');
		$('.popup-form p.car').addClass('d-none');
		$('.popup-form p.call').removeClass('d-none');
	});
	$('.call-button').click(function () {
		$('.popup-form h4').addClass('d-none');
		$('.popup-form p.car').addClass('d-none');
		$('.popup-form p.call').removeClass('d-none');
	});
	/* Открытие заказа звонка нажатием на машину услуги с добавлением названия машины*/
	$('.car-card button.open-phone-form').click(function () {
		var cartitle = $(this).attr('data-title');
		$('.popup-form p.car span').text(cartitle);
		$('.popup-form h4').addClass('d-none');
		$('.popup-form p.call').addClass('d-none');
		$('.popup-form p.car').removeClass('d-none');
	});
	/* открытие формы */
	$('button.open-phone-form, #open-phone-form').click(function () {
		$('#phone-form').addClass('active-form');
		var title = $(this).attr('data-type');
		$('[name="type"]').val(title);
	});
	/* закрытие формы */
	$('.close-form').click(function () {
		$('#phone-form').removeClass('active-form');
		$('.order-form').trigger('reset');
		$('.popup-form p.car').addClass('d-none');
		$('.popup-form p.call').addClass('d-none');
		$('.popup-form h4').removeClass('d-none');
	});


	// Форма Telegram
	$(".order-form").submit(function (e) {
		e.preventDefault();
		let th = $(this);
		let valLength = $(this).find('.form-phone-input').val().replace(/[^0-9\.]/g, '').length;
		if (valLength >= 12) {
			$.ajax({
				type: "POST",
				url: "/js/telegram.php",
				data: th.serialize(),
				success: function () {
					th.trigger('reset');
					$('.form-result.success').addClass('act');
					setTimeout(function () {
						$('.form-result.success').removeClass('act');
					}, 3000)
					setTimeout(function () {
						$('.popup-form-background').removeClass('active-form');
					}, 3000)
				},
				error: function () {
					th.trigger('reset');
					$('.form-result.error').addClass('act');
					setTimeout(function () {
						$('.form-result.error').removeClass('act');
					}, 3000);
					setTimeout(function () {
						$('.popup-form-background').removeClass('active-form');
					}, 3000)
				}
			});
			return false;
		} else {
			th.trigger('reset');
			$('.form-result.error').addClass('act');
			setTimeout(function () {
				$('.form-result.error').removeClass('act');
			}, 3000);
		}
	});

	if (document.querySelector('input[type="tel"]')) {
		$('input[type="tel"]').inputmask({
			mask: '+38 (999) 999-99-99',
			showMaskOnHover: false
		});
	}

	/*табы и карусель*/
	$('.tablist li').on('click', function(){
		$('.tablist li').removeClass('active-tab');
		$('.all-cars [data-id]').removeClass('active');
		$(this).addClass('active-tab');
		var id = $(this).attr('id');
		$('.all-cars [data-id='+id+']').addClass('active');
		var count = $('.all-cars .car-card.active').length;
		var sizezontainer = $('section.cars .all-cars').width();
		$('section.cars .all-cars').css({"overflow-x":"scroll"});
		if(window.matchMedia('(max-width: 992px)').matches) {
			$('section.cars .slider-wrapper').width(((254+30)*count)-30);
			var sizewraper = $('section.cars .slider-wrapper').width();
			if ((sizezontainer+16) > sizewraper) {
				$('section.cars .all-cars').css({"overflow-x":"hidden"});
			}
		}
		else {
			$('.slider-wrapper').width(((294+30)*count)-30);
			var sizewraper = $('section.cars .slider-wrapper').width();
			if ((sizezontainer) > sizewraper) {
				$('section.cars .all-cars').css({"overflow-x":"hidden"});
			}
		}
	})

	var countdef = $('.all-cars .car-card.active').length;
	var sizecontainerdef = $('section.cars .all-cars').width();
		if(window.matchMedia('(max-width: 992px)').matches) {
			$('section.cars .slider-wrapper').width(((254+30)*countdef)-30);
			var sizewraperdef = $('section.cars .slider-wrapper').width();
			if ((sizecontainerdef+16) > sizewraperdef) {
				$('section.cars .all-cars').css({"overflow-x":"hidden"});
			}
		}
		else {
			$('.slider-wrapper').width(((294+30)*countdef)-30);
			var sizewraperdef = $('section.cars .slider-wrapper').width();
			if ((sizecontainerdef) > sizewraperdef) {
				$('section.cars .all-cars').css({"overflow-x":"hidden"});
			}
		}



	//для дефолтной загрузки, но не все машины
	/*var activetab = $('.active-tab').attr('id');
	$('.all-cars [data-id='+activetab+']').addClass('active');*/

	/*таб все машины */
	$('.tablist li#all').on('click', function(){
		$('.all-cars [data-id]').addClass('active');
		var count = $('.all-cars .car-card.active').length;
		$('section.cars .all-cars').css({"overflow-x":"scroll"});
		if(window.matchMedia('(max-width: 992px)').matches) {
			$('section.cars .slider-wrapper').width(((254+30)*count)-30);
		}
		else {
			$('.slider-wrapper').width(((294+30)*count)-30);
		}
	});
	//фильтр в выполненых работах
	$('section .filter .select').click(function () {
		$('section .filter ul').toggleClass('open');
		$(document).mouseup( function(e) { 
			var div = $("section .filter .select");
			if ( !div.is(e.target) && div.has(e.target).length === 0 ) { // не по div не по span в div
				$("section .filter ul").removeClass('open');
			}
		})
	});
	
	//чекбоксы в статьях блога
	$('.article-content .things-list span.thing span.checkbox').click(function () {
		$(this).toggleClass('checked');
	});
	
	//Плавный скрол по документу грант
	function animateScrollTo(targetID) {
		var topPos = $("body " + targetID).offset();
		$('body,html').animate({scrollTop: topPos.top}, 1000);
	}
	$(".scrollto").click(function (e) {
		animateScrollTo($(this).attr('data-href'))
		e.preventDefault();
	});


})();
