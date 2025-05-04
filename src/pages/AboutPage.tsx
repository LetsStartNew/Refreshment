
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Leaf, Users, Clock, Shield, Package, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white">
        <div className="container-custom section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">About RefreshCo</h1>
            <p className="text-lg md:text-xl opacity-90">
              We're on a mission to revolutionize refreshment services for events and corporate gatherings with quality products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-100 rounded-lg p-1">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/80 to-brand-blue/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-poppins font-bold text-white text-3xl">Our Story</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-brand-darkGray">
                Our Journey to Excellence
              </h2>
              <p className="text-gray-600">
                RefreshCo was founded in 2010 with a simple goal: to provide high-quality refreshments for corporate events without the hassle. We noticed that event organizers were spending too much time and energy sourcing refreshments, often with inconsistent results.
              </p>
              <p className="text-gray-600">
                What started as a small operation serving local businesses has grown into a comprehensive refreshment service trusted by companies of all sizes. Our commitment to quality, reliability, and customer satisfaction has remained unchanged throughout our journey.
              </p>
              <p className="text-gray-600">
                Today, we serve hundreds of events monthly, delivering premium refreshments that keep attendees energized and focused. Our team of dedicated professionals works tirelessly to ensure that every order meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600">
              At RefreshCo, our core values guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={32} className="text-brand-blue" />,
                title: 'Our Mission',
                description: 'To simplify event refreshments by providing high-quality products with reliable service, allowing event organizers to focus on what matters most.'
              },
              {
                icon: <Award size={32} className="text-brand-blue" />,
                title: 'Our Vision',
                description: 'To become the leading refreshment service provider nationwide, known for exceptional quality, sustainability, and customer satisfaction.'
              },
              {
                icon: <Leaf size={32} className="text-brand-blue" />,
                title: 'Our Commitment',
                description: 'To continuously improve our offerings, minimize our environmental impact, and maintain the highest standards in every aspect of our business.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-brand-blue/10 rounded-full p-3 inline-flex mb-4">
                  {item.icon}
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              These principles drive our business decisions and shape our company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Package className="text-brand-blue" size={28} />,
                title: 'Quality',
                description: 'We source only the finest refreshments that meet our strict quality standards.'
              },
              {
                icon: <Clock className="text-brand-blue" size={28} />,
                title: 'Reliability',
                description: 'Punctual delivery and consistent service you can count on every time.'
              },
              {
                icon: <Shield className="text-brand-blue" size={28} />,
                title: 'Integrity',
                description: 'Honest business practices and transparent communication with our clients.'
              },
              {
                icon: <Leaf className="text-brand-blue" size={28} />,
                title: 'Sustainability',
                description: 'Eco-friendly packaging and responsible sourcing to minimize environmental impact.'
              }
            ].map((value, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  {value.icon}
                  <h3 className="font-poppins font-semibold text-lg ml-3">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The dedicated professionals behind RefreshCo's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'John Smith',
                position: 'Founder & CEO',
                bio: 'With over 15 years in the food and beverage industry, John founded RefreshCo to revolutionize event refreshments.'
              },
              {
                name: 'Lisa Johnson',
                position: 'Operations Manager',
                bio: 'Lisa ensures that every order is processed efficiently and delivered on time, maintaining our high standard of service.'
              },
              {
                name: 'David Chen',
                position: 'Product Specialist',
                bio: 'David carefully selects our product offerings, ensuring they meet our quality standards and satisfy diverse customer preferences.'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="bg-brand-blue h-32 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-brand-gold rounded-full p-1">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                      <Users size={28} className="text-brand-blue" />
                    </div>
                  </div>
                </div>
                <div className="pt-12 p-6 text-center">
                  <h3 className="font-poppins font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-brand-blue mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
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
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">Experience Quality Refreshments</h2>
            <p className="text-lg mb-8 opacity-90">
              Pre-order now and see why leading companies trust RefreshCo for their event refreshments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
              <Link to="/order">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-darkGray font-poppins font-semibold">
                  Pre-Order Now <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
