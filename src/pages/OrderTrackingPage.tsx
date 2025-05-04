
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  Check, 
  ChevronRight, 
  CornerDownLeft, 
  HelpCircle, 
  MessageSquare,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Sample order data
const ORDER_STATUSES = {
  'ORDER_PLACED': {
    label: 'Order Placed',
    description: 'We\'ve received your order',
    icon: Check,
    color: 'bg-green-500'
  },
  'PROCESSING': {
    label: 'Processing',
    description: 'Your order is being prepared',
    icon: Package,
    color: 'bg-blue-500'
  },
  'OUT_FOR_DELIVERY': {
    label: 'Out for Delivery',
    description: 'Your order is on the way',
    icon: Truck,
    color: 'bg-amber-500'
  },
  'DELIVERED': {
    label: 'Delivered',
    description: 'Your order has been delivered',
    icon: Check,
    color: 'bg-green-500'
  }
};

// Sample order
const sampleOrder = {
  id: 'ORD123456',
  date: '2025-04-28',
  status: 'PROCESSING',
  deliveryTime: '2025-04-30 between 10:00 AM - 12:00 PM',
  customer: {
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+91 9876543210'
  },
  deliveryAddress: {
    street: '123 Main Street',
    building: 'Tech Park, Building 4',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipcode: '600001'
  },
  items: [
    {
      id: 1,
      name: 'Mineral Water (24-pack)',
      quantity: 10,
      price: 189.90
    },
    {
      id: 2,
      name: 'Assorted Cookies Box',
      quantity: 20,
      price: 250.00
    },
    {
      id: 3,
      name: 'Coffee Service Kit',
      quantity: 5,
      price: 212.50
    }
  ],
  subtotal: 652.40,
  deliveryFee: 150.00,
  total: 802.40,
  paymentMethod: 'Credit Card'
};

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order] = React.useState(sampleOrder);
  
  // Current order status for tracking visualization
  const currentStatus = order.status;
  const statuses = ['ORDER_PLACED', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentIndex = statuses.indexOf(currentStatus);
  
  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column: Order tracking and summary */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground mb-4">
            <Link to="/profile" className="hover:underline">Account</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/profile" className="hover:underline">Orders</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground">{order.id}</span>
          </nav>
          
          {/* Order Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Order #{order.id}</h1>
              <p className="text-muted-foreground">Placed on {order.date}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/order">
                <CornerDownLeft className="h-4 w-4 mr-2" />
                Reorder
              </Link>
            </Button>
          </div>
          
          {/* Order Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Truck className="mr-2 h-5 w-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold">
                  {ORDER_STATUSES[order.status].label}
                </h3>
                <p className="text-muted-foreground">
                  {ORDER_STATUSES[order.status].description}
                </p>
                
                {order.status !== 'DELIVERED' && (
                  <p className="mt-1 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> 
                    Expected delivery: {order.deliveryTime}
                  </p>
                )}
              </div>
              
              {/* Order Timeline */}
              <div className="relative">
                <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-200"></div>
                
                {statuses.map((status, index) => (
                  <div key={status} className="flex items-start mb-6 relative z-10">
                    <div className={`
                      rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1
                      ${index <= currentIndex ? ORDER_STATUSES[status].color : 'bg-gray-200'}
                    `}>
                      {React.createElement(ORDER_STATUSES[status].icon, { 
                        className: 'text-white h-3 w-3' 
                      })}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">{ORDER_STATUSES[status].label}</h4>
                      <p className="text-sm text-muted-foreground">
                        {ORDER_STATUSES[status].description}
                      </p>
                      {index === currentIndex && (
                        <p className="text-xs text-brand-blue mt-1">Current status</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded p-2 mr-4">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">₹{item.price.toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee:</span>
                    <span>₹{order.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2">
                    <span>Total:</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column: Delivery info and support */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold">Address:</h4>
                  <p className="text-sm">
                    {order.deliveryAddress.building}<br />
                    {order.deliveryAddress.street}<br />
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipcode}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold">Contact:</h4>
                  <p className="text-sm">{order.customer.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Support Options */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Report an Issue
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Report an Issue</DialogTitle>
                    <DialogDescription>
                      Describe the problem with your order and we'll get back to you shortly.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Issue Type</label>
                      <select className="w-full p-2 border rounded">
                        <option value="">Select an issue</option>
                        <option value="missing">Missing item</option>
                        <option value="damaged">Damaged item</option>
                        <option value="quality">Quality issue</option>
                        <option value="delivery">Delivery problem</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Description</label>
                      <Textarea 
                        placeholder="Please provide details of your issue..." 
                        className="w-full h-24"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={() => {
                        toast.success("Your issue has been reported. We'll get back to you soon!");
                      }}
                    >
                      Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="w-full flex items-center justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </Button>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="contact">
                  <AccordionTrigger>Contact Customer Support</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">Email: support@rtc.com</p>
                      <p className="text-sm">Phone: +91 9876543210</p>
                      <p className="text-sm">Hours: Mon-Fri, 9 AM - 6 PM</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
