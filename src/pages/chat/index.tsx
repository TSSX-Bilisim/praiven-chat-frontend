import { Messages } from "@/components/chat/messages";
import { useParams } from "react-router"
import { useMessages } from "@/lib/hooks/use-messages";
import { useEffect } from "react";

export default function ChatPage() {
  const params = useParams()
  const chatId = params.chatId!
  const { loadMessages } = useMessages();
  useEffect(() => {
    loadMessages(chatId);
  }, [chatId]);

  return (
    <div>
      <h1>Chat Page</h1>
      <p>Chat ID: {chatId}</p>
      <Messages chatId={chatId} />
    </div>
  )
}
