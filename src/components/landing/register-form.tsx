"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth/client";
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

const CALLBACK_URL = "/teacher";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true);
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

    if (!agreed) {
      setError("Необходимо согласиться с условиями использования.");
      return;
    }

    setLoading(true);

    const result = await authClient.signUp.email({
      email,
      password,
      name: name.trim(),
      callbackURL: CALLBACK_URL,
    });

    setLoading(false);

    if (result.error) {
      setError(getAuthErrorMessage(result.error));
      return;
    }

    router.push(CALLBACK_URL);
    router.refresh();
  }

  async function handleYandex() {
    setError("");
    setOauthLoading(true);

    const result = await authClient.signIn.oauth2({
      providerId: "yandex",
      callbackURL: CALLBACK_URL,
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
      title="Создайте аккаунт"
      subtitle="7 дней бесплатно · без банковской карты · отмена в любой момент."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthError message={error} />

        <Field
          icon={User}
          type="text"
          name="name"
          placeholder="Иван Иванов"
          label="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
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
          placeholder="Минимум 8 символов"
          label="Пароль"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <label className="flex items-start gap-2 text-xs text-white/60">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={loading}
            className="mt-0.5 accent-purple-500"
          />
          Я соглашаюсь с условиями использования и политикой
          конфиденциальности.
        </label>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          {loading ? "Создаём аккаунт…" : "Начать бесплатно"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      <Divider />

      <SocialBtn
        icon={<YandexIcon />}
        label="Через Яндекс"
        onClick={handleYandex}
        loading={oauthLoading}
        disabled={loading}
      />

      <p className="mt-8 text-center text-sm text-white/60">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-medium text-white hover:underline">
          Войти
        </Link>
      </p>
    </AuthLayout>
  );
}
