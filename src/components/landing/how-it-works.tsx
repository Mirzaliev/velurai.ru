"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    n: "01",
    title: "Создайте рабочее пространство",
    desc: "Регистрация занимает меньше минуты. Никаких карт, никаких сложностей.",
  },
  {
    n: "02",
    title: "Выберите AI-агента",
    desc: "Готовые агенты для преподавания, бизнеса, автоматизации и VPN.",
  },
  {
    n: "03",
    title: "Начните автоматизировать",
    desc: "Запускайте задачи, настраивайте процессы и экономьте десятки часов в неделю.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-4 py-32">
      <SectionHeading eyebrow="Как это работает" title="Три шага до результата" />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="glass relative rounded-3xl p-8"
          >
            <div className="mb-6 text-6xl font-bold text-gradient opacity-80">{s.n}</div>
            <h3 className="mb-3 text-xl font-semibold">{s.title}</h3>
            <p className="text-sm text-white/60">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-white/20 md:block">
                <ArrowRight className="h-6 w-6" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
