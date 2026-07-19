"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Sparkles, X } from "lucide-react";

const links = [
  { href: "#features", label: "Возможности" },
  { href: "#how", label: "Как это работает" },
  { href: "/vpn", label: "VPN", route: true },
  { href: "#pricing", label: "Тарифы" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3"
      >
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 glow-purple">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">Nebula AI</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) =>
            l.route ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            Войти
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Начать
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute left-4 right-4 top-20 flex flex-col gap-3 rounded-2xl p-5 md:hidden"
          >
            {links.map((l) =>
              l.route ? (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/80"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/80"
                >
                  {l.label}
                </a>
              )
            )}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-white px-4 py-2 text-center text-sm font-medium text-black"
            >
              Начать
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
