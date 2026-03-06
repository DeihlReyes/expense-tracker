"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/sign-in");
        },
        onError: () => {
          toast.error("An error occurred while signing out");
        },
        onResponse(context) {
          setLoading(false);
        },
      },
    });
  }

  return <Button onClick={handleSignOut}>Sign out</Button>;
}
