import React from 'react';
import { Hero } from '@/components/Hero';
import { FileUpload } from '@/components/FileUpload';
import CodeEditor from '@/components/CodeEditor';
import AnalysisPanel from '@/components/AnalysisPanel';
import ChatInterface from '@/components/ChatInterface';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const Index = () => {
  const [code, setCode] = React.useState('');
  const [isAnalysisMode, setIsAnalysisMode] = React.useState(false);

  const handleAnalyze = () => {
    console.log('Analyzing code:', code);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      {!isAnalysisMode ? (
        <div>
          <Hero />
          <div className="max-w-3xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Ready to analyze your code?
            </h2>
            <FileUpload />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Index;