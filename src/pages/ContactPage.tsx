import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to a backend or email service
    toast({
      title: "Message Sent!",
      description: "We've received your message and will get back to you soon.",
      duration: 5000,
    });
    
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-orange text-white">
        <div className="container-custom section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90">
              Have questions or need assistance? We're here to help you with your refreshment needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 rounded-lg p-8 shadow-md">
                <h2 className="font-poppins font-semibold text-2xl mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90">
                    <Send className="mr-2" size={18} /> Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-poppins font-semibold text-2xl mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-brand-orange/10 rounded-full p-3 mr-4">
                      <MapPin className="text-brand-orange" size={24} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-medium text-lg mb-1">Office Location</h3>
                      <p className="text-gray-600">
                        Chennai, Tamil Nadu<br />
                        600083
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-brand-orange/10 rounded-full p-3 mr-4">
                      <Phone className="text-brand-orange" size={24} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-medium text-lg mb-1">Phone Number</h3>
                      <p className="text-gray-600">
                        <a href="tel:+11234567890" className="hover:text-brand-orange transition-colors">
                          (+91) 7299396957
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-brand-orange/10 rounded-full p-3 mr-4">
                      <Mail className="text-brand-orange" size={24} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-medium text-lg mb-1">Email Address</h3>
                      <p className="text-gray-600">
                        <a href="mailto:refreshmentcompany1@gmail.com" className="hover:text-brand-orange transition-colors">
                            refreshmentcompany1@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-brand-orange/10 rounded-full p-3 mr-4">
                      <Clock className="text-brand-orange" size={24} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-medium text-lg mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="font-poppins font-semibold text-xl mb-4">Quick Response Guarantee</h3>
                <p className="text-gray-600">
                  We pride ourselves on responsive customer service. Our team typically responds to all inquiries within 2 business hours during our operating hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-gray-50">
        <div className="h-96 bg-gray-300 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-poppins font-semibold text-xl mb-2">Map Location</h3>
            <p className="text-gray-600">Interactive map would be displayed here</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about our refreshment services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "What is the minimum order quantity?",
                a: "Our minimum order is 100 servings. This allows us to provide the best service and value for medium to large events."
              },
              {
                q: "How far in advance should I place my order?",
                a: "We recommend placing orders at least 48 hours in advance to ensure availability and timely delivery."
              },
              {
                q: "Do you offer customization options?",
                a: "Yes, we offer various customization options including branded packaging and custom refreshment selections."
              },
              {
                q: "What is your delivery area?",
                a: "We currently service the metropolitan area and surrounding suburbs within a 30-mile radius of our location."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="font-poppins font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
