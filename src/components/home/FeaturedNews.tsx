
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';
import { fetchCryptoNews, getNewsApiKey, NewsItem } from '@/services/newsApi';
import NewsApiKeyInput from './NewsApiKeyInput';
import { format } from 'date-fns';

const MainArticle = ({ article }: { article: NewsItem }) => (
  <Card className="glass-panel h-full">
    <div className="relative overflow-hidden h-full rounded-xl flex flex-col">
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={article.urlToImage || "https://images.unsplash.com/photo-1621761311921-32791522636a?q=80&w=1287&auto=format&fit=crop"} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="text-xs font-semibold bg-crypto-500 text-white px-2 py-1 rounded-full">
            {article.category || 'Breaking News'}
          </span>
        </div>
      </div>
      
      <CardContent className="flex-grow flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            {article.title}
          </h2>
          <p className="text-gray-300 mb-4 line-clamp-3">
            {article.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden mr-3 flex items-center justify-center">
              {article.source?.name ? (
                <div className="flex items-center justify-center bg-crypto-600 text-white w-full h-full text-xs font-bold p-2 text-center">
                  {article.source.name.substring(0, 2).toUpperCase()}
                </div>
              ) : (
                <Newspaper className="text-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{article.source?.name || "News Source"}</p>
              <p className="text-xs text-gray-400 flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> 
                {article.publishedAt 
                  ? format(new Date(article.publishedAt), 'PPp')
                  : "Recent"}
              </p>
            </div>
          </div>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-crypto-500 hover:text-crypto-400 transition-colors">
            Read Full Article <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </div>
  </Card>
);

const LatestNewsItem = ({ article }: { article: NewsItem }) => (
  <div className="flex space-x-3 py-3 border-b border-white/10 last:border-0">
    <img 
      src={article.urlToImage || "https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=1228&auto=format&fit=crop"} 
      alt={article.title} 
      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
    />
    <div className="flex flex-col justify-center">
      <h4 className="text-sm font-medium text-white line-clamp-2">{article.title}</h4>
      <p className="text-xs text-gray-400 flex items-center">
        <Calendar className="h-3 w-3 mr-1" />
        {article.publishedAt 
          ? format(new Date(article.publishedAt), 'PPp')
          : "Recent"
        }
      </p>
    </div>
  </div>
);

const FeaturedNews = () => {
  const [mainArticle, setMainArticle] = useState<NewsItem | null>(null);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
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
        const news = await fetchCryptoNews(10);
        if (news.length > 0) {
          setMainArticle(news[0]);
          setLatestNews(news.slice(1, 5));
        }
      } catch (error) {
        console.error("Error in FeaturedNews:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [hasApiKey]);

  // Fallback data in case API key is not set or there are no results
  const fallbackMainArticle: NewsItem = {
    title: "Bitcoin Surges Past $60,000 as Institutional Investors Increase Holdings",
    description: "Bitcoin has surged past the $60,000 mark for the first time in weeks as data shows institutional investors have significantly increased their cryptocurrency holdings over the past month.",
    url: "#",
    urlToImage: "https://images.unsplash.com/photo-1621761311921-32791522636a?q=80&w=1287&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
    source: { name: "CryptoFlow" },
    category: "Breaking News"
  };

  const fallbackLatestNews: NewsItem[] = [
    {
      title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
      description: "Major scaling solutions are processing more transactions than ever before.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1246&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "CryptoFlow" },
      category: "Technology"
    },
    {
      title: "SEC Delays Decision on Multiple Spot Ethereum ETF Applications",
      description: "Regulators push back timeline on several pending applications.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=1228&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      source: { name: "CryptoFlow" },
      category: "Regulation"
    },
    {
      title: "Major Bank Launches Crypto Custody Services for Institutional Clients",
      description: "Financial giant enters the digital asset space with new offering.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=1176&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      source: { name: "CryptoFlow" },
      category: "Institutional"
    },
    {
      title: "New Stablecoin Regulation Framework Proposed by International Regulators",
      description: "Global standards body releases comprehensive guidelines.",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1629788959742-03bf9c4a6c6d?q=80&w=1246&auto=format&fit=crop",
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      source: { name: "CryptoFlow" },
      category: "Regulation"
    },
  ];

  return (
    <section className="py-12 px-4 md:py-16">
      <div className="container mx-auto">
        {!hasApiKey && <NewsApiKeyInput />}
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Featured News</h2>
          <a href="#" className="text-sm font-medium text-crypto-500 hover:text-crypto-400 transition-colors inline-flex items-center">
            View All News <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? (
              <Card className="glass-panel h-full animate-pulse">
                <div className="h-64 md:h-96 bg-gray-700"></div>
                <CardContent className="p-6">
                  <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                      <div>
                        <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <MainArticle article={mainArticle || fallbackMainArticle} />
            )}
          </div>
          
          <div>
            <Card className="glass-panel h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Latest News</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {loading ? (
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="flex space-x-3 py-3 animate-pulse">
                        <div className="w-16 h-16 bg-gray-700 rounded-md"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    (latestNews.length > 0 ? latestNews : fallbackLatestNews).map((article, index) => (
                      <LatestNewsItem 
                        key={index}
                        article={article}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
