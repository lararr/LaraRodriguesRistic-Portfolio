document.addEventListener("DOMContentLoaded", () => {
  // === Carousel logic ===
  const track = document.querySelector(".carousel-track");
  const images = document.querySelectorAll(".carousel-image");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (images.length && track && dotsContainer) {
    let currentIndex = 0;
    let intervalId;

    images.forEach((_, index) => {
      const dot = document.createElement("button");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
        restartAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });

    function updateCarousel() {
      const width = images[0].clientWidth;
      track.style.transform = `translateX(-${currentIndex * width}px)`;
      document.querySelectorAll(".carousel-dots button").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    }

    function startAutoPlay() {
      intervalId = setInterval(nextSlide, 4000);
    }

    function restartAutoPlay() {
      clearInterval(intervalId);
      startAutoPlay();
    }

    window.addEventListener("resize", updateCarousel);
    startAutoPlay();
  }

  // === GSAP Animations ===
  gsap.registerPlugin(ScrollTrigger);

  // Animate title on load
  gsap.from(".project-title", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out",
    delay: 0.3,
  });

  // Section block reveals
  gsap.utils.toArray(".first-prototype-section, .second-prototype-section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
      },
    });
  });

  // Animate titles
  gsap.utils.toArray(".prototype-title, .image-section-title, .learnings-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
      },
    });
  });

  // Image rows stagger
  gsap.utils.toArray(".image-row").forEach((row, i) => {
    gsap.from(row, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: row,
        start: "top 90%",
      },
    });
  });

  // Learnings section
  gsap.from(".learnings-section", {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".learnings-section",
      start: "top 85%",
    },
  });
});
