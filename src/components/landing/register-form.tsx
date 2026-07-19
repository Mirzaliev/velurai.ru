"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { AuthLayout } from "./auth-layout";
import { Field } from "./auth-field";
import { Divider } from "./auth-divider";
import { SocialBtn, GoogleIcon } from "./auth-social-button";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout
      title="Создайте аккаунт"
      subtitle="7 дней бесплатно · без банковской карты · отмена в любой момент."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => setLoading(false), 900);
        }}
        className="space-y-4"
      >
        <Field icon={User} type="text" placeholder="Иван Иванов" label="Имя" />
        <Field
          icon={Mail}
          type="email"
          placeholder="you@company.com"
          label="Email"
        />
        <Field
          icon={Lock}
          type="password"
          placeholder="Минимум 8 символов"
          label="Пароль"
        />
        <label className="flex items-start gap-2 text-xs text-white/60">
          <input
            type="checkbox"
            defaultChecked
            className="mt-0.5 accent-purple-500"
          />
          Я соглашаюсь с условиями использования и политикой
          конфиденциальности.
        </label>
        <button
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          {loading ? "Создаём аккаунт…" : "Начать бесплатно"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      <Divider />

      <div className="grid grid-cols-2 gap-3">
        <SocialBtn icon={<GoogleIcon />} label="Google" />
      </div>

      <p className="mt-8 text-center text-sm text-white/60">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-medium text-white hover:underline">
          Войти
        </Link>
      </p>
    </AuthLayout>
  );
}
