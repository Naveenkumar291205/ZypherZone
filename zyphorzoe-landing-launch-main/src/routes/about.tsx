import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Users, Target, Zap, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — ZyphorZone Elite Collective" },
      { name: "description", content: "ZyphorZone is a managed senior freelance collective engineering high-performance software, mobile apps, and brand design systems. Innovate • Build • Elevate." },
      { property: "og:title", content: "About Us — ZyphorZone" },
      { property: "og:description", content: "Learn about our philosophy, engineering standards, and the vetted collective behind ZyphorZone." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell
      title="About ZyphorZone"
      subtitle="Innovate • Build • Elevate. A senior-managed collective created to deliver agency-grade software engineering without agency bloat or corporate markups."
    >
      <div className="space-y-8 text-muted-foreground text-base sm:text-lg leading-relaxed">
        <p>
          Traditional software agencies operate on massive overheads: multi-tiered account executives, bloated discovery cycles, and junior developers executing behind senior pitches. On the other end, open freelance marketplaces are plagued by communication drops, inconsistent architectural standards, and unvetted codebases.
        </p>
        <p>
          <strong className="text-foreground">ZyphorZone was founded to challenge this broken paradigm.</strong> We operate as an elite managed collective of senior software engineers, cloud architects, UI/UX strategists, and performance marketers.
        </p>
        <p>
          When you partner with ZyphorZone, you work directly with dedicated senior engineering leads who write production-grade code, deploy weekly live staging builds, and ensure 100% intellectual property transfer upon milestone completion.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid sm:grid-cols-2 gap-6 mt-14">
        {[
          {
            icon: Target,
            title: "Our Mission",
            desc: "Empower ambitious founders, venture-backed startups, and growing enterprises with world-class digital craft and resilient cloud infrastructure.",
          },
          {
            icon: Sparkles,
            title: "Our Standards",
            desc: "Zero-compromise engineering: sub-150ms latency, strict TypeScript typing, responsive design tokens, and comprehensive automated CI/CD.",
          },
          {
            icon: Users,
            title: "The Collective",
            desc: "A hand-curated network of vetted senior specialists across Next.js, React Native, Supabase, PostgreSQL, and brand systems.",
          },
          {
            icon: Zap,
            title: "The Speed Advantage",
            desc: "Guaranteed 24-hour scope turnarounds, weekly staging builds, flat milestone billing, and complete intellectual property ownership.",
          },
        ].map((v) => (
          <div key={v.title} className="card-3d p-8 flex flex-col justify-between group">
            <div>
              <div className="icon-3d h-12 w-12 flex items-center justify-center mb-5">
                <v.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-bold text-xl font-display text-foreground">{v.title}</h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
            <div className="pt-5 border-t border-white/[0.08] mt-6 flex items-center gap-2 text-xs text-primary font-semibold">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Vetted Quality Standard
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="mt-16 card-3d p-8 md:p-12 text-center bg-gradient-to-b from-surface-elevated to-surface border-primary/30 shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
          Have an ambitious software project in mind?
        </h3>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Let’s discuss your technical requirements. We return a comprehensive scope breakdown within 24 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" hash="estimator" className="btn-primary flex items-center gap-2 text-sm">
            <span>Calculate Project Scope</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/" hash="contact" className="btn-ghost text-sm">
            <span>Book 24h Consultation</span>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-matrix" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-12 border-t border-white/[0.08] pt-10">{children}</div>
      </div>
    </div>
  );
}
