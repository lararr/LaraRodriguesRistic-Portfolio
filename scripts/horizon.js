window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    // Animate all process blocks
    gsap.utils.toArray(".process-block").forEach((block) => {
      gsap.from(block, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
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
  
    // Animate section titles
    gsap.utils.toArray(".process-title, .learnings-title").forEach((title) => {
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
  
    // Animate project title on page load
    gsap.from(".project-title", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
    });
  
    // Optional: Animate images/videos with soft zoom or fade
    gsap.utils.toArray(".process-media img, .process-media video").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
        },
      });
    });
  });
  