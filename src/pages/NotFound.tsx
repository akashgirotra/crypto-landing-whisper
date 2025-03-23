
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="glass-panel p-12 text-center max-w-md mx-auto">
          <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
          <p className="text-xl text-gray-300 mb-6">Oops! This page has disappeared into the blockchain...</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-crypto-500 text-white font-medium hover:bg-crypto-600 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Home
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
