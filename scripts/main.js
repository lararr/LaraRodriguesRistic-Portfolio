// loader bounce before page loading - not quite working
// gsap.to(".loader-logo", {
  //   scale: 1.2,
  //   repeat: -1,
  //   yoyo: true,
  //   duration: 0.8,
  //   ease: "power1.inOut"
  // });
  
  // Loader fade out when page is fully loaded
  window.addEventListener("load", () => {
    gsap.to(".loader", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        document.querySelector(".loader").style.display = "none";
      }
    });
    gsap.from("body", { opacity: 0, duration: 3, ease: "power2.out" });
  });
  
  // click and animation for folders for pages
  document.addEventListener("DOMContentLoaded", () => {
    console.log("JS loaded!"); // Confirm it's running
  
    const folders = document.querySelectorAll(".folder-btn");
  
    folders.forEach((folder) => {
      const folderTop = folder.querySelector(".folder-top");
      const img1 = folder.querySelector(".img1-projects");
      const img2 = folder.querySelector(".img2-projects");
      const folderType = folder.dataset.folder;
  
      if (!folderTop || !img1 || !img2) {
        console.log("Missing elements in folder:", folder);
        return;
      }
  
      // Hover animation
      folder.addEventListener("mouseenter", () => {
        const { height, width } = folder.getBoundingClientRect();
  
        gsap.to(folderTop, {
          y: 0.2 * height,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(img1, {
          opacity: 1,
          y: -1.1 * height,
          x: -0.15 * width,
          rotate: -8,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(img2, {
          opacity: 1,
          y: -0.9 * height,
          x: 0.18 * width,
          rotate: 8,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.05,
        });
      });
  
      folder.addEventListener("mouseleave", () => {
        gsap.to(folderTop, { y: 0, duration: 0.4, ease: "power2.inOut" });
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
  
      // Click navigation
      folder.addEventListener("click", () => {
        if (folderType) {
          window.location.href = `${folderType}.html`;
        }
      });
    });
  });
  
  // hero hover
  // window.addEventListener('DOMContentLoaded', () => {
  //   const container = document.querySelector('.hero-text-outer');
  
  //   //  Do nothing below 1200px
  //   if (window.innerWidth < 1200) return;
  
  //   const base = container.querySelector('.base-slide');
  //   const hover = container.querySelector('.hover-slide');
  
  //   if (!base || !hover) return;
  
  //   // Set hover block below initially
  //   gsap.set(hover, { yPercent: 100 });
  
  //   // Animate on hover
  //   container.addEventListener('mouseenter', () => {
  //     gsap.to(base, { yPercent: -100, duration: 0.6, ease: 'power2.out' });
  //     gsap.to(hover, { yPercent: 0, duration: 0.6, ease: 'power2.out' });
  //   });
  
  //   container.addEventListener('mouseleave', () => {
  //     gsap.to(base, { yPercent: 0, duration: 0.6, ease: 'power2.out' });
  //     gsap.to(hover, { yPercent: 100, duration: 0.6, ease: 'power2.out' });
  //   });
  // });
      