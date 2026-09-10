document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("project-demo-root");
  if (!root || typeof PROJECTS === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const project = PROJECTS.find((item) => item.id === projectId);
  if (projectId && !project) {
    root.innerHTML = `<section class="section"><div class="container"><h1 class="section-title">Project not found</h1><p class="section-desc">No demo matches <code>${escapeHtml(projectId)}</code>.</p><a href="portfolio.html" class="btn btn-primary" style="margin-top:1rem">Back to portfolio</a></div></section>`;
    return;
  }
  const active = project || PROJECTS[0];
  if (!active?.demo) {
    root.innerHTML = '<section class="section"><div class="container"><p class="section-desc">Project demo not found.</p></div></section>';
    return;
  }

  document.title = `${active.title} Demo | SolveonX`;
  root.innerHTML = renderProjectDemo(active);
  const heroMessage = `Hi, I want a similar system to the ${active.title} demo for my business.`;
  root.querySelectorAll("[data-project-wa]").forEach((el) => {
    el.setAttribute("href", waLink(heroMessage));
  });
  initInteractiveDemo(active);
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderProjectDemo(project) {
  const isStandaloneSite = project.demo.kind === "website" && project.demo.standaloneUrl;
  return `
    <section class="project-hero project-hero-${escapeHtml(project.demo.kind)}">
      <div class="container">
        <a href="portfolio.html" class="project-back">← Back to portfolio</a>
        <div class="project-hero-grid">
          <div>
            <p class="section-label">${escapeHtml(project.category)} · Interactive demo</p>
            <h1 class="project-hero-title">${escapeHtml(project.demo.title)}</h1>
            <p class="project-hero-lead">${escapeHtml(project.demo.lead)}</p>
            <div class="project-hero-actions">
              <a href="#demo-surface" class="btn btn-primary">${escapeHtml(project.demo.primaryCta || "Try demo")}</a>
              ${isStandaloneSite ? `<a href="${escapeHtml(project.demo.standaloneUrl)}" target="_blank" rel="noopener" class="btn btn-secondary">Open standalone site</a>` : ""}
              <a href="#" class="btn btn-secondary" data-project-wa>Build something similar</a>
            </div>
            <dl class="project-hero-stats">
              ${project.demo.metrics.map(renderMetric).join("")}
            </dl>
          </div>
          <div class="project-summary-card">
            <span class="badge">${escapeHtml(project.sector)}</span>
            <h2>${escapeHtml(project.title)}</h2>
            <p>${escapeHtml(project.outcome)}</p>
            <div class="project-summary-pills">
              ${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="demo-surface">
      <div class="container">
        ${renderDemoSurface(project)}
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <header class="section-header row">
          <div>
            <p class="section-label">Build notes</p>
            <h2 class="section-title">What this project solves</h2>
            <p class="section-desc">Challenge, system design, and measurable results from the engagement.</p>
          </div>
        </header>
        <div class="project-notes-grid">
          <article class="card">
            <h3>Challenge</h3>
            <p>${escapeHtml(project.challenge)}</p>
          </article>
          <article class="card">
            <h3>Solution</h3>
            <p>${escapeHtml(project.solution)}</p>
          </article>
          <article class="card">
            <h3>Impact</h3>
            <ul class="check-list">${project.impact.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderMetric(item) {
  return `
    <div>
      <dt>${escapeHtml(item.value)}</dt>
      <dd>${escapeHtml(item.label)}</dd>
    </div>
  `;
}

function renderDemoSurface(project) {
  const { demo } = project;
  if (demo.kind === "website") return renderWebsiteDemo(demo, project);
  if (demo.kind === "crm") return renderCrmDemo(demo, project);
  if (demo.kind === "chatbot") return renderChatbotDemo(demo, project);
  return renderAutomationDemo(demo, project);
}

function renderWebsiteDemo(demo, project) {
  if (demo.standaloneUrl) {
    return `
      <div class="demo-standalone-wrap">
        <div class="demo-standalone-toolbar">
          <div>
            <p class="section-label">Independent ${escapeHtml(demo.theme || "custom")} theme</p>
            <p class="demo-standalone-note">This is a standalone client-style site — click inside to interact with quizzes, chat, forms, and CTAs.</p>
          </div>
          <a href="${escapeHtml(demo.standaloneUrl)}" target="_blank" rel="noopener" class="btn btn-secondary">Open full screen ↗</a>
        </div>
        <iframe
          class="demo-standalone-iframe"
          src="${escapeHtml(demo.standaloneUrl)}"
          title="${escapeHtml(project.title)} live demo"
          loading="lazy"
          allow="clipboard-read; clipboard-write"
        ></iframe>
        <p class="demo-standalone-hint">Tip: Try the quiz on the academy demo, fit-check on the agency demo, or chat animation on the coaching demo.</p>
      </div>
    `;
  }
  return `<div class="demo-website-shell"><p class="section-desc">Standalone preview coming soon.</p></div>`;
}

function renderCrmDemo(demo) {
  const columns = (demo.columns || [])
    .map(
      (column, colIndex) => `
      <section class="demo-crm-column" data-crm-col="${colIndex}">
        <header>
          <strong>${escapeHtml(column.title)}</strong>
          <span>${column.items.length}</span>
        </header>
        ${column.items
          .map(
            (item, itemIndex) =>
              `<button type="button" class="demo-crm-card demo-crm-card-btn" data-crm-item="${colIndex}-${itemIndex}">${escapeHtml(item)}</button>`
          )
          .join("")}
      </section>`
    )
    .join("");

  return `
    <div class="demo-crm-shell" data-demo-crm>
      <div class="demo-crm-top">
        <div>
          <p class="section-label">Interactive pipeline</p>
          <h2>${escapeHtml(demo.title)}</h2>
          <p>${escapeHtml(demo.lead)}</p>
        </div>
        <a href="#" class="btn btn-primary" data-project-wa>${escapeHtml(demo.primaryCta || "Open board")}</a>
      </div>
      <div class="demo-crm-detail card" id="crm-detail" hidden>
        <h3>Selected opportunity</h3>
        <p id="crm-detail-text">Click any card to inspect the deal context.</p>
      </div>
      <div class="demo-crm-panels">
        ${(demo.panels || [])
          .map(
            (panel) => `
          <article class="card">
            <h3>${escapeHtml(panel.title)}</h3>
            <p>${escapeHtml(panel.text)}</p>
          </article>`
          )
          .join("")}
      </div>
      <div class="demo-crm-board">${columns}</div>
    </div>
  `;
}

function renderChatbotDemo(demo) {
  const messages = demo.messages || [];
  return `
    <div class="demo-chat-shell" data-demo-chat>
      <div class="demo-chat-copy">
        <p class="section-label">Click to advance conversation</p>
        <h2>${escapeHtml(demo.title)}</h2>
        <p>${escapeHtml(demo.lead)}</p>
        <div class="demo-chat-summary" id="chat-summary">
          ${(demo.summary || []).map((item, i) => `<div class="${i === 0 ? "active" : ""}" data-summary="${i}">${escapeHtml(item)}</div>`).join("")}
        </div>
        <div class="demo-site-grid">
          ${(demo.cards || [])
            .map(
              (card) => `
            <article class="card">
              <h3>${escapeHtml(card.title)}</h3>
              <p>${escapeHtml(card.text)}</p>
            </article>`
            )
            .join("")}
        </div>
      </div>
      <div class="demo-chat-panel">
        <div id="chat-messages">
          ${messages.length ? `<div class="demo-chat-message ${messages[0].role === "bot" ? "bot" : "user"}">${escapeHtml(messages[0].text)}</div>` : ""}
        </div>
        <button type="button" class="btn btn-primary btn-block" id="chat-advance">${escapeHtml(demo.primaryCta || "Next message")}</button>
        <a href="#" class="btn btn-secondary btn-block" data-project-wa style="margin-top:0.5rem">${escapeHtml(demo.secondaryCta || "Book on WhatsApp")}</a>
      </div>
    </div>
  `;
}

function renderAutomationDemo(demo) {
  const steps = demo.steps || [];
  return `
    <div class="demo-automation-shell" data-demo-auto>
      <div class="demo-automation-top">
        <div>
          <p class="section-label">Click each step to simulate the flow</p>
          <h2>${escapeHtml(demo.title)}</h2>
          <p>${escapeHtml(demo.lead)}</p>
        </div>
        <a href="#" class="btn btn-primary" data-project-wa>${escapeHtml(demo.primaryCta || "Open workflow")}</a>
      </div>
      <div class="demo-automation-steps">
        ${steps
          .map(
            (step, index) => `
          <button type="button" class="card demo-step-btn${index === 0 ? " active" : ""}" data-auto-step="${index}">
            <span class="badge">Step ${index + 1}</span>
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.text)}</p>
          </button>`
          )
          .join("")}
      </div>
      <div class="demo-automation-panels">
        <div class="card">
          <h3>Automation logic</h3>
          <div class="demo-logic-grid" id="auto-logic">
            ${(demo.cards || [])
              .map(
                (card, i) => `
              <article class="${i === 0 ? "active" : ""}" data-logic="${i}">
                <strong>${escapeHtml(card.title)}</strong>
                <p>${escapeHtml(card.text)}</p>
              </article>`
              )
              .join("")}
          </div>
        </div>
        <div class="card">
          <h3>Live alerts</h3>
          <ul class="check-list" id="auto-alerts">
            ${(demo.alerts || []).map((item, i) => `<li class="${i === 0 ? "active" : ""}">${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
}

function initInteractiveDemo(project) {
  const { demo } = project;
  if (demo.kind === "chatbot") initChatbotDemo(demo);
  if (demo.kind === "crm") initCrmDemo();
  if (demo.kind === "automation") initAutomationDemo(demo);
}

function initChatbotDemo(demo) {
  const messages = demo.messages || [];
  const container = document.getElementById("chat-messages");
  const btn = document.getElementById("chat-advance");
  const summary = document.getElementById("chat-summary");
  if (!container || !btn || !messages.length) return;

  let shown = 0;
  btn.addEventListener("click", () => {
    if (shown >= messages.length - 1) {
      window.open(
        waLink(`Hi, I tried the ${demo.title} demo and want something similar.`),
        "_blank",
        "noopener"
      );
      return;
    }
    shown += 1;
    const msg = messages[shown];
    const el = document.createElement("div");
    el.className = `demo-chat-message ${msg.role === "bot" ? "bot" : "user"}`;
    el.textContent = msg.text;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;

    if (summary) {
      summary.querySelectorAll("[data-summary]").forEach((node, i) => {
        node.classList.toggle(
          "active",
          i <= Math.floor((shown / (messages.length - 1)) * (demo.summary?.length || 1))
        );
      });
    }

    if (shown >= messages.length - 1) {
      btn.textContent = "Conversation complete — request audit on WhatsApp";
    }
  });
}

function initCrmDemo() {
  const detail = document.getElementById("crm-detail");
  const detailText = document.getElementById("crm-detail-text");
  document.querySelectorAll(".demo-crm-card-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".demo-crm-card-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (detail) detail.hidden = false;
      if (detailText) {
        detailText.textContent = `${btn.textContent} — owner assigned, next task scheduled, reminder set for follow-up.`;
      }
    });
  });
}

function initAutomationDemo(demo) {
  const steps = document.querySelectorAll("[data-auto-step]");
  const logic = document.querySelectorAll("#auto-logic [data-logic]");
  const alerts = document.querySelectorAll("#auto-alerts li");

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      const n = Number(step.dataset.autoStep);
      steps.forEach((s) => s.classList.toggle("active", s === step));
      logic.forEach((l, i) => l.classList.toggle("active", i === n % Math.max(logic.length, 1)));
      alerts.forEach((a, i) => a.classList.toggle("active", i === n % Math.max(alerts.length, 1)));
    });
  });
}
