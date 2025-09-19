import { useEffect } from "react";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

let socket: Socket | null = null;

export function useChatSocket() {
  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:3002/", {
        withCredentials: true,
      });
    }
  }, []);
}