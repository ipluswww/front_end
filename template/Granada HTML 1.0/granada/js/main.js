/* ================================================
----------- Granada ---------- */
(function ($) {
	"use strict";
	var Granada = {
		initialised: false,
		version: 1.0,
		mobile: false,
		responsiveExtra: false,
		headerClone: false,
		container : $('#portfolio-item-container'),
		portfolioElAnimation: true,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			// Call Granada Functions
			this.checkMobile();
			this.checkPlaceholder();
			this.fullHeight();
			this.menuHover();
			this.stickyMenu();
			this.responsiveMenu();
			this.responsiveMenuExtra();
			this.searchInput();
			this.itemSizeFix();
			this.hoverItemFix();
			this.verticalTabHeightFix();
			this.filterColorBg();
			this.productCarousel();
			this.sideBackground();
			this.responsiveVideo();
			this.priceSlider();
			this.ratings();
			this.collapseArrows();
			this.owlCarousels();
			this.scrollToTopAnimation();
			this.scrollToClass();
			this.singlePortfolioToScroll();
			this.singlePortfolioAffix();
			this.filterScrollBar();
			this.selectBox();
			this.bootstrapSwitch();
			this.tooltip();
			this.popover();
			this.countTo();
			this.progressBars();
			this.registerKnob();
			this.prettyPhoto();
			this.flickerFeed();
			this.parallax();
			this.twitterFeed();
			
			var self = this;
			//* Portfolio pages animations and isotope filter plugin */
			if (typeof imagesLoaded === 'function') {
				imagesLoaded(self.container, function() {
					self.isotopeActivate();
					// recall for plugin support
					self.isotopeFilter();
				});
			}

		},
		checkMobile: function () {
			/* Mobile Detect*/
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				this.mobile = true;
			} else {
				this.mobile = false;
			}
		},
		checkPlaceholder: function () {
			/* Check for placeholder support */
			$.support.placeholder = (function(){
				var i = document.createElement('input');
				return 'placeholder' in i;
			})();

			// if Placeholder is not supported call plugin
			if (!$.support.placeholder && $.fn.placeholder) {
				$('input, textarea').placeholder();
			}
		},
		fullHeight: function () {
			// Make a section full window height
			var winHeight = $(window).height();
			$('.full-height').each(function () {
				var $this = $(this);

				/* via home-full-height class it make header + home section's height  = window's height */
				if ($this.hasClass('home-full-height')) { 
					var headerHeight = $('#header').height(),
						homeHeight = winHeight - headerHeight;
					$this.css('height', homeHeight);
				} else {
					$this.css('height', winHeight);
				}
			});
		},
		stickyMenu: function () {
			// Stickymenu with waypoint and waypoint sticky plugins

			if ($(window).width() > 979) {
				var self = this,
					stickyHeader = $('#sticky-header');

				/* if not apended clone and append to sticky header*/
				if (!self.headerClone) {
					var cloneHeader = $('[data-clone="sticky"]').clone(true);

					stickyHeader.append(cloneHeader).find('#responsive-nav').remove();
					self.headerClone = true;
				}

				if ($.fn.waypoint) {

					$('[data-fixed="fixed"]').waypoint('sticky', {
						stuckClass:'fixed',
						offset: -400
					});
				}
			}
			
		},
		destroyStickyHeader: function () {
			// Destroy Stickymenu for smaller devices
			if($.fn.waypoint && $(window).width() < 980) {
				$('[data-fixed="fixed"]').waypoint('unsticky');
			}
		},
		menuHover: function () {
			// Sub menu show/hide with hoverIntent plugin
			if ($.fn.hoverIntent) {
				$('ul.menu').hoverIntent({
					over: function() {
						$(this).addClass('active');

					},
					out: function() {
						$(this).removeClass('active');
					},
					selector: 'li',
					timeout: 145,
					interval: 55
				});
			}
		},
		responsiveMenu: function () {
			/* Create Responsive Menu */
			var menu = $('#header').find('.menu').clone(true).removeClass('menu clearfix').addClass('responsive-menu'),
				container = $('#header').find('#responsive-menu-container');
					
			container.append(menu);
			
			
			container.find('li, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-6, .col-md-2, .col-md-3, .col-md-4, .col-md-6').each(function () {

				var $this = $(this);
				
				if ($this.hasClass('megamenu-container')) {
					$this.removeClass('megamenu-container');
				}

				$this.has('ul, .megamenu').prepend('<span class="menu-btn-wrapper"><span class="menu-btn"></span></span>');
				
			});
			
			$('.menu-btn-wrapper').on('click', function (e) {
				var $this= $(this);
				
				if (! $this.hasClass('active') ) {
					$(this)
					.closest('li, div')
					.addClass('open')
					.end()
					.addClass('active')
					.siblings('ul, .megamenu')
					.slideDown('800');
				}else {
					$(this)
					.closest('li, div')
					.removeClass('open')
					.end()
					.removeClass('active')
					.siblings('ul, .megamenu')
					.slideUp('800');
				}
				e.preventDefault();
			});
					
			$('#responsive-btn').on('click', function (e) {
				var $this = $(this),
					container = $('#responsive-menu-container');
				
				if( $this.hasClass('active')) {
					container.slideUp(300, function () {
						$this.removeClass('active');
					});
				
				}else {
					container.slideDown(300, function () {
						$this.addClass('active');
					});
				}
				e.preventDefault();
			});

		},
		responsiveMenuExtra: function () {
			// To include search, cart and user dropdowns to responsive menu for header1 style
			var self = this;
			// just for the header1 style and for smaller devices <767 
			if ($('#header').hasClass('header1') && $(window).width() <=767 && !self.responsiveExtra) {
				var container = $('#responsive-menu-container'),
					search = $('#header').find('.search-container').clone(true),
					user = $('#header').find('.user-dropdown').clone(true),
					cart = $('#header').find('.cart-dropdown').clone(true);

					container.prepend(search).append(cart, user);
					self.responsiveExtra = true;
			} else if ($(window).width() > 767 && self.responsiveExtra) {
				var container = $('#responsive-menu-container');
				container.find('.search-container').remove();
				container.find('.user-dropdown').remove();
				container.find('.cart-dropdown').remove();
				self.responsiveExtra = false;
			} else {
				return;
			}
				
		},
		itemSizeFix: function () {
			/* Fix for item display type which has no hover animation*/
			var container = $('#content'),
				items = container.find('.product');


			items.each(function() {
				var $this = $(this);

				/* For product 2 hover state will check */
				if ($this.hasClass('product2')) 
					return;

				if($this.width() <= 220) {
					$this.find('.product-add-btn').addClass('responsive');
				} else {
					$this.find('.product-add-btn').removeClass('responsive');
				}
			});
			
		},
		hoverItemFix: function () {
			$('.product.product2').on('mouseover', function () {
				/* for product2 on hover state */
				var $this = $(this);
				if($this.width() <= 220) {
					$this.find('.product-add-btn').addClass('responsive');
				}
			}).on('mouseleave', function () {
				$(this).find('.product-add-btn').removeClass('responsive');
			});
		},
		verticalTabFixFunc: function () {
			// Tab Left/Right Height Fix function
			if ( $(window).width() <= 767 ) {
				return;
			}

			var $this = $(this),
				tabContent = $this.find('.tab-content'),
				tabContentHeight = tabContent.outerHeight(),
				navLi = $this.find('.nav.nav-tabs').find('li'),
				navLiLen = navLi.length,
				calcVal  = tabContentHeight / navLiLen;

				navLi.find('a').css({'height':calcVal + 1, 'line-height': calcVal+'px'});

		},
		verticalTabHeightFix: function () {
			// get tab content height
			// find how many li a elem we have
			// then calculate easch height
			var self = this;
			$('.tab-container').each(function () {
				self.verticalTabFixFunc.call(this);
			});
		},
		searchInput: function () {
			/* Header Search input animation */
			var searchForm = $('.search-form');
			$('.header-search-btn, .search-close-btn').on('click', function(e) {
				if (searchForm.hasClass('active')) {
					searchForm.removeClass('active');
				} else {
					searchForm.addClass('active');
				}
				e.preventDefault();
			});
		},
		filterColorBg: function () {
			/* Category-item filter color box background */
			$('.filter-color-box').each(function() {
				var $this = $(this),
					bgColor = $this.data('bgcolor');

					$this.css('background-color', bgColor);
			});
		},
		twitterFeed: function () {
			/* Twitter Feeds */
			if ($.fn.tweet && $('.twitter-top-widget').length) {
				/* Twitter feed for user*/
		        $('.twitter-top-widget').tweet({
		            modpath: './js/twitter/',
		            avatar_size: 32,
					count: 2,
					username: "eternalfriend38", // write feed query here
					loading_text: "searching twitter...",
		            join_text: "",
		            retweets: false,
		            template: "<div class=\"tweet_top clearfix\">{avatar}<span>@{user}</span></div>{text}{time}"
		            /* etc... */
		        });
		        
		    }

		    if ($.fn.tweet && $('.twitter-widget').length) {
		    	/* Twitter feed with search query */
		        $('.twitter-widget').tweet({
		            modpath: './js/twitter/',
		            avatar_size: '',
					count: 2,
					query: "themeforest", // write feed query here
					loading_text: "searching twitter...",
		            join_text: "",
		            retweets: false,
		            template: "{text}{time}"
		            /* etc... */
		        });
		    }
		},
		productCarousel: function () {
			/* product.html Product image carousel */
            if($.fn.bxSlider) {
            	var self = this,
					slider = $('.product-single-carousel').bxSlider({
					slideWidth: 600,
					minSlides: 1,
					maxSlides: 1,
					pager: false,
					onSliderLoad: function () {
						self.resizeproductCarousel();
					}
				});
			}
		},
		resizeproductCarousel: function () {
			// Small fix for overflow issue for responsive carousel
			// product.html
			var bxHeight = $('.bx-viewport').height();
			$('.bx-viewport').closest('.carousel-container').css('height', bxHeight);
		},
		sideBackground: function () {
			// Fix for product.html slider sides background
			if ($('.sidebg').length && $(window).width() > 767) {
				var windWidth = $(window).width(),
					contaiterWidth = $('#product-single-container').find('.container').width(),
					sideWidth = (windWidth - contaiterWidth ) / 2 ;

				$('.sidebg').width(sideWidth);
			}
		},
		responsiveVideo: function () {
			/* Check for fitVids plugin 
			-- And activate it for all videos under the body tag */
			if ($.fn.fitVids) {
				$('body').fitVids();
			}
		},
		priceSlider: function () {
			/* Price Filter Slider / Category pages */
			if ($.fn.noUiSlider) {
				$('#price-range').noUiSlider({
					range: [0, 800],
					start: [120, 640],
					handles: 2,
					connect: true,
					serialization: {
						to: [ $('#price-range-low'), $('#price-range-high') ]
					}
				});
			}
		},
		ratings : function () {
			/* Calculate Ratings % and set width */
			$.each($('.ratings-result'), function () {
				var $this = $(this),
					parentWidth = $this.closest('.ratings').width(),
					rating = $(this).data('result'),
					newWidth = (parentWidth / 100) * rating;
					
				$(this).css('width', newWidth);
			});
		},
		collapseArrows : function () {
			// Change accordion/collapse icons with adding class
			$('.panel').each(function () {
				var $this= $(this),
					accordionBtn = $this.find('.accordion-btn'),
					accordionBody = $this.find('.accordion-body');

				if (accordionBtn.length) {
					accordionBody.on('shown.bs.collapse', function () {

						if (!accordionBtn.hasClass('open')) {
							accordionBtn.addClass('open');
						}
						
					}).on('hidden.bs.collapse', function () {
						if (accordionBtn.hasClass('open')) {
							accordionBtn.removeClass('open');
						}
						
					});
				}
				
			});

			// Blog Sidebar category collapse
			$('.category-widget-btn').on('click', function (e) {
				var $this = $(this),
					parent= $this.closest('li');

				if (parent.hasClass('open')) {
					parent.find('ul').slideUp(400, function() {
						parent.removeClass('open');
					});
				} else {
					parent.find('ul').slideDown(400, function() {
						parent.addClass('open');
					});
				}
				e.preventDefault();
			});
		},
		checkSupport: function(elemname, pluginname) {
			/* Simple check element and plugin */
			return (elemname.length && pluginname) ? true : false;
		},
		owlCarousels: function () {
			var self = this;

			// index.html special products
		    var  specialProductsCarousel = $('.owl-carousel.products-section-carousel');
		    if (self.checkSupport(specialProductsCarousel, $.fn.owlCarousel)) {
			    specialProductsCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

			/*  index2.html etc... Brand Carousel */			
			var  brandsCarousel = $('.owl-carousel.brands-carousel');
			if (self.checkSupport(brandsCarousel, $.fn.owlCarousel)) {
		        brandsCarousel.owlCarousel({
		            items: 6,
		            itemsDesktop : [1199,5],
		            itemsDesktopSmall: [979,4],
		            itemsTablet: [768,3],
		            itemsMobile : [479,2],
		            slideSpeed: 600,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            autoHeight : true
		        });
		    }

		    /*  index2.html From the Blog Carousel */			
			var  blogPostsCarousel = $('.owl-carousel.blog-posts-carousel');
			if (self.checkSupport(blogPostsCarousel, $.fn.owlCarousel)) {
		        blogPostsCarousel.owlCarousel({
		            items: 2,
		            itemsDesktop : [1199,2],
		            itemsDesktopSmall: [979,2],
		            itemsTablet: [768,1],
		            itemsMobile : [479,1],
		            slideSpeed: 600,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            autoHeight : true
		        });
		    }


		    // index2.html New Arrivals carousel
		    var  newArrivalsCarousel = $('.owl-carousel.new-arrivals-carousel');
		    if (self.checkSupport(newArrivalsCarousel, $.fn.owlCarousel)) {
			    newArrivalsCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

			// index2.html Bestsellers carousel
		    var  topBestsellersCarousel = $('.owl-carousel.top-bestsellers-carousel');
		    if (self.checkSupport(topBestsellersCarousel, $.fn.owlCarousel)) {
			    topBestsellersCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

			// index3.html Tab New Arrivals carousel
		    var  tabArrivalsCarousel = $('.owl-carousel.tab-arrivals-carousel');
		    if (self.checkSupport(tabArrivalsCarousel, $.fn.owlCarousel)) {
			    tabArrivalsCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

			// index3.html Tab BestSellers carousel
		    var  tabSellersCarousel = $('.owl-carousel.tab-bestsellers-carousel');
		    if (self.checkSupport(tabSellersCarousel, $.fn.owlCarousel)) {
			    tabSellersCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 11000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

			// index3.html Tab Featured carousel
		    var  tabFeaturedCarousel = $('.owl-carousel.tab-featured-carousel');
		    if (self.checkSupport(tabFeaturedCarousel, $.fn.owlCarousel)) {
			    tabFeaturedCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 12000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

			// index3.html Top Rated carousel
		    var  topRatedCarousel = $('.owl-carousel.top-rated-carousel');
		    if (self.checkSupport(topRatedCarousel, $.fn.owlCarousel)) {
			    topRatedCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

			// index3.html Product slider/lookbok 
		    var  productSlider = $('.owl-carousel.product-slider');
		    if (self.checkSupport(productSlider, $.fn.owlCarousel)) {
			    productSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 500,
					paginationSpeed : 500,
					autoPlay: 8800,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : false,
		            transitionStyle : 'fade'
				});
			}

			/*  index3.html From the Blog Carousel */			
			var  fromBlogCarousel = $('.owl-carousel.from-theblog-small');
			if (self.checkSupport(fromBlogCarousel, $.fn.owlCarousel)) {
		        fromBlogCarousel.owlCarousel({
		            items: 3,
		            itemsDesktop : [1199,3],
		            itemsDesktopSmall: [979,2],
		            itemsTablet: [768,1],
		            itemsMobile : [479,1],
		            slideSpeed: 600,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            autoHeight : true
		        });
		    }

		    // index3.html footer top slider widgets / popular slider
		    var  footerPopularSlider = $('.owl-carousel.footer-popular-slider');
		    if (self.checkSupport(footerPopularSlider, $.fn.owlCarousel)) {
			    footerPopularSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 500,
					paginationSpeed : 500,
					autoPlay: 11000,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}

			// index3.html footer top slider widgets / most favorite slider
		    var  footerFavoriteSlider = $('.owl-carousel.footer-favorite-slider');
		    if (self.checkSupport(footerFavoriteSlider, $.fn.owlCarousel)) {
			    footerFavoriteSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 500,
					paginationSpeed : 500,
					autoPlay: 13000,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}

			// index3.html footer top slider widgets / most favorite slider
		    var  footerSpecialsSlider = $('.owl-carousel.footer-specials-slider');
		    if (self.checkSupport(footerSpecialsSlider, $.fn.owlCarousel)) {
			    footerSpecialsSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 500,
					paginationSpeed : 500,
					autoPlay: 12000,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}

			/*  index4.html From the Blog Carousel */			
			var  fromBlogWide = $('.owl-carousel.from-theblog-wide');
			if (self.checkSupport(fromBlogWide, $.fn.owlCarousel)) {
		        fromBlogWide.owlCarousel({
		            items: 2,
		            itemsDesktop : [1199,2],
		            itemsDesktopSmall: [979,2],
		            itemsTablet: [768,1],
		            itemsMobile : [479,1],
		            slideSpeed: 600,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            autoHeight : false
		        });
		    }

			// index4.html footer top slider widgets / top rated slider
		    var  footerTopratedSlider = $('.owl-carousel.footer-toprated-slider');
		    if (self.checkSupport(footerTopratedSlider, $.fn.owlCarousel)) {
			    footerTopratedSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 500,
					paginationSpeed : 500,
					autoPlay: 10000,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}


			// index4.html sidebar popular slider
		    var  popularSlider = $('.owl-carousel.popular-slider');
		    if (self.checkSupport(popularSlider, $.fn.owlCarousel)) {
			    popularSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 400,
					paginationSpeed : 400,
					autoPlay: 7200,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}

			// index4.html sidebar Specials slider
		    var  specialsSlider = $('.owl-carousel.specials-slider');
		    if (self.checkSupport(specialsSlider, $.fn.owlCarousel)) {
			    specialsSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 400,
					paginationSpeed : 400,
					autoPlay: 7200,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade',
		            afterInit: function () {
		            	self.itemSizeFix();
		            }
				});
			}

		    // category-banner-slider.html category slider banner
		    var  categoryBannerSlider = $('.owl-carousel.category-banner-slider');
		    if (self.checkSupport(categoryBannerSlider, $.fn.owlCarousel)) {
			    categoryBannerSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 400,
					paginationSpeed : 400,
					autoPlay: 9000,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'goDown'
				});
			}

		    // category.html sidebar bestsellers slider
		    var  bestsellersSlider = $('.owl-carousel.bestsellers-slider');
		    if (self.checkSupport(bestsellersSlider, $.fn.owlCarousel)) {
			    bestsellersSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 400,
					paginationSpeed : 400,
					autoPlay: 7200,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}


			// product.html - bestsellers carousel
		    var  bestsellersCarousel = $('.owl-carousel.bestsellers-carousel');
		    if (self.checkSupport(bestsellersCarousel, $.fn.owlCarousel)) {
			    bestsellersCarousel.owlCarousel({
					items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
				});
			}

		    // aboutus.html About us Banner Slider
		    var  aboutBannerSlider = $('.owl-carousel.about-banner-slider');
		    if (self.checkSupport(aboutBannerSlider, $.fn.owlCarousel)) {
			    aboutBannerSlider.owlCarousel({
					navigation : false,
					pagination: true,
					slideSpeed : 400,
					paginationSpeed : 400,
					autoPlay: 8400,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : false,
		            transitionStyle : "backSlide"
				});
			}

			// aboutus.html About us Testimonials Slider
		    var  testimonialSlider = $('.owl-carousel.testimonials-slider');
		    if (self.checkSupport(testimonialSlider, $.fn.owlCarousel)) {
			    testimonialSlider.owlCarousel({
					navigation : true,
					pagination: false,
					slideSpeed : 400,
					paginationSpeed : 400,
					autoPlay: 9600,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : false,
		            transitionStyle : "backSlide"
				});
			}

			/* Team member carousel - aboutus.html */
			var  memberCarousel = $('.team-member-carousel.owl-carousel');
			if (self.checkSupport(memberCarousel, $.fn.owlCarousel)) {
		        memberCarousel.owlCarousel({
		            items: 2,
		            itemsDesktop : [1199,2],
		            itemsDesktopSmall: [979,1],
		            itemsTablet: [768,1],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 12000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : true
		        });
		    }

			/* Latest portfolio/projects - aboutus.html */
			var  latestProjects = $('.latest-projects.owl-carousel');
			if (self.checkSupport(latestProjects, $.fn.owlCarousel)) {
		        latestProjects.owlCarousel({
		            items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 10000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : true
		        });
		    }

		    // blog.html sidebar latest posts slider
		    var  latestPostsSlider = $('.owl-carousel.latest-posts-slider');
		    if (self.checkSupport(latestPostsSlider, $.fn.owlCarousel)) {
			    latestPostsSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 400,
					paginationSpeed : 400,
					autoPlay: 7200,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}

		    // blog.html sidebar popular posts slider
		    var  popularPostsSlider = $('.owl-carousel.popular-posts-slider');
		    if (self.checkSupport(popularPostsSlider, $.fn.owlCarousel)) {
			    popularPostsSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 600,
					paginationSpeed : 400,
					autoPlay: 9000,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}

			// blog.html sidebar comments slider
		    var  commentsSlider = $('.owl-carousel.comments-slider');
		    if (self.checkSupport(commentsSlider, $.fn.owlCarousel)) {
			    commentsSlider.owlCarousel({
					navigation : true,
					navigationText : false,
					pagination: false,
					slideSpeed : 600,
					paginationSpeed : 400,
					autoPlay: 10000,
					singleItem:true,
					mouseDrag: true,
		            autoHeight : true,
		            transitionStyle : 'fade'
				});
			}
				

			/* Single.html - related posts carousel */
			var  relatedPosts = $('.related-posts-carousel.owl-carousel');
			if (self.checkSupport(relatedPosts, $.fn.owlCarousel)) {
		        relatedPosts.owlCarousel({
		            items: 3,
		            itemsDesktop : [1199,3],
		            itemsDesktopSmall: [979,2],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 8000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : false
		        });
		    }


			/* Also purchased slider - product.html */
			var  purchasedItems = $('.purchased-items-slider.owl-carousel');
			if (self.checkSupport(purchasedItems, $.fn.owlCarousel)) {
		        purchasedItems.owlCarousel({
		            items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 8000,
		            stopOnHover: true,
		            navigation: false,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : true
		        });
		    }

		    /* Single portfolio Slider - single-portfolio.html */
			var  singlePortfolioSlider = $('.single-portfolio-slider.owl-carousel');
			if (self.checkSupport(singlePortfolioSlider, $.fn.owlCarousel)) {
		        singlePortfolioSlider.owlCarousel({
		            singleItem:true,
		            slideSpeed: 400,
		            autoPlay: 8800,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : true,
		            transitionStyle : "goDown",
					afterAction : syncPosition,
					responsiveRefreshRate : 200
		        });
		    }

		    /* Related portfolio - single-portfolio.html */
			var  sliderSyncCarousel = $('.slider-thumb-nav.owl-carousel');
			if (self.checkSupport(sliderSyncCarousel, $.fn.owlCarousel)) {
		        sliderSyncCarousel.owlCarousel({
		            items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,4],
		            itemsTablet: [768,3],
		            itemsMobile : [479,2],
		            slideSpeed: 400,
		            autoPlay: 11000,
		            stopOnHover: true,
		            navigation: false,
		            pagination: false,
		            responsive: true,
		            mouseDrag: true,
		            autoHeight : false,
		            responsiveRefreshRate : 100,
					afterInit : function(el){
						el.find(".owl-item").eq(0).addClass("active");
					}
		        });
		    }

		    /* Sync Carousels for single-portfolio page */
			function syncPosition(el) {
				var current = this.currentItem;

				$('.slider-thumb-nav.owl-carousel')
					.find(".owl-item")
					.removeClass("active")
					.eq(current)
					.addClass("active");

				if($('.slider-thumb-nav.owl-carousel').data("owlCarousel") !== undefined){
					center(current);
				}
			}

			$('.slider-thumb-nav.owl-carousel').on("click", ".owl-item", function(e){
				e.preventDefault();
				var number = $(this).data("owlItem");
				singlePortfolioSlider.trigger("owl.goTo",number);
			});

			function center(number){
				var sync2visible = sliderSyncCarousel.data("owlCarousel").owl.visibleItems,
					num = number,
					found = false,
					i;

				for (i in sync2visible) {
					if (num === sync2visible[i]) {
						found = true;
					}
				}

				if (found === false){
					if (num>sync2visible[sync2visible.length-1]){
						sliderSyncCarousel.trigger("owl.goTo", num - sync2visible.length+2);
					} else {
						if (num - 1 === -1){
						num = 0;
					}
						sliderSyncCarousel.trigger("owl.goTo", num);
					}
				} else if (num === sync2visible[sync2visible.length-1]) {
					sliderSyncCarousel.trigger("owl.goTo", sync2visible[1]);
				} else if (num === sync2visible[0]) {
					sliderSyncCarousel.trigger("owl.goTo", num-1);
				}

			}


			/* Related portfolio - single-portfolio.html */
			var  relatedProjects = $('.related-projects.owl-carousel');
			if (self.checkSupport(relatedProjects, $.fn.owlCarousel)) {
		        relatedProjects.owlCarousel({
		            items: 4,
		            itemsDesktop : [1199,4],
		            itemsDesktopSmall: [979,3],
		            itemsTablet: [768,2],
		            itemsMobile : [479,1],
		            slideSpeed: 400,
		            autoPlay: 11000,
		            stopOnHover: true,
		            navigation: true,
		            pagination: false,
		            responsive: true,
		            mouseDrag: false,
		            autoHeight : true
		        });
		    }

		},
		scrollTopBtnAppear: function () {
			// This will be triggered at the bottom of code with window scroll event
			var windowTop = $(window).scrollTop(),
		            scrollTop = $('#scroll-top');

	        if (windowTop >= 300) {
	            scrollTop.addClass('fixed');
	        } else {
	            scrollTop.removeClass('fixed');
	        }
		    
		},
		scrollToAnimation: function (speed, offset, e) {
			/* General scroll to function */
			var targetEl = $(this).attr('href'),
				toTop = false;

			if (!$(targetEl).length) {
				if (targetEl === '#header' || targetEl === '#top' || targetEl === '#wrapper') {
					targetPos = 0;
					toTop = true;
				} else {
					return;
				}
			} else {
				var elem = $(targetEl),
					targetPos = offset ? ( elem.offset().top + offset ) : elem.offset().top;
			}
			
			if (targetEl || toTop) {
				$('html, body').animate({
		            'scrollTop': targetPos
		        }, speed || 1200);
		        e.preventDefault();
			}
		},
		scrollToTopAnimation: function () {
			var self = this;
			// Scroll to top animation when the scroll-top button is clicked
			$('#scroll-top').on('click', function (e) {
		        self.scrollToAnimation.call(this, 1200, 0, e);
		    });
		},
		scrollToClass: function () {
			var self = this;
			// Scroll to animation - predefined class
			// Just add this class to any element and 
			// add href attribute with target id (#targer like so ) for target 
			// you can change 0 offset to -60 (height of fixed header)
			$('.scrollto, .section-btn').on('click', function (e) {
		        self.scrollToAnimation.call(this, 1200, 0, e);
		    });
		},
		singlePortfolioToScroll: function () {
			// single-porfoliot-2.html To move Thumbnail navigation 
			// and smooth scroll to target images
			var self = this;
			// Scroll to top animation when the scroll-top button is clicked
			$('#slider-thumbs').find('a').on('click', function (e) {
				// get related position and move the thumbnail navs
				var $this = $(this),
					targetEl = $this.attr('href'),
					thumbNavEl = $('#slider-thumb'),
					targetPos = $(targetEl).position().top;

				 $this
					.siblings()
					.removeClass('active')
					.end()
					.addClass('active');

		        self.scrollToAnimation.call(this, 1200, 0, e);
		    });
		},
		singlePortfolioAffix : function () {
			$('#slider-thumbs').affix({
				offset: {
					top: function () {
						var headerHeight =$('#header').outerHeight(true);

						return (this.top = headerHeight + 83);
					},
					bottom: function () {
						var portfolioHeight =  $('.single-portfolio-media-container').outerHeight(true),
							contHeight = $('#content').outerHeight(true),
							footerHeight =$('#footer').outerHeight(true),
							bottomOffset = ((contHeight - portfolioHeight) + footerHeight);
						return (this.bottom = bottomOffset);
					}
				}
			});
		},
		filterScrollBar: function () {
			/* Category filter sidebar custom scrollbar with jscrollpane plugin */
			var catFilter = $('.category-filter-list.jscrollpane'),
				checkForScrollbar = function(a) {
					var catHeight = a.height();
					if ( catHeight > 300 ) {
						a.css('height', 300);
						a.jScrollPane({
							showArrows: false
						});
					}
				};
				
			// on document ready call plugin if section height > 300	
			$.each(catFilter, function () {
				var $this = $(this);
				checkForScrollbar($this);
				
			});
				
			// Call plugin after collapse activated
			$('#category-filter').find('.collapse').on('shown.bs.collapse', function() {
				var cFilter = $(this).find('.category-filter-list.jscrollpane');
				checkForScrollbar(cFilter);
			});
				
		},
		fixfilterScrollBar: function() {
			// on window resize fix scroll bar position
			$('.category-filter-list.jscrollpane').each(function () {
				var apiJsc = $(this).data('jsp'),
				resTime;
				
				if (!resTime) {
					resTime = setTimeout(function(){
						if (apiJsc) {
							apiJsc.reinitialise();
						}
						resTime = null;
					},50);
				}
			});
		},
		selectBox: function () {
			// Custom select box via selectbox plugin
			// Be sure to include jquery.selectbox.min.js file
			if ($.fn.selectbox) {
				$('.selectbox').selectbox({
					effect: "fade"
				});
			}
			
		},
		bootstrapSwitch: function () {
			//Bootstrap switch
			if ($.fn.bootstrapSwitch) {
				$('.switch').bootstrapSwitch();
			}
		},
		tooltip: function () {
			// Bootstrap tooltip
			if($.fn.tooltip) {
				$('.add-tooltip').tooltip();
			}
		},
		popover: function () {
			// Bootstrap tooltip
			if($.fn.popover) {
				$('.add-popover').popover({
					trigger: 'focus'
				});
			}
		},
		countTo: function () {
			// CountTo plugin used count animations for homepages
			if ($.fn.countTo) {
				if ($.fn.waypoint) {
					$('.count').waypoint(function () {
						$(this).countTo();
					}, {
						offset: function() {
							return ( $(window).height() - 100);
						},
						triggerOnce: true 
					});
				} else {
					$('.count').countTo();
				}	
			} else { 
				// fallback if count plugin doesn't included
				// Get the data-to value and add it to element
				$('.count').each(function () {
					var $this = $(this),
						countValue = $this.data('to');

						$this.text(countValue);
				});
			}
		},
		progressBars: function () {
			var self = this;
			// Calculate and Animate Progress 
			// With waypoing plugin calculate width of the progress bar
			if ($.fn.waypoint) {
				$('.progress-animate').waypoint(function () {
					if (!$(this).hasClass('circle-progress')) {
						var $this = $(this),
						progressVal = $(this).data('width'),
						progressText = $this.find('.progress-text');

						$this.css({ 'width' : progressVal + '%'}, 400);

						setTimeout(function() {
							progressText.fadeIn(400, function () {
								$this.removeClass('progress-animate');
							});
						}, 100);
						
					} else {
						// Animate knob --- Circle progrss bars
						self.animateKnob();
					}
				}, {
					offset: function() {
						return ( $(window).height() - 10);
					}
				});
				

			} else {
				// Fallback if the waypoint plugin isn't inclueded
				// Get the value and calculate width of progress bar
				$('.progress-animate').each(function () {
					var $this = $(this),
						progressVal = $(this).data('width'),
						progressText = $this.find('.progress-text');

					$this.css({ 'width' : progressVal + '%'}, 400);
					progressText.fadeIn(500);
				});

			}
		},
		registerKnob: function() {
			// Register knob plugin
			if ($.fn.knob) {
				$('.knob').knob({
					bgColor : '#fff'
				});
			}
		},
		animateKnob: function() {
			// Animate knob
			if ($.fn.knob) {
				$('.knob').each(function() {
					var $this = $(this),
						container = $this.closest('.progress-animate'),
						animateTo = $this.data('animateto'),
						animateSpeed = $this.data('animatespeed')
					$this.animate(
			                { value: animateTo }, 
			                {   duration: animateSpeed,
			                    easing: 'swing',
		                    progress: function() {
		                      $this.val(Math.round(this.value)).trigger('change');
		                    },
		                    complete: function () {
		                    	container.removeClass('progress-animate');
		                    }
	               		});

				});
			}
		},
		scrollAnimations: function () {

			/* 	// Wowy Plugin
				Add Html elements wow and animation class 
				And you can add duration via data attributes
				data-wow-duration: Change the animation duration
				data-wow-delay: Delay before the animation starts
				data-wow-offset: Distance to start the animation (related to the browser bottom)
				data-wow-iteration: Number of times the animation is repeated
			*/

			// Check for class WOW // You need to call wow.min.js and animate.css for scroll animations to work
			if (typeof WOW === 'function') {
				new WOW({
					boxClass:     'wow',      // default
					animateClass: 'animated', // default
					offset:       0          // default
				}).init();
			}

		},
		prettyPhoto: function() {
			/* Portfolio prettPhoto Plugin */
			if ($.fn.prettyPhoto) {

				$("a[data-rel^='prettyPhoto']").prettyPhoto({
					hook: 'data-rel',
		            animation_speed: 'fast',
		            slideshow: 6000,
		            autoplay_slideshow: true,
		            show_title: false,
		            deeplinking: false,
		            social_tools: '',
		            overlay_gallery: true,
					theme: 'light_square'
				});
			}

		},
		flickerFeed: function () {
			/* Flickr feed plugin - Sidebar */
			if ($.fn.jflickrfeed) {
				$('ul.flickr-widget').jflickrfeed({
					limit: 6,
					qstrings: {
						id: '52617155@N08'
					},
					itemTemplate: '<li>' + '<a href="{{image}}" title="{{title}}">' + '<img src="{{image_s}}" alt="{{title}}" />' + '</a>' + '</li>'
				});
				
			}
		},
		parallax: function () {
			// Parallax - if not mobile  with stellar js plugin 
			if (!Granada.mobile && $.fn.stellar) {
				$(window).stellar({
					horizontalOffset: 0,
					horizontalScrolling: false
				});
			}

			/* if mobile, delete background attachment fixed from parallax class */
			if (Granada.mobile) {
				$('.parallax').css('background-attachment', 'initial')
			}

		},
		isotopeActivate: function() {
			// Trigger for isotope plugin
			if($.fn.isotope) {
				var container = this.container,
					layoutMode = container.data('layoutmode');

				container.isotope({
                	itemSelector: '.portfolio-item',
                	layoutMode: (layoutMode) ? layoutMode : 'masonry',
                	transitionDuration: 0
            	});
			}
		},
		isotopeReinit: function () {
			// Recall for isotope plugin
			if($.fn.isotope) {
				this.container.isotope('destroy');
				this.isotopeActivate();
			}
		},
		isotopeFilter: function () {
			// Isotope plugin filter handle
			var self = this,
				filterContainer = $('#portfolio-filter');

			filterContainer.find('a').on('click', function(e) {
				var $this = $(this),
					selector = $this.attr('data-filter'),
					animationclass = self.container.data('animationclass'),
					customAnimation = (animationclass) ? animationclass : 'fadeInUp';

				filterContainer.find('.active').removeClass('active');

				// Delete css Animation and class 
				// They effects filtering
				self.container.find('.portfolio-item').removeClass('animate-item '+ customAnimation);

				// And filter now
				self.container.isotope({
					filter: selector,
					transitionDuration: '0.9s'
				});
				
				$this.closest('li').addClass('active');
				e.preventDefault();
			});
		},
		elementsAnimate: function () {
			// Appear animation on load for gallery/gallery items
			var animationclass = this.container.data('animationclass'),
				customAnimation = (animationclass) ? animationclass : 'fadeInUp';

			// if you dont want to animate portfolio elements find portfolioElAnimation
			// and change its value true to false
			if (!this.portfolioElAnimation) {
				this.container.find('.animate-item').removeClass('animate-item');
				return;
			}

			this.container.find('.animate-item').each(function() {
                var $this = $(this),
                    time = $this.data('animate-time');

                setTimeout(function() {
                    $this.addClass('animated ' +customAnimation);
                }, time);
            });
            
		}

	};

	Granada.init();

	// Load Event
	$(window).on('load', function() {
		/* Trigger gallery item Animations */
		Granada.elementsAnimate();

		/* Trigger Scroll Animations */
		Granada.scrollAnimations();
	});

	// Scroll Event
	$(window).on('scroll', function () {
		/* Display Scrol to Top Button */
		Granada.scrollTopBtnAppear();

	});

	// Resize Event 
	// Smart resize if plugin not found window resize event
	if($.event.special.debouncedresize) {
		$(window).on('debouncedresize', function() {
			/* Re-calc height (full-height)*/
			Granada.fullHeight();

			/* Destroy sticky header */
			Granada.destroyStickyHeader();

			/* Responsive menu add search/dropdowns*/
			Granada.responsiveMenuExtra();

			/* portfolio items / reinit */
			Granada.isotopeReinit();
			Granada.verticalTabHeightFix();

			/* Granada on resize fix item */
			Granada.itemSizeFix();

			/* Fix for product.html carousel side bg*/
			Granada.sideBackground();

			// Small fix for overflow issue for responsive carousel - product.html
			Granada.resizeproductCarousel();
	    });
	} else {
		$(window).on('resize', function () {
			/* Re-calc height (full-height)*/
			Granada.fullHeight();

			/* Destroy sticky header */
			Granada.destroyStickyHeader();

			/* Responsive menu add search/dropdowns*/
			Granada.responsiveMenuExtra();
			
			/* portfolio items / reinit */
			Granada.isotopeReinit();
			Granada.verticalTabHeightFix();

			/* Granada on resize fix item */
			Granada.itemSizeFix();

			/* Fix for product.html carousel side bg*/
			Granada.sideBackground();

			// Small fix for overflow issue for responsive carousel - product.html
			Granada.resizeproductCarousel();
		});
	}


	// Wait for tab show event then recall tab height fix function
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var elem = $(e.target),
			tabContainer = elem.closest('.tab-container');

			Granada.verticalTabFixFunc.call(tabContainer);
	});

	/* This is update for tab item width */
    $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
		/* Size fix for product/item */
		Granada.itemSizeFix();
    });

    /* Retrigger for the product carousel for index3 - quick view modal */
     $('#quick-view-modal').on('shown.bs.modal', function () {
     	/* give a height to modal */
     	var winHeight = $(window).height();
     	$(this).find('.modal-dialog').css({ 'max-height': ( winHeight - 80 ), 'margin-top': 40 });
     	/* trigger resize event to make carousel appear*/
    	$(window).trigger('resize');
    });

})(jQuery);