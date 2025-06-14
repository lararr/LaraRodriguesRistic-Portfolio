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
      const images = folder.querySelectorAll(".folder-contents img");
      const folderType = folder.dataset.folder;
  
      if (!folderTop || images.length < 2) {
        console.log("Missing folder images:", folder);
        return;
      }
  
      // Hover animation
    folder.addEventListener("mouseenter", () => {
      gsap.killTweensOf([folderTop, images[0], images[1]]);
    
      // Force reflow to ensure accurate size after resize
      requestAnimationFrame(() => {
        const folderTopHeight = folderTop.offsetHeight;
        const folderTopWidth = folderTop.offsetWidth;
    
        // Debug lines
        console.log("folderTopHeight:", folderTopHeight);
        console.log("folderTopWidth:", folderTopWidth);
    
        gsap.to(images[0], {
          opacity: 1,
          y: -1.1 * folderTopHeight,
          x: -0.15 * folderTopWidth,
          rotate: -8,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
        });
    
        gsap.to(images[1], {
          opacity: 1,
          y: -0.9 * folderTopHeight,
          x: 0.18 * folderTopWidth,
          rotate: 8,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.05,
        });
      });
    });
            
                  
    folder.addEventListener("mouseleave", () => {
      gsap.killTweensOf([folderTop, images[0], images[1]]); // 💥 stop mid-flight
    
      setTimeout(() => {
        gsap.to(folderTop, {
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
    
        gsap.to(images, {
          opacity: 0,
          y: 0,
          x: 0,
          rotate: 0,
          scale: 0.85,
          duration: 0.4,
          ease: "power2.inOut",
          clearProps: "y,rotate,scale,opacity"
        });
      }, 50);
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
      