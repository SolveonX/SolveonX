const PROJECTS = [
  {
    id: "retail-whatsapp-recovery",
    title: "Retail WhatsApp Lead Recovery System",
    category: "Automation",
    sector: "Retail",
    year: "2026",
    featured: true,
    description:
      "WhatsApp-first sales flow for a multi-store retail business with instant replies, inquiry routing, and CRM sync.",
    outcome: "Reply time reduced from hours to minutes.",
    metric: "5 min",
    metricLabel: "avg. first reply",
    tags: ["WhatsApp", "Lead routing", "CRM sync"],
    tools: ["WhatsApp Business", "Google Sheets", "CRM", "Alerts"],
    challenge:
      "Leads from ads and QR codes were landing in one shared number with no clear owner and inconsistent follow-up.",
    solution:
      "Built a qualification flow, automated owner assignment, and CRM updates with alerts for high-intent buyers.",
    impact: [
      "Faster first response across all stores",
      "Clear ownership for every incoming inquiry",
      "Less manual copying from chats into CRM"
    ],
    demo: {
      kind: "automation",
      title: "Lead recovery command center",
      lead: "A live-style operations screen for routing WhatsApp inquiries, assigning owners, and keeping retail follow-up on track.",
      primaryCta: "View live queue",
      secondaryCta: "Inspect automation",
      metrics: [
        { label: "New inquiries", value: "37" },
        { label: "Assigned", value: "33" },
        { label: "Hot buyers", value: "8" }
      ],
      steps: [
        { title: "Capture", text: "Ads, QR codes, and product inquiries land in one queue." },
        { title: "Qualify", text: "AI asks for product, store preference, and urgency." },
        { title: "Route", text: "High-intent buyers go to the right store owner instantly." },
        { title: "Track", text: "Every action is logged into the shared CRM sheet." }
      ],
      cards: [
        { title: "Store assignment", text: "Owners are mapped by area and product category." },
        { title: "Priority alerts", text: "High-value inquiries trigger immediate manager alerts." },
        { title: "Follow-up timer", text: "No lead sits without a next step or reminder." }
      ],
      alerts: [
        "South Delhi inquiry assigned to Store 3 in 12 seconds",
        "Premium sofa lead marked hot and escalated",
        "No-response reminder sent after 30 minutes"
      ]
    }
  },
  {
    id: "coaching-admissions-qualifier",
    title: "Coaching Institute Admissions Qualifier",
    category: "Chatbot",
    sector: "Education",
    year: "2026",
    featured: true,
    description:
      "AI qualification assistant for course inquiries with WhatsApp handoff, booking prompts, and admissions notes.",
    outcome: "Admissions team received better-qualified calls.",
    metric: "3x",
    metricLabel: "qualified inquiry quality",
    tags: ["AI chatbot", "Admissions", "Booking"],
    tools: ["Website bot", "WhatsApp", "Calendars", "CRM"],
    challenge:
      "The team was spending time on low-intent inquiries while serious prospects waited for a reply.",
    solution:
      "Created a guided intake flow that captured course, location, budget, urgency, and preferred batch before handoff.",
    impact: [
      "Better context before sales calls",
      "Shorter admissions conversations",
      "Improved booking flow for hot leads"
    ],
    demo: {
      kind: "chatbot",
      title: "Admissions qualification assistant",
      lead: "A browsable admissions experience showing how the bot guides students from inquiry to booked counselling call.",
      primaryCta: "Start qualification",
      secondaryCta: "Book counselling",
      metrics: [
        { label: "Students qualified", value: "124" },
        { label: "Calls booked", value: "41" },
        { label: "Avg. reply", value: "18 sec" }
      ],
      messages: [
        { role: "user", text: "I want to join the weekend digital marketing batch." },
        { role: "bot", text: "Great. Which city are you based in, and when do you want to start?" },
        { role: "user", text: "South Delhi, next month." },
        { role: "bot", text: "Perfect. I can recommend the right batch and help you book a counselling call." }
      ],
      summary: [
        "Course: Digital marketing",
        "City: South Delhi",
        "Timeline: Next month",
        "Status: High intent"
      ],
      cards: [
        { title: "Pre-call notes", text: "Admissions sees student goals, timing, and fit before calling." },
        { title: "Batch routing", text: "Students are matched to weekday or weekend tracks automatically." },
        { title: "Booking handoff", text: "High-intent users are pushed into the right calendar slot." }
      ]
    }
  },
  {
    id: "b2b-service-crm-pipeline",
    title: "B2B Services CRM Pipeline Automation",
    category: "CRM",
    sector: "Professional Services",
    year: "2025",
    featured: true,
    description:
      "Connected forms, WhatsApp, and CRM stages with task creation and automated reminders for a service-led sales team.",
    outcome: "Manual admin dropped by roughly 40 percent.",
    metric: "40%",
    metricLabel: "less admin work",
    tags: ["CRM", "Pipeline", "Reminders"],
    tools: ["CRM", "Forms", "WhatsApp", "Dashboards"],
    challenge:
      "Lead notes were scattered between forms, chat threads, and spreadsheets, which made reporting unreliable.",
    solution:
      "Synced intake data into CRM stages, added task triggers, and built reminders for each active opportunity.",
    impact: [
      "Cleaner sales pipeline data",
      "Fewer missed next steps",
      "More confidence in reporting"
    ],
    demo: {
      kind: "crm",
      title: "Service pipeline board",
      lead: "A CRM-style workspace showing how new opportunities move from intake to proposal with task ownership and reminders.",
      primaryCta: "Open pipeline",
      secondaryCta: "Review tasks",
      metrics: [
        { label: "Open deals", value: "26" },
        { label: "Tasks due", value: "9" },
        { label: "Stalled", value: "3" }
      ],
      columns: [
        { title: "New", items: ["Website form: RevOps audit", "WhatsApp lead: Ops redesign", "Referral: CRM cleanup"] },
        { title: "Qualified", items: ["Manufacturing CRM setup", "Clinic workflow rebuild", "Retail routing board"] },
        { title: "Proposal", items: ["Education admissions system", "Agency sales dashboard"] },
        { title: "Won", items: ["Service pipeline automation", "Lead recovery workflow"] }
      ],
      panels: [
        { title: "Daily agenda", text: "Proposal follow-up at 11:30, demo call at 2:00, reminder queue at 4:00." },
        { title: "Automation notes", text: "Every intake source creates a stage, owner, and next-action task." }
      ]
    }
  },
  {
    id: "clinic-booking-reminders",
    title: "Clinic Booking and Reminder Flow",
    category: "Automation",
    sector: "Healthcare",
    year: "2025",
    featured: false,
    description:
      "WhatsApp booking journey with appointment reminders and daily schedule sync for a neighborhood clinic.",
    outcome: "Staff spent less time manually confirming appointments.",
    metric: "24/7",
    metricLabel: "booking capture",
    tags: ["Healthcare", "Scheduling", "Reminders"],
    tools: ["WhatsApp", "Calendar", "Reminders"],
    challenge:
      "Patients were asking the same availability questions repeatedly and appointments were being confirmed manually.",
    solution:
      "Built automated intake, booking prompts, and reminder messages linked to the clinic schedule.",
    impact: [
      "Lower front-desk load",
      "More consistent reminder flow",
      "Simpler patient handoff to staff"
    ],
    demo: {
      kind: "automation",
      title: "Clinic scheduling workflow",
      lead: "A patient-facing booking flow connected to reminders, schedule checks, and staff visibility.",
      primaryCta: "Check availability",
      secondaryCta: "See reminders",
      metrics: [
        { label: "Appointments today", value: "42" },
        { label: "Confirmed", value: "36" },
        { label: "Pending callbacks", value: "4" }
      ],
      steps: [
        { title: "Ask", text: "Patients share visit type, preferred time, and doctor preference." },
        { title: "Check", text: "Slots are matched against the clinic schedule." },
        { title: "Confirm", text: "Patients get WhatsApp confirmation and reminder timing." },
        { title: "Prepare", text: "Staff sees the daily queue with visit context." }
      ],
      cards: [
        { title: "Reminder logic", text: "Automatic nudges go out before visit time." },
        { title: "Daily board", text: "The team sees confirmed, pending, and reschedule requests." },
        { title: "Queue handoff", text: "Special requests are surfaced before the visit starts." }
      ],
      alerts: [
        "Morning reminder batch sent at 8:00 AM",
        "Reschedule request flagged for front desk",
        "New pediatric consult added to queue"
      ]
    }
  },
  {
    id: "real-estate-site-followup",
    title: "Real Estate Lead Capture and Follow-Up",
    category: "Website",
    sector: "Real Estate",
    year: "2025",
    featured: false,
    description:
      "Property inquiry landing page connected to WhatsApp, broker alerts, and structured buyer qualification.",
    outcome: "Site visitors moved faster into broker conversations.",
    metric: "12",
    metricLabel: "broker-ready leads / week",
    tags: ["Landing page", "Real estate", "WhatsApp"],
    tools: ["Landing pages", "Forms", "WhatsApp", "CRM"],
    challenge:
      "Property leads were arriving from multiple campaigns with little context and slow follow-up from brokers.",
    solution:
      "Designed a mobile-first page with high-intent forms, instant WhatsApp routing, and campaign-level lead source capture.",
    impact: [
      "Clearer broker handoff",
      "Better source tracking",
      "Less time wasted on unqualified buyers"
    ],
    demo: {
      kind: "website",
      theme: "estate",
      standaloneUrl: "demos/sites/real-estate.html",
      nav: ["Listings", "Locality", "Financing", "Schedule visit"],
      title: "South Delhi homes for modern families",
      lead: "Browse a polished property microsite with lead capture, broker prompts, and visit scheduling built in.",
      primaryCta: "Browse featured homes",
      secondaryCta: "Schedule a site visit",
      metrics: [
        { label: "Verified listings", value: "28" },
        { label: "Avg. response", value: "5 min" },
        { label: "Site visits / week", value: "14" }
      ],
      cards: [
        { title: "Builder floors", text: "3 and 4 BHK options with gated access and parking." },
        { title: "Premium apartments", text: "Move-in ready inventory near schools and metro routes." },
        { title: "Investor picks", text: "High-demand localities with strong rental potential." }
      ],
      listings: [
        { title: "4 BHK in Greater Kailash", meta: "Gated floor • 2 car parking", value: "Rs 5.2 Cr" },
        { title: "3 BHK in Green Park", meta: "Park-facing • Lift building", value: "Rs 3.8 Cr" },
        { title: "Builder floor in Defence Colony", meta: "Terrace access • Renovated", value: "Rs 6.1 Cr" }
      ],
      quote: {
        text: "This flow helps brokers respond like a high-end sales team, even when leads come in from multiple campaigns at once.",
        author: "Lead capture workflow"
      }
    }
  },
  {
    id: "d2c-abandoned-cart-whatsapp",
    title: "D2C Abandoned Cart WhatsApp Journey",
    category: "Automation",
    sector: "E-commerce",
    year: "2025",
    featured: false,
    description:
      "Recovery journey for shoppers who dropped off after product interest or checkout intent.",
    outcome: "Re-engaged shoppers without manual outreach.",
    metric: "18%",
    metricLabel: "cart recovery lift",
    tags: ["E-commerce", "Recovery", "Broadcast"],
    tools: ["WhatsApp", "Catalog links", "Follow-up logic"],
    challenge:
      "Shoppers were browsing and asking questions but dropping before purchase with no structured follow-up.",
    solution:
      "Created segmented reminder flows, FAQ prompts, and agent handoff for high-value purchase intent.",
    impact: [
      "Better post-dropoff recovery",
      "More context for sales agents",
      "Stronger repeat outreach logic"
    ],
    demo: {
      kind: "automation",
      title: "Cart recovery journey",
      lead: "A campaign view for re-engaging shoppers with product reminders, FAQs, and sales handoff.",
      primaryCta: "See recovery flow",
      secondaryCta: "View segments",
      metrics: [
        { label: "Drop-offs today", value: "64" },
        { label: "Recovered", value: "11" },
        { label: "Agent handoffs", value: "6" }
      ],
      steps: [
        { title: "Detect", text: "Cart or product drop-off creates an automation trigger." },
        { title: "Segment", text: "Message timing changes by intent, value, and category." },
        { title: "Recover", text: "Shoppers get reminders, FAQs, and purchase nudges." },
        { title: "Assist", text: "High-value carts route to a live sales agent." }
      ],
      cards: [
        { title: "Category logic", text: "Different reminders for fashion, furniture, and repeat buyers." },
        { title: "Support shortcut", text: "Questions about shipping and payment route into human handoff." },
        { title: "Campaign score", text: "Every recovery message is tracked by outcome." }
      ],
      alerts: [
        "Furniture cart moved to premium follow-up flow",
        "COD objection handled with FAQ shortcut",
        "VIP order recovery escalated to agent"
      ]
    }
  },
  {
    id: "academy-demo-funnel",
    title: "Demo Funnel for Online Academy",
    category: "Website",
    sector: "Education",
    year: "2025",
    featured: false,
    description:
      "Interactive funnel that recommends the right learning path and pushes qualified visitors into WhatsApp.",
    outcome: "Visitors self-selected before contacting sales.",
    metric: "2-step",
    metricLabel: "qualification flow",
    tags: ["Funnel", "Education", "Self-qualification"],
    tools: ["Static site", "Interactive flow", "WhatsApp CTA"],
    challenge:
      "The academy wanted a lighter pre-sales flow before sending every visitor straight to an admissions rep.",
    solution:
      "Built an interactive questionnaire that filtered intent and turned the final CTA into a context-rich WhatsApp lead.",
    impact: [
      "Higher-quality inbound chats",
      "Less repetition for the sales team",
      "Better user guidance before handoff"
    ],
    demo: {
      kind: "website",
      theme: "academy",
      standaloneUrl: "demos/sites/academy.html",
      nav: ["Tracks", "Outcomes", "Mentors", "Quiz"],
      title: "Find the learning track that fits your next move",
      lead: "An academy landing experience that guides visitors into the right path before they ever message sales.",
      primaryCta: "Take the fit quiz",
      secondaryCta: "Compare tracks",
      metrics: [
        { label: "Tracks", value: "4" },
        { label: "Quiz completion", value: "68%" },
        { label: "Counselling bookings", value: "22/wk" }
      ],
      cards: [
        { title: "Career switcher path", text: "For working professionals looking for structured upskilling." },
        { title: "Student path", text: "Built for learners deciding on their first specialization." },
        { title: "Founder path", text: "Practical growth modules for operators and business owners." }
      ],
      listings: [
        { title: "Digital Marketing Bootcamp", meta: "12 weeks • Weekend batch", value: "Top picked" },
        { title: "Performance Marketing Sprint", meta: "6 weeks • Evening batch", value: "Fastest path" },
        { title: "Content and Brand Systems", meta: "8 weeks • Online cohort", value: "Creative focus" }
      ],
      quote: {
        text: "Visitors leave this demo with a clearer path, which makes the final sales conversation much easier.",
        author: "Academy funnel design"
      }
    }
  },
  {
    id: "home-services-whatsapp-ops",
    title: "Home Services WhatsApp Ops Board",
    category: "CRM",
    sector: "Home Services",
    year: "2025",
    featured: false,
    description:
      "Lead assignment, job updates, and follow-up reminders coordinated through WhatsApp and a lightweight CRM board.",
    outcome: "The team stopped losing requests during busy periods.",
    metric: "1 board",
    metricLabel: "shared pipeline",
    tags: ["Operations", "Lead assignment", "Services"],
    tools: ["CRM board", "WhatsApp", "Status updates"],
    challenge:
      "Enquiry handling was fragmented between team members, leading to duplicate replies and missed follow-up.",
    solution:
      "Built a central lead board with owner status, job stage, and reminder logic tied to incoming WhatsApp conversations.",
    impact: [
      "Shared visibility across the team",
      "Lower risk of duplicate outreach",
      "More reliable follow-up ownership"
    ],
    demo: {
      kind: "crm",
      title: "Field ops board",
      lead: "A lightweight service pipeline for assigning incoming WhatsApp jobs, status updates, and callbacks.",
      primaryCta: "Open service board",
      secondaryCta: "Review jobs",
      metrics: [
        { label: "Open requests", value: "18" },
        { label: "Technicians live", value: "7" },
        { label: "Callbacks due", value: "5" }
      ],
      columns: [
        { title: "Incoming", items: ["AC repair in Lajpat Nagar", "RO service request", "Electrical quote follow-up"] },
        { title: "Assigned", items: ["Water heater install", "Pest control revisit", "Salon deep clean"] },
        { title: "In progress", items: ["AC diagnosis - technician en route", "Plumbing inspection ongoing"] },
        { title: "Completed", items: ["RO filter replacement", "Same-day electrical fix"] }
      ],
      panels: [
        { title: "Dispatch notes", text: "Requests are tagged by area, job type, and urgency before technician assignment." },
        { title: "Follow-up logic", text: "Every completed job triggers service confirmation and review request timing." }
      ]
    }
  },
  {
    id: "agency-inbound-qualification",
    title: "Agency Inbound Qualification Workflow",
    category: "Chatbot",
    sector: "Agency",
    year: "2024",
    featured: false,
    description:
      "Inbound lead screen for a creative agency using structured questions before discovery calls.",
    outcome: "The founder spent less time on weak-fit leads.",
    metric: "10+",
    metricLabel: "hours saved / month",
    tags: ["Agency", "Qualification", "Discovery"],
    tools: ["Website chat", "Email alerts", "CRM notes"],
    challenge:
      "Discovery calls were being booked with poor-fit prospects who did not meet budget or service criteria.",
    solution:
      "Introduced a pre-call screening flow that captured project scope, timelines, and budget before contact.",
    impact: [
      "Better-fit discovery meetings",
      "Clearer proposal readiness",
      "Less founder time spent screening leads"
    ],
    demo: {
      kind: "chatbot",
      title: "Agency fit-screening assistant",
      lead: "An agency website experience that screens inbound leads before the founder jumps into a discovery call.",
      primaryCta: "Start project fit check",
      secondaryCta: "See intake summary",
      metrics: [
        { label: "Weekly inquiries", value: "29" },
        { label: "Fit-approved", value: "11" },
        { label: "Founder time saved", value: "10h" }
      ],
      messages: [
        { role: "user", text: "We need a new website and automation support." },
        { role: "bot", text: "Happy to help. What is your timeline, budget range, and team size?" },
        { role: "user", text: "Within 6 weeks, mid-market budget, 8 person team." },
        { role: "bot", text: "That looks like a fit. I can prepare a discovery brief before your call." }
      ],
      summary: [
        "Service need: Website + automation",
        "Timeline: 6 weeks",
        "Budget: Mid-market",
        "Stage: Good fit"
      ],
      cards: [
        { title: "Brief handoff", text: "The founder receives a structured brief instead of a vague inbound lead." },
        { title: "Scope readiness", text: "Fit checks filter low-budget or unclear projects early." },
        { title: "Booking shortcut", text: "Strong-fit prospects can move directly into discovery scheduling." }
      ]
    }
  },
  {
    id: "restaurant-catering-flow",
    title: "Restaurant Catering Inquiry Workflow",
    category: "Automation",
    sector: "Hospitality",
    year: "2024",
    featured: false,
    description:
      "WhatsApp-based catering inquiry capture for event size, menu preferences, and callback scheduling.",
    outcome: "Catering leads became easier to qualify and quote.",
    metric: "Same day",
    metricLabel: "quote response target",
    tags: ["Hospitality", "Quotes", "WhatsApp"],
    tools: ["WhatsApp", "Quote intake", "Scheduling"],
    challenge:
      "Catering requests were arriving at odd hours and details were incomplete when the team followed up later.",
    solution:
      "Built a structured intake flow for event size, date, and food preferences with quote-request alerts.",
    impact: [
      "More complete inquiry details",
      "Faster quote preparation",
      "Better handling during off-hours"
    ],
    demo: {
      kind: "automation",
      title: "Catering inquiry workflow",
      lead: "A hospitality lead flow that captures event details, food preferences, and quote urgency before staff jumps in.",
      primaryCta: "Open catering flow",
      secondaryCta: "See quote queue",
      metrics: [
        { label: "Open catering leads", value: "13" },
        { label: "Quote-ready", value: "9" },
        { label: "Avg. quote target", value: "Same day" }
      ],
      steps: [
        { title: "Collect", text: "Guests share event date, size, cuisine, and budget band." },
        { title: "Organize", text: "Requests are tagged by event type and timeline." },
        { title: "Quote", text: "The kitchen and sales team sees clean inquiry notes." },
        { title: "Follow up", text: "Pending approvals trigger timed reminders automatically." }
      ],
      cards: [
        { title: "Event notes", text: "Dietary and setup preferences are surfaced before the callback." },
        { title: "Rush routing", text: "Near-term events are escalated ahead of routine leads." },
        { title: "Quote prep", text: "The team starts with complete event context instead of back-and-forth questions." }
      ],
      alerts: [
        "Wedding inquiry marked urgent for next Saturday",
        "Menu preference captured for 120-person event",
        "Quote reminder sent after no response"
      ]
    }
  },
  {
    id: "manufacturing-distributor-pipeline",
    title: "Manufacturer Distributor Inquiry Pipeline",
    category: "CRM",
    sector: "Manufacturing",
    year: "2024",
    featured: false,
    description:
      "Distributor lead capture and follow-up pipeline with territory tagging and reminder logic.",
    outcome: "Distributor conversations became trackable by stage and region.",
    metric: "100%",
    metricLabel: "territory tagged",
    tags: ["Manufacturing", "Distributor", "CRM"],
    tools: ["CRM", "Territory tags", "Alerts"],
    challenge:
      "Inbound distributor opportunities were being tracked inconsistently across regions and account owners.",
    solution:
      "Added source tagging, territory mapping, and stage-based follow-up reminders inside the CRM workflow.",
    impact: [
      "Cleaner regional visibility",
      "More consistent follow-up",
      "Better ownership by territory"
    ],
    demo: {
      kind: "crm",
      title: "Distributor tracking board",
      lead: "A region-aware CRM pipeline for manufacturer and distributor opportunities, complete with territory routing.",
      primaryCta: "View territory board",
      secondaryCta: "Open distributor queue",
      metrics: [
        { label: "Open regions", value: "6" },
        { label: "Distributor leads", value: "21" },
        { label: "Follow-ups due", value: "7" }
      ],
      columns: [
        { title: "North", items: ["Delhi distributor inquiry", "Punjab reseller application"] },
        { title: "West", items: ["Ahmedabad channel partner", "Pune industrial inquiry"] },
        { title: "South", items: ["Bangalore equipment lead", "Chennai follow-up request"] },
        { title: "Won", items: ["Jaipur territory confirmed", "Ludhiana partner onboarded"] }
      ],
      panels: [
        { title: "Territory logic", text: "Every lead is tagged by region, product line, and owner before follow-up begins." },
        { title: "Reminder stack", text: "The system flags stalled conversations before distributor interest fades." }
      ]
    }
  },
  {
    id: "consulting-firm-authority-site",
    title: "Consulting Firm Authority Website",
    category: "Website",
    sector: "Professional Services",
    year: "2024",
    featured: false,
    description:
      "High-trust website for a consulting firm with case-study framing, lead forms, and WhatsApp-first contact paths.",
    outcome: "The site shifted from brochure feel to lead-gen asset.",
    metric: "4",
    metricLabel: "high-intent CTA paths",
    tags: ["Website", "Authority", "Lead gen"],
    tools: ["Static site", "SEO", "Contact funnel"],
    challenge:
      "The old site looked dated, did not guide users toward action, and lacked a clear conversion path.",
    solution:
      "Reframed messaging around outcomes, added trust structure, and connected forms and WhatsApp into one funnel.",
    impact: [
      "Stronger first impression",
      "More obvious CTA paths",
      "Cleaner lead capture structure"
    ],
    demo: {
      kind: "website",
      theme: "consulting",
      standaloneUrl: "demos/sites/consulting.html",
      nav: ["Services", "Case studies", "Process", "Contact"],
      title: "Growth systems for firms that need clarity before scale",
      lead: "A polished consulting website demo built to feel credible, decisive, and conversion-ready instead of generic.",
      primaryCta: "See case studies",
      secondaryCta: "Book strategy call",
      metrics: [
        { label: "Service lines", value: "3" },
        { label: "CTA paths", value: "4" },
        { label: "Response window", value: "Same day" }
      ],
      cards: [
        { title: "Growth systems", text: "Strategy, operations, and automation framed as practical business outcomes." },
        { title: "Executive clarity", text: "Messaging designed for founders and senior operators, not broad traffic." },
        { title: "Lead capture", text: "Every key section routes toward a meaningful conversation." }
      ],
      listings: [
        { title: "Revenue operations reset", meta: "For scaling service teams", value: "Popular offer" },
        { title: "Automation readiness audit", meta: "Fast operational diagnosis", value: "Best first step" },
        { title: "Leadership workflow rebuild", meta: "Reduce owner dependency", value: "High-trust offer" }
      ],
      quote: {
        text: "The point of this demo is not decoration. It is to make the firm feel sharp, credible, and easy to trust quickly.",
        author: "Authority-site direction"
      }
    }
  },
  {
    id: "coaching-institute-landing",
    title: "Coaching Institute Admissions Website",
    category: "Website",
    sector: "Education",
    year: "2026",
    featured: true,
    description:
      "Warm, conversion-focused coaching landing page with weekend batch positioning, live chat preview, and WhatsApp admissions handoff.",
    outcome: "3× more qualified inquiries before the first call.",
    metric: "3×",
    metricLabel: "qualified inquiries",
    tags: ["Website", "Education", "Admissions", "WhatsApp"],
    tools: ["Landing page", "AI chatbot", "WhatsApp", "Booking"],
    challenge:
      "The institute had traffic but no dedicated landing experience — prospects bounced before understanding batches and location fit.",
    solution:
      "Built a South Delhi–focused admissions site with batch cards, animated chat preview, and direct path into the qualification bot.",
    impact: [
      "Clearer positioning for weekend learners",
      "Higher-intent WhatsApp conversations",
      "Shorter admissions screening calls"
    ],
    demo: {
      kind: "website",
      theme: "coaching",
      standaloneUrl: "demos/sites/coaching.html",
      nav: ["Courses", "Results", "Admissions", "Weekend batch"],
      title: "Weekend batches for working learners in South Delhi",
      lead: "Independent coaching site demo — warm education theme, not an extension of SolveonX.",
      primaryCta: "Talk to admissions bot",
      secondaryCta: "View weekend batch",
      metrics: [
        { label: "Avg. reply", value: "18 sec" },
        { label: "Qualified calls", value: "3×" },
        { label: "Batches", value: "2 live" }
      ],
      cards: [
        { title: "Weekend digital marketing", text: "Built for professionals who cannot attend weekday classes." },
        { title: "AI intake preview", text: "Visitors see how qualification works before messaging." },
        { title: "WhatsApp handoff", text: "Course, city, and urgency arrive with every lead." }
      ],
      listings: [
        { title: "Weekend Digital Marketing", meta: "South Delhi · Next cohort", value: "Open" },
        { title: "Weekday Foundation Track", meta: "Student-focused path", value: "Open" }
      ],
      quote: {
        text: "Each website in our portfolio uses a distinct theme matched to the client's niche — this one is warm, local, and admissions-led.",
        author: "SolveonX website direction"
      }
    }
  },
  {
    id: "agency-creative-portfolio",
    title: "Creative Agency Portfolio & Fit Screening",
    category: "Website",
    sector: "Agency",
    year: "2025",
    featured: false,
    description:
      "Bold creative agency portfolio with project grid, brutalist typography, and inbound fit-screening before discovery calls.",
    outcome: "Founder saved 10+ hours monthly on weak-fit leads.",
    metric: "10+",
    metricLabel: "hours saved / month",
    tags: ["Portfolio", "Agency", "Lead screening", "Creative"],
    tools: ["Static site", "Fit form", "WhatsApp", "CRM notes"],
    challenge:
      "The agency site looked generic and discovery calls were booked without budget or scope context.",
    solution:
      "Designed a dark creative portfolio with interactive project fit check capturing timeline, budget, and service need.",
    impact: [
      "Stronger creative first impression",
      "Better-fit discovery meetings",
      "Structured briefs before calls"
    ],
    demo: {
      kind: "website",
      theme: "agency",
      standaloneUrl: "demos/sites/agency.html",
      nav: ["Work", "Studio", "Start project"],
      title: "Brands that move markets",
      lead: "Independent agency demo — black canvas, lime accents, and fit-screening built in.",
      primaryCta: "Project fit check",
      secondaryCta: "View selected work",
      metrics: [
        { label: "Weekly inquiries", value: "29" },
        { label: "Fit-approved", value: "11" },
        { label: "Hours saved", value: "10+" }
      ],
      cards: [
        { title: "Work grid", text: "Case tiles styled per vertical — brand, web, campaign, automation." },
        { title: "Fit screening", text: "Budget, timeline, and scope captured in-modal." },
        { title: "Founder handoff", text: "Strong-fit leads arrive with a structured brief." }
      ],
      listings: [
        { title: "Retail relaunch", meta: "Brand identity", value: "Case study" },
        { title: "SaaS product site", meta: "Web design", value: "Case study" },
        { title: "Lead gen stack", meta: "Automation", value: "Case study" }
      ],
      quote: {
        text: "Agency sites should feel like the agency — not like the vendor who built them.",
        author: "Creative portfolio direction"
      }
    }
  }
];

const PROJECT_CATEGORIES = ["All", "Automation", "Chatbot", "CRM", "Website"];
