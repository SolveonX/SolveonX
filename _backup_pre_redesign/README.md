# SolveonX — Static Website

WhatsApp-first AI sales systems for Indian SMEs. Plain HTML, CSS, and JavaScript — no build step required.

## Pages

| File | URL |
|------|-----|
| `index.html` | Homepage |
| `services.html` | Packages & pricing |
| `portfolio.html` | Portfolio (filterable + interactive demos) |
| `contact.html` | Free audit form + WhatsApp |
| `demo.html` | 3-step demo funnel |
| `project.html` | Interactive project demo shell |
| `privacy.html` | Privacy policy |
| `demos/sites/*.html` | Standalone niche-themed website demos |

## Run locally

Use a local server (required for portfolio iframes):

```bash
npx serve .
```

Then open `http://localhost:3000`

## Deploy

Upload all files to any static host (Netlify, GitHub Pages, Hostinger, etc.) on **HTTPS**.

Update `https://solveonx.com` in `js/config.js` → `SITE.url` if your domain differs.

## Configuration (`js/config.js`)

| Setting | Purpose |
|---------|---------|
| `SITE.email` | Public contact email (`hello@solveonx.com`) |
| `SITE.formDeliveryEmail` | FormSubmit inbox (until domain mail is live) |
| `SITE.analyticsId` | GA4 ID — e.g. `G-XXXXXXXXXX` |
| `PACKAGES` / `TESTIMONIALS` | Homepage content |

## FormSubmit activation

1. Deploy the site
2. Submit the contact form once
3. Confirm the activation email sent to `formDeliveryEmail`
4. Leads will then arrive in that inbox

## SEO

- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph, JSON-LD
- Cookie consent banner (analytics loads after accept)

## Customize theme

Edit CSS variables in `css/styles.css`.
