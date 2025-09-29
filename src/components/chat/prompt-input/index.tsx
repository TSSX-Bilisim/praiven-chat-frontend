
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { promptschema } from "@/lib/validation/prompt"
import { Form } from "@/components/ui/form"
import { useMessages } from "@/lib/hooks/use-messages";
import { PromptModelSelect } from "@/components/chat/prompt-input/model-select";
import { ProviderSelect } from "./provider-select";
import { PromptSendButton } from "./submit-button";
import { PromptTextArea } from "./text-area";
import { Flex } from "@radix-ui/themes";
import { createChat } from "@/lib/api/chat";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useChatStore } from "@/lib/stores/chat";
import { PromptInputAction, PromptInputActions, PromptInput as PromptInputContainer} from '@/components/ui/prompt-input'

function PromptInput({ chatid }: { chatid: string }) {
    const { sendMessage, userDraft, aiDraft } = useMessages();
    const form = useForm<z.infer<typeof promptschema>>({
        resolver: zodResolver(promptschema),
        defaultValues: {
            content: "",
            modelId: 1,
        },
    });

    const currentUserDraft = userDraft[chatid];
    const currentAiDraft = aiDraft[chatid];
    console.log(currentAiDraft?.status, currentUserDraft?.status);
    const isLoading = 
      (currentAiDraft?.status !== 'completed') || 
      (currentUserDraft?.status !== 'masked');
    console.log(currentAiDraft?.status !== 'completed');
    console.log(currentUserDraft?.status !== 'masked');
    console.log(isLoading);

    function onSubmit(data: z.infer<typeof promptschema>) {
        sendMessage(chatid, data.content, data.modelId);
        form.reset();
    }

    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PromptInputContainer
          className="w-full relative z-10 py-4"
        >
          <Flex gap={'3'} px={'2'} direction={'column'}>
            <PromptTextArea control={form.control} name="content" />
            <PromptInputActions className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PromptInputAction tooltip="Select Provider">
                <ProviderSelect />
                </PromptInputAction>
                <PromptInputAction tooltip="Select Model">
                  <PromptModelSelect control={form.control} name="modelId" />
                </PromptInputAction>
              </div>
                <PromptInputAction tooltip={isLoading ? "Stop generation" : "Send message"}
                >
                  <PromptSendButton chatId={chatid} />
                </PromptInputAction>
            </PromptInputActions>
          </Flex>
        </PromptInputContainer>
      </form>
    </Form>
    )
}
function NewPromptInput() {
    const [isLoading, setIsLoading] = useState(false);
    const { sendMessage } = useMessages();
    const navigate = useNavigate();
    const { addChats } = useChatStore();
    const form = useForm<z.infer<typeof promptschema>>({
        resolver: zodResolver(promptschema),
        defaultValues: {
            content: "",
            modelId: 1,
        },
    });

    async function onSubmit(data: z.infer<typeof promptschema>) {
        setIsLoading(true);
        try {
            if (data.content.trim() === "") return;
            const response = await createChat();
            if (!response.success) throw new Error("Failed to create chat");
            const chat = response.data?.chat;
            if (!chat) throw new Error("Chat not found in response");
            navigate(`/chat/${chat.id}`);
            addChats([chat]);
            sendMessage(chat.id, data.content, data.modelId);

            form.reset();
            return;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        form.reset();
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PromptInputContainer
            className="w-full relative z-10 py-4"
          >
            <Flex gap={'3'} px={'2'} direction={'column'}>
              <PromptTextArea control={form.control} name="content" />
              <PromptInputActions className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <PromptInputAction tooltip="Select Provider">
                  <ProviderSelect />
                  </PromptInputAction>
                  <PromptInputAction tooltip="Select Model">
                    <PromptModelSelect control={form.control} name="modelId" />
                  </PromptInputAction>
                </div>
                  <PromptInputAction tooltip={isLoading ? "Stop generation" : "Send message"}
                  >
                    <Button variant={"ghost"} type="submit" disabled={isLoading}>
                      {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send/>}
                    </Button>
                  </PromptInputAction>
              </PromptInputActions>
            </Flex>
          </PromptInputContainer>
        </form>
      </Form>
    )
}

export { PromptInput, NewPromptInput };