/* ============================================
   DATA — edit this to personalize skills & projects
============================================ */
const SKILLS = [
  { icon: "☕", name: "Core Java", level: "language", bg: "rgba(255,92,138,0.10)", accent: "#FF5C8A" },
  { icon: "➕", name: "C++", level: "language", bg: "rgba(255,209,102,0.10)", accent: "#FFD166" },
  { icon: "🌐", name: "HTML", level: "", bg: "rgba(46,230,166,0.10)", accent: "#2EE6A6" },
  { icon: "🎯", name: "CSS", level: "", bg: "rgba(139,128,255,0.12)", accent: "#8B80FF" },
  { icon: "⚡", name: "JavaScript", level: "", bg: "rgba(255,209,102,0.10)", accent: "#FFD166" },
  { icon: "⚛️", name: "ReactJS", level: "framework", bg: "rgba(139,128,255,0.12)", accent: "#8B80FF" },
  { icon: "🛡️", name: "Cybersecurity", level: "core concepts", bg: "rgba(46,230,166,0.10)", accent: "#2EE6A6" },
];

const PROJECTS = [
  {
    title: "Portfolio Website",
    desc: "A bold, animated personal portfolio built from scratch with vanilla HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JS"],
    url: "https://github.com/ManavNamawat",
    domain: "manavnamawat.dev"
  },
  {
    title: "ChatSphere",
    desc: "A real-time chat application UI with dynamic message rendering and a clean, responsive layout.",
    tags: ["JavaScript", "CSS"],
    url: "https://github.com/ManavNamawat",
    domain: "chatsphere.dev"
  },
  {
    title: "TodoList using DOM",
    desc: "A task management app built with pure DOM manipulation — add, complete, and delete tasks with no framework overhead.",
    tags: ["HTML", "CSS", "JS"],
    url: "https://github.com/ManavNamawat",
    domain: "todolist.dev"
  },
];

const TAG_COLORS = {
  HTML: { bg: "rgba(255,92,138,0.14)", color: "#FF5C8A" },
  CSS: { bg: "rgba(46,230,166,0.14)", color: "#2EE6A6" },
  JS: { bg: "rgba(255,209,102,0.14)", color: "#FFD166" },
  JavaScript: { bg: "rgba(255,209,102,0.14)", color: "#FFD166" },
  React: { bg: "rgba(139,128,255,0.16)", color: "#8B80FF" },
};

/* ============================================
   RENDER SKILLS
============================================ */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = SKILLS.map(s => `
    <div class="skill-card reveal" style="background:${s.bg}">
      <span class="skill-icon" aria-hidden="true">${s.icon}</span>
      <span class="skill-name" style="color:${s.accent}">${s.name}</span>
      <span class="skill-level">${s.level}</span>
    </div>
  `).join("");
}

/* ============================================
   RENDER PROJECTS
============================================ */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card reveal">
      <div class="browser-bar">
        <span class="browser-dot"></span>
        <span class="browser-dot"></span>
        <span class="browser-dot"></span>
        <span class="browser-url">${p.domain}</span>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag" style="background:${(TAG_COLORS[t]||{}).bg || 'var(--surface-2)'};color:${(TAG_COLORS[t]||{}).color || 'var(--text)'}">${t}</span>`).join("")}
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <a class="project-link" href="${p.url}" target="_blank" rel="noopener noreferrer">
          View on GitHub →
        </a>
      </div>
    </article>
  `).join("");
}

/* ============================================
   HERO WORD CYCLER
============================================ */
function initCycler() {
  const words = ["feel alive", "load fast", "just work", "spark joy"];
  const el = document.getElementById("cycler");
  if (!el) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    el.style.opacity = 0;
    el.style.transform = "translateY(6px)";
    setTimeout(() => {
      el.textContent = words[i];
      el.style.transition = "opacity .35s ease, transform .35s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 200);
  }, 2600);
}

/* ============================================
   MOBILE NAV TOGGLE
============================================ */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================
   ACTIVE NAV LINK ON SCROLL
============================================ */
function initActiveNav() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });

  sections.forEach(s => observer.observe(s));
}

/* ============================================
   SCROLL REVEAL
============================================ */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

function markRevealTargets() {
  document.querySelectorAll(".about-copy, .about-visual, .section-title, .contact-card").forEach(el => {
    el.classList.add("reveal");
  });
}

/* ============================================
   COPY TO CLIPBOARD (email / phone)
============================================ */
function initCopyButtons() {
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function copyValue(btn) {
    const value = btn.getAttribute("data-value");
    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied: ${value} ✓`);
    } catch (err) {
      showToast("Copy failed — please copy manually");
    }
  }

  const emailBtn = document.getElementById("copyEmail");
  const phoneBtn = document.getElementById("copyPhone");
  if (emailBtn) emailBtn.addEventListener("click", () => copyValue(emailBtn));
  if (phoneBtn) phoneBtn.addEventListener("click", () => copyValue(phoneBtn));
}

/* ============================================
   FOOTER YEAR
============================================ */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ============================================
   INIT
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  initCycler();
  initNavToggle();
  initActiveNav();
  markRevealTargets();
  initReveal();
  initCopyButtons();
  setYear();
});