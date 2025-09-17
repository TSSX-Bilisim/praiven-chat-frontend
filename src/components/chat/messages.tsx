import { useMessages } from "@/lib/hooks/use-messages"

interface MessagesProps {
  chatId: string
}

export function Messages({ chatId }: MessagesProps) {
  const { messages, loading, error } = useMessages()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="flex flex-col gap-2">
      {messages[chatId]?.map((msg) => (
        <div key={msg.id} className="rounded p-2 border">
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
    </div>
  )
}
