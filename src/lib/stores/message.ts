import type { Message, MessageEntity } from "@/lib/types/message";
import { create } from "zustand";

type messageStore = {
    messages: Record<string, Message[]>;
    aiDraft: Record<string, Message | null>;
    userDraft: Record<string, Message | null>;

    setMessages: (chatId: string, messages: Message[]) => void;
    setUserDraft: (chatId: string, message: Message | null) => void;
    setAIDraft: (chatId: string, message: Message | null) => void;

    addUserDraft: (chatId: string, message: Message) => void;
    addAIDraft : (chatId: string, message: Message) => void;

    applyMask: (chatId: string, maskedContent: string, entities: MessageEntity[]) => void;
    appendAIStream : (chatId: string, chunk: string) => void;

    finalizeUserMessage: (chatId: string) => void;
    finalizeAIMessage: (chatId: string) => void;
}

export const useMessageStore = create<messageStore>(
    (set): messageStore => ({
        messages: {},
        aiDraft: {},
        userDraft: {},
        setMessages: (chatId: string, messages: Message[]) => set((state) => ({
            messages: {
                ...state.messages,
                [chatId]: messages
            }
        })),
        setUserDraft: (chatId: string, message: Message | null) => set((state) => ({
            userDraft: {
                ...state.userDraft,
                [chatId]: message
            }
        })),
        setAIDraft: (chatId: string, message: Message | null) => set((state) => ({
            aiDraft: {
                ...state.aiDraft,
                [chatId]: message
            }
        })),
        addUserDraft: (chatId: string, message: Message) => set((state) => ({
            userDraft: {...state.userDraft, [chatId]: message}
        })),
        addAIDraft: (chatId: string, message: Message) => set((state) => ({
            aiDraft: {...state.aiDraft, [chatId]: message}
        })),
        applyMask: (chatId: string, maskedContent: string, entities: MessageEntity[]) =>
            set((state => ({
                userDraft: {
                    ...state.userDraft,
                    [chatId]: state.userDraft[chatId] ? {
                        ...state.userDraft[chatId]!,
                        maskedContent: maskedContent,
                        entities: entities
                    } : null
                }
            }))),
        appendAIStream: (chatId: string, chunk: string) =>
            set((state) => ({
                aiDraft: {
                    ...state.aiDraft,
                    [chatId]: state.aiDraft[chatId] ? {
                        ...state.aiDraft[chatId]!,
                        content: state.aiDraft[chatId]!.content + chunk
                    } : null
                }
            })),
        finalizeUserMessage: (chatId: string) =>
            set((state) => ({
                messages: {
                    ...state.messages,
                    [chatId]: state.userDraft[chatId] ? 
                    [...(state.messages[chatId] || []), state.userDraft[chatId]!]
                    : (state.messages[chatId] || [])
                },
                userDraft: {...state.userDraft, [chatId]: null}
            })),
        finalizeAIMessage: (chatId: string) =>
            set((state) => ({
                messages: {
                    ...state.messages,
                    [chatId]: state.aiDraft[chatId] ? 
                    [...(state.messages[chatId] || []), state.aiDraft[chatId]!]
                    : (state.messages[chatId] || [])
                },
                aiDraft: {...state.aiDraft, [chatId]: null}
            }))
    })
)