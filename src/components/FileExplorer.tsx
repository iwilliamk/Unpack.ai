import React, { useCallback } from 'react';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { ProcessedFile } from '@/types/analysis';

interface FileNode extends Partial<ProcessedFile> {
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  selectedFile?: FileNode;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  selectedFile
}) => {
  const renderNode = useCallback((node: FileNode, depth = 0) => {
    const isFolder = node.type === 'folder';
    const isSelected = selectedFile?.path === node.path;

    return (
      <div key={node.path} className="select-none">
        <div
          className={cn(
            "flex items-center py-1 px-2 hover:bg-secondary/50 cursor-pointer",
            isSelected && "bg-secondary",
            "transition-colors"
          )}
          style={{ paddingLeft: `${depth * 1.5}rem` }}
          onClick={() => !isFolder && onFileSelect(node)}
          onDoubleClick={() => !isFolder && node.content && onFileSelect(node)}
        >
          {isFolder ? (
            <>
              <ChevronRight className="w-4 h-4 mr-1" />
              <Folder className="w-4 h-4 mr-2 text-blue-400" />
            </>
          ) : (
            <File className="w-4 h-4 mr-2 text-gray-400" />
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        {isFolder && node.children?.map(child => renderNode(child, depth + 1))}
      </div>
    );
  }, [onFileSelect, selectedFile]);

  return (
    <div className="w-64 h-full bg-background border-r overflow-y-auto">
      <div className="p-2 border-b">
        <h3 className="font-semibold">Files</h3>
      </div>
      <div className="py-2">
        {files.map(file => renderNode(file))}
      </div>
    </div>
  );
};