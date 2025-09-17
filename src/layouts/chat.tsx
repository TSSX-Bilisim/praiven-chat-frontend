import { Outlet } from "react-router";

export default function ChatLayout() {
  return (
    <div>
      <header>
        <h1>Chat Layout</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}