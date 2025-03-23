
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

type NewsCardProps = {
  title: string;
  summary: string;
  category: string;
  time: string;
  author: string;
  authorImage: string;
  image: string;
  featured?: boolean;
};

const NewsCard = ({
  title,
  summary,
  category,
  time,
  author,
  authorImage,
  image,
  featured = false
}: NewsCardProps) => (
  <Card className="glass-card overflow-hidden h-full transition-all hover:translate-y-[-4px]">
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
      />
      <div className="absolute top-3 left-3">
        <span className="text-xs font-semibold bg-crypto-500 text-white px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
    </div>
    <CardContent className="p-5">
      <h3 className={`${featured ? 'text-xl' : 'text-lg'} font-bold mb-2 line-clamp-2 text-white`}>{title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{summary}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden mr-2">
            <img
              src={authorImage}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium text-white">{author}</p>
            <p className="text-xs text-gray-400">{time}</p>
          </div>
        </div>
        <a href="#" className="text-crypto-500 hover:text-crypto-400">
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </CardContent>
  </Card>
);

const NewsGrid = () => {
  const topStories = [
    {
      title: "DeFi Protocol TVL Increases by 30% in Recent Bull Market",
      summary: "Total Value Locked (TVL) in decentralized finance protocols has jumped significantly as the crypto market heats up.",
      category: "DeFi",
      time: "6 hours ago",
      author: "Sarah Chen",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1332&auto=format&fit=crop"
    },
    {
      title: "Top Gaming Company Integrates NFTs into Popular Online Game",
      summary: "Major gaming publisher announces a strategic partnership to bring digital collectibles to their flagship title.",
      category: "NFT",
      time: "10 hours ago",
      author: "Mark Johnson",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
      image: "https://images.unsplash.com/photo-1616509091215-57bbf92cc731?q=80&w=1287&auto=format&fit=crop"
    },
    {
      title: "Crypto Lending Platforms Face New Regulatory Challenges",
      summary: "Government agencies across multiple countries are introducing stricter oversight for cryptocurrency lending services.",
      category: "Regulation",
      time: "1 day ago",
      author: "Amanda Lee",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop",
      image: "https://images.unsplash.com/photo-1607370890042-184b835f338d?q=80&w=1287&auto=format&fit=crop"
    }
  ];

  const moreStories = [
    {
      title: "South American Country Plans to Add Bitcoin to National Reserves",
      summary: "Following El Salvador's lead, another nation is considering adopting cryptocurrency for its treasury management.",
      category: "Adoption",
      time: "8 hours ago",
      author: "Carlos Mendez",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
      image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1274&auto=format&fit=crop"
    },
    {
      title: "New Layer 1 Blockchain Claims 100,000 TPS in Latest Testnet",
      summary: "Innovative blockchain project releases impressive performance metrics ahead of mainnet launch scheduled for next quarter.",
      category: "Technology",
      time: "12 hours ago",
      author: "Lisa Wong",
      authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1287&auto=format&fit=crop"
    },
    {
      title: "Crypto Mining Companies Turning to Renewable Energy Sources",
      summary: "Industry leaders are increasingly investing in solar and wind power facilities to reduce carbon footprint of mining operations.",
      category: "Mining",
      time: "2 days ago",
      author: "Michael Brown",
      authorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1287&auto=format&fit=crop",
      image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?q=80&w=1287&auto=format&fit=crop"
    },
    {
      title: "Major Investment Bank Adds Crypto Research Desk",
      summary: "Wall Street firm expands analysis team to cover digital assets amid growing client interest in cryptocurrency investments.",
      category: "Institutional",
      time: "3 days ago",
      author: "Jennifer Park",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
      image: "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=1288&auto=format&fit=crop"
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
          {topStories.map((story, index) => (
            <NewsCard
              key={index}
              {...story}
              featured={index === 0}
            />
          ))}
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">More Stories</h2>
          <p className="text-gray-400">Stay updated with the latest crypto news</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {moreStories.map((story, index) => (
            <NewsCard
              key={index}
              {...story}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
