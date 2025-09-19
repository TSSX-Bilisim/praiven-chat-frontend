import { useMessages } from "@/lib/hooks/use-messages"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Loader } from "../ui/loader";
import { useEffect, useRef } from "react";

interface MessagesProps {
  chatId: string
}

export function Messages({ chatId }: MessagesProps) {
  const { messages, userDraft, aiDraft, loading, error } = useMessages();

  const currentUserDraft = userDraft[chatId];
  const currentAiDraft = aiDraft[chatId];
  const currentMessages = messages[chatId];

  const lastTwoMessages = currentMessages && currentMessages.slice(-2);
  const olderMessages = currentMessages && currentMessages.slice(0, -2);

  // Ref yeni blok için
  const blockRef = useRef<HTMLDivElement | null>(null);

  // Yeni kullanıcı bloğu geldiğinde scroll tam ekran bloğa
  useEffect(() => {
    if (currentUserDraft) {
      blockRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [currentUserDraft]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Conversation>
      <ConversationContent>
        {/* eski mesajlar */}
        {!currentAiDraft && !currentUserDraft && (
          olderMessages?.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent variant="flat">
                {message.role === 'user' ? message.maskedContent : message.content}
              </MessageContent>
            </Message>
          ))
        )}
        <div
          ref={blockRef}
          style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}
        >
        {/* Son mesajlar */}
        {lastTwoMessages?.map((msg) => (
          <Message from={msg.role} key={msg.id}>
            <MessageContent variant="flat">
              {msg.role === 'user' ? msg.maskedContent : msg.content}
            </MessageContent>
          </Message>
        ))}
        {/* yeni mesajlar */}
        {(currentUserDraft && currentAiDraft) &&(
          <Message from="user" key={currentUserDraft.id}>
            <MessageContent variant="flat">
              {currentUserDraft.maskedContent ? currentUserDraft.maskedContent : currentUserDraft.content}
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

      </div>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}
