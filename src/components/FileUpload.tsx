import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Files dropped:', acceptedFiles);
    
    const oversizedFiles = acceptedFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error('Some files exceed the 10MB size limit');
      return;
    }

    // Handle the accepted files
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        toast.success(`Successfully loaded ${file.name}`);
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.js', '.py', '.cpp', '.c', '.h', '.cs', '.java', '.rb', '.php']
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
        <p className="text-lg font-medium">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-muted-foreground">
          or click to select files
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Supported files: .txt, .js, .py, .cpp, .c, .h, .cs, .java, .rb, .php (Max 10MB)
        </p>
      </div>
    </div>
  );
};