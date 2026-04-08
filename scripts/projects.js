// animate the projects page opening
document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".projects-page");
  
  gsap.to(page, {
    y: "0%",
    duration: 0.9,
    ease: "power4.out",
    onComplete: () => {
      page.style.position = "static"; // Let the page behave normally after the animation
    }
  });
});

// adjust margin of header to the height of the svg
document.addEventListener("DOMContentLoaded", () => {
  const svg = document.querySelector(".projects-tab-bg");
  const header = document.querySelector("header");

  if (svg && header) {
    // const adjustMargin = () => {
    //   const svgHeight = svg.getBoundingClientRect().height;
    //   header.style.marginBottom = `-${svgHeight}px`;
    // };

    const adjustMargin = () => {
      if (window.innerWidth <= 768) {
        header.style.marginBottom = '0px';
        return;
      }
      const svgHeight = svg.getBoundingClientRect().height;
      header.style.marginBottom = `-${svgHeight}px`;
    };

    // Adjust on load
    adjustMargin();

    // Adjust on window resize (in case of responsiveness)
    window.addEventListener("resize", adjustMargin);
  }
});


// open new tab when clicking on the card
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-link");
      if (link) {
        //window.open(link, "_blank"); // opens in new tab
        window.location.href = link; // opens in same tab
      }
    });
  });
});

// Animate the folders in the folders section
document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".folder-btn");
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  let userHasScrolled = false;
  window.addEventListener("scroll", () => { userHasScrolled = true; }, { once: true, passive: true });

  folders.forEach((folder) => {
    const folderTop  = folder.querySelector(".folder-top img");
    const img1       = folder.querySelector(".img1-projects");
    const img2       = folder.querySelector(".img2-projects");
    const folderType = folder.dataset.folder;

    if (!folderTop || !img1 || !img2) return;

    function openFolder() {
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
    }

    function closeFolder() {
      gsap.to(folderTop, { scaleY: 1, duration: 0.4, ease: "power2.inOut" });
      gsap.to([img1, img2], {
        opacity: 0, y: 0, x: 0, rotate: 0, scale: 0.85,
        duration: 0.4, ease: "power2.inOut",
      });
    }

    // Desktop: hover opens and closes
    folder.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      openFolder();
    });

    folder.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      closeFolder();
    });

    // Click navigates on both
    folder.addEventListener("click", () => {
      if (folderType) window.location.href = `${folderType}.html`;
    });

    // Mobile: scroll into view → open, auto-close after 1.4s
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isMobile() || !userHasScrolled) return;
          if (entry.isIntersecting) {
            openFolder();
            setTimeout(() => closeFolder(), 1400);
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(folder);
  });
});






