import type User from "@/lib/types/user";
import { apiFetch } from "./base";

export async function fetchUser() {
  const res = await apiFetch<{ user: User }>("/user/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
  });
  return res;
}