import { Button } from "@/components/ui/button"
import { Loader2 as Loader, Send } from "lucide-react"
import { useMessageStore } from "@/lib/stores/message"

interface PromptSendButtonProps {
  chatId: string
}

export function PromptSendButton({ chatId }: PromptSendButtonProps) {
  const { userDraft } = useMessageStore((state) => state)
  const isLoading = !!userDraft[chatId]

  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send/>}
    </Button>
  )
}