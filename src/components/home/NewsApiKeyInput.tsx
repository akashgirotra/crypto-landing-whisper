
import React, { useState, useEffect } from 'react';
import { getNewsApiKey, setNewsApiKey } from '@/services/newsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NewsApiKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [isUsingDefault, setIsUsingDefault] = useState(false);

  useEffect(() => {
    const savedKey = getNewsApiKey();
    if (savedKey) {
      setIsKeySet(true);
      // Check if we're using the default API key or a custom one
      setIsUsingDefault(!localStorage.getItem('news_api_key'));
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
    setIsUsingDefault(false);
    toast.success("API key saved successfully");
    window.location.reload(); // Reload to fetch news with the new key
  };

  const handleReset = () => {
    localStorage.removeItem('news_api_key');
    setApiKey('');
    setIsKeySet(true); // Still true because we'll fall back to the default key
    setIsUsingDefault(true);
    toast.info("Custom API key removed, using default key");
    window.location.reload(); // Reload to fetch news with the default key
  };

  if (isKeySet) {
    return (
      <div className="mb-8 flex items-center justify-between glass-panel p-4 rounded-lg">
        {isUsingDefault ? (
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-400 mr-2" />
            <p className="text-white">Using default News API key</p>
          </div>
        ) : (
          <p className="text-white">Custom News API key is configured</p>
        )}
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleReset}
        >
          {isUsingDefault ? "Use Custom Key" : "Reset API Key"}
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
