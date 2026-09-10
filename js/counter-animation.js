/* Phase 3 — number count-up on scroll */
(function () {
  function parseTarget(text) {
    const raw = String(text).trim();
    const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return null;
    return { prefix: match[1], value: parseFloat(match[2]), suffix: match[3], decimals: (match[2].split(".")[1] || "").length };
  }

  function animateValue(el, target, duration) {
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target.value * eased;
      const shown = target.decimals
        ? current.toFixed(target.decimals)
        : Math.round(current).toString();
      el.textContent = target.prefix + shown + target.suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = target.prefix + (target.decimals ? target.value.toFixed(target.decimals) : String(target.value)) + target.suffix;
    }
    requestAnimationFrame(frame);
  }

  window.initCounterAnimation = function initCounterAnimation() {
    const nodes = document.querySelectorAll(
      ".stat-value, .metric-row strong, .result-metric, [data-count]"
    );
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset.counted === "1") return;
          const parsed = parseTarget(el.dataset.count || el.textContent);
          if (!parsed || Number.isNaN(parsed.value)) return;
          el.dataset.counted = "1";
          animateValue(el, parsed, 1100);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    nodes.forEach((el) => io.observe(el));
  };
})();
