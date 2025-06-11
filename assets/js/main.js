/*- THIS CONTACT FORM CODE -*/
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const button = this.querySelector('.contact__button');
  const statusMessage = document.getElementById('status-message');
  
  // Add loading state
  button.classList.add('loading');
  button.textContent = 'Sending...';
  
  // Simulate form submission
  setTimeout(() => {
      button.classList.remove('loading');
      button.textContent = 'Send Message';
      
      statusMessage.textContent = 'Thank you! Your message has been sent successfully.';
      statusMessage.className = 'success';
      
      // Reset form
      this.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
          statusMessage.style.display = 'none';
      }, 5000);
  }, 2000);
});

// Real-time validation
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', function() {
      if (this.checkValidity()) {
          this.classList.remove('invalid');
          this.classList.add('valid');
      } else {
          this.classList.remove('valid');
          this.classList.add('invalid');
      }
  });

  input.addEventListener('input', function() {
      this.classList.remove('invalid', 'valid');
  });
});

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', ()=>{
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
  const scrollY = window.pageYOffset

  sections.forEach(current =>{
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 50;
      sectionId = current.getAttribute('id')

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
      }else{
          document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
      }
  })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*=====DOWNLOAD BUTTON ANIMATION ====== */

/*--===== CERTIFICATES SLIDER SCRIPT =====--*/
const track = document.getElementById("sliderTrack");
const certificates = document.querySelectorAll(".certification");
let index = 0;
const visibleCards = 3;
const total = certificates.length;
const speed = 3000; // in milliseconds

// Clone first few elements to make infinite loop effect
for (let i = 0; i < visibleCards; i++) {
const clone = certificates[i].cloneNode(true);
track.appendChild(clone);
}

function nextSlide() {
index++;
track.style.transition = 'transform 0.5s ease-in-out';
track.style.transform = `translateX(-${(100 / visibleCards) * index}%)`;

if (index >= total) {
  setTimeout(() => {
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    index = 0;
  }, 500);
}
}

function prevSlide() {
if (index === 0) {
  index = total;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${(100 / visibleCards) * index}%)`;
  setTimeout(() => {
    index--;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${(100 / visibleCards) * index}%)`;
  }, 20);
} else {
  index--;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${(100 / visibleCards) * index}%)`;
}
}

let autoSlide = setInterval(nextSlide, speed);

// Pause on hover
track.addEventListener("mouseenter", () => clearInterval(autoSlide));
track.addEventListener("mouseleave", () => autoSlide = setInterval(nextSlide, speed));