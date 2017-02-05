/*global jQuery:false */
jQuery(document).ready(function($) {
	"use strict";

	//add some elements with animate effect

	$(".big-cta").hover(
		function () {
		$('.cta a').addClass("animated shake");
		},
		function () {
		$('.cta a').removeClass("animated shake");
		}
	);
	$(".box").hover(
		function () {
		$(this).find('.icon').addClass("animated fadeInDown");
		$(this).find('p').addClass("animated fadeInUp");
		},
		function () {
		$(this).find('.icon').removeClass("animated fadeInDown");
		$(this).find('p').removeClass("animated fadeInUp");
		}
	);
	
	$('.accordion').on('show', function (e) {
	
		$(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
		$(e.target).prev('.accordion-heading').find('.accordion-toggle i').removeClass('icon-plus');
		$(e.target).prev('.accordion-heading').find('.accordion-toggle i').addClass('icon-minus');
	});
	
	$('.accordion').on('hide', function (e) {
		$(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
		$(this).find('.accordion-toggle i').not($(e.target)).removeClass('icon-minus');
		$(this).find('.accordion-toggle i').not($(e.target)).addClass('icon-plus');
	});	
	
	// tooltip
	$('.social-network li a, .options_box .color a').tooltip();

	// fancybox
	$(".fancybox").fancybox({				
		padding : 0,
		autoResize: true,
		beforeShow: function () {
			this.title = $(this.element).attr('title');
			this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
		},
		helpers : {
			title : { type: 'inside' },
		}
	});
	
	//scroll to top
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
			$('.scrollup').fadeOut();
		}
	});
	
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 1000);
			return false;
	});
	
    $('#post-slider').flexslider({
        // Primary Controls
        controlNav          : false,              //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
        directionNav        : true,              //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText            : "Previous",        //String: Set the text for the "previous" directionNav item
        nextText            : "Next",            //String: Set the text for the "next" directionNav item
         
        // Secondary Navigation
        keyboard            : true,              //Boolean: Allow slider navigating via keyboard left/right keys
        multipleKeyboard    : false,             //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
        mousewheel          : false,             //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
        pausePlay           : false,             //Boolean: Create pause/play dynamic element
        pauseText           : 'Pause',           //String: Set the text for the "pause" pausePlay item
        playText            : 'Play',            //String: Set the text for the "play" pausePlay item
         
        // Special properties
        controlsContainer   : "",                //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
        manualControls      : "",                //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
        sync                : "",                //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
        asNavFor            : "",                //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
    });
	
	$('#main-slider').owlCarousel({
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		autoplay: true,
		loop: true,
		margin: 10,
		nav: false,
		touchDrag: true,
		mouseDrag: true,
		dots: true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});
});