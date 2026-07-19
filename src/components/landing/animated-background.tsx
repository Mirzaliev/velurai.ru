"use client";

import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <motion.div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)" }}
        animate={{ x: [0, 60, -30, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.30), transparent 70%)" }}
        animate={{ x: [0, -60, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)" }}
        animate={{ x: [0, 40, -40, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
