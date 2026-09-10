/* Phase 4 — CRM fields update in sync with chat demo */
(function () {
  const STEPS = [
    { intent: "Warm", need: "Course inquiry", owner: "Queue", next: "Qualifying…" },
    { intent: "Warm", need: "Weekend batch", owner: "Queue", next: "Collecting details" },
    { intent: "High", need: "Digital marketing · South Delhi", owner: "Admissions team", next: "Offer booking" },
    { intent: "High", need: "Weekend batch", owner: "Admissions team", next: "Call booked + reminder set" },
  ];

  window.initCrmSyncDemo = function initCrmSyncDemo(rootSelector) {
    const root = document.querySelector(rootSelector || ".crm-sync-demo");
    if (!root) return null;

    const map = {
      intent: root.querySelector('[data-crm="intent"]'),
      need: root.querySelector('[data-crm="need"]'),
      owner: root.querySelector('[data-crm="owner"]'),
      next: root.querySelector('[data-crm="next"]'),
    };

    function setField(el, value) {
      if (!el) return;
      el.classList.add("is-updating");
      el.textContent = value;
      setTimeout(() => el.classList.remove("is-updating"), 400);
    }

    return function applyStep(index) {
      const step = STEPS[Math.min(index, STEPS.length - 1)];
      if (!step) return;
      setField(map.intent, step.intent);
      setField(map.need, step.need);
      setField(map.owner, step.owner);
      setField(map.next, step.next);
    };
  };
})();
