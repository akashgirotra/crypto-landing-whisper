
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

type NewsletterCardProps = {
  title: string;
  description: string;
  frequency: string;
  image: string;
  subscribers: string;
};

const NewsletterCard = ({ title, description, frequency, image, subscribers }: NewsletterCardProps) => (
  <Card className="overflow-hidden h-full transition-all hover:translate-y-[-4px] border border-gray-200">
    <div className="h-40 overflow-hidden">
      <img 
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          {frequency}
        </span>
        <span className="text-xs text-gray-500">
          {subscribers} subscribers
        </span>
      </div>
      <CardTitle className="text-lg text-gray-800">{title}</CardTitle>
      <CardDescription className="text-gray-600">{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
        Subscribe <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

const NewsletterCards = () => {
  const newsletters = [
    {
      title: "The Daily Crypto Brief",
      description: "A concise summary of the most important market movements and news.",
      frequency: "Daily",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1170&auto=format&fit=crop",
      subscribers: "248K"
    },
    {
      title: "DeFi Weekly",
      description: "Deep dives into decentralized finance projects, yields, and opportunities.",
      frequency: "Weekly",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1287&auto=format&fit=crop", 
      subscribers: "127K"
    },
    {
      title: "Blockchain Innovations",
      description: "Technical analysis of new protocols, scaling solutions, and crypto infrastructure.",
      frequency: "Bi-weekly",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&auto=format&fit=crop",
      subscribers: "94K"
    },
    {
      title: "Crypto Regulation Insights",
      description: "Expert analysis on regulatory developments affecting the cryptocurrency industry.",
      frequency: "Monthly",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1170&auto=format&fit=crop",
      subscribers: "76K"
    }
  ];

  return (
    <section className="py-12 px-4 md:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Our Specialized Newsletters</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of expert-curated newsletters tailored to different aspects of the crypto ecosystem
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsletters.map((newsletter, index) => (
            <NewsletterCard 
              key={index}
              {...newsletter}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsletterCards;
