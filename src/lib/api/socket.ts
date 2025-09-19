import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function initSocket() {
  if (!socket) {
    socket = io("http://localhost:3000/", {
      withCredentials: true, // httpOnly cookie gönderilsin
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
}
