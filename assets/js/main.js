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
let currentSlide = 0;
        let totalSlides = 8; // Original slides count
        let visibleSlides = 3; // Number of slides visible at once
        let totalSlidesWithClones = 11; // Including clones
        let certInterval;

        const sliderTrack = document.getElementById('sliderTrack');
        const certIndicators = document.querySelectorAll('.cert-indicator');

        // Initialize auto-play
        function startAutoPlay() {
            certInterval = setInterval(() => {
                nextSlide();
            }, 3000);
        }

        // Stop auto-play
        function stopAutoPlay() {
            clearInterval(certInterval);
        }

        // Update slider position
        function updateSlider() {
            const translateX = -currentSlide * 33.3333; // Move by one slide (33.3333%)
            sliderTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators (only for original slides)
            let indicatorIndex = currentSlide;
            if (currentSlide >= totalSlides) {
                indicatorIndex = currentSlide - totalSlides;
            }
            
            certIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === indicatorIndex);
            });
        }

        // Next slide with infinite loop
        function nextSlide() {
            currentSlide++;
            updateSlider();
            
            // If we've moved past the original slides, reset to beginning
            if (currentSlide >= totalSlides) {
                setTimeout(() => {
                    sliderTrack.classList.add('no-transition');
                    currentSlide = currentSlide - totalSlides;
                    updateSlider();
                    
                    // Re-enable transition after reset
                    setTimeout(() => {
                        sliderTrack.classList.remove('no-transition');
                    }, 50);
                }, 800); // Wait for transition to complete
            }
        }

        // Previous slide
        function prevSlide() {
            if (currentSlide === 0) {
                // Jump to equivalent position in cloned section
                sliderTrack.classList.add('no-transition');
                currentSlide = totalSlides;
                updateSlider();
                
                setTimeout(() => {
                    sliderTrack.classList.remove('no-transition');
                    currentSlide = totalSlides - 1;
                    updateSlider();
                }, 50);
            } else {
                currentSlide--;
                updateSlider();
            }
        }

        // Go to specific slide
        function goToCertSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
            
            // Restart auto-play timer when manually navigating
            stopAutoPlay();
            startAutoPlay();
        }

        // Pause auto-play on hover for better UX
        const certContainer = document.querySelector('.slider-container');
        certContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
        });

        certContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });

        // Initialize the slider
        document.addEventListener('DOMContentLoaded', () => {
            updateSlider();
            startAutoPlay();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            }
        });

        // Handle responsive behavior
        function handleResize() {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                // On mobile, show 1 slide at a time
                document.querySelectorAll('.certification').forEach(cert => {
                    cert.style.flex = '0 0 100%';
                });
                visibleSlides = 1;
            } else {
                // On desktop, show 3 slides at a time
                document.querySelectorAll('.certification').forEach(cert => {
                    cert.style.flex = '0 0 33.3333%';
                });
                visibleSlides = 3;
            }
        }

        // Handle window resize
        window.addEventListener('resize', handleResize);
        handleResize(); 
        

 /*-- ===== ACHIEVEMENTS SECTION ===== --*/
 let currentAchievementSlide = 0;
        let totalAchievementSlides = 3; // Original slides count
        let totalSlidesWithClone = 4; // Including clone
        let achievementInterval;

        const achievementSliderTrack = document.getElementById('achievementsSliderTrack');
        const achievementIndicators = document.querySelectorAll('.indicator');

        // Initialize auto-play
        function startAutoPlay() {
            achievementInterval = setInterval(() => {
                nextAchievement();
            }, 4000);
        }

        // Stop auto-play
        function stopAutoPlay() {
            clearInterval(achievementInterval);
        }

        // Update slider position
        function updateAchievementSlider() {
            const translateX = -currentAchievementSlide * 100;
            achievementSliderTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators (only for original slides)
            const indicatorIndex = currentAchievementSlide >= totalAchievementSlides ? 0 : currentAchievementSlide;
            achievementIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === indicatorIndex);
            });
        }

        // Next slide with infinite loop
        function nextAchievement() {
            currentAchievementSlide++;
            updateAchievementSlider();
            
            // If we're at the clone (index 5), reset to slide 1 without transition
            if (currentAchievementSlide === totalSlidesWithClone) {
                setTimeout(() => {
                    achievementSliderTrack.classList.add('no-transition');
                    currentAchievementSlide = 0;
                    updateAchievementSlider();
                    
                    // Re-enable transition after reset
                    setTimeout(() => {
                        achievementSliderTrack.classList.remove('no-transition');
                    }, 50);
                }, 800); // Wait for transition to complete
            }
        }

        // Previous slide
        function prevAchievement() {
            if (currentAchievementSlide === 0) {
                // Jump to clone position without transition, then go to last slide
                achievementSliderTrack.classList.add('no-transition');
                currentAchievementSlide = totalAchievementSlides;
                updateAchievementSlider();
                
                setTimeout(() => {
                    achievementSliderTrack.classList.remove('no-transition');
                    currentAchievementSlide = totalAchievementSlides - 1;
                    updateAchievementSlider();
                }, 50);
            } else {
                currentAchievementSlide--;
                updateAchievementSlider();
            }
        }

        // Go to specific slide
        function goToSlide(slideIndex) {
            currentAchievementSlide = slideIndex;
            updateAchievementSlider();
            
            // Restart auto-play timer when manually navigating
            stopAutoPlay();
            startAutoPlay();
        }

        // Pause auto-play on hover for better UX
        const achievementContainer = document.querySelector('.achievements-slider-container');
        achievementContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
        });

        achievementContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });

        // Initialize the slider
        document.addEventListener('DOMContentLoaded', () => {
            updateAchievementSlider();
            startAutoPlay();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevAchievement();
                stopAutoPlay();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextAchievement();
                stopAutoPlay();
                startAutoPlay();
            }
        });