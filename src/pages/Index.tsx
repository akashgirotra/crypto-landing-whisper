
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/home/PriceTicker";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import FeaturedNews from "@/components/home/FeaturedNews";
import NewsGrid from "@/components/home/NewsGrid";
import NewsletterSubscription from "@/components/home/NewsletterSubscription";
import NewsletterCards from "@/components/home/NewsletterCards";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Ticker bar placed below navbar for better UX */}
      <div className="mt-16">
        <PriceTicker />
      </div>
      
      {/* Main content */}
      <main className="flex-grow">
        <Hero />
        <FeaturedNews />
        <NewsGrid />
        <NewsletterSubscription />
        <NewsletterCards />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
