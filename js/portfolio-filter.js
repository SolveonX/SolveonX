/* Phase 4 — portfolio filter transitions */
(function () {
  window.enhancePortfolioFilterTransitions = function enhancePortfolioFilterTransitions() {
    const grid = document.getElementById("portfolio-grid");
    if (!grid) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new MutationObserver(() => {
      if (reduced) return;
      grid.querySelectorAll(".project-card").forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        requestAnimationFrame(() => {
          card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
          card.style.transitionDelay = `${Math.min(i, 8) * 40}ms`;
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
      });
    });

    observer.observe(grid, { childList: true });
  };
})();
