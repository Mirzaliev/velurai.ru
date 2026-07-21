"use server";

import { getCurrentUser } from "./helpers";

export async function getCurrentUserRole() {
  const user = await getCurrentUser();
  return user?.role ?? null;
}
