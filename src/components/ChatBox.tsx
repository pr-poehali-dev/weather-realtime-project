
import React, { useEffect, useRef } from 'react';
import { ChatSession } from '@/types/chat';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ModelSelector from '@/components/ModelSelector';
import { aiModels } from '@/data/models';

interface ChatBoxProps {
  session: ChatSession;
  onSendMessage: (message: string) => void;
  onChangeModel: (modelId: string) => void;
  onClearMessages: () => void;
  isLoading: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  session,
  onSendMessage,
  onChangeModel,
  onClearMessages,
  isLoading
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Прокрутка вниз при получении новых сообщений
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [session.messages]);
  
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <ModelSelector 
          models={aiModels}
          selectedModel={session.model}
          onModelChange={onChangeModel}
          disabled={isLoading || session.messages.length > 0}
        />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearMessages}
          disabled={isLoading || session.messages.length === 0}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="Trash2" size={16} />
        </Button>
      </div>
      
      <ScrollArea 
        ref={scrollRef} 
        className="flex-1 p-4"
      >
        {session.messages.length > 0 ? (
          <div className="space-y-4">
            {session.messages.map((message, index) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                isLast={index === session.messages.length - 1}
                modelAvatar={session.model.avatar}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-3 mb-4">
              <Icon name="Bot" className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Начните новый разговор</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Выберите модель AI и задайте вопрос, чтобы начать общение
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-4 gap-2 text-left items-start"
                onClick={() => onSendMessage("Привет! Как ты можешь мне помочь?")}
              >
                <span className="font-medium">👋 Познакомиться</span>
                <span className="text-xs text-muted-foreground">Узнать о возможностях ассистента</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-4 gap-2 text-left items-start"
                onClick={() => onSendMessage("Расскажи мне о своих возможностях")}
              >
                <span className="font-medium">💡 Возможности</span>
                <span className="text-xs text-muted-foreground">Изучить, что умеет эта модель</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col h-auto p-4 gap-2 text-left items-start"
                onClick={() => onSendMessage("Чем отличаются разные модели нейросетей?")}
              >
                <span className="font-medium">🤖 О моделях</span>
                <span className="text-xs text-muted-foreground">Узнать про различные модели AI</span>
              </Button>
            </div>
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ChatInput 
          onSendMessage={onSendMessage} 
          isLoading={isLoading}
          placeholder={`Сообщение ${session.model.name}...`}
        />
      </div>
    </div>
  );
};

export default ChatBox;
