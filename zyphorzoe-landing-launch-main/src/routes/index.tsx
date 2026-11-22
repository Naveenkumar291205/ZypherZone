import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";
import { saveEnquiry } from "@/lib/mongodb";
import {
  ArrowRight,
  Code2,
  Palette,
  Megaphone,
  PenTool,
  Smartphone,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  User,
  Briefcase,
  Check,
  CheckCircle2,
  Activity,
  Layers,
  Settings,
  CheckSquare,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  Star,
  Zap,
  HelpCircle,
  Quote,
  DollarSign,
  Terminal,
  Cpu,
  Database,
  Globe,
  Sliders,
  ExternalLink,
  ChevronRight,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZyphorZone — Elite Software Engineering & Digital Product Studio" },
      {
        name: "description",
        content:
          "ZyphorZone is a managed senior freelance collective delivering full-stack web platforms, mobile apps, UI/UX design systems, and cloud architecture. Innovate • Build • Elevate.",
      },
      { property: "og:title", content: "ZyphorZone — Elite Software Engineering & Digital Product Studio" },
      {
        property: "og:description",
        content:
          "Senior-managed engineering collective for web, mobile apps, and brand design. Direct repo ownership, weekly live staging builds, and 24-hour scope turnaround.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

// Comparison Table Data (ZyphorZone vs Agency vs Marketplaces)
const comparisonPoints = [
  {
    feature: "Assigned Talent Quality",
    zyphorzone: "100% Vetted Senior Engineers & Designers",
    agency: "Pitched by seniors, handed to juniors/interns",
    freelance: "Hit-or-miss unverified profiles & skill gaps",
  },
  {
    feature: "Pricing & Transparency",
    zyphorzone: "Fixed flat milestones with zero surprise billings",
    agency: "Massive agency markups ($20k+) & retainers",
    freelance: "Erratic hourly billing with scope creep",
  },
  {
    feature: "Project Management",
    zyphorzone: "Dedicated PM + weekly live staging builds",
    agency: "Bureaucratic layers & weekly call delays",
    freelance: "Self-managed, frequent communication drops",
  },
  {
    feature: "IP & Repository Ownership",
    zyphorzone: "Direct Git access + 100% full IP handover",
    agency: "Proprietary lock-ins & delayed transfers",
    freelance: "Unclear IP agreements & license risks",
  },
  {
    feature: "Turnaround & Scope Delivery",
    zyphorzone: "Guaranteed initial technical scope in 24h",
    agency: "2-4 weeks of discovery meetings",
    freelance: "Uncertain start dates & unpredictable deadlines",
  },
];

const whyChoose = [
  {
    icon: Sparkles,
    title: "Vetted Senior Specialists",
    desc: "Your project is hand-assigned to verified senior engineers and product designers with deep production experience.",
  },
  {
    icon: ShieldCheck,
    title: "Continuous Transparency",
    desc: "Track every sprint with real-time staging builds, automated GitHub commit logs, and milestone-gated progress.",
  },
  {
    icon: Users,
    title: "Managed Delivery",
    desc: "A dedicated product lead coordinates sprints, manages scope, and ensures strict quality and deadline adherence.",
  },
  {
    icon: Clock,
    title: "Optimized Capital Efficiency",
    desc: "Achieve tier-1 agency craft and architectural excellence without bloated corporate overhead or ongoing retainer lock-ins.",
  },
];

const steps = [
  {
    step: "01",
    title: "Technical Discovery & Scope",
    desc: "Submit your requirements. Within 24 hours, our engineering lead returns a detailed architecture blueprint, timeline, and flat milestone breakdown.",
    badge: "Day 1",
  },
  {
    step: "02",
    title: "Sprint Iterations & Staging Builds",
    desc: "Watch your product come to life with weekly staging deployments, Figma prototype walk-throughs, and direct repository access.",
    badge: "Weeks 1–4",
  },
  {
    step: "03",
    title: "Production Launch & Full Transfer",
    desc: "We deploy on modern cloud infrastructure (Vercel, AWS, Supabase), hand over 100% IP and repository ownership, and provide 30-day post-launch support.",
    badge: "Launch Ready",
  },
];

const techStack = [
  { name: "React 19", category: "Frontend" },
  { name: "Next.js 15", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Supabase", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Node.js", category: "Backend" },
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "Python / AI", category: "Backend" },
  { name: "Redis", category: "Cache" },
  { name: "Vercel / AWS", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "Figma", category: "Design" },
];

const portfolioProjects = [
  {
    title: "Aether SaaS Analytics",
    category: "Web SaaS",
    desc: "Enterprise real-time monitoring dashboard with multi-tenant PostgreSQL partitioning, telemetry graphs, and instant querying.",
    tech: ["Next.js", "Supabase", "Recharts", "Tailwind CSS"],
    stat: "140ms Response Time",
    highlight: "10x Platform Throughput",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Apex Fitness Companion",
    category: "Mobile Apps",
    desc: "Cross-platform mobile wellness app with real-time biometric telemetry, offline sync, social feeds, and instant push notifications.",
    tech: ["React Native", "Node.js", "Redis", "WebSockets"],
    stat: "4.9★ App Store",
    highlight: "+120k Active Users",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Vortex Digital Infrastructure",
    category: "UI/UX & Brand",
    desc: "Complete visual identity system, high-conversion landing platform, and interactive design token library for enterprise cloud tools.",
    tech: ["Figma", "Design Tokens", "Vite", "Tailwind CSS"],
    stat: "+84% Signups",
    highlight: "Top Product of the Day",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Nexus Commerce Cloud",
    category: "Web SaaS",
    desc: "Headless e-commerce storefront with sub-second page loads, automated Stripe checkout pipelines, and custom inventory management.",
    tech: ["Next.js", "Stripe API", "PostgreSQL", "Edge Functions"],
    stat: "99.99% Uptime",
    highlight: "$1.4M GMV Processed",
    image: "https://images.unsplash.com/photo-1556742049-0a67e5572293?w=800&auto=format&fit=crop&q=80",
  },
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO, ScaleFlow AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    quote:
      "ZyphorZone took our early architecture concepts and delivered an enterprise-grade full-stack platform in under 5 weeks. Their communication was crystal-clear every single sprint.",
    stars: 5,
    result: "10x Platform Throughput",
    company: "ScaleFlow AI",
  },
  {
    name: "Sarah Jenkins",
    role: "Head of Product, Apex Health",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    quote:
      "Finding vetted senior talent without paying massive agency retainers felt impossible until we partnered with ZyphorZone. Zero fluff, 100% execution, and absolute transparency.",
    stars: 5,
    result: "4.9★ Rating on Launch",
    company: "Apex Health",
  },
  {
    name: "Vikram Raman",
    role: "Co-Founder, Vortex Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    quote:
      "The speed and clarity of their weekly live staging builds gave our leadership complete confidence. Our rebrand led to an 84% surge in qualified inbound leads.",
    stars: 5,
    result: "+84% Inbound Conversions",
    company: "Vortex Systems",
  },
];

const serviceTypes = [
  "Full-Stack Web Application",
  "iOS / Android Mobile App",
  "UI / UX Design & Prototyping",
  "Brand Identity & Guidelines",
  "Performance Marketing & SEO",
  "Supabase / Cloud Architecture",
  "Custom Full Suite",
];

function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return containerRef;
}

function Landing() {
  const containerRef = useScrollReveal();
  const [form, setForm] = useState({
    name: "",
    serviceType: "",
    phone: "",
    email: "",
    location: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estimator State
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [estService, setEstService] = useState("Full-Stack Web Application");
  const [estScale, setEstScale] = useState("Scale-Up");
  const [estFeatures, setEstFeatures] = useState<string[]>(["Auth & Roles", "DB & API Architecture", "Admin Dashboard"]);

  // Portfolio Filter State
  const [portfolioFilter, setPortfolioFilter] = useState("All");

  const getFeatureOptions = (curr: "USD" | "INR") => {
    if (curr === "INR") {
      return [
        { id: "Auth & Roles", label: "User Auth & Roles", price: 15000 },
        { id: "DB & API Architecture", label: "DB & API Architecture", price: 20000 },
        { id: "Admin Dashboard", label: "Admin Dashboard / CMS", price: 30000 },
        { id: "Payment Gateways", label: "Stripe / Razorpay Integration", price: 18000 },
        { id: "AI Workflows", label: "AI Integration / LLM Agents", price: 28000 },
        { id: "SEO & Performance", label: "Advanced SEO & Lighthouse 100", price: 12000 },
      ];
    }
    return [
      { id: "Auth & Roles", label: "User Auth & Roles", price: 350 },
      { id: "DB & API Architecture", label: "DB & API Architecture", price: 500 },
      { id: "Admin Dashboard", label: "Admin Dashboard / CMS", price: 750 },
      { id: "Payment Gateways", label: "Stripe / Razorpay Integration", price: 450 },
      { id: "AI Workflows", label: "AI Integration / LLM Agents", price: 700 },
      { id: "SEO & Performance", label: "Advanced SEO & Lighthouse 100", price: 300 },
    ];
  };

  const featureOptions = getFeatureOptions(currency);

  const toggleFeature = (fid: string) => {
    if (estFeatures.includes(fid)) {
      setEstFeatures(estFeatures.filter((id) => id !== fid));
    } else {
      setEstFeatures([...estFeatures, fid]);
    }
  };

  // Pricing Calculation Logic
  const getEstimate = () => {
    const isINR = currency === "INR";
    let basePrice = isINR ? 50000 : 900;
    let baseWeeks = 3;

    if (estService === "iOS / Android Mobile App") {
      basePrice = isINR ? 105000 : 2000;
      baseWeeks = 5;
    } else if (estService === "UI / UX Design & Prototyping") {
      basePrice = isINR ? 35000 : 700;
      baseWeeks = 2;
    } else if (estService === "Brand Identity & Guidelines") {
      basePrice = isINR ? 30000 : 600;
      baseWeeks = 1.5;
    } else if (estService === "Performance Marketing & SEO") {
      basePrice = isINR ? 25000 : 500;
      baseWeeks = 1;
    } else if (estService === "Custom Full Suite") {
      basePrice = isINR ? 150000 : 2800;
      baseWeeks = 6;
    }

    // Complexity multiplier
    if (estScale === "MVP / Lightweight") {
      basePrice *= 0.75;
      baseWeeks = Math.max(1, Math.round(baseWeeks * 0.75));
    } else if (estScale === "Enterprise / Custom") {
      basePrice *= 1.55;
      baseWeeks = Math.round(baseWeeks * 1.45);
    }

    // Add selected features
    estFeatures.forEach((featId) => {
      const option = featureOptions.find((o) => o.id === featId);
      if (option) {
        basePrice += option.price;
      }
    });

    const minPrice = Math.round(basePrice * 0.92);
    const maxPrice = Math.round(basePrice * 1.15);
    const symbol = isINR ? "₹" : "$";

    return {
      range: `${symbol}${minPrice.toLocaleString()} - ${symbol}${maxPrice.toLocaleString()}`,
      timeline: `${baseWeeks}-${baseWeeks + 2} Weeks`,
      team: [
        "1 Lead Architect / PM",
        estService.includes("Mobile") ? "1 Senior React Native / Flutter Dev" : "1 Senior Full-Stack Engineer",
        "1 Senior UI/UX Designer",
        "1 QA & DevOps Specialist",
      ],
    };
  };

  const applyEstimateToForm = () => {
    const est = getEstimate();
    setForm((prev) => ({
      ...prev,
      serviceType: estService,
      details: `[Configured Scope]\nDomain: ${estService}\nComplexity: ${estScale}\nFeatures: ${estFeatures.join(", ")}\nBallpark: ${est.range} (${currency})\nTimeline: ${est.timeline}`,
    }));

    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [k]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const location = form.location.trim();

    if (!name || name.length > 100) return setError("Please enter your name.");
    if (!form.serviceType) return setError("Please select a project domain.");
    if (!/^[+\d][\d\s\-()]{6,20}$/.test(phone)) return setError("Please enter a valid phone number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return setError("Please enter a valid email address.");
    if (!location || location.length > 120) return setError("Please enter your location.");

    setSubmitting(true);
    try {
      await saveEnquiry({
        data: {
          name,
          email,
          phone,
          location,
          serviceType: form.serviceType,
          details: form.details,
        },
      });

      setSubmitted(true);
      setForm({
        name: "",
        serviceType: "",
        phone: "",
        email: "",
        location: "",
        details: "",
      });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to submit project inquiry. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProjects =
    portfolioFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category.toLowerCase().includes(portfolioFilter.toLowerCase()));

  return (
    <div ref={containerRef} className="relative z-10 space-y-24 md:space-y-36">
      {/* ---------------- SECTION 1: HERO & INTERACTIVE MULTI-STACK SANDBOX ---------------- */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28">
        <div className="absolute inset-0 pointer-events-none opacity-40 tech-grid" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, CTAs, Social Proof */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/[0.08] px-4 py-1.5 text-xs text-primary font-medium tracking-wide shadow-sm badge-shimmer hero-badge">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
              <span className="font-semibold text-foreground">Q1 2026 Project Allocation</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-accent flex items-center gap-1 font-semibold">
                Guaranteed 24h Scope Delivery <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.06] tracking-tight text-foreground font-display hero-headline">
              We engineer your <br />
              software idea into a <br />
              <span className="gradient-text">high-growth product.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal hero-subheadline">
              A senior-managed freelance collective delivering agency-grade web apps, cross-platform mobile experiences, and modern design systems. Total code ownership, flat milestone billing, zero fluff.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2 hero-cta">
              <a href="#estimator" className="btn-primary flex items-center gap-2 group shadow-lg">
                <span>Configure Scope & Estimate</span>
                <Zap className="h-4 w-4 fill-white/80" />
              </a>
              <a href="#contact" className="btn-ghost flex items-center gap-2">
                <span>Book 24h Technical Consultation</span>
                <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Proof + Client Star Bar */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs text-muted-foreground hero-social-proof">
              <div className="flex items-center -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Founder avatar"
                    className="h-8 w-8 rounded-full border-2 border-[#07080D] object-cover ring-1 ring-primary/40"
                  />
                ))}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                  <span className="text-foreground font-bold ml-1.5 text-xs">4.9 / 5.0</span>
                </div>
                <div>
                  Trusted by <span className="text-foreground font-semibold">45+ ambitious founders</span> & tech leaders worldwide
                </div>
              </div>
            </div>

            {/* Guarantees Badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-muted-foreground font-medium hero-guarantees">
              {["100% Repository & IP Handover", "Weekly Live Staging Deployments", "Direct Slack / Discord Access"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Multi-Stack Sandbox */}
          <div className="lg:col-span-5 relative w-full lg:max-w-lg xl:max-w-xl mx-auto hero-sandbox">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/20 opacity-30 blur-2xl soft-glow animate-pulse-glow" />
            <div className="relative animate-float">
              <InteractiveDeveloperSandbox />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: STATS STRIP & LIVE TECH BADGES ---------------- */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 border border-white/[0.08] shadow-2xl reveal">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {[
              { value: "45+", label: "Production Deployments", desc: "SaaS platforms & mobile apps shipped" },
              { value: "12+", label: "Vetted Senior Specialists", desc: "Architects, engineers & UI designers" },
              { value: "99.8%", label: "On-Time Milestone Rate", desc: "Gated deliverables & weekly sprints" },
              { value: "24h", label: "Guaranteed Scope Turnaround", desc: "Detailed blueprint & fixed estimate" },
            ].map((stat, i) => (
              <div key={stat.label} className={`space-y-1.5 ${i > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""}`}>
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-accent" />
              Engineered With Modern Battle-Tested Stacks
            </span>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-foreground/85 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: WHY US & COMPARISON MATRIX ---------------- */}
      <section id="why" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            The High-Performance Difference
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
            Why founders choose <span className="gradient-text">ZyphorZone</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            We bridge the gap between bloated, overpriced agencies and erratic, unvetted freelance marketplaces.
          </p>
        </div>

        {/* 4 Value Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 reveal-group">
          {whyChoose.map((item) => (
            <div key={item.title} className="card-3d p-7 flex flex-col justify-between group reveal">
              <div className="space-y-4">
                <div className="icon-3d h-12 w-12 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-foreground font-display">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Comparison Table */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/[0.08] overflow-hidden">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-xl font-bold font-display text-foreground">Market Comparison Matrix</h3>
              <p className="text-xs text-muted-foreground mt-0.5">How our managed model compares to industry alternatives</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent self-start sm:self-auto">
              100% Client Protected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-4 pr-6">Capability & Standards</th>
                  <th className="py-4 px-6 text-primary bg-primary/[0.06] rounded-t-xl">ZyphorZone Collective</th>
                  <th className="py-4 px-6">Traditional Big Agency</th>
                  <th className="py-4 pl-6">Unvetted Marketplaces</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {comparisonPoints.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6 font-semibold text-foreground font-display text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 font-medium text-foreground bg-primary/[0.04] border-x border-primary/10">
                      <div className="flex items-start gap-2 text-xs sm:text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{row.zyphorzone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-muted-foreground">{row.agency}</td>
                    <td className="py-4 pl-6 text-xs text-muted-foreground">{row.freelance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: CAPABILITIES (ASYMMETRICAL BENTO GRID) ---------------- */}
      <section id="services" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <Briefcase className="h-3.5 w-3.5" />
            End-to-End Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
            Engineered for <span className="gradient-text">scale & conversion</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            From zero-to-one prototypes to high-concurrency cloud systems, we deploy purpose-built teams.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: 2-Col Wide: Web Engineering + Lighthouse Meter */}
          <div className="bento-card lg:col-span-2 p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-3d h-12 w-12 flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                  <Activity className="h-3.5 w-3.5" />
                  Sub-150ms P99 Latency
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-foreground">Full-Stack Web Engineering</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xl">
                  Enterprise-grade Next.js, React 19, and Supabase platforms built for sub-second page loads, real-time sync, automated CI/CD pipelines, and high SEO rankings.
                </p>
              </div>
            </div>

            {/* Interactive Lighthouse & Speed Widget */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Performance", score: "100", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                { label: "Accessibility", score: "100", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                { label: "Best Practices", score: "100", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
                { label: "SEO Score", score: "100", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
              ].map((m) => (
                <div key={m.label} className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
                  <div className={`mx-auto h-10 w-10 rounded-full border-2 grid place-items-center font-bold text-sm ${m.color}`}>
                    {m.score}
                  </div>
                  <div className="text-[11px] font-semibold text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Mobile Apps with Simulated Notification */}
          <div className="bento-card p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="icon-3d h-12 w-12 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold font-display text-foreground">Cross-Platform Mobile Apps</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Native iOS and Android applications written in React Native and Flutter with offline persistence, real-time push, and smooth 60fps animations.
              </p>
            </div>

            {/* Mini Notification Mockup */}
            <div className="mt-8 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent to-primary grid place-items-center text-white shrink-0">
                <Smartphone className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground truncate">Live Push Notification</div>
                <div className="text-[11px] text-muted-foreground truncate">Sync Complete • 0 Dropped Packets</div>
              </div>
            </div>
          </div>

          {/* Card 3: UI/UX & Design Systems */}
          <div className="bento-card p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="icon-3d h-12 w-12 flex items-center justify-center">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-display text-foreground">UI/UX & Design Systems</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Atomic token libraries, interactive clickable Figma prototypes, accessibility-compliant components, and conversion-optimized checkout flows.
              </p>
            </div>

            {/* Design Tokens Palette */}
            <div className="mt-8 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Tokens Spectrum</div>
              <div className="flex gap-2">
                <div className="h-6 flex-1 rounded-md bg-[#8B5CF6]" title="Electric Violet" />
                <div className="h-6 flex-1 rounded-md bg-[#EC4899]" title="Vivid Fuchsia" />
                <div className="h-6 flex-1 rounded-md bg-[#A78BFA]" title="Soft Lavender" />
                <div className="h-6 flex-1 rounded-md bg-[#0D0C17] border border-white/20" title="Synthwave Base" />
              </div>
            </div>
          </div>

          {/* Card 4: Supabase & Cloud Architecture */}
          <div className="bento-card p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="icon-3d h-12 w-12 flex items-center justify-center">
                <Database className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold font-display text-foreground">Cloud Architecture & DB Scaling</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Supabase, PostgreSQL multi-tenant partitioning, Redis caching layers, Edge functions, and zero-downtime database migrations.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Postgres RLS Active
              </span>
              <span className="text-foreground font-semibold">100% Isolated</span>
            </div>
          </div>

          {/* Card 5: 2-Col Wide: Brand Strategy & Growth */}
          <div className="bento-card lg:col-span-2 p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="icon-3d h-12 w-12 flex items-center justify-center">
                  <Megaphone className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Data-Driven ROI
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-foreground">Performance Marketing & Growth Strategy</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xl">
                  Technical SEO indexing, programmatic landing page generation, full-funnel tracking, and conversion rate optimization (CRO) to accelerate customer acquisition.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] grid sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xl font-extrabold text-accent font-display">+84%</div>
                <div className="text-xs text-muted-foreground mt-0.5">Average Conversion Uplift</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xl font-extrabold text-primary font-display">2.8x</div>
                <div className="text-xs text-muted-foreground mt-0.5">Search Traffic Growth</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xl font-extrabold text-emerald-400 font-display">Zero Bloat</div>
                <div className="text-xs text-muted-foreground mt-0.5">Clean Semantic Markup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: HOW WE BUILD (3-PHASE ROADMAP) ---------------- */}
      <section id="how" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Clock className="h-3.5 w-3.5" />
            Streamlined Execution System
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
            Three steps. <span className="gradient-text">Zero friction.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            A transparent engineering workflow designed to keep founders informed every single day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative reveal-group">
          {steps.map((item) => (
            <div key={item.step} className="card-3d p-8 relative flex flex-col justify-between group overflow-hidden reveal">
              <div className="absolute top-0 right-0 text-8xl font-black font-display text-white/[0.03] select-none -translate-y-4 translate-x-2 transition-transform duration-300 group-hover:scale-110">
                {item.step}
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-wider text-accent font-mono">
                    Phase {item.step}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-muted-foreground">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Guaranteed Milestone Sign-off
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 6: INTERACTIVE SCOPE & COST ESTIMATOR 2.0 ---------------- */}
      <section id="estimator" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <Zap className="h-3.5 w-3.5" />
            Real-Time Scope Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
            Interactive Scope & <span className="gradient-text">Cost Configurator</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Select your product domain, complexity tier, and core features to calculate live ballpark milestones.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-surface border border-white/[0.1] text-xs font-semibold mt-2">
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-5 py-2 rounded-full transition-all duration-200 ${
                currency === "USD" ? "bg-primary text-white shadow-lg font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-5 py-2 rounded-full transition-all duration-200 ${
                currency === "INR" ? "bg-primary text-white shadow-lg font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Options Panel (Left) */}
          <div className="lg:col-span-7 card-3d p-6 md:p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* 1. Service Type */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-muted-foreground mb-3 font-display">
                  1. Select Product Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    "Full-Stack Web Application",
                    "iOS / Android Mobile App",
                    "UI / UX Design & Prototyping",
                    "Brand Identity & Guidelines",
                    "Custom Full Suite",
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setEstService(t)}
                      className={`py-3 px-4 rounded-xl border text-left font-medium transition-all duration-200 ${
                        estService === t
                          ? "border-primary bg-primary/[0.12] text-white shadow-[0_0_20px_rgba(139,92,246,0.22)] font-semibold"
                          : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Complexity */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-muted-foreground mb-3 font-display">
                  2. Choose Complexity Scale
                </label>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  {["MVP / Lightweight", "Scale-Up", "Enterprise / Custom"].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setEstScale(scale)}
                      className={`py-3 px-3 rounded-xl border font-medium text-center text-xs sm:text-sm transition-all duration-200 ${
                        estScale === scale
                          ? "border-primary bg-primary/[0.12] text-white shadow-[0_0_20px_rgba(139,92,246,0.22)] font-semibold"
                          : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Features Needed */}
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-muted-foreground mb-3 font-display">
                  3. Key Architectural Features
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {featureOptions.map((feat) => {
                    const active = estFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`py-2 px-3.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                          active
                            ? "border-accent bg-accent/[0.15] text-accent shadow-[0_0_15px_rgba(236,72,153,0.22)]"
                            : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                        }`}
                      >
                        {active ? <Check className="h-3.5 w-3.5" /> : null}
                        {feat.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground/80 pt-4 border-t border-white/[0.08] flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              Estimates are calculated using standard sprint velocity models. Our engineering lead finalizes exact milestones during the 24h consultation.
            </div>
          </div>

          {/* Calculations Summary Panel (Right) */}
          <div className="lg:col-span-5 card-3d p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-surface-elevated to-surface border-primary/30 shadow-2xl">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/[0.08]">
                <div className="text-xs uppercase font-extrabold tracking-wider text-primary font-mono">
                  Live Scope Breakdown
                </div>
                <h4 className="text-xl font-bold font-display mt-2 text-foreground">
                  {estService}
                </h4>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.1] text-foreground">
                    Tier: {estScale}
                  </span>
                  <span>•</span>
                  <span>Currency: {currency}</span>
                </div>
              </div>

              {/* Price & Timeline */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Projected Ballpark Range
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-display mt-1 bg-gradient-to-r from-white via-slate-100 to-accent bg-clip-text text-transparent">
                    {getEstimate().range}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">Estimated Timeline</div>
                    <div className="text-base font-bold text-foreground mt-0.5">{getEstimate().timeline}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-[11px] font-bold text-muted-foreground uppercase">Staging Builds</div>
                    <div className="text-base font-bold text-accent mt-0.5">Weekly Deploy</div>
                  </div>
                </div>

                {/* Team Composition Allocation */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Dedicated Sprint Squad
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {getEstimate().team.map((member, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={applyEstimateToForm}
                className="btn-primary w-full flex items-center justify-center gap-2 group !py-3.5 text-sm shadow-xl"
              >
                <span>Apply to Project Scope Inquiry</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: RECENT SHIPPED WORK (PORTFOLIO SHOWCASE) ---------------- */}
      <section id="portfolio" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Verified Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
            Recent shipped <span className="gradient-text">production releases</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Explore software platforms and digital experiences engineered on behalf of ambitious founders.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {["All", "Web SaaS", "Mobile Apps", "UI/UX & Brand"].map((tab) => (
              <button
                key={tab}
                onClick={() => setPortfolioFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  portfolioFilter === tab
                    ? "bg-primary text-white shadow-md"
                    : "bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal-group">
          {filteredProjects.map((proj) => (
            <div key={proj.title} className="card-3d p-6 md:p-8 flex flex-col justify-between group overflow-hidden reveal">
              <div className="space-y-5">
                {/* Image preview */}
                <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-white/[0.08]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#07080D]/80 backdrop-blur-md border border-white/[0.1] text-accent">
                      {proj.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-primary/20 backdrop-blur-md border border-primary/30 text-white">
                      {proj.stat}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300">
                      {proj.highlight}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-display flex items-center justify-between group-hover:text-primary transition-colors">
                  {proj.title}
                  <ArrowUpRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-muted-foreground font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
                >
                  Request Similar Build <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 8: TESTIMONIALS & TRUST ---------------- */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-accent" />
            Verified Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight">
            Trusted by venture-backed <span className="gradient-text">founders</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            See what engineering leaders and founders experience when building with ZyphorZone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 reveal-group">
          {testimonials.map((t) => (
            <div key={t.name} className="card-3d p-8 flex flex-col justify-between group reveal">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {t.result}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 border-t border-white/[0.08] mt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover border-2 border-primary/40 ring-2 ring-white/10"
                />
                <div>
                  <div className="text-sm font-bold text-foreground font-display">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 9: INQUIRY & CONTACT FORM ---------------- */}
      <section id="contact" className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Let's Build Your Vision
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight">
              Ready to ship? <br />
              Let's map out <br />
              <span className="gradient-text">your technical scope.</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Send us your project overview. Our senior engineering lead replies within 24 hours with a comprehensive architectural plan and transparent milestone pricing.
            </p>

            <ul className="space-y-4 pt-6 border-t border-white/[0.08]">
              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">Email Direct</div>
                  <a href="mailto:Zypherzone07@gmail.com" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    Zypherzone07@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 grid place-items-center text-accent shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">Direct Call / WhatsApp</div>
                  <a href="tel:+916385235131" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    +91 63852 35131
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary shrink-0">
                  <Instagram className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">Instagram Direct</div>
                  <a
                    href="https://instagram.com/_zyphor.dev_"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    @_zyphor.dev_
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.1] grid place-items-center text-muted-foreground shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">HQ Office</div>
                  <span className="text-sm font-semibold text-foreground">Coimbatore, Tamil Nadu, India</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="card-3d p-6 md:p-8 space-y-4" noValidate>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs uppercase font-extrabold tracking-wider text-primary font-display">
                  Project Scope Inquiry Form
                </div>
                <span className="text-[10px] text-muted-foreground">⚡ Guaranteed 24h Response</span>
              </div>

              <Field label="Full Name" icon={<User className="h-4 w-4" />}>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={update("name")}
                  placeholder="e.g. Alex Morgan"
                  className="form-input"
                />
              </Field>

              <Field label="Primary Project Domain" icon={<Briefcase className="h-4 w-4" />}>
                <select required value={form.serviceType} onChange={update("serviceType")} className="form-input">
                  <option value="" disabled>Select domain...</option>
                  {serviceTypes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Phone / WhatsApp Number" icon={<Phone className="h-4 w-4" />}>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91 98765 43210"
                    className="form-input"
                  />
                </Field>
                <Field label="Work Email Address" icon={<Mail className="h-4 w-4" />}>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={form.email}
                    onChange={update("email")}
                    placeholder="alex@company.com"
                    className="form-input"
                  />
                </Field>
              </div>

              <Field label="Your Location / City" icon={<MapPin className="h-4 w-4" />}>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={form.location}
                  onChange={update("location")}
                  placeholder="City, Country"
                  className="form-input"
                />
              </Field>

              <Field label="Project Requirements & Scope Notes" icon={<Layers className="h-4 w-4" />}>
                <textarea
                  value={form.details}
                  onChange={update("details")}
                  placeholder="Briefly describe what you are building (pages, features, or configured estimates from above)..."
                  className="form-input min-h-[110px] resize-y font-sans text-sm"
                />
              </Field>

              {error && (
                <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 font-medium">
                  {error}
                </div>
              )}
              {submitted && !error && (
                <div className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 font-semibold text-center">
                  ✨ Thank you! Your project inquiry has been logged. Our senior engineering lead will contact you within 24 hours.
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full !py-3.5 text-center flex items-center justify-center gap-2 group mt-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-xl"
              >
                {submitting ? "Submitting Inquiry..." : "Submit Project Scope Request"}
                {!submitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </button>

              <p className="text-[11px] text-muted-foreground text-center pt-2">
                🔒 Under strict NDA confidentiality. Zero spam, zero high-pressure sales calls.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------- DYNAMIC MULTI-STACK DEVELOPER SANDBOX ----------------
function InteractiveDeveloperSandbox() {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "mobile" | "telemetry">("frontend");
  const [clickCount, setClickCount] = useState(42);
  const [queryStatus, setQueryStatus] = useState("Connected");
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "➜  Next.js 15: Edge runtime initialized (8ms)",
    "➜  Supabase: PostgreSQL cluster verified",
    "✔  Security: RLS policies enforced (12 tables)",
    "➜  Telemetry: Active sync across 18 nodes",
    "✔  Build: Zero errors, bundle size 124 kB",
    "➜  State: 99.99% operational across all edge zones",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full glass-card border border-white/[0.12] rounded-3xl overflow-hidden shadow-2xl relative select-none">
      {/* Top OS Window Bar */}
      <div className="bg-[#0A0C15]/90 border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06] text-[11px] font-mono">
          <button
            onClick={() => setActiveTab("frontend")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "frontend" ? "bg-primary text-white font-bold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Frontend
          </button>
          <button
            onClick={() => setActiveTab("backend")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "backend" ? "bg-primary text-white font-bold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Supabase
          </button>
          <button
            onClick={() => setActiveTab("mobile")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "mobile" ? "bg-primary text-white font-bold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "telemetry" ? "bg-primary text-white font-bold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Telemetry
          </button>
        </div>

        <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
      </div>

      {/* Main Sandbox Canvas */}
      <div className="p-6 space-y-5 bg-gradient-to-b from-[#090C18]/60 to-[#07080D]/90 min-h-[330px] flex flex-col justify-between">
        {/* TAB 1: FRONTEND INTERACTIVE COMPONENT */}
        {activeTab === "frontend" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-white/[0.08] pb-2 font-mono">
              <span className="text-accent font-semibold">src/components/SaaSDashboard.tsx</span>
              <span className="text-emerald-400 font-semibold">● React 19 Client</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-foreground font-display">Live State Hydration</div>
                  <div className="text-[11px] text-muted-foreground">Interactive Client Counter</div>
                </div>
                <span className="text-lg font-mono font-extrabold text-accent">{clickCount} Ops</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setClickCount((c) => c + 1)}
                  className="flex-1 py-2 px-3 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-xs font-bold text-white transition-all active:scale-95"
                >
                  Trigger Event (+1)
                </button>
                <button
                  onClick={() => setClickCount(0)}
                  className="py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-muted-foreground"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-slate-300">
              <span className="text-primary">const</span> [state, setState] = <span className="text-accent">useOptimistic</span>({clickCount});
            </div>
          </div>
        )}

        {/* TAB 2: BACKEND / SUPABASE SIMULATION */}
        {activeTab === "backend" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-white/[0.08] pb-2 font-mono">
              <span className="text-accent font-semibold">supabase.from('analytics').select('*')</span>
              <span className="text-emerald-400 font-semibold">● 200 OK (14ms)</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] font-mono text-xs space-y-1.5 text-slate-300">
              <div className="text-primary">{"{"}</div>
              <div className="pl-4"><span className="text-accent">"status"</span>: "healthy",</div>
              <div className="pl-4"><span className="text-accent">"cluster"</span>: "ap-south-1 (Mumbai)",</div>
              <div className="pl-4"><span className="text-accent">"active_connections"</span>: 148,</div>
              <div className="pl-4"><span className="text-accent">"rls_enforced"</span>: true</div>
              <div className="text-primary">{"}"}</div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>PostgreSQL 16.2</span>
              <span className="text-accent font-semibold">0 Slow Queries</span>
            </div>
          </div>
        )}

        {/* TAB 3: MOBILE INTERACTIVE FRAME */}
        {activeTab === "mobile" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-white/[0.08] pb-2 font-mono">
              <span className="text-accent font-semibold">iOS & Android Build Target</span>
              <span className="text-emerald-400 font-semibold">● 60 FPS Native</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold">
                  📱
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground font-display">Apex Mobile Runtime</div>
                  <div className="text-[11px] text-muted-foreground">React Native 0.76 • Hermes Engine</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs flex justify-between items-center font-mono">
                <span className="text-muted-foreground">Biometrics Authentication</span>
                <span className="text-accent font-bold">Active (FaceID)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TELEMETRY & LOGS */}
        {activeTab === "telemetry" && (
          <div className="space-y-3 animate-in fade-in duration-200 font-mono text-xs">
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-white/[0.08] pb-2">
              <span className="text-accent font-semibold">Vercel Edge Telemetry</span>
              <span className="text-emerald-400 font-semibold">● 99.99% Uptime</span>
            </div>

            <div className="space-y-1.5 min-h-[140px] flex flex-col justify-center">
              {logs.slice(0, logIndex + 1).map((log, i) => (
                <div
                  key={log}
                  className={`transition-all duration-300 ${
                    i === logIndex
                      ? "text-primary font-bold translate-x-1"
                      : log.startsWith("✔")
                        ? "text-emerald-400"
                        : "text-muted-foreground/80"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] p-3 rounded-xl">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-[10px] font-black text-white">
              Z
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Engine Architecture
              </div>
              <div className="text-xs font-bold text-foreground font-display">
                Next.js 15 + Supabase + React Native
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
            Live Demo
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------- FIELD HELPER COMPONENT ----------------
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 font-display">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}
