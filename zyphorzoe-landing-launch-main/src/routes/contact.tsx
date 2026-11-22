import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "./about";
import { Mail, Instagram, MapPin, Phone, ArrowRight, Zap, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ZyphorZone Engineering Collective" },
      { name: "description", content: "Get in touch with the ZyphorZone team for project consultations, technical scopes, and partnerships. Innovate • Build • Elevate." },
      { property: "og:title", content: "Contact Us — ZyphorZone" },
      { property: "og:description", content: "Connect directly with our engineering and design leads." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell
      title="Connect with Us"
      subtitle="Have an engineering or design requirement? We respond within 24 hours with a comprehensive technical scope and architectural plan."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <a
          href="mailto:Zypherzone07@gmail.com"
          className="card-3d p-6 flex flex-col justify-between group"
        >
          <div className="icon-3d h-11 w-11 flex items-center justify-center mb-4">
            <Mail className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
          </div>
          <div>
            <div className="font-bold text-foreground font-display">Email Direct</div>
            <div className="text-xs text-muted-foreground break-all mt-1">Zypherzone07@gmail.com</div>
          </div>
          <div className="pt-4 border-t border-white/[0.08] mt-4 text-xs text-primary font-semibold flex items-center gap-1">
            Send Email <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        <a
          href="tel:+916385235131"
          className="card-3d p-6 flex flex-col justify-between group"
        >
          <div className="icon-3d h-11 w-11 flex items-center justify-center mb-4">
            <Phone className="h-5 w-5 text-accent group-hover:text-primary transition-colors" />
          </div>
          <div>
            <div className="font-bold text-foreground font-display">WhatsApp / Phone</div>
            <div className="text-xs text-muted-foreground mt-1">+91 63852 35131</div>
          </div>
          <div className="pt-4 border-t border-white/[0.08] mt-4 text-xs text-accent font-semibold flex items-center gap-1">
            Call / Message <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        <a
          href="https://instagram.com/_zyphor.dev_"
          target="_blank"
          rel="noreferrer"
          className="card-3d p-6 flex flex-col justify-between group"
        >
          <div className="icon-3d h-11 w-11 flex items-center justify-center mb-4">
            <Instagram className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
          </div>
          <div>
            <div className="font-bold text-foreground font-display">Instagram</div>
            <div className="text-xs text-muted-foreground mt-1">@_zyphor.dev_</div>
          </div>
          <div className="pt-4 border-t border-white/[0.08] mt-4 text-xs text-primary font-semibold flex items-center gap-1">
            Follow & DM <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        <div className="card-3d p-6 flex flex-col justify-between">
          <div className="icon-3d h-11 w-11 flex items-center justify-center mb-4">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-bold text-foreground font-display">HQ Location</div>
            <div className="text-xs text-muted-foreground mt-1">Coimbatore, Tamil Nadu, India</div>
          </div>
          <div className="pt-4 border-t border-white/[0.08] mt-4 text-xs text-muted-foreground font-semibold flex items-center gap-1">
            Global Remote Squad
          </div>
        </div>
      </div>

      <div className="card-3d p-8 md:p-12 text-center bg-gradient-to-b from-surface-elevated to-surface border-primary/30 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <Zap className="h-3.5 w-3.5" />
          Instant Cost Calculator
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display mb-2 text-foreground">
          Want a real-time ballpark estimate before contacting?
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Use our interactive Scope Configurator on the home page to select your domain, tech stack, and complexity to calculate estimated sprint weeks and costs.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" hash="estimator" className="btn-primary flex items-center gap-2 text-sm">
            <span>Open Scope Configurator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/" hash="contact" className="btn-ghost text-sm">
            <span>Direct Inquiry Form</span>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
