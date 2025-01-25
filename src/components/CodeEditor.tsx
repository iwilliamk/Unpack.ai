import React from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  language = 'javascript',
  readOnly = false 
}) => {
  return (
    <Card className="h-full overflow-hidden bg-code-background">
      <div className="flex items-center justify-between p-2 border-b bg-background/50">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{language}</span>
        </div>
      </div>
      <textarea
        className={cn(
          "code-editor w-full h-[calc(100%-40px)] resize-none focus:outline-none p-4",
          "font-mono text-sm leading-relaxed",
          readOnly && "opacity-80"
        )}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        readOnly={readOnly}
      />
    </Card>
  );
};

export default CodeEditor;