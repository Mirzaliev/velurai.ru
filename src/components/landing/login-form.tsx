"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { AuthLayout } from "./auth-layout";
import { Field } from "./auth-field";
import { Divider } from "./auth-divider";
import { SocialBtn, GoogleIcon } from "./auth-social-button";

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout
      title="С возвращением"
      subtitle="Войдите, чтобы продолжить работу с Nebula AI."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => setLoading(false), 900);
        }}
        className="space-y-4"
      >
        <Field
          icon={Mail}
          type="email"
          placeholder="you@company.com"
          label="Email"
        />
        <Field
          icon={Lock}
          type="password"
          placeholder="••••••••"
          label="Пароль"
          trailing={
            <Link
              href="/login"
              className="text-xs text-white/50 hover:text-white"
            >
              Забыли?
            </Link>
          }
        />
        <button
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          {loading ? "Входим…" : "Войти"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      <Divider />

      <div className="grid grid-cols-2 gap-3">
        <SocialBtn icon={<GoogleIcon />} label="Google" />
      </div>

      <p className="mt-8 text-center text-sm text-white/60">
        Нет аккаунта?{" "}
        <Link
          href="/register"
          className="font-medium text-white hover:underline"
        >
          Зарегистрироваться
        </Link>
      </p>
    </AuthLayout>
  );
}
