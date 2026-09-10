/* Phase 3 — cursor spotlight on hero */
(function () {
  window.initCursorSpotlight = function initCursorSpotlight() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const hero = document.querySelector(".hero");
    if (!hero) return;

    let spot = hero.querySelector(".cursor-spotlight");
    if (!spot) {
      spot = document.createElement("div");
      spot.className = "cursor-spotlight";
      spot.setAttribute("aria-hidden", "true");
      hero.prepend(spot);
    }

    let raf = 0;
    let nextX = 50;
    let nextY = 40;

    function paint() {
      spot.style.setProperty("--spot-x", nextX + "%");
      spot.style.setProperty("--spot-y", nextY + "%");
      raf = 0;
    }

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      nextX = ((e.clientX - rect.left) / rect.width) * 100;
      nextY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(paint);
    });
  };
})();
