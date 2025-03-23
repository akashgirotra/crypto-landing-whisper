
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'News', href: '#' },
    { name: 'Prices', href: '#' },
    { name: 'Data', href: '#' },
    { name: 'Indices', href: '#' },
    { name: 'Research', href: '#' },
    { name: 'Consensus', href: '#' },
    { name: 'Sponsored', href: '#' },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
      isScrolled ? 'bg-background/90 shadow-md' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-crypto-500 to-crypto-700 flex items-center justify-center">
                <span className="text-white font-bold">₿</span>
              </div>
              <span className="hidden sm:block">CryptoFlow</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <a href="#" className="text-sm px-4 py-2 rounded-full bg-transparent border border-white/20 text-white transition-colors hover:bg-white/10">
              Sign In
            </a>
            <a href="#" className="text-sm px-4 py-2 rounded-full bg-crypto-500 text-white transition-colors hover:bg-crypto-600">
              Sign Up
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
        isMenuOpen ? 'max-h-screen bg-background/95 backdrop-blur-md' : 'max-h-0'
      )}>
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-base font-medium text-gray-300 hover:text-white border-b border-gray-700"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col space-y-2 pt-2">
            <a href="#" className="text-sm px-4 py-2.5 rounded-full border border-white/20 text-white text-center">
              Sign In
            </a>
            <a href="#" className="text-sm px-4 py-2.5 rounded-full bg-crypto-500 text-white text-center">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
