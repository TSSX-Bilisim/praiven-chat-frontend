import { Messages } from "@/components/chat/messages";
import { useParams } from "react-router"
import { useMessages } from "@/lib/hooks/use-messages";
import { useEffect } from "react";

export default function ChatPage() {
  const params = useParams()
  const chatId = params.chatId!
  const { loadMessages } = useMessages();
  useEffect(() => {
    console.log("ChatPage useEffect - chatId:", chatId);
    loadMessages(chatId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>
      <p>Chat ID: {chatId}</p>
      <Messages chatId={chatId} />
    </div>
  )
}
