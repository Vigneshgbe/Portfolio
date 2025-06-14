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
 // Get DOM elements
 const navToggle = document.getElementById('nav-toggle');
 const navMenu = document.getElementById('nav-menu');
 const navClose = document.getElementById('nav-close');
 const menuBackdrop = document.getElementById('menu-backdrop');
 const navLinks = document.querySelectorAll('.nav__link');
 const body = document.body;

 // Show menu
 function showMenu() {
     navMenu.classList.add('show');
     menuBackdrop.classList.add('show');
     body.classList.add('menu-open');
 }

 // Hide menu
 function hideMenu() {
     navMenu.classList.remove('show');
     menuBackdrop.classList.remove('show');
     body.classList.remove('menu-open');
 }

 // Toggle menu when hamburger button is clicked
 if (navToggle) {
     navToggle.addEventListener('click', showMenu);
 }

 // Close menu when close button is clicked
 if (navClose) {
     navClose.addEventListener('click', hideMenu);
 }

 // Close menu when backdrop is clicked
 if (menuBackdrop) {
     menuBackdrop.addEventListener('click', hideMenu);
 }

 // Close menu when a nav link is clicked (mobile)
 navLinks.forEach(link => {
     link.addEventListener('click', () => {
         // Only close on mobile screens
         if (window.innerWidth <= 991) {
             hideMenu();
         }
         
         // Remove active class from all links
         navLinks.forEach(l => l.classList.remove('active'));
         // Add active class to clicked link
         link.classList.add('active');
     });
 });

 // Close menu on window resize if screen becomes large
 window.addEventListener('resize', () => {
     if (window.innerWidth > 991) {
         hideMenu();
     }
 });

 // Close menu when ESC key is pressed
 document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape') {
         hideMenu();
     }
 });

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
             target.scrollIntoView({
                 behavior: 'smooth',
                 block: 'start'
             });
         }
     });
 });

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