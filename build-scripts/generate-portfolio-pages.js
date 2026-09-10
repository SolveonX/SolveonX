/**
 * Generate static portfolio detail pages under /portfolio/[project-slug].html
 * for the 8 named case studies (RetailReply, AdmitFlow, IntakeOps, etc.).
 *
 * Usage: node build-scripts/generate-portfolio-pages.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORTFOLIO_DIR = path.join(ROOT, "portfolio");

if (!fs.existsSync(PORTFOLIO_DIR)) {
  fs.mkdirSync(PORTFOLIO_DIR, { recursive: true });
}

const SHOWCASE_PROJECTS = [
  {
    slug: "retailreply",
    title: "RetailReply",
    category: "Automation",
    sector: "Retail",
    year: "2026",
    description: "WhatsApp-first reply + routing system for multi-store retail inquiries.",
    outcome: "First reply under 5 minutes across stores.",
    metric: "5 min",
    metricLabel: "avg. first reply",
    challenge: "Shared inbox chaos — no owner, slow replies, lost walk-in intent.",
    solution: "Instant AI reply, store routing, CRM sync, and hot-lead alerts.",
    problem: "Ad and QR leads piled into one WhatsApp number with inconsistent follow-up.",
    workflow: ["Lead enters via ad/QR", "AI replies in seconds", "Intent scored", "Owner assigned", "CRM updated"],
    stats: [
      { label: "Reply time", value: "5", suffix: " min" },
      { label: "Hot leads routed", value: "92", suffix: "%" },
      { label: "Stores covered", value: "6", suffix: "" },
    ],
    script: [
      { role: "in", text: "Do you have the oak dining set in stock near South Delhi?" },
      { role: "out", text: "Yes — checking Store 3. Preferred delivery window?" },
      { role: "in", text: "This weekend if possible." },
      { role: "out", text: "Marked high intent. Store 3 will call within 10 minutes." },
    ],
  },
  {
    slug: "admitflow",
    title: "AdmitFlow",
    category: "Chatbot",
    sector: "Education",
    year: "2026",
    description: "Admissions qualifier that books counselling calls from WhatsApp.",
    outcome: "3× better-qualified admissions conversations.",
    metric: "3×",
    metricLabel: "qualified inquiry quality",
    challenge: "Team spent time on low-intent chats while serious students waited.",
    solution: "Guided intake for course, location, budget, and batch before handoff.",
    problem: "Serious prospects waited while staff screened low-intent inquiries manually.",
    workflow: ["Inquiry lands", "Bot qualifies", "Batch matched", "Call booked", "CRM notes synced"],
    stats: [
      { label: "Qualified/mo", value: "124", suffix: "" },
      { label: "Calls booked", value: "41", suffix: "" },
      { label: "Avg reply", value: "18", suffix: " sec" },
    ],
    script: [
      { role: "in", text: "Hi, is admission open for the weekend batch?" },
      { role: "out", text: "Yes. Course, location, and preferred start date?" },
      { role: "in", text: "Digital marketing, South Delhi, this month." },
      { role: "out", text: "Great fit. Book a free counselling call here." },
    ],
  },
  {
    slug: "intakeops",
    title: "IntakeOps",
    category: "CRM",
    sector: "Professional Services",
    year: "2025",
    description: "Forms + WhatsApp + CRM stages with task reminders for service teams.",
    outcome: "~40% less admin drag on the sales team.",
    metric: "40%",
    metricLabel: "less admin work",
    challenge: "Notes scattered across chats, forms, and sheets.",
    solution: "Unified intake → stage → owner → next-action automation.",
    problem: "Opportunity context never landed in one CRM view.",
    workflow: ["Form/WhatsApp intake", "Stage created", "Owner assigned", "Tasks fired", "Reminders run"],
    stats: [
      { label: "Admin time cut", value: "40", suffix: "%" },
      { label: "Open deals synced", value: "26", suffix: "" },
      { label: "Missed tasks ↓", value: "70", suffix: "%" },
    ],
    script: [
      { role: "in", text: "We need a RevOps audit for our Gurgaon team." },
      { role: "out", text: "Got it. Team size and timeline?" },
      { role: "in", text: "18 people, next quarter." },
      { role: "out", text: "Logged as Qualified. Proposal task assigned to Arjun." },
    ],
  },
  {
    slug: "propertyping",
    title: "PropertyPing",
    category: "Website",
    sector: "Real Estate",
    year: "2025",
    description: "Property inquiry site with WhatsApp follow-up and visit booking.",
    outcome: "Faster site-to-WhatsApp handoff for serious buyers.",
    metric: "2×",
    metricLabel: "qualified site visits",
    challenge: "Website leads went cold before agents replied.",
    solution: "Instant WhatsApp ping + preference capture + visit scheduling.",
    problem: "Form fills sat overnight while buyers messaged competitors.",
    workflow: ["Site inquiry", "WhatsApp ping", "Prefs captured", "Visit booked", "Agent alerted"],
    stats: [
      { label: "Visit bookings", value: "2", suffix: "×" },
      { label: "Reply window", value: "3", suffix: " min" },
      { label: "No-shows ↓", value: "25", suffix: "%" },
    ],
    script: [
      { role: "in", text: "Interested in 3BHK listings around Saket." },
      { role: "out", text: "Budget range and preferred visit day?" },
      { role: "in", text: "1.2–1.5 Cr, Saturday morning." },
      { role: "out", text: "Three matches ready. Saturday 11 AM slot reserved." },
    ],
  },
  {
    slug: "clinicconnect",
    title: "ClinicConnect",
    category: "Automation",
    sector: "Healthcare",
    year: "2025",
    description: "Clinic booking + reminder flow on WhatsApp.",
    outcome: "Front desk load dropped; confirmations automated.",
    metric: "24/7",
    metricLabel: "booking capture",
    challenge: "Repeated availability questions and manual confirmations.",
    solution: "Automated intake, slot checks, and reminder nudges.",
    problem: "Patients asked the same availability questions all day.",
    workflow: ["Patient asks", "Slot matched", "Confirmed on WA", "Reminders sent", "Staff queue ready"],
    stats: [
      { label: "Appts confirmed", value: "36", suffix: "/day" },
      { label: "Manual confirms ↓", value: "55", suffix: "%" },
      { label: "No-show ↓", value: "18", suffix: "%" },
    ],
    script: [
      { role: "in", text: "Can I book a general checkup tomorrow evening?" },
      { role: "out", text: "Yes — 6:30 PM or 7:15 PM with Dr. Mehta?" },
      { role: "in", text: "6:30 PM please." },
      { role: "out", text: "Booked. Reminder arrives 2 hours before." },
    ],
  },
  {
    slug: "cartrecover",
    title: "CartRecover",
    category: "Automation",
    sector: "D2C",
    year: "2026",
    description: "Abandoned-cart WhatsApp journey for D2C brands.",
    outcome: "Recovered checkouts without spammy blast sequences.",
    metric: "18%",
    metricLabel: "carts recovered",
    challenge: "Email-only recovery underperformed on mobile shoppers.",
    solution: "Timed WhatsApp nudges with product context and soft offers.",
    problem: "Cart abandoners ignored email but lived on WhatsApp.",
    workflow: ["Cart abandoned", "Wait window", "WA nudge", "Offer if needed", "Order attributed"],
    stats: [
      { label: "Recovered", value: "18", suffix: "%" },
      { label: "Avg recover ₹", value: "2400", suffix: "" },
      { label: "Unsub risk", value: "Low", suffix: "" },
    ],
    script: [
      { role: "out", text: "Still thinking about the linen shirt? It’s in your cart." },
      { role: "in", text: "Is free shipping available?" },
      { role: "out", text: "Yes over ₹999 — you’re already there. Checkout link inside." },
      { role: "in", text: "Done, ordered." },
    ],
  },
  {
    slug: "leaddesk",
    title: "LeadDesk",
    category: "CRM",
    sector: "Agency",
    year: "2025",
    description: "Inbound qualification desk for agencies screening fit fast.",
    outcome: "Sales only talks to projects that match positioning.",
    metric: "2.5×",
    metricLabel: "fit-qualified leads",
    challenge: "Every inbound felt urgent; few were a fit.",
    solution: "Fit questionnaire + scoring + calendar only for qualified leads.",
    problem: "Discovery calls were wasted on misaligned briefs.",
    workflow: ["Inbound", "Fit questions", "Score", "Book or nurture", "CRM stage"],
    stats: [
      { label: "Fit rate", value: "38", suffix: "%" },
      { label: "Call quality", value: "2.5", suffix: "×" },
      { label: "Hours saved", value: "12", suffix: "/wk" },
    ],
    script: [
      { role: "in", text: "Need a full brand + website rebuild ASAP." },
      { role: "out", text: "Budget band and decision timeline?" },
      { role: "in", text: "8–12L, decide this month." },
      { role: "out", text: "Strong fit. Sharing a 20-min discovery slot." },
    ],
  },
  {
    slug: "opshub",
    title: "OpsHub",
    category: "Automation",
    sector: "Home Services",
    year: "2026",
    description: "Field ops board connecting WhatsApp jobs to technicians.",
    outcome: "Jobs assigned faster with fewer missed customer updates.",
    metric: "35%",
    metricLabel: "faster job assignment",
    challenge: "Job requests lived in chat; dispatch was tribal knowledge.",
    solution: "Structured intake, tech assignment, and status pings back to customers.",
    problem: "Customers chased updates while techs waited for assignments.",
    workflow: ["Job request", "Details captured", "Tech assigned", "ETA shared", "Completion logged"],
    stats: [
      { label: "Assign speed", value: "35", suffix: "% faster" },
      { label: "Update calls ↓", value: "50", suffix: "%" },
      { label: "Jobs/day", value: "48", suffix: "" },
    ],
    script: [
      { role: "in", text: "AC not cooling in Vasant Kunj. Can someone come today?" },
      { role: "out", text: "Sharing available slots — 2–4 PM or 5–7 PM?" },
      { role: "in", text: "2–4 PM." },
      { role: "out", text: "Assigned to Ravi. You’ll get ETA when he’s en route." },
    ],
  },
];

function generateHtml(p) {
  const stepsHtml = p.workflow
    .map((w, i) => `<div class="flow-step"><span>0${i + 1}</span><p>${w}</p></div>`)
    .join("");

  const statsHtml = p.stats
    .map(
      (s) =>
        `<div><dt class="stat-value">${s.value}${s.suffix}</dt><dd class="stat-label">${s.label}</dd></div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../images/favicon.svg" type="image/svg+xml">
  <title>${p.title} — Case Study | SolveonX</title>
  <meta name="description" content="${p.description}">
  <link rel="canonical" href="https://solveonx.com/portfolio/${p.slug}.html">
  <link rel="stylesheet" href="../css/styles.css?v=7">
  <link rel="stylesheet" href="../css/theme.css?v=4">
  <link rel="stylesheet" href="../css/components.css?v=1">
  <link rel="stylesheet" href="../css/animations.css?v=1">
</head>
<body class="page-wrap">
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="logo"><span class="logo-mark">SX</span> SolveonX</a>
      <nav class="nav-desktop" aria-label="Main navigation">
        <a href="../index.html">Home</a>
        <a href="../services.html">Services</a>
        <a href="../portfolio.html">Portfolio</a>
        <a href="../blog/index.html">Blog</a>
        <a href="../index.html#results">Results</a>
        <a href="../contact.html">Contact</a>
        <a href="../demo.html">Demo</a>
        <a href="#" class="btn btn-primary" data-wa-message="Hi, I saw ${p.title} and want a free automation audit">Free Audit</a>
      </nav>
      <button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    </div>
    <nav class="nav-mobile container" aria-label="Mobile navigation">
      <a href="../index.html">Home</a>
      <a href="../services.html">Services</a>
      <a href="../portfolio.html">Portfolio</a>
      <a href="../blog/index.html">Blog</a>
      <a href="../index.html#results">Results</a>
      <a href="../contact.html">Contact</a>
      <a href="../demo.html">Demo</a>
    </nav>
  </header>

  <main>
    <div class="page-hero">
      <div class="container">
        <p class="section-label">${p.sector} · ${p.category}</p>
        <h1>${p.title}</h1>
        <p class="section-desc">${p.description}</p>
      </div>
    </div>

    <section class="section">
      <div class="container" style="display:grid;gap:3rem">
        <div class="card-grid card-grid-2">
          <div class="card">
            <h2 class="section-title" style="font-size:1.4rem">Problem Statement</h2>
            <p style="margin-top:0.75rem;color:var(--text-muted)">${p.problem}</p>
          </div>
          <div class="card">
            <h2 class="section-title" style="font-size:1.4rem">Solution & Impact</h2>
            <p style="margin-top:0.75rem;color:var(--text-muted)">${p.solution}</p>
            <p style="margin-top:0.5rem;font-weight:600;color:var(--accent)">Result: ${p.outcome}</p>
          </div>
        </div>

        <div>
          <h2 class="section-title" style="font-size:1.4rem;margin-bottom:1.5rem">Workflow Architecture</h2>
          <div class="flow-steps">${stepsHtml}</div>
        </div>

        <div>
          <h2 class="section-title" style="font-size:1.4rem;margin-bottom:1.5rem">Live Interactive Demo</h2>
          <div class="card workflow-preview" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1.5rem">
            <div class="phone-mock">
              <div class="phone-bar"><span>WhatsApp</span></div>
              <div id="demo-chat-${p.slug}" class="typing-demo"></div>
            </div>
            <div class="system-card crm-sync-demo">
              <h3>CRM Stage Sync</h3>
              <dl class="lead-fields">
                <div><dt>Intent</dt><dd data-crm="intent">Evaluating…</dd></div>
                <div><dt>Requirement</dt><dd data-crm="need">Collecting…</dd></div>
                <div><dt>Assigned owner</dt><dd data-crm="owner">Queue</dd></div>
                <div><dt>Next action</dt><dd data-crm="next">Routing…</dd></div>
              </dl>
            </div>
          </div>
        </div>

        <div>
          <h2 class="section-title" style="font-size:1.4rem;margin-bottom:1.5rem">Impact Metrics</h2>
          <dl class="stats">${statsHtml}</dl>
        </div>

        <div class="cta-band" style="text-align:center">
          <h2 style="font-size:1.6rem">Want a system like ${p.title} for your business?</h2>
          <p style="color:var(--text-muted);margin:0.5rem 0 1.25rem">Get a free WhatsApp sales automation audit. Live in 7–14 days.</p>
          <a href="#" class="btn btn-whatsapp" data-wa-message="Hi, I saw ${p.title} and want a free automation audit">Get free audit</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer" data-site-footer="compact"></footer>
  <a href="https://wa.me/918700863321" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l.003-.004A11.87 11.87 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/></svg></a>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
  <script src="../js/config.js?v=5"></script>
  <script src="../js/scroll-animations.js?v=1"></script>
  <script src="../js/counter-animation.js?v=1"></script>
  <script src="../js/whatsapp-typing-demo.js?v=1"></script>
  <script src="../js/crm-sync-demo.js?v=1"></script>
  <script src="../js/ui-enhancements.js?v=1"></script>
  <script src="../js/main.js?v=7"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const scriptData = ${JSON.stringify(p.script)};
      const applyCrm = typeof initCrmSyncDemo === "function" ? initCrmSyncDemo(".crm-sync-demo") : null;
      if (typeof initWhatsappTypingDemo === "function") {
        initWhatsappTypingDemo("#demo-chat-${p.slug}", scriptData, function(i) {
          if (applyCrm) applyCrm(i);
        });
      }
    });
  </script>
</body>
</html>`;
}

SHOWCASE_PROJECTS.forEach((p) => {
  const filePath = path.join(PORTFOLIO_DIR, `${p.slug}.html`);
  fs.writeFileSync(filePath, generateHtml(p), "utf8");
  console.log(`Generated ${filePath}`);
});
