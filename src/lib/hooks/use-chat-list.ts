import { fetchChats } from "@/lib/api/chat"
import { useChatStore } from "@/lib/stores/chat"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

export function useChatList() {
  const { chats, addChats } = useChatStore()
  const navigate = useNavigate()

  const query = useInfiniteQuery({
    queryKey: ["chats"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchChats(pageParam, 10)

      if (response.statusCode === 401) {
        navigate("/auth/login")
        throw new Error("Unauthorized. Redirecting to login.")
      }
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch chats")
      }
      if (response.data?.chats) {
        addChats(response.data.chats)
      }

      return response.data
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.hasMore ? lastPage.nextOffset : undefined
    },
    initialPageParam: 0,
  })

  return {
    chats,
    addChats,
    loadChats: query.fetchNextPage,
    error: query.error,
    loading: query.isLoading || query.isFetching,
    hasMore: query.hasNextPage,
  }
}
