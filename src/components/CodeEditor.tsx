import React from 'react';
import { Card } from './ui/card';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <Card className="h-full overflow-hidden">
      <textarea
        className="code-editor w-full h-full resize-none focus:outline-none"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </Card>
  );
};

export default CodeEditor;