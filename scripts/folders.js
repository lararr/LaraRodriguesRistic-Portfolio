document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".folder-btn");
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  let userHasScrolled = false;
  window.addEventListener("scroll", () => { userHasScrolled = true; }, { once: true, passive: true });

  folders.forEach((folder) => {
    const folderTop = folder.querySelector(".folder-top img");
    const img1 = folder.querySelector(".img1-projects");
    const img2 = folder.querySelector(".img2-projects");
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

    folder.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      openFolder();
    });

    folder.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      closeFolder();
    });

    folder.addEventListener("click", () => {
      if (folderType) window.location.href = `${folderType}.html`;
    });

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
