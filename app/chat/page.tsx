"use client";

import React from 'react';
import ChatComponent from './ChatComponent';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-blue-100 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <Bot className="w-10 h-10" />
            <CardTitle className="text-2xl font-bold">AI Chatbot</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ChatComponent />
        </CardContent>
      </Card>
    </div>
  );
}