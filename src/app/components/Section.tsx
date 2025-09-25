import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="w-[min(1100px,92vw)] mx-auto py-20 md:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
        className="mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-icy">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
}
