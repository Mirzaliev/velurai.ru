"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { getCurrentUserRole } from "@/lib/auth/actions";
import {
  getAuthErrorMessage,
  validateAuthEmail,
  validateAuthPassword,
} from "@/lib/auth/errors";
import { AuthLayout } from "./auth-layout";
import { Field } from "./auth-field";
import { Divider } from "./auth-divider";
import { SocialBtn, YandexIcon } from "./auth-social-button";
import { AuthError } from "./auth-error";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const emailError = validateAuthEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    const passwordError = validateAuthPassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      setError(getAuthErrorMessage(result.error));
      return;
    }

    const role = await getCurrentUserRole();
    router.push(role === "admin" ? "/admin/" : "/app");
    router.refresh();
  }

  async function handleYandex() {
    setError("");
    setOauthLoading(true);

    const result = await authClient.signIn.oauth2({
      providerId: "yandex",
      callbackURL: "/app/redirect",
    });

    setOauthLoading(false);

    if (result.error) {
      setError(getAuthErrorMessage(result.error));
      return;
    }

    if (result.data?.url) {
      window.location.href = result.data.url;
    }
  }

  return (
    <AuthLayout
      title="С возвращением"
      subtitle="Войдите, чтобы продолжить работу с Nebula AI."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthError message={error} />

        <Field
          icon={Mail}
          type="email"
          name="email"
          placeholder="you@company.com"
          label="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Field
          icon={Lock}
          type="password"
          name="password"
          placeholder="••••••••"
          label="Пароль"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
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
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          {loading ? "Входим…" : "Войти"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      <Divider />

      <SocialBtn
        icon={<YandexIcon />}
        label="Войти через Яндекс"
        onClick={handleYandex}
        loading={oauthLoading}
        disabled={loading}
      />

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
