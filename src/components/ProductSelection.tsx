
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Coffee, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Product type definition
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'beverage' | 'snack' | 'combo';
  minQuantity: number;
}

// Order item type
export interface OrderItem {
  product: Product;
  quantity: number;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: 'bev1',
    name: 'Premium Coffee',
    description: 'Freshly brewed premium coffee served in insulated cups',
    price: 75,
    category: 'beverage',
    minQuantity: 50
  },
  {
    id: 'bev2',
    name: 'Assorted Tea',
    description: 'Various tea options including green, black, and herbal',
    price: 60,
    category: 'beverage',
    minQuantity: 50
  },
  {
    id: 'snk1',
    name: 'Cookie Platter',
    description: 'Assortment of freshly baked cookies',
    price: 120,
    category: 'snack',
    minQuantity: 50
  },
  {
    id: 'snk2',
    name: 'Sandwich Bites',
    description: 'Mini vegetarian and non-vegetarian sandwich selection',
    price: 180,
    category: 'snack',
    minQuantity: 50
  },
  {
    id: 'cmb1',
    name: 'Coffee & Cookie Combo',
    description: 'Premium coffee served with assorted cookies',
    price: 150,
    category: 'combo',
    minQuantity: 40
  }
];

interface ProductSelectionProps {
  onProductsSelected: (items: OrderItem[]) => void;
}

const ProductSelection = ({ onProductsSelected }: ProductSelectionProps) => {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  
  const handleAddProduct = (product: Product) => {
    const existingItemIndex = selectedItems.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Product already in cart, increase quantity
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + product.minQuantity
      };
      setSelectedItems(updatedItems);
    } else {
      // Add new product to cart with minimum quantity
      setSelectedItems([...selectedItems, {
        product,
        quantity: product.minQuantity
      }]);
    }
    
    toast.success(`Added ${product.name} to your order`);
  };
  
  const handleRemoveProduct = (productId: string) => {
    const existingItemIndex = selectedItems.findIndex(item => item.product.id === productId);
    
    if (existingItemIndex >= 0) {
      const product = selectedItems[existingItemIndex].product;
      const currentQty = selectedItems[existingItemIndex].quantity;
      
      if (currentQty <= product.minQuantity) {
        // Remove product entirely if reducing below minimum
        setSelectedItems(selectedItems.filter(item => item.product.id !== productId));
        toast.info(`Removed ${product.name} from your order`);
      } else {
        // Decrease quantity
        const updatedItems = [...selectedItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: currentQty - product.minQuantity
        };
        setSelectedItems(updatedItems);
        toast.info(`Reduced ${product.name} quantity`);
      }
    }
  };
  
  const handleSelectProducts = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one product");
      return;
    }
    
    onProductsSelected(selectedItems);
  };
  
  const getProductQuantity = (productId: string): number => {
    const item = selectedItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };
  
  const getTotalAmount = (): number => {
    return selectedItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };
  
  // Group products by category
  const beverages = mockProducts.filter(p => p.category === 'beverage');
  const snacks = mockProducts.filter(p => p.category === 'snack');
  const combos = mockProducts.filter(p => p.category === 'combo');
  
  return (
    <div className="space-y-6">
      <h2 className="font-poppins font-semibold text-2xl">Select Refreshments</h2>
      <p className="text-gray-600">Choose from our selection of high-quality refreshments for your event (minimum order quantities apply)</p>
      
      {/* Beverages Section */}
      <div>
        <h3 className="text-lg font-medium mb-3">Beverages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beverages.map(product => (
            <Card key={product.id} className={`overflow-hidden ${getProductQuantity(product.id) > 0 ? 'border-brand-blue' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Coffee className="h-5 w-5 text-brand-blue mr-2" />
                      <h4 className="font-medium">{product.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <p className="mt-2 font-medium">₹{product.price} per unit</p>
                    <p className="text-xs text-gray-500">Min. Quantity: {product.minQuantity} units</p>
                  </div>
                  
                  {getProductQuantity(product.id) > 0 ? (
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8" 
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="font-medium mx-1">{getProductQuantity(product.id)}</span>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8" 
                        onClick={() => handleAddProduct(product)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleAddProduct(product)}
                    >
                      <PlusCircle className="h-4 w-4" /> Add
                    </Button>
                  )}
                </div>
                
                {getProductQuantity(product.id) > 0 && (
                  <div className="mt-2 py-1 px-2 bg-brand-blue/10 rounded-md flex items-center gap-2">
                    <CheckCircle className="text-brand-blue h-4 w-4" />
                    <span className="text-sm">
                      {getProductQuantity(product.id)} × ₹{product.price} = ₹{getProductQuantity(product.id) * product.price}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Snacks Section */}
      <div>
        <h3 className="text-lg font-medium mb-3">Snacks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {snacks.map(product => (
            <Card key={product.id} className={`overflow-hidden ${getProductQuantity(product.id) > 0 ? 'border-brand-blue' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Coffee className="h-5 w-5 text-brand-blue mr-2" />
                      <h4 className="font-medium">{product.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <p className="mt-2 font-medium">₹{product.price} per unit</p>
                    <p className="text-xs text-gray-500">Min. Quantity: {product.minQuantity} units</p>
                  </div>
                  
                  {getProductQuantity(product.id) > 0 ? (
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8" 
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="font-medium mx-1">{getProductQuantity(product.id)}</span>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8" 
                        onClick={() => handleAddProduct(product)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleAddProduct(product)}
                    >
                      <PlusCircle className="h-4 w-4" /> Add
                    </Button>
                  )}
                </div>
                
                {getProductQuantity(product.id) > 0 && (
                  <div className="mt-2 py-1 px-2 bg-brand-blue/10 rounded-md flex items-center gap-2">
                    <CheckCircle className="text-brand-blue h-4 w-4" />
                    <span className="text-sm">
                      {getProductQuantity(product.id)} × ₹{product.price} = ₹{getProductQuantity(product.id) * product.price}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Combo Packages Section */}
      <div>
        <h3 className="text-lg font-medium mb-3">Combo Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {combos.map(product => (
            <Card key={product.id} className={`overflow-hidden ${getProductQuantity(product.id) > 0 ? 'border-brand-blue' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Coffee className="h-5 w-5 text-brand-blue mr-2" />
                      <h4 className="font-medium">{product.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <p className="mt-2 font-medium">₹{product.price} per combo</p>
                    <p className="text-xs text-gray-500">Min. Quantity: {product.minQuantity} units</p>
                  </div>
                  
                  {getProductQuantity(product.id) > 0 ? (
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8" 
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="font-medium mx-1">{getProductQuantity(product.id)}</span>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-8 w-8" 
                        onClick={() => handleAddProduct(product)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleAddProduct(product)}
                    >
                      <PlusCircle className="h-4 w-4" /> Add
                    </Button>
                  )}
                </div>
                
                {getProductQuantity(product.id) > 0 && (
                  <div className="mt-2 py-1 px-2 bg-brand-blue/10 rounded-md flex items-center gap-2">
                    <CheckCircle className="text-brand-blue h-4 w-4" />
                    <span className="text-sm">
                      {getProductQuantity(product.id)} × ₹{product.price} = ₹{getProductQuantity(product.id) * product.price}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Order Summary */}
      {selectedItems.length > 0 && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {selectedItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.quantity}× {item.product.name}</span>
                  <span className="font-medium">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total Amount</span>
                <span className="text-brand-blue">₹{getTotalAmount()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="pt-4">
        <Button 
          className="w-full md:w-auto"
          disabled={selectedItems.length === 0}
          onClick={handleSelectProducts}
        >
          Continue with Selected Items
        </Button>
        {selectedItems.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Please select at least one item to continue</p>
        )}
      </div>
    </div>
  );
};

export default ProductSelection;
