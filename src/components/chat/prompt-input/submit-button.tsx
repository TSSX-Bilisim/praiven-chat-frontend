import { Button } from "@/components/ui/button"
import { ArrowUp, Square } from "lucide-react"
import { useMessageStore } from "@/lib/stores/message"

interface PromptSendButtonProps {
  chatId: string
}

export function PromptSendButton({ chatId }: PromptSendButtonProps) {
  const { userDraft, aiDraft } = useMessageStore((state) => state)
  const isLoading = !!userDraft[chatId]  || !!aiDraft

  return (
    <Button variant={"ghost"} type="submit" disabled={isLoading}>
      {isLoading 
        ? (<Square className="size-5 fill-current" />) 
        : (<ArrowUp className="size-5" />)}
    </Button>
  )
}