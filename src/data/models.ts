
import { AiModel } from '@/types/chat';

export const aiModels: AiModel[] = [
  {
    id: 'gpt-3.5',
    name: 'ChatGPT 3.5',
    description: 'Быстрая и эффективная модель для большинства задач',
    maxTokens: 4096,
    avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 'gpt-4',
    name: 'ChatGPT 4',
    description: 'Продвинутая модель с улучшенным пониманием и рассуждением',
    maxTokens: 8192,
    avatar: 'https://images.unsplash.com/photo-1676062570104-1741d482978f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Модель от Anthropic с фокусом на полезности и безопасности',
    maxTokens: 100000,
    avatar: 'https://images.unsplash.com/photo-1675426513524-b714bf4f85e1?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 'llama-3',
    name: 'Llama 3',
    description: 'Открытая модель от Meta с широкими возможностями',
    maxTokens: 8192,
    avatar: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Мультимодальная модель от Google DeepMind',
    maxTokens: 32768,
    avatar: 'https://images.unsplash.com/photo-1635002952476-bb7353651145?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  }
];

export const getModelById = (id: string): AiModel => {
  const model = aiModels.find(model => model.id === id);
  if (!model) {
    return aiModels[0]; // Возвращаем первую модель по умолчанию
  }
  return model;
};
