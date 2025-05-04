
import React from 'react';
import { Coffee, Package, Droplets, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const offerings = [
  {
    icon: <Coffee className="h-10 w-10 text-brand-maroon" />,
    title: "Beverages",
    description: "Hot and cold drinks for all preferences"
  },
  {
    icon: <Package className="h-10 w-10 text-brand-maroon" />,
    title: "Snacks",
    description: "Ready-to-eat quality refreshments"
  },
  {
    icon: <Droplets className="h-10 w-10 text-brand-maroon" />,
    title: "Water",
    description: "Bottled water in various sizes"
  },
  {
    icon: <Gift className="h-10 w-10 text-brand-maroon" />,
    title: "Gift Boxes",
    description: "Customizable corporate gifting solutions"
  }
];

const OfferingSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-4">
          What We Offer
        </h2>
        <p className="text-center text-brand-charcoal max-w-2xl mx-auto mb-12">
          From ready-to-eat snacks to custom gift boxes, we provide complete refreshment solutions for your corporate needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((item, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-brand-maroon/5 rounded-full p-6 inline-flex mb-4">
                  {item.icon}
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-brand-charcoal">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingSection;
