"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { fadeUp, scaleIn, stagger } from "../lib/motion";

export default function About() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.35, once: true });

  const title = "About Me";
  const letters = useMemo(() => title.split(""), []);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 10% 0%, rgba(31,111,255,0.08), transparent 60%), radial-gradient(100% 80% at 90% 40%, rgba(207,233,255,0.06), transparent 60%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      />

      <div ref={wrapRef} className="w-[min(1100px,92vw)] mx-auto">
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tight">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className={["inline-block", ch.trim() ? "" : "w-2"].join(" ")}
                style={{
                  background: ch.trim()
                    ? "linear-gradient(90deg, var(--icy), #fff)"
                    : undefined,
                  WebkitBackgroundClip: ch.trim() ? "text" : undefined,
                  color: ch.trim() ? "transparent" : undefined,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="mt-3 h-[3px] w-28 origin-left rounded-full"
            style={{ background: "linear-gradient(90deg, var(--icy), var(--blue))" }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <InteractivePortrait src="/me.PNG" />

          <div className="space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10"
            >
              <p className="text-slate-300 leading-relaxed">
                I’m Rangga, a Motion Graphic Designer and Video Editor passionate about creating dynamic, engaging, and impactful visual content. 
                I have worked on 22 microskill learning videos and produced Instagram Reels and posts, 
                focusing on storytelling, creativity, and delivering professional results.
              </p>
            </motion.div>

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3 text-center"
            >
              <Stat label="Projects" target={20} suffix="+" />
              <Stat label="Experience" target={1} suffix=" yrs" />
              <Stat label="Brands" target={20} suffix="+" />
            </motion.ul>

            <SkillsGrid
              items={[
                "DaVinci Resolve / Color",
                "After Effects / Mograph",
                "Premiere Pro / Editing",
                "Cinema Cameras",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InteractivePortrait({ src }: { src: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.3 });
  const rotateX = useTransform(sy, [-40, 40], [5, -5]);
  const rotateY = useTransform(sx, [-80, 80], [-6, 6]);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    mx.set(Math.max(-80, Math.min(80, x / 4)));
    my.set(Math.max(-40, Math.min(40, y / 4)));
  };
  const onLeave = () => {
    mx.set(0); my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={scaleIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative rounded-[1.6rem] overflow-hidden glass" style={{ transformStyle: "preserve-3d" }}>
        <div className="relative z-[1]">
          <Image
            src={src}
            alt="Rangga portrait"
            width={1200}
            height={880}
            priority={false}
            className="block w-full h-[440px] object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, target, suffix }: { label: string; target: number; suffix?: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  const mv = useMotionValue(0);
  const [n, setN] = useState(0);
  useEffect(() => {
    const unsub = mv.on("change", (v) => setN(Math.round(v)));
    return () => unsub();
  }, [mv]);

  useEffect(() => {
    if (inView) animate(mv, target, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
  }, [inView, target, mv]);

  return (
    <motion.li variants={scaleIn} className="rounded-xl bg-white/5 py-4" ref={ref}>
      <div className="text-xl font-semibold">
        {n}
        {suffix}
      </div>
      <div className="text-[11px] text-slate-400">{label}</div>
    </motion.li>
  );
}

function SkillsGrid({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-3 text-sm"
    >
      {items.map((t, i) => (
        <SkillBadge key={t} label={t} delay={i * 0.05} />
      ))}
    </motion.ul>
  );
}

function SkillBadge({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.li
      variants={scaleIn}
      transition={{ delay, duration: 0.5 }}
      className="relative px-4 py-2 rounded-full text-slate-200 bg-white/5 border border-white/10 overflow-hidden"
    >
      {label}
    </motion.li>
  );
}
