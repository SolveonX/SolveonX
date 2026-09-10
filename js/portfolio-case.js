/* Renders individual portfolio case study pages */
(function () {
  function bySlug() {
    const file = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
    if (typeof SHOWCASE_PROJECTS === "undefined") return null;
    return SHOWCASE_PROJECTS.find((p) => p.slug === file || p.id === file) || null;
  }

  function render(project) {
    const root = document.getElementById("case-root");
    if (!root || !project) return;

    const stats = (project.stats || [])
      .map(
        (s) =>
          `<div class="card"><dt class="stat-value" data-count="${s.value}">${s.value}${s.suffix || ""}</dt><dd class="stat-label">${s.label}</dd></div>`
      )
      .join("");

    const steps = (project.workflow || [])
      .map((step, i) => `<li class="flow-step"><span>${String(i + 1).padStart(2, "0")}</span><h3>${step}</h3></li>`)
      .join("");

    root.innerHTML = `
      <div class="page-hero">
        <div class="container">
          <p class="section-label">${project.category} · ${project.sector}</p>
          <h1>${project.title}</h1>
          <p class="section-desc">${project.description}</p>
          <div class="hero-actions" style="margin-top:1.25rem">
            <a href="../contact.html" class="btn btn-primary">Discuss similar system</a>
            <a href="../portfolio.html" class="btn btn-secondary">Back to portfolio</a>
          </div>
        </div>
      </div>
      <section class="section">
        <div class="container">
          <div class="card-grid card-grid-3" style="margin-bottom:2rem">${stats}</div>
          <div class="two-col">
            <article class="card">
              <h2>Problem</h2>
              <p>${project.problem || project.challenge}</p>
            </article>
            <article class="card">
              <h2>Solution</h2>
              <p>${project.solution}</p>
            </article>
          </div>
        </div>
      </section>
      <section class="section section-alt">
        <div class="container">
          <header class="section-header center">
            <p class="section-label">Workflow</p>
            <h2 class="section-title">How ${project.title} runs</h2>
          </header>
          <ol class="flow">${steps}</ol>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <header class="section-header center">
            <p class="section-label">Interactive demo</p>
            <h2 class="section-title">Scripted chat + CRM sync</h2>
          </header>
          <div class="workflow-preview">
            <div class="phone-mock">
              <div class="phone-bar"></div>
              <div class="typing-demo" id="case-typing-demo"></div>
            </div>
            <div class="system-card crm-sync-demo">
              <span class="badge">CRM updated</span>
              <h3>Live lead card</h3>
              <dl class="lead-fields">
                <div><dt>Intent</dt><dd data-crm="intent">—</dd></div>
                <div><dt>Need</dt><dd data-crm="need">—</dd></div>
                <div><dt>Owner</dt><dd data-crm="owner">—</dd></div>
                <div><dt>Next step</dt><dd data-crm="next">—</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-alt">
        <div class="container">
          <div class="cta-band">
            <h2>Want a system like ${project.title}?</h2>
            <p>Get a free audit of your WhatsApp and CRM flow.</p>
            <div class="cta-actions">
              <a href="#" class="btn btn-whatsapp" data-wa-message="Hi, I saw ${project.title} and want a similar system">WhatsApp us</a>
              <a href="../contact.html" class="btn btn-secondary">Email audit form</a>
            </div>
          </div>
        </div>
      </section>`;

    document.title = `${project.title} | SolveonX Portfolio`;

    const applyCrm = typeof initCrmSyncDemo === "function" ? initCrmSyncDemo(".crm-sync-demo") : null;
    if (typeof initWhatsappTypingDemo === "function") {
      initWhatsappTypingDemo("#case-typing-demo", project.script, (i) => applyCrm && applyCrm(i));
    }
    if (typeof initWaLinks === "function") initWaLinks();
    else if (typeof waLink === "function") {
      document.querySelectorAll("[data-wa-message]").forEach((el) => {
        el.setAttribute("href", waLink(el.getAttribute("data-wa-message")));
      });
    }
    if (typeof initCounterAnimation === "function") initCounterAnimation();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const project = bySlug();
    if (!project) {
      const root = document.getElementById("case-root");
      if (root) root.innerHTML = '<div class="container section"><p>Case study not found. <a href="../portfolio.html">Back to portfolio</a></p></div>';
      return;
    }
    render(project);
  });
})();
