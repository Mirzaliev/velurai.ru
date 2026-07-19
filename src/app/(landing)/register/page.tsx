import type { Metadata } from "next";
import { RegisterForm } from "@/components/landing";

export const metadata: Metadata = {
  title: "Регистрация — Nebula AI",
  description:
    "Создайте аккаунт Nebula AI и получите 7 дней бесплатного доступа.",
  robots: "noindex",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
