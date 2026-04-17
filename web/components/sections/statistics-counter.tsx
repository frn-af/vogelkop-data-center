"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { STATISTICS } from "@/data/organization";
import { formatNumber } from "@/lib/format";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

export function StatisticsCounter() {
  return (
    <section className="py-[var(--padding-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--padding-section-x)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-forest p-8 sm:p-12"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATISTICS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-forest-foreground sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-forest-foreground/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
