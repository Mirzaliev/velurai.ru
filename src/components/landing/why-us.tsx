"use client";

import { motion } from "motion/react";
import { Cloud, Cpu, Layers, Lock, Sparkles, Zap } from "lucide-react";
import { SectionHeading } from "./section-heading";

const items = [
  { icon: Lock, label: "Безопасно" },
  { icon: Zap, label: "Быстро" },
  { icon: Cpu, label: "На базе ИИ" },
  { icon: Cloud, label: "Облачно" },
  { icon: Layers, label: "Кросс-платформенно" },
  { icon: Sparkles, label: "Современный интерфейс" },
];

export function WhyUs() {
  return (
    <section className="relative px-4 py-32">
      <SectionHeading eyebrow="Почему мы" title="Создано для тех, кто ценит время" />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20">
              <it.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-sm font-medium">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
