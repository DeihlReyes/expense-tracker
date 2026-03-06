import { redirect } from "next/navigation";

import { getServerSession } from "../session";

export async function redirectIfAuthenticated() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/dashboard");
  }
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return session.user;
}
