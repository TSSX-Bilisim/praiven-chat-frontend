import { useMessages } from "@/lib/hooks/use-messages"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { OlderMessages } from "./old-block";
import { CurrentBlock } from "./currenct-block";

interface MessagesProps {
  chatId: string
}

export function Messages({ chatId }: MessagesProps) {
  const { messages, userDraft, aiDraft, loading, error } = useMessages();

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  const currentUserDraft = userDraft[chatId];
  const currentAiDraft = aiDraft[chatId];
  const currentMessages = messages[chatId];

  const olderMessages: typeof currentMessages = [];
  const lastMessagesBlock: typeof currentMessages = [];

  if (!currentUserDraft && !currentAiDraft) {
    // Durum 1: userDraft yok, AI draft yok → son 2 mesaj hariç
    olderMessages.push(...currentMessages.slice(0, -2));
    lastMessagesBlock.push(...currentMessages.slice(-2));
  } else if (!currentUserDraft && currentAiDraft) {
    // Durum 2: userDraft yok, AI draft var → son 1 mesaj hariç
    olderMessages.push(...currentMessages.slice(0, -1));
    lastMessagesBlock.push(...currentMessages.slice(-1));
  } else if (currentUserDraft) {
    // Durum 3: userDraft var → tüm eski mesajlar
    olderMessages.push(...currentMessages);
  }


  return (
    <Conversation>
      <ConversationContent>
        {/* eski mesajlar */}
        <OlderMessages messages={olderMessages} />

        {/* yeni blok */}
        <CurrentBlock
          userDraft={currentUserDraft ?? undefined}
          aiDraft={currentAiDraft ?? undefined}
          lastMessages={lastMessagesBlock}
        />
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}
