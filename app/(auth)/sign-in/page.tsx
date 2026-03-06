import type { Metadata } from "next";

import { redirectIfAuthenticated } from "@/lib/auth/auth-utils";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignIn() {
  await redirectIfAuthenticated();

  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </main>
  );
}
