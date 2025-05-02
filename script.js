document.addEventListener("DOMContentLoaded", () => {
  // Intro animation and transition to main content
  const introAnimation = document.getElementById("intro-animation");
  const envelopeContainer = document.getElementById("envelope-container");
  const cardContainer = document.getElementById("card-container");
  const envelope = document.getElementById("envelope");
  const birthdayCard = document.getElementById("birthday-card");
  const continueBtn = document.getElementById("continue-btn");
  const birthdaySong = document.getElementById("birthday-song");
  
  // Try to play the song automatically when the page loads
  birthdaySong.play().catch((e) => {
    console.log("Auto-play prevented by browser:", e);
    // Add a small notification about autoplay being blocked
    const autoplayMessage = document.createElement("div");
    autoplayMessage.className = "autoplay-message";
    autoplayMessage.innerHTML = "Click anywhere to play music 🎵";
    document.body.appendChild(autoplayMessage);
    
    // Allow clicking anywhere to start the music
    document.body.addEventListener("click", () => {
      birthdaySong.play();
      autoplayMessage.style.display = "none";
    }, { once: true });
  });

  // Continue button click event
  continueBtn.addEventListener("click", () => {
    // Stop the song
    birthdaySong.pause();
    birthdaySong.currentTime = 0;

    // Fade out intro
    introAnimation.style.opacity = "0";
    setTimeout(() => {
      introAnimation.style.display = "none";
      // Show envelope
      envelopeContainer.style.display = "block";
    }, 500);
  });

  // Envelope click event
  envelope.addEventListener("click", () => {
    // Open the envelope
    envelope.classList.add("open");
    
    // After a delay, show the card and fade out the envelope
    setTimeout(() => {
      // Show the card container
      cardContainer.style.display = "block";
      
      // Fade out the envelope
      envelope.classList.add("fade-out");
      
      // After envelope fades out, enable card interaction
      setTimeout(() => {
        // Card front click event
        const cardFront = document.querySelector(".card-front");
        
        cardFront.addEventListener("click", () => {
          birthdayCard.classList.add("open");
          setTimeout(() => {
            createConfetti();
          }, 1000);
        });
      }, 1000);
    }, 1000);
  });

  // Gift interactions
  const gift1 = document.getElementById("gift1");
  const gift2 = document.getElementById("gift2");
  const gift3 = document.getElementById("gift3");
  const memorySection = document.getElementById("memory-section");
  const poemSection = document.getElementById("poem-section");
  const wishSection = document.getElementById("wish-section");

  gift1.addEventListener("click", () => {
    toggleSection(memorySection);
    gift1.textContent = "🎊";
    createConfetti();
  });

  gift2.addEventListener("click", () => {
    toggleSection(poemSection);
    gift2.textContent = "📝";
    createConfetti();
  });

  gift3.addEventListener("click", () => {
    toggleSection(wishSection);
    gift3.textContent = "🎂";
    createConfetti();
  });

  // Candle blowing interaction
  const candles = document.querySelectorAll(".wish-section .candle");
  let candlesBlown = 0;

  candles.forEach((candle) => {
    candle.addEventListener("click", function () {
      const flame = this.querySelector(".flame");
      flame.style.display = "none";
      candlesBlown++;

      if (candlesBlown === candles.length) {
        setTimeout(() => {
          alert("Your wish is on its way to coming true! 🌠");
          createConfetti();
        }, 500);
      }
    });
  });

  // Customize message functionality
  const customizeBtn = document.getElementById("customize-btn");
  const customizePanel = document.getElementById("customize-panel");
  const saveMessageBtn = document.getElementById("save-message");
  const customMessage = document.getElementById("custom-message");
  const messageElement = document.querySelector(".message");

  customizeBtn.addEventListener("click", () => {
    toggleSection(customizePanel);
    customMessage.value = messageElement.textContent;
  });

  saveMessageBtn.addEventListener("click", () => {
    messageElement.textContent = customMessage.value;
    toggleSection(customizePanel);
    alert("Your message has been saved! ❤️");
  });

  // Helper function to toggle sections
  function toggleSection(section) {
    if (section.classList.contains("hidden")) {
      // Hide all sections first
      document.querySelectorAll(".memory-section, .poem-section, .wish-section, .customize-panel").forEach((s) => {
        s.classList.add("hidden");
        s.classList.remove("visible");
      });

      // Show the selected section
      section.classList.remove("hidden");
      setTimeout(() => {
        section.classList.add("visible");
      }, 10);
    } else {
      section.classList.remove("visible");
      setTimeout(() => {
        section.classList.add("hidden");
      }, 500);
    }
  }

  // Confetti animation
  function createConfetti() {
    const confettiContainer = document.getElementById("confetti-container");
    const colors = ["#9c27b0", "#ba68c8", "#e1bee7", "#ff69b4", "#ce93d8", "#7b1fa2"];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = Math.random() * 10 + 5 + "px";
      confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";

      confettiContainer.appendChild(confetti);

      const animation = confetti.animate(
        [
          { transform: "translateY(0) rotate(0)", opacity: 1 },
          {
            transform: "translateY(" + (Math.random() * 500 + 500) + "px) rotate(" + Math.random() * 360 + "deg)",
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "cubic-bezier(0,0.9,0.57,1)",
          delay: Math.random() * 1500,
        }
      );

      animation.onfinish = () => {
        confetti.remove();
      };
    }
  }
});