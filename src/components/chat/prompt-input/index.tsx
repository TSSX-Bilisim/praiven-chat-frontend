
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { promptschema } from "@/lib/validation/prompt"
import {
  Form,
} from "@/components/ui/form"
import { useMessages } from "@/lib/hooks/use-messages";
import { PromptModelSelect } from "@/components/chat/prompt-input/model-select";
import { ProviderSelect } from "./provider-select";
import { PromptSendButton } from "./submit-button";
import { PromptTextArea } from "./text-area";
import { Flex } from "@radix-ui/themes";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function PromptInput({ chatid }: { chatid: string }) {
    const { sendMessage } = useMessages();
    const form = useForm<z.infer<typeof promptschema>>({
        resolver: zodResolver(promptschema),
        defaultValues: {
            content: "",
            modelId: 1,
        },
    });

    function onSubmit(data: z.infer<typeof promptschema>) {
        sendMessage(chatid, data.content, data.modelId);
        form.reset();
    }

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardContent>
                    <PromptTextArea control={form.control} name="content" />

                </CardContent>
                <CardFooter className="flex items-center justify-between w-full">
                    <Flex gap={'2'}>
                        <ProviderSelect />
                        <PromptModelSelect control={form.control} name="modelId" />
                    </Flex>
                    <PromptSendButton chatId={chatid} />
                </CardFooter>
            </Card>
        </form>
    </Form>
    )
}

export { PromptInput };