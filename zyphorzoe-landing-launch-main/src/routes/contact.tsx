import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./about";
import { Mail, Instagram, MapPin, Phone, ArrowRight, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { InquiryForm } from "@/components/InquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ZyphorZone Engineering Collective" },
      {
        name: "description",
        content:
          "Connect directly with ZyphorZone senior engineering leads for project consultations, architectural reviews, and technical scoping.",
      },
      { property: "og:title", content: "Contact Us — ZyphorZone" },
      {
        property: "og:description",
        content: "Connect directly with our senior engineering leads. Guaranteed 24h scope turnaround.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell
      eyebrow="Direct Studio Access"
      title="Initiate Technical Dialogue"
      subtitle="Connect directly with our engineering and design leads. We return an architectural blueprint and flat milestone breakdown within 24 hours."
    >
      {/* 4 Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        <a
          href={`mailto:${siteConfig.email}`}
          className="card-editorial p-6 flex flex-col justify-between group"
        >
          <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-[#C8FF00]/40 transition-colors">
            <Mail className="h-4 w-4 text-[#C8FF00]" />
          </div>
          <div>
            <div className="font-bold text-[#F5F5F7] font-display text-sm">Email Direct</div>
            <div className="text-xs font-mono text-[#9A9AA6] break-all mt-1">{siteConfig.email}</div>
          </div>
          <div className="pt-3 border-t border-white/[0.06] mt-4 text-xs font-mono text-[#C8FF00] flex items-center gap-1">
            Send Inquiries <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        <a
          href={`tel:${siteConfig.phoneClean}`}
          className="card-editorial p-6 flex flex-col justify-between group"
        >
          <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-[#C8FF00]/40 transition-colors">
            <Phone className="h-4 w-4 text-[#C8FF00]" />
          </div>
          <div>
            <div className="font-bold text-[#F5F5F7] font-display text-sm">WhatsApp / Voice</div>
            <div className="text-xs font-mono text-[#9A9AA6] mt-1">{siteConfig.phone}</div>
          </div>
          <div className="pt-3 border-t border-white/[0.06] mt-4 text-xs font-mono text-[#C8FF00] flex items-center gap-1">
            Direct Reach <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        <a
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noreferrer"
          className="card-editorial p-6 flex flex-col justify-between group"
        >
          <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-[#C8FF00]/40 transition-colors">
            <Instagram className="h-4 w-4 text-[#C8FF00]" />
          </div>
          <div>
            <div className="font-bold text-[#F5F5F7] font-display text-sm">Instagram Direct</div>
            <div className="text-xs font-mono text-[#9A9AA6] mt-1">{siteConfig.instagram.handle}</div>
          </div>
          <div className="pt-3 border-t border-white/[0.06] mt-4 text-xs font-mono text-[#C8FF00] flex items-center gap-1">
            Follow & DM <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        <div className="card-editorial p-6 flex flex-col justify-between">
          <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
            <MapPin className="h-4 w-4 text-[#C8FF00]" />
          </div>
          <div>
            <div className="font-bold text-[#F5F5F7] font-display text-sm">Studio Location</div>
            <div className="text-xs font-mono text-[#9A9AA6] mt-1">{siteConfig.location}</div>
          </div>
          <div className="pt-3 border-t border-white/[0.06] mt-4 text-xs font-mono text-[#9A9AA6]">
            Global Remote Squads
          </div>
        </div>
      </div>

      {/* Shared Inquiry Form */}
      <div className="mt-8">
        <InquiryForm />
      </div>
    </PageShell>
  );
}
