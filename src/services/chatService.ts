import { ChatSession, Message, MessageRole, AiModel } from "@/types/chat";
import { getModelById } from "@/data/models";

// Функция для генерации уникальных идентификаторов (замена uuid)
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Симулирует задержку сети для более реалистичного опыта
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Имитируем ответы AI для демонстрации
const generateAiResponse = async (
  messages: Message[],
  model: AiModel,
): Promise<string> => {
  // Получаем последнее сообщение пользователя
  const lastUserMessage =
    messages.filter((m) => m.role === "user").pop()?.content || "";

  // Простые правила для генерации ответа
  let response = "";

  if (
    lastUserMessage.toLowerCase().includes("привет") ||
    lastUserMessage.toLowerCase().includes("здравствуй")
  ) {
    response = "Привет! Чем я могу помочь вам сегодня?";
  } else if (lastUserMessage.toLowerCase().includes("погода")) {
    response =
      "Я не могу проверить текущую погоду в реальном времени, но могу помочь вам найти источники прогноза погоды или ответить на общие вопросы о климате.";
  } else if (
    lastUserMessage.toLowerCase().includes("кто ты") ||
    lastUserMessage.toLowerCase().includes("как тебя зовут")
  ) {
    response = `Я ${model.name}, AI-ассистент. Я здесь, чтобы помочь ответить на ваши вопросы и поддержать диалог.`;
  } else if (lastUserMessage.toLowerCase().includes("спасибо")) {
    response =
      "Всегда рад помочь! Если у вас возникнут еще вопросы, обращайтесь.";
  } else if (
    lastUserMessage.toLowerCase().includes("возможности") ||
    lastUserMessage.toLowerCase().includes("что ты умеешь")
  ) {
    response = `Как ${model.name}, я могу отвечать на вопросы, помогать с написанием текстов, предоставлять информацию (с учетом моих ограничений) и участвовать в диалогах на различные темы. ${model.description}`;
  } else if (lastUserMessage.length < 5) {
    response =
      "Могли бы вы уточнить свой вопрос? Я готов помочь, но мне нужно больше информации.";
  } else {
    // Стандартный ответ для демо
    const responses = [
      `Спасибо за ваш вопрос! Как ${model.name}, я могу сказать, что это интересная тема. Расскажите мне больше о том, что конкретно вас интересует.`,
      `Интересный вопрос! Я бы хотел подробнее узнать, какой аспект этой темы вас интересует больше всего?`,
      `Я понимаю ваш интерес к этой теме. Давайте обсудим это подробнее. Что именно вы хотели бы узнать?`,
      `Хороший вопрос! Есть несколько аспектов, которые стоит рассмотреть. Какой из них вас интересует больше всего?`,
      `Я могу предложить несколько подходов к этой теме. Что именно вы пытаетесь достичь или узнать?`,
    ];
    response = responses[Math.floor(Math.random() * responses.length)];
  }

  // Добавляем случайную задержку для реализма
  await delay(1000 + Math.random() * 2000);

  return response;
};

// Создаем новую сессию чата
export const createChatSession = (modelId: string = "gpt-3.5"): ChatSession => {
  const model = getModelById(modelId);
  return {
    id: generateId(),
    title: "Новый чат",
    messages: [],
    model,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
};

// Имитация отправки сообщения и получения ответа
export const sendMessage = async (
  session: ChatSession,
  content: string,
): Promise<ChatSession> => {
  if (!content.trim()) {
    throw new Error("Сообщение не может быть пустым");
  }

  // Создаем новое сообщение пользователя
  const userMessage: Message = {
    id: generateId(),
    role: "user",
    content,
    timestamp: Date.now(),
  };

  // Обновляем список сообщений
  const updatedMessages = [...session.messages, userMessage];

  // Если это первое сообщение, обновляем заголовок чата
  let title = session.title;
  if (session.messages.length === 0) {
    title = content.length > 30 ? `${content.substring(0, 30)}...` : content;
  }

  const updatedSession: ChatSession = {
    ...session,
    messages: updatedMessages,
    title,
    updatedAt: Date.now(),
  };

  // Получаем ответ AI
  const aiResponse = await generateAiResponse(updatedMessages, session.model);

  // Создаем сообщение AI
  const assistantMessage: Message = {
    id: generateId(),
    role: "assistant",
    content: aiResponse,
    timestamp: Date.now(),
  };

  // Возвращаем окончательно обновленную сессию
  return {
    ...updatedSession,
    messages: [...updatedMessages, assistantMessage],
    updatedAt: Date.now(),
  };
};

// Изменение модели в сессии
export const changeModel = (
  session: ChatSession,
  modelId: string,
): ChatSession => {
  const model = getModelById(modelId);
  return {
    ...session,
    model,
    updatedAt: Date.now(),
  };
};

// Удаление сессии
export const deleteChatSession = (
  sessions: ChatSession[],
  sessionId: string,
): ChatSession[] => {
  return sessions.filter((session) => session.id !== sessionId);
};

// Очистка сообщений в сессии
export const clearMessages = (session: ChatSession): ChatSession => {
  return {
    ...session,
    messages: [],
    updatedAt: Date.now(),
  };
};
