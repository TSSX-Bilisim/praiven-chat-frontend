import type { Message as MessageType } from '@/lib/types/message';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Loader } from '@/components/ui/loader';
import { useEffect, useRef } from 'react';

export function CurrentBlock({
  userDraft,
  aiDraft,
  lastMessages
}: {
  userDraft?: MessageType;
  aiDraft?: MessageType;
  lastMessages: MessageType[];
}) {
  const blockRef = useRef<HTMLDivElement | null>(null);

  // Scroll sadece blok oluşunca
  useEffect(() => {
    blockRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [userDraft, aiDraft]);

  return (
    <div
      ref={blockRef}
      style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}
    >
      {/* Son mesajlar */}
      {lastMessages.map((msg) => (
        <Message from={msg.role} key={msg.id}>
          <MessageContent variant="flat">
            {msg.role === 'user' ? msg.maskedContent : msg.content}
          </MessageContent>
        </Message>
      ))}

      {/* userDraft */}
      {userDraft && (
        <Message from="user" key={userDraft.id}>
          <MessageContent variant="flat">{userDraft.content}</MessageContent>
        </Message>
      )}

      {/* AI draft */}
      {aiDraft && (
        <Message from="assistant" key={aiDraft.id}>
          <MessageContent variant="flat">
            {aiDraft.content || <Loader variant="circular" />}
          </MessageContent>
        </Message>
      )}
    </div>
  );
}