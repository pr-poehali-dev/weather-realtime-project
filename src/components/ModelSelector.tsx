
import React, { useState } from 'react';
import { AiModel } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AvatarWithStatus from '@/components/ui/avatar-with-status';
import Icon from '@/components/ui/icon';

interface ModelSelectorProps {
  models: AiModel[];
  selectedModel: AiModel;
  onModelChange: (modelId: string) => void;
  disabled?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onModelChange,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          disabled={disabled}
        >
          <AvatarWithStatus 
            src={selectedModel.avatar}
            fallback={selectedModel.name.substring(0, 2)}
            size="sm"
            status="online"
          />
          <span className="text-sm font-medium">{selectedModel.name}</span>
          <Icon name="ChevronDown" size={16} className="ml-1 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[240px]">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className="flex items-center gap-2 py-2"
            onClick={() => {
              onModelChange(model.id);
              setIsOpen(false);
            }}
          >
            <AvatarWithStatus 
              src={model.avatar} 
              fallback={model.name.substring(0, 2)}
              size="sm"
              status={model.id === selectedModel.id ? 'online' : undefined}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{model.name}</span>
              <span className="text-xs text-muted-foreground">{model.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelSelector;
