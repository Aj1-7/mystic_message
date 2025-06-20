'use client';

import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const messages = [
  {
    title: "Anonymous Feedback",
    content: "Your service has been excellent!",
    received: "2024-03-15"
  },
  {
    title: "Customer Review",
    content: "Great experience working with your team.",
    received: "2024-03-14"
  },
  {
    title: "User Message",
    content: "Looking forward to future collaborations.",
    received: "2024-03-13"
  }
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-950 text-white">
      
      {/* ✅ HERO Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 py-16 space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Dive into the World of <br /> <span className="text-indigo-400">Anonymous Feedback</span>
        </h2>
        <p className="max-w-xl text-gray-300 text-lg">
          True Feedback - Where your identity remains a secret. Share your honest thoughts freely.
        </p>

        {/* ✅ Carousel */}
        <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full max-w-2xl mt-8">
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-2">
                <Card className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 text-left">
                  <CardHeader className="flex items-center gap-3">
                    <Mail className="text-indigo-400" />
                    <div>
                      <CardTitle className="text-lg">{message.title}</CardTitle>
                      <CardDescription className="text-gray-400 text-xs">{message.received}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 text-gray-100 text-base">{message.content}</CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 gap-2">
            <CarouselPrevious className="h-8 w-8" />
            <CarouselNext className="h-8 w-8" />
          </div>
        </Carousel>
      </section>

      {/* ✅ Footer */}
      <footer className="w-full py-4 text-center bg-gray-900 text-sm text-gray-400">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </main>
  );
}
