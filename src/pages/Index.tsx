
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/home/PriceTicker";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";

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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
