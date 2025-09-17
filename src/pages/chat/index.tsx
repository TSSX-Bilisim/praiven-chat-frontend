import { useParams } from "react-router";

export default function ChatPage() {
  const params = useParams();
  return (
    <div>
      <h1>Chat Page</h1>
      <p>Chat ID: {params.id}</p>
    </div>
  )
}