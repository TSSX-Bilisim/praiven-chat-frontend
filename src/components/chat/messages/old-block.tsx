import { Message, MessageContent } from '@/components/ai-elements/message';
import type { Message as MessageType } from '@/lib/types/message';
export function OlderMessages({ messages }: { messages: MessageType[] }) {
  return (
    <>
      {messages.map((msg) => (
        <Message from={msg.role} key={msg.id}>
          <MessageContent variant="flat">
            {msg.role === 'user' ? msg.maskedContent : msg.content}
          </MessageContent>
        </Message>
      ))}
    </>
  );
}
