window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    // Animate process blocks on scroll
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
  
    // Animate each image in the sensor case grid
    gsap.utils.toArray(".woven-grid-item").forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: i * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
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
  });