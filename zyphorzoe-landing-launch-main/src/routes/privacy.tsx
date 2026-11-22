import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./about";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ZyphorZone" },
      {
        name: "description",
        content: "How ZyphorZone safeguards personal data, technical inquiries, and client project confidentiality.",
      },
      { property: "og:title", content: "Privacy Policy — ZyphorZone" },
      { property: "og:description", content: "ZyphorZone privacy policy." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell eyebrow="Data Protection" title="Privacy Policy" subtitle="Last updated: Q1 2026">
      <div className="space-y-8 text-[#9A9AA6] text-sm sm:text-base leading-relaxed max-w-3xl">
        <Section title="1. Information We Collect">
          When you submit project inquiries or communicate with our engineering leads, we collect your name, email
          address, phone/WhatsApp number, and location details. Technical scope specifications and file attachments are
          encrypted and stored securely.
        </Section>

        <Section title="2. Purpose of Processing">
          Collected data is used strictly to evaluate project feasibility, prepare architectural estimates, communicate
          during active sprints, and deliver contracted engineering deliverables. We will never sell, rent, or monetize
          client data.
        </Section>

        <Section title="3. Security Architecture">
          Project records, repository keys, and database schemas are protected using modern TLS encryption in transit and
          AES-256 at rest. Access is strictly restricted to assigned technical project leads under binding NDA obligations.
        </Section>

        <Section title="4. Third-Party Infrastructure">
          We utilize battle-tested cloud providers (Vercel, Supabase, MongoDB Atlas) operating under SOC 2 Type II
          compliance. These providers process telemetry strictly under data processing agreements.
        </Section>

        <Section title="5. Your Data Rights">
          You hold the permanent right to request modification, export, or permanent erasure of your personal details and
          submitted technical scope logs. Contact us directly to execute any data request.
        </Section>

        <Section title="6. Contact Data Protection Lead">
          For privacy inquiries or deletion requests, please email our lead administrator directly at{" "}
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
