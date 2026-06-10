"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const TOTAL_MS = 1800; // always finishes in 1.8s
    const START = performance.now();

    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - START;
      // Ease-out curve: fast at start, slows near 100
      const raw = elapsed / TOTAL_MS;
      const eased = 1 - Math.pow(1 - Math.min(raw, 1), 2); // quadratic ease-out
      const pct = Math.floor(eased * 100);
      setProgress(pct);

      if (elapsed < TOTAL_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Small pause at 100% then dismiss
        setTimeout(() => {
          window.scrollTo(0, 0);
          setLoading(false);
        }, 500);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white flex flex-col justify-between p-6 md:p-10"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-widest overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              System Initialization
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-zinc-900 dark:text-white tabular-nums"
            >
              {progress}%
            </motion.span>
          </div>

          {/* Center Stage */}
          <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
            <div className="overflow-hidden pb-4">
              <motion.h1
                className="text-3xl md:text-5xl lg:text-7xl font-heading uppercase tracking-tighter leading-none"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
              >
                Sanket Rajiv Saraf
              </motion.h1>
            </div>

            <div className="overflow-hidden mt-6">
              <motion.div
                className="flex gap-4 md:gap-8 text-zinc-500 dark:text-zinc-400 font-sans tracking-widest text-xs md:text-sm uppercase"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <span>AI Engineer</span>
                <span className="text-muted-foreground">•</span>
                <span>Data Science</span>
                <span className="text-muted-foreground">•</span>
                <span>Researcher</span>
              </motion.div>
            </div>
          </div>

          {/* Footer Progress Bar */}
          <div className="w-full h-[2px] bg-black/10 dark:bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-foreground rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
