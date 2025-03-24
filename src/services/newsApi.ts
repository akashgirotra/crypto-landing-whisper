
import { toast } from "sonner";

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
  author?: string;
}

// Hard-coded API key (or you can set it via the UI)
const DEFAULT_NEWS_API_KEY = "your-api-key-here";

// Using localStorage to store the API key, with fallback to the default key
export const getNewsApiKey = (): string | null => {
  return localStorage.getItem('news_api_key') || DEFAULT_NEWS_API_KEY;
};

export const setNewsApiKey = (apiKey: string): void => {
  localStorage.setItem('news_api_key', apiKey);
};

// Fetch cryptocurrency news from News API
export const fetchCryptoNews = async (count: number = 10): Promise<NewsItem[]> => {
  const apiKey = getNewsApiKey();
  
  if (!apiKey) {
    toast.error("API key not found. Please enter your News API key.");
    return [];
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=cryptocurrency+OR+bitcoin+OR+crypto&sortBy=publishedAt&pageSize=${count}&language=en`,
      {
        headers: {
          'X-Api-Key': apiKey
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(`Failed to fetch news: ${errorData.message || 'Unknown error'}`);
      return [];
    }

    const data = await response.json();
    return data.articles.map((article: any) => ({
      ...article,
      category: getCategoryFromContent(article.title + " " + article.description)
    }));
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    toast.error("Failed to fetch news. Please try again later.");
    return [];
  }
};

// Helper function to categorize news based on content
const getCategoryFromContent = (content: string): string => {
  content = content.toLowerCase();
  
  if (content.includes("defi") || content.includes("decentralized finance")) {
    return "DeFi";
  } else if (content.includes("nft") || content.includes("non-fungible token")) {
    return "NFT";
  } else if (content.includes("regulation") || content.includes("sec") || content.includes("law")) {
    return "Regulation";
  } else if (content.includes("mining") || content.includes("miner")) {
    return "Mining";
  } else if (content.includes("adoption") || content.includes("adopt")) {
    return "Adoption";
  } else if (content.includes("technology") || content.includes("protocol") || content.includes("layer")) {
    return "Technology";
  } else if (content.includes("exchange") || content.includes("trading")) {
    return "Trading";
  } else if (content.includes("invest") || content.includes("institutional")) {
    return "Institutional";
  }
  
  return "General";
};
