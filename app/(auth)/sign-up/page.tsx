import type { Metadata } from "next";

import { redirectIfAuthenticated } from "@/lib/auth/auth-utils";

import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function SignUp() {
  await redirectIfAuthenticated();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
