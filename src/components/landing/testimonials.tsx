"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { SectionHeading } from "./section-heading";

const items = [
  {
    name: "Анна Смирнова",
    role: "Учитель математики",
    text: "Раньше я тратила выходные на подготовку — теперь Nebula собирает планы уроков за минуты.",
  },
  {
    name: "Дмитрий К.",
    role: "CEO стартапа",
    text: "Автоматизировали поддержку и отчёты. Команда выросла в 3 раза без найма.",
  },
  {
    name: "Мария Иванова",
    role: "Маркетолог",
    text: "Контент, письма и CRM — всё в одном месте. Экономлю 20 часов в неделю.",
  },
  {
    name: "Илья В.",
    role: "Разработчик",
    text: "Лучший интерфейс среди AI-платформ. Работает быстро, выглядит премиально.",
  },
  {
    name: "Ольга П.",
    role: "Директор школы",
    text: "AI-агент помогает педагогам, а VPN защищает данные учеников. Идеальное сочетание.",
  },
  {
    name: "Артём Л.",
    role: "Фрилансер",
    text: "Один аккаунт закрывает почти все задачи, за которые раньше платил трём сервисам.",
  },
];

export function Testimonials() {
  return (
    <section className="relative px-4 py-32">
      <SectionHeading eyebrow="Отзывы" title="Нам доверяют команды по всему миру" />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-4 flex gap-0.5">
              {[...Array(5)].map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-white/80">«{t.text}»</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold">
                {t.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-white/50">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
