// components/Cursor.tsx
"use client";
import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  const x = useSpring(pos.x, { stiffness: 300, damping: 30, mass: 0.6 });
  const y = useSpring(pos.y, { stiffness: 300, damping: 30, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, textarea, select")) setHover(true);
      else setHover(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[90] hidden md:block"
      style={{ left: 0, top: 0, x, y }}
    >
      <span
        className={[
          "block -translate-x-1/2 -translate-y-1/2 rounded-full",
          "backdrop-blur",
        ].join(" ")}
        style={{
          width: hover ? 16 : 10,
          height: hover ? 16 : 10,
          background:
            "radial-gradient(circle at 30% 30%, rgba(207,233,255,0.8), rgba(31,111,255,0.6))",
          boxShadow: "0 0 20px rgba(31,111,255,0.35)",
          transition: "width .15s ease, height .15s ease",
        }}
      />
    </motion.div>
  );
}
