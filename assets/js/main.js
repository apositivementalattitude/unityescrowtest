

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

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
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

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
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Contact Section Office Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    let isOCOffice = true; // Track current office state

    // Office data
    const officeData = {
        OC: {
            buttonText: 'Switch to Los Angeles Office',
            locationTitle: 'OC Office Location',
            locationAddress: '6281 Beach Blvd, #245 Buena Park, CA 90621',
            phoneTitle: 'Call Our OC Office',
            phoneNumber: '949.323.2161',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.0845847827647!2d-118.00066162428857!3d33.87060267320847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd2a35b5b5b5b5%3A0x1234567890abcdef!2s6281%20Beach%20Blvd%20%23245%2C%20Buena%20Park%2C%20CA%2090621!5e0!3m2!1sen!2sus!4v1758232627794!5m2!1sen!2sus'
        },
        LA: {
            buttonText: 'Switch to Orange County Office',
            locationTitle: 'LA Office Location',
            locationAddress: '3600 Wilshire Blvd, Suite #900 Los Angeles, CA 90010',
            phoneTitle: 'Call Our LA Office',
            phoneNumber: '213.355.3600',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.3437447267456!2d-118.30622142428315!3d34.06070147315385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b8830a87fd1b%3A0x737501cc8343555c!2s3600%20Wilshire%20Blvd%20%23900%2C%20Los%20Angeles%2C%20CA%2090010!5e0!3m2!1sen!2sus!4v1758232627793!5m2!1sen!2sus'
        }
    };

    // Add click event listener to the toggle button
    const toggleButton = document.getElementById('officeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleOffice);
    }

    function toggleOffice() {
        const content = document.querySelector('.office-content');
        
        // Add fade effect
        if (content) {
            content.classList.add('fade-transition');
        }
        
        setTimeout(() => {
            if (isOCOffice) {
                // Switch to OC Office
                updateOfficeContent(officeData.LA);
                isOCOffice = false;
            } else {
                // Switch to LA Office
                updateOfficeContent(officeData.OC);
                isOCOffice = true;
            }
            
            // Remove fade effect
            if (content) {
                content.classList.remove('fade-transition');
            }
        }, 250);
    }

    function updateOfficeContent(office) {
        // Update button text
        const button = document.getElementById('officeToggle');
        if (button) {
            button.innerHTML = '<i class="bi bi-arrow-left-right"></i> ' + office.buttonText;
        }
        
        // Update location info
        const locationTitle = document.getElementById('locationTitle');
        const locationAddress = document.getElementById('locationAddress');
        if (locationTitle) locationTitle.textContent = office.locationTitle;
        if (locationAddress) locationAddress.textContent = office.locationAddress;
        
        // Update phone info
        const phoneTitle = document.getElementById('phoneTitle');
        const phoneNumber = document.getElementById('phoneNumber');
        if (phoneTitle) phoneTitle.textContent = office.phoneTitle;
        if (phoneNumber) phoneNumber.textContent = office.phoneNumber;
        
        // Update map
        const map = document.getElementById('officeMap');
        if (map) {
            map.src = office.mapSrc;
        }
    }
});