
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-brand-maroon to-[#521212] text-white py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <Badge className="bg-brand-red text-white mb-4">Tech-Enabled Refreshment Service</Badge>
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
              Effortless Refreshments for Every Event
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              RTC is a tech-enabled, pre-order platform offering Ready-To-Eat snacks, beverages, water, 
              and customizable gift boxes. Perfect for corporate events, meetups, and workplace occasions with 
              a 100+ order minimum—starting in Chennai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button size="lg" className="bg-white hover:bg-white/90 text-brand-maroon font-semibold">
                  Order Now <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Our Services
                </Button>
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <p className="text-2xl font-bold text-white">100+</p>
                <p className="text-xs opacity-90">Minimum Order</p>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="text-xs opacity-90">Advance Booking</p>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <p className="text-2xl font-bold text-white">Chennai</p>
                <p className="text-xs opacity-90">Service Area</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
              <img 
                src="/lovable-uploads/e97663ed-a50f-4c0a-abcc-4a0e09f9e2ac.png" 
                alt="Refreshment Company" 
                className="relative z-10 mx-auto max-h-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
