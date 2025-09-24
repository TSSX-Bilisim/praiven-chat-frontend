import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import ChatLayout from './layouts/chat';
import NewChatPage from './pages/chat/new-chat';
import ChatPage from './pages/chat';
import AuthLayout from './layouts/auth';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider attribute="class">
    <Theme>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<NewChatPage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>}/>
      </Routes>
    </Theme>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
