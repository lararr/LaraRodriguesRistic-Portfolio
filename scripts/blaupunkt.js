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
  

  // animations
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    const sections = document.querySelectorAll(
      ".project-content, .process-block, .image-section, .gallery-section, .learnings-section"
    );
  
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });
    });
  });
  