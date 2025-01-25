import React from 'react';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AnalysisResultsProps {
  results: {
    name: string;
    content: string;
    aiAnalysis: {
      summary: string;
      potentialThreats: string[];
      recommendations: string[];
    };
    sandboxResult: Record<string, unknown>;
  };
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Analysis Results: {results.name}</h2>
      
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="sandbox">Sandbox Results</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Code Summary</h3>
                <p className="text-sm">{results.aiAnalysis.summary}</p>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="threats">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {results.aiAnalysis.potentialThreats.map((threat, index) => (
                <Card key={index} className="p-4">
                  <p className="text-sm text-red-400">{threat}</p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="recommendations">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {results.aiAnalysis.recommendations.map((rec, index) => (
                <Card key={index} className="p-4">
                  <p className="text-sm text-green-400">{rec}</p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sandbox">
          <ScrollArea className="h-[400px]">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Sandbox Execution Results</h3>
              <pre className="text-sm bg-muted p-2 rounded">
                {JSON.stringify(results.sandboxResult, null, 2)}
              </pre>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
};