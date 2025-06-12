// carousel animation
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const images = document.querySelectorAll(".carousel-image");
    const dotsContainer = document.querySelector(".carousel-dots");
  
    if (!images.length || !track || !dotsContainer) return; // exit if elements are missing
  
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
  });
  

  window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    // Animate project title on load
    gsap.from(".project-title", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    });
  
    // Animate process blocks
    gsap.utils.toArray(".process-block").forEach((block) => {
      gsap.from(block, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
        },
      });
    });
  
    // Animate section titles
    gsap.utils.toArray(".process-title, .gallery-title, .learnings-title").forEach((title) => {
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
  
    // Animate media captions
    gsap.utils.toArray(".media-caption").forEach((caption) => {
      gsap.from(caption, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: caption,
          start: "top 95%",
        },
      });
    });
  
    // Animate gallery rows with stagger
    gsap.utils.toArray(".gallery-row").forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: i * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
        },
      });
    });
  
    // Animate learnings section
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
  