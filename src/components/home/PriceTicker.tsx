
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

const cryptoData: Cryptocurrency[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 65432.10, change24h: 2.34 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3421.87, change24h: 1.65 },
  { id: 'ripple', name: 'Ripple', symbol: 'XRP', price: 0.5678, change24h: -0.32 },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.4321, change24h: 3.21 },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 127.89, change24h: 5.67 },
  { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', price: 567.23, change24h: -1.23 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.1234, change24h: 4.56 },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 12.34, change24h: -2.78 }
];

const PriceTicker = () => {
  const [coins, setCoins] = useState<Cryptocurrency[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // In a real app, you'd fetch real-time data from an API
    setCoins([...cryptoData, ...cryptoData]); // Duplicate for smooth looping
  }, []);

  return (
    <div 
      className="w-full overflow-hidden bg-background/80 backdrop-blur-md py-2 border-y border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "flex whitespace-nowrap",
        isHovered ? "animate-pause" : "animate-ticker"
      )}>
        {coins.map((coin, index) => (
          <div 
            key={`${coin.id}-${index}`} 
            className="flex items-center px-4 border-r border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{coin.name}</span>
              <span className="text-gray-400 text-xs">{coin.symbol}</span>
              <span className="font-bold text-sm">${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className={cn(
                "flex items-center text-xs font-medium",
                coin.change24h >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {coin.change24h >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(coin.change24h).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
