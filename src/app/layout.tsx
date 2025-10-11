import type { Metadata } from "next";
import "./globals.css";
import { MotionConfig } from "framer-motion";
import { Poppins } from "next/font/google";
import Cursor from "./components/Cursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rangga Portfolio",
  description: "crot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} min-h-dvh antialiased selection:bg-[var(--blue)]/30 selection:text-white`}
      >
        <MotionConfig
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          reducedMotion="user"
        >
          <Cursor />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
