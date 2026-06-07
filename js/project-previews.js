/** Niche-specific portfolio card previews (mini mock UIs) */
function renderProjectThumb(project) {
  const theme = project.demo?.theme || project.previewTheme || inferTheme(project);
  const kind = project.demo?.kind || inferKind(project);

  if (kind === "website") {
    return renderWebsiteThumb(theme, project);
  }
  if (kind === "chatbot") {
    return renderChatbotThumb(theme, project);
  }
  if (kind === "crm") {
    return renderCrmThumb(theme, project);
  }
  return renderAutomationThumb(theme, project);
}

function inferTheme(project) {
  const byId = {
    "d2c-abandoned-cart-whatsapp": "d2c",
    "clinic-booking-reminders": "clinic",
    "restaurant-catering-flow": "hospitality",
    "retail-whatsapp-recovery": "retail",
    "manufacturing-distributor-pipeline": "manufacturing",
    "home-services-whatsapp-ops": "services",
    "coaching-admissions-qualifier": "coaching",
    "agency-inbound-qualification": "agency",
  };
  if (byId[project.id]) return byId[project.id];

  const map = {
    Retail: "retail",
    Education: "coaching",
    Healthcare: "clinic",
    "Real Estate": "estate",
    "Professional Services": "consulting",
    Agency: "agency",
    "E-commerce": "d2c",
    Hospitality: "hospitality",
    Manufacturing: "manufacturing",
    "Home Services": "services",
  };
  return project.demo?.theme || map[project.sector] || "default";
}

function inferKind(project) {
  if (project.category === "Website") return "website";
  if (project.category === "Chatbot") return "chatbot";
  if (project.category === "CRM") return "crm";
  return "automation";
}

function thumbChrome(inner, label) {
  return `
    <div class="thumb-frame" aria-hidden="true">
      <div class="thumb-chrome">
        <span></span><span></span><span></span>
        <em>${escapeHtml(label || "Live preview")}</em>
      </div>
      <div class="thumb-viewport">${inner}</div>
    </div>`;
}

function renderWebsiteThumb(theme, project) {
  const titles = {
    estate: { brand: "Harbor Homes", h: "South Delhi homes", sub: "Verified listings · 5 min broker reply" },
    academy: { brand: "LaunchPad", h: "Find your track", sub: "2-step fit quiz → WhatsApp" },
    consulting: { brand: "Northline", h: "Clarity before scale", sub: "Case studies · Strategy calls" },
    coaching: { brand: "ExcelEdge", h: "Weekend batches", sub: "AI admissions qualifier" },
    agency: { brand: "Frame & Signal", h: "Brands that move", sub: "Fit-screening before calls" },
  };
  const t = titles[theme] || titles.coaching;
  return thumbChrome(`
    <div class="thumb-site thumb-site--${theme}">
      <div class="thumb-site-nav"><strong>${escapeHtml(t.brand)}</strong><span>Menu</span></div>
      <div class="thumb-site-hero">
        <h4>${escapeHtml(t.h)}</h4>
        <p>${escapeHtml(t.sub)}</p>
        <span class="thumb-site-cta">CTA</span>
      </div>
      <div class="thumb-site-cards">
        <i></i><i></i><i></i>
      </div>
    </div>
  `, project.sector + " site");
}

function renderChatbotThumb(theme, project) {
  return thumbChrome(`
    <div class="thumb-chat thumb-chat--${theme}">
      <div class="thumb-chat-head">Qualification bot</div>
      <div class="thumb-chat-lines">
        <span class="in">Course inquiry?</span>
        <span class="out">Location & batch?</span>
        <span class="in">South Delhi</span>
        <span class="out">Book call →</span>
      </div>
      <div class="thumb-chat-metric">${escapeHtml(project.metric || "18s")} reply</div>
    </div>
  `, "AI chatbot");
}

function renderCrmThumb(theme, project) {
  return thumbChrome(`
    <div class="thumb-crm thumb-crm--${theme}">
      <div class="thumb-crm-bar"><span>Pipeline</span><strong>${escapeHtml(project.metric || "26")}</strong></div>
      <div class="thumb-crm-cols">
        <div><b>New</b><u></u><u></u></div>
        <div><b>Active</b><u></u><u></u></div>
        <div><b>Won</b><u></u></div>
      </div>
    </div>
  `, "CRM board");
}

function renderAutomationThumb(theme, project) {
  const safeTheme = ["d2c", "clinic", "hospitality", "retail"].includes(theme) ? theme : "default";
  return thumbChrome(`
    <div class="thumb-auto thumb-auto--${safeTheme}">
      <div class="thumb-auto-stats">
        <div><small>Leads</small><strong>37</strong></div>
        <div><small>Hot</small><strong>8</strong></div>
      </div>
      <div class="thumb-auto-flow">
        <span>Capture</span><span>Qualify</span><span>CRM</span><span>Alert</span>
      </div>
      <div class="thumb-auto-alert">${escapeHtml(project.metric || "Live")} · ${escapeHtml(project.metricLabel || "workflow")}</div>
    </div>
  `, "Automation");
}
