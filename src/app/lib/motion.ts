// lib/motion.ts
import { Variants } from "framer-motion";

// fade dari bawah
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// fade biasa
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// scale-in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// stagger container
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

// blur masuk
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// text reveal (clip path)
export const textClip: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// float Y (loop)
export const floatY: Variants = {
  hidden: { y: 0 },
  show: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// rise in (fade + sedikit scale)
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// shimmer line effect
export const shimmerLine: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: [0, 1, 0],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};
