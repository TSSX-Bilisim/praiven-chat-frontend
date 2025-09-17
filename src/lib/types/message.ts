export type MessageStatus = 'created' | 'extracting' | 'extracted' | 'masking' | 'masked' | 'streaming' | 'completed';
export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageEntity = {
    id: number;
    messageId: number;
    maskedValue: string;
    value: string;
    start: number;
    end: number;
}

export type Message = {
    id: number;
    senderId: number;
    chatId: string;
    role: MessageRole;
    content: string;
    maskedContent?: string;
    entities?: MessageEntity[];
    status: MessageStatus;
    modelId: number;
    createdAt: string;
    updatedAt: string;
};