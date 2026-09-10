/**
 * Generate static blog HTML from Notion cache (or seed posts).
 * Prefer: notion-to-md when available; falls back to excerpt-only body.
 *
 * npm i notion-to-md @notionhq/client   (optional, local only)
 * node build-scripts/generate-blog-html.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BLOG = path.join(ROOT, "blog");
const CACHE = path.join(__dirname, "_cache", "posts.json");

const SEED_POSTS = [
  {
    slug: "retail-chain-faster-replies",
    title: "How a Delhi retail chain cut WhatsApp reply time to 5 minutes",
    date: "2026-06-12",
    category: "Case Study",
    excerpt: "A multi-store retailer recovered missed walk-in intent with RetailReply-style routing and CRM sync.",
    cover: "",
    body: `<p>Missed WhatsApp inquiries were the silent revenue leak. Leads from ads and QR codes landed in one shared inbox with no owner.</p>
<p><strong>What changed:</strong> instant AI replies, store-level routing, and CRM updates within seconds.</p>
<ul><li>Average first reply: under 5 minutes</li><li>Hot buyers flagged to managers automatically</li><li>Less copy-paste from chat into sheets</li></ul>
<p>If your retail team shares one WhatsApp number today, start with routing and ownership before adding more bots.</p>`,
  },
  {
    slug: "coaching-institute-qualified-inquiries",
    title: "3× qualified admissions inquiries for a South Delhi coaching institute",
    date: "2026-05-28",
    category: "Case Study",
    excerpt: "AdmitFlow-style qualification made counselling calls shorter and more intentional.",
    cover: "",
    body: `<p>The admissions team was spending evenings on low-intent chats. Serious students waited — then booked elsewhere.</p>
<p>We deployed a guided WhatsApp intake for course, location, urgency, and batch preference before human handoff.</p>
<ul><li>Counselling calls started with full context</li><li>Weekend vs weekday routing became automatic</li><li>Qualified inquiry quality improved roughly 3×</li></ul>`,
  },
  {
    slug: "services-firm-less-admin",
    title: "40% less admin: CRM pipeline automation for a Gurgaon services firm",
    date: "2026-04-15",
    category: "Case Study",
    excerpt: "IntakeOps connected forms, WhatsApp, and CRM stages so follow-ups stopped depending on memory.",
    cover: "",
    body: `<p>Notes lived in chats, forms, and spreadsheets. Reporting was a weekly scavenger hunt.</p>
<p>IntakeOps-style automation created stages, owners, and next-action tasks from every intake source.</p>
<ul><li>~40% less admin time on pipeline hygiene</li><li>Reminders fired before deals went stale</li><li>One trusted CRM view for leadership</li></ul>`,
  },
];

function shell(title, description, canonical, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../images/favicon.svg" type="image/svg+xml">
  <title>${title} | SolveonX Blog</title>
  <meta name="description" content="${description.replace(/"/g, "&quot;")}">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="../css/styles.css?v=7">
  <link rel="stylesheet" href="../css/theme.css?v=4">
  <link rel="stylesheet" href="../css/animations.css?v=1">
  <link rel="stylesheet" href="../css/blog.css?v=1">
</head>
<body class="page-wrap">
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="logo"><span class="logo-mark">SX</span> SolveonX</a>
      <nav class="nav-desktop" aria-label="Main navigation">
        <a href="../index.html">Home</a>
        <a href="../services.html">Services</a>
        <a href="../portfolio.html">Portfolio</a>
        <a href="index.html">Blog</a>
        <a href="../index.html#results">Results</a>
        <a href="../contact.html">Contact</a>
        <a href="../demo.html">Demo</a>
        <a href="#" class="btn btn-primary" data-wa-message="Hi, I want a free automation audit">Free Audit</a>
      </nav>
      <button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    </div>
    <nav class="nav-mobile container" aria-label="Mobile navigation">
      <a href="../index.html">Home</a>
      <a href="../services.html">Services</a>
      <a href="../portfolio.html">Portfolio</a>
      <a href="index.html">Blog</a>
      <a href="../index.html#results">Results</a>
      <a href="../contact.html">Contact</a>
      <a href="../demo.html">Demo</a>
    </nav>
  </header>
  <main>${content}</main>
  <footer class="site-footer" data-site-footer="compact"></footer>
  <script src="../js/config.js?v=5"></script>
  <script src="../js/ui-enhancements.js?v=1"></script>
  <script src="../js/main.js?v=7"></script>
</body>
</html>`;
}

function loadPosts() {
  if (fs.existsSync(CACHE)) {
    try {
      const cached = JSON.parse(fs.readFileSync(CACHE, "utf8"));
      if (Array.isArray(cached) && cached.length) {
        return cached.map((p) => ({
          ...p,
          body: p.body || `<p>${p.excerpt || ""}</p><p><em>Full content syncs when notion-to-md is configured. Re-run generate after adding Content blocks.</em></p>`,
        }));
      }
    } catch (_) {}
  }
  return SEED_POSTS;
}

function main() {
  fs.mkdirSync(BLOG, { recursive: true });
  const posts = loadPosts();

  const cards = posts
    .map(
      (p) => `<article class="card blog-card">
      <a href="${p.slug}.html">
        <div class="blog-card-cover" role="img" aria-label=""></div>
        <div class="blog-card-body">
          <div class="blog-meta"><span>${p.category || "Article"}</span><span>${p.date || ""}</span></div>
          <h2>${p.title}</h2>
          <p>${p.excerpt || ""}</p>
        </div>
      </a>
    </article>`
    )
    .join("\n");

  const indexHtml = shell(
    "Blog",
    "SolveonX case studies and WhatsApp automation insights for Indian SMEs.",
    "https://solveonx.com/blog/",
    `<div class="page-hero"><div class="container"><p class="section-label">Blog</p><h1>Insights from live WhatsApp sales systems</h1><p class="section-desc">Case studies and playbooks from SolveonX builds.</p></div></div>
     <section class="section"><div class="container"><div class="card-grid card-grid-3">${cards}</div></div></section>`
  );
  fs.writeFileSync(path.join(BLOG, "index.html"), indexHtml);

  posts.forEach((p) => {
    const html = shell(
      p.title,
      p.excerpt || p.title,
      `https://solveonx.com/blog/${p.slug}.html`,
      `<article class="section"><div class="container blog-prose">
        <div class="blog-meta"><span>${p.category || ""}</span><time>${p.date || ""}</time></div>
        <h1>${p.title}</h1>
        ${p.body || `<p>${p.excerpt || ""}</p>`}
        <p><a href="index.html">← All posts</a></p>
      </div></article>`
    );
    fs.writeFileSync(path.join(BLOG, `${p.slug}.html`), html);
  });

  console.log(`Generated blog/index.html + ${posts.length} posts in /blog`);
  console.log("Upload the /blog folder to Hostinger after each publish.");
}

main();
