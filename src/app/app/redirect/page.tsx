import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/helpers";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  redirect(user.role === "admin" ? "/admin/" : "/app");
}
