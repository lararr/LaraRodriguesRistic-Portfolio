// animate the playground page opening
document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".playground-page");
    
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


window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Animate each .playground-item when it enters viewport
  // gsap.utils.toArray(".playground-item").forEach(item => {
  //   gsap.from(item, {
  //     opacity: 0,
  //     y: 40,
  //     duration: 0.4,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //       trigger: item,
  //       start: "top 90%",
  //       toggleActions: "play none none reverse"
  //     }
  //   });
  // });

  // Animate wrapup section
  gsap.from(".playground-wrapup", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".playground-wrapup",
      start: "top 90%"
    }
  });
});



// canvas section
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let drawing = false;
let erasing = false;
let funky = false;
let color = '#D56843';
const funkyWords = ['🌸', '🧿', '✨', '🦩', '🦋','🔆', ];

canvas.addEventListener('mousedown', () => {
  drawing = true;
  ctx.beginPath();
});
canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener('mouseleave', () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  if (funky) {
    ctx.font = `${Math.random() * 10 + 14}px Plus Jakarta Sans`;
    ctx.fillStyle = color;
    const word = funkyWords[Math.floor(Math.random() * funkyWords.length)];
    ctx.fillText(word, e.offsetX, e.offsetY);
    return;
  }

  ctx.strokeStyle = erasing ? '#ffffff' : color;
  ctx.lineWidth = erasing ? 15 : 2;
  ctx.lineCap = 'round';
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

// Color swatches
document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    color = swatch.dataset.color;
    erasing = false;
    funky = false;
  });
});

// Tools
document.getElementById('draw-tool').addEventListener('click', () => {
  erasing = false;
  funky = false;
});

document.getElementById('erase-tool').addEventListener('click', () => {
  erasing = true;
  funky = false;
});

document.getElementById('funky-tool').addEventListener('click', () => {
  funky = true;
  erasing = false;
});

// Clear canvas
document.getElementById('clear-btn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save to gallery
const supabaseClient = window.supabase.createClient(
  'https://tusklyxsomqznrocvsne.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1c2tseXhzb21xem5yb2N2c25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzYyNjIsImV4cCI6MjA2NTMxMjI2Mn0.OJpcZaQi0VTYZR7nd_WOFwwK-B1Pp7ONFA84dVM_mX8'
);


document.getElementById('save-tool').addEventListener('click', async () => {
  const dataURL = canvas.toDataURL();

  const { error } = await supabaseClient
    .from('drawings')
    .insert([{ image: dataURL }]);

  if (error) {
    console.error('❌ Save failed:', error);
    alert('Something went wrong');
  } else {
    alert('🎉 Drawing saved to the shared gallery!');
  }
});






// project card clicking
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

