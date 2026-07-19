"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <motion.div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.30), transparent 70%)",
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-40 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)",
          }}
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <header className="flex items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 glow-purple">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Nebula AI
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-white/60 hover:text-white"
        >
          ← На главную
        </Link>
      </header>

      <main className="flex items-center justify-center px-4 py-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="gradient-border rounded-3xl p-[1px]">
            <div className="rounded-3xl bg-black/60 p-8 backdrop-blur-xl md:p-10">
              <h1 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-white/60">{subtitle}</p>
              <div className="mt-8">{children}</div>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-white/40">
            Продолжая, вы соглашаетесь с условиями использования и политикой
            конфиденциальности.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
