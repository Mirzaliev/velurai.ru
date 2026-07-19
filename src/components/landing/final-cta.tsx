"use client";

import { motion } from "motion/react";
import { Rocket } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] p-1"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-purple-500/40 blur-2xl" />
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0a0a15] to-[#0a0a0a] px-6 py-20 text-center sm:px-16">
          <div className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Готовы сэкономить сотни часов?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/60">
              Присоединяйтесь к тысячам команд, которые уже автоматизировали работу с Nebula AI.
            </p>
            <a
              href="#"
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Начать бесплатно <Rocket className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
