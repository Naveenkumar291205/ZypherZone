import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    if (typeof window === "undefined") return;

    const alreadyLoaded = sessionStorage.getItem("zz_loaded");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyLoaded || prefersReducedMotion) {
      // Mark as loaded and dispatch ready event immediately
      sessionStorage.setItem("zz_loaded", "1");
      window.dispatchEvent(new CustomEvent("zz_preloader_done"));
      return;
    }

    setVisible(true);

    const startTime = performance.now();
    const duration = 750; // ~750ms counter animation

    let rafId: number;
    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        // Begin curtain lift upward
        setTimeout(() => {
          setIsSlidingUp(true);
          sessionStorage.setItem("zz_loaded", "1");

          // Dispatch event as soon as curtain begins sliding to trigger hero reveal
          window.dispatchEvent(new CustomEvent("zz_preloader_done"));

          // Remove preloader element completely after slide animation
          setTimeout(() => {
            setVisible(false);
          }, 850);
        }, 120);
      }
    };

    rafId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070709] text-[#F5F5F7] select-none pointer-events-auto transition-transform will-change-transform ${
        isSlidingUp ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionDuration: "850ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      aria-hidden={!visible}
    >
      {/* Subtle background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.8)] animate-pulse" />
          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#F5F5F7]">
            <span className="text-[#C8FF00]">Zyphor</span>Zone
          </span>
        </div>

        {/* Counter */}
        <div className="font-mono text-5xl sm:text-6xl font-extrabold tracking-tight tabular-nums text-[#F5F5F7]">
          {progress.toString().padStart(2, "0")}
          <span className="text-[#C8FF00] text-3xl sm:text-4xl ml-1 font-semibold">%</span>
        </div>

        {/* Loading Bar */}
        <div className="w-36 h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C8FF00] transition-all duration-75 will-change-transform shadow-[0_0_8px_rgba(200,255,0,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
