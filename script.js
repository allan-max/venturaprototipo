document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcon = themeToggle.querySelector(".theme-icon")
  const body = document.body

  const savedTheme = localStorage.getItem("theme") || "light"

  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark")
    themeIcon.textContent = "☀️"
  } else {
    body.removeAttribute("data-theme")
    themeIcon.textContent = "🌙"
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")

    if (currentTheme === "dark") {
      body.removeAttribute("data-theme")
      themeIcon.textContent = "🌙"
      localStorage.setItem("theme", "light")
    } else {
      body.setAttribute("data-theme", "dark")
      themeIcon.textContent = "☀️"
      localStorage.setItem("theme", "dark")
    }
  })

  const navLinks = document.querySelectorAll(".nav-link")
  const headerHeight = document.querySelector(".header").offsetHeight

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          const targetPosition = targetElement.offsetTop - headerHeight - 20

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          const navMenu = document.getElementById("nav-menu")
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
          }
        }
      }
    })
  })

  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + headerHeight + 50

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))

        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
        }
      }
    })
  })

  const hamburgerMenu = document.querySelector(".hamburger-menu")
  const navMenu = document.getElementById("nav-menu")

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animação do hambúrguer
      const bars = hamburgerMenu.querySelectorAll(".bar")
      bars.forEach((bar, index) => {
        if (navMenu.classList.contains("active")) {
          if (index === 0) bar.style.transform = "rotate(45deg) translate(4px, 4px)"
          if (index === 1) bar.style.opacity = "0"
          if (index === 2) bar.style.transform = "rotate(-45deg) translate(5px, -4px)"
        } else {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        }
      })
    })
  }

  document.addEventListener("click", (e) => {
    if (!hamburgerMenu?.contains(e.target) && !navMenu?.contains(e.target)) {
      if (navMenu?.classList.contains("active")) {
        navMenu.classList.remove("active")

        const bars = hamburgerMenu?.querySelectorAll(".bar")
        bars?.forEach((bar) => {
          bar.style.transform = "none"
          bar.style.opacity = "1"
        })
      }
    }
  })

  // WhatsApp button analytics
  const whatsappButton = document.querySelector(".whatsapp-float")
  whatsappButton?.addEventListener("click", () => {
    console.log("[v0] WhatsApp button clicked")
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll(".service-item, .news-item, .contact-item, .client-logo")
  animatedElements.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(item)
  })

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroImg = document.querySelector(".hero-img")

    if (heroImg && scrolled < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.1}px)`
    }
  })

  const revealSections = document.querySelectorAll("section")
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  revealSections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    revealObserver.observe(section)
  })

  function initClientsCarousel() {
    const clientsLogos = document.querySelector(".clients-logos")
    const clientsCarousel = document.querySelector(".clients-carousel")

    if (window.innerWidth <= 768 && clientsCarousel) {
      // Garantir que o carrossel funcione corretamente no mobile
      clientsCarousel.style.animationDuration = "20s"

      // Pausar animação ao tocar/hover no mobile
      clientsLogos.addEventListener("touchstart", () => {
        clientsCarousel.style.animationPlayState = "paused"
      })

      clientsLogos.addEventListener("touchend", () => {
        clientsCarousel.style.animationPlayState = "running"
      })
    }
  }

  // Inicializar carrossel
  initClientsCarousel()

  // Reinicializar carrossel ao redimensionar janela
  window.addEventListener("resize", initClientsCarousel)
})
