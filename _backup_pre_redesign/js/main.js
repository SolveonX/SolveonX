document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initWaLinks();
  setActiveNav();
  initCookieBanner();
  initContactForm();
  initRoiCalculator();
  mountTrustSectors("trust-sectors");
  mountTestimonials("testimonials-grid");
  mountBusinessTypeSelect("business-type");
  mountPricingDisclaimers();
  mountPageFooters();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.querySelector(".nav-mobile");
  if (!toggle || !mobile) return;

  toggle.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  mobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobile.classList.remove("open"));
  });
}

function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http")) return;
    const file = href.split("/").pop();
    if (file === path || (path === "" && file === "index.html")) {
      a.classList.add("active");
    }
  });
}

function initWaLinks() {
  document.querySelectorAll("[data-wa-message]").forEach((el) => {
    const msg = el.getAttribute("data-wa-message");
    if (msg && typeof waLink === "function") {
      el.setAttribute("href", waLink(msg));
    }
  });
}

function getProjectDemoHref(project) {
  if (!project?.id) return "";
  return `project.html?id=${encodeURIComponent(project.id)}`;
}

function renderProjectCard(project) {
  const demoHref = getProjectDemoHref(project);
  const thumbInner =
    typeof renderProjectThumb === "function"
      ? renderProjectThumb(project)
      : project.image
        ? `<img src="${project.image}" alt="${escapeHtml(project.title)} preview" loading="lazy" width="640" height="400">`
        : `<div class="project-thumb-fallback"><span class="project-thumb-sector">${escapeHtml(project.sector || project.category)}</span><strong>${escapeHtml(project.metric || project.title.charAt(0))}</strong><small>${escapeHtml(project.metricLabel || "highlight")}</small></div>`;
  const thumb = `<a href="${demoHref}" class="project-thumb-link" aria-label="Open ${escapeHtml(project.title)} demo">${thumbInner}</a>`;

  const tags = project.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
  const outcome = project.outcome
    ? `<p class="project-outcome">${escapeHtml(project.outcome)}</p>`
    : "";
  const tools = project.tools?.length
    ? `<p class="project-tools">${escapeHtml(project.tools.slice(0, 3).join(" | "))}</p>`
    : "";
  const openLabel = `Open details for ${project.title}`;

  return `
    <article class="card project-card" data-category="${escapeHtml(project.category)}" data-project-id="${escapeHtml(project.id)}">
      <div class="project-thumb">${thumb}</div>
      <div class="project-body">
        <span class="badge">${escapeHtml(project.category)}</span>
        <div class="project-meta">
          <h3><a href="${demoHref}" class="project-title-link">${escapeHtml(project.title)}</a></h3>
          <span class="project-year">${escapeHtml(project.year)}</span>
        </div>
        <p>${escapeHtml(project.description)}</p>
        ${outcome}
        ${tools}
        <div class="tags">${tags}</div>
        <div class="project-actions">
          <a href="${demoHref}" class="project-browse">Browse demo</a>
          <button type="button" class="project-open" data-project-open="${escapeHtml(project.id)}" aria-label="${escapeHtml(openLabel)}">View case study</button>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function mountFeaturedProjects(containerId, limit = 3) {
  const el = document.getElementById(containerId);
  if (!el || typeof PROJECTS === "undefined") return;

  const featured = PROJECTS.filter((p) => p.featured);
  const list = (featured.length ? featured : PROJECTS).slice(0, limit);
  el.innerHTML = list.map(renderProjectCard).join("");
}

function initAnalytics() {
  if (typeof SITE === "undefined" || !SITE.analyticsId) return;
  if (window.__solveonxAnalyticsLoaded) return;
  window.__solveonxAnalyticsLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.analyticsId}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", SITE.analyticsId, { anonymize_ip: true });
}

function initCookieBanner() {
  if (localStorage.getItem("solveonx_cookie_ok") === "1") {
    initAnalytics();
    return;
  }
  if (document.getElementById("cookie-banner")) return;
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-banner";
  banner.innerHTML = `
    <p>We use essential cookies and optional analytics to improve this site. See our <a href="privacy.html">Privacy Policy</a>.</p>
    <div class="cookie-banner-actions">
      <button type="button" class="btn btn-secondary btn-sm" id="cookie-decline">Essential only</button>
      <button type="button" class="btn btn-primary btn-sm" id="cookie-accept">Accept</button>
    </div>`;
  document.body.appendChild(banner);
  document.getElementById("cookie-accept")?.addEventListener("click", () => {
    localStorage.setItem("solveonx_cookie_ok", "1");
    banner.remove();
    initAnalytics();
  });
  document.getElementById("cookie-decline")?.addEventListener("click", () => {
    localStorage.setItem("solveonx_cookie_ok", "0");
    banner.remove();
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form || typeof getFormAction !== "function") return;
  form.action = getFormAction();
  const next = form.querySelector('input[name="_next"]');
  if (next && SITE?.url) next.value = `${SITE.url}/contact.html?sent=1`;
}

function mountPricingDisclaimers() {
  if (typeof SITE === "undefined" || !SITE.pricingDisclaimer) return;
  document.querySelectorAll("[data-pricing-disclaimer]").forEach((el) => {
    el.textContent = SITE.pricingDisclaimer;
  });
}

function mountPageFooters() {
  if (typeof SITE === "undefined") return;
  document.querySelectorAll("footer[data-site-footer]").forEach((footer) => {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid footer-grid-compact">
          <div>
            <a href="index.html" class="logo"><span class="logo-mark">SX</span> SolveonX</a>
            <p class="footer-tagline">${escapeHtml(SITE.tagline)}</p>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${escapeHtml(SITE.phone)}</a></li>
              <li><a href="mailto:${escapeHtml(SITE.email)}">${escapeHtml(SITE.email)}</a></li>
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              <li><a href="privacy.html">Privacy Policy</a></li>
              <li><a href="contact.html">Free audit</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; <span data-year></span> SolveonX</span>
          <span><a href="index.html">Home</a></span>
        </div>
      </div>`;
    footer.querySelector("[data-year]").textContent = new Date().getFullYear();
  });
}

function mountTrustSectors(containerId) {
  const el = document.getElementById(containerId);
  if (!el || typeof TRUST_SECTORS === "undefined") return;
  el.innerHTML = TRUST_SECTORS.map(
    (s) => `<span class="logo-pill"><span>${escapeHtml(s.abbr)}</span>${escapeHtml(s.label)}</span>`
  ).join("");
}

function mountTestimonials(containerId) {
  const el = document.getElementById(containerId);
  if (!el || typeof TESTIMONIALS === "undefined") return;
  const disclaimer =
    SITE?.testimonialDisclaimer
      ? `<p class="testimonial-disclaimer">${escapeHtml(SITE.testimonialDisclaimer)}</p>`
      : "";
  el.innerHTML = disclaimer + TESTIMONIALS.map(
    (t) => `
    <article class="testimonial-card">
      <blockquote>${escapeHtml(t.quote)}</blockquote>
      <div class="testimonial-author">
        <div class="testimonial-avatar" aria-hidden="true">${escapeHtml(t.initials)}</div>
        <div class="testimonial-meta">
          <strong>${escapeHtml(t.name)}</strong>
          <span>${escapeHtml(t.role)}</span>
        </div>
      </div>
    </article>`
  ).join("");
}

function mountBusinessTypeSelect(selectId) {
  const el = document.getElementById(selectId);
  if (!el || typeof BUSINESS_TYPES === "undefined") return;
  el.innerHTML =
    '<option value="" disabled selected>Select your business type</option>' +
    BUSINESS_TYPES.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("");
}

function initRoiCalculator() {
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

  function fmt(n) {
    return new Intl.NumberFormat("en-IN").format(Math.round(n));
  }

  function update() {
    const monthlyLeads = Number(leads.value);
    const missRate = Number(miss.value) / 100;
    const dealValue = Number(deal.value);
    const recovered = Math.round(monthlyLeads * missRate * 0.5);
    const revenue = recovered * dealValue;
    const hours = Math.round(monthlyLeads * 0.15);

    if (outLeads) outLeads.textContent = fmt(monthlyLeads);
    if (outLeads2) outLeads2.textContent = fmt(monthlyLeads);
    if (missVal) missVal.textContent = Number(miss.value) + "%";
    if (outRecovered) outRecovered.textContent = fmt(recovered);
    if (outRevenue) outRevenue.textContent = "₹" + fmt(revenue);
    if (outHours) outHours.textContent = fmt(hours) + "+";
  }

  [leads, miss, deal].forEach((input) => input.addEventListener("input", update));
  update();
}
