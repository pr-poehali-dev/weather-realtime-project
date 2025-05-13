
import React from 'react';
import { Message } from '@/types/chat';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
  modelAvatar?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isLast = false,
  modelAvatar
}) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full mb-4 last:mb-0 animate-in fade-in-0 duration-300",
        isLast && "slide-in-from-bottom-5"
      )}
    >
      <div className="flex-shrink-0 mr-3">
        {isUser ? (
          <Avatar>
            <AvatarFallback className="bg-blue-600 text-white">
              <Icon name="User" size={14} />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarImage src={modelAvatar} alt="AI" />
            <AvatarFallback className="bg-purple-600 text-white">
              <Icon name="Bot" size={14} />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-medium text-sm">
            {isUser ? 'Вы' : 'Ассистент'}
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            {formatDate(message.timestamp)}
          </span>
        </div>
        <Card 
          className={cn(
            "p-3 text-sm",
            isUser 
              ? "bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-900" 
              : "bg-white dark:bg-gray-900"
          )}
        >
          {message.content.split('\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-2" : ""}>
              {paragraph}
            </p>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
