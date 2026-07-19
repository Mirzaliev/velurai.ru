"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { cn } from "@/utils/common";

const plans = [
  {
    name: "Starter",
    priceM: 9,
    priceY: 7,
    desc: "Для личных задач и знакомства с платформой.",
    features: ["1 AI-агент", "500 задач в месяц", "Базовая аналитика", "Email-поддержка"],
  },
  {
    name: "Pro",
    priceM: 29,
    priceY: 24,
    desc: "Для профессионалов и небольших команд.",
    features: [
      "Все AI-агенты",
      "Безлимит задач",
      "VPN включён",
      "Автоматизация",
      "Приоритетная поддержка",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    priceM: 99,
    priceY: 79,
    desc: "Для компаний и учебных заведений.",
    features: [
      "Всё из Pro",
      "Команды без ограничений",
      "SSO и SCIM",
      "Персональный менеджер",
      "SLA 99.99%",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative px-4 py-32">
      <SectionHeading
        eyebrow="Тарифы"
        title="Простые и честные цены"
        subtitle="Начните бесплатно. Обновляйтесь, когда будете готовы."
      />

      <div className="mt-10 flex justify-center">
        <div className="glass inline-flex items-center gap-1 rounded-full p-1">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              "rounded-full px-5 py-2 text-sm transition-all",
              !yearly ? "bg-white text-black" : "text-white/70"
            )}
          >
            Ежемесячно
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              "rounded-full px-5 py-2 text-sm transition-all",
              yearly ? "bg-white text-black" : "text-white/70"
            )}
          >
            Ежегодно
            <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-300">
              −20%
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className={cn(
              "relative rounded-3xl p-8",
              p.highlighted ? "gradient-border glow-purple" : "glass"
            )}
          >
            {p.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                Популярный
              </div>
            )}
            <div className="mb-2 text-sm text-white/60">{p.name}</div>
            <div className="mb-1 flex items-baseline gap-1">
              <span className="text-5xl font-bold">${yearly ? p.priceY : p.priceM}</span>
              <span className="text-sm text-white/50">/мес</span>
            </div>
            <p className="mb-6 text-sm text-white/60">{p.desc}</p>
            <a
              href="#"
              className={cn(
                "mb-6 block rounded-2xl px-4 py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02]",
                p.highlighted
                  ? "bg-white text-black"
                  : "border border-white/15 bg-white/5 text-white"
              )}
            >
              Начать бесплатно
            </a>
            <ul className="space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/75">
                  <Check className="h-4 w-4 text-purple-400" /> {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
