import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import Layout from "../components/Layout";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B] px-4 text-[#F5F5F7]">
      <div className="max-w-md text-center space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#C8FF00]">404 Error</span>
        <h1 className="text-6xl sm:text-7xl font-extrabold font-display tracking-tight text-[#F5F5F7]">
          404
        </h1>
        <h2 className="text-lg font-bold font-display text-[#F5F5F7]">Endpoint Not Found</h2>
        <p className="text-sm text-[#9A9AA6]">
          The architectural blueprint or page requested does not exist or has been shifted.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="btn-lime inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-bold"
          >
            Return to Studio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("[Root Error Boundary]", error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090B] px-4 text-[#F5F5F7]">
      <div className="max-w-md text-center space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-red-400">Runtime Exception</span>
        <h1 className="text-2xl font-bold font-display tracking-tight text-[#F5F5F7]">
          Application Encountered an Issue
        </h1>
        <p className="text-sm text-[#9A9AA6]">
          A client-side initialization anomaly occurred. You may retry reloading the application state.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-lime inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold"
          >
            Reinitialize State
          </button>
          <a
            href="/"
            className="btn-ghost inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-medium"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "ZyphorZone — Elite Digital Product Studio & Senior Engineering Collective" },
      {
        name: "description",
        content:
          "Senior-managed engineering collective delivering agency-grade web platforms, mobile apps, and high-conversion design systems with guaranteed 24h scope turnaround.",
      },
      { name: "author", content: "ZyphorZone" },
      { property: "og:title", content: "ZyphorZone — Elite Digital Product Studio" },
      {
        property: "og:description",
        content:
          "Innovate • Build • Elevate. Senior-managed engineering collective delivering web engineering, mobile apps, and brand design systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@_zyphor.dev_" },
      { name: "theme-color", content: "#09090B" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ZyphorZone",
    slogan: "Innovate • Build • Elevate",
    description:
      "Senior managed freelance collective delivering web engineering, mobile apps, UI/UX, and cloud architecture.",
    url: "https://zyphorzone.com",
    email: "Zypherzone07@gmail.com",
    telephone: "+916385235131",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    sameAs: ["https://instagram.com/_zyphor.dev_"],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScrollProvider>
        <Layout>
          <Outlet />
        </Layout>
      </SmoothScrollProvider>
    </QueryClientProvider>
  );
}
