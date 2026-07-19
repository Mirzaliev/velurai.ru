import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  if (user?.role !== "admin") {
    redirect("/");
  }
  return session;
}

export async function requirePlatformAccess(platformSlug: string) {
  const session = await requireAuth();
  const platform = await prisma.platform.findUnique({
    where: { slug: platformSlug },
  });
  if (!platform || !platform.isActive) {
    redirect("/");
  }
  const access = await prisma.userPlatformAccess.findUnique({
    where: {
      userId_platformId: {
        userId: session.user.id,
        platformId: platform.id,
      },
    },
  });
  if (!access) {
    redirect("/");
  }
  return { session, platform, access };
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.user.id },
  });
}
