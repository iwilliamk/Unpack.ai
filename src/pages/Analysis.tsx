import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import CodeEditor from '@/components/CodeEditor';
import { FileExplorer } from '@/components/FileExplorer';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AnalysisPanel from '@/components/AnalysisPanel';
import ChatInterface from '@/components/ChatInterface';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

const Analysis = () => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (newFiles: File[]) => {
    const processedFiles = newFiles.map(file => ({
      name: file.name,
      type: 'file' as const,
      content: '',
      path: file.name
    }));
    
    setFiles(prev => [...prev, ...processedFiles]);
    setIsFileUploaded(true);
    console.log('Files processed:', processedFiles);
  };

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
    console.log('Selected file:', file);
  };

  const handleCodeChange = (newCode: string) => {
    if (selectedFile) {
      setFiles(prev =>
        prev.map(f =>
          f.path === selectedFile.path ? { ...f, content: newCode } : f
        )
      );
      console.log('Code updated for file:', selectedFile.path);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!isFileUploaded ? (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Upload Your Code
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Upload your files to begin the analysis process. Our AI agents will help you understand and analyze the code.
            </p>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={15} minSize={10}>
            <FileExplorer
              files={files}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile || undefined}
            />
          </ResizablePanel>
          <ResizablePanel defaultSize={45} minSize={30}>
            <div className="h-screen p-4">
              <CodeEditor
                code={selectedFile?.content || ''}
                onChange={handleCodeChange}
                language={selectedFile?.name.split('.').pop() || 'text'}
              />
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={40} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <div className="h-full p-4">
                  <AnalysisPanel onAnalyze={() => console.log('Analyzing...')} />
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