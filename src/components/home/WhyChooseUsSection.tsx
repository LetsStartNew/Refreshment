
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'Tech-Enabled Platform',
    description: 'Order online, schedule delivery, and track with ease.'
  },
  {
    title: 'Bulk Order Flexibility',
    description: 'Minimum order of 100 servings, scalable up to 1000+.'
  },
  {
    title: 'Quality Assured',
    description: 'Fresh, hygienic, and FSSAI-compliant refreshments.'
  },
  {
    title: 'Timely Delivery',
    description: 'On-time service for hassle-free event planning.'
  },
  {
    title: 'Customizable Packages',
    description: 'Tailored options for corporate gifting and event needs.'
  },
  {
    title: 'Budget Friendly',
    description: 'Competitive pricing for bulk orders with quality service.'
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-brand-maroon/10 rounded-full p-2">
                    <Check className="h-5 w-5 text-brand-maroon" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-xl mb-2">{feature.title}</h3>
                    <p className="text-brand-charcoal">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
