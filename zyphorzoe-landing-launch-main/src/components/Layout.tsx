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
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLenisControl } from "./SmoothScrollProvider";
import { Preloader } from "./Preloader";
import { CustomCursor } from "./CustomCursor";
import { MagneticButton } from "./MagneticButton";

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
  const [activeSection, setActiveSection] = useState<string>("home");
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
        const sections = ["home", "about", "services", "projects", "how", "estimator", "team", "contact"];
        let current = "home";
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
      scrollTo(targetId, { offset: -90 });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#09090B] text-[#F5F5F7] selection:bg-[#C8FF00] selection:text-[#09090B]">
      {/* Flagship Cinema Curtain Preloader */}
      <Preloader />

      {/* Flagship Contextual Custom Cursor */}
      <CustomCursor />

      {/* 2px Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-[#C8FF00] to-[#ECFF9E] origin-left transition-transform duration-75 will-change-transform shadow-[0_0_12px_rgba(200,255,0,0.8)]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* FLOATING PILL NAVBAR */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none flex justify-center">
        <div
          className={`pointer-events-auto w-full max-w-[1020px] rounded-full transition-all duration-300 border flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 ${
            isScrolled
              ? "bg-[#0A0A0D]/90 border-white/[0.12] backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.8)]"
              : "bg-[#0C0C0F]/70 border-white/[0.08] backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <Logo />
            <span className="font-display font-bold text-base sm:text-lg tracking-tight">
              <span className="text-[#C8FF00]">Zyphor</span>Zone
            </span>
          </Link>

          {/* Desktop Nav Links */}
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isCurrent
                      ? "bg-white/[0.08] text-[#C8FF00] font-semibold shadow-sm"
                      : "text-[#9A9AA6] hover:text-[#F5F5F7] hover:bg-white/[0.04]"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <MagneticButton
              href="/#contact"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  handleNavClick("/#contact");
                }
              }}
              className="text-xs font-bold !py-2 !px-4 sm:!py-2.5 sm:!px-5 rounded-full"
              icon={<ArrowRight className="h-3 w-3" />}
            >
              Book a Call
            </MagneticButton>

            {/* Animated 2-line Hamburger (<= 920px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#F5F5F7] hover:bg-white/[0.08] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-4 h-3 relative flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full bg-current rounded-full transition-transform duration-300 origin-center ${
                    mobileMenuOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current rounded-full transition-transform duration-300 origin-center ${
                    mobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-start pt-20 px-4">
          <div
            className="fixed inset-0 bg-[#09090B]/85 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-50 w-full max-w-md mx-auto bg-[#121217]/95 border border-white/[0.12] rounded-3xl p-5 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#C8FF00] px-3 pb-2 border-b border-white/[0.06]">
              Menu Navigation
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
                  className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#F5F5F7] hover:bg-white/[0.06] hover:text-[#C8FF00] transition-colors"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/[0.08]">
              <a
                href="/#contact"
                onClick={(e) => {
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                  }
                  handleNavClick("/#contact");
                }}
                className="btn-lime w-full min-h-[46px] rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
              >
                <span>Book a Free Call</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-grow w-full relative z-10 uncover-main">{children}</main>

      {/* 5-COLUMN FOOTER MATCHING REFERENCE 2 (.fgrid) WITH STICKY UNCOVER */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#0E0E12] pt-20 pb-12 overflow-hidden uncover-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-16 border-b border-white/[0.06]">
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Logo />
                <span className="font-display font-bold text-lg text-[#F5F5F7]">
                  <span className="text-[#C8FF00]">Zyphor</span>Zone
                </span>
              </div>
              <p className="text-xs text-[#9A9AA6] leading-relaxed">
                Modern web, mobile and backend solutions from Coimbatore, India.
              </p>
            </div>

            {/* Col 2: Company */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8FF00]">Company</h4>
              <ul className="space-y-2 text-xs text-[#9A9AA6]">
                <li><a href="/#about" className="hover:text-[#F5F5F7] transition-colors">About</a></li>
                <li><a href="/#projects" className="hover:text-[#F5F5F7] transition-colors">Work</a></li>
                <li><a href="/#how" className="hover:text-[#F5F5F7] transition-colors">How We Work</a></li>
                <li><a href="/#team" className="hover:text-[#F5F5F7] transition-colors">Team</a></li>
                <li><a href="/#contact" className="hover:text-[#F5F5F7] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8FF00]">Services</h4>
              <ul className="space-y-2 text-xs text-[#9A9AA6]">
                <li><a href="/#services" className="hover:text-[#F5F5F7] transition-colors">Web Development</a></li>
                <li><a href="/#services" className="hover:text-[#F5F5F7] transition-colors">Mobile Apps</a></li>
                <li><a href="/#services" className="hover:text-[#F5F5F7] transition-colors">UI/UX Design</a></li>
                <li><a href="/#services" className="hover:text-[#F5F5F7] transition-colors">Backend</a></li>
                <li><a href="/#services" className="hover:text-[#F5F5F7] transition-colors">Cloud & Database</a></li>
              </ul>
            </div>

            {/* Col 4: Free Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8FF00]">Free Tools</h4>
              <ul className="space-y-2 text-xs text-[#9A9AA6]">
                <li><a href="/#estimator" className="hover:text-[#F5F5F7] transition-colors">Scope Estimator</a></li>
                <li><a href="/#contact" className="hover:text-[#F5F5F7] transition-colors">Free Consultation</a></li>
              </ul>
            </div>

            {/* Col 5: Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8FF00]">Contact</h4>
              <ul className="space-y-2 text-xs text-[#9A9AA6]">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-[#F5F5F7] transition-colors break-all">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteConfig.phoneClean}`} className="hover:text-[#F5F5F7] transition-colors">
                    {siteConfig.phone}
                  </a>
                </li>
                <li><p>{siteConfig.location}</p></li>
                <li className="pt-2 border-t border-white/[0.06]">
                  <Link to="/privacy" className="hover:text-[#F5F5F7] transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#F5F5F7] transition-colors">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Mega Wordmark Watermark */}
          <div className="pt-10 pb-4 text-center select-none overflow-hidden">
            <span className="text-[clamp(3rem,14vw,11rem)] font-extrabold tracking-tighter text-white/[0.03] uppercase font-display leading-none block whitespace-nowrap pointer-events-none">
              ZyphorZone
            </span>
          </div>

          {/* Bottom Copyright */}
          <div className="text-center text-xs text-[#9A9AA6]">
            © {new Date().getFullYear()} ZyphorZone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
