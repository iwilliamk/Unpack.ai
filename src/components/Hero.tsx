import React from 'react';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-16 px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
        unpack.ai
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl animate-slide-in">
        AI-powered malware reverse engineering and cipher analysis platform. Upload your code and let our AI assist you in understanding and analyzing potential threats.
      </p>
      <div className="flex gap-4 animate-fade-in">
        <Button size="lg" className="gap-2">
          <Zap className="w-4 h-4" />
          Get Started
        </Button>
      </div>
    </div>
  );
};