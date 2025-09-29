import { useParams } from "react-router"
import { useMessages } from "@/lib/hooks/use-messages";
import { useEffect } from "react";
import { PromptInput } from "@/components/chat/prompt-input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Flex } from "@radix-ui/themes";
import { useIsMobile } from "@/hooks/use-mobile";
import { Messages } from "@/components/chat/messages";
import MaskToggle from "@/components/chat/mask-toggle";
import { useChatStore } from "@/lib/stores/chat";

export default function ChatPage() {
  const params = useParams()
  const chatId = params.chatId!
  const { loadMessages } = useMessages();
  const { chats } = useChatStore();
  const chat = chats.find(c => c.id === chatId);
  const chatTitle = chat ? chat.title : "Chat Title";

  const isMobile = useIsMobile();

  useEffect(() => {
    loadMessages(chatId);
  }, [chatId]);

  return (
  <main className="flex w-full h-screen flex-col overflow-hidden">
    {/* Üst bar */}
    <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
      <Flex gap={'2'} align="center" direction={"row"}>
        {isMobile && <SidebarTrigger />}
        <div className="text-foreground">{chatTitle}</div>
      </Flex>
      <MaskToggle />
    </header>

    {/* Ortadaki mesaj alanı */}
    <Messages chatId={chatId} />

    {/* Alt input */}
    <div className="inset-x-0 bottom-0 mx-auto w-full max-w-3xl shrink-0 px-3 pb-3 md:px-5 md:pb-5">
        <PromptInput chatid={chatId} />
    </div>
  </main>
  )
}
