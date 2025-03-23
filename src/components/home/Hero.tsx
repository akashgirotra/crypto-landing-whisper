
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopCrypto {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

const topCryptos: TopCrypto[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: 65432.10, change: 2.34 },
  { name: 'Ethereum', symbol: 'ETH', price: 3421.87, change: 1.65 },
  { name: 'Solana', symbol: 'SOL', price: 127.89, change: 5.67 },
  { name: 'Cardano', symbol: 'ADA', price: 0.4321, change: -1.21 },
  { name: 'Binance Coin', symbol: 'BNB', price: 567.23, change: -1.23 },
];

const Hero = () => {
  return (
    <section className="relative pt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-crypto-900/20 to-transparent -z-10"></div>
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-crypto-600/20 blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hero Text */}
          <div className="space-y-8 max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white backdrop-blur-sm animate-fade-in animate-delay-1">
              The future of finance is decentralized
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-glow animate-fade-in">
              <span className="text-gradient">Crypto</span> for everyone, everywhere
            </h1>
            
            <p className="text-lg text-gray-300 animate-fade-in animate-delay-2">
              Discover, trade, and understand cryptocurrencies with our intuitive platform. Real-time data, powerful insights, and seamless trading — all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-3">
              <a href="#" className="px-6 py-3 rounded-full bg-crypto-500 text-white font-medium hover:bg-crypto-600 transition-all flex items-center justify-center gap-2 group">
                Start Trading
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center">
                Learn More
              </a>
            </div>
          </div>
          
          {/* Right Column - Prices Widget */}
          <div className="glass-panel overflow-hidden p-1 backdrop-blur-lg animate-fade-in animate-delay-4">
            <div className="bg-card rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Top Cryptocurrencies</h3>
                <a href="#" className="text-sm text-crypto-400 hover:text-crypto-300 transition-colors">
                  See All
                </a>
              </div>
              
              <div className="space-y-1">
                {topCryptos.map((crypto, index) => (
                  <div key={crypto.symbol} className={cn(
                    "flex justify-between items-center rounded-lg p-3 transition-colors hover:bg-white/5",
                    index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-xs font-medium">{crypto.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{crypto.name}</p>
                        <p className="text-xs text-gray-400">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      <p className={cn(
                        "text-xs flex items-center justify-end",
                        crypto.change >= 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {crypto.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(crypto.change).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 text-sm text-center text-gray-400">
                Prices update in real-time | Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
