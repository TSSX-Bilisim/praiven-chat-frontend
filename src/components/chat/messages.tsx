import { useMessages } from "@/lib/hooks/use-messages"
import { Loader } from "../ui/loader";
import { useRef } from "react";
import { useChatFeatureStore } from "@/lib/stores/chatFeature";
import { ChatContainerContent, ChatContainerRoot } from "../ui/chat-container";
import { ScrollButton } from "../ui/scroll-button";
import { cn } from "@/lib/utils";
import { Markdown } from "../ui/markdown";
import type { Components } from "react-markdown";
import { Skeleton } from "../ui/skeleton";
import { Message, MessageContent } from "../ui/message";

const customComponents: Partial<Components> = {
  h3: ({ children }) => (
    <h3 className="my-4 text-lg font-semibold text-foreground leading-snug">
      {children}
    </h3>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="my-4 text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-neutral-600 pl-4 text-neutral-300">
      {children}
    </blockquote>
  ),
  li: ({ children }) => (
    <li className="my-1 flex items-start leading-relaxed">
      <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-neutral-500" />
      <span>{children}</span>
    </li>
  ),
};

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
    <div ref={chatContainerRef} className="relative w-full overflow-y-auto">
      <ChatContainerRoot className="h-full">
        <ChatContainerContent className="space-y-6 px-5 py-12">
        {currentMessages?.map((message) => {
          const isAssistant = message.role === "assistant";
          return (
            <Message
              key={message.id}
              className={
                message.role === "user" ? "justify-end" : "justify-start"
              }
            >
              <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
                {isAssistant ? (
                  <div className={cn("bg-transparent text-foreground prose rounded-lg p-2")}>
                    <Markdown className="leading-relaxed space-y-4 px-4" components={customComponents}>{message.content}</Markdown>
                  </div>
                ) : (
                  <MessageContent className="bg-neutral-800 text-foreground leading-relaxed px-4">
                    {message.content}
                  </MessageContent>
                )}
              </div>
            </Message>            
          )
        })}
        {/* yeni mesajlar */}
        {(currentUserDraft) &&(
          <Message className="justify-end">
            {
              currentUserDraft.maskedContent 
              ?  (
                <MessageContent className="bg-neutral-800 text-foreground leading-relaxed px-4">
                  {isMasked ? currentUserDraft.maskedContent : currentUserDraft.content}
                </MessageContent>
              )
              : <div className="space-y-2">
                  {/* Skeleton efekt */}
                  <Skeleton className="h-2 w-[250px]" />
                  <Skeleton className="h-2 w-[200px]" />
                </div>
            }
          </Message>
        )}
        {currentAiDraft && (
          <Message className="justify-start">
            <div className={cn("bg-transparent text-foreground prose rounded-lg p-2")}>
              {currentAiDraft.content
                ? <Markdown className="leading-relaxed space-y-4 px-4" components={customComponents}>{currentAiDraft.content}</Markdown>
                : <Loader variant="typing" />}
            </div>
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
