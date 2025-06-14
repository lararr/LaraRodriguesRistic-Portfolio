// DEBUG: Confirm script is running
document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded!");

  // Leave resize logic and general event listeners here (non-visual)
  window.addEventListener("resize", () => {
    document.querySelectorAll(".folder-btn").forEach((folder) => {
      const images = folder.querySelectorAll(".folder-contents img");
      const folderTop = folder.querySelector(".folder-top");

      // DEBUG: Track resize behavior
      console.log("Window resized, clearing transform styles for:", folder);

      gsap.set(folderTop, { clearProps: "y" });
      images.forEach((img) => {
        gsap.set(img, {
          clearProps: "x,y,rotate,scale,opacity"
        });
      });
    });
  });
});

// DELAY visual animations until page is fully loaded
window.addEventListener("load", () => {
  // Loader fade-out
  gsap.to(".loader", {
    opacity: 0,
    duration: 0.2, // slightly faster
    ease: "power2.out",
    onComplete: () => {
      document.querySelector(".loader").style.display = "none";
    }
  });

  // Body fade-in
  gsap.from("body", {
    opacity: 0,
    duration: 0.2,
    ease: "power2.out"
  });

  // Folder hover entrance animation
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
