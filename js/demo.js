/** Demo funnel — options (separate from config.js BUSINESS_TYPES) */
const DEMO_BUSINESS_TYPES = [
  "Coaching / Education",
  "Clinic / Healthcare",
  "Real Estate",
  "Retail / E-commerce",
  "Agency / Services",
  "Other SME",
];

const DEMO_NEEDS = [
  "Slow WhatsApp replies",
  "Leads are not qualified",
  "Follow-ups get missed",
  "CRM is not updated",
  "Appointments need booking",
  "Need a better lead website",
];

/** Each pain point maps to one module — only selected needs appear in results */
const NEED_TO_MODULE = {
  "Slow WhatsApp replies": {
    id: "ai-reply",
    title: "Instant WhatsApp auto-reply",
    desc: "First response in under 60 seconds, 24/7 — before your team picks up the phone.",
    fix: "Cut reply time from hours to seconds",
  },
  "Leads are not qualified": {
    id: "ai-qualify",
    title: "AI lead qualification",
    desc: "Capture budget, timeline, location, and intent before sales spends time on the chat.",
    fix: "Better-qualified conversations",
  },
  "Follow-ups get missed": {
    id: "followup",
    title: "Automated follow-up sequences",
    desc: "Timed WhatsApp reminders and nudges so hot leads never depend on memory or sheets.",
    fix: "Fewer leads forgotten after first contact",
  },
  "CRM is not updated": {
    id: "crm",
    title: "CRM pipeline sync",
    desc: "Every WhatsApp chat creates or updates a record — owner, stage, notes, and next task.",
    fix: "One source of truth for your pipeline",
  },
  "Appointments need booking": {
    id: "booking",
    title: "Booking & reminder flow",
    desc: "Share calendar slots, confirm visits, and send reminders without manual back-and-forth.",
    fix: "More booked calls with less admin",
  },
  "Need a better lead website": {
    id: "website",
    title: "Conversion landing page",
    desc: "Mobile-first page wired to WhatsApp, forms, and your automation stack from day one.",
    fix: "Traffic that actually enters your sales flow",
  },
};

const BUSINESS_PROFILES = {
  "Coaching / Education": {
    headline: "Admissions WhatsApp + qualification system",
    package: "Sales Automation Pro",
    packageFrom: "From ₹35,000",
    timeline: "Live in 7–14 days",
    phases: [
      "Student inquiry hits WhatsApp or website",
      "Bot asks course, city, batch, and urgency",
      "Hot leads book counselling; CRM updated",
      "Admissions gets full context before the call",
    ],
    improvements: [
      "Shorter admissions calls with pre-captured context",
      "Weekend and weekday batch routing automated",
      "No inquiry sits unanswered overnight",
    ],
  },
  "Clinic / Healthcare": {
    headline: "Patient booking & reminder workflow",
    package: "Lead Capture System",
    packageFrom: "From ₹15,000",
    timeline: "Live in 7–10 days",
    phases: [
      "Patient asks availability on WhatsApp",
      "System checks slots and visit type",
      "Confirmation + reminder sent automatically",
      "Front desk sees the daily queue with context",
    ],
    improvements: [
      "Less time spent confirming appointments manually",
      "Fewer no-shows with automated reminders",
      "Clear handoff when a human needs to step in",
    ],
  },
  "Real Estate": {
    headline: "Property inquiry & broker routing system",
    package: "Sales Automation Pro",
    packageFrom: "From ₹35,000",
    timeline: "Live in 10–14 days",
    phases: [
      "Buyer inquiry from ads, site, or QR",
      "Qualification: budget, location, timeline",
      "Hot buyers routed to the right broker",
      "CRM tracks source, stage, and follow-up",
    ],
    improvements: [
      "Faster broker response on high-intent buyers",
      "Campaign-level lead source tracking",
      "Less time wasted on unqualified site visits",
    ],
  },
  "Retail / E-commerce": {
    headline: "WhatsApp sales & cart recovery flow",
    package: "Sales Automation Pro",
    packageFrom: "From ₹35,000",
    timeline: "Live in 7–14 days",
    phases: [
      "Product questions and orders land in one queue",
      "Auto-replies with catalog and FAQ shortcuts",
      "High-value carts get recovery follow-ups",
      "Store owner alerted for hot buyers",
    ],
    improvements: [
      "Multi-store inquiries assigned to the right owner",
      "Recovery messages for abandoned interest",
      "Less copy-paste between WhatsApp and sheets",
    ],
  },
  "Agency / Services": {
    headline: "Inbound fit-screening & CRM pipeline",
    package: "Lead Capture System",
    packageFrom: "From ₹15,000",
    timeline: "Live in 7–12 days",
    phases: [
      "Prospect describes project on WhatsApp or form",
      "Fit questions capture scope, budget, timeline",
      "Qualified leads get discovery scheduling",
      "Founder receives a structured brief, not a vague DM",
    ],
    improvements: [
      "Fewer weak-fit discovery calls",
      "Structured brief before every sales conversation",
      "Pipeline visibility across all inbound channels",
    ],
  },
  "Other SME": {
    headline: "Custom WhatsApp-first sales workflow",
    package: "Scoped after free audit",
    packageFrom: "Custom quote",
    timeline: "Typically 7–14 days for first workflow",
    phases: [
      "Map where leads enter today",
      "Design qualification and handoff rules",
      "Connect WhatsApp, CRM, and reminders",
      "Test with real scenarios, then go live",
    ],
    improvements: [
      "Workflow matched to how your team already sells",
      "Start with highest-ROI automation first",
      "Expand in phases without rebuilding everything",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  let step = 1;
  let businessType = "";
  let needs = [];

  const progress = document.querySelectorAll(".demo-progress span");
  const steps = document.querySelectorAll(".demo-step");
  const bizGrid = document.getElementById("demo-business");
  const needsGrid = document.getElementById("demo-needs");
  const results = document.getElementById("demo-results");
  const packageEl = document.getElementById("demo-package");
  const phasesEl = document.getElementById("demo-phases");
  const improvementsEl = document.getElementById("demo-improvements");
  const waBtn = document.getElementById("demo-wa");

  if (!bizGrid || !needsGrid) return;

  bizGrid.innerHTML = DEMO_BUSINESS_TYPES.map(
    (t) =>
      `<button type="button" class="option-btn" data-value="${escapeDemoAttr(t)}">${escapeHtmlDemo(t)}</button>`
  ).join("");

  needsGrid.innerHTML = DEMO_NEEDS.map(
    (n) =>
      `<button type="button" class="option-btn" data-value="${escapeDemoAttr(n)}">${escapeHtmlDemo(n)}</button>`
  ).join("");

  function goTo(n) {
    step = n;
    steps.forEach((s) => s.classList.toggle("active", Number(s.dataset.step) === step));
    progress.forEach((p, i) => p.classList.toggle("active", i < step));
    if (n === 3) {
      document.querySelector(".demo-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  bizGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".option-btn");
    if (!btn) return;
    businessType = btn.dataset.value;
    bizGrid.querySelectorAll(".option-btn").forEach((b) => {
      b.classList.toggle("selected", b === btn);
    });
    document.getElementById("demo-next-1").disabled = false;
  });

  needsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".option-btn");
    if (!btn) return;
    const val = btn.dataset.value;
    if (needs.includes(val)) {
      needs = needs.filter((n) => n !== val);
      btn.classList.remove("selected");
    } else {
      needs.push(val);
      btn.classList.add("selected");
    }
    document.getElementById("demo-next-2").disabled = needs.length === 0;
  });

  document.getElementById("demo-next-1")?.addEventListener("click", () => goTo(2));
  document.getElementById("demo-back-2")?.addEventListener("click", () => goTo(1));
  document.getElementById("demo-next-2")?.addEventListener("click", () => {
    renderResults();
    goTo(3);
  });
  document.getElementById("demo-reset")?.addEventListener("click", () => {
    businessType = "";
    needs = [];
    bizGrid.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
    needsGrid.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("selected"));
    document.getElementById("demo-next-1").disabled = true;
    document.getElementById("demo-next-2").disabled = true;
    goTo(1);
  });

  function pickModules() {
    const seen = new Set();
    const modules = [];
    needs.forEach((need) => {
      const mod = NEED_TO_MODULE[need];
      if (!mod || seen.has(mod.id)) return;
      seen.add(mod.id);
      modules.push({ ...mod, need });
    });
    return modules;
  }

  function recommendPackage(modules) {
    const profile = BUSINESS_PROFILES[businessType] || BUSINESS_PROFILES["Other SME"];
    const count = modules.length;
    if (count >= 4 || needs.includes("CRM is not updated") && needs.includes("Follow-ups get missed")) {
      return { name: "Sales Automation Pro", from: "From ₹35,000", reason: "Multiple workflows — best handled as a full sales engine" };
    }
    if (count <= 1 && (needs.includes("Need a better lead website") || businessType === "Agency / Services")) {
      return { name: profile.package, from: profile.packageFrom, reason: "Start with one focused workflow, then expand" };
    }
    if (count >= 2) {
      return { name: "Sales Automation Pro", from: "From ₹35,000", reason: `${count} pain points — Pro covers qualification, CRM, and follow-up together` };
    }
    return { name: profile.package, from: profile.packageFrom, reason: "Matched to your industry and selected pain points" };
  }

  function renderResults() {
    const profile = BUSINESS_PROFILES[businessType] || BUSINESS_PROFILES["Other SME"];
    const modules = pickModules();
    const pkg = recommendPackage(modules);

    document.getElementById("demo-summary").textContent = `${businessType} · fixing: ${needs.join(", ")}`;

    if (packageEl) {
      packageEl.innerHTML = `
        <div class="card featured-package demo-package-card">
          <span class="badge">Recommended for you</span>
          <h3 style="margin:0.5rem 0 0.25rem;font-size:1.15rem">${escapeHtmlDemo(profile.headline)}</h3>
          <p class="package-price" style="margin:0.35rem 0">${escapeHtmlDemo(pkg.from)}<small>${escapeHtmlDemo(pkg.name)}</small></p>
          <p style="margin:0;font-size:0.88rem;color:var(--text-muted)">${escapeHtmlDemo(pkg.reason)} · ${escapeHtmlDemo(profile.timeline)}</p>
        </div>`;
    }

    if (phasesEl) {
      phasesEl.innerHTML = `
        <p class="section-label" style="margin:0 0 0.5rem">Your workflow</p>
        <ol class="demo-phase-list">
          ${profile.phases.map((p) => `<li>${escapeHtmlDemo(p)}</li>`).join("")}
        </ol>`;
    }

    if (results) {
      results.innerHTML =
        modules.length === 0
          ? `<p class="section-desc">Select at least one pain point to see modules.</p>`
          : `<p class="section-label" style="margin:0 0 0.75rem">Modules for your ${modules.length} selected pain point${modules.length > 1 ? "s" : ""}</p>` +
            modules
              .map(
                (m, i) => `
        <div class="card demo-module-card" style="margin-bottom:0.75rem">
          <span class="badge">Priority ${i + 1}</span>
          <h3 style="margin:0.4rem 0 0.25rem;font-size:1rem">${escapeHtmlDemo(m.title)}</h3>
          <p style="margin:0 0 0.35rem;font-size:0.82rem;color:var(--accent);font-weight:700">${escapeHtmlDemo(m.fix)}</p>
          <p style="margin:0;font-size:0.88rem;color:var(--text-muted)">${escapeHtmlDemo(m.desc)}</p>
          <p style="margin:0.5rem 0 0;font-size:0.78rem;color:var(--text-soft)">Addresses: ${escapeHtmlDemo(m.need)}</p>
        </div>`
              )
              .join("");
    }

    const customImprovements = [
      ...modules.map((m) => m.fix),
      ...profile.improvements.slice(0, Math.max(1, 3 - modules.length)),
    ].slice(0, 4);

    if (improvementsEl) {
      improvementsEl.innerHTML = `
        <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.9rem">Expected improvements for ${escapeHtmlDemo(businessType.split("/")[0].trim())}</p>
        <ul style="margin:0;padding-left:1.1rem;font-size:0.85rem;color:var(--text-muted)">
          ${customImprovements.map((item) => `<li>${escapeHtmlDemo(item)}</li>`).join("")}
        </ul>`;
    }

    const msg = `Hi SolveonX! I completed the demo.
Business: ${businessType}
Pain points: ${needs.join(", ")}
Recommended: ${pkg.name}
I want a free automation audit.`;
    if (waBtn && typeof waLink === "function") waBtn.href = waLink(msg);
  }

  function escapeDemoAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }

  function escapeHtmlDemo(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  goTo(1);
});
