document.addEventListener("DOMContentLoaded", () => {
  // Intro animation and transition to main content
  const introAnimation = document.getElementById("intro-animation")
  const envelopeContainer = document.getElementById("envelope-container")
  const cardContainer = document.getElementById("card-container")
  const envelope = document.getElementById("envelope")
  const birthdayCard = document.getElementById("birthday-card")
  const continueBtn = document.getElementById("continue-btn")
  const birthdaySong = document.getElementById("birthday-song")

  // Try to play the song automatically when the page loads
  birthdaySong.play().catch((e) => {
    console.log("Auto-play prevented by browser:", e)
    // Add a small notification about autoplay being blocked
    const autoplayMessage = document.createElement("div")
    autoplayMessage.className = "autoplay-message"
    autoplayMessage.innerHTML = "Click anywhere to play music 🎵"
    document.body.appendChild(autoplayMessage)

    // Allow clicking anywhere to start the music
    document.body.addEventListener(
      "click",
      () => {
        birthdaySong.play()
        autoplayMessage.style.display = "none"
      },
      { once: true },
    )
  })

  // Continue button click event
  continueBtn.addEventListener("click", () => {
    // Stop the song
    birthdaySong.pause()
    birthdaySong.currentTime = 0

    // Fade out intro
    introAnimation.style.opacity = "0"
    setTimeout(() => {
      introAnimation.style.display = "none"
      // Show envelope
      envelopeContainer.style.display = "block"
    }, 500)
  })

  // Envelope click event
  envelope.addEventListener("click", () => {
    // Open the envelope
    envelope.classList.add("open")

    // After the envelope opens and card slides out, fade out the envelope
    setTimeout(() => {
      envelope.classList.add("fade-out")

      // Move the card container out of the envelope wrapper before it disappears
      document.body.appendChild(cardContainer)

      // After envelope fades out, center the card on screen
      setTimeout(() => {
        // Position the card in the center of the screen
        cardContainer.style.position = "fixed"
        cardContainer.style.top = "50%"
        cardContainer.style.left = "50%"
        cardContainer.style.transform = "translate(-50%, -50%)"
        cardContainer.style.width = "80%"
        cardContainer.style.maxWidth = "800px"
        cardContainer.style.height = "80%"
        cardContainer.style.maxHeight = "600px"
        cardContainer.style.zIndex = "1000"

        // Automatically open the card after it's centered
        setTimeout(() => {
          birthdayCard.classList.add("open")
          setTimeout(() => {
            createConfetti()
          }, 500)
        }, 500)
      }, 1000)
    }, 1500)
  })

  // Gift interactions
  const gift1 = document.getElementById("gift1")
  const gift2 = document.getElementById("gift2")
  const gift3 = document.getElementById("gift3")
  const memorySection = document.getElementById("memory-section")
  const poemSection = document.getElementById("poem-section")
  const wishSection = document.getElementById("wish-section")

  gift1.addEventListener("click", () => {
    toggleSection(memorySection)
    gift1.textContent = "🎊"
    createConfetti()
  })

  gift2.addEventListener("click", () => {
    toggleSection(poemSection)
    gift2.textContent = "📝"
    createConfetti()
  })

  gift3.addEventListener("click", () => {
    toggleSection(wishSection)
    gift3.textContent = "🎂"
    createConfetti()
  })

  // Candle blowing interaction
  const candles = document.querySelectorAll(".wish-section .candle")
  let candlesBlown = 0

  candles.forEach((candle) => {
    candle.addEventListener("click", function () {
      const flame = this.querySelector(".flame")
      flame.style.display = "none"
      candlesBlown++

      if (candlesBlown === candles.length) {
        setTimeout(() => {
          alert("Your wish is on its way to coming true! 🌠")
          createConfetti()
        }, 500)
      }
    })
  })


  // Helper function to toggle sections
  function toggleSection(section) {
    if (section.classList.contains("hidden")) {
      // Hide all sections first
      document.querySelectorAll(".memory-section, .poem-section, .wish-section, .customize-panel").forEach((s) => {
        s.classList.add("hidden")
        s.classList.remove("visible")
      })

      // Show the selected section
      section.classList.remove("hidden")
      setTimeout(() => {
        section.classList.add("visible")
      }, 10)
    } else {
      section.classList.remove("visible")
      setTimeout(() => {
        section.classList.add("hidden")
      }, 500)
    }
  }

  // Confetti animation
  function createConfetti() {
    const confettiContainer = document.getElementById("confetti-container")
    const colors = ["#9c27b0", "#ba68c8", "#e1bee7", "#ff69b4", "#ce93d8", "#7b1fa2"]

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.width = Math.random() * 10 + 5 + "px"
      confetti.style.height = Math.random() * 10 + 5 + "px"
      confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)"

      confettiContainer.appendChild(confetti)

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
        },
      )

      animation.onfinish = () => {
        confetti.remove()
      }
    }
  }
})
