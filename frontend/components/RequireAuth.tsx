"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getRole } from "@/lib/auth";

export default function RequireAuth({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "admin" | "user";
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    if (role === "admin" && getRole() !== "admin") {
      router.replace("/chat");
      return;
    }
    setReady(true);
  }, [router, role]);

  if (!ready) return null;
  return <>{children}</>;
}
