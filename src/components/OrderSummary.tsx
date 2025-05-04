
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { CheckCircle, MapPin, Calendar, Clock } from 'lucide-react';
import { Address } from '@/components/AddressSelection';
import { OrderItem } from '@/components/ProductSelection';

interface OrderSummaryProps {
  address: Address;
  orderItems: OrderItem[];
  eventDate?: string;
  eventTime?: string;
}

const OrderSummary = ({ address, orderItems, eventDate, eventTime }: OrderSummaryProps) => {
  const calculateTotal = (): number => {
    return orderItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const calculateTax = (): number => {
    // Assuming 5% tax
    return calculateTotal() * 0.05;
  };

  const calculateGrandTotal = (): number => {
    return calculateTotal() + calculateTax();
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
            
            <div className="space-y-4">
              {/* Delivery Address */}
              <div className="flex gap-2 text-sm">
                <MapPin className="text-brand-blue h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p>{address.name} • {address.phone}</p>
                  <p className="text-gray-600">{address.street}, {address.city} - {address.pincode}</p>
                  {address.landmark && <p className="text-gray-600">Landmark: {address.landmark}</p>}
                </div>
              </div>
              
              {/* Event Date and Time */}
              {(eventDate || eventTime) && (
                <div className="flex gap-2 text-sm">
                  <div className="flex flex-col items-center gap-1">
                    <Calendar className="text-brand-blue h-5 w-5 flex-shrink-0" />
                    {eventTime && <Clock className="text-brand-blue h-5 w-5 flex-shrink-0" />}
                  </div>
                  <div>
                    <p className="font-medium">Event Schedule</p>
                    {eventDate && <p>Date: {eventDate}</p>}
                    {eventTime && <p>Time: {eventTime}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Items ({orderItems.length})</h3>
            <div className="space-y-3">
              {orderItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <div className="flex gap-2">
                    <CheckCircle className="text-brand-blue h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-600 text-xs">{item.quantity} units × ₹{item.product.price}</p>
                    </div>
                  </div>
                  <span className="font-medium">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Price Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Price Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Items Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes (5%)</span>
                <span>₹{calculateTax()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span className="text-green-600">Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Grand Total</span>
                <span>₹{calculateGrandTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
