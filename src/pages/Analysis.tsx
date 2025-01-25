import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import CodeEditor from '@/components/CodeEditor';
import AnalysisPanel from '@/components/AnalysisPanel';
import ChatInterface from '@/components/ChatInterface';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const Analysis = () => {
  const [code, setCode] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleAnalyze = () => {
    console.log('Analyzing code:', code);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      {!isFileUploaded ? (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Upload Your Code</h2>
            <p className="text-gray-300 text-center mb-8">
              Upload your files to begin the analysis process. Our AI agents will help you understand and analyze the code.
            </p>
            <FileUpload onFileUpload={() => setIsFileUploaded(true)} />
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

export default Analysis;