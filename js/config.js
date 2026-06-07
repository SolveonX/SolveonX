/** Site-wide settings — edit here */
const SITE = {
  name: "SolveonX",
  tagline: "WhatsApp-first AI sales systems for Indian SMEs",
  url: "https://solveonx.com",
  /** Public contact email shown on the site */
  email: "hello@solveonx.com",
  /** FormSubmit delivery inbox (change when domain email is live) */
  formDeliveryEmail: "mayankbhatt116@gmail.com",
  phone: "+91 87008 63321",
  whatsapp: "918700863321",
  /** Add GA4 ID to enable analytics, e.g. "G-XXXXXXXXXX" */
  analyticsId: "",
  launchDays: "7–14 days",
  ogImage: "/images/og-card.svg",
  pricingDisclaimer:
    "Indicative starting prices. Final scope and quote are confirmed after your free audit.",
  testimonialDisclaimer:
    "Representative outcomes from client-style projects. Names anonymized for privacy.",
};

const PACKAGES = [
  { id: "starter", name: "Lead Capture System", from: "₹15,000", note: "one-time setup · from" },
  { id: "pro", name: "Sales Automation Pro", from: "₹35,000", note: "most popular · from" },
  { id: "ops", name: "AI Ops System", from: "Custom", note: "scoped after free audit" },
];

const TRUST_SECTORS = [
  { label: "Retail", abbr: "RT" },
  { label: "Education", abbr: "ED" },
  { label: "Healthcare", abbr: "HC" },
  { label: "B2B Services", abbr: "B2" },
  { label: "Real Estate", abbr: "RE" },
];

const TESTIMONIALS = [
  {
    quote:
      "Our WhatsApp leads used to sit for hours. Now the first reply goes out in under a minute and hot buyers get assigned immediately.",
    name: "Rahul M.",
    role: "Retail chain owner, Delhi NCR",
    initials: "RM",
  },
  {
    quote:
      "Admissions calls are shorter because the bot already captures course, location, and urgency. The team only talks to serious prospects.",
    name: "Priya S.",
    role: "Coaching institute, South Delhi",
    initials: "PS",
  },
  {
    quote:
      "We finally have one CRM view for website forms and WhatsApp context. Follow-up reminders alone saved us hours every week.",
    name: "Arjun K.",
    role: "B2B services firm, Gurgaon",
    initials: "AK",
  },
];

const BUSINESS_TYPES = [
  "Retail / E-commerce",
  "Education / Coaching",
  "Healthcare / Clinic",
  "B2B Services",
  "Real Estate",
  "Other SME",
];

function getFormAction() {
  return `https://formsubmit.co/${SITE.formDeliveryEmail}`;
}

function getOgImageUrl() {
  if (SITE.ogImage.startsWith("http")) return SITE.ogImage;
  return `${SITE.url.replace(/\/$/, "")}/${SITE.ogImage.replace(/^\//, "")}`;
}

function waLink(message) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

function getPackagePrice(id) {
  const pkg = PACKAGES.find((p) => p.id === id);
  return pkg ? pkg.from : "";
}
