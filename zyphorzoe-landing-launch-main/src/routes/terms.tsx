import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./about";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ZyphorZone" },
      { name: "description", content: "The terms that govern use of ZyphorZone's website and services. Innovate • Build • Elevate." },
      { property: "og:title", content: "Terms of Service — ZyphorZone" },
      { property: "og:description", content: "ZyphorZone terms of service." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell title="Terms of Service" subtitle="Last updated: July 2026">
      <div className="space-y-8 text-muted-foreground text-sm leading-relaxed max-w-3xl">
        <Section title="1. Agreement to Terms">
          By browsing zyphorzone.com or requesting development services, you confirm acceptance of these Terms of Service. If you do not agree to these guidelines, please stop using this website.
        </Section>
        
        <Section title="2. Freelance Delivery Model">
          ZyphorZone acts as a managed freelance startup. Deliverables, technical scope, milestones, timelines, and costs are defined in project-specific Statements of Work signed by both parties.
        </Section>
        
        <Section title="3. Financial Milestones">
          Project payments, scheduling milestones, deposits, and delivery sign-offs are detailed in project proposals. Milestones are invoiced upon phase completion and are due within 7 days of delivery.
        </Section>
        
        <Section title="4. Intellectual Property">
          Upon final payment settlement, complete ownership, code repositories, design files, and intellectual property rights transfer to the client partner. ZyphorZone retains showcasing rights in its public portfolios unless restricted by a Mutual NDA.
        </Section>
        
        <Section title="5. Non-Disclosure & Confidentiality">
          We treat client project specifications, wireframes, codebases, and database schemas as confidential. Mutual Non-Disclosure Agreements (NDAs) are signed prior to deep discovery phases.
        </Section>
        
        <Section title="6. Liability Limits">
          Our total liability for claim outcomes arising from any project is limited to the exact project fee amount received by ZyphorZone for that specific engagement.
        </Section>
        
        <Section title="7. Agreement Revisions">
          We reserve the right to revise these Terms of Service. Your continued interaction with our client hub or website confirms acceptance of terms revisions.
        </Section>
        
        <Section title="8. Inquiries">
          Please contact our legal representative for questions regarding service guidelines at{" "}
          <a href="mailto:Zypherzone07@gmail.com" className="text-primary hover:underline font-semibold transition-all">
            Zypherzone07@gmail.com
          </a>.
        </Section>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-b border-border/10 pb-6 last:border-0 last:pb-0">
      <h2 className="text-lg font-bold font-display text-foreground">{title}</h2>
      <p className="text-muted-foreground leading-relaxed text-sm">{children}</p>
    </div>
  );
}
