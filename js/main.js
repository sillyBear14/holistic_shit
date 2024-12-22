document.addEventListener("DOMContentLoaded", () => {
  // Welcome overlay functionality
  const welcomeOverlay = document.querySelector(".welcome-overlay");
  const welcomeButton = document.querySelector(".welcome-button");
  const closeButton = document.querySelector(".close-overlay");
  const countdownElement = document.getElementById("countdown");

  // Set countdown timer
  let timeLeft = 3 * 60 * 60; // 3 hours in seconds

  const updateCountdown = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    countdownElement.textContent = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft > 0) {
      timeLeft--;
    }
  };

  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call

  if (welcomeButton && welcomeOverlay) {
    welcomeButton.addEventListener("click", () => {
      // Hier kun je een link naar het aanmeldformulier toevoegen
      window.location.href = "#contact";
      welcomeOverlay.classList.add("hide");
      setTimeout(() => {
        welcomeOverlay.style.display = "none";
      }, 800);
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      welcomeOverlay.classList.add("hide");
      setTimeout(() => {
        welcomeOverlay.style.display = "none";
      }, 800);
    });
  }

  // Mobile menu functionality
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  mobileMenu?.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".service-card");

  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Initial check

  // Audio functionality
  const audioButton = document.getElementById("toggleAudio");
  const bgMusic = document.getElementById("bgMusic");

  if (audioButton && bgMusic) {
    audioButton.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.volume = 0.2; // Start met lager volume
        bgMusic
          .play()
          .then(() => {
            audioButton.classList.add("playing");
          })
          .catch((error) => {
            console.log("Audio autoplay prevented:", error);
          });
      } else {
        bgMusic.pause();
        audioButton.classList.remove("playing");
      }
    });
  }

  // Fade in audio when playing
  if (bgMusic) {
    let volume = 0;
    bgMusic.volume = volume;

    const fadeAudio = setInterval(() => {
      if (volume < 0.2 && !bgMusic.paused) {
        volume = Math.min(0.2, volume + 0.01);
        bgMusic.volume = volume;
      } else {
        clearInterval(fadeAudio);
      }
    }, 200);
  }

  // Parallax effect voor hero
  const heroParallax = document.querySelector(".hero-parallax");

  if (heroParallax) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;

      heroParallax.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  }

  // Willekeurige positionering van woorden
  function positionWords() {
    const words = document.querySelectorAll(".floating-words span");
    const container = document.querySelector(".floating-words");

    if (container) {
      const containerRect = container.getBoundingClientRect();

      words.forEach((word) => {
        const x = Math.random() * (containerRect.width - 200); // Marge voor woordbreedte
        const y = Math.random() * (containerRect.height - 50); // Marge voor woordhoogte

        word.style.left = `${x}px`;
        word.style.top = `${y}px`;
      });
    }
  }

  // Herpositioneer woorden elke 8 seconden
  setInterval(positionWords, 16000);
  positionWords(); // Initial positioning
});
