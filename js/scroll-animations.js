/* Phase 3 — GSAP ScrollTrigger reveals */
(function () {
  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function markRevealTargets() {
    const selectors = [
      ".section .section-header",
      ".section .card",
      ".section .flow-step",
      ".section .diff-card",
      ".section .timeline-step",
      ".section .testimonial-card",
      ".section .roi-interactive",
      ".section .cta-band",
      ".section .workflow-preview > *",
      ".page-hero > .container > *",
    ];
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });
  }

  function initWithGsap() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      initFallback();
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    markRevealTargets();
    gsap.utils.toArray(".reveal").forEach((el, i) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: (i % 4) * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }

  function initFallback() {
    markRevealTargets();
    if (prefersReducedMotion()) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  window.initScrollAnimations = function initScrollAnimations() {
    if (prefersReducedMotion()) {
      markRevealTargets();
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Lazy-init after first paint
    if ("requestIdleCallback" in window) {
      requestIdleCallback(initWithGsap, { timeout: 1200 });
    } else {
      setTimeout(initWithGsap, 200);
    }
  };
})();
