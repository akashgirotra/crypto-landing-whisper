
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/home/PriceTicker";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Ticker bar placed at the very top */}
      <PriceTicker />
      
      {/* Navbar now comes after the ticker */}
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow mt-16">
        <Hero />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
