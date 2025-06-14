// animate the playground page opening
document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".about-page");
    
    gsap.to(page, {
      y: "0%",
      duration: 0.9,
      ease: "power4.out",
      onComplete: () => {
        page.style.position = "static"; 
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
    

// GSAP infinite scroll animation for tools-strip
gsap.to("#tools-strip", {
  xPercent: -100,
  duration: 20, // speed - smaller number - faster
  ease: "linear",
  repeat: -1
});


// interests scrol animation
gsap.registerPlugin(ScrollTrigger);

gsap.to(".interests-chips .chip", {
  scrollTrigger: {
    trigger: ".interests-section",
    start: "top 100%",
    toggleActions: "play none none none"
  },
  opacity: 1,
  y: 0,
  duration: 0.1,
  ease: "power2.out",
  stagger: 0.10
});

// animated fun facts
document.addEventListener("DOMContentLoaded", () => {
  const facts = [
    "I am half Brazilian, half Serbian - and yes, I speak both languages",
    "I used to dance ballet professionally",
    "3D modeling calms me down, but rendering does the exact opposite",
    "What I bring to a team (besides snacks): calm energy and an open mind",
    "Smart animate in Figma is my guilty pleasure",
    "If I were a shape, I’d be a blob: adaptable, flexible, and always in motion",
    "I love interactive installations - especially when they involve lights or music",
    "I enjoy playing board games with friends (even though I usually lose)",
    "I like doing user flows, overthinking sometimes has its perks",
    "Designing, learning, and occasionally dancing",
  ];

  let index = 0;
  const card = document.getElementById("fun-fact-card");

  function flipToNextFact() {
    gsap.to(card, {
      rotationX: 90,
      duration: 0.4,
      ease: "power1.in",
      onComplete: () => {
        card.textContent = facts[index];
        gsap.set(card, { rotationX: -90 });
        gsap.to(card, {
          rotationX: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        index = (index + 1) % facts.length;
      }
    });
  }

  // start loop
  flipToNextFact();
  setInterval(flipToNextFact, 5000);
});

// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

// Animate about-section
gsap.from(".about-section .about-text", {
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power2.out"
});

gsap.from(".about-photo", {
  scrollTrigger: {
    trigger: ".about-photo",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  x: 40,
  duration: 1,
  ease: "power2.out"
});

// Animate design interests
// gsap.from(".interests-section .chip", {
//   scrollTrigger: {
//     trigger: ".interests-section",
//     start: "top 80%",
//     toggleActions: "play none none none",
//   },
//   opacity: 0,
//   y: 20,
//   duration: 0.4,
//   stagger: 0.1,
//   ease: "power1.out"
// });

// Animate fun facts
// gsap.from(".fun-facts-section", {
//   scrollTrigger: {
//     trigger: ".fun-facts-section",
//     start: "top 85%",
//     toggleActions: "play none none none",
//   },
//   opacity: 0,
//   y: 30,
//   duration: 1,
//   ease: "power2.out"
// });

// Animate toolkit
// gsap.from(".skills-strip-section", {
//   scrollTrigger: {
//     trigger: ".skills-strip-section",
//     start: "top 85%",
//     toggleActions: "play none none none",
//   },
//   opacity: 0,
//   y: 40,
//   duration: 1,
//   ease: "power2.out"
// });
