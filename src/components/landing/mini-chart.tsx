"use client";

import { motion } from "motion/react";

export function MiniChart() {
  const bars = [40, 65, 45, 80, 55, 90, 72];

  return (
    <div className="flex h-24 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
          className="flex-1 rounded-t bg-gradient-to-t from-purple-500 to-blue-400"
        />
      ))}
    </div>
  );
}
