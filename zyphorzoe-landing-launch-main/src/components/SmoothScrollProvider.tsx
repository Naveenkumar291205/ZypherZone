import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
  lock?: boolean;
}

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
  isReducedMotion: boolean;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  isReducedMotion: false,
});

export function useLenisControl() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // If reduced motion is requested, do not initialize smooth scrolling
    if (mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle hash links smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element as HTMLElement, { offset: -90 });
        }
      } else if (href && href.startsWith("/#") && window.location.pathname === "/") {
        const hash = href.replace("/", "");
        if (hash.length > 1) {
          e.preventDefault();
          const element = document.querySelector(hash);
          if (element) {
            lenis.scrollTo(element as HTMLElement, { offset: -90 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (target: string | HTMLElement | number, options?: ScrollToOptions) => {
    if (lenisRef.current && !isReducedMotion) {
      lenisRef.current.scrollTo(target, options);
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset || 0);
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else if (target instanceof HTMLElement) {
        const top = target.getBoundingClientRect().top + window.scrollY + (options?.offset || 0);
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    document.documentElement.classList.add("overflow-hidden");
  };

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    document.documentElement.classList.remove("overflow-hidden");
  };

  return (
    <LenisContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        stop,
        start,
        isReducedMotion,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}
