(function ($) {
    "use strict";


//     const navbarToggler = document.querySelector('.navbar-toggler');
// const navbarCollapse = document.querySelector('.navbar-collapse');

// navbarToggler.addEventListener('click', () => {
//   navbarCollapse.classList.toggle('show');
// });

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    //scrolling to section effect

    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll('.scroll-link').forEach(anchor => {
          anchor.addEventListener("click", function (e) {
              e.preventDefault();
              const targetId = this.getAttribute("href").split("#")[1];
              const targetElement = document.getElementById(targetId);

              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop - 50,
                      behavior: "smooth"
                  });
              }
          });
      });
  });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'slideOutDown',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // International carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        items: 1,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            },
            1200:{
                items:1
            }
        }
    });

    
    
   // Back to top button
  //  $(window).scroll(function () {
  //   if ($(this).scrollTop() > 300) {
  //       $('.back-to-top').fadeIn('slow');
  //   } else {
  //       $('.back-to-top').fadeOut('slow');
  //   }
  //   });
  //   $('.back-to-top').click(function () {
  //       $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
  //       return false;
  //   });


  $(document).ready(function () {
    var $backToTop = $('.back-to-top');
    var $footer = $('footer'); // Footer section
    var $targetSection = $('.top-scroll-btn'); // Change this to your actual target section ID

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();
        var footerOffset = $footer.offset().top;

        // Show button only when user reaches the footer
        if (scrollTop + windowHeight >= footerOffset) {
            $backToTop.fadeIn('slow');
        } else {
            $backToTop.fadeOut('slow');
        }
    });

    // Smooth scroll to the target section
    $backToTop.click(function (e) {
        e.preventDefault();

        if ($targetSection.length) {
            $('html, body').animate({
                scrollTop: $targetSection.offset().top
            }, 1500, function () {
                $backToTop.fadeOut('fast'); // Hide button after reaching the section
            });
        }
    });
});



})(jQuery);

//FAQ SECTION

 /**
   * Frequently Asked Questions Toggle
   */
 document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });
  

/**
   * Animation on scroll function and init
   */
function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
//   window.addEventListener('load', function(e) {
//     if (window.location.hash) {
//       if (document.querySelector(window.location.hash)) {
//         setTimeout(() => {
//           let section = document.querySelector(window.location.hash);
//           let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
//           window.scrollTo({
//             top: section.offsetTop - parseInt(scrollMarginTop),
//             behavior: 'smooth'
//           });
//         }, 100);
//       }
//     }
//   });

