
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-brand-maroon text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 text-white">
          Serving Chennai & Expanding Soon!
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Perfect for branded gifts, team meetings, and bulk refreshment needs. Order now and make your event refreshing with our premium services.
        </p>
        <Link to="/order">
          <Button size="lg" className="bg-white hover:bg-white/90 text-brand-maroon text-black font-semibold">
            Order Now <ArrowRight className="ml-2" size={18} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
