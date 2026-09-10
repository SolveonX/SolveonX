/* Phase 4 — exit-intent free-audit popup (once per session) */
(function () {
  const KEY = "solveonx_exit_popup_shown";

  function buildPopup() {
    const el = document.createElement("div");
    el.className = "exit-popup";
    el.id = "exit-popup";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "exit-popup-title");
    el.innerHTML = `
      <div class="exit-popup-panel">
        <button type="button" class="exit-popup-close" aria-label="Close">&times;</button>
        <h2 id="exit-popup-title">Before you go — free audit?</h2>
        <p>Share your WhatsApp lead flow. We will map where replies lag, follow-ups break, and what to automate first.</p>
        <div class="exit-popup-actions">
          <a href="#" class="btn btn-whatsapp" data-wa-message="Hi, I want a free automation audit before I leave the site">Get free audit</a>
          <button type="button" class="btn btn-secondary" data-exit-dismiss>Maybe later</button>
        </div>
      </div>`;
    document.body.appendChild(el);

    if (typeof waLink === "function") {
      el.querySelectorAll("[data-wa-message]").forEach((a) => {
        a.setAttribute("href", waLink(a.getAttribute("data-wa-message")));
      });
    }

    function close() {
      el.classList.remove("is-open");
    }

    el.querySelector(".exit-popup-close")?.addEventListener("click", close);
    el.querySelector("[data-exit-dismiss]")?.addEventListener("click", close);
    el.addEventListener("click", (e) => {
      if (e.target === el) close();
    });

    return el;
  }

  function show(popup) {
    if (sessionStorage.getItem(KEY) === "1") return;
    sessionStorage.setItem(KEY, "1");
    popup.classList.add("is-open");
  }

  window.initExitIntentPopup = function initExitIntentPopup() {
    if (sessionStorage.getItem(KEY) === "1") return;
    const popup = buildPopup();
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) {
      document.addEventListener("mouseout", (e) => {
        if (e.clientY <= 0 && e.relatedTarget == null) show(popup);
      });
    } else {
      // Mobile fallback: inactivity after 45s
      let timer = setTimeout(() => show(popup), 45000);
      ["touchstart", "scroll", "click"].forEach((evt) => {
        window.addEventListener(
          evt,
          () => {
            clearTimeout(timer);
            timer = setTimeout(() => show(popup), 45000);
          },
          { passive: true }
        );
      });
    }
  };
})();
