const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const logoLink = document.querySelector(".logo");
const themeToggle = document.querySelector(".theme-toggle");
const langToggle = document.querySelector(".lang-toggle");
const html = document.documentElement;

const translations = {
  en: {
    callBar: "📞 Get in touch today!",
    "nav.home": "Home",
    "nav.reviews": "Reviews",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.openMenu": "Open menu",
    "lang.switchToEl": "Switch to Greek",
    "lang.switchToEn": "Switch to English",
    "theme.switchToDark": "Switch to dark mode",
    "theme.switchToLight": "Switch to bright mode",
    "hero.lead": "Comprehensive accounting oversight, strategic tax planning, and expert advisory support for businesses and individuals.",
    "hero.cta1": "Get in Touch",
    "hero.cta2": "Our Services",
    "reviews.title": "What Our Clients Say",
    "reviews.subtitle": "The trust and success of our clients is the greatest measure of our work.",
    "reviews.r1.text": "\"Excellent professionals! They helped us transition fully to digital accounting without any stress. Always responsive whenever we need support.\"",
    "reviews.r1.author": "John K. (Business Owner)",
    "reviews.r2.text": "\"The personal tax package saved me so much time. For the first time I know all my declarations and applications are handled on schedule.\"",
    "reviews.r2.author": "Maria P. (Individual Client)",
    "reviews.r3.text": "\"Finally found an office that understands my industry. Great value for money and the team is always available when I call.\"",
    "reviews.r3.author": "Nick M. (Self-Employed)",
    "reviews.cta": "See all reviews on Google",
    "services.title": "Our Services",
    "services.subtitle": "We design solutions tailored to the specific needs of your business or personal finances.",
    "services.prev": "Previous services",
    "services.next": "Next services",
    "services.popular": "Popular",
    "services.viewAll": "View All Services",
    "services.showLess": "Show Less",
    "services.status": "Showing services {start}–{end} of {total}",
    "services.s1.title": "Personal Tax Package",
    "services.s1.price": "From €100 / year",
    "services.s1.tagline": "For Individuals",
    "services.s1.l1": "<strong>Tax Return:</strong> Placeholder filing support",
    "services.s1.l2": "<strong>Property Records:</strong> Placeholder declaration help",
    "services.s1.l3": "<strong>Benefit Claims:</strong> Placeholder application review",
    "services.s1.l4": "<strong>Debt Guidance:</strong> Placeholder payment planning",
    "services.s2.title": "Business Accounting",
    "services.s2.price": "From €250 / month",
    "services.s2.tagline": "For Companies",
    "services.s2.l1": "<strong>Bookkeeping:</strong> Placeholder ledger management",
    "services.s2.l2": "<strong>Reporting:</strong> Placeholder monthly statements",
    "services.s2.l3": "<strong>MyData Sync:</strong> Placeholder digital compliance",
    "services.s2.l4": "<strong>Year-End Close:</strong> Placeholder annual review",
    "services.s3.title": "Payroll Services",
    "services.s3.price": "From €80 / month",
    "services.s3.tagline": "For Employers",
    "services.s3.l1": "<strong>Salary Processing:</strong> Placeholder payroll runs",
    "services.s3.l2": "<strong>Employee Records:</strong> Placeholder HR filing",
    "services.s3.l3": "<strong>Contribution Reports:</strong> Placeholder social security",
    "services.s3.l4": "<strong>Payslip Issuance:</strong> Placeholder payment docs",
    "services.s4.title": "VAT & Tax Filing",
    "services.s4.price": "From €150 / quarter",
    "services.s4.tagline": "For Traders",
    "services.s4.l1": "<strong>VAT Returns:</strong> Placeholder submission cycle",
    "services.s4.l2": "<strong>Tax Estimates:</strong> Placeholder liability review",
    "services.s4.l3": "<strong>Deadline Tracking:</strong> Placeholder reminder system",
    "services.s4.l4": "<strong>Audit Prep:</strong> Placeholder document checks",
    "services.s5.title": "Financial Advisory",
    "services.s5.price": "Custom pricing",
    "services.s5.tagline": "For Growth",
    "services.s5.l1": "<strong>Cash Flow:</strong> Placeholder forecast review",
    "services.s5.l2": "<strong>Tax Planning:</strong> Placeholder strategy session",
    "services.s5.l3": "<strong>Investment Review:</strong> Placeholder portfolio check",
    "services.s5.l4": "<strong>Business Plans:</strong> Placeholder financial modeling",
    "services.s6.title": "Startup Support",
    "services.s6.price": "From €300 / setup",
    "services.s6.tagline": "For New Businesses",
    "services.s6.l1": "<strong>Company Setup:</strong> Placeholder registration help",
    "services.s6.l2": "<strong>License Guidance:</strong> Placeholder compliance steps",
    "services.s6.l3": "<strong>Grant Applications:</strong> Placeholder funding support",
    "services.s6.l4": "<strong>First-Year Books:</strong> Placeholder onboarding plan",
    "contact.title": "Contact Us",
    "contact.address": "123 Main Street, City, 00000",
    "contact.hours": "Monday – Friday: 09:00 – 17:00",
    "footer.copyright": "© 2026 Accountability. All rights reserved."
  },
  el: {
    callBar: "📞 Επικοινωνήστε μαζί μας σήμερα!",
    "nav.home": "Αρχική",
    "nav.reviews": "Κριτικές",
    "nav.services": "Υπηρεσίες",
    "nav.contact": "Επικοινωνία",
    "nav.openMenu": "Άνοιγμα μενού",
    "lang.switchToEl": "Αλλαγή σε Ελληνικά",
    "lang.switchToEn": "Αλλαγή σε Αγγλικά",
    "theme.switchToDark": "Εναλλαγή σε σκοτεινή λειτουργία",
    "theme.switchToLight": "Εναλλαγή σε φωτεινή λειτουργία",
    "hero.lead": "Ολοκληρωμένη λογιστική επίβλεψη, στρατηγικός φορολογικός σχεδιασμός και εξειδικευμένη συμβουλευτική για επιχειρήσεις και ιδιώτες.",
    "hero.cta1": "Επικοινωνήστε Μαζί Μας",
    "hero.cta2": "Οι Υπηρεσίες μας",
    "reviews.title": "Τι Λένε οι Πελάτες μας",
    "reviews.subtitle": "Η εμπιστοσύνη και η επιτυχία των πελατών μας αποτελούν τη μεγαλύτερη επιβεβαίωση της δουλειάς μας.",
    "reviews.r1.text": "«Εξαιρετικοί επαγγελματίες! Μας βοήθησαν στην πλήρη ψηφιακή μετάβαση χωρίς κανένα άγχος. Άμεση ανταπόκριση σε ό,τι χρειαστούμε.»",
    "reviews.r1.author": "Γιάννης Κ. (Ιδιοκτήτης Επιχείρησης)",
    "reviews.r2.text": "«Το πακέτο φορολογίας με έσωσε πολύ χρόνο. Για πρώτη φορά ξέρω ότι όλες οι δηλώσεις μου γίνονται στην ώρα τους.»",
    "reviews.r2.author": "Μαρία Π. (Ιδιώτης)",
    "reviews.r3.text": "«Βρήκα επιτέλους ένα γραφείο που καταλαβαίνει τον κλάδο μου. Εξαιρετική σχέση ποιότητας-τιμής και πάντα διαθέσιμοι.»",
    "reviews.r3.author": "Νίκος Μ. (Ελεύθερος Επαγγελματίας)",
    "reviews.cta": "Δείτε όλες τις κριτικές στο Google",
    "services.title": "Οι Υπηρεσίες μας",
    "services.subtitle": "Σχεδιάζουμε λύσεις προσαρμοσμένες στις ιδιαίτερες ανάγκες της δραστηριότητάς σας.",
    "services.prev": "Προηγούμενες υπηρεσίες",
    "services.next": "Επόμενες υπηρεσίες",
    "services.popular": "Δημοφιλές",
    "services.viewAll": "Προβολή Όλων των Υπηρεσιών",
    "services.showLess": "Εμφάνιση Λιγότερων",
    "services.status": "Εμφάνιση υπηρεσιών {start}–{end} από {total}",
    "services.s1.title": "Πακέτο Φορολογίας Ιδιωτών",
    "services.s1.price": "Από 100€ / έτος",
    "services.s1.tagline": "Για Ιδιώτες",
    "services.s1.l1": "<strong>Φορολογική Δήλωση:</strong> Placeholder υποστήριξη",
    "services.s1.l2": "<strong>Ακίνητη Περιουσία:</strong> Placeholder δηλώσεις",
    "services.s1.l3": "<strong>Επιδόματα:</strong> Placeholder αιτήσεις",
    "services.s1.l4": "<strong>Ρυθμίσεις Οφειλών:</strong> Placeholder καθοδήγηση",
    "services.s2.title": "Εταιρική Λογιστική",
    "services.s2.price": "Από 250€ / μήνα",
    "services.s2.tagline": "Για Επιχειρήσεις",
    "services.s2.l1": "<strong>Βιβλία:</strong> Placeholder διαχείριση",
    "services.s2.l2": "<strong>Αναφορές:</strong> Placeholder μηνιαίες καταστάσεις",
    "services.s2.l3": "<strong>MyData:</strong> Placeholder ψηφιακή συμμόρφωση",
    "services.s2.l4": "<strong>Κλείσιμο Έτους:</strong> Placeholder ετήσια ανασκόπηση",
    "services.s3.title": "Διαχείριση Μισθοδοσίας",
    "services.s3.price": "Από 80€ / μήνα",
    "services.s3.tagline": "Για Εργοδότες",
    "services.s3.l1": "<strong>Μισθοδοσία:</strong> Placeholder υπολογισμοί",
    "services.s3.l2": "<strong>Προσωπικό:</strong> Placeholder αρχεία",
    "services.s3.l3": "<strong>Εισφορές:</strong> Placeholder αναφορές",
    "services.s3.l4": "<strong>Αποδείξεις:</strong> Placeholder πληρωμών",
    "services.s4.title": "ΦΠΑ & Φορολογικές Δηλώσεις",
    "services.s4.price": "Από 150€ / τρίμηνο",
    "services.s4.tagline": "Για Εμπόρους",
    "services.s4.l1": "<strong>Δηλώσεις ΦΠΑ:</strong> Placeholder υποβολές",
    "services.s4.l2": "<strong>Εκτιμήσεις:</strong> Placeholder φορολογική επιβάρυνση",
    "services.s4.l3": "<strong>Προθεσμίες:</strong> Placeholder υπενθυμίσεις",
    "services.s4.l4": "<strong>Έλεγχοι:</strong> Placeholder προετοιμασία",
    "services.s5.title": "Φορολογικός Σχεδιασμός",
    "services.s5.price": "Κατόπιν συνεννόησης",
    "services.s5.tagline": "Για Ανάπτυξη",
    "services.s5.l1": "<strong>Ταμειακές Ροές:</strong> Placeholder πρόβλεψη",
    "services.s5.l2": "<strong>Φορολογία:</strong> Placeholder στρατηγική",
    "services.s5.l3": "<strong>Επενδύσεις:</strong> Placeholder αξιολόγηση",
    "services.s5.l4": "<strong>Επιχειρηματικά Σχέδια:</strong> Placeholder μοντέλα",
    "services.s6.title": "Υποστήριξη Νέων Επιχειρήσεων",
    "services.s6.price": "Από 300€ / έναρξη",
    "services.s6.tagline": "Για Νέες Επιχειρήσεις",
    "services.s6.l1": "<strong>Σύσταση:</strong> Placeholder διαδικασίες",
    "services.s6.l2": "<strong>Άδειες:</strong> Placeholder καθοδήγηση",
    "services.s6.l3": "<strong>Επιδοτήσεις:</strong> Placeholder αιτήσεις",
    "services.s6.l4": "<strong>Πρώτο Έτος:</strong> Placeholder οργάνωση",
    "contact.title": "Επικοινωνήστε Μαζί Μας",
    "contact.address": "Οδός Παράδειγμα 123, Πόλη, 00000",
    "contact.hours": "Δευτέρα – Παρασκευή: 09:00 – 17:00",
    "footer.copyright": "© 2026 Accountability. Με επιφύλαξη παντός δικαιώματος."
  }
};

let currentLang = html.getAttribute("data-lang") || "en";
let refreshCarouselStatus = null;
let refreshExpandButton = null;

function t(key) {
  return translations[currentLang]?.[key] ?? translations.en[key] ?? key;
}

function applyLanguage(lang) {
  currentLang = lang;
  html.setAttribute("data-lang", lang);
  html.lang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

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

if (langToggle) {
  langToggle.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "el" : "en");
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

applyLanguage(currentLang);
