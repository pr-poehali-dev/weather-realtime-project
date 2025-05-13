
import React, { useState, useEffect } from 'react';
import { ChatSession } from '@/types/chat';
import { 
  createChatSession, 
  sendMessage, 
  deleteChatSession,
  changeModel,
  clearMessages
} from '@/services/chatService';
import ChatSidebar from '@/components/ChatSidebar';
import ChatBox from '@/components/ChatBox';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Инициализация приложения
  useEffect(() => {
    // Если нет сессий, создаем первую
    if (sessions.length === 0) {
      const newSession = createChatSession();
      setSessions([newSession]);
      setCurrentSessionId(newSession.id);
    }
  }, [sessions.length]);
  
  // Текущая сессия
  const currentSession = sessions.find(s => s.id === currentSessionId) || null;
  
  // Обработчики действий
  
  const handleNewChat = () => {
    const newSession = createChatSession();
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    setIsMobileMenuOpen(false);
  };
  
  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsMobileMenuOpen(false);
  };
  
  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = deleteChatSession(sessions, sessionId);
    setSessions(updatedSessions);
    
    // Если удалили текущую сессию, выбираем другую
    if (sessionId === currentSessionId) {
      setCurrentSessionId(updatedSessions.length > 0 ? updatedSessions[0].id : null);
      
      // Если сессий не осталось, создаем новую
      if (updatedSessions.length === 0) {
        handleNewChat();
      }
    }
  };
  
  const handleSendMessage = async (content: string) => {
    if (!currentSession) return;
    
    setIsLoading(true);
    
    try {
      const updatedSession = await sendMessage(currentSession, content);
      
      // Обновляем сессию в списке сессий
      setSessions(prev => 
        prev.map(session => 
          session.id === updatedSession.id ? updatedSession : session
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChangeModel = (modelId: string) => {
    if (!currentSession) return;
    
    const updatedSession = changeModel(currentSession, modelId);
    
    setSessions(prev => 
      prev.map(session => 
        session.id === updatedSession.id ? updatedSession : session
      )
    );
  };
  
  const handleClearMessages = () => {
    if (!currentSession) return;
    
    const updatedSession = clearMessages(currentSession);
    
    setSessions(prev => 
      prev.map(session => 
        session.id === updatedSession.id ? updatedSession : session
      )
    );
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Боковая панель для десктопа */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <ChatSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSessionSelect={handleSessionSelect}
          onNewChat={handleNewChat}
          onDeleteSession={handleDeleteSession}
        />
      </div>
      
      {/* Основной контент */}
      <div className="flex flex-col flex-1">
        {/* Мобильная шапка */}
        <div className="md:hidden border-b p-2 flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon name="Menu" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <ChatSidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSessionSelect={handleSessionSelect}
                onNewChat={handleNewChat}
                onDeleteSession={handleDeleteSession}
              />
            </SheetContent>
          </Sheet>
          
          <div className="flex-1 mx-2 text-center font-medium truncate">
            {currentSession?.title || 'AI Чат'}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewChat}
          >
            <Icon name="Plus" />
          </Button>
        </div>
        
        {/* Область чата */}
        <div className="flex-1 overflow-hidden">
          {currentSession ? (
            <ChatBox
              session={currentSession}
              onSendMessage={handleSendMessage}
              onChangeModel={handleChangeModel}
              onClearMessages={handleClearMessages}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button onClick={handleNewChat}>Создать новый чат</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
