document.addEventListener("DOMContentLoaded", () => {
  // Intro animation and transition to main content
  const introAnimation = document.getElementById("intro-animation")
  const envelopeContainer = document.getElementById("envelope-container")
  const cardContainer = document.getElementById("card-container")
  const envelope = document.getElementById("envelope")
  const envelopeText = document.querySelector(".envelope-text") // Added envelope text reference
  const birthdayCard = document.getElementById("birthday-card")
  const continueBtn = document.getElementById("continue-btn")
  const birthdaySong = document.getElementById("birthday-song")
  const gifts = document.querySelectorAll(".gift")

  // Gift sections that will be revealed
  const memorySection = document.getElementById("memory-section")
  const poemSection = document.getElementById("poem-section")
  const wishSection = document.getElementById("wish-section")

  // Try to play the song automatically when the page loads
  // First set it to muted to bypass autoplay restrictions
  birthdaySong.muted = true
  birthdaySong
    .play()
    .then(() => {
      // If successful, unmute after a short delay
      setTimeout(() => {
        birthdaySong.muted = false
      }, 100)
    })
    .catch((e) => {
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
          birthdaySong.muted = false
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

    // After the envelope opens and card slides out completely
    setTimeout(() => {
      // Calculate current position of card for smooth animation
      const rect = cardContainer.getBoundingClientRect()

      // Set the initial position of the card
      document.body.appendChild(cardContainer)
      cardContainer.style.position = "fixed"
      cardContainer.style.top = `${rect.top}px`
      cardContainer.style.left = `${rect.left}px`
      cardContainer.style.width = `${rect.width}px`
      cardContainer.style.height = `${rect.height}px`
      cardContainer.style.zIndex = "1000"

      // Store the starting dimensions as CSS variables for the animation
      cardContainer.style.setProperty("--start-top", `${rect.top}px`)
      cardContainer.style.setProperty("--start-left", `${rect.left}px`)
      cardContainer.style.setProperty("--start-width", `${rect.width}px`)
      cardContainer.style.setProperty("--start-height", `${rect.height}px`)

      // Fade out the envelope and the "click to open" text
      envelope.classList.add("fade-out")
      envelopeText.classList.add("fade-out") // Added fade-out for envelope text

      // Apply the moving animation to the card with a small delay
      // This will visibly animate the card's movement and size change to the center
      setTimeout(() => {
        cardContainer.classList.add("moving-to-center")

        // Open the card after it reaches the center
        setTimeout(() => {
          birthdayCard.classList.add("open")
          // Ensure the card content is fully visible when opened
          document.querySelector(".card-inside").scrollTop = 0
          setTimeout(() => {
            createConfetti()
          }, 500)
        }, 2000) // Wait for card to reach center (match animation duration)
      }, 300)
    }, 1500) // Wait for card to fully slide out of envelope
  })

  // Gift interactions - modified to reveal sections when clicked
  gifts.forEach((gift, index) => {
    gift.addEventListener("click", () => {
      const emojis = ["🎊", "📝", "🎂"]
      gift.textContent = emojis[index]
      createConfetti()

      // Show the corresponding section
      const sections = [memorySection, poemSection, wishSection]

      // Show the clicked section
      sections[index].classList.remove("hidden")

      // Smooth scroll to the section
      sections[index].scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })

  // Candle blowing interaction
  const candles = document.querySelectorAll(".wish-section .mini-candle")
  let candlesBlown = 0

  candles.forEach((candle) => {
    candle.addEventListener("click", function () {
      const flame = this.querySelector(".mini-flame")
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
