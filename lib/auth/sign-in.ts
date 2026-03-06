// lib/auth/sign-in.ts
import { type SignInFormData } from "@/lib/schema/auth";

import { authClient } from "./auth-client";

export async function signIn(data: SignInFormData) {
  const { email, password, rememberMe } = data;

  return new Promise((resolve, reject) => {
    authClient.signIn.email(
      { email, password, rememberMe },
      {
        onSuccess: (ctx) => {
          resolve(ctx);
        },
        onError: (ctx) => {
          reject(new Error(ctx.error.message));
        },
      }
    );
  });
}
