import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/session";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignIn() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </main>
  );
}
