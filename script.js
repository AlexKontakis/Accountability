// script.js
import translations from "./translations.js";

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const logoLink = document.querySelector(".logo");
const themeToggle = document.querySelector(".theme-toggle");
const langToggle = document.querySelector(".lang-toggle");
const html = document.documentElement;

let currentLang = html.getAttribute("data-lang") || "en";
let refreshCarouselStatus = null;
let refreshExpandButton = null;

function t(key) {
  // If key doesn't exist in current language, try English fallback, then default to the key name
  const translation = translations[currentLang]?.[key] ?? translations.en[key];
  
  if (!translation) {
    console.warn(`⚠️ [Translation Warning] No translation found for key: "${key}" in language: "${currentLang}"`);
    return key;
  }
  return translation;
}

function applyLanguage(lang) {
  // Start a collapsible console group to keep logs neat
  console.group(`🌐 [Language Manager] Applying language: "${lang.toUpperCase()}"`);
  
  const previousLang = currentLang;
  currentLang = lang;
  html.setAttribute("data-lang", lang);
  html.lang = lang;
  localStorage.setItem("lang", lang);

  let textElementsTranslated = 0;
  let ariaElementsTranslated = 0;

  // 1. Translate innerHTML elements
  const i18nElements = document.querySelectorAll("[data-i18n]");
  i18nElements.forEach((el) => {
    const key = el.dataset.i18n;
    const oldText = el.innerHTML.trim();
    const newText = t(key);
    
    el.innerHTML = newText;
    textElementsTranslated++;
    
    // Debug individual element translations (optional, verbose)
    // console.log(`Translated [data-i18n="${key}"]: "${oldText}" ➡️ "${newText}"`);
  });

  // 2. Translate ARIA label attributes
  const ariaElements = document.querySelectorAll("[data-i18n-aria]");
  ariaElements.forEach((el) => {
    const key = el.dataset.i18nAria;
    const newText = t(key);
    el.setAttribute("aria-label", newText);
    ariaElementsTranslated++;
  });

  // 3. Dynamic layout updates based on selected language
  if (langToggle) {
    langToggle.setAttribute(
      "aria-label",
      lang === "en" ? t("lang.switchToEl") : t("lang.switchToEn")
    );
  }

  if (navToggle) {
    navToggle.setAttribute("aria-label", t("nav.openMenu"));
  }

  if (themeToggle) {
    const isDark = html.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? t("theme.switchToLight") : t("theme.switchToDark")
    );
  }

  refreshExpandButton?.();
  refreshCarouselStatus?.();

  console.log(`✅ [Success] Switched from "${previousLang.toUpperCase()}" to "${lang.toUpperCase()}"`);
  console.log(`📊 Stats: ${textElementsTranslated} text elements & ${ariaElementsTranslated} ARIA labels updated.`);
  console.groupEnd(); // End the console group
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (logoLink) {
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    nav?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  html.setAttribute("data-theme", isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? t("theme.switchToLight") : t("theme.switchToDark")
    );
  }
}

if (themeToggle) {
  const isDark = html.getAttribute("data-theme") === "dark";
  applyTheme(isDark ? "dark" : "light");

  themeToggle.addEventListener("click", () => {
    const currentlyDark = html.getAttribute("data-theme") === "dark";
    applyTheme(currentlyDark ? "light" : "dark");
  });
}

// Translate button event listener with debug log
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const targetLang = currentLang === "en" ? "el" : "en";
    console.log(`🖱️ [UI Interaction] Language switch button clicked.`);
    applyLanguage(targetLang);
  });
}

const servicesSection = document.querySelector(".services");
const servicesCarousel = document.querySelector(".services-carousel");

if (servicesCarousel && servicesSection) {
  const track = servicesCarousel.querySelector(".services-track");
  const cards = servicesCarousel.querySelectorAll(".service-card");
  const prevBtn = servicesCarousel.querySelector(".carousel-prev");
  const nextBtn = servicesCarousel.querySelector(".carousel-next");
  const status = servicesSection.querySelector(".carousel-status");
  const expandBtn = servicesSection.querySelector(".services-expand-btn");
  let index = 0;

  function getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getCardsPerView());
  }

  function getSlideOffset() {
    const card = cards[0];
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.offsetWidth + gap;
  }

  function updateCarousel() {
    if (servicesSection.classList.contains("is-expanded")) return;

    const perView = getCardsPerView();
    const maxIndex = getMaxIndex();
    index = Math.min(index, maxIndex);

    track.style.transform = `translateX(-${index * getSlideOffset()}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= maxIndex;

    const start = index + 1;
    const end = Math.min(index + perView, cards.length);
    if (status) {
      status.textContent = t("services.status")
        .replace("{start}", start)
        .replace("{end}", end)
        .replace("{total}", cards.length);
    }
  }

  refreshCarouselStatus = updateCarousel;

  refreshExpandButton = () => {
    if (!expandBtn) return;
    const expanded = servicesSection.classList.contains("is-expanded");
    expandBtn.textContent = expanded ? t("services.showLess") : t("services.viewAll");
  };

  prevBtn.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    index = Math.min(getMaxIndex(), index + 1);
    updateCarousel();
  });

  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      const expanded = servicesSection.classList.toggle("is-expanded");
      expandBtn.setAttribute("aria-expanded", String(expanded));
      expandBtn.textContent = expanded ? t("services.showLess") : t("services.viewAll");

      if (expanded) {
        track.style.transform = "none";
      } else {
        updateCarousel();
      }
    });
  }

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}

// Initial language application on load
applyLanguage(currentLang);