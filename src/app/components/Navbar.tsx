// components/Navbar.tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observe sections → set active link
  useEffect(() => {
    const ids = links.map(l => l.href.replace("#",""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive("#" + visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const classes = useMemo(() => [
    "mx-auto w-[min(1080px,92vw)] rounded-full px-6 py-3",
    "flex items-center justify-between",
    "transition-all duration-300",
    scrolled ? "glass backdrop-blur-md border-white/15" : "bg-transparent"
  ].join(" "), [scrolled]);

  return (
    <>
      {/* Scroll progress tipis di paling atas */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[41] h-[2px] origin-left"
        style={{ scaleX: progress, background: "linear-gradient(90deg, var(--icy), var(--blue))" }}
      />

      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed inset-x-0 top-4 z-40"
      >
        <div className={classes}>
          <a href="#home" className="font-semibold tracking-wide">
            Rangtol
          </a>

          <nav className="flex items-center gap-5 text-sm">
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
                  {/* label */}
                  <span className="relative z-[2]">{l.label}</span>

                  {/* shimmer on hover */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "radial-gradient(40px 16px at 50% 120%, rgba(207,233,255,0.18), transparent)" }} />

                  {/* underline anim */}
                  <span className={[
                    "absolute left-1/2 -bottom-1 h-[2px] w-0 -translate-x-1/2 rounded-full",
                    "transition-all duration-400",
                    isActive ? "w-3/4 bg-white/80" : "group-hover:w-1/2 bg-white/50"
                  ].join(" ")} />
                </a>
              );
            })}
          </nav>
        </div>
      </motion.nav>
    </>
  );
}
