
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

const MainArticle = () => (
  <Card className="glass-panel h-full">
    <div className="relative overflow-hidden h-full rounded-xl flex flex-col">
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1621761311921-32791522636a?q=80&w=1287&auto=format&fit=crop" 
          alt="Bitcoin and cryptocurrency graphics" 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="text-xs font-semibold bg-crypto-500 text-white px-2 py-1 rounded-full">
            Breaking News
          </span>
        </div>
      </div>
      
      <CardContent className="flex-grow flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Bitcoin Surges Past $60,000 as Institutional Investors Increase Holdings
          </h2>
          <p className="text-gray-300 mb-4 line-clamp-3">
            Bitcoin has surged past the $60,000 mark for the first time in weeks as data shows institutional investors have significantly increased their cryptocurrency holdings over the past month.
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden mr-3">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop" 
                alt="Author" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white">James Wilson</p>
              <p className="text-xs text-gray-400">5 hours ago</p>
            </div>
          </div>
          <a href="#" className="inline-flex items-center text-sm font-medium text-crypto-500 hover:text-crypto-400 transition-colors">
            Read Full Article <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </div>
  </Card>
);

const LatestNewsItem = ({ title, time, imageSrc }: { title: string; time: string; imageSrc: string }) => (
  <div className="flex space-x-3 py-3 border-b border-white/10 last:border-0">
    <img 
      src={imageSrc} 
      alt={title} 
      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
    />
    <div className="flex flex-col justify-center">
      <h4 className="text-sm font-medium text-white line-clamp-2">{title}</h4>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  </div>
);

const FeaturedNews = () => {
  const latestNews = [
    {
      title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
      time: "2 hours ago",
      imageSrc: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1246&auto=format&fit=crop"
    },
    {
      title: "SEC Delays Decision on Multiple Spot Ethereum ETF Applications",
      time: "3 hours ago",
      imageSrc: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=1228&auto=format&fit=crop"
    },
    {
      title: "Major Bank Launches Crypto Custody Services for Institutional Clients",
      time: "5 hours ago",
      imageSrc: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=1176&auto=format&fit=crop"
    },
    {
      title: "New Stablecoin Regulation Framework Proposed by International Regulators",
      time: "7 hours ago",
      imageSrc: "https://images.unsplash.com/photo-1629788959742-03bf9c4a6c6d?q=80&w=1246&auto=format&fit=crop"
    },
  ];

  return (
    <section className="py-12 px-4 md:py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Featured News</h2>
          <a href="#" className="text-sm font-medium text-crypto-500 hover:text-crypto-400 transition-colors inline-flex items-center">
            View All News <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MainArticle />
          </div>
          
          <div>
            <Card className="glass-panel h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Latest News</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {latestNews.map((item, index) => (
                    <LatestNewsItem 
                      key={index}
                      title={item.title}
                      time={item.time}
                      imageSrc={item.imageSrc}
                    />
                  ))}
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
