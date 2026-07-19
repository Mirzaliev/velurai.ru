"use client";

import { motion } from "motion/react";
import { Briefcase, Check, GraduationCap, Shield, Workflow } from "lucide-react";
import { SectionHeading } from "./section-heading";

const features = [
  {
    icon: GraduationCap,
    title: "AI-агент для преподавателей",
    items: [
      "Планы уроков",
      "Генерация тестов",
      "Проверка работ",
      "Объяснение сложных тем",
      "Создание презентаций",
    ],
    gradient: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: Briefcase,
    title: "Бизнес AI",
    items: [
      "Поддержка клиентов",
      "Генерация контента",
      "Автоматизация CRM",
      "Написание писем",
      "Отчёты",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Workflow,
    title: "Автоматизация",
    items: [
      "Подключение сервисов",
      "Расписание процессов",
      "AI-ассистенты",
      "Умные уведомления",
    ],
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "VPN-сервис",
    items: [
      "Быстрые серверы",
      "Военная защита",
      "Без логов",
      "Безлимитный трафик",
      "Серверы по всему миру",
    ],
    gradient: "from-emerald-500 to-blue-500",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-4 py-32">
      <SectionHeading
        eyebrow="Возможности"
        title="Всё, что нужно для роста"
        subtitle="Четыре мощных модуля, объединённых одной платформой и одним интерфейсом."
      />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
            className="group glass relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1 hover:border-white/20"
          >
            <div
              className={`mb-6 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg`}
            >
              <f.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold">{f.title}</h3>
            <ul className="space-y-2.5">
              {f.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="h-4 w-4 shrink-0 text-purple-400" />
                  {it}
                </li>
              ))}
            </ul>
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-500/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
