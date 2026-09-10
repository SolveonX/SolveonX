/* Phase 4 — scripted WhatsApp typing demo */
(function () {
  const DEFAULT_SCRIPT = [
    { role: "in", text: "Hi, is admission open for the weekend batch?" },
    { role: "out", text: "Yes. May I ask your course, location, and preferred start date?" },
    { role: "in", text: "Digital marketing, South Delhi, this month." },
    { role: "out", text: "Great. I found a fit. Book a free counselling call here." },
  ];

  function sleep(ms, reduced) {
    return new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  }

  async function typeText(el, text, reduced) {
    if (reduced) {
      el.textContent = text;
      return;
    }
    el.textContent = "";
    for (let i = 0; i < text.length; i += 1) {
      el.textContent += text[i];
      await sleep(18 + Math.random() * 22, false);
    }
  }

  window.initWhatsappTypingDemo = function initWhatsappTypingDemo(rootSelector, script, onStep) {
    const root = typeof rootSelector === "string" ? document.querySelector(rootSelector) : rootSelector;
    if (!root) return;

    const messages = script || DEFAULT_SCRIPT;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let loop = true;

    async function run() {
      while (loop) {
        root.innerHTML = "";
        for (let i = 0; i < messages.length; i += 1) {
          const msg = messages[i];
          if (msg.role === "out" && !reduced) {
            const tip = document.createElement("div");
            tip.className = "typing-indicator";
            tip.innerHTML = "<span></span><span></span><span></span>";
            tip.setAttribute("aria-hidden", "true");
            root.appendChild(tip);
            await sleep(700, false);
            tip.remove();
          }
          const bubble = document.createElement("div");
          bubble.className = "bubble " + (msg.role === "out" ? "out" : "in");
          root.appendChild(bubble);
          await typeText(bubble, msg.text, reduced);
          if (typeof onStep === "function") onStep(i, msg);
          await sleep(550, reduced);
        }
        await sleep(1800, reduced);
        if (reduced) break;
      }
    }

    run();
    return () => {
      loop = false;
    };
  };
})();
