
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';
import { fetchCryptoNews, getNewsApiKey, NewsItem } from '@/services/newsApi';
import { format } from 'date-fns';

type NewsCardProps = {
  article: NewsItem;
  featured?: boolean;
};

const NewsCard = ({ article, featured = false }: NewsCardProps) => (
  <Card className="glass-card overflow-hidden h-full transition-all hover:translate-y-[-4px]">
    <div className="relative h-48 overflow-hidden">
      <img
        src={article.urlToImage || `https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1332&auto=format&fit=crop`}
        alt={article.title}
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
      />
      <div className="absolute top-3 left-3">
        <span className="text-xs font-semibold bg-crypto-500 text-white px-2 py-1 rounded-full">
          {article.category || 'General'}
        </span>
      </div>
    </div>
    <CardContent className="p-5">
      <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold mb-2 line-clamp-2 text-white`}>{article.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden mr-2 flex items-center justify-center">
            {article.source?.name ? (
              <div className="flex items-center justify-center bg-crypto-600 text-white w-full h-full text-xs font-bold">
                {article.source.name.substring(0, 2).toUpperCase()}
              </div>
            ) : (
              <Newspaper className="text-white h-4 w-4" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium text-white">{article.source?.name || "News Source"}</p>
            <p className="text-xs text-gray-400 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {article.publishedAt 
                ? format(new Date(article.publishedAt), 'PPp')
                : "Recent"
              }
            </p>
          </div>
        </div>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-crypto-500 hover:text-crypto-400">
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </CardContent>
  </Card>
);

const NewsGrid = () => {
  const [topStories, setTopStories] = useState<NewsItem[]>([]);
  const [moreStories, setMoreStories] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const hasApiKey = getNewsApiKey() !== null;

  useEffect(() => {
    const getNews = async () => {
      if (!hasApiKey) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const news = await fetchCryptoNews(15);
        if (news.length > 0) {
          // We already used first 5 articles in FeaturedNews
          setTopStories(news.slice(5, 8));
          setMoreStories(news.slice(8, 12));
        }
      } catch (error) {
        console.error("Error in NewsGrid:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [hasApiKey]);

  // Fallback data in case API key is not set or there are no results
  const fallbackTopStories: NewsItem[] = [
    {
      title: "DeFi Protocol TVL Increases by 30% in Recent Bull Market",
      description: "Total Value Locked (TVL) in decentralized finance protocols has jumped significantly as the crypto market heats up.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1332&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: { name: "DeFi Pulse" },
      category: "DeFi"
    },
    {
      title: "Top Gaming Company Integrates NFTs into Popular Online Game",
      description: "Major gaming publisher announces a strategic partnership to bring digital collectibles to their flagship title.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1616509091215-57bbf92cc731?q=80&w=1287&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      source: { name: "GameTech" },
      category: "NFT"
    },
    {
      title: "Crypto Lending Platforms Face New Regulatory Challenges",
      description: "Government agencies across multiple countries are introducing stricter oversight for cryptocurrency lending services.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1607370890042-184b835f338d?q=80&w=1287&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "CryptoNews" },
      category: "Regulation"
    }
  ];

  const fallbackMoreStories: NewsItem[] = [
    {
      title: "South American Country Plans to Add Bitcoin to National Reserves",
      description: "Following El Salvador's lead, another nation is considering adopting cryptocurrency for its treasury management.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1274&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: { name: "Global Finance" },
      category: "Adoption"
    },
    {
      title: "New Layer 1 Blockchain Claims 100,000 TPS in Latest Testnet",
      description: "Innovative blockchain project releases impressive performance metrics ahead of mainnet launch scheduled for next quarter.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1287&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      source: { name: "CryptoDaily" },
      category: "Technology"
    },
    {
      title: "Crypto Mining Companies Turning to Renewable Energy Sources",
      description: "Industry leaders are increasingly investing in solar and wind power facilities to reduce carbon footprint of mining operations.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?q=80&w=1287&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "GreenTech" },
      category: "Mining"
    },
    {
      title: "Major Investment Bank Adds Crypto Research Desk",
      description: "Wall Street firm expands analysis team to cover digital assets amid growing client interest in cryptocurrency investments.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=1288&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      source: { name: "InvestDaily" },
      category: "Institutional"
    }
  ];

  return (
    <section className="py-12 px-4 md:py-16 bg-muted">
      <div className="container mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Top Stories</h2>
          <p className="text-gray-400">The most important crypto news of the day</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="glass-card overflow-hidden h-full animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <CardContent className="p-5">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 mr-2"></div>
                      <div>
                        <div className="h-3 bg-gray-700 rounded w-20 mb-1"></div>
                        <div className="h-2 bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            (topStories.length > 0 ? topStories : fallbackTopStories).map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                featured={index === 0}
              />
            ))
          )}
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">More Stories</h2>
          <p className="text-gray-400">Stay updated with the latest crypto news</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="glass-card overflow-hidden h-full animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <CardContent className="p-5">
                  <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                      <div>
                        <div className="h-2 bg-gray-700 rounded w-16 mb-1"></div>
                        <div className="h-2 bg-gray-700 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            (moreStories.length > 0 ? moreStories : fallbackMoreStories).map((article, index) => (
              <NewsCard
                key={index}
                article={article}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
