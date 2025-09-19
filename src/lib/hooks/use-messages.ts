import { useCallback, useState } from "react";
import { fetchMessages } from "../api/message";
import { useMessageStore } from "../stores/message";
import { useNavigate } from "react-router";
import { createMessage } from "../api/message";

export function useMessages() {
  const store = useMessageStore();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadMessages = useCallback(async (chatId: string) => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetchMessages(chatId);
      if (response.statusCode === 401) {
        navigate("/login");
        throw new Error("Unauthorized. Redirecting to login.");
      }
      if (!response.success) throw new Error(response.error || "Failed to fetch messages");
      if (response.data?.messages) {
        store.setMessages(chatId, response.data.messages.filter(msg => (msg.status === 'completed' || msg.status === 'masked')));
        if (response.data.messages.find(msg => msg.status !== 'completed' && msg.role === 'assistant')) {
          const draft = response.data.messages.find(msg => msg.status !== 'completed' && msg.role === 'assistant');
          store.setAIDraft(chatId, draft!);
        }
        if (!response.data.messages.find(msg => msg.status !== 'completed' && msg.role === 'user')) {
          const draft = response.data.messages.find(msg => msg.status !== 'completed' && msg.role === 'user');
          store.setUserDraft(chatId, draft!);
        }
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [navigate, store]);

  async function sendMessage(chatid: string, content: string, modelId: number) {
    const res = await createMessage(chatid, modelId, content);
    if (!res.success) {
      throw new Error(res.error || "Failed to send message");
    }
    const newMessage = res.data?.message;
    if (newMessage) {
      store.addUserDraft(chatid, newMessage);
    }
  }
  // Placeholder for message fetching logic
  return {
    userDraft: store.userDraft,
    aiDraft: store.aiDraft,
    messages: store.messages,
    loadMessages,
    sendMessage,
    error,
    loading,
  };
}