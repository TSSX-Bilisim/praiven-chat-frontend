import { apiFetch } from "@/lib/api/base";
import type { Message } from "@/lib/types/message";

async function fetchMessages(chatId: string) {
    const res = await apiFetch<{ messages: Message[] }>(`/messages`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'x-chat-id': chatId,
        },
        credentials:'include'
    });

    return res;
}

async function createMessage(chatId: string, modelId: number, content: string) {
    const res = await apiFetch<{ message: Message }>(`/messages`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            'x-chat-id': chatId,
            'x-model-id': String(modelId),
        },
        body: JSON.stringify({ content }),
        credentials: 'include',
    });

    return res;
}

async function fetchLastMessage() {
    const res = await apiFetch<{ message: Message }>(`/messages/last`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    return res;
}

export { fetchMessages, createMessage, fetchLastMessage };