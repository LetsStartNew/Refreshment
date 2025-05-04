
import React from 'react';
import { Package, Calendar, CreditCard, Truck } from 'lucide-react';

const steps = [
  {
    icon: <Package className="h-10 w-10 text-brand-maroon" />,
    title: 'Choose Your Refreshments',
    description: 'Browse our curated selection of snacks & beverages.'
  },
  {
    icon: <Calendar className="h-10 w-10 text-brand-maroon" />,
    title: 'Place a Pre-Order',
    description: 'Select the quantity, date, and delivery location.'
  },
  {
    icon: <CreditCard className="h-10 w-10 text-brand-maroon" />,
    title: 'Secure Payment',
    description: 'Multiple payment options for a seamless experience.'
  },
  {
    icon: <Truck className="h-10 w-10 text-brand-maroon" />,
    title: 'Timely Delivery',
    description: 'Your refreshments, delivered fresh and on schedule.'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-brand-maroon/5 rounded-full p-6 inline-flex mb-4">
                {step.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-brand-charcoal">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
