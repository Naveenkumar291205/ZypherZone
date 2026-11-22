import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  variant?: "lime" | "ghost" | "custom";
  icon?: React.ReactNode;
  dataCursor?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "lime",
  icon,
  dataCursor,
  target,
  rel,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isFinePointer = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    isFinePointer.current = mq.matches;

    const handler = (e: MediaQueryListEvent) => {
      isFinePointer.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFinePointer.current || !btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Clamped magnetic pull up to ±10px
    const maxPull = 10;
    const pullX = Math.max(-maxPull, Math.min(maxPull, deltaX * 0.28));
    const pullY = Math.max(-maxPull, Math.min(maxPull, deltaY * 0.28));

    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  // Base styling depending on variant
  let baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors select-none";
  if (variant === "lime") {
    baseStyles += " btn-lime";
  } else if (variant === "ghost") {
    baseStyles += " btn-ghost";
  }

  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isHovered
      ? "transform 0.15s ease-out"
      : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  const innerContent = (
    <>
      <span className="relative overflow-hidden inline-flex flex-col h-[1.3em] leading-[1.3em]">
        <span
          className="inline-block transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: isHovered ? "translateY(-100%)" : "translateY(0%)" }}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-full left-0 right-0 inline-block transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: isHovered ? "translateY(-100%)" : "translateY(0%)" }}
        >
          {children}
        </span>
      </span>
      {icon && <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
        data-cursor={dataCursor}
        target={target}
        rel={rel}
        className={`group ${baseStyles} ${className}`}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      data-cursor={dataCursor}
      className={`group ${baseStyles} ${className}`}
    >
      {innerContent}
    </button>
  );
}
