
import React, { useState, useEffect } from 'react';
import { getNewsApiKey, setNewsApiKey } from '@/services/newsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NewsApiKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    const savedKey = getNewsApiKey();
    if (savedKey) {
      setIsKeySet(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    setNewsApiKey(apiKey);
    setIsKeySet(true);
    toast.success("API key saved successfully");
    window.location.reload(); // Reload to fetch news with the new key
  };

  const handleReset = () => {
    localStorage.removeItem('news_api_key');
    setApiKey('');
    setIsKeySet(false);
    toast.info("API key removed");
  };

  if (isKeySet) {
    return (
      <div className="mb-8 flex items-center justify-between glass-panel p-4 rounded-lg">
        <p className="text-white">News API key is configured</p>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleReset}
        >
          Reset API Key
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          To display crypto news, you need a News API key. Get one for free at <a href="https://newsapi.org/register" target="_blank" rel="noopener noreferrer" className="underline">newsapi.org</a>
        </AlertDescription>
      </Alert>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your News API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Save Key</Button>
      </form>
    </div>
  );
};

export default NewsApiKeyInput;
