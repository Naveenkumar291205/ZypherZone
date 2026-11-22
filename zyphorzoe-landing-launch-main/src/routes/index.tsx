import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  Code2,
  Palette,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Users,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Check,
  CheckCircle2,
  Activity,
  Layers,
  Zap,
  HelpCircle,
  Database,
  ChevronDown,
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

function LandingPage() {
  const { scrollTo } = useLenisControl();

  // Scope Estimator State matching Reference 2
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [domainValue, setDomainValue] = useState<number>(2500); // 900, 2500, 3000, 2200
  const [domainLabel, setDomainLabel] = useState<string>("Web application / SaaS");
  const [complexity, setComplexity] = useState<number>(1.0); // 1, 1.5, 2.2
  const [complexityLabel, setComplexityLabel] = useState<string>("Standard");
  const [features, setFeatures] = useState<Array<{ id: string; label: string; val: number; w: number }>>([
    { id: "auth", label: "Authentication", val: 400, w: 1 },
    { id: "dash", label: "Admin dashboard", val: 350, w: 1 },
  ]);

  // Project Category Filter matching Reference 2
  const [projectCat, setProjectCat] = useState<string>("All");

  // Sticky How We Build State (7 Steps from Reference 2)
  const [activeStep, setActiveStep] = useState(0);
  const stepCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Estimator Calculations
  const rate = currency === "INR" ? 83 : 1;
  const sym = currency === "INR" ? "₹" : "$";
  const addVal = features.reduce((acc, f) => acc + f.val, 0);
  const addW = features.reduce((acc, f) => acc + f.w, 0);
  const tot = (domainValue + addVal) * complexity;
  const lo = tot * 0.85 * rate;
  const hi = tot * 1.15 * rate;
  const wk = Math.max(1, Math.round((domainValue / 300 + addW * 1.2) * complexity));

  const formatCost = (num: number) => {
    if (currency === "INR") {
      const rounded = Math.round(num / 1000) * 1000;
      return sym + rounded.toLocaleString("en-IN");
    }
    const rounded = Math.round(num / 100) * 100;
    return sym + rounded.toLocaleString("en-US");
  };

  const costRangeString = `${formatCost(lo)} – ${formatCost(hi)}`;
  const timelineString = `${wk}–${wk + 3} weeks`;
  const teamString = "1 designer, 1–2 developers, 1 QA / PM";

  const handleUseEstimate = () => {
    const summary = `Scope estimate: ${domainLabel}, ${complexityLabel} complexity, features: ${
      features.map((f) => f.label).join(", ") || "none"
    }. Indicative range ${costRangeString}, ${timelineString}.`;

    let projType = "Web application";
    if (domainValue === 900) projType = "Website";
    else if (domainValue === 3000) projType = "Mobile app";
    else if (domainValue === 2200) projType = "Other";

    window.dispatchEvent(
      new CustomEvent("zyphor:apply-estimate", {
        detail: {
          serviceType: projType,
          details: summary,
        },
      })
    );

    scrollTo("#contact", { offset: -90 });
  };

  // Scroll focal tracking for the 7 steps
  useEffect(() => {
    const handleScroll = () => {
      const focal = window.innerHeight * 0.42;
      let closest = 0;
      let minDis = Infinity;
      stepCardsRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.4;
        const dis = Math.abs(center - focal);
        if (dis < minDis) {
          minDis = dis;
          closest = i;
        }
      });
      setActiveStep(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featureOptionsList = [
    { id: "auth", label: "Authentication", val: 400, w: 1 },
    { id: "pay", label: "Payments", val: 500, w: 1 },
    { id: "dash", label: "Admin dashboard", val: 350, w: 1 },
    { id: "analytics", label: "Analytics", val: 300, w: 0.5 },
    { id: "api", label: "API integrations", val: 450, w: 1 },
  ];

  const filteredProjects =
    projectCat === "All"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.cat.toLowerCase() === projectCat.toLowerCase());

  return (
    <div className="relative z-10 w-full overflow-x-clip text-[#F5F5F7]">
      {/* ---------------- SECTION: HERO (#home) ---------------- */}
      <section
        id="home"
        className="relative min-h-[92svh] flex flex-col justify-center pt-28 sm:pt-36 pb-20 overflow-hidden text-center"
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#09090B] opacity-90" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 tech-grid opacity-30" />
          <div className="absolute inset-0 film-grain pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Location / Tech Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-xs font-mono text-[#9A9AA6] backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#C8FF00] animate-ping" />
            <span className="text-[#F5F5F7] font-medium">Technology company · Coimbatore, India</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-[clamp(2.5rem,6.8vw,5.6rem)] font-extrabold tracking-[-0.035em] text-[#F5F5F7] font-display leading-[1.08] max-w-4xl mx-auto">
            Building Digital Experiences That{" "}
            <span className="text-[#C8FF00] drop-shadow-[0_0_35px_rgba(200,255,0,0.35)]">
              Move Businesses Forward.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg md:text-xl text-[#9A9AA6] leading-relaxed max-w-2xl mx-auto">
            ZyphorZone transforms ideas into innovative digital solutions through modern technologies, creative
            thinking, and reliable engineering.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("#contact", { offset: -90 })}
              className="btn-lime text-sm font-bold shadow-lg"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo("#projects", { offset: -90 })}
              className="btn-ghost text-sm font-medium"
            >
              <span>Explore Our Work</span>
            </button>
          </div>


        </div>
      </section>

      {/* ---------------- MARQUEE STRIP ---------------- */}
      <div className="relative overflow-hidden w-full py-4 border-y border-white/[0.08] bg-[#0A0A0E] mask-radial-edges">
        <div className="flex animate-marquee gap-8 whitespace-nowrap font-mono text-xs font-semibold tracking-widest text-[#9A9AA6] uppercase">
          {[
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Supabase",
            "MongoDB",
            "Node.js",
            "React Native",
            "UI/UX Design",
            "Cloud",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Supabase",
            "MongoDB",
            "Node.js",
            "React Native",
            "UI/UX Design",
            "Cloud",
          ].map((item, idx) => (
            <span key={`${item}-${idx}`} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8FF00]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- STATS STRIP ---------------- */}
      <section className="py-12 border-b border-white/[0.08] bg-[#0E0E12]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {siteConfig.stats.map((s, i) => (
              <div key={s.label} className={`space-y-1 ${i > 0 ? "pt-4 lg:pt-0 lg:pl-6" : ""}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#F5F5F7] tracking-tight tabular-nums">
                  <span className="text-[#C8FF00]">{s.value}</span>
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F5F7]">
                  {s.label}
                </div>
                <div className="text-xs text-[#9A9AA6]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 01: ABOUT ZYPHORZONE (#about) ---------------- */}
      <section id="about" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
            01 / About ZyphorZone
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Turning Ideas Into <span className="text-[#C8FF00]">Intelligent Digital Solutions.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9A9AA6] leading-relaxed">
            We are a technology team that designs and builds web, mobile and backend products. We work closely with
            clients, choose modern tools that fit the problem, and stay accountable from first call to launch and beyond.
          </p>
        </div>

        {/* 3 Core Cards from Reference 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-editorial p-8 rounded-3xl space-y-4 group">
            <div className="text-3xl h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] grid place-items-center">
              🎯
            </div>
            <h3 className="text-xl font-bold font-display text-[#F5F5F7]">Our Mission</h3>
            <p className="text-sm text-[#9A9AA6] leading-relaxed">
              To help businesses grow with dependable, well-designed software delivered through transparent collaboration.
            </p>
          </div>

          <div className="card-editorial p-8 rounded-3xl space-y-4 group">
            <div className="text-3xl h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] grid place-items-center">
              🔭
            </div>
            <h3 className="text-xl font-bold font-display text-[#F5F5F7]">Our Vision</h3>
            <p className="text-sm text-[#9A9AA6] leading-relaxed">
              To be a trusted technology partner known for quality engineering and thoughtful user experiences.
            </p>
          </div>

          <div className="card-editorial p-8 rounded-3xl space-y-4 group">
            <div className="text-3xl h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] grid place-items-center">
              🤝
            </div>
            <h3 className="text-xl font-bold font-display text-[#F5F5F7]">Our Commitment</h3>
            <p className="text-sm text-[#9A9AA6] leading-relaxed">
              Honest scoping, regular updates, and software built to last and to scale.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 02: WHY ZYPHORZONE (#why) ---------------- */}
      <section id="why" className="py-24 relative bg-[#0E0E12] border-y border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
              02 / Why ZyphorZone
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
              Built on <span className="text-[#C8FF00]">strong fundamentals</span>
            </h2>
          </div>

          {/* 7 Fundamentals Grid - 7th card spans 2 columns so zero orphan gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.whyFundamentals.map((item, idx) => {
              const isLast = idx === siteConfig.whyFundamentals.length - 1;
              return (
                <div
                  key={item.title}
                  className={`card-editorial p-7 rounded-3xl space-y-3 group ${
                    isLast ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <h3 className="text-lg font-bold font-display text-[#F5F5F7] group-hover:text-[#C8FF00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9A9AA6] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* ---------------- SECTION 03: SERVICES & CAPABILITIES (#services) ---------------- */}
      <section id="services" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
            03 / Services & Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            What we <span className="text-[#C8FF00]">build</span>
          </h2>
        </div>

        {/* 6 Services Bento Grid matching Reference 2 (#svc) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((svc, i) => {
            const isSpan2 = i === 0 || i === 3;
            return (
              <div
                key={svc.title}
                className={`card-editorial p-8 rounded-3xl flex flex-col justify-between group ${
                  isSpan2 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="text-3xl h-14 w-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] grid place-items-center">
                    {svc.ico}
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#F5F5F7] group-hover:text-[#C8FF00] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[#9A9AA6] leading-relaxed max-w-xl">{svc.desc}</p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#F5F5F7]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTo("#contact", { offset: -90 })}
                    className="text-xs font-mono font-bold text-[#C8FF00] hover:underline flex items-center gap-1"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- SECTION 04: HOW WE BUILD (#how) ---------------- */}
      <section id="how" className="py-24 relative bg-[#0E0E12] border-y border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Desktop Left Sticky HUD (`top: 114px`) */}
            <div className="lg:col-span-5 lg:sticky lg:top-[114px] z-30">
              {/* Mobile Flush Sticky HUD */}
              <div className="lg:hidden sticky top-[74px] -mx-4 px-4 py-3 bg-[#09090B]/90 backdrop-blur-xl border-y border-white/[0.08] flex items-center justify-between z-30 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-extrabold text-[#C8FF00]">
                    {siteConfig.sevenSteps[activeStep]?.num || "01"}
                  </span>
                  <span className="text-xs font-bold font-display text-[#F5F5F7] truncate max-w-[150px]">
                    {siteConfig.sevenSteps[activeStep]?.title}
                  </span>
                </div>
                <div className="flex gap-1 overflow-x-auto">
                  {siteConfig.sevenSteps.map((s, idx) => (
                    <button
                      key={s.num}
                      onClick={() => {
                        const el = stepCardsRef.current[idx];
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.scrollY - 160;
                          window.scrollTo({ top, behavior: "smooth" });
                        }
                      }}
                      className={`h-7 w-7 rounded-full text-[11px] font-mono shrink-0 transition-all ${
                        activeStep === idx
                          ? "bg-[#C8FF00] text-[#09090B] font-bold"
                          : "bg-white/[0.05] text-[#9A9AA6]"
                      }`}
                    >
                      {s.num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Sticky Column */}
              <div className="hidden lg:block card-editorial p-8 rounded-3xl space-y-6">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
                  04 / How We Build
                </div>
                <h2 className="text-3xl font-bold font-display text-[#F5F5F7] tracking-tight leading-snug">
                  A clear path from <br />
                  <span className="text-[#C8FF00]">idea to launch</span>
                </h2>
                <p className="text-sm text-[#9A9AA6] leading-relaxed">
                  Our structured seven-phase development process guarantees complete transparency and milestone accountability.
                </p>

                {/* Big Rolling Odometer Number */}
                <div className="py-4 border-y border-white/[0.08] flex items-baseline gap-4">
                  <div className="h-20 overflow-hidden">
                    <div
                      className="transition-transform duration-500 ease-out font-mono font-extrabold text-7xl text-[#C8FF00] leading-none"
                      style={{ transform: `translateY(-${activeStep * 80}px)` }}
                    >
                      {siteConfig.sevenSteps.map((s) => (
                        <div key={s.num} className="h-20 flex items-center">
                          {s.num}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-[#9A9AA6]">
                    Active Phase • {siteConfig.sevenSteps[activeStep]?.title}
                  </div>
                </div>

                {/* Clickable 01-07 Jump Pills */}
                <div className="grid grid-cols-4 gap-1.5 pt-2">
                  {siteConfig.sevenSteps.map((s, idx) => (
                    <button
                      key={s.num}
                      onClick={() => {
                        const el = stepCardsRef.current[idx];
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.scrollY - 130;
                          window.scrollTo({ top, behavior: "smooth" });
                        }
                      }}
                      className={`py-2 rounded-xl text-xs font-mono transition-all ${
                        activeStep === idx
                          ? "bg-[#C8FF00] text-[#09090B] font-bold shadow-md"
                          : "bg-white/[0.03] text-[#9A9AA6] hover:bg-white/[0.06] hover:text-[#F5F5F7]"
                      }`}
                    >
                      {s.num} {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Right Column: 7 Stacked Milestone Cards */}
            <div className="lg:col-span-7 space-y-8">
              {siteConfig.sevenSteps.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={s.num}
                    ref={(el) => {
                      stepCardsRef.current[idx] = el;
                    }}
                    className={`card-editorial p-8 rounded-3xl transition-all duration-500 ${
                      isActive
                        ? "border-[#C8FF00]/50 shadow-[0_0_35px_rgba(200,255,0,0.15)] opacity-100 scale-100"
                        : "opacity-40 scale-[0.98] border-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-2xl font-bold text-[#C8FF00]">{s.num}</span>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#9A9AA6]">
                        Phase {s.num}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-[#F5F5F7] tracking-tight mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#9A9AA6] leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 05: SCOPE ESTIMATOR (#estimator) ---------------- */}
      <section id="estimator" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
            05 / Scope Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            Get a <span className="text-[#C8FF00]">rough estimate</span>
          </h2>
          <p className="text-[#9A9AA6] text-base sm:text-lg">
            Indicative only – final pricing is confirmed after a discovery conversation.
          </p>
        </div>

        {/* 2-Column Estimator Grid matching Reference 2 (.est) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl">
          {/* Left Inputs Panel */}
          <div className="lg:col-span-7 card-editorial p-6 sm:p-8 rounded-3xl space-y-6">
            {/* Currency Select */}
            <div>
              <label className="block text-xs font-mono text-[#9A9AA6] uppercase mb-2">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "USD" | "INR")}
                className="input-editorial"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>

            {/* Product Domain Select */}
            <div>
              <label className="block text-xs font-mono text-[#9A9AA6] uppercase mb-2">Product Domain</label>
              <select
                value={domainValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDomainValue(val);
                  if (val === 900) setDomainLabel("Business website");
                  else if (val === 2500) setDomainLabel("Web application / SaaS");
                  else if (val === 3000) setDomainLabel("Mobile app");
                  else if (val === 2200) setDomainLabel("E-commerce platform");
                }}
                className="input-editorial"
              >
                <option value="900">Business website ($900 / ₹75k)</option>
                <option value="2500">Web application / SaaS ($2,500 / ₹2.07L)</option>
                <option value="3000">Mobile app ($3,000 / ₹2.49L)</option>
                <option value="2200">E-commerce platform ($2,200 / ₹1.82L)</option>
              </select>
            </div>

            {/* Complexity Select */}
            <div>
              <label className="block text-xs font-mono text-[#9A9AA6] uppercase mb-2">Complexity</label>
              <select
                value={complexity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setComplexity(val);
                  if (val === 1.0) setComplexityLabel("Standard");
                  else if (val === 1.5) setComplexityLabel("Advanced");
                  else if (val === 2.2) setComplexityLabel("Enterprise");
                }}
                className="input-editorial"
              >
                <option value="1">Standard (1.0x)</option>
                <option value="1.5">Advanced (1.5x)</option>
                <option value="2.2">Enterprise (2.2x)</option>
              </select>
            </div>

            {/* Features Checkboxes */}
            <div>
              <label className="block text-xs font-mono text-[#9A9AA6] uppercase mb-2">Features</label>
              <div className="flex flex-wrap gap-2">
                {featureOptionsList.map((f) => {
                  const isChecked = features.some((item) => item.id === f.id);
                  return (
                    <label
                      key={f.id}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono cursor-pointer transition-all ${
                        isChecked
                          ? "border-[#C8FF00] bg-[#C8FF00]/10 text-[#C8FF00] font-semibold"
                          : "border-white/[0.08] bg-white/[0.02] text-[#9A9AA6] hover:border-white/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setFeatures(features.filter((item) => item.id !== f.id));
                          } else {
                            setFeatures([...features, f]);
                          }
                        }}
                        className="sr-only"
                      />
                      <span>{isChecked ? "✔" : "+"}</span>
                      <span>{f.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 card-editorial p-6 sm:p-8 rounded-3xl flex flex-col justify-between border-[#C8FF00]/30 shadow-2xl">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C8FF00] font-bold">
                Estimated Cost
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#C8FF00] tabular-nums">
                {costRangeString}
              </div>
              <div className="text-sm font-mono text-[#F5F5F7]">{timelineString}</div>
              <div className="text-xs font-mono text-[#9A9AA6] pt-2 border-t border-white/[0.06]">
                Typical sprint team: <span className="text-[#F5F5F7]">{teamString}</span>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <button
                type="button"
                onClick={handleUseEstimate}
                className="btn-lime w-full min-h-[48px] text-sm font-bold shadow-lg"
              >
                Use in enquiry
              </button>
              <p className="text-[11px] font-mono text-[#9A9AA6] leading-relaxed">
                Estimate only, not a quote. INR uses an approximate conversion rate of ₹83 per $1.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 06: PROJECTS (#projects) ---------------- */}
      <section id="projects" className="py-24 relative bg-[#0E0E12] border-y border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
              06 / Projects
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
              Designed to solve <span className="text-[#C8FF00]">real problems.</span>
            </h2>
            <p className="text-[#9A9AA6] text-base sm:text-lg">
              Each project starts with a brief and ends with something you can use. These are concept builds that show
              our approach; client case studies will be added as they are approved.
            </p>

            {/* Category Chips matching Reference 2 */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["All", "Web Apps", "Mobile", "Platforms", "E-commerce"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectCat(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                    projectCat === cat
                      ? "bg-[#C8FF00] text-[#09090B] font-bold shadow-md"
                      : "bg-white/[0.04] text-[#9A9AA6] hover:text-[#F5F5F7]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Project Grid matching Reference 2 (#proj) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p) => (
              <div key={p.title} className="card-editorial p-6 sm:p-8 rounded-3xl space-y-5 group">
                {/* Thumb Banner */}
                <div className="h-44 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#181824] to-[#101018] grid place-items-center font-display font-bold text-lg sm:text-xl text-[#F5F5F7] group-hover:border-[#C8FF00]/40 transition-colors">
                  {p.title}
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C8FF00] font-bold uppercase tracking-wider">{p.cat}</span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#9A9AA6]">
                    Concept build
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F5F5F7]">{p.title}</h3>

                <div className="space-y-2 text-sm text-[#9A9AA6]">
                  <p>
                    <strong className="text-[#F5F5F7]">The brief.</strong> {p.brief}
                  </p>
                  <p>
                    <strong className="text-[#F5F5F7]">The build.</strong> {p.build}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#F5F5F7]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 07: LEADERSHIP TEAM (#team) ---------------- */}
      <section id="team" className="py-24 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
            07 / Leadership Team
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
            The people <span className="text-[#C8FF00]">behind ZyphorZone</span>
          </h2>
        </div>

        {/* 4 Founders from Reference 2 (#tm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.team.map((m) => (
            <div key={m.name} className="card-editorial p-6 rounded-3xl space-y-4 group">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#1A1A24] to-[#12121A] border border-dashed border-white/[0.15] grid place-items-center font-display font-bold text-3xl sm:text-4xl text-[#C8FF00] group-hover:border-[#C8FF00]/60 transition-colors">
                {m.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-[#F5F5F7]">{m.name}</h3>
                <div className="text-xs font-mono text-[#C8FF00] mt-1">{m.role}</div>
                <p className="text-xs text-[#9A9AA6] mt-2 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 08: FAQ (#faq) ---------------- */}
      <section className="py-24 relative bg-[#0E0E12] border-y border-white/[0.08]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4 text-center">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
              08 / FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#F5F5F7]">
              Common <span className="text-[#C8FF00]">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {siteConfig.faqs.map((faq, idx) => {
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
                    <span className="font-display font-bold text-base sm:text-lg text-[#F5F5F7]">{faq.q}</span>
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
        </div>
      </section>

      {/* ---------------- CALLOUT BAND (from Reference 2 .band) ---------------- */}
      <section className="py-16 relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="card-editorial p-8 sm:p-14 rounded-3xl text-center space-y-6 border-[#C8FF00]/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#13131A] to-[#0E0E14]">
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-[#F5F5F7] tracking-tight leading-tight">
            Want a build like these? <br />
            <span className="text-[#C8FF00]">Let’s talk about your project.</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("#contact", { offset: -90 })}
              className="btn-lime text-sm font-bold shadow-lg"
            >
              <span>Book a Free Call</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo("#estimator", { offset: -90 })}
              className="btn-ghost text-sm font-medium"
            >
              <span>Get a rough estimate</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 09: CONTACT (#contact) ---------------- */}
      <section id="contact" className="py-24 relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Get In Touch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8FF00] font-semibold">
                09 / Contact
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F5F5F7]">
                Let’s build <span className="text-[#C8FF00]">something great</span>
              </h2>
            </div>

            <div className="card-editorial p-6 sm:p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-bold font-display text-[#F5F5F7]">Get in touch</h3>
              <div className="space-y-3 text-sm font-mono text-[#9A9AA6]">
                <p className="flex items-center gap-3">
                  <span className="text-base">✉️</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-[#F5F5F7] hover:text-[#C8FF00] transition-colors">
                    {siteConfig.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-base">📞</span>
                  <a href={`tel:${siteConfig.phoneClean}`} className="text-[#F5F5F7] hover:text-[#C8FF00] transition-colors">
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-base">📍</span>
                  <span className="text-[#F5F5F7]">{siteConfig.location}</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-base">📸</span>
                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F5F5F7] hover:text-[#C8FF00] transition-colors"
                  >
                    {siteConfig.instagram.handle}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Shared Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
