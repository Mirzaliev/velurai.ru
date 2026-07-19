"use client";

import {
  BarChart3,
  Bot,
  Calendar,
  ListChecks,
  MessageCircle,
  Sparkles,
  Workflow,
} from "lucide-react";
import { MiniChart } from "./mini-chart";
import { cn } from "@/utils/common";

const sidebarItems = [
  { icon: BarChart3, label: "Аналитика", active: true },
  { icon: MessageCircle, label: "AI чат" },
  { icon: ListChecks, label: "Задачи" },
  { icon: Calendar, label: "Календарь" },
  { icon: Workflow, label: "Автоматизация" },
  { icon: Bot, label: "Агенты" },
];

const stats = [
  { label: "Задачи", value: "1 284", trend: "+12%" },
  { label: "Экономия часов", value: "342", trend: "+38%" },
  { label: "Активные агенты", value: "24", trend: "+4" },
];

export function DashboardMock() {
  return (
    <div className="gradient-border overflow-hidden rounded-3xl p-2">
      <div className="grid grid-cols-1 gap-2 rounded-2xl bg-black/60 p-3 md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-1 rounded-xl bg-white/[0.02] p-3 md:flex">
          <div className="mb-2 flex items-center gap-2 px-2 py-1">
            <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="h-3 w-3" />
            </div>
            <span className="text-xs font-semibold">Nebula</span>
          </div>
          {sidebarItems.map((it, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
                it.active ? "bg-white/10 text-white" : "text-white/50"
              )}
            >
              <it.icon className="h-3.5 w-3.5" />
              {it.label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-left"
              >
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  {s.label}
                </div>
                <div className="mt-1 text-lg font-bold sm:text-xl">{s.value}</div>
                <div className="text-[10px] text-emerald-400">{s.trend}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 md:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-medium">Активность агентов</div>
                <div className="text-[10px] text-white/40">за 7 дней</div>
              </div>
              <MiniChart />
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-left">
              <div className="mb-2 text-xs font-medium">AI-чат</div>
              <div className="space-y-1.5">
                <div className="rounded-lg bg-white/5 p-2 text-[10px] text-white/70">
                  Напиши план урока по алгебре
                </div>
                <div className="rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 p-2 text-[10px] text-white/90">
                  Готовлю структуру из 5 модулей…
                </div>
                <div className="rounded-lg bg-white/5 p-2 text-[10px] text-white/70">
                  Добавь 10 задач
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
