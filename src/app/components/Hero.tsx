"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { stagger, textClip, blurIn, fade, floatY } from "../lib/motion";

const HEADLINE = "Designing visuals that move, stories that last.";

export default function Hero() {
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const rx = useSpring(cy, { stiffness: 80, damping: 16 });
  const ry = useSpring(cx, { stiffness: 80, damping: 16 });
  const rotateX = useTransform(rx, [-100, 100], [4, -4]);
  const rotateY = useTransform(ry, [-200, 200], [-6, 6]);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    cx.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 200);
    cy.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 100);
  };
  const onLeave = () => { cx.set(0); cy.set(0); };

  const tokens = useMemo(() => {
    const s = HEADLINE.replace(/–|—/g, " — ");
    return s
      .split(/(?=[A-Z])|\s+/) 
      .filter(Boolean);
  }, []);

  const accent = new Set(["Rangga", "Shena", "Creator"]);

  const stars = [
    { left: "10%", top: "22%" },
    { left: "28%", top: "34%" },
    { right: "16%", top: "26%" },
    { right: "8%", top: "14%" },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36 pb-20">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
        }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(207,233,255,0.20), transparent)" }}
          initial={{ opacity: 0, x: -40, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          aria-hidden
          className="absolute top-[25%] right-[-14%] h-[52rem] w-[52rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(31,111,255,0.12), transparent)" }}
          initial={{ opacity: 0, x: 40, y: 20, scale: 1.05, rotate: -4 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4 }}
        />
        <motion.div
          aria-hidden
          className="absolute -inset-y-20 -left-1/3 w-[70%] rotate-[12deg]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            filter: "blur(8px)",
          }}
          initial={{ x: "-20%" }}
          animate={{ x: "20%" }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.svg
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "3%", "0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </motion.svg>
      </div>

      {stars.map((p, i) => (
        <motion.span
          key={i}
          variants={floatY}
          initial="hidden"
          animate="show"
          transition={{ delay: i * 0.4 }}
          className="hidden md:block pointer-events-none absolute h-1.5 w-1.5 rounded-full"
          style={{
            ...p,
            background: "linear-gradient(90deg, var(--icy), var(--blue))",
            filter: "drop-shadow(0 0 8px rgba(207,233,255,.6))",
          }}
        />
      ))}

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[min(1100px,92vw)] mx-auto"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <h1 className="font-bold leading-tight text-[2rem] md:text-5xl lg:text-6xl">
          {tokens.map((w, i) => (
            <motion.span
              key={i}
              variants={textClip}
              className={[
                "inline-block mr-2",
                (accent.has(w) || w === "—") ? "text-icy" : "",
              ].join(" ")}
              transition={{ delay: i * 0.05 }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          variants={fade}
          className="mt-3 h-[2px] w-0 rounded-full"
          style={{ background: "linear-gradient(90deg, var(--icy), var(--blue))" }}
          animate={{ width: "min(460px, 78vw)" }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p variants={blurIn} className="mt-5 max-w-2xl text-slate-300">
          Focused on cinematic video editing, motion graphics, and luxury visual design—crafted with tasteful transitions and premium pacing.
        </motion.p>

        <motion.ul variants={stagger} className="mt-6 flex flex-wrap gap-2">
          {["Video Editing","Motion Graphic"].map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-300"
            >
              {t}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-8 flex gap-3">
          <MagneticButton href="#works" primary>View Works</MagneticButton>
          <MagneticButton href="#contact">Contact</MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}

function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.2 });
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.2 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = (e.target as HTMLAnchorElement).getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    mx.set(Math.max(-10, Math.min(10, x * 0.2)));
    my.set(Math.max(-10, Math.min(10, y * 0.2)));
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      className={[
        "rounded-xl px-5 py-3 font-medium transition",
        primary ? "bg-[var(--blue)] text-white hover:opacity-90"
                : "border border-white/20 hover:bg-white/5",
      ].join(" ")}
    >
      {children}
    </motion.a>
  );
}
