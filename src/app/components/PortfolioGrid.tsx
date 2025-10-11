"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { WORKS } from "../lib/constants";    

import { fadeUp } from "../lib/motion";

export default function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {WORKS.map((w, i) => (
        <Card key={w.title} index={i} title={w.title} tag={w.tag} cover={w.cover} href={w.href} />
      ))}
    </div>
  );
}

function Card({
  index,
  title,
  tag,
  cover,
  href,
}: {
  index: number;
  title: string;
  tag: string;
  cover: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${y * -6}deg`);
    el.style.setProperty("--ry", `${x * 6}deg`);
    el.style.setProperty("--tx", `${x * 8}px`);
    el.style.setProperty("--ty", `${y * 8}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  return (
    <motion.a
      href={href ?? "#"}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.06 }}
      className="group block"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="overflow-hidden rounded-2xl glass will-change-transform"
        style={{
          transform:
            "perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateX(var(--tx)) translateY(var(--ty))",
          transition: "transform 400ms cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="aspect-[16/11] overflow-hidden">
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs text-slate-400">{tag}</p>
          </div>
          <div className="text-xs text-slate-300">View →</div>
        </div>
      </div>
    </motion.a>
  );
}
