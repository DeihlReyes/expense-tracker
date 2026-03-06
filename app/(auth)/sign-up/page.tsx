import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/session";

import { SignupForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function SignUp() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
