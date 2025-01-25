import React, { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import AnalysisPanel from '@/components/AnalysisPanel';
import ChatInterface from '@/components/ChatInterface';
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const Index = () => {
  const [code, setCode] = useState('// Paste your code here for analysis');

  const handleAnalyze = () => {
    console.log('Analyzing code:', code);
  };

  return (
    <div className="h-screen bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-screen p-4">
            <CodeEditor code={code} onChange={setCode} />
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <div className="h-full p-4">
                <AnalysisPanel onAnalyze={handleAnalyze} />
              </div>
            </ResizablePanel>
            <ResizablePanel defaultSize={40}>
              <div className="h-full p-4">
                <ChatInterface />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;