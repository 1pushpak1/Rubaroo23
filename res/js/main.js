/* global ScrollMagic, Linear */

(function($){
  "use strict";

  var $body = $('body');



  /*------------------------------------*\
    Shrink navigation.
  \*------------------------------------*/

  $(window).scroll(function(){
    if ($(document).scrollTop() > 80){
      $('.navbar').addClass('shrink');
    }
    else{
      $('.navbar').removeClass('shrink');
    }
  });



  /*------------------------------------*\
    Scroll to top.
  \*------------------------------------*/

  $(window).scroll(function(){
    if($(this).scrollTop() > 100){
      $('.scroll-to-top').fadeIn();
    }
    else{
      $('.scroll-to-top').fadeOut();
    }
  });



  $(document).ready(function(){

    /*------------------------------------*\
      Detect mobile device.
    \*------------------------------------*/

    var isMobile = {
      Android: function(){
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function(){
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function(){
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };



    /*------------------------------------*\
      Bootstrap scrollspy.
    \*------------------------------------*/

    var ww = Math.max($(window).width(), window.innerWidth),
      navHeight = 80,
      navHeightShrink = 61;

    $(window).smartload(function(){
      $body.scrollspy({
        target: '#navigation',
        offset: ww > 992 ? navHeightShrink : navHeight
      });
    });

    $(window).smartresize(function(){
      var dataScrollSpy = $body.data('bs.scrollspy'),
        ww = Math.max($(window).width(), window.innerWidth),
        offset = ww > 992 ? navHeightShrink : navHeight;

      dataScrollSpy.options.offset = offset;
      $body.data('bs.scrollspy', dataScrollSpy);
      $body.scrollspy('refresh');
    });



    /*------------------------------------*\
      Page scrolling feature.
    \*------------------------------------*/

    $(window).smartload(function(){
      pageScroll();
    });

    $(window).smartresize(function(){
      pageScroll();
    });

    function pageScroll(){
      $('a.page-scroll').bind('click', function(e){
        var ww = Math.max($(window).width(), window.innerWidth),
          anchor = $(this),
          href = anchor.attr('href'),
          offset = ww > 992 ? navHeightShrink : navHeight;

        $('html, body').stop().animate({
          scrollTop: $(href).offset().top - (offset - 1)
        }, 1000, 'easeInOutExpo');

        // Automatically retract the navigation after clicking on one of the menu items.
        $('.navbar-collapse').collapse('hide');

        e.preventDefault();
      });
    };



    /*------------------------------------*\
      Gallery grid
    \*------------------------------------*/

    if ($.fn.imagesLoaded && $.fn.isotope){
      var $galleryGrid = $('.gallery-grid');

      $(window).smartload(function(){
        $galleryGrid.imagesLoaded(function(){
          $galleryGrid.isotope({
            itemSelector: '.item',
            layoutMode: 'masonry'
          });
        });
      });

      $(window).smartresize(function(){
        $galleryGrid.isotope('layout');
      });

      // Gallery filtering
      var $gridSelectors = $('.gallery-filter').find('a');
      $gridSelectors.bind('click', function(e){
        $gridSelectors.parent().removeClass('active');
        $(this).parent().addClass('active');

        var selector = $(this).attr('data-filter');
        $galleryGrid.isotope({
          filter: selector
        });

        e.preventDefault();
      });
    }
    else{
      console.log('Gallery grid: Plugin "imagesLoaded" is not loaded.');
      console.log('Gallery grid: Plugin "isotope" is not loaded.');
    }

    // Gallery magnific popup
    if ($.fn.magnificPopup){
      $galleryGrid.magnificPopup({
        delegate: 'a',
        type: 'image',
        fixedContentPos: false,
        mainClass: 'mfp-fade',
        gallery:{
          enabled: true,
          navigateByImgClick: true,
          preload: [0,2],
          tPrev: 'Previous',
          tNext: 'Next',
          tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
        }
      });
    }
    else{
      console.log('Gallery magnific popup: Plugin "magnificPopup" is not loaded.');
    }



    /*------------------------------------*\
      Features box
    \*------------------------------------*/

    var $featuresBox = $('.features-box');

    if(isMobile.any()){
      $featuresBox.find('.show-on-hover').addClass('disabled');
      $featuresBox.bind('click', function(e){
        $featuresBox.find('.show-on-hover').removeClass('active');
        $(this).find('.show-on-hover').addClass('active');
        e.preventDefault();
      });
    };



    /*------------------------------------*\
      DEMO
    \*------------------------------------*/

    // Home bg parallax (requires scrollmagic)
    if(typeof ScrollMagic !== 'undefined'){
      // Init controller
      var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

      // Build scenes
      new ScrollMagic.Scene({triggerElement: "#home-bg-parallax"})
          .setTween("#home-bg-parallax > .bg-parallax", {y: "80%", ease: Linear.easeNone})
          .addTo(controller);
    }


  


    // Home bg slider (requires flickity)
    if ($.fn.flickity){
      $('.bg-slider-wrapper').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        draggable: false,
        autoPlay: 3500,
        pauseAutoPlayOnHover: false
      });
    }
    else{
      console.log('Home bg slider: Plugin "flickity" is not loaded.');
    }

      //<![qna[
        let toggles = document.getElementsByClassName("toggle");
        let contentDiv = document.getElementsByClassName("content");
        let icons = document.getElementsByClassName("icon");

        for (let i = 0; i < toggles.length; i++) {
            toggles[i].addEventListener("click", () => {
                if (parseInt(contentDiv[i].style.height) != contentDiv[i].scrollHeight) {
                    contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
                    toggles[i].style.color = "#0084e9";
                    icons[i].classList.remove("fa-plus");
                    icons[i].classList.add("fa-minus");
                } else {
                    contentDiv[i].style.height = "0px";
                    toggles[i].style.color = "#111130";
                    icons[i].classList.remove("fa-minus");
                    icons[i].classList.add("fa-plus");
                }

                for (let j = 0; j < contentDiv.length; j++) {
                    if (j !== i) {
                        contentDiv[j].style.height = 0;
                        toggles[j].style.color = "#111130";
                        icons[j].classList.remove("fa-minus");
                        icons[j].classList.add("fa-plus");
                    }
                }
            });
        }
//]]>
    // Section - Schedule (requires flickity)
    if ($.fn.flickity){
      var $carouselSchedule = $('.carousel-schedule');
      $carouselSchedule.flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        pageDots: false
      });

      $('.nav-tabs', '#schedule').children().bind('click', function(e){
        $('.carousel-schedule').flickity('select', $(this).index());
      });

      if(isMobile.any()){
        var flkty = $carouselSchedule.data('flickity');
        $carouselSchedule.on('select.flickity', function(){
          $('.nav-tabs', '#schedule').find('li:eq(' + flkty.selectedIndex + ') a').tab('show');
        });
      };
    }
    else{
      console.log('Section - Schedule: Plugin "flickity" is not loaded.');
    }


    // Section - FAQ (Accordions)
    $('.panel-group').each(function(){
      var $panelGroupId = $('#' + $(this).attr('id'));

      $(this).find('a').bind('click', function(e){
        $panelGroupId.find('.panel').removeClass('active');
        $(this).parent().parent().parent().addClass('active');
      });
    });
  });
})(jQuery);




const timeCoverter = {
  toMS(originalDuration) {
    if (typeof originalDuration !== 'string') return 0
    const duration = originalDuration.replace(/[A-Za-z]/g, "")
    if(originalDuration.includes("ms")) return parseInt(duration)
    if(originalDuration.includes("s")) return parseInt(parseFloat(duration) * 1000)
    return 0
  }
}

const isDesktop = () => window.innerWidth > 992

class Slider {
  constructor(element, config = {}) {
    if(element instanceof Element) this._element = element
    else if(typeof element === 'string') this._element = document.querySelector(element) 
    else throw new Error('Slider constructor requires an element or selector')
    
    this._config = typeof config === 'object' ? config : {}
    this._init()
  }

  _init() {
    this._getContainer()
    this._getListItem()
    if(this._totalItem === 0) return
    this._setupItem()
    this._getTransitionItem()
    if(this._config.autoplay) this._startAutoplay()
  }

  _getContainer() {
    this._container = this._element.querySelector(".slider-list")
    this._containerGap = getComputedStyle(this._container).gap
    if(this._config.reverse) this._container.style.justifyContent = "end"
  }
  
  _getListItem() {
    this._sliderItems = this._container.querySelectorAll('.slider-item')
    this._totalItem = this._sliderItems.length
  }

  _setupItem() {
    if(this._totalItem === 1) {
      this._container.style.gridAutoColumns = "100%"
      this._container.appendChild(this._sliderItems[0].cloneNode(true))
      this._sliderItems = this._element.querySelectorAll('.slider-item')
      this._totalItem = this._sliderItems.length
    }
    if(this._totalItem === 2) this._container.style.gridAutoColumns = "100%"
    if(!isDesktop()) return
    if(this._totalItem === 3) this._container.style.gridAutoColumns = "50%"
    if(this._totalItem === 4) this._container.style.gridAutoColumns = "33.33333333%"
    if(this._totalItem >= 5) this._container.style.gridAutoColumns = "25%"
  }

  _getTransitionItem() {
    this._originalTransitionDuration = getComputedStyle(this._container).transitionDuration
    this._transitionDuration = timeCoverter.toMS(this._originalTransitionDuration) ?? 0
  }

  update() {
    this._getListItem()
    this._setupItem()
  }
  
  _startAutoplay() {
    const repeat = (direction = null) => {
      this._move().then(() => {
        repeat()
      })
    }
    repeat()
  }
  
  _move(direction = null) {
    const resetTime = 20
    setTimeout(() => {
      this._container.style.transitionDuration = this._originalTransitionDuration
      if(this._config.reverse || direction === 'prev') {
        this._container.style.transform = `translateX(calc(${this._sliderItems[0]?.offsetWidth}px + ${this._containerGap}))`
      } else {
        this._container.style.transform = `translateX(calc(-${this._sliderItems[0]?.offsetWidth}px - ${this._containerGap}))`
      }
    }, resetTime)
    return new Promise(resolve => {
      this._swap(direction)
      setTimeout(() => {
        this._container.style.transitionDuration = "0s"
        this._container.style.transform = `translateX(0px)`
        this._pause = false
        resolve(true)
      }, this._transitionDuration)
    })
  }
  
  _swap(direction = null) {
    if(this._config.reverse || direction === 'prev') {
      const firstChild = this._sliderItems[0]
      const lastChild = this._sliderItems[this._totalItem - 1]
      this._container.insertBefore(lastChild, firstChild)
      this.update()
    } else {
      this.update()
      const firstChild = this._sliderItems[0]
      this._container.removeChild(firstChild)
      this._container.appendChild(firstChild)
    }
  }
}

const slider = new Slider('.slider', {
  autoplay: true,
  reverse: true
})

document.addEventListener("click", function(e) {
  if(!e.target.matches('[data-toggle="slider-action"]')) return
  if(!e.target.matches('[data-direction]')) return
  const direction = e.target.dataset.direction
  // if(direction === "next") slider.next()
  // if(direction === "prev") slider.prev()
})  



jQuery(document).ready(function($) {
  // auto timer
  // optional - automatically opens in xxxx milliseconds

  $(document).ready(function() {
    $('.lab-slide-up').find('a').attr('data-toggle', 'modal');
    $('.lab-slide-up').find('a').attr('data-target', '#lab-slide-bottom-popup');
  });

});