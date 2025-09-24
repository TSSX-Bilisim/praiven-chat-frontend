import { useMessages } from "@/lib/hooks/use-messages"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Loader } from "../ui/loader";
import { useEffect, useRef } from "react";
import { Response } from '@/components/ai-elements/response';
import { useChatFeatureStore } from "@/lib/stores/chatFeature";

interface MessagesProps {
  chatId: string
}

export function Messages({ chatId }: MessagesProps) {
  const { messages, userDraft, aiDraft, loading, error } = useMessages();
  const { isMasked } = useChatFeatureStore();

  const currentUserDraft = userDraft[chatId];
  const currentAiDraft = aiDraft[chatId];
  const currentMessages = messages[chatId];
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Yeni mesaj geldiğinde otomatik scroll
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [currentMessages, currentUserDraft, currentAiDraft]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Conversation className="w-full xl:w-2/3 mx-auto">
      <ConversationContent>
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
        <div ref={scrollRef}/>
      <ConversationScrollButton />
      </ConversationContent>
    </Conversation>
  )
}
