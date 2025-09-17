import { z } from "zod";

export const promptschema = z.object({
    content: z.string().min(1, "Prompt is required"),
    modelId: z.number().min(1, "Model is required"),
})