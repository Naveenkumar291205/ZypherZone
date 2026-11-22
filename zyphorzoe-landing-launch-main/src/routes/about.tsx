import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Users, Target, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — ZyphorZone Senior Collective" },
      {
        name: "description",
        content:
          "ZyphorZone is a managed senior engineering collective delivering high-performance software, mobile apps, and brand design systems without agency overhead.",
      },
      { property: "og:title", content: "About Us — ZyphorZone" },
      {
        property: "og:description",
        content: "Learn about our philosophy, engineering standards, and the vetted collective behind ZyphorZone.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      eyebrow="Studio Philosophy"
      title="Engineering Excellence. Zero Bureaucracy."
      subtitle="A senior-managed collective built to eliminate agency bloat, unverified marketplace churn, and endless discovery cycles."
    >
      <div className="space-y-6 text-[#9A9AA6] text-base sm:text-lg leading-relaxed">
        <p>
          Traditional software agencies operate on massive overhead: multi-tiered account executives, bloated discovery
          phases, and junior developers executing behind senior pitches. On the opposite end, open freelance
          marketplaces suffer from communication drop-offs, inconsistent code standards, and ambiguous intellectual
          property rights.
        </p>
        <p>
          <strong className="text-[#F5F5F7]">ZyphorZone was founded to challenge this broken paradigm.</strong> We
          operate as an elite, hand-picked collective of senior software engineers, cloud architects, and UI/UX product
          designers who have shipped production systems at scale.
        </p>
        <p>
          When you partner with ZyphorZone, you work directly with dedicated technical leads. Every sprint is backed by
          automated CI/CD pipelines, weekly live staging builds, and complete IP handover guaranteed upon milestone
          completion.
        </p>
      </div>

      {/* Core Standards Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14">
        {[
          {
            icon: Target,
            title: "Purpose-Built Squads",
            desc: "Every project is staffed with senior architects and verified specialists matched precisely to your technical requirements.",
          },
          {
            icon: Sparkles,
            title: "Strict Performance SLAs",
            desc: "Sub-150ms P99 latency, 100/100 Lighthouse performance, strict TypeScript types, and comprehensive automated test coverage.",
          },
          {
            icon: Users,
            title: "Direct Git & Staging Access",
            desc: "No opaque progress reports. You receive real-time GitHub commits, staging deployments, and direct Slack/Discord access.",
          },
          {
            icon: Zap,
            title: "Predictable Milestone Delivery",
            desc: "Fixed flat milestone billing with zero surprise hourly creep and guaranteed 24-hour technical scope turnaround.",
          },
        ].map((v) => (
          <div key={v.title} className="card-editorial p-7 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="h-11 w-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:border-[#C8FF00]/40 transition-colors">
                <v.icon className="h-5 w-5 text-[#C8FF00]" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl font-display text-[#F5F5F7] tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm text-[#9A9AA6] leading-relaxed">{v.desc}</p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] mt-6 flex items-center gap-2 text-xs font-mono text-[#C8FF00]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Standard
            </div>
          </div>
        ))}
      </div>

      {/* Action Box */}
      <div className="mt-16 card-editorial p-8 md:p-12 text-center border-[#C8FF00]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8FF00]/5 rounded-full blur-3xl pointer-events-none" />
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F7] tracking-tight">
          Ready to engineer your next software release?
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[#9A9AA6] max-w-xl mx-auto leading-relaxed">
          Submit your product specifications. Our technical lead will deliver a comprehensive architecture blueprint and
          transparent milestone breakdown within 24 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" hash="estimator" className="btn-lime text-xs sm:text-sm font-bold">
            <span>Calculate Project Scope</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-ghost text-xs sm:text-sm font-medium">
            <span>Direct Consultation</span>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-matrix" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A9AA6] hover:text-[#C8FF00] transition-colors mb-8 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Overview
        </Link>
        {eyebrow && (
          <div className="text-xs font-mono uppercase tracking-widest text-[#C8FF00] mb-2 font-semibold">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#F5F5F7] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[#9A9AA6] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-12 border-t border-white/[0.08] pt-10">{children}</div>
      </div>
    </div>
  );
}
