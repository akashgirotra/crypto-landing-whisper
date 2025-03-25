
import React from 'react';
import { Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const NewsletterSubscription = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="glass-panel p-8 md:p-12 text-center max-w-4xl mx-auto rounded-2xl relative overflow-hidden">
          {/* Background decoration elements */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-crypto-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-crypto-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-crypto-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="text-crypto-500 h-8 w-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay ahead of the crypto curve</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for daily insights, market analysis, and expert commentary delivered directly to your inbox.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow">
                  <Label htmlFor="email" className="sr-only">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-muted border-white/10 focus:border-crypto-500 h-12"
                  />
                </div>
                <Button className="bg-crypto-500 hover:bg-crypto-600 text-white h-12 px-6">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
