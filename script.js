const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");
const themeButton = document.querySelector(".theme-toggle");
const animateTargets = document.querySelectorAll("[data-animate]");
const statCards = document.querySelectorAll(".stat-card");

const setTheme = (theme) => {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("preferred-theme", theme);
};

const storedTheme = localStorage.getItem("preferred-theme");
if (storedTheme) {
  setTheme(storedTheme);
} else {
  setTheme("light");
}

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", (!expanded).toString());
  navList?.classList.toggle("open");
});

navList?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navList.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

themeButton?.addEventListener("click", () => {
  const current = body.getAttribute("data-theme");
  const nextTheme = current === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animateTargets.forEach((target) => observer.observe(target));
statCards.forEach((card) => observer.observe(card));

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

