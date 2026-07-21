import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/landing";
import { getCurrentUser } from "@/lib/auth/helpers";

export const metadata: Metadata = {
  title: "Вход — Nebula AI",
  description: "Войдите в Nebula AI, чтобы управлять своими AI-агентами и VPN.",
  robots: "noindex",
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "admin" ? "/admin/" : "/app");
  }

  return <LoginForm />;
}
