import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send } from 'lucide-react';
import { aiService } from '@/services/ai';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Welcome to unpack.ai! I can help you analyze code, identify potential threats, and understand encryption methods. What would you like to examine?',
      isUser: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setMessage('');
      setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
      setIsLoading(true);

      try {
        const response = await aiService.analyzeCode(userMessage, "chat");
        setMessages(prev => [...prev, { text: response.summary, isUser: false }]);
      } 
      catch (error) {
        console.error('Error getting AI response:', error);
        setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isUser: false }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <Card key={index} className={`p-3 ${msg.isUser ? 'bg-primary/10 ml-8' : 'bg-secondary mr-8'}`}>
              <p className="text-sm">{msg.text}</p>
            </Card>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about the code or analysis..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ChatInterface;