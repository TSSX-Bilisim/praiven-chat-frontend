import { useParams } from "react-router"
import { useMessages } from "@/lib/hooks/use-messages";
import { useEffect } from "react";
import { PromptInput } from "@/components/chat/prompt-input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useChatFeatureStore } from "@/lib/stores/chatFeature";
import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatMessages from "@/components/chat/chat-messages";

export default function ChatPage() {
  const params = useParams()
  const chatId = params.chatId!
  const { loadMessages } = useMessages();
  const { isMasked,toggleMasked } = useChatFeatureStore();

  const isMobile = useIsMobile();

  useEffect(() => {
    loadMessages(chatId);
  }, [chatId]);

  return (
  <div className="flex flex-col h-screen w-full">
    {/* Üst bar */}
    <div className="flex-shrink-0 p-2 border-b">
      <Flex align="center" justify="between" gap="2">
        {isMobile && <SidebarTrigger />}
        <p>Chat ID: {chatId}</p>
        <Button variant="ghost" onClick={() => toggleMasked()}>{!isMasked ? <Eye /> : <EyeOff/>}</Button>
      </Flex>

    </div>

    {/* Ortadaki mesaj alanı */}
    <div className="flex-1 overflow-y-auto p-2">
      <ChatMessages chatId={chatId} />
    </div>

    {/* Alt input */}
    <div className="flex-shrink-0 p-2 border-t">
      <PromptInput chatid={chatId} />
    </div>
  </div>
  )
}
