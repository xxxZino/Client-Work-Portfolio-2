"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";

type Svc = {
  key: string;
  title: string;
  blurb: string;    
  bullets: string[];
  cta?: string;
};

const SERVICES: Svc[] = [
  {
    key: "edit",
    title: "Video Editing",
    blurb:
      "Cinematic pacing, seamless rhythm, and story-first cuts crafted for brand reels, campaigns, and short films.",
    bullets: ["Narrative & pacing design", "Sound design touch-up", "Color preparation"],
    cta: "Start an Edit",
  },
  {
    key: "mograph",
    title: "Motion Graphics",
    blurb:
      "Tasteful motion systems, kinetic type, and premium transitional language that elevate your brand.",
    bullets: ["Kinetic typography", "Logo/packshot animation", "Explainers"],
    cta: "Animate It",
  },
];

const EASE: Easing = [0.22, 1, 0.36, 1]; 

export default function ServicesSection() {
  const [active, setActive] = useState<string>(SERVICES[0].key);

  const activeIndex = useMemo(
    () => SERVICES.findIndex((s) => s.key === active),
    [active]
  );

  return (
    <section className="relative overflow-hidden">
      <motion.div
        key={active}
        aria-hidden
        className="absolute -z-10 right-[-12%] top-[-10%] h-[50rem] w-[50rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(31,111,255,0.12), transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.95, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: EASE }} 
      />

      {/* Showcase grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {SERVICES.map((svc, i) => (
          <ServiceCard
            key={svc.key}
            svc={svc}
            index={i}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>

      {/* Process timeline */}
      <ProcessTimeline />

      {/* Capabilities chips */}
      <Capabilities />
    </section>
  );
}

function ServiceCard({
  svc,
  index,
  active,
  setActive,
}: {
  svc: Svc;
  index: number;
  active: string;
  setActive: (k: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${y * -6}deg`);
    el.style.setProperty("--ry", `${x * 6}deg`);
    el.style.setProperty("--tx", `${x * 10}px`);
    el.style.setProperty("--ty", `${y * 10}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  const selected = active === svc.key;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: EASE }}  // ✅ typed ease
      className="group relative"
    >
      <div
        ref={ref}
        onMouseEnter={() => setActive(svc.key)}
        onFocus={() => setActive(svc.key)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={[
          "relative rounded-2xl glass p-5 h-full will-change-transform",
          "cursor-pointer",
        ].join(" ")}
        style={{
          transform:
            "perspective(1100px) rotateX(var(--rx)) rotateY(var(--ry)) translateX(var(--tx)) translateY(var(--ty))",
          transition: "transform 420ms cubic-bezier(.22,1,.36,1)",
        }}
      >
        <motion.span
          aria-hidden
          className="absolute top-0 bottom-0 w-[60%] -left-[50%] -skew-x-[18deg] opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            filter: "blur(10px)",
          }}
          whileHover={{ left: "120%" }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--icy), var(--blue))",
            }}
          />
          <span>Service</span>
        </div>

        <h3 className="mt-2 text-lg font-semibold">{svc.title}</h3>

        <p className="mt-2 text-sm text-slate-300 leading-relaxed">{svc.blurb}</p>

        <ul className="mt-4 space-y-2 text-sm">
          {svc.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <MagneticButton primary label={svc.cta ?? "Enquire"} />
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              layoutId="svc-ring"
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(207,233,255,0.22) inset, 0 30px 80px rgba(0,0,0,0.4)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


function MagneticButton({
  label,
  primary = false,
}: {
  label: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current!.style.setProperty("--tx", `${Math.max(-10, Math.min(10, x * 0.2))}px`);
    ref.current!.style.setProperty("--ty", `${Math.max(-10, Math.min(10, y * 0.2))}px`);
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--tx", "0px");
    ref.current.style.setProperty("--ty", "0px");
  };
  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      href="#contact"
      className={[
        "inline-flex rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform",
        primary
          ? "bg-[var(--blue)] text-white hover:opacity-90"
          : "border border-white/20 hover:bg-white/5 text-slate-200",
      ].join(" ")}
      style={{
        transform: "translateX(var(--tx,0px)) translateY(var(--ty,0px))",
      }}
    >
      {label}
    </a>
  );
}

function ProcessTimeline() {
  const steps = [
    ["Discovery", "Brief, goals, references"],
    ["Concept", "Direction, look-dev, timing"],
    ["Production", "Edit/Mograph/Design"],
    ["Delivery", "Master, versions, QC"],
  ] as const;

  return (
    <div className="mt-12">
      <div className="mb-4 text-sm text-slate-400">Process</div>
      <div className="relative rounded-2xl p-5 glass overflow-hidden">
        {/* SVG path */}
        <motion.svg
          viewBox="0 0 1000 120"
          className="absolute inset-x-0 top-6 w-full h-[120px] opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.path
            d="M 30 90 C 200 10, 300 10, 480 90 S 760 170, 970 60"
            fill="none"
            stroke="url(#gline)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gline" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--icy)" />
              <stop offset="100%" stopColor="var(--blue)" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Steps */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map(([t, d], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 * i }}
              className="rounded-xl bg-white/5 border border-white/10 p-4"
            >
              <div className="text-sm font-semibold">{t}</div>
              <div className="text-xs text-slate-400 mt-1">{d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Capabilities() {
  const items = [
    "Color Grading",
    "Story & Rhythm",
    "Logo Animation",
  ];
  return (
    <motion.ul
      className="mt-10 flex flex-wrap gap-3"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {items.map((t) => (
        <motion.li
          key={t}
          initial={{ opacity: 0, scale: 0.9, y: 6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200"
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 -translate-x-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
            }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          {t}
        </motion.li>
      ))}
    </motion.ul>
  );
}
