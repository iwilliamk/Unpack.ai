import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { fileProcessingService } from '@/services/fileProcessing';
import { codeAnalyzer } from '@/services/code_analyzer';
import { aiService } from '@/services/ai';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const processedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          const processedFile = await fileProcessingService.processFile(file);
          if (!processedFile) return null;

          // Run code analysis for JavaScript/TypeScript files
          let codeAnalysis = null;
          if (/\.(js|ts|jsx|tsx)$/.test(file.name)) {
            try {
              codeAnalysis = codeAnalyzer.analyzeCode(processedFile.content);
            } catch (err) {
              console.warn('Code analysis error:', err.message);
            }
          }
          
          // Only analyze text files
          let aiAnalysis = null;
          if (processedFile.content) {
            aiAnalysis = await aiService.analyzeCode(processedFile.content, processedFile.name);
          }
          
          return {
            ...processedFile,
            codeAnalysis,
            aiAnalysis
          };
        })
      );

      const validFiles = processedFiles.filter(file => file !== null);
      if (validFiles.length > 0) {
        toast.success(`Successfully processed ${validFiles.length} files`);
        onFileUpload(validFiles);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      toast.error('Failed to process files');
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/javascript': ['.js'],
      'application/typescript': ['.ts'],
      'text/typescript-jsx': ['.tsx'],
      'text/jsx': ['.jsx'],
      'text/x-python': ['.py'],
      'text/x-c': ['.c', '.cpp', '.h'],
      'text/x-csharp': ['.cs'],
      'text/x-java': ['.java'],
      'text/x-ruby': ['.rb'],
      'text/x-php': ['.php'],
      'text/plain': ['.txt']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
        'hover:border-primary hover:bg-primary/5'
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Upload className="w-10 h-10 text-muted-foreground" />
        <p className="text-lg font-medium text-white">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-400">
          or click to select files
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supported files: .txt, .js, .py, .cpp, .c, .h, .cs, .java, .rb, .php (Max 10MB)
        </p>
      </div>
    </div>
  );
};