// components/Navbar.tsx
"use client";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const links = [
  { href: "#home",     label: "Home" },
  { href: "#about",    label: "About" },
  { href: "#works",    label: "Works" },
  { href: "#services", label: "Services" },
  { href: "#contact",  label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive("#" + visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const classes = useMemo(
    () =>
      [
        "mx-auto w-[min(1080px,92vw)] rounded-full",
        "px-4 md:px-6 py-2.5 md:py-3", // lebih rapat di mobile
        "flex items-center justify-between",
        "transition-all duration-300",
        scrolled ? "glass backdrop-blur-md border-white/15" : "bg-transparent",
      ].join(" "),
    [scrolled]
  );

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[41] h-[2px] origin-left"
        style={{ scaleX: progress, background: "linear-gradient(90deg, var(--icy), var(--blue))" }}
      />

      <motion.nav initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed inset-x-0 top-4 z-40">
        <div className={classes}>
          <a href="#home" className="font-semibold tracking-wide">
            Tn. R
          </a>

          {/* DESKTOP NAV — tetap */}
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={[
                    "relative group",
                    "transition-colors",
                    isActive ? "text-white" : "text-slate-300 hover:text-white",
                  ].join(" ")}
                >
                  <span className="relative z-[2]">{l.label}</span>
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "radial-gradient(40px 16px at 50% 120%, rgba(207,233,255,0.18), transparent)" }}
                  />
                  <span
                    className={[
                      "absolute left-1/2 -bottom-1 h-[2px] w-0 -translate-x-1/2 rounded-full",
                      "transition-all duration-400",
                      isActive ? "w-3/4 bg-white/80" : "group-hover:w-1/2 bg-white/50",
                    ].join(" ")}
                  />
                </a>
              );
            })}
          </nav>

          {/* HAMBURGER — compact dan rapi */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" className="text-white">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[50] bg-[var(--ink)]/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-20 w-[min(92vw,640px)] rounded-2xl glass p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-2 py-1">
                <span className="font-semibold tracking-wide">Navigation</span>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 grid place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" className="text-white">
                    <path
                      fill="currentColor"
                      d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59L7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-2 divide-y divide-white/10">
                {links.map((l, i) => {
                  const isActive = active === l.href;
                  return (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      className={[
                        "flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition",
                        isActive ? "text-white" : "text-slate-300",
                      ].join(" ")}
                    >
                      <span>{l.label}</span>
                      <span
                        className="h-[2px] w-10 rounded-full"
                        style={{ background: "linear-gradient(90deg, var(--icy), var(--blue))" }}
                      />
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href="#works"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 bg-[var(--blue)] text-center text-white font-medium hover:opacity-90 transition"
                >
                  View Works
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 border border-white/20 text-center hover:bg-white/5 transition"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
