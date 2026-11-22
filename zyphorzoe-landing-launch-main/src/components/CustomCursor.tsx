import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHoveringElement = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check pointer capabilities & reduced motion
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the 6px dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if target or any parent has data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const label = cursorTarget.getAttribute("data-cursor");
        setCursorLabel(label || "View");
        isHoveringElement.current = true;
      } else {
        setCursorLabel(null);
        isHoveringElement.current = false;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Lerp loop for the 34px lagged ring
    let rafId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 6px Center Dot - hides when hovering interactive card with custom pill label */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-[#C8FF00] shadow-[0_0_8px_rgba(200,255,0,0.8)] will-change-transform pointer-events-none transition-transform duration-200 ${
          cursorLabel ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      />

      {/* Lagged Ring / Expanding Frosted Dark Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 will-change-transform pointer-events-none transition-all duration-300 flex items-center justify-center ${
          cursorLabel
            ? "-ml-12 -mt-5 px-4 py-2 rounded-full bg-[#0A0A0D]/90 border border-[#C8FF00]/60 backdrop-blur-md shadow-[0_0_24px_rgba(200,255,0,0.35)] scale-100"
            : "-ml-[17px] -mt-[17px] h-[34px] w-[34px] rounded-full border border-[#C8FF00]/40 bg-[#C8FF00]/10 backdrop-blur-[1px]"
        }`}
      >
        {cursorLabel && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C8FF00] select-none whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}
