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
import { Message, MessageAction, MessageActions, MessageContent } from "../ui/message";
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from "../ui/code-block";
import { Button } from "../ui/button";
import { Copy, Edit3, Flag, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const customComponents: Partial<Components> = {
  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : '';
    const { theme } = useTheme(); // light / dark
    const defaultTheme = theme === "dark" ? "github-dark" : "github-light";
    const [currentTheme, setCurrentTheme] = useState<"github-dark" | "github-light">(defaultTheme);

    useEffect(() => {
      if (theme === "dark") setCurrentTheme("github-dark");
      else setCurrentTheme("github-light");
    }, [theme]);

    return (
      <div className="w-full max-w-5xl py-4">
        <CodeBlock>
          <CodeBlockGroup className="border-border border-b py-2 pr-2 pl-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                {language}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ""))}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CodeBlockGroup>
          <CodeBlockCode
            code={String(children).replace(/\n$/, "")}
            language={language}
            theme={currentTheme}
            className="dark:[&_pre]:!bg-background"
          />
        </CodeBlock>
      </div>
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
    <blockquote className="my-4 border-l-2 border-muted-foreground pl-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  li: ({ children }) => (
    <li className="my-1 flex items-start leading-relaxed">
      <span className="mt-2 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground" />
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
        <ChatContainerContent className="space-y-10 px-5 py-12">
          {currentMessages?.map((message) => {
            const isAssistant = message.role !== "user";
            return (
              <Message
                key={message.id}
                className={cn(
                  "mx-auto flex w-full max-w-5xl flex-col gap-2 px-10",
                  isAssistant ? "items-start" : "items-end pt-16"
                )}
              >
                {isAssistant ? (
                  <div className="group flex w-full flex-col gap-2">
                    <Markdown
                      components={customComponents}
                      className="text-foreground prose flex-1 rounded-lg bg-transparent p-0"
                    >
                      {message.content}
                    </Markdown>
                    <MessageActions className="self-start -ml-2.5 flex gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {/* Copy */}
                      <MessageAction tooltip="Copy to clipboard" side="left">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => navigator.clipboard.writeText(message.content)}
                        >
                          <Copy className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Retry */}
                      <MessageAction tooltip="Retry">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => console.log("Retry clicked")}
                        >
                          <RotateCcw className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Like */}
                      <MessageAction tooltip="Helpful">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                          onClick={(e) => {
                            const btn = e.currentTarget
                            btn.dataset.active = btn.dataset.active === "true" ? "false" : "true"
                          }}
                        >
                          <ThumbsUp className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Dislike */}
                      <MessageAction tooltip="Not helpful">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full data-[active=true]:bg-destructive data-[active=true]:text-destructive-foreground"
                          onClick={(e) => {
                            const btn = e.currentTarget
                            btn.dataset.active = btn.dataset.active === "true" ? "false" : "true"
                          }}
                        >
                          <ThumbsDown className="size-4" />
                        </Button>
                      </MessageAction>
                    </MessageActions>
                  </div>
                ) : (
                  <div className="group flex flex-col items-end gap-2 w-full">
                    <MessageContent className="bg-muted text-primary max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]">
                      {message.maskedContent && isMasked ? message.maskedContent : message.content}
                    </MessageContent>
                    <MessageActions className="self-end -ml-2.5 flex gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {/* Copy */}
                      <MessageAction tooltip="Copy to clipboard">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => navigator.clipboard.writeText(message.maskedContent || "")}
                        >
                          <Copy className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Edit */}
                      <MessageAction tooltip="Edit">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => console.log("Edit clicked")}
                        >
                          <Edit3 className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Report */}
                      <MessageAction tooltip="Report">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => console.log("Report clicked")}
                        >
                          <Flag className="size-4" />
                        </Button>
                      </MessageAction>
                    </MessageActions>
                  </div>
                )}
              </Message>
            )
          })}
          {/* Yeni mesajlar */}
          {(currentAiDraft || currentUserDraft) && (
            <div ref={currentBlockRef} className="min-h-[70vh] space-y-6">
              {/* User draft */}
              {currentUserDraft && (
                <Message className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-10 pt-8 items-end">
                  <div className="group flex flex-col w-full items-end gap-1">
                    {currentUserDraft.maskedContent ? (
                      <MessageContent className="bg-muted text-primary max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]">
                        {isMasked ? currentUserDraft.maskedContent : currentUserDraft.content}
                      </MessageContent>
                    ) : (
                      <div className="space-y-2">
                        <Skeleton className="h-2 w-[250px]" />
                        <Skeleton className="h-2 w-[200px]" />
                      </div>
                    )}
                  </div>
                  {currentUserDraft.status === "masked" && (
                    <MessageActions className="self-end -ml-2.5 flex gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {/* Copy */}
                      <MessageAction tooltip="Copy to clipboard">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => navigator.clipboard.writeText(currentUserDraft.maskedContent || "")}
                        >
                          <Copy className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Edit */}
                      <MessageAction tooltip="Edit">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => console.log("Edit clicked")}
                        >
                          <Edit3 className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Report */}
                      <MessageAction tooltip="Report">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => console.log("Report clicked")}
                        >
                          <Flag className="size-4" />
                        </Button>
                      </MessageAction>
                    </MessageActions>
                  )}
                </Message>
              )}
              {/* AI draft */}
              {currentAiDraft && (
                <Message className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-10 items-start">
                  <div className="group flex w-full flex-col gap-0">
                    {currentAiDraft.content ? (
                      <Markdown
                        components={customComponents}
                        className="text-foreground prose flex-1 rounded-lg bg-transparent p-0"
                      >
                        {currentAiDraft.content}
                      </Markdown>
                    ) : (
                      <Loader variant="typing" />
                    )}
                  </div>
                  {currentAiDraft.status === "completed" && (
                    <MessageActions className="self-start -ml-2.5 flex gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {/* Copy */}
                      <MessageAction tooltip="Copy to clipboard">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => navigator.clipboard.writeText(currentAiDraft.content)}
                        >
                          <Copy className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Retry */}
                      <MessageAction tooltip="Retry">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => console.log("Retry clicked")}
                        >
                          <RotateCcw className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Like */}
                      <MessageAction tooltip="Helpful">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                          onClick={(e) => {
                            const btn = e.currentTarget
                            btn.dataset.active = btn.dataset.active === "true" ? "false" : "true"
                          }}
                        >
                          <ThumbsUp className="size-4" />
                        </Button>
                      </MessageAction>
                      {/* Dislike */}
                      <MessageAction tooltip="Not helpful">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full data-[active=true]:bg-destructive data-[active=true]:text-destructive-foreground"
                          onClick={(e) => {
                            const btn = e.currentTarget
                            btn.dataset.active = btn.dataset.active === "true" ? "false" : "true"
                          }}
                        >
                          <ThumbsDown className="size-4" />
                        </Button>
                      </MessageAction>
                    </MessageActions>
                  )}
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
