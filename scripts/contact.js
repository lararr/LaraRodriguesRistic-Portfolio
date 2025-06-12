// back to top button 
const backToTop = document.querySelector(".back-to-top");
const backToTopImg = backToTop.querySelector("img");

document.addEventListener("DOMContentLoaded", () => {
  // Hover image swap
  backToTop.addEventListener("mouseenter", () => {
    backToTopImg.src = "assets/icons/back-to-top-hover=true.svg";
  });

  backToTop.addEventListener("mouseleave", () => {
    backToTopImg.src = "assets/icons/back-to-top-hover=false.svg";
  });
});

// Smooth scroll to top on click
backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// email copy handling
const emailBtn = document.getElementById("copy-email-btn");
const emailTextEl = document.getElementById("email-text");

emailBtn.addEventListener("click", function () {
  const originalText = emailTextEl.innerText;
  navigator.clipboard.writeText(originalText).then(() => {
    console.log("Email copied!");
    emailTextEl.innerText = "Email copied!";
    setTimeout(() => {
      emailTextEl.innerText = originalText;
    }, 1500); // After 1.5 seconds, revert text
  }).catch((err) => {
    console.error("Failed to copy:", err);
  });
});
