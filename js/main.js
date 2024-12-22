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

  // Cursor Trail Effect
  function createCursorTrail() {
    const cursorContainer = document.querySelector(".cursor-container");
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    cursorContainer.appendChild(trail);

    document.addEventListener("mousemove", (e) => {
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
    });
  }

  // Scroll Progress
  function updateScrollProgress() {
    const scrollProgress = document.querySelector(".scroll-progress");
    window.addEventListener("scroll", () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / height) * 100;
      scrollProgress.style.setProperty("--scroll", `${scrolled}%`);
    });
  }

  // Breathing Circle
  function initBreathingCircle() {
    const circle = document.querySelector(".breathing-circle");
    const texts = circle.querySelectorAll(".breathe-text");
    let isAnimating = true;

    circle.addEventListener("click", () => {
      isAnimating = !isAnimating;
      if (isAnimating) {
        circle.style.animationPlayState = "running";
        texts.forEach((text) => (text.style.animationPlayState = "running"));
      } else {
        circle.style.animationPlayState = "paused";
        texts.forEach((text) => (text.style.animationPlayState = "paused"));
      }
    });

    // Optioneel: voeg hover effect toe
    circle.addEventListener("mouseenter", () => {
      if (!isAnimating) {
        circle.style.transform = "scale(1.1)";
      }
    });

    circle.addEventListener("mouseleave", () => {
      if (!isAnimating) {
        circle.style.transform = "scale(1)";
      }
    });
  }

  // Zen Mode Toggle
  function initZenMode() {
    const zenToggle = document.querySelector(".zen-toggle");
    zenToggle.addEventListener("click", () => {
      document.body.classList.toggle("zen-mode");
      // Optioneel: speel zachte overgang geluid
    });
  }

  // Back to Top Button
  function initBackToTop() {
    const backToTop = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Quote Rotation
  function initQuoteRotation() {
    const quotes = document.querySelectorAll(".quote");
    let currentQuote = 0;
    let isFirstRun = true;

    function showNextQuote() {
      // Verwijder active class van alle quotes
      quotes.forEach((quote) => {
        quote.classList.remove("active");
        quote.style.display = "none";
      });

      // Voeg active class toe aan huidige quote
      quotes[currentQuote].classList.add("active");
      quotes[currentQuote].style.display = "block";

      // Start de animatie opnieuw
      quotes[currentQuote].style.animation = "none";
      quotes[currentQuote].offsetHeight; // Force reflow
      quotes[currentQuote].style.animation =
        "quoteRotate 5s ease-in-out forwards";

      setTimeout(() => {
        currentQuote = (currentQuote + 1) % quotes.length;
        showNextQuote();
      }, 5000);
    }

    // Zorg ervoor dat de eerste quote meteen zichtbaar is
    if (isFirstRun && quotes.length > 0) {
      quotes[0].style.display = "block";
      quotes[0].classList.add("active");
      isFirstRun = false;
    }

    showNextQuote();
  }

  // Initialize all features
  createCursorTrail();
  updateScrollProgress();
  initBreathingCircle();
  initZenMode();
  initBackToTop();
  initQuoteRotation();

  const fadeInElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  fadeInElements.forEach((el) => observer.observe(el));
});
