
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check, MapPin, ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AddressSelection, { Address } from '@/components/AddressSelection';
import ProductSelection, { OrderItem } from '@/components/ProductSelection';
import OrderSummary from '@/components/OrderSummary';
import { toast } from 'sonner';

// Order steps
type OrderStep = 'delivery' | 'products' | 'payment';

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState<OrderStep>('delivery');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const handleAddressSelected = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleProductsSelected = (items: OrderItem[]) => {
    setSelectedItems(items);
    setCurrentStep('payment');
    toast.success("Products added to your order");
  };

  const handleProceedToProducts = () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    setCurrentStep('products');
    window.scrollTo(0, 0);
  };

  const handleBackToDelivery = () => {
    setCurrentStep('delivery');
    window.scrollTo(0, 0);
  };

  const handleBackToProducts = () => {
    setCurrentStep('products');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    // Here we would integrate with a payment gateway
    // For now, just show a success message
    toast.success("Order placed successfully!", {
      description: "You'll receive a confirmation email shortly."
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-blue text-white">
        <div className="container-custom section-padding py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-center">
              Order Refreshments
            </h1>
            <p className="text-lg opacity-90 text-center">
              Pre-order quality refreshments for your corporate events, meetings, and gatherings
            </p>
          </div>
        </div>
      </section>

      {/* Order Steps */}
      <section className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex justify-center">
            <div className="flex items-center text-sm md:text-base">
              <div className="flex items-center">
                <span className={`${currentStep === 'delivery' ? 'bg-brand-blue text-white' : 'bg-green-500 text-white'} w-6 h-6 rounded-full flex items-center justify-center text-sm`}>
                  {currentStep === 'delivery' ? '1' : <Check size={14} />}
                </span>
                <span className={`ml-2 font-medium ${currentStep !== 'delivery' && 'text-green-700'}`}>Delivery</span>
              </div>
              <div className="w-12 md:w-24 h-px bg-gray-300 mx-2"></div>
              <div className="flex items-center">
                <span className={`${currentStep === 'products' ? 'bg-brand-blue text-white' : currentStep === 'payment' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'} w-6 h-6 rounded-full flex items-center justify-center text-sm`}>
                  {currentStep === 'payment' ? <Check size={14} /> : '2'}
                </span>
                <span className={`ml-2 ${currentStep === 'products' ? 'font-medium' : currentStep === 'payment' ? 'text-green-700' : 'text-gray-500'}`}>Products</span>
              </div>
              <div className="w-12 md:w-24 h-px bg-gray-300 mx-2"></div>
              <div className="flex items-center">
                <span className={`${currentStep === 'payment' ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-600'} w-6 h-6 rounded-full flex items-center justify-center text-sm`}>
                  3
                </span>
                <span className={`ml-2 ${currentStep === 'payment' ? 'font-medium' : 'text-gray-500'}`}>Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Address Selection Step */}
            {currentStep === 'delivery' && (
              <Card className="shadow-md">
                <CardContent className="p-6 md:p-8">
                  <AddressSelection onAddressSelected={handleAddressSelected} />
                  
                  <div className="mt-8 pt-6 border-t flex justify-between items-center">
                    <Link to="/">
                      <Button variant="outline">
                        Back to Home
                      </Button>
                    </Link>
                    
                    <Button 
                      onClick={handleProceedToProducts} 
                      disabled={!selectedAddress} 
                      className="gap-2"
                    >
                      Continue to Products
                      <ArrowRight size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Product Selection Step */}
            {currentStep === 'products' && (
              <Card className="shadow-md">
                <CardContent className="p-6 md:p-8">
                  <ProductSelection onProductsSelected={handleProductsSelected} />
                  
                  <div className="mt-8 pt-6 border-t flex justify-between items-center">
                    <Button variant="outline" onClick={handleBackToDelivery} className="gap-2">
                      <ArrowLeft size={18} />
                      Back to Delivery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Payment Step */}
            {currentStep === 'payment' && selectedAddress && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="shadow-md">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="font-poppins font-semibold text-2xl mb-6">Payment</h2>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                        <p className="text-yellow-800">
                          <strong>Note:</strong> This is a demo application. No actual payment will be processed.
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-3">
                          <CreditCard className="text-green-600 h-5 w-5" />
                          <div className="flex-1">
                            <p className="font-medium text-green-800">Pay on Delivery</p>
                            <p className="text-green-700 text-sm">Cash or Card payment on delivery</p>
                          </div>
                          <Check className="text-green-600 h-5 w-5" />
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t flex justify-between items-center">
                        <Button variant="outline" onClick={handleBackToProducts} className="gap-2">
                          <ArrowLeft size={18} />
                          Back to Products
                        </Button>
                        
                        <Button 
                          onClick={handlePlaceOrder}
                          className="gap-2"
                        >
                          Place Order
                          <ShoppingCart size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <OrderSummary 
                    address={selectedAddress} 
                    orderItems={selectedItems}
                    eventDate="Apr 30, 2025"
                    eventTime="10:00 AM"
                  />
                </div>
              </div>
            )}
            
            {/* Information Card */}
            {currentStep === 'delivery' && (
              <Card className="mt-6 bg-brand-blue/5 border-brand-blue/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-brand-blue flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg mb-1">Seamless Delivery Address Selection</h3>
                      <p className="text-gray-600 mb-2">
                        Easily specify your delivery location for a smooth and hassle-free refreshment ordering experience. 
                        Choose between Google Maps integration or manual address entry to ensure accurate deliveries.
                      </p>
                      <ul className="space-y-2">
                        {[
                          'Google Maps integration for precise location selection',
                          'Manual address entry with validation',
                          'Save addresses for future orders',
                          'Currently serving Chennai region only'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="text-brand-blue h-4 w-4 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
