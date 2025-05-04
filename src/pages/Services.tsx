
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Coffee, Gift, Users, Building2, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-blue text-white">
        <div className="container-custom section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">Our Services</h1>
            <p className="text-lg md:text-xl opacity-90">
              Premium Refreshment Solutions for Every Occasion
            </p>
            <p className="mt-4 text-lg opacity-90">
              We specialize in providing high-quality, pre-ordered refreshments for corporate events, 
              meetups, and special occasions. Our service ensures timely delivery, premium quality, 
              and hassle-free event planning.
            </p>
          </div>
        </div>
      </section>

      {/* Our Offerings Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">Our Offerings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Building2 size={48} className="text-brand-blue" />,
                title: 'Corporate Event Refreshments',
                description: 'Tailored snack and beverage packages for meetings, conferences, and company gatherings.'
              },
              {
                icon: <Calendar size={48} className="text-brand-blue" />,
                title: 'Meetup & Seminar Catering',
                description: 'Seamless delivery of fresh refreshments for business and networking events.'
              },
              {
                icon: <Gift size={48} className="text-brand-blue" />,
                title: 'Corporate Refreshment Gifts',
                description: 'Premium snack and beverage gift packages for employees, clients, and business partners.'
              },
              {
                icon: <Coffee size={48} className="text-brand-blue" />,
                title: 'Bulk Beverage & Snack Orders',
                description: 'Large-scale ordering options for offices, workshops, and educational institutions.'
              }
            ].map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
                    <div className="bg-brand-blue/10 p-4 rounded-full">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-xl mb-2 text-center md:text-left">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">Why Choose Refreshment Company?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Pre-Order Convenience – Plan ahead with our easy online ordering system.',
              'Customizable Packages – Tailored refreshment solutions to fit your needs.',
              'Quality Assurance – Fresh, hygienic, and FSSAI-compliant products.',
              'Reliable & Timely Delivery – Ensuring refreshments arrive fresh and on schedule.',
              'Bulk Order Discounts – Special pricing for large corporate and event orders.'
            ].map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <Check size={24} className="text-brand-blue mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue text-white">
        <div className="container-custom section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl mb-2">
              📍 Currently serving Chennai & expanding soon!
            </p>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
              Get in Touch & Make Your Event Refreshing!
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
              <Link to="/order">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-darkGray">
                  Pre-Order Now <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
