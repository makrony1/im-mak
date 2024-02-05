/**
* Template Name: iPortfolio
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

function contactMe(){
  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var text = $("#message").val();
  var phone = $("#phone").val();

  $(".loading").hide();
  $(".error-message").hide();
  var msgObj = {
    name:"",
    email:"",
    subject:"",
    message:"",
    phone:""
  };
  console.log(name);
  if(name!= null || name != undefined){
    name= name.trim();
    msgObj.name = name;
  }

  if(email!= null || email != undefined){
    email= email.trim();
    msgObj.email = email;
  }

  if(subject!= null || subject != undefined){
    subject= subject.trim();
    msgObj.subject = subject;
  }

  if(text!= null || text != undefined){
    text= text.trim();
    msgObj.message = text;
  }

  if(phone!= null || phone != undefined){
    phone = phone.trim();
    msgObj.phone = phone;
  }

  if(msgObj.name.length < 3){
    $($(".error-message")[0]).text("Name must be valid. (Length must be 3 or more)");
    $(".error-message").show();
    return;
  }

  if(!validateEmail(msgObj.email)){
    $($(".error-message")[0]).text("Please enter a valid email address.");
    $(".error-message").show();
    return;
  }

  if(msgObj.subject < 3){
    $($(".error-message")[0]).text("Subject must be valid. (Length must be 3 or more)");
    $(".error-message").show();
    return;
  }

  if(msgObj.message.length < 3){
    $($(".error-message")[0]).text("Message must be valid. (Length must be 3 or more)");
    $(".error-message").show();
    return;
  }

  if(!validatePhoneNumber(msgObj.phone)){
    $($(".error-message")[0]).text("Please enter a valid phone number.");
    $(".error-message").show();
    return;
  }

var url = "https://d10digqhk9.execute-api.us-east-1.amazonaws.com/v1/contact";
  $.ajax({
    url:url,
    type:"POST",
    data:JSON.stringify(msgObj),
    contentType:"application/json; charset=utf-8",
    success: function(data){
      //console.log("success");
      $(".sent-message").show();
      setTimeout(function(){$(".sent-message").hide();}, 5000);
    },
    error: function(error){
      console.log(error);
      $($(".error-message")[0]).text("Oppes something went wrong, please try again.");
    $(".error-message").show();
    setTimeout(function(){$(".error-message").hide();
    $("#name").val("");
    $("#email").val("");
    $("#subject").val("");
    $("#message").val("");
    $("#phone").val("");
  
  }, 5000);
    }
  })
}

function validateEmail(email) {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  // Basic phone number validation regex (allows digits and optional dashes)
  const phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/;

  return phoneRegex.test(phoneNumber);
}