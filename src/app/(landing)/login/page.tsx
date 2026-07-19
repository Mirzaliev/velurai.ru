import type { Metadata } from "next";
import { LoginForm } from "@/components/landing";

export const metadata: Metadata = {
  title: "Вход — Nebula AI",
  description:
    "Войдите в Nebula AI, чтобы управлять своими AI-агентами и VPN.",
  robots: "noindex",
};

export default function LoginPage() {
  return <LoginForm />;
}
