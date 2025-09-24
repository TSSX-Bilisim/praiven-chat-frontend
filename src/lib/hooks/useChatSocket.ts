import { useEffect } from "react";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { useMessageStore } from "@/lib/stores/message";
import type { Message, MessageEntity } from "../types/message";

let socket: Socket | null = null;

export function useChatSocket() {
  const store = useMessageStore.getState();

  useEffect(() => {
    if (!socket) {
      socket = io("/api", {
        withCredentials: true,
      });
    }

    // Stream tamamlandığında
    socket.on('message.masked', (data: { chatId: string; senderId: number; maskedContent: string; entities: MessageEntity[] }) => {
      store.applyMask(data.chatId, data.maskedContent, data.entities);
      store.finalizeUserMessage(data.chatId);
    });

    socket.on('llm.draft.created', (data: { message: Message }) => {
      store.addAIDraft(data.message.chatId, data.message);
    });

    socket.on("llm.stream.chunk", (data: { chatId: string; chunk: string }) => {
      store.appendAIStream(data.chatId, data.chunk);
    });

    socket.on('llm.stream.completed', (data: { chatId: string }) => {
      store.finalizeAIMessage(data.chatId);
    });

    return () => {
      socket?.off("llm.stream.chunk");
      socket?.off("llm.stream.completed");
    };
  }, [store]);
}
