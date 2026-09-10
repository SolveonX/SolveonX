/* Phase 4 — ROI calculator with animated number transitions */
(function () {
  function animateNumber(el, to, formatFn, duration) {
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = Number(el.dataset.num || 0);
    if (reduced || from === to) {
      el.dataset.num = String(to);
      el.textContent = formatFn(to);
      return;
    }
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = from + (to - from) * eased;
      el.textContent = formatFn(val);
      if (t < 1) requestAnimationFrame(frame);
      else {
        el.dataset.num = String(to);
        el.textContent = formatFn(to);
      }
    }
    requestAnimationFrame(frame);
  }

  window.initRoiCalculatorEnhanced = function initRoiCalculatorEnhanced() {
    const leads = document.getElementById("roi-leads");
    const miss = document.getElementById("roi-miss");
    const deal = document.getElementById("roi-deal");
    if (!leads || !miss || !deal) return;

    const outLeads = document.getElementById("roi-out-leads");
    const outLeads2 = document.getElementById("roi-out-leads-2");
    const outRecovered = document.getElementById("roi-out-recovered");
    const outRevenue = document.getElementById("roi-out-revenue");
    const outHours = document.getElementById("roi-out-hours");
    const missVal = document.getElementById("roi-miss-val");

    const fmt = (n) => new Intl.NumberFormat("en-IN").format(Math.round(n));
    const fmtInr = (n) => "₹" + fmt(n);
    const fmtHours = (n) => fmt(n) + "+";

    function update() {
      const monthlyLeads = Number(leads.value);
      const missRate = Number(miss.value) / 100;
      const dealValue = Number(deal.value);
      const recovered = Math.round(monthlyLeads * missRate * 0.5);
      const revenue = recovered * dealValue;
      const hours = Math.round(monthlyLeads * 0.15);

      if (missVal) missVal.textContent = Number(miss.value) + "%";
      animateNumber(outLeads, monthlyLeads, fmt, 450);
      animateNumber(outLeads2, monthlyLeads, fmt, 450);
      animateNumber(outRecovered, recovered, fmt, 450);
      animateNumber(outRevenue, revenue, fmtInr, 450);
      animateNumber(outHours, hours, fmtHours, 450);
    }

    [leads, miss, deal].forEach((input) => input.addEventListener("input", update));
    update();
  };
})();
