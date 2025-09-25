import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useChatSocket } from "@/lib/hooks/useChatSocket";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";

export default function ChatLayout() {
  const queryClient = new QueryClient();
  useChatSocket();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
