import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import wordmark from "@/assets/wordmark.png";
import {
  ArrowRight,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  Users,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLenisControl } from "./SmoothScrollProvider";

export function Logo({ className = "h-7 w-7 md:h-8 md:w-8" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="ZyphorZone Logo"
      width={128}
      height={128}
      loading="eager"
      className={`${className} object-contain transition-transform duration-300 group-hover:scale-105`}
    />
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { stop, start, scrollTo } = useLenisControl();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync scroll progress & active sections
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? winScroll / height : 0;
      setScrollProgress(scrolled);
      setIsScrolled(winScroll > 40);

      // Section tracking on home page
      if (window.location.pathname === "/") {
        const sections = ["showcase", "why", "services", "how", "estimator", "portfolio", "contact"];
        let current = "";
        for (const sec of sections) {
          const el = document.getElementById(sec);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = sec;
              break;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection(location.pathname);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      stop();
    } else {
      start();
    }
  }, [mobileMenuOpen, stop, start]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#") && window.location.pathname === "/") {
      const targetId = href.replace("/", "");
      scrollTo(targetId, { offset: -80 });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#09090B] text-[#F5F5F7] selection:bg-[#C8FF00] selection:text-[#09090B]">
      {/* 2px Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-[#C8FF00] to-[#ECFF9E] origin-left transition-transform duration-75 will-change-transform shadow-[0_0_12px_rgba(200,255,0,0.8)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* FLOATING PILL NAVBAR */}
      <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none flex justify-center">
        <div
          className={`pointer-events-auto w-full max-w-[1040px] rounded-full transition-all duration-300 border flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 ${
            isScrolled
              ? "bg-[#0A0A0D]/90 border-white/[0.12] backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.8)]"
              : "bg-[#0C0C0F]/70 border-white/[0.08] backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <Logo />
            <img
              src={wordmark}
              alt="ZyphorZone Wordmark"
              className="h-4 sm:h-[18px] object-contain transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {siteConfig.navItems.map((item) => {
              const secId = item.href.replace("/#", "");
              const isCurrent =
                (item.href.startsWith("/#") && activeSection === secId) ||
                (item.href === location.pathname && item.href !== "/");

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/#") && window.location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isCurrent
                      ? "bg-white/[0.08] text-[#C8FF00] shadow-[inset_0_0_1px_rgba(255,255,255,0.2)] font-semibold"
                      : "text-[#9A9AA6] hover:text-[#F5F5F7] hover:bg-white/[0.04]"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/#contact"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  handleNavClick("/#contact");
                }
              }}
              className="btn-lime text-xs font-bold !py-2 !px-4 sm:!py-2.5 sm:!px-5 rounded-full inline-flex items-center gap-1.5"
            >
              <span>Scope Project</span>
              <ArrowRight className="h-3 w-3" />
            </a>

            {/* Animated 2-line Hamburger (<= 920px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#F5F5F7] hover:bg-white/[0.08] transition-colors"
              aria-label="Toggle navigation drawer"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-4 h-3.5 relative flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full bg-current rounded-full transition-transform duration-300 origin-center ${
                    mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current rounded-full transition-transform duration-300 origin-center ${
                    mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Glass Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-start pt-24 px-4 sm:px-6">
          <div
            className="fixed inset-0 bg-[#09090B]/85 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-50 w-full max-w-lg mx-auto bg-[#121217]/95 border border-white/[0.12] rounded-3xl p-6 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#C8FF00] px-3 pb-1 border-b border-white/[0.06]">
              Navigation
            </div>
            <div className="flex flex-col gap-1">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/#") && window.location.pathname === "/") {
                      e.preventDefault();
                    }
                    handleNavClick(item.href);
                  }}
                  className="min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#F5F5F7] hover:bg-white/[0.06] hover:text-[#C8FF00] transition-colors"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-40" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/[0.08]">
              <a
                href="/#contact"
                onClick={(e) => {
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                  }
                  handleNavClick("/#contact");
                }}
                className="btn-lime w-full min-h-[48px] rounded-xl flex items-center justify-center gap-2 text-sm font-bold"
              >
                <span>Request 24h Technical Scope</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow w-full relative z-10">{children}</main>

      {/* 5-COLUMN EDITORIAL MEGA FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#0E0E12] pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 dot-matrix" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-white/[0.06]">
            {/* Col 1 & 2: Studio Overview & Direct Contact */}
            <div className="sm:col-span-2 space-y-5">
              <Link to="/" className="flex items-center gap-2.5 group">
                <Logo />
                <img src={wordmark} alt="ZyphorZone" className="h-4 sm:h-5 object-contain" />
              </Link>
              <p className="text-sm text-[#9A9AA6] leading-relaxed max-w-md">
                ZyphorZone operates as a managed senior freelance collective delivering venture-grade full-stack
                applications, mobile platforms, and high-conversion design systems with transparent milestone pricing.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="h-10 w-10 grid place-items-center rounded-full border border-white/[0.1] bg-white/[0.02] text-[#9A9AA6] hover:text-[#C8FF00] hover:border-[#C8FF00]/40 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email"
                  className="h-10 w-10 grid place-items-center rounded-full border border-white/[0.1] bg-white/[0.02] text-[#9A9AA6] hover:text-[#C8FF00] hover:border-[#C8FF00]/40 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  aria-label="Phone"
                  className="h-10 w-10 grid place-items-center rounded-full border border-white/[0.1] bg-white/[0.02] text-[#9A9AA6] hover:text-[#C8FF00] hover:border-[#C8FF00]/40 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 text-[#C8FF00] text-xs font-mono font-medium">
                <span className="h-2 w-2 rounded-full bg-[#C8FF00] animate-pulse" />
                Allocating Q1/Q2 2026 Engineering Sprints
              </div>
            </div>

            {/* Col 3: Core Capabilities */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F5F5F7] flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-[#C8FF00]" />
                Capabilities
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9A9AA6]">
                {siteConfig.services.map((s) => (
                  <li key={s}>
                    <a
                      href="/#services"
                      className="hover:text-[#F5F5F7] transition-colors flex items-center gap-2 group"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/20 group-hover:bg-[#C8FF00] transition-colors" />
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Studio Architecture */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F5F5F7] flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-[#C8FF00]" />
                Studio
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9A9AA6]">
                <li><Link to="/about" className="hover:text-[#F5F5F7] transition-colors">Philosophy & Team</Link></li>
                <li><a href="/#how" className="hover:text-[#F5F5F7] transition-colors">5-Step Process</a></li>
                <li><a href="/#estimator" className="hover:text-[#F5F5F7] transition-colors">Scope Estimator</a></li>
                <li><a href="/#portfolio" className="hover:text-[#F5F5F7] transition-colors">Shipped Releases</a></li>
                <li><Link to="/contact" className="hover:text-[#F5F5F7] transition-colors">Direct Consultation</Link></li>
              </ul>
            </div>

            {/* Col 5: Trust & Governance */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F5F5F7] flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C8FF00]" />
                Governance
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9A9AA6]">
                <li><Link to="/terms" className="hover:text-[#F5F5F7] transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-[#F5F5F7] transition-colors">Privacy Policy</Link></li>
                <li className="pt-2 border-t border-white/[0.06] text-[#F5F5F7] flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#C8FF00] shrink-0 mt-0.5" />
                  <span>{siteConfig.location}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mega Wordmark Watermark */}
          <div className="pt-12 pb-6 text-center select-none overflow-hidden">
            <span className="text-[clamp(2.5rem,11vw,9rem)] font-extrabold tracking-tighter text-white/[0.03] uppercase font-display leading-none block whitespace-nowrap pointer-events-none">
              ZYPHORZONE
            </span>
          </div>

          {/* Bottom Copyright & Guarantee Strip */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9A9AA6]">
            <div>
              © {new Date().getFullYear()} ZyphorZone. All rights reserved. Innovate • Build • Elevate.
            </div>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1.5 text-[#F5F5F7]">
                <ShieldCheck className="h-4 w-4 text-[#C8FF00]" />
                100% IP & Git Handover Guaranteed
              </span>
              <span className="hidden md:inline border-l border-white/[0.1] pl-6 text-[#9A9AA6]">
                Senior Architects & Engineers Only.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
