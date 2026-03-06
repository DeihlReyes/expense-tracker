import { SignOutButton } from "@/components/sign-out-button";
import { requireAuth } from "@/lib/auth/auth-utils";

export default async function page() {
  const user = await requireAuth();

  return (
    <main>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <SignOutButton />
    </main>
  );
}
