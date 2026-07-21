import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/landing";
import { getCurrentUser } from "@/lib/auth/helpers";

export const metadata: Metadata = {
  title: "Регистрация — Nebula AI",
  description:
    "Создайте аккаунт Nebula AI и получите 7 дней бесплатного доступа.",
  robots: "noindex",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "admin" ? "/admin/" : "/app");
  }

  return <RegisterForm />;
}
