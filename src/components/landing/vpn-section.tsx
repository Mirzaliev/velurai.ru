"use client";

import { motion } from "motion/react";
import { ArrowRight, Globe2, Lock, Server, Shield, Wifi, Zap } from "lucide-react";

const features = [
  { icon: Wifi, label: "Безлимит устройств" },
  { icon: Lock, label: "AES-256 шифрование" },
  { icon: Shield, label: "Kill Switch" },
  { icon: Server, label: "Без логов" },
  { icon: Globe2, label: "Серверы по миру" },
  { icon: Zap, label: "Высокая скорость" },
];

const dots = [
  { x: 18, y: 42 },
  { x: 25, y: 38 },
  { x: 30, y: 55 },
  { x: 45, y: 30 },
  { x: 50, y: 45 },
  { x: 55, y: 55 },
  { x: 62, y: 35 },
  { x: 70, y: 50 },
  { x: 78, y: 42 },
  { x: 82, y: 60 },
  { x: 40, y: 65 },
  { x: 68, y: 70 },
];

const stats = [
  { v: "94", l: "стран" },
  { v: "1200+", l: "серверов" },
  { v: "10Gb/s", l: "скорость" },
];

export function VpnSection() {
  return (
    <section id="vpn" className="relative px-4 py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-white/60">
            VPN-сервис
          </div>
          <h2 className="text-gradient text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Приватный интернет. <br />
            Без ограничений.
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Просматривайте безопасно с молниеносными VPN-серверами по всему миру.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f.label} className="glass flex items-center gap-3 rounded-2xl p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-500/30 to-blue-500/20">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-white/80">{f.label}</span>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Открыть VPN <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="glass relative overflow-hidden rounded-3xl p-6"
        >
          <div className="relative aspect-[4/3] w-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent" />
            <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full opacity-40">
              {/* stylized continents */}
              <path
                fill="rgba(255,255,255,0.08)"
                d="M10,30 Q15,20 25,22 T40,25 T55,22 L60,30 Q55,35 45,34 T30,36 T15,38 Z"
              />
              <path
                fill="rgba(255,255,255,0.08)"
                d="M60,20 Q70,18 80,22 T92,28 L88,40 Q78,42 70,38 T62,32 Z"
              />
              <path
                fill="rgba(255,255,255,0.08)"
                d="M35,45 Q45,44 55,48 T70,52 L65,58 Q55,58 45,55 T35,52 Z"
              />
            </svg>
            {dots.map((d, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
              >
                <span className="relative flex h-2 w-2 -translate-x-1/2 -translate-y-1/2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {stats.map((s) => (
              <div key={s.l} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div className="text-lg font-bold">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
