// components/IntroSequence.tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Easing } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { SKILLS } from "../lib/constants"; 

type Step = "iam" | "name" | "skills" | "done";

const EASE: Easing = [0.22, 1, 0.36, 1];

export default function IntroSequence({ onDone }: { onDone: () => void }) {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState<Step>("iam");
  const [skillIndex, setSkillIndex] = useState(0);

  const name = "Rangga Arya Shena";
  const letters = useMemo(() => name.split(""), []);

  useEffect(() => {
    const timers: number[] = [];
    const T = (n: number) => (prefersReduced ? n * 0.7 : n);

    timers.push(window.setTimeout(() => setStep("name"), T(1100)));
    timers.push(window.setTimeout(() => setStep("skills"), T(2500)));

    timers.push(
      window.setTimeout(() => {
        const int = window.setInterval(() => {
          setSkillIndex((i) => (i + 1) % SKILLS.length);
        }, T(900));
        timers.push(
          window.setTimeout(() => {
            window.clearInterval(int);
            setStep("done");
            onDone();
          }, T(4800))
        );
      }, T(2550))
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onDone, prefersReduced]);

  return (
    <AnimatePresence mode="wait">
      {step !== "done" && (
        <motion.section
          key={step}
          className="fixed inset-0 z-[70] grid place-items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          {/* subtle background glow + sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <motion.div
              className="absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(207,233,255,0.16), transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.96, x: -20, y: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 1.0, ease: EASE }}
            />
            <motion.div
              className="absolute top-[20%] right-[-12%] h-[46rem] w-[46rem] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(31,111,255,0.12), transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 1.04, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
            <motion.div
              className="absolute -inset-y-28 -left-1/3 w-[70%] rotate-[12deg]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
                filter: "blur(8px)",
              }}
              animate={{ x: ["-18%", "18%", "-18%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 text-center">
            {/* STEP: I am */}
            {step === "iam" && (
              <motion.h2
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-3xl md:text-5xl font-medium text-icy"
              >
                I AM
              </motion.h2>
            )}

            {/* STEP: Name (per-huruf) */}
            {step === "name" && (
              <div className="inline-block">
                <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                  {letters.map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, rotateX: 30, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.035,
                        ease: EASE,
                      }}
                      className={["inline-block", ch === " " ? "w-3 md:w-4" : ""].join(" ")}
                      style={{
                        background:
                          ch !== " "
                            ? "linear-gradient(90deg, var(--icy), #fff)"
                            : undefined,
                        WebkitBackgroundClip: ch !== " " ? "text" : undefined,
                        color: ch !== " " ? "transparent" : undefined,
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </h1>

                {/* underline sweep */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "min(420px, 70vw)" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                  className="mx-auto mt-3 h-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--icy), var(--blue))",
                  }}
                />
              </div>
            )}

            {/* STEP: Skills */}
            {step === "skills" && (
              <div className="inline-block">
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="text-4xl md:text-6xl font-bold"
                >
                  Multimedia & Broadcasting
                </motion.h1>

                <div className="relative h-8 md:h-9 mt-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={skillIndex}
                      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute inset-0 text-lg md:text-2xl text-slate-300"
                    >
                      {SKILLS[skillIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ scaleX: 0.6, opacity: 0.6 }}
                  animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="mx-auto mt-2 h-px w-40 md:w-56 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                  }}
                />
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
