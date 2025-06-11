/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(
      `.nav__menu a[href*="${sectionId}"]`
    );
    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});
sr.reveal(
  ".home__data, .about__img, .skills__subtitle, .skills__text",
  {}
);
sr.reveal(
  ".home__img, .about__subtitle, .about__text, .skills__img",
  { delay: 400 }
);
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", {
  interval: 200,
});

/*===== SLIDER SCRIPT =====*/
document.addEventListener("DOMContentLoaded", function () {
  const sliders = {
    project: {
      track: document.getElementById("project-slider"),
      cards: document.querySelectorAll("#project-slider > div"),
      index: 0,
    },
    certificate: {
      track: document.getElementById("certificate-slider"),
      cards: document.querySelectorAll("#certificate-slider > div"),
      index: 0,
    },
  };

  function slide(target, direction) {
    const slider = sliders[target];
    const visibleCount = Math.floor(slider.track.offsetWidth / slider.cards[0].offsetWidth);
    const maxIndex = slider.cards.length - visibleCount;

    if (direction === "next") {
      slider.index = slider.index >= maxIndex ? 0 : slider.index + 1;
    } else {
      slider.index = slider.index <= 0 ? maxIndex : slider.index - 1;
    }

    const offset = -(slider.index * (slider.cards[0].offsetWidth + 20));
    slider.track.style.transform = `translateX(${offset}px)`;
  }

  document.querySelectorAll(".slider-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const target = btn.getAttribute("data-target");
      const direction = btn.classList.contains("next") ? "next" : "prev";
      slide(target, direction);
    });
  });
});
