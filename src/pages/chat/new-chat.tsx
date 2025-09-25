import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { NewPromptInput } from '@/components/chat/prompt-input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatFeatureStore } from '@/lib/stores/chatFeature';
import { Flex } from '@radix-ui/themes';
import { Eye, EyeOff, MessageSquare } from 'lucide-react';

export default function NewChatPage() {
  const isMobile = useIsMobile();
  const { isMasked, toggleMasked } = useChatFeatureStore();
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Üst bar */}
      <div className="flex-shrink-0 p-2 border-b">
        <Flex align="center" justify="between" gap="2">
          {isMobile && <SidebarTrigger />}
          <Button variant="ghost" onClick={() => toggleMasked()}>{!isMasked ? <Eye /> : <EyeOff/>}</Button>
        </Flex>

      </div>

      {/* Ortadaki mesaj alanı */}
      <div className="flex-1 overflow-y-auto p-2">
        <Conversation className="relative w-full" style={{ height: '500px' }}>
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
      <div className="flex-shrink-0 p-2 border-t">
        <NewPromptInput/>
      </div>
    </div>
  )
}