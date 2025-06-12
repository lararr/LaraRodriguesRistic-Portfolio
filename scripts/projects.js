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
    const adjustMargin = () => {
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
        window.open(link, "_blank");
      }
    });
  });
});

// Animate the folders in the folders section
document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded!");

  const folders = document.querySelectorAll(".folder-btn");

  folders.forEach((folder) => {
    const folderTop = folder.querySelector(".folder-top img");
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

      // Scale folder top vertically
      gsap.to(folderTop, {
        scaleY: 0.85, // Reduce height by 15%
        transformOrigin: "bottom center", // Scale from bottom
        duration: 0.4,
        ease: "power2.out",
      });

      // Images hover animation
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

    // Reset on mouse leave
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

    // Click navigation
    folder.addEventListener("click", () => {
      if (folderType) {
        window.location.href = `${folderType}.html`;
      }
    });
  });
});






