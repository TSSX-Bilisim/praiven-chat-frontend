import { useMessages } from "@/lib/hooks/use-messages"
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Loader } from "../ui/loader";
import { useRef } from "react";
import { Response } from '@/components/ai-elements/response';
import { useChatFeatureStore } from "@/lib/stores/chatFeature";
import { ChatContainerContent, ChatContainerRoot } from "../ui/chat-container";
import { ScrollButton } from "../ui/scroll-button";

interface MessagesProps {
  chatId: string
}

export function Messages({ chatId }: MessagesProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { messages, userDraft, aiDraft, loading, error } = useMessages();
  const { isMasked } = useChatFeatureStore();

  const currentUserDraft = userDraft[chatId];
  const currentAiDraft = aiDraft[chatId];
  const currentMessages = messages[chatId];

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div ref={chatContainerRef} className="relative flex-1 overflow-y-auto">
      <ChatContainerRoot className="h-full">
        <ChatContainerContent className="space-y-6 px-5 py-12">
        {currentMessages?.map((message) => (
          <Message from={message.role} key={message.id}>
            <MessageContent variant="flat">
              {message.role === 'user' 
              ? (message.maskedContent && isMasked ? message.maskedContent : message.content) || message.maskedContent
              : <Response>{message.content}</Response>}
            </MessageContent>
          </Message>
        ))}
        {/* yeni mesajlar */}
        {(currentUserDraft) &&(
          <Message from="user" key={currentUserDraft.id}>
            <MessageContent variant="flat">
              {currentUserDraft.maskedContent && isMasked ? currentUserDraft.maskedContent : currentUserDraft.content}
            </MessageContent>
          </Message>
        )}
        {currentAiDraft && (
          <Message from="assistant" key={currentAiDraft.id}>
            <MessageContent variant="flat">
              {currentAiDraft.content
                ? currentAiDraft.content
                : <Loader variant="circular" />}
            </MessageContent>
          </Message>
        )}
      </ChatContainerContent>
      <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 justify-end px-5">
        <ScrollButton className="shadow-sm" />
      </div>
    </ChatContainerRoot>
  </div>
  )
}
