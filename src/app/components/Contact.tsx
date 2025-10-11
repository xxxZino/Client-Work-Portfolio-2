"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useState } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactSection() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.25 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.25 });

  const cardRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    mx.set(x * 8);
    my.set(y * 8);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    setLoading(false);
    setOk(true);
    setTimeout(() => setOk(false), 2200);
    e.currentTarget.reset();
  }

  const email = "ranggajembut@gmail.com";

  return (
    <section className="relative">
      {/* BG mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-24 h-[42rem] w-[42rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(207,233,255,0.18), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-12%] h-[52rem] w-[52rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(31,111,255,0.12), transparent 70%)" }}
        />
        <motion.div
          className="absolute -inset-y-28 -left-1/3 w-[70%] rotate-[12deg]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            filter: "blur(8px)",
          }}
          animate={{ x: ["-18%", "18%", "-18%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-stretch">
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ x: sx, y: sy }}
          className="relative overflow-hidden rounded-3xl glass p-6 md:p-8"
        >
          <h3 className="text-xl font-semibold">Let’s make something great</h3>
          <p className="mt-1 text-sm text-slate-400">
            Tell me a bit about your project. I’ll reply within 24 hours.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field id="name" name="name" label="Your Name" required />
            <Field id="email" name="email" label="Email" type="email" required />
            <Field id="subject" name="subject" label="Subject" />
            <Field id="message" name="message" label="Message" textarea required />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton type="submit" primary disabled={loading}>
                {loading ? "Sending…" : "Send Message"}
              </MagneticButton>

              <a
                href={`mailto:${email}`}
                className="rounded-xl px-4 py-2 border border-white/20 hover:bg-white/5 text-sm"
              >
                Email Instead
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-4 py-2 border border-white/20 hover:bg-white/5 text-sm"
              >
                WhatsApp
              </a>
            </div>
          </form>

          <motion.div
            initial={false}
            animate={ok ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="pointer-events-none absolute right-4 bottom-4 rounded-xl bg-white/10 px-3 py-2 text-sm"
            role="status"
            aria-live="polite"
          >
            Message sent. Thank you!
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="rounded-3xl glass p-6 md:p-8 flex flex-col justify-between"
        >
          <div>
            <h4 className="text-lg font-semibold">Direct Contact</h4>
            <p className="mt-1 text-sm text-slate-400">Prefer a quick chat? Reach me via:</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <ContactChip label="Email" value={email} href={`mailto:${email}`} />
              <ContactChip label="Phone" value="+62 812-3456-7890" href="tel:+6281234567890" />
              <ContactChip label="Instagram" value="@rangga" href="https://instagram.com/" />
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-400">
            Available for brand reels, campaigns, and editorial work — worldwide.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  textarea?: boolean;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
};

function Field({ id, name, label, textarea, type = "text", required }: FieldProps) {
  const base =
    "peer w-full rounded-xl bg-white/5 border border-white/12 outline-none transition focus:border-white/20 focus:bg-white/[0.07] text-[15px] text-slate-200 placeholder-transparent";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          required={required}
          placeholder=" "
          className={`${base} px-3 pt-6 pb-3 resize-y min-h-[120px]`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder=" "
          className={`${base} h-[56px] px-3 pt-6 pb-2`}
        />
      )}

      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-slate-400 transition-all
                   peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-icy
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[14px]"
      >
        {label}
      </label>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-0 peer-focus:ring-[1.5px] peer-focus:ring-transparent transition"
        style={{
          boxShadow: "0 0 0 1px rgba(207,233,255,0.22) inset, 0 10px 30px rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
}

type MagneticButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

function MagneticButton({ children, primary, type = "button", disabled }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={[
        "rounded-xl px-5 py-3 text-sm font-medium transition will-change-transform",
        primary
          ? "bg-[var(--blue)] text-white hover:opacity-90 disabled:opacity-60"
          : "border border-white/20 hover:bg-white/5 text-slate-200",
      ].join(" ")}
      style={{ transform: "translateX(var(--tx,0px)) translateY(var(--ty,0px))" }}
    >
      {children}
    </button>
  );
}


type ContactChipProps = { label: string; value: string; href?: string };

function ContactChip({ label, value, href }: ContactChipProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-left rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/7 transition"
      >
        <div className="text-[11px] text-slate-400">{label}</div>
        <div className="truncate">{value}</div>
      </a>
    );
  }
  return (
    <div className="text-left rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className="truncate">{value}</div>
    </div>
  );
}
