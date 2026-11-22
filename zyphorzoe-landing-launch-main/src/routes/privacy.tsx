import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./about";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ZyphorZone" },
      { name: "description", content: "How ZyphorZone collects, uses and protects your personal information. Innovate • Build • Elevate." },
      { property: "og:title", content: "Privacy Policy — ZyphorZone" },
      { property: "og:description", content: "ZyphorZone privacy policy." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell title="Privacy Policy" subtitle="Last updated: July 2026">
      <div className="space-y-8 text-muted-foreground text-sm leading-relaxed max-w-3xl">
        <Section title="1. Information We Collect">
          When you submit project requirements or register an account, we collect your name, email address, phone number, and location details. Authentication via Google provides us with your profile name, email, and avatar picture as authorized in your account permission settings.
        </Section>
        
        <Section title="2. How We Use Data">
          We use collected details solely to respond to project enquiries, deliver contracted digital services, provide milestone progress notifications in your client hub, and resolve technical issues. We will never sell, trade, or distribute your personal details to outside parties.
        </Section>
        
        <Section title="3. Security & Storage">
          Project records, message feeds, and account structures are saved securely using modern encryption. Database access is strictly restricted to assigned technical project leads under non-disclosure obligations.
        </Section>
        
        <Section title="4. Third-Party Services">
          We utilize trusted third-party providers for authentication services (Google) and analytics. These platforms manage details under their designated privacy systems.
        </Section>
        
        <Section title="5. Your Control & Access">
          You maintain full access to request modifications to, exports of, or deletion of your personal records and past project enquiries. Contact us direct via email to request updates.
        </Section>
        
        <Section title="6. Contact Details">
          For general data protection enquiries, please email our lead administrator at{" "}
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
