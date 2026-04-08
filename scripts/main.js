document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("resize", () => {
    document.querySelectorAll(".folder-btn").forEach((folder) => {
      const images = folder.querySelectorAll(".folder-contents img");
      const folderTop = folder.querySelector(".folder-top");
      gsap.set(folderTop, { clearProps: "y" });
      images.forEach((img) => {
        gsap.set(img, { clearProps: "x,y,rotate,scale,opacity" });
      });
    });
  });
});

window.addEventListener("load", () => {

  gsap.to(".loader", {
    opacity: 0,
    ease: "power2.out",
    onComplete: () => {
      document.querySelector(".loader").style.display = "none";
    }
  });

  gsap.from("body", { opacity: 0, ease: "power2.out" });

  const folders = document.querySelectorAll(".folder-btn");
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  folders.forEach((folder) => {
    const folderTop    = folder.querySelector(".folder-top");
    const folderType   = folder.dataset.folder;
    const leftWrapper  = folder.querySelector(".left-img");
    const rightWrapper = folder.querySelector(".right-img");
    const leftImg      = leftWrapper?.querySelector("img");
    const rightImg     = rightWrapper?.querySelector("img");

    if (!folderTop || !leftWrapper || !rightWrapper || !leftImg || !rightImg) return;

    function openFolder() {
      gsap.killTweensOf([leftWrapper, rightWrapper, leftImg, rightImg]);
      requestAnimationFrame(() => {
        const yOffset = folderTop.getBoundingClientRect().height;
        gsap.to(leftWrapper, {
          y: -1.1 * yOffset, xPercent: -15, rotate: -8,
          duration: 0.5, ease: "power2.out"
        });
        gsap.to(rightWrapper, {
          y: -0.9 * yOffset, xPercent: 15, rotate: 8,
          duration: 0.5, ease: "power2.out", delay: 0.05
        });
        gsap.to([leftImg, rightImg], {
          opacity: 1, scale: 0.95,
          duration: 0.5, ease: "power2.out"
        });
      });
    }

    function closeFolder() {
      gsap.killTweensOf([leftWrapper, rightWrapper, leftImg, rightImg]);
      setTimeout(() => {
        gsap.to([leftWrapper, rightWrapper], {
          xPercent: 0, y: 0, rotate: 0,
          duration: 0.4, ease: "power2.inOut"
        });
        gsap.to([leftImg, rightImg], {
          opacity: 0, scale: 0.85,
          duration: 0.4, ease: "power2.inOut",
          clearProps: "opacity,scale"
        });
      }, 50);
    }

    // ── Desktop: hover ────────────────────────────────
    folder.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      openFolder();
    });
    folder.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      closeFolder();
    });

    // ── Both: click navigates ─────────────────────────
    folder.addEventListener("click", () => {
      if (folderType) window.location.href = `${folderType}.html`;
    });

    // ── Mobile: scroll-based trigger ──────────────────
    // Uses scroll + getBoundingClientRect — more reliable than IntersectionObserver
    window.addEventListener("scroll", () => {
      if (!isMobile()) return;
      if (folder.dataset.animating === "true") return;

      const rect = folder.getBoundingClientRect();
      const vh = window.innerHeight;

      // Fire when the vertical center of the folder enters the viewport
      const folderCenter = rect.top + rect.height / 2;

      if (folderCenter > 0 && folderCenter < vh) {
        folder.dataset.animating = "true";
        openFolder();

        setTimeout(() => {
          closeFolder();
          // Allow re-trigger after animation completes
          setTimeout(() => {
            folder.dataset.animating = "false";
          }, 500);
        }, 1400);
      }
    }, { passive: true });

  });
});

