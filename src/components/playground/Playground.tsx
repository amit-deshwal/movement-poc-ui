import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useChat } from "ai/react";
import { Send, Camera, Plane, Hand, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageWindow } from "./MessageWindow";

import SentientIcon from "@/assets/SentientSvg";

interface StreamingMetrics {
  tokensPerSecond: number;
  totalTokens: number;
  estimatedCompletionTime: number;
}

interface SuggestionCard {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const suggestionCards: SuggestionCard[] = [
  {
    icon: TrendingUp,
    title: "I want to 2x my money",
    subtitle: "High-growth investment strategies",
  },
  {
    icon: Hand,
    title: "I want stable return like 2% monthly",
    subtitle: "Low-risk, steady investment options",
  },
  {
    icon: Plane,
    title: "I want to retire early with passive income",
    subtitle: "Financial independence & wealth planning",
  },
];

export default function Playground() {
  const [model, setModel] = useState<string>("gemini-1.5-flash");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
  const [presencePenalty, setPresencePenalty] = useState<number>(0);
  const [streamingMetrics, setStreamingMetrics] = useState<StreamingMetrics>({
    tokensPerSecond: 0,
    totalTokens: 0,
    estimatedCompletionTime: 0,
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: "/api/chat",
    body: {
      model,
      temperature,
      topP,
      frequencyPenalty,
      presencePenalty,
    },
    onFinish: (message) => {
      const endTime = Date.now();
      const duration = (endTime - startTimeRef.current) / 1000;
      const newTokens = message.content.split(" ").length;

      setStreamingMetrics((prevMetrics) => {
        const totalTokens = prevMetrics.totalTokens + newTokens;
        const tokensPerSecond = newTokens / duration;
        const estimatedCompletionTime = totalTokens / (tokensPerSecond || 1);

        return {
          tokensPerSecond: tokensPerSecond,
          totalTokens: totalTokens,
          estimatedCompletionTime: estimatedCompletionTime,
        };
      });

      startTimeRef.current = Date.now();
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      await handleSubmit(e);
    }
  };

  const handleSuggestionClick = (title: string) => {
    if (!isLoading) {
      setInput(title);
      handleFormSubmit(
        new Event("submit") as unknown as FormEvent<HTMLFormElement>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Messages area should be scrollable */}
      <div className="flex-1 overflow-auto p-4 pt-14">
        {messages.length === 0 ? (
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SentientIcon />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Hola, Amigos</h1>
            <h2 className="text-xl font-medium mb-3">
              Can I help you with anything?
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Ready to assist you with anything you need: from answering
              questions to providing recommendations. Let's get started!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 sm:px-8 md:px-40 lg:px-80">
              {suggestionCards.map((card, index) => (
                <Card
                  key={index}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSuggestionClick(card.title)}
                >
                  <div className="bg-gray-900 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {card.subtitle}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <MessageWindow messages={messages} isLoading={isLoading} />
        )}
      </div>

      {/* Sticky form at bottom */}
      <form
        onSubmit={handleFormSubmit}
        className="p-4 border-t bg-white sticky bottom-0 w-full"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Camera className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything..."
              className="pr-20 bg-white"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="absolute right-1 top-0 bg-gray-900 hover:bg-gray-700"
            >
              Send <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
