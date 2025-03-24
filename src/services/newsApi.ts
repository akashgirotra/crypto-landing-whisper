
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
const DEFAULT_NEWS_API_KEY = "c34fa233f38048b5b8bc976d58605b23";

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
    // Check if we're running in development or production
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    if (!isLocalhost) {
      console.warn("NewsAPI free tier only works on localhost in development mode. Returning mock data for demonstration.");
      toast.warning("Using demo data: NewsAPI free tier only works in development mode");
      return getMockNewsData(count);
    }

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
      console.error("NewsAPI error:", errorData);
      toast.error(`Failed to fetch news: ${errorData.message || 'Unknown error'}`);
      return getMockNewsData(count);
    }

    const data = await response.json();
    return data.articles.map((article: any) => ({
      ...article,
      category: getCategoryFromContent(article.title + " " + article.description)
    }));
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    toast.error("Failed to fetch live news. Using demo data instead.");
    return getMockNewsData(count);
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

// Mock data function for when API is not available
const getMockNewsData = (count: number): NewsItem[] => {
  const mockData: NewsItem[] = [
    {
      title: "Bitcoin Breaks $65,000 Barrier as Institutional Investors Pile In",
      description: "Bitcoin has surged past $65,000, reaching new heights as major financial institutions continue to increase their cryptocurrency holdings.",
      url: "https://example.com/bitcoin-65k",
      urlToImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600",
      publishedAt: new Date().toISOString(),
      source: { name: "Crypto Daily" },
      category: "Market"
    },
    {
      title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
      description: "Ethereum scaling solutions are processing more transactions than ever before as adoption continues to grow.",
      url: "https://example.com/eth-layer2",
      urlToImage: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "DeFi Pulse" },
      category: "Technology"
    },
    {
      title: "Major Central Banks Explore CBDC Options",
      description: "Central banks worldwide are accelerating their research into central bank digital currencies, with several pilot programs launching soon.",
      url: "https://example.com/cbdc-research",
      urlToImage: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=600",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: { name: "Global Finance" },
      category: "Regulation"
    },
    {
      title: "New DeFi Protocol Gains $100M in Total Value Locked",
      description: "A new decentralized finance protocol has attracted over $100 million in assets within just one week of launch.",
      url: "https://example.com/defi-growth",
      urlToImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: { name: "DeFi Times" },
      category: "DeFi"
    },
    {
      title: "Gaming Giant Partners with NFT Marketplace",
      description: "A major video game publisher has announced a strategic partnership with a leading NFT marketplace to bring digital collectibles to their games.",
      url: "https://example.com/gaming-nft",
      urlToImage: "https://images.unsplash.com/photo-1616509091215-57bbf92cc731?w=600",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      source: { name: "Gaming Today" },
      category: "NFT"
    },
    {
      title: "Crypto Mining Firms Invest in Renewable Energy",
      description: "Leading cryptocurrency mining companies are investing heavily in renewable energy sources to address environmental concerns.",
      url: "https://example.com/mining-green",
      urlToImage: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=600",
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "Clean Energy" },
      category: "Mining"
    },
    {
      title: "New Regulations Target Stablecoin Issuers",
      description: "Regulatory bodies have proposed new frameworks specifically addressing stablecoin issuers and their reserve requirements.",
      url: "https://example.com/stablecoin-regs",
      urlToImage: "https://images.unsplash.com/photo-1621761311921-32791522636a?w=600",
      publishedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "Regulatory Watch" },
      category: "Regulation"
    },
    {
      title: "Adoption Surges in Southeast Asia as Local Exchanges See Record Volumes",
      description: "Cryptocurrency exchanges in Southeast Asia are reporting unprecedented trading volumes as adoption accelerates in the region.",
      url: "https://example.com/sea-adoption",
      urlToImage: "https://images.unsplash.com/photo-1465226337642-f72a5b243cfe?w=600",
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "Asia Crypto Today" },
      category: "Adoption"
    },
    {
      title: "Leading Exchange Expands Institutional Services",
      description: "A top cryptocurrency exchange has launched new services specifically designed for institutional investors, including custody solutions.",
      url: "https://example.com/institutional-services",
      urlToImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      publishedAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "Institutional Insight" },
      category: "Institutional"
    },
    {
      title: "New Privacy-Focused Layer 1 Blockchain Launches Mainnet",
      description: "A new blockchain focusing on privacy and scalability has officially launched its mainnet after two years of development.",
      url: "https://example.com/privacy-chain",
      urlToImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "Blockchain Daily" },
      category: "Technology"
    },
    {
      title: "South American Nation Considers Bitcoin as Legal Tender",
      description: "Following El Salvador's lead, another South American country is now considering adopting Bitcoin as legal tender within its borders.",
      url: "https://example.com/legal-tender",
      urlToImage: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=600",
      publishedAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "Global Adoption" },
      category: "Adoption"
    },
    {
      title: "Major Bank Adds Crypto Trading for Wealthy Clients",
      description: "A global banking giant now offers cryptocurrency trading services to its high-net-worth clients, signaling growing mainstream acceptance.",
      url: "https://example.com/bank-trading",
      urlToImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "Banking Today" },
      category: "Institutional"
    },
    {
      title: "Record NFT Sale: Digital Artwork Sells for $50 Million",
      description: "A single piece of digital art has sold for $50 million in the largest NFT transaction to date, setting new records for digital collectibles.",
      url: "https://example.com/nft-record",
      urlToImage: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600",
      publishedAt: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "NFT World" },
      category: "NFT"
    },
    {
      title: "DeFi Insurance Protocols See Growing Demand After Recent Hacks",
      description: "Following several high-profile hacks, decentralized insurance protocols are seeing unprecedented demand for coverage of DeFi positions.",
      url: "https://example.com/defi-insurance",
      urlToImage: "https://images.unsplash.com/photo-1617870952348-7524edfb61b7?w=600",
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "DeFi Insider" },
      category: "DeFi"
    },
  ];
  
  // Return only the requested number of items
  return mockData.slice(0, count);
};
