
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { ChatSession } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  className?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewChat,
  onDeleteSession,
  className
}) => {
  // Сортируем сессии по дате обновления (сначала новые)
  const sortedSessions = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);
  
  return (
    <div className={cn("flex flex-col h-full border-r p-4", className)}>
      <Button
        variant="default"
        className="mb-4 gap-2"
        onClick={onNewChat}
      >
        <Icon name="Plus" size={16} />
        <span>Новый чат</span>
      </Button>
      
      <ScrollArea className="flex-1 -mr-4 pr-4">
        {sortedSessions.length > 0 ? (
          <div className="space-y-2">
            {sortedSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSessionSelect(session.id)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm text-left transition-colors",
                  "hover:bg-accent group",
                  session.id === currentSessionId
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2 flex-1 overflow-hidden">
                  <Icon name="MessageSquare" size={16} />
                  <span className="truncate">{session.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Icon name="MessagesSquare" size={24} className="mb-2 opacity-50" />
            <p className="text-sm">Нет активных чатов</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
