export const siteConfig = {
  name: "ZyphorZone",
  tagline: "Innovate • Build • Elevate",
  title: "ZyphorZone — Elite Digital Product Studio & Senior Engineering Collective",
  description:
    "Senior-managed engineering collective delivering agency-grade web platforms, mobile apps, and high-conversion design systems with guaranteed 24h scope turnaround.",
  url: "https://zyphorzone.com",
  email: "Zypherzone07@gmail.com",
  phone: "+91 63852 35131",
  phoneClean: "+916385235131",
  location: "Coimbatore, Tamil Nadu, India",
  instagram: {
    handle: "@_zyphor.dev_",
    url: "https://instagram.com/_zyphor.dev_",
  },
  stats: [
    { value: "45+", numericValue: 45, label: "Production Deployments", desc: "SaaS platforms & mobile apps shipped" },
    { value: "12+", numericValue: 12, label: "Vetted Senior Specialists", desc: "Architects, engineers & UI designers" },
    { value: "99.8%", numericValue: 99.8, label: "On-Time Milestone Rate", desc: "Gated deliverables & weekly sprints" },
    { value: "24h", numericValue: 24, label: "Guaranteed Scope Turnaround", desc: "Detailed blueprint & fixed estimate" },
  ],
  navItems: [
    { name: "Showcase", href: "/#showcase" },
    { name: "Why Us", href: "/#why" },
    { name: "Services", href: "/#services" },
    { name: "How We Build", href: "/#how" },
    { name: "Estimator", href: "/#estimator" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "About", href: "/about" },
  ],
  services: [
    "Full-Stack Web Engineering",
    "iOS & Android Mobile Apps",
    "UI/UX Prototyping & Design Systems",
    "Brand Strategy & Visual Guidelines",
    "Performance Marketing & SEO Audits",
    "Supabase & Cloud Architecture",
  ],
};

export type SiteConfig = typeof siteConfig;
