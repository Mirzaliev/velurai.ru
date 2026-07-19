"use client";

import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { DashboardMock } from "./dashboard-mock";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.06 },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pt-32 pb-20">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
          </span>
          Новое поколение AI-агентов · v2.0
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-gradient text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          Единая AI-платформа. <br />
          Безграничная продуктивность.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-8 max-w-2xl text-lg text-white/60 sm:text-xl"
        >
          AI-агенты для преподавателей, бизнеса и повседневных задач.
          Автоматизируйте работу, экономьте часы и масштабируйтесь быстрее.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Начать бесплатно
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="glass inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Play className="h-4 w-4" />
            Посмотреть демо
          </a>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative mx-auto mt-20 w-full max-w-5xl"
        >
          <div className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[40px] bg-gradient-to-r from-purple-500/30 via-blue-500/20 to-purple-500/30 blur-3xl" />
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
