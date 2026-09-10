/**
 * Fetch Published posts from a Notion database.
 * Run locally: node build-scripts/fetch-notion-posts.js
 * Requires NOTION_API_KEY + NOTION_DATABASE_ID in build-scripts/.env
 *
 * Expected Notion DB properties:
 * Title (title), Slug (rich_text), Status (select: Published/Draft),
 * Date (date), Category (select), Cover (files/url), Excerpt (rich_text)
 */
const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) {
    console.error("Missing build-scripts/.env — copy from .env.example");
    process.exit(1);
  }
  fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    });
}

async function notionQuery(databaseId, apiKey) {
  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Date", direction: "descending" }],
    }),
  });
  if (!res.ok) throw new Error(`Notion query failed: ${res.status} ${await res.text()}`);
  return res.json();
}

function propText(prop) {
  if (!prop) return "";
  if (prop.title) return prop.title.map((t) => t.plain_text).join("");
  if (prop.rich_text) return prop.rich_text.map((t) => t.plain_text).join("");
  if (prop.select) return prop.select?.name || "";
  if (prop.date) return prop.date?.start || "";
  if (prop.files?.length) {
    const f = prop.files[0];
    return f.file?.url || f.external?.url || "";
  }
  if (prop.url) return prop.url;
  return "";
}

async function main() {
  loadEnv();
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!apiKey || !databaseId) {
    console.error("Set NOTION_API_KEY and NOTION_DATABASE_ID");
    process.exit(1);
  }

  const data = await notionQuery(databaseId, apiKey);
  const posts = data.results.map((page) => {
    const p = page.properties;
    return {
      id: page.id,
      title: propText(p.Title || p.Name),
      slug: propText(p.Slug) || page.id.replace(/-/g, "").slice(0, 12),
      status: propText(p.Status),
      date: propText(p.Date),
      category: propText(p.Category) || "General",
      cover: propText(p.Cover) || propText(p["Cover Image"]),
      excerpt: propText(p.Excerpt) || propText(p.Summary),
    };
  });

  const outDir = path.join(__dirname, "_cache");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "posts.json");
  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
  console.log(`Wrote ${posts.length} posts → ${outFile}`);
  console.log("Next: node build-scripts/generate-blog-html.js");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
