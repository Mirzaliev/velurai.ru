"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { cn } from "@/utils/common";

const items = [
  {
    q: "Что такое AI-агент?",
    a: "AI-агент — это специализированный ассистент на базе искусственного интеллекта, который выполняет задачи в определённой области: обучение, поддержка клиентов, автоматизация процессов и другие.",
  },
  {
    q: "Насколько безопасен VPN?",
    a: "Мы используем шифрование AES-256, Kill Switch и строгую политику «без логов». Ваши данные не сохраняются и не передаются третьим лицам.",
  },
  {
    q: "Можно ли отменить подписку в любой момент?",
    a: "Да. Отмена происходит в один клик из личного кабинета. Никаких скрытых условий и обязательств.",
  },
  {
    q: "Есть ли командные тарифы?",
    a: "Да, тариф Enterprise рассчитан на команды любого размера, включает SSO, SCIM и персонального менеджера.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-4 py-32">
      <SectionHeading eyebrow="FAQ" title="Частые вопросы" />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass overflow-hidden rounded-2xl"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="text-base font-medium">{it.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform",
                  open === i && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="px-5 pb-5 text-sm text-white/60">{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
