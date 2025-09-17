import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/validation/auth";
import { apiFetch } from "@/lib/api/base";
import type User from "../types/user";

export async function login(data: z.infer<typeof loginSchema>) {
  const res = await apiFetch<{ user: User }>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  });

  return res;
}

export async function register(data: z.infer<typeof registerSchema>) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function logOut() {
  return apiFetch("/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}