import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Code2,
  Palette,
  Megaphone,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Users,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  Check,
  CheckCircle2,
  Activity,
  Layers,
  ArrowUpRight,
  Star,
  Zap,
  HelpCircle,
  Database,
  Cpu,
  ChevronDown,
  ChevronRight,
  Sliders,
  Award,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { InquiryForm } from "@/components/InquiryForm";
import { useLenisControl } from "@/components/SmoothScrollProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.title },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: siteConfig.title },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

/* ---------------- DATA DEFINITIONS ---------------- */

const techStackList = [
  "React 19",
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS v4",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "React Native",
  "Flutter",
  "Python / AI",
  "Redis",
  "Vercel / AWS",
  "Docker",
  "Figma Tokens",
];

const comparisonPoints = [
  {
    feature: "Assigned Talent Caliber",
    zyphorzone: "100% Vetted Senior Engineers & Design Leads",
    agency: "Pitched by executives, handed to junior associates",
    freelance: "Unverified anonymous bids & unpredictable quality",
  },
  {
    feature: "Pricing Transparency",
    zyphorzone: "Fixed flat milestone billing with zero surprise creeps",
    agency: "Huge corporate markups ($25k+) & retainer lock-ins",
    freelance: "Erratic hourly billing with endless billable padding",
  },
  {
    feature: "Sprint Management",
    zyphorzone: "Dedicated PM + weekly live staging deployments",
    agency: "Bureaucratic layers & delayed bi-weekly reviews",
    freelance: "Self-managed, frequent communication drop-offs",
  },
  {
    feature: "Code & IP Ownership",
    zyphorzone: "Direct Git commits + 100% full IP legal handover",
    agency: "Proprietary lock-ins & conditional code transfers",
    freelance: "Unclear licensing clauses and copyright liabilities",
  },
  {
    feature: "Technical Scope Speed",
    zyphorzone: "Guaranteed architectural blueprint in 24 hours",
    agency: "3 to 5 weeks of discovery workshops",
    freelance: "Vague proposals with uncommitted delivery dates",
  },
];

const whyChoosePoints = [
  {
    icon: Sparkles,
    title: "Senior-Only Squads",
    stat: "100%",
    statLabel: "Senior Staff",
    desc: "Your application is architected and built exclusively by battle-tested engineers who have scaled enterprise platforms.",
  },
  {
    icon: ShieldCheck,
    title: "Continuous Observability",
    stat: "7-Day",
    statLabel: "Sprint Cycles",
    desc: "Track every milestone with live preview staging URLs, real-time GitHub commit logs, and milestone-gated signoffs.",
  },
  {
    icon: Users,
    title: "Managed Product Delivery",
    stat: "1-on-1",
    statLabel: "Lead Architect",
    desc: "A dedicated technical architect orchestrates scope, enforces strict code quality, and guarantees milestone deadlines.",
  },
  {
    icon: Clock,
    title: "Capital Efficiency",
    stat: "2.4x",
    statLabel: "Speed to MVP",
    desc: "Achieve tier-1 agency polish and rock-solid architecture without paying for bloated corporate suites or agency overhead.",
  },
];

const fiveSteps = [
  {
    num: "01",
    title: "Technical Discovery & Scope",
    badge: "Day 1",
    timeline: "24 Hours",
    desc: "Submit your product requirements. Our lead architect analyzes your constraints and returns a comprehensive architectural blueprint, database schema, and fixed milestone budget.",
    deliverables: ["Architecture Blueprint", "Fixed Milestone Breakdown", "Tech Stack Decision Matrix"],
  },
  {
    num: "02",
    title: "UX Exploration & Token Design",
    badge: "Week 1",
    timeline: "Days 2–7",
    desc: "We design a high-fidelity Figma design system with atomic tokens, interactive clickable prototypes, and accessibility compliance before a single line of backend code is committed.",
    deliverables: ["Atomic Design Tokens", "Interactive Prototype", "Component Spec Library"],
  },
  {
    num: "03",
    title: "Core Architecture & Database",
    badge: "Weeks 2–3",
    timeline: "Sprint 1–2",
    desc: "We initialize your repository, configure Supabase / PostgreSQL schemas with strict Row-Level Security, setup Redis caching, and deploy the foundational API endpoints.",
    deliverables: ["Postgres Schemas + RLS", "Automated CI/CD Pipelines", "Staging Environment Live"],
  },
  {
    num: "04",
    title: "Feature Sprints & Staging Builds",
    badge: "Weeks 3–5",
    timeline: "Sprint 3–4",
    desc: "Rapid full-stack execution with weekly live staging builds. You test interactive features in real-time on real devices, with transparent progress reports every Friday.",
    deliverables: ["Weekly Staging Builds", "End-to-End Test Suite", "Lighthouse 100 Audit"],
  },
  {
    num: "05",
    title: "Production Launch & IP Transfer",
    badge: "Launch Ready",
    timeline: "Milestone Complete",
    desc: "We configure production cloud infrastructure (Vercel, Supabase, AWS), execute security hardening, hand over 100% Git repo rights, and provide 30-day post-launch support.",
    deliverables: ["100% Repository Transfer", "Production Domain DNS & SSL", "30-Day Post-Launch SLA"],
  },
];

const portfolioProjects = [
  {
    id: "aether",
    index: "01 / 04",
    title: "Aether Telemetry Analytics Platform",
    category: "Web SaaS",
    badge: "Enterprise Analytics",
    desc: "Real-time observability dashboard processing 2.4M telemetry events daily with multi-tenant PostgreSQL partitioning, dynamic data visualization, and sub-120ms querying.",
    tech: ["Next.js 15", "Supabase", "PostgreSQL", "Recharts", "Tailwind CSS"],
    stat: "120ms P99 Query Speed",
    highlight: "10x Platform Throughput",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    client: "ScaleFlow Technologies",
  },
  {
    id: "apex",
    index: "02 / 04",
    title: "Apex Fitness Companion & Biometrics",
    category: "Mobile Apps",
    badge: "Cross-Platform Mobile",
    desc: "Cross-platform mobile fitness platform with real-time biometric telemetry, offline synchronization, social athlete feeds, and instant Apple Health / Google Fit sync.",
    tech: ["React Native", "Node.js", "Redis", "WebSockets", "Hermes Engine"],
    stat: "4.9★ App Store Rating",
    highlight: "+120k Active Users",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&auto=format&fit=crop&q=80",
    client: "Apex Health Collective",
  },
  {
    id: "vortex",
    index: "03 / 04",
    title: "Vortex Cloud Infrastructure System",
    category: "UI/UX & Brand",
    badge: "Design System & Platform",
    desc: "Complete visual identity system, high-conversion landing architecture, and tokenized design system for an enterprise cloud developer tooling suite.",
    tech: ["Figma Tokens", "React 19", "Vite", "Tailwind CSS", "Motion"],
    stat: "+84% Inbound Conversions",
    highlight: "Top Product of the Day",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    client: "Vortex Systems",
  },
  {
    id: "nexus",
    index: "04 / 04",
    title: "Nexus High-Velocity Headless Commerce",
    category: "Web SaaS",
    badge: "Headless E-Commerce",
    desc: "Sub-second e-commerce engine with edge-cached catalog routing, automated Stripe checkout pipelines, and real-time multi-location inventory synchronization.",
    tech: ["Next.js 15", "Stripe API", "PostgreSQL", "Edge Functions", "Redis"],
    stat: "99.99% Uptime SLA",
    highlight: "$1.4M GMV Processed",
    image: "https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1200&auto=format&fit=crop&q=80",
    client: "Nexus Digital Commerce",
  },
];

const leadershipTeam = [
  {
    name: "Naveen Kumar",
    role: "Founding Engineer & Solutions Architect",
    specialty: "Full-Stack Web & Supabase Cloud",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Arjun Verma",
    role: "Lead Mobile Architect",
    specialty: "React Native & Distributed Telemetry",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Principal Product Designer",
    specialty: "Design Tokens & High-Conversion UX",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Marcus Vance",
    role: "DevOps & Cloud Systems Lead",
    specialty: "PostgreSQL Partitioning & Zero-Downtime CI/CD",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
  },
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO, ScaleFlow AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    quote:
      "ZyphorZone took our technical architecture specs and shipped an enterprise-grade full-stack platform in under 5 weeks. Their milestone clarity and weekly staging builds gave us total peace of mind.",
    stars: 5,
    result: "10x Platform Throughput",
    company: "ScaleFlow AI",
  },
  {
    name: "Sarah Jenkins",
    role: "Head of Product, Apex Health",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    quote:
      "Finding verified senior talent without paying exorbitant agency retainers was impossible until we engaged ZyphorZone. Zero fluff, 100% execution, and immediate code handover.",
    stars: 5,
    result: "4.9★ App Store Launch",
    company: "Apex Health",
  },
  {
    name: "Vikram Raman",
    role: "Co-Founder, Vortex Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    quote:
      "The precision of their weekly live staging builds gave our venture board total confidence. Their platform re-architecture directly drove an 84% lift in qualified inbound leads.",
    stars: 5,
    result: "+84% Inbound Conversions",
    company: "Vortex Systems",
  },
];

const faqs = [
  {
    q: "How does the managed senior freelance model work?",
    a: "Unlike traditional agencies where junior associates execute behind senior pitches, ZyphorZone hand-assigns dedicated senior engineers who write your production code directly. We provide a lead architect as your single point of accountability with weekly live staging builds and fixed milestone billing.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You do. 100%. From Day 1, work is committed to your own private GitHub repository or transferred in full upon each milestone sign-off. There are zero proprietary lock-ins or delayed handover clauses.",
  },
  {
    q: "How quickly can we begin sprinting?",
    a: "We guarantee a comprehensive technical architecture blueprint and flat milestone breakdown within 24 hours of your initial inquiry. Once approved, active sprint cycles typically kick off within 3 to 5 business days.",
  },
  {
    q: "What tech stack do you recommend?",
    a: "We specialize in modern battle-tested stacks: React 19, Next.js 15, TypeScript, Tailwind CSS v4, Supabase (PostgreSQL with RLS), React Native, and Vercel/AWS. We choose the optimal tools tailored to your scalability and maintenance goals.",
  },
  {
    q: "Do you offer post-launch support and warranty?",
    a: "Yes. Every production deployment includes a guaranteed 30-day post-launch support SLA for bug fixes, edge-case optimization, and deployment verification, with optional ongoing sprint support agreements.",
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

function LandingPage() {
  const { scrollTo } = useLenisControl();

  // Scope Estimator State
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [estService, setEstService] = useState("Full-Stack Web Engineering");
  const [estScale, setEstScale] = useState("Scale-Up");
  const [estFeatures, setEstFeatures] = useState<string[]>([
    "Auth & Roles",
    "DB & API Architecture",
    "Admin Dashboard",
  ]);

  // Portfolio Filter State
  const [portfolioFilter, setPortfolioFilter] = useState("All");

  // Sticky 5-Step Process State
  const [activeStep, setActiveStep] = useState(0);
  const processCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Aether Dashboard State
  const [aetherTab, setAetherTab] = useState<"Overview" | "Revenue" | "Users" | "Reports">("Overview");

  // Scroll tracking for Sticky 5-Step
  useEffect(() => {
    const handleScroll = () => {
      const focalPoint = window.innerHeight * 0.42;
      let closestIdx = 0;
      let minDistance = Infinity;

      processCardsRef.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height * 0.4;
        const distance = Math.abs(cardCenter - focalPoint);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveStep(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Estimator Feature Options
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

  const getEstimate = () => {
    const isINR = currency === "INR";
    let basePrice = isINR ? 50000 : 900;
    let baseWeeks = 3;

    if (estService.includes("Mobile")) {
      basePrice = isINR ? 105000 : 2000;
      baseWeeks = 5;
    } else if (estService.includes("Design")) {
      basePrice = isINR ? 35000 : 700;
      baseWeeks = 2;
    } else if (estService.includes("Brand")) {
      basePrice = isINR ? 30000 : 600;
      baseWeeks = 1.5;
    } else if (estService.includes("Marketing")) {
      basePrice = isINR ? 25000 : 500;
      baseWeeks = 1;
    } else if (estService.includes("Suite")) {
      basePrice = isINR ? 150000 : 2800;
      baseWeeks = 6;
    }

    if (estScale === "MVP / Lightweight") {
      basePrice *= 0.75;
      baseWeeks = Math.max(1, Math.round(baseWeeks * 0.75));
    } else if (estScale === "Enterprise / Custom") {
      basePrice *= 1.55;
      baseWeeks = Math.round(baseWeeks * 1.45);
    }

    estFeatures.forEach((featId) => {
      const opt = featureOptions.find((o) => o.id === featId);
      if (opt) basePrice += opt.price;
    });

    const minPrice = Math.round(basePrice * 0.92);
    const maxPrice = Math.round(basePrice * 1.15);
    const symbol = isINR ? "₹" : "$";

    return {
      range: `${symbol}${minPrice.toLocaleString()} - ${symbol}${maxPrice.toLocaleString()}`,
      timeline: `${baseWeeks}–${baseWeeks + 2} Weeks`,
      team: [
        "1 Lead Solutions Architect",
        estService.includes("Mobile") ? "1 Senior React Native / Flutter Specialist" : "1 Senior Full-Stack Engineer",
        "1 Senior UI/UX Design Lead",
        "1 QA & Cloud DevOps Specialist",
      ],
    };
  };

  const applyEstimateToForm = () => {
    const est = getEstimate();
    const details = `[Configured Scope]\nDomain: ${estService}\nComplexity: ${estScale}\nFeatures: ${estFeatures.join(
      ", "
    )}\nBallpark: ${est.range} (${currency})\nTimeline: ${est.timeline}`;

    window.dispatchEvent(
      new CustomEvent("zyphor:apply-estimate", {
        detail: {
          serviceType: estService,
          details,
        },
      })
    );

    scrollTo("#contact", { offset: -80 });
  };

  const filteredProjects =
    portfolioFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category.toLowerCase().includes(portfolioFilter.toLowerCase()));

  return (
    <div className="relative z-10 w-full overflow-x-clip">
      {/* ---------------- SECTION 1: HERO & CINEMATIC REVEAL ---------------- */}
      <section
        id="home"
        className="relative min-h-[100svh] flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden"
      >
        {/* Background Layer with Dark Vignette & Film Grain */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 bg-[#09090B] opacity-90"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="absolute inset-0 tech-grid opacity-30" />
          <div className="absolute inset-0 film-grain pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Display Typography Headline */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-1.5 text-xs text-[#9A9AA6] font-mono tracking-wide backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#C8FF00] animate-ping" />
              <span className="text-[#F5F5F7] font-semibold">Q1/Q2 2026 Sprint Allocations</span>
              <span className="text-white/30">•</span>
              <span className="text-[#C8FF00] flex items-center gap-1 font-semibold">
                Guaranteed 24h Scope Delivery <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            {/* Headline Reveal with Masking */}
            <h1 className="text-[clamp(2.35rem,6.5vw,5.5rem)] font-extrabold tracking-[-0.04em] text-[#F5F5F7] font-display leading-[1.04]">
              <span className="block overflow-hidden">
                <span className="inline-block animate-in fade-in slide-in-from-bottom-8 duration-700">
                  We engineer your
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                  software idea into a
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block text-[#C8FF00] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                  high-growth product.
                </span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg md:text-xl text-[#9A9AA6] leading-relaxed max-w-2xl font-normal">
              A senior-managed freelance collective delivering agency-grade web apps, cross-platform mobile experiences,
              and modern design systems. Total code ownership, flat milestone billing, zero fluff.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo("#estimator", { offset: -80 })}
                className="btn-lime flex items-center gap-2 group text-sm font-bold shadow-lg"
              >
                <span>Configure Scope & Estimate</span>
                <Zap className="h-4 w-4 fill-[#09090B]" />
              </button>
              <button
                onClick={() => scrollTo("#contact", { offset: -80 })}
                className="btn-ghost flex items-center gap-2 text-sm font-medium"
              >
                <span>Book 24h Technical Consultation</span>
                <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social Proof + Stars Bar */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-6 text-xs text-[#9A9AA6]">
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
                    loading="eager"
                    className="h-8 w-8 rounded-full border-2 border-[#09090B] object-cover ring-1 ring-[#C8FF00]/40"
                  />
                ))}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                  <span className="text-[#F5F5F7] font-bold ml-1.5 text-xs font-mono">4.9 / 5.0</span>
                </div>
                <div>
                  Trusted by <span className="text-[#F5F5F7] font-semibold">45+ ambitious founders</span> worldwide
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-[#9A9AA6] font-mono">
              {[
                "100% Repository & IP Handover",
                "Weekly Live Staging Deployments",
                "Direct Slack / Discord Access",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C8FF00] shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Developer Sandbox Styled to Obsidian + #C8FF00 */}
          <div className="lg:col-span-5 relative w-full lg:max-w-lg xl:max-w-xl mx-auto">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#C8FF00]/20 via-[#C8FF00]/5 to-transparent opacity-40 blur-2xl pointer-events-none" />
            <InteractiveDeveloperSandbox />
          </div>
        </div>

        {/* Bottom Scroll Indicator (hidden on small viewports) */}
        <div className="hidden md:flex justify-center mt-12 pointer-events-none">
          <div className="flex flex-col items-center gap-1 text-[11px] font-mono text-[#9A9AA6] opacity-70">
            <span>SCROLL TO EXPLORE</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#C8FF00] to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: SHOWCASE (MARQUEE + STATS + AETHER DASHBOARD) ---------------- */}
      <section
        id="showcase"
        className="-mt-8 rounded-t-[36px] relative z-20 bg-[#0E0E11] border-t border-white/[0.08] shadow-[0_-20px_50px_rgba(0,0,0,0.6)] pt-16 pb-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Infinite Tech Stack Marquee */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#9A9AA6]">
                Battle-Tested Architectural Stacks
              </span>
            </div>
            <div className="relative overflow-hidden w-full py-3 mask-radial-edges">
              <div className="flex animate-marquee gap-3 whitespace-nowrap">
                {[...techStackList, ...techStackList].map((tech, idx) => (
                  <span
                    key={`${tech}-${idx}`}
                    className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-mono font-medium text-[#F5F5F7] hover:border-[#C8FF00]/40 hover:text-[#C8FF00] transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Column Stats Strip with Tabular Numerics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-[#131317]/80 border border-white/[0.07] backdrop-blur-xl">
            {siteConfig.stats.map((s, i) => (
              <div
                key={s.label}
                className={`space-y-1 ${
                  i > 0 ? "lg:border-l lg:border-white/[0.08] lg:pl-6" : ""
                }`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#F5F5F7] tracking-tight tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8FF00]">
                  {s.label}
                </div>
                <div className="text-xs text-[#9A9AA6] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Interactive Aether Concept Dashboard Showcase */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8FF00] font-semibold">
                Living Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#F5F5F7] tracking-tight">
                Interactive Concept Prototype
              </h2>
              <p className="text-sm text-[#9A9AA6]">
                Inspect our live design token execution, low-latency telemetry feeds, and responsive layout hierarchy.
              </p>
            </div>

            {/* Browser Frame */}
            <div className="rounded-3xl border border-white/[0.12] bg-[#121217] overflow-hidden shadow-2xl">
              {/* Browser Bar */}
              <div className="bg-[#18181F] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/70" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/70" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
                  <span className="text-xs font-mono text-[#9A9AA6] ml-2 hidden sm:inline">
                    https://aether.zyphorzone.internal/telemetry
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#C8FF00] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#C8FF00]">140ms Latency</span>
                </div>
              </div>

              {/* Dashboard Internal Body */}
              <div className="p-4 sm:p-6 md:p-8 space-y-6">
                {/* Horizontal Navigation Pills (Mobile) / Sidebar Nav (Desktop) */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                    {(["Overview", "Revenue", "Users", "Reports"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setAetherTab(tab)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                          aetherTab === tab
                            ? "bg-[#C8FF00] text-[#09090B] font-bold shadow-[0_0_15px_rgba(200,255,0,0.3)]"
                            : "bg-white/[0.04] text-[#9A9AA6] hover:text-[#F5F5F7]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-[#9A9AA6] hidden sm:block">
                    Active Cluster: <span className="text-[#F5F5F7]">ap-south-1 (Mumbai)</span>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Active Nodes", val: aetherTab === "Revenue" ? "128 Nodes" : "94 Nodes", change: "+14%" },
                    { label: "P99 Throughput", val: aetherTab === "Users" ? "2.4M req/s" : "1.8M req/s", change: "Optimal" },
                    { label: "Postgres Storage", val: "42.8 GB", change: "Partitioned" },
                    { label: "Cache Hit Rate", val: "99.4%", change: "Redis Active" },
                  ].map((m) => (
                    <div key={m.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[11px] font-mono text-[#9A9AA6] uppercase">{m.label}</div>
                      <div className="text-xl sm:text-2xl font-bold font-display text-[#F5F5F7] mt-1 tabular-nums">
                        {m.val}
                      </div>
                      <div className="text-[11px] font-mono text-[#C8FF00] mt-0.5">{m.change}</div>
                    </div>
                  ))}
                </div>

                {/* Animated Chart Simulation */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F5F5F7] font-semibold">Telemetry Ingestion Velocity</span>
                    <span className="text-[#9A9AA6]">Real-Time Streaming</span>
                  </div>
                  <div className="h-32 flex items-end gap-2 sm:gap-3 pt-4">
                    {[45, 62, 58, 80, 75, 92, 88, 100, 84, 96, 110, 105, 120].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-white/[0.05] to-[#C8FF00] rounded-t transition-all duration-500 hover:brightness-125"
                        style={{ height: `${(h / 120) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: WHY US & COMPARISON MATRIX ---------------- */}
      <section id="why" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            The High-Performance Collective
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Why ambitious founders build with <span className="text-[#C8FF00]">ZyphorZone</span>
          </h2>
          <p className="text-[#9A9AA6] text-base sm:text-lg">
            We bridge the gap between bloated, slow-moving traditional agencies and erratic, unverified freelance platforms.
          </p>
        </div>

        {/* 4 Value Cards with Spotlight Border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoosePoints.map((item) => (
            <div key={item.title} className="card-editorial p-7 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#C8FF00]/40 transition-colors">
                    <item.icon className="h-5 w-5 text-[#C8FF00]" />
                  </div>
                  <span className="text-xs font-mono text-[#C8FF00] bg-[#C8FF00]/10 px-2.5 py-1 rounded-full border border-[#C8FF00]/20 font-bold">
                    {item.stat}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-[#F5F5F7] tracking-tight">{item.title}</h3>
                <p className="text-sm text-[#9A9AA6] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="card-editorial p-6 md:p-8 overflow-hidden rounded-3xl">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
            <div>
              <h3 className="text-xl font-bold font-display text-[#F5F5F7]">Capability & Standards Matrix</h3>
              <p className="text-xs text-[#9A9AA6] mt-0.5 font-mono">Managed Collective vs Traditional Agency vs Marketplaces</p>
            </div>
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/30 text-[#C8FF00] self-start sm:self-auto">
              100% Client Protected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs font-mono uppercase tracking-wider text-[#9A9AA6]">
                  <th className="py-4 pr-6">Operational Vector</th>
                  <th className="py-4 px-6 text-[#C8FF00] bg-[#C8FF00]/[0.06] rounded-t-xl font-bold">ZyphorZone Collective</th>
                  <th className="py-4 px-6">Traditional Agency</th>
                  <th className="py-4 pl-6">Open Marketplaces</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {comparisonPoints.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pr-6 font-semibold text-[#F5F5F7] font-display text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 font-medium text-[#F5F5F7] bg-[#C8FF00]/[0.03] border-x border-[#C8FF00]/10">
                      <div className="flex items-start gap-2 text-xs sm:text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#C8FF00] shrink-0 mt-0.5" />
                        <span>{row.zyphorzone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#9A9AA6]">{row.agency}</td>
                    <td className="py-4 pl-6 text-xs text-[#9A9AA6]">{row.freelance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: CAPABILITIES BENTO GRID ---------------- */}
      <section id="services" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
            <Briefcase className="h-3.5 w-3.5" />
            End-to-End Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Engineered for <span className="text-[#C8FF00]">concurrency & conversion</span>
          </h2>
          <p className="text-[#9A9AA6] text-base sm:text-lg">
            From zero-to-one architecture prototypes to distributed cloud systems, we deploy purpose-built teams.
          </p>
        </div>

        {/* 3-Col Bento on Desktop, 2-Col on Tablet, 1-Col on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: 2-Col Wide: Web Engineering */}
          <div className="card-editorial lg:col-span-2 p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-[#C8FF00]" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#C8FF00]/10 text-[#C8FF00] border border-[#C8FF00]/20">
                  <Activity className="h-3.5 w-3.5" />
                  Sub-150ms P99 Latency
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-[#F5F5F7]">Full-Stack Web Engineering</h3>
                <p className="text-sm text-[#9A9AA6] mt-2 leading-relaxed max-w-xl">
                  Enterprise-grade Next.js 15, React 19, and Supabase platforms built for sub-second page loads, real-time
                  sync, automated CI/CD pipelines, and high SEO search rankings.
                </p>
              </div>
            </div>

            {/* Lighthouse Scores */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Performance", "Accessibility", "Best Practices", "SEO Score"].map((lbl) => (
                <div key={lbl} className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
                  <div className="mx-auto h-10 w-10 rounded-full border-2 border-[#C8FF00]/40 bg-[#C8FF00]/10 grid place-items-center font-mono font-bold text-sm text-[#C8FF00]">
                    100
                  </div>
                  <div className="text-[11px] font-mono text-[#9A9AA6]">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Mobile Apps */}
          <div className="card-editorial p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-[#C8FF00]" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#F5F5F7]">Cross-Platform Mobile Apps</h3>
              <p className="text-sm text-[#9A9AA6] leading-relaxed">
                Native iOS and Android applications written in React Native and Flutter with offline persistence, real-time
                push notifications, and smooth 60fps animations.
              </p>
            </div>

            <div className="mt-8 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#C8FF00] grid place-items-center text-[#09090B] shrink-0 font-bold">
                📱
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#F5F5F7] truncate">Real-Time Telemetry Sync</div>
                <div className="text-[11px] font-mono text-[#9A9AA6] truncate">0 Dropped Packets • 60 FPS</div>
              </div>
            </div>
          </div>

          {/* Card 3: UI/UX & Design Systems */}
          <div className="card-editorial p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <Palette className="h-6 w-6 text-[#C8FF00]" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#F5F5F7]">UI/UX & Design Systems</h3>
              <p className="text-sm text-[#9A9AA6] leading-relaxed">
                Atomic token libraries, interactive clickable Figma prototypes, WCAG accessibility compliance, and
                conversion-optimized user flows.
              </p>
            </div>

            <div className="mt-8 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#9A9AA6]">Design Tokens</div>
              <div className="flex gap-2">
                <div className="h-6 flex-1 rounded bg-[#C8FF00]" title="Acid Lime" />
                <div className="h-6 flex-1 rounded bg-[#F5F5F7]" title="Off-White" />
                <div className="h-6 flex-1 rounded bg-[#131317] border border-white/20" title="Obsidian" />
                <div className="h-6 flex-1 rounded bg-[#9A9AA6]" title="Muted Gray" />
              </div>
            </div>
          </div>

          {/* Card 4: Supabase & Cloud Architecture */}
          <div className="card-editorial p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <Database className="h-6 w-6 text-[#C8FF00]" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#F5F5F7]">Cloud Architecture & Database Scaling</h3>
              <p className="text-sm text-[#9A9AA6] leading-relaxed">
                Supabase, PostgreSQL multi-tenant partitioning, Redis caching layers, Edge functions, and zero-downtime
                database migrations.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#9A9AA6]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C8FF00] animate-pulse" />
                Postgres RLS Active
              </span>
              <span className="text-[#F5F5F7] font-semibold">100% Isolated</span>
            </div>
          </div>

          {/* Card 5: 2-Col Wide: Brand Strategy & Growth */}
          <div className="card-editorial lg:col-span-2 p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <Megaphone className="h-6 w-6 text-[#C8FF00]" />
                </div>
                <div className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#C8FF00]/10 text-[#C8FF00] border border-[#C8FF00]/20">
                  Data-Driven Conversions
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-[#F5F5F7]">Performance Marketing & Growth Architecture</h3>
                <p className="text-sm text-[#9A9AA6] mt-2 leading-relaxed max-w-xl">
                  Technical SEO indexing, programmatic landing page generation, full-funnel tracking, and conversion rate
                  optimization (CRO) to accelerate customer acquisition.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] grid sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xl font-extrabold text-[#C8FF00] font-display tabular-nums">+84%</div>
                <div className="text-xs text-[#9A9AA6] mt-0.5">Average Conversion Uplift</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xl font-extrabold text-[#F5F5F7] font-display tabular-nums">2.8x</div>
                <div className="text-xs text-[#9A9AA6] mt-0.5">Search Traffic Growth</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xl font-extrabold text-emerald-400 font-display tabular-nums">Zero Bloat</div>
                <div className="text-xs text-[#9A9AA6] mt-0.5">Clean Semantic Markup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: PINNED 5-STEP PROCESS ---------------- */}
      <section id="how" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Desktop Left Sticky Column (`top: 114px`) / Mobile Top Sticky HUD (`top: 74px`) */}
          <div className="lg:col-span-5 lg:sticky lg:top-[114px] z-30">
            {/* Mobile Sticky HUD Bar */}
            <div className="lg:hidden sticky top-[74px] -mx-4 px-4 py-3 bg-[#09090B]/90 backdrop-blur-xl border-y border-white/[0.08] flex items-center justify-between z-30 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-extrabold text-[#C8FF00]">
                  {fiveSteps[activeStep]?.num || "01"}
                </span>
                <span className="text-xs font-bold font-display text-[#F5F5F7] truncate max-w-[140px]">
                  {fiveSteps[activeStep]?.title}
                </span>
              </div>
              <div className="flex gap-1">
                {fiveSteps.map((step, idx) => (
                  <button
                    key={step.num}
                    onClick={() => {
                      const el = processCardsRef.current[idx];
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 160;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className={`h-7 w-7 rounded-full text-[11px] font-mono transition-all ${
                      activeStep === idx
                        ? "bg-[#C8FF00] text-[#09090B] font-bold"
                        : "bg-white/[0.05] text-[#9A9AA6]"
                    }`}
                  >
                    {step.num}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Sticky Panel */}
            <div className="hidden lg:block space-y-6 card-editorial p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
                <Clock className="h-3.5 w-3.5" />
                Streamlined Execution System
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#F5F5F7] tracking-tight">
                Five steps. <br />
                <span className="text-[#C8FF00]">Zero friction.</span>
              </h2>

              <p className="text-[#9A9AA6] text-sm leading-relaxed">
                Our signature 5-stage sprint workflow keeps founders fully informed with live staging builds every Friday.
              </p>

              {/* Rolling Odometer Number */}
              <div className="py-4 border-y border-white/[0.08] flex items-baseline gap-4">
                <div className="h-20 overflow-hidden">
                  <div
                    className="transition-transform duration-500 ease-out font-mono font-extrabold text-7xl text-[#C8FF00] leading-none"
                    style={{ transform: `translateY(-${activeStep * 80}px)` }}
                  >
                    {fiveSteps.map((s) => (
                      <div key={s.num} className="h-20 flex items-center">
                        {s.num}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-xs font-mono text-[#9A9AA6]">
                  Active Sprint Phase • {fiveSteps[activeStep]?.badge}
                </div>
              </div>

              {/* Clickable Step Jump Pills */}
              <div className="flex gap-2">
                {fiveSteps.map((step, idx) => (
                  <button
                    key={step.num}
                    onClick={() => {
                      const el = processCardsRef.current[idx];
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 130;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all ${
                      activeStep === idx
                        ? "bg-[#C8FF00] text-[#09090B] font-bold shadow-[0_0_15px_rgba(200,255,0,0.3)]"
                        : "bg-white/[0.03] text-[#9A9AA6] hover:bg-white/[0.06] hover:text-[#F5F5F7]"
                    }`}
                  >
                    Phase {step.num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Right Column: Five Stacked Cards */}
          <div className="lg:col-span-7 space-y-12 lg:space-y-16">
            {fiveSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  ref={(el) => {
                    processCardsRef.current[idx] = el;
                  }}
                  className={`card-editorial p-8 sm:p-10 transition-all duration-500 rounded-3xl ${
                    isActive
                      ? "border-[#C8FF00]/50 shadow-[0_0_35px_rgba(200,255,0,0.15)] opacity-100 scale-100"
                      : "opacity-40 scale-[0.98] border-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#C8FF00] font-bold">
                      Phase {step.num} • {step.timeline}
                    </span>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#F5F5F7]">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F7] tracking-tight mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#9A9AA6] leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  <div className="pt-4 border-t border-white/[0.06] space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#9A9AA6]">
                      Key Deliverables
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-[#F5F5F7]">
                      {step.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#C8FF00] shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 6: INTERACTIVE SCOPE ESTIMATOR ---------------- */}
      <section id="estimator" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
            <Zap className="h-3.5 w-3.5" />
            Real-Time Scope Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Interactive Scope & <span className="text-[#C8FF00]">Cost Configurator</span>
          </h2>
          <p className="text-[#9A9AA6] text-base sm:text-lg">
            Configure your technical requirements to calculate live ballpark milestone estimates.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#121217] border border-white/[0.08] text-xs font-mono font-semibold mt-2">
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-5 py-2 rounded-full transition-all ${
                currency === "USD"
                  ? "bg-[#C8FF00] text-[#09090B] font-bold shadow-md"
                  : "text-[#9A9AA6] hover:text-[#F5F5F7]"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-5 py-2 rounded-full transition-all ${
                currency === "INR"
                  ? "bg-[#C8FF00] text-[#09090B] font-bold shadow-md"
                  : "text-[#9A9AA6] hover:text-[#F5F5F7]"
              }`}
            >
              INR (₹)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Options Panel (Left) */}
          <div className="lg:col-span-7 card-editorial p-6 sm:p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* 1. Service Type */}
              <div>
                <label className="block text-xs uppercase font-mono font-bold tracking-wider text-[#9A9AA6] mb-3">
                  1. Select Product Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    "Full-Stack Web Engineering",
                    "iOS / Android Mobile App",
                    "UI / UX Design & Prototyping",
                    "Brand Identity & Guidelines",
                    "Custom Full Suite",
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setEstService(t)}
                      className={`py-3 px-4 rounded-xl border text-left font-medium transition-all ${
                        estService === t
                          ? "border-[#C8FF00] bg-[#C8FF00]/[0.12] text-[#F5F5F7] font-semibold"
                          : "border-white/[0.08] bg-white/[0.02] text-[#9A9AA6] hover:border-white/20 hover:text-[#F5F5F7]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Complexity */}
              <div>
                <label className="block text-xs uppercase font-mono font-bold tracking-wider text-[#9A9AA6] mb-3">
                  2. Complexity Tier
                </label>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  {["MVP / Lightweight", "Scale-Up", "Enterprise / Custom"].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setEstScale(scale)}
                      className={`py-3 px-3 rounded-xl border font-medium text-center text-xs sm:text-sm transition-all ${
                        estScale === scale
                          ? "border-[#C8FF00] bg-[#C8FF00]/[0.12] text-[#F5F5F7] font-semibold"
                          : "border-white/[0.08] bg-white/[0.02] text-[#9A9AA6] hover:border-white/20 hover:text-[#F5F5F7]"
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Features Needed */}
              <div>
                <label className="block text-xs uppercase font-mono font-bold tracking-wider text-[#9A9AA6] mb-3">
                  3. Key Architectural Modules
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {featureOptions.map((feat) => {
                    const active = estFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`py-2 px-3.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                          active
                            ? "border-[#C8FF00] bg-[#C8FF00]/[0.15] text-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.2)]"
                            : "border-white/[0.08] bg-white/[0.02] text-[#9A9AA6] hover:border-white/20 hover:text-[#F5F5F7]"
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

            <div className="text-xs font-mono text-[#9A9AA6] pt-4 border-t border-white/[0.08] flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-[#C8FF00] shrink-0 mt-0.5" />
              Ballpark estimates reflect verified senior velocity rates. Our lead architect finalizes exact flat milestones during your 24h technical consultation.
            </div>
          </div>

          {/* Calculations Summary Panel (Right) */}
          <div className="lg:col-span-5 card-editorial p-6 sm:p-8 flex flex-col justify-between border-[#C8FF00]/30 shadow-2xl">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/[0.08]">
                <div className="text-xs uppercase font-mono font-bold tracking-wider text-[#C8FF00]">
                  Live Scope Breakdown
                </div>
                <h4 className="text-xl font-bold font-display mt-2 text-[#F5F5F7]">{estService}</h4>
                <div className="text-xs font-mono text-[#9A9AA6] mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.1] text-[#F5F5F7]">
                    Tier: {estScale}
                  </span>
                  <span>•</span>
                  <span>Currency: {currency}</span>
                </div>
              </div>

              {/* Price & Timeline */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-[#9A9AA6] uppercase tracking-wider">
                    Projected Milestone Range
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#C8FF00] font-display mt-1 tabular-nums">
                    {getEstimate().range}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-[11px] font-mono text-[#9A9AA6] uppercase">Estimated Timeline</div>
                    <div className="text-base font-bold text-[#F5F5F7] mt-0.5 tabular-nums">
                      {getEstimate().timeline}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-[11px] font-mono text-[#9A9AA6] uppercase">Staging Builds</div>
                    <div className="text-base font-bold text-[#C8FF00] mt-0.5">Weekly Deploy</div>
                  </div>
                </div>

                {/* Squad Composition */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-mono text-[#9A9AA6] uppercase tracking-wider">
                    Dedicated Sprint Squad
                  </div>
                  <ul className="space-y-1.5 text-xs font-mono text-[#9A9AA6]">
                    {getEstimate().team.map((member, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#C8FF00] shrink-0" />
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
                className="btn-lime w-full min-h-[48px] flex items-center justify-center gap-2 group text-sm font-bold shadow-xl"
              >
                <span>Apply to Project Scope Inquiry</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: EDITORIAL 2-COLUMN PROJECT SHOWCASE ---------------- */}
      <section id="portfolio" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Verified Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Recent shipped <span className="text-[#C8FF00]">production releases</span>
          </h2>
          <p className="text-[#9A9AA6] text-base sm:text-lg">
            Explore software platforms and digital experiences engineered on behalf of ambitious founders.
          </p>

          {/* Filter Tabs (Horizontal Scroll on Mobile) */}
          <div className="flex flex-nowrap overflow-x-auto justify-start sm:justify-center gap-2 pt-4 pb-2">
            {["All", "Web SaaS", "Mobile Apps", "UI/UX & Brand"].map((tab) => (
              <button
                key={tab}
                onClick={() => setPortfolioFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                  portfolioFilter === tab
                    ? "bg-[#C8FF00] text-[#09090B] shadow-md font-bold"
                    : "bg-white/[0.04] text-[#9A9AA6] hover:text-[#F5F5F7] hover:bg-white/[0.08]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Large Editorial 2-Column Project Rows */}
        <div className="space-y-16">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="card-editorial p-6 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
            >
              {/* Media Preview (Order -1 on Mobile <= 920px) */}
              <div className="lg:col-span-7 order-first lg:order-last">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-[#121217]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-60" />

                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#09090B]/80 backdrop-blur-md border border-white/[0.1] text-[#C8FF00] font-bold">
                      {proj.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#09090B]/80 backdrop-blur-md border border-white/[0.1] text-[#F5F5F7]">
                      {proj.stat}
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#C8FF00]/20 backdrop-blur-md border border-[#C8FF00]/40 text-[#C8FF00] font-bold">
                      {proj.highlight}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-[#9A9AA6]">
                  <span className="text-[#C8FF00] font-bold">{proj.index}</span>
                  <span>Client: {proj.client}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F7] tracking-tight group-hover:text-[#C8FF00] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm text-[#9A9AA6] leading-relaxed">
                  {proj.desc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[#F5F5F7]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => scrollTo("#contact", { offset: -80 })}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C8FF00] hover:underline"
                  >
                    <span>Request Architecture Similar to This</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 8: TESTIMONIALS & TRUST ---------------- */}
      <section className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
            <Star className="h-3.5 w-3.5 fill-[#C8FF00]" />
            Verified Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Trusted by venture-backed <span className="text-[#C8FF00]">founders</span>
          </h2>
          <p className="text-[#9A9AA6] text-base sm:text-lg">
            See what engineering leaders and founders experience when building with ZyphorZone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="card-editorial p-8 flex flex-col justify-between group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#C8FF00]/10 text-[#C8FF00] border border-[#C8FF00]/20">
                    {t.result}
                  </span>
                </div>
                <p className="text-sm text-[#9A9AA6] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 border-t border-white/[0.08] mt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover border-2 border-[#C8FF00]/40 ring-1 ring-white/10"
                />
                <div>
                  <div className="text-sm font-bold text-[#F5F5F7] font-display">{t.name}</div>
                  <div className="text-xs font-mono text-[#9A9AA6]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 9: LEADERSHIP & CORE SQUAD ---------------- */}
      <section className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
            <Users className="h-3.5 w-3.5" />
            Senior Engineering Collective
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Led by verified <span className="text-[#C8FF00]">systems architects</span>
          </h2>
          <p className="text-[#9A9AA6] text-base sm:text-lg">
            Direct access to senior talent who write production code and take personal ownership of your launch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipTeam.map((lead) => (
            <div key={lead.name} className="card-editorial p-6 space-y-4 text-center group">
              <img
                src={lead.avatar}
                alt={lead.name}
                loading="lazy"
                className="h-24 w-24 rounded-full mx-auto object-cover border-2 border-white/[0.1] group-hover:border-[#C8FF00] transition-colors"
              />
              <div>
                <h4 className="text-lg font-bold font-display text-[#F5F5F7]">{lead.name}</h4>
                <div className="text-xs font-mono text-[#C8FF00] mt-0.5">{lead.role}</div>
                <div className="text-xs text-[#9A9AA6] mt-1">{lead.specialty}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 10: FAQ ACCORDION ---------------- */}
      <section className="py-24 relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
            <HelpCircle className="h-3.5 w-3.5" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#9A9AA6] text-base">
            Everything you need to know about our senior managed collective workflow.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="card-editorial rounded-2xl border border-white/[0.08] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#F5F5F7]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#C8FF00] shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#9A9AA6] leading-relaxed border-t border-white/[0.04] animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- SECTION 11: INQUIRY & CONTACT FORM ---------------- */}
      <section id="contact" className="py-24 relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Direct Studio Inquiry
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight text-[#F5F5F7]">
              Ready to ship? <br />
              Let's map out <br />
              <span className="text-[#C8FF00]">your technical scope.</span>
            </h2>

            <p className="text-[#9A9AA6] text-sm sm:text-base leading-relaxed">
              Send us your project overview. Our senior engineering lead replies within 24 hours with an architectural
              plan and transparent milestone pricing.
            </p>

            <ul className="space-y-4 pt-6 border-t border-white/[0.08]">
              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] grid place-items-center text-[#C8FF00] shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#9A9AA6]">Email Direct</div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm font-mono font-semibold text-[#F5F5F7] hover:text-[#C8FF00] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] grid place-items-center text-[#C8FF00] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#9A9AA6]">WhatsApp / Call</div>
                  <a
                    href={`tel:${siteConfig.phoneClean}`}
                    className="text-sm font-mono font-semibold text-[#F5F5F7] hover:text-[#C8FF00] transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] grid place-items-center text-[#C8FF00] shrink-0">
                  <Instagram className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#9A9AA6]">Instagram Direct</div>
                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-mono font-semibold text-[#F5F5F7] hover:text-[#C8FF00] transition-colors"
                  >
                    {siteConfig.instagram.handle}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] grid place-items-center text-[#9A9AA6] shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#9A9AA6]">Studio Location</div>
                  <span className="text-sm font-mono text-[#F5F5F7]">{siteConfig.location}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Shared Inquiry Form Component */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- DYNAMIC MULTI-STACK DEVELOPER SANDBOX ---------------- */
function InteractiveDeveloperSandbox() {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "mobile" | "telemetry">("frontend");
  const [clickCount, setClickCount] = useState(42);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "➜  Next.js 15: Edge runtime initialized (8ms)",
    "➜  Supabase: PostgreSQL cluster verified",
    "✔  Security: RLS policies enforced (12 tables)",
    "➜  Telemetry: Active sync across 18 nodes",
    "✔  Build: Zero errors, bundle size 118 kB",
    "➜  State: 99.99% operational across all edge zones",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [logs.length]);

  return (
    <div className="w-full card-editorial rounded-3xl overflow-hidden shadow-2xl relative select-none border border-white/[0.12] bg-[#121217]/95 backdrop-blur-2xl">
      {/* Top Window Bar */}
      <div className="bg-[#181820] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
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
              activeTab === "frontend" ? "bg-[#C8FF00] text-[#09090B] font-bold" : "text-[#9A9AA6] hover:text-[#F5F5F7]"
            }`}
          >
            Frontend
          </button>
          <button
            onClick={() => setActiveTab("backend")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "backend" ? "bg-[#C8FF00] text-[#09090B] font-bold" : "text-[#9A9AA6] hover:text-[#F5F5F7]"
            }`}
          >
            Supabase
          </button>
          <button
            onClick={() => setActiveTab("mobile")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "mobile" ? "bg-[#C8FF00] text-[#09090B] font-bold" : "text-[#9A9AA6] hover:text-[#F5F5F7]"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === "telemetry" ? "bg-[#C8FF00] text-[#09090B] font-bold" : "text-[#9A9AA6] hover:text-[#F5F5F7]"
            }`}
          >
            Telemetry
          </button>
        </div>

        <div className="h-2 w-2 rounded-full bg-[#C8FF00] animate-pulse" />
      </div>

      {/* Main Sandbox Canvas */}
      <div className="p-6 space-y-5 min-h-[330px] flex flex-col justify-between">
        {/* TAB 1: FRONTEND INTERACTIVE COMPONENT */}
        {activeTab === "frontend" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9AA6] border-b border-white/[0.08] pb-2">
              <span className="text-[#C8FF00] font-semibold">src/components/SaaSDashboard.tsx</span>
              <span className="text-emerald-400 font-semibold">● React 19 Client</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F5F5F7] font-display">Live State Hydration</div>
                  <div className="text-[11px] font-mono text-[#9A9AA6]">Interactive Client Counter</div>
                </div>
                <span className="text-lg font-mono font-extrabold text-[#C8FF00] tabular-nums">{clickCount} Ops</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setClickCount((c) => c + 1)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#C8FF00] text-[#09090B] hover:bg-[#DCFF5C] text-xs font-bold transition-all active:scale-95 shadow-md"
                >
                  Trigger Event (+1)
                </button>
                <button
                  onClick={() => setClickCount(0)}
                  className="py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-[#9A9AA6]"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-[#9A9AA6]">
              <span className="text-[#C8FF00]">const</span> [state, setState] = <span className="text-[#F5F5F7]">useOptimistic</span>({clickCount});
            </div>
          </div>
        )}

        {/* TAB 2: BACKEND / SUPABASE SIMULATION */}
        {activeTab === "backend" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9AA6] border-b border-white/[0.08] pb-2">
              <span className="text-[#C8FF00] font-semibold">supabase.from('analytics').select('*')</span>
              <span className="text-emerald-400 font-semibold">● 200 OK (14ms)</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] font-mono text-xs space-y-1.5 text-slate-300">
              <div className="text-[#C8FF00]">{"{"}</div>
              <div className="pl-4"><span className="text-[#C8FF00]">"status"</span>: "healthy",</div>
              <div className="pl-4"><span className="text-[#C8FF00]">"cluster"</span>: "ap-south-1 (Mumbai)",</div>
              <div className="pl-4"><span className="text-[#C8FF00]">"active_connections"</span>: 148,</div>
              <div className="pl-4"><span className="text-[#C8FF00]">"rls_enforced"</span>: true</div>
              <div className="text-[#C8FF00]">{"}"}</div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#9A9AA6] pt-1">
              <span>PostgreSQL 16.2</span>
              <span className="text-[#C8FF00] font-semibold">0 Slow Queries</span>
            </div>
          </div>
        )}

        {/* TAB 3: MOBILE INTERACTIVE FRAME */}
        {activeTab === "mobile" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-mono text-[#9A9AA6] border-b border-white/[0.08] pb-2">
              <span className="text-[#C8FF00] font-semibold">iOS & Android Build Target</span>
              <span className="text-emerald-400 font-semibold">● 60 FPS Native</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#C8FF00] grid place-items-center text-[#09090B] font-bold">
                  📱
                </div>
                <div>
                  <div className="text-xs font-bold text-[#F5F5F7] font-display">Apex Mobile Runtime</div>
                  <div className="text-[11px] font-mono text-[#9A9AA6]">React Native 0.76 • Hermes Engine</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs flex justify-between items-center font-mono">
                <span className="text-[#9A9AA6]">Biometrics Authentication</span>
                <span className="text-[#C8FF00] font-bold">Active (FaceID)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TELEMETRY & LOGS */}
        {activeTab === "telemetry" && (
          <div className="space-y-3 animate-in fade-in duration-200 font-mono text-xs">
            <div className="flex items-center justify-between text-xs text-[#9A9AA6] border-b border-white/[0.08] pb-2">
              <span className="text-[#C8FF00] font-semibold">Vercel Edge Telemetry</span>
              <span className="text-emerald-400 font-semibold">● 99.99% Uptime</span>
            </div>

            <div className="space-y-1.5 min-h-[140px] flex flex-col justify-center">
              {logs.slice(0, logIndex + 1).map((log, i) => (
                <div
                  key={log}
                  className={`transition-all duration-300 ${
                    i === logIndex
                      ? "text-[#C8FF00] font-bold translate-x-1"
                      : log.startsWith("✔")
                        ? "text-emerald-400"
                        : "text-[#9A9AA6]"
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
            <div className="h-6 w-6 rounded-lg bg-[#C8FF00] grid place-items-center text-[10px] font-black text-[#09090B]">
              Z
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9A9AA6]">
                Engine Architecture
              </div>
              <div className="text-xs font-bold text-[#F5F5F7] font-display">
                Next.js 15 + Supabase + React Native
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00]">
            Live Demo
          </span>
        </div>
      </div>
    </div>
  );
}
