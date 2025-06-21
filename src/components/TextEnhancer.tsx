
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, Edit3, Volume2, Expand } from 'lucide-react';

const TextEnhancer = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const enhanceText = async (action: string, prompt: string) => {
    if (!inputText.trim()) {
      return;
    }

    setIsLoading(true);
    setActiveAction(action);

    try {
      // Placeholder API call - replace with your actual LLM API endpoint
      const response = await fetch('/api/enhance-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          action: action,
          prompt: prompt
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setOutputText(data.enhancedText || `Enhanced text for "${action}" would appear here. Original: ${inputText}`);
    } catch (error) {
      console.error('Enhancement failed:', error);
      // Fallback for demo purposes
      setOutputText(`Demo: ${action} enhancement of your text would appear here. Original text: "${inputText}"`);
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleFixGrammar = () => {
    enhanceText('Fix Grammar', 'Fix any grammatical errors in the following text and improve clarity while maintaining the original meaning:');
  };

  const handleAdjustTone = () => {
    enhanceText('Adjust Tone', 'Adjust the tone of the following text to be more professional and polished while keeping the core message:');
  };

  const handleExpand = () => {
    enhanceText('Expand', 'Expand the following text with more detail, examples, and context while maintaining the original intent:');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Enhancer</h1>
        <p className="text-gray-600">Improve your text with AI-powered enhancements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Input Text
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your text here to enhance it..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={handleFixGrammar}
          disabled={!inputText.trim() || isLoading}
          variant={activeAction === 'Fix Grammar' ? 'default' : 'outline'}
          className="flex items-center gap-2"
        >
          {activeAction === 'Fix Grammar' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          Fix Grammar
        </Button>

        <Button
          onClick={handleAdjustTone}
          disabled={!inputText.trim() || isLoading}
          variant={activeAction === 'Adjust Tone' ? 'default' : 'outline'}
          className="flex items-center gap-2"
        >
          {activeAction === 'Adjust Tone' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
          Adjust Tone
        </Button>

        <Button
          onClick={handleExpand}
          disabled={!inputText.trim() || isLoading}
          variant={activeAction === 'Expand' ? 'default' : 'outline'}
          className="flex items-center gap-2"
        >
          {activeAction === 'Expand' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Expand className="h-4 w-4" />
          )}
          Expand
        </Button>
      </div>

      {outputText && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Enhanced Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 leading-relaxed">{outputText}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!outputText && (
        <Card className="border-dashed">
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-center">
              Enhanced text will appear here after you click one of the buttons above
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TextEnhancer;
