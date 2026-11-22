import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./about";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ZyphorZone" },
      {
        name: "description",
        content: "The contractual terms and governance that guide ZyphorZone engagements and intellectual property delivery.",
      },
      { property: "og:title", content: "Terms of Service — ZyphorZone" },
      { property: "og:description", content: "ZyphorZone terms of service." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell eyebrow="Legal Governance" title="Terms of Service" subtitle="Last updated: Q1 2026">
      <div className="space-y-8 text-[#9A9AA6] text-sm sm:text-base leading-relaxed max-w-3xl">
        <Section title="1. Agreement to Terms">
          By accessing zyphorzone.com or engaging our senior engineering collective, you acknowledge acceptance of these
          Terms of Service. If you disagree with any segment of these provisions, you must discontinue platform use and
          formal project inquiry.
        </Section>

        <Section title="2. Managed Freelance Delivery Framework">
          ZyphorZone operates as a managed engineering collective. Detailed technical scopes, milestones, acceptance
          criteria, timelines, and deliverables are formalized in mutually executed Statements of Work (SOWs) prior to
          sprint activation.
        </Section>

        <Section title="3. Financial Milestones & Invoicing">
          Engagements follow flat milestone pricing agreed in advance. Milestones are invoiced upon verified delivery to
          staging or production environments, payable within 7 calendar days. No arbitrary hourly fees or hidden scope
          markups are incurred without signed change orders.
        </Section>

        <Section title="4. 100% Intellectual Property Handover">
          Upon final milestone settlement, 100% of all custom software repositories, architectural blueprints, database
          migrations, design token systems, and intellectual property transfer entirely to the client. ZyphorZone retains
          portfolio showcase rights unless expressly restricted under a mutual NDA.
        </Section>

        <Section title="5. Non-Disclosure & Confidentiality">
          We treat client project specifications, wireframes, codebase repositories, and database schemas as strictly
          confidential. Mutual Non-Disclosure Agreements (NDAs) are executed prior to deep architectural discovery phases.
        </Section>

        <Section title="6. Limitation of Liability">
          To the maximum extent permitted by applicable law, ZyphorZone's total cumulative liability arising from any
          engagement shall not exceed the total fees paid by the client under the applicable Statement of Work.
        </Section>

        <Section title="7. Direct Contact">
          For legal inquiries or contractual clarifications, please reach our administrative team at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-[#C8FF00] hover:underline font-semibold font-mono">
            {siteConfig.email}
          </a>.
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-b border-white/[0.06] pb-6 last:border-0 last:pb-0">
      <h2 className="text-lg font-bold font-display text-[#F5F5F7] tracking-tight">{title}</h2>
      <p className="text-[#9A9AA6] leading-relaxed text-sm sm:text-base">{children}</p>
    </div>
  );
}
