import { Button } from "@/components/ui/button";
import { ArrowUp, Square } from "lucide-react";

interface PromptSendButtonProps {
  isLoading: boolean;
}

export function PromptSendButton({ isLoading }: PromptSendButtonProps) {
  return (
    <Button variant="ghost" type="submit" disabled={isLoading}>
      {isLoading ? (
        <Square className="size-5 fill-current" />
      ) : (
        <ArrowUp className="size-5" />
      )}
    </Button>
  );
}