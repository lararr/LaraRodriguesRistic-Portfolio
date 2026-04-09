// ── Carousel ─────────────────────────────────────────────
// Copied from blaupunkt.js — handles auto-play, dot navigation, resize
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const images = document.querySelectorAll(".carousel-image");
    const dotsContainer = document.querySelector(".carousel-dots");
  
    if (!images.length || !track || !dotsContainer) return;
  
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
  
  
  // ── GSAP Scroll Animations ───────────────────────────────
  // Matches the full animation set used in blaupunkt.js and colab.js
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    // Animate project title on page load (no scroll needed)
    gsap.from(".project-title", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
    });
  
    // Animate the intro section
    gsap.from(".project-content", {
      scrollTrigger: {
        trigger: ".project-content",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
    });
  
    // Animate each brand block — one animation, one ScrollTrigger per block
    gsap.utils.toArray(".process-block").forEach((block) => {
      gsap.from(block, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  
    // Animate section titles (brand names)
    gsap.utils.toArray(".process-title").forEach((title) => {
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
  
    // Scale-in the brand sheet images as they scroll into view
    gsap.utils.toArray(".process-media img").forEach((img) => {
      gsap.from(img, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 95%",
        },
      });
    });
  
    // Animate the folders section
    gsap.from(".folders-section", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".folders-section",
        start: "top 85%",
      },
    });
  });
  
  
  // ── Folder hover & click ─────────────────────────────────
  // Copied from projects.js — handles image fan-out on hover and page navigation on click
  document.addEventListener("DOMContentLoaded", () => {
    const folders = document.querySelectorAll(".folder-btn");
  
    folders.forEach((folder) => {
      const folderTop = folder.querySelector(".folder-top img");
      const img1 = folder.querySelector(".img1-projects");
      const img2 = folder.querySelector(".img2-projects");
      const folderType = folder.dataset.folder;
  
      if (!folderTop || !img1 || !img2) return;
  
      folder.addEventListener("mouseenter", () => {
        const { height, width } = folder.getBoundingClientRect();
  
        gsap.to(folderTop, {
          scaleY: 0.85,
          transformOrigin: "bottom center",
          duration: 0.4,
          ease: "power2.out",
        });
  
        gsap.to(img1, {
          opacity: 1,
          y: -0.3 * height,
          x: -0.2 * width,
          rotate: -5,
          scale: 0.94,
          duration: 0.3,
          ease: "power4.out",
        });
  
        gsap.to(img2, {
          opacity: 1,
          y: -0.2 * height,
          x: 0.2 * width,
          rotate: 5,
          scale: 0.94,
          duration: 0.3,
          ease: "power4.out",
          delay: 0.05,
        });
      });
  
      folder.addEventListener("mouseleave", () => {
        gsap.to(folderTop, {
          scaleY: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
  
        gsap.to([img1, img2], {
          opacity: 0,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 0.85,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });
  
      folder.addEventListener("click", () => {
        if (folderType) {
          window.location.href = `${folderType}.html`;
        }
      });
    });
  });