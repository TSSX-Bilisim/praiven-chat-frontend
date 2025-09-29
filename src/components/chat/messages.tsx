import { useMessages } from "@/lib/hooks/use-messages"
import { Loader } from "../ui/loader";
import { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useChatFeatureStore } from "@/lib/stores/chatFeature";
import { ChatContainerContent, ChatContainerRoot } from "../ui/chat-container";
import { ScrollButton } from "../ui/scroll-button";
import { cn } from "@/lib/utils";
import { Markdown } from "../ui/markdown";
import type { Components } from "react-markdown";
import { Skeleton } from "../ui/skeleton";
import { Message, MessageContent } from "../ui/message";

const customComponents: Partial<Components> = {
  code({ node, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
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
  const currentBlockRef = useRef<HTMLDivElement>(null)
  const { messages, userDraft, aiDraft, loading, error } = useMessages();
  const { isMasked } = useChatFeatureStore();

  const currentUserDraft = userDraft[chatId];
  const currentAiDraft = aiDraft[chatId];
  const currentMessages = messages[chatId];

  useEffect(() => {
    currentBlockRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [userDraft, aiDraft]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div ref={chatContainerRef} className="relative flex-1 overflow-y-auto">
      <ChatContainerRoot className="h-full">
        <ChatContainerContent className="space-y-6 px-5 py-12">
        {currentMessages?.map((message) => {
          const isAssistant = message.role !== "user";
          return (
            <Message
              key={message.id}
              className={cn(
                "mx-auto flex w-full max-w-5xl flex-col gap-2 px-10",
                isAssistant ? "items-start" : "items-end pt-8"
              )}
            >
              {isAssistant
                ? (
                  <div className="group flex w-full flex-col gap-0">
                    <Markdown
                      components={customComponents} 
                      className="text-foreground prose flex-1 rounded-lg bg-transparent p-0"
                    >
                      {message.content}
                    </Markdown>
                  </div>
                  )
                : (
                  <div className="group flex flex-col items-end gap-1 w-full">
                    <MessageContent className="bg-muted text-primary max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]">
                      {message.maskedContent && isMasked ? message.maskedContent : message.content}
                    </MessageContent>
                  </div>
                )
              }
            </Message>            
          )
        })}
        {/* yeni mesajlar */}
        { (currentAiDraft || currentUserDraft) && (
          <div
            ref={currentBlockRef}
            className="min-h-[70vh] space-y-6"
          >
              {(currentUserDraft) &&(
                <Message
                  className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-10 pt-8 items-end"
                >
                  <div className="group flex flex-col w-full items-end gap-1">
                    {
                      currentUserDraft.maskedContent 
                      ?  (
                        <MessageContent className="bg-muted text-primary max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]">
                          {isMasked ? currentUserDraft.maskedContent : currentUserDraft.content}
                        </MessageContent>
                      )
                      : <div className="space-y-2">
                          {/* Skeleton efekt */}
                          <Skeleton className="h-2 w-[250px]" />
                          <Skeleton className="h-2 w-[200px]" />
                        </div>
                    }
                  </div>
                </Message>
              )}
              {currentAiDraft && (
                <Message className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-10 items-start">
                  <div className="group flex w-full flex-col gap-0">
                    {currentAiDraft.content
                      ? <Markdown
                          components={customComponents} 
                          className="text-foreground prose flex-1 rounded-lg bg-transparent p-0"
                        >
                          {currentAiDraft.content}
                        </Markdown>
                      : <Loader variant="typing" />
                    }
                  </div>
                </Message>
              )}
          </div>
        )}


      </ChatContainerContent>
      <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 justify-end px-5">
        <ScrollButton className="shadow-sm" />
      </div>
    </ChatContainerRoot>
  </div>
  )
}
