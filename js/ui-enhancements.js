/* Shared UI enhancers — sticky CTA, theme toggle, marquee, carousel, social proof */
(function () {
  window.initStickyAuditButton = function initStickyAuditButton() {
    const hero = document.querySelector(".hero, .page-hero");
    if (!hero) return;
    let btn = document.getElementById("sticky-audit");
    if (!btn) {
      btn = document.createElement("a");
      btn.id = "sticky-audit";
      btn.className = "sticky-audit";
      btn.textContent = "Book free audit";
      btn.setAttribute("data-wa-message", "Hi, I want a free automation audit for my business");
      if (typeof waLink === "function") btn.href = waLink(btn.getAttribute("data-wa-message"));
      else btn.href = "contact.html";
      document.body.appendChild(btn);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        btn.classList.toggle("is-visible", !entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    io.observe(hero);
  };

  window.initThemeToggle = function initThemeToggle() {
    const KEY = "solveonx_theme";
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }

    function syncIcon(btn) {
      const theme = document.documentElement.getAttribute("data-theme") || "dark";
      btn.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
      btn.innerHTML =
        theme === "light"
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    }

    document.querySelectorAll(".header-inner").forEach((header) => {
      if (header.querySelector(".theme-toggle")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-toggle";
      syncIcon(btn);
      btn.addEventListener("click", () => {
        const next = (document.documentElement.getAttribute("data-theme") || "dark") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(KEY, next);
        syncIcon(btn);
      });
      const toggle = header.querySelector(".nav-toggle");
      if (toggle) header.insertBefore(btn, toggle);
      else header.appendChild(btn);
    });
  };

  window.initLogoMarquee = function initLogoMarquee() {
    const host = document.getElementById("trust-sectors");
    if (!host || typeof TRUST_SECTORS === "undefined") return;
    const parent = host.closest(".logos-inner") || host.parentElement;
    if (!parent || parent.querySelector(".logo-marquee")) return;

    const pills = TRUST_SECTORS.concat(TRUST_SECTORS)
      .map((s) => `<span class="logo-pill"><span>${s.abbr}</span>${s.label}</span>`)
      .join("");

    const wrap = document.createElement("div");
    wrap.className = "logo-marquee";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = `<div class="logo-marquee-track">${pills}</div>`;
    host.replaceWith(wrap);
    const label = parent.querySelector(".logos-label");
    if (label) label.textContent = "Built for";
  };

  window.initTestimonialCarousel = function initTestimonialCarousel() {
    const grid = document.getElementById("testimonials-grid");
    if (!grid) return;
    grid.classList.add("testimonial-carousel");
    const cards = [...grid.querySelectorAll(".testimonial-card")];
    if (cards.length < 2) return;

    const track = document.createElement("div");
    track.className = "testimonial-track";
    cards.forEach((c) => track.appendChild(c));
    // Duplicate disclaimer stays above
    const disclaimer = grid.querySelector(".testimonial-disclaimer");
    grid.innerHTML = "";
    if (disclaimer) grid.appendChild(disclaimer);
    grid.appendChild(track);

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    track.addEventListener("pointerdown", (e) => {
      isDown = true;
      track.classList.add("is-dragging");
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    ["pointerup", "pointerleave"].forEach((evt) =>
      track.addEventListener(evt, () => {
        isDown = false;
        track.classList.remove("is-dragging");
      })
    );
    track.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX);
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let dir = 1;
      setInterval(() => {
        if (isDown) return;
        const max = track.scrollWidth - track.clientWidth;
        if (max <= 0) return;
        if (track.scrollLeft >= max - 4) dir = -1;
        if (track.scrollLeft <= 4) dir = 1;
        track.scrollBy({ left: dir * 220, behavior: "smooth" });
      }, 4000);
    }
  };

  window.initSocialProofWidget = function initSocialProofWidget() {
    const host = document.querySelector(".hero-copy .hero-actions");
    if (!host || document.querySelector(".social-proof")) return;
    const el = document.createElement("div");
    el.className = "social-proof";
    el.innerHTML = '<span class="dot" aria-hidden="true"></span><span><strong data-audits-week>12</strong> audits booked this week</span>';
    host.insertAdjacentElement("afterend", el);
  };

  window.initHeroFloat = function initHeroFloat() {
    const visual = document.querySelector(".hero-visual .dashboard-shell");
    if (visual) visual.classList.add("float-slow");
    const accent = document.querySelector(".hero h1 .accent-text");
    if (accent) accent.classList.add("gradient-text-animated");
  };

  window.initHomepageDemo = function initHomepageDemo() {
    const phone = document.querySelector(".workflow-preview .phone-mock");
    if (!phone) return;
    // Replace static bubbles with live typing demo container
    const bar = phone.querySelector(".phone-bar");
    phone.innerHTML = "";
    if (bar) phone.appendChild(bar);
    const demo = document.createElement("div");
    demo.className = "typing-demo";
    demo.id = "home-typing-demo";
    phone.appendChild(demo);

    const system = document.querySelector(".workflow-preview .system-card");
    if (system) {
      system.classList.add("crm-sync-demo");
      const fields = system.querySelectorAll(".lead-fields dd");
      const keys = ["intent", "need", "owner", "next"];
      fields.forEach((dd, i) => {
        if (keys[i]) dd.setAttribute("data-crm", keys[i]);
      });
    }

    const applyCrm = typeof initCrmSyncDemo === "function" ? initCrmSyncDemo(".crm-sync-demo") : null;
    if (typeof initWhatsappTypingDemo === "function") {
      initWhatsappTypingDemo("#home-typing-demo", null, (i) => {
        if (applyCrm) applyCrm(i);
      });
    }
  };
})();
