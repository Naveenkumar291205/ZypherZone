import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import wordmark from "@/assets/wordmark.png";
import {
  ArrowRight,
  Instagram,
  Mail,
  MapPin,
  Briefcase,
  Users,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export function Logo({ className = "h-8 w-8 md:h-9 md:w-9" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="ZyphorZone logo"
      width={512}
      height={512}
      loading="lazy"
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}
    />
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Why ZyphorZone", href: "/#why" },
    { name: "Services", href: "/#services" },
    { name: "How We Build", href: "/#how" },
    { name: "Cost Estimator", href: "/#estimator" },
    { name: "Recent Work", href: "/#portfolio" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white bg-background text-foreground">
      {/* Decorative ambient neon background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[55vw] h-[45vh] bg-primary/10 rounded-full blur-[160px] soft-glow" />
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[40vh] bg-accent/8 rounded-full blur-[170px] soft-glow" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vh] bg-primary/8 rounded-full blur-[150px] soft-glow" />
        <div className="absolute top-[65%] left-[35%] w-[35vw] h-[35vh] bg-accent/6 rounded-full blur-[160px] soft-glow" />
      </div>

      {/* HEADER / FLOATING NAVBAR */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? "backdrop-blur-xl bg-[#07080D]/80 border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.55)] py-3"
            : "backdrop-blur-md bg-[#07080D]/40 border-b border-white/[0.04] py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <Logo />
            <img
              src={wordmark}
              alt="ZyphorZone wordmark"
              className="h-5 md:h-[22px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/[0.08] rounded-full transition-all duration-200 nav-link-synth"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              className="btn-primary text-xs !py-2 !px-4 md:!py-2.5 md:!px-5 hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Start Project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden flex-col justify-center items-center gap-1.5 p-2.5 rounded-xl border border-white/[0.08] bg-surface text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-[2px] bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-current transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-card mx-4 my-2 p-5 rounded-2xl border border-white/[0.12] flex flex-col gap-2 animate-in slide-in-from-top-3 duration-200 z-50 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-primary/[0.08] hover:text-primary transition-colors flex items-center justify-between"
              >
                {link.name}
                <ArrowRight className="h-3.5 w-3.5 opacity-40" />
              </a>
            ))}
            <div className="pt-3 border-t border-white/[0.08] mt-1">
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center text-xs !py-3 flex items-center justify-center gap-2"
              >
                Book Free Technical Consultation
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow relative z-10 w-full">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#0A0C14]/90 backdrop-blur-xl pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 dot-matrix" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 sm:grid-cols-2 lg:grid-cols-12 pb-16 border-b border-white/[0.08]">
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="flex items-center gap-2.5 group">
                <Logo />
                <img src={wordmark} alt="ZyphorZone wordmark" className="h-5 object-contain" />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                A senior-managed freelance collective engineering high-performance SaaS platforms, mobile apps, and brand design systems for venture-backed founders and ambitious brands worldwide.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com/_zyphor.dev_"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="h-9 w-9 grid place-items-center rounded-xl border border-white/[0.1] hover:border-primary/60 hover:text-primary transition-all duration-200 bg-white/[0.02] hover:scale-105"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="mailto:Zypherzone07@gmail.com"
                  aria-label="Email"
                  className="h-9 w-9 grid place-items-center rounded-xl border border-white/[0.1] hover:border-primary/60 hover:text-primary transition-all duration-200 bg-white/[0.02] hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mt-2">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Now booking Q1 2026 sprint allocations
              </div>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2 mb-5 font-display">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
                Capabilities
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Full-Stack Web Engineering",
                  "iOS & Android Mobile Apps",
                  "UI/UX Prototyping & Design Systems",
                  "Brand Strategy & Visual Guidelines",
                  "Performance Marketing & SEO Audits",
                  "Supabase & Cloud Architecture",
                ].map((s) => (
                  <li key={s}>
                    <a href="/#services" className="hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors duration-200" />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2 mb-5 font-display">
                <Users className="h-3.5 w-3.5 text-primary" />
                Company
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors duration-200">About Us</Link></li>
                <li><a href="/#how" className="hover:text-primary transition-colors duration-200">How We Build</a></li>
                <li><a href="/#estimator" className="hover:text-primary transition-colors duration-200">Scope Estimator</a></li>
                <li><a href="/#portfolio" className="hover:text-primary transition-colors duration-200">Shipped Work</a></li>
                <li><a href="/#contact" className="hover:text-primary transition-colors duration-200">Consultation</a></li>
              </ul>
            </div>

            {/* Resources / Legal Column */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground flex items-center gap-2 mb-5 font-display">
                <HelpCircle className="h-3.5 w-3.5 text-primary" />
                Resources & Trust
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/terms" className="hover:text-primary transition-colors duration-200">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link></li>
                <li className="flex items-center gap-2 pt-3 border-t border-white/[0.08] text-xs text-foreground/80">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Coimbatore, Tamil Nadu, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>
              © {new Date().getFullYear()} ZyphorZone. Innovate • Build • Elevate. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-foreground/75">
                <ShieldCheck className="h-4 w-4 text-accent" />
                100% IP & Repository Transfer Guarantee
              </span>
              <span className="hidden sm:inline border-l border-white/[0.1] pl-6 text-muted-foreground">
                Crafted with precision by senior engineers.
              </span>
            </div>
          </div>
        </footer>
    </div>
  );
}
