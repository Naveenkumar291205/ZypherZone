import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { useLenisControl } from "./SmoothScrollProvider";

interface ScrollRevealTextProps {
  eyebrow?: string;
  headline?: string;
  text: string;
  className?: string;
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
  isReducedMotion: boolean;
}

function Word({ word, index, total, progress, isReducedMotion }: WordProps) {
  // If reduced motion, always full opacity
  if (isReducedMotion) {
    return <span className="inline-block mr-[0.28em] text-[#F5F5F7]">{word}</span>;
  }

  // Calculate normalized step
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  // Transform opacity from 0.18 to 1.0 as progress scrolls through this word's window
  const opacity = useTransform(progress, [start, end], [0.18, 1.0]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(154, 154, 166, 0.4)", "rgba(245, 245, 247, 1)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors duration-75 will-change-transform"
    >
      {word}
    </motion.span>
  );
}

export function ScrollRevealText({
  eyebrow = "The Manifesto",
  headline = "Built For Business",
  text,
  className = "",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useLenisControl();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 35%"],
  });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center space-y-6 ${className}`}
    >
      {eyebrow && (
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8FF00] font-semibold">
          {eyebrow}
        </div>
      )}

      {headline && (
        <h2 className="text-2xl sm:text-3xl font-mono text-[#9A9AA6] uppercase tracking-wider">
          {headline}
        </h2>
      )}

      <p className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.25] text-center max-w-4xl mx-auto select-none">
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            index={i}
            total={words.length}
            progress={scrollYProgress}
            isReducedMotion={isReducedMotion}
          />
        ))}
      </p>
    </div>
  );
}
