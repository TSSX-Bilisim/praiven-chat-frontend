import { apiFetch } from "@/lib/api/base";
import type { Chat } from "@/lib/types/chat";

export async function fetchChats(offset: number, limit: number) {
  const response = await apiFetch<{ chats: Chat[], hasMore: boolean, nextOffset: number }>(`/chats?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response;
}

export async function createChat() {
  const res = await apiFetch<{ chat: Chat }>("/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
  });

  return res;
}