import { create } from 'zustand';
import type { Chat } from '@/lib/types/chat';

const addChat = (chats: Chat[], newChat: Chat) => ([
  ...chats, newChat].sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  );

const addChats = (chats: Chat[], newChats: Chat[]) => ([
  ...chats.filter(chat => !newChats.find(nc => nc.id === chat.id)),
  ...newChats].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  );

const updateTime = (chats: Chat[], chatId: string) => (
  [...chats.map(chat =>
    (chat.id === chatId
      ? { ...chat, updatedAt: new Date().toISOString() }
      : chat
    )
  )].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
);

type chatStore = {
  chats: Chat[];
  addChat: (chat: Chat) => void;
  addChats: (chats: Chat[]) => void;
  updateTime: (chatId: string) => void;
};

export const useChatStore = create<chatStore>(
  (set): chatStore => ({
    chats: [],
    addChat: (chat: Chat) =>
      set((state) => ({
        ...state,
        chats: addChat(state.chats, chat)
      })),
    addChats: (chats: Chat[]) =>
      set((state) => ({
        ...state,
        chats: addChats(state.chats, chats)
      })),
    updateTime: (chatId: string) =>
      set((state) => ({
        ...state,
        chats: updateTime(state.chats, chatId)
      })),
  })
)
