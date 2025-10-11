"use client";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Preloader from "./components/Preloader";
import IntroSequence from "./components/IntroSequence";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import { Section } from "./components/Section";
import ServicesSection from "./components/Services";
import Contact from "./components/Contact";
import { Footer } from "./components/Footer";
import { WORKS, Work } from "./lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  return (
    <main>
      <AnimatePresence>
        {!loaded && <Preloader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {loaded && !introDone && (
          <IntroSequence key="intro" onDone={() => setIntroDone(true)} />
        )}
      </AnimatePresence>

      <motion.div
        key="site"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />

        <Hero />
        <About />

        <Section
          id="works"
          title="Selected Works"
          subtitle="Cinematic edits • Motion graphics • Design"
        >
          <SelectedWorks items={WORKS} />
        </Section>

        <Section
          id="services"
          title="Services"
          subtitle="End-to-end creative with luxury motion & edit"
        >
          <ServicesSection />
        </Section>

        <Section
          id="contact"
          title="Let’s Collaborate"
          subtitle="Open for commissions, campaigns, and brand reels"
        >
          <Contact />
        </Section>
        <Footer />
      </motion.div>
    </main>
  );
}

function SelectedWorks({ items }: { items: Work[] }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((w, i) => (
        <WorkCard key={w.title} work={w} delay={prefersReduced ? 0 : i * 0.06} />
      ))}
    </motion.div>
  );
}

function WorkCard({ work, delay = 0 }: { work: Work; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5; 
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${y * -6}deg`);
    el.style.setProperty("--ry", `${x * 6}deg`);
    el.style.setProperty("--tx", `${x * 9}px`);
    el.style.setProperty("--ty", `${y * 9}px`);
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  return (
    <motion.a
      href={work.href ?? "#"}
      target={work.href ? "_blank" : undefined}
      rel={work.href ? "noreferrer" : undefined}
      variants={fadeUp}
      transition={{ delay, duration: 0.6, ease }}
      className="group block"
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative rounded-2xl overflow-hidden glass will-change-transform"
        style={{
          transform:
            "perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)) translateX(var(--tx)) translateY(var(--ty))",
          transition: "transform 420ms cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition"
          style={{
            boxShadow:
              "0 0 0 1px rgba(207,233,255,0.18) inset, 0 20px 60px rgba(0,0,0,0.35)",
          }}
        />

        <motion.span
          aria-hidden
          className="absolute top-0 bottom-0 w-[65%] -left-[55%] -skew-x-[18deg] opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            filter: "blur(10px)",
          }}
          whileHover={{ left: "110%" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        <div className="aspect-[16/11] overflow-hidden">
          <img
            src={work.cover}
            alt={work.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.06]"
            style={{ transform: "translateZ(0)" }}
          />
        </div>

        <div className="relative z-10 p-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium">{work.title}</h3>
            <p className="text-xs text-slate-400">{work.tag}</p>
          </div>
          <div className="text-xs text-slate-300 group-hover:text-white transition">
            View →
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,25,0.7), rgba(11,15,25,0))",
          }}
        />
      </div>
    </motion.a>
  );
}
