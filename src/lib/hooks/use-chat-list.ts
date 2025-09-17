import { fetchChats } from "@/lib/api/chat"
import { useChatStore } from "@/lib/stores/chat"
import { useCallback, useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router"

export function useChatList() {
  const { chats, addChats } = useChatStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const hasMoreRef = useRef(false)
  const nextOffsetRef = useRef(0)
  const navigate = useNavigate();

  const loadChats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchChats(nextOffsetRef.current, 10)

      if (response.statusCode === 401) {
        navigate('/auth/login')
        throw new Error("Unauthorized. Redirecting to login.")
      }
      if (!response.success) throw new Error(response.error || "Failed to fetch chats")

      addChats(response.data!.chats)
      hasMoreRef.current = response.data!.hasMore
      nextOffsetRef.current = response.data!.nextOffset
    } catch (error) {
      console.error("Error fetching chats:", error)
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [addChats, navigate])

  // mount olduğunda sadece 1 kere çağır
  useEffect(() => {
    loadChats()
  }, [loadChats])

  return { 
    chats, 
    addChats, 
    loadChats, 
    error, 
    loading, 
    hasMore: hasMoreRef.current 
  }
}
