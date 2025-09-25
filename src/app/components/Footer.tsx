// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.22, 1, 0.36, 1];

const socials = [
  { name: "Instagram", href: "https://instagram.com/", icon: Instagram },
  { name: "Behance",   href: "https://behance.net/",   icon: Behance   },
  { name: "Dribbble",  href: "https://dribbble.com/",  icon: Dribbble  },
  { name: "YouTube",   href: "https://youtube.com/",   icon: Youtube   },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* gradient divider */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
      />

      {/* mesh glow subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[32rem] w-[32rem] rounded-full -z-10"
        style={{ background: "radial-gradient(closest-side, rgba(31,111,255,0.12), transparent 70%)" }}
      />

      <div className="w-[min(1100px,92vw)] mx-auto py-12 md:py-14">
        {/* top row */}
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: EASE }}  // ✅ pakai EASE
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-xl"
              style={{
                background:
                  "conic-gradient(from 220deg at 50% 50%, var(--icy), var(--blue))",
                boxShadow: "0 8px 28px rgba(0,0,0,.35)",
              }}
            />
            <div>
              <div className="text-sm tracking-widest text-slate-400">PORTFOLIO</div>
              <div className="text-xl font-semibold">RANGGA</div>
            </div>
          </div>

          {/* Nav anchors */}
          <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
            {([
              ["Home", "#home"],
              ["About", "#about"],
              ["Works", "#works"],
              ["Services", "#services"],
              ["Contact", "#contact"],
            ] as const).map(([t, href]) => (
              <a key={t} href={href} className="hover:text-white transition">
                {t}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ name, href, icon: Icon }) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: EASE }}  // ✅ pakai EASE
                className="group grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/10/80"
                aria-label={name}
                title={name}
              >
                <Icon className="h-[18px] w-[18px] text-slate-300 group-hover:text-white transition" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* callout / email */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: EASE }}  // ✅ pakai EASE
          className="mt-10 rounded-3xl glass p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <div className="text-sm text-slate-400">Let’s work together</div>
            <div className="text-lg font-medium">ranggajembut@kontol</div>
          </div>
          <div className="flex gap-3">
            <a
              href="mailto:hello@rangga.work"
              className="rounded-xl px-4 py-2 bg-[var(--blue)] text-white text-sm font-medium hover:opacity-90 transition"
            >
              Email Me
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              className="rounded-xl px-4 py-2 border border-white/20 text-sm hover:bg-white/5 transition"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>

        {/* bottom row */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-slate-400">
          <div>© {year} Rangga Arya Shena. Crafted with Next.js, Tailwind, and Framer Motion.</div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

/* ===== Back To Top ===== */
function BackToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2"
      title="Back to top"
    >
      <span className="text-slate-300 group-hover:text-white transition">Back to top</span>
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-300 group-hover:text-white transition">
        <path d="M12 5l-7 7h4v7h6v-7h4z" fill="currentColor" />
      </svg>
    </motion.button>
  );
}

/* ====== Minimal inline SVG icons ====== */
function Instagram({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function Behance({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4 7h4.2c2.1 0 3.3 1 3.3 2.7 0 1-0.5 1.8-1.3 2.1 1.1.3 1.9 1.2 1.9 2.6C12.1 17.1 10.7 18 8.8 18H4V7zm3.9 3.9c.9 0 1.4-.4 1.4-1.1s-.5-1.1-1.4-1.1H6.1v2.2h1.8zm.4 4.2c.9 0 1.5-.4 1.5-1.2s-.6-1.2-1.5-1.2H6.1v2.4h2.2zM14.2 12.5c0-3 1.9-5 4.6-5 2.7 0 4.3 1.7 4.6 3.7h-2.4c-.2-.9-1-1.6-2.2-1.6-1.4 0-2.3 1.1-2.3 2.9s.9 2.9 2.3 2.9c1.2 0 2-.7 2.2-1.7h2.4c-.3 2.1-1.9 3.8-4.6 3.8-2.7 0-4.6-2-4.6-5zM14 7h5v1.5h-5V7z" />
    </svg>
  );
}
function Dribbble({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 9c4 0 8.5-1.5 12-5M4.5 14.5c3.5-1 8.5-1.2 15 1M9 4.5c2.5 3 4.8 7.6 6.2 14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Youtube({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22 12c0 3.2-.4 5-1 5.6-.8.9-8.1.9-9 .9s-8.2 0-9-.9C2.4 17 2 15.2 2 12s.4-5 1-5.6C3.8 5.5 11.1 5.5 12 5.5s8.2 0 9 .9c.6.6 1 2.4 1 5.6z" />
      <path d="M10 15V9l5 3-5 3z" fill="#0b0f19" />
    </svg>
  );
}
