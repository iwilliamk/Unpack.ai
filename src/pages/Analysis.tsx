import React, { useState, useCallback } from 'react';
import { FileUpload } from '@/components/FileUpload';
import CodeEditor from '@/components/CodeEditor';
import { FileExplorer } from '@/components/FileExplorer';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AnalysisPanel from '@/components/AnalysisPanel';
import ChatInterface from '@/components/ChatInterface';
import { toast } from 'sonner';
import { LoadingView } from './LoadingView';

import { ProcessedFile } from '@/types/analysis';

interface FileNode extends Partial<ProcessedFile> {
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

const Analysis = () => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleFileUpload = useCallback((processedFiles: ProcessedFile[]) => {
    console.log('DEBUG: handleFileUpload called');
    
    // Clear previous state
    setSelectedFile(null);
    setFiles([]);
    console.log('DEBUG: Received processed files:', processedFiles);
    
    if (!Array.isArray(processedFiles) || processedFiles.length === 0) {
      console.error('No valid files received');
      return;
    }

    try {
      const fileNodes = processedFiles.map(file => ({
        ...file,
        type: 'file' as const,
        path: file.name,
        children: []
      }));

      setFiles(fileNodes);
      setIsFileUploaded(true);
    } catch (error) {
      console.error('Error handling file upload:', error);
      toast.error('Failed to process files');
    }
  }, []);

  const handleFileSelect = useCallback((file: FileNode) => {
    if (!file.content) {
      console.error('File has no content:', file);
      return;
    }
    
    console.log('DEBUG: Selected file with content:', file.name);
    setSelectedFile(file);
  }, []);

  const handleCodeChange = useCallback((newCode: string) => {
    if (!selectedFile || !selectedFile.content) {
      console.error('No valid file selected for code change');
      return;
    }

    console.log('DEBUG: Updating code for file:', selectedFile.name);
    setFiles(prev =>
      prev.map(f =>
        f.path === selectedFile.path ? { ...f, content: newCode } : f
      )
    );
  }, [selectedFile]);

  return (
    <div className="min-h-screen bg-background">
      {isProcessing ? (
        <LoadingView />
      ) : !isFileUploaded ? (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-muted-foreground mb-4 text-center">
              Upload Your Code
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Upload your files to begin the analysis process. Our AI agents will help you understand and analyze the code.
            </p>
            <FileUpload 
              onFileUpload={handleFileUpload}
              setIsProcessing={setIsProcessing}
            />
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