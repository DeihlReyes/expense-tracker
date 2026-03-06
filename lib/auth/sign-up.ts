// lib/auth/sign-in.ts
import { type SignupFormData } from "@/lib/schema/auth";

import { authClient } from "./auth-client";

export async function signUp(data: SignupFormData) {
  const { name, email, password } = data;

  return new Promise((resolve, reject) => {
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
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
