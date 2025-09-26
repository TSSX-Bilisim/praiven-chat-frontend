import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import MaskToggle from '@/components/chat/mask-toggle';
import { NewPromptInput } from '@/components/chat/prompt-input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Flex } from '@radix-ui/themes';
import { MessageSquare } from 'lucide-react';

export default function NewChatPage() {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Üst bar */}
      <header className="bg-background z-10 flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
        <Flex gap={'2'} align="center" direction={"row"}>
          {isMobile && <SidebarTrigger />}
          <div className="text-foreground">New Chat</div>
        </Flex>
        <MaskToggle />
      </header>

      {/* Ortadaki mesaj alanı */}
      <div className='relative flex-1 overflow-y-auto'>
        <Conversation className="h-full" style={{ height: '500px' }}>
          <ConversationContent>
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="No messages yet"
                description="Start a conversation to see messages here"
              />
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Alt input */}
      <div className="inset-x-0 bottom-0 mx-auto w-full max-w-3xl shrink-0 px-3 pb-3 md:px-5 md:pb-5">
          <NewPromptInput/>
      </div>
    </div>
  )
}