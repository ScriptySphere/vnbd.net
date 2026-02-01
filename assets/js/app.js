(() => {
  const GOOGLE_FORM_URL = "YOUR_GOOGLE_FORM_LINK_HERE";

  const $ = (sel, root = document) => root.querySelector(sel);

  function setJoinLinks() {
    const ids = ["googleFormBtn", "joinCta", "heroJoinBtn", "footerJoinLink"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (id === "heroJoinBtn" || id === "footerJoinLink") {
        el.setAttribute("href", "#join");
      } else {
        el.setAttribute("href", GOOGLE_FORM_URL);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(() => t.classList.remove("show"), 2200);
  }

  function navToggle() {
    const btn = $(".nav__toggle");
    const menu = $("#navMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function animateCounts() {
    const nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      nums.forEach((el) => (el.textContent = el.getAttribute("data-count")));
      return;
    }

    const start = performance.now();
    const duration = 900;

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      nums.forEach((el) => {
        const target = Number(el.getAttribute("data-count"));
        const value = Math.floor(target * t);
        el.textContent = String(value);
      });
      if (t < 1) requestAnimationFrame(tick);
      else nums.forEach((el) => (el.textContent = el.getAttribute("data-count")));
    }

    requestAnimationFrame(tick);
  }

  function copyJoinLink() {
    const btn = $("#copyJoinLinkBtn");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      if (!GOOGLE_FORM_URL || GOOGLE_FORM_URL.includes("YOUR_GOOGLE_FORM_LINK_HERE")) {
        toast("Add your Google Form link in assets/js/app.js first.");
        return;
      }

      try {
        await navigator.clipboard.writeText(GOOGLE_FORM_URL);
        toast("Join form link copied.");
      } catch {
        toast("Could not copy. Please copy the link manually.");
      }
    });
  }

  function contactCopy() {
    const form = $("#contactForm");
    const help = $("#contactHelp");
    if (!form || !help) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        help.textContent = "Please fill in your name, email, and message.";
        toast("Please complete the form.");
        return;
      }

      const payload =
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Message:\n${message}\n`;

      try {
        await navigator.clipboard.writeText(payload);
        help.textContent = "Message copied. You can paste it into email or chat.";
        toast("Message copied.");
      } catch {
        help.textContent = "Could not copy automatically. Please copy your message manually.";
        toast("Copy failed.");
      }
    });

    form.addEventListener("reset", () => {
      help.textContent = "";
    });
  }

  function setYear() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function init() {
    setJoinLinks();
    navToggle();
    animateCounts();
    copyJoinLink();
    contactCopy();
    setYear();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
