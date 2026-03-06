import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/sign-out-button";
import { getServerSession } from "@/lib/session";

export default async function page() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <SignOutButton />
    </main>
  );
}
