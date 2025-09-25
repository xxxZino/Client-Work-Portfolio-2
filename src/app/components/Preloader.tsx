"use client";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { WORKS } from "../lib/constants";

type Props = { onDone: () => void };

export default function Preloader({ onDone }: Props) {
  const [visible, setVisible] = useState(true);

  const mv = useMotionValue(0);
  const pct = useTransform(mv, (v) => Math.round(v));
  const [p, setP] = useState(0);
  useEffect(() => {
    const unsub = pct.on("change", (v) => setP(v));
    return () => unsub();
  }, [pct]);

  const scaleX = useTransform(mv, (v) => Math.max(0, Math.min(1, v / 100)));
  const target = useRef(0);
  const raf = useRef<number | null>(null);
  const assets = useMemo(() => WORKS.map((w) => w.cover), []);

  useEffect(() => {
    document.body.classList.add("loading");
    let loaded = 0;

    const tick = () => {
      const current = mv.get();
      const next = current + (target.current - current) * 0.12;
      mv.set(next);
      if (next < 99.6 || target.current < 100) {
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = async () => {
          const withDecode = img as HTMLImageElement & { decode?: () => Promise<void> };
          if (withDecode.decode) {
            try { await withDecode.decode(); } catch {}
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      });

    (async () => {
      target.current = 12;
      for (const src of assets) {
        await preload(src);
        loaded++;
        const ratio = Math.min(0.9, loaded / Math.max(assets.length, 1));
        target.current = Math.max(target.current, 12 + ratio * 88);
      }
      await new Promise((r) => setTimeout(r, 250));
      target.current = 100;
    })();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [assets, mv]);

  useEffect(() => {
    const unsub = pct.on("change", (v) => {
      if (v >= 100) {
        setTimeout(() => {
          setVisible(false);
          document.body.classList.remove("loading");
          setTimeout(onDone, 350);
        }, 180);
      }
    });
    return () => unsub();
  }, [onDone, pct]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          className="fixed inset-0 z-[80] overflow-hidden"
        >
          {/* BG mesh */}
          <div className="absolute inset-0">
            <div
              className="absolute -top-24 -left-24 h-[46rem] w-[46rem] rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(207,233,255,0.20), transparent 70%)" }}
            />
            <div
              className="absolute top-[20%] right-[-12%] h-[56rem] w-[56rem] rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(31,111,255,0.12), transparent 70%)" }}
            />
            <motion.div
              className="absolute -inset-y-32 -left-1/3 w-[70%] rotate-[12deg]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                filter: "blur(10px)",
              }}
              animate={{ x: ["-18%", "18%", "-18%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Center */}
          <div className="relative z-[1] h-full grid place-items-center">
            <div className="w-[min(680px,92vw)] text-center">
              <div
                className="text-6xl md:text-7xl font-semibold loader-digit"
                style={{
                  background: "linear-gradient(90deg, var(--icy), #fff)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {p}%
              </div>

              <div className="mt-6 h-[6px] w-full rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full origin-left"
                  style={{ scaleX, background: "linear-gradient(90deg, var(--icy), var(--blue))" }}
                />
                <motion.span
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    transform: "translateX(-60%)",
                    filter: "blur(6px)",
                  }}
                  animate={{ x: ["-60%", "120%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div className="mt-4 text-sm text-slate-400 tracking-wider">Preparing experience…</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
