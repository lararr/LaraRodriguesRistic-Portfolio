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
  
    // make this fade faster so it doesn't feel like delay
    gsap.from("body", {
      opacity: 0,
      duration: 1,  // or even 0.8
      ease: "power2.out"
    });
  });
  

  
  // hover and animation for folders for pages
  document.addEventListener("DOMContentLoaded", () => {
    console.log("JS loaded!"); // Confirm it's running

    window.addEventListener("resize", () => {
      document.querySelectorAll(".folder-btn").forEach((folder) => {
        const images = folder.querySelectorAll(".folder-contents img");
        const folderTop = folder.querySelector(".folder-top");
    
        // Debug line
        console.log("Window resized, clearing transform styles for:", folder);
    
        gsap.set(folderTop, { clearProps: "y" });
        images.forEach((img) => {
          gsap.set(img, {
            clearProps: "x,y,rotate,scale,opacity"
          });
        });
      });
    });
    
  
    const folders = document.querySelectorAll(".folder-btn");

    folders.forEach((folder) => {
      const folderTop = folder.querySelector(".folder-top");
      const folderType = folder.dataset.folder;
    
      const leftWrapper = folder.querySelector(".left-img");
      const rightWrapper = folder.querySelector(".right-img");
      const leftImg = leftWrapper?.querySelector("img");
      const rightImg = rightWrapper?.querySelector("img");
    
      if (!folderTop || !leftWrapper || !rightWrapper || !leftImg || !rightImg) return;
    
      folder.addEventListener("mouseenter", () => {
        gsap.killTweensOf([leftWrapper, rightWrapper, leftImg, rightImg]);
    
        requestAnimationFrame(() => {
          const yOffset = folderTop.getBoundingClientRect().height;
    
          gsap.to(leftWrapper, {
            y: -1.1 * yOffset,
            xPercent: -15,
            rotate: -8,
            duration: 0.5,
            ease: "power2.out",
          });
    
          gsap.to(rightWrapper, {
            y: -0.9 * yOffset,
            xPercent: 15,
            rotate: 8,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.05,
          });
    
          gsap.to([leftImg, rightImg], {
            opacity: 1,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    
      folder.addEventListener("mouseleave", () => {
        gsap.killTweensOf([leftWrapper, rightWrapper, leftImg, rightImg]);
    
        setTimeout(() => {
          gsap.to([leftWrapper, rightWrapper], {
            xPercent: 0,
            y: 0,
            rotate: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
    
          gsap.to([leftImg, rightImg], {
            opacity: 0,
            scale: 0.85,
            duration: 0.4,
            ease: "power2.inOut",
            clearProps: "opacity,scale",
          });
        }, 50);
      });
    
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
      