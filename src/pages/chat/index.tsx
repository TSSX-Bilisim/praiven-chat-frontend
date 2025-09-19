import { Messages } from "@/components/chat/messages";
import { useParams } from "react-router"
import { useMessages } from "@/lib/hooks/use-messages";
import { useEffect } from "react";
import { PromptInput } from "@/components/chat/prompt-input";

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
  <div className="flex flex-col h-screen w-full">
    {/* Üst bar */}
    <div className="flex-shrink-0 p-2 border-b">
      <p>Chat ID: {chatId}</p>
    </div>

    {/* Ortadaki mesaj alanı */}
    <div className="flex-1 overflow-y-auto p-2">
      <Messages chatId={chatId} />
    </div>

    {/* Alt input */}
    <div className="flex-shrink-0 p-2 border-t">
      <PromptInput chatid={chatId} />
    </div>
  </div>
  )
}
